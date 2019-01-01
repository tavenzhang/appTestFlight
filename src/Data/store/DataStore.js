import {action, observable} from 'mobx'
import {unzip } from 'react-native-zip-archive'
import RNFS from "react-native-fs";
import {MainBundlePath, DocumentDirectoryPath} from 'react-native-fs'
import NetUitls from "../../Common/Network/TCRequestUitls";
import rootStore from "./RootStore";

export default class DataStore {

    constructor() {
        this.copy_assets_to_dir=this.copy_assets_to_dir.bind(this);
        this.onSavaCopyState=this.onSavaCopyState.bind(this);
        this.initAppHomeCheck();
    }

    @observable
    isAppUnZip = false;

    @observable
    originAppDir = G_IS_IOS ? (MainBundlePath + '/assets/gamelobby') : "file:///android_asset/gamelobby";

    @observable
    targetAppDir = G_IS_IOS ? DocumentDirectoryPath + "/gamelobby" : `file:///${DocumentDirectoryPath}/gamelobby`;



    @action
    initAppHomeCheck = () => {
        TW_Data_Store.getItem(TW_DATA_KEY.isInitStore, (err, ret) => {
            TW_Log("TW_Data_Store---bbl--W_DATA_KEY.isInitStore==err==" + err, ret);
            if (err) {
                this.copy_assets_to_dir();
            } else {
                if (`${ret}` == "1") {
                    this.isAppUnZip = true;
                    this.chectHomeZipUpdate();

                } else {
                    this.copy_assets_to_dir();
                }
            }
        });
    }

    chectHomeZipUpdate=()=>{
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
                            if(verionM){
                                rootStore.bblStore.versionManger={...verionM};
                                if(verionM.versionNum!=content.versionNum){
                                    this.downloadFile(content.source,rootStore.bblStore.tempZipDir);
                                }
                            }else{
                                this.downloadFile(content.source,rootStore.bblStore.tempZipDir);
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
                RNFS.unlink(downloadDest).then(() => {
                    TW_Log("versionBBL 删除文件----downloadDest!"+downloadDest)
                }).catch((err) => {
                    TW_Log("versionBBL 删除文件失败");
                });;
            })
            .catch((error) => {
                TW_Log("versionBBL  解压失败",error);
            })
    }


    @action
    onSavaCopyState () {
        TW_Data_Store.setItem(TW_DATA_KEY.isInitStore, "1", (err) => {
            if (err) {
                TW_Log("versionBBL bbl--- copyFile--onSavaCopyState--error===!", err);
            } else {
                this.isAppUnZip = true;
            }
        })
    }

    async copy_assets_to_dir() {
        let source_dir = this.originAppDir;
        let target_dir = ""

        if (G_IS_IOS) {
            target_dir = DocumentDirectoryPath + "/gamelobby"
            let target_dir_exist = await RNFS.exists(target_dir);
            if (target_dir_exist) {
                // TW_Log("versionBBL bbl---   RNFS.unlink---start" + target_dir_exist,target_dir);
                RNFS.unlink(target_dir).then((ret) => {
                    // TW_Log("versionBBL bbl--- unlink----target_dir==!" + target_dir_exist, ret);
                    RNFS.copyFile(source_dir, target_dir).then(() => {
                        this.onSavaCopyState();
                    }).catch((err) => {
                        //TW_Log("versionBBL bbl--- 删除文件失败", target_dir_exist);
                    })
                })
            } else {
                let ret = await RNFS.copyFile(source_dir, target_dir)
                if (ret) {
                    this.onSavaCopyState();
                }
            }
        }
        else {
            target_dir = DocumentDirectoryPath + "/gamelobby.zip"
            const exist = await RNFS.exists(target_dir);
            TW_Log('andorid----bbl----RNFS.exist ret=='+exist ,exist );

            if(!exist){
                let ret = await RNFS.copyFileAssets("gamelobby.zip", target_dir);
                TW_Log('andorid----bbl----copyFileAssets ret==!',ret);
                if(ret){
                    this.copy_assets_to_dir();
                }
            }else{
                unzip(DocumentDirectoryPath + "/gamelobby.zip", DocumentDirectoryPath)
                    .then(() => {
                        TW_Log('andorid----bbl----unzipAssets completed!');
                        this.onSavaCopyState();
                    })
                    .catch((error) => {
                        TW_Log('andorid---bbl-----unzipAssets!error----', error);
                    })
            }

        }
    }

    @action
    getHomeWebUri() {
        if(this.isAppUnZip){
            return this.targetAppDir+"/index.html"
        }
        return this.originAppDir+"/index.html"
    }

    @action
    getHomeWebHome() {
        return this.isAppUnZip  ? this.targetAppDir:this.originAppDir
    }
}

