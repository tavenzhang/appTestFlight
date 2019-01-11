import React, {Component} from 'react';

import {
    StyleSheet,
    View,
    WebView,
    Text
} from 'react-native';
import WKWebView from "react-native-wkwebview-reborn/WKWebView";
import {withMappedNavigationProps} from 'react-navigation-props-mapper'
import LoadingView from "../Main/LoadingView";
import {observer} from 'mobx-react/native';
//import {MainBundlePath, DocumentDirectoryPath} from 'react-native-fs'
import {MainBundlePath, DocumentDirectoryPath} from 'react-native-fs'
@withMappedNavigationProps()
@observer
export default class XXWebView extends Component {
    constructor(state) {
        super(state)
        this.state = {
           // uri: TW_Store.dataStore.getHomeWebUri(),
            bundleDir: TW_Store.dataStore.getHomeWebHome()
        };
    }

    componentWillMount(){
        TW_Store.bblStore.isLoading=true;
        TW_Store.bblStore.lastGameUrl="";
    }




    render() {
        let {force} = this.props;

        let source = {
            file: TW_Store.dataStore.getHomeWebUri(),
            allowingReadAccessToURL: TW_Store.dataStore.originAppDir,
            allowFileAccessFromFileURLs:TW_Store.dataStore.originAppDir
        };

        if (!G_IS_IOS) {
            source = {
                uri: TW_Store.dataStore.getHomeWebUri(),
            };
        }


       // if(TW_IS_DEBIG){
       //      source =  require('./gamelobby/index.html');
       //  }
        TW_Log("targetAppDir----MainBundlePath-",source)
        let injectJs = `window.appData=${JSON.stringify({
            isApp: true,
            taven: "isOk",
            clientId: TW_Store.bblStore.clientId,
            force: force ? "1" : "0",
            urlJSON: TW_Store.bblStore.urlJSON
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
        TW_Log("onMessage===========>>" + this.constructor.name+"\n", message);
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
                        TW_NavHelp.pushView(JX_Compones.WebView, {
                            url,
                            onMsgHandle: this.onMsgHandle,
                            onEvaleJS: this.onEvaleJS,
                            isGame: true
                        })
                        TW_Store.bblStore.isLoading=true;
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
                        TW_Store.bblStore.isLoading=true;
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
                     let name = message.name ? message.name:"";
                     name =name.toLowerCase();
                     if(name=="111"&&message.pwd=="222"){
                         TW_Store.bblStore.changeShowDebug(true);
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
