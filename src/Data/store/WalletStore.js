'use-strict';
import Moment from 'moment'
import {action, computed, observable} from "mobx";
import NetUitls from "../../Common/Network/TCRequestUitls";
import {config} from '../../Common/Network/TCRequestConfig';
import JXHelper from "../../Common/JXHelper/JXHelper";
import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter'
import TimeOutEvent from '../../Common/JXHelper/JXTimeOutEventHelper';


const lotteryPlatform = 'LOTTERY' // 中心钱包平台名
/**
 *
 * @author: Mason
 */
class WalletStore {

    constructor() {
        this.TimeOutEvent = new TimeOutEvent();
    }

    @observable centerBalance = 0 // 中心钱包余额

    @observable transferAccountName = []; // 账户钱包

    @observable platformBalances = [];

    @observable allBalance = [] // 全部平台余额

    @observable allWalletName = [] // 全部平台钱包名称

    @computed get allBalances() {
        return this.allBalance.slice()
    }

    @computed get allWalletsName() {
        return this.allWalletName.slice()
    }

    findPlatform(gamePlatform) {
        return this.allBalance.find(p => p.gamePlatform === gamePlatform)
    }

    // 获取全部平台
    @action
    getAllPlatforms() {
        // add lottery platform
        let lp = this.findPlatform(lotteryPlatform)
        if (!lp) {
            this.allBalance.push({
                gamePlatform: lotteryPlatform,
                gameNameInChinese: '中心钱包',
                balance: 0
            })
            this.allWalletName.push('中心钱包')
        }

        // add other platform
        let otherPlatform = JXHelper.getDSFOpenList().dsfAll;
        otherPlatform.map((platform) => {
            if (platform.status && platform.status === 'ON') {
                let op = this.findPlatform(platform.gamePlatform)
                if (!op) {
                    this.allBalance.push({
                        gamePlatform: platform.gamePlatform,
                        gameNameInChinese: platform.gameNameInChinese,
                        balance: 0
                    })
                    this.allWalletName.push(platform.gameNameInChinese)
                }
            }
        })
        this.getAllPlatformsBalance()
    }

    // 获取全部平台余额
    @action
    getAllPlatformsBalance() {
        this.TimeOutEvent.pullEvent(() => {
            this.allBalances.map((platform) => {
                if (platform.gamePlatform === lotteryPlatform) { // 获取中心钱包余额
                    this.getLotteryWalletBalance()
                } else { // 获取第三方平台钱包余额
                    this.getOtherWalletBalance(platform.gamePlatform)
                }
            })
        }, 300000)
    }

    // 获取中心钱包余额
    @action
    getLotteryWalletBalance() {
       TW_Store.userStore.getBalance((res) => {
            if (res.rs && res.content) {
                let lp = this.findPlatform(lotteryPlatform)
                if (lp) {
                    lp.balance = res.content.balance
                }
                this.centerBalance = res.content.balance;
                
                TW_Log('WalletStore#getLotteryWalletBalance()', lp)
            }
        })
    }

    // 获取第三方平台钱包余额
    @action
    getOtherWalletBalance(gamePlatform) {
        NetUitls.getUrlAndParamsAndPlatformAndCallback(config.api.getPlatformBalance, null, gamePlatform, (res) => {
            if (res.rs && res.content) {
                let op = this.findPlatform(gamePlatform)
                if (op) {
                    op.balance = res.content.balance
                }
                TW_Log('WalletStore#getOtherWalletBalance() ' + gamePlatform, op)
            }
        })
    }

    /**
     * 平台充值/转账
     * @param platform      平台名（gamePlatform）
     * @param transferType  类型（充值：'TopUp'，转账：'Withdraw'）
     * @param money         充值/转账金额
     * @param callback      回调函数
     */
    @action
    transfer(platform, transferType, money, callback) {
        let params = {
            transferType: transferType,
            amount: money
        }
        // NetUitls.putUrlAndParamsAndAndPlatformAndCallback(config.api.platformTransfer, platform, params, (res) => {
        //     if (res.rs) {
        //         // 刷新中心钱包和第三方钱包余额
        //         this.getLotteryWalletBalance()
        //         this.getOtherWalletBalance(platform)
        //     }
        //     callback && callback(res);
        // });
    }

    //----------------------------------------------------------------------------------------------
    //----------------------------------------------------------------------------------------------

    @action
    getPlatforms() {
        let otherPlatform = JXHelper.getDSFOpenList().dsfAll;

        this.transferAccountName = []
        this.platformBalances = []
        this.centerBalance = userStore.balance;
        this.transferAccountName.push('中心钱包')
        otherPlatform.map((platform) => {

            if (platform.status && platform.status === 'ON') {
                this.transferAccountName.push(platform.gameNameInChinese)
                this.platformBalances.push({
                    'gamePlatform': platform.gamePlatform,
                    'balance': 0,
                    'gameNameInChinese': platform.gameNameInChinese
                })
            }
        })
        this.getPlatformBalance();
    }

    //获取所有平台余额
    @action
    getPlatformBalance(callback) {
        this.getLotteryWalletBalance();
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
}

const walletStore = new WalletStore();
export default walletStore;
