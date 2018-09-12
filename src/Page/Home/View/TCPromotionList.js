/**
 * Created by Sam on 2016/11/16.
 */


import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ListView,
    TouchableOpacity,
    Dimensions,
    RefreshControl,
    InteractionManager
} from 'react-native';
import NoDataView from '../../../Common/View/TCNoDataView'
import BaseComponent from '../../Base/TCBaseComponent'
import TopNavigationBar from '../../../Common/View/TCNavigationBar'
import MessageListItem from './TCPromotionItemView'
import Toast from '../../../Common/JXHelper/JXToast';
import NetUitls from '../../../Common/Network/TCRequestUitls'
import {
    Size,
    height,
    width,
    indexBgColor,
    listViewTxtColor,
    refreshColor
} from '../../resouce/theme'
import {config} from '../../../Common/Network/TCRequestConfig';
import NavigatorHelper from '../../../Common/JXHelper/TCNavigatorHelper'

import _ from 'lodash';

export default class TCPromotionList extends BaseComponent {

    constructor(state) {
        super(state)
        this.pageNum = 0
        this.pageSize = 20
        this.type = ''
        this.totalList = [];
        this.state = {
            dataSource: new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2}),
            isRefreshing: false,
            renderPlaceholderOnly: true,
            messageType: null,
            title: '优惠活动',
            loaded: false,//控制Request请求是否加载完毕
            foot: 0,// 控制foot， 0：隐藏foot  1：已加载完成   2 ：显示加载中
            moreText: '加载更多',
            isNoData: false,
            isTimeOut: false,
            selectedIndex: -1,
        }
    }

    static defaultProps = {
        title: '',
        type: '',
        rowData: null,
    };

    componentDidMount() {
        super.componentDidMount();
        this.timer = setTimeout(() => {
            this.setState({renderPlaceholderOnly: false});
        }, 500)
        this.loadDataFormNet();
    }

    componentWillUnmount() {
        // 如果存在this.timer，则使用clearTimeout清空。
        // 如果你使用多个timer，那么用多个变量，或者用个数组来保存引用，然后逐个clear
        this.timer && clearTimeout(this.timer);
    }

    render() {
        let sp = super.render()
        if (sp) return sp

        return (
            <View style={styles.container}>
                <TopNavigationBar
                    ref='TopNavigationBar'
                    title={this.state.title}
                    needBackButton={true}
                    backButtonCall={()=> {
                        NavigatorHelper.popToBack();
                    }}
                />

                {/*列表*/}
                {this.getContentView()}
            </View>
        );
    }


    getContentView() {

        if (!this.state.isTimeOut) {
            return this.state.isNoData ? (
                <NoDataView
                    ref='NoDataView'
                    titleTip={'暂无优惠活动'}
                    contentTip="不要让大奖溜走，2元中千万大奖~"
                />
            ) : (
                <ListView
                    ref='listView'
                    style={{height: height - 64}}
                    dataSource={this.state.dataSource}
                    renderRow={(rowData, sectionID, rowID)=>this.renderRow(rowData, sectionID, rowID)}
                    removeClippedSubviews={true}
                    scrollRenderAheadDistance={20}
                    renderFooter={()=>this._renderFooter()}
                    onEndReachedThreshold={20}
                    onEndReached={()=>this._endReached()}
                    enableEmptySections={true}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.isRefreshing}
                            onRefresh={()=>this.updateData()}
                            tintColor="#ff0000"
                            title="下拉刷新"
                            titleColor="#999999"
                            colors={refreshColor.progress}
                            progressBackgroundColor={refreshColor.progressBackground}
                        />
                    }

                />
            )
        } else {
            return (  <NoDataView
                ref='TimeOutView'
                titleTip={'网络出问题啦~'}
                contentTip="网络或服务器出问题了，刷新一下试试吧~"
                btnTxt="刷新一下"
                unNetwork={true}
                gotoDoing={()=> {
                    this.updateData()
                    this.setState({isTimeOut: false})
                }}
            />)
        }
    }

    //CELL ROW DATA
    renderRow(rowData, sectionID, rowID) {
        return (
            <MessageListItem
                data={rowData}
            />
        )
    }

    updateData() {
        var listView = this.refs.listView
        if (listView) {
            listView.scrollTo({x: 0, y: 0, animated: true});
        }
        this.pageNum = 0;
        this.totalList = []
        this.setState({
            isRefreshing: true,
            isTimeOut: false
        })
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(this.totalList),
        })
        this.loadDataFormNet()
    }

    loadDataFormNet() {
        let type = {
            start: this.pageSize * this.pageNum,
            pageSize: this.pageSize,
        }


        NetUitls.getUrlAndParamsAndCallback(config.api.getPromotionList, type,
            (data) => {
                if (data.rs) {
                    if (data.content.length < this.pageSize) {

                        if (this.pageNum === 0) {
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
                    // data.content.datas.forEach((e) => {
                    //     this.totalList.push(e)
                    // })
                    this.totalList = _.concat(this.totalList, data.content)

                    this.setState({
                        dataSource: this.state.dataSource.cloneWithRows(this.totalList),
                        isRefreshing: false
                    })
                    if (this.totalList.length <= 0) {
                        this.setState({
                            isNoData: true
                        })
                    } else {
                        this.setState({
                            isNoData: false
                        })
                    }

                } else {
                    this.setState({
                        isRefreshing: false
                    })
                    if (data.status === 422) {
                        this.setState({
                            foot: 1,
                            moreText: '没有更多数据'
                        })
                    } else {
                        Toast.showShortCenter('数据加载失败，请稍后再试!')
                        if (this.totalList.length === 0) {
                            this.setState({isTimeOut: true})
                        }
                    }
                }
            }
        )

    }



    _renderFooter() {
        if (this.state.foot === 1) {//加载完毕
            return (
                <View
                    style={{height: 40, alignItems: 'center', justifyContent: 'flex-start',backgroundColor:indexBgColor.itemBg}}>
                    <Text style={{color: listViewTxtColor.content, fontSize: Size.font12, marginTop: 10}}>
                        {this.state.moreText}
                    </Text>
                </View>);
        } else if (this.state.foot === 2) {//加载中
            return (
                <View
                    style={{height: 40, alignItems: 'center', justifyContent: 'center',backgroundColor:indexBgColor.itemBg}}>
                    <Text style={{color: listViewTxtColor.content, fontSize: Size.font12, marginTop: 10}}>
                        加载中...
                    </Text>
                </View>)
        } else if (this.state.foot === 0) {
            return (<View></View>)
        }
    }


    _endReached() {
        if (this.state.foot != 0) {
            return;
        }
        if (this.totalList.length < this.pageSize) {
            return;
        }

        this.setState({
            foot: 2,
        });
        this.timer = setTimeout(
            () => {
                this.pageNum = this.pageNum + 1;
                this.loadDataFormNet()
            }, 500);
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:indexBgColor.mainBg,
    }
});

