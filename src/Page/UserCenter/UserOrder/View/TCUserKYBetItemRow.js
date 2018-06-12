'use strict';
/**
 * Created by Allen on 2016/12/10.
 */
import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {indexBgColor, Size, width} from '../../../resouce/theme';

export default class TCUserKYBetItemRow extends Component {
    constructor(props) {
        super(props);
    }

    static defaultProps = {};

    componentDidMount() {
    }

    render() {
        let {displayName, totalWager, } = this.props.orderData;
        return (
            <View>
                <View style={{
                    paddingTop: 10,
                    paddingBottom: 10,
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: indexBgColor.itemBg,
                }}>
                    <Text style={[styles.headerTitle, {width: width * 0.15}]}>{displayName}</Text>
                    <Text style={[styles.headerTitle, {width: width * 0.15}]}>{totalWager}</Text>
                    <Text style={[styles.headerTitle, {width: width * 0.15}]}>{rebateAmount}</Text>
                    <Text style={[styles.headerTitle, {width: width * 0.15}]}>{winAmt}</Text>
                    <Text style={[styles.headerTitle, {width: width * 0.15}]}>{!settled ? "未结算" : winLoss}</Text>
                    <Text style={[styles.headerTitle, {width: width * 0.25}]}>{dateCreated.replace('T', '\n')}</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    headerTitle: {
        fontSize: Size.font14,
        textAlign: 'center'
    }
});
