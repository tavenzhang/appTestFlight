import {action, observable} from 'mobx'
import {unzip,zip } from 'react-native-zip-archive'
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
        this.androdi_copy_assets_to_dir=this.androdi_copy_assets_to_dir.bind(this);
    }

    @observable
    isAppInited = false;

    @observable
    originAppDir = G_IS_IOS ? (MainBundlePath + '/assets/gamelobby') : "file:///android_asset/gamelobby";

    @observable
    targetAppDir = G_IS_IOS ? DocumentDirectoryPath + "/gamelobby" : `file:///${DocumentDirectoryPath}/gamelobby`;

    @observable
    homeVersionM={name:"home",versionNum:"5_10",baseVersion:"1",source:"",isFlush:false};

    @observable
    appGameListM={};

    @observable
    log="";

    @observable
    appData={};

    //下载jobId
    currentDownId=1;



    @action
    getGameRootDir(){
       // return G_IS_IOS ? (MainBundlePath + '/assets') : "file:///android_asset";
        if(this.isAppInited) {
            return   G_IS_IOS ? DocumentDirectoryPath  : `file:///${DocumentDirectoryPath}`;
        }
        else{
            return G_IS_IOS ? (MainBundlePath + '/assets') : "file:///android_asset";
        }
    }

    @action
    initAppHomeCheck () {
        TW_Data_Store.getItem(TW_DATA_KEY.isInitStore, (err, ret) => {
            TW_Log("TW_Data_Store---versionBBL--W_DATA_KEY.isInitStore==err=3=" + err, ret);
            if (err) {
                this.copy_assets_to_dir();
            } else {
                if (`${ret}` == "1") {
                    this.isAppInited = true;
                } else {
                    this.copy_assets_to_dir();
                }
            }
            this.loadHomeVerson();
        });
    }


    async loadHomeVerson(){
        let Url =TW_Store.dataStore.getHomeWebHome()+"/assets/conf/version.json";
        const target_dir_exist = await RNFS.exists(Url);
        TW_Log("Url-----home---target_dir_exist="+target_dir_exist,Url);
        if(target_dir_exist){
            TW_Store.gameUpateStore.isOldHome=false;
            RNFS.readFile(Url).then(ret=>{
                let data=ret
                if(typeof ret === 'object'){
                    data= ret;
                }else{
                    try {
                        data = JSON.parse(ret);
                    }catch (e) {
                        TW_Log("Url-----home--readFile -then-readFile",e)
                    }
                }
                this.startCheckZipUpdate(data);
            })
        }else{
            TW_Store.gameUpateStore.isOldHome=true;
            this.startCheckZipUpdate(null)
        }
    }

    @action
    startCheckZipUpdate=(versionData=null)=>{
        if(versionData) {
            this.homeVersionM =versionData;
            this.checkHomeZipUpdate();
        }else{
            TW_Data_Store.getItem(TW_DATA_KEY.versionBBL).then((ret) => {
                let verionM=null;
                try{
                    verionM = JSON.parse(ret);
                }catch (error) {
                    this.log+="-->startCheckZipUpdate---catch -==-error=="+error;
                }
                if(ret&&verionM){
                    this.homeVersionM =verionM;
                    this.log+="-->startCheckZipUpdate----homeVersionM-==-"+JSON.stringify(this.homeVersionM)
                }
                this.checkHomeZipUpdate();
            })
        }
    }

    checkHomeZipUpdate=()=>{
        TW_Log("TW_DATA_KEY.versionBBL start  http ===> "+rootStore.bblStore.getVersionConfig());
        this.log+="==>getVersionConfig="+rootStore.bblStore.getVersionConfig();
        NetUitls.getUrlAndParamsAndCallback(rootStore.bblStore.getVersionConfig(),null,(rt)=> {
            TW_Log("TW_DATA_KEY.versionBBL http results== ", rt);
            if (rt.rs) {
                let content = rt.content;
                this.content = content;
                let zipSrc = this.content.source;
                if (G_IS_IOS) {
                    zipSrc = this.content.source_ios ? this.content.source_ios : zipSrc;
                } else {
                    zipSrc = this.content.source_android ? this.content.source_android : zipSrc;
                }
                if (zipSrc) {
                    //如果config source 是相对路径 加上 config 域名
                    if (zipSrc.indexOf("http") == -1) {
                        zipSrc = rootStore.bblStore.getVersionDomain() + "/" + zipSrc;
                    }
                }

                this.log += "==>TW_Store.dataStore.isAppInited=" + TW_Store.dataStore.isAppInited;
                this.log+="\nthis.homeVersionM.versionNum---"+this.homeVersionM.versionNum +"content.versionNum="+content.versionNum;
                TW_Log("TW_DATA_KEY.versionBBL  this.homeVersionM.versionNum =" +this.homeVersionM.versionNum ,content.versionNum);
                if (!TW_IS_DEBIG) {
                    if (this.homeVersionM.versionNum != content.versionNum) {
                        TW_Store.gameUpateStore.isNeedUpdate=true;
                        if(!TW_Store.gameUpateStore.isAppDownIng) {
                            this.downloadFile(zipSrc, rootStore.bblStore.tempZipDir);
                        }
                    }else{
                        TW_Store.gameUpateStore.isNeedUpdate=false;
                    }
                } else {
                    TW_Log("TW_DATA_KEY.versionBBL http results==getWebAction--false ");
                    this.onSaveVersionM({}, true);
                    TW_Store.gameUpateStore.isNeedUpdate=false;

                }
            }else{
                this.onSaveVersionM({}, true);
                TW_Store.gameUpateStore.isNeedUpdate=false;
            }
        })
    }


    onSaveVersionM=(srcData,isHttpFail=false,callFunc)=>{
        TW_Log("TW_DATA_KEY.versionBBL onSaveVersionM isHttpFail==" + isHttpFail, srcData);
        this.homeVersionM  = {...this.homeVersionM,...srcData,isHttpFail};
        TW_Data_Store.setItem(TW_DATA_KEY.versionBBL,JSON.stringify(this.homeVersionM),(ret)=>{
            if(callFunc){
                callFunc(ret);
            }
        });

    }

    clearCurrentDownJob=()=>{
         RNFS.stopDownload(this.currentDownId);
        TW_Store.commonBoxStore.isShow=false;
    }

    onRetartApp =()=>{
        CodePush.restartApp();
    }

    downloadFile=(formUrl,downloadDest)=> {
        this.clearCurrentDownJob();
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
                     TW_Store.gameUpateStore.isLoading=true;
                     if(TW_Store.gameUpateStore.isOldHome){
                         TW_Store.commonBoxStore.isShow=true;
                     }
                 }else{
                     TW_Store.gameUpateStore.isLoading=false;
                     TW_Store.gameUpateStore.isNeedUpdate=false;
                     if(TW_Store.gameUpateStore.isOldHome){
                         TW_Store.commonBoxStore.isShow=false;
                     }
                 }
            },
            progress: (res) => {
               // this.log+="==>progress-="+res;
               // onProgress({percent:(res.bytesWritten/res.contentLength).toFixed(2),param});
                let percent = (res.bytesWritten / res.contentLength).toFixed(2);
               // TW_Log("downloadFile--------progress-TW_Store.gameUpateStore.isNeedUpdate=-",percent);
                if(!TW_Store.gameUpateStore.isAppDownIng){
                    TW_LoaderOnValueJS(TW_Store.bblStore.getWebAction(TW_Store.bblStore.ACT_ENUM.game_loading, {data: {do:"loading",percent}}));
                }
                if(TW_Store.gameUpateStore.isOldHome){
                     TW_Store.commonBoxStore.curPecent=res.bytesWritten;
                     TW_Store.commonBoxStore.totalPecent=res.contentLength;
                }

            }
        };
        try {
            const ret = RNFS.downloadFile(options);
            this.log+="==>downloadFile-="+options;
            this.currentDownId = ret ? ret.jobId:0;
            TW_Log("downloadFile---------start- this.currentDownId-"+ this.currentDownId,ret);
            ret.promise.then(res => {
                TW_Log("downloadFile---------start-lastest---",ret);
                TW_Log('versionBBL---downloadFile---sucess file://' + downloadDest,res);
               // this.log+="==>downloadFile--promise="+JSON.stringify(res)+"---state--"+res.statusCode;
                if(`${res.statusCode}`!="404"){
                    if(!TW_Store.gameUpateStore.isAppDownIng){
                        this.unzipNewCourse(downloadDest);
                    }
                }else{
                    this.log+="==>downloadFile--fail--notstart=";
                    TW_Log('versionBBL --downloadFile --下载文件不存在--', formUrl);
                   // TW_Store.commonBoxStore.isShow=false;
                    if(!TW_Store.gameUpateStore.isAppDownIng){
                        TW_Store.gameUpateStore.isLoading=false;
                        TW_Store.gameUpateStore.isTempExist=true;
                        TW_LoaderOnValueJS(TW_Store.bblStore.getWebAction(TW_Store.bblStore.ACT_ENUM.game_loading,{data:{do:"loadFinish"}}));
                    }
                    if(TW_Store.gameUpateStore.isOldHome){
                        TW_Store.commonBoxStore.isShow=true;
                    }
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
                    if(TW_Store.gameUpateStore.isOldHome){
                        if(G_IS_IOS){
                            this.onRetartApp();
                        }else{
                            setTimeout(()=>{
                                this.onRetartApp(); //android 的文件解压读写延迟比较大，延迟5秒
                            },8000)
                        }
                    }
                });
            })
            .catch((error) => {
                TW_Log("versionBBL  解压失败11",error);
               // TW_OnValueJSHome(TW_Store.bblStore.getWebAction(TW_Store.bblStore.ACT_ENUM.showGame));
            }).finally(()=>{
                     TW_Store.gameUpateStore.isLoading=false;
                     TW_Store.gameUpateStore.isTempExist=true;
                     TW_LoaderOnValueJS(TW_Store.bblStore.getWebAction(TW_Store.bblStore.ACT_ENUM.game_loading,{data:{do:"loadFinish"}}));
                    if(TW_Store.gameUpateStore.isOldHome){
                        TW_Store.commonBoxStore.isShow=true;
                    }
            })
    }


    @action
    onSavaCopyState () {
        TW_Data_Store.setItem(TW_DATA_KEY.isInitStore, "1", (err) => {
            this.log+="onSavaCoisInitStorepyState---err="+err+"\n"
            if (err) {
                TW_Log("versionBBL bbl--- copyFile--onSavaCopyState--error===!", err);
            } else {
                //this.isAppInited = true;
               // this.startCheckZipUpdate();
            }
            this.log+="onSavaCopyState---  this.isAppInited="+this.isAppInited+"\n"
          //  this.loadHomeVerson();
        })
    }

    async copy_assets_to_dir() {
        let source_dir = this.originAppDir;
        let target_dir = ""
        TW_Log('andorid--------copy_assets_to_dir--start');
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
                        TW_Log("versionBBL bbl--- 删除文件失败", target_dir_exist);
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
            }
        }
        else {
            target_dir = DocumentDirectoryPath + "/gamelobby";
            let source_dir="gamelobby"
            const target_dir_exist = await RNFS.exists(target_dir);
            if (!target_dir_exist) {
                await RNFS.mkdir(target_dir);
            }
            const items = await RNFS.readDirAssets(source_dir);
            TW_Log('andorid--------RNFS.readDirAssets(source_dir)--'+items.length);
            for (let i = 0; i < items.length; i++) {
                const item = items[i];
                if (item.isDirectory()) {
                    await this.androdi_copy_assets_to_dir(`${source_dir}/${item.name}`, `${target_dir}/${item.name}`);
                } else {
                    await RNFS.copyFileAssets(`${source_dir}/${item.name}`, `${target_dir}/${item.name}`);
                }
            }
        }
    }

     async androdi_copy_assets_to_dir(source_dir:string, target_dir:string) {
        const target_dir_exist = await RNFS.exists(target_dir);
        if (!target_dir_exist) {
            await RNFS.mkdir(target_dir);
        }
        const items = await RNFS.readDirAssets(source_dir);
        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            TW_Log('andorid--------androdi_copy_assets_to_dir--items.length--'+items.length, item);
            if (item.isDirectory()) {
                await this.androdi_copy_assets_to_dir(`${source_dir}/${item.name}`, `${target_dir}/${item.name}`);
            } else {
                await RNFS.copyFileAssets(`${source_dir}/${item.name}`, `${target_dir}/${item.name}`);
                if(item.path&&item.path.indexOf("style/")>-1){
                    this.onSavaCopyState();
                }
            }
        }
    }

    @action
    getHomeWebUri() {
        if(this.isAppInited){
            return this.targetAppDir+"/index.html"
        }
        return this.originAppDir+"/index.html"
    }

    @action
    getHomeWebHome() {
        return (this.isAppInited  ? this.targetAppDir:this.originAppDir)
    }
}

