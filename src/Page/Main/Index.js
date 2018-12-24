import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Navigator,
    TouchableOpacity,
    AsyncStorage,
    AppState, StatusBar
} from 'react-native';

import Moment from 'moment'
import CodePush from 'react-native-code-push'
import * as Progress from 'react-native-progress';
import {observer} from 'mobx-react'

import Storage from '../../Common/Global/TCStorage'
import G_Config from '../../Common/Global/G_Config'
import Main from '../Route';

import TopNavigationBar from '../../Common/View/TCNavigationBar';

import {width, Size} from '../resouce/theme'
import StartUpHelper from './StartUpHelper'
import AppConfig from './AppConfig'

let retryTimes = 0
let downloadTime = 0
let alreadyInCodePush = false
import JXDomainsHelper from "../../Common/JXHelper/JXDomainsHelper";
let domainsHelper = new JXDomainsHelper();
import Fabric from 'react-native-fabric';
@observer
export default class APP extends Component {

    constructor() {
        super();
        this.hotFixStore=TW_Store.hotFixStore;
        this.handleAppStateChange = this.handleAppStateChange.bind(this);
    }

    componentWillMount() {
      //  var { Crashlytics } = Fabric;

        this.initData()
        this.uploadLog()
        this.initDomain()
        AppState.addEventListener('change', this.handleAppStateChange);
        this.timer2 = setTimeout(() => {
            if (this.hotFixStore.syncMessage === '检测更新中...' || this.hotFixStore.syncMessage === '初始化配置中...') {
                this.hotFixStore.skipUpdate();
                this.reloadAppDomain();
            }
        }, 7 * 1000)
    }

    //域名异常启动介入
    reloadAppDomain(){
        domainsHelper.getSafeguardName((ok)=>{
            if(ok){
                //拿到d.json域名初始化
                this.initDomain();

                this.timer2 = setTimeout(() => {
                    if (this.state.syncMessage === '检测更新中...' || this.state.syncMessage === '初始化配置中...') {
                        this.hotFixStore.skipUpdate();
                    }
                },5 * 1000)
                this.setState({
                    updateFinished: false,
                    syncMessage: "初始化配置中...",
                    updateStatus: 0,
                })
            }
        })
    }


    handleAppStateChange=(nextAppState)=> {
        if (nextAppState === 'active') {
            if (TW_Store.hotFixStore.currentDeployKey) {
                this.hotFix(TW_Store.hotFixStore.currentDeployKey);
            }
        }
    }

    componentWillUnmount() {
        this.timer && clearTimeout(this.timer)
        this.timer2 && clearTimeout(this.timer2)
        AppState.removeEventListener('change', this.handleAppStateChange)
    }

    render() {
        if (!this.hotFixStore.updateFinished && this.hotFixStore.updateStatus === 0) {
            return this.getLoadingView();
        } else if (!this.hotFixStore.updateFinished && this.hotFixStore.updateStatus === -1) {
            return this.updateFailView()
        } else {
            return (<Main/>);
        }
    }


    initDomain() {
        AsyncStorage.getItem('cacheDomain').then((response) => {
            TW_Log("refresh cache domain ", response);

            let cacheDomain = response ? JSON.parse(response) : null
            if (cacheDomain != null && cacheDomain.serverDomains && cacheDomain.serverDomains.length > 0) {//缓存存在，使用缓存访问
                StartUpHelper.getAvailableDomain(cacheDomain.serverDomains, (success, allowUpdate, message) => this.cacheAttempt(success, allowUpdate, message))
            } else {//缓存不存在，使用默认地址访问
                StartUpHelper.getAvailableDomain(AppConfig.domains, (success, allowUpdate, message) => this.firstAttempt(success, allowUpdate, message))
            }
        }).catch((error) => {
            StartUpHelper.getAvailableDomain(AppConfig.domains, (success, allowUpdate, message) => this.firstAttempt(success, allowUpdate, message))
        })
    }

    initData() {
        TW_Store.appInfoStore.currentDomain = AppConfig.domains[0];
    }

    //使用默认地址
    firstAttempt(success, allowUpdate, message) {
        TW_Log(`first attempt ${success}, ${allowUpdate}, ${message}`);
        if (success && allowUpdate) {
            this.gotoUpdate()
        } else if (!success) {//默认地址不可用，使用备份地址
            StartUpHelper.getAvailableDomain(AppConfig.backupDomains, (success, allowUpdate, message) => this.secondAttempt(success, allowUpdate, message))
        } else {//不允许更新
            this.hotFixStore.skipUpdate();
        }
    }

    //使用默认备份地址
    secondAttempt(success, allowUpdate, message) {
        if (success && allowUpdate) {
            this.gotoUpdate()
        } else if (!success) {//备份地址不可用
            // Toast User to change a better network and retry
            let customerMessage = "当前网络无法更新，可能是请求域名的问题"
            switch (message) {
                case 'NETWORK_ERROR':
                    customerMessage = "当前没有网络，请打开网络"
                    break
                case 'CONNECTION_ERROR':
                    customerMessage = "服务器无返回结果，DNS无法访问"
                    break
                case 'TIMEOUT_ERROR':
                    customerMessage = "当前网络差，请换更快的网络"
                    break
                case 'SERVER_ERROR':
                    customerMessage = "服务器错误"
                    break
                default:
                    break
            }
            this.storeLog({faileMessage: customerMessage});
            this.hotFixStore.updateFailMsg(customerMessage);
            this.reloadAppDomain()
        } else {
            // TODO 审核通过之后 放开如下，告知ip不在更新范围内的用户
            // alert('您当前的区域无法更新')
            this.hotFixStore.skipUpdate()
        }
    }

    //使用缓存地址
    cacheAttempt(success, allowUpdate, message) {
        TW_Log(`first attempt ${success}, ${allowUpdate}, ${message}`);
        if (success && allowUpdate) {
            this.gotoUpdate();
        } else if (!success) {//缓存地址不可用,使用默认地址
            StartUpHelper.getAvailableDomain(AppConfig.domains, (success, allowUpdate, message) => this.firstAttempt(success, allowUpdate, message));
        } else {
            this.hotFixStore.skipUpdate();
        }
    }

    //使用从服务器获取的更新地址更新app
    gotoUpdate() {
        AsyncStorage.getItem('cacheDomain').then((response) => {
            let cacheDomain = JSON.parse(response)
            JXCodePushServerUrl = cacheDomain.hotfixDomains[0].domain
            let hotfixDeploymentKey = G_IS_IOS ? cacheDomain.hotfixDomains[0].iosDeploymentKey : cacheDomain.hotfixDomains[0].androidDeploymentKey;
            //  JXCodePushServerUrl ="http://192.168.11.120:3000"
            //   let hotfixDeploymentKey =G_IS_IOS ? "mOx5dmR7vyM1vto4yR5GuGlPGHOi4ksvOXqog":"k1EZHlHkZnQQpiJwz0Pbq0laaKDX4ksvOXqog";
            TW_Store.hotFixStore.currentDeployKey = hotfixDeploymentKey;
            this.hotFix(hotfixDeploymentKey)
        })
    }

    storeLog(message) {
        AsyncStorage.mergeItem('uploadLog', JSON.stringify(message))
    }

    uploadLog() {
        AsyncStorage.getItem('uploadLog').then((response) => {
            if (response != null) {
                // create.create().uploadLog('INFO', response).then((response) => {
                //     if (response.ok) {
                //         AsyncStorage.removeItem('uploadLog')
                //     }
                // })

            }
        })
    }

    codePushDownloadDidProgress(progress) {
        if (downloadTime === 0) {
            downloadTime = Moment().format('X')
        }
        this.hotFixStore.progress = progress;
    }

    hotFix(hotfixDeploymentKey) {
        this.setState({
            syncMessage: '检测更新中...',
            updateStatus: 0
        });
        CodePush.checkForUpdate(hotfixDeploymentKey).then((update) => {

            TW_Log('==checking update====hotfixDeploymentKey=='+hotfixDeploymentKey, update==null);
            if (update !== null) {
                // if (G_IS_IOS) {
                //     NativeModules.JDHelper.resetLoadModleForJS(true)
                // }
                TW_Log("checking update--start");
                this.hotFixStore.syncMessage = '获取到更新，正在疯狂加载...';
                this.hotFixStore.updateFinished = false;
                this.storeLog({hotfixDomainAccess: true});

                if (alreadyInCodePush) return
                alreadyInCodePush = true

                update.download(this.codePushDownloadDidProgress.bind(this)).then((localPackage) => {
                    alreadyInCodePush = false
                    if (localPackage) {
                        this.hotFixStore.syncMessage = '下载完成,开始安装';
                        this.hotFixStore.progress = false;
                        downloadTime = Moment().format('X') - downloadTime
                        this.storeLog({downloadStatus: true, downloadTime: downloadTime});
                        localPackage.install(CodePush.InstallMode.IMMEDIATE).then(() => {
                            this.storeLog({updateStatus: true})
                            CodePush.notifyAppReady().then(() => {
                                // this.setUpdateFinished()
                            })
                        }).catch((ms) => {
                            this.storeLog({updateStatus: false, message: '安装失败,请重试...'})
                            this.updateFail('安装失败,请重试...')
                        })
                    } else {
                        this.storeLog({downloadStatus: false, message: '下载失败,请重试...'})
                        this.updateFail('下载失败,请重试...')
                    }
                }).catch((ms) => {
                    alreadyInCodePush = false
                    this.storeLog({downloadStatus: false, message: '下载失败,请重试...'})
                    this.updateFail('下载失败,请重试...')
                })
            }
            else {
                this.hotFixStore.skipUpdate()
            }
        }).then(() => {
            setTimeout(() => {
                this.setState({
                    syncMessage: '正在加速更新中...',
                })
            }, 3000)
        }).then(() => { // here stop
            this.timer = setTimeout(() => {
                if (!this.hotFixStore.progress && !this.hotFixStore.updateFinished) {
                    this.storeLog({downloadStatus: false, message: '下载失败,请重试...'})
                    this.updateFail('下载失败,请重试...')
                }
            }, 10 * 1000)
        }).catch((ms, error) => {
            this.storeLog({hotfixDomainAccess: false, message: '更新失败,请重试...'})
            this.updateFail('更新失败,请重试...')
        })
    }

    updateFail=(message)=> {
        this.setState({
            syncMessage: message,
            updateStatus: -1
        })
        this.hotFixStore.syncMessage = message;
        this.hotFixStore.updateStatus = -1;
        this.uploadLog()
    }

    getLoadingView=()=> {
        let progressView
        if (this.hotFixStore.progress) {
            progressView = (
                <Text>
                    正在下载({parseFloat(this.hotFixStore.progress.receivedBytes / 1024 / 1024).toFixed(2)}M/{parseFloat(this.hotFixStore.progress.totalBytes / 1024 / 1024).toFixed(2)}M) {(parseFloat(this.hotFixStore.progress.receivedBytes / this.hotFixStore.progress.totalBytes).toFixed(2) * 100).toFixed(1)}%</Text>
            )
        } else {
            return (<View style={{flex: 1}}>
                <StatusBar
                    hidden={false}
                    animated={true}
                    translucent={true}
                    backgroundColor={'transparent'}
                    barStyle="light-content"/>
                <TopNavigationBar title={TW_Store.appInfoStore.appName} needBackButton={false}/>
                <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
                    <Text style={{fontSize: Size.font16}}>{this.hotFixStore.syncMessage}</Text>
                </View>
                <Text style={{
                    fontSize: Size.font13,
                    color: '#666666',
                    marginBottom: 10,
                    width: width,
                    textAlign: 'center'
                }}>{'版本号:' + TW_Store.appInfoStore.versionHotFix + '  ' + (G_IS_IOS? 'iOS' : '安卓') + ':' + TW_Store.appInfoStore.appVersion}</Text>
            </View>)
        }
        return (
            <View style={{flex: 1}}>
                <StatusBar
                    hidden={false}
                    animated={true}
                    translucent={true}
                    backgroundColor={'transparent'}
                    barStyle="light-content"/>
                <TopNavigationBar title={TW_Store.appInfoStore.appName} needBackButton={false}/>
                <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
                    {progressView}
                    <Progress.Bar
                        progress={(this.hotFixStore.progress.receivedBytes / this.hotFixStore.progress.totalBytes).toFixed(2)}
                        width={200}/>
                </View>
                <Text style={{
                    fontSize: 13,
                    color: '#666666',
                    marginBottom: 10,
                    width: width,
                    textAlign: 'center'
                }}>{'当前版本号:' + TW_Store.appInfoStore.versionHotFix}</Text>
            </View>
        )
    }

    updateFailView() {
        return (
            <View style={{flex: 1}}>
                <StatusBar
                    hidden={false}
                    animated={true}
                    translucent={true}
                    backgroundColor={'transparent'}
                    barStyle="light-content"/>
                <TopNavigationBar title={TW_Store.appInfoStore.appName} needBackButton={false}/>
                <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
                    <Text style={{
                        fontWeight: 'bold',
                        fontSize: Size.font16
                    }}> {this.hotFixStore.syncMessage}</Text>
                    <View>
                        <TouchableOpacity
                            onPress={() => {
                                retryTimes++
                                if (retryTimes >= 3) {
                                    this.hotFixStore.skipUpdate()
                                } else {
                                    this.initDomain()
                                }
                            }}
                            style={{
                                backgroundColor: '#3056b2',
                                justifyContent: 'center',
                                flexDirection: 'row',
                                height: 40,
                                alignItems: 'center',
                                borderRadius: 4,
                                padding: 10,
                                width: width * 0.6,
                                marginTop: 20
                            }}
                        >
                            <Text style={{
                                color: 'white',
                                fontWeight: 'bold',
                                fontSize: Size.font18
                            }}>
                                重试一下
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}



APP = CodePush({
    checkFrequency: CodePush.CheckFrequency.MANUAL,
    installMode: CodePush.InstallMode.IMMEDIATE
})(APP);

AppRegistry.registerComponent('BBL', () => APP);
