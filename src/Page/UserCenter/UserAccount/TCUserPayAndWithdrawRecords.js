'use strict'
/**
 * 用户充值提款列表界面
 * Created by Allen on 2016/12/10.
 */
import React, {Component} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {observer} from 'mobx-react/native'
import Moment from "moment/moment";
import NoDataView from '../../../Common/View/TCNoDataView'
import ListRow from './View/TCUserPayAndWithdrawRowView'
import RequestUtils from '../../../Common/Network/TCRequestUitls'
import {config} from '../../../Common/Network/TCRequestConfig'
import Helper from '../../../Common/JXHelper/TCNavigatorHelper'
import {indexBgColor} from '../../resouce/theme'
import RefreshListView from '../../../Common/View/RefreshListView/RefreshListView'
import  TransferRow from './View/TCUserTransferRowView'

@observer
export  default  class TCUserPayAndWithdrawRecords extends Component {

    constructor(props) {
        super(props)
    }

    static defaultProps = {};

    componentDidMount() {

    }

    render() {
        return (
            <View style={styles.container}>
                <RefreshListView
                    isRenderFooter={this.props.accountType !== 1}
                    renderRow={(rowData, sectionID, rowID) => {
                        return this.getRenderRow(rowData, sectionID, rowID)
                    }}
                    loadDataFromNet={(pageNum, pageSize, callback) => {
                        this.loadDataFromNet(pageNum, pageSize, callback)
                    }}
                    isNodataView={() => {
                        return this.getNodataView()
                    }}/>
            </View>
        );
    };

    getNodataTip() {
        var titleStr = this.props.accountType === 1 ? '暂无充值' : '暂无提现'
        switch (this.props.type) {
            case 1:
                return titleStr + '记录'
            case 2:
                return titleStr + '完成记录'
            case 3:
                return titleStr + '失败记录'
        }

    }

    getNodataView() {
        if (this.props.accountType === 1) {
            return (
                <NoDataView
                    ref='NoDataView'
                    titleTip={this.getNodataTip()}
                    contentTip="大奖不等待，速去购彩吧~"
                    btnTxt="立即充值"
                    gotoDoing={() => {
                        Helper.pushToPay()
                    }}
                />
            )
        } else {
            return (<NoDataView
                ref='NoDataView'
                titleTip={this.getNodataTip()}
                contentTip="大奖不等待，速去购彩吧~"
            />)
        }
    }

    getRenderRow(rowData, sectionID, rowID) {
        return (
            <TouchableOpacity onPress={() => {this.pressRow(rowData)}}>
                {this.props.accountType === 2 ? <TransferRow rowData={rowData} />: <ListRow rowData={rowData}/>}
            </TouchableOpacity>
        )
    }

    pressRow(rowData) {
        if (this.props.accountType === 2) {
            Helper.pushToUserTransferDetails({
                orderData: rowData,
            })
        } else {
            Helper.pushToUserAcountDetail({
                orderData: rowData,
                isPayAndWithdrawRecord: true
            })
        }
    }

    getAccountType() {
        return this.props.accountType === 1 ? 'TOPUP' : 'WITHDRAWAL'
    }

    getState() {
        switch (this.props.type) {
            case 1:
                return ''
            case 2:
                return 'COMPLETED'
            case 3:
                return 'FAILED'
        }
    }

    loadDataFromNet(pageNum, pageSize, callback) {
        if (this.props.accountType === 0 || this.props.accountType === 1) {
            RequestUtils.getUrlAndParamsAndCallback(config.api.orderhistory,
                {
                    type: this.getAccountType(),
                    start: pageNum * pageSize,
                    pageSize: pageSize,
                    state: this.getState()
                },
                (response) => {
                    callback(response, response.content)
                })
        } else if (this.props.accountType === 2) {
            let endTime = Moment().format('YYYY-MM-DD');
            let startTime = Moment().subtract(90, 'days').format('YYYY-MM-DD');
            let params = {startTime: startTime, endTime: endTime, transferStateType: this.getState()};
            RequestUtils.getUrlAndParamsAndPlatformAndCallback(config.api.transferRecords, params, null, (res) => {
                callback(res, res.content)
            })
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: indexBgColor.mainBg,
    },
});
