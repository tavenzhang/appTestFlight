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

       // if(TW_IS_DEBIG){
       //      source =  require('./gamelobby/index.html');
       //  }


        TW_Log("targetAppDir-33---MainBundlePath-",source)
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
                    G_IS_IOS ? <WKWebView ref="myWebView" source={source}
                                          onNavigationStateChange={this.onNavigationStateChange}
                                          onShouldStartLoadWithRequest={this.onShouldStartLoadWithRequest}
                                          style={styles.webView}
                                          allowFileAccess={true}
                                          startInLoadingState={true}
                                          onError={this.onError}
                                          domStorageEnabled={true}
                                          renderLoading={this.onRenderLoadingView}
                                          javaScriptEnabled={true}
                                          injectedJavaScript={injectJs}
                                          onMessage={this.onMessage}
                                          onLoadEnd={this.onLoadEnd}
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
                            startInLoadingState={true}
                            renderLoading={this.onRenderLoadingView}
                            onNavigationStateChange={this.onNavigationStateChange}
                            onShouldStartLoadWithRequest={this.onShouldStartLoadWithRequest}
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

        return (<View style={{flex:1, backgroundColor:"black"}}>
            <LoadingView/>
        </View>)
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
                    url = this.handleUrl(message.au);
                    if (TW_Store.bblStore.lastGameUrl != url) {
                        TW_Store.bblStore.lastGameUrl = url;
                        TW_Store.bblStore.jumpData=this.getJumpData(message.au)
                        TW_NavHelp.pushView(JX_Compones.WebView, {
                            url,
                            onMsgHandle: this.onMsgHandle,
                            onEvaleJS: this.onEvaleJS,
                            isGame: true
                        })
                        this.onEvaleJS(TW_Store.bblStore.getWebAction(TW_Store.bblStore.ACT_ENUM.appData, {isAtHome: false}));
                    }
                    break;
                case "game_back":
                    TW_NavHelp.popToBack();
                    break;
                case  "JumpUrl":
                    //TN_Notification("JumpUrl","test local notification");
                    url = this.handleUrl(message.au, true)
                    if (TW_Store.bblStore.lastGameUrl != url) {
                        TW_Store.bblStore.lastGameUrl = url;
                        TW_Store.bblStore.jumpData=this.getJumpData(message.au+"&cc=2");
                        TW_NavHelp.pushView(JX_Compones.WebView, {
                            url,
                            onMsgHandle: this.onMsgHandle,
                            onEvaleJS: this.onEvaleJS,
                            isGame: false
                        })
                        this.onEvaleJS(TW_Store.bblStore.getWebAction(TW_Store.bblStore.ACT_ENUM.appData, {isAtHome: false}));
                    }
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
                            })
                            break
                        case "get":
                            NetUitls.getUrlAndParamsAndCallback(message.url, JSON.parse(message.data), (ret) => {
                                this.onEvaleJS( TW_Store.bblStore.getWebAction(TW_Store.bblStore.ACT_ENUM.http,{hashUrl:message.hashUrl,...ret}));
                            });
                            break;
                        case "put":
                            NetUitls.PutUrlAndParamsAndCallback(message.url, JSON.parse(message.data), (ret) => {
                                this.onEvaleJS( TW_Store.bblStore.getWebAction(TW_Store.bblStore.ACT_ENUM.http,{hashUrl:message.hashUrl,...ret}));
                            });
                            break;
                    }
            }
        }
    }

    onLoadEnd=()=>{
        TW_Store.bblStore.isLoading=false
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
        TW_Log("onShouldStartLoadWithRequest===========event=====", event)
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
