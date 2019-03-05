/**
 * 全部账户记录
 * Created by Allen on 2016/12/10.
 */
import React, {Component} from 'react';
import {StyleSheet, View, TouchableOpacity, ScrollView, Image, Text, ListView, RefreshControl} from 'react-native';

import {observer} from 'mobx-react';
import {observable, computed, action} from 'mobx';
import TopNavigationBar from '../../../Common/View/TCNavigationBar';
import NoDataView from '../../../Common/View/TCNoDataView';
import ListRow from './View/TCUserAccountDetailsRowView';
import {
    Size,
    indexBgColor,
    listViewTxtColor,
    width,
    shoppingTxtColor,
    agentCenter,
    refreshColor
} from '../../resouce/theme';
import Moment from 'moment';
import DatePicker from "../../../Common/View/datepicker";
import {userAccount} from '../../asset/images'
import SegmentedControlTab from "../../../Common/View/SegmentedControlTab";
import _ from "lodash";
import Toast from '../../../Common/JXHelper/JXToast'
import {withMappedNavigationProps} from "react-navigation-props-mapper";
import NavigatorHelper from "../../../Common/JXHelper/TCNavigatorHelper";
import UserAccountStore from '../../../Data/store/UserAccountStore'

/**
 * 账户明细
 */

@observer
export default class TCUserAccountDetailsNew extends Component {

    userAccountStore = new UserAccountStore();

    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    }

    static defaultProps = {};

    componentDidMount() {
        this.userAccountStore.loadDataFromNet();
    }

    componentWillUnmount() {
    }

    render() {
        return (
            <View style={styles.container}>
                <TopNavigationBar
                    title={'账变记录'}
                    needBackButton={true}
                    backButtonCall={() => {
                        NavigatorHelper.popToBack();
                    }}
                />
                <SegmentedControlTab
                    tabsContainerStyle={styles.tabsContainerStyle}
                    tabStyle={styles.tabStyle}
                    tabTextStyle={styles.tabTextStyle}
                    activeTabStyle={styles.activeTabStyle}
                    activeTabTextStyle={styles.activeTabTextStyle}
                    selectedIndex={this.userAccountStore.selected}
                    allowFontScaling={false}
                    borderRadius={0}
                    values={['全部', '充值', '提现', '投注', '派彩', '优惠']}
                    onTabPress={index => {
                        this.userAccountStore.selected = index
                        this.userAccountStore.changeType(index)
                    }}
                />
                {this.renderDate()}
                {this.userAccountStore.datas.slice().length === 0 && !this.userAccountStore.isRefreshing ? this.renderNodata() :
                    <ListView
                        ref="listView"
                        style={{marginTop: 10}}
                        removeClippedSubviews={false}
                        enableEmptySections={true}
                        scrollRenderAheadDistance={20}
                        onEndReachedThreshold={20}
                        dataSource={this.ds.cloneWithRows(this.userAccountStore.datas.slice())}
                        renderRow={(rowData, sectionID, rowID) => this.getRenderRow(rowData, sectionID, rowID)}
                        onEndReached={() => this.endReached()}
                        renderFooter={() => this.renderFooter()}
                        refreshControl={
                            <RefreshControl
                                refreshing={this.userAccountStore.isRefreshing}
                                onRefresh={() => this._updateData()}
                                tintColor="#ff0000"
                                title="下拉刷新"
                                titleColor="#999999"
                                colors={refreshColor.progress}
                                progressBackgroundColor={refreshColor.progressBackground}/>
                        }/>}
            </View>
        );
    }

    getRenderRow(rowData, sectionID, rowID) {
        return (
            <TouchableOpacity
                onPress={() => {
                    this.pressRow(rowData);
                }}
            >
                <ListRow rowData={rowData}/>
            </TouchableOpacity>
        );
    }

    /**
     * 更新数据
     */
    _updateData() {
        this.userAccountStore.updateData()
    }

    pressRow(rowData) {
        NavigatorHelper.pushToUserAcountDetail({orderData: rowData})
    }


    renderDate() {
        return (<View style={styles.dateView}>
            {this.userAccountStore.hasBeforeDay ? this.renderDayBtn(userAccount.dayBefore, "前一天", true) :
                <View style={styles.dayView}></View>}
            <View style={{height: 20, width: 1, backgroundColor: indexBgColor.mainBg}}/>
            {this.renderCalendar()}
            <View style={{height: 20, width: 1, backgroundColor: indexBgColor.mainBg}}/>
            {this.userAccountStore.hasAfterDay ? this.renderDayBtn(userAccount.dayAfter, "后一天", false) : null}
        </View>)
    }

    renderDayBtn(icon, title, isLeft) {
        return (<TouchableOpacity
            onPress={() => this.btnClick(isLeft)}
        >
            <View style={styles.dayView}>
                <Image
                    source={icon}
                    style={styles.iconView}
                />
                <Text  style={{color: agentCenter.dateTxt, marginLeft: 5}}>{title}</Text>
            </View></TouchableOpacity>)
    }

    renderCalendar() {
        return (
            <View>
                <DatePicker
                    dateTouchBody={{width: width * 0.4, justifyContent: 'center', alignItems: 'center'}}
                    date={this.userAccountStore.date}
                    mode="date"
                    format="YYYY/MM/DD"
                    confirmBtnText="确认"
                    cancelBtnText="取消"
                    showIcon={true}
                    is24Hour={true}
                    customStyles={{
                        dateIcon: {
                            width: 20,
                            height: 20,
                            marginRight: 5
                        },
                        dateInput: {
                            height: 40,
                            borderWidth: 0,
                        },
                        dateText: {
                            fontSize: Size.default,
                            color: agentCenter.dateTxt,
                        }
                    }}
                    onDateChange={date => {
                        this.userAccountStore.changeDate(date);
                    }}
                    minDate={Moment()
                        .subtract(90, 'days')
                        .format('YYYY-MM-DD')}
                    maxDate={new Date()}
                />
            </View>
        )
    }


    btnClick(flag) {
        if (flag) {
            this.userAccountStore.before();
        } else {
            this.userAccountStore.after();
        }
    }


    renderNodata() {
        return (<NoDataView
            ref='nodata'
            titleTip="暂无今日账户明细" contentTip="大奖不等待，速去购彩吧~"
        />)
    }

    renderFooter() {
        if (this.userAccountStore.foot === 1) {//加载完毕
            return (
                <View
                    style={styles.footView}>
                    <Text style={{color: listViewTxtColor.content, fontSize: Size.font12, marginTop: 10}}>
                        {this.userAccountStore.moreText}
                    </Text>
                </View>);
        } else if (this.userAccountStore.foot === 2) {//加载中
            return (
                <View
                    style={styles.footView}>
                    <Text style={{color: listViewTxtColor.content, fontSize: Size.font12, marginTop: 10}}>
                        加载中...
                    </Text>
                </View>)
        } else if (this.userAccountStore.foot === 0) {
            return null
        }
    }

    endReached() {
        if (this.userAccountStore.foot === 0) {
            return;
        }
        if (this.userAccountStore.datas.slice(0).length < this.userAccountStore.pageSize) {
            return;
        }
        this.userAccountStore.pageNum++;
        this.timer = setTimeout(
            () => {
                this.userAccountStore.loadDataFromNet()
            }, 500);
    }
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: indexBgColor.mainBg
    },
    dateView: {
        height: 40,
        flexDirection: 'row',
        width: width,
        alignItems: 'center',
        backgroundColor: indexBgColor.itemBg
    },
    dayView: {
        flexDirection: 'row',
        height: 40,
        width: width * 0.3,
        justifyContent: 'center',
        alignItems: 'center'
    }, iconView: {
        width: 20,
        height: 20
    }, tabsContainerStyle: {
        height: 45,
        backgroundColor: indexBgColor.itemBg
    },
    tabStyle: {
        borderWidth: 0,
        backgroundColor: indexBgColor.itemBg
    },
    tabTextStyle: {
        backgroundColor: indexBgColor.itemBg,
        color: listViewTxtColor.title
    },
    activeTabStyle: {
        //custom styles
        backgroundColor: indexBgColor.itemBg
    },
    activeTabTextStyle: {
        //custom styles
        color: shoppingTxtColor.tabTitlePressed
    },
    footView: {
        height: 40,
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: indexBgColor.itemBg
    }
});
