'use strict'
/**
 * 账户明细row组件
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
    TextInput
} from 'react-native';
import {common} from '../../../resouce/images'
import {Size, width, height, indexBgColor, listViewTxtColor} from '../../../resouce/theme'
export  default  class TCUserAccountRowView extends Component {

    constructor(props) {
        super(props)
        this.state = {}
    }

    static defaultProps = {};

    componentDidMount() {
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.itemStyle}>
                    <View style={styles.itemLeftStyle}>
                        <Text style={styles.itemTitle}>{this.props.rowData.type}</Text>
                        {/* <Text style={styles.itemContent}>余额：￥5.00</Text>TCUserAccountAllPage*/}
                    </View>
                    <View style={styles.itemRightStyle}>
                        <Text style={styles.itemTitle}>{this.getBalance()} 元</Text>
                        <Text
                            style={styles.itemContent}>{this.props.rowData.processTime}</Text>
                    </View>
                    <Image source={common.iconNext} style={styles.imgNext}/>
                </View>
            </View>

        );

    };


    getType() {
        let type = this.props.rowData.moneyOperationType
        let marks = this.props.rowData.remarks
        switch (type) {
            case 'WITHDRAW':
                return '提现'
            case 'TOPUP':
                return '充值'
            case 'WIN':
                if (marks === 'WIN') {
                    return '中奖'
                }
                else if (marks === 'REBATE') {
                    return '返点'
                } else {
                    return '中奖及返点'
                }
            case 'CHARGE':
                return '购彩'
            case 'TOPUP_FOR_CANCEL_WITHDRAWAL':
                return '取消提现'
        }
    }

    getState() {
        let state = this.props.rowData.state
        if (state === 'INITIALIZED') {
            return '已提交'
        } else if (state === 'IN_PROGRESS') {
            return '处理中'
        } else if (state === 'LOCK') {
            return '已锁定'
        } else if (state === 'COMPLETED') {
            return '已完成'
        } else if (state === 'AUTO_TOPUP_FAILED') {
            return '入款失败'
        } else if (state === 'FAILED') {
            return '失败'
        }
    }

    getBalance() {

        let balance = this.props.rowData.delta
        if (balance < 0) {
            return (<Text style={styles.itemGreenTxt}>{(balance).toFixed(2)}</Text>)
        } else {
            return (<Text style={styles.itemRedTxt}>{'+' + (balance).toFixed(2)}</Text>)
        }
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: indexBgColor.itemBg,
    },
    itemStyle: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        backgroundColor: indexBgColor.itemBg,
        marginTop: 1
    },
    imgNext: {
        width: 10,
        height: 15,
        position: 'absolute',
        top: 23,
        left: width * 0.9
    },
    itemLeftStyle: {
        margin: 10,
        alignSelf: 'flex-start'
    },
    itemRightStyle: {
        margin: 10,
        alignItems: 'flex-end',
        marginRight: 50
    }, itemTitle: {
        color: listViewTxtColor.title,
        fontSize: Size.font18
    }, itemContent: {
        marginTop: 5,
        color: listViewTxtColor.content,
        fontSize: Size.font12
    }, orderState: {
        fontSize: Size.small,

    }, itemGreenTxt: {
        color: listViewTxtColor.greenTip,
        fontSize: Size.font18
    }, itemRedTxt: {
        color: listViewTxtColor.redTip,
        fontSize: Size.font18
    }

});
