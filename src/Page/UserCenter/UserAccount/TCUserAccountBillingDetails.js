import React, {Component} from 'react';

import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Clipboard,
    ScrollView
} from 'react-native';
import TopNavigationBar from '../../../Common/View/TCNavigationBar';
import Toast from '../../../Common/JXHelper/JXToast';
import {Size, width, height, indexBgColor, listViewTxtColor, buttonStyle, copyBtnStyle} from '../../resouce/theme'
import Moment from 'moment'
import Helper from '../../../Common/JXHelper/TCNavigatorHelper'


export default class TCUserAccountBillingDetails extends Component {

    constructor(props) {
        super(props)
        this.type = this.props.orderData.type
        this.effectiveAmount = this.props.orderData.effectiveAmount
        this.amount = this.props.orderData.amount
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
            <ScrollView style={styles.container}>
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
                        <Text style={styles.itemTitleStyle}>收入： </Text>
                        <Text style={styles.itemContentStyle}>{this.props.accountType == 0? this.getPayAndWithdrawMoneyExact() : ""}</Text>
                    </View>

                    {this.getPayOrWithdraw(this.props.accountType)}

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
            </ScrollView>
        );

    };

    /**
     * 用户充值提现转账
     * @param accountType：0-提现， 1-充值， 2-转账
     */

    getPayOrWithdraw(accountType){
        if(accountType == 1){
            return(
                <View>
                    <View style={styles.itemStyle}>
                        <Text style={styles.itemTitleStyle2}>支付金额：</Text>
                        {this.props.isPayAndWithdrawRecord? this.getPayAndWithdrawMoneyExact() : this.getAccountBalance()}
                    </View>

                    <View style={styles.itemStyle}>
                        <Text style={styles.itemTitleStyle2}>优惠金额：</Text>
                        {this.props.isPayAndWithdrawRecord? this.getPayAndWithdrawMoneyRebate() :  this.getAccountBalance()}
                    </View>

                    <View style={styles.itemStyle}>
                        <Text style={styles.itemTitleStyle2}>总计金额：</Text>
                        {this.props.isPayAndWithdrawRecord ? this.getPayAndWithdrawMoney() : this.getAccountBalance()}
                    </View>
                </View>
            )
        }
    }

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
                <Text style={[styles.itemTitleStyle,{width:width*0.15}]}>备注：</Text>
                <Text style={[styles.itemContentStyle,{width:width*0.80} ]}>{notes||remarks}</Text>
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
        TW_Store.bblStore.playSoundByFile(TW_Store.bblStore.SOUND_ENUM.click);
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
     * 获取充值总额金额
     * @returns {XML}
     */
    getPayAndWithdrawMoney() {
        if (this.type === 'WITHDRAWAL') {
            return (<Text style={styles.itemGreenTxt}>{'- ' + (this.effectiveAmount).toFixed(2)}</Text>)
        } else if (this.type === 'TOPUP') {
            return (<Text style={styles.itemRedTxt}>{'+ ' + (this.effectiveAmount).toFixed(2)}</Text>)
        }
    }

    /**
     * 获取充值优惠金额
     * @returns {XML}
     */
    getPayAndWithdrawMoneyRebate(){
        let rebate = this.effectiveAmount - this.amount
        if (this.type === 'WITHDRAWAL') {
            return (<Text style={styles.itemGreenTxt}>{'- ' + (rebate).toFixed(2)}</Text>)
        } else if (this.type === 'TOPUP') {
            return (<Text style={styles.itemRedTxt}>{'+ ' + (rebate).toFixed(2)}</Text>)
        }
        return rebate
    }

    /**
     * 获取充值支付金额
     * @returns {XML}
     */
    getPayAndWithdrawMoneyExact(){
        let topUp = this.amount
        if (this.type === 'WITHDRAWAL') {
            return (<Text style={styles.itemGreenTxt}>{'- ' + (topUp).toFixed(2)}</Text>)
        } else if (this.type === 'TOPUP') {
            return (<Text style={styles.itemRedTxt}>{'+ ' + (topUp).toFixed(2)}</Text>)
        }
        return topUp
    }
    /**
     * 获取支付方式
     * @returns {*}
     */
    getPayType() {
        let pay = this.props.orderData.subTypeChineseDisplay
        return pay
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height:240,
        backgroundColor: indexBgColor.mainBg,
    },
    itemStyle: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        backgroundColor: indexBgColor.itemBg,
        padding: 10,
        marginTop: 1,
        alignItems: 'center',
        // flexWrap:'wrap'
    }, itemTitleStyle: {
        fontSize: Size.font18,
        color: listViewTxtColor.title
    },itemTitleStyle2: {
        fontSize: Size.font16,
        color: listViewTxtColor.title,
        padding:10,
    }, itemContentStyle: {
        fontSize: Size.small,
        color: listViewTxtColor.content,
        paddingRight:10
    }, itemGreenTxt: {
        fontSize: Size.font16,
        color: listViewTxtColor.greenTip
    }, itemRedTxt: {
        fontSize: Size.font16,
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

