/**
 * 个人代理佣金详情
 * Created by Joyce on 2017/6/16.
 * Copyright © 2016年 JX. All rights reserved.
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
} from 'react-native'
import BaseComponent from '../../../Base/TCBaseComponent'
import TopNavigationBar from '../../../../Common/View/TCNavigationBar';
import {Size, width, height, indexBgColor} from '../../../resouce/theme'

export default class TCPersonalCommissionDetail extends BaseComponent {
    constructor(state) {
        super(state)
    }

    static defaultProps = {};

    componentDidMount() {
        super.componentDidMount();
    }

    render() {
        return (
            <View style={styles.container}>
                <TopNavigationBar
                    ref='TopNavigationBar'
                    title={'个人佣金详情'}
                    needBackButton={true}
                    backButtonCall={() => {
                        this.props.navigator.pop()
                    }}
                />
                {this.getContentView()}
            </View>
        );

    }


    getContentView() {
        return (
            <View style={styles.contentContainer}>
                <View style={styles.itemStyle}>
                    <Text style={styles.itemTxtTitleStyle}>期数</Text>
                    <Text style={styles.itemTxtContentStyle}>{this.props.rowData.taskIdentifier}</Text>
                </View>
                <View style={styles.itemStyle}>
                    <Text style={styles.itemTxtTitleStyle}>用户名</Text>
                    <Text style={styles.itemTxtContentStyle}>{this.props.rowData.username}</Text>
                </View>
                <View style={styles.itemStyle}>
                    <Text style={styles.itemTxtTitleStyle}>投注金额</Text>
                    <Text style={styles.itemTxtContentStyle}>{this.props.rowData.sumBetsTaskPeriod}</Text>
                </View>
                <View style={styles.itemStyle}>
                    <Text style={styles.itemTxtTitleStyle}>佣金</Text>
                    <Text style={styles.itemTxtContentStyle}>{this.props.rowData.agentCommission}</Text>
                </View>
            </View>)
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: indexBgColor.mainBg,
    },
    contentContainer: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    itemStyle: {
        flexDirection: 'row',
        borderBottomWidth: 0.5,
        borderBottomColor: indexBgColor.mainBg,
        height: 40,
        alignItems: 'center',
        paddingLeft: 15,
    },
    itemTxtTitleStyle: {
        fontSize: Size.font15,
        color: '#666666',
        width: width * 0.2,
    },
    itemTxtContentStyle: {
        color: 'black',
        textAlign: 'center',
        fontSize: Size.font14,
    },
});