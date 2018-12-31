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
        NetUitls.getUrlAndParamsAndCallback(rootStore.bblStore.versionUrl,null,(rt)=>{
            TW_Log("TW_DATA_KEY.versionBBL get results " + rt, rt);
            if(rt.rs){
                let content = rt.content;
                this.content=content;
                if(TW_Store.dataStore.isAppUnZip){
                    TW_Data_Store.getItem(TW_DATA_KEY.versionBBL).then((ret) => {
                        TW_Log("TW_Data_Store.getItem--.versionBBL TW_Data_Store results " + ret, ret == null);
                        try {
                              let verionM = JSON.parse(ret);
                               if(verionM&&verionM.versionNum!=content.versionNum){
                                   this.downloadFile(content.source,rootStore.bblStore.tempZipDir);
                               }else{
                                   this.onSaveVersionM(content);
                               }
                        } catch (error) {
                            TW_Log("TW_DATA_KEY.versionBBL get key Error " + ret, error);
                            this.downloadFile(content.source,rootStore.bblStore.tempZipDir);
                        }
                    })
                }else{
                    this.onSaveVersionM(rootStore.bblStore.versionManger);
                }
            }
        })

    }

    onSaveVersionM=(srcData)=>{

        let bblStoreStr = JSON.stringify(rootStore.bblStore.versionManger);
        let newSter=JSON.stringify(srcData);
        let isSame= bblStoreStr==newSter;
        rootStore.bblStore.versionManger = {...rootStore.bblStore.versionManger,...srcData};

       // if(!isSame){
            TW_Log("TW_DATA_KEY.versionBBL onSaveVersionM savaData===isSame--"+isSame,newSter)
            TW_Data_Store.setItem(TW_DATA_KEY.versionBBL,newSter);
     //  }
    }

    downloadFile=(formUrl,downloadDest)=> {

        this.downloadDest= downloadDest;
        formUrl=formUrl+"?rodom="+Math.random();
        TW_Log("versionBBL---downloadFile=="+formUrl);
        const options = {
            fromUrl: formUrl,
            toFile: downloadDest,
            background: true,
            begin: (res) => {
                TW_Log('versionBBL--begin', res);
                TW_Log('versionBBL---contentLength:', res.contentLength / 1024 / 1024, 'M');
            },
            // progress: (res) => {
            //
            //     //let pro = res.bytesWritten / res.contentLength;
            //     // this.setState({
            //     //     progressNum: pro,
            //     // });
            // }
        };
        try {
            const ret = RNFS.downloadFile(options);
            ret.promise.then(res => {
                TW_Log('versionBBL---downloadFile---sucess file://' + downloadDest,res);
                if(`${res.status}`!="404"){
                    this.unzipNewCourse(downloadDest);
                }else{
                    TW_Log('versionBBL --downloadFile --下载文件不存在--', downloadDest);
                }

            }).catch(err => {
                TW_Log('versionBBL --downloadFile --fail err', err);
            });
        }
        catch (e) {
            TW_Log("versionBBL---downloadFile--error",error);
        }
    }

    async prePrepareUnZip(downloadDest){
        let target_dir_exist = await RNFS.exists(downloadDest);
        if (target_dir_exist) {
             TW_Log("versionBBL bbl---   RNFS.unlink---start" + target_dir_exist,target_dir);
            RNFS.unlink(downloadDest).then((ret) => {
                 TW_Log("versionBBL bbl--- unlink----target_dir==!" + target_dir_exist, ret);
               this.unzipNewCourse(downloadDest);
            })
        }else{
            this.unzipNewCourse(downloadDest);
        }
    }

    //解压
     unzipNewCourse=(downloadDest)=> {
         TW_Log(`versionBBL unzip start------ ${downloadDest}`);
        // zipPath：zip的路径
        // documentPath：解压到的目录
        unzip(downloadDest,  rootStore.bblStore.storeDir)
            .then((path) => {
                TW_Log(`versionBBL unzip completed at------ ${path}`);
                rootStore.bblStore.versionManger.isFlush=false
                this.onSaveVersionM(this.content);
                RNFS.unlink(this.downloadDest).then(() => {
                    TW_Log("versionBBL 删除文件----downloadDest!"+this.downloadDest)
                }).catch((err) => {
                    TW_Log("versionBBL 删除文件失败");
                });;
            })
            .catch((error) => {
                TW_Log("versionBBL  解压失败",error);
            })
    }

    render() {

        return (
            <Provider  {...appStores} >
                <View style={{flex: 1}}>
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
