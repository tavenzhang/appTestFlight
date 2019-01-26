import {observable} from 'mobx'
import {NativeModules, Platform} from "react-native";
import CodePush from 'react-native-code-push'
import {
    configAppId,
    MyAppName,
    versionHotFix,
    platInfo,
    affCodeList
} from '../../config/appConfig';

import {UpDateHeadAppId} from "../../Common/Network/TCRequestConfig";

/**
 * 用于初始化项目信息
 */
export default class AppInfoStore {

    constructor() {
        this.init();
    }

    /**
     * 应用名称
     * @type {string}
     */
    @observable
    appName = MyAppName;

    /**
     * 应用版本号
     * @type {string}
     */
    @observable
    appVersion = "1.0.0";

    /**
     * 设备token
     * @type {string}
     */
    deviceToken = "";

    /**
     * 邀请码
     * @type {string}
     */
    userAffCode = "";

    @observable
    versionHotFix = versionHotFix;

    @observable
    currentDomain = "";

    @observable
    appInfo = null;

    @observable
    clindId=configAppId;

    callInitFuc=null;

    isInitPlat=false;


    init() {
        TW_Data_Store.getItem(TW_DATA_KEY.platData, (err, ret) => {
            TW_Log("TN_GetPlatInfo---versionBBL--TW_DATA_KEY.platDat" + err, ret);
            let appInfo;
            if (err) {
                appInfo = {PlatId: configAppId, isNative: false};
            } else {
                try {
                    appInfo = JSON.parse(ret)
                } catch (e) {

                }
            }
            TW_Log("TN_GetPlatInfo-----appInfo==", appInfo);
            appInfo=appInfo ? appInfo: {PlatId: configAppId, isNative: false};
            //所以的clintId 在此重置
            this.clindId = appInfo.PlatId ? appInfo.PlatId : configAppId;
            platInfo.platId = this.clindId;
            UpDateHeadAppId(this.clindId);
            TW_Store.appStore.appInfo = appInfo;
            this.isInitPlat = true;
            this.callInitFuc = this.callInitFuc ? this.callInitFuc() : null;
            this.initAppName();
            this.initAppVersion();
            this.initDeviceTokenFromLocalStore();
            this.initAffCode();

            TN_GetPlatInfo((data) => {
                TW_Log("TN_GetPlatInfo-----ret=="+(ret==data) , ret);
                if(data){
                    if (data != ret) {
                        appInfo=JSON.parse(data);
                        this.clindId = appInfo.PlatId ? appInfo.PlatId : configAppId;
                        platInfo.platId = this.clindId;
                        UpDateHeadAppId(this.clindId);
                        TW_Store.appStore.appInfo = appInfo;
                        TW_Data_Store.setItem(TW_DATA_KEY.platData, data);
                    }
                }

            });
        })

    }

    regCallInitFuc(callBack){
        this.callInitFuc =callBack;
        if(this.isInitPlat){
            callBack();
        }
    }


    //初始化appName
    initAppName() {
        if (!G_IS_IOS) {
            NativeModules.JXHelper.getAppName((appName) => {
                if (appName.length) {
                    this.appName = appName;
                }
                TW_Log("APPNAME", this.appName)
            })
        }
    }

    //初始化app版本号
    async initAppVersion() {
        let nativeConfig = await CodePush.getConfiguration();
        this.appVersion = nativeConfig.appVersion;
        TW_Store.bblStore.isDebugApp=  this.appVersion=="1.1.1";

        TW_Log("version-nativeConfig--"+ TW_Store.bblStore.isDebugApp, nativeConfig);
    }

    async initDeviceTokenFromLocalStore() {
        await storage.load({key: "USERDEVICETOKEN"}).then(res => {
            if (res) {
                TW_Log("deviceToken", res);
                this.deviceToken = res;
            }
        }).catch(err => {
            TW_Log("deviceToken not found");
        });

        if (this.deviceToken.length === 0) {
            this.deviceToken = await  this.initDeviceTokenFromNative();
            this.saveDeviceTokenToLocalStore();
        }
    }

    initDeviceTokenFromNative() {
        return new Promise(resolve => {
            try {
                NativeModules.JXHelper.getCFUUID(
                    (err, uuid) => {
                        resolve(uuid)
                    })
            }catch (e) {
                resolve(this.getGUIDd())
            }
        })
    }

    getGUIDd() {
        function S4() {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        }

        return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
    }

    saveDeviceTokenToLocalStore() {
        storage.save({key: "USERDEVICETOKEN", data: this.deviceToken})
    }

    /**
     * 初始化邀请码
     */
    initAffCode() {
        let hotAffCode = this.getAppSpecialAffCode();
        if (hotAffCode) {
            this.userAffCode = hotAffCode;
            TW_Log("AFFCODE", this.userAffCode);
            return;
        } else {
            try {
                NativeModules.JXHelper.getAffCode((affcode) => {
                    if (affcode) {
                        this.userAffCode = affcode
                    }
                    TW_Log("AFFCODE--->affcode="+affcode, this.userAffCode);
                })
            } catch (e) {
                TW_Log("AFFCODE NOT FOUND");
            }
        }
    }

    //获取Js中的邀请码
    getAppSpecialAffCode() {
        let a = affCodeList[Platform.OS][this.appVersion];
        if (a) return a;
        return null;
    }


}

