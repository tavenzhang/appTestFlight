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
import Moment from "moment/moment";
import NetUitls from "../../Common/Network/TCRequestUitls";
import {config} from "../../Common/Network/TCRequestConfig";
import {common} from "../resouce/images";
import TCNavigatorHelper from "../../Common/JXHelper/TCNavigatorHelper";

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

        JXLog("export default class TCWebGameView extends React.Component ", params)
        if (params.isDZ) {
            let {gameData, gameId} = params
            bodyParam.gameId = gameId
            NetUitls.getUrlAndParamsAndPlatformAndCallback(config.api.gamesDZ_start + "/" + gameId, gameData.gamePlatform, bodyParam, (ret) => {
                JXLog("TCWebGameView-------getUrlAndParamsAndPlatformAndCallback--platForm==" + ret.content, ret)
                if (ret.rs) {
                    this.setState({url: ret.content.gameUrl});
                } else {
                    this.setState({loadedFail: true})
                }
            })
        } else {
            let {gameData} = params
            NetUitls.getUrlAndParamsAndPlatformAndCallback(config.api.startGame, gameData.gamePlatform, bodyParam, (ret) => {
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
        return (<View style={JX_ThemeViewStyle.containView}>
            <TopNavigationBar title={title} needBackButton={this.state.backButtonEnabled ? true:false} backButtonCall={this.onBack}/>
            {conetView}
           <View style={{
                position: "absolute",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
                top: JX_PLAT_INFO.MarginBarHeight + 12,
                zIndex: 100,
                left: 55
            }}>
                <TouchableOpacity onPress={JX_NavHelp.popToBack}>
                    <View style={{justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{
                            color: "white",
                            backgroundColor: "transparent",
                            fontSize: 20,
                            fontWeight: "bold"
                        }}>{"关闭"}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>);
    }

    onBack = () => {
        this.refs[WEBVIEW_REF].goBack();
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
        width: JX_PLAT_INFO.screenW,
    }
});


