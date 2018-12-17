/**
 * Created by Sam on 16/01/2017.
 * Copyright © 2016年 JX. All rights reserved.
 */

import React, {Component} from 'react';

import {
    StyleSheet,
    View,
    WebView,
} from 'react-native';
import RNFS from "react-native-fs";
import {width, indexBgColor} from '../resouce/theme'
import WKWebView from "react-native-wkwebview-reborn/WKWebView";

var WEBVIEW_REF = 'webview';
import {withMappedNavigationProps} from 'react-navigation-props-mapper'

@withMappedNavigationProps()
export default class TCWebView extends Component {
    constructor(state) {
        super(state)
        this.clickCount = 1
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
        setTimeout(()=>{
            TW_NavHelp.popToBack()
            TW_Log("componentDidMount=======popToTop========", )
        },10000)
        TW_Log("componentDidMount===============", )
    }


    componentWillUnmount() {
    }

    render() {
        let {data,url}=this.props;
        let res = RNFS.MainBundlePath + '/assets/src/page/web/g_qznn/index.html';
        TW_Log("===========res====="+url, res)
        let source = {
            uri: url,
            allowingReadAccessToURL: RNFS.MainBundlePath,
            allowFileAccessFromFileURLs: RNFS.MainBundlePath
        }
        let injectJs='window.top.postMessage(window.location.href,"*")'  ;
        //    TW_Log("onmess-----data==",data)
    //    let source=require('../web/g_qznn/index.html')
        if (!G_IS_IOS) {
            source = {uri: 'file:///android_asset/gamelobby/index.html'}
        }
        return (
            <View style={styles.container}>
                {/*<TopNavigationBar title={this.state.title}*/}
                                  {/*ref="topNavigation"*/}
                                  {/*backButtonCall={() => {*/}
                                      {/*this.backButtonCall()*/}
                                  {/*}}*/}
                                  {/*closeButtonCall={() => {*/}
                                      {/*this.closeButtonCall()*/}
                                  {/*}}*/}
                                  {/*midCall={() => {*/}
                                      {/*this.midCall()*/}
                                  {/*}}*/}
                {/*/>*/}
                {
                    G_IS_IOS ? <WKWebView source={source} onNavigationStateChange={this.onNavigationStateChange}
                                          onShouldStartLoadWithRequest={this.onShouldStartLoadWithRequest}
                                          style={styles.container}
                                          allowFileAccess={true}
                                          onError={this.onError}
                                         // injectedJavaScript={injectJs}
                                          onMessage={this.onMessage}
                                          onLoadStart={this.onloadStart}
                                          onLoadEnd={this.onLoadEnd}
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
    onLoadEnd=(event)=>{
        TW_Log("onLoadEnd=TCweb==========event=====", event)
    }

    onloadStart=(event)=>{
        TW_Log("onloadStart==TCweb=========event=====", event)
    }

    onMessage=(event)=>{
        let data = event.nativeEvent.data;
        TW_Log("onMessage=====TCweb====TCweb==event=====", data)
        TW_NavHelp.popToBack()
        //TW_NavHelp.pushView(JX_Compones.WebView,{data})
    }

    onError = (error) => {
        TW_Log("onError=====TCweb======event=====", error.nativeEvent)
    }

    onShouldStartLoadWithRequest = (event) => {
        TW_Log("onShouldStartLoadWithRequest=======TCweb====event=====", event)
        return true;
    };

    onNavigationStateChange = (navState) => {
        TW_Log("navState=====TCweb======onNavigationStateChange=====", navState.url)
        this.setState({
            backButtonEnabled: navState.canGoBack,
            // title: navState.title,
            scalesPageToFit: false
        });
    };


    // onShouldStartLoadWithRequest = (event) => {
    //     return true;
    // };
    //
    // onNavigationStateChange = (navState) => {
    //
    //     TW_Log(navState)
    //     this.setState({
    //         backButtonEnabled: navState.canGoBack,
    //         // title: navState.title,
    //         scalesPageToFit: false
    //     });
    // };
    //
    // backButtonCall() {
    //     NavigatorHelper.popToBack();
    // }
    //
    // closeButtonCall() {
    //     NavigatorHelper.popToBack();
    // }
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
