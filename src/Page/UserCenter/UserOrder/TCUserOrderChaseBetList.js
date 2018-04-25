/**
 * Created by Sam on 02/10/2017.
 * Copyright © 2017年 JX. All rights reserved.
 */
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    TouchableOpacity,
    Image,
    ListView,
    RefreshControl,
    Alert
} from 'react-native';
import { observer } from 'mobx-react/native';
import { observable, computed, action } from 'mobx';
import _ from 'lodash';
import TopNavigationBar from '../../../Common/View/TCNavigationBar';
import NetUtils from '../../../Common/Network/TCRequestUitls';
import { config } from '../../../Common/Network/TCRequestConfig';
import OrderDetail from './TCUserOrderDetail';
import OrderItemList from './TCUserOrderItemList';
import OrderItem from './View/TCUserChaseBetDetailRow';
import NoDataView from '../../../Common/View/TCNoDataView';
import BaseComponent from '../../../Page/Base/TCBaseComponent';
import { Size, width, height, indexBgColor, listViewTxtColor, buttonStyle, copyBtnStyle } from '../../resouce/theme';
import RefreshListView from '../../../Common/View/RefreshListView/RefreshListView';
import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter';
import Toast from '@remobile/react-native-toast';
@observer
export default class TCUserOrderItemList extends Component {
    stateModel = new StateModel();

    constructor(props) {
        super(props);
        this.orderInfo = {};
    }

    componentDidMount() {}

    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);
    }

    render() {
        return (
            <View style={styles.container}>
                <TopNavigationBar
                    title={'追号详情'}
                    needBackButton={true}
                    backButtonCall={() => {
                        this.props.navigator.pop();
                    }}
                />
                <RefreshListView
                    ref="refreshListView"
                    isRenderFooter={false}
                    isAllowRefresh={true}
                    renderRow={(rowData, sectionID, rowID) => {
                        return this.getRenderRow(rowData, sectionID, rowID);
                    }}
                    loadDataFromNet={(pageNum, pageSize, callback) => {
                        this.loadDataFromNet(pageNum, pageSize, callback);
                    }}
                    isNodataView={() => {
                        return (
                            <NoDataView
                                ref="NoDataView"
                                titleTip={'加载异常'}
                                contentTip="不要让大奖溜走，赶紧购彩去~"
                                btnTxt="立即购彩"
                                gotoDoing={() => {
                                    this.gotoBuyBet();
                                }}
                            />
                        );
                    }}
                />
                {this.getBottomButton()}
            </View>
        );
    }

    getBottomButton() {
        if (this.stateModel.transactionState != 'PENDING') {
            return;
        }
        // return (<View style={styles.bottomStyle}>
        //     <TouchableOpacity
        //         style={styles.bottomBarButtonStyle}
        //         onPress={()=> {
        //             this.alertToCancel()
        //         }}
        //     >
        //         <Text style={{color: buttonStyle.btnTxtColor, fontWeight: 'bold', fontSize: Size.default}}>
        //             取消投注
        //         </Text>
        //     </TouchableOpacity>
        // </View>)
    }

    alertToCancel() {
        Alert.alert('您真的要取消此订单吗？', null, [
            {
                text: '确定',
                onPress: () => {
                    this.cancelOrderFromNet();
                }
            },
            {
                text: '取消',
                onPress: () => {}
            }
        ]);
    }

    loadDataFromNet(pageNum, pageSize, callback) {
        let type = {
            transactionTimeuuid: this.props.transactionTimeuuid
        };
        NetUtils.getUrlAndParamsAndCallback(config.api.orderDetail, type, data => {
            if (data.rs && data.content != null) {
                this.orderInfo = data.content.orderInfo;
                this.stateModel.transactionState = this.orderInfo.transactionState;
            }
            callback(data, data.content.coChildOrderList);
        });
    }

    cancelOrderFromNet() {
        NetUtils.PutUrlAndParamsAndCallback(
            config.api.cancelOrder + '/' + this.props.transactionTimeuuid,
            null,
            data => {
                if (data && data.rs) {
                    Toast.showShortCenter('撤单成功');
                    var refreshListView = this.refs.refreshListView;
                    refreshListView._updateData();
                } else {
                    let toastString = '撤销订单失败，请检查网络后重试';
                    if (data.message) {
                        toastString = data.message;
                    }
                    this.timer = setTimeout(() => {
                        Toast.showShortCenter(toastString);
                    }, 500);
                }
            }
        );
    }

    getRenderRow(rowData, sectionID, rowID) {
        return (
            <TouchableOpacity
                onPress={() => {
                    this.pressRow(rowData);
                }}
            >
                <OrderItem
                    orderData={rowData}
                    gameName={this.orderInfo.gameNameInChinese}
                    rowID={rowID}
                    orderType={this.props.orderType}
                />
            </TouchableOpacity>
        );
    }

    pressRow(rowData) {
        let { navigator } = this.props;
        let transactionTimeuuid = '';
        let isCO_DontOpen = false;
        let subTransactionTimeuuid = null;
        if (rowData.childOrderState === 'CO_SUB_WIP' || rowData.childOrderState === 'CO_SUB_CANCELLED') {
            transactionTimeuuid = this.props.transactionTimeuuid;
            subTransactionTimeuuid = rowData.transactionTimeuuid;
            isCO_DontOpen = true;
        } else {
            transactionTimeuuid = rowData.transactionTimeuuid;
        }
        if (navigator) {
            navigator.push({
                name: 'OrderItemList',
                component: OrderItemList,
                passProps: {
                    transactionTimeuuid: transactionTimeuuid,
                    isCO_DontOpen: isCO_DontOpen,
                    issueNumber: rowData.issueNo,
                    multiplier: rowData.multiplier,
                    subTransactionTimeuuid: subTransactionTimeuuid
                }
            });
        }
    }

    gotoBuyBet() {
        let { navigator } = this.props;
        if (navigator) {
            navigator.popToTop();
            RCTDeviceEventEmitter.emit('setSelectedTabNavigator', 'shoping');
        }
    }
}

class StateModel {
    @observable transactionState;
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: indexBgColor.mainBg
    },
    bottomStyle: {
        alignItems: 'center',
        paddingTop: 10,
        marginBottom: 10
    },
    bottomBarButtonStyle: {
        backgroundColor: buttonStyle.btnBg,
        justifyContent: 'center',
        flexDirection: 'row',
        height: 40,
        alignItems: 'center',
        borderRadius: 4,
        padding: 10,
        width: width * 0.8
    }
});
