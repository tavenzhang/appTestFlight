import {TabNavigator, StackNavigator} from 'react-navigation';
import React, {Component} from 'react';
import {UIManager, StatusBar,Text,View,ToastAndroid,BackHandler} from 'react-native';
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


//用于增加通用navigator view 属性 特殊 处理
function viewRoutHelp(component) {
    return {screen: component}
}

const Components = {
    XXWebView: viewRoutHelp(XXWebView),
    WebView:viewRoutHelp(TCWebView),
    TCUserDetailMsg:viewRoutHelp(TCUserDetailMsg),
    TCUserMessage:viewRoutHelp(TCUserMessage),
    TCAddUserInfo:viewRoutHelp(TCAddUserInfo),
    TCAddPhoneNumberInfo:viewRoutHelp(TCAddPhoneNumberInfo),
    TCUserPayType:viewRoutHelp(TCUserPayType),
    UserAcountPay:viewRoutHelp(TCUserPayAndWithdrawRecordsMain),
    UserPayment: viewRoutHelp(UserPayment),
    WxPublicPage: viewRoutHelp(WechatPublicPage),
    TCUserWithdrawNew:viewRoutHelp(TCUserWithdrawNew),
    TCUserBankPayMessageNew:viewRoutHelp(TCUserBankPayMessageNew)
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
import {platInfo} from "../../config/appConfig";
import TCUserDetailMsg from "../UserCenter/user/TCUserDetailMsg";
import TCUserMessage from "../UserCenter/user/TCUserMessage";
import TCAddUserInfo from "../UserCenter/user/TCAddUserInfo";
import TCAddPhoneNumberInfo from "../UserCenter/user/TCAddPhoneNumberInfo";
import TCUserPayType from "../UserCenter/UserPay/TCUserPayType";
import TCUserPayAndWithdrawRecordsMain from "../UserCenter/UserAccount/TCUserPayAndWithdrawRecordsMain";
import UserPayment from '../../Page/UserCenter/UserPay/TCUserPayNew'
import WechatPublicPage from '../../Page/UserCenter/UserPay/WxPublic/TCUserPayWxPublic'
import TCUserWithdrawNew from "../UserCenter/UserWithdraw/TCUserWithdraw";
import GameUIView from "../enter/GameUIView";
import KeyboardManager from 'react-native-keyboard-manager'
import TCUserBankPayMessageNew from "../UserCenter/UserPay/TCUserBankPayMessageNew";
import LoadingView from "../enter/LoadingView";
@observer
export default class App extends Component {
    constructor(state) {
        super(state)
    }

    componentWillMount() {
        UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
        if(KeyboardManager&&KeyboardManager.setToolbarPreviousNextButtonEnable){
            KeyboardManager.setToolbarPreviousNextButtonEnable(true);
        }

        StatusBar.setHidden(true);
        let cData = platInfo.channel[`c_${TW_Store.appStore.channel}`];
        TW_Log("cData--------"+TW_Store.appStore.channel,cData)
        cData = cData ? cData:platInfo.channel.c_1;

        TN_StartJPush(cData.jpushKey,cData.jpush_channel);
      //   FlurryAnalytics.startSession(G_IS_IOS ? cData.flurry_ios:cData.flurry_android);;
        if (!G_IS_IOS) {
            BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid);
        }
        TN_START_Fabric()
        TN_START_SHARE("111","222");
        TN_StartUMeng(cData.umengKey, cData.umengChanel)

        // TN_CodePush_ASEET((data)=>{
        //    // this.setState({aseets:data})
        //     this.checkFile(data);
        // })

    }

    componentWillUnmount(): void {
        if (!G_IS_IOS) {
            BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid);
        }
    }


    render() {

        return (
            <Provider  {...rootStore} >
                <View style={{flex: 1, backgroundColor:"black"}}>
                    <MainStackNavigator
                        ref={navigatorRef => {
                            NavigationService.setTopLevelNavigator(navigatorRef)
                            this.navigator=navigatorRef;
                        }}
                    />
                    {TW_Store.bblStore.isDebugApp ? <Text
                        style={{
                            color: "yellow",
                            position: "absolute",
                            fontWeight:"bold"
                        }} pointerEvents={"none"} >{`\nversionMangernew==${JSON.stringify(TW_Store.dataStore.saveVersionM)}` +
                    `\n appStore=${JSON.stringify(TW_Store.appStore)} \n--state=${JSON.stringify(this.state)}---log=${TW_Store.dataStore.log}`}</Text> : null}
                    <CommonBoxLayer/>
                    <GameUIView/>
                    {/*<LoadingView/>*/}
                </View>
            </Provider>
        )
    }

    onBackAndroid = () => {
        TW_Log("onBackAndroid----",this.navigator);
       // return false;
        const routers = this.navigator.state.routes;
        if (routers&&routers.length > 1) {
            if(TW_OnBackHomeJs){
                TW_OnBackHomeJs();
            }
            TW_NavHelp.goBack()
            return true;
        }
        let now = new Date().getTime();
        if (now - this.lastClickTime < 2500) {//2.5秒内点击后退键两次推出应用程序
            return false;//控制权交给原生
        }
        this.lastClickTime = now;
        ToastAndroid.show("再按一次退出 ",ToastAndroid.SHORT);
        return true;
    }
    // addStatusBar() {
    //    // if (!G_IS_IOS) {
    //         return (
    //             <StatusBar
    //                 hidden={false}
    //                 animated={true}
    //                 translucent={true}
    //                 backgroundColor={'transparent'}
    //                 barStyle="light-content"/>
    //         )
    //    // }
    // }
}
