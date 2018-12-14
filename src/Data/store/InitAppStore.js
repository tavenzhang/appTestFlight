import {computed, action, observable} from 'mobx'
import {NativeModules, Platform} from "react-native";
import CodePush from 'react-native-code-push'
import {
    MyAppName
} from '../../Page/resouce/appConfig';
import {affCodeList} from "../../Page/resouce/appAffCodeList";

/**
 * 用于初始化项目信息
 */

class InitAppStore {

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

    init() {
        this.initAppName();
        this.initAppVersion();
        this.initDeviceTokenFromLocalStore();
        this.initAffCode();
    }

    //初始化appName
    initAppName() {
        if (!G_IS_IOS) {
            NativeModules.JXHelper.getAppName((appName) => {
                if (appName.length) {
                    this.appName = appName;
                }
                TWLog("APPNAME", this.appName)
            })
        }
    }

    //初始化app版本号
    async initAppVersion() {
        let nativeConfig = await CodePush.getConfiguration();
        this.appVersion = nativeConfig.appVersion;
        TWLog("version", this.appVersion);
    }

    async initDeviceTokenFromLocalStore() {
        await storage.load({key: "USERDEVICETOKEN"}).then(res => {
            if (res) {
                TWLog("deviceToken", res);
                this.deviceToken = res;
            }
        }).catch(err => {
            TWLog("deviceToken not found");
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
            TWLog("AFFCODE", this.userAffCode);
            return;
        } else {
            try {
                NativeModules.JXHelper.getAffCode((affcode) => {
                    if (affcode) {
                        this.userAffCode = affcode
                    }
                    TWLog("AFFCODE--->affcode="+affcode, this.userAffCode);
                })
            } catch (e) {
                TWLog("AFFCODE NOT FOUND");
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

const initAppStore = new InitAppStore();
export default initAppStore;
