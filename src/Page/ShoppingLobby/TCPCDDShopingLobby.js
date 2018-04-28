/**
 * Created by Sam on 2017/1/3.
 * Copyright © 2016年 JX. All rights reserved.
 */

import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, AppState, Platform } from 'react-native';

import { observer } from 'mobx-react/native';

import TopNavigationBar from '../../Common/View/TCNavigationBar';

import ListStyle from './View/TCShopingListStyle';
import BackBaseComponent from '../Base/TCBaseBackComponent';
import LotteryResultData from '../../Data/JXLotteryResultData';
import { indexBgColor } from '../resouce/theme';
import TCNavigatorHelper from '../../Common/JXHelper/TCNavigatorHelper'

@observer
export default class MyComponent extends BackBaseComponent {
    constructor(state) {
        super(state);
        this.state = {
            listStyle: true,
            cpArray: this.props.cpArray,
            initPage: 0
        };
    }

    static defaultProps = {};

    componentWillMount() {
        this.lotteryResultData = new LotteryResultData();
    }

    componentDidMount() {
        super.componentDidMount();
        this.lotteryResultData.startCountDownTimer();
    }

    render() {
        return (
            <View style={styles.container}>
                <TopNavigationBar
                    title="PC蛋蛋"
                    needBackButton={true}
                    backButtonCall={() => {
                        NavigatorHelper.popToBack()
                    }}
                />
                {this.getContentView()}
            </View>
        );
    }

    getContentView() {
        return (
            <ListStyle
                cpArray={this.lotteryResultData.resultsData ? this.lotteryResultData.resultsData : this.state.cpArray}
                mobData={this.lotteryResultData.countDownData}
                key={2}
                tabLabel="PC蛋蛋"
                navigator={this.props.navigator}
            />
        );
    }

    rightButtonCall() {
        this.setState({ listStyle: !this.state.listStyle });
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: indexBgColor.mainBg
    }
});
