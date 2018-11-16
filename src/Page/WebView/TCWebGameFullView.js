import React from 'react';
import { StyleSheet, Text, View, WebView, Alert,
    NativeModules,StatusBar,TouchableOpacity } from 'react-native';

var WEBVIEW_REF = 'webview';
import NetUitls from '../../Common/Network/TCRequestUitls';
import { config, appId } from '../../Common/Network/TCRequestConfig';
import TCNavigatorHelper from '../../Common/JXHelper/TCNavigatorHelper';
import JDToast from "../../Common/JXHelper/JXToast";
import { ASSET_Other, JX_PLAT_INFO } from '../asset';
import { indexBgColor, Size } from '../resouce/theme';
import TCTouchMoveButton from '../../Common/View/button/TCTouchMoveButton';
import {withMappedNavigationProps} from 'react-navigation-props-mapper'
import TCImage from '../../Common/View/image/TCImage';
import _ from 'lodash';
import UserStore from "../../Data/store/UserStore";

let MyDefaultColor = 'black';
//专门为体育电子准备
@withMappedNavigationProps()
export default class TCWebGameFullView extends React.Component {
    constructor(state) {
        super(state);
        this.state = {
            loadedFail: false,
            url: '',
            backButtonEnabled: false
        };
    }

    componentWillMount() {
        let { isDZ, gameData, gameId } = this.props;
        let bodyParam = {
            //    access_token: TCUSER_DATA.oauthToken.access_token,
        };

        //自己的游戏特殊处理
        JXLog('gameData'+JSON.stringify(gameData))

        if (gameData.gamePlatform === 'bobo' || gameData.gamePlatformType == 2) {
            StatusBar.setHidden(true);
            NetUitls.getUrlAndParamsAndCallback(
                config.api.getInternalStartGame,
                {
                    platformCode: gameData.gamePlatform,
                    clientId: appId,
                    token: UserStore.access_token
                },
                ret => {
                    if (ret.rs) {
                        this.setState({ url: ret.content.url });
                    } else {
                        this.setState({ loadedFail: true });
                        JDToast.showLongCenter(ret.message);
                    }
                }
            );
        }else{
            if (isDZ) {
                StatusBar.setHidden(true);
                bodyParam.gameId = gameId;
                NetUitls.getUrlAndParamsAndPlatformAndCallback(
                    config.api.gamesDZ_start + '/' + gameId,
                    bodyParam,
                    gameData.gamePlatform,
                    ret => {
                        if(NativeModules&&NativeModules.JXHelper&&NativeModules.JXHelper.regIosDefaultData){
                            let data = { UserAgent: 'Browser_Type/Android_APP' };
                            if (NativeModules.JXHelper.regIosDefaultData) {
                                NativeModules.JXHelper.regIosDefaultData(data);
                            }
                        }
                        if (ret.rs) {
                            this.setState({ url: ret.content.gameUrl });
                        } else {
                            this.setState({ loadedFail: true });
                            JDToast.showLongCenter(ret.message);
                        }
                    }
                );
            } else {
                NetUitls.getUrlAndParamsAndPlatformAndCallback(
                    config.api.startGame,
                    bodyParam,
                    gameData.gamePlatform,
                    ret => {
                        if (ret.rs) {
                            this.setState({ url: ret.content.gameUrl });
                        } else {
                            this.setState({ loadedFail: true });
                            JDToast.showLongCenter(ret.message);
                        }
                    }
                );
            }
        }
    }

    componentWillUnmount(){
        StatusBar.setHidden(false);
    }

    onReloadData=()=>{
        this.setState({oadedFail: false, url: '', backButtonEnabled: false},()=>{
            this.componentWillMount();
        })
    }
    render() {
        let {isDZ,gameBgColor,gameData } = this.props;
        let stateBarH =isDZ ? 0:JX_PLAT_INFO.MarginBarHeight;
        let conetView = (

            <View   style={{ flex: 1,justifyContent: 'center', alignItems: 'center'}}>
                <TouchableOpacity onPress={this.onReloadData}>
                    <Text style={{ fontSize: Size.font14, color: "yellow",fontWeight: 'bold' }}>页面数据加载失败,请点击此链接重新加载!</Text>
                </TouchableOpacity>
                {this.showTouchButtonView()}
            </View>

        );
        let bgColor = gameBgColor ? gameBgColor : MyDefaultColor;
        if (!this.state.loadedFail) {
            conetView = (
                <View
                    style={{
                        height: SCREEN_H - (isDZ ? stateBarH : stateBarH + (JX_PLAT_INFO.IS_IphoneX ? 10 : 0)),
                        backgroundColor: bgColor
                    }}
                >
                    {this.state.url != '' ? (
                        <WebView
                            bounces={false}
                            ref={WEBVIEW_REF}
                            automaticallyAdjustContentInsets={true}
                            style={[styles.webView, { backgroundColor: bgColor }]}
                            source={{ uri: this.state.url }}
                            javaScriptEnabled={true}
                            domStorageEnabled={true}
                            decelerationRate="normal"
                            startInLoadingState={true}
                            scalesPageToFit={true}
                            onNavigationStateChange={this.onNavigationStateChange}
                            onShouldStartLoadWithRequest={this.onShouldStartLoadWithRequest}
                            onError={this.onLoadError}
                            onMessage={(event)=>{
                                this.webPostMessageEvent(event)
                            }}
                        />
                    ) : null}
                </View>
            );
        }

        //自己的游戏平台去掉球球
        return (
            <View style={styles.containView}>
                <View style={{ height: stateBarH, backgroundColor: bgColor }} />
                {conetView}
                {gameData.gamePlatformType != 2 ? this.showTouchButtonView():null}
            </View>
        );
    }

    showTouchButtonView=()=>{
        let { touchLeft, touchTop, isDZ, isRotate} = this.props;
        let stateBarH =isDZ ? 0:JX_PLAT_INFO.MarginBarHeight;
        let touchInitX = touchLeft == null ? JX_PLAT_INFO.SCREEN_W - 100 : touchLeft;
        let touchInitY = touchTop == null ? (JX_PLAT_INFO.IS_IphoneX ? 25:stateBarH) : touchTop;
        return (<TCTouchMoveButton
            bottomMargin={JX_PLAT_INFO.IS_IphoneX ? 100 : 20}
            rightMargin={50}
            topMargin={JX_PLAT_INFO.IS_IphoneX ? 25:stateBarH}
            initX={touchInitX}
            initY={touchInitY}
            onClick={this.onBack}
            contentView={
                <View
                    style={{
                        transform: [{ rotate: isRotate ? '90deg' : '0deg' }]
                    }}
                >
                    <TCImage
                        resizeMode={'contain'}
                        style={{ width: 50, height: 50 }}
                        source={ASSET_Other.Other.DSF.CLOSE_GAME}
                    />
                </View>
            }
        />)
    }

    webPostMessageEvent(event) {
        let data = event.nativeEvent.data;
        if (!_.isString(data)) {
            return;
        }

        data = JSON.parse(data)
        if (data.action === 'game_back') {
            TCNavigatorHelper.popToBack();
        }else if(data.action === 'game_recharge'){
            this.gotoTopUp();
        }
    }

    gotoTopUp(){
       // TCNavigatorHelper.pushToTopUp()
        JX_NavHelp.popToTop();
    }

    onTransMoney=()=>{
        let {title,platName,isDZ} = this.props;
        JX_NavHelp.pushView(JX_Compones.UserTransfer,{platName:isDZ ? platName: title.substr(0,2)});
    }

    onBack = () => {
        let { gameData } = this.props;
        let butList=[
            {
                text: '额度转化',
                onPress: () => {
                    this.onTransMoney();
                },
            },
            {
                text: '确定',
                onPress: () => {
                    //TCNavigatorHelper.popToBack();
                    JX_NavHelp.popToBack();
                }
            },
            {
                text: '取消',
                onPress: () => {},
                style: 'destructive'
            }
        ];

        if(gameData.gamePlatformType == 2){
            butList.shift();
        }
        Alert.alert('', '您确定退出游戏吗?',butList);
    };

    onBackFromWeb(){
        Alert.alert('', '您确定退出游戏吗?', [
            {
                text: '确定',
                onPress: () => {
                   // TCNavigatorHelper.popToBack();
                    JX_NavHelp.popToBack();
                }
            },
            {
                text: '取消',
                onPress: () => {}
            }
        ]);
    }

    onLoadError = evt => {
        JXLog("TCDefaultTendDomain----onLoadError==", evt);
        this.setState({ loadedFail: true });
    };

    onShouldStartLoadWithRequest = event => {
        return true;
    };

    onNavigationStateChange = navState => {
        JXLog("TCDefaultTendDomain----onNavigationStateChange==", navState);
        if(navState&&navState.title.indexOf("404 Not Found")>-1){
            this.setState({loadedFail: true});
        }else{
            this.setState({backButtonEnabled: navState.canGoBack});
        }

    };
}

const styles = StyleSheet.create({
    webView: {
        flex: 1,
        width: SCREEN_W,
        backgroundColor: MyDefaultColor
    },
    containView: JX_PLAT_INFO.IS_IphoneX
        ? {
            height: SCREEN_H,
            width: SCREEN_W,
            backgroundColor: MyDefaultColor
        }
        : {
            height: SCREEN_H,
            backgroundColor: MyDefaultColor
        }
});
