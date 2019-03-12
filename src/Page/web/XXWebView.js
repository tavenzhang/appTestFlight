import React, {Component} from 'react';

import {
    StyleSheet,
    View,
    WebView,
} from 'react-native';
import WKWebView from "react-native-wkwebview-reborn/WKWebView";
import {withMappedNavigationProps} from 'react-navigation-props-mapper'
import LoadingView from "../enter/LoadingView";
import {observer} from 'mobx-react/native';
import NetUitls from "../../Common/Network/TCRequestUitls";
import {platInfo} from "../../config/appConfig";
import SplashScreen from "react-native-splash-screen";
import CodePush from 'react-native-code-push'
import Base64 from "../../Common/JXHelper/Base64";
import rootStore from "../../Data/store/RootStore";


@withMappedNavigationProps()
@observer
export default class XXWebView extends Component {
    constructor(state) {
        super(state)
        this.filtUrlList=["/api/v1/account/webapi/account/users/login","/api/v1/account/webapi/account/users/userWebEncryptRegister"];
        this.state={
            isFail:false
        }
    }

    componentWillMount(){
        TW_Store.bblStore.isLoading=true;
        TW_Store.bblStore.lastGameUrl="";
        NetUitls.getUrlAndParamsAndCallback(rootStore.bblStore.getVersionDomain()+"/gameList.json"+"?rom="+Math.random(),null,(rt)=>{
            TW_Log("NetUitls.getUrlAndParamsAndCallback-----------rt==-",rt)
        })
    }


    render() {
        let {force} = this.props;

        let source = {
            file: TW_Store.dataStore.getHomeWebUri(),
            allowingReadAccessToURL: TW_Store.dataStore.getGameRootDir(),
            allowFileAccessFromFileURLs:TW_Store.dataStore.getGameRootDir(),
            param:"?taven=1&status=2&token=3"
        };

        if (!G_IS_IOS) {
            source = {
                uri: TW_Store.dataStore.getHomeWebUri(),
            };
        }

       // if(TW_IS_DEBIG){
       //      source =  require('./../../../android/app/src/main/assets/gamelobby/index.html');
       //  }

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
        if (message && message.action) {
            switch (message.action) {
                case "Log":
                    // TW_Log("game---ct=="+message.ct,message.data);
                    break;
                case "JumpGame":
                    url = this.handleUrl(message.payload);

                    if (TW_Store.bblStore.lastGameUrl != url) {
                        TW_Store.bblStore.lastGameUrl = url;
                        TW_Store.bblStore.jumpData=this.getJumpData(message.payload)

                        TW_Log("onMessage========tempData-===>>message.payload--"+message.payload ,url);
                        TW_NavHelp.pushView(JX_Compones.WebView, {
                            url,
                            onMsgHandle: this.onMsgHandle,
                            onEvaleJS: this.onEvaleJS,
                            isGame: true,
                            parm:``
                        })
                        this.onEvaleJS(TW_Store.bblStore.getWebAction(TW_Store.bblStore.ACT_ENUM.stopMusic),{});
                        this.onEvaleJS(TW_Store.bblStore.getWebAction(TW_Store.bblStore.ACT_ENUM.appData, {isAtHome: false}));
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
                  //  TW_Log("---home--http---game--postUrlAndParamsAndCallback>=="+message.url+"===data--"+message.data, message)

                    switch (method) {
                        case "post":
                            let myUrl = message.url;
                            for (let item of this.filtUrlList){
                                let myIndex = myUrl.indexOf(item);
                                TW_Log("myUrl------"+myIndex+"--myUrl=="+myUrl,item);
                                if(myIndex>1){
                                    myUrl= platInfo.loginDomain+ myUrl.substring(myIndex);
                                    TW_Log("myUrl------last="+myUrl);
                                    break;
                                }
                            }
                            NetUitls.postUrlAndParamsAndCallback(myUrl,JSON.parse(message.data), (ret) => {
                                TW_Log("---home--http---game--postUrlAndParamsAndCallback>url="+message.url, ret);
                                this.onEvaleJS( TW_Store.bblStore.getWebAction(TW_Store.bblStore.ACT_ENUM.http,{hashUrl:message.hashUrl,...ret}));
                            },10,false,false,null,true)
                            break
                        case "get":
                            NetUitls.getUrlAndParamsAndCallback(message.url, JSON.parse(message.data), (ret) => {
                                this.onEvaleJS( TW_Store.bblStore.getWebAction(TW_Store.bblStore.ACT_ENUM.http,{hashUrl:message.hashUrl,...ret}));
                                let access_token =TW_GetQueryString("access_token",message.url);
                                if(access_token&&access_token!=""){
                                    TW_Store.userStore.initLoginToken(access_token);
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

    handleUrl = (url, isJumpUrl = false) => {

        if (url && url.indexOf("../") > -1) {
            url = url.replace("../", "");
        }
        if (isJumpUrl) {
            url = TW_Store.bblStore.gameDomain + "/" + url
        } else {
            if (url.indexOf("gamethree") > -1||url.indexOf("slot_jssc") ) {
                url = TW_Store.dataStore.getGameRootDir()  + url
            } else {
                url = TW_Store.bblStore.gameDomain  + url
            }
        }

        return url
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
        backgroundColor: "#000000"
    },
    webView: {
        backgroundColor: "#000000"
    }
});
