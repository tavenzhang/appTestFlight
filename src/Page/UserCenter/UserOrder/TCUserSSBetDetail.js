'use strict'
/**
 * 账单详情
 * Created by Allen on 2016/12/10.
 */
import React, {Component} from 'react';

import {Clipboard, FlatList, StyleSheet, Text, View} from 'react-native';
import TopNavigationBar from '../../../Common/View/TCNavigationBar';
import NavigatorHelper from "../../../Common/JXHelper/TCNavigatorHelper";
import Toast from '../../../Common/JXHelper/JXToast';
import {
    buttonStyle,
    copyBtnStyle,
    indexBgColor,
    listViewTxtColor,
    Size,
    width
} from '../../resouce/theme'

export default class TCUserSSBetDetail extends Component {

    renderDivider() {
        return (
            <View style={{height: 10, backgroundColor: 'transparent', width: width}}/>
        )
    }

    renderHeader(betId, oddsType, playTypeIndex, wagerStake) {
        return (
            <View>
                <View style={styles.itemStyle}>
                    <Text style={styles.itemTitleStyle}>订单编号：</Text>
                    <Text style={styles.itemContentStyle}>{betId}</Text>
                </View>
                <View style={styles.itemStyle}>
                    <Text style={styles.itemTitleStyle}>盘口：</Text>
                    <Text style={styles.itemContentStyle}>{oddsType}</Text>
                </View>
                <View style={styles.itemStyle}>
                    <Text style={styles.itemTitleStyle}>类型：</Text>
                    <Text style={styles.itemContentStyle}>{playTypeIndex}</Text>
                </View>
                <View style={styles.itemStyle}>
                    <Text style={styles.itemTitleStyle}>投注：</Text>
                    <Text style={styles.itemContentStyle}>{wagerStake}</Text>
                </View>
                {this.renderDivider()}
            </View>
        )
    }

    renderItemView(item) {
        return (
            <View>
                <View style={styles.itemStyle}>
                    <Text style={styles.itemTitleStyle}>联赛名称：</Text>
                    <Text style={styles.itemContentStyle}>{item.leagueName+"("+item.betTypeCode+")"}</Text>
                </View>
                <View style={styles.itemStyle}>
                    <Text style={styles.itemTitleStyle}>比赛时间：</Text>
                    <Text style={styles.itemContentStyle}>{item.matchDate.replace('T', ' ')}</Text>
                </View>
                <View style={styles.itemStyle}>
                    <Text style={styles.itemTitleStyle}>对阵：</Text>
                    <Text style={styles.itemContentStyle}>{item.teamAName}{' vs '}{item.teamBName}</Text>
                </View>
                <View style={styles.itemStyle}>
                    <Text style={styles.itemTitleStyle}>玩法：</Text>
                    <Text style={styles.itemContentStyle}>{item.betTypeCode}{item.handicap === 0?"":"(主队让球"+item.handicap+")"}</Text>
                </View>
                <View style={styles.itemStyle}>
                    <Text style={styles.itemTitleStyle}>下注：</Text>
                    <Text style={styles.itemContentStyle}>{item.teamBetCode}</Text>
                </View>
                <View style={styles.itemStyle}>
                    <Text style={styles.itemTitleStyle}>下注赔率：</Text>
                    <Text style={styles.itemContentStyle}>{item.wagerOdds}</Text>
                </View>
                <View style={styles.itemStyle}>
                    <Text style={styles.itemTitleStyle}>比分：</Text>
                    <Text style={styles.itemContentStyle}>{item.finalScore}</Text>
                </View>
                {this.renderCancelReason(item.cancelReason)}
            </View>
        )
    }

    renderCancelReason(reason) {
        if (reason) {
            return (
                <View style={styles.itemStyle}>
                    <Text style={styles.itemTitleStyle}>取消原因：</Text>
                    <Text style={styles.itemContentStyle}>{reason}</Text>
                </View>
            )
        }
    }

    render() {
        let {orderData} = this.props.navigation.state.params
        return (
            <View style={styles.container}>
                <TopNavigationBar
                    title={'投注详情'}
                    needBackButton
                    backButtonCall={() => NavigatorHelper.popToBack()}/>
                <FlatList
                    style={{flex: 1}}
                    data={orderData.items}
                    keyExtractor={(item, index) => "list" + index}
                    ItemSeparatorComponent={() => this.renderDivider()}
                    ListHeaderComponent={() => this.renderHeader(orderData.transactionId, orderData.oddsType, orderData.playTypeIndex, orderData.wagerStake)}
                    renderItem={({item}) => this.renderItemView(item)}/>
            </View>
        )
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
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: indexBgColor.mainBg,
    },
    itemStyle: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: indexBgColor.itemBg,
        borderBottomWidth: TCLineW,
        borderBottomColor: indexBgColor.mainBg,
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 10,
        paddingBottom: 10,
    },
    itemTitleStyle: {
        fontSize: Size.font16,
        color: listViewTxtColor.title
    },
    itemContentStyle: {
        fontSize: Size.font16,
        color: listViewTxtColor.content,
    },
    itemGreenTxt: {
        fontSize: Size.font18,
        color: listViewTxtColor.greenTip
    },
    itemRedTxt: {
        fontSize: Size.font18,
        color: listViewTxtColor.redTip
    },
    itemBtnStyle: {
        paddingLeft: 20
    },
    itemBtnTxtStyle: {
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
