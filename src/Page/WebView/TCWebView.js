import React, {Component} from 'react';

import {
    StyleSheet,
    View,
    WebView,
    Text
} from 'react-native';

import {width} from '../resouce/theme'
import WKWebView from "react-native-wkwebview-reborn/WKWebView";

import {withMappedNavigationProps} from 'react-navigation-props-mapper'
import TCImage from "../../Common/View/image/TCImage";
import {Images} from "../asset/images";
import {JX_PLAT_INFO} from "../asset";
import LoadingView from "../Main/LoadingView";


@withMappedNavigationProps()
export default class TCWebView extends Component {
    constructor(state) {
        super(state)
        this.state = {
            url: this.props.url,
            title: this.props.title
        }
        this.bblStore =  TW_Store.bblStore;
    }

    static defaultProps = {
        url: '',
        title: ''
    };

    componentWillMount(){
        TW_Store.bblStore.lastGameUrl="";
    }


    render() {
        let {url}=this.props;
        let source = {
            uri: url,
        }
        return (
            <View style={styles.container}>
                {
                    G_IS_IOS ? <WKWebView  source={source} onNavigationStateChange={this.onNavigationStateChange}
                                          onShouldStartLoadWithRequest={this.onShouldStartLoadWithRequest}
                                          style={styles.webView}
                                          allowFileAccess={true}
                                          onError={this.onError}
                                           startInLoadingState={true}
                                          onMessage={this.onMessage}
                                          onLoadStart={this.onloadStart}
                                          onLoadEnd={this.onLoadEnd}
                                           renderLoading={this.onRenderLoadingView}

                        /> :
                        <WebView
                            useWebKit={true}
                            automaticallyAdjustContentInsets={true}
                            style={styles.webView}
                            source={source}
                            javaScriptEnabled={true}
                            domStorageEnabled={true}
                            decelerationRate="normal"
                            renderLoading={this.onRenderLoadingView}
                            startInLoadingState={true}
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
    onLoadEnd=()=>{
        TW_Store.bblStore.isLoading=false
    }

    onRenderLoadingView = () => {

        return (<View style={{flex:1, backgroundColor:"black"}}>
            <LoadingView/>
            {/*<TCImage source={Images.bbl.gameBg} style={{width:JX_PLAT_INFO.SCREEN_W,height:JX_PLAT_INFO.SCREEN_H}}/>*/}
        </View>)
    }


    onLoadEnd=(event)=>{
        TW_Log("onLoadEnd=TCweb==========event=====", event)
        TW_Store.bblStore.isLoading=false
    }

    onloadStart=(event)=>{
        TW_Log("onloadStart==TCweb=========event=====", event)
    }

    onMessage=(event)=>{

        let message=null;
        try {
            message = JSON.parse(event.nativeEvent.data);
            if (message){
                this.onMsgHandle(message);
            }
        }catch (err) {
            TW_Log("onMessage===========erro=="+err,event.nativeEvent);
        }
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
                    TW_NavHelp.pushView(JX_Compones.WebView,{url})
                    break;
                case "game_back":
                    TW_NavHelp.popToBack();
                    break;
                case  "JumpUrl":
                    TN_Notification("JumpUrl","test");
                    url =this.handleUrl(message.au)
                    TW_NavHelp.pushView(JX_Compones.WebView,{url})
                    break;
            }
        }
    }

    handleUrl=(url)=>{
        if(url&&url.indexOf("../")>-1){
            url = url.replace("../","");
        }
        url = TW_Store.bblStore.homeDomain +"/"+url;
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

        TW_Log("navState===========onNavigationStateChange=====url=="+navState.url, navState)
        let {onEvaleJS,isGame} = this.props
        if(navState.url){
            if(navState.url.indexOf("g_lobby/index.html")>-1){
                if(navState.url.indexOf("g_lobby/index.html?status=1")>-1){
                    setTimeout(this.onBackHomeJs,1000);
                    onEvaleJS(this.bblStore.getWebAction(this.bblStore.ACT_ENUM.logout));
                }
                TW_NavHelp.popToBack();
                if(isGame){
                    setTimeout(this.onBackHomeJs,1000)
                }
                this.bblStore.lastGameUrl="home"
            }

        }
    };

    onBackHomeJs=()=>{
        let {onEvaleJS} = this.props
        onEvaleJS(TW_Store.bblStore.getWebAction(TW_Store.bblStore.ACT_ENUM.appData ,{isAtHome:false}));
        onEvaleJS(this.bblStore.getWebAction(this.bblStore.ACT_ENUM.playMusic));
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
