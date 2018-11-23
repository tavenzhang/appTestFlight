/**
 * 投注号码
 * Created by Allen on 2017/2/7.
 * Copyright © 2016年 JX. All rights reserved.
 */

import React, {Component} from 'react';
import {AppRegistry, StyleSheet, Text, View, ListView} from 'react-native';
import {Size, width, height, indexBgColor, listViewTxtColor, baseColor} from '../../resouce/theme';
import RowList from './View/TCUserOrderBetListRow';
import {withMappedNavigationProps} from 'react-navigation-props-mapper'

@withMappedNavigationProps()
export default class TCUserOrderBetList extends React.Component {
    constructor(state) {
        super(state);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows(this.props.ordeBetList)
        };
    }

    static defaultProps = {};

    componentDidMount() {
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.titleViewStyle}>
                    <Text style={styles.titleTxtStyle}>投注号码</Text>
                    <Text style={styles.titleTxtStyle}>投注金额</Text>
                    <Text style={styles.titleTxtStyle}>中奖情况</Text>
                </View>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this.getRenderRow.bind(this)}
                    enableEmptySections={true}
                    removeClippedSubviews={true}
                    initialListSize={50}
                    pageSize={50}
                />
            </View>
        );
    }

    getRenderRow(rowData) {
        let orderMoney = this.props.orderMoney;
        if (this.props.isCO_DontOpen) {
            orderMoney = orderMoney * this.props.multiplier;
        }
        return <RowList rowData={rowData} orderPerMoney={orderMoney} orderState={this.props.orderState}/>;
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: indexBgColor.mainBg
    },
    titleViewStyle: {
        backgroundColor: baseColor.cpDetailTitle,
        flexDirection: 'row',
        alignItems: 'center',
        width: width - 40,
        justifyContent: 'space-around'
    },
    titleTxtStyle: {
        color: listViewTxtColor.title,
        textAlign: 'center',
        fontSize: Size.default,
        paddingTop: 5,
        paddingBottom: 5
    }
});
