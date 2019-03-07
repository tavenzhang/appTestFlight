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

import TCButtonView from "../../Common/View/button/TCButtonView";
import {NativeModules} from "react-native";
import ShareUtile from '../../Common/UMeng/ShareUtil'
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
    }


    render() {
        let {force} = this.props;

        let source = {
            file: TW_Store.dataStore.getHomeWebUri(),
            allowingReadAccessToURL: TW_Store.dataStore.getHomeWebHome(),
            allowFileAccessFromFileURLs:TW_Store.dataStore.getHomeWebHome()
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
            isAndroidHack:TW_Store.appStore.isInAnroidHack
        })}`;

        return (
            <View style={styles.container}>
                {
                    <TCButtonView btnStyle={{width:300}} onClick={()=>{
                        //微信分享参考https://developer.umeng.com/docs/66632/detail/67587
                        /*text 为分享内容
                        img 为图片地址，可以为链接，本地地址以及res图片（如果使用res,请使用如下写法：res/icon.png）
                        url 为分享链接，可以为空
                        title 为分享链接的标题
                        platform为平台id，id对照表与授权相同
                        callback中code为错误码，当为200时，标记成功。message为错误信息*/
                            ShareUtile.shareboard('abc','','https://www.google.com/','testshare',[2,3],(code,message) =>{
                                this.setState({result:message});
                            });
                    }} text={"这里接微信"}/>
                }
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
                    TW_Log("onMessage===========>>JumpGame--" +  url,message.payload);
                    if (TW_Store.bblStore.lastGameUrl != url) {
                        TW_Store.bblStore.lastGameUrl = url;
                        TW_Store.bblStore.jumpData=this.getJumpData(message.payload)
                        TW_NavHelp.pushView(JX_Compones.WebView, {
                            url,
                            onMsgHandle: this.onMsgHandle,
                            onEvaleJS: this.onEvaleJS,
                            isGame: true
                        })
                        this.onEvaleJS(TW_Store.bblStore.getWebAction(TW_Store.bblStore.ACT_ENUM.appData, {isAtHome: false}));
                    }
                    break;
                case  "JumpUrl":
                    //TN_Notification("JumpUrl","test local notification");
                    url = this.handleUrl(message.au, true)
                    let isOk=true;
                    TW_Log("game---isInAnroidHack=="+url+"--index="+url.indexOf("module=account"));
                    if(TW_Store.appStore.isInAnroidHack){
                        //如果处于审核状态 只跳用户中心 其他页面不跳转
                        if(url.indexOf("module=account")>-1){
                            isOk=true
                        }else{
                            isOk=false
                        }
                    }

                    if (isOk) {
                        //TW_Store.bblStore.lastGameUrl = url;
                        TW_Store.bblStore.jumpData=this.getJumpData(message.au+"&cc=2");
                       // TW_NavHelp.pushView(JX_Compones.TCUserDetailMsg, {})
                        let module =TW_GetQueryString("module",message.au);
                        switch(module){
                            case "account":
                              //  TW_NavHelp.pushView(JX_Compones.TCUserDetailMsg, {})
                                TW_Store.gameUIStroe.isShowUserInfo =!TW_Store.gameUIStroe.isShowUserInfo;
                                break;
                            case "redraw":
                                TW_Store.gameUIStroe.isShowWithDraw =! TW_Store.gameUIStroe.isShowWithDraw;
                                //TW_NavHelp.pushView(JX_Compones.TCUserWithdrawNew, {})
                                break;


                        }
                        //TW_Log("module-----------"+module)
                        //this.onEvaleJS(TW_Store.bblStore.getWebAction(TW_Store.bblStore.ACT_ENUM.appData, {isAtHome: false}));
                    }
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
                case "game_recharge":
                    TW_Store.gameUIStroe.isShowAddPayView =!TW_Store.gameUIStroe.isShowAddPayView;
                    break;
                case "game_back":
                    TW_Log("custom---exitAppToLoginPage")
                    TW_Store.userStore.exitAppToLoginPage();
                    this.onEvaleJS(TW_Store.bblStore.getWebAction(TW_Store.bblStore.ACT_ENUM.logout));
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
            url = TW_Store.bblStore.urlDomain + "/" + url
        } else {
            if (url.indexOf("slot_jssc") > -1) {
                url = TW_Store.bblStore.homeDomain + "/" + url
            } else {
                url = TW_Store.bblStore.homeDomain + "/" + url
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
