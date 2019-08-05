import React, {Component} from 'react';

import {
    StyleSheet,
    View,
    Clipboard
} from 'react-native';


import {WebView} from 'react-native-webview';


import {JX_PLAT_INFO} from "../asset";

import {observer} from "mobx-react";
import PropTypes from "prop-types";
import {SoundHelper} from "../../Common/JXHelper/SoundHelper";
import Toast from "../../Common/JXHelper/JXToast";


@observer
export default class TWWebGameView extends Component {

    static propTypes = {
        data: PropTypes.func,
        isShow: PropTypes.any
    }

    constructor(state) {
        super(state)
        this.state = {
            isHide: false,
            isHttpFail: false,
        }
        this.bblStore = TW_Store.bblStore;
    }

    static defaultProps = {
        title: ''
    };

    componentWillMount() {
        TW_OnBackHomeJs = this.onBackHomeJs;
    }


    render() {
        let {isOrigan, url} = this.props;
        let myUrl = url;
        if (url == "") {
            return null
        }
        let tempIndex = myUrl.indexOf("?");
        let myParam = myUrl.substr(tempIndex);
        let homePre = myUrl.substring(0, tempIndex);
        let lastStr = homePre.substr(homePre.length - 1)
        TW_Log("homePre.lastIndexOf-" + homePre.lastIndexOf("/"), lastStr)
        if (lastStr != "/") {
            homePre += "/";
        }
        let newUrl = homePre + "index.html";
        if (TW_Store.appStore.clindId == '31') {
            myParam += "&time=" + Math.random() * 9999;
        }
        TW_Log("myUrl------------------------myParam--" + myParam + "-\n-newUrl----" + newUrl);
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
        } else {
            if (isOrigan) {
                source = {
                    uri: newUrl + `${myParam}`,
                };
            }
        }
        let injectJs = `(function() {
              window.postMessage = function(data) {
                window.ReactNativeWebView.postMessage(data);
              };
            })()`;

        let wenConteView =
            <WebView
                ref="myWebView"
                originWhitelist={['*']}
                useWebKit={true}
                injectedJavaScript={injectJs}
                automaticallyAdjustContentInsets={true}
                allowsInlineMediaPlayback={true}
                style={styles.webView}
                source={source}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                mixedContentMode={"always"}
                decelerationRate="normal"
                startInLoadingState={false}
                onNavigationStateChange={this.onNavigationStateChange}
                onShouldStartLoadWithRequest={this.onShouldStartLoadWithRequest}
                allowFileAccess={true}
                onError={this.onError}
                onMessage={this.onMessage}
                onLoadEnd={this.onLoadEnd}
                thirdPartyCookiesEnabled={true}
            />
        return (
            <View style={[styles.container]}>
                {!this.state.isHttpFail ? wenConteView : <View style={{
                    height: JX_PLAT_INFO.SCREEN_H, justifyContent: "center",
                    alignItems: "center", backgroundColor: "transparent"
                }}>
                </View>}
            </View>
        );
    }


    onLoadEnd = (event) => {
        let {isOrigan, url} = this.props;
        if (url && url.length > 0) {
            this.timeId = setTimeout(this.onEnterGame, G_IS_IOS ? 1000 : 4000)
        }
        TW_Log("onLoadEnd=TCweb==========event===== TW_Store.bblStore.isLoading--" + TW_Store.bblStore.isLoading, event)
    }

    onloadStart = (event) => {
        TW_Store.bblStore.isLoading = false
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
        TW_Log("onMessage===========" + this.constructor.name, message);
        let url = "";
        if (message && message.action) {
            switch (message.action) {
                case "Log":
                    // TW_Log("game---ct=="+message.ct,message.data);
                    break;
                case "JumpGame":
                    url = this.handleUrl(message.au)
                    TW_NavHelp.pushView(JX_Compones.WebView, {url})
                    break;
                case "game_back":
                    this.onBackHomeJs()
                    break;
                case "game_recharge":
                    TW_Store.gameUIStroe.isShowAddPayView = !TW_Store.gameUIStroe.isShowAddPayView;
                    break;
                case "game_start": //子游戏准备ok
                    this.onEnterGame();
                    break;
                case "copylink":
                    Clipboard.setString(message.param);
                    if (message.hint && message.hint.length > 0) {
                        Toast.showShortCenter(message.hint);
                    } else {
                        Toast.showShortCenter("已复制成功!");
                    }
                    break;
            }
        }
    }

    onEnterGame = () => {
        TW_Store.bblStore.lastGameUrl = "";
        if (!TW_Store.gameUpateStore.isInSubGame) {
            TW_Store.gameUpateStore.isInSubGame = true
            clearTimeout(this.timeId)
            TW_Store.bblStore.showGameCircle(false);
            if (TW_OnValueJSHome) {
                TW_OnValueJSHome(TW_Store.bblStore.getWebAction(TW_Store.bblStore.ACT_ENUM.enterGame));
                TW_OnValueJSHome(TW_Store.bblStore.getWebAction(TW_Store.bblStore.ACT_ENUM.stopMusic, {}));
                if (TW_Store.dataStore.isAppSound) {
                    SoundHelper.pauseMusic();
                }
            }
        }
    }
    handleUrl = (url) => {
        if (url && url.indexOf("../") > -1) {
            url = url.replace("../", "");
        }
        url = TW_Store.bblStore.gameDomain + "/" + url;
        return url
    }

    onError = (error) => {
        TW_Log("onError=====TCweb======event=====", error.nativeEvent)
    }

    onShouldStartLoadWithRequest = (event) => {
        TW_Log("onShouldStartLoadWithRequest=======TWWebGameView====event=====", event);
        return true;
    };

    onNavigationStateChange = (navState) => {

        TW_Log("TWWebGameView===========onNavigationStateChange=====url==" + navState.url, navState)
        let {onEvaleJS, isGame, isAddView} = this.props
        if (navState.title == "404 Not Found") {
            if (!isGame) {
                TW_NavHelp.popToBack();
                this.setState({isHide: true})
            }
            this.setState({isHttpFail: true})

        } else {
            if (navState.url) {
                if (navState.url.indexOf("g_lobby/index.html") > -1) {
                    TW_NavHelp.popToBack();
                    this.setState({isHide: true})
                    if (isGame) {
                        this.onBackHomeJs();
                    }
                    this.bblStore.lastGameUrl = "home"
                }
            }
        }

    };

    onBackHomeJs = () => {
        let {onEvaleJS} = this.props;
        TW_Store.gameUpateStore.isInSubGame = false;
        if (TW_Store.dataStore.isAppSound) {
            SoundHelper.onCheckPalyMusic();
        }
        TW_Store.bblStore.quitSubGame();
        clearTimeout(this.timeId);
        if (onEvaleJS) {
            onEvaleJS(this.bblStore.getWebAction(TW_Store.bblStore.ACT_ENUM.appData, {isAtHome: true}));
            onEvaleJS(this.bblStore.getWebAction(this.bblStore.ACT_ENUM.lobbyResume));
        }
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "transparent",
    },
    webView: {
        marginTop: 0,
        flex: 1,
        backgroundColor: "transparent"
    }
});
