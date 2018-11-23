'use strict';
/**
 * 全部下拉选择订单页面
 * Created by Allen on 2016/12/10.
 */
const msgType = {
    all: '',
    win: 'WIN',
    pending: 'PENDING',
    loss: 'LOSS',
    intelligenceBet: 'CO_IN_PROGRESS,CO_COMPLETE,CO_CANCELLED,',
    cancel: 'CANCELLED'
};

import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    TouchableOpacity,
    Image,
    ListView,
    ActivityIndicator,
    RefreshControl
} from 'react-native';

import {observer} from 'mobx-react/native';
import {observable, computed, action} from 'mobx';

import OrderItem from './View/TCUserOrderItemRow';
import OrderItemList from './TCUserOrderItemList';
import OrderChaseItemList from './TCUserOrderChaseBetList';

import NetUtils from '../../../Common/Network/TCRequestUitls';
import {config} from '../../../Common/Network/TCRequestConfig';
import {Size, listViewTxtColor, indexBgColor} from '../../resouce/theme';
import TopNavigationBar from '../../../Common/View/TCNavigationBarSelectorStyle';
import Toast from '../../../Common/JXHelper/JXToast';
import _ from 'lodash';
import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter';
import PopView from '../../../Common/View/TCSelectModal';
import NoDataView from '../../../Common/View/TCNoDataView';
import NavigatorHelper from '../../../Common/JXHelper/TCNavigatorHelper'
import RefreshListView from '../../../Common/View/RefreshListView/RefreshListView';
import {withMappedNavigationProps} from 'react-navigation-props-mapper'

@withMappedNavigationProps()
@observer
export default class TCUserOrderSelectPage extends Component {
    stateModel = new StateModel();

    constructor(props) {
        super(props);
        this.type = '';
        this.selectIndex = -1;
        this.initPage = this.props.initPage ? this.props.initPage : 0;
        this.stateModel.title = this.initialMessageType()[this.initPage];
        this.setType(this.initPage);
    }

    componentDidMount() {
    }

    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);
    }

    render() {
        return (
            <View style={styles.container}>
                <TopNavigationBar
                    ref="TopNavigationBar"
                    title={this.stateModel.title}
                    needBackButton={true}
                    centerButtonCall={() => {
                        this.showPopView();
                    }}
                    backButtonCall={() => {
                        RCTDeviceEventEmitter.emit('balanceChange', true);
                        NavigatorHelper.popToBack();
                    }}
                />
                <PopView
                    ref="TCSelectPopupView"
                    SelectorTitleArr={this.initialMessageType()}
                    selectedFunc={index => {
                        this.selectMsgType(index);
                    }}
                    selectedIndex={-1}
                />
                <RefreshListView
                    ref="refreshListView"
                    isRenderFooter={true}
                    isAllowRefresh={true}
                    renderRow={(rowData, sectionID, rowID) => {
                        return this.getRenderRow(rowData, sectionID, rowID);
                    }}
                    loadDataFromNet={(pageNum, pageSize, callback) => {
                        this.getOrderDataFromNet(pageNum, pageSize, callback);
                    }}
                    isNodataView={() => {
                        return (
                            <NoDataView
                                ref="NoDataView"
                                titleTip={this.getNoDataTip()}
                                contentTip="不要让大奖溜走，赶紧购彩去~"
                                btnTxt="立即购彩"
                                gotoDoing={() => {
                                    this.gotoBuyBet();
                                }}
                            />
                        );
                    }}
                />
            </View>
        );
    }

    getNoDataTip() {
        if (this.initPage === 0 || this.selectIndex === -1) {
            return '暂无投注记录';
        } else {
            return '暂无' + this.initialMessageType()[this.initPage] + '记录';
        }
    }

    gotoBuyBet() {
        NavigatorHelper.popToTop();
        JX_Store.mainStore.changeTab('shoping')
    }

    showPopView() {
        var popView = this.refs.TCSelectPopupView;

        if (popView.state.modalVisible) {
            popView._setModalVisible(false);
        } else {
            popView._setModalVisible(true);
        }
        if (this.selectIndex === -1) {
            this.setDefaultIndex();
        }
    }

    initialMessageType() {
        return ['全部订单', '中奖订单', '待开奖订单', '未中奖订单', '追号订单', '撤单'];
    }

    setDefaultIndex() {
        var popView = this.refs.TCSelectPopupView;
        popView._setModalSelectedIndex(this.initPage, 0);
        this.selectIndex = this.initPage;
    }

    selectMsgType(index) {
        var popView = this.refs.TCSelectPopupView;
        popView._setModalSelectedIndex(index, 0);
        let navBar = this.refs.TopNavigationBar;
        navBar.setTitle(this.initialMessageType()[index]);
        this.setType(index);
        var nodataView = this.refs.NoDataView;
        if (nodataView) {
            nodataView._setTitle('暂无' + this.initialMessageType()[index] + '记录');
        }
        this.selectIndex = index;
        this.initPage = index;
        this.updateData();
    }

    setType(index) {
        switch (index) {
            case 0:
                this.type = undefined;
                break;
            case 1:
                this.type = msgType.win;
                break;
            case 2:
                this.type = msgType.pending;
                break;
            case 3:
                this.type = msgType.loss;
                break;
            case 4:
                this.type = msgType.intelligenceBet;
                break;
            case 5:
                this.type = msgType.cancel;
                break;
        }
    }

    updateData() {
        var refreshListView = this.refs.refreshListView;
        refreshListView._updateData();
    }

    getRenderRow(rowData, sectionID, rowID) {
        return (
            <TouchableOpacity
                onPress={() => {
                    this.pressRow(rowData.transactionTimeuuid, rowData);
                }}
            >
                <OrderItem orderData={rowData}/>
            </TouchableOpacity>
        );
    }

    getOrderDataFromNet(pageNum, pageSize, callback) {
        let types = {
            currentPage: pageNum + 1,
            pageSize: pageSize
        };
        if (this.type) {
            types.state = this.type;
        }
        NetUtils.getUrlAndParamsAndCallback(config.api.orderRecord, types, data => {
            callback(data, data.content ? data.content.datas : null);
        });
    }

    pressRow(transactionTimeuuid, rowData) {
        let {navigator} = this.props;
        let CO_ORDER = false;
        if (rowData.tag == 'ICO_PARENT') {
            //智能追号父订单
            CO_ORDER = true;
        } else if (rowData.tag === 'SCO_PARENT') {
            //普追号父订单
            CO_ORDER = true;
        }

        let params = {
            transactionTimeuuid: transactionTimeuuid,
            orderType: rowData.tag
        }
        if (CO_ORDER) {
            NavigatorHelper.pushToOrderChaseItemList(params)
        } else {
            NavigatorHelper.pushToOrderItemList(params)
        }
    }
}

class StateModel {
    @observable title = '';
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: indexBgColor.mainBg
    }
});
