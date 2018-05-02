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
import {agent, common} from '../../../resouce/images'
import {agentCenter, Size, width, height, indexBgColor} from '../../../resouce/theme'
import RowList from './View/TCAgentCommissionListRow'
import _ from 'lodash'
import NetUtils from '../../../../Common/Network/TCRequestUitls'
import {config} from '../../../../Common/Network/TCRequestConfig'
import TopNavigationBar from '../../../../Common/View/TCNavigationBar';
import Toast from '../../../../Common/JXHelper/JXToast';
import NoDataView from '../../../../Common/View/TCNoDataView'
import BaseComponent from '../../../Base/TCBaseComponent'
import DatePicker from '../../../../Common/View/datepicker';
import ModalDropdown from '../../../../Common/View/ModalDropdown'
import LoadingSpinnerOverlay from '../../../../Common/View/LoadingSpinnerOverlay'
import CommissionDetail from './TCAgentCommissionDetail'
import Moment from 'moment'
import Helper from "../../../../Common/JXHelper/TCNavigatorHelper";

var moment = new Moment()

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
            startDate: Moment().format('YYYY-MM-DD'),
            endDate: Moment().format('YYYY-MM-DD'),
            typeName: '今天',
            type: 0,
            totalBetsSum: 0,
            totalCommission: 0,
            displayTypeName: '今天'
        }
    }

    static defaultProps = {};

    componentDidMount() {
        super.componentDidMount();
        this.getDataFromServer()
    }

    render() {
        return (
            <View style={styles.container}>
                <TopNavigationBar
                    ref='TopNavigationBar'
                    title={'代理佣金'}
                    needBackButton={true}
                    backButtonCall={() => {
                        Helper.popToBack()
                    }}
                    rightTitle={this.state.displayTypeName}
                    rightButtonCall={
                        () => {
                            this.refs['ModalDropdown'].show()

                        }
                    }
                />
                <ModalDropdown
                    ref="ModalDropdown"
                    textStyle={styles.dropDownTxtStyle}
                    options={this.getData()}
                    style={styles.dropStyle}
                    dropdownStyle={styles.dropDownStyle}
                    renderRow={(rowData, rowID) => this.renderModalDropDownRow(rowData, rowID)}
                    onSelect={(idx, value) => this.onSelect(idx, value)}
                    showButton={false}
                />
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        height: 50,
                        borderBottomWidth: 0.5,
                        borderBottomColor: indexBgColor.itemBg,
                        justifyContent: 'space-around',
                        backgroundColor: indexBgColor.itemBg
                    }}>
                    <DatePicker
                        style={{width: width * 0.28}}
                        date={this.state.startDate}
                        mode="date"
                        format="YYYY-MM-DD"
                        confirmBtnText="确认"
                        cancelBtnText="取消"
                        showIcon={false}
                        is24Hour={true}
                        customStyles={{
                            dateIcon: null,
                            dateInput: {
                                height: 30,
                                borderWidth: 0,
                                alignItems: 'center',
                            },
                            dateText: {
                                height: 29,
                                padding: 5,
                                color: agentCenter.dateTxt
                            }
                        }}
                        onDateChange={(date) => {
                            this.setState({startDate: date, displayTypeName: '当前'})
                            this._partModalLoadingSpinnerOverLay.show()
                            this.clearData()
                        }}
                    />
                    <View style={{alignItems: 'center', height: 50, justifyContent: 'center'}}>
                        <Text style={{
                            textAlign: 'center',
                            fontSize: Size.default,
                            color: agentCenter.title,
                            fontWeight: 'bold'
                        }}>至</Text>
                    </View>
                    <DatePicker
                        style={{width: width * 0.28}}
                        date={this.state.endDate}
                        mode="date"
                        format="YYYY-MM-DD"
                        confirmBtnText="确认"
                        cancelBtnText="取消"
                        showIcon={false}
                        is24Hour={true}
                        customStyles={{
                            dateIcon: null,
                            dateInput: {
                                height: 30,
                                borderWidth: 0,
                                alignItems: 'center',
                            },
                            dateText: {
                                height: 29,
                                padding: 5,
                                color: agentCenter.dateTxt
                            }
                        }}
                        onDateChange={(date) => {

                            this.setState({endDate: date, displayTypeName: '当前'})
                            this._partModalLoadingSpinnerOverLay.show()


                            this.clearData()
                        }}
                    />
                    {/*<TouchableOpacity onPress={()=> {*/}
                    {/*this.refs['ModalDropdown'].show()*/}
                    {/*}}>*/}
                    {/*<View*/}
                    {/*style={styles.dropMainStyle}>*/}

                    {/*<Text style={{marginLeft:10,fontSize:Size.default,color:agentCenter.dateTxt}}>*/}
                    {/*{this.state.typeName}*/}
                    {/*</Text>*/}
                    {/*<ModalDropdown*/}
                    {/*ref="ModalDropdown"*/}
                    {/*textStyle={styles.dropDownTxtStyle}*/}
                    {/*options={this.getData()}*/}
                    {/*style={styles.dropStyle}*/}
                    {/*dropdownStyle={styles.dropDownStyle}*/}
                    {/*renderRow={(rowData, rowID)=>this.renderModalDropDownRow(rowData, rowID)}*/}
                    {/*onSelect={(idx, value)=>this.onSelect(idx, value)}*/}

                    {/*>*/}
                    {/*<Image source={common.iconNext} style={styles.imgNext} resizeMode='center'/>*/}
                    {/*</ModalDropdown>*/}

                    {/*</View>*/}
                    {/*</TouchableOpacity>*/}
                </View>
                <Text
                    style={{
                        marginLeft: 20,
                        marginTop: 15,
                        color: agentCenter.title,
                        fontSize: Size.default,
                        fontWeight: 'bold'
                    }}>{this.state.displayTypeName}统计：</Text>
                <View style={{flexDirection: 'row'}}>

                    <View style={styles.statisticsItems}>
                        <Image source={agent.agentCommission}
                               style={styles.iconStyle}/>
                        <View style={styles.txtStyle}>
                            <Text style={{fontSize: Size.default, color: agentCenter.title}}>佣金</Text>
                            <Text style={{
                                fontSize: Size.default,
                                color: agentCenter.title
                            }}>{this.state.totalCommission ? this.state.totalCommission.toFixed(2) : '0.00'}</Text>
                        </View>
                    </View>

                    <View style={styles.statisticsItems}>
                        <Image source={agent.agentBettingMoney}
                               style={styles.iconStyle}/>
                        <View style={styles.txtStyle}>
                            <Text style={{fontSize: Size.default, color: agentCenter.title}}>投注金额</Text>
                            <Text style={{
                                fontSize: Size.default,
                                color: agentCenter.title
                            }}>{this.state.totalBetsSum ? this.state.totalBetsSum.toFixed(2) : '0.00'}</Text>
                        </View>
                    </View>

                </View>
                {this._renderHeader()}
                {this.getContentView()}
                <LoadingSpinnerOverlay
                    ref={component => this._partModalLoadingSpinnerOverLay = component}
                    modal={true}
                    marginTop={64}/>
            </View>
        );
        let sp = super.render()
        if (sp) return sp
    }


    getData() {
        return ['今天', '昨天', '一周', '半月']
    }

    onSelect(idx, value) {
        this.setState({
            typeName: value,
            type: idx,
            displayTypeName: value
        })
        this.getSearchTime(idx)
    }

    getSearchTime(type) {

        let startTime = null
        let endTime = Moment().format('YYYY-MM-DD')
        switch (type) {
            case '0':
                startTime = Moment().format('YYYY-MM-DD')
                break
            case '1':
                startTime = Moment().subtract(1, 'days').format('YYYY-MM-DD')
                endTime = Moment().subtract(1, 'days').format('YYYY-MM-DD')
                break
            case '2':
                startTime = Moment().subtract(7, 'days').format('YYYY-MM-DD')
                break
            case '3':
                startTime = Moment().subtract(15, 'days').format('YYYY-MM-DD')
                break
        }
        this.setState({
            startDate: startTime,
            endDate: endTime
        })

        this._partModalLoadingSpinnerOverLay.show()

        this.clearData()

    }

    renderModalDropDownRow(rowData, rowID) {
        return (
            <TouchableOpacity>
                <View style={styles.dropDownItemStyle}>
                    <Text style={{fontSize: Size.font18, color: agentCenter.title}}>{rowData}</Text>
                </View>
            </TouchableOpacity>
        )
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
        return (<TouchableOpacity
            onPress={() => {
                this.gotoCommissionDetail(rowData.issueNo)
            }}
        >
            <RowList rowData={rowData}/>
        </TouchableOpacity>)
    }

    _renderHeader() {
        return (
            <View style={styles.titleViewStyle}>
                <Text style={[styles.titleTxtStyle, {width: width * 0.25}]}>期数</Text>
                <Text style={styles.titleTxtStyle}>投注金额</Text>
                <Text style={styles.titleTxtStyle}>佣金</Text>
                <Text style={styles.titleTxtStyle}>投注人数</Text>
                <Text style={[styles.titleTxtStyle, {width: width * 0.15}]}>状态</Text>
            </View>
        )
    }

    gotoCommissionDetail(issueNo) {
        Helper.pushToAgentCommissionDetail({taskIdentifier: issueNo});
    }

    clearData() {
        var listView = this.refs.ListView
        listView && listView.scrollTo({y: 1, animated: true});
        setTimeout(() => {
            this.currentPage = 1
            this.data = []
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(this.data),
                foot: 0
            })
            this.getDataFromServer()
        }, 500)
    }


    getDataFromServer() {
        let type = {
            pageSize: this.pageSize,
            start: (this.currentPage - 1) * this.pageSize,
            startTime: this.state.startDate + ' 00:00:00',
            endTime: this.state.endDate + ' 23:59:59'
        }
        NetUtils.PostUrlAndParamsAndCallback(config.api.agentBrokerageCalculation, type,
            (data) => {
                this._partModalLoadingSpinnerOverLay.hide()
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
                    <Text style={{fontSize: Size.font12, marginTop: 10, color: agentCenter.title}}>
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
                    <Text style={{color: agentCenter.title, fontSize: Size.font12, marginTop: 10}}>
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
        alignItems: 'center'
    }, titleTxtStyle: {
        color: agentCenter.title,
        textAlign: 'center',
        fontSize: Size.font15,
        paddingTop: 5,
        paddingBottom: 5,
        width: width * 0.185,
    }, dropDownTxtStyle: {
        color: agentCenter.title,
    }, dropStyle: {
        left: width * 0.55,
    },
    dropDownStyle: {
        width: width * 0.22,
        height: height * 0.35,
        borderWidth: 1,
        borderRadius: 3,
        left: width * 0.76,
        backgroundColor: indexBgColor.mainBg
    }, imgNext: {
        width: 15,
        height: 15,
        transform: [{rotate: '90deg'}],
        marginLeft: width * 0.05
    }, dropDownItemStyle: {
        alignItems: 'center',
        margin: 15
    }, dropMainStyle: {
        borderWidth: 0.5,
        height: 30,
        backgroundColor: agentCenter.dateChoiceBtnBg,
        borderRadius: 5,
        borderColor: 'black',
        flexDirection: 'row',
        alignItems: 'center',
        width: width * 0.25,
    }, statisticsItems: {
        flexDirection: 'row',
        backgroundColor: indexBgColor.itemBg,
        borderRadius: 5,
        borderWidth: 0.5,
        borderColor: indexBgColor.mainBg,
        margin: width * 0.050,
        width: width * 0.40,
        padding: 5
    }, iconStyle: {
        width: 30,
        height: 30,
        margin: 5
    }, txtStyle: {
        marginTop: 5,
        marginLeft: 10,
    }
});
