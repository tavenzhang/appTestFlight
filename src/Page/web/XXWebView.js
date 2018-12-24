import React, {Component} from 'react';

import {
    StyleSheet,
    View,
    WebView,
} from 'react-native';
import {indexBgColor, width} from "../resouce/theme";
import RNFS from "react-native-fs";
import WKWebView from "react-native-wkwebview-reborn/WKWebView";
import Fabric from "react-native-fabric";

export default class XXWebView extends Component {
    constructor(state) {
        super(state)
        this.state = {
            url: this.props.url,
            title: this.props.title
        }
    }

    static defaultProps = {
        url: '',
        title: ''
    };

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    render() {

        let res = RNFS.MainBundlePath + '/assets/src/page/web/gamelobby/index.html';
         let source = {
            uri: res,
            allowingReadAccessToURL: RNFS.MainBundlePath,
            allowFileAccessFromFileURLs: RNFS.MainBundlePath
        }
     //   let source = require('./gamelobby/index.html');
       //  if (!G_IS_IOS) {
       //      source = {uri: 'file:///android_asset/gamelobby/index.html'}
       //  }

        let injectJs = `window.appData=${JSON.stringify({isApp: true,taven:"isOk",clientId:"11",urlJSON:TW_Store.bblStore.urlJSON})}`;
       // let injectJs = `alert("${TW_Store.appInfoStore.versionHotFix}")`;
        return (
            <View style={styles.container}>
                {
                    G_IS_IOS ? <WKWebView ref={ref => { this.webview = ref; }} source={source} onNavigationStateChange={this.onNavigationStateChange}
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
                            ref={ref => { this.webview = ref; }}
                            useWebKit={true}
                            automaticallyAdjustContentInsets={true}
                            style={styles.webView}
                            source={source}
                            injectedJavaScript={injectJs}
                            javaScriptEnabled={true}
                            domStorageEnabled={true}
                            decelerationRate="normal"
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


    onMessage=(event)=>{
        let message = JSON.parse(event.nativeEvent.data);
        this.onMsgHandle(message);
    }

    onMsgHandle=(message)=>{
        TW_Log("onMessage==========="+this.constructor.name, message);
        let url="";
        if(message&&message.action){
            switch (message.action){
                case "Log":
                    // TW_Log("game---ct=="+message.ct,message.data);
                    break;
                case "JumpGame":
                    url =this.handleUrl(message.au)
                    TW_NavHelp.pushView(JX_Compones.WebView,{url,onMsgHandle:this.onMsgHandle,onEvaleJS:this.onEvaleJS})
                    break;
                case "game_back":
                    TW_NavHelp.popToBack();
                    break;
                case  "JumpUrl":
                    url =this.handleUrl(message.au)
                    TW_NavHelp.pushView(JX_Compones.WebView,{url,onMsgHandle:this.onMsgHandle,onEvaleJS:this.onEvaleJS})
                    break;
            }
        }
    }



    handleUrl=(url)=>{
        if(url&&url.indexOf("../")>-1){
            url = url.replace("../","");
        }
         url = TW_Store.bblStore.homeDomain +"/"+url
        return url
    }

    onEvaleJS=(data)=>{
        let dataStr= JSON.stringify(data);
        dataStr=dataStr ? dataStr:"";
        this.webview.evaluateJavaScript(`receivedMessageFromRN(${dataStr})`);

    }

    onError = (error) => {
        TW_Log("onError===========event=====", error)
    }

    onShouldStartLoadWithRequest = (event) => {

        TW_Log("onShouldStartLoadWithRequest===========event=====", event)
        return true;
    };

    onNavigationStateChange = (navState) => {
        TW_Log("navState===========onNavigationStateChange=====url=="+navState.url, navState)
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
