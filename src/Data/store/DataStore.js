import {action, observable} from 'mobx'
import {unzip } from 'react-native-zip-archive'
import RNFS from "react-native-fs";
import {MainBundlePath, DocumentDirectoryPath} from 'react-native-fs'
import NetUitls from "../../Common/Network/TCRequestUitls";
import rootStore from "./RootStore";
import CodePush from 'react-native-code-push'

export default class DataStore {

    constructor() {
        this.copy_assets_to_dir=this.copy_assets_to_dir.bind(this);
        this.onSavaCopyState=this.onSavaCopyState.bind(this);
        this.initAppHomeCheck=this.initAppHomeCheck.bind(this);
    }

    @observable
    isAppUnZip = false;

    @observable
    originAppDir = G_IS_IOS ? (MainBundlePath + '/assets/gamelobby') : "file:///android_asset/gamelobby";

    @observable
    targetAppDir = G_IS_IOS ? DocumentDirectoryPath + "/gamelobby" : `file:///${DocumentDirectoryPath}/gamelobby`;

    @observable
    saveVersionM={};

    @observable
    log="";

    @observable
    isCheckZipUpdate=true;

    @action
    initAppHomeCheck () {
        TW_Data_Store.getItem(TW_DATA_KEY.isInitStore, (err, ret) => {
            TW_Log("TW_Data_Store---versionBBL--W_DATA_KEY.isInitStore==err==" + err, ret);
            if (err) {
                this.copy_assets_to_dir();
            } else {
                if (`${ret}` == "1") {
                    this.isAppUnZip = true;
                   this.startCheckZipUpdate();
                } else {
                    this.copy_assets_to_dir();
                }
            }
        });
    }

    @action
    startCheckZipUpdate=()=>{
        TW_Data_Store.getItem(TW_DATA_KEY.versionBBL).then((ret) => {
            let verionM=null;
            this.log+="-->startCheckZipUpdate---=ret"+ret
            try{
                verionM = JSON.parse(ret);
            }catch (error) {
                verionM={}
            }
            this.saveVersionM=verionM ? verionM:{} ;
            if(this.isCheckZipUpdate){
                this.chectHomeZipUpdate();
            }
        })
    }

    chectHomeZipUpdate=()=>{
        TW_Log("TW_DATA_KEY.versionBBL start  http ===> "+rootStore.bblStore.getVersionConfig() );
        this.log+="==>getVersionConfig="+rootStore.bblStore.getVersionConfig();
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
                this.log+="==>TW_Store.dataStore.isAppUnZip="+TW_Store.dataStore.isAppUnZip;
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


    onSaveVersionM=(srcData,isHttpFail=false,callFunc)=>{
        TW_Log("TW_DATA_KEY.versionBBL onSaveVersionM isHttpFail==" + isHttpFail, srcData);
        this.saveVersionM  = {...this.saveVersionM,...srcData,isHttpFail};
        TW_Data_Store.setItem(TW_DATA_KEY.versionBBL,JSON.stringify(this.saveVersionM),(ret)=>{
            if(callFunc){
                callFunc(ret);
            }
        });
        T
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
               // this.log+="==>downloadFile--begin="+res;
               //{statusCode: 404, headers: {…}, jobId: 1, contentLength: 153
                 if(res.statusCode != 404){
                     TW_Store.commonBoxStore.isShow=true;
                    // TW_Log('versionBBL--begin  TW_Store.commonBoxStore.isShow--'+  TW_Store.commonBoxStore.isShow)
                 }else{
                     TW_Store.commonBoxStore.isShow=false
                 }

            },
            progress: (res) => {
               // this.log+="==>progress-="+res;
                //let pro = res.bytesWritten / res.contentLength;
                TW_Store.commonBoxStore.curPecent=res.bytesWritten;
                TW_Store.commonBoxStore.totalPecent=res.contentLength;
            }
        };
        try {
            const ret = RNFS.downloadFile(options);
            this.log+="==>downloadFile-="+options;
            ret.promise.then(res => {
                TW_Log('versionBBL---downloadFile---sucess file://' + downloadDest,res);
               // this.log+="==>downloadFile--promise="+JSON.stringify(res)+"---state--"+res.statusCode;
                if(`${res.statusCode}`!="404"){
                    this.unzipNewCourse(downloadDest);
                }else{
                    this.log+="==>downloadFile--fail--notstart=";
                    TW_Log('versionBBL --downloadFile --下载文件不存在--', downloadDest);
                    TW_Store.commonBoxStore.isShow=false;
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
        this.log+="==>unzipNewCourse--="+downloadDest;
        // zipPath：zip的路径
        // documentPath：解压到的目录
        unzip(downloadDest,  rootStore.bblStore.storeDir)
            .then((path) => {
                TW_Log(`versionBBL unzip completed at------ ${path}`);
                RNFS.unlink(downloadDest).then(() => {
                    TW_Log("versionBBL 删除文件----downloadDest!"+downloadDest)
                }).catch((err) => {
                    TW_Log("versionBBL 删除文件失败");
                });;
                this.log+="==>onSaveVersionM--=start";
                this.onSaveVersionM(this.content,false,()=>{
                    this.log+="==>onSaveVersionM--=end";
                    CodePush.restartApp();
                });

            })
            .catch((error) => {
                TW_Log("versionBBL  解压失败11",error);
            })
    }


    @action
    onSavaCopyState () {
        TW_Data_Store.setItem(TW_DATA_KEY.isInitStore, "1", (err) => {
            this.log+="onSavaCoisInitStorepyState---err="+err+"\n"
            if (err) {
                TW_Log("versionBBL bbl--- copyFile--onSavaCopyState--error===!", err);
            } else {
                this.isAppUnZip = true;
               // this.startCheckZipUpdate();
            }
            this.log+="onSavaCopyState---  this.isAppUnZip="+this.isAppUnZip+"\n"
            this.startCheckZipUpdate();
        })
    }

    async copy_assets_to_dir() {
        let source_dir = this.originAppDir;
        let target_dir = ""

        if (G_IS_IOS) {
            target_dir = DocumentDirectoryPath + "/gamelobby"
            let target_dir_exist = await RNFS.exists(target_dir);
            this.log+="RNFS.exis=="+target_dir_exist;
            if (target_dir_exist) {
                // TW_Log("versionBBL bbl---   RNFS.unlink---start" + target_dir_exist,target_dir);
                RNFS.unlink(target_dir).then((ret) => {
                    // TW_Log("versionBBL bbl--- unlink----target_dir==!" + target_dir_exist, ret);
                    RNFS.copyFile(source_dir, target_dir).then(() => {
                        this.log+="onSavaCopyState---\n"
                        this.onSavaCopyState();
                    }).catch((err) => {
                        //TW_Log("versionBBL bbl--- 删除文件失败", target_dir_exist);
                    })
                })
            } else {
               // let ret = await RNFS.copyFile(source_dir, target_dir);
                RNFS.copyFile(source_dir, target_dir).then(() => {
                    this.log+="onSavaCopyState---\n"
                    this.onSavaCopyState();
                }).catch((err) => {
                    this.log+="copyFile-err--"+err
                    //TW_Log("versionBBL bbl--- 删除文件失败", target_dir_exist);
                })

               //  this.log+="RNFS.exis=="+target_dir_exist+"-----ret=="+ret;
               // // if (ret) {
               //      this.onSavaCopyState();
               // // }
            }
        }
        else {
            target_dir = DocumentDirectoryPath + "/gamelobby.zip"
            const exist = await RNFS.exists(target_dir);
            TW_Log('andorid----bbl----RNFS.exist ret=='+exist ,exist );
            this.log+="copyFile-exist--"+exist
            if(!exist){
                RNFS.copyFileAssets("gamelobby.zip", target_dir).then((ret)=>{
                    this.log+="copyFile-copyFileAssets--"+ret;
                    this.copy_assets_to_dir();
                    TW_Log('andorid----bbl----copyFileAssets ret==!',ret);
                });

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

