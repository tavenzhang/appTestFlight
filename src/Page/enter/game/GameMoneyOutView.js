import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text, WebView, TouchableOpacityComponent, TouchableOpacity, Alert
} from 'react-native'
import {observer} from 'mobx-react/native';
import TCImage from "../../../Common/View/image/TCImage";
import {ASSET_Images, JX_PLAT_INFO} from "../../asset";
import {TCButtonImg} from "../../../Common/View/button/TCButtonView";
import TCText from "../../../Common/View/widget/TCText";
import Toast from "../../../Common/JXHelper/JXToast";
import {TCTextInput} from "../../../Common/View/TCTextInput";
import {Size} from "../../resouce/theme";
import Moment from "moment";
import TCWithdrawKeyboardView from "../../UserCenter/UserWithdraw/TCWithdrawKeyboardView";

@observer
export default class GameMoneyOutView extends Component {


    constructor(pro) {
        super(pro)
        this.userWithdrawStore = TW_Store.userWithdrawStore;
        this.state = {
            inputMoney: "",
            isShowHistory:false
        }
    }

    componentWillMount(): void {

        this.userWithdrawStore.initDefaultBank((res) => {
            if (!res.status) {
                Toast.showShortCenter(res.message);
            }
        })
    }

    render() {
        let {pointerEvents}=this.props;
        let num = this.userWithdrawStore.withdrawModel.aggregateBetRequirements - this.userWithdrawStore.withdrawModel.aggregateBets

        return (<View style={styles.container} pointerEvents={pointerEvents}>
            <TCImage source={ASSET_Images.gameUI.moneyOutBg}/>
            <TCImage source={ASSET_Images.gameUI.titleMoneyOut}
                     style={{position: "absolute", right: 208, top: 45}}/>
            <TCButtonImg imgSource={ASSET_Images.gameUI.btnClose}
                         onClick={() => TW_Store.gameUIStroe.isShowWithDraw = false}
                         btnStyle={{position: "absolute", right: 0, top: 20}}/>
            <TCButtonImg imgSource={ASSET_Images.gameUI.btnOut}
                         onClick={() => {
                             TW_Store.gameUIStroe.showTiXianDetail();
                         }}
                         btnStyle={{position: "absolute", right: 80, top: 110}}/>
            <View style={{position: "absolute", left: 160, top: 90}}>
                <TCText backgroundStyle={{backgroundColor: "transparent"}} textStyle={{color: "#efe8cd",}}
                        text={TW_Store.userStore.userName}/>
                <TCText backgroundStyle={{backgroundColor: "transparent", marginTop: 10}}
                        textStyle={{color: "#efe8cd",}} text={`${TW_Store.userStore.balance}`}/>
            </View>

            <TCText backgroundStyle={{backgroundColor: "transparent", position: "absolute", left: 105, top: 148}}
                    textStyle={{color: "#efe8cd",}} text={this.userWithdrawStore.withdrawModel.aggregateBets}/>
            <TCText backgroundStyle={{backgroundColor: "transparent", position: "absolute", left: 410, top: 148}}
                    textStyle={{color: "#efe8cd",}} text={num}/>
            <View style={{
                flexDirection: "row",
                position: "absolute",
                justifyContent: "center",
                alignItems: "center",
                top: 238,
                left: 90,
            }}>
                <TCTextInput value={this.userWithdrawStore.money}
                             viewStyle={{
                                 borderBottomWidth: 1, borderBottomColor: "#9cc5d8",
                                 justifyContent: "center", alignItems: "center", width: 150
                             }}
                             inputStyle={{textAlign: "center", backgroundColor: "yellow"}}
                             onChangeText={(num) => {
                                 this.userWithdrawStore.money=num
                             }}
                             keyboardType={"numeric"}
                             placeholder={`请输入提取金额 `} maxLength={10} inputStyle={styles.inputStyle}
                             placeholderTextColor={"#9cc5d8"}/>

                <Text style={{
                    marginLeft: 10,
                    color: "rgb(132,168,168)",
                    fontSize: 11
                }}>{`(${this.getInfoTextView()})`}</Text>

            </View>
            <Text style={{
                position: "absolute",
                left: 90,
                top: 260,
                fontSize: 12,
                color: "rgb(132,168,168)",
                marginLeft: 10
            }}>{`(最多可提取金额 ${this.userWithdrawStore.withdrawModel.maxWithdrawMoney} 元)`}</Text>
            {this.getConfirmButton()}

            <View style={{position: "absolute",left: 70, top: 180}}>
                    <Text style={{color: "#efe8cd"}}>{this.userWithdrawStore.bank.bankName}</Text>
                    <Text style={{color: "rgb(132,168,168)", fontSize:14, marginTop:5}}>{this.userWithdrawStore.bank.bankCardNo}</Text>
            </View>
            <View style={{position: "absolute"}}>
                <TCWithdrawKeyboardView
                ref="KeyBoard"
                callBack={(res) => {
                this.callback(res)
                }}/>
            </View>
            {/*{*/}
                {/*//TW_NavHelp.pushView(JX_Compones.UserAcountPay,{accountType: 0, isBackToTop: true})*/}
                {/*this.state.isShowHistory ? <BaseGameAlert title={"提现明细"} onClose={()=>{*/}
                     {/*this.setState({isShowHistory:false})*/}
                {/*}}>*/}
                    {/*<TCUserPayAndWithdrawRecordsMain accountType={0} isBackToTop={true}/>*/}
                {/*</BaseGameAlert>:null*/}
            {/*}*/}

        </View>)

    }

    /**
     * 输入密码callback
     * @param res
     */
    callback=(res)=> {
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
    applyWithDraw=()=> {
        this.userWithdrawStore.applyWithdraw(this.pwd, (res) => {
            if (!res.status) {
                Toast.showShortCenter(res.message);
            }else{
                Toast.showShortCenter('您的提款申请已提交，请耐心等待,如有需要 可以点击明细 查看进度！');
                this.userWithdrawStore.initDefaultBank()
               // this.tipMsg = '您的提款申请已提交，请耐心等待!'
            }
        })
    }

    /**
     * 获取提示文本
     * @returns {XML}
     */
    getInfoTextView = () => {
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
            return this.getTextWithdraw();
        }
    }


    getTextWithdraw() {
        let num = this.userWithdrawStore.withdrawModel.aggregateBetRequirements - this.userWithdrawStore.withdrawModel.aggregateBets;

        if (this.userWithdrawStore.withdrawModel.surplusFeeWithdrawCount > 0 || this.userWithdrawStore.withdrawModel.newratioOfChargeExempt === 0) {

            return "免费提现";
        }
        if (!this.userWithdrawStore.withdrawModel.sufficeAggregateBetRequirements && this.userWithdrawStore.withdrawModel.ratioOfChargeExempt === 0 && this.userWithdrawStore.withdrawModel.numOfChargeExempt === 0) {//打码量不满足时

            return '免费提款还需投注' + this.RoundNum(num, 2) + '元,继续提款需收取' + this.userWithdrawStore.withdrawModel.newratioOfChargeExempt + '%手续费。'
        }
        return '您今日免费次数已用完，提款需收' + this.userWithdrawStore.withdrawModel.newratioOfChargeExempt + '%手续费!';
    }


    /**
     * 验证提款
     */
    validateWithDraw = () => {
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

    onOkGetOutMoeny = () => {
        if (this.validateWithDraw()) {
            if (this.userWithdrawStore.exempt > 0) {
                this.showTipDialog();
            } else {
                this.showWithdrawKeyboard();
            }
        }
    }

    showTipDialog=()=> {

        Alert.alert('温馨提示', this.getTextWithdraw(), [
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
     * 开启键盘输入密码
     */
    showWithdrawKeyboard=()=> {
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
    /**
     * 获取确认按钮
     * @returns {XML}
     */
    getConfirmButton = () => {
        if (this.userWithdrawStore.canWithdraw) {
            return (
                <TCButtonImg btnStyle={{position: "absolute", right: 200, top: 283}}
                             imgSource={ASSET_Images.gameUI.btnOk} onClick={this.onOkGetOutMoeny}/>
            )
        } else {
            return (
                <View style={{position: "absolute", right: 220, top: 290}}>
                    <Text style={{color: 'red', fontWeight: 'bold', fontSize: Size.font15}}>您暂时无法提款</Text>
                </View>
            )
        }
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        backgroundColor: "transparent",
    },
    inputStyle: {
        fontSize: 13,
        fontWeight: "bold",
        color: "#efe8cd"
    },
    webView: {
        marginTop: 18,
        height: 250,
        width: 485,
        backgroundColor: "transparent",
    }

});