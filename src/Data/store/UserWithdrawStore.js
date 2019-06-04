/**
 * Created by allen-jx on 2018/4/6.
 */

import {observable, action, computed} from "mobx";

import {
    getUserCardsAndWithdrawInfo,
    applyWithdraw, getWithdrawSetting
} from '../../Common/Network/TCRequestService'
import SecretUtils from '../../Common/JXHelper/SecretUtils'

let secretUtils = new SecretUtils()

export default class UserWithdrawStore {


    constructor() {

    }

    //默认银行卡
    @observable
    bank = {};

    @observable
    withdrawModel = {
        totalMoney: 0,//余额
        surplusMaxWithdraw: 0,//剩余最大出款额度
        surplusSeconds: 0,//多少秒之后才能取款
        surplusWithdrawCount: 0,//当天取款次数
        withdrawFeeRateBeyondLimit: 0,//超出取款次数后手续费费率
        maximumWithdrawAmount: 0,//最大出款额度
        maxWithdrawCharge: 0,//最大出款手续费
        minimumWithdrawAmount: 0, //最小出款额度
        ratioOfChargeExempt: 0,//出款手续费比例
        surplusFeeWithdrawCount: 0,//剩余免费出款次数
        sufficeAggregateBetRequirements: false,//打码量是否满足需求
        aggregateBetRequirements: 0,//需要满足的打码量
        aggregateBets: 0,//已完成打码量
        withdrawSwitch: false,//取款是否需要满足打码量要求开关
        maxWithdrawMoney: 0, //最多可提现金额
        newratioOfChargeExempt: 0,//新的手续费计算
        integerWithdrawalAmount: false,//取款是否规定取整数
        numOfChargeExempt:0, //设置的免费次数
        enabledAlipayWithdraw:false //是否允许支付宝出款
    }

    @observable
    withdrawSetting= {
        enabledAlipayWithdraw: false, //是否允许支付宝出款
        hasAlipayCard: false, //是否已绑定支付宝出款卡
        hasBankCard: false //是否已绑定银行卡
    }

    @observable
    tipShow = false
    @observable
    money = 0
    @observable
    tipWithdraw = false
    @observable
    tipMsg = ''
    @observable
    isLoading = true

    @action
    initDefaultBank(callback) {
        getUserCardsAndWithdrawInfo((res) => {
            let result = {}
            this.freshLoading()
            if (res.rs) {
                result.status = true;
                if(res.content&&res.content.dailyWithdrawWithAdminSettingsResult){
                    this.parseWithdrawSetting(res.content.dailyWithdrawWithAdminSettingsResult);
                }
                if (res.content && res.content.bankAccounts.length > 0) {

                    res.content.bankAccounts.forEach((b) => {
                        if (b.isDefault) {
                            this.bank = b
                            return;
                        }
                    })
                } else {
                    this.setDialogVisible();
                }
            } else {
                result.status = false;
                result.message = res.message ? res.message : "服务器出错啦!";
            }
            callback&&callback(result);
        })
    }

    @action
    initWithdraw(callback) {
        getUserCardsAndWithdrawInfo((res) => {
            let result = {}
            TW_Log("initWithdraw>>Benny---")
            this.freshLoading()
            if (res.rs) {
                result.status = true;
                result.message ="成功啦";
            } else {
                result.status = false;
                result.message = res.message ? res.message : "服务器出错啦!";
            }
            callback&&callback(result);
        })
    }

    @action
    applyWithdraw(pwd, callback) {
        let encryptDrawCode = secretUtils.rsaEncodePWD(pwd);
        applyWithdraw({
            amount: this.money,
            userBankId: this.bank.id,
            withDrawCode: encryptDrawCode,
            charge: this.exempt,
            chargeV1: true,
            version: "V2"
        }, (res) => {
            let result = {}
            if (res.rs) {
                this.tipMsg = '您的提款申请已提交，请耐心等待,如有需要可以通过 点击明细 查看进度！'
                result.status = true;
                TW_Store.userStore.freshBalance(true);
                this.setWithdrawModalVisible()
            } else {
                result.status = false;
                result.message = res.message ? res.message : "提款申请失败，请稍候再试!";
            }
            callback(result);
        })
    }

    /* *
     * 解析取款配置
     *@param withdrawSetting
     */
    @action
    parseWithdrawSetting(withdrawSetting) {
        //剩余最大出款金额
        this.withdrawModel.surplusMaxWithdraw = withdrawSetting.surplusMaxWithdraw
        // 多少秒之后才能取款
        this.withdrawModel.surplusSeconds = withdrawSetting.surplusSeconds
        //当天剩余提款次数
        this.withdrawModel.surplusWithdrawCount = withdrawSetting.surplusWithdrawCount


        //厅主出款设定
        let setting = withdrawSetting.withdrawalSettings
        this.withdrawModel.withdrawFeeRateBeyondLimit = setting.chargeRatioBeyondLimit
        this.withdrawModel.totalMoney = withdrawSetting.balance
        this.withdrawModel.maximumWithdrawAmount = setting.maximumWithdrawAmount
        this.withdrawModel.maxWithdrawCharge = setting.maxWithdrawCharge
        this.withdrawModel.ratioOfChargeExempt = setting.ratioOfChargeExempt
        this.withdrawModel.surplusFeeWithdrawCount = withdrawSetting.surplusFeeWithdrawCount
        this.withdrawModel.sufficeAggregateBetRequirements = withdrawSetting.sufficeAggregateBetRequirements
        this.withdrawModel.aggregateBetRequirements = withdrawSetting.aggregateBetRequirements
        this.withdrawModel.aggregateBets = withdrawSetting.aggregateBets
        this.withdrawModel.numOfChargeExempt = setting.numOfChargeExempt;
        this.withdrawModel.withdrawSwitch = withdrawSetting.withdrawalSettings.withdrawSwitch
        this.withdrawModel.minimumWithdrawAmount = setting.minimumWithdrawAmount
        this.withdrawModel.integerWithdrawalAmount = withdrawSetting.withdrawalSettings.integerWithdrawalAmount ? withdrawSetting.withdrawalSettings.integerWithdrawalAmount : false;
        this.withdrawModel.enabledAlipayWithdraw = withdrawSetting.withdrawalSettings.enabledAlipayWithdraw
        this.ratioOfChargeExempt();
        this.getMaxWithdrawMoney(withdrawSetting, setting)
    }


    @action
    freshLoading() {
        this.isLoading = false
    }

    /**
     * 能否取款
     * @returns {boolean}
     */
    @computed
    get canWithdraw() {
        if (this.withdrawModel.totalMoney <= 0 || this.withdrawModel.surplusMaxWithdraw <= 0 || this.withdrawModel.surplusSeconds < 0 || this.withdrawModel.surplusWithdrawCount <= 0 || (this.withdrawModel.withdrawSwitch && !this.withdrawModel.sufficeAggregateBetRequirements)) {
            return true
        }
        return true
    }

    /**
     * 计算打码量百分比
     * @returns {number}
     */
    @computed
    get aggregateBetPercent() {
        let num = this.withdrawModel.aggregateBetRequirements - this.withdrawModel.aggregateBets
        if (num <= 0 || (this.withdrawModel.surplusFeeWithdrawCount > 0 && !this.withdrawModel.withdrawSwitch)) {
            return 100
        }
        let res = (this.withdrawModel.aggregateBets / this.withdrawModel.aggregateBetRequirements).toFixed(2) * 100
        if (res < 1) {
            res = 1
        } else if (res > 100) {
            res = 100
        }
        return res
    }

    /**
     * 计算其他提款手续费
     * @returns {*}
     */
    @computed
    get exempt() {
        if (this.withdrawModel.surplusFeeWithdrawCount > 0 || parseInt(this.money) === 0 || this.withdrawModel.surplusMaxWithdraw === 0) {
            return 0;
        }
        let regExp = new RegExp("^([1-9]\\d{0,9}|0)([.]?|(\\.\\d{1,2})?)$");
        if (regExp.test(this.money)) {
            return this.calExempt(this.money)
        } else {
            return 0
        }
    }

    /**
     * 提现成功提示对话框
     */
    @action
    setWithdrawModalVisible() {
        this.tipWithdraw = !this.tipWithdraw
    }

    /**
     * 计算全部提款最大额度
     * @param withdrawSetting
     * @param setting
     */
    getMaxWithdrawMoney(withdrawSetting, setting) {

        let withdrawMoney = withdrawSetting.surplusMaxWithdraw > withdrawSetting.balance ? withdrawSetting.balance : withdrawSetting.surplusMaxWithdraw;
        withdrawMoney = withdrawMoney >= 0 ? withdrawMoney : 0;
        let maxMoney = 0;
        if ((withdrawSetting.surplusFeeWithdrawCount > 0 || parseInt(withdrawSetting.balance) === 0)) {
            maxMoney = withdrawSetting.balance < 1 ? 0 : this.FloorNum(withdrawMoney, 1);
        } else {
            let tempExempt = withdrawMoney * this.withdrawModel.newratioOfChargeExempt * 0.01
            if (tempExempt >= setting.maxWithdrawCharge) {
                maxMoney = this.FloorNum(withdrawMoney - setting.maxWithdrawCharge, 1)
            } else {
                maxMoney = this.FloorNum(withdrawMoney / (this.withdrawModel.newratioOfChargeExempt * 0.01 + 1), 1)
            }
        }
        this.withdrawModel.maxWithdrawMoney = this.withdrawModel.integerWithdrawalAmount ? this.FloorNum(maxMoney, 0) : maxMoney;
    }

    /**
     * 显示/隐藏提示对话框
     */
    @action
    setDialogVisible() {
        this.tipShow = !this.tipShow
    }


    ratioOfChargeExempt() {
        if (this.withdrawModel.sufficeAggregateBetRequirements) {
            this.withdrawModel.newratioOfChargeExempt = this.withdrawModel.ratioOfChargeExempt;
        } else {
            this.withdrawModel.newratioOfChargeExempt = this.withdrawModel.withdrawFeeRateBeyondLimit;
        }
    }

    /**
     * 计算手续费
     * @returns {*}
     */
    calExempt(money) {
        let tempExempt = money * this.withdrawModel.newratioOfChargeExempt * 0.01
        let exempts = tempExempt >= this.withdrawModel.maxWithdrawCharge ? this.withdrawModel.maxWithdrawCharge : tempExempt
        let res = this.FloorNum(exempts, 2)
        return res
    }

    RoundNum(num, length) {
        var number = Math.round(num * Math.pow(10, length)) / Math.pow(10, length);
        return number;
    }

    FloorNum(num, length) {
        var number = Math.floor(num * Math.pow(10, length)) / Math.pow(10, length);
        return number;
    }
}
