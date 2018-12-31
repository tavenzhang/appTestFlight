import {action, observable} from 'mobx'
import {unzip } from 'react-native-zip-archive'
import RNFS from "react-native-fs";
import {MainBundlePath, DocumentDirectoryPath} from 'react-native-fs'

export default class DataStore {

    constructor() {
        this.copy_assets_to_dir=this.copy_assets_to_dir.bind(this);
        this.onSavaCopyState=this.onSavaCopyState.bind(this);
        this.initStoreDate();
    }

    @observable
    isAppUnZip = false;

    @observable
    originAppDir = G_IS_IOS ? (MainBundlePath + '/assets/gamelobby') : "file:///android_asset/gamelobby";

    @observable
    targetAppDir = G_IS_IOS ? DocumentDirectoryPath + "/gamelobby" : `file:///${DocumentDirectoryPath}/gamelobby`;

    @observable
    isShowDebug = false;
    @action
    initStoreDate = () => {
        TW_Data_Store.getItem(TW_DATA_KEY.isInitStore, (err, ret) => {
            TW_Log("TW_Data_Store---bbl--W_DATA_KEY.isInitStore==err==" + err, ret);
            if (err) {
                this.copy_assets_to_dir();
            } else {
                if (`${ret}` == "1") {
                    this.isAppUnZip = true;
                } else {
                    this.copy_assets_to_dir();
                }
            }
        });
    //   this.test();
    }

    // async test() {
    //     let target_dir_tet = DocumentDirectoryPath + "/gamelobby/style/loadingNew.css"
    //     const exist2 = await RNFS.exists(target_dir_tet);
    //     TW_Log('andorid----bbl----RNFS.exist ret=='+target_dir_tet +"--exist2--"+exist2,exist2);
    // }
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

