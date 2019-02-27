/**
 * Created by allen-jx on 2018/4/5.
 */
import {observable, action, computed} from "mobx";
import {
    getPaymentTypeList,
    getPayBankList,
    getPaymentList,
    getOnlineTopUp
} from '../../Common/Network/TCRequestService'
import {Default_PayList} from '../../Data/DefaultPayTypeList'
import _ from 'lodash';

export default class UserPayTypeStore {

    constructor() {
     //   this.initPopUp();
    }

    @observable
    payTypeList = [];

    payTansferList = [];
    bankList = [];
    //最小充值额度
    minimumTopupAmount = 1;

    @action
    initPayTypeList(callback) {
        getPaymentTypeList((response) => {
            if (response.rs) {
                this.payTypeList = response.content && response.content.length > 0 ? response.content : Default_PayList
            } else {
                this.payTypeList = Default_PayList;
            }
            callback&&callback();
        })
    }

    initPopUp() {
        getOnlineTopUp(res => {
            if (res.rs) {
                this.minimumTopupAmount = res.content.minimumTopupAmount;
            }
        })
    }

    /**
     * 选择支付类型
     * @param item
     */
    @action
    selectPayType(callback) {
        this.bankList = []
        this.payTansferList = []
        this.initBankList(callback)
    }

    /**
     * 获取转账银行卡列表
     * @param callback
     */
    initBankList(callback) {
        getPayBankList({id: TW_Store.appStore.clientId}, (res) => {
            if (res.rs) {
                this.parseBankList(res.content);
                this.initPaymentList(callback);
            } else {
                let result = {};
                result.status = false;
                result.message = res.message ? res.message : "服务器出错啦!";
                callback&&callback(result);
            }
        });
    }


    /**
     * 获取微信支付宝支付
     * @param callback
     */
    initPaymentList(callback) {
        getPaymentList((response) => {
            let result = {};
            if (response.rs) {
                result.status = true;
                if (response.content && response.content.length > 0) {
                    this.payTansferList = _.concat(this.payTansferList, response.content);
                }
            } else {
                result.status = false;
                result.message = response.message ? response.message : "服务器出错啦!";
            }
            callback&&callback(result);
        })
    }

    /**
     * 将银行卡列表中支付宝和微信转账信息合并到支付宝和微信
     * @param data
     */
    parseBankList(data) {
        data.map(item => {
            item.bankCode ? this.payTansferList.push(item) : this.bankList.push(item)
        })
    }

    /**
     * 获取支付方式列表
     * @param code
     */
    @action
    getPayList(code) {
        if (code === 'ONLINEBANK') {
            code = 'THIRD_PARTY'
        }
        if (code === 'BANK') {
            return this.sortData(this.bankList)
        } else {
            let payList = []
            this.payTansferList.forEach((item) => {
                let payType = item.type ? item.type : item.bankCode
                if (payType === code) {
                    payList.push(item)
                }
            })
            return this.sortData(payList);
        }
}

//排序
sortData(datas)
{
    let res = datas.sort((itemA, itemB) => {
        return itemA.position - itemB.position;
    })
    return res;
}

}