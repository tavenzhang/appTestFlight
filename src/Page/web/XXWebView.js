import React, {Component} from 'react';

import {
    StyleSheet,
    View,
    WebView,
} from 'react-native';

import RNFS from "react-native-fs";
import WKWebView from "react-native-wkwebview-reborn/WKWebView";
import {JX_PLAT_INFO} from "../asset";

export default class XXWebView extends Component {
    constructor(state) {
        super(state)
        this.state = {
            fluashNum:1
        }
    }

    static defaultProps = {
        url: '',
        title: ''
    };

    componentDidMount() {
        setTimeout(()=>{
            TW_Log("onMessage======onAppPostMessage=componentDidMount====", this.refs.myWebView);
            this.refs.myWebView.postMessage("{hell0--}","*");
        },10000);
        TW_Log("JXComponet-----",JX_Compones)

    }

    componentWillUnmount() {

    }

    render() {
        let res = RNFS.MainBundlePath + '/assets/src/page/web/gamelobby/index.html';
        let source = {
            uri: res,
            allowingReadAccessToURL: RNFS.MainBundlePath,
            allowFileAccessFromFileURLs: RNFS.MainBundlePath
        };

        if (!G_IS_IOS) {
            source = {uri: 'file:///android_asset/gamelobby/index.html'}
        }

        //let source = require('./gamelobby/index.html');

        let injectJs = `window.appData=${JSON.stringify({
            isApp: true,
            taven: "isOk",
            clientId: "11",
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
                                          onError={this.onError}
                                          domStorageEnabled={true}
                                          javaScriptEnabled={true}
                                          injectedJavaScript={injectJs}
                                          onMessage={this.onMessage}
                        /> :
                        <WebView
                            ref="myWebView"
                            automaticallyAdjustContentInsets={true}
                            style={styles.webView}
                            source={source}
                            injectedJavaScript={injectJs}
                            javaScriptEnabled={true}
                            domStorageEnabled={true}
                            // decelerationRate="normal"
                            startInLoadingState={true}
                            onNavigationStateChange={this.onNavigationStateChange}
                            onShouldStartLoadWithRequest={this.onShouldStartLoadWithRequest}
                            allowFileAccess={true}
                            onError={this.onError}
                            onMessage={this.onMessage}
                        />
                }

            </View>
        );
    }


    onMessage = (event) => {
        let message = JSON.parse(event.nativeEvent.data);
        this.onMsgHandle(message);
    }

    onMsgHandle = (message) => {
        TW_Log("onMessage===========" + this.constructor.name, message);
        let url = "";
        if (message && message.action) {
            switch (message.action) {
                case "Log":
                    // TW_Log("game---ct=="+message.ct,message.data);
                    break;
                case "JumpGame":
                    url = this.handleUrl(message.au)
                    TW_NavHelp.pushView(JX_Compones.WebView, {
                        url,
                        onMsgHandle: this.onMsgHandle,
                        onEvaleJS: this.onEvaleJS
                    })
                    break;
                case "game_back":
                    TW_NavHelp.popToBack();
                    break;
                case  "JumpUrl":
                    url = this.handleUrl(message.au)
                    TW_NavHelp.pushView(JX_Compones.WebView, {
                        url,
                        onMsgHandle: this.onMsgHandle,
                        onEvaleJS: this.onEvaleJS
                    })
                    break;
            }
        }
    }


    handleUrl = (url) => {
        if (url && url.indexOf("../") > -1) {
            url = url.replace("../", "");
        }
        url = TW_Store.bblStore.homeDomain + "/" + url
        return url
    }

    onEvaleJS = (data) => {
        let dataStr = JSON.stringify(data);
        dataStr = dataStr ? dataStr : "";
        TW_Log("onError===========   this.webview=====" +  this.refs.myWebView == null, this.refs.myWebView);
        if(JX_PLAT_INFO.IS_IOS){
            this.refs.myWebView.evaluateJavaScript(`receivedMessageFromRN(${dataStr})`);
        }else{
            this.setState({fluashNum:this.state.fluashNum+1},()=>{
                TW_Log("onError===========onEvaleJS ");
                TW_NavHelp.reset(JX_Compones.XXWebView,{fore})
            });
        }


    }

    onError = (error) => {
        TW_Log("onError===========event=====", error)
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
