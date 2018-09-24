import React, {Component,} from 'react'
import TopNavigationBar from '../../../Common/View/TCNavigationBar';
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    Image,
    TextInput,
    Platform,
    ActivityIndicator,
    Alert
} from 'react-native'
import {observer, inject} from 'mobx-react/native'
import {observable, computed, action} from 'mobx'
import {
    Size,
    width,
    height,
    indexBgColor,
    listViewTxtColor,
    inputStyle,
    buttonStyle,
    baseColor,
    userCenterBorderColor,
    userCenterTxtColor
} from '../../resouce/theme'
import Dialog from '../../../Common/View/TipDialog'
import PercentageCircle from '../../../Common/View/PercentageCircle'
import Toast from '../../../Common/JXHelper/JXToast';
import dismissKeyboard from 'dismissKeyboard'
import LoadingSpinnerOverlay from '../../../Common/View/LoadingSpinnerOverlay'
import KeyboardAvoidingScrollView from '../../../Common/View/TCKeyboardAvoidingScrollView';
import TcWithdrawKeyBoard from './TCWithdrawKeyboardView'
import Helper from '../../../Common/JXHelper/TCNavigatorHelper'
import Moment from "moment";
import UserWithdrawStore from "../../../Data/store/UserWithdrawStore";

/**
 * 用户提现
 */
@observer
export default class TCUserWithdrawNew extends Component {


    pwd = ''
    userWithdrawStore = new UserWithdrawStore()
    lastRequestTime = 0;


    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.getDefaultBank();
    }

    componentWillUnmount() {
    }

    render() {
        return (
            <View style={[styles.container]}>
                < TopNavigationBar
                    title={'账户提现'}
                    needBackButton={true}
                    backButtonCall={() => {
                        this.back()
                    }}
                />
                {this.userWithdrawStore.isLoading ? this.renderLoading() : this.getContentView()}
                <TcWithdrawKeyBoard
                    ref="KeyBoard"
                    callBack={(res) => {
                        this.callback(res)
                    }}/>
                <Dialog show={this.userWithdrawStore.tipShow}
                        setModalVisible={() => this.gotoAddBank()}
                        dialogTitle={'温馨提示'}
                        dialogContent={'您没有添加银行卡还不能提现哦！'}
                        btnTxt={'现在就去'}/>

                <Dialog show={this.userWithdrawStore.tipWithdraw}
                        setModalVisible={() => this.gotoTop()}
                        dialogTitle={'温馨提示'}
                        dialogContent={this.userWithdrawStore.tipMsg}
                        btnTxt={'好 的'}/>
                <LoadingSpinnerOverlay
                    ref={component => this._modalLoadingSpinnerOverLay = component}/>
            </View>
        )
    }

    renderLoading() {
        return (
            <ActivityIndicator size='small' style={{alignItems: 'center', justifyContent: 'center', flex: 1}}/>
        );
    }

    getContentView() {
        return (<KeyboardAvoidingScrollView
            keyboardShouldPersistTaps={Platform.OS !== 'ios'}
            keyboardDismissMode={Platform.OS === 'ios' ? 'on-drag' : 'none'}>
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 20}}>
                <PercentageCircle
                    radius={80}
                    percent={this.userWithdrawStore.aggregateBetPercent}
                    color={buttonStyle.btnBg}
                    borderWidth={10}
                    shadowColor={'#e4e4e4'}
                    bgColor={'#fff'}>
                    <View style={{justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{
                            marginTop: 15,
                            color: '#333333',
                            fontSize: Size.font12,
                            marginLeft: 5
                        }}>{this.getInfoTextView()}</Text>
                    </View>
                </PercentageCircle>
                {this.getTipView()}
            </View>
            {/* <TouchableOpacity onPress={() => this.gotoBankList()}>*/}
            <DefaultBankView bank={this.userWithdrawStore.bank}/>
            {/* </TouchableOpacity>*/}
            <InputMoneyView
                changeMoney={(text) => this.changeMoney(text)}
                exempt={this.userWithdrawStore.exempt}
                allWithdrawMoney={this.userWithdrawStore.withdrawModel.maxWithdrawMoney}
                money={this.userWithdrawStore.money}
                allWithdraw={() => {
                    this.changeMoney(this.userWithdrawStore.withdrawModel.maxWithdrawMoney + "")
                }}/>
            <View style={styles.itemStyle}>
                {this.getConfirmButton()}
            </View>
        </KeyboardAvoidingScrollView>)
    }

    getTipView() {
        if (this.userWithdrawStore.withdrawModel.surplusWithdrawCount <= 0) {
            return (
                <Text style={{color: listViewTxtColor.title, marginTop: 10}}>超过提现次数上限，手续费率
                    <Text
                        style={{color: baseColor.strong}}>{this.userWithdrawStore.withdrawModel.newratioOfChargeExempt}</Text>%</Text>
            )
        }
        return null;
    }


    /**
     * 获取默认银行卡
     */
    getDefaultBank() {
        this.userWithdrawStore.initDefaultBank((res) => {
            if (!res.status) {
                Toast.showShortCenter(res.message);
            }
        })
    }


    /**
     * 改变文本输入值
     * @param text
     */
    changeMoney(text) {
        this.userWithdrawStore.money = text;
    }

    /**
     * 获取确认按钮
     * @returns {XML}
     */
    getConfirmButton() {
        if (this.userWithdrawStore.canWithdraw) {
            return (
                <TouchableOpacity
                    style={styles.bottomBarButtonStyle}
                    onPress={() => {
                        if (this.validateWithDraw()) {
                            if (this.userWithdrawStore.exempt > 0) {
                                this.showTipDialog();
                            } else {
                                this.showWithdrawKeyboard();
                            }
                        }
                    }}>
                    <Text style={{color: buttonStyle.btnTxtColor, fontWeight: 'bold', fontSize: Size.default}}>
                        确认转出
                    </Text>
                </TouchableOpacity>
            )
        } else {
            return (
                <View style={[styles.bottomBarButtonUnableStyle, {backgroundColor: '#e4e4e4'}]}>
                    <Text style={{color: 'white', fontWeight: 'bold', fontSize: Size.default}}>您暂时无法提款</Text>
                </View>)
        }
    }

    /**
     * 获取提示文本
     * @returns {XML}
     */
    getInfoTextView() {

        if (this.userWithdrawStore.withdrawModel.surplusMaxWithdraw <= 0) {
            return "您今日出款额度已经用完，请明日再来!";
        } else if (this.userWithdrawStore.withdrawModel.surplusWithdrawCount <= 0) {
            return "您今日出款次数已经用完，请明日再来!";
        } else if (this.userWithdrawStore.withdrawModel.withdrawSwitch) {
            let num = this.userWithdrawStore.withdrawModel.aggregateBetRequirements - this.userWithdrawStore.withdrawModel.aggregateBets
            if (!this.userWithdrawStore.withdrawModel.sufficeAggregateBetRequirements) {
                return "您还需投注" + this.RoundNum(num, 2) + "元可申请提款";
            } else {
                if (this.userWithdrawStore.withdrawModel.surplusFeeWithdrawCount > 0) {
                    return "免费提现";
                } else {
                    return '您今日的免费次数已经用完，提款需收' + this.userWithdrawStore.withdrawModel.newratioOfChargeExempt + '%手续费!';
                }
            }
        } else {
            if (this.userWithdrawStore.withdrawModel.surplusFeeWithdrawCount > 0) {
                return "免费提现";
            } else {
                return '您今日的免费次数已经用完，提款需收' + this.userWithdrawStore.withdrawModel.newratioOfChargeExempt + '%手续费!';
            }
        }
    }

    /**
     * 返回顶部
     */
    gotoTop() {
        dismissKeyboard()
        this.userWithdrawStore.setWithdrawModalVisible()

        Helper.popToBack()
    }

    /**
     * 跳转到添加银行界面
     */
    gotoAddBank() {
        this.userWithdrawStore.setDialogVisible();
        Helper.pushToAddBank()
    }


    /**
     * 返回
     */
    back() {
        dismissKeyboard()
        Helper.popToBack();
    }

    /**
     * 验证提款
     */
    validateWithDraw() {
        if (!this.userWithdrawStore.money || this.userWithdrawStore.money.length === 0) {//验证输入金额
            this.postponeShowToast('请输入取款金额!!');
            return false
        }

        let regExp = new RegExp("^\\d+(\\.\\d{1})?$");
        if (this.userWithdrawStore.withdrawModel.integerWithdrawalAmount) {//验证金额格式
            regExp = new RegExp("^[1-9]\\d*$");
            if (!regExp.test(this.userWithdrawStore.money)) {
                this.postponeShowToast('取款金额只能为整数!');
                return false
            }
        } else {
            if (!regExp.test(this.userWithdrawStore.money)) {
                this.postponeShowToast('您输入的金额格式不正确(例:100.1)!');
                return false
            }
        }

        if (this.userWithdrawStore.withdrawModel.surplusSeconds < 0) {
            this.postponeShowToast('您的操作过于频繁，请' + Math.abs(this.userWithdrawStore.withdrawModel.surplusSeconds) + '秒后再试!');
            return false;
        }

        if (this.userWithdrawStore.withdrawModel.surplusWithdrawCount <= 0) {//当天提款次数
            this.postponeShowToast('您今日出款次数已经用完，请明日再来!');
            return false;
        }
        if (this.userWithdrawStore.withdrawModel.surplusMaxWithdraw <= 0) {
            this.postponeShowToast('您今日取款额度已经用完，请明日再来!');
            return false;
        }
        if (this.userWithdrawStore.money < this.userWithdrawStore.withdrawModel.minimumWithdrawAmount) {
            this.postponeShowToast('单次取款最少' + this.userWithdrawStore.withdrawModel.minimumWithdrawAmount + '元!');
            return false
        }
        if (this.userWithdrawStore.withdrawModel.maximumWithdrawAmount !== 0 && this.userWithdrawStore.money > this.userWithdrawStore.withdrawModel.maximumWithdrawAmount) {
            this.postponeShowToast('单次取款至多' + this.userWithdrawStore.withdrawModel.maximumWithdrawAmount + '元!');
            return false
        }


        if (this.userWithdrawStore.withdrawModel.withdrawSwitch && !this.userWithdrawStore.withdrawModel.sufficeAggregateBetRequirements) {
            this.postponeShowToast('打码量不足,不能提现!');
            return false;
        }

        let m = parseFloat(this.userWithdrawStore.money)
        let e = this.userWithdrawStore.exempt
        let money = m - e
        if (money > this.userWithdrawStore.withdrawModel.totalMoney && e > 0) {
            this.postponeShowToast('您的余额不足,请保留手续费 ' + e + ' 元 谢谢');
            return false
        }
        if (money > this.userWithdrawStore.withdrawModel.totalMoney) {
            this.postponeShowToast('您的余额不足,请重新输入!');
            return false
        }
        return true
    }

    postponeShowToast(content) {
        this.timer = setTimeout(() => {
            Toast.showShortCenter(content);
        }, 500)
    }

    /**
     * 开启键盘输入密码
     */
    showWithdrawKeyboard() {
        if (!this.validateWithDraw()) {
            return
        }
        var popView = this.refs.KeyBoard
        if (popView.modalVisible) {
            popView._setModalVisible(false)
        } else {
            popView._setModalVisible(true)
            popView._setMoney(this.userWithdrawStore.money, this.userWithdrawStore.exempt.toFixed(2))
        }
    }

    showTipDialog() {

        Alert.alert('温馨提示', '您今日的免费次数已经用完，提款需收' + this.userWithdrawStore.withdrawModel.newratioOfChargeExempt + '%手续费！', [
            {
                text: '确定',
                onPress: () => {
                    this.showWithdrawKeyboard();
                }
            },
            {
                text: '取消',
                onPress: () => {

                }
            }
        ]);
    }

    /**
     * 输入密码callback
     * @param res
     */
    callback(res) {
        this.pwd = res
        if (this.pwd.length < 4) {
            this.postponeShowToast('请输入交易密码!');
            return
        }
        if (this.lastRequestTime === 0) {
            this.lastRequestTime = Moment().format('x')
        } else {
            let temp = Moment().format('x') - this.lastRequestTime;
            if (temp < 1) {
                return;
            } else {
                this.lastRequestTime = Moment().format('x');
            }
        }
        this.applyWithDraw()
    }

    /**
     * 申请提款
     */
    applyWithDraw() {
        this._modalLoadingSpinnerOverLay.show()
        this.userWithdrawStore.applyWithdraw(this.pwd, (res) => {
            this._modalLoadingSpinnerOverLay.hide();
            if (!res.status) {
                Toast.showShortCenter(res.message);
            }
        })
    }

    RoundNum(num, length) {
        var number = Math.round(num * Math.pow(10, length)) / Math.pow(10, length);
        return number;
    }
}

/**
 * 默认显示银行卡子组件
 */
@inject("jdAppStore")
@observer
class DefaultBankView extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (<View style={styles.bankItemStyle}>
            <Image source={this.props.jdAppStore.getBankCardLogo(this.props.bank.bankCode)}
                   style={styles.img}/>
            <View>
                <Text style={styles.itemTxt}>{this.props.bank ? this.props.bank.bankName : ''}</Text>
                <Text style={styles.bankNoStyle}> {this.props.bank.bankCardNo ? this.props.bank.bankCardNo : ''}</Text>
            </View>
            {/*  <Image source={common.iconNext} style={styles.imgNext}/>*/}
        </View>)
    }

}

@observer
class InputMoneyView extends Component {

    render() {
        return (
            <View>
                <View style={styles.inputItemStyle}>
                    <Text style={styles.moneyIcon}>￥</Text>
                    <TextInput
                        placeholder={'最多可提取金额' + this.props.allWithdrawMoney + '元'}
                        placeholderTextColor={inputStyle.inputPlaceholder}
                        underlineColorAndroid='transparent'
                        style={styles.inputStyle}
                        keyboardType={'numeric'}
                        defaultValue={this.props.money}
                        onChangeText={(text) => this.props.changeMoney(text)}/>
                    <View style={{justifyContent: 'center', alignItems: 'center'}}>
                        <TouchableOpacity
                            onPress={() => {
                                this.props.allWithdraw()
                            }}>
                            <Text style={{
                                color: userCenterTxtColor.fresh,
                                borderWidth: 0.5,
                                borderColor: userCenterBorderColor.freshBorder,
                                padding: 8,
                                borderRadius: 3,
                                marginRight: 10
                            }}>全部提现</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{flex: 1, justifyContent: 'flex-end', flexDirection: 'row'}}>
                    <Text style={{
                        fontSize: Size.small,
                        marginRight: 5,
                        marginTop: 10,
                        color: '#666666'
                    }}>*手续费
                        <Text style={{color: 'red'}}>{this.props.exempt}</Text>元 </Text>
                </View>
            </View>)
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: indexBgColor.mainBg,
    },
    imgNext: {
        width: 10,
        height: 15,
        position: 'absolute',
        top: 20,
        left: width * 0.9
    },
    img: {
        width: 40,
        height: 40,
        marginLeft: 5
    },
    itemTxt: {
        marginLeft: 5,
        fontSize: Size.default,
        color: listViewTxtColor.title
    },
    bankNoStyle: {
        fontSize: Size.default,
        color: listViewTxtColor.content
    },
    bottomBarButtonStyle: {
        backgroundColor: buttonStyle.btnBg,
        justifyContent: 'center',
        flexDirection: 'row',
        height: 40,
        alignItems: 'center',
        borderRadius: 4,
        padding: 10,
        width: width * 0.8,
        marginTop: 40
    },
    bottomBarButtonUnableStyle: {
        backgroundColor: buttonStyle.btnUnableBg,
        justifyContent: 'center',
        flexDirection: 'row',
        height: 40,
        alignItems: 'center',
        borderRadius: 4,
        padding: 10,
        width: width * 0.8,
        marginTop: 40
    },
    itemStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    bankItemStyle: {
        flexDirection: 'row',
        height: 50,
        marginTop: 15,
        backgroundColor: indexBgColor.itemBg,
        alignItems: 'center'
    },
    inputItemStyle: {
        flexDirection: 'row',
        height: 50,
        marginTop: 1,
        alignItems: 'center',
        backgroundColor: indexBgColor.itemBg,
    },
    moneyIcon: {
        fontSize: Size.xxlarge,
        fontWeight: 'bold',
        paddingLeft: 5,
        marginLeft: 10,
        color: listViewTxtColor.title
    },
    inputStyle: {
        width: width * 0.70,
        paddingLeft: 10,
        fontSize: Size.default,
        color: inputStyle.inputTxt,
        backgroundColor: inputStyle.inputBg
    },

    cancelBtn: {
        position: 'absolute',
        top: 10,
        left: 10
    },
    withdrawMoney: {
        flexDirection: 'row',
        justifyContent: 'center',
        height: 50,
        alignItems: 'center',

    },
    inputModalItemStyle: {
        flexDirection: 'row',
        height: 50,
        width: width * 0.9,
        borderWidth: 1,
        borderColor: '#999999',
        alignItems: 'center',
        borderRadius: 5
    }, inputModalStyle: {
        width: width * 0.75,
        paddingLeft: 10
    }, infoitemStyle: {
        flexDirection: 'row',
        height: 50,
        backgroundColor: indexBgColor.itemBg,
        alignItems: 'center',
        marginTop: 0.5,
    }, leftTitleStyle: {
        paddingLeft: 20,
        color: listViewTxtColor.content,
        fontSize: Size.default
    }, titleTxtStyle: {
        color: listViewTxtColor.title,
        fontSize: Size.default
    }, leftTitleGrayStyle: {
        color: listViewTxtColor.content,
        fontSize: Size.small
    }, pwdStyle: {
        width: width * 0.15,
        height: 40,
        borderWidth: 0.5,
        borderColor: inputStyle.inputBorder,
        backgroundColor: indexBgColor.itemBg,
        flexDirection: 'row',
        marginLeft: 10,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center'
    }, dropDownTxtStyle: {
        color: listViewTxtColor.title,
        fontSize: Size.xlarge,
        textAlign: 'center',
        fontWeight: 'bold'
    }, dropdownStyle: {
        width: width * 0.15,
        height: height * 0.4,
        borderWidth: 1,
        borderRadius: 3,
        backgroundColor: indexBgColor.mainBg
    }, dropDownItemStyle: {
        alignItems: 'center',
        padding: 8,
        backgroundColor: indexBgColor.itemBg
    }, dropStyle: {
        width: width * 0.15,
        flex: 1,
    }, acontainer: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
        paddingTop: 20,
    }
})
