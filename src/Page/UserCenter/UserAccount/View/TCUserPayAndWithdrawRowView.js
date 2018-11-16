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
    TextInput
} from 'react-native';
import Moment from 'moment'
import {common} from '../../../asset/images'
import {Size, width, height, indexBgColor, listViewTxtColor} from '../../../resouce/theme'
export  default  class TCUserPayAndWithdrawRowView extends Component {

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
                        <Text style={styles.itemTitle}>{this.getType()}<Text style={styles.orderState}> (<Text
                            style={styles.orderStateTxt}>{this.getState()}</Text>)</Text></Text>
                    </View>
                    <View style={styles.itemRightStyle}>
                        <Text style={styles.itemTitle}>{this.getBalance()} 元</Text>
                        <Text style={styles.itemContent}>{this.getTime()}</Text>
                    </View>
                    <Image source={common.iconNext} style={styles.imgNext}/>
                </View>
            </View>

        );

    };

    getTime() {
        return Moment(this.props.rowData.createTime).format("YYYY-MM-DD HH:mm:ss")
    }

    getType() {
        return this.props.rowData.typeChineseDisplay

    }

    getState() {
        return this.props.rowData.stateChineseDisplay
    }

    getBalance() {
        let type = this.props.rowData.type
        let balance = this.props.rowData.effectiveAmount
        if (type === 'WITHDRAWAL') {
            return (<Text style={styles.itemGreenTxt}>{'- ' + (balance).toFixed(2)}</Text>)
        } else if (type === 'TOPUP' || type === 'TOPUP_FOR_CANCEL_WITHDRAWAL') {
            return (<Text style={styles.itemRedTxt}>{'+ ' + (balance).toFixed(2)}</Text>)
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
    }, itemTitle: {
        color: listViewTxtColor.title,
        fontSize: Size.font18
    }, itemContent: {
        marginTop: 5,
        color: listViewTxtColor.content,
        fontSize: Size.font12
    }, orderState: {
        fontSize: Size.small,

    }, orderStateTxt: {
        fontSize: Size.small,
        color: listViewTxtColor.redTip
    }, itemGreenTxt: {
        color: listViewTxtColor.greenTip,
        fontSize: Size.font18
    }, itemRedTxt: {
        color: listViewTxtColor.redTip,
        fontSize: Size.font18
    }

});
