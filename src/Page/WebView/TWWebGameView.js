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
import PropTypes from "prop-types";
import {G_LayoutAnimaton} from "../../Common/Global/G_LayoutAnimaton";


@observer
export default class TWWebGameView extends Component {

    static propTypes = {
        data: PropTypes.func,
        isShow:false
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

        TW_OnBackHomeJs=this.onBackHomeJs;
    }

    // componentWillUpdate(nextProps, nextState, nextContext: any): void {
    //     G_LayoutAnimaton.configureNext(G_LayoutAnimaton.springWithDelete)
    // }



    componentWillUnmount(): void {
       // TW_Store.gameUpateStore.isInSubGame=false;
    }

    componentWillReceiveProps(nextProps, nextContext: any): void {
        // let {isOrigan,url,isShow}=nextProps;
        // if(this.refs.myView){
        //     this.refs.myView.setNativeProps({style: {top:isShow ?0:2000}});
        // }
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

        let dis = TW_Store.bblStore.isLoading ? "none":"flex";



        let wenConteView = G_IS_IOS ? <WKWebView
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
                                                 thirdPartyCookiesEnabled={true}


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
            <View style={[styles.container]} >
                {!this.state.isHttpFail ? wenConteView:<View style={{height:JX_PLAT_INFO.SCREEN_H, justifyContent:"center",
                    alignItems: "center", backgroundColor: "transparent"}}>
                </View>}
            </View>
        );
    }



    onLoadEnd = (event) => {

        TW_Log("onLoadEnd=TCweb==========event===== TW_Store.bblStore.isLoading--"+ TW_Store.bblStore.isLoading, event)
        setTimeout(()=>{
            TW_Store.bblStore.lastGameUrl = "";
            TW_Store.bblStore.showGameCircle(false);
        },G_IS_IOS ? 1000:2500)

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
                    this.onBackHomeJs()
                    //TW_NavHelp.popToBack();
                   // this.onBackHomeJs()
                    break;
                case "game_recharge":
                    TW_Store.gameUIStroe.isShowAddPayView=!TW_Store.gameUIStroe.isShowAddPayView;
                    break;
                case "game_start": //子游戏准备ok
                    TW_Store.bblStore.lastGameUrl = "";
                    TW_Store.bblStore.showGameCircle(false);
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
        TW_Store.bblStore.subGameParams={
            url:"",
            isGame: true
        }
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
        backgroundColor: "transparent",
    },
    webView: {
        marginTop: 0,
        flex:1,
        backgroundColor: "transparent"
    }
});
