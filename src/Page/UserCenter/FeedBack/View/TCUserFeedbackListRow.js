/**
 * Created by Joyce on 2017/6/17.
 * Copyright © 2016年 JX. All rights reserved.
 */

import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Moment from 'moment';

import {indexBgColor, Size, width, userCenterTxtColor} from '../../../resouce/theme';

export default class TCUserFeedbackListRow extends React.Component {
    getStatus() {
        switch (this.props.rowData.status) {
            case 'NORMAL':
                return '未回复';
            case 'RESOLVED':
                return '已回复';
            default:
                return '未知状态';
        }
    }

    render() {
        let updateTimeValue = '';
        let updateTime = this.props.rowData.updateTime;
        if (updateTime && updateTime != 0) {
            updateTimeValue = Moment(updateTime * 1000).format('YYYY-MM-DD');
        }

        return (
            <View style={styles.container}>
                <Text style={[styles.content, styles.leftContent]}>{this.props.rowData.title}</Text>
                <Text style={styles.content}>{this.getStatus()}</Text>
                <Text style={[styles.content, styles.rightContent]}>{updateTimeValue}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: indexBgColor.itemBg,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 1,
        borderColor: indexBgColor.mainBg,
        paddingHorizontal: width * 0.05,
        paddingVertical: 10,
    },
    content: {
        color: userCenterTxtColor.feedBackTitle,
        textAlign: 'center',
        fontSize: Size.font14,
        marginTop: 6,
        width: width * 0.25,
        marginBottom: 6,
    },
    leftContent: {
        width: width * 0.4,
        textAlign: 'left',
    },
    rightContent: {
        textAlign: 'right',
    },
});
