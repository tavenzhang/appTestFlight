'use strict'
/**
 * 用户充值提款列表界面
 * Created by Allen on 2016/12/10.
 */
import React, {Component} from 'react';
import {StyleSheet, Button, TouchableOpacity, View} from 'react-native';
import {observer} from 'mobx-react'
import Moment from "moment/moment";
import NoDataView from '../../../Common/View/TCNoDataView'
import ListRow from './View/TCUserPayAndWithdrawRowViewOld'
import Helper from '../../../Common/JXHelper/TCNavigatorHelper'
import {indexBgColor} from '../../resouce/theme'
import RefreshListView from '../../../Common/View/RefreshListView/RefreshListView'
import TransferRow from './View/TCUserTransferRowView'
import UserAccount from "./TCUserPayAndWithdrawRecordsMain";
import TCUserTransferDetails from "./TCUserTransferDetails";
import TCUserAccountBillingDetails from "./TCUserAccountBillingDetails";


@observer
export default class TCUserPayAndWithdrawRecords extends Component {



    constructor(props) {
        super(props);
        this.userAccountStore=TW_Store.userAccountStore;
    }

    static defaultProps = {};

    componentWillMount(): void {
    }

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
        let titleStr = ''
        switch (this.props.accountType) {
            case 0:
                titleStr = '暂无提现'
                break
            case 1:
                titleStr = '暂无充值'
                break
            case 2:
                titleStr = '暂无转账'
                break
        }

        switch (this.props.type) {
            case 1:
                return titleStr + '记录'
            case 2:
                return titleStr + '完成记录'
            case 3:
                return titleStr + '失败记录'
        }
    }

    getNodataView=()=> {
        let {onBack} = this.props

        if (this.props.accountType === 1) {

            return (
                <NoDataView
                    ref='NoDataView'
                    titleTip={this.getNodataTip()}
                    contentTip=""
                    btnTxt=""
                    gotoDoing={()=>TW_Store.gameUIStroe.hideAlertUI()}
                />
            )
        } else {
            return (<NoDataView
                ref='NoDataView'
                titleTip={this.getNodataTip()}
                contentTip=""
            />)
        }
    }

    getRenderRow(rowData, sectionID, rowID) {
        return (
            <TouchableOpacity onPress={() => {
                this.pressRow(rowData)
            }}>
                {this.props.accountType === 2 ? <TransferRow rowData={rowData}/> : <ListRow rowData={rowData}/>}
            </TouchableOpacity>
        )
    }

    pressRow(rowData) {
        TW_Store.bblStore.playSoundByFile(TW_Store.bblStore.SOUND_ENUM.enterPanelClick);
        if (this.props.accountType === 2) {
            TW_Store.gameUIStroe.showCommonView("转账详情",TCUserTransferDetails,{orderData: rowData});
            // Helper.pushToUserTransferDetails({
            //     orderData: rowData,
            // })
        } else {
            TW_Store.gameUIStroe.showCommonView("账单详情",TCUserAccountBillingDetails,{
                orderData: rowData,
                isPayAndWithdrawRecord: true,
                accountType: this.props.accountType
            });
            // Helper.pushToUserAcountDetail({
            //     orderData: rowData,
            //     isPayAndWithdrawRecord: true,
            //     accountType: this.props.accountType
            // })
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
        TW_Log("loadDataFromNetthis.getState()==",this.getState())
        if (this.props.accountType === 0 || this.props.accountType === 1) {
            this.userAccountStore.getPayAndWithdrawHistory(this.getAccountType(), pageNum, pageSize, this.getState(), (res) => {
                callback(res, res.content);
            });
        } else if (this.props.accountType === 2) {
            let endTime = Moment().format('YYYY-MM-DD');
            let startTime = Moment().subtract(90, 'days').format('YYYY-MM-DD');
            let params = {
                startTime: startTime,
                endTime: endTime,
                transferStateType: this.getState(),
                start: pageNum * pageSize,
                pageSize: pageSize
            };
            this.userAccountStore.getTransferRecords(params, (res) => {
                callback(res, res.content)
            })
        }

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "transparent",
    }
});
