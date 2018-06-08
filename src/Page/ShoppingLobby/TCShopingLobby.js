/**
 * Created by Sam on 2017/1/3.
 * Copyright © 2016年 JX. All rights reserved.
 */

import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View } from 'react-native';

import { observer } from 'mobx-react/native';

import TopNavigationBar from '../../Common/View/TCNavigationBar';
import ScrollableTabView from '../../Common/View/ScrollableTab/index';
import ScrollableTabBar from '../../Common/View/ScrollableTab/FixedFristTabBar';

import SudokuStyle from './View/TCShopingSudokuStyle';
import ListStyle from './View/TCShopingListStyle';
import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter';
import LotteryResultData from '../../Data/JXLotteryResultData';

import { Size,height,width, shoppingTxtColor, indexBgColor,bottomNavHeight,statusBarHeight,JX_PLAT_INFO } from '../resouce/theme';
import { common } from '../resouce/images';

const tabLabels = ['全部彩种', '时时彩', 'PC蛋蛋', 'PK拾', '11选5', '快3', '高频彩', '低频彩'];

@observer
export default class MyComponent extends React.Component {
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
        this.listener = RCTDeviceEventEmitter.addListener('TCShopingLobbyChangeType', selectIndex => {
            if (this.refs['ScrollableTabView']) {
                this.refs['ScrollableTabView'].goToPage(selectIndex);
                this.setState({
                    initPage: selectIndex
                });
            }
        });

        this.lotteryResultData.startCountDownTimer();
    }

    render() {
        return (
            <View style={JX_PLAT_INFO.IS_IphoneX?styles.containerIOS:styles.container}>
                <TopNavigationBar
                    title="购彩大厅"
                    needBackButton={true}
                    backButtonCall={() => {
                        RCTDeviceEventEmitter.emit('setSelectedTabNavigator', 'home');
                    }}
                    rightImage={this.state.listStyle ? common.topBarSudoku : common.topBarList}
                    rightButtonCall={() => this.rightButtonCall()}
                />
                {this.getContentView()}
            </View>
        );
    }

    getContentView() {
        if (!this.state.listStyle) {
            return (
                <ScrollableTabView
                    ref="ScrollableTabView"
                    removeClippedSubviews={false}
                    renderTabBar={() => <ScrollableTabBar />}
                    tabBarUnderlineStyle={{ backgroundColor: shoppingTxtColor.tabLine, height: 2 }}
                    tabBackgroundColor={indexBgColor.itemBg}
                    locked={true}
                    initialPage={this.state.initPage}
                    tabBarActiveTextColor={shoppingTxtColor.tabTitlePressed}
                    tabBarInactiveTextColor={shoppingTxtColor.tabTitleNormal}
                    tabBarTextStyle={{ fontSize: Size.font15, fontWeight: 'normal' }}
                >
                    {this.getListView(true)}
                </ScrollableTabView>
            );
        } else {
            return (
                <ScrollableTabView
                    ref="ScrollableTabView"
                    removeClippedSubviews={false}
                    renderTabBar={() => <ScrollableTabBar />}
                    tabBarUnderlineStyle={{ backgroundColor: shoppingTxtColor.tabLine, height: 2 }}
                    tabBackgroundColor={indexBgColor.itemBg}
                    locked={true}
                    initialPage={this.state.initPage}
                    tabBarActiveTextColor={shoppingTxtColor.tabTitlePressed}
                    tabBarInactiveTextColor={shoppingTxtColor.tabTitleNormal}
                    tabBarTextStyle={{ fontSize: Size.font15, fontWeight: 'normal' }}
                >
                    {this.getListView(false)}
                </ScrollableTabView>
            );
        }
    }

    getListView(sudoku) {
        let items = [];
        tabLabels.map((item, key) => {
            items.push(this.getItemView(sudoku, item, key));
        });
        return items;
    }

    getItemView(sudoku, title, key) {
        const params = {
            cpArray: this.lotteryResultData.resultsData ? this.lotteryResultData.resultsData : this.state.cpArray,
            key: key,
            mobData: this.lotteryResultData.countDownData,
            tabLabel: title,
            navigator: this.props.navigator
        };
        if (sudoku) {
            return <SudokuStyle {...params} />;
        } else {
            return <ListStyle {...params} />;
        }
    }

    rightButtonCall() {
        this.setState({ listStyle: !this.state.listStyle });
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: indexBgColor.mainBg
    },
    containerIOS:{
        height:height-bottomNavHeight,
        width:width,
        backgroundColor: indexBgColor.mainBg
    },
    firstTabStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 5,
        paddingRight: 5
    }
});
