import React, {Component} from 'react';

import {
    StyleSheet,
    View,
    WebView,
    Text
} from 'react-native';

import WKWebView from "react-native-wkwebview-reborn/WKWebView";
import {withMappedNavigationProps} from 'react-navigation-props-mapper'
import {MainBundlePath, DocumentDirectoryPath} from 'react-native-fs'
import RNFS from "react-native-fs";

@withMappedNavigationProps()
export default class XXWebView extends Component {
    constructor(state) {
        super(state)
        this.state = {
            fluashNum: 1,
            inited: false,
            bundleDir: "",
            target_dir_exist:false,
            ret:""
        }
        this.copy_assets_to_dir = this.copy_assets_to_dir.bind(this);
        this.checkDirExist=this.checkDirExist.bind(this);
        this.resSourceDir = G_IS_IOS ? (RNFS.MainBundlePath + '/assets/gamelobby') : "file:///android_asset/gamelobby";
        this.destSourceDir = DocumentDirectoryPath + "/gamelobby";
    }


    componentWillMount() {
        TW_Data_Store.getItem(TW_DATA_KEY.isInitStore, (err, ret) => {
            if(err){
                this.copy_assets_to_dir(this.resSourceDir, this.destSourceDir);
                this.setState({bundleDir: this.resSourceDir, inited: true})
            }else{
                this.setState({ret});
                this.checkDirExist(this.destSourceDir)
                if(`${ret}`=="1"){
                    this.setState({bundleDir: this.destSourceDir, inited: true})
                }else{
                    this.copy_assets_to_dir(this.resSourceDir, this.destSourceDir);
                    this.setState({bundleDir: this.resSourceDir, inited: true})
                }
            }
        });
    }





    render() {
        if (!this.state.inited) {
            return (<View/>)
        }

        let {force} = this.props;
        //let res = RNFS.MainBundlePath + '/assets/gamelobby/index.html';
        let source = {
            file: `${this.state.bundleDir}/index.html`,
            allowingReadAccessToURL: this.state.bundleDir,
            allowFileAccessFromFileURLs: this.state.bundleDir
        };
        TW_Log("MainBundlePath---bbl--source==" , source);
        // if (TW_IS_DEBIG) {
        //     source = require('./gamelobby/index.html');
        // }

        let injectJs = `window.appData=${JSON.stringify({
            isApp: true,
            taven: "isOk",
            clientId: "11",
            force: force ? "1" : "0",
            urlJSON: TW_Store.bblStore.urlJSON
        })}`;
        let logData= `inited=${this.state.inited} ---bundleDir==${this.state.bundleDir}`
        return (
            <View style={styles.container}>
                {/*<Text style={{color:"white"}}>{logData+"\n"+`${JSON.stringify(this.state)}`+"\n"+`source==${JSON.stringify(source)}`}</Text>*/}
                {
                    G_IS_IOS ? <WKWebView ref="myWebView" source={source}
                                          onNavigationStateChange={this.onNavigationStateChange}
                                          onShouldStartLoadWithRequest={this.onShouldStartLoadWithRequest}
                                          style={styles.webView}
                                          allowFileAccess={true}
                                          onError={this.onError}
                                          domStorageEnabled={true}
                                          javaScriptEnabled={true}
                                          injectedJavaScript={injectJs}
                                          onMessage={this.onMessage}
                        /> :
                        <WebView
                            ref="myWebView"
                            automaticallyAdjustContentInsets={true}
                            style={styles.webView}
                            source={source}
                            injectedJavaScript={injectJs}
                            javaScriptEnabled={true}
                            domStorageEnabled={true}
                            // decelerationRate="normal"
                            startInLoadingState={true}
                            onNavigationStateChange={this.onNavigationStateChange}
                            onShouldStartLoadWithRequest={this.onShouldStartLoadWithRequest}
                            allowFileAccess={true}
                            onError={this.onError}
                            onMessage={this.onMessage}
                        />
                }

            </View>
        );
    }


    onMessage = (event) => {
        let message = JSON.parse(event.nativeEvent.data);
        this.onMsgHandle(message);
    }

    onMsgHandle = (message) => {
        TW_Log("onMessage===========" + this.constructor.name, message);
        let url = "";
        if (message && message.action) {
            switch (message.action) {
                case "Log":
                    // TW_Log("game---ct=="+message.ct,message.data);
                    break;
                case "JumpGame":
                    url = this.handleUrl(message.au)
                    TW_NavHelp.pushView(JX_Compones.WebView, {
                        url,
                        onMsgHandle: this.onMsgHandle,
                        onEvaleJS: this.onEvaleJS
                    })
                    break;
                case "game_back":
                    TW_NavHelp.popToBack();
                    break;
                case  "JumpUrl":
                    url = this.handleUrl(message.au)
                    TW_NavHelp.pushView(JX_Compones.WebView, {
                        url,
                        onMsgHandle: this.onMsgHandle,
                        onEvaleJS: this.onEvaleJS
                    })
                    break;
            }
        }
    }


    handleUrl = (url) => {
        if (url && url.indexOf("../") > -1) {
            url = url.replace("../", "");
        }
        // if(url.indexOf("slot_jssc")>-1){
        //     url = TW_Store.bblStore.homeDomain + "/" + url
        // }else{
        url = TW_Store.bblStore.homeDomain + "/" + url
        //}

        return url
    }

    onEvaleJS = (data) => {
        let dataStr = JSON.stringify(data);
        dataStr = dataStr ? dataStr : "";
        TW_Log("onError===========   this.webview=====" + this.refs.myWebView == null, this.refs.myWebView);
        if (G_IS_IOS) {
            this.refs.myWebView.evaluateJavaScript(`receivedMessageFromRN(${dataStr})`);
        } else {
            TW_NavHelp.reset(JX_Compones.XXWebView, {force: 1});
        }
    }

    onError = (error) => {
        TW_Log("onError===========event=====", error)
    }

    onShouldStartLoadWithRequest = (event) => {

        TW_Log("onShouldStartLoadWithRequest===========event=====", event)
        return true;
    };

    onNavigationStateChange = (navState) => {
        TW_Log("navState===========onNavigationStateChange=====url==" + navState.url, navState)
        this.setState({
            backButtonEnabled: navState.canGoBack,
            // title: navState.title,
            scalesPageToFit: false
        });
    };

    onSavaCopyState=()=>{
        TW_Data_Store.setItem(TW_DATA_KEY.isInitStore,"1",(err)=>{
            if(err){
                TW_Log("versionBBL bbl--- copyFile--setItem--error===!",err);
            }else{
                TW_Log("versionBBL bbl--- copyFile--setItem--sucess!===");
            }})
    }

    async checkDirExist(target_dir){
        const target_dir_exist = await RNFS.exists(target_dir);
        this.setState({target_dir_exist})
    }


    async copy_assets_to_dir(source_dir, target_dir) {
        const target_dir_exist = await RNFS.exists(target_dir);
        TW_Log("versionBBL bbl--------target_dir_exist----start--"+target_dir_exist , target_dir);
        if (G_IS_IOS) {
            if (target_dir_exist) {
                TW_Log("versionBBL bbl---   RNFS.unlink---start" + target_dir_exist,target_dir);
                RNFS.unlink(target_dir).then((ret) => {
                    TW_Log("versionBBL bbl--- unlink----target_dir==!" + target_dir_exist, ret);
                    RNFS.copyFile(source_dir, target_dir).then(() => {
                        this.onSavaCopyState();
                    }).catch((err) => {
                        TW_Log("versionBBL bbl--- 删除文件失败", target_dir_exist);
                    })
                })
            } else {
                let ret = RNFS.copyFile(source_dir, target_dir)
                TW_Log("versionBBL bbl---  RNFS.copyFile----ret--!"+ret, ret);
                if (ret) {
                    this.onSavaCopyState();
                    TW_Log("versionBBL bbl--- copy_assets_to_dir----sucess!", target_dir_exist);
                }
            }
        }
        else {
            if (!target_dir_exist) {
                await RNFS.mkdir(target_dir);
                const exist = await RNFS.exists(target_dir);
            }
            const items = await
            RNFS.readDirAssets(source_dir);
            for (let i = 0; i < items.length; i++) {
                const item = items[i];
                if (item.isDirectory()) {
                    await this.copy_assets_to_dir(`${source_dir}/${item.name}`, `${target_dir}/${item.name}`);
                } else {
                    await RNFS.copyFileAssets(`${source_dir}/${item.name}`, `${target_dir}/${item.name}`);
                }
            }
        }

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000000"
    },
    webView: {
        backgroundColor: "#000000"
    }
});
