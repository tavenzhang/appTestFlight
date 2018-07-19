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

export default class TCUserKYBetDetail extends Component {

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
                <BetOrderItemComponent title={'房间'} content={orderData.serverName} />
                <BetOrderItemComponent title={'桌子号'} content={orderData.tableId} />
                <BetOrderItemComponent title={'椅子号'} content={orderData.chairId} />
                <BetOrderItemComponent title={'玩家数量'} content={orderData.userCount} />
                <BetOrderItemComponent title={'手牌公共牌'} content={orderData.cardValue} />
                <BetOrderItemComponent title={'总下注'} content={orderData.allBet} />
                <BetOrderItemComponent title={'有效下注'} content={orderData.cellScore} />
                <BetOrderItemComponent title={'游戏开始时间'} content={orderData.gameStartTime} />
                <BetOrderItemComponent title={'游戏结束时间'} content={orderData.gameEndTime} />
            </View>
        )
    }
}
