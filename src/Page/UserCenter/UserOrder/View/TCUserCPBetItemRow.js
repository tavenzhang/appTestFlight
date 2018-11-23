'use strict';
/**
 * Created by Allen on 2016/12/10.
 */
import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {indexBgColor, Size, width} from '../../../resouce/theme';

export default class TCUserCPBetItemRow extends Component {

    render() {
        let {gameNameInChinese, orderAmount, winAmount, updateTime} = this.props.orderData;
        return (
            <View>
                <View style={{
                    paddingTop: 10,
                    paddingBottom: 10,
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: indexBgColor.itemBg,
                }}>
                    <Text style={[styles.headerTitle, {width: width * 0.3}]}>{gameNameInChinese}</Text>
                    <Text style={[styles.headerTitle, {width: width * 0.2}]}>{orderAmount}</Text>
                    <Text style={[styles.headerTitle, {width: width * 0.2}]}>{winAmount}</Text>
                    <Text style={[styles.headerTitle, {width: width * 0.3}]}>{updateTime.replace('T', '\n')}</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    headerTitle: {
        fontSize: Size.font14,
        textAlign: 'center'
    }
});
