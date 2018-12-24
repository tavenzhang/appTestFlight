import React, {Component} from 'react';

import {
    StyleSheet,
    View,
    WebView,
} from 'react-native';
import RNFS from "react-native-fs";
import {width, indexBgColor} from '../resouce/theme'
import WKWebView from "react-native-wkwebview-reborn/WKWebView";

import {withMappedNavigationProps} from 'react-navigation-props-mapper'

@withMappedNavigationProps()
export default class TCWebView extends Component {
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
        // setTimeout(()=>{
        //     TW_NavHelp.popToBack()
        //     TW_Log("componentDidMount=======popToTop========", )
        // },6000)
        TW_Log("componentDidMount===============", )
    }


    componentWillUnmount() {
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
        url = TW_Store.bblStore.homeDomain +"/"+url
        return url
    }

    onError = (error) => {
        TW_Log("onError=====TCweb======event=====", error.nativeEvent)
    }

    onShouldStartLoadWithRequest = (event) => {
        TW_Log("onShouldStartLoadWithRequest=======TCweb====event=====", event)
        return true;
    };

    onNavigationStateChange = (navState) => {
        TW_Log("navState===========onNavigationStateChange=====url=="+navState.url, navState)
        let {onEvaleJS} = this.props
        if(navState.url){
            if(navState.url.indexOf("g_lobby/index.html")>-1){
                if(navState.url.indexOf("g_lobby/index.html?status=1")>-1){
                    onEvaleJS({action:"logout"});
                }
                TW_NavHelp.popToBack();
            }

        }
    };

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
