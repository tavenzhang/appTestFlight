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

import { Size,height,width, shoppingTxtColor, indexBgColor,bottomNavHeight} from '../resouce/theme';
import {JX_PLAT_INFO} from '../../Common/Const/ScreenInfo'
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

    componentWillUpdate() {
        JX_LayoutAnimaton.configureNext(JX_LayoutAnimaton.easeNoDelete)
    }

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
                    rightButtonCall={this.rightButtonCall}
                />
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
                    {
                        tabLabels.map((item, key) => {
                            return this.getItemView(this.state.listStyle, item, key);
                        })
                    }
                </ScrollableTabView>

            </View>
        );
    }


    getItemView(isListStyle, title, key) {
        const params = {
            cpArray: this.lotteryResultData.resultsData ? this.lotteryResultData.resultsData : this.state.cpArray,
            key: key,
            mobData: this.lotteryResultData.countDownData,
            tabLabel: title,
            navigator: this.props.navigator
        };
        return isListStyle ? <ListStyle {...params} />:<SudokuStyle {...params} />

    }

    rightButtonCall=()=> {
        this.setState({ listStyle: !this.state.listStyle});
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
