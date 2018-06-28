'use-strict';
import {action, computed, observable} from "mobx";
import NetUtils from "../../Common/Network/TCRequestUitls";
import {config} from '../../Common/Network/TCRequestConfig';
import JXHelper from "../../Common/JXHelper/JXHelper";
import TimeOutEvent from '../../Common/JXHelper/JXTimeOutEventHelper';
import userStore from './UserStore'

const lotteryPlatform = 'LOTTERY' // 中心钱包平台名
/**
 *
 * @author: Mason
 */
class WalletStore {

    constructor() {
        this.TimeOutEvent = new TimeOutEvent();
    }

    @observable lotteryBalance = 0 // 中心钱包（彩票）余额

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
        }, 120000)
    }

    // 获取中心钱包余额
    @action
    getLotteryWalletBalance() {
        userStore.getBalance(res => {
            if (res.rs && res.content) {
                this.lotteryBalance = res.content.balance
                let lp = this.findPlatform(lotteryPlatform)
                if (lp) {
                    lp.balance = this.lotteryBalance
                }
                JXLog('BalanceStore#getLotteryWalletBalance()', lp)
            }
        })
    }

    // 获取第三方平台钱包余额
    @action
    getOtherWalletBalance(gamePlatform) {
        NetUtils.getUrlAndParamsAndPlatformAndCallback(config.api.getPlatformBalance, null, gamePlatform, (res) => {
            if (res.rs && res.content) {
                let op = this.findPlatform(gamePlatform)
                if (op) {
                    op.balance = res.content.balance
                }
                JXLog('BalanceStore#getOtherWalletBalance() ' + gamePlatform, op)
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
        NetUtils.putUrlAndParamsAndAndPlatformAndCallback(config.api.platformTransfer, platform, params, (res) => {
            if (res.rs) {
                // 刷新中心钱包和第三方钱包余额
                this.getLotteryWalletBalance()
                this.getOtherWalletBalance(platform)
            }
            callback && callback(res);
        });
    }
}

const walletStore = new WalletStore();
export default walletStore;
