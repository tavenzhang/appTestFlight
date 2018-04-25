/**
 * 全部账户记录
 * Created by Allen on 2016/12/10.
 */
import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';

import { observer } from 'mobx-react/native';
import { observable, computed, action } from 'mobx';
import TopNavigationBar from '../../../Common/View/TCNavigationBar';
import NoDataView from '../../../Common/View/TCNoDataView';
import ListRow from './View/TCUserAccountDetailsRowView';
import AccountDetail from './TCUserAccountBillingDetails';
import RequestUtils from '../../../Common/Network/TCRequestUitls';
import { config } from '../../../Common/Network/TCRequestConfig';
import { Size, indexBgColor, listViewTxtColor, width } from '../../resouce/theme';
import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter';
import RefreshListView from '../../../Common/View/RefreshListView/RefreshListView';
import Moment from 'moment';

/**
 * 账户明细
 */
@observer
export default class TCUserAccountAllPage extends Component {
    constructor(props) {
        super(props);
        this.startDate = Moment().add(-90, 'd').format('YYYY-MM-DD') + ' 00:00:00';
        this.endDate = Moment().format('YYYY-MM-DD') + ' 23:59:59';
    }

    static defaultProps = {};

    componentDidMount() {}

    componentWillUnmount() {}

    render() {
        return (
            <View style={styles.container}>
                <TopNavigationBar
                    title={'账户明细'}
                    needBackButton={true}
                    backButtonCall={() => {
                        RCTDeviceEventEmitter.emit('balanceChange');
                        this.props.navigator.pop();
                    }}
                />
                <RefreshListView
                    isRenderFooter={true}
                    renderRow={(rowData, sectionID, rowID) => {
                        return this.getRenderRow(rowData, sectionID, rowID);
                    }}
                    loadDataFromNet={(pageNum, pageSize, callback) => {
                        this.loadDataFromNet(pageNum, pageSize, callback);
                    }}
                    isNodataView={() => {
                        return <NoDataView titleTip="暂无账户明细" contentTip="大奖不等待，速去购彩吧~" />;
                    }}
                />
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
                <ListRow rowData={rowData} />
            </TouchableOpacity>
        );
    }

    pressRow(rowData) {
        let { navigator } = this.props;
        if (navigator) {
            navigator.push({
                name: 'accountDetail',
                component: AccountDetail,
                passProps: {
                    ...this.props,
                    orderData: rowData
                }
            });
        }
    }

    loadDataFromNet(pageNum, pageSize, callback) {
        RequestUtils.PostUrlAndParamsAndCallback(
            config.api.balanceHistoryV2,
            { start: pageNum * pageSize, pageSize: 20 },
            response => {
                callback(response, response.content.datas);
            }
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: indexBgColor.mainBg
    }
});
