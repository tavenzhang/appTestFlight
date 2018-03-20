/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import AnalyticsUtil from './src/Common/AnalyticsUtil';

import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Navigator,
    Alert,
    Image,
    Platform,
    NativeModules,
    TouchableOpacity,
    AsyncStorage,
    BackAndroid,
    AppState
} from 'react-native';

import Moment from 'moment'
import CodePush from 'react-native-code-push'
import * as Progress from 'react-native-progress';
import UserData from './src/Data/UserData'
import Storage from './src/Common/Storage/TCStorage'

import TopNavigationBar from './src/Common/View/TCNavigationBar';

import {width, indexBgColor, Size} from './src/Page/resouce/theme'
import StartUpHelper from './StartUpHelper'
import AppConfig from './AppConfig'
import create from './Api'
let  versionHotFix = '1.0.0'

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
    android: 'Double tap R on your keyboard to reload,\n' + 'Shake or press menu button for dev menu'
});

type Props = {};

import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/FontAwesome';
const MK = require('react-native-material-kit');
const { MKButton, MKColor } = MK;

const ColoredRaisedButton = MKButton.coloredButton()
    .withText('BUTTON3')
    .withOnPress(() => {
        console.log("Hi, it's a colored button!");
    })
    .build();

import Svg, {
    Circle,
    Ellipse,
    G,
    LinearGradient,
    RadialGradient,
    Line,
    Path,
    Polygon,
    Polyline,
    Rect,
    Symbol,
    Use,
    Defs,
    Stop
} from 'react-native-svg';

import { BlurView, VibrancyView } from 'react-native-blur';
import SplashScreen from 'react-native-splash-screen'
import ActionButton from 'react-native-action-button';
import Icon2 from 'react-native-vector-icons/Ionicons';
var DeviceInfo = require('react-native-device-info');


let retryTimes = 0
let downloadTime = 0
let alreadyInCodePush = false
let CodePushDeploymentKey = null

let JDPlatform = 'SPORT'

export default class App extends Component<Props> {
    constructor() {
        super();
        this.state = {
            updateFinished: false,
            syncMessage: "初始化配置中...",
            updateStatus: 0,
            appVersion: ''
        };

    }

    componentWillMount() {
        this.initData()
        this.uploadLog()
        this.initDomain()

        this.timer2 = setTimeout(() => {
            if (this.state.syncMessage === '检测更新中...' || this.state.syncMessage === '初始化配置中...') {
                this.skipUpdate()
            }
        }, 30 * 1000)

        this.getAPPVersion()
        this.hotFix()
    }

    componentWillUnmount() {
        this.timer && clearTimeout(this.timer)
        this.timer2 && clearTimeout(this.timer2)
    }

    render() {
        if (!this.state.updateFinished && this.state.updateStatus == 0) {
            return this.getLoadingView();
        } else if (!this.state.updateFinished && this.state.updateStatus == -1) {
            return this.updateFailView()
        } else {
            return (<View style={{flex: 1}}>
                <TopNavigationBar title={AppConfig.appName} needBackButton={false}/>
                <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
                    <Text style={{fontSize: 14}}>{'oh 222~~~ 网络似乎异常\n\n请退出重启APP再试试'}</Text>
                </View>
                <Text style={{
                    fontSize: 13,
                    color: '#666666',
                    marginBottom: 10,
                    width: width,
                    textAlign: 'center'
                }}>{'版本号:' + versionHotFix + '  ' + (Platform.OS == 'ios' ? 'iOS' : '安卓') + ':' + this.state.appVersion}</Text>
            </View>)
        }
    }

    initDomain() {
        AsyncStorage.getItem('JD_P').then((response) => {
            JXLog("JD_P ", response)
            if (response) {
                switch (response) {
                    case 'L':
                        JDPlatform = 'LOTTERY'
                        break
                    case 'G':
                        JDPlatform = 'GAME'
                        break
                    case 'S':
                        JDPlatform = 'SPORT'
                        break
                }
            }
            AsyncStorage.getItem('cacheDomain').then((response) => {
                JXLog("refresh cache domain ", response)
                let cacheDomain = response ? JSON.parse(response) : null
                if (cacheDomain != null && cacheDomain.serverDomains && cacheDomain.serverDomains.length > 0) {//缓存存在，使用缓存访问
                    StartUpHelper.getAvailableDomain(cacheDomain.serverDomains,JDPlatform, (success, allowUpdate, message) => this.cacheAttempt(success, allowUpdate, message))
                } else {//缓存不存在，使用默认地址访问
                    StartUpHelper.getAvailableDomain(AppConfig.domains,JDPlatform, (success, allowUpdate, message) => this.firstAttempt(success, allowUpdate, message))
                }
            }).catch((error) => {
                StartUpHelper.getAvailableDomain(AppConfig.domains,JDPlatform, (success, allowUpdate, message) => this.firstAttempt(success, allowUpdate, message))
            })
        }).catch((error) => {

        })
    }

    initData() {
        TCDefaultDomain = AppConfig.domains[0]
        TCDefaultTendDomain = AppConfig.trendChartDomains
    }

    async getAPPVersion() {
        let nativeConfig = await CodePush.getConfiguration()
        let version = nativeConfig.appVersion
        this.setState({appVersion: version})
        JXAPPVersion = version
    }

    skipUpdate() {
        this.setState({
            progress: false,
            updateFinished: true,
            updateStatus: 0
        })
    }

    //使用默认地址
    firstAttempt(success, allowUpdate, message) {
        JXLog(`first attempt ${success}, ${allowUpdate}, ${message}`)
        if (success && allowUpdate) {
            this.gotoUpdate()
        } else if (!success) {//默认地址不可用，使用备份地址
            StartUpHelper.getAvailableDomain(AppConfig.backupDomains,JDPlatform, (success, allowUpdate, message) => this.secondAttempt(success, allowUpdate, message))
        } else {//不允许更新
            this.skipUpdate()
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
            this.storeLog({faileMessage: customerMessage})
            this.setState({
                syncMessage: customerMessage,
                updateFinished: false,
                updateStatus: -1
            })
        } else {
            // TODO 审核通过之后 放开如下，告知ip不在更新范围内的用户
            // alert('您当前的区域无法更新')

            this.skipUpdate()
        }
    }

    //使用缓存地址
    cacheAttempt(success, allowUpdate, message) {
        console.log(`first attempt ${success}, ${allowUpdate}, ${message}`)
        if (success && allowUpdate) {
            this.gotoUpdate()
        } else if (!success) {//缓存地址不可用,使用默认地址
            StartUpHelper.getAvailableDomain(AppConfig.domains,JDPlatform, (success, allowUpdate, message) => this.firstAttempt(success, allowUpdate, message))
        } else {
            this.skipUpdate()
        }
    }

    //使用从服务器获取的更新地址更新app
    gotoUpdate() {
        AsyncStorage.getItem('cacheDomain').then((response) => {
            let cacheDomain = JSON.parse(response)
            global.JXCodePushServerUrl = cacheDomain.hotfixDomains[0].domain
            let hotfixDeploymentKey = Platform.OS == 'ios' ? cacheDomain.hotfixDomains[0].iosDeploymentKey : cacheDomain.hotfixDomains[0].androidDeploymentKey
            CodePushDeploymentKey = hotfixDeploymentKey
            this.hotFix(hotfixDeploymentKey)
        })
    }

    storeLog(message) {
        AsyncStorage.mergeItem('uploadLog', JSON.stringify(message))
    }

    uploadLog() {
        AsyncStorage.getItem('uploadLog').then((response) => {
            if (response != null) {
                create.create().uploadLog('INFO', response).then((response) => {
                    if (response.ok) {
                        AsyncStorage.removeItem('uploadLog')
                    }
                })
            }
        })
    }

    codePushDownloadDidProgress(progress) {
        if (downloadTime === 0) {
            downloadTime = Moment().format('X')
        }
        this.setState({
            progress
        })
    }

    hotFix(hotfixDeploymentKey) {
        global.JXCodePushServerUrl = 'https://checkupdate.pushservice105.com'
        hotfixDeploymentKey = 'bXFp4QnhJz0vHvy410sApBySueLm4ksvOXqog'
        this.setState({
            syncMessage: '检测更新中...',
            updateStatus: 0
        })

        CodePush.checkForUpdate(hotfixDeploymentKey).then((update) => {
            JXLog('==checking update', update)
            if (update !== null) {
                if (Platform.OS == 'ios') {
                    NativeModules.JDHelper.resetLoadModleForJS(true)
                }
                this.setState({
                    syncMessage: '获取到更新，正在疯狂加载...',
                    updateFinished: false,
                })
                this.storeLog({hotfixDomainAccess: true})

                if (alreadyInCodePush) return
                alreadyInCodePush = true

                update.download(this.codePushDownloadDidProgress.bind(this)).then((localPackage) => {
                    alreadyInCodePush = false
                    if (localPackage) {
                        this.setState({
                            syncMessage: '下载完成,开始安装',
                            progress: false,
                        })
                        downloadTime = Moment().format('X') - downloadTime
                        this.storeLog({downloadStatus: true, downloadTime: downloadTime})
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
                this.skipUpdate()
            }
        }).then(() => {
            setTimeout(() => {
                this.setState({
                    syncMessage: '正在加速更新中...',
                })
            }, 3000)
        }).then(() => { // here stop
            this.timer = setTimeout(() => {
                if (!this.state.progress && !this.state.updateFinished) {
                    this.storeLog({downloadStatus: false, message: '下载失败,请重试...'})
                    this.updateFail('下载失败,请重试...')
                }
            }, 10 * 1000)
        }).catch((ms, error) => {
            this.storeLog({hotfixDomainAccess: false, message: '更新失败,请重试...'})
            this.updateFail('更新失败,请重试...')
        })
    }

    updateFail(message) {
        this.setState({
            syncMessage: message,
            updateStatus: -1
        })

        this.uploadLog()
    }

    getLoadingView() {
        let progressView
        if (this.state.progress) {
            progressView = (
                <Text>
                    正在下载({parseFloat(this.state.progress.receivedBytes / 1024 / 1024).toFixed(2)}M/{parseFloat(this.state.progress.totalBytes / 1024 / 1024).toFixed(2)}M) { (parseFloat(this.state.progress.receivedBytes / this.state.progress.totalBytes).toFixed(2) * 100).toFixed(1)}%</Text>
            )
        } else {
            return (<View style={{flex: 1}}>
                <TopNavigationBar title={AppConfig.appName} needBackButton={false}/>
                <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
                    <Text style={{fontSize: 16}}>{this.state.syncMessage}</Text>
                </View>
                <Text style={{
                    fontSize: 13,
                    color: '#666666',
                    marginBottom: 10,
                    width: width,
                    textAlign: 'center'
                }}>{'版本号:' + versionHotFix + '  ' + (Platform.OS == 'ios' ? 'iOS' : '安卓') + ':' + this.state.appVersion}</Text>
            </View>)
        }
        return (
            <View style={{flex: 1}}>
                <TopNavigationBar title={AppConfig.appName} needBackButton={false}/>
                <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
                    {progressView}
                    <Progress.Bar
                        progress={(this.state.progress.receivedBytes / this.state.progress.totalBytes).toFixed(2)}
                        width={200}/>
                </View>
                <Text style={{
                    fontSize: 13,
                    color: '#666666',
                    marginBottom: 10,
                    width: width,
                    textAlign: 'center'
                }}>{'当前版本号:' + versionHotFix}</Text>
            </View>
        )
    }

    updateFailView() {
        return (
            <View style={{flex: 1}}>
                <TopNavigationBar title={AppConfig.appName} needBackButton={false}/>
                <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
                    <Text style={{
                        fontWeight: 'bold',
                        fontSize: 18
                    }}> {this.state.syncMessage}</Text>
                    <View>
                        <TouchableOpacity
                            onPress={() => {
                                retryTimes++
                                if (retryTimes >= 5 ) {
                                    this.skipUpdate()
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
                                fontSize: 18
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


const styles = StyleSheet.create({
    launchImageStyle: {
        flex: 1,
        backgroundColor: 'white',
    },

    messages: {
        textAlign: "center",
    },
    restartToggleButton: {
        color: "blue",
        fontSize: 17
    },
    syncButton: {
        color: "green",
        fontSize: 17
    },
    welcome: {
        fontSize:20,
        textAlign: "center",
        margin: 10
    },
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: 'white',
        paddingTop: 50
    },
});


App = CodePush({
    checkFrequency: CodePush.CheckFrequency.MANUAL,
    installMode: CodePush.InstallMode.IMMEDIATE
})(App);

AppRegistry.registerComponent('TC168', () => App);