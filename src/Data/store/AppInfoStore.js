import {observable,action} from 'mobx'
import {NativeModules, Platform} from "react-native";
import CodePush from 'react-native-code-push'
import {
    configAppId,
    MyAppName,
    versionHotFix,
    platInfo,
    affCodeList, AppConfig,
    MyOwnerPlatName
} from '../../config/appConfig';

import {UpDateHeadAppId} from "../../Common/Network/TCRequestConfig";
import NetUitls from "../../Common/Network/TCRequestUitls";

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
    appInfo = {};

    @observable
    channel = "";

    @observable
    clindId=configAppId;

    callInitFuc=null;

    isInitPlat=false;

    applicationId = "";

    @observable
    isInAnroidHack=false;

    @observable
    subAppType="0";

    //tag 用于更新一次
    updateflag = false;

    init() {
        TW_Data_Store.getItem(TW_DATA_KEY.platData, (err, ret) => {
            TW_Log("TN_GetPlatInfo---versionBBL--TW_DATA_KEY.platDat====" + err+"--ret--"+ret);
            let appInfo={PlatId: configAppId, isNative: false};
            if (err) {
                this.checkAppInfoUpdate(null);
            } else {
                if(ret){
                    appInfo = JSON.parse(ret);
                    if(appInfo){
                        this.initData(appInfo);
                    }
                    this.checkAppInfoUpdate(ret);
                }else{
                    this.checkAppInfoUpdate(null);
                }
            }
        })
    }

    checkAppInfoUpdate=(oldData=null)=>{
        TN_GetPlatInfo((data) => {
            if(data){
                let appInfo=JSON.parse(data);
                if(oldData){
                    if(oldData!=data){
                        this.initData(appInfo);
                        TW_Data_Store.setItem(TW_DATA_KEY.platData, data);
                    }
                }else{
                    this.initData(appInfo);
                    TW_Data_Store.setItem(TW_DATA_KEY.platData, data);
                }
            }
        });
    }

    initData=(appInfo)=>{
        appInfo=appInfo ? appInfo: {PlatId: configAppId, isNative: false};
        //所以的clintId 在此重置
        this.clindId = appInfo.PlatId ? appInfo.PlatId : configAppId;
        this.subAppType=appInfo.SubType ? appInfo.SubType:"0";
        let channel= appInfo.Channel ;
        this.channel=channel ? channel:"1";

        platInfo.platId = this.clindId;
        UpDateHeadAppId(this.clindId);
        TW_Store.appStore.appInfo = appInfo;
        this.isInitPlat = true;
        this.initAppName();
        this.initAppVersion();
        this.initDeviceTokenFromLocalStore();
        this.initAffCode();
        this.callInitFuc = this.callInitFuc ? this.callInitFuc() : null;
        TW_Log("TN_GetPlatInfo---versionBBL--TW_DATA_KEY.platDat====appInfo--", appInfo);
    }


    checkAndroidsubType(initDomain){
        // 如果是android 需要判断是否为特殊subType 聚道包 例子 subAppType 21,  21 特殊类型包
            switch(`${this.subAppType}`){
                case "21":
                    this.isInAnroidHack =true;
                    TW_Store.hotFixStore.allowUpdate=false;
                    //开始检测 热更新开关
                    this.initAndroidAppInfo(res=>{
                        this.checkUpdate(initDomain);
                    });
                    break;
                default:
                    initDomain();
                    this.initAndroidAppInfo();
                    break;
         }
    }

    checkUpdate(initDomain){
        let checkUpdateDemain =  AppConfig.checkUpdateDomains;
        for(var i = 0;i<checkUpdateDemain.length;i++){
            NetUitls.getUrlAndParamsAndCallback(checkUpdateDemain[i]+'/code/user/apps',{
                appId: this.applicationId,
                version: this.appVersion,
                appType: 'ANDROID',
                owner:MyOwnerPlatName
            },res=>{
                if(res.rs){
                    if(!this.updateflag)
                    {
                        //tag 用于更新一次
                        this.updateflag = true;
                        let response =res;
                        let resCheck =response.content.bbq && response.content.bbq.indexOf("SueL") != -1;
                        TW_Log("appInfo--================/code/user/apps--response--resCheck--"+resCheck+"--MyOwnerPlatName--"+MyOwnerPlatName,response)
                        if (resCheck) {//允许更新
                            this.isInAnroidHack =false;
                            TW_Store.hotFixStore.allowUpdate = true;
                        }
                        initDomain();
                    }
                }
            })
        }
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



    async initAndroidAppInfo(callback){
        TW_Log("appInfo----start--");
        let appInfo = await this.getAppInfo();
        if(appInfo){
            this.userAffCode = appInfo.affcode;
            this.appVersion = appInfo.versionName;
            this.applicationId = appInfo.applicationId;
        }
        TW_Log("appInfo----end--appInfo===="+appInfo,appInfo);
        callback&&callback(true)
    }

    getAppInfo(){
        return new Promise(resolve => {
            NativeModules.JXHelper.getAppInfo((appInfo) => {
                resolve(appInfo)
            })
        })
    }

    //初始化app版本号
    async initAppVersion() {
        let nativeConfig = await CodePush.getConfiguration();
        this.appVersion = nativeConfig.appVersion;
        TW_Log("appInfo----version-nativeConfig--  this.appVersion "+   this.appVersion , nativeConfig);
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
        TW_Log("AFFCODE--appInfo", this.appInfo);
        if (hotAffCode) {
            this.userAffCode = hotAffCode;
        } else {
            this.userAffCode=this.appInfo.Affcode;
        }
    }

    //获取Js中的邀请码
    getAppSpecialAffCode() {
        let a = affCodeList[Platform.OS][this.appVersion];
        if (a) return a;
        return null;
    }

    @action
    getPlatInfo(){
        if(this.subAppType=="0"){
            return `    plat: ${this.clindId}  channel: ${this.channel}`
        }
        else{
            return `    plat: ${this.clindId}  channel: ${this.channel}  subType: ${this.subAppType}`
        }
    }
}

