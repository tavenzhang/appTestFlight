/**
 * Created by Allen on 2017/2/7.
 * Copyright © 2016年 JX. All rights reserved.
 */

import React, {
    Component
} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
} from 'react-native';
import {agentCenter, listViewTxtColor, Size, width, height, indexBgColor} from './../../../../resouce/theme'
import {common} from '../../../../resouce/images'
export default class TCAgentCommissionListRow extends React.Component {
    constructor(state) {
        super(state)
        this.state = {}
    }

    static defaultProps = {};

    componentDidMount() {
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={[styles.titleTxtStyle,  {width: width * 0.25}]}>{this.props.rowData.issueNo}</Text>
                <Text
                    style={[styles.titleTxtStyle,{color:'red'}]}>{this.props.rowData.betsSum.toFixed(2)}</Text>
                <Text
                    style={[styles.titleTxtStyle,{color:'red'}]}>{this.props.rowData.commission.toFixed(2)}</Text>
                <Text
                    style={styles.titleTxtStyle}>{this.props.rowData.userCount}</Text>


                <Text
                    style={[styles.titleTxtStyle,  {width: width * 0.15}]}>{this.getStatus()}</Text>
                <Image source={common.iconNext} resizeMode='contain' style={styles.imgNext}/>
            </View>
        );
    }

    getStatus() {

        switch (this.props.rowData.status) {
            case 'UNTREATED':
                return '待退佣'
            case 'NOT_REACHED_THRESHOLD':
                return '未达到门槛'
            case 'RETURNED_COMMISSION':
                return '已退佣'
            case 'BEING_STATISTICS':
                return '统计中'
            case 'COMPLETE':
                return '已发'
            default:
                return '未知状态'
        }
    }

}


const styles = StyleSheet.create({
    container: {
        backgroundColor: indexBgColor.itemBg,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 1,
        paddingVertical: 5,
    }, titleTxtStyle: {
        color: agentCenter.title,
        textAlign: 'center',
        fontSize: Size.font14,
        marginTop: 6,
        width: width * 0.185,
        marginBottom: 6
    },
    imgNext: {
        width: width * 0.045,
        height: 15,
        paddingRight: 15,
    },
});