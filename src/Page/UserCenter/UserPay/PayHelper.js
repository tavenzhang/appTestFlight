import Toast from '../../../Common/JXHelper/JXToast';
import RequestUtils from "../../../Common/Network/TCRequestUitls";
import {appId, config} from "../../../Common/Network/TCRequestConfig";
import AlipayAndWechatTransfer from "./TCUserAliAndWechatTransfer";
import Pay from "./TCUserAliAndWechatPay";
import NavigatorHelper from "../../../Common/JXHelper/TCNavigatorHelper";
import HTMLPay from "./TCUserHTMLPay";
import {Linking} from "react-native";
import FixedPage from './TCUserPayFixedPage'
import userStore from '../../../Data/store/UserStore'
import BankPayApply from "./TCUserBankPayMessageNew";

class PayHelper {
    money = '';
    paydata = {};
    props = {};


    isFixedPay() {
        return this.props.code.indexOf("FIXED") !== -1
    }

    /**
     * 检查输入金额
     * @returns {boolean}
     */
    validMoney(rowData, isBank) {
        let reg = /^[0-9]+([.]{1}[0-9]{1,2})?$/
        let inputMoney = this.money + ''
        if (inputMoney.length < 1) {
            Toast.showShortCenter('请输入充值金额!')
            return false
        }
        if (!inputMoney.match(reg)) {
            Toast.showShortCenter('您输入的金额格式不正确!')
            return false
        }
        if (this.money === '' || this.money < 1) {
            Toast.showShortCenter("充值金额不能小于1元!");
            return false
        }

        if (isBank) {
            if (this.money < rowData.minAmount) {
                Toast.showShortCenter("充值金额不能小于" + rowData.minAmount + "元!");
                return false
            }
        } else {
            let minTopup = rowData.minAmount > this.props.minimumTopupAmount ? rowData.minAmount : this.props.minimumTopupAmount;
            if (this.money < minTopup) {
                Toast.showShortCenter("充值金额不能小于" + minTopup + "元!");
                return false
            }
        }

        if (this.money > rowData.maxAmount) {
            Toast.showShortCenter("充值金额不能大于" + (parseInt(rowData.maxAmount)) + "元!");
            return false
        }

        if (rowData.remainQuota && this.money > rowData.remainQuota) {
            Toast.showShortCenter("充值金额不能大于" + parseInt(rowData.remainQuota) + "元!");
            return false
        }
        return true
    }

    /**
     * 点击支付方式
     * @param rowData
     */
    payItemSelected(rowData, callback) {
        if (!this.isFixedPay() && !this.validMoney(rowData)) {
            callback();
            return;
        }
        this.payData = rowData
        let paymentTypes = rowData.paymentType
        switch (rowData.type) {
            case 'WX':
            case 'ZHB':
            case 'JD':
            case 'QQ':
            case 'OTHER':
                this.applayPay(paymentTypes, null, callback)
                break;
            case 'THIRD_PARTY':
                RequestUtils.getUrlAndParamsAndCallback(config.api.getPaymentBankList, {paymentSetId: this.payData.platform}, (res) => {
                    if (res.rs) {
                        var bankList = res.content;
                        if (bankList.length > 0) {
                            callback(bankList)
                        } else {
                            this.applayPay('THIRD', null, callback);
                        }
                    } else {
                        this.applayPay('THIRD', null, callback);
                    }
                });
                break;
            case 'FIXED_QQ':
            case 'FIXED_WX':
            case 'FIXED_ZHB':
                callback();
                this.gotoFixedPage(rowData);
                break;
            default:
                callback();
                this.weChatAndAlipayTransfer(rowData)
                break;
        }
    }


    gotoFixedPage(payData) {
        NavigatorHelper.pushToFixedPage({
            data: payData,
            title: this.getPayTypeTitle()
        })
    }

    /**
     * 申请支付
     * @param type
     */
    applayPay(type, bankCode, callback, bankType) {

        RequestUtils.PostUrlAndParamsAndCallback(config.api.otherPay,
            {
                depositor: userStore.realName,
                paymentId: this.payData.paymentId,
                paymentType: type,
                topupAmount: this.money,
                id: appId,
                bankCode: bankCode,
                cardType: bankType
            }, (response) => {
                callback && callback(false);

                if (response.rs) {
                    this.gotoPayWithPayment(response.content)
                } else {
                    if (response.message) {
                        if (response.message.indexOf('general') >= 0) {
                            Toast.showShortCenter('请求超时,请稍后再试!')
                        } else {
                            Toast.showShortCenter(response.message)
                        }
                    } else {
                        Toast.showShortCenter('服务器异常')
                    }
                }
            })
    }


    /**
     * 根据服务器返回的支付信息进行支付
     * @param res
     */
    gotoPayWithPayment(res) {
        this.money = res.amount && res.amount === 0 ? this.money : res.amount
        switch (res.paymentMethod) {
            case 'WECHAT_QR'://微信支付宝扫码
            case 'ALIPAY_QR':
            case 'JD_QR':
            case 'QQ_QR':
            case 'OTHER_QR':
                if (res.paymentJumpTypeEnum) {
                    this.gotoNewPay(res)
                } else {
                    if (res.webview) {
                        this.gotoUrl(res.data)
                    } else {
                        this.QRpay(res)
                    }
                }
                break;
            case 'BANK_ONLINE'://在线支付
                if (res.paymentJumpTypeEnum === 'FROM') {
                    this.gotoFormPay(res)
                } else {
                    this.gotoWebView(res.data)
                }
                break;
            case 'WECHAT_APP'://跳转支付
            case 'ALIPAY_APP':
            case 'JD_APP':
            case 'QQ_APP':
            case 'OTHER_APP':
                if (res.paymentJumpTypeEnum === 'FROM') {
                    this.gotoFormPay(res)
                } else {
                    this.gotoUrl(res.data)
                }
                break;
            default:
                Toast.showShortCenter('该支付异常，请换一种支付方式！')
                break;
        }
    }


    /**
     *跳转到新的支付类型
     * @param res
     */
    gotoNewPay(res) {
        switch (res.paymentJumpTypeEnum) {
            case 'URL':
            case 'IMG':
                this.QRpay(res)
                break;
            case 'FROM':
                this.gotoFormPay(res)
                break
            case 'HTML':
                this.gotoHTMLPay(res)
                break;
            case 'XML':
                break;
        }
    }

    /**
     * 二维码支付(str)
     * @param res
     * @constructor
     */
    QRpay(res) {
        let payType = this.payData.type
        let qrType = res.paymentJumpTypeEnum
        if (res.data && res.data.length !== 0) {

            NavigatorHelper.pushToAliAndWechatPay({
                type: payType,
                codeType: qrType ? qrType : 'URL',
                money: this.money,
                codeValue: res.data,
                payData: this.payData,
                merchantName: this.payData.merchantName
            })
        } else {
            Toast.showShortCenter('二维码获取失败,请稍后再试!')
        }
    }

    /**
     * 表单支付
     * @param res
     */
    gotoFormPay(res) {
        if (res.data && res.data.length !== 0) {
            let html = `<html><body><div style="text-align:center;margin-top: 50px;">` + res.data + `</div></body></html>`
            NavigatorHelper.pushToHTMLPay({
                title: this.payData.merchantName,
                html: html
            })
        } else {
            Toast.showShortCenter('支付信息获取失败,请稍后再试!')
        }
    }

    /**
     * html页面支付
     * @param res
     */
    gotoHTMLPay(res) {
        let payTitle = this.getPayTypeTitle()
        if (res.data && res.data.length !== 0) {
            NavigatorHelper.pushToHTMLPay({
                title: payTitle,
                html: res.data
            })
        } else {
            Toast.showShortCenter('支付信息获取失败,请稍后再试!')
        }
    }

    getPayTypeTitle() {
        switch (this.payData.type) {
            case 'ZHB':
            case 'FIXED_ZHB':
                return '支付宝充值'
            case 'WX':
            case 'FIXED_WX':
                return '微信充值'
            case 'JD':
                return '京东充值'
            case 'OTHER':
                return '其他充值'
            case 'QQ':
            case 'FIXED_QQ':
                return 'QQ充值'
            default:
                return '网银充值'
        }
    }

    /**
     * 根据链接跳转支付
     * @param url
     */
    gotoUrl(url) {
        if (!url) {
            Toast.showShortCenter('支付链接失效，请稍后再试！')
            return
        }

        Linking.canOpenURL(url).then(supported => {
            if (supported) {
                Linking.openURL(url);
            } else {
                Toast.showShortCenter('支付链接失效，请稍后再试！')
            }
        })
    }

    /**
     * 根据链接跳转到webview支付
     * @param url
     */
    gotoWebView(url) {
        NavigatorHelper.pushToWebView(url, '充值')
    }

    /**
     * 支付宝微信直接转账
     * @param data
     */
    weChatAndAlipayTransfer(data) {
        NavigatorHelper.pushToUserAliAndWechatTransfer({
            type: data.bankCode,
            money: this.money,
            data: data
        })
    }

    /**
     * 申请转账
     */
    bankApplyFor(bank) {
        if (!this.validMoney(bank, true)) {
            return;
        }
        NavigatorHelper.pushToUserBankPayMessage({
            amount: this.money,
            transInfo: bank
        })
    }

    clearData() {
        this.money = '';
        this.payData = {};
    }
}

const payHelper = new PayHelper()

export default payHelper;