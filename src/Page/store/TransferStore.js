import {action, observable} from "mobx";
import balanceStore from './BalanceStore'
import NetUitls from "../../Common/Network/TCRequestUitls";
import {config} from '../../Common/Network/TCRequestConfig';

export default class TransferStore {

    constructor() {
    }

    @observable
    fromIndex = 0;
    @observable
    toIndex = 1;

    @observable
    transferMoney = "";
    //筹码Index
    @observable
    selectedIndex = -1;
    moneyData = [100, 200, 300, 500, 800];

    platforms = ["MG", "IMONE"];

    @action
    changeSelectIndex() {
        let temp = -1;
        this.moneyData.map((item, index) => {
            if (this.transferMoney === item + '') {
                temp = index;
            }
        })
        this.selectedIndex = temp;
    }


    /**
     * 平台转账
     */
    transfer(callback) {
        let transferType = this.fromIndex === 0 ? "TopUp" : "Withdraw";
        let platform = this.fromIndex === 0 ? this.platforms[this.toIndex - 1] : this.platforms[this.fromIndex - 1];
        this.platformTransfer(platform, transferType, this.transferMoney, callback);

    }

    platformTransfer(platform, transferType, money, callback) {
        let params = {
            transferType: transferType,
            amount: money
        }
        NetUitls.putUrlAndParamsAndAndPlatformAndCallback(config.api.platformTransfer, platform, params, (res) => {
            if (res.rs) {
                balanceStore.getPlatformBalance();
            }
            callback(res);
        });
    }


    /**
     * 一键回收
     */
    recycleMoney(callback) {
        let params = [];
        balanceStore.platformBalances.map((item) => {
            if (item.balance !== 0) {
                params.push({platformType: item.platformType, gamePlatform: item.gamePlatform, balance: item.balance});
            }
        })
        NetUitls.PutUrlAndParamsAndCallback(config.api.allBalanceTransferToCenter, params, (res) => {
            let result = {message:''};
            if (res.rs) {
                let balanceTransferReList = res.content.balanceTransferReList;
                balanceTransferReList.map((item) => {
                    result.message += item.gamePlatform + item.resultMsg + '\n'
                });
                if (!result.message) {
                    result.message = "回收成功!";
                }
                balanceStore.getPlatformBalance();
            } else {
                result.message = res.message ? res.message : "回收失败，请稍后再试!"
            }
            callback(result);
        });
    }

    /**
     * 一键转入
     * @param platform
     * @param callback
     */
    allTransfer(platform, callback) {
        this.platformTransfer(platform, "TopUp", balanceStore.balance, (res) => {
            if (res.rs) {
                balanceStore.freshBalance();
            }
            callback(res);
        });
    }

    /**
     * 刷新
     * @param platform
     * @param callback
     */
    refresh(platform) {
        balanceStore.getBalanceByPlatform(platform);
    }
}
