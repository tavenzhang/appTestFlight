'use strict';
/**
 * Created by Allen on 2016/12/10.
 */
import React, {Component} from 'react';
import {StyleSheet, Text, View, Dimensions, TouchableOpacity, Image, TextInput, Platform} from 'react-native';
import {common} from '../../../resouce/images';
import {Size, width, height, indexBgColor, listViewTxtColor} from '../../../resouce/theme';
export default class TCUserOrderItemRow extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    static defaultProps = {};

    componentDidMount() {
    }

    render() {
        let {orderData} = this.props;

        let leftDownLabelText = '共' + orderData.totalUnits + '注';
        let centerUpLabelText = '第' + orderData.gameIssueNo + '期';
        let costAmount = orderData.transactionAmount;
        if (orderData.tag == 'ICO_PARENT') {
            //智能追号父订单
            leftDownLabelText = '智能追号';
            centerUpLabelText = '共' + orderData.issueAmount + '期';
            costAmount = orderData.costAmount;
        } else if (orderData.tag === 'SCO_PARENT') {
            //普追号父订单
            leftDownLabelText = '普通追号';
            centerUpLabelText = '共' + orderData.issueAmount + '期';
            costAmount = orderData.costAmount;
        }

        return (
            <View>
                <View style={[styles.itemStyle]}>
                    {this.getLeftView(orderData, leftDownLabelText)}
                    <View style={styles.itemMidStyle}>
                        <Text style={styles.itemTitle}>{centerUpLabelText}</Text>
                        <Text style={styles.itemContent}>{orderData.bettingTime}</Text>
                    </View>
                    <View style={styles.itemRightStyle}>
                        <Text style={styles.itemContent1}>{costAmount.toFixed(2)} 元</Text>
                        <Text style={styles.itemContent}>{this.getOrderState(orderData)}</Text>
                    </View>
                    <Image source={common.iconNext} style={styles.imgNext}/>
                </View>
            </View>
        );
    }

    getLeftView(orderData, leftDownLabelText) {
        let titleView = (
            <View style={styles.itemLeftTitleStyle}>
                <Text style={styles.itemTitle}>{orderData.gameNameInChinese}</Text>
            </View>
        );
        let leftDownView = <Text style={[styles.itemContent]}>{leftDownLabelText}</Text>;
        if (orderData.tag == 'ICO_PARENT') {
            //智能追号父订单
            leftDownView = (
                <View style={styles.itemLeftTitleStyle}>
                    <View
                        style={{
                            borderRadius: 10,
                            width: 20,
                            height: 20,
                            backgroundColor: '#45d2ff',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginRight: 3
                        }}
                    >
                        <Text style={{color: 'white', fontSize: Size.font12}}>智</Text>
                    </View>
                    <Text style={styles.itemContent}>{leftDownLabelText}</Text>
                </View>
            );
        } else if (orderData.tag === 'SCO_PARENT') {
            //普追号父订单
            leftDownView = (
                <View style={styles.itemLeftTitleStyle}>
                    <View
                        style={{
                            borderRadius: 10,
                            width: 20,
                            height: 20,
                            backgroundColor: '#40d96e',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginRight: 1
                        }}
                    >
                        <Text style={{color: 'white', fontSize: Size.font12}}>普</Text>
                    </View>
                    <Text style={styles.itemContent}>{leftDownLabelText}</Text>
                </View>
            );
        }
        return (
            <View style={styles.itemLeftStyle}>
                {titleView}
                {leftDownView}
            </View>
        );
    }

    getOrderState(orderData) {
        switch (orderData.transactionState) {
            case 'PENDING':
                return '待开奖';
            case 'WIN':
                return <Text style={{color: listViewTxtColor.redTip}}>中{orderData.winAmount.toFixed(2)}元</Text>;
            case 'LOSS':
                return '未中奖';
            case 'CANCELLED':
                return '已取消';
            case 'CO_CANCELLED':
                return '追号已取消';
            case 'CO_COMPLETE':
                return '追号完成';
            case 'CO_CANCELLED':
                return '追号已取消';
            case 'CO_IN_PROGRESS':
                return '追号中';
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    itemStyle: {
        flexDirection: 'row',
        backgroundColor: indexBgColor.itemBg,
        marginTop: 1,
        padding: 10
    },
    itemLeftTitleStyle: {
        flexDirection: 'row',
        backgroundColor: indexBgColor.itemBg,
        alignItems: 'center'
        // justifyContent: 'center'
    },
    imgNext: {
        width: 10,
        height: 15,
        position: 'absolute',
        top: 23,
        left: width * 0.95
    },
    itemLeftStyle: {
        alignItems: 'center',
        width: width * 0.26
    },
    itemRightStyle: {
        alignItems: 'center',
        marginRight: 20,
        marginLeft: 5,
        width: width * 0.2
    },
    itemTitle: {
        color: listViewTxtColor.title,
        fontSize: Size.font15
    },
    itemContent: {
        marginTop: 5,
        color: listViewTxtColor.content,
        fontSize: Size.font12
    },
    itemMidStyle: {
        alignItems: 'center',
        width: Platform.OS === 'ios' ? width * 0.42 : width * 0.4,
        marginLeft: 10
    },
    itemContent1: {
        color: listViewTxtColor.content,
        fontSize: Size.font14,
        justifyContent: 'flex-end'
    }
});
