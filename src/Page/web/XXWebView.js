import React, {Component} from 'react';

import {
    StyleSheet,
    View,
    WebView,
    KeyboardAvoidingView
} from 'react-native';
import WKWebView from "react-native-wkwebview-reborn/WKWebView";
import {withMappedNavigationProps} from 'react-navigation-props-mapper'
import {observer} from 'mobx-react/native';
import NetUitls from "../../Common/Network/TCRequestUitls";
import {platInfo} from "../../config/appConfig";
import SplashScreen from "react-native-splash-screen";
import CodePush from 'react-native-code-push'

import rootStore from "../../Data/store/RootStore";
import FileTools from "../../Common/Global/FileTools";
import JXToast from "../../Common/JXHelper/JXToast";


@withMappedNavigationProps()
@observer
export default class XXWebView extends Component {
    constructor(state) {
        super(state)
        this.filtUrlList=["/api/v1/account/webapi/account/users/login","/api/v1/account/webapi/account/users/userWebEncryptRegister"];
        this.state={
            isFail:false,
            updateList:[]
        }
        this.loadQueue=[];
        this.isLoading=false;

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

        TW_Store.bblStore.getAppData();
    }
    
    onFlushGameData=()=>{
        NetUitls.getUrlAndParamsAndCallback(rootStore.bblStore.getVersionDomain()+"/gameList.json"+"?rom="+Math.random(),null,(rt)=>{
            TW_Log("TW_DATA_KEY.gameList---FileTools--getUrlAndParamsAndCallback--------rt==-",rt);
            let newList = rt.content ? rt.content:[];
            let gameM =  TW_Store.dataStore.appGameListM;
            let lastList=[];
            for(let item of newList){
                item.alias=item.id;
                if(gameM[`${item.alias}`]){
                    if(gameM[`${item.alias}`].version!=item.version){
                        gameM[`${item.alias}`]={...gameM[`${item.alias}`],...item,version:gameM[`${item.alias}`].version,bupdate:true,newVersion:item.version}
                        lastList.push(gameM[`${item.id}`]);
                    }else{
                        gameM[`${item.alias}`]={...gameM[`${item.alias}`],bupdate:false,...item};
                    }

                }else if(!gameM[`${item.alias}`]){
                    gameM[`${item.alias}`]={...item,version:"",bupdate:true,newVersion:item.version};
                    lastList.push(gameM[`${item.id}`]);
                }

            }

            TW_OnValueJSHome(TW_Store.bblStore.getWebAction(TW_Store.bblStore.ACT_ENUM.gamesinfo,{data:lastList}));
        })
    }
    
    componentDidMount(): void {
        if(this.refs.myWebView.getSettings){
            this.refs.myWebView.getSettings().setMediaPlaybackRequiresUserGesture(false);
        }
    }


    handleUrl = (url, data) => {

        if(data){
            let index= url.indexOf("?");
            url = url.substr(index);
            if(data.bupdate){
                this.loadQueue.push(data);
                if(!this.isLoading){
                    this.startLoadGame()
                }
            }else{
                url = TW_Store.dataStore.getGameRootDir()+"/"+data.dir+"/"  + url
            }

        }else{
            if (url && url.indexOf("../") > -1) {
                url = url.replace("../", "");
            }
            url = TW_Store.bblStore.gameDomain  + url
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
            TW_Log("(TW_DATA_KEY.gameList-FileTools--==this.state.updateList==item" , downData);
            if(downData){
                this.isLoading=true;
                // JXToast.showShortCenter(`${downData.name} 开始下载！`)
                let loadUrl = downData.source;
                if(loadUrl.indexOf("http")>-1){
                    loadUrl= loadUrl;
                }else{
                    loadUrl = TW_Store.bblStore.gameDomain+"/"+downData.dir+"/"  + downData.dir;
                }
                FileTools.downloadFile(loadUrl,TW_Store.bblStore.tempGameZip,downData,this.onLoadZipFish,this.onLoadProgress);
            }
        }
    }
    
    onLoadProgress=(ret)=>{
        //{
        //             "gameId":30,        //游戏id-----可选
        //             "alias":"hhdz",     //游戏别名--------唯一标识，必填
        //             "percent":0.7       //当前下载进度
        //         }
        let data = TW_Store.dataStore.appGameListM[ret.param.id];
        let dataList=[]
        if(data){
            dataList.push({"alias":ret.param.id,percent:ret.percent})
        }
        TW_Log("FileTools------onLoadProgress===",ret)
        this.onEvaleJS(TW_Store.bblStore.getWebAction(TW_Store.bblStore.ACT_ENUM.updateProgress,{data:dataList}));
    }


    onLoadZipFish=(ret)=> {
        this.isLoading=false;
        TW_Log("FileTools------ret===",ret)
        if(ret.rs){
            TW_Store.commonBoxStore.isShow=false;
            let data = TW_Store.dataStore.appGameListM[ret.param.id];
            data.version=data.newVersion;
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
        let {force} = this.props;

        let source = {
            file: TW_Store.dataStore.getHomeWebUri(),
            allowingReadAccessToURL: TW_Store.dataStore.getGameRootDir(),
            allowFileAccessFromFileURLs:TW_Store.dataStore.getGameRootDir(),
            param:"?app=true"
        };

        if (!G_IS_IOS) {
            source = {
                uri: TW_Store.dataStore.getHomeWebUri(),
            };
        }

       if(TW_IS_DEBIG){
            source =  require('./../../../android/app/src/main/assets/gamelobby/index.html');
        }

        TW_Log("targetAppDir-33---MainBundlePath-",source);
        let injectJs = `window.appData=${JSON.stringify({
            isApp: true,
            taven: "isOk",
            clientId: TW_Store.appStore.clindId,
            force: force ? "1" : "0",
            urlJSON: TW_Store.bblStore.urlJSON,
            isAndroidHack:TW_Store.appStore.isInAnroidHack,

            loginDomain:TW_Store.bblStore.loginDomain+"/api/v1/account",
            gameDomain:TW_Store.bblStore.gameDomain+"/api/v1/gamecenter",
            affCode:TW_Store.appStore.userAffCode,
        })}`;

        return (
            <View style={styles.container}>
                {
                    G_IS_IOS ? <WKWebView ref="myWebView" source={source}
                                          onNavigationStateChange={this.onNavigationStateChange}
                                          onLoadStart={this.onShouldStartLoadWithRequest}
                                          style={styles.webView}
                                          allowFileAccess={true}
                                          startInLoadingState={false}
                                          onError={this.onError}
                                          domStorageEnabled={true}
                                          // renderLoading={this.onRenderLoadingView}
                                          javaScriptEnabled={true}
                                          injectedJavaScript={injectJs}
                                          onMessage={this.onMessage}
                                          onLoadEnd={this.onLoadEnd}
                                          onLoadStart={this.onLoadStart}

                        /> :
                        <KeyboardAvoidingView style={{flex:1}} behavior="padding">
                            <WebView
                                originWhitelist={['*']}
                                ref="myWebView"
                                automaticallyAdjustContentInsets={true}
                                style={styles.webView}
                                source={source}
                                injectedJavaScript={injectJs}
                                javaScriptEnabled={true}
                                domStorageEnabled={true}
                                decelerationRate="normal"
                                // startInLoadingState={true}
                                renderLoading={this.onRenderLoadingView}
                                onNavigationStateChange={this.onNavigationStateChange}
                                onLoadStart={this.onLoadStart}
                                allowFileAccess={true}
                                onError={this.onError}
                                onMessage={this.onMessage}
                                onLoadEnd={this.onLoadEnd}
                            />
                        </KeyboardAvoidingView>
                }
            </View>
        );
    }

    onRenderLoadingView = () => {
        return null
        // return (<View style={{flex:1, backgroundColor:"black"}}>
        //     {G_IS_IOS ?  <LoadingView/>: <LoadingView/>}
        // </View>)
    }


    onMessage = (event) => {
        let message = JSON.parse(event.nativeEvent.data);
        this.onMsgHandle(message);
    }

    onMsgHandle = (message) => {
        TW_Log("onMessage===========>>" + this.constructor.name + "\n", message);
        let url = "";
        let gameData=null;
        if (message && message.action) {
            switch (message.action) {
                case "Log":
                    // TW_Log("game---ct=="+message.ct,message.data);
                    break;
                case "startUpdate":
                    //{action: "startUpdate", gameId: 28, alias: "xywz"}
                    let gameM =  TW_Store.dataStore.appGameListM;
                     gameData= gameM[`${message.alias}`];
                     TW_Log("gameData-----",gameData)
                    if(gameData){
                        if(gameData.bupdate) {
                            this.startLoadGame(gameData);
                         }
                        }
                    break;
                case "JumpGame":
                    let data =JSON.parse(TW_Base64.decode(this.getJumpData(message.payload)));
                    let gameData = TW_Store.dataStore.appGameListM[data.alias];
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

                    TW_Log("FileTools---------data--isNeedLoad==-url=="+url+"-----------gameData==",data);
                    if (!isNeedLoad&&TW_Store.bblStore.lastGameUrl!=url) {
                        TW_Store.bblStore.lastGameUrl = url;
                        TW_Store.bblStore.jumpData=this.getJumpData(message.payload);
                        TW_NavHelp.pushView(JX_Compones.WebView, {
                            url,
                            onMsgHandle: this.onMsgHandle,
                            onEvaleJS: this.onEvaleJS,
                            isGame: true,
                            isOrigan
                        })
                        this.onEvaleJS(TW_Store.bblStore.getWebAction(TW_Store.bblStore.ACT_ENUM.stopMusic),{});
                        //this.onEvaleJS(TW_Store.bblStore.getWebAction(TW_Store.bblStore.ACT_ENUM.appData, {isAtHome: false}));
                    }
                    break;
                case  "game_account":
                    TW_Store.gameUIStroe.isShowUserInfo =!TW_Store.gameUIStroe.isShowUserInfo;
                    break;
                case  "game_custom":
                    TW_Store.gameUIStroe.showGusetView(!TW_Store.gameUIStroe.isShowGuest)
                   // TW_Store.gameUIStroe.isShowShare=!TW_Store.gameUIStroe.isShowShare
                    break;
                case  "game_share":
                     TW_Store.gameUIStroe.isShowShare=!TW_Store.gameUIStroe.isShowShare
                    break;
                case "game_redraw":
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
                            for (let item of this.filtUrlList){
                                let myIndex = myUrl.indexOf(item);
                                TW_Log("myUrl------"+myIndex+"--myUrl=="+myUrl,item);
                                if(myIndex>-1){
                                    //针对几个特殊接口  使用platInfo.loginDomain
                                    myUrl= platInfo.loginDomain+ myUrl.substring(myIndex);
                                   // TW_Log("myUrl------last="+myUrl);
                                    break;
                                }
                            }
                            NetUitls.postUrlAndParamsAndCallback(myUrl,JSON.parse(message.data), (ret) => {
                                //TW_Log("---home--http---game--postUrlAndParamsAndCallback>url="+message.url, ret);
                                this.onEvaleJS(TW_Store.bblStore.getWebAction(TW_Store.bblStore.ACT_ENUM.http,{hashUrl:message.hashUrl,...ret}));
                            },10,false,false,null,true)
                            break
                        case "get":
                            NetUitls.getUrlAndParamsAndCallback(message.url, JSON.parse(message.data), (ret) => {
                                this.onEvaleJS( TW_Store.bblStore.getWebAction(TW_Store.bblStore.ACT_ENUM.http,{hashUrl:message.hashUrl,...ret}));
                                let access_token =TW_GetQueryString("access_token",message.url);
                                if(access_token&&access_token!=""){
                                    TW_Store.userStore.initLoginToken(access_token);
                                    this.onFlushGameData();
                                }
                                if(message.url.indexOf("/api/v1/gamecenter/player/user")>-1){
                                    TW_Store.bblStore.avatarData =ret.content
                                }
                            },10,false,false,true);
                            break;
                        case "put":
                            NetUitls.putUrlAndParamsAndCallback(message.url, JSON.parse(message.data), (ret) => {
                                this.onEvaleJS( TW_Store.bblStore.getWebAction(TW_Store.bblStore.ACT_ENUM.http,{hashUrl:message.hashUrl,...ret}));
                            },10,false,true);
                            break;
                    }
            }
        }
    }

    onLoadStart = (event) => {
        if(G_IS_IOS){
            SplashScreen.hide();
        }

    };


    onLoadEnd=()=>{
        TW_Store.bblStore.isLoading=false;
        SplashScreen.hide();
        this.onEvaleJS( TW_Store.bblStore.getWebAction(TW_Store.bblStore.ACT_ENUM.windowResize,{}));

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
        this.refs.myWebView.postMessage(dataStr, "*");
        //this.refs.myWebView.evaluateJavaScript(`receivedMessageFromRN(${dataStr})`);
    }

    onError = (error) => {
        CodePush.restartApp();
        TW_Log("onError===========event=====rr22", error)
    }

    onShouldStartLoadWithRequest = (event) => {
        TW_Log("onShouldStartLoadWithRequest===========event====22=", event)
        return true;
    };

    onNavigationStateChange = (navState) => {
        TW_Log("navState===========onNavigationStateChange=====url==" + navState.url, navState)
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
        backgroundColor: "white"
    },
    webView: {
        flex: 1,
        backgroundColor: "#000000"
    }
});
