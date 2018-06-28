'use strict'
/**
 * Created by Joyce on 2017/01/06.
 */
import React, {Component} from 'react';
import {Image, Platform, StyleSheet, Text, View} from 'react-native';
import LoadingSpinnerOverlay from '../../Common/View/LoadingSpinnerOverlay'
import {Size, width} from '../resouce/theme';
import NetUtils from '../../Common/Network/TCRequestUitls';
import {config} from '../../Common/Network/TCRequestConfig';
import RefreshListView from '../../Common/View/RefreshListView/RefreshListView';
import NoDataView from '../../Common/View/TCNoDataView';
import TopNavigationBar from './components/TCNavigationBar';

export default class List extends Component {
    render() {
        return (
            <View style={styles.container}>
                <TopNavigationBar title={'人品榜单'}/>
                <View style={styles.listContainer}>
                    {this.renderHeader()}
                    {this.renderContent()}
                </View>
                <Image style={styles.headImage} source={require('./asset/hb_phb.png')} resizeMode={'contain'}/>
                <LoadingSpinnerOverlay ref={component => this._modalLoadingSpinnerOverLay = component}/>
            </View>
        );
    };

    getDataFromServer(pageNum, pageSize, callBack) {
        NetUtils.getUrlAndParamsAndCallback(config.api.redPacketRank, null,
            (data) => {
                this._modalLoadingSpinnerOverLay.hide();
                if (data.rs) {
                    if (data.content) {
                        let tempData = {
                            "content": {"totalCount": data.content.length, "datas": data.content},
                            "rs": data.rs
                        };
                        callBack(tempData, tempData.content.datas);
                    } else {
                        callBack(data, null);
                    }
                }
            }
        );
    }

    renderHeader() {
        return (
            <View style={styles.rowContainer}>
                <Text style={[styles.row, styles.rank]}>排名</Text>
                <Text style={[styles.row, styles.account]}>账号</Text>
                <Text style={[styles.row, styles.type]}>红包类型</Text>
                <Text style={[styles.row, styles.amount]}>金额</Text>
            </View>
        );
    }

    renderContent() {
        return (
            <RefreshListView
                ref="refreshListView"
                renderRow={(rowData) => this.renderRow(rowData)}
                loadDataFromNet={(pageNum, pageSize, callback) => this.getDataFromServer(pageNum, pageSize, callback)}
                isNodataView={() => this.renderNoDataView()}
            />
        );
    }

    renderRow(rowData) {
        if (!rowData) {
            return;
        }

        let rank = rowData.rank;
        let rankImage = require('./asset/one.png');
        if (rank == 2) {
            rankImage = require('./asset/two.png');
        } else if (rank == 3) {
            rankImage = require('./asset/three.png');
        }

        return (
            <View style={styles.rowContainer}>
                {rank > 3 &&
                <View style={[styles.rank, styles.rankRoundContainer]}>
                    <View style={styles.rankRound}>
                        <Text style={[styles.row, styles.rankText]}>{rowData.rank}</Text>
                    </View>
                </View>
                }
                {rank <= 3 &&
                <Image style={[styles.rank, styles.rankImage]} source={rankImage} resizeMode={'contain'}/>}
                <Text style={[styles.row, styles.account]}>{rowData.usernameMask}</Text>
                <Text style={[styles.row, styles.type]}>{rowData.hongbaoType}</Text>
                <Text style={[styles.row, styles.amount]}>{rowData.amount}</Text>
            </View>
        );
    }

    renderNoDataView() {
        return (<NoDataView ref='NoDataView' titleTip={''} contentTip='榜单尚未更新，请稍后再试'/>);
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#C02218',
    },
    headImage: {
        height: 100,
        width: width,
        position: 'absolute',
        top: (Platform.OS == 'ios' ? 64 : 44) + 10,
    },
    listContainer: {
        flex: 1,
        borderRadius: 6,
        marginHorizontal: 10,
        marginTop: 66,
        marginBottom: 10,
        paddingTop: 30,
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
        color: '#592115',
    },
    rank: {
        width: (width - 22) * 0.15,
    },
    rankRoundContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    rankImage: {
        height: 30,
    },
    rankRound: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 22,
        height: 22,
        borderRadius: 20,
        backgroundColor: '#F46C67',
    },
    rankText: {
        fontSize: Size.font10,
        color: '#FFFFFF',
    },
    account: {
        width: (width - 22) * 0.35,
    },
    type: {
        width: (width - 22) * 0.24,
    },
    amount: {
        width: (width - 22) * 0.26,
    },
});
