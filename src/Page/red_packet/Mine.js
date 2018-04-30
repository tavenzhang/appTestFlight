'use strict'
/**
 * Created by Joyce on 2017/01/06.
 */

import React, {Component} from 'react';
import {StyleSheet, Text, View, ImageBackground} from 'react-native';
import {observer} from 'mobx-react/native';
import {observable, computed, action} from 'mobx';
import LoadingSpinnerOverlay from '../../Common/View/LoadingSpinnerOverlay'
import {Size, width, height, statusBarHeight} from '../resouce/theme';
import TopNavigationBar from './components/TCNavigationBar';
import NetUtils from '../../Common/Network/TCRequestUitls';
import {config} from '../../Common/Network/TCRequestConfig';
import RefreshListView from '../../Common/View/RefreshListView/RefreshListView';
import NoDataView from '../../Common/View/TCNoDataView';

@observer
export default class Mine extends Component {
    constructor(props) {
        super(props);
        this.stateModel = new StateModel();
    }

    render() {
        return (
            <View style={styles.container}>
                <TopNavigationBar title={'我的红包'}/>
                <ImageBackground style={styles.currentStatus} source={require('./asset/wdhb_bg.png')} resizeMode={'contain'}>
                    {this.renderStatus('红包总额', this.stateModel.totalAmount)}
                    {this.renderStatus('红包个数', this.stateModel.totalCount)}
                </ImageBackground>
                <View style={styles.listContainer}>
                    {this.renderHeader()}
                    <RefreshListView
                        ref="refreshListView"
                        isRenderFooter
                        renderRow={(rowData) => this.renderRow(rowData)}
                        loadDataFromNet={(pageNum, pageSize, callback) => this.getDataFromServer(pageNum, pageSize, callback)}
                        isNodataView={() => this.renderNoDataView()}
                        footStyle={styles.foot}
                    />
                </View>
                <LoadingSpinnerOverlay ref={component => this._modalLoadingSpinnerOverLay = component}/>
            </View>
        );
    }

    getDataFromServer(pageNum, pageSize, callBack) {
        let params = {
            moneyOperationSubTypes: ["BON_THB", "BON_FHB"],
            moneyOperationTypes: ["BONUS"],
            pageSize: pageSize,
            start: pageNum * pageSize,
        };

        NetUtils.PostUrlAndParamsAndCallback(config.api.redPacketDetails, params,
            (data) => {
                this._modalLoadingSpinnerOverLay.hide();
                if (data.rs) {
                    if (data.content) {
                        if (pageNum == 0) {
                            this.stateModel.setValues(data.content.totalAmount, data.content.totalCount);
                        }

                        callBack(data, data.content.datas && data.content.datas);
                    } else {
                        callBack(data, null);
                    }
                }
            }
        );
    }

    renderStatus(text, value) {
        return (
            <View style={styles.statusContainer}>
                <Text style={styles.statusText}>{text}:</Text>
                <Text style={styles.statusValue}>{value}</Text>
            </View>
        );
    }

    renderHeader() {
        return (
            <View style={styles.rowContainer}>
                <Text style={styles.row}>时间</Text>
                <Text style={[styles.row, styles.type]}>红包类型</Text>
                <Text style={[styles.row, styles.amount]}>金额</Text>
            </View>
        );
    }

    renderRow(rowData) {
        if (!rowData) {
            return;
        }

        return (
            <View style={styles.rowContainer}>
                <Text style={styles.row}>{rowData.processTime}</Text>
                <Text style={[styles.row, styles.type]}>{rowData.subType}</Text>
                <Text style={[styles.row, styles.amount]}>{rowData.delta}</Text>
            </View>
        );
    }

    renderNoDataView() {
        return (<NoDataView ref='NoDataView' titleTip={''} contentTip='我的红包数据为空'/>);
    }
}

class StateModel {
    @observable
    totalAmount = 0;
    @observable
    totalCount = 0;

    @action
    setValues(totalAmount, totalCount) {
        this.totalAmount = totalAmount;
        this.totalCount = totalCount;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: height - statusBarHeight,
        backgroundColor: '#C02218',
    },
    currentStatus: {
        height: 88,
        width: width - 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 10,
        paddingLeft: 10,
        paddingRight: 30,
    },
    statusContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    statusText: {
        fontSize: Size.font15,
        color: '#FFA7A7',
    },
    statusValue: {
        marginLeft: 5,
        fontSize: Size.font24,
        color: '#F0EF61',
    },
    listContainer: {
        flex: 1,
        borderRadius: 6,
        marginHorizontal: 10,
        marginBottom: 10,
        paddingBottom: 5,
        backgroundColor: '#FFF2E6',
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 44,
        width: width - 22,
        borderBottomWidth: 0.5,
        borderBottomColor: '#E7DACC',
    },
    row: {
        textAlign: 'center',
        fontSize: Size.font15,
        width: (width - 22) * 0.5,
        color: '#592115',
    },
    type: {
        width: (width - 22) * 0.25,
    },
    amount: {
        width: (width - 22) * 0.25,
    },
    foot: {
        backgroundColor: '#FFF2E6',
    },
});
