'use-strict';
import Moment from 'moment'
import {action, observable} from "mobx";
import NetUitls from "../../../Common/Network/TCRequestUitls";
import {config} from '../../../Common/Network/TCRequestConfig';
import JXHelper from "../../../Common/JXHelper/JXHelper";
import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter'

/**
 *
 * @author: Mason
 */
export default class BalanceStore {

    constructor() {

    }

    @observable centerBalance = 0 // 中心钱包余额

    @observable transferAccountName = []; // 账户钱包

    @observable platformBalances = [];

    @action
    getPlatforms() {
        let otherPlatform = JXHelper.getDSFOpenList().dsfAll;

        this.transferAccountName = []
        this.platformBalances = []
        this.centerBalance = TCUSER_BALANCE
        this.transferAccountName.push('中心钱包')
        otherPlatform.map((platform) => {
            if (platform.status && platform.status === 'ON') {
                this.transferAccountName.push(platform.gameNameInChinese)
                this.platformBalances.push({'gamePlatform': platform.gamePlatform, 'balance': 0, 'gameNameInChinese': platform.gameNameInChinese})
            }
        })
    }

    //获取所有平台余额
    @action
    getPlatformBalance(callback) {
        NetUitls.getUrlAndParamsAndCallback(config.api.userBalance, null, (res) => {
            if (res.rs) {
                this.centerBalance = res.content.balance;
                RCTDeviceEventEmitter.emit('balanceChange', true);
            }
        })

        this.platformBalances.map((platform) => {
            this.getBalanceByPlatform(platform.gamePlatform, (res) => {
                if (res.rs) {
                    platform.balance = res.content.balance
                }
            })
        })
    }

    //获取指定平台余额
    getBalanceByPlatform(platform, callback) {
        NetUitls.getUrlAndParamsAndPlatformAndCallback(config.api.getPlatformBalance, null, platform, (res) => {
            if (res.rs) {
                this.platformBalances.map((item) => {
                    if (item.gamePlatform === res.content.gamePlatform) {
                        item.balance = res.content.balance
                    }
                })
            }
            callback && callback(res);
        });
    }

    /**
     * 刷新余额
     * @param isMoneyChange
     */
    @action
    freshBalance(isMoneyChange = true) {
        if (this.lastRequestTime === 0) {
            this.lastRequestTime = Moment().format("X");
        } else {
            let temp = Moment().format('X') - this.lastRequestTime;
            if (temp < 1) {
                return;
            } else {
                this.lastRequestTime = Moment().format('X');
            }
        }
        if (isMoneyChange) {
            this.getBalance();
        } else {
            this.getBalanceAnUserInfo();
        }
    }

    //获取余额
    getBalance() {
        NetUitls.getUrlAndParamsAndCallback(config.api.userBalance, null, (res) => {
            if (res.rs) {
                this.balance = res.content.balance;
            }
        })
    }

    //获取余额和用户信息
    getBalanceAnUserInfo() {
        NetUitls.getUrlAndParamsAndCallback(config.api.users, null, (res) => {
            if (res.rs) {
                this.balance = res.content.balance;
                this.realName = res.content.realName;
            }
        })
    }
}

