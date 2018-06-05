'use-strict';
import {observable, action, computed, autorun} from "mobx";
import NetUitls from "../../Common/Network/TCRequestUitls";
import {config, appId, appVersion, AppName} from '../../Common/Network/TCRequestConfig';

/**
 *
 * @author: Mason
 */
class BalanceStore {

    constructor() {

    }

    //账户钱包
    transferAccountName = [];

    @observable
    platformBalances = [];

    //获取所有平台余额
    @action
    getPlatformBalance(callback) {
        NetUitls.getUrlAndParamsAndCallback(config.api.getAllBalance, {}, (response) => {
            let res = {};
            if (response.rs) {
                let result = response.content;
                this.balance = result.centerBalance;
                this.transferAccountName = []
                this.platformBalances = []
                this.transferAccountName.push('中心钱包')
                let otherBalances = result.platformBalances
                otherBalances.map((item) => {
                    this.transferAccountName.push(item.gamePlatform+'钱包')
                    this.platformBalances.push(item)
                })
                console.debug('BalanceStore()', this.platformBalances)
            } else {
                res.message = response.message ? response.message : "刷新数据失败!";
            }
            callback && callback(res);
        })
    }

    //获取指定平台余额
    getBalanceByPlatform(platform, callback) {
        getPlatformBalance(platform, (res) => {
            if (res.rs) {
                this.platformBalances.map((item) => {
                    if (item.gamePlatform === res.content.gamePlatform) {
                        item.balance = res.content.balance
                    }
                })
                callback && callback(res);
            }
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
        getBalance((res) => {
            if (res.rs) {
                this.balance = res.content.balance;
            }
        })
    }

    //获取余额和用户信息
    getBalanceAnUserInfo() {
        getBalaceAndUserInfo((res) => {
            if (res.rs) {
                this.balance = res.content.balance;
                this.realName = res.content.realName;
            }
        })
    }
}
const balanceStore = new BalanceStore()
export default balanceStore
