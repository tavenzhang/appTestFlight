/**
 * Created by Sam on 16/01/2017.
 * Copyright © 2016年 JX. All rights reserved.
 */

import React, {
} from 'react';
import {
    StyleSheet,
    Text,
    View,
    WebView,
    Image,
    TouchableOpacity,
    InteractionManager
} from 'react-native';

import TopNavigationBar from '../../Common/View/TCNavigationBar';
var WEBVIEW_REF = 'webview';

import {configAppId} from "../resouce/appConfig";
import {common} from "../resouce/images";
import Moment from "moment/moment";
import TCNavigatorHelper from "../../Common/JXHelper/TCNavigatorHelper";

//专门为趋势图准备
export default class TCWebTrendView extends React.Component {

    constructor(state) {
        super(state)
        this.state ={
            loadedFail:false,
            game: this.props.navigation.state.params.game,
            title:this.props.navigation.state.params.title,
            url:""
        }
    }

    componentDidMount(){
        let link =`${TCDefaultTendDomain}/trend_v2?gameUniqueId=${this.state.game}&showBack=false&clientId=${configAppId}&height=${JX_PLAT_INFO.MarginBarHeight}`;
        JXLog("TCWebTrendView-----  link==",link)
        this.setState({url: link});
    }

    render() {
         JXLog("TCWebTrendView-----  TCWebTrendView",this.props)
         let containStyle = JX_PLAT_INFO.IS_IphoneX ? styles.containerIOS : styles.container
        if(this.state.loadedFail){
            return (<View style={[containStyle]}>
                <TopNavigationBar title={this.state.title}
                backButtonCall={()=> {TCNavigatorHelper.popToBack}}/>
                <View style={{flex:1, justifyContent:"center", alignItems:"center"}}>
                    <Text style={{fontSize:14, fontWeight:"bold"}}>页面数据加载失败!</Text>
                </View>
            </View>)
        }else{
            return (<View style={containStyle}>
                {
                    this.state.url!="" ?  <WebView
                        bounces={false}
                        ref={WEBVIEW_REF}
                        automaticallyAdjustContentInsets={true}
                        style={styles.webView}
                        source={{uri: this.state.url}}
                        javaScriptEnabled={true}
                        domStorageEnabled={true}
                        decelerationRate="normal"
                        startInLoadingState={true}
                        scalesPageToFit={true}
                        onNavigationStateChange={this.onNavigationStateChange}
                        onShouldStartLoadWithRequest={this.onShouldStartLoadWithRequest}
                        onError={this.onLoadError}/>:null
                }
                { this.state.url!="" ? <View style={{position:"absolute", justifyContent: "center", alignItems: "center",flexDirection: "row",top:JX_PLAT_INFO.MarginBarHeight+5, zIndex:100, left:5}}>
                    <TouchableOpacity onPress={TCNavigatorHelper.popToBack}>
                        <View style={{justifyContent: 'center', alignItems: 'center', marginRight:8}}>
                            <Image source={common.back} style={{width:35, height:35}}/>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.refresh}>
                        <View style={{justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={{color:"white", backgroundColor: "transparent",fontSize:16, fontWeight:"bold"}}>{"刷新"}</Text>
                        </View>
                    </TouchableOpacity>
                </View>:null}
            </View>);
        }
    }

    onLoadError = (evt) => {
        JXLog("TCDefaultTendDomain----onLoadError==", evt)
        this.setState({loadedFail:true})
    }

    onShouldStartLoadWithRequest = (event) => {
        return true;
    };


    onNavigationStateChange = (navState) => {
        JXLog("TCDefaultTendDomain----onNavigationStateChange==",navState)
        this.setState({
            backButtonEnabled: navState.canGoBack,
            // title: navState.title,
            scalesPageToFit: false
        });
    };


    refresh=()=> {
        this.setState({loadedFail:false,url: this.state.url + '&temp=' + Moment().format('X')}, () => {

        })
    }


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:JX_PLAT_INFO.indexBgColor.mainBg
    },
    containerIOS: {
        height:JX_PLAT_INFO.screenH -33,
        width: JX_PLAT_INFO.screenW,
        backgroundColor: JX_PLAT_INFO.indexBgColor.mainBg
    },
    webView: {
         flex:1,
        width: JX_PLAT_INFO.screenW,
    }
});


