
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
import NetUitls from "../../Common/Network/TCRequestUitls";
import {config} from "../../Common/Network/TCRequestConfig";

//专门为趋势图准备

export default class TCWebGameView extends React.Component {

    constructor(state) {
        super(state)
        this.state = {
            loadedFail:false,
            url:"",
        }
    }

    componentWillMount() {
        let params=this.props.navigation.state.params;
        let bodyParam={
            access_token:TCUSER_DATA.oauthToken.access_token,
        }
        JXLog("export default class TCWebGameView extends React.Component ",params)
        if(params.isDZ){

            let {gameData,gameId}  = params
                bodyParam.gameId=gameId
                NetUitls.getUrlAndParamsAndPlatformAndCallback(config.api.gamesDZ_start+"/"+gameId,gameData.gamePlatform,bodyParam,(ret)=>{
                JXLog("TCWebGameView-------getUrlAndParamsAndPlatformAndCallback--platForm=="+ret.content,ret)
                if(ret.rs){
                    this.setState({url: ret.content.gameUrl});
                }else{
                    this.setState({loadedFail:true})
                }
            })
        }else{
            let {gameData}  = params
            NetUitls.getUrlAndParamsAndPlatformAndCallback(config.api.startGame,gameData.gamePlatform,bodyParam,(ret)=>{
                JXLog("TCWebGameView-------startGame"+ret.content,ret)
                if(ret.rs){
                    this.setState({url: ret.content.gameUrl});
                }else{
                    this.setState({loadedFail:true})
                }
            })
        }

    }

    componentDidMount(){
       // this.setState({url: link});
    }

    render() {
        //JXLog("TCWebTrendView-----  TCWebTrendView",this.props)
        let {title}  = this.props.navigation.state.params
        let containStyle = JX_PLAT_INFO.IS_IphoneX ? styles.containerIOS : styles.container
        if(this.state.loadedFail){
            return (<View style={[containStyle]}>
                <TopNavigationBar title={title}
                                  backButtonCall={JX_NavHelp.popToBack}/>
                <View style={{flex:1, justifyContent:"center", alignItems:"center"}}>
                    <Text style={{fontSize:14, fontWeight:"bold"}}>页面数据加载失败,请稍后重试!</Text>
                </View>
            </View>)
        }else{
            return (<View style={JX_ThemeViewStyle.containView}>
                <TopNavigationBar title={title}
                                  backButtonCall={JX_NavHelp.popToBack}/>
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
                {/*{ this.state.url!="" ? <View style={{position:"absolute", justifyContent: "center", alignItems: "center",flexDirection: "row",top:JX_PLAT_INFO.MarginBarHeight+5, zIndex:100, left:5}}>*/}
                    {/*<TouchableOpacity onPress={TCNavigatorHelper.popToBack}>*/}
                        {/*<View style={{justifyContent: 'center', alignItems: 'center', marginRight:8}}>*/}
                            {/*<Image source={common.back} style={{width:35, height:35}}/>*/}
                        {/*</View>*/}
                    {/*</TouchableOpacity>*/}
                    {/*<TouchableOpacity onPress={this.refresh}>*/}
                        {/*<View style={{justifyContent: 'center', alignItems: 'center'}}>*/}
                            {/*<Text style={{color:"white", backgroundColor: "transparent",fontSize:16, fontWeight:"bold"}}>{"刷新"}</Text>*/}
                        {/*</View>*/}
                    {/*</TouchableOpacity>*/}
                {/*</View>:null}*/}
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
       flex:1,
        width: JX_PLAT_INFO.screenW,
        backgroundColor: JX_PLAT_INFO.indexBgColor.mainBg
    },
    webView: {
        flex:1,
        width: JX_PLAT_INFO.screenW,
    }
});


