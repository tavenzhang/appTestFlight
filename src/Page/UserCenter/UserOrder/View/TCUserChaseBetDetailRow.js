'use strict'
/**
 * Created by Allen on 2016/12/10.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    TouchableOpacity,
    Image,
    TextInput,
    Platform
} from 'react-native';
import {common} from '../../../asset/images'
import {Size, width, height, indexBgColor, listViewTxtColor} from  '../../../resouce/theme'

const is_numeric = (value) => {
    if (typeof(value) === 'object') {
        return false;
    } else {
        return !Number.isNaN(Number(value));
    }
};

export  default  class TCUserOrderItemRow extends Component {

    constructor(props) {
        super(props)
        this.state = {}
    }

    static defaultProps = {
        rowID: 0
    };

    componentDidMount() {
    }

    render() {
        let {orderData} = this.props
        orderData.gameNameInChinese = this.props.gameName

        let leftDownLabelText = '共' + orderData.multiplier + '倍'
        let centerUpLabelText = '第' + orderData.issueNo + '期'
        let centerDownLabelText = '追号第' + (1 + parseInt(this.props.rowID)) + '期'

        let costAmount = orderData.cost

        return (
            <View>
                <View style={styles.itemStyle}>
                    {this.getLeftView(orderData, leftDownLabelText,)}
                    <View style={styles.itemMidStyle}>
                        <Text style={styles.itemTitle}>{centerUpLabelText}</Text>
                        <Text style={styles.itemContent}>{centerDownLabelText}</Text>
                    </View>
                    <View style={styles.itemRightStyle}>
                        <Text style={styles.itemContent1}>{(costAmount).toFixed(2)}元</Text>
                        <Text style={styles.itemContent}>{this.getOrderState(orderData.childOrderStateName)}</Text>
                    </View>
                    <Image source={common.iconNext} style={styles.imgNext}/>
                </View>
            </View>
        );
    };

    getLeftView(orderData, leftDownLabelText) {
        let titleView = <Text style={styles.itemTitle}>{orderData.gameNameInChinese}</Text>;
        let marginLeft = 15;
        if (this.props.orderType == 'ICO_PARENT') {
            //智能追号父订单
            titleView = (
                <View style={styles.itemLeftTitleStyle}>
                    <View
                        style={{
                            borderRadius: 8,
                            width: 16,
                            height: 16,
                            backgroundColor: '#45d2ff',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginRight: 1
                        }}
                    >
                        <Text style={{color: 'white', fontSize: Size.font11}}>智</Text>
                    </View>
                    <Text style={[styles.itemTitle, {fontSize: Size.font14}]}>{orderData.gameNameInChinese}</Text>
                </View>
            );
        } else if (this.props.orderType === 'SCO_PARENT') {
            //普追号父订单
            titleView = (
                <View style={styles.itemLeftTitleStyle}>
                    <View
                        style={{
                            borderRadius: 8,
                            width: 16,
                            height: 16,
                            backgroundColor: '#40d96e',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginRight: 1
                        }}
                    >
                        <Text style={{color: 'white', fontSize: Size.font11}}>普</Text>
                    </View>
                    <Text style={[styles.itemTitle, {fontSize: Size.font14}]}>{orderData.gameNameInChinese}</Text>
                </View>
            );
        }
        return (
            <View style={styles.itemLeftStyle}>
                {titleView}
                <Text style={styles.itemContent}>{leftDownLabelText}</Text>
            </View>
        );
    }

    getOrderState(transactionStateName){
        if (is_numeric(transactionStateName)) {
            return <Text style={{color: listViewTxtColor.redTip}}>中{transactionStateName}元</Text>;
        }
        return transactionStateName;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
        alignItems: 'center',
        justifyContent: 'center'
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
    },
    itemRightStyle: {
        alignItems: 'center',
        marginRight: 20,
        marginLeft: 5,
        width: width * 0.2
    }, itemTitle: {
        color: listViewTxtColor.title,
        fontSize: Size.font15
    }, itemContent: {
        marginTop: 5,
        color: listViewTxtColor.content,
        fontSize: Size.font12
    }, itemMidStyle: {
        alignItems: 'center',
        width: Platform.OS === 'ios' ? width * 0.42 : width * 0.4,
        marginLeft: 10
    }, itemContent1: {
        color: listViewTxtColor.content,
        fontSize: Size.font14,
        justifyContent: 'flex-end'
    }

});
