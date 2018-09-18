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
import {observer, inject} from 'mobx-react/native'
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
import UserPayTypeStore from "../../../Data/store/UserPayTypeStore";

/**
 * 用戶充值类型界面
 */
@inject("jdAppStore", "userStore", "mainStore")
@observer
export default class TCUserPayType extends Component {

    userPayStore = new UserPayTypeStore();

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.getPayTypeList()
    }

    componentWillUnmount() {

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
                    backButtonCall={() => {this.props.mainPage ? this.props.mainStore.changeTab('home') : this.goBack()}}/>
                <View style={{flexDirection: 'row', padding: 10, backgroundColor: indexBgColor.itemBg}}>
                    <View style={{
                        marginLeft: 20,
                        height: 60,
                        width: 60,
                        borderRadius: 30,
                        borderWidth: TCLineW,
                        borderColor: 'rgba(0,0,0,0.3)',
                        backgroundColor: this.userLogoColor,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <Text style={{
                            fontSize: 25,
                            fontWeight: 'bold',
                            color: 'white'
                        }}>{JXHelper.getUserIconShowName(this.userName)}</Text>
                    </View>
                    <View style={{justifyContent: 'center', marginLeft: 15}}>
                        <Text style={{
                            color: listViewTxtColor.content,
                            fontSize: Size.font14
                        }}>{this.userName}</Text>
                        <Text style={{fontSize: Size.font14, color: listViewTxtColor.content}}>余额: <Text
                            style={{
                                fontSize: Size.font14,
                                color: listViewTxtColor.redTip
                            }}>{this.balance}</Text></Text>
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
                        <Text style={[styles.payTip, {color: '#4292cd'}]}>在线客服</Text>
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

    @computed get userLogoColor() {
        return this.props.userStore.userLogoColor;
    }

    @computed get userName() {
        return this.props.userStore.userName;
    }

    @computed get balance() {
        return this.props.userStore.balance;
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

    /**
     * 获取内容组件
     * @returns {Array}
     */
    getContentView() {
        let payTypeView = []
        this.userPayStore.payTypeList.map((item) => {
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
        NavigatorHelper.popToBack();
    }

    /**
     * 获取支付类型列表
     */
    getPayTypeList() {
        this.showLoading();
        this.userPayStore.initPayTypeList(() => {
            this.hideLoading();
        });
    }


    /**
     * 选择支付类型
     * @param item
     */
    selectPayType(item) {
        this.showLoading();
        this.userPayStore.selectPayType((res) => {
            if (res.status) {
                this.gotoPayPage(item.code);
            } else {
                this.hideLoading();
                Toast.showShortCenter(res.message);
            }
        })
    }


    /**
     * 跳转到支付界面
     * @param code
     */
    gotoPayPage(code) {
        this.hideLoading();
        let payList = this.userPayStore.getPayList(code);
        NavigatorHelper.pushToTopUp({
            code: code,
            payList: payList,
            minimumTopupAmount: this.userPayStore.minimumTopupAmount
        });
    }
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
