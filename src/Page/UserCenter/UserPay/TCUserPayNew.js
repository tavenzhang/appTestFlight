/**
 * Created by allen-jx on 2017/10/23.
 */
import React, {Component, PropTypes} from "react";
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    Linking,
    Image,
    ActivityIndicator,
    ScrollView,
    TextInput, Platform, NativeModules
} from "react-native";
import {observer} from 'mobx-react/native'
import {observable, computed, action} from 'mobx'
import {
    Size,
    indexBgColor,
    listViewTxtColor,
    width,
    height,
    shoppingTxtColor,
    buttonStyle,
    payTxtColor
} from '../../resouce/theme'
import {userPay} from '../../resouce/images'
import TopNavigationBar from "../../../Common/View/TCNavigationBar";
import Toast from '../../../Common/JXHelper/JXToast';
import TCKeyboardView from "../../../Common/View/TCKeyboardView";
import RequestUtils from "../../../Common/Network/TCRequestUitls";
import {config, appId} from "../../../Common/Network/TCRequestConfig";
import LoadingSpinnerOverlay from '../../../Common/View/LoadingSpinnerOverlay'
import NavigatorHelper from "../../../Common/JXHelper/TCNavigatorHelper";
import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter'
import dismissKeyboard from 'dismissKeyboard'
import _ from 'lodash';
import {withMappedNavigationProps} from 'react-navigation-props-mapper'
import ModalList from "./View/ModalList";
import ButtonView from "../../../Common/View/ButtonView";
import JXHelper from "../../../Common/JXHelper/JXHelper";

/**
 * 提示对话框
 */
@withMappedNavigationProps()
@observer
export default class TCUserPayNew extends Component {

    payData = {}//支付信息
    money = ''
    realTopupMoney = ''//加上随机数后的金额
    @observable showList = false;
    @observable bankList = [];


    constructor(props) {
        super(props)
        this.moneyData = new MoneyData()
    }

    componentDidMount() {
    }

    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);
    }

    render() {
        return (
            <View style={styles.container}>
                <TCKeyboardView ref="tcKeyboardView" setInputValue={(number) => {
                    this.setTextInputValue(number)
                }}/>
                < TopNavigationBar
                    title={'充值'}
                    needBackButton={true}
                    rightTitle={'充值明细'}
                    rightButtonCall={() => {
                        this.gotoPayRecord()
                    }}
                    backButtonCall={() => {
                        this.goBack()
                    }}/>
                <View style={styles.payMoneyItemStyle}>
                    <Text style={styles.payTitleStyle}>充值金额</Text>
                    {this.getInputView()}
                    <Text style={{color: payTxtColor.payMoneyTip}}>元</Text>
                </View>
                <MoneyLabelView
                    ref="moneyLabelView"
                    changeMoney={(money) => {
                        this.changeMoney(money)
                    }}/>
                <View style={[styles.payTipView, {flexDirection: 'row'}]}>
                    <Text style={styles.payTip}>请选择充值方式 (如有问题，请联系</Text>
                    <TouchableOpacity onPress={() => this.onlineService()}>
                        <Text style={[styles.payTip, {color:'#4292cd'}]}>在线客服</Text>
                    </TouchableOpacity>
                    <Text style={styles.payTip}>)</Text>
                </View>
                <ScrollView style={{marginTop: 5, marginBottom: 20}} keyboardDismissMode='on-drag'>
                    {this.props.payList && this.props.payList.length > 0 ? this.getContentView() : this.getEmptyTip()}
                </ScrollView>
                <LoadingSpinnerOverlay
                    ref={component => this._partModalLoadingSpinnerOverLay = component}
                    modal={true}
                    marginTop={64}/>
                <ModalList
                    show={this.showList}
                    dataList={this.bankList}
                    closeModal={() => {
                        this.showList = false;
                    }}
                    renderRow={(rowData) => this.renderBankList(rowData)}
                />
            </View>
        )
    }

    onlineService() {
        if (Platform.OS === 'ios') {
            NavigatorHelper.pushToWebView(JXHelper.getMenuIconsUrl('CUS_SERVICE'), '在线客服');
        } else {
            try {
                NativeModules.JXHelper.openWebViewFromJs(JXHelper.getMenuIconsUrl('CUS_SERVICE'));
            } catch (e) {
                NavigatorHelper.pushToWebView(JXHelper.getMenuIconsUrl('CUS_SERVICE'), '在线客服');
            }
        }
    }

    /**
     * 渲染银行列表
     * @param rowData
     * @returns {XML}
     */
    renderBankList(rowData) {
        return (<View style={styles.bankItemView}>
            <Text>{rowData.bankName}</Text>
            {this.getBankTypeView(rowData)}
        </View>)
    }

    getBankTypeView(rowData) {

        if (rowData.bankType.length === 2) {
            return (<View style={{flexDirection: 'row'}}>
                <ButtonView text="储蓄卡" btnStyle={{marginHorizontal: 5}}
                            onClick={() => this.onPayBankList(rowData.bankValue, 'DC')}/>
                <ButtonView text="信用卡" btnStyle={{marginHorizontal: 5}}
                            onClick={() => this.onPayBankList(rowData.bankValue, 'CC')}/>
            </View>)
        } else {
            let type = rowData.bankType[0];
            if (type === 'DC') {
                return (<ButtonView text={'储蓄卡'} btnStyle={{marginHorizontal: 5}}
                                    onClick={() => this.onPayBankList(rowData.bankValue, 'DC')}/>)
            } else {
                return (<ButtonView text={'信用卡'} btnStyle={{marginHorizontal: 5}}
                                    onClick={() => this.onPayBankList(rowData.bankValue, 'CC')}/>)
            }
        }
    }

    onPayBankList(bankValue, bankType) {
        this.showList = false;
        this.showLoading();
        this.applayPay("THIRD", bankValue, bankType);
    }

    getContentView() {
        let paymentList = []
        if (this.props.code === 'BANK') {
            this.props.payList.map((item, index) => {
                paymentList.push(this.getBankPayItemView(item, index))
            })
        } else {
            this.props.payList.map((item, index) => {
                paymentList.push(this.getPayItemView(item, index))
            })
        }
        return paymentList
    }

    getInputView() {
        if (this.props.code === "BANK") {
            return (<View style={styles.inputContainer}>
                <TextInput
                    ref="inputTextMoney"
                    style={styles.inputTextStyle}
                    maxLength={8}
                    keyboardType={'numeric'}
                    defaultValue={this.moneyData.inputMoney.toString()}
                    underlineColorAndroid={'transparent'}
                    onChangeText={(text) => this.setMoneyInputValue(text)}
                    onEndEditing={e => this.textInputOnEndEditing(e)}
                    onSubmitEditing={() => {
                        this.endingEditing()
                        dismissKeyboard()
                    }}
                /></View>)
        } else {
            return (<TouchableOpacity style={styles.inputContainer} onPress={() => this.showKeyBoard()}>
                <InputMoneyView ref="inputMoneyView"/>
            </TouchableOpacity>)
        }
    }


    /**
     * 当数据为空时提示
     * @returns {XML}
     */
    getEmptyTip() {
        return (
            <View style={styles.emptyTip}>
                <Image
                    source={userPay.noPayData} style={styles.payErrorImg}/>
                <Text style={{color: listViewTxtColor.content}}>该支付方式目前无法使用</Text>
                <Text style={{color: listViewTxtColor.content}}>敬请谅解!请选择其它支付方式!</Text>
            </View>
        )
    }

    /**
     * 获取银行卡转账item组件
     * @param bank
     * @returns {XML}
     */
    getBankPayItemView(bank, index) {
        return (<TouchableOpacity
            key={"000" + index}
            onPress={() => {
                this.bankApplyFor(bank)
            }}>
            <View style={styles.itemMainStyle}>
                <View style={styles.itemLeftStyle}>
                    <View style={styles.bankRowStyle}>
                        <Text style={styles.itemTitleStyle}>收款银行</Text>
                        <Text style={styles.itemTitleRightStyle}>{bank.bankName}</Text>
                    </View>
                    <View style={styles.bankRowStyle}>
                        <Text style={styles.itemTitleStyle}>收款账号</Text>
                        <Text style={styles.itemTitleRightStyle}>{bank.bankCardNo}</Text>
                    </View>
                    <View style={styles.bankRowStyle}>
                        <Text style={styles.itemTitleStyle}>{'收款人    '}</Text>
                        <Text style={styles.itemTitleRightStyle}>{bank.receiptName}</Text>
                    </View>
                    <View style={styles.bankRowStyle}>
                        <Text style={styles.itemTitleStyle}>收款支行</Text>
                        <Text style={styles.itemTitleRightStyle}>{bank.bankAddress}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>)
    }

    /**
     * 申请转账
     */
    bankApplyFor(bank) {
        if (!this.validMoney(bank)) {
            return;
        }
        this.showLoading()
        let params = {adminBankId: bank.adminBankId, amount: this.money}
        RequestUtils.PostUrlAndParamsAndCallback(config.api.banktransfers, params, (response) => {
            this.hideLoading()
            if (response.rs) {
                this.gotoBankMsg(response.content, bank.adminBankId);
            } else {
                if (response.status === 400) {
                    if (response.message)
                        Toast.showShortCenter(response.message)
                } else {
                    Toast.showShortCenter("服务器异常!")
                }
                this.goBack()
            }
        })
    }

    /**
     * 获取支付方式item组件
     * @param paymentItem
     * @returns {XML}
     */
    getPayItemView(paymentItem, index) {
        return (<TouchableOpacity onPress={() => this.payItemSelected(paymentItem)} key={"000" + index}>
            <View style={styles.payItemStyle}>
                {this.getPayImage(paymentItem)}
                <View style={styles.payTypeTxt}>
                    <Text
                        style={[styles.payTypeTitleStyle, {fontSize: Size.default}]}>{paymentItem.type ? paymentItem.merchantName : paymentItem.receiptName}</Text>
                    <Text style={styles.payRemarkTxt}>{paymentItem.remarks}</Text>
                </View>
            </View>
        </TouchableOpacity>)
    }

    /**
     * 获取支付图标
     * @param rowData
     * @returns {XML}
     */
    getPayImage(rowData) {
        let payType = rowData.type ? rowData.type : rowData.bankCode
        let perchantName = rowData.merchantName
        if (payType === 'WX' && perchantName && (perchantName.indexOf('Q') != -1 || perchantName.indexOf('q') != -1)) {
            return <Image source={userPay.qqPay} style={styles.payTypeImg}/>
        }
        if (payType === 'THIRD_PARTY' || payType === 'OTHER') {
            return <Image source={userPay.thirdPay} style={styles.payTypeImg}/>
        }
        return <Image source={this.getPayTypeIcon(payType)} style={styles.payTypeImg}/>
    }

    getPayTypeIcon(payType) {
        switch (payType) {
            case 'WX':
                return userPay.wechat
            case 'ZHB':
                return userPay.alipay
            case 'JD':
                return userPay.jdzf
            case 'BANK':
                return userPay.bank
            default:
                return userPay.thirdPay
        }
    }

    /**
     * 数字键盘回调函数
     * @param number
     */

    setTextInputValue(number) {
        let currentStr = this.money + ''
        if (number == '确认') {
        } else if (number == '删除') {
            currentStr = currentStr.substr(0, currentStr.length - 1)
        } else {
            currentStr = currentStr + number
            if (currentStr.length > 6) {
                return
            }
        }
        if (this.money !== currentStr) {
            let moneyLabel = this.refs.moneyLabelView
            moneyLabel._resetMoney(currentStr)
        }
        this.money = currentStr
        let moneyView = this.refs.inputMoneyView
        moneyView._resetMoney(this.money)
    }

    setMoneyInputValue(money) {
        if (this.money !== money) {
            let moneyLabel = this.refs.moneyLabelView
            moneyLabel._resetMoney(money)
        }
        this.moneyData.resetInputMoney(money);
        this.money = money
    }

    textInputOnEndEditing() {
        this.endingEditing()
    }

    endingEditing() {
        //输入完毕后校验金额
        this.moneyData.resetInputMoney(this.moneyData.inputMoney)
    }

    /**
     * 跳转到充值历史界面
     */
    gotoPayRecord() {
        NavigatorHelper.pushToUserPayAndWithDraw(1)
    }

    /**
     * 返回上一级
     */
    goBack() {
        RCTDeviceEventEmitter.emit('balanceChange', true)
        NavigatorHelper.popToBack();
    }

    /**
     * 弹出数字键盘
     */
    showKeyBoard() {
        var popView = this.refs.tcKeyboardView
        if (popView.modalVisible) {
            popView._setModalVisible(false);
        } else {
            popView._setModalVisible(true);
        }
    }

    /**
     * 修改金额
     * @param money
     */
    changeMoney(money) {
        this.money = money
        this.moneyData.resetInputMoney(money)
        let moneyView = this.refs.inputMoneyView
        moneyView && moneyView._resetMoney(this.money)
    }

    /**
     * 显示加载提示
     */
    showLoading() {
        this._partModalLoadingSpinnerOverLay.show()
    }

    /**
     * 隐藏加载提示
     */
    hideLoading() {
        this._partModalLoadingSpinnerOverLay.hide()
    }

    /**
     * 检查输入金额
     * @returns {boolean}
     */
    validMoney(rowData) {
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
        if (rowData.remainQuota && this.money > rowData.remainQuota) {
            Toast.showShortCenter("充值金额不能大于" + parseInt(rowData.remainQuota) + "元!");
            return false
        }
        if (this.money < rowData.minAmount) {
            Toast.showShortCenter("充值金额不能小于" + rowData.minAmount + "元!");
            return false
        }
        if (rowData.bankCode) {//如果是微信支付宝转账,就不加一位随机数
            this.realTopupMoney = this.money
        } else {
            this.realTopupMoney = parseInt(this.money) + this.addRandomMoney()
        }
        if (this.realTopupMoney > rowData.maxAmount) {
            Toast.showShortCenter("充值金额不能大于" + (parseInt(rowData.maxAmount) - 1) + "元!");
            return false
        }
        return true
    }

    /**
     * 点击支付方式
     * @param rowData
     */
    payItemSelected(rowData) {
        if (!this.validMoney(rowData)) {
            return
        }
        this.showLoading()
        this.payData = rowData
        let paymentTypes = rowData.paymentType
        switch (rowData.type) {
            case 'WX':
            case 'ZHB':
            case 'JD':
            case 'OTHER':
                this.applayPay(paymentTypes)
                break;
            case 'THIRD_PARTY':
                RequestUtils.getUrlAndParamsAndCallback(config.api.getPaymentBankList, {paymentSetId: this.payData.platform}, (res) => {
                    if (res.rs) {
                        this.hideLoading();
                        this.bankList = res.content;
                        if (this.bankList.length > 0) {
                            this.showList = true;
                        } else {
                            this.applayPay('THIRD');
                        }
                    } else {
                        this.applayPay('THIRD');
                    }
                });
                break;
            default:
                this.hideLoading()
                this.weChatAndAlipayTransfer(rowData)
                break;
        }
    }

    /**
     * 申请支付
     * @param type
     */
    applayPay(type, bankCode, bankType) {

        let params = {
            depositor: TCUSER_DATA.realname,
            paymentId: this.payData.paymentId,
            paymentType: type,
            topupAmount: this.realTopupMoney,
            id: appId,
        };
        if (bankCode) {
            params.bankCode = bankCode;
            params.cardType = bankType;
        }

        RequestUtils.PostUrlAndParamsAndCallback(config.api.otherPay, params, (response) => {
            this.hideLoading()
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
        this.realTopupMoney = res.amount && res.amount === 0 ? this.realTopupMoney : res.amount
        switch (res.paymentMethod) {
            case 'WECHAT_QR'://微信支付宝扫码
            case 'ALIPAY_QR':
            case 'JD_QR':
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
        let qrType = res.paymentJumpTypeEnum;
        if (res.data && res.data.length !== 0) {
            NavigatorHelper.pushToAliAndWechatPay({
                type: payType,
                codeType: qrType ? qrType : 'URL',
                money: this.realTopupMoney,
                codeValue: res.data,
                merchantName: this.payData.merchantName,
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
            });
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
                return '支付宝充值'
            case 'WX':
                return '微信充值'
            case 'JD':
                return '京东充值'
            case 'OTHER':
                return '其他充值'
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
            money: this.realTopupMoney,
            data: data
        });
    }

    //给充值金额加一位小数的随机数
    addRandomMoney() {
        let money = _.random(1, 9) * 0.1
        return money
    }

    /**
     * 跳转到转账资料信息界面
     * @param code
     */
    gotoBankMsg(info, adminBankId) {
        NavigatorHelper.pushToUserBankPayMessage({
            adminBankId: adminBankId,
            transInfo: info
        })
    }
}

/**
 * 输入金额组件
 */
@observer
class InputMoneyView extends Component {
    @observable
    money = ''

    render() {
        return (<Text style={styles.inputTextLabelStyle}>{this.money}</Text>)
    }

    _resetMoney(money) {
        this.money = money
    }
}

/**
 * 金额label组件
 */
@observer
class MoneyLabelView extends Component {
    moneyData = [50, 100, 300, 500, 1000, 2000, 3000, 5000]
    @observable
    selectedIndex = -1
    money = 0

    render() {
        let views = []
        this.moneyData.map((item, index) => {
            views.push(
                <TouchableOpacity
                    key={index + '00'}
                    onPress={() => {
                        this.checkMoney(item, index)
                    }}>
                    <View style={styles.moneyStyle}>
                        <Text style={this.getMoneyTxtStyle(index)}>{item}元</Text>
                    </View>
                </TouchableOpacity>)
        })
        return (<View style={styles.moneyLabel}>{views}</View>)
    }

    /**
     * 充值金额输入
     * @param money
     * @private
     */
    _resetMoney(money) {
        let temp = -1
        this.moneyData.map((item, index) => {
            if (money === item + '') {
                temp = index
            }
        })
        this.selectedIndex = temp
    }

    /**
     * 选择固定金额label
     * @param text
     * @param index
     */
    checkMoney(money, index) {
        this.money = money
        this.selectedIndex = index
        this.props.changeMoney && this.props.changeMoney(money)
    }

    /**
     * 获取金额label样式
     * @param index
     * @returns {*}
     */
    getMoneyTxtStyle(index) {
        if (index == this.selectedIndex) {
            return styles.moneyCheckedStyle
        } else {
            return styles.moneyTxtStyle
        }
    }
}


class MoneyData {
    @observable
    inputMoney = ''

    @action
    resetInputMoney(money) {
        this.inputMoney = money;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: indexBgColor.mainBg,
    },
    payMoneyItemStyle: {
        flexDirection: 'row',
        height: 50,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: buttonStyle.btnRedBg,
        margin: 10,
        backgroundColor: indexBgColor.itemBg
    },
    payTitleStyle: {
        fontSize: Size.large,
        marginLeft: 5,
        color: listViewTxtColor.title
    },
    inputContainer: {
        marginLeft: 10,
        width: width * 0.6,
        height: 45,
        justifyContent: 'center',
        backgroundColor: indexBgColor.itemBg
    },
    inputTextStyle: {
        color: payTxtColor.payMoney,
        fontSize: Size.default,
        width: width * 0.6,
        height: 45,
    },
    inputTextLabelStyle: {
        color: payTxtColor.payMoney,
        fontSize: Size.default,
    },
    moneyLabel: {
        flexDirection: 'row',
        height: 50,
        justifyContent: 'space-around',
        flexWrap: 'wrap'
    }, moneyStyle: {
        justifyContent: 'center',
        height: 40,
        width: width / 4,
        alignItems: 'center',
        marginTop: 5
    },
    moneyTxtStyle: {
        color: payTxtColor.moneyUnChecked,
        backgroundColor: payTxtColor.moneyChecked,
        borderRadius: 5,
        fontSize: Size.default,
        width: width / 4 - 10,
        textAlign: 'center',
        paddingTop: 10,
        paddingBottom: 10
    }, moneyCheckedStyle: {
        color: payTxtColor.moneyChecked,
        backgroundColor: payTxtColor.moneyUnChecked,
        borderRadius: 5,
        fontSize: Size.default,
        width: width / 4 - 10,
        textAlign: 'center',
        paddingTop: 10,
        paddingBottom: 10
    },
    payTypeImg: {
        height: 50,
        width: 50,
    }, payTypeTxt: {
        justifyContent: 'center',
        paddingLeft: 10,
    }, payTip: {
        color: listViewTxtColor.title,
        fontSize: Size.default,

    }, payTipView: {
        marginTop: 60,
        paddingLeft: 5
    }, payRemarkTxt: {
        color: listViewTxtColor.content,
        flexWrap: 'wrap',
        width: width - 50 - 10 - 30
    }, emptyTip: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        backgroundColor: indexBgColor.mainBg
    }, payErrorImg: {
        height: 100,
        width: 100,
    }, itemMainStyle: {
        backgroundColor: indexBgColor.itemBg,
        borderRadius: 5,
        margin: 10,
        flexDirection: 'row',
    }, itemTitleStyle: {
        color: listViewTxtColor.title,
        fontSize: Size.default,
        paddingLeft: 10,
        paddingTop: 10,
    }, itemLeftStyle: {
        padding: 10
    }, itemTitleRightStyle: {
        color: listViewTxtColor.content,
        fontSize: Size.default,
        paddingLeft: 10,
        paddingTop: 10,
        width: width * 0.58
    }, itemRightViewStyle: {
        alignItems: 'center',
        justifyContent: 'center',
    }, bankRowStyle: {
        flexDirection: 'row',
    }, payItemStyle: {
        flexDirection: 'row',
        backgroundColor: indexBgColor.itemBg,
        borderRadius: 5,
        marginBottom: 10,
        marginLeft: 10,
        marginRight: 10,
        padding: 10,
        alignItems: 'center'
    }, payTypeTitleStyle: {
        fontSize: Size.large,
        color: listViewTxtColor.title
    }, bankItemView: {
        paddingVertical: 10,
        paddingLeft: 10,
        borderBottomWidth: 1,
        borderBottomColor: indexBgColor.mainBg,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center'
    }
})
