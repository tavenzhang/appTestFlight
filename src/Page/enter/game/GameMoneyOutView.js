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
        TW_Store.userStore.freshBalance();
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
            <TCImage source={ASSET_Images.gameUI.moneyInBg} style={{ width:SCREEN_W, height:SCREEN_H}} resizeMode={'stretch'}/>
            <TCImage source={ASSET_Images.gameUI.titleMoneyOut} style={{position: "absolute",width:SCREEN_W*0.1,height:SCREEN_H*0.06,left:SCREEN_W*0.11,top:SCREEN_H*0.05 - 5}} resizeMode={'contain'}/>
            <TCButtonImg imgSource={ASSET_Images.gameUI.payBack}
                         onClick={() => TW_Store.gameUIStroe.isShowWithDraw = false}
                         btnStyle={{position: "absolute", right: 16, top: 7,}} />
            <TCButtonImg imgSource={ASSET_Images.gameUI.btnOut}
                         btnStyle={{position: "absolute", right: SCREEN_W*0.15, top: 10}}  onClick={()=>TW_Store.gameUIStroe.showTiXianDetail() }
            />
            <TCImage source={ASSET_Images.gameUI.payTypeBg} style={{position: "absolute",top:SCREEN_H*0.14,left:0}} />


            <TCImage source={ASSET_Images.gameUI.payOutBg} resizeMode={'stretch'} style={{position: "absolute",top:SCREEN_H*0.18,width:SCREEN_W*0.68,height:SCREEN_H*0.76,left:SCREEN_W*0.27}}/>

            <TCImage source={ASSET_Images.gameUI.payTypeSelectBg} resizeMode={'contain'} style={{position: "absolute",top:SCREEN_H*0.18,left:0}}/>

            <TCImage source={ASSET_Images.gameUI.payOutTypeBank}  style={{position: "absolute",top:SCREEN_H*0.18+15,left: SCREEN_ISFULL ? 30:10}}/>
            <TCImage source={ASSET_Images.gameUI.payOutTypeZFB}   style={{position: "absolute",top:SCREEN_H*0.18+125,left:SCREEN_ISFULL ? 20:10}}/>



            <TCImage source={ASSET_Images.gameUI.payOutTopIcon} resizeMode={'stretch'} style={{position: "absolute",top:SCREEN_H*0.19,width:40,height:42,left:SCREEN_W*0.29}}/>
            <TCImage source={ASSET_Images.gameUI.payOutMoneyLabel} resizeMode={'stretch'} style={{position: "absolute",top:SCREEN_H*0.22,width:90,height:25,left:SCREEN_W*0.37}}/>
            {/*<TCImage source={ASSET_Images.gameUI.question} resizeMode={'stretch'} style={{position: "absolute",top:SCREEN_H*0.20,width:35,height:35,right:SCREEN_W*0.06}}/>*/}

            <TCText backgroundStyle={{backgroundColor: "transparent", position: "absolute", left: SCREEN_W*0.49+20, top: SCREEN_H*0.2}}
                    textStyle={{color: "#ffde00",fontSize:26}} text={this.userWithdrawStore.withdrawModel.totalMoney}/>
            <TCText backgroundStyle={{backgroundColor: "transparent", position: "absolute", left: SCREEN_W*0.29, top: SCREEN_H*0.34}}
                    textStyle={{color: "#fffff1",fontSize:20}} text={'有效投注:'}/>
            <TCText backgroundStyle={{backgroundColor: "transparent", position: "absolute", left: SCREEN_W*0.42, top: SCREEN_H*0.34}}
                    textStyle={{color: "#ffde00",fontSize:20}} text={this.userWithdrawStore.withdrawModel.aggregateBets}/>
            <TCText backgroundStyle={{backgroundColor: "transparent", position: "absolute", left: SCREEN_W*0.57, top: SCREEN_H*0.34}}
                    textStyle={{color: "#fffff1",fontSize:20}} text={'还需投注:'}/>
            <TCText backgroundStyle={{backgroundColor: "transparent", position: "absolute", left: SCREEN_W*0.71, top: SCREEN_H*0.34}}
                    textStyle={{color: "#ffde00",fontSize:20,  textAlign: "left"}} text={num}/>


            <TCImage source={ASSET_Images.gameUI.inputMoneyBg} resizeMode={'stretch'} style={{position: "absolute",top:SCREEN_H * 0.46,width:SCREEN_W*0.6,height:60,left: SCREEN_W*0.29,}}/>
            <TCText backgroundStyle={{backgroundColor: "transparent", position: "absolute", left: SCREEN_W*0.30, top: SCREEN_H * 0.46 +20}}
                    textStyle={{color: "#fffff1",fontSize:20}} text={'提取金额:'}/>
            <TCImage source={ASSET_Images.gameUI.moneyLabelBg} resizeMode={'stretch'} style={{position: "absolute",top:SCREEN_H * 0.46+ 20,width:SCREEN_W*0.35,height:30,left: SCREEN_W*0.44,}}/>
            <TCText backgroundStyle={{backgroundColor: "transparent", position: "absolute", left: SCREEN_W*0.8, top: SCREEN_H * 0.46 +22}}
                    textStyle={{color: "#fffff1",fontSize:20}} text={'元'}/>


            <TCText backgroundStyle={{backgroundColor: "transparent", position: "absolute", left: SCREEN_W*0.30, top: SCREEN_H*0.66}}
                    textStyle={{color: "#fffff1",fontSize:20}} text={'收款银行'}/>


            {
                (!this.userWithdrawStore.bank.bankCardNo||!this.userWithdrawStore.bank.bankCardNo.length) ?<TCButtonImg imgSource={ASSET_Images.gameUI.bankBtn}
                             btnStyle={{position: "absolute",top:SCREEN_H * 0.65+2,right: SCREEN_W*0.33}}  onClick={()=>{
                    TW_Store.gameUIStroe.isShowUserInfo = true;
                }}
                />:  <TCText borderRadius={5} backgroundStyle={{backgroundColor:"rgb(209,212,230)", paddingHorizontal: SCREEN_W*0.07,
                    paddingVertical:2,position: "absolute",  left: SCREEN_W*0.30+120, top: SCREEN_H*0.65+3}}
                             textStyle={{color: "#353535",fontSize:15,}} text={this.onFormatBank(this.userWithdrawStore.bank.bankCardNo)}/>
            }

            <TCButtonImg imgSource={ASSET_Images.gameUI.query}
                         resizeMode={"stretch"}
                         btnStyle={{position: "absolute",top:SCREEN_H * 0.78,left:SCREEN_W*0.55,height:40}}  onClick={()=>this.onOkGetOutMoeny()}
            />
            <View style={{
                flexDirection: "row",
                position: "absolute",
                justifyContent: "center",
                alignItems: "center",
                top:  SCREEN_H * 0.46 + 25,
                left: SCREEN_W*0.45,
            }}>
                <TCTextInput value={this.userWithdrawStore.money}
                             viewStyle={{


                             }}
                             onChangeText={(num) => {
                                 this.userWithdrawStore.money=num
                             }}
                             keyboardType={"numeric"}
                             placeholder={`请输入提取金额 `}
                             maxLength={10}
                             inputStyle={[styles.inputStyle,{  width: SCREEN_W*0.34,
                                }]}
                             placeholderTextColor={"#9cc5d8"}/>

                {/*<Text style={{*/}
                    {/*marginLeft: 10,*/}
                    {/*color: "rgb(132,168,168)",*/}
                    {/*fontSize: 11*/}
                {/*}}>{`(${this.getInfoTextView()})`}</Text>*/}

            </View>
            {/*<Text style={{*/}
                {/*position: "absolute",*/}
                {/*left: 90,*/}
                {/*top: 235,*/}
                {/*fontSize: 12,*/}
                {/*color: "rgb(132,168,168)",*/}
                {/*marginLeft: 10*/}
            {/*}}>{`(最多可提取金额 ${this.userWithdrawStore.withdrawModel.maxWithdrawMoney} 元)`}</Text>*/}
            {/*{this.getConfirmButton()}*/}

            {/*<View style={{position: "absolute",left: 70, top: 155}}>*/}
                    {/*<Text style={{color: "#efe8cd"}}>{this.userWithdrawStore.bank.bankName}</Text>*/}
                    {/*<Text style={{color: "rgb(132,168,168)", fontSize:14, marginTop:5}}>{this.userWithdrawStore.bank.bankCardNo}</Text>*/}
            {/*</View>*/}

            <View style={{position: "absolute"}}>
                <TCWithdrawKeyboardView
                ref="KeyBoard"
                callBack={(res) => {
                this.callback(res)
                }}/>
            </View>
        </View>)

    }

    // getPayTypeView =()=>{
    //     return(<View>
    //         <TCImage source={ASSET_Images.gameUI.payTypeSelectBg} resizeMode={'stretch'} style={{position: "absolute",top:SCREEN_H*0.14,left:0,width:SCREEN_W*0.25,height:SCREEN_H*0.3}}/>
    //         <TCImage source={ASSET_Images.gameUI.payOutTypeBank} resizeMode={'stretch'} style={{position: "absolute",top:SCREEN_H*0.14,left:0,width:SCREEN_W*0.25,height:SCREEN_H*0.3}}/>
    //     </View>)
    // }

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

    RoundNum=(num, length)=> {
        var number = Math.round(num * Math.pow(10, length)) / Math.pow(10, length);
        return number;
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
                <TCButtonImg btnStyle={{position: "absolute", right: 200, top: 260}}
                             imgSource={ASSET_Images.gameUI.btnOk} onClick={this.onOkGetOutMoeny}/>
            )
        } else {
            return (
                <View style={{position: "absolute", right: 220, top: 270}}>
                    <Text style={{color: 'red', fontWeight: 'bold', fontSize: Size.font15}}>您暂时无法提款</Text>
                </View>
            )
        }
    }

}

const styles = StyleSheet.create({
    container: {

        justifyContent: "center",
        alignItems: "center",
       // alignSelf: "center",
       // backgroundColor: "transparent",
    },
    inputStyle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#ffde00",
        textAlign:"center",
        height:20
    },

});