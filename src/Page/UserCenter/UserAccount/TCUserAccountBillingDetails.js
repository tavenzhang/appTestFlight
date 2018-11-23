'use strict'
/**
 * 账单详情
 * Created by Allen on 2016/12/10.
 */
import React, {Component} from 'react';

import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Clipboard
} from 'react-native';
import TopNavigationBar from '../../../Common/View/TCNavigationBar';
import Toast from '../../../Common/JXHelper/JXToast';
import {Size, width, height, indexBgColor, listViewTxtColor, buttonStyle, copyBtnStyle} from '../../resouce/theme'
import Moment from 'moment'
import {withMappedNavigationProps} from 'react-navigation-props-mapper'
import Helper from '../../../Common/JXHelper/TCNavigatorHelper'

@withMappedNavigationProps()
export default class TCUserAccountBillingDetails extends Component {

    constructor(props) {
        super(props)
    }

    static defaultProps = {};


    componentDidMount() {
    }

    componentWillUnmount() {
    }

    render() {
        let {crossReferenceId, transactionId, subType, notes, remarks, balance} = this.props.orderData
        let orderId = crossReferenceId ? crossReferenceId : transactionId
        return (
            <View style={styles.container}>
                < TopNavigationBar
                    title={'账单详情'}
                    needBackButton={true}
                    backButtonCall={() => {
                        Helper.popToBack();
                    }}
                />

                <View>
                    <View style={styles.itemStyle}>
                        <Text style={styles.itemTitleStyle}>订单号：</Text>
                        <Text selectable={true}
                              style={styles.itemContentStyle}>{this.formatOrderId(orderId)}

                        </Text>
                        <TouchableOpacity onPress={() => {
                            this.onCopy(orderId)
                        }}>
                            <View style={styles.itemBtnStyle}>
                                <Text style={styles.itemBtnTxtStyle}>复制</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.itemStyle}>
                        <Text style={styles.itemTitleStyle}>类型：</Text>
                        <Text
                            style={styles.itemContentStyle}>{this.props.isPayAndWithdrawRecord ? this.getType() : subType}</Text>
                    </View>

                    <View style={styles.itemStyle}>
                        <Text style={styles.itemTitleStyle}>收入：</Text>
                        {this.props.isPayAndWithdrawRecord ? this.getPayAndWithdrawMoney() : this.getAccountBalance()}
                    </View>

                    { this.getBalance(balance) }

                    {this.props.isPayAndWithdrawRecord ? (<View style={styles.itemStyle}>
                        <Text style={styles.itemTitleStyle}>支付方式：</Text>
                        <Text style={styles.itemContentStyle}>{this.getPayType()}</Text>
                    </View>) : null}

                    <View style={styles.itemStyle}>
                        <Text style={styles.itemTitleStyle}>时间：</Text>
                        <Text
                            style={styles.itemContentStyle}>{this.props.isPayAndWithdrawRecord ? this.getTime() : this.props.orderData.processTime}</Text>
                    </View>
                    {
                        this.getRemarks(notes, remarks)
                    }
                </View>
                {
                    this.hasOrderDetail() &&
                    <TouchableOpacity style={styles.orderDetailContainer} onPress={() => this.pressOrderDetail()}>
                        <Text style={styles.orderDetailTxt}>订单详情</Text>
                    </TouchableOpacity>
                }
            </View>
        );

    };

    getBalance(balance) {
        if (balance) {
            return (
                <View style={styles.itemStyle}>
                    <Text style={styles.itemTitleStyle}>余额：</Text>
                    <Text style={styles.itemContentStyle}>{this.props.orderData.balance.toFixed(2)}元</Text>
                </View>
            )
        }
    }

    getRemarks(notes, remarks) {
        if (notes || remarks) {
            return (<View style={styles.itemStyle}>
                <Text style={styles.itemTitleStyle}>备注：</Text>
                <Text style={styles.itemContentStyle}>{notes || remarks}</Text>
            </View>)
        } else {
            return null;
        }
    }


    /**
     * 跳转到订单详情
     */
    pressOrderDetail() {
        let transactionTimeuuid = this.props.orderData.crossReferenceId.split(':')[0];
        Helper.pushToOrderItemList({transactionTimeuuid: transactionTimeuuid});
    }

    /**
     * 获取指定时间格式
     * @returns {string}
     */
    getTime() {
        return Moment(this.props.orderData.createTime).format("YYYY-MM-DD HH:mm:ss")
    }

    /**
     * 格式化订单号
     * @param orderId
     * @returns {string}
     */
    formatOrderId(orderId) {
        return orderId.substr(0, 6) + ' ****** ' + orderId.substr(orderId.length - 5, orderId.length)
    }

    onCopy(text) {
        Clipboard.setString(text);
        Toast.showShortCenter("已复制！")
    }

    /**
     * h获取账单类型
     * @returns {*}
     */
    getType() {
        let type = this.props.orderData.type
        let subType = this.props.orderData.subType
        let manualOperatorType = this.props.orderData.manualOperatorType
        if (subType === 'MANUAL_TOPUP' || subType === 'MANUAL_WITHDRAWAL') {
            switch (manualOperatorType) {
                case 'TOPUP_PREFERENTIAL':
                    return '充值优惠'
                case 'REGISTER_PREFERENTIAL':
                    return '注册优惠'
                case 'WITHDRAWAL_ERROR':
                    return '出款错误'
                case 'TOPUP_ERROR':
                    return '入款错误'
            }
        } else {
            if (type === 'WITHDRAWAL') {
                return '提现'
            } else if (type === 'TOPUP') {
                return '充值'
            }
        }
    }

    hasOrderDetail() {
        let type = this.props.orderData.subTypeCode
        if (type == 'WIN_CP' || type == 'REB_CP' || type == 'CG_CP') {
            return true;
        }
        return false;
    }

    /**
     * 获取账单余额
     * @returns {XML}
     */
    getAccountBalance() {
        let balance = this.props.orderData.delta
        if (balance < 0) {
            return (<Text style={styles.itemGreenTxt}>{(balance).toFixed(2)}</Text>)
        } else {
            return (<Text style={styles.itemRedTxt}>{'+' + (balance).toFixed(2)}</Text>)
        }
    }

    /**
     * 获取充值提款金额
     * @returns {XML}
     */
    getPayAndWithdrawMoney() {
        let type = this.props.orderData.type
        let balance = this.props.orderData.effectiveAmount
        if (type === 'WITHDRAWAL') {
            return (<Text style={styles.itemGreenTxt}>{'- ' + (balance).toFixed(2)}</Text>)
        } else if (type === 'TOPUP') {
            return (<Text style={styles.itemRedTxt}>{'+ ' + (balance).toFixed(2)}</Text>)
        }
    }

    /**
     * 获取支付方式
     * @returns {*}
     */
    getPayType() {
        let payType = this.props.orderData.subType
        switch (payType) {
            case 'BANK_TRANSFER_TOPUP':
                let bankType = this.props.orderData.transferToupType
                return this.getyBankType(bankType)
            case 'BANK_TRANSFER_WITHDRAWAL':
                return '银行取款'
            case 'WECHAT_TOPUP':
                return '微信支付'
            case 'ALIPAY_TOPUP':
                return '支付宝支付'
            case 'THRIDPARTY_TOPUP':
                return '网银支付'
            case 'MANUAL_TOPUP':
                return '人工充值'
            case 'MANUAL_WITHDRAWAL':
                return '人工提款'
            case 'UNRECOGNIZED':
                return '未识别'
            case 'OTHER_TOPUP':
                return '其他支付'
            case 'JD_TOPUP':
                return '京东支付'
        }
    }

    getyBankType(type) {
        switch (type) {
            case 'BANK_ONLINE':
                return '网银转账'
            case 'BANK_ATM':
                return 'ATM自动柜员机'
            case 'BANK_ATM_CASH':
                return 'ATM现金入款'
            case 'BANK_COUNTER':
                return '银行柜台转账'
            case 'BANK_PHONE':
                return '手机银行转账'
            case 'WECHATPAY':
                return '微信账号转账'
            case 'ALIPAY':
                return '支付宝账号转账'
            case 'OTHER':
                return '其他'
            case 'UNRECOGNIZED':
                return '未识别'
        }
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: indexBgColor.mainBg,
    },
    itemStyle: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        backgroundColor: indexBgColor.itemBg,
        padding: 15,
        marginTop: 1,
        alignItems: 'center'
    }, itemTitleStyle: {
        fontSize: Size.font18,
        color: listViewTxtColor.title
    }, itemContentStyle: {
        fontSize: Size.small,
        color: listViewTxtColor.content
    }, itemGreenTxt: {
        fontSize: Size.font18,
        color: listViewTxtColor.greenTip
    }, itemRedTxt: {
        fontSize: Size.font18,
        color: listViewTxtColor.redTip
    }, itemBtnStyle: {
        paddingLeft: 20
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
    orderDetailContainer: {
        backgroundColor: buttonStyle.btnBg,
        justifyContent: 'center',
        height: 40,
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: 4,
        padding: 10,
        width: width * 0.8,
        marginTop: 20
    },
    orderDetailTxt: {
        color: buttonStyle.btnTxtColor,
        fontWeight: 'bold',
        fontSize: Size.large
    },
});
