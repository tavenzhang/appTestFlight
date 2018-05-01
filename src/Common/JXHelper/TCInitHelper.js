/**
 * Created by Sam on 19/01/2017.
 * Copyright © 2016年 JX. All rights reserved.
 */

import {
    NativeModules,
    Platform
} from 'react-native'
import {
    config,
    base,
    appId,
    hotfixUpdataBase,
    hotfixDeploymentKey,
    versionHotFix
} from '../Network/TCRequestConfig';
import NetUitls from '../Network/TCRequestUitls'
import _ from 'lodash';
import Base64 from '../../Common/JXHelper/Base64'

let base64 = new Base64()
import SecretUtils from './SecretUtils'

let secretUtils = new SecretUtils()
import NavigatorHelper from '../JXHelper/TCNavigatorHelper'
import Helper from '../JXHelper/JXHelper'

import Toast from '../../Common/JXHelper/JXToast';
import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter'
import Extension from '../View/Extension'
import JXDomainsHelper from './JXDomainsHelper'
import {affCodeList} from '../../Page/resouce/appAffCodeList'

let domainsHelper = new JXDomainsHelper()
let instance = null
let isCallBack = false
let checkIpIsCallBack = false
let failCount = 0

export default class TCInitHelper {
    // 构造
    constructor() {
        if (!instance) {
            instance = this;
            let array = []
            for (let str in base) {
                array.push(str)
            }
            if (array.length > 0) {
                this.defaultBaseDomain = base[array[_.random(0, array.length - 1)]]
            }
            if (versionHotFix.indexOf('ms.') >= 0) {
                this.getSelfUUID()
            } else {
                this.initUUID()
            }
            Extension.init();
            // this.getAPPVersion();
            this.getUserIconBGColor();

            domainsHelper.start()
        }
        return instance;
    }

    async initUUID() {
        TCUSER_DEVICE_TOKEN = await this.getUUID()
    }

    // 自动登录app
    autoLoginApp() {
        JXLog(' 自动登录app ')
        if(Platform.OS==='android'){
            this.isAndroidDevicesRoot(()=>{this.getUserData()});
            this.checkAndroidCanShowIntelligenceBet();
        }else{
            this.getUserData();
        }
    }

    getUserIconBGColor() {
        storage.load({
            key: 'JXUserIconBGColor'
        }).then((res) => {
            if (res) {
                TCUSER_ICON_BGCOLOR = res
            } else {
                this.getRandomColortoSave()
            }
        }).catch(() => {
            this.getRandomColortoSave()
        })
    }

    getRandomColortoSave() {
        let colorArray = ['#44b1f5', '#FFB561', '#FF6366', '#67D06D']
        let r = Math.floor(Math.random() * 4)
        let color = colorArray[r]
        storage.save({
            key: 'JXUserIconBGColor',
            data: color
        })
        TCUSER_ICON_BGCOLOR = color
    }

    async getSelfUUID() {
        await storage.load({
            key: 'TCUSERDEVICETOKEN',
        }).then(res => {
            if (res) {
                JXLog('res == ' + res)
                TCUSER_DEVICE_TOKEN = res
            } else {
                this.saveSelfUUID(this.getGUIDd())
            }
        }).catch(err => {
            this.saveSelfUUID(this.getGUIDd())
        })
    }

    saveSelfUUID(key) {
        TCUSER_DEVICE_TOKEN = key
        storage.save({
            key: 'TCUSERDEVICETOKEN',
            data: key
        })
    }

    getGUIDd() {
        function S4() {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        }

        return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
    }

    getUUID() {
        return new Promise(resolve => {
            NativeModules.JXHelper.getCFUUID(
                (err, uuid) => {
                    resolve(uuid)
                })
        })
    }

    _requestGameSetting() {
        let prizeGroup = TCUSER_DATA.prizeGroup ? TCUSER_DATA.prizeGroup : ''
        if (!TCUSER_DATA.username || !TCUSER_DATA.islogin) {
            prizeGroup = Helper.getVisitorPrizeGroup()
        }
        NetUitls.getUrlAndParamsAndCallback(config.api.gameSetting, {
            prizeGroup: prizeGroup,
            clientId: appId
        }, (data) => {
            if (data && data.rs && data.content) {
                this.timer && clearInterval(this.timer);
                this.saveGameSetting(data)
            } else {
                this.timer = setTimeout(() => {
                    this._requestGameSetting()
                }, 6000);
            }
        }, null, true)
    }

    saveGameSetting(json) {
        TCGameSetting = json;
        storage.save({
            key: 'TCGameSetting',
            data: json
        })
    }


    checkDomain(callback) {
        NativeModules.JXHelper.getCFUUID(
            (err, uuid) => {

                TCUSER_DEVICE_TOKEN = uuid
                failCount = 0;
                let allCount = 0
                isCallBack = false
                for (let str in base) {
                    allCount++
                }
                for (let str in base) {
                    let baseUrl = base[str]
                    let url = baseUrl + '/update/checkIpInfo'

                    NetUitls.getUrlAndParamsAndCallback(url, null, (data) => {
                        if (data && data.rs && data.content) {
                            if (!this.baseDomain) {
                                this.baseDomain = baseUrl
                            }
                            if (callback && !isCallBack) {
                                // isCallBack = true
                                // callback(false)
                                // callback(data.content.allowAppUpdate)
                                if (Platform.OS === 'ios')
                                    this.checkHotfixServer(callback, data.content.allowAppUpdate)
                            }
                            this.saveDomainCacheData(baseUrl)
                        } else {
                            failCount++
                            if (failCount >= allCount) {
                                failCount = 0
                                callback('ErrorNetwork')
                            }
                        }
                    }, 10000)
                }

            })
    }

    checkHotfixServer(callback, allowAppUpdate) {
        global.JXCodePushServerUrl = hotfixUpdataBase.base1;
        if (Platform.OS == 'ios') {
            NativeModules.JXCodepush.resetDeploymentKey(hotfixDeploymentKey)
            NativeModules.JXCodepush.resetServerUrl(hotfixUpdataBase.base1)
        } else {
            NativeModules.CodePush.resetDeploymentKey(hotfixDeploymentKey)
            NativeModules.CodePush.resetServerUrl(hotfixUpdataBase.base1)
        }
        checkIpIsCallBack = true
        callback(allowAppUpdate)
        // failCount = 0;
        // let allCount = 0
        // checkIpIsCallBack = false
        // for (let str in hotfixUpdataBase) {
        //     allCount++
        // }
        //
        //
        //
        // for (let str in hotfixUpdataBase) {
        //     let baseUrl = hotfixUpdataBase[str]
        //
        //     let url = baseUrl + '/updateCheck?deploymentKey=' + hotfixDeploymentKey + '&appVersion=3.3.3'
        // NetUitls.getUrlAndParamsAndCallback(url, null, (data) => {
        //     if (data && data.rs && data.content.updateInfo && !checkIpIsCallBack) {
        //         global.JXCodePushServerUrl = baseUrl;
        //         if (Platform.OS == 'ios') {
        //             NativeModules.JXCodepush.resetDeploymentKey(hotfixDeploymentKey)
        //             NativeModules.JXCodepush.resetServerUrl(baseUrl)
        //         } else {
        //             NativeModules.CodePush.resetDeploymentKey(hotfixDeploymentKey)
        //             NativeModules.CodePush.resetServerUrl(baseUrl)
        //         }
        //         checkIpIsCallBack = true
        //         callback(allowAppUpdate)
        //     } else {
        //         failCount++
        //         if (failCount == allCount) {
        //             callback(true)
        //         }
        //     }
        // }, 5000)
        // }
    }

    async getDefaultDomainCacheData(callback) {
        await storage.load({
            key: 'TCDefaultDomain',
        }).then(res => {
            if (res) {
                this.defaultBaseDomain = res
                callback(res)
            }
        }).catch(err => {

        })
    }

    saveDomainCacheData(domain) {
        TCDefaultDomain = domain
        storage.save({
            key: 'TCDefaultDomain',
            data: domain
        })
    }

    async freshToken() {
        await storage.load({
            key: 'user'
        }).then(res => {
            if (res) {
                TCUSER_DATA = res
                NetUitls.getUrlAndParamsAndCallback(config.api.refreshToken + res.oauthToken.refresh_token, null, (result) => {
                    if (result.rs) {
                        TCUSER_DATA.oauthToken = result
                        storage.save({
                            key: 'user',
                            data: TCUSER_DATA
                        })
                    }

                }, null, true)
            }
        })
    }


    async getUserData() {
        const res = await storage.load({
            key: 'user',
        }).catch(err => {
            RCTDeviceEventEmitter.emit('userStateChange', 'logout')
        });
        if (res) {
            TCUSER_DATA = res;
            if (res.username && res.password) {
                secretUtils.encode(res.username, base64.decode(res.password), (hash) => {
                    let encryptedPWD = secretUtils.rsaEncodePWD(base64.decode(res.password));
                    NetUitls.PostUrlAndParamsAndCallback(config.api.encryptLogin, {
                        username: res.username,
                        password: encryptedPWD,
                        'hash': hash,
                        appVersion: Platform.OS + '-' + JXAPPVersion + '-' + versionHotFix
                    }, (response) => {
                        if (response.rs) {
                            let user = response.content;
                            user.password = res.password;
                            user.islogin = true;
                            storage.save({
                                key: 'user',
                                data: user
                            });

                            storage.save({
                                key: 'balance',
                                data: user.balance
                            })
                            TCUSER_BALANCE = user.balance;
                            TCUSER_DATA = user;
                            this.getMsgStatus();
                            RCTDeviceEventEmitter.emit('userStateChange', 'login')
                        } else {
                            if (response.status) {
                                Toast.showShortCenter(response.message);
                                NavigatorHelper.pushToUserLogin()
                            }
                            RCTDeviceEventEmitter.emit('userStateChange', 'logout')
                        }
                    }, null, true)
                })
            } else {
                RCTDeviceEventEmitter.emit('userStateChange', 'logout')
            }
        } else {
            RCTDeviceEventEmitter.emit('userStateChange', 'logout')
        }

    }

    async getLoginUserNames() {
        await storage.load({
            key: 'loginUserNames',
        }).then(res => {
            if (res) {
                TC_LOGINED_USER_NAME = _.concat(TC_LOGINED_USER_NAME, res)
            }
        }).catch(err => {

        })
    }

    isGuestUser() {
        let userName = TCUSER_DATA.username.toLocaleLowerCase()
        if (userName.indexOf('guest') === 0) {
            return true
        } else {
            return false
        }
    }

    async getButtonSoundStatus() {
        await storage.load({
            key: 'ButtonSoundStatus',
        }).then(res => {
            TC_BUTTON_SOUND_STATUS = res;
        }).catch(err => {
        })
    }

    getMsgStatus() {
        NetUitls.getUrlAndParamsAndCallback(config.api.getMessageStatus, null, (res) => {
            if (res.rs) {
                TC_NEW_MSG_COUNT = res.content.messageCount;
                TC_FEEDBACK_COUNT = res.content.replyNotReadCount;
                RCTDeviceEventEmitter.emit('newMsgCall')
            }
        })
    }

    // 获取邀请码
    getUserAffCode() {
        // 优先获取热更新邀请码
        let hotAffCode = this.getAppSpecialAffCode()
        if (hotAffCode) {
            TC_DEFAULT_AFFCODE = hotAffCode
            return
        }
        try {
            NativeModules.JXHelper.getAffCode((affcode) => {
                TC_DEFAULT_AFFCODE = affcode
            })
        } catch (e) {

        }
    }

    // 获取热更新包中的邀请码
    getAppSpecialAffCode() {
        let a = affCodeList[Platform.OS][JXAPPVersion]
        if (a) {
            return a;
        }
        return null
    }

    isAndroidDevicesRoot(getUserData) {
        try {
            NativeModules.JXHelper.isAndroidRootDevice((result) => {
                TC_ANDROID_DEVICE_IS_ROOT = result;
                if (null !== getUserData && !result) {
                    getUserData();
                }
            })
        } catch (e) {
            getUserData();
        }
    }

    /**
     * 新版本android才能有智能追号功能
     */
    checkAndroidCanShowIntelligenceBet() {
        try {
            NativeModules.JXHelper.getCanShowIntelligenceBet(
                (result) => {
                    TC_ANDROID_CAN_SHOW_INTELLIGENCE_BET = result;
                }
            );
        } catch (e) {

        }
    }
}
