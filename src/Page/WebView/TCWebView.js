import React, {Component} from 'react';

import {
    StyleSheet,
    View,
} from 'react-native';

import {width} from '../asset/game/themeComponet'
import { WebView } from 'react-native-webview';

import {withMappedNavigationProps} from 'react-navigation-props-mapper'
import {JX_PLAT_INFO} from "../asset";
import TCButtonView from "../../Common/View/button/TCButtonView";
import {observer} from "mobx-react";
import PropTypes from "prop-types";


@withMappedNavigationProps()
@observer
export default class TCWebView extends Component {

    static propTypes = {
        data: PropTypes.func,
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
        TW_Store.bblStore.lastGameUrl = "";
        TW_Store.bblStore.isLoading = true;
        TW_Store.gameUpateStore.isInSubGame=true;
        TW_OnBackHomeJs=this.onBackHomeJs;
    }

    componentDidMount(): void {
    }

    componentWillUnmount(): void {
        TW_Store.gameUpateStore.isInSubGame=false;
    }


    render() {
        let {isOrigan,url}=this.props
        let myUrl = url;
        let tempIndex = myUrl.indexOf("?");
        let myParam = myUrl.substr(tempIndex);
         let homePre= myUrl.substring(0,tempIndex);
         let lastStr= homePre.substr(homePre.length-1)
        TW_Log("homePre.lastIndexOf-"+homePre.lastIndexOf("/"),lastStr)
         if(lastStr!="/"){
             homePre+="/";
         }
        let newUrl=  homePre+"index.html";
         if(TW_Store.appStore.clindId=='31'){
             myParam+="&time="+Math.random()*9999;
         }
        TW_Log("myUrl------------------------myParam--"+myParam+"-\n-newUrl----"+newUrl);
        let source = {
            file: newUrl,
            allowingReadAccessToURL: TW_Store.dataStore.getGameRootDir(),
            allowFileAccessFromFileURLs:TW_Store.dataStore.getGameRootDir(),
            param:myParam
        };
        if (!G_IS_IOS) {
            source = {
                uri: newUrl+`${myParam}`,
            };
        }else{
            if(isOrigan){
                source = {
                    uri: newUrl+`${myParam}`,
                };
            }
        }
        let injectJs = `window.appData=${JSON.stringify({
            isApp: true,
            taven: "isOk",
            clientId: TW_Store.appStore.clindId,
            urlJSON: TW_Store.bblStore.getUriConfig(),
            isAndroidHack:TW_Store.appStore.isInAnroidHack,
            deviceToken:TW_Store.appStore.deviceToken,
            loginDomain:TW_Store.bblStore.loginDomain+"/api/v1/account",
            gameDomain:TW_Store.bblStore.gameDomain+"/api/v1/gamecenter",
            affCode:TW_Store.appStore.userAffCode,
            isDebug:TW_IS_DEBIG,
            appVersion:TW_Store.appStore.versionHotFix,
            isAppSound:TW_Store.dataStore.isAppSound
        })},(function() {
  window.postMessage = function(data) {
    window.ReactNativeWebView.postMessage(data);
  };
})()`;
        let dis = TW_Store.bblStore.isLoading ? "none":"flex";
        TW_Log("TW_Store.bblStore.isLoading---"+TW_Store.bblStore.isLoading,dis);
        //andorid 显示有点小问题  黑屏处理
        if (this.state.isHide) {
            return <View style={{flex: 1, backgroundColor: "black"}}/>
        }
        let wenConteView = G_IS_IOS ? <WebView
                useWebKit={true}
                ref="myWebView"
                source={source} onNavigationStateChange={this.onNavigationStateChange}
                                                 onShouldStartLoadWithRequest={this.onShouldStartLoadWithRequest}
                                                 style={[styles.webView,{display:dis}]}
                                                 allowsInlineMediaPlayback={true}
                                                 allowFileAccess={true}
                                                 onError={this.onError}
                                                 startInLoadingState={false}
                                                 onMessage={this.onMessage}
                                                 mixedContentMode={"always"}
                                                 onLoadStart={this.onloadStart}
                                                 onLoadEnd={this.onLoadEnd}
                                                  injectedJavaScript={injectJs}
                                                 thirdPartyCookiesEnabled={true}/> :
            <WebView
                ref="myWebView"
                useWebKit={true}
                automaticallyAdjustContentInsets={true}
                allowsInlineMediaPlayback={true}
                style={[styles.webView,{width:TW_Store.appStore.screenW}]}
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
            <View style={styles.container}>
                {!this.state.isHttpFail ? wenConteView:<View style={{height:JX_PLAT_INFO.SCREEN_H, justifyContent:"center",
                    alignItems:
                "center"}}>
                    <TCButtonView btnStyle={{width:300}} onClick={()=>{
                        TW_NavHelp.popToBack();
                        setTimeout(this.onBackHomeJs, 1000)
                    }} text={"返回大厅"}/>
                </View>}
            </View>
        );
    }




    onLoadEnd = (event) => {
        TW_Log("onLoadEnd=TCweb==========event===== TW_Store.bblStore.isLoading--"+ TW_Store.bblStore.isLoading, event)
    }

    onloadStart = (event) => {
        TW_Store.bblStore.isLoading = false
        TW_Log("onloadStart==TCweb=========event=====", event)
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
                    TW_NavHelp.popToBack();
                    this.onBackHomeJs()
                    break;
                case  "JumpUrl":
                    url = this.handleUrl(message.au)
                    if(TW_Store.appStore.isInAnroidHack){
                        //如果处于审核状态 只跳用户中心 其他页面不跳转
                        if(url.indexOf("module=account")>-1){
                            TW_NavHelp.pushView(JX_Compones.WebView, {url});

                        }else{

                        }
                    }else{
                        TW_NavHelp.pushView(JX_Compones.WebView, {url})
                    }

                    break;
                case "game_recharge":
                    TW_Store.gameUIStroe.isShowAddPayView=!TW_Store.gameUIStroe.isShowAddPayView;
                    break;
                case "game_start": //子游戏准备ok
                    break;
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
        TW_Log("onShouldStartLoadWithRequest=======TCweb====event=====", event);
        return true;
    };

    onNavigationStateChange = (navState) => {

        TW_Log("navState===========onNavigationStateChange=====url==" + navState.url, navState)
        let {onEvaleJS, isGame,isAddView} = this.props
        if (navState.title == "404 Not Found") {
            if(!isGame) {
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

        let {onEvaleJS} = this.props
        TW_Log("onEvaleJS---onBackHomeJs--",onEvaleJS)
        if (onEvaleJS) {
            onEvaleJS(this.bblStore.getWebAction(TW_Store.bblStore.ACT_ENUM.appData, {isAtHome: true}));
            onEvaleJS(this.bblStore.getWebAction(this.bblStore.ACT_ENUM.lobbyResume));
        }
        
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000000",
    },
    webView: {
        marginTop: 0,
        width: width,
        backgroundColor: "#000000",
    }
});
