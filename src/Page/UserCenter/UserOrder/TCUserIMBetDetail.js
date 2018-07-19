'use strict'
/**
 * 账单详情
 * Created by Allen on 2016/12/10.
 */
import React, {Component} from 'react';
import {FlatList, View} from 'react-native';
import TopNavigationBar from '../../../Common/View/TCNavigationBar';
import NavigatorHelper from "../../../Common/JXHelper/TCNavigatorHelper";
import {indexBgColor, width} from '../../resouce/theme'
import BetOrderItemComponent from "./BetOrderItemComponent";

export default class TCUserIMBetDetail extends Component {

    renderDivider() {
        return (
            <View style={{height: 10, backgroundColor: 'transparent', width: width}}/>
        )
    }

    renderHeader() {
        let {orderData} = this.props.navigation.state.params;
        return (
            <View>
                <BetOrderItemComponent title={'订单编号'} content={orderData.betId} />
                <BetOrderItemComponent title={'盘口'} content={orderData.oddsType} />
                <BetOrderItemComponent title={'投注金额'} content={orderData.totalBet} />
                <BetOrderItemComponent title={'盈亏'} content={orderData.settled ? orderData.winLoss : '-'} />
                {this.renderDivider()}
            </View>
        )
    }

    renderItemView(item) {
        return (
            <View>
                <BetOrderItemComponent title={'比赛名称'} content={item.competitionName+"("+item.marker+")"} />
                <BetOrderItemComponent title={'比赛时间（GMT+8）'} content={item.eventDateTime.replace('T', ' ')} />
                <BetOrderItemComponent title={'对阵'} content={item.eventCnName} />
                <BetOrderItemComponent title={'游戏类型'} content={item.sportsName} />
                <BetOrderItemComponent title={'玩法'} content={item.betType + (item.handicap === 0?"":"(主队让球"+item.handicap+")")} />
                <BetOrderItemComponent title={'投注战队'} content={item.selection} />
                <BetOrderItemComponent title={'投注赔率'} content={item.odds} />
                <BetOrderItemComponent title={'投注时比分'} content={item.wagerScore} />
                <BetOrderItemComponent title={'全场比分'} content={item.ftScore} />
            </View>
        )
    }

    render() {
        let {orderData} = this.props.navigation.state.params;
        return (
            <View style={{flex: 1, backgroundColor: indexBgColor.mainBg}}>
                <TopNavigationBar
                    title={'投注详情'}
                    needBackButton
                    backButtonCall={() => NavigatorHelper.popToBack()}/>
                <FlatList
                    style={{flex: 1}}
                    data={orderData.items}
                    keyExtractor={(item, index) => "list" + index}
                    ItemSeparatorComponent={() => this.renderDivider()}
                    ListHeaderComponent={() => this.renderHeader()}
                    renderItem={({item}) => this.renderItemView(item)}/>
            </View>
        )
    }
}
