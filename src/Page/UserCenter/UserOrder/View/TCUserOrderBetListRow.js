/**
 * Created by Allen on 2017/2/7.
 * Copyright © 2016年 JX. All rights reserved.
 */

import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View } from 'react-native';
import { Size, width, height, indexBgColor, listViewTxtColor } from '../../../resouce/theme';
export default class TCUserOrderBetListRow extends React.Component {
    constructor(state) {
        super(state);
        this.state = {};
    }

    static defaultProps = {};

    componentDidMount() {}

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.titleTxtStyle}>{this.props.rowData.betString}</Text>
                <Text style={styles.titleTxtStyle}>{this.props.orderPerMoney.toFixed(2)}</Text>
                <Text style={styles.titleTxtStyle}>{this.getOrderState(this.props.rowData.bonus)}</Text>
            </View>
        );
    }

    getOrderState(bonus) {
        let {orderState} = this.props;

        let {transactionState, transactionStateName} = this.props.orderState
        JXLog("transactionState:", transactionState)
        JXLog("transactionStateName:", transactionStateName)
        switch (transactionState){
            case 'WIN':
                if (bonus !== 0) {
                    return <Text style={{color: listViewTxtColor.redTip}}>中{bonus.toFixed(3)}元</Text>;
                } else {
                    return '未中奖';
                }
            case 'PENDING':
            case 'LOSS':
                return transactionStateName;
            case 'CANCELLED':
                return '已取消';
        }

        if (orderState === 'PENDING') {
            return '待开奖';
        } else if (orderState === 'CANCELLED') {
            return '已取消';
        } else {
            if (bonus !== 0) {
                return <Text style={{color: listViewTxtColor.redTip}}>中{bonus.toFixed(3)}元</Text>;
            } else {
                return '未中奖';
            }
        }
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: indexBgColor.itemBg,
        flexDirection: 'row',
        width: width - 40,
        alignItems: 'center'
    },
    titleTxtStyle: {
        color: listViewTxtColor.content,
        textAlign: 'center',
        fontSize: Size.font15,
        marginTop: 5,
        width: (width - 40) / 3,
        marginBottom: 5
    }
});
