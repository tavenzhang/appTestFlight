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

export default class TCUserMGBetDetail extends Component {

    render() {
        let {orderData} = this.props.navigation.state.params
        return (
            <View style={{flex: 1, backgroundColor: indexBgColor.mainBg}}>
                <TopNavigationBar
                    title={'投注详情'}
                    needBackButton
                    backButtonCall={() => NavigatorHelper.popToBack()}/>
                <BetOrderItemComponent title={'游戏名称'} content={orderData.gameName} />
                <BetOrderItemComponent title={'游戏类目名称'} content={orderData.categoryName} />
                <BetOrderItemComponent title={'赌注'} content={orderData.totalWager} />
                <BetOrderItemComponent title={'输赢'} content={orderData.playerWinLoss} />
                <BetOrderItemComponent title={'游戏结束时间'} content={orderData.gameEndTime.replace('T', ' ')} />
                <BetOrderItemComponent title={'交易ID'} content={orderData.transactionId} />
            </View>
        )
    }
}
