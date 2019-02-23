/**
 * Created by allen-jx on 2018/4/5.
 */
import {observable, action, computed} from "mobx";
import {
    bankApplyFor,
    applayOtherPay,
    banktransfersQuery,
    getPaymentBankList,
    refreshCode
} from '../../Common/Network/TCRequestService'

import Moment from 'moment'

export default class UserPayStore {

    constructor() {
    }

    //输入金额
    @observable
    inputMoney = '';
    payData = {}//支付信息
    realTopupMoney = ''//加上随机数后的金额

    @observable showList = false;
    @observable bankList = [];

    //转账时间
    @observable
    date = Moment().format('YYYY-MM-DD HH:mm')

    //转账订单
    @observable orderNum;

    @observable
    showhelper0 = false;
    @observable
    showhelper1 = false;
    @observable
    showhelper2 = false;
    @observable
    showhelper3 = false;
    @observable
    isShowDialog = false;
    @observable
    showInputName = false;

    @observable
    codeValue;

    @observable
    money = 0;

    /**
     * 银行卡转账申请
     * @param params
     * @param callback
     */
    @action
    applyfForBankPay(params, callback) {
        bankApplyFor(params, (response) => {
            let result = {};
            if (response.rs) {
                result.status = true;
                result.code = response.content.topupCode;
                result.content = response.content;
                JXLog("================", response)
                callback(result);
            } else {
                result.state = false;
                result.message = response.message ? response.message : "服务器异常!";
            }
        });
    }

    /**
     * 其他充值申请
     * @param type
     * @param callback
     */
    @action
    applyForOtherPay(type, bankCode, bankType, callback) {
        let params = {
            depositor: TW_Store.userStore.userName,
            paymentId: this.payData.paymentId,
            paymentType: type,
            topupAmount: this.realTopupMoney,
            id: TW_Store.appStore.clientId
        }

        if (bankCode) {
            params.bankCode = bankCode;
            params.cardType = bankType;
        }
        applayOtherPay(params, (res) => {
            let result = {};
            if (res.rs) {
                result.status = true;
                result.content = res.content;
                callback(result);
            } else {
                result.status = false;
                if (res.message) {
                    result.message = res.message.indexOf('general') >= 0 ? "请求超时,请稍后再试!" : res.message;
                } else {
                    result.message = "服务器异常!";
                }
                callback(result);
            }
        })
    }


    /**
     * 银行卡转账确认
     * @param params
     * @param callback
     */
    @action
    bankTransferQuery(params, callback) {
        params.id = TW_Store.appStore.clientId;
        banktransfersQuery(params, (res) => {
            let result = {};
            if (res.rs) {
                result.status = true;
                this.money = res.content.amount
                this.orderNum = res.content.transactionNo
            } else {
                result.status = false;
                if (res.status === 500) {
                    result.message = "服务器出错啦!";
                } else {
                    result.message = res.message ? res.message : "转账确认失败,请您联系客服!";
                }
            }
            callback(result);
        })
    }


    @action
    getPaymentBankList(callback) {
        getPaymentBankList({paymentSetId: this.payData.platform}, res => {
            if (res.rs) {
                this.bankList = res.content;
                if (this.bankList.length > 0) {
                    this.showList = true;
                    callback(true)
                } else {
                    callback(false)
                }
            } else {
                callback(false);
            }
        })
    }

    @action
    refreshCode(bankId, callback) {
        refreshCode(bankId, callback);
    }

    @action
    next(index) {
        switch (index) {
            case 0:
                this.showhelper0 = !this.showhelper0
                break;
            case 1:
                this.showhelper0 = !this.showhelper0
                this.showhelper1 = !this.showhelper1
                break;
            case 2:
                this.showhelper1 = !this.showhelper1
                this.showhelper2 = !this.showhelper2
                break
            case 3:
                this.showhelper2 = !this.showhelper2
                this.showhelper3 = !this.showhelper3
                break;
            case 4:
                this.showhelper3 = !this.showhelper3
                break;
        }
    }
}