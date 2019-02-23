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
    payTxtColor,
    copyBtnStyle,
    loginAndRegeisterTxtColor,
} from '../../resouce/theme'
import {userPay} from '../../asset/images'
import TopNavigationBar from "../../../Common/View/TCNavigationBar";
import Toast from '../../../Common/JXHelper/JXToast';
import TCKeyboardView from "../../../Common/View/TCKeyboardView";
import LoadingSpinnerOverlay from '../../../Common/View/LoadingSpinnerOverlay'
import NavigatorHelper from "../../../Common/JXHelper/TCNavigatorHelper";
import dismissKeyboard from 'dismissKeyboard'
import {withMappedNavigationProps} from 'react-navigation-props-mapper'
import ModalList from "./View/ModalList";
import TCButtonView from "../../../Common/View/button/TCButtonView";
import JXHelper from "../../../Common/JXHelper/JXHelper";

import payHelper from './PayHelper'
import {ButtonView} from "../../../Common/View";
import walletStore from '../../../Data/store/WalletStore'
import ModalInputDialog from '../../../Common/View/ModalInputDialog'
import UserPayStore from "../../../Data/store/UserPayStore";
/**
 * 提示对话框
 */
@withMappedNavigationProps()
@observer
export default class TCUserPayNew extends Component {

    userPayStore = new UserPayStore();



    constructor(props) {
        super(props)
        this.moneyData = new MoneyData();
        payHelper.props = this.props;
    }

    componentDidMount() {
        payHelper.clearData();
    }

    componentWillUnmount() {

    }

    render() {
        return (
            <ScrollView style={styles.container}>
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
                        payHelper.clearData()
                        this.goBack()
                    }}/>
                {payHelper.isFixedPay() ? null : (
                    <View style={{height: 160}}>
                        <View style={styles.payMoneyItemStyle}>
                            {/*   <Text style={styles.payTitleStyle}>充值金额(无上限)</Text>*/}
                            {this.getInputView()}
                            <Text style={{color: payTxtColor.payMoneyTip}}>元</Text>
                            {<ButtonView
                                onClick={() => this.props.code === "BANK" ? this.showInputKeyboard() : this.showKeyBoard()}
                                text={'任意金额'}
                                btnStyle={{marginLeft: 10, backgroundColor: indexBgColor.itemBg}}
                                txtstyle={styles.itemBtnTxtStyle}/>}
                        </View>
                        <MoneyLabelView
                            ref="moneyLabelView"
                            changeMoney={(money) => {
                                this.changeMoney(money)
                            }}/>
                    </View>
                )}

                <View style={[styles.payTipView, {flexDirection: 'row'}]}>
                    <Text style={styles.payTip}>请选择充值方式 (如有问题，请联系</Text>
                    <TouchableOpacity onPress={() => this.onlineService()}>
                        <Text style={[styles.payTip, {color: payTxtColor.kefuTxt, textDecorationLine:payTxtColor.kefuUnderlne}]}>在线客服</Text>
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
                    show={this.userPayStore.showList}
                    dataList={this.userPayStore.bankList}
                    closeModal={() => {
                        this.userPayStore.showList = false;
                    }}
                    renderRow={(rowData) => this.renderBankList(rowData)}
                />
                <ModalInputDialog
                    show={this.userPayStore.showInputName}
                    dialogTitle={"存款人信息"}
                    btnLeftTxt={"取消"}
                    btnRigthTxt={"下一步"}
                    content={payHelper.payData}
                    btnLeftClick={() => {
                        this.userPayStore.showInputName = false
                    }}
                    btnRightClick={(inputData) => {
                        let {realname,phoneNum,cardNo} = inputData
                        // let reg = /^([\s\u4e00-\u9fa5]{1}([·•● ]?[\s\u4e00-\u9fa5]){1,14})$|^[a-zA-Z\s]{4,30}$/;
                        // if (payHelper.payData.realNameReq && !realname.match(reg)) {
                        //     Toast.showShortCenter("请输入正确的存款人姓名")
                        //     return false;
                        // }
                        // reg = /^134[0-8]\d{7}$|^13[^4]\d{8}$|^14[5-9]\d{8}$|^15[^4]\d{8}$|^16[6]\d{8}$|^17[0-8]\d{8}$|^18[\d]{9}$|^19[8,9]\d{8}$/
                        //
                        // if (payHelper.payData.mobileNoReq && !phoneNum.match(reg)) {
                        //     Toast.showShortCenter("请输入正确的手机号码")
                        //     return false;
                        // }
                        // if (payHelper.payData.cardNoReq && cardNo.length < 14) {
                        //     Toast.showShortCenter("请输入正确的银行卡号")
                        //     return false;
                        // }
                        payHelper.payData.realName = realname?realname:"";
                        payHelper.payData.mobileNo = phoneNum?phoneNum:"";
                        payHelper.payData.cardNo = cardNo?cardNo:"";
                        this.userPayStore.showInputName = false;
                        this.gotoPay(payHelper.payData)

                    }}

                />
            </ScrollView>
        )
    }

    onlineService() {
        NavigatorHelper.pushToCustomService(JXHelper.getMenuIconsUrl('CUS_SERVICE'));
    }

    showInputKeyboard() {
        this.refs["inputTextMoney"].blur()
        this.refs["inputTextMoney"].focus();
    }

    /**
     * 渲染银行列表
     * @param rowData
     * @returns {XML}
     */
    renderBankList(rowData) {
        return (<TouchableOpacity
            onPress={() => {
                if (!rowData.bankType) {
                    this.onPayBankList(rowData.bankValue)
                }
            }}
        >
            <View style={styles.bankItemView}>
                <Text>{rowData.bankName}</Text>
                {this.getBankTypeView(rowData)}
            </View></TouchableOpacity>)
    }

    getBankTypeView(rowData) {
        if (!rowData.bankType) {
            return null;
        }

        if (rowData.bankType.length === 2) {
            return (<View style={{flexDirection: 'row'}}>
                <TCButtonView text="储蓄卡" btnStyle={{marginHorizontal: 5}}
                              onClick={() => this.onPayBankList(rowData.bankValue, 'DC')}/>
                <TCButtonView text="信用卡" btnStyle={{marginHorizontal: 5}}
                              onClick={() => this.onPayBankList(rowData.bankValue, 'CC')}/>
            </View>)
        } else {
            let type = rowData.bankType[0];
            if (type === 'DC') {
                return (<TCButtonView text={'储蓄卡'} btnStyle={{marginHorizontal: 5}}
                                      onClick={() => this.onPayBankList(rowData.bankValue, 'DC')}/>)
            } else {
                return (<TCButtonView text={'信用卡'} btnStyle={{marginHorizontal: 5}}
                                      onClick={() => this.onPayBankList(rowData.bankValue, 'CC')}/>)
            }
        }
    }

    onPayBankList(bankValue, bankType) {
        this.userPayStore.showList = false;
        payHelper.applayPay("THIRD", bankValue, null, bankType);
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
                    autoFocus={false}
                    placeholder={"充值无上限，可自行填写金额"}
                    placeholderTextColor={payTxtColor.placeholderTxt}
                    maxLength={8}
                    keyboardType={'numeric'}
                    defaultValue={this.userPayStore.inputMoney.toString()}
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
                <Text style={{color: payTxtColor.getEmptyTip}}>该支付方式目前无法使用</Text>
                <Text style={{color: payTxtColor.getEmptyTip}}>敬请谅解!请选择其它支付方式!</Text>
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
                payHelper.bankApplyFor(bank)
            }}>
            <View style={styles.itemMainStyle}>
                <View style={styles.itemLeftStyle}>
                    <View style={styles.bankRowStyle}>
                        <Text style={styles.itemTitleStyleTxt}>收款银行</Text>
                        <Text style={styles.itemTitleRightStyle}>{bank.bankName}</Text>
                    </View>
                    <View style={styles.bankRowStyle}>
                        <Text style={styles.itemTitleStyleTxt}>{'收款人    '}</Text>
                        <Text style={styles.itemTitleRightStyle}>{bank.receiptName}</Text>
                    </View>
                    <View style={styles.bankRowStyle}>
                        <Text style={styles.itemTitleStyleTxt}>收款支行</Text>
                        <Text style={styles.itemTitleRightStyle}>{bank.bankAddress}</Text>
                    </View>
                    {bank.remarks ?
                        <View style={styles.bankRowStyle}>
                            <Text style={styles.itemTitleStyleTxt}>汇款资讯</Text>
                            <Text style={styles.itemTitleRightStyle}>{bank.remarks}</Text>
                        </View> : null
                    }
                </View>
            </View>
        </TouchableOpacity>)
    }

    /**
     * 获取支付方式item组件
     * @param paymentItem
     * @returns {XML}
     */
    getPayItemView(paymentItem, index) {
        return (<TouchableOpacity onPress={() => {
            if (!payHelper.isFixedPay() && !payHelper.validMoney(paymentItem, false))
                return
            if (this.inputUserName(paymentItem)) {
                this.userPayStore.showInputName = true
                payHelper.payData = paymentItem
            } else {
                payHelper.payData = {}
                this.showLoading();
                this.gotoPay(paymentItem)
            }
        }

        } key={"000" + index}>
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

    gotoPay(rowData) {
        payHelper.payItemSelected(rowData, (res) => {
            this.hideLoading()
            if (res) {
                this.userPayStore.showList = true;
                this.userPayStore.bankList = res;
            }
        })
    }

    inputUserName(rowData) {
        if (rowData.realNameReq || rowData.mobileNoReq || rowData.cardNoReq) {
            return true;
        } else {
            return false;
        }
    }


    /**
     * 获取支付图标
     * @param rowData
     * @returns {XML}
     */
    getPayImage(rowData) {
        let payType = rowData.type ? rowData.type : rowData.bankCode
        return <Image source={this.getPayTypeIcon(payType)} style={styles.payTypeImg}/>
    }

    getPayTypeIcon(payType) {
        switch (payType) {
            case 'WX':
            case 'FIXED_WX':
                return userPay.wechat
            case 'FIXED_QQ':
            case 'QQ':
                return userPay.qqPay
            case 'ZHB':
            case 'FIXED_ZHB':
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
        let currentStr = payHelper.money + ''
        if (number == '确认') {
        } else if (number == '删除') {
            currentStr = currentStr.substr(0, currentStr.length - 1)
        } else {
            currentStr = currentStr + number
            if (currentStr.length > 6) {
                return
            }
        }
        if (payHelper.money !== currentStr) {
            let moneyLabel = this.refs.moneyLabelView
            moneyLabel._resetMoney(currentStr)
        }

        payHelper.money = currentStr
        let moneyView = this.refs.inputMoneyView
        moneyView._resetMoney(payHelper.money)
    }

    setMoneyInputValue(money) {
        if (payHelper.money !== money) {
            let moneyLabel = this.refs.moneyLabelView
            moneyLabel._resetMoney(money)
        }
        this.moneyData.resetInputMoney(money);
        payHelper.money = money;
    }

    textInputOnEndEditing() {
        this.endingEditing()
    }

    endingEditing() {

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
        walletStore.getLotteryWalletBalance()
        dismissKeyboard();
        NavigatorHelper.popToBack();
    }

    /**
     * 弹出数字键盘
     */
    showKeyBoard() {
        var popView = this.refs.tcKeyboardView
        let moneyView = this.refs.inputMoneyView
        if (popView.modalVisible) {
            moneyView._changeTxtTip(false)
            popView._setModalVisible(false);
        } else {
            moneyView._changeTxtTip(true);
            popView._setModalVisible(true);
        }
    }

    /**
     * 修改金额
     * @param money
     */
    changeMoney(money) {
        payHelper.money = money
        this.userPayStore.inputMoney = money
        let moneyView = this.refs.inputMoneyView
        moneyView && moneyView._resetMoney(payHelper.money)
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

}


/**
 * 输入金额组件
 */
@observer
class InputMoneyView extends Component {
    @observable
    money = ''

    showTipTxt = "充值无上限，可自行填写金额"
    @observable
    isShowHolder = true;

    render() {
        return (<Text style={this.getTxtStyle()}>{this.showTxt}</Text>)
    }

    @computed get showTxt() {
        return this.isShowHolder && this.money.length === 0 ? this.showTipTxt : this.money;
    }

    getTxtStyle() {
        if (this.showTxt.length > 10) {
            return styles.inputHolder;
        } else {
            return styles.inputTextLabelStyle;
        }
    }

    _changeTxtTip(isShow) {
        this.isShowHolder = isShow;
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
    moneyData = [100, 500, 1000, 3000, 5000, 10000, 30000, 50000]
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
        backgroundColor: payTxtColor.payMoneyItemStyleBg
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
        color: payTxtColor.payTipTxt,
        fontSize: Size.default,

    }, payTipView: {
        marginTop: 10,
        paddingLeft: 5
    }, payRemarkTxt: {
        color: payTxtColor.payRemarkTxt,
        flexWrap: 'wrap',
        width: width - 50 - 10 - 30
    }, emptyTip: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        backgroundColor: payTxtColor.emptyTipBg
    }, payErrorImg: {
        height: 100,
        width: 100,
    }, itemMainStyle: {
        backgroundColor: payTxtColor.itemMainStyle,
        borderRadius: 5,
        margin: 10,
        flexDirection: 'row',
    }, itemTitleStyleTxt: {
        color: payTxtColor.itemTitleStyleTxt,
        fontSize: Size.default,
        paddingLeft: 10,
        paddingTop: 10,
    }, itemLeftStyle: {
        padding: 10
    }, itemTitleRightStyle: {
        color: payTxtColor.itemTitleRightStyleTxt,
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
        backgroundColor: payTxtColor.payItemStyleBg,
        borderRadius: 5,
        marginBottom: 10,
        marginLeft: 10,
        marginRight: 10,
        padding: 10,
        alignItems: 'center'
    }, payTypeTitleStyle: {
        fontSize: Size.large,
        color: payTxtColor.payTypeTitleStyleTxt
    }, bankItemView: {
        paddingVertical: 10,
        paddingLeft: 10,
        borderBottomWidth: 1,
        borderBottomColor: payTxtColor.bankItemView,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center'
    },
    inputHolder: {
        color: payTxtColor.inputHolderTxt
    }, itemBtnTxtStyle: {
        color: copyBtnStyle.txtColor,
        textAlign: 'center',
        paddingTop: 4,
        paddingBottom: 4,
        paddingLeft: 8,
        paddingRight: 8,
        borderWidth: 1,
        borderColor: copyBtnStyle.borderColor,
        borderRadius: 5,
        fontSize: Size.default
    },

})
