import {TabNavigator, StackNavigator} from 'react-navigation';
import React, {Component} from 'react';
import {UIManager, StatusBar, View,ToastAndroid,BackHandler} from 'react-native';
import {Provider} from 'mobx-react'
import {unzip} from 'react-native-zip-archive'
import NavigationService from './NavigationService'
import RNFS from "react-native-fs";
import FlurryAnalytics from 'react-native-flurry-analytics';
import rootStore from "../../Data/store/RootStore";

const appStores = {
    // mainStore: rootStore.mainStore,
    // initAppStore: rootStore.initAppStore,
    // commonBoxStore: rootStore.commonBoxStore,
}
import CommonBoxLayer from "../Main/CommonBoxLayer";
import XXWebView from "../web/XXWebView";
import TCWebView from "../WebView/TCWebView";
import LoadingView from "../Main/LoadingView";



//用于增加通用navigator view 属性 特殊 处理
function viewRoutHelp(component) {
    return {screen: component}
}

const Components = {
    XXWebView: viewRoutHelp(XXWebView),
    WebView:viewRoutHelp(TCWebView),
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

export default class Main extends Component {
    constructor(state) {
        super(state)
    }

    componentWillMount() {
        UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
        StatusBar.setHidden(true);
        TN_GetPlatInfo((data)=>{
                TW_Log("TN_GetPlatInfo-----"+data,data);
                let appInfo=JSON.parse(data);
                TW_Log("TN_GetPlatInfo-----appInfo=",appInfo);
                TN_StartJPush("","");
                FlurryAnalytics.startSession("FJK8HRQDQ7VWNKS4CPVT");
                TN_StartUMeng("5c2af406f1f5568dcc000160","test1");
            })
        if (!G_IS_IOS) {
            BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid);
        }
    }


    render() {

        return (
            <Provider  {...appStores} >
                <View style={{flex: 1, backgroundColor:"black"}}>
                    {/*{this.addStatusBar()}*/}
                    <MainStackNavigator
                        ref={navigatorRef => {
                            NavigationService.setTopLevelNavigator(navigatorRef)
                        }}
                    />
                    {/*<CommonBoxLayer/>*/}
                    {/*<LoadingView/>*/}

                </View>
            </Provider>
        )
    }

    onBackAndroid = () => {
        return false;
        // const routers = G_NavState.routes;
        // if (routers&&routers.length > 1) {
        //     TW_NavHelp.goBack()
        //     return true;
        // }
        // let now = new Date().getTime();
        // if (now - this.lastClickTime < 2500) {//2.5秒内点击后退键两次推出应用程序
        //     return false;//控制权交给原生
        // }
        // this.lastClickTime = now;
        // ToastAndroid.show("再按一次退出",ToastAndroid.SHORT);
        // return true;
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
