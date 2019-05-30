import {TabNavigator, StackNavigator} from 'react-navigation';
import React, {Component} from 'react';
import {
    UIManager,
    StatusBar,
    Text,
    View,
    ToastAndroid,
    BackHandler,
    ScrollView,
    Alert,
    Modal,
    TouchableWithoutFeedback
} from 'react-native';
import {Provider} from 'mobx-react'
import NavigationService from './NavigationService'
import rootStore from "../../Data/store/RootStore";
import {observer} from 'mobx-react/native';

const appStores = {
    // mainStore: rootStore.mainStore,
    // initAppStore: rootStore.initAppStore,
    // commonBoxStore: rootStore.commonBoxStore,
}
import CommonBoxLayer from "../enter/CommonBoxLayer";
import XXWebView from "../web/XXWebView";
import TCWebView from "../WebView/TCWebView";
import OpeninstallModule from 'openinstall-react-native'
import ExtraDimensions from 'react-native-extra-dimensions-android';

//用于增加通用navigator view 属性 特殊 处理
function viewRoutHelp(component) {
    return {screen: component}
}

const Components = {
    XXWebView: viewRoutHelp(XXWebView),
    WebView: viewRoutHelp(TCWebView),
    TCUserDetailMsg: viewRoutHelp(TCUserDetailMsg),
    TCUserMessage: viewRoutHelp(TCUserMessage),
    TCAddUserInfo: viewRoutHelp(TCAddUserInfo),
    TCAddPhoneNumberInfo: viewRoutHelp(TCAddPhoneNumberInfo),
    UserAcountPay: viewRoutHelp(TCUserPayAndWithdrawRecordsMain),
    UserPayment: viewRoutHelp(UserPayment),
    WxPublicPage: viewRoutHelp(WechatPublicPage),
    TCUserWithdrawNew: viewRoutHelp(TCUserWithdrawNew),
    TCUserBankPayMessageNew: viewRoutHelp(TCUserBankPayMessageNew)
}

//为所有组件增加增加routName 配合 JX_Compones  用于 通用 pushtoView 跳转 避免使用纯string
for (let key in Components) {
    if (Components[key]) {
        Components[key].routName = key;
    }
}

global.JX_Compones = Components

const MainStackNavigator = StackNavigator({
    ...Components
}, {
    navigationOptions: {
        header: null,
        swipeEnabled: false,
        gesturesEnabled: false
    }
})

import TCUserDetailMsg from "../UserCenter/user/TCUserDetailMsg";
import TCUserMessage from "../UserCenter/user/TCUserMessage";
import TCAddUserInfo from "../UserCenter/user/TCAddUserInfo";
import TCAddPhoneNumberInfo from "../UserCenter/user/TCAddPhoneNumberInfo";

import TCUserPayAndWithdrawRecordsMain from "../UserCenter/UserAccount/TCUserPayAndWithdrawRecordsMain";
import UserPayment from '../../Page/UserCenter/UserPay/TCUserPayNew'
import WechatPublicPage from '../../Page/UserCenter/UserPay/WxPublic/TCUserPayWxPublic'
import TCUserWithdrawNew from "../UserCenter/UserWithdraw/TCUserWithdraw";
import GameUIView from "../enter/GameUIView";

import TCUserBankPayMessageNew from "../UserCenter/UserPay/TCUserBankPayMessageNew";
import KeyboardManager from 'react-native-keyboard-manager'
import {JX_PLAT_INFO} from "../asset";
import LoadingWebView from "../WebView/LoadingWebView";

@observer
export default class App extends Component {
    constructor(state) {
        super(state)
    }

    componentWillMount() {
        UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
        if (KeyboardManager && KeyboardManager.setToolbarPreviousNextButtonEnable) {
            KeyboardManager.setToolbarPreviousNextButtonEnable(true);
        }
        StatusBar.setHidden(true);
        if (!G_IS_IOS) {
            BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid);
        }
    }

    componentWillUnmount(): void {
        if (!G_IS_IOS) {
            BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid);
        }
        // OpeninstallModule.removeWakeUpListener(this.receiveWakeupListener)//移除监听
    }


    
    render() {
        TW_Log("onBackAndroid--TW_Store.gameUpateStore.isNeedUpdate--"+TW_Store.gameUpateStore.isNeedUpdate);
        return (
            <Provider  {...rootStore} >
                <View style={{flex: 1, backgroundColor: "black"}}>
                    {this.addStatusBar()}
                    <MainStackNavigator
                        ref={navigatorRef => {
                            NavigationService.setTopLevelNavigator(navigatorRef)
                            this.navigator = navigatorRef;
                        }}
                    />
                    {TW_Store.bblStore.isDebugApp ?
                        <ScrollView style={{position: "absolute", height: JX_PLAT_INFO.SCREEN_H}}><Text
                            style={{
                                color: "yellow",
                                fontWeight: "bold"
                            }}
                            pointerEvents={"none"}>{`\nversionMangernew==${JSON.stringify(TW_Store.dataStore.homeVersionM)}` +
                        `\n appStore=${JSON.stringify(TW_Store.appStore)} \n--state=${JSON.stringify(this.state)}---log=${TW_Store.dataStore.log}`}</Text></ScrollView> : null}
                    {/*<CommonBoxLayer/>*/}
                    {TW_Store.dataStore.isAppInited &&(!TW_Store.gameUpateStore.isOldHome||TW_Store.gameUpateStore.isAppDownIng) ? <LoadingWebView/>:null}
                     <GameUIView/>

                </View>
            </Provider>

        )
    }

    onBackAndroid = () => {
        TW_Log("onBackAndroid----", this.navigator);
        // return false;
        const routers = this.navigator.state.routes;
        if (routers && routers.length > 1) {
            if (TW_OnValueJSHome) {
                TW_OnValueJSHome(TW_Store.bblStore.getWebAction(TW_Store.bblStore.ACT_ENUM.lobbyResume));
            }
            TW_NavHelp.goBack();
            return true;
        }
        let now = new Date().getTime();
        if (now - this.lastClickTime < 2500) {//2.5秒内点击后退键两次推出应用程序
            return false;//控制权交给原生
        }
        this.lastClickTime = now;
        ToastAndroid.show("再按一次退出 ", ToastAndroid.SHORT);
        return true;
    }

    addStatusBar() {
        if (!G_IS_IOS) {
            return (
                <StatusBar
                    hidden={true}
                    animated={true}
                    translucent={true}
                    backgroundColor={'transparent'}
                    barStyle="light-content"/>
            )
        }
    }
}
