import React, {Component} from 'react';

import {
    StyleSheet,
    View,
    WebView,
    Text
} from 'react-native';

import {width} from '../asset/game/themeComponet'
import WKWebView from "react-native-wkwebview-reborn/WKWebView";

import {JX_PLAT_INFO} from "../asset";
import TCButtonView from "../../Common/View/button/TCButtonView";
import {observer} from "mobx-react/native";

@observer
export default class LoadingWebView extends Component {

    constructor(state) {
        super(state)
        let {url} = this.props;
        this.state = {
            isHide: false,
            isHttpFail: false,
            uri: url,
        }
        TW_LoaderOnValueJS = this.onLoadEvalueJS
    }

    static defaultProps = {
        title: ''
    };

    componentWillMount() {

    }

    componentDidMount(): void {

    }


    render() {
        let newUrl = TW_Store.dataStore.getHomeWebHome() + "/loading/loading.html";
        let myParam = "";
        let source = {
            file: newUrl,
            allowingReadAccessToURL: TW_Store.dataStore.getGameRootDir(),
            allowFileAccessFromFileURLs: TW_Store.dataStore.getGameRootDir(),
            param: myParam
        };
        if (!G_IS_IOS) {
            source = {
                uri: newUrl + `${myParam}`,
            };
        }

        let visible = TW_Store.gameUpateStore.isNeedUpdate
        if(!visible){
            return null;
        }
        // if (TW_IS_DEBIG) {
        //     source = require('./../../../android/app/src/main/assets/gamelobby/loading/loading.html');
        // }

        //andorid 显示有点小问题  黑屏处理
        if (this.state.isHide) {
            return <View style={{flex: 1, backgroundColor: "black"}}/>
        }
        let wenConteView = G_IS_IOS ? <WKWebView
                ref="myWebView"
                source={source}
                onShouldStartLoadWithRequest={this.onShouldStartLoadWithRequest}
                style={[styles.webView]}
                allowsInlineMediaPlayback={true}
                allowFileAccess={true}
                onError={this.onError}
                startInLoadingState={false}
                onMessage={this.onMessage}
                onLoadStart={this.onloadStart}
                onLoadEnd={this.onLoadEnd}
                // renderLoading={this.onRenderLoadingView}

            /> :
            <WebView
                ref="myWebView"
                useWebKit={true}
                automaticallyAdjustContentInsets={true}
                allowsInlineMediaPlayback={true}
                style={styles.webView}
                source={source}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                decelerationRate="normal"
                // renderLoading={this.onRenderLoadingView}
                startInLoadingState={false}

                onShouldStartLoadWithRequest={this.onShouldStartLoadWithRequest}
                allowFileAccess={true}
                onError={this.onError}
                onMessage={this.onMessage}
                onLoadEnd={this.onLoadEnd}
            />
        return (
            <View style={styles.container}>
                {!this.state.isHttpFail ? wenConteView : <View style={{
                    height: JX_PLAT_INFO.SCREEN_H, justifyContent: "center",
                    alignItems:
                        "center"
                }}>
                    <TCButtonView btnStyle={{width: 300}} onClick={() => {
                        TW_NavHelp.popToBack();
                        setTimeout(this.onBackHomeJs, 1000)
                    }} text={"返回大厅"}/>
                </View>}
            </View>
        );
    }


    onMessage = (event) => {

        let message = null;
        try {
            message = JSON.parse(event.nativeEvent.data);
            if (message) {
                this.onMsgHandle(message);
            }
        } catch (err) {
            TW_Log("onMessage===========erro==" + err, event.nativeEvent);
        }
    }

    onMsgHandle = (message) => {
        TW_Log("onMessage====LoadingWebView=======" + this.constructor.name, message);
        let url = "";
        if (message && message.action) {
            switch (message.action) {
                case "Log":
                    // TW_Log("game---ct=="+message.ct,message.data);
                    break;
                case  "game_custom":
                    TW_Store.gameUIStroe.showGusetView(!TW_Store.gameUIStroe.isShowGuest);
                    // TW_Store.gameUIStroe.isShowShare=!TW_Store.gameUIStroe.isShowShare
                    break;
            }
        }
    }

    handleUrl = (url) => {
        if (url && url.indexOf("../") > -1) {
            url = url.replace("../", "");
        }
        //  url = TW_Store.bblStore.homeDomain + "/" + url;
        return url
    }

    onError = (error) => {
        TW_Log("onError=====TCweb======event=====", error.nativeEvent)
    }

    onShouldStartLoadWithRequest = (event) => {
        TW_Log("onShouldStartLoadWithRequest=======TCweb====event=====", event);
        return true;
    };

    onLoadEvalueJS = (data) => {
        let dataStr = JSON.stringify(data);
        dataStr = dataStr ? dataStr : "";
        if(this.refs.myWebView){
            this.refs.myWebView.postMessage(dataStr, "*");
        }

        //this.refs.myWebView.evaluateJavaScript(`receivedMessageFromRN(${dataStr})`);
    }

    onNavigationStateChange = (navState) => {

        // TW_Log("navState===========onNavigationStateChange=====url==" + navState.url, navState)
        // let {onEvaleJS, isGame,isAddView} = this.props
        // if (navState.title == "404 Not Found") {
        //     if(!isGame) {
        //         TW_NavHelp.popToBack();
        //         this.setState({isHide: true})
        //     }
        //     this.setState({isHttpFail: true})
        //
        // } else {
        //     if (navState.url) {
        //         if (navState.url.indexOf("g_lobby/index.html") > -1) {
        //             TW_NavHelp.popToBack();
        //             this.setState({isHide: true})
        //             if (isGame) {
        //                 this.onBackHomeJs();
        //             }
        //             this.bblStore.lastGameUrl = "home"
        //         }
        //     }
        // }
    };


}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: "absolute",
        // zIndex:2000,
        height: JX_PLAT_INFO.SCREEN_H,
        width: JX_PLAT_INFO.SCREEN_W,
        backgroundColor: "yellow",
    },
    webView: {
        marginTop: 0,
        width: width,
        flex: 1,
        backgroundColor: "#000000",
    }
});
