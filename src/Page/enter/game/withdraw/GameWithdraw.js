import React, {Component} from "react";
import {
    StyleSheet,
    Text,
    View,
    Alert
} from "react-native";

import {ASSET_Images} from "../../../asset";
import TCImage from "../../../../Common/View/image/TCImage";
import {TCButtonImg} from "../../../../Common/View/button/TCButtonView";
import {TCTextInput} from "../../../../Common/View/TCTextInput";
import TCText from "../../../../Common/View/widget/TCText";
import TCWithdrawKeyboardView from "../../../UserCenter/UserWithdraw/TCWithdrawKeyboardView";
import {observer} from "mobx-react/native";

import PropTypes from "prop-types";
import {copyBtnStyle, indexBgColor, listViewTxtColor, payTxtColor, Size, width} from "../../../resouce/theme";
import Toast from '../../../../Common/JXHelper/JXToast';
import Moment from "moment";

@observer
export default class GameWithdraw extends Component {

    static propTypes = {
        itemData:PropTypes.any,
        type: PropTypes.any
    }

    isBankSelected=true;
    static defaultProps = {
        type: "",
        itemData: {}
    }

    constructor(prop) {
        super(prop)
        this.state = {
            num:"",
            money: "",
            selectItem:null,
            showArrow:true
        }
    }

    componentDidMount(): void {
        setTimeout(()=>{
            this.setState({test:""})
        },1000)
    }

    componentWillReceiveProps(newProps) {
        this.isBankSelected = newProps.isBankSelected;
    }

    render() {
        let {itemData} = this.props;
        let num = itemData.withdrawModel.aggregateBetRequirements - itemData.withdrawModel.aggregateBets

        return (<View style={styles.container}>
            <TCImage source={ASSET_Images.gameUI.payOutTopIcon} resizeMode={'stretch'} style={{
                position: "absolute",
                top: SCREEN_H * 0.04,
                width: 40,
                height: 42,
                left: SCREEN_W * 0.03
            }}/>
            <TCImage source={ASSET_Images.gameUI.payOutMoneyLabel} resizeMode={'stretch'} style={{
                position: "absolute",
                top: SCREEN_H * 0.07,
                width: 90,
                height: 25,
                left: SCREEN_W * 0.11
            }}/>
            {/*<TCImage source={ASSET_Images.gameUI.question} resizeMode={'stretch'} style={{
                position: "absolute",
                top: SCREEN_H * 0.05,
                width: 35,
                height: 35,
                right: SCREEN_W * 0.08
            }}/>*/}

            <TCText backgroundStyle={{
                backgroundColor: "transparent",
                position: "absolute",
                left: SCREEN_W * 0.24 + 20,
                top: SCREEN_H * 0.055
            }}
                    textStyle={{color: "#ffde00", fontSize: 26}} text={itemData.withdrawModel.totalMoney}/>
            <TCText backgroundStyle={{
                backgroundColor: "transparent",
                position: "absolute",
                left: SCREEN_W * 0.05,
                top: SCREEN_H * 0.19
            }}
                    textStyle={{color: "#fffff1", fontSize: 20}} text={'有效投注:'}/>
            <TCText backgroundStyle={{
                backgroundColor: "transparent",
                position: "absolute",
                left: SCREEN_W * 0.18,
                top: SCREEN_H * 0.19
            }}
                    textStyle={{color: "#ffde00", fontSize: 20}}
                    text={itemData.withdrawModel.aggregateBets.toFixed(2)}/>
            <TCText backgroundStyle={{
                backgroundColor: "transparent",
                position: "absolute",
                left: SCREEN_W * 0.34,
                top: SCREEN_H * 0.19
            }}
                    textStyle={{color: "#fffff1", fontSize: 20}} text={'还需投注:'}/>
            <TCText backgroundStyle={{
                backgroundColor: "transparent",
                position: "absolute",
                left: SCREEN_W * 0.48,
                top: SCREEN_H * 0.19
            }}
                    textStyle={{color: "#ffde00", fontSize: 20, textAlign: "left"}} text={num.toFixed(2)}/>


            <TCImage source={ASSET_Images.gameUI.inputMoneyBg} resizeMode={'stretch'} style={{
                position: "absolute",
                top: SCREEN_H * 0.46,
                width: SCREEN_W * 0.6,
                height: 60,
                left: SCREEN_W * 0.03,
            }}/>
            <TCText backgroundStyle={{
                backgroundColor: "transparent",
                position: "absolute",
                left: SCREEN_W * 0.05,
                top: SCREEN_H * 0.45 + 20
            }}
                    textStyle={{color: "#fffff1", fontSize: 20}} text={'兑换数量:'}/>
            <TCImage source={ASSET_Images.gameUI.moneyLabelBg} resizeMode={'stretch'} style={{
                position: "absolute",
                top: SCREEN_H * 0.45 + 20,
                width: SCREEN_W * 0.35,
                height: 30,
                left: SCREEN_W * 0.18,
            }}/>
            <TCText backgroundStyle={{
                backgroundColor: "transparent",
                position: "absolute",
                left: SCREEN_W * 0.54,
                top: SCREEN_H * 0.45 + 22
            }}
                    textStyle={{color: "#fffff1", fontSize: 20}} text={'元'}/>

            <TCText backgroundStyle={{
                backgroundColor: "transparent",
                position: "absolute",
                left: SCREEN_W * 0.05,
                top: SCREEN_H * 0.32
            }}
                    textStyle={{color: "#fffff1", fontSize: 20}} text={this.isBankSelected ? '收款银行卡:' : '收款支付宝:'}/>

            {
                (this.isBankSelected) ?
                    ((!itemData.bank.bankCardNo || !itemData.bank.bankCardNo.length) ?
                        <TCButtonImg imgSource={ASSET_Images.gameUI.bankBtn}
                                     soundName={TW_Store.bblStore.SOUND_ENUM.enterPanelClick}
                                     btnStyle={{position: "absolute", top: SCREEN_H * 0.32, left: SCREEN_W * 0.20}}
                                     onClick={() => {
                                         TW_Store.gameUIStroe.isShowWithDraw = false
                                         TW_OnValueJSHome(TW_Store.bblStore.getWebAction(TW_Store.bblStore.ACT_ENUM.openBindCard));
                                     }}/> :
                        <TCText
                            borderRadius={5} backgroundStyle={{
                            backgroundColor: "rgb(209,212,230)", paddingHorizontal: SCREEN_W * 0.07,
                            paddingVertical: 2, position: "absolute", left: SCREEN_W * 0.04 + 120, top: SCREEN_H * 0.32
                        }}
                            textStyle={{color: "#353535", fontSize: 15,}}
                            text={this.onFormatBank(itemData.bank.bankCardNo)}
                        />) : ((!itemData.withdrawSetting.hasAlipayCard) ?
                    <TCButtonImg imgSource={ASSET_Images.gameUI.zfbBtn}
                                 soundName={TW_Store.bblStore.SOUND_ENUM.enterPanelClick}
                                 btnStyle={{position: "absolute", top: SCREEN_H * 0.32, left: SCREEN_W * 0.20}}
                                 onClick={() => {
                                     TW_Store.gameUIStroe.isShowWithDraw = false
                                     TW_OnValueJSHome(TW_Store.bblStore.getWebAction(TW_Store.bblStore.ACT_ENUM.openBindAlipay));
                                 }}/> : <TCText
                        borderRadius={5} backgroundStyle={{
                        backgroundColor: "rgb(209,212,230)", paddingHorizontal: SCREEN_W * 0.07,
                        paddingVertical: 2, position: "absolute", left: SCREEN_W * 0.04 + 120, top: SCREEN_H * 0.32
                    }}
                        textStyle={{color: "#353535", fontSize: 15,}}
                        text={this.onFormatBank(itemData.bank.bankCardNo)}
                    />)
            }
            <View style={{position: "absolute", bottom: 10, left: SCREEN_W * 0.24}}>
                {this.getConfirmButton()}
            </View>

            <View style={{
                flexDirection: "row",
                position: "absolute",
                justifyContent: "center",
                alignItems: "center",
                top: SCREEN_H * 0.45 + 25,
                left: SCREEN_W * 0.19,
            }}>
                <TCTextInput value={this.state.num}
                   /* value={this.state.num}*/
                             viewStyle={{}}
                             onChangeText={(num) => {
                                 itemData.money = num,
                                 this.setState({num})
                             }}
                             keyboardType={"numeric"}
                             placeholder={`点击输入 `}
                             maxLength={10}
                             inputStyle={[styles.inputStyle, {
                                 width: SCREEN_W * 0.34,
                             }]}
                             placeholderTextColor={"#9cc5d8"}/>

                {/*<Text style={{
                    marginLeft: 10,
                    color: "rgb(132,168,168)",
                    fontSize: 11
                }}>{`(${this.getInfoTextView()})`}</Text>*/}

            </View>
            {/*<Text style={{
                position: "absolute",
                left: 90,
                top: 235,
                fontSize: 12,
                color: "rgb(132,168,168)",
                marginLeft: 10
            }}>{`(最多可提取金额 ${itemData.withdrawModel.maxWithdrawMoney} 元)`}</Text>
            {this.getConfirmButton()}

            <View style={{position: "absolute",left: 70, top: 155}}>
                <Text style={{color: "#efe8cd"}}>{itemData.bank.bankName}</Text>
                <Text style={{color: "rgb(132,168,168)", fontSize:14, marginTop:5}}>{itemData.bank.bankCardNo}</Text>
            </View>*/}

            <View style={{position: "absolute"}}>
                <TCWithdrawKeyboardView
                    ref="KeyBoard"
                    callBack={(res) => {
                        this.callback(res)
                    }}/>
            </View>
        </View>)
    }

    onFormatBank=(bankNum)=>{
        let ret ="";
        if(bankNum&&bankNum.length>0){
            for(let i=0;i<bankNum.length;i++){
                let post = i;
                if(post%4==0){
                    ret+=" "+bankNum[i];
                }else{
                    ret+=bankNum[i]
                }
            }
        }
        return ret
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
        let {itemData} = this.props;
        itemData.applyWithdraw(this.pwd, (res) => {
            if (!res.status) {
                Toast.showShortCenter(res.message);
            }else{
                Toast.showShortCenter('提现5-10分钟到帐，请耐心等待');
                itemData.initDefaultBank()
                // this.tipMsg = '您的提款申请已提交，请耐心等待!'
                {TW_Store.gameUIStroe.showTiXianDetail()}
            }
        })
    }

    /**
     * 获取提示文本
     * @returns {XML}
     */
    getInfoTextView = () => {
        let {itemData} = this.props;
        if (itemData.withdrawModel.surplusMaxWithdraw <= 0) {
            return "您今日出款额度已经用完，请明日再来!";
        } else if (itemData.withdrawModel.surplusWithdrawCount <= 0) {
            return "您今日出款次数已经用完，请明日再来!";
        } else if (itemData.withdrawModel.withdrawSwitch) {
            let num = itemData.withdrawModel.aggregateBetRequirements - itemData.withdrawModel.aggregateBets
            if (!itemData.withdrawModel.sufficeAggregateBetRequirements) {
                return "您还需投注" + this.RoundNum(num, 2) + "元可申请提款";
            } else {
                if (itemData.withdrawModel.surplusFeeWithdrawCount > 0) {
                    return "免费提现";
                } else {
                    return '您今日的免费次数已经用完，提款需收' + itemData.withdrawModel.newratioOfChargeExempt + '%手续费!';
                }
            }
        } else {
            return this.getTextWithdraw();
        }
    }

    clearText=()=>{
        this.setState(({
            num:''
        }))
    }

    RoundNum=(num, length)=> {
        var number = Math.round(num * Math.pow(10, length)) / Math.pow(10, length);
        return number;
    }


    getTextWithdraw() {
        let {itemData} = this.props;
        let num = itemData.withdrawModel.aggregateBetRequirements - itemData.withdrawModel.aggregateBets;

        if (itemData.withdrawModel.surplusFeeWithdrawCount > 0 || itemData.withdrawModel.newratioOfChargeExempt === 0) {

            return "本次提现免手续费是否确定提现？";
        }
        if (!itemData.withdrawModel.sufficeAggregateBetRequirements && itemData.withdrawModel.ratioOfChargeExempt === 0 && itemData.withdrawModel.numOfChargeExempt === 0) {//打码量不满足时

            return '免费提款还需投注' + this.RoundNum(num, 2) + '元,继续提款需收取' + itemData.withdrawModel.newratioOfChargeExempt + '%手续费。'
        }
        return '您今日免费次数已用完，提款需收' + itemData.withdrawModel.newratioOfChargeExempt + '%手续费!';
    }

    /**
     * 验证提款
     */
    validateWithDraw = () => {
        let {itemData} = this.props;
        if (!itemData.money || itemData.money.length === 0) {//验证输入金额
            this.postponeShowToast('请输入取款金额!!');
            return false
        }

        let regExp = new RegExp("^\\d+(\\.\\d{1})?$");
        if (itemData.withdrawModel.integerWithdrawalAmount) {//验证金额格式
            regExp = new RegExp("^[1-9]\\d*$");
            if (!regExp.test(itemData.money)) {
                this.postponeShowToast('取款金额只能为整数!');
                return false
            }
        } else {
            if (!regExp.test(itemData.money)) {
                this.postponeShowToast('您输入的金额格式不正确(例:100.1)!');
                return false
            }
        }

        if (itemData.withdrawModel.surplusSeconds < 0) {
            this.postponeShowToast('您的操作过于频繁，请' + Math.abs(itemData.withdrawModel.surplusSeconds) + '秒后再试!');
            return false;
        }

        if (itemData.withdrawModel.surplusWithdrawCount <= 0) {//当天提款次数
            this.postponeShowToast('您今日出款次数已经用完，请明日再来!');
            return false;
        }
        if (itemData.withdrawModel.surplusMaxWithdraw <= 0) {
            this.postponeShowToast('您今日取款额度已经用完，请明日再来!');
            return false;
        }
        if (itemData.money < itemData.withdrawModel.minimumWithdrawAmount) {
            this.postponeShowToast('单次取款最少' + itemData.withdrawModel.minimumWithdrawAmount + '元!');
            return false
        }
        if (itemData.withdrawModel.maximumWithdrawAmount !== 0 && itemData.money > itemData.withdrawModel.maximumWithdrawAmount) {
            this.postponeShowToast('单次取款至多' + itemData.withdrawModel.maximumWithdrawAmount + '元!');
            return false
        }


        if (itemData.withdrawModel.withdrawSwitch && !itemData.withdrawModel.sufficeAggregateBetRequirements) {
            this.postponeShowToast('打码量不足,不能提现!');
            return false;
        }

        let m = parseFloat(itemData.money)
        let e = itemData.exempt
        let money = m - e
        if (money > itemData.withdrawModel.totalMoney && e > 0) {
            this.postponeShowToast('您的余额不足,请保留手续费 ' + e + ' 元 谢谢');
            return false
        }
        if (money > itemData.withdrawModel.totalMoney) {
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

    onOkGetOutMoney = () => {
        let {itemData} = this.props;
        if (this.validateWithDraw()) {
            if (itemData.exempt > 0) {
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
        let {itemData} = this.props;
        if (!this.validateWithDraw()) {
            return
        }
        var popView = this.refs.KeyBoard
        if (popView.modalVisible) {
            popView._setModalVisible(false)
        } else {
            popView._setModalVisible(true)
            popView._setMoney(itemData.money, itemData.exempt.toFixed(2))
        }
    }

    /**
     * 获取确认按钮
     * @returns {XML}
     */
    getConfirmButton = () => {
        let {itemData} = this.props;
        /*if (itemData.canWithdraw&&itemData.bank.bankCardNo&&itemData.bank.bankCardNo.length>0)*/

        if ((itemData.withdrawSetting.hasBankCard && this.isBankSelected)) {//||(itemData.withdrawSetting.hasAlipayCard&&!this.isBankSelected)){
            return (
                <TCButtonImg imgSource={ASSET_Images.gameUI.query}
                             resizeMode={"stretch"}
                             onClick={() => this.onOkGetOutMoney()}
                />
            )
        } else if (itemData.withdrawSetting.hasAlipayCard && !this.isBankSelected) {
            return (
                <TCButtonImg imgSource={ASSET_Images.gameUI.query}
                             resizeMode={"stretch"}
                             onClick={() => this.onOkGetOutMoney()}
                />
            )
        } else {
            return (
                <Text style={{color: 'red', fontWeight: 'bold', fontSize: Size.font15}}>您暂时无法提款</Text>
            )
        }
    }

}

const styles = StyleSheet.create({
    container: {
        width:SCREEN_W - 200,
        height:SCREEN_H - 88
    },
    inputStyle: {
        fontSize: 11,
        fontWeight: "bold",
        color: "#efe8cd",
        width:150
    },
});
