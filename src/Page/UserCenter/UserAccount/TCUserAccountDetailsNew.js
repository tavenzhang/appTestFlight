/**
 * 全部账户记录
 * Created by Allen on 2016/12/10.
 */
import React, {Component} from 'react';
import {StyleSheet, View, TouchableOpacity, ScrollView, Image, Text, ListView, RefreshControl} from 'react-native';

import {observer} from 'mobx-react/native';
import {observable, computed, action} from 'mobx';
import TopNavigationBar from '../../../Common/View/TCNavigationBar';
import NoDataView from '../../../Common/View/TCNoDataView';
import ListRow from './View/TCUserAccountDetailsRowView';
import AccountDetail from './TCUserAccountBillingDetails';
import RequestUtils from '../../../Common/Network/TCRequestUitls';
import {config} from '../../../Common/Network/TCRequestConfig';
import {Size, indexBgColor, listViewTxtColor, width, shoppingTxtColor, agentCenter} from '../../resouce/theme';
import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter';
import Moment from 'moment';
import DatePicker from "../../../Common/View/datepicker";
import {userAccount} from '../../resouce/images'
import SegmentedControlTab from "../../../Common/View/SegmentedControlTab";
import _ from "lodash";
import Toast from '../../../Common/JXHelper/JXToast'
import {withMappedNavigationProps} from "react-navigation-props-mapper";
import NavigatorHelper from "../../../Common/JXHelper/TCNavigatorHelper";


/**
 * 账户明细
 */
@withMappedNavigationProps()
@observer
export default class TCUserAccountAllPage extends Component {

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
                    title={'账户明细'}
                    needBackButton={true}
                    backButtonCall={() => {
                        RCTDeviceEventEmitter.emit('balanceChange');
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
                    values={['全部', '充值', '提现', '礼金', '投注']}
                    onTabPress={index => {
                        this.userAccountStore.selected = index
                        this.userAccountStore.changeType(index)
                    }}
                />
                {this.renderDate()}
                {this.userAccountStore.datas.slice(0).length === 0 && !this.userAccountStore.isRefreshing ? this.renderNodata() :
                    <ListView
                        ref="listView"
                        style={{marginTop: 10}}
                        removeClippedSubviews={false}
                        enableEmptySections={true}
                        scrollRenderAheadDistance={20}
                        onEndReachedThreshold={20}
                        dataSource={this.ds.cloneWithRows(this.userAccountStore.datas.slice(0))}
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
                                colors={['#ff0000', '#00ff00', '#0000ff']}
                                progressBackgroundColor="#ffff00"/>
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


class UserAccountStore {
    constructor() {
    }

    @observable
    selected = 0
    @observable
    date = Moment().format('YYYY-MM-DD')
    @observable
    hasBeforeDay = true;
    @observable
    hasAfterDay = false;

    @observable
    datas = [];

    pageSize = 20;
    @observable
    foot = 0

    @observable
    moreText

    pagingState = ""

    @observable
    isRefreshing = true;

    pageNum = 1;

    type = null;

    @action
    before() {
        this.isRefreshing = true
        this.date = Moment(this.date)
            .subtract(1, 'days')
            .format('YYYY-MM-DD');
        let days = Moment().diff(this.date, 'days');
        if (days < 90) {
            this.hasAfterDay = true;
        } else {
            this.hasBeforeDay = false;
        }
        this.clearData();
    }

    clearData() {
        this.datas = [];
        this.pageNum = 1;
        this.pagingState = "";
        this.foot = 0;
        this.loadDataFromNet();
    }

    @action
    after() {
        this.date = Moment(this.date)
            .add(1, 'days')
            .format('YYYY-MM-DD');
        let days = Moment().diff(this.date, 'days');
        if (days > 0) {
            this.hasBeforeDay = true;
        } else {
            this.hasAfterDay = false;
        }
        this.clearData();
    }

    @action
    changeDate(date) {
        let days = Moment().diff(date, 'days');
        this.isRefreshing = true;
        if (days <= 0) {
            this.hasBeforeDay = true;
            this.hasAfterDay = false;
        } else if (days >= 90) {
            this.hasBeforeDay = false;
            this.hasAfterDay = true;
        } else {
            this.hasAfterDay = true;
            this.hasBeforeDay = true;
        }
        this.date = Moment(date).format('YYYY-MM-DD');
        this.clearData();
    }

    changeType(type) {
        this.isRefreshing = true;
        JXLog("============TYPE", typeof type);
        switch (type) {
            case 0:
                this.type = null;
                break;
            case 1:
                this.type = 'TOPUP';
                break;
            case 2:
                this.type = 'WITHDRAW'
                break;
            case 3:
                this.type = 'BONUS';
                break;
            case 4:
                this.type = 'CHARGE';
                break;
        }
        this.clearData();
    }

    loadDataFromNet() {
        let params = {
            date: this.date,
            pagingState: this.pagingState
        }
        if (this.type) {
            params.moneyOperationType = this.type;
        }

        RequestUtils.PostUrlAndParamsAndCallback(config.api.balanceByDate, params, (res) => {
            this.isRefreshing = false;
            if (res.rs) {
                this.datas = _.concat(this.datas.slice(0), res.content.datas);
                this.pagingState = res.content.pagingState;
                if (this.pageNum === 1 && this.datas.length < this.pageSize) {
                    this.foot = 0;
                } else if (this.pageNum > 1 && res.content.datas < this.pageSize) {
                    this.noMoreData();
                } else {
                    this.foot = 2;
                }
            } else {
                Toast.showShortCenter(res.message ? res.message : "网络异常，请求失败")
                this.foot = 0;
            }
        })
    }

    noMoreData() {
        this.foot = 1
        this.moreText = '没有更多数据'
    }

    @action
    updateData() {
        this.clearData();

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
