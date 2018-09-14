/**
 * Created by Sam on 2016/11/16.
 */


import React, {Component} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View, WebView} from 'react-native';
import TopNavigationBar from '../../Common/View/TCNavigationBar'
import Moment from 'moment'
import LoadingSpinnerOverlay from '../../Common/View/LoadingSpinnerOverlay'

import {configAppId} from '../resouce/appConfig'
import {common} from "../resouce/images";
import PropTypes from 'prop-types'
import {indexBgColor, Size} from "../resouce/theme";
import {bottomNavHeight, JX_PLAT_INFO} from '../asset'
import {StatusBarHeight} from "../asset/screen";

const lotteryType = ['HF_CQSSC', 'HF_LFSSC', 'HF_XJSSC', 'HF_TJSSC', 'HF_FFSSC', 'X3D', 'HF_LFPK10', 'HF_BJPK10', 'HF_FFPK10', 'HF_GDD11', 'HF_AHD11', 'HF_JXD11', 'HF_SDD11', 'HF_SHD11', 'HF_JSK3', 'HF_GXK3', 'HF_AHK3', 'HF_FFK3', 'HF_SHSSL', 'PL3', 'HF_BJK3', 'HF_JLK3', 'HF_XYFT', 'HF_XYSM']

export default class TCTrend extends Component {

    constructor(state) {
        JXLog("TCDefaultTendDomain----TCTrend")
        super(state)
        this.type = ''
        //this.baseUrl = '' + (TCDefaultTendDomain?TCDefaultTendDomain:trendServer) + '/trend?gameUniqueId='
        this.baseUrl = `${TCDefaultTendDomain}/trend_v2?gameUniqueId=`
        this.state = {
            lotteryType: null,
            title: "走势图",
            url: this.baseUrl + lotteryType[0] +`&showBack=false&clientId=${configAppId}&height=${JX_PLAT_INFO.MarginBarHeight}`,
            //url: this.baseUrl + lotteryType[0] +"&showBack=false&clientId=19"+ '&navigationBar=0'
            loadedFail: false
        }
        this.initUrl=this.state.url;
    }

    static propTypes = {
        title: PropTypes.string,
        type:   PropTypes.string,
    }

    static defaultProps = {
        title: '',
        type: '',
    };

    componentDidMount() {
       this.showSpinerView();
    }

    componentWillUnmount() {
        this.hideSpinerView()
    }

    render() {
        let containStyle = JX_PLAT_INFO.IS_IphoneX ? styles.containerIOS : styles.container
        let contentView = (<View style={containStyle} >
            <WebView
                bounces={false}
                automaticallyAdjustContentInsets={false}
                style={styles.webView}
                source={{uri: this.state.url}}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                decelerationRate="normal"
                startInLoadingState={true}
                scalesPageToFit={true}
                onNavigationStateChange={this.onNavigationStateChange}
                onShouldStartLoadWithRequest={this.onShouldStartLoadWithRequest}
                // onMessage={e => this._listener(e.nativeEvent)}
                onLoadEnd={this.onLoadEnd}
                onLoadStart={this.onLoadStart}
                onError={this.onLoadError}
            />
            <LoadingSpinnerOverlay
                ref={component => this._modalLoadingSpinnerOverLay = component}/>
            <View style={{position:"absolute", justifyContent: "center", alignItems: "center",flexDirection: "row",top:JX_PLAT_INFO.MarginBarHeight+5, zIndex:100, left:5}}>
                <TouchableOpacity onPress={this.onBack}>
                    <View style={{justifyContent: 'center', alignItems: 'center', marginRight:8}}>
                        <Image source={common.back} style={{width:35, height:35}}/>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.refresh}>
                    <View style={{justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{color:"white", backgroundColor: "transparent",fontSize:Size.font16, fontWeight:"bold"}}>{"刷新"}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>)
        if(this.state.loadedFail){
            contentView =<View style={[containStyle]}>
                <TopNavigationBar
                    title={"走势"}
                    needBackButton={false}
                    leftTitle={'刷新 '}
                    backButtonCall={()=> {
                        this.refresh()}}
                />
                <View style={{flex:1, justifyContent:"center", alignItems:"center"}}>
                    <Text style={{fontSize:14, fontWeight:"bold"}}>页面数据加载失败!</Text>
                </View>
                <LoadingSpinnerOverlay
                    ref={component => this._modalLoadingSpinnerOverLay = component}/>
            </View>
        }
        return contentView
    }

    onLoadStart = (evt) => {
        // JXLog("TCDefaultTendDomain----onLoadStart", evt)
        this.hideSpinerView();
    }

    onLoadEnd = (evt) => {
        // JXLog("TCDefaultTendDomain----onLoadEnd==end", evt)
        this.hideSpinerView();
    }

    onLoadError = (evt) => {
        // JXLog("TCDefaultTendDomain----onLoadError==", evt)
        this.setState({loadedFail:true})
        this.hideSpinerView();
    }

    showSpinerView = () => {
        this._modalLoadingSpinnerOverLay&&this._modalLoadingSpinnerOverLay.show()
    }

    hideSpinerView = () => {
        this._modalLoadingSpinnerOverLay && this._modalLoadingSpinnerOverLay.hide()
    }


    refresh=()=> {
        this.setState({loadedFail:false,url: this.initUrl + '&temp=' +Moment().format('x')},()=>{
            this.showSpinerView();
        })
    }


    onShouldStartLoadWithRequest = (event) => {
        return true;
    };


    onNavigationStateChange = (navState) => {
        // JXLog("TCDefaultTendDomain---navState==", navState)
        this.setState({
            backButtonEnabled: navState.canGoBack,
            title: navState.title,
            scalesPageToFit: true
        });
    };

    onBack=()=>{
        JX_Store.mainStore.changeTab('home')
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:indexBgColor.mainBg,
        paddingTop: StatusBarHeight,
    },
    containerIOS: {
        height:SCREEN_H -bottomNavHeight,
        width: SCREEN_W,
        backgroundColor: indexBgColor.mainBg
    },
    webView: {
       //height:JX_PLAT_INFO.screenH -JX_PLAT_INFO.bottomNavHeight,
        flex:1,
        width: SCREEN_W,
        marginTop: -StatusBarHeight,
    }
});

