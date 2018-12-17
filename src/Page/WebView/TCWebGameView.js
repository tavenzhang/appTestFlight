import React, {} from 'react';
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
import NetUitls from "../../Common/Network/TCRequestUitls";
import {config} from "../../Common/Network/TCRequestConfig";
import {JX_PLAT_INFO, TC_SCREEN, themeViewStyle} from '../asset'
import userStore from '../../Data/store/UserStore'
import {common} from "../asset/images";
import TCNavigatorHelper from "../../Common/JXHelper/TCNavigatorHelper";
import {Size} from "../resouce/theme";

//专门为体育电子准备
export default class TCWebGameView extends React.Component {

    constructor(state) {
        super(state)
        this.state = {
            loadedFail: false,
            url: "",
            backButtonEnabled: false,
        }
    }

    componentWillMount() {
        let params = this.props.navigation.state.params;
        let bodyParam = {
            access_token: userStore.access_token,
        }
        TW_Log("componentWillMount--- params==", params)
        if (params.isDZ) {
            let {gameData, gameId} = params
            bodyParam.gameId = gameId
            NetUitls.getUrlAndParamsAndPlatformAndCallback(config.api.gamesDZ_start + "/" + gameId,  bodyParam,gameData.gamePlatform, (ret) => {
                TW_Log("TCWebGameView-------getUrlAndParamsAndPlatformAndCallback--platForm==" + ret.content, ret)
                if (ret.rs) {
                    this.setState({url: ret.content.gameUrl});
                } else {
                    this.setState({loadedFail: true});
                }
            })
        } else {
            let {gameData} = params
            NetUitls.getUrlAndParamsAndPlatformAndCallback(config.api.startGame, bodyParam,gameData.gamePlatform, (ret) => {
                TW_Log("TCWebGameView-------startGame" + ret.content, ret);
                if (ret.rs) {
                   // this.setState({url: "https://www.google.com.hk"});
                     this.setState({url: ret.content.gameUrl});
                } else {
                    this.setState({loadedFail: true})
                }
            })
        }
    }


    render() {
        TW_Log("TCWebTrendView-----  this.state.backButtonEnabled--", this.props.backButtonEnabled)
        let {title} = this.props.navigation.state.params

        let conetView = <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
            <Text style={{fontSize: 14, fontWeight: "bold"}}>页面数据加载失败,请稍后重试!</Text>
        </View>
        if (!this.state.loadedFail) {
            conetView = <View style={{flex: 1}}>
                {
                    this.state.url != "" ? <WebView
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
                        onError={this.onLoadError}/> : null
                }
            </View>
        }
        return (
            <View style={themeViewStyle.containView}>
                <TopNavigationBar  title={title} needBackButton={true} backButtonCall={this.onBack}
                                  rightTitle={'额度转换'} rightButtonCall={this.onTransMoney}/>
                {conetView}
                {this.state.backButtonEnabled ? <TouchableOpacity onPress={TW_NavHelp.popToBack} style={{position: "absolute",
                        justifyContent: "center",
                        alignItems: "center",
                        top: JX_PLAT_INFO.MarginBarHeight + 12,
                        zIndex: 100,
                        left: 45}}>
                        <View style={{justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={{
                                color: "white",
                                backgroundColor: "transparent",
                                fontSize: Size.font18,
                                fontWeight: "bold"
                            }}>{"关闭"}</Text>
                        </View>
                    </TouchableOpacity>:null}
            </View>
        )
    }

    onTransMoney=()=>{
        let {title,platName,isDZ} = this.props.navigation.state.params;
        TW_NavHelp.pushView(JX_Compones.UserTransfer,{platName:isDZ ? platName: title.substr(0,2)});
    }

    onBack = () => {
        if(this.state.backButtonEnabled){
            this.refs[WEBVIEW_REF].goBack();
        }
        else{
            TW_NavHelp.popToBack()
        }
    }

    onLoadError = (evt) => {
        TW_Log("TCDefaultTendDomain----onLoadError==", evt)
        this.setState({loadedFail: true})
    }

    onShouldStartLoadWithRequest = (event) => {
        return true;
    };


    onNavigationStateChange = (navState) => {
        TW_Log("TCDefaultTendDomain----onNavigationStateChange==", navState)
        this.setState({
            backButtonEnabled: navState.canGoBack,
            // title: navState.title,
            scalesPageToFit: false
        });
    };


}

const styles = StyleSheet.create({

    webView: {
        flex: 1,
        width: TC_SCREEN
    }
});


