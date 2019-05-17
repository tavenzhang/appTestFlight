'use strict'
/**
 * 账单详情
 * Created by Allen on 2016/12/10.
 */
import React from 'react';
import {Clipboard, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {withMappedNavigationProps} from "react-navigation-props-mapper";
import TopNavigationBar from '../../../Common/View/TCNavigationBar';
import Toast from '../../../Common/JXHelper/JXToast';
import {
    buttonStyle,
    copyBtnStyle,
    indexBgColor,
    listViewTxtColor,
    Size,
    width
} from '../../resouce/theme'
import Moment from "moment/moment";
import NavigatorHelper from "../../../Common/JXHelper/TCNavigatorHelper";
import JXHelper from "../../../Common/JXHelper/JXHelper";

@withMappedNavigationProps()
export default class TCUserTransferDetails extends React.Component {

    render() {
        let {transactionId, type, amount, completeTime, state, stateExplain} = this.props.orderData
        return (
            <View style={styles.container}>
                <TopNavigationBar
                    title={'转账详情'}
                    needBackButton={true}
                    backButtonCall={() => {NavigatorHelper.popToBack()}} />
                <View>
                    <View style={styles.itemStyle}>
                        <Text style={styles.itemTitleStyle}>订单号：</Text>
                        <Text selectable={true}
                              style={styles.itemContentStyle}>{this.formatOrderId(transactionId)}
                        </Text>
                        <TouchableOpacity onPress={() => {this.onCopy(transactionId)}}>
                            <View style={styles.itemBtnStyle}>
                                <Text style={styles.itemBtnTxtStyle}>复制</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.itemStyle}>
                        <Text style={styles.itemTitleStyle}>类型：</Text>
                        <Text style={styles.itemContentStyle}>{this.getType(type)}</Text>
                    </View>
                    <View style={styles.itemStyle}>
                        <Text style={styles.itemTitleStyle}>金额：</Text>
                        <Text style={styles.itemRedTxt}>{amount}</Text>
                    </View>
                    <View style={styles.itemStyle}>
                        <Text style={styles.itemTitleStyle}>时间：</Text>
                        <Text style={styles.itemContentStyle}>{this.getTime(completeTime)}</Text>
                    </View>
                    <View style={styles.itemStyle}>
                        <Text style={styles.itemTitleStyle}>状态：</Text>
                        <Text style={styles.itemContentStyle}>{this.getState(state)}</Text>
                    </View>
                    <View style={styles.itemStyle}>
                        <Text style={styles.itemTitleStyle}>备注：</Text>
                        <Text style={styles.itemContentStyle}>{stateExplain}</Text>
                    </View>
                </View>
            </View>
        )
    };

    getType(type) {
        let platforms = JXHelper.getDSFOpenList().dsfAll
        let platform = this.props.orderData.gamePlatform
        let platformInChinese = ''
        let pf = platforms.find(p => p.gamePlatform === platform)
        if (pf) {
            platformInChinese = pf.gameNameInChinese
        }
        if (type === 'TopUp') {
            return '从中心钱包转出到' + platformInChinese
        }
        return '从' + platformInChinese + '转入到中心钱包'
    }

    getTime(completeTime) {
        return Moment(completeTime).format("YYYY-MM-DD HH:mm:ss")
    }

    getState(state) {
        if (state === 'COMPLETED') {
            return '成功'
        } else if (state === 'FAILED') {
            return '失败'
        } else if (state === 'HANDLING') {
            return '处理中'
        }
        return ''
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
        color: listViewTxtColor.content,
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
