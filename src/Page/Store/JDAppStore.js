/**
 * Created by allen-jx on 2018/3/30.
 */

import {NativeModules, Platform} from 'react-native'
import CodePush from 'react-native-code-push'
import {
    appDomainBase,
    configAppId,
    appHotFixUpdataServers,
    deploymentKey,
    appName,
    appHotFixVersion
} from '../../../Page/resouce/appConfig';
import {affCodeList} from '../../Page/resource/appAffCodeList'

import {computed, action, observable} from 'mobx'

import {checkAppVersion, getPlatform}  from '../../Common/Network/RequestService'
/**
 *app信息管理
 */
class JDAppStore {

    constructor() {
        this.init();
    }

    init() {
        this.initDeviceTokenFromLocalStore();
        this.initAppVersion();
        this.initLoginUserName();
        this.initAffCode();
        this.initButtonSoundStatus();
    }

    /**
     * app域名
     */
    appDomainBase = appDomainBase.base1;

    /**
     * 应用名称
     * @type {string}
     */
    appName = appName;

    /**
     * 厅主ID
     * @type {string}
     */
    clientId = configAppId;

    /**
     * 热更新key
     */
    deploymentKey = deploymentKey;

    /**
     * 热更新域名
     */
    appHotFixUpdataServers = appHotFixUpdataServers;

    /**
     * 应用版本号
     * @type {string}
     */
    @observable
    appVersion = "1.0.0";
    /**
     * 热更新版本号
     * @type {string}
     */
    hotFixVersion = appHotFixVersion;
    /**
     * 设备token
     * @type {string}
     */
    deviceToken = "";

    /**
     * 登录过的用户名
     * @type {Array}
     */
    loginedUserNames = [];

    //按钮声音状态
    @observable
    buttonSoundStatus = false;

    //厅主支持的平台
    platforms = [];

    generalContents;
    bankCardLogoUrlPrefix;
    customerServiceUrl;

    getBankCardLogo(bankCode) {
        return this.bankCardLogoUrlPrefix + bankCode + ".png";
    }

    getBankBackground(bankCode) {
        return this.bankCardLogoUrlPrefix + bankCode + "_bg.png";
    }

    /**
     * 获取配置网址
     * @param type
     * @returns {*}
     */
    getGeneralContents(type) {
        for (var i = 0; i < this.generalContents.length; i++) {
            if (this.generalContents[i].type === type) {
                return this.generalContents[i].contentUrl
            }
        }
        return null;
    }

    /**
     * 获取默认的用户名
     * @returns {*}
     */
    getDefaultUserName() {
        if (this.loginedUserNames.length > 0) {
            return this.loginedUserNames[this.loginedUserNames.length - 1];
        }
    }

    /**
     * 邀请码
     * @type {string}
     */
    userAffCode = "";

    initDeviceTokenFromNative() {
        return new Promise(resolve => {
            NativeModules.JXHelper.getCFUUID((err, uuid) => {
                resolve(uuid);
            })
        })
    }

    async initDeviceTokenFromLocalStore() {
        storage.loadData()
        await storage.load({key: "USERDEVICETOKEN"}).then(res => {
            if (res) {
                JXLog("deviceToken", res);
                this.deviceToken = res;
            }
        }).catch(err => {
            JXLog("deviceToken not found");
        });

        if (this.deviceToken.length === 0) {
            this.deviceToken = await  this.initDeviceTokenFromNative();
            this.saveDeviceTokenToLocalStore();
        }
    }

    saveDeviceTokenToLocalStore() {
        storage.save({key: "USERDEVICETOKEN", data: this.deviceToken})
    }

    /**
     * 初始化app版本号
     * @returns {Promise.<void>}
     */
    async initAppVersion() {
        let nativeConfig = await CodePush.getConfiguration();
        this.appVersion = nativeConfig.appVersion;
        JXLog("version", this.appVersion);
    }

    async initLoginUserName() {
        await storage.load({key: "LOGINEDUSERNAMES"}).then(res => {
            if (res) {
                JXLog("loginedUserNames", res);
                this.loginedUserNames = res;
            }
        }).catch(err => {
            JXLog("loginedUserNames not found");
        });
    }

    async initButtonSoundStatus() {
        await  storage.load({key: "BUTTONSOUNDSTATUS"}).then(res => {
            this.buttonSoundStatus = res;
        }).catch(err => {
            JXLog("BUTTONSOUNDSTATUS not found");
        });
    }

    @action
    switchButtonSoundStatus() {
        this.buttonSoundStatus = !this.buttonSoundStatus;
        storage.save({key: "BUTTONSOUNDSTATUS", data: this.buttonSoundStatus})
    }

    @action
    checkAppVersionUpdate(callback) {
        checkAppVersion(callback);
    }

    /**
     * 添加登录用户名
     * @param userName
     */
    addLoginedUserName(userName) {
        this.loginedUserNames.push(userName)
        this.loginedUserNames = Array.from(new Set(this.loginedUserNames))
        storage.save({key: "LOGINEDUSERNAMES", data: this.loginedUserNames})
        JXLog("USER:", this.loginedUserNames)
    }

    /**
     * 初始化邀请码
     */
    initAffCode() {
        let hotAffCode = this.getAppSpecialAffCode();
        if (hotAffCode) {
            this.userAffCode = hotAffCode;
            JXLog("AFFCODE", this.userAffCode)
            return;
        } else {
            try {
                NativeModules.JXHelper.getAffCode((affcode) => {
                    this.userAffCode = affcode
                    JXLog("AFFCODE", this.userAffCode)
                })
            } catch (e) {
                JXLog("AFFCODE NOT FOUND")
            }
        }
    }

    //获取Js中的邀请码
    getAppSpecialAffCode() {
        let a = affCodeList[Platform.OS][this.appVersion];
        if (a)return a;
        return null;
    }

    @action
    initPlatform() {
        getPlatform({clientId: this.clientId}, (res) => {
            if (res.rs) {
                let platforms = res.content;
                JXLog("===platforms", platforms);
                for (var platform in platforms) {
                    this.platforms.push(platform);
                }
            }
        })
    }
}

const jdAppstore = new JDAppStore();
export default  jdAppstore;
