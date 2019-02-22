/**
 * Created by allen-jx on 2018/4/1.
 */

import {observable, action, computed} from "mobx";
import SecretUtils from '../../Common/JXHelper/SecretUtils'
import {
    getBankList,
    addBank,
    getUserBank,
    getBankNameFromServer
} from '../../Common/Network/TCRequestService'




let secretUtils = new SecretUtils()

export default class BankStore {

    constructor() {
     
    }

    //服务器银行卡列表
    @observable
    bankList = {bankNames: [], bankCodes: []};

    //个人银行卡
    @observable
    personBank = [];



    @observable
    showTip = false;

    @observable
    showAddBankSuccess = false;

    @observable
    showPwdTip = false;

    @observable
    showAddBankTip = false;

    @observable
    showBankTextView = true;

    @observable
    lastRequestBankNo =''




    bankInfo = {
        accountNum: '',//银行卡号
        realName: '',//真实姓名
        bankAddress: '',//开户支行
        bankCode: '',//银行编码
        bankName: '',//银行名称
        password: '',//交易密码
    }

    @action
    initBankList(callback) {
        getBankList((res) => {
            if (res.rs) {
                let banks = res.content;
                let bankNames = [];
                let bankCodes = [];
                let codes =[]
                banks.map((item) => {
                    bankNames.push(item.bankName);
                    bankCodes.push(item.bankCode);
                    codes.push(item.code)
                })
                this.bankList.bankNames = bankNames;
                this.bankList.bankCodes = bankCodes;
                this.bankList.codes = codes;
                callback({status: true})
            } else {
                let result = {status: true};
                result.message = res.message ? res.message : "服务器出错啦!"
                callback(result);
            }
        })
    }

    @action
    initUserBank(callback) {
        let result = {};
        getUserBank((res) => {
            if (res.rs) {
                this.personBank = res.content;
                result.status = true;
                callback(result);
                return;
            } else {
                result.status = false;
                result.message = res.message ? res.message : "服务器出错啦!";
                callback(result);
                return;
            }
        })
    }

    @action
    addBank(callback) {
        let bankCardNo = this.bankInfo.accountNum.replace(/\s+/g, "");
        let encryptSecurityPwd = secretUtils.rsaEncodePWD(this.bankInfo.password);
        let params = {
            realName: this.bankInfo.realName,
            securityPassword: encryptSecurityPwd,
            userBankCardDto: {
                bankCardNo: bankCardNo,
                bankAccountName: this.bankInfo.realName,
                bankAddress: this.bankInfo.bankAddress,
                bankCode: this.bankInfo.bankCode,
                bankName: this.bankInfo.bankName,
            }
        }
        addBank(params, (res) => {
            let result = {};
            if (res.rs) {
                result.status = true;
                this.showAddBankSuccess = true;

                TW_Store.userStore.updateUserAllInfo();
                callback(result);
            } else {
                result.status = false;
                if (res.status === 500) {
                    result.message = "服务器出错啦!"
                } else {
                    result.message = res.message ? res.message : "添加信息失败，请稍后再试!"
                }
                callback(result);
            }
        })
    }

    @action
    getBankName(callback){
        getBankNameFromServer(this.bankInfo.accountNum,(response)=>{
            let result ={}
            if (response.rs&&response.content&&response.content.bank) {
                         let filterIndex = this.bankList.codes.findIndex(function (it) {

                            return it === response.content.bank
                        })
                        TW_Log("TCAddUserInfo | onCardNoCheck() ", "filterIndex="+filterIndex)
                        TW_Log("BANK:",response.content.bank)
                        if (-1 === filterIndex) {
                            result.status = false
                            result.message = '匹配失败，请手动选择开户银行'
                            this.showBankTextView = false
                            result.index = -1
                        } else {
                            this.showBankTextView = false
                            result.index = filterIndex
                            result.status = true
                            this.bankInfo.bankName = this.bankList.bankNames[filterIndex]
                            this.bankInfo.bankCode = this.bankList.bankCodes[filterIndex]
                        }
            } else {
                result.status = false
                result.message = '请手动选择开户银行'
                this.showBankTextView = false
                result.index = -1
            }
            callback&&callback(result)
        })
    }

}