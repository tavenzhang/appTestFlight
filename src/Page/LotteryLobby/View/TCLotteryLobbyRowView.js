/**
 * Created by Sam on 2016/11/11.
 */

import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, TouchableHighlight, Image } from 'react-native';

import NumbersView from '../../../Common/View/TCLotteryNumbersView';
import JXHelper from '../../../Common/JXHelper/JXHelper';
import { width, indexBgColor, lotteryTxtColor, lotterBgColor, Size } from '../../resouce/theme';
import { common } from '../../resouce/images';

export default class TCLotteryLobbyRowView extends React.Component {
    constructor(state) {
        super(state);
        this.state = {};
    }

    static defaultProps = {
        cpName: '',
        cpDate: '',
        cpNumbers: null,
        openStatus: true,
        pushEvent: null,
        rowData: null
    };

    componentDidMount() {}

    render() {
        let planNoNow = '';
        if (this.props.rowData.lastPlanNo) {
            planNoNow = this.props.rowData.lastPlanNo.toString();
            planNoNow = planNoNow.length < 3 ? '0' + planNoNow : planNoNow;
        }
        return (
            <TouchableHighlight onPress={this.pushToBet.bind(this)} underlayColor={indexBgColor.mainBg}>
                <View style={styles.mainStyle}>
                    <Image
                        source={JXHelper.getGameIconWithUniqueId(this.props.rowData.gameUniqueId)}
                        style={{ backgroundColor: indexBgColor.itemBg, width: 50, height: 50, marginLeft: 7 }}
                    />
                    <View style={styles.container}>
                        <View style={styles.topTitleViewStyle}>
                            <Text style={styles.topTitleStyle}> {this.props.cpName} </Text>
                            <Text style={styles.topRightTitleStyle}>第{planNoNow}期 </Text>
                            <Text style={styles.topBottomTitleStyle}>{this.getTime()}</Text>
                        </View>
                        {this.getResultView()}
                    </View>
                </View>
            </TouchableHighlight>
        );
    }

    getTime() {
        let format = 'YYYY-MM-DD HH:mm:ss';
        if (width < 375) {
            format = 'MM-DD HH:mm';
        }
        return JXHelper.getTimeRegularTimeZone(this.props.rowData.lastOpenTime, format);
    }

    getResultView() {
        if (this.props.openStatus && this.props.cpNumbers != null) {
            if (this.props.cpNumbers != null) {
                return (
                    <NumbersView
                        data={this.props.rowData}
                        cpNumbers={this.props.cpNumbers.split(',')}
                        style={{ marginRight: 10, width: width }}
                        showStyle={this.props.rowData.gameUniqueId}
                    />
                );
            }
        } else {
            return (
                <View style={styles.contentViewStyle}>
                    <Text style={styles.contentTextStyle}>等待开奖</Text>
                </View>
            );
        }
    }

    pushToBet() {
        if (this.props.pushEvent == null) return;
        this.props.pushEvent(this.props.cpName);
    }
}

const styles = StyleSheet.create({
    mainStyle: {
        flexDirection: 'row',
        width: width,
        backgroundColor: indexBgColor.itemBg,
        marginBottom: 0.5,
        alignItems: 'center'
    },
    container: {
        backgroundColor: indexBgColor.itemBg,
        width: width - 60,
        marginBottom: 0.8
    },
    topTitleViewStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 10,
        marginTop: 10
    },
    topTitleStyle: {
        fontSize: Size.font16,
        color: lotteryTxtColor.cpTitle
    },
    topBottomTitleStyle: {
        fontSize: Size.font12,
        color: lotteryTxtColor.cpDate,
        marginLeft: 5
    },
    topRightTitleStyle: {
        fontSize: Size.font15,
        color: lotteryTxtColor.cpLastIssueNumber,
        marginLeft: 5
    },
    contentViewStyle: {
        marginBottom: 15,
        marginLeft: 20,
        backgroundColor: lotterBgColor.waitLotteryBg,
        borderRadius: 20,
        width: 160,
        marginTop: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },
    contentTextStyle: {
        fontSize: Size.font16,
        color: lotteryTxtColor.waitTxt,
        marginTop: 5,
        marginBottom: 5,
        marginRight: 5
    }
});
