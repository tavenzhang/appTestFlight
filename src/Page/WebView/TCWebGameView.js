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
            access_token: TCUSER_DATA.oauthToken.access_token,
        }

        JXLog("componentWillMount--- params==", params)
        if (params.isDZ) {
            let {gameData, gameId} = params
            bodyParam.gameId = gameId
            NetUitls.getUrlAndParamsAndPlatformAndCallback(config.api.gamesDZ_start + "/" + gameId,  bodyParam,gameData.gamePlatform, (ret) => {
                JXLog("TCWebGameView-------getUrlAndParamsAndPlatformAndCallback--platForm==" + ret.content, ret)
                if (ret.rs) {
                    this.setState({url: ret.content.gameUrl});
                } else {
                    this.setState({loadedFail: true})
                }
            })
        } else {
            let {gameData} = params
            NetUitls.getUrlAndParamsAndPlatformAndCallback(config.api.startGame, bodyParam,gameData.gamePlatform, (ret) => {
                JXLog("TCWebGameView-------startGame" + ret.content, ret)
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
        JXLog("TCWebTrendView-----  this.state.backButtonEnabled--", this.props.backButtonEnabled)
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
                <TopNavigationBar title={title} needBackButton={true} backButtonCall={this.onBack}
                                  rightTitle={'关闭'} rightButtonCall={() => JX_NavHelp.popToTop()}/>
                {conetView}
            </View>
        )
    }

    onBack = () => {
        if(this.state.backButtonEnabled){
            this.refs[WEBVIEW_REF].goBack();
        }
        else{
            JX_NavHelp.popToBack()
        }
    }

    onLoadError = (evt) => {
        JXLog("TCDefaultTendDomain----onLoadError==", evt)
        this.setState({loadedFail: true})
    }

    onShouldStartLoadWithRequest = (event) => {
        return true;
    };


    onNavigationStateChange = (navState) => {
        JXLog("TCDefaultTendDomain----onNavigationStateChange==", navState)
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


