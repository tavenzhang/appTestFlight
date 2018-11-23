'use strict'
/**
 * 账单详情
 * Created by Allen on 2016/12/10.
 */
import React, {Component} from 'react';
import {View} from 'react-native';
import TopNavigationBar from '../../../Common/View/TCNavigationBar';
import NavigatorHelper from "../../../Common/JXHelper/TCNavigatorHelper";
import {indexBgColor} from '../../resouce/theme'
import BetOrderItemComponent from "./BetOrderItemComponent";

export default class TCUserFGBetDetail extends Component {

    render() {
        let params = this.props.navigation.state.params;
        let {orderData} = params
        if (orderData.gt === 'fish') {
            return (
                <View style={{flex: 1, backgroundColor: indexBgColor.mainBg}}>
                    <TopNavigationBar
                        title={'投注详情'}
                        needBackButton
                        backButtonCall={() => NavigatorHelper.popToBack()}/>
                    <BetOrderItemComponent title={'游戏名称'} content={orderData.fishDetail.gameName} />
                    <BetOrderItemComponent title={'游戏类目名称'} content={orderData.fishDetail.categoryName} />
                    <BetOrderItemComponent title={'订单号'} content={orderData.fishDetail.transactionId} />
                    <BetOrderItemComponent title={'投注金额'} content={orderData.totalWager} />
                    <BetOrderItemComponent title={'输赢'} content={orderData.playerWinLoss} />
                    <BetOrderItemComponent title={'游戏开始时间'} content={orderData.fishDetail.startTime.replace('T', ' ')} />
                    <BetOrderItemComponent title={'游戏结束时间'} content={orderData.fishDetail.endTime.replace('T', ' ')} />
                </View>
            )
        } else {
            return (
                <View style={{flex: 1, backgroundColor: indexBgColor.mainBg}}>
                    <TopNavigationBar
                        title={'投注详情'}
                        needBackButton
                        backButtonCall={() => NavigatorHelper.popToBack()}/>
                    <BetOrderItemComponent title={'游戏名称'} content={orderData.detail.gameName} />
                    <BetOrderItemComponent title={'游戏类目名称'} content={orderData.detail.categoryName} />
                    <BetOrderItemComponent title={'订单号'} content={orderData.detail.transactionId} />
                    <BetOrderItemComponent title={'投注金额'} content={orderData.totalWager} />
                    <BetOrderItemComponent title={'输赢'} content={orderData.playerWinLoss} />
                    <BetOrderItemComponent title={'时间'} content={orderData.detail.time.replace('T', ' ')} />
                </View>
            )
        }
    }
}
