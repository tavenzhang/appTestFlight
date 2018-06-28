/**
 * Created by allen-jx on 2018/3/30.
 */

import {NativeModules, Platform} from 'react-native'
import CodePush from 'react-native-code-push'
import {
    appDomainBase,
    configAppId,
    appHotFixUpdataServers,
    deploymentKey
} from '../../Page/resouce/appConfig';
import {versionHotFix} from '../../Common/Network/TCRequestConfig'
import {computed, action, observable} from 'mobx'

import {checkAppVersion, getPlatform} from '../../Common/Network/TCRequestService'
import SoundHelper from "../../Common/JXHelper/SoundHelper";

/**
 *app信息管理
 */
class JDAppStore {

    constructor() {
        this.init();
    }

    init() {
        this.initLoginUserName();
        this.initButtonSoundStatus();
    }

    /**
     * app域名
     */
    appDomainBase = appDomainBase.base1;


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
     * 热更新版本号
     * @type {string}
     */
    hotFixVersion = versionHotFix;


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


    @observable
    showUpdateDialog = false;

    appDownloadUrl;


    getBankCardLogo(bankCode) {
        return {uri: TCHomeContents.content.otherSettings.bankCardLogoUrlPrefix + bankCode + ".png"};
    }

    getBankBackground(bankCode) {
        return {uri: TCHomeContents.content.otherSettings.bankCardLogoUrlPrefix + bankCode + "_bg.png"};
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
    switchButtonSoundStatus(value) {
        this.buttonSoundStatus = value;
        storage.save({key: "BUTTONSOUNDSTATUS", data: this.buttonSoundStatus})
    }

    @action
    playSound() {
        if (this.buttonSoundStatus) {
            SoundHelper.playSoundBundle();
        }
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
export default jdAppstore;
