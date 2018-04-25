/**
 * Created by Joyce on 2017/07/18.
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
import {agentCenter, listViewTxtColor, Size, width, height, indexBgColor} from './../../../resouce/theme'
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
                <Text style={[styles.titleTxtStyle,  {width: width * 0.25}]}>{this.props.rowData.reportDate}</Text>
                <Text
                    style={styles.titleTxtStyle}>{this.props.rowData.username}</Text>
                <Text
                    style={styles.titleTxtStyle}>{}</Text>
                <Text
                    style={styles.titleTxtStyle}>
                        {this.props.rowData.grantTotal}
                    </Text>
                <Text
                    style={[styles.titleTxtStyle,  {width: width * 0.195}]}>{}</Text>
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
    txtGreenStyle:{
        color: 'green',
    },
    txtRedStyle:{
        color: 'red',
    }
});