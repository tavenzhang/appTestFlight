'use strict'
/**
 * 账单详情
 * Created by Allen on 2016/12/10.
 */
import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import TopNavigationBar from '../../../Common/View/TCNavigationBar';
import NavigatorHelper from "../../../Common/JXHelper/TCNavigatorHelper";
import {indexBgColor, listViewTxtColor, Size} from '../../resouce/theme'

export default class TCUserMGBetDetail extends Component {

    render() {
        let {orderData} = this.props.navigation.state.params
        return (
            <View style={styles.container}>
                <TopNavigationBar
                    title={'投注详情'}
                    needBackButton
                    backButtonCall={() => NavigatorHelper.popToBack()}/>
                <View style={styles.itemStyle}>
                    <Text style={styles.itemTitleStyle}>游戏名称：</Text>
                    <Text style={styles.itemContentStyle}>{orderData.gameName}</Text>
                </View>
                <View style={styles.itemStyle}>
                    <Text style={styles.itemTitleStyle}>游戏类目名称：</Text>
                    <Text style={styles.itemContentStyle}>{orderData.categoryName}</Text>
                </View>
                <View style={styles.itemStyle}>
                    <Text style={styles.itemTitleStyle}>游戏结束时间：</Text>
                    <Text style={styles.itemContentStyle}>{orderData.gameEndTime.replace('T', ' ')}</Text>
                </View>
                <View style={styles.itemStyle}>
                    <Text style={styles.itemTitleStyle}>赌注：</Text>
                    <Text style={styles.itemContentStyle}>{orderData.totalWager}</Text>
                </View>
                <View style={styles.itemStyle}>
                    <Text style={styles.itemTitleStyle}>输赢：</Text>
                    <Text style={styles.itemContentStyle}>{orderData.playerWinLoss}</Text>
                </View>
                <View style={styles.itemStyle}>
                    <Text style={styles.itemTitleStyle}>交易ID：</Text>
                    <Text style={styles.itemContentStyle}>{orderData.transactionId}</Text>
                </View>
            </View>
        )
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
        flex: 1,
        textAlign:'right',
        fontSize: Size.font16,
        color: listViewTxtColor.content,
    },
})
