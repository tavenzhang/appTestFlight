import React, {} from 'react';
import {
    StyleSheet,
    Text,
    View,
    WebView,
    Alert,
    NativeModules,
} from 'react-native';

import TopNavigationBar from '../../Common/View/TCNavigationBar';

var WEBVIEW_REF = 'webview';
import NetUitls from "../../Common/Network/TCRequestUitls";
import {config} from "../../Common/Network/TCRequestConfig";
import TCNavigatorHelper from "../../Common/JXHelper/TCNavigatorHelper";
import {ASSET_Other, JX_PLAT_INFO} from "../asset";
import {indexBgColor, Size} from "../resouce/theme";
import TCTouchMoveButton from "../../Common/View/button/TCTouchMoveButton";
import TCImage from "../../Common/View/image/TCImage";
import JDToast from "../../Common/JXHelper/JXToast";
import {withMappedNavigationProps} from "react-navigation-props-mapper";
let  MyDefaultColor="black"
//专门为体育电子准备
@withMappedNavigationProps()
export default class TCWebGameFullView extends React.Component {

    constructor(state) {
        super(state)
        this.state = {
            loadedFail: false,
            url: "",
            backButtonEnabled: false,

        }
    }

    componentWillMount() {
        let {isDZ,gameData,gameId}= this.props
        let bodyParam = {
            gameId
        }

        if (isDZ) {
            NetUitls.getUrlAndParamsAndPlatformAndCallback(config.api.gamesDZ_start + "/" + gameId, bodyParam,gameData.gamePlatform, (ret) => {
               JXLog("TCWebGameView-------getUrlAndParamsAndPlatformAndCallback--platForm==" + ret.content, ret)
                if(gameData.gamePlatform == "FG"){
                    let data={UserAgent:"Browser_Type/Android_APP"};
                    if(NativeModules.JXHelper.regIosDefaultData){
                        NativeModules.JXHelper.regIosDefaultData(data);
                    }
                }
                JXLog("TCWebGameView-----ret.rs------",ret.rs)
                if (ret.rs) {

                    this.setState({url: ret.content.gameUrl});
                } else {
                    this.setState({loadedFail: true})

                    JDToast.showLongCenter(ret.message)
                }
            })
        } else {
            NetUitls.getUrlAndParamsAndPlatformAndCallback(config.api.startGame, bodyParam,gameData.gamePlatform, (ret) => {
              //  JXLog("TCWebGameView-------startGame====" + ret.content, ret)
                if (ret.rs) {
                    this.setState({url: ret.content.gameUrl});
                } else {
                    this.setState({loadedFail: true});
                    JDToast.showLongCenter(ret.message);
                }
            })
        }
    }


    render() {

        let {touchLeft,touchTop,isDZ,isRotate,gameBgColor}= this.props;
        let stateBarH =JX_PLAT_INFO.IS_IphoneX ? 44:20;
        let  bgColor  = gameBgColor ? gameBgColor:MyDefaultColor
        let conetView = <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
            <Text style={{fontSize: Size.font13, fontWeight: "bold"}}>页面数据加载失败,请稍后重试!</Text>
        </View>

        if (!this.state.loadedFail) {
            conetView = <View style={{height: SCREEN_H - (isDZ ? stateBarH:stateBarH+(JX_PLAT_INFO.IS_IphoneX ? 10 :0)), backgroundColor:bgColor}}>
                {
                    this.state.url != "" ? <WebView
                        bounces={false}
                        ref={WEBVIEW_REF}
                        automaticallyAdjustContentInsets={true}
                        style={[styles.webView,{backgroundColor:bgColor}]}
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
        let touchInitX = touchLeft==null ? JX_PLAT_INFO.SCREEN_W-100:touchLeft;
        let touchInitY = touchTop==null ? stateBarH:touchTop;

        return (
            <View style={styles.containView}>
                <View style={{height:stateBarH, backgroundColor:"black"}}/>
                {conetView}
                <TCTouchMoveButton bottomMargin={JX_PLAT_INFO.IS_IphoneX ? 100:20}  rightMargin={50} topMargin={stateBarH} initX={touchInitX}
                                   initY={touchInitY} onClick={this.onBack} contentView={<View style={{
                    transform:[{rotate: isRotate ? '90deg':'0deg'}]}}>
                    <TCImage resizeMode={"contain"} style={{width: 50, height:50}} source={ASSET_Other.Other.DSF.CLOSE_GAME}/>
                </View>}/>
            </View>
        )
    }

    onTransMoney=()=>{
        let {title,platName,isDZ} = this.props;
        JX_NavHelp.pushView(JX_Compones.UserTransfer,{platName:isDZ ? platName: title.substr(0,2)});
    }

    onBack = () => {

        Alert.alert('', '您确定退出游戏吗?', [
            {
                text: '额度转化',
                onPress: () => {
                    this.onTransMoney();
                },
                  style: 'destructive'
          },
            {

                text: '确定',
                onPress: () => {
                    TCNavigatorHelper.popToBack();
                    // this.props.navigator.pop()
                }
            },
            {
                text: '取消',
                onPress: () => {

                }
            }
        ]);

      //  }
    }

    onLoadError = (evt) => {
       // JXLog("TCDefaultTendDomain----onLoadError==", evt);
        this.setState({loadedFail: true});
    }

    onShouldStartLoadWithRequest = (event) => {
        return true;
    };


    onNavigationStateChange = (navState) => {
      //  JXLog("TCDefaultTendDomain----onNavigationStateChange==", navState);
        this.setState({
            backButtonEnabled: navState.canGoBack,
        });
    };

}

const styles = StyleSheet.create({
    webView: {
        flex:1,
        width: SCREEN_W,
        backgroundColor:MyDefaultColor

    },
    containView: JX_PLAT_INFO.IS_IphoneX ? {
        height: SCREEN_H ,
        width: SCREEN_W,
        backgroundColor: MyDefaultColor
    } : {
        height: SCREEN_H ,
        backgroundColor: MyDefaultColor
    },
});


