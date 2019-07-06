import React, {Component} from 'react';

import {
    StyleSheet,
    View,
    Keyboard,
    Clipboard
} from 'react-native';
import { WebView } from 'react-native-webview';

import {observer} from 'mobx-react';
import NetUitls from "../../Common/Network/TCRequestUitls";
import Toast from "../../Common/JXHelper/JXToast";
import FileTools from "../../Common/Global/FileTools";
import {G_LayoutAnimaton} from "../../Common/Global/G_LayoutAnimaton";
import Tools from "../../Common/View/Tools";
import TCUserOpenPayApp from "../UserCenter/UserPay/TCUserOpenPayApp";
import {SoundHelper} from "../../Common/JXHelper/SoundHelper";

const HTTP_GAME_LIST="/gamecenter/player/game/list";
const HTTP_ACCOUNT="/webapi/account/users/current";


@observer
export default class XXWebView extends Component {
    constructor(state) {
        super(state)
        this.state={
            isFail:false,
            updateList:[],
            sharedUrl: null,
            isShowSharebox: false,
            flash:1
        }
        this.loadQueue=[];
        this.isLoading=false;
        this.isShow=false;
        this.isShowKeyBoard=false
        this.rom=Math.random()*100000
    }

    componentWillMount(){
        TW_OnValueJSHome = this.onEvaleJS;
        TW_Store.bblStore.isLoading=true;
        TW_Store.bblStore.lastGameUrl="";
        TW_Data_Store.getItem(TW_DATA_KEY.gameList, (err, ret) => {
            TW_Log("(TW_DATA_KEY.gameList-FileTools--==err==" + err+"--ret---", ret);
            if (ret) {
               let res = JSON.parse(ret) ;
               if(res){
                   TW_Store.dataStore.appGameListM = res;
               }
            }
            this.onFlushGameData()
        });
       // TW_Log("(_keyboard-TW_DATA_KEY.gameList-FileTools--==G_IS_IOS== middle" + G_IS_IOS,Keyboard.addListener);
        if(G_IS_IOS){
            Keyboard.addListener('keyboardWillShow', this._keyboardDidShow);
            Keyboard.addListener('keyboardWillHide', this._keyboardDidHide);
        }else{
           // android 没有keyboardWillShow 与 keyboardWillHide
            Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
            Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
        }

    }



    componentWillUnmount(): void {
        if(G_IS_IOS){
            Keyboard.removeListener('keyboardWillShow', this._keyboardDidShow);
            Keyboard.removeListener('keyboardWillHide', this._keyboardDidHide);
        }else{
            Keyboard.removeListener('keyboardDidShow', this._keyboardDidShow);
            Keyboard.removeListener('keyboardDidHide', this._keyboardDidHide);
        }
    }

    componentWillUpdate(nextProps, nextState, nextContext: any): void {
        G_LayoutAnimaton.configureNext(G_LayoutAnimaton.easeNoCreate)
    }

    _keyboardDidShow=(event)=>{
       // TW_Log("( _keyboard---_keyboardDidShow" ,event);
        //TW_Log("( _keyboard---_keyboardDidShow--endCoordinates" ,event.endCoordinates);
        if(!this.isShowKeyBoard){
            this.isShowKeyBoard =true;
            if(this.refs.myView){
                TW_Log("( _keyboard---_keyboardDidShow--"+ this.refs.myView.setNativeProps , this.refs.myView);
                this.refs.myView.setNativeProps({style: {bottom:event.endCoordinates.height-120}});
            }
        }
    }

    _keyboardDidHide=(event)=>{
       // TW_Log("( _keyboard---_keyboardDidHide" ,event);
        if(this.isShowKeyBoard){
            this.isShowKeyBoard=false
            if(this.refs.myView){
                this.refs.myView.setNativeProps({style: {bottom:0}});
            }
            TW_OnValueJSHome(TW_Store.bblStore.getWebAction(TW_Store.bblStore.ACT_ENUM.onBlur,{}));
        }

    }

    onFinishGameList=(gameList)=>{
       // TW_Log("( _keyboard---onFinishGameList==" ,gameList);
       // TW_Log("( _keyboard---onFinishGameList==TW_Store.dataStore.appGameListM=" ,gameM);
        for (let item of gameList){
            for (let dataKey in TW_Store.dataStore.appGameListM){
                let temKey =dataKey;

                if(dataKey.indexOf("app_")>-1){
                     temKey = dataKey.replace("app_","");
                }
                if(item.url.indexOf(temKey)>-1){
                    TW_Store.dataStore.appGameListM[dataKey].alias=TW_Store.dataStore.appGameListM[dataKey].id=item.alias;
                    TW_Store.dataStore.appGameListM[dataKey].gameName=item.name
                    //TW_Log("( _keyboard---onFinishGameList==dataKey--"+dataKey, TW_Store.dataStore.appGameListM[dataKey]);
                }else{
                   // TW_Log("( _keyboard---onFinishGameList=note=dataKey--"+dataKey, TW_Store.dataStore.appGameListM[dataKey]);
                }
            }
        }
         this.onFlushGameData();
    }

    onFlushGameData=()=>{
        TW_Store.dataStore.onFlushGameData();
    }
    
    componentDidMount(): void {
        // 用于android 不需要点击默认播放声音
        // if(this.refs.myWebView.getSettings){
        //     this.refs.myWebView.getSettings().setMediaPlaybackRequiresUserGesture(false);
        // }
    }


    handleUrl = (url, data) => {
        TW_Log("(FileTools----.gameList-FileTools--handleUrl--url"+url, data);
        if(data){
            let index= url.indexOf("?");
            url = url.substr(index);
            if(data.bupdate){
                this.loadQueue.push(data);
                if(!this.isLoading){
                    this.startLoadGame()
                }
            }else{
                url = TW_Store.dataStore.getGameRootDir()+"/"+data.name+"/"  + url
            }

        }else{
            if (url && url.indexOf("../") > -1) {
                url = url.replace("../", "");
            }
            if(TW_Store.appStore.clindId=="31"){
                url = TW_Store.bblStore.loginDomain  + url
            }else{
                url = TW_Store.bblStore.gameDomain  + url
            }
        }
       
        return `${url}&app=${G_IS_IOS ? "ios":"android"}`;
    }



    startLoadGame=(gamedata=null)=>{
        if(gamedata){
            this.loadQueue.push(gamedata)
        }
        if(!this.isLoading){
            let downData=null;
            if(this.loadQueue.length>0){
                downData = this.loadQueue.shift();
            }

            if(downData){
                this.isLoading=true;
                // JXToast.showShortCenter(`${downData.name} 开始下载！`)
                let loadUrl = downData.source;
                if(loadUrl&&loadUrl.indexOf("http")>-1){
                    loadUrl= loadUrl;
                }else{
                    loadUrl = TW_Store.bblStore.gameDomain+"/"+downData.name+"/"  + downData.name;
                }
                TW_Log("(FileTools--startLoadGame--==this.state.updateList==item--this.loadQueue.length--loadUrl="+loadUrl , downData);
                FileTools.downloadFile(loadUrl,TW_Store.bblStore.tempGameZip,downData,this.onLoadZipFish,this.onLoadProgress);
            }
        }
    }
    
    onLoadProgress=(ret)=>{
        //{//             "gameId":30,        //游戏id-----可选//             "alias":"hhdz",     //游戏别名--------唯一标识，必填//             "percent":0.7       //当前下载进度
        //         }
        let data = TW_Store.dataStore.appGameListM[ret.param.name];
        let dataList=[]
        if(data){
            if(ret.percent<1){
                dataList.push({"alias":ret.param.id,percent:ret.percent})
            }
        }
        this.onEvaleJS(TW_Store.bblStore.getWebAction(TW_Store.bblStore.ACT_ENUM.updateProgress,{data:dataList}));
    }


    onLoadZipFish=(ret)=> {
        this.isLoading=false;
        TW_Log("FileTools----onLoadZipFish--ret===this.loadQueue.length=="+this.loadQueue.length,ret)
        if(ret.rs){
            TW_Store.commonBoxStore.isShow=false;
            let data = TW_Store.dataStore.appGameListM[ret.param.name];
            data.current_version=data.newVersion;
            data.bupdate =false;
            this.onEvaleJS(TW_Store.bblStore.getWebAction(TW_Store.bblStore.ACT_ENUM.updateProgress,{data:[{"alias":ret.param.id,percent:1}]}));
            this.onSaveGameData();
        }else{
            TW_Store.commonBoxStore.isShow=false;
        }
        this.startLoadGame();
    }

    onSaveGameData=()=>{
        TW_Log("FileTools------onSaveGameData===",TW_Store.dataStore.appGameListM);
        TW_Data_Store.setItem(TW_DATA_KEY.gameList,JSON.stringify(TW_Store.dataStore.appGameListM))
    }



    render() {
       // TW_Log("TW_DATA_KEY.gameList-FileTools--==err=flash=this.state.flash--isLoading="+TW_Store.gameUpateStore.isLoading+"---TW_Store.gameUpateStore.isOldHome"+TW_Store.gameUpateStore.isOldHome);
        let news=(TW_Store.gameUpateStore.isLoading&&!TW_Store.gameUpateStore.isOldHome)||!TW_Store.dataStore.isAppInited
        if(news){
                return null
        }


        TW_Log("TW_DATA_KEY.gameList-FileTools--=gameUpateStore=news=="+news+"getSettings==isAppInited="+TW_Store.dataStore.isAppInited)
        let {force} = this.props;
        let source = {
            file: TW_Store.dataStore.targetAppDir+ "/index.html",
            allowingReadAccessToURL: TW_Store.dataStore.targetAppDir,
            allowFileAccessFromFileURLs: TW_Store.dataStore.targetAppDir,
            param:"?app=true"
        };

        if (!G_IS_IOS) {
            source = {
                uri: TW_Store.dataStore.targetAppDir+"/index.html"+"?app=true",
            };
        }


        // if(TW_IS_DEBIG){
        //    // source =  require('./../../../android/app/src/main/assets/gamelobby/index.html');
        //    let uri="http://localhost:9999/android/app/src/main/assets/gamelobby/index.html?platform=ios&hash=7e5876ea5a240467db5670550b53411b&rm-"+this.rom
        //    source={uri}
        // }

        TW_Log("targetAppDir-33---MainBundlePath-TW_Store.dataStore.isAppInited-----"+TW_Store.dataStore.isAppInited,source);
        if(!TW_Store.dataStore.isAppInited){
            return null
        }
        let injectJs = `window.appData=${JSON.stringify({
            isApp: true,
            taven: "isOk",
            clientId: TW_Store.appStore.clindId,
            force: force ? "1" : "0",
            urlJSON: TW_Store.bblStore.getUriConfig(),
            isAndroidHack:TW_Store.appStore.isInAnroidHack,
            deviceToken:TW_Store.appStore.deviceToken,
            loginDomain:TW_Store.bblStore.loginDomain+"/api/v1/account",
            gameDomain:TW_Store.bblStore.gameDomain+"/api/v1/gamecenter",
            affCode:TW_Store.appStore.userAffCode,
            isDebug:TW_IS_DEBIG,
            appVersion:TW_Store.appStore.versionHotFix,
            isAppSound:TW_Store.dataStore.isAppSound
        })},(function() {
  window.postMessage = function(data) {
    window.ReactNativeWebView.postMessage(data);
  };
})()`;
       // TW_Log("targetAppDir-33---isWechatEnabled-his.state--"+(sharedUrl&&isShowSharebox)+"--sharedUrl=="+sharedUrl+"-isShowSharebox-"+isShowSharebox,this.state);
        return (
            <View style={styles.container}>
                {
                    G_IS_IOS ? <WebView ref="myWebView"
                                        originWhitelist={['*']}
                                        source={source}
                                          onNavigationStateChange={this.onNavigationStateChange}
                                          onLoadStart={this.onShouldStartLoadWithRequest}
                                          style={styles.webView}
                                          allowFileAccess={true}
                                          startInLoadingState={false}
                                          onError={this.onError}
                                          domStorageEnabled={true}
                                          mediaPlaybackRequiresUserAction={false}
                                          thirdPartyCookiesEnabled={true}
                                          // renderLoading={this.onRenderLoadingView}
                                          javaScriptEnabled={true}
                                          injectedJavaScript={injectJs}
                                          onMessage={this.onMessage}
                                          onLoadEnd={this.onLoadEnd}

                        /> :
                        <View style={styles.webView}  ref="myView"   collapsable={false}>
                            <WebView
                                collapsable={false}
                                originWhitelist={['*']}
                                ref="myWebView"
                                automaticallyAdjustContentInsets={true}
                                style={[styles.webView]}
                                source={source}
                                mediaPlaybackRequiresUserAction={false}
                                injectedJavaScript={injectJs}
                                javaScriptEnabled={true}
                                domStorageEnabled={true}
                                decelerationRate="normal"
                                thirdPartyCookiesEnabled={true}
                                // startInLoadingState={true}
                                // renderLoading={this.onRenderLoadingView}
                                onNavigationStateChange={this.onNavigationStateChange}
                                allowFileAccess={true}
                                onError={this.onError}
                                onMessage={this.onMessage}
                                onLoadEnd={this.onLoadEnd}
                            />
                        </View>
                }
            </View>
        );
    }


    onMessage = (event) => {
        let message = JSON.parse(event.nativeEvent.data);
        this.onMsgHandle(message);
    }
    
    onMsgHandle = (message) => {
        TW_Log("onMessage======XXWebView=====>>" + this.constructor.name + "\n", message);
        let url = "";
        let gameData=null;
        let  retList= null;
        let gameM=null;

        if (message && message.action) {
            switch (message.action) {
                case "Log":
                    // TW_Log("game---ct=="+message.ct,message.data);
                    break;
                case "game_common":
                    let actions = message.name||message.do
                    switch (actions) {
                        case "saveToPhone":
                            Tools.onSaveScreenPhone();
                            break;
                        case "loginout":
                            TW_Store.userStore.exitAppToLoginPage();
                            break;
                        case "openWeb":
                            TCUserOpenPayApp.linkingWeb(message.param)
                            break;
                        case "onGameInit":
                            if (this.timeId) {
                                clearTimeout(this.timeId);
                            }
                            this.timeId = setTimeout(() => {
                                if (TW_Store.gameUpateStore.isNeedUpdate && TW_Store.gameUpateStore.isTempExist) {
                                    TW_Store.gameUpateStore.isNeedUpdate = false;
                                    TW_Store.gameUpateStore.isTempExist = false;
                                    TW_Store.gameUpateStore.isOldHome = false;
                                }
                            }, 1000)

                            break;
                        case "share":
                            //this.setState({sharedUrl: message.param, isShowSharebox: true});
                            TW_Store.gameUIStroe.shareData = message.param;
                            TW_Store.gameUIStroe.isShowShare = true;
                            break;
                        case "copylink":
                            Clipboard.setString(message.param);
                            if (message.hint && message.hint.length > 0) {
                                Toast.showShortCenter(message.hint);
                            } else {
                                Toast.showShortCenter("已复制链接!");
                            }
                            break;
                        case "openDebug":
                            this.onEvaleJS(TW_Store.bblStore.getWebAction(TW_Store.bblStore.ACT_ENUM.openDebug, {}));
                            break;
                        case  "saveImage":
                            FileTools.onSaveCameraRoll(message.param);
                            break;
                        case "playBgMusic":
                            TW_Data_Store.setItem(TW_DATA_KEY.BG_MUSIC, message.param ? "1":"0" ,(err)=>{
                                TW_Log("playBgMusic---TW_DATA_KEY.AFF_CODE-err---"+message.param, err)
                            });
                            if(message.param){
                                SoundHelper.playMusic();
                            }else{
                                SoundHelper.pauseMusic();
                            }
                            break;
                    }
                    break;
                case "startUpdate":
                    //{action: "startUpdate", gameId: 28, alias: "xywz"}
                    gameM =  TW_Store.dataStore.appGameListM;
                    retList=[];
                    for (let dataKey in gameM){
                        if(gameM[dataKey].id==message.alias){
                            retList.push(gameM[dataKey]);
                        }
                    }
                    if(retList.length>1){
                        for(let item of retList){
                            if(item.name&&item.name.indexOf("app")>-1){
                                gameData =  item;
                                break;
                            }
                        }
                    }else {
                        gameData = retList[0]
                    }
                    if(gameData){
                        if(gameData.bupdate) {
                            this.startLoadGame(gameData);
                         }
                        }
                    break;
                case "JumpGame":
                    let data =JSON.parse(TW_Base64.decode(this.getJumpData(message.payload)));
                    retList=[];
                    gameM = TW_Store.dataStore.appGameListM;
                    let gameData =null
                    for (let gameKey in gameM){
                        if(gameM[gameKey].id==data.alias){
                            retList.push( gameM[gameKey])
                        }
                    }
                    if(retList.length>1){
                        for(let item of retList){
                            if(item.name&&item.name.indexOf("app")>-1){
                                gameData =  item;
                                break;
                            }
                        }
                    }else {
                        gameData = retList[0]
                    }
                    let isNeedLoad=false;
                    let isOrigan =false;
                    if(!gameData){
                       // JXToast.showShortCenter(`${data.name} 暂未配置！`)
                        url = this.handleUrl(message.payload,gameData);
                        isOrigan=true
                    }else {
                        isNeedLoad = gameData ? gameData.bupdate:isNeedLoad;
                        url = this.handleUrl(message.payload,gameData);
                    }

                    TW_Log("FileTools---------data--isNeedLoad==-url=="+url+"----isNeedLoad===--"+isNeedLoad+"-----------gameData==",data);
                    if (!isNeedLoad&&TW_Store.bblStore.lastGameUrl!=url) {
                        TW_Store.bblStore.lastGameUrl = url;
                        TW_Store.bblStore.jumpData=this.getJumpData(message.payload);
                        TW_Store.bblStore.showGameCircle();
                        TW_Store.bblStore.subGameParams = {
                            url,
                            onMsgHandle: this.onMsgHandle,
                            onEvaleJS: this.onEvaleJS,
                            isGame: true,
                            isOrigan
                        }
                    }
                    break;
                case  "game_account":
                    TW_Store.gameUIStroe.isShowUserInfo =!TW_Store.gameUIStroe.isShowUserInfo;
                    break;
                case "showGame":
                    if(TW_Store.gameUpateStore.isTempExist){
                        TW_Store.gameUpateStore.isNeedUpdate=false;
                        TW_Store.gameUpateStore.isTempExist=false;
                        TW_Store.gameUpateStore.isOldHome=false
                    }
                    TW_Store.gameUpateStore.isEnteredGame=true;
                    setTimeout(()=>{
                        if(TW_Store.dataStore.isAppSound){
                            this.onEvaleJS(TW_Store.bblStore.getWebAction(TW_Store.bblStore.ACT_ENUM.stopMusic));
                        }
                    },2000)

                    break;
                case  "game_custom":
                    TW_Store.gameUIStroe.showGusetView(!TW_Store.gameUIStroe.isShowGuest)
                   // TW_Store.gameUIStroe.isShowShare=!TW_Store.gameUIStroe.isShowShare
                    break;
                case  "game_share":
                     TW_Store.gameUIStroe.isShowShare=!TW_Store.gameUIStroe.isShowShare
                    break;
                case "game_redraw":
                    TW_Log("onMessage----custom---exitAppToLoginPage")
                    TW_Store.gameUIStroe.isShowWithDraw=!TW_Store.gameUIStroe.isShowWithDraw;
                    break;
                case "game_back":
                    TW_Log("custom---exitAppToLoginPage")
                    TW_Store.userStore.exitAppToLoginPage();
                    this.onEvaleJS(TW_Store.bblStore.getWebAction(TW_Store.bblStore.ACT_ENUM.logout));
                    break;
                case "game_recharge":
                    TW_Store.gameUIStroe.isShowAddPayView =!TW_Store.gameUIStroe.isShowAddPayView;
                    break;
                case  "debugInfo":
                    let name = message.name ? message.name : "";
                    name = name.toLowerCase();
                    if (name == "111" && message.pwd == "222") {
                        TW_Store.bblStore.changeShowDebug(true);
                    }
                    break;
                case "http":
                    let method = message.metod;
                    method = method ? method.toLowerCase() : "get";
                    switch (method) {
                        case "post":
                            let myUrl = message.url;
                            NetUitls.postUrlAndParamsAndCallback(myUrl,JSON.parse(message.data), (ret) => {
                                //TW_Log("---home--http---game--postUrlAndParamsAndCallback>url="+message.url, ret);
                                this.onEvaleJS(TW_Store.bblStore.getWebAction(TW_Store.bblStore.ACT_ENUM.http,{hashUrl:message.hashUrl,...ret}));
                            },10,false,false,null,true,this.onParamHead(message.header))
                            break
                        case "get":
                            NetUitls.getUrlAndParamsAndCallback(message.url, JSON.parse(message.data), (ret) => {
                                this.onEvaleJS( TW_Store.bblStore.getWebAction(TW_Store.bblStore.ACT_ENUM.http,{hashUrl:message.hashUrl,...ret}));
                                let access_token =TW_GetQueryString("access_token",message.url);
                                if(ret.rs&&access_token&&access_token!=""){
                                    TW_Store.userStore.initLoginToken(access_token);
                                   // this.onFlushGameData();
                                }
                                if(message.url.indexOf("/api/v1/gamecenter/player/user")>-1){
                                    TW_Store.bblStore.avatarData =ret.content
                                }
                                if(message.url.indexOf(HTTP_GAME_LIST)>-1){
                                    if(ret.rs){
                                        this.onFinishGameList(ret.content.datas)
                                    }
                                }
                                if(message.url.indexOf(HTTP_ACCOUNT)>-1){
                                    if(ret.rs){
                                        TW_Store.userStore.saveUserInfo(ret.content)
                                    }
                                }

                            },10,false,false,true,this.onParamHead(message.header));
                            break;
                        case "put":
                            NetUitls.putUrlAndParamsAndCallback(message.url, JSON.parse(message.data), (ret) => {
                                this.onEvaleJS( TW_Store.bblStore.getWebAction(TW_Store.bblStore.ACT_ENUM.http,{hashUrl:message.hashUrl,...ret}));
                            },10,false,true,this.onParamHead(message.header));
                            break;
                        case "delete":
                            NetUitls.deleteUrlAndParamsAndCallback(message.url, JSON.parse(message.data), (ret) => {
                                this.onEvaleJS( TW_Store.bblStore.getWebAction(TW_Store.bblStore.ACT_ENUM.http,{hashUrl:message.hashUrl,...ret}));
                            },10,false,true,this.onParamHead(message.header));
                            break;
                    }
            }
        }
    }

    onParamHead=(headDataList)=>{
        let header = null;
        if(headDataList&&headDataList.length>0){
            header={}
            for(let i=0;i<headDataList.length;i++){
                if(i%2==0&&headDataList[i+1]){
                    header[`${headDataList[i]}`]=headDataList[i+1];
                }
            }
            TW_Log("onParamHead----"+headDataList.length,header)
        }
        return header
    }


    onLoadEnd=()=>{
        TW_Store.bblStore.isLoading=false;
        this.onEvaleJS( TW_Store.bblStore.getWebAction(TW_Store.bblStore.ACT_ENUM.windowResize,{}));
        // setTimeout(()=>{
        //     FileTools.onSaveScreen(true,this.refs.myView);
        // },2000)

    }



    getJumpData=(data)=>{
        TW_Log(" TW_Store.bblStore.jumpData==pre", data)
       let jumper = data.substr(data.indexOf("jumpData=")+9);
        let sunIndex = jumper.indexOf("&");
        if(sunIndex>-1){
            jumper =jumper.substring(0,sunIndex);
        }
        return jumper;
    }

    onEvaleJS = (data) => {
        let dataStr = JSON.stringify(data);
        dataStr = dataStr ? dataStr : "";
        if(this.refs.myWebView){
            this.refs.myWebView.postMessage(dataStr, "*");
        }
    //     const injectJavascriptStr =  `(function() {
    //   window.WebViewBridge.onMessage(${JSON.stringify(data)});
    //   return true;
    // })()`;
    //     if(this.refs.myWebView) {
    //         this.refs.myWebView.injectJavaScript(injectJavascriptStr)
    //     }

      //  this.refs.myWebView.evaluateJavaScript(`receivedMessageFromRN(${dataStr})`);
    }

    onError = (error) => {
      //  TW_Store.dataStore.onRetartApp();
        TW_Log("onError======XXWebView=====event=====rr22", error)
    }

    onShouldStartLoadWithRequest = (event) => {
        TW_Log("onShouldStartLoadWithRequest===========XXWebView====22=", event)
        return true;
    };

    onNavigationStateChange = (navState) => {
        TW_Log("navState====XXWebView=======onNavigationStateChange=====url==" + navState.url, navState)
        this.setState({
            backButtonEnabled: navState.canGoBack,
            // title: navState.title,
            scalesPageToFit: false

        });
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:"black",
    },
    webView: {
        width:SCREEN_W,
        height:SCREEN_H,
        backgroundColor:"black"
    },
    viewShareBox: {
        zIndex: 1000,
        position: "absolute",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
    }
});