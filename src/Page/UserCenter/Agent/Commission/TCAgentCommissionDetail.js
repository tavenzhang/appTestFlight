/**
 * 投注号码
 * Created by Allen on 2017/2/7.
 * Copyright © 2016年 JX. All rights reserved.
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ListView,
    RefreshControl,
    ScrollView,
    Image,
    TouchableOpacity
} from 'react-native'
import {Size, indexBgColor, width, height, listViewTxtColor} from '../../../resouce/theme'
import RowList from './View/TCAgentCommissionDetailRow'
import PersonalCommissionDetail from './TCPersonalCommissionDetail'
import _ from 'lodash'
import NetUtils from '../../../../Common/Network/TCRequestUitls'
import {config} from '../../../../Common/Network/TCRequestConfig'
import TopNavigationBar from '../../../../Common/View/TCNavigationBar';
import Toast from '../../../../Common/JXHelper/JXToast';
import NoDataView from '../../../../Common/View/TCNoDataView'
import BaseComponent from '../../../Base/TCBaseComponent'
import Moment from 'moment'

var moment = new Moment()
import Helper from '../../../../Common/JXHelper/TCNavigatorHelper'

import {withMappedNavigationProps} from 'react-navigation-props-mapper'

@withMappedNavigationProps()
export default class TCAgentCommissionList extends BaseComponent {
    constructor(state) {
        super(state)
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
        this.data = []
        this.currentPage = 1
        this.pageSize = 20
        this.state = {
            dataSource: ds.cloneWithRows(this.data),
            loaded: false,//控制Request请求是否加载完毕
            foot: 0,// 控制foot， 0：隐藏foot  1：已加载完成   2 ：显示加载中
            moreText: '加载更多',
            renderPlaceholderOnly: true,
            isNoData: false,
            isTimeOut: false,
        }
    }

    static defaultProps = {};

    componentDidMount() {
        super.componentDidMount();
        this.getDataFromServer()
    }

    render() {
        let sp = super.render()
        if (sp) return sp
        return (
            <View style={styles.container}>
                <TopNavigationBar
                    ref='TopNavigationBar'
                    title={this.props.taskIdentifier + '期'}
                    titleStyle={styles.titleStyle}
                    needBackButton={true}
                    backButtonCall={() => {
                        Helper.popToBack();
                    }}
                />
                {this._renderHeader()}
                {this.getContentView()}
            </View>
        );

    }


    getContentView() {
        if (!this.state.isTimeOut) {
            return this.state.isNoData ? (
                <NoDataView
                    ref='NoDataView'
                    titleTip={''}
                    contentTip="代理佣金数据为空"
                />
            ) : (
                <ScrollView
                    showsHorizontalScrollIndicator={true}
                    horizontal={true}

                >
                    <ListView
                        ref="ListView"
                        dataSource={this.state.dataSource}
                        renderRow={this.getRenderRow.bind(this)}
                        enableEmptySections={true}
                        removeClippedSubviews={true}
                        initialListSize={50}
                        pageSize={50}
                        scrollRenderAheadDistance={20}
                        renderFooter={() => this.renderFooter()}
                        onEndReachedThreshold={20}
                        onEndReached={() => this.loadMore()}
                    />
                </ScrollView>
            )
        } else {
            return (
                <NoDataView
                    ref='TimeOutView'
                    titleTip={'网络出问题啦~'}
                    contentTip="网络或服务器出问题了，请检查网络链接~"

                />)
        }
    }

    getRenderRow(rowData) {
        return (<RowList rowData={rowData}/>);
        // return (
        //     <TouchableOpacity
        //         onPress={()=>{
        //             this.gotoPersonalCommissionDetail(rowData)
        //         }}
        //     >
        //         <RowList rowData={rowData}/>
        //     </TouchableOpacity>)
    }

    gotoPersonalCommissionDetail(rowData) {
        let {navigator} = this.props;
        if (navigator) {
            navigator.push({
                name: 'personalCommissionDetail',
                component: PersonalCommissionDetail,
                passProps: {
                    ...this.props,
                    rowData: rowData
                }
            })
        }
    }

    _renderHeader() {
        return (
            <View style={styles.titleViewStyle}>
                <Text style={styles.titleTxtStyle}>用户姓名</Text>
                <Text style={styles.titleTxtStyle}>投注金额</Text>
                <Text style={styles.titleTxtStyle}>佣金</Text>
            </View>
        )
    }


    getDataFromServer() {
        let type = {
            pageSize: this.pageSize,
            start: (this.currentPage - 1) * this.pageSize,
            taskIdentifier: this.props.taskIdentifier
        }
        NetUtils.getUrlAndParamsAndCallback(config.api.agentCommissionsDetail, type,
            (data) => {
                if (data.rs) {
                    if (data.content != null && data.content.datas.length < this.pageSize) {


                        if (this.currentPage === 1) {
                            this.setState({
                                foot: 0,
                            })
                        } else {
                            this.setState({
                                foot: 1,
                                moreText: '没有更多数据'
                            })
                        }
                    } else {
                        this.setState({
                            foot: 0
                        })
                    }
                    if (data.content.datas && data.content.datas != null) {
                        this.data = _.concat(this.data, data.content.datas)

                        if (this.data.length === 0) {
                            this.setState({
                                isNoData: true
                            })
                        } else {
                            this.setState({
                                isNoData: false
                            })
                        }
                    }
                    this.setState({
                        dataSource: this.state.dataSource.cloneWithRows(this.data),
                        totalBetsSum: data.content.totalBetsSum,
                        totalCommission: data.content.totalCommission,
                        isTimeOut: false
                    })
                } else {
                    if (this.data.length === 0) {
                        this.setState({isTimeOut: true})
                    }

                    Toast.showShortCenter('请求数据失败!')
                }


                setTimeout(() => {
                    this.setState({
                        renderPlaceholderOnly: false
                    })
                }, 1000)
            }
        )
    }

    renderFooter() {
        if (this.state.foot === 1) {//加载完毕
            return (
                <View
                    style={{
                        height: 40,
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        backgroundColor: indexBgColor.mainBg
                    }}>
                    <Text style={{color: listViewTxtColor.title, fontSize: Size.font12, marginTop: 10,}}>
                        {this.state.moreText}
                    </Text>
                </View>);
        } else if (this.state.foot === 2) {//加载中
            return (
                <View
                    style={{
                        height: 40,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: indexBgColor.mainBg
                    }}>
                    <Text style={{color: listViewTxtColor.title, fontSize: Size.font12, marginTop: 10}}>
                        加载中...
                    </Text>
                </View>)
        } else if (this.state.foot === 0) {
            return (<View></View>)
        }
    }

    loadMore() {
        if (this.state.foot != 0) {
            return;
        }
        if (this.data.length < this.pageSize) {
            return;
        }

        this.setState({
            foot: 2,
        });
        this.timer = setTimeout(
            () => {
                this.currentPage = this.currentPage + 1;
                this.getDataFromServer()
            }, 500);
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: indexBgColor.mainBg,
    }, titleViewStyle: {
        backgroundColor: indexBgColor.itemBg,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 1
    }, titleTxtStyle: {
        color: listViewTxtColor.title,
        textAlign: 'center',
        fontSize: Size.font15,
        paddingTop: 5,
        paddingBottom: 5,
        width: width * 0.33
    }
});
