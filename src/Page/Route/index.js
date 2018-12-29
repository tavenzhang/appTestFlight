import {TabNavigator, StackNavigator} from 'react-navigation';
import React, {Component} from 'react';
import {UIManager, StatusBar, View} from 'react-native';
import {Provider} from 'mobx-react'
import {unzip, unzipAssets, subscribe} from 'react-native-zip-archive'
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
        TW_Data_Store.getItem(TW_DATA_KEY.isInitStore,(err,ret)=>{
            if(ret&&`${ret}`=="1"){
                //如果第一次拷贝到document 已经完成 开始 检测 zip 更新
                TW_Data_Store.getItem(TW_DATA_KEY.versionBBL).then((ret) => {
                    TW_Log("TW_DATA_KEY.versionBBL get results "+ret, ret==null);
                    try {
                        let verionM =  JSON.parse(ret);
                        // TW_Log("TW_DATA_KEY.versionBBL get results "+verionM.versionNum, verionM);
                        //TW_Log("TW_DATA_KEY.versionBBL ootStore.bblStore "+rootStore.bblStore.versionManger.versionNum, rootStore.bblStore.versionManger);
                        if(verionM.versionNum&&rootStore.bblStore.versionManger.versionNum!=verionM.versionNum){
                            this.downloadFile();
                        }else{
                              this.onSaveVersionM(ret);
                        }
                    }catch (error) {
                        TW_Log("TW_DATA_KEY.versionBBL get key Error "+ret, error);
                        this.onSaveVersionM();
                    }
                }).catch((error) => {
                    TW_Log("TW_DATA_KEY.versionBBL get error "+error, error);
                })
            }
        })
    }

    onSaveVersionM=(srcData=null)=>{
        let data = JSON.stringify(rootStore.bblStore.versionManger);
        let isSame= srcData==data;
        TW_Log("TW_DATA_KEY.versionBBL onSaveVersionM isSame==="+isSame);
        if(!isSame){
            TW_Log("TW_DATA_KEY.versionBBL onSaveVersionM savaData===",data)
            TW_Data_Store.setItem(TW_DATA_KEY.versionBBL,JSON.stringify(rootStore.bblStore.versionManger));
        }

    }

    downloadFile=()=> {
        const downloadDest = rootStore.bblStore.versionManger.toDest
        const formUrl = rootStore.bblStore.versionManger.source;
        this.downloadDest= downloadDest;
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
                this.unzipNewCourse();
            }).catch(err => {
                TW_Log('versionBBL --downloadFile --fail err', err);
            });
        }
        catch (e) {
            TW_Log("versionBBL---downloadFile--error",error);
        }

    }


    //解压
    unzipNewCourse=()=>
    {
        // zipPath：zip的路径
        // documentPath：解压到的目录
        unzip(this.downloadDest,  rootStore.bblStore.storeDir)
            .then((path) => {
                TW_Log(`versionBBL unzip completed at------ ${path}`);
                rootStore.bblStore.versionManger.isFlush=false
                this.onSaveVersionM();
                // RNFS.unlink(this.downloadDest).then(() => {
                //     TW_Log("versionBBL 删除文件----downloadDest!"+this.downloadDest)
                // }).catch((err) => {
                //     TW_Log("versionBBL 删除文件失败");
                // });;
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
