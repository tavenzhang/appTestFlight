import {TabNavigator, StackNavigator} from 'react-navigation';
import React, {Component} from 'react';
import {UIManager, StatusBar, View} from 'react-native';
import {Provider} from 'mobx-react'
import {unzip} from 'react-native-zip-archive'
import NavigationService from './NavigationService'
import RNFS from "react-native-fs";

import rootStore from "../../Data/store/RootStore";

const appStores = {
    // mainStore: rootStore.mainStore,
    // initAppStore: rootStore.initAppStore,
    // commonBoxStore: rootStore.commonBoxStore,
}
import CommonBoxLayer from "../Main/CommonBoxLayer";
import XXWebView from "../web/XXWebView";
import TCWebView from "../WebView/TCWebView";
import MyTestView from "../WebView/MyTestView";
import StartUpHelper from "../Main/StartUpHelper";
import AppConfig from "../Main/AppConfig";
import NetUitls from "../../Common/Network/TCRequestUitls";



//用于增加通用navigator view 属性 特殊 处理
function viewRoutHelp(component) {
    return {screen: component}
}

const Components = {
    XXWebView: viewRoutHelp(XXWebView),
    WebView:viewRoutHelp(TCWebView),
    MyTestView:viewRoutHelp(MyTestView)
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
        this.state = {
            fluashNum: 1,
            inited: false,
            bundleDir: ""
        }
    }

    componentWillMount() {
        UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
        StatusBar.setHidden(true);
        // NetUitls.getUrlAndParamsAndCallback(rootStore.bblStore.versionUrl,null,(rt)=>{
        //     TW_Log("TW_DATA_KEY.versionBBL get results " + rt, rt);
        //     if(rt.rs){
        //         let content = rt.content;
        //         this.content=content;
        //         if(TW_Store.dataStore.isAppUnZip){
        //             TW_Data_Store.getItem(TW_DATA_KEY.versionBBL).then((ret) => {
        //                 TW_Log("TW_Data_Store.getItem--.versionBBL TW_Data_Store results " + ret, ret == null);
        //                 try {
        //                       let verionM = JSON.parse(ret);
        //                        if(verionM&&verionM.versionNum!=content.versionNum){
        //                            this.downloadFile(content.source,rootStore.bblStore.tempZipDir);
        //                        }else{
        //                            this.onSaveVersionM(content);
        //                        }
        //                 } catch (error) {
        //                     TW_Log("TW_DATA_KEY.versionBBL get key Error " + ret, error);
        //                     this.downloadFile(content.source,rootStore.bblStore.tempZipDir);
        //                 }
        //             })
        //         }else{
        //             this.onSaveVersionM(rootStore.bblStore.versionManger);
        //         }
        //     }
        // })

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
                    <CommonBoxLayer/>
                </View>
            </Provider>
        )
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
