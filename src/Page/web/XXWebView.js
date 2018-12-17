import React, {Component} from 'react';

import {
    StyleSheet,
    View,
    WebView,
} from 'react-native';
import {indexBgColor, width} from "../resouce/theme";
import RNFS from "react-native-fs";
import WKWebView from "react-native-wkwebview-reborn/WKWebView";

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
        let res = RNFS.MainBundlePath + '/assets/src/page/web/gamelobby/home.html';
        //TW_Log("===========res=====", res)
        // let source = {
        //     uri: res,
        //     allowingReadAccessToURL: RNFS.MainBundlePath,
        //     allowFileAccessFromFileURLs: RNFS.MainBundlePath
        // }
        TW_Log("XXWebView render==");
        let source=require('./gamelobby/index.html');
        if (!G_IS_IOS) {
            source = {uri: 'file:///android_asset/gamelobby/index.html'}
        }
      //  let     injectJs =`window.location.href="http://www.baidu.com";`;
        let injectJs='window.top.postMessage(window.location.href,"*")'  ;
       
        return (
            <View style={styles.container}>
                {
                    G_IS_IOS ? <WKWebView source={source} onNavigationStateChange={this.onNavigationStateChange}
                                                       onShouldStartLoadWithRequest={this.onShouldStartLoadWithRequest}
                                                       style={styles.container}
                                                       allowFileAccess={true}
                                                       onError={this.onError}
                                              javaScriptEnabled={true}
                                            //  injectedJavaScript={injectJs}
                                              //injectJavaScript={this.myInject}
                                              onMessage={this.onMessage}
                        /> :
                        <WebView
                            useWebKit={true}
                            automaticallyAdjustContentInsets={true}
                            style={styles.webView}
                            // source={{uri: this.props.url}}
                            source={source}
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
        let data = event.nativeEvent.data;
        TW_Log("onMessage===========event=====", data);
        if(data.action&&data.action=="game_back"){
         return;
        }
        TW_NavHelp.pushView(JX_Compones.WebView,{url:"http://localhost:8081/assets/src/Page/web/g_qznn/index.html?" +
            "jumpData=eyJ0b2tlbiI6IjgzMGFkZmMyLTIwODYtNGVkYy04NGMwLTEyYTIxZDYyNWIzYiIsImh0dHBVcmwiOiJodHRwOi8vMTkyLjE2OC4xLjkzOjgwOTEvYXBpL3YxIiwiZ2FtZUlkIjoyMn0=",data})
    }

    onError = (error) => {
        TW_Log("onError===========event=====", error)
    }

    onShouldStartLoadWithRequest = (event) => {

        TW_Log("onShouldStartLoadWithRequest===========event=====", event)
        return true;
    };

    onNavigationStateChange = (navState) => {
        TW_Log("navState===========onNavigationStateChange=====", navState.url)
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
        backgroundColor: indexBgColor.mainBg,
    },
    webView: {
        marginTop: 0,
        width: width,
    }

});
