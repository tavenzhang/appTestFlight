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

export default class TCUserSSBetDetail extends Component {

    renderDivider() {
        return (
            <View style={{height: 10, backgroundColor: 'transparent', width: width}}/>
        )
    }

    renderHeader() {
        let {orderData} = this.props.navigation.state.params;
        return (
            <View>
                <BetOrderItemComponent title={'订单编号'} content={orderData.transactionId} />
                <BetOrderItemComponent title={'盘口'} content={orderData.oddsType} />
                <BetOrderItemComponent title={'类型'} content={orderData.playTypeIndex} />
                <BetOrderItemComponent title={'投注金额'} content={orderData.wagerStake} />
                <BetOrderItemComponent title={'盈亏'} content={orderData.settled ? orderData.winAmt : '-'} />
                {this.renderDivider()}
            </View>
        )
    }

    renderItemView(item) {
        return (
            <View>
                <BetOrderItemComponent title={'联赛名称'} content={item.leagueName+"("+item.betTypeCode+")"} />
                <BetOrderItemComponent title={'比赛时间'} content={item.matchDate.replace('T', ' ')} />
                <BetOrderItemComponent title={'对阵'} content={item.teamAName + " vs " + item.teamBName} />
                <BetOrderItemComponent title={'玩法'} content={this.getBetTypeString(item.betTypeCode, item.handicap)} />
                <BetOrderItemComponent title={'投注'} content={item.teamBetCode} />
                <BetOrderItemComponent title={'投注赔率'} content={item.wagerOdds} />
                <BetOrderItemComponent title={'比分'} content={item.finalScore} />
                {this.renderCancelReason(item.cancelReason)}
            </View>
        )
    }

    getBetTypeString(betTypeCode, handicap) {
        if (betTypeCode.indexOf('大小') < 0) {
            return betTypeCode + (handicap > 0 ? '(主队让球' + handicap + ')' : '');
        }
        return betTypeCode + (handicap > 0 ? '(' + handicap + ')' : '');
    }

    renderCancelReason(reason) {
        if (reason && reason !== '-') {
            return (
                <BetOrderItemComponent title={'取消原因'} content={reason} />
            )
        }
    }

    render() {
        let {orderData} = this.props.navigation.state.params
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
                    ListHeaderComponent={() => this.renderHeader(orderData)}
                    renderItem={({item}) => this.renderItemView(item)}/>
            </View>
        )
    }
}
