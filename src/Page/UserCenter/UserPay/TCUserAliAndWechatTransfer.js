import React, {Component, PropTypes,} from 'react'

import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    NativeModules,
    Image,
    ScrollView,
    Alert,
    AppState
} from 'react-native'
import {observer, inject} from 'mobx-react/native'
import {observable, computed, action} from 'mobx'

import UserPay from './View/TCUserPayViewNew'
import {Size, indexBgColor, buttonStyle, ermaStyle, width, height} from '../../resouce/theme'
import TopNavigationBar from '../../../Common/View/TCNavigationBar';
import Dialog from './Dialog'
import NavigatorHelper from "../../../Common/JXHelper/TCNavigatorHelper";
import {config, appId} from '../../../Common/Network/TCRequestConfig'
import RequestUtils from '../../../Common/Network/TCRequestUitls'
import LoadingSpinnerOverlay from '../../../Common/View/LoadingSpinnerOverlay'
import {userPay} from '../../asset/images'
import Moment from 'moment'
import TCUserOpenPayApp from './TCUserOpenPayApp'
import _ from 'lodash'
import Toast from "../../../Common/JXHelper/JXToast";
import {withMappedNavigationProps} from 'react-navigation-props-mapper'
import UserPayStore from "../../../Data/store/UserPayStore";
import payHelper from './PayHelper'
import TcTools from '../../../Common/View/Tools'

let userOpenPayApp = new TCUserOpenPayApp()
let Tools = new TcTools()

/**
 * 支付宝支付
 */
@inject("userStore")
@withMappedNavigationProps()
@observer
export default class TCUserAliAndWechatTransfer extends Component {

    userPayStore = new UserPayStore();

    // 构造函数
    constructor(props) {
        super(props)
        this.state = {
            isSpinnerVisible: false
        }
        this.setSpinnerVisibility = this.setSpinnerVisibility.bind(this)
    }

    static defaultProps = {};

    componentDidMount() {
        this.getTitle();
        this.userPayStore.codeValue = this.props.data.bankCardNo;
        AppState.addEventListener('change', () => this._handleAppStateChange());
        this.submitPay()
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
                <TopNavigationBar
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
                                 payType={this.props.type === 'ZHB' ? '支付宝' : '微信'}
                                 orderNo={this.userPayStore.orderNum}
                                 realName={this.props.data.realName}
                                 gotoPay={() => {
                                     this.gotoPay()
                                 }}
                                 hadPay={() => this.next()}
                                 codeType={'IMG'}
                                 codeValue={this.userPayStore.codeValue}
                                 money={this.userPayStore.money}
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
                    <LoadingSpinnerOverlay visible={this.state.isSpinnerVisible} />
                </ScrollView>
                <Dialog
                    ref="Dialog"
                    show={false}
                    rightBtnClick={() => this.onOpen()}
                    leftBtnClick={() => this.setModalVisible()}
                    dialogTitle={'温馨提示'}
                    dialogContent={G_IS_IOS ? '请先手动截屏保存二维码至相册再打开':'已为您截屏保存二维码至相册并打开' + (this.props.type === 'ZHB' ? '支付宝' : '微信') + '， 是否立即打开？'}
                    btnTxt={'打开'}
                    leftTxt={'取消'}
                    tipTxt={'(请将本次充值订单号复制到您的转账备注中)'}/>
            </View>
        )
    }


    getTitle() {
        this.title = ''
        switch (this.props.type) {
            case 'ZHB':
            case 'FIXED_ZHB':
                this.title = '支付宝充值'
                this.payType = 'ALIPAY'
                break;
            case 'JD':
                this.title = '京东充值'
                this.payType = 'JD_PAY'
                break;
            case 'WX':
            case 'FIXED_WX':
                this.title = '微信充值'
                this.payType = 'WECHATPAY'
                break;
            case 'QQ':
            case 'FIXED_QQ':
                this.title = "QQ充值";
                this.payType = "QQ_PAY";
                break;
            case 'OTHER':
                this.title = '其他支付'
                this.payType = 'OTHER'
                break;
        }
    }


    getTextInfo() {
        if (this.props.type === 'OTHER') {
            return
        }
        return (
            <Text style={styles.moneyTxtStyle}>{'*请将用户账户*\n*填写到您的转账备注中*'} </Text>
        )
    }

    getOpenButtonView() {
        if (this.props.type === 'OTHER') {
            return
        }
        return (
            <TouchableOpacity onPress={() => this.gotoPay()} style={styles.btmBtnStyle1}>
                <Text style={styles.btmBtnTxtStyle}>打开{this.getTypeName()}</Text>
            </TouchableOpacity>
        )
    }


    getTypeName() {
        switch (this.props.type) {
            case 'ZHB':
            case 'FIXED_ZHB':
                return "支付宝";
            case 'WX':
            case 'FIXED_WX':
                return "微信";
            case 'QQ':
            case 'FIXED_QQ':
                return 'QQ';
            case 'JD':
                return "京东";
        }
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
        this.userPayStore.refreshCode(this.props.data.adminBankId, (res) => {
            if (res.rs) {
                if (res.content.bankCardNo) {
                    this.userPayStore.codeValue = res.content.bankCardNo;
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
            switch (this.props.type) {
                case "ZHB":
                case 'FIXED_ZHB':
                    userOpenPayApp.openAlipay();
                    break;
                case "WX":
                case 'FIXED_WX':
                    userOpenPayApp.openWeChat();
                    break;
                case 'QQ':
                case 'FIXED_QQ':
                    userOpenPayApp.openQQ();
                    break;
                case "JD":
                    userOpenPayApp.openJD();
                    break;
            }
        }, 500)
        this.setModalVisible();
    }

    getTransferTip() {
        if (this.props.type == 'OTHER' || this.props.type === "JD" || this.props.type === "QQ") {
            return
        }
        return (
            <View>
                {this.getSnapshotErrorView()}
                <View style={{marginTop: 15}}>
                    <Text style={{color: ermaStyle.tipTxtColor, fontSize: Size.large, marginLeft: 5}}>充值步骤：</Text>
                </View>
                {this.getItemView('1.点击添加备注', userPay.step7)}
                {this.getItemView('2.在充值界面备注栏粘贴订单号', userPay.step8)}
            </View>
        )
    }

    getSnapshotErrorView() {
        if (IS_IOS) {
            return (
                <View>
                    <View style={{marginTop: 15}}>
                        <Text style={{color: ermaStyle.moneyContent, fontSize: Size.large, marginLeft: 5}}>
                            {'请手动截屏后,再打开' + (this.getTypeName()) + '\n扫描这个二维码支付'}</Text>
                    </View>
                </View>
            )
        }
    }

    getItemView(title, pic) {
        return (<View style={{marginTop: 10, marginLeft: 5}}>
            <Text style={styles.titleTxt}>{title}</Text>
            <View style={{alignItems: 'center', marginTop: 5}}>
                <Image resizeMode='contain' source={pic}
                       style={{height: height * 0.3, width: width * 0.9, borderRadius: 10}}/>
            </View>
        </View>)
    }

    /**
     * 获取随机订单号
     */
    getRandomOrderNo() {
        let nowTime = Moment().format('x')
        let res = nowTime + _.random(99999, 1000000);
        this.userPayStore.orderNum = res
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
        Tools.saveScreenshot();
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
        NavigatorHelper.pushToUserPayProgress({topupAmount: this.userPayStore.money});
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

    setSpinnerVisibility(isVisible) {
        this.setState({ isSpinnerVisible: isVisible });
    }

    /**
     * 提交订单
     * @param orderNo
     */
    submitPay() {
        this.setSpinnerVisibility(true);
        let params = {
            adminBankId: this.props.data.adminBankId,
            topupAmount: this.props.money,
            topupCardRealname: this.props.data.realName,
            transferTopupType: this.payType,
            id: appId
        }
        this.userPayStore.bankTransferQuery(params, (res) => {
            this.setSpinnerVisibility(false);
            if (!res.status) {
                Toast.showShortCenter(res.message);
            }
        });
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
        borderRadius: G_IS_IOS ? 0 : 5,
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