import React, {Component} from 'react';

import {
    StyleSheet,
    View,
    WebView,
} from 'react-native';
import {indexBgColor, width} from "../resouce/theme";
import {JX_PLAT_INFO} from "../asset";
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
        JXLog("===========res=====", res)
        let source = {
            uri: res,
            allowingReadAccessToURL: RNFS.MainBundlePath,
            allowFileAccessFromFileURLs: RNFS.MainBundlePath
        }
        //let source=require('./gamelobby/index.html')
        if (!JX_PLAT_INFO.IS_IOS) {
            source = {uri: 'file:///android_asset/gamelobby/index.html'}
        }
        return (
            <View style={styles.container}>
                {
                    JX_PLAT_INFO.IS_IOS ? <WKWebView source={source} onNavigationStateChange={this.onNavigationStateChange}
                                                     onShouldStartLoadWithRequest={this.onShouldStartLoadWithRequest}
                                                     style={styles.container}
                                                     allowFileAccess={true}
                                                     onError={this.onError}/> :
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
                        />

                }

            </View>
        );
    }

    // render() {
    //     //<WKWebView source={{ file: RNFS.MainBundlePath + '/data/index.html', allowingReadAccessToURL: RNFS.MainBundlePath }} />
    //     // let source=require('./gamelobby/index.html');
    //     JXLog("===========RNFS====="+RNFS.MainBundlePath,RNFS);
    //     let res =RNFS.MainBundlePath + '/assets/src/page/web/gamelobby/index.html';
    //
    //     let source={file: res, allowingReadAccessToURL: RNFS.MainBundlePath ,allowFileAccessFromFileURLs:RNFS.MainBundlePath}
    //     if(!JX_PLAT_INFO.isDebug&&!JX_PLAT_INFO.IS_IOS){
    //         source = {uri: 'file:///android_asset/gamelobby/index.html'}
    //     }
    //
    //     return (
    //         <WKWebView  source={source} style={styles.container}   allowFileAccess={true}/>
    //     );
    // }


    onError = (error) => {
        JXLog("onError===========event=====", error)
    }

    onShouldStartLoadWithRequest = (event) => {
        JXLog("onShouldStartLoadWithRequest===========event=====", event)
        return true;
    };

    onNavigationStateChange = (navState) => {
        JXLog("navState===========onNavigationStateChange=====", navState.url)
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
