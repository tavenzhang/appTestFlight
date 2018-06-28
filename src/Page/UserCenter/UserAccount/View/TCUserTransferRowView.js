'use strict'
/**
 * Created by Allen on 2016/12/10.
 */
import React, {Component} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import Moment from 'moment'
import {common} from '../../../resouce/images'
import {indexBgColor, listViewTxtColor, Size, width} from '../../../resouce/theme'

export default class TCUserTransferRowView extends Component {

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.itemStyle}>
                    <View style={styles.itemLeftStyle}>
                        <Text style={styles.itemTitle}>{'转账'}
                            <Text style={styles.orderState}>(<Text style={styles.orderStateTxt}>{this.getState()}</Text>)</Text>
                        </Text>
                    </View>
                    <View style={styles.itemRightStyle}>
                        <Text style={styles.itemRedTxt}>{this.props.rowData.amount} 元</Text>
                        <Text style={styles.itemContent}>{this.getTime()}</Text>
                    </View>
                    <Image source={common.iconNext} style={styles.imgNext}/>
                </View>
            </View>
        )
    }

    getTime() {
        return Moment(this.props.rowData.completeTime).format("YYYY-MM-DD HH:mm:ss")
    }

    getState() {
        let state = this.props.rowData.state
        if (state === 'Successful') {
            return '已完成'
        } else if (state === 'Failed') {
            return '失败'
        } else if (state === 'Handling') {
            return '处理中'
        }
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: indexBgColor.mainBg,
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
    },
    itemTitle: {
        color: listViewTxtColor.title,
        fontSize: Size.font18
    },
    itemContent: {
        marginTop: 5,
        color: listViewTxtColor.content,
        fontSize: Size.font12
    },
    orderState: {
        fontSize: Size.small,

    },
    orderStateTxt: {
        fontSize: Size.small,
        color: listViewTxtColor.redTip
    },
    itemGreenTxt: {
        color: listViewTxtColor.greenTip,
        fontSize: Size.font18
    },
    itemRedTxt: {
        color: listViewTxtColor.redTip,
        fontSize: Size.font18
    }
});
