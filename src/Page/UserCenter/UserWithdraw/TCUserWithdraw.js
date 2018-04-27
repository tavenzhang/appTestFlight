import React, {Component, PropTypes,} from 'react'
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
import {observer} from 'mobx-react/native'
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
import {config} from '../../../Common/Network/TCRequestConfig'
import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter'
import Dialog from '../../../Common/View/TipDialog'
import PercentageCircle from '../../../Common/View/PercentageCircle'
import RequestUtils from '../../../Common/Network/TCRequestUitls'
import Toast from '../../../Common/JXHelper/JXToast';
import dismissKeyboard from 'dismissKeyboard'
import LoadingSpinnerOverlay from '../../../Common/View/LoadingSpinnerOverlay'
import KeyboardAvoidingScrollView from '../../../Common/View/TCKeyboardAvoidingScrollView';
import TcWithdrawKeyBoard from './TCWithdrawKeyboardView'
import SecretUtils from '../../../Common/JXHelper/SecretUtils'
import JXHelper from '../../../Common/JXHelper/JXHelper'
import Helper from '../../../Common/JXHelper/TCNavigatorHelper'

var secretUtils = new SecretUtils();
/**
 * 用户提现
 */
@observer
export default class TCUserWithdrawNew extends Component {


    bankList = []
    pwd = ''
    stateModel = new StateModel()

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.getDefaultBank();
        this.listener = RCTDeviceEventEmitter.addListener('userBankChange', () => {
            this.getDefaultBank();
        })
    }

    componentWillUnmount() {
        this.timer && clearTimeout(this.timer)
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
                {this.stateModel.isLoading ? this.renderLoading() : this.getContentView()}
                <TcWithdrawKeyBoard
                    ref="KeyBoard"
                    callBack={(res) => {
                        this.callback(res)
                    }}/>
                <Dialog show={this.stateModel.tipShow}
                        setModalVisible={() => this.gotoAddBank()}
                        dialogTitle={'温馨提示'}
                        dialogContent={'您没有添加银行卡还不能提现哦！'}
                        btnTxt={'现在就去'}/>

                <Dialog show={this.stateModel.tipWithdraw}
                        setModalVisible={() => this.gotoTop()}
                        dialogTitle={'温馨提示'}
                        dialogContent={this.stateModel.tipMsg}
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
                    percent={this.stateModel.aggregateBetPercent}
                    color={buttonStyle.btnBg}
                    borderWidth={10}
                    shadowColor={'#e4e4e4'}
                    bgColor={'#fff'}>
                    <View style={{justifyContent: 'center', alignItems: 'center'}}>
                        {this.getInfoTextView()}
                    </View>
                </PercentageCircle>
                {this.getTipView()}
            </View>
            {/* <TouchableOpacity onPress={() => this.gotoBankList()}>*/}
            <DefaultBankView bank={this.stateModel.bank}/>
            {/* </TouchableOpacity>*/}
            <InputMoneyView
                changeMoney={(text) => this.changeMoney(text)}
                exempt={this.stateModel.exempt}
                allWithdrawMoney={this.stateModel.withdrawModel.maxWithdrawMoney.toFixed(1)}
                money={this.stateModel.money}
                allWithdraw={() => {
                    this.changeMoney(this.stateModel.withdrawModel.maxWithdrawMoney.toFixed(1))
                }}/>
            <View style={styles.itemStyle}>
                {this.getConfirmButton()}
            </View>
        </KeyboardAvoidingScrollView>)
    }

    getTipView() {
        if (this.stateModel.withdrawModel.surplusWithdrawCount <= 0) {
            return (
                <Text style={{color: listViewTxtColor.title, marginTop: 10}}>超过提现次数上限，手续费率
                    <Text
                        style={{color: baseColor.strong}}>{this.stateModel.withdrawModel.newratioOfChargeExempt}</Text>%</Text>
            )
        }
        return null;
    }


    /**
     * 获取默认银行卡
     */
    getDefaultBank() {
        RequestUtils.getUrlAndParamsAndCallback(config.api.getuserCardsAndWithdrawInfo, null, (response) => {
            this.stateModel.freshLoading()
            if (response.rs) {
                if (response.content && response.content.bankAccounts.length > 0) {
                    this.bankList = response.content.bankAccounts
                    response.content.bankAccounts.forEach((b) => {
                        if (b.isDefault) {
                            this.stateModel.bank = b
                            this.stateModel.parseWithdrawSetting(response.content.dailyWithdrawWithAdminSettingsResult)
                            return;
                        }
                    })
                } else {
                    this.stateModel.setDialogVisible();
                }
            } else {
                if (response.status === 401) {
                    Toast.showShortCenter('登录状态过期，请重新登录!')
                } else if (response.status === 500) {
                    Toast.showShortCenter("服务器出错啦")
                } else {
                    if (response.message) {
                        Toast.showShortCenter(response.message)
                    }
                    let {navigator} = this.props
                    if (navigator) {
                        RCTDeviceEventEmitter.emit('balanceChange')
                        navigator.popToTop()
                    }
                }
            }
        })
    }


    /**
     * 改变文本输入值
     * @param text
     */
    changeMoney(text) {
        this.stateModel.money = text;
    }

    /**
     * 获取确认按钮
     * @returns {XML}
     */
    getConfirmButton() {
        if (this.stateModel.canWithdraw) {
            return (
                <TouchableOpacity
                    style={styles.bottomBarButtonStyle}
                    onPress={() => {
                        if (this.stateModel.exempt > 0) {
                            this.showTipDialog();
                        } else {
                            this.showWithdrawKeyboard();
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
        let num = this.stateModel.withdrawModel.aggregateBetRequirements - this.stateModel.withdrawModel.aggregateBets
        if (num <= 0 || (this.stateModel.withdrawModel.surplusFeeWithdrawCount > 0 && !this.stateModel.withdrawModel.withdrawSwitch)) {
            //满足大码量 或者剩余免费取款次数大于0
            return (<Text style={{marginTop: 15, color: '#333333'}}>免费提现</Text>)
        } else {
            return (
                <View style={{marginTop: 15, justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{color: '#333333'}}>免费提现还需投注 </Text>
                    <Text style={{color: baseColor.strong}}>{this.RoundNum(num, 2)} <Text
                        style={{color: '#333333'}}>元 </Text></Text>
                </View>
            )
        }
    }

    /**
     * 返回顶部
     */
    gotoTop() {
        dismissKeyboard()
        this.stateModel.setWithdrawModalVisible()
        let {navigator} = this.props
        if (navigator) {
            RCTDeviceEventEmitter.emit('balanceChange', true)
            navigator.popToTop()
        }
    }

    /**
     * 跳转到添加银行界面
     */
    gotoAddBank() {
        this.stateModel.setDialogVisible();
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
        if (this.stateModel.withdrawModel.surplusSeconds < 0) {
            this.postponeShowToast('您的操作过于频繁，请' + Math.abs(this.stateModel.withdrawModel.surplusSeconds) + '秒后再试!');
            return false;
        }
        if (this.stateModel.withdrawModel.surplusMaxWithdraw < 0) {
            this.postponeShowToast('您的当天最大取款额度不足，不能提款!');
            return false;
        }
        if (!this.stateModel.money || this.stateModel.money.length == 0) {
            this.postponeShowToast('请输入取款金额!!');
            return false
        }
        if (this.stateModel.withdrawModel.withdrawSwitch && !this.stateModel.withdrawModel.sufficeAggregateBetRequirements) {
            this.postponeShowToast('打码量不足,不允许提现!!');
            return false;
        }
        let regExp = new RegExp("^\\d+(\\.\\d{1})?$");
        if (!regExp.test(this.stateModel.money)) {
            this.postponeShowToast('您输入的金额格式不正确(例:100.1)!');
            return false
        }
        if (this.stateModel.money < this.stateModel.withdrawModel.minimumWithdrawAmount) {
            this.postponeShowToast('提款金额不能小于' + this.stateModel.withdrawModel.minimumWithdrawAmount + '元!');
            return false
        }
        if (this.stateModel.withdrawModel.maximumWithdrawAmount !== 0 && this.stateModel.money > this.stateModel.withdrawModel.maximumWithdrawAmount) {
            this.postponeShowToast('提款金额不能大于' + this.stateModel.withdrawModel.maximumWithdrawAmount + '元!');
            return false
        }
        let m = parseFloat(this.stateModel.money)
        let e = this.stateModel.exempt
        let money = m - e
        if (money > this.stateModel.withdrawModel.totalMoney && e > 0) {
            this.postponeShowToast('您的余额不足,请保留手续费 ' + e + ' 元 谢谢');
            return false
        }
        if (money > this.stateModel.withdrawModel.totalMoney) {
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
            popView._setMoney(this.stateModel.money, this.stateModel.exempt.toFixed(2))
        }
    }


    showTipDialog() {
        Alert.alert('温馨提示', '由于您打码量不足或提款次数超过今日上限，将收取' + this.stateModel.withdrawModel.newratioOfChargeExempt + '%手续费！', [
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
        this.applyWithDraw()
    }

    /**
     * 申请提款
     */
    applyWithDraw() {
        this._modalLoadingSpinnerOverLay.show()
        let encryptDrawCode = secretUtils.rsaEncodePWD(this.pwd);
        RequestUtils.PostUrlAndParamsAndCallback(config.api.encryptUserWithDraw,
            {
                amount: this.stateModel.money,
                userBankId: this.stateModel.bank.id,
                withDrawCode: encryptDrawCode,
                charge: this.stateModel.exempt
            },
            (response) => {
                this._modalLoadingSpinnerOverLay.hide()
                if (response.rs) {
                    this.timer && clearTimeout(this.timer)
                    this.timer = setTimeout(() => {
                        this.stateModel.tipMsg = '您的提款申请已提交，请耐心等待！'
                        this.stateModel.setWithdrawModalVisible()
                    }, 500)
                } else {
                    this.timer && clearTimeout(this.timer)
                    this.timer = setTimeout(() => {
                        if (response.message) {
                            Toast.showShortCenter(response.message)
                        } else {
                            Toast.showShortCenter('提款申请失败，请稍候再试!')
                        }
                    }, 500)
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
@observer
class DefaultBankView extends Component {
    constructor(props) {
        super(props)

        this.bankCardLogoUrl = JXHelper.getBankCardLogo();
    }

    render() {
        return (<View style={styles.bankItemStyle}>
            <Image source={JXHelper.getBankIcon(this.props.bank.bankCode)}
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

class StateModel {
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
        newratioOfChargeExempt: 0//新的手续费计算
    }

    @observable
    tipShow = false
    @observable
    bank = {}
    @observable
    money = 0
    @observable
    tipWithdraw = false
    @observable
    tipMsg = ''
    @observable
    isLoading = true

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
        if (this.withdrawModel.totalMoney < 0 || this.withdrawModel.surplusMaxWithdraw < 0 || this.withdrawModel.surplusSeconds < 0) {
            return false
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
        if ((this.withdrawModel.surplusFeeWithdrawCount > 0 || this.withdrawModel.sufficeAggregateBetRequirements || parseInt(this.money) === 0)
            && this.withdrawModel.surplusWithdrawCount > 0) {
            return 0;
        }
        let regExp = new RegExp("^\\+?[1-9][0-9]*$");
        if (regExp.test(parseInt(this.money))) {
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
     * 解析取款配置
     * @param withdrawSetting
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
        this.withdrawModel.withdrawSwitch = withdrawSetting.withdrawalSettings.withdrawSwitch
        this.ratioOfChargeExempt();
        this.getMaxWithdrawMoney(withdrawSetting, setting)
    }

    /**
     * 计算全部提款最大额度
     * @param withdrawSetting
     * @param setting
     */
    getMaxWithdrawMoney(withdrawSetting, setting) {
        if ((withdrawSetting.surplusFeeWithdrawCount > 0 || withdrawSetting.sufficeAggregateBetRequirements || parseInt(withdrawSetting.balance) === 0)
            && withdrawSetting.surplusWithdrawCount > 0) {
            this.withdrawModel.maxWithdrawMoney = withdrawSetting.balance < 1 ? 0 : this.FloorNum(withdrawSetting.balance, 1)
        } else {
            let tempExempt = withdrawSetting.balance * this.withdrawModel.newratioOfChargeExempt * 0.01
            if (tempExempt >= setting.maxWithdrawCharge) {
                this.withdrawModel.maxWithdrawMoney = this.FloorNum(withdrawSetting.balance - setting.maxWithdrawCharge, 1)
            } else {
                this.withdrawModel.maxWithdrawMoney = this.FloorNum(withdrawSetting.balance / (setting.ratioOfChargeExempt * 0.01 + 1), 1)
            }
        }
    }


    /**
     * 显示/隐藏提示对话框
     */
    @action
    setDialogVisible() {
        this.tipShow = !this.tipShow
    }


    ratioOfChargeExempt() {
        if (this.withdrawModel.surplusWithdrawCount > 0) {
            this.withdrawModel.newratioOfChargeExempt = this.withdrawModel.ratioOfChargeExempt;
        } else {
            if (!this.withdrawModel.sufficeAggregateBetRequirements) {
                this.withdrawModel.newratioOfChargeExempt = this.withdrawModel.ratioOfChargeExempt + this.withdrawModel.withdrawFeeRateBeyondLimit;
            } else {
                this.withdrawModel.newratioOfChargeExempt = this.withdrawModel.withdrawFeeRateBeyondLimit;
            }
        }
    }

    /**
     * 计算手续费
     * @returns {*}
     */
    calExempt(money) {
        let tempExempt = money * this.withdrawModel.newratioOfChargeExempt * 0.01
        let exempts = tempExempt >= this.withdrawModel.maxWithdrawCharge ? this.withdrawModel.maxWithdrawCharge : tempExempt
        let res = this.RoundNum(exempts, 2)
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
        width: width * 0.60,
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
