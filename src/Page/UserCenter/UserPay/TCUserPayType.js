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
    ActivityIndicator,
    Image,
    ScrollView, Platform, NativeModules
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
import TopNavigationBar from "../../../Common/View/TCNavigationBar";
import Toast from '../../../Common/JXHelper/JXToast';
import RequestUtils from "../../../Common/Network/TCRequestUitls";
import {config, appId} from "../../../Common/Network/TCRequestConfig";
import LoadingSpinnerOverlay from "../../../Common/View/LoadingSpinnerOverlay";
import NavigatorHelper from "../../../Common/JXHelper/TCNavigatorHelper";
import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter'
import JXHelper from '../../../Common/JXHelper/JXHelper'
import UserPay from './TCUserPayNew'
import {userPay, personal} from '../../resouce/images'
import _ from 'lodash';
import {Default_PayList} from '../../../Data/DefaultPayTypeList'
import {common} from '../../resouce/images'

/**
 * 提示对话框
 */
@observer
export default class TCUserPayType extends Component {

    payTansferList = []
    bankList = []
    stateModel = new StateModel()
    minimumTopupAmount = 1;

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.getOnlineTopup();
        this.getPayTypeList()
    }

    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);
    }

    render() {
        return (
            <View style={styles.container}>
                < TopNavigationBar
                    title={'充值类型'}
                    needBackButton={true}
                    rightTitle={'充值明细'}
                    rightButtonCall={() => {
                        this.gotoPayRecord()
                    }}
                    backButtonCall={() => {
                        this.goBack()
                    }}/>
                <View style={{flexDirection: 'row', padding: 10, backgroundColor: indexBgColor.itemBg}}>
                    <View style={{
                        marginLeft: 20,
                        height: 60,
                        width: 60,
                        borderRadius: 30,
                        borderWidth: TCLineW,
                        borderColor: 'rgba(0,0,0,0.3)',
                        backgroundColor: TCUSER_ICON_BGCOLOR,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <Text style={{
                            fontSize: 25,
                            fontWeight: 'bold',
                            color: 'white'
                        }}>{JXHelper.getUserIconShowName(TCUSER_DATA.username)}</Text>
                    </View>
                    <View style={{justifyContent: 'center', marginLeft: 15}}>
                        <Text style={{
                            color: listViewTxtColor.content,
                            fontSize: Size.font14
                        }}>{TCUSER_DATA.username}</Text>
                        <Text style={{fontSize: Size.font14, color: listViewTxtColor.content}}>余额: <Text
                            style={{
                                fontSize: Size.font14,
                                color: listViewTxtColor.redTip
                            }}>{TCUSER_BALANCE}</Text></Text>
                    </View>
                </View>
                <View style={styles.tipViewStyle}>
                    <Image source={common.warn} style={styles.tipIconStyle}/>
                    <Text style={styles.tipTextStyle}>充值时，部分支付渠道充值金额随机1位小数，请您在付款时确认。</Text>
                    <View>
                    </View>
                </View>
                <View style={{paddingTop: 10, paddingLeft: 10, paddingBottom: 5, flexDirection: 'row'}}>
                    <Text style={styles.payTip}>请选择充值类型 (如有问题，请联系</Text>
                        <TouchableOpacity onPress={() => this.onlineService()}>
                            <Text style={[styles.payTip, {color:'#4292cd'}]}>在线客服</Text>
                        </TouchableOpacity>
                    <Text style={styles.payTip}>)</Text>
                </View>
                <ScrollView style={{flex: 1, marginBottom: 5, marginTop: 5}}>{this.getContentView()}</ScrollView>
                <LoadingSpinnerOverlay
                    ref={component => this._partModalLoadingSpinnerOverLay = component}
                    modal={true}
                    marginTop={64}/>
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

    getOnlineTopup() {
        RequestUtils.getUrlAndParamsAndCallback(config.api.onlineTopUp, null, res => {
            if (res.rs) {
                this.minimumTopupAmount = res.content.minimumTopupAmount;
            }
        })
    }

    /**
     * 获取内容组件
     * @returns {Array}
     */
    getContentView() {
        let payTypeView = []
        this.stateModel.payTypeList.map((item) => {
            payTypeView.push(
                <TouchableOpacity
                    key={'00' + item.code}
                    onPress={() => {
                        this.selectPayType(item)
                    }}>
                    <View style={styles.payItemStyle}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Image source={this.getPayTypeIcon(item.code)} style={styles.payTypeImg}/>
                            <Text style={styles.payTypeTitleStyle}>{item.name}</Text></View>
                        <Image source={personal.imgNext} style={styles.imgNext}/>
                    </View>
                </TouchableOpacity>)
        })
        return payTypeView
    }

    /**
     * 获取支付图标
     * @param rowData
     * @returns {XML}
     */
    getPayTypeIcon(typeCode) {
        switch (typeCode) {
            case 'WX':
                return userPay.payTypeWx
            case 'ZHB':
                return userPay.payTypeAlipay
            case 'JD':
                return userPay.payTypeJdzf
            case 'BANK':
                return userPay.payTypeBank
            case 'ONLINEBANK':
                return userPay.payTypeUnionpay
            default:
                return userPay.payTypeOther
        }
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
     * 获取支付类型列表
     */
    getPayTypeList() {
        this.showLoading()
        RequestUtils.getUrlAndParamsAndCallback(config.api.paymentTypeList, null, (response) => {
            this.hideLoading()
            if (response.rs) {
                this.stateModel.payTypeList = response.content && response.content.length > 0 ? response.content : Default_PayList
            } else {
                this.stateModel.payTypeList = Default_PayList
            }
        })
    }

    /**
     * 获取厅主银行卡列表
     */
    getBankList(code) {
        this.showLoading()
        RequestUtils.getUrlAndParamsAndCallback(config.api.bankList, {id: appId}, (response) => {
            if (response.rs) {
                this.parseBankList(response.content)
                this.loadDataFromNet(code)
            } else {
                this.hideLoading()
                if (response.status === 500) {
                    Toast.showShortCenter('服务器出错啦!')
                } else {
                    if (response.message) {
                        Toast.showShortCenter(response.message)
                    }
                }
            }
        })
    }

    /**
     * 将银行卡列表中支付宝和微信转账信息合并到支付宝和微信
     * @param data
     */
    parseBankList(data) {
        if (data.length > 0) {
            for (var i = 0; data[i] != null; i++) {
                let item = data[i]
                if (item.bankCode === 'ZHB' || item.bankCode === 'WX' || item.bankCode === 'OTHER') {
                    this.payTansferList.push(item)
                } else {
                    this.bankList.push(item)
                }
            }
        }
    }

    /**
     * 加载微信和支付宝的支付方式
     */
    loadDataFromNet(code) {
        RequestUtils.getUrlAndParamsAndCallback(config.api.paymentList, null, (response) => {
            if (response.rs) {
                if (response.content && response.content.length > 0) {
                    this.payTansferList = _.concat(this.payTansferList, response.content)
                }
                this.gotoPayPage(code)
            } else {
                this.hideLoading()
                if (response.status === 401) {
                    Toast.showShortCenter('登录状态过期，请重新登录!')
                } else {
                    if (response.status == 500) {
                        Toast.showShortCenter('服务器出错啦!')
                    } else {
                        Toast.showShortCenter(response.message)
                    }
                }
            }
        })
    }

    /**
     * 选择支付类型
     * @param item
     */
    selectPayType(item) {
        this.bankList = []
        this.payTansferList = []
        this.getBankList(item.code)
    }

    /**
     * 获取支付方式列表
     * @param code
     */
    getPayList(code) {
        if (code === 'ONLINEBANK') {
            code = 'THIRD_PARTY'
        }
        if (code === 'BANK') {
            return this.bankList
        } else {
            let payList = []
            this.payTansferList.forEach((item) => {
                let payType = item.type ? item.type : item.bankCode
                if (payType === code) {
                    payList.push(item)
                }
            })
            return payList
        }
    }

    /**
     * 跳转到支付界面
     * @param code
     */
    gotoPayPage(code) {
        this.hideLoading()
        NavigatorHelper.pushToTopUp({
            code: code,
            payList: this.getPayList(code),
            minimumTopupAmount: this.minimumTopupAmount
        });
    }
}

class StateModel {
    @observable
    payTypeList = []
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: indexBgColor.mainBg,
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
    payTypeImg: {
        height: 40,
        width: 40,
    }, payTypeTxt: {
        justifyContent: 'center',
        paddingLeft: 15
    }, payItemStyle: {
        flexDirection: 'row',
        backgroundColor: indexBgColor.itemBg,
        marginTop: 1,
        height: 60,
        paddingLeft: 15,
        alignItems: 'center',
        justifyContent: 'space-between'
    }, payTypeTitleStyle: {
        fontSize: Size.large,
        color: listViewTxtColor.title,
        marginLeft: 10
    }, imgNext: {
        width: 10,
        height: 15,
        marginRight: 10,
    }, tipIconStyle: {
        width: 25,
        height: 25,
    }, tipTextStyle: {
        color: listViewTxtColor.redTip,
        fontSize: Size.xsmall,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 5,
        width: width - 25 - 15,
    }, tipViewStyle: {
        flexDirection: 'row',
        backgroundColor: indexBgColor.itemBg,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
    }, payTip: {
        color: listViewTxtColor.title,
        fontSize: Size.default,

    }
})
