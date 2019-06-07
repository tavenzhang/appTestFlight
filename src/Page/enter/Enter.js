import React, {Component} from 'react';
import {
    AppRegistry,
    Text,
    View,
    Navigator,
    TouchableOpacity,
    AsyncStorage,
    AppState, StatusBar,
    NativeModules
} from 'react-native';

import Moment from 'moment'
import CodePush from 'react-native-code-push'
import * as Progress from 'react-native-progress';
import {observer} from 'mobx-react'
import Storage from '../../Common/Global/TCStorage'
import G_Config from '../../Common/Global/G_Config'
import App from '../Route/App';
import Orientation from 'react-native-orientation';
import TopNavigationBar from '../../Common/View/TCNavigationBar';

import {width, Size} from '../asset/game/themeComponet'
import StartUpHelper from './StartUpHelper'
import KeepAwake from 'react-native-keep-awake';
import ExtraDimensions from 'react-native-extra-dimensions-android';

let retryTimes = 0
let downloadTime = 0
let alreadyInCodePush = false
import JXDomainsHelper from "../../Common/JXHelper/JXDomainsHelper";
import {AppConfig} from "../../config/appConfig";
import {JX_PLAT_INFO} from "../asset";
let domainsHelper = new JXDomainsHelper();
let appInfoStore = TW_Store.appStore;
@observer
export default class Enter extends Component {

    constructor() {
        super();
        this.hotFixStore=TW_Store.hotFixStore;
        this.handleAppStateChange = this.handleAppStateChange.bind(this);
        this.initDomain=this.initDomain.bind(this);
        TW_Store.appStore.regCallInitFuc(this.onInitAllData);
        this.flage = false
    }

    componentWillMount(){

        if(NativeModules.KCKeepAwake&&KeepAwake.activate){
            TW_Store.appStore.keepAwake=true;
            KeepAwake.activate();
        }
        //如果是android 在某些机器获取不到真实的SCREEN_H SCREEN_W 需要如下处理
        try {
            if (NativeModules.ExtraDimensions) {
                // TW_Log("ExtraDimensions--getRealWindowHeight--"  + ExtraDimensions.getRealWindowHeight(),SCREEN_H)
                // TW_Log("ExtraDimensions--getRealWindowWidth--"  + ExtraDimensions.getRealWindowWidth(),SCREEN_W)
                // TW_Log("ExtraDimensions--getSoftMenuBarHeight--"  + ExtraDimensions.getSoftMenuBarHeight())
                // TW_Log("ExtraDimensions--getSmartBarHeight--"  + ExtraDimensions.getSmartBarHeight())
                // TW_Log("ExtraDimensions--isSoftMenuBarEnabled--"  + ExtraDimensions.isSoftMenuBarEnabled())
                 let rH = ExtraDimensions.getRealWindowHeight();
                 let rW = ExtraDimensions.getRealWindowWidth();
                 JX_PLAT_INFO.SCREEN_H= SCREEN_H = rH && rH > 0 ? rH : SCREEN_H;
                 JX_PLAT_INFO.SCREEN_W= SCREEN_W = rW && rW > 0 ? rW : SCREEN_W;
                 TW_Store.appStore.screenW=rW;
            }
        } catch (e) {
            TW_Store.dataStore.log+="\nExtraDimensions--error"+e;
        }

        AppState.addEventListener('change',this._handleAppStateChange);
    }


    _handleAppStateChange = (nextAppState)=>{
        if (nextAppState!= null && nextAppState === 'active') {
          if (this.flage) {
              if(TW_OnValueJSHome){
                  TW_OnValueJSHome(TW_Store.bblStore.getWebAction(TW_Store.bblStore.ACT_ENUM.lifecycle,{data:1}));
                  TW_Store.dataStore.onFlushGameData();
              }
              if(!TW_Store.gameUpateStore.isInSubGame){
                  let now = new Date().getTime();
                  let dim = now - this.lastClickTime
                  TW_Log("lastClickTime----"+this.lastClickTime+"---dim",dim)
                  if (dim >= 180000) { //从后台进入前台间隔大于1分钟 才进行大厅与app 更新检测
                      this.hotFix(TW_Store.hotFixStore.currentDeployKey,true);
                      TW_Store.dataStore.loadHomeVerson();
                  }
              }
            }
            this.flage = false ;
        }else if(nextAppState != null && nextAppState === 'background'){
            this.flage = true;
            let now = new Date().getTime();
            this.lastClickTime = now;
        }
    }


    onInitAllData=()=>{
        this.initData();
        this.uploadLog();
        this.timer2 = setTimeout(() => {
            if (this.hotFixStore.syncMessage === '检测更新中...' || this.hotFixStore.syncMessage === '初始化配置中...') {
                this.hotFixStore.skipUpdate();
                this.reloadAppDomain();
            }
        }, 7 * 1000)

        if(G_IS_IOS){
            if(Orientation&&Orientation.lockToLandscapeRight){
                Orientation.lockToLandscapeRight();
            }
            this.initDomain();
        }else{
            appInfoStore.checkAndroidsubType(this.initDomain);
        }

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
                },2 * 1000)
                this.setState({
                    updateFinished: false,
                    syncMessage: "初始化配置中...",
                    updateStatus: 0,
                })
            }else {
                TW_SplashScreen_HIDE();
                TW_Store.gameUpateStore.isNeedUpdate=false;
            }
        })
    }


    handleAppStateChange=(nextAppState)=> {
        if (nextAppState === 'active' && this.hotFixStore.allowUpdate) {
            if (TW_Store.hotFixStore.currentDeployKey) {
                this.hotFix(TW_Store.hotFixStore.currentDeployKey);
            }
        }
    }

    componentWillUnmount() {
        this.timer && clearTimeout(this.timer)
        this.timer2 && clearTimeout(this.timer2)
        AppState.removeEventListener('change', this.handleAppStateChange);
        Orientation&&this.orientationDidChange&&Orientation.removeOrientationListener(this.orientationDidChange);

    }

    render() {
        let checkView =null
        if (!this.hotFixStore.updateFinished && this.hotFixStore.updateStatus === 0) {
            checkView =this.getLoadingView();
        } else if (!this.hotFixStore.updateFinished && this.hotFixStore.updateStatus === -1) {
            //checkView =this.updateFailView()
            checkView = null
        }

        // else {
        //     return (<App/>);
        // }
        return (<View style={{flex:1}}>
                      <App/>
                     {checkView}
              </View>)
    }



    initDomain() {
        TW_Store.dataStore.initAppHomeCheck();
        //如果不是处于android 特殊检测开关 强制开启this.hotFixStore.allowUpdate 开关
        if(!TW_Store.appStore.isInAnroidHack) {
            if(!this.hotFixStore.allowUpdate){
                this.hotFixStore.allowUpdate=true;
            }
        }
        AsyncStorage.getItem('cacheDomain').then((response) => {
            TW_Log("refresh cache domain ", response);
            let cacheDomain = response ? JSON.parse(response) : null
            if (cacheDomain != null && cacheDomain.serverDomains && cacheDomain.serverDomains.length > 0) {//缓存存在，使用缓存访问
                StartUpHelper.getAvailableDomain(cacheDomain.serverDomains, this.cacheAttempt)
            } else {//缓存不存在，使用默认地址访问
                StartUpHelper.getAvailableDomain(AppConfig.domains, this.cacheAttempt)
            }
        }).catch((error) => {
            StartUpHelper.getAvailableDomain(AppConfig.domains, this.cacheAttempt)
        })
    }

    initData() {
        TW_Store.appStore.currentDomain = AppConfig.domains[0];
    }

    //使用默认地址
    firstAttempt(success, allowUpdate, message) {
        TW_Log(`first attempt ${success}, ${allowUpdate}, ${message}`);
        if (success && allowUpdate && this.hotFixStore.allowUpdate) {
            this.gotoUpdate()
        } else if (!success && this.hotFixStore.allowUpdate) {//默认地址不可用，使用备份地址
            StartUpHelper.getAvailableDomain(AppConfig.backupDomains, this.secondAttempt)
        } else {//不允许更新
            this.hotFixStore.skipUpdate();
        }
    }

    //使用默认备份地址
    secondAttempt=(success, allowUpdate, message)=> {
        if (success && allowUpdate && this.hotFixStore.allowUpdate) {
            this.gotoUpdate()
        } else if (!success && this.hotFixStore.allowUpdate) {//备份地址不可用
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
            // TODO 审核通过之后 放开如下，告知ip不在更新范围内的用户11
            // TODO 审核通过之后 放开如下，告知ip不在更新范围内的用户11
            // alert('您当前的区域无法更新')
            this.hotFixStore.skipUpdate()
        }
    }

    //使用缓存地址
    cacheAttempt=(success, allowUpdate, message)=> {
        TW_Log(`first attempt ${success}, ${allowUpdate}, ${message}`);
        if (success && allowUpdate && this.hotFixStore.allowUpdate) {
            this.gotoUpdate();
        } else if (!success && this.hotFixStore.allowUpdate) {//缓存地址不可用,使用默认地址
            StartUpHelper.getAvailableDomain(AppConfig.domains, (success, allowUpdate, message) => this.firstAttempt(success, allowUpdate, message));
        } else {
            this.hotFixStore.skipUpdate();
        }
    }

    //使用从服务器获取的更新地址更新app
    gotoUpdate() {
        if(TW_IS_DEBIG){
            this.hotFixStore.skipUpdate();
            return
        }
        AsyncStorage.getItem('cacheDomain').then((response) => {

            let cacheDomain = JSON.parse(response)
            JXCodePushServerUrl = cacheDomain.hotfixDomains[0].domain
            let hotfixDeploymentKey = G_IS_IOS ? cacheDomain.hotfixDomains[0].iosDeploymentKey : cacheDomain.hotfixDomains[0].androidDeploymentKey;
            // JXCodePushServerUrl ="http://192.168.14.70:3000"
            // let hotfixDeploymentKey =G_IS_IOS ? "mOx5dmR7vyM1vto4yR5GuGlPGHOi4ksvOXqog":"k1EZHlHkZnQQpiJwz0Pbq0laaKDX4ksvOXqog";
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
        if(!this.hotFixStore.isNextAffect){
            this.hotFixStore.progress = progress;
            TW_Store.gameUpateStore.isNeedUpdate=true;
            TW_Store.gameUpateStore.isAppDownIng=true;
        }
    }

    hotFix(hotfixDeploymentKey,isActiveCheck=false) {
        this.setState({
            syncMessage: '检测更新中....',
            updateStatus: 0

        });
        if(!TW_Store.dataStore.isAppInited){
            //如果是第一次启动app  并且游戏资源拷贝到document 还未完成，5秒后进行重新热更新检测 直接退出函数
            this.hotFixStore.syncMessage = 'app大厅初始化...'; //防止进入reloadAppDomain
            setTimeout(()=>{
                this.hotFix(TW_Store.hotFixStore.currentDeployKey);
            },5000);
            return ;
        }
        // if(TW_Store.gameUpateStore.isCodePushChecking){
        //     setTimeout(()=>{
        //         TW_Store.gameUpateStore.isCodePushChecking = false;
        //     })
        // }
        CodePush.checkForUpdate(hotfixDeploymentKey).then((update) => {
            TW_Log('==checking update=d===hotfixDeploymentKey= ='+hotfixDeploymentKey, update);
            if (update !== null) {
                this.hotFixStore.syncMessage = 'app更新，正在疯狂加载...';
                let versionData =null;
                try {
                    //{"jsVersion":5.23,"isWeakUpate":true}
                    versionData = JSON.parse(update.description);
                }catch (e) {
                    versionData = null;
                }
                if(versionData){
                    if(versionData.isWeakUpate){
                        this.hotFixStore.isNextAffect = versionData.jsVersion==appInfoStore.versionHotFix;
                    }else{
                        this.hotFixStore.isNextAffect =false;
                    }
                }
                if(!isActiveCheck){ //如果是app启动进入热更新检测 并且游戏已经进入大厅，则不使用强制更新提示，下次启动生效
                    if(TW_Store.gameUpateStore.isEnteredGame){
                        this.hotFixStore.isNextAffect =true;
                    }
                }
                TW_Log('==checkingupdate====hotfixDeploymentKey= versionData='+(versionData==null), versionData);
                this.hotFixStore.updateFinished = false;
                this.storeLog({hotfixDomainAccess: true});
                if (alreadyInCodePush) return
                alreadyInCodePush = true
                let updateMode =  this.hotFixStore.isNextAffect ? CodePush.InstallMode.ON_NEXT_RESTART:CodePush.InstallMode.IMMEDIATE;
                update.download(this.codePushDownloadDidProgress.bind(this)).then((localPackage) => {
                    alreadyInCodePush = false;
                    if (localPackage) {
                        this.hotFixStore.syncMessage = '下载完成,开始安装';
                        this.hotFixStore.progress = false;
                        downloadTime = Moment().format('X') - downloadTime
                        this.storeLog({downloadStatus: true, downloadTime: downloadTime});
                        localPackage.install(updateMode).then(() => {
                            this.storeLog({updateStatus: true});
                            //如果正在下载大厅文件，关闭大厅当前的下载
                            if(updateMode==CodePush.InstallMode.IMMEDIATE){
                                TW_Store.dataStore.clearCurrentDownJob();
                            }
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
                }).finally(()=>{
                    //TW_Store.gameUpateStore.isNeedUpdate=false;
                    TW_Store.gameUpateStore.isAppDownIng=false;
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
                <Text style={{color:"#ffcc33",marginVertical:10}}>
                    正在下载({parseFloat(this.hotFixStore.progress.receivedBytes / 1024 / 1024).toFixed(2)}M/{parseFloat(this.hotFixStore.progress.totalBytes / 1024 / 1024).toFixed(2)}M) {(parseFloat(this.hotFixStore.progress.receivedBytes / this.hotFixStore.progress.totalBytes).toFixed(2) * 100).toFixed(1)}%</Text>
            )
        } else {
            return null;
        }
        return (
                <View pointerEvents={"none"} style={{justifyContent: 'center',
                    alignItems: 'center', width: JX_PLAT_INFO.SCREEN_W,height:JX_PLAT_INFO.SCREEN_H, flex: 1,position:"absolute",
                    }}>
                    <View style={{backgroundColor:"rgba(10,10,10,0.5)", paddingHorizontal:60, paddingVertical:15,
                        borderRadius: 10}}>
                        <View style={{}}>
                            <Text style={{fontSize: Size.font16,color:"#99ffff", fontWeight:"bold"}}>{this.hotFixStore.syncMessage}</Text>
                        </View>

                    {progressView}
                    <Progress.Bar
                        color={"#ffcc33"}
                        progress={(this.hotFixStore.progress.receivedBytes / this.hotFixStore.progress.totalBytes).toFixed(2)}
                        width={200}/>
                    </View>
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
                <TopNavigationBar title={TW_Store.appStore.appName} needBackButton={false}/>
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



Enter = CodePush({
    checkFrequency: CodePush.CheckFrequency.MANUAL,
    installMode: CodePush.InstallMode.IMMEDIATE
})(Enter);

AppRegistry.registerComponent('BBL', () => Enter);
