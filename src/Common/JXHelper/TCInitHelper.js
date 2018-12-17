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
            Extension.init();
            domainsHelper.start();
        }
        return instance;
    }

    _requestGameSetting() {
        // let prizeGroup = TCUSER_DATA.prizeGroup ? TCUSER_DATA.prizeGroup : ''
        // if (!TCUSER_DATA.username || !TCUSER_DATA.islogin) {
        //     prizeGroup = Helper.getVisitorPrizeGroup()
        // }
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
}
