import React, {Component, PropTypes,} from 'react'

import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    NativeModules,
    CameraRoll,
    Platform,
    Image,
    ScrollView,
    Linking,
    Alert,
    AppState
} from 'react-native'
import {observer} from 'mobx-react/native'
import {observable, computed, action} from 'mobx'

import UserPay from './View/TCUserPayViewNew'
import {Size, indexBgColor, buttonStyle, ermaStyle, width, height} from '../../resouce/theme'
import TopNavigationBar from '../../../Common/View/TCNavigationBar';
import Dialog from './Dialog'
import NavigatorHelper from "../../../Common/JXHelper/TCNavigatorHelper";
import {config, appId} from '../../../Common/Network/TCRequestConfig'
import RequestUtils from '../../../Common/Network/TCRequestUitls'
import LoadingSpinnerOverlay from '../../../Common/View/LoadingSpinnerOverlay'
import {userPay} from '../../resouce/images'
import Moment from 'moment'
import TCUserOpenPayApp from './TCUserOpenPayApp'
import _ from 'lodash'
import Toast from "../../../Common/JXHelper/JXToast";
import {withMappedNavigationProps} from 'react-navigation-props-mapper'

let userOpenPayApp = new TCUserOpenPayApp()

/**
 * 支付宝支付
 */
@observer
@withMappedNavigationProps()
export default class TCUserAliAndWechatTransfer extends Component {

    stateModel = new StateModel()

    // 构造函数
    constructor(props) {

        super(props)
    }

    static defaultProps = {};

    componentDidMount() {
        this.title = ''
        if (this.props.type === 'ZHB') {
            this.title = '支付宝充值'
            this.payType = 'ALIPAY'
        } else if (this.props.type == 'WX') {
            this.title = '微信充值'
            this.payType = 'WECHATPAY'
        } else if (this.props.type == 'OTHER') {
            this.title = '其他支付'
            this.payType = 'OTHER'
        }
        AppState.addEventListener('change', () => this._handleAppStateChange());
        this.getRandomOrderNo()
        this.startTimer();
    }

    componentWillUnmount() {
        this.timer2 && clearTimeout(this.timer2)
        this.stopTimer();
        AppState.removeEventListener('change', this._handleAppStateChange);
    }

    render() {

        return (
            <View style={styles.container}>
                < TopNavigationBar
                    title={this.title}
                    needBackButton={true}
                    rightTitle={'充值明细'}
                    rightButtonCall={() => {
                        NavigatorHelper.pushToUserPayAndWithDraw(1)
                    }}
                    backButtonCall={() => {
                        this.showBackTip();
                    }}/>
                <ScrollView>
                    <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 20}}>
                        <UserPay ref="erweimaaa"
                                 payType={this.props.type == 'ZHB' ? '支付宝' : '微信'}
                                 orderNo={this.stateModel.orderNum}
                                 gotoPay={() => {
                                     this.gotoPay()
                                 }}
                                 hadPay={() => this.next()}
                                 codeType={'IMG'}
                                 codeValue={this.props.data.bankCardNo}
                                 money={this.props.money}
                                 transfer={true}/>
                        <View style={{width: width * 0.9, alignItems: 'center'}}>
                            {this.getTextInfo()}
                        </View>
                        <View
                            style={{
                                flexDirection: 'row',
                                marginTop: 5,
                                justifyContent: 'space-around',
                                width: width * 0.9
                            }}>
                            {this.getOpenButtonView()}
                            <TouchableOpacity onPress={() => this.gotoProgress()}
                                              style={styles.btmBtnStyle1}>
                                <Text
                                    style={styles.btmBtnTxtStyle}>{'支付已完成'}</Text></TouchableOpacity>
                        </View>
                        <View style={{marginBottom: 20}}>
                            {this.getTransferTip()}
                        </View>
                    </View>
                    <LoadingSpinnerOverlay
                        ref={component => this._modalLoadingSpinnerOverLay = component}/>
                </ScrollView>
                <Dialog
                    ref="Dialog"
                    show={false}
                    rightBtnClick={() => this.onOpen()}
                    leftBtnClick={() => this.setModalVisible()}
                    dialogTitle={'温馨提示'}
                    dialogContent={Platform.OS == 'ios111' ? '请先手动截屏后 再打开' : '将为您截屏并打开' + (this.props.type == 'ZHB' ? '支付宝' : '微信') + '， 是否立即打开？'}
                    btnTxt={'打开'}
                    leftTxt={'取消'}
                    tipTxt={'(请将本次充值订单号复制到您的转账备注中)'}/>
            </View>
        )
    }

    getTextInfo() {
        if (this.props.type == 'OTHER') {
            return
        }
        return (
            <Text style={styles.moneyTxtStyle}>{'*请将订单号*\n*填写到您的转账备注中*'} </Text>
        )
    }

    getOpenButtonView() {
        if (this.props.type == 'OTHER') {
            return
        }
        return (
            <TouchableOpacity onPress={() => this.gotoPay()} style={styles.btmBtnStyle1}>
                <Text style={styles.btmBtnTxtStyle}>{this.props.type == 'ZHB' ? '打开支付宝' : '打开微信'}</Text>
            </TouchableOpacity>
        )
    }

    _handleAppStateChange(currentAppState) {
        if (currentAppState === "background") {
            this.stopTimer();
        } else if (currentAppState === "active") {
            this.startTimer();
        }
    }

    /**
     * 刷新二维码
     */
    refershCode() {
        RequestUtils.getUrlAndParamsAndCallback(config.api.bankList + "/" + this.props.data.adminBankId, {id: appId}, (res) => {
            if (res.rs) {
                if (res.content.bankCardNo) {
                    this.stateModel.codeValue = res.content.bankCardNo;
                } else {
                    this.stopTimer();
                    if (AppState.currentState === "active") {
                        Alert.alert('充值二维码失效!', '对不起，当前充值二维码失效，请选择其他支付方式!', [
                            {
                                text: '确定',
                                onPress: () => {
                                    this.props.navigator.pop()
                                }
                            }
                        ]);
                    }
                }
            }
        })
    }

    startTimer() {
        this.timer = setInterval(
            () => {
                this.refershCode();
            },
            10 * 1000
        );
    }

    stopTimer() {
        this.timer && clearInterval(this.timer);
    }


    onOpen() {
        this.timer2 = setTimeout(() => {
            this.snapshot()
            if (this.props.type === 'ZHB') {
                userOpenPayApp.openAlipay()
            } else {
                userOpenPayApp.openWeChat()
            }
        }, 500)
        this.setModalVisible();
    }

    snapshot() {
        NativeModules.TCOpenOtherAppHelper.screenShotSave();
    }

    getTransferTip() {
        if (this.props.type == 'OTHER') {
            return
        }
        return (
            <View>
                <View style={{marginTop: 15}}>
                    <Text style={{color: ermaStyle.tipTxtColor, fontSize: Size.large, marginLeft: 5}}>充值步骤：</Text>
                </View>
                {this.getItemView('1.点击复制按钮，复制订单号', userPay.step1)}
                {this.getItemView(this.props.type == 'ZHB' ? '2.打开支付宝' : '2.打开微信', this.props.type == 'ZHB' ? userPay.step3 : userPay.stepWx3)}
                {this.getItemView('3.点击添加备注', userPay.step7)}
                {this.getItemView('4.在充值界面备注栏粘贴订单号', userPay.step8)}
            </View>
        )
    }

    getItemView(title, pic) {
        return (<View style={{marginTop: 10, marginLeft: 5}}>
            <Text style={styles.titleTxt}>{title}</Text>
            <View style={{alignItems: 'center', marginTop: 5}}>
                <Image source={pic} style={{marginTop: 10, width: width * 0.9, borderRadius: 10}}/>
            </View>
        </View>)
    }

    /**
     * 获取随机订单号
     */
    getRandomOrderNo() {
        let nowTime = Moment().format('x')
        let res = nowTime + _.random(99999, 1000000);
        this.stateModel.orderNum = res
        this.submitPay(res)
    }

    setModalVisible() {
        let dialog = this.refs.Dialog
        if (dialog.modalVisible) {
            dialog._setModalVisible(false);
        } else {
            dialog._setModalVisible(true);
        }
    }

    gotoPay() {
        this.setModalVisible();
    }

    next() {
        NavigatorHelper.pushToUserAliPayAndWechatMessage({
            type: this.props.type,
            topupAmount: this.props.money,
            orderNo: this.state.orderNo
        })
    }

    /**
     * 跳转到支付进度界面
     */
    gotoProgress() {
        NavigatorHelper.pushToUserPayProgress({topupAmount: this.props.money});
    }

    showBackTip() {
        Alert.alert('您确定退出充值吗？', '请确保已支付完成再退出!', [
            {
                text: '确定',
                onPress: () => {
                    NavigatorHelper.popToBack();
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
     * 提交订单
     * @param orderNo
     */
    submitPay(orderNo) {
        this._modalLoadingSpinnerOverLay.show()
        let params = {
            adminBankId: this.props.data.adminBankId,
            topupAmount: this.props.money,
            topupCardRealname: TCUSER_DATA.username,
            topupTime: Moment().format('YYYY-MM-DD HH:mm:ss'),
            transferToupType: this.payType,
            paymentPlatformOrderNo: orderNo,
            id: appId
        }
        RequestUtils.PutUrlAndParamsAndCallback(config.api.banktransfersQueryv3, params, (response) => {
            this._modalLoadingSpinnerOverLay.hide()
            if (response.rs) {

            } else {
                if (response.status === 500) {
                    Toast.showShortCenter('服务器出错啦!')
                } else {
                    if (response.message) {
                        Toast.showShortCenter(response.message)
                    } else {
                        Toast.showShortCenter('转账订单申请失败,请您稍后再试!')
                    }
                }
            }
        })
    }
}

class StateModel {
    @observable
    orderNum = ''
    @observable
    value = {
        format: "png",
        quality: 0.9,
        result: "file"
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: ermaStyle.mainBg
    }, moneyTxtStyle: {
        color: ermaStyle.moneyContent,
        fontSize: Size.xxlarge,
        width: width * 0.9,
        textAlign: 'center'
    }, btmBtnStyle1: {
        width: width * 0.38,
    }, btmBtnTxtStyle: {
        backgroundColor: ermaStyle.btnBg,
        color: ermaStyle.btnTxt,
        padding: 8,
        borderRadius: Platform.OS == 'ios' ? 0 : 5,
        textAlign: 'center',
        fontSize: Size.large,
        fontWeight: 'bold'
    }, tipTxtStyle: {
        color: ermaStyle.tipTxtColor,
        padding: 10,
        marginLeft: 5,
        fontSize: Size.small,
    }, titleTxt: {
        color: ermaStyle.tipTxtColor,
        fontSize: Size.default,
        width: width * 0.9
    }, redTipTxt: {
        color: ermaStyle.moneyContent,
        fontSize: Size.default,
    }
})