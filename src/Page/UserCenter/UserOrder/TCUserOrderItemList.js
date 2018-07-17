'use strict';
/**
 * Created by Allen on 2016/12/10.
 */
import React, {Component} from 'react';
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

import {observer} from 'mobx-react/native';
import {observable, computed, action} from 'mobx';
import _ from 'lodash';
import TopNavigationBar from '../../../Common/View/TCNavigationBar';
import NetUtils from '../../../Common/Network/TCRequestUitls';
import {config} from '../../../Common/Network/TCRequestConfig';
import OrderDetail from './TCUserOrderDetail';
import OrderItem from './View/TCUserOrderChildrenItemRow';
import NoDataView from '../../../Common/View/TCNoDataView';
import {Size, width, height, indexBgColor, listViewTxtColor, buttonStyle, copyBtnStyle} from '../../resouce/theme';
import RefreshListView from '../../../Common/View/RefreshListView/RefreshListView';
import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter';
import Toast from '../../../Common/JXHelper/JXToast';
import NavigatorHelper from '../../../Common/JXHelper/TCNavigatorHelper'
import {withMappedNavigationProps} from 'react-navigation-props-mapper'

@withMappedNavigationProps()
@observer
export default class TCUserOrderItemList extends Component {
    stateModel = new StateModel();

    constructor(props) {
        super(props);
        this.orderInfo = {};
    }

    static defaultProps = {};

    componentDidMount() {
    }

    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);
    }

    render() {
        return (
            <View style={styles.container}>
                <TopNavigationBar
                    title={'彩票订单详情'}
                    needBackButton={true}
                    backButtonCall={() => {
                        NavigatorHelper.popToBack();
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
        if (this.stateModel.transactionState != 'PENDING' || this.props.isCO_DontOpen) {
            return;
        }
        return (
            <View style={styles.bottomStyle}>
                <TouchableOpacity
                    style={styles.bottomBarButtonStyle}
                    onPress={() => {
                        this.alertToCancel();
                    }}
                >
                    <Text style={{color: buttonStyle.btnTxtColor, fontWeight: 'bold', fontSize: Size.default}}>
                        取消投注
                    </Text>
                </TouchableOpacity>
            </View>
        );
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
                onPress: () => {
                }
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
                if (this.props.isCO_DontOpen) {
                    this.orderInfo.gameIssueNo = this.props.issueNumber;
                    this.orderInfo.transactionAmount = this.orderInfo.transactionAmount * this.props.multiplier;
                    this.orderInfo.transactionState = 'PENDING';
                }
                this.stateModel.transactionState = this.orderInfo.transactionState;
            }
            callback(data, data.content.subOrders);
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
        if (this.props.isCO_DontOpen) {
            rowData.bettingAmount = rowData.bettingAmount * this.props.multiplier;
        }
        return (
            <TouchableOpacity
                onPress={() => {
                    this.pressRow(rowData);
                }}
            >
                <OrderItem orderChildrenData={rowData} gameName={this.orderInfo.gameNameInChinese}/>
            </TouchableOpacity>
        );
    }

    pressRow(rowData) {
        NavigatorHelper.pushToUserOrderDetail({
            orderData: rowData,
            orderInfo: this.orderInfo
        });
    }

    gotoBuyBet() {
        NavigatorHelper.popToTop();
        JX_Store.mainStore.changeTab('shoping')

    }
}

class StateModel {
    @observable transactionState = '';
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
