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

    @observable
    saveVersionM={};


    @action
    initAppHomeCheck = () => {
        TW_Data_Store.getItem(TW_DATA_KEY.isInitStore, (err, ret) => {
            TW_Log("TW_Data_Store---versionBBL--W_DATA_KEY.isInitStore==err==" + err, ret);
            if (err) {
                this.copy_assets_to_dir();
            } else {
                if (`${ret}` == "1") {
                    this.isAppUnZip = true;
                    TW_Data_Store.getItem(TW_DATA_KEY.versionBBL).then((ret) => {
                        let verionM=null;
                        try{
                            verionM = JSON.parse(ret);
                        }catch (error) {
                            verionM={}
                        }
                        this.saveVersionM=verionM ? verionM:{} ;
                        this.chectHomeZipUpdate();
                    })
                } else {
                    this.copy_assets_to_dir();
                }
            }
        });
    }

    chectHomeZipUpdate=()=>{
        TW_Log("TW_DATA_KEY.versionBBL start  http ===> "+rootStore.bblStore.getVersionConfig() );
        NetUitls.getUrlAndParamsAndCallback(rootStore.bblStore.getVersionConfig(),null,(rt)=>{
            TW_Log("TW_DATA_KEY.versionBBL http results== " , rt);
            if(rt.rs){
                let content = rt.content;
                this.content=content;
                let zipSrc = this.content.source;
                if(G_IS_IOS){
                    zipSrc= this.content.source_ios ?  this.content.source_ios:zipSrc;
                }else{
                    zipSrc= this.content.source_android ?  this.content.source_android:zipSrc;
                }
                if(zipSrc){
                    //如果config source 是相对路径 加上 config 域名
                    if(zipSrc.indexOf("http")==-1){
                        zipSrc = rootStore.bblStore.getVersionDomain()+"/"+zipSrc;
                    }
                }
                TW_Log("TW_DATA_KEY.versionBBL  this.content" ,  this.content);
                if(TW_Store.dataStore.isAppUnZip){
                    if(this.saveVersionM.versionNum!=content.versionNum){
                            this.downloadFile(zipSrc,rootStore.bblStore.tempZipDir);
                        }
                    }
                }else{
                    this.onSaveVersionM({},true);
                }
            }
        )
    }


    onSaveVersionM=(srcData,isHttpFail=false)=>{
        TW_Log("TW_DATA_KEY.versionBBL onSaveVersionM isHttpFail==" + isHttpFail, srcData);
        this.saveVersionM  = {...this.saveVersionM,...srcData,isHttpFail};
        TW_Data_Store.setItem(TW_DATA_KEY.versionBBL,JSON.stringify(this.saveVersionM));
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
                TW_Log("versionBBL  解压失败11",error);
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

