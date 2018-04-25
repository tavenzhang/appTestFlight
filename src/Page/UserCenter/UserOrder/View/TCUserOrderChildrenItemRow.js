'use strict';
/**
 * Created by Allen on 2016/12/10.
 */
import React, { Component } from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Image, TextInput, Platform } from 'react-native';
import { Size, width, indexBgColor, listViewTxtColor } from '../../../resouce/theme';
import { common } from '../../../resouce/images';
export default class TCUserOrderChildrenItemRow extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    static defaultProps = {};

    componentDidMount() {}

    render() {
        let { orderChildrenData, gameName } = this.props;
        return (
            <View>
                <View style={styles.itemStyle}>
                    <View style={styles.itemLeftStyle}>
                        <Text style={[styles.itemTitle, { fontSize: Size.font14 }]}>{gameName}</Text>
                        <Text style={styles.itemContent}>共{orderChildrenData.totalUnits}注</Text>
                    </View>

                    <View style={styles.itemMidStyle}>
                        <Text style={styles.itemTitle}>{orderChildrenData.gameMethodInChinese}</Text>
                        <Text style={styles.itemContent}>{orderChildrenData.bettingTime}</Text>
                    </View>
                    <View style={styles.itemRightStyle}>
                        <Text style={styles.itemContent1}>{orderChildrenData.bettingAmount.toFixed(2)}元</Text>
                        <Text style={styles.itemContent}>{this.getOrderState(orderChildrenData)}</Text>
                    </View>
                    <Image source={common.iconNext} style={styles.imgNext} />
                </View>
            </View>
        );
    }

    getOrderState(orderData) {
        switch (orderData.transactionState) {
            case 'PENDING':
                return '待开奖';
            case 'WIN':
                return <Text style={{ color: listViewTxtColor.redTip }}>中{orderData.winningAmount.toFixed(2)}元</Text>;
            case 'LOSS':
                return '未中奖';
            case 'CANCELLED':
                return '已取消';
            case 'CO_COMPLETE':
                return '追号完成';
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
        marginLeft: 10,
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
        width: width * 0.4,
        marginLeft: 10
    },
    itemContent1: {
        color: listViewTxtColor.content,
        fontSize: Size.font14,
        justifyContent: 'flex-end'
    }
});
