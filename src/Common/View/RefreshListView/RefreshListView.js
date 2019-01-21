/**
 * Created by allen-jx on 2017/10/26.
 */
import React, {Component} from 'react'

import {
    View,
    StyleSheet,
    ListView,
    Text,
    RefreshControl,
    ActivityIndicator,
    FlatList
} from 'react-native'
import {observer} from 'mobx-react/native'
import {observable, computed, action} from 'mobx'
import NoDataView from '../TCNoDataView'
import Toast from '../../../Common/JXHelper/JXToast';
import {
    Size,
    indexBgColor,
    listViewTxtColor,
    width,
    height,
    refreshColor
} from '../../../Page/asset/game/themeComponet'
import PropTypes from 'prop-types'
import _ from 'lodash'

/**
 * 公共刷新列表
 */

@observer
export default class RefreshListView extends Component {

    /**
     * isRenderFooter 是否选择上拉加载更多
     *renderRow渲染行
     * loadDataFromNet 从服务器加载数据
     *isNodataView 数据为空的时候显示组件
     * @type {boolean}
     */

    static propTypes : {
                isAllowRefresh: PropTypes.bool,//是否允许下拉刷新
                isNodataView: PropTypes.func ,//数据为空时显示view
                isRenderFooter: PropTypes.bool,//是否允许上拉加载更多
                loadDataFromNet: PropTypes.func,//获取数据源方法
                renderRow: PropTypes.func,//渲染行
                pageSize: PropTypes.number,//每页加载数据
                footStyle:PropTypes.style,
                initialNumToRender:PropTypes.any, //初始渲染项目数目
                keyExtractor:PropTypes.any,
            }


    static defaultProps = {
        pageSize: 20,
        isAllowRefresh: false,
        isNodataView: null,
        isRenderFooter: false,
        loadDataFromNet: null,
        renderRow: null,
        isHorizon:false,
        extraData:null,
        initialNumToRender:10,
    }

    constructor(props) {
        super(props)
        this.dataSource = new StateModel()
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
        this.pageNum = 0
    }

    componentDidMount() {
        this.loadDataFromNet()
    }

    componentWillUnmount() {
        this.timer && clearTimeout(this.timer)
    }

    render() {
        return this.dataSource.isLoading ? this._renderLoading() : this.getContentView()
    }


    _renderLoading() {
        return (
            <ActivityIndicator size='small' style={{alignItems: 'center', justifyContent: 'center', flex: 1}}/>
        );
    }
    //item 渲染id key
    _keyExtractor = (item, index) => index;

    // getItemLayout 对于固定 item 高度 可以提高性能
    // getItemLayout={(data, index) => (
    //     // 120 是被渲染 item 的高度 ITEM_HEIGHT。
    //     {length: 120, offset: 120 * index, index}
    // )}

    _onRendRow = (data) => {
        //{item, index}
        let {renderRow} = this.props;
        if(renderRow){
            return renderRow(data.item, data.index, data.index) ;
        }else{
            return null
        }

    }

    getContentView=()=>{
        let {isHorizon,keyExtractor,extraData,initialNumToRender,getItemLayout,isAllowRefresh}=this.props;

        if (this.dataSource.isTimeOut) {
            return (<NoDataView
                ref='TimeOutView'
                titleTip={'网络出问题啦~'}
                contentTip="网络或服务器出问题了，刷新一下试试吧~"
                btnTxt="刷新一下"
                unNetwork={true}
                gotoDoing={() => {
                    this.props.isAllowRefresh ? this._updateData() : this.loadDataFromNet()
                    this.dataSource.isTimeOut = false
                }}/>)
        } else {
            return this.dataSource.isNoData ? this.props.isNodataView() : (
                <FlatList
                    horizontal={isHorizon}
                    ref={"listView"}
                    getItemLayout={getItemLayout}
                    data={this.dataSource.datas}
                    extraData={extraData}
                    renderItem={this._onRendRow}
                    keyExtractor={keyExtractor ? keyExtractor : this._keyExtractor}
                    // ListHeaderComponent={renderHeader}
                    ListFooterComponent={this.renderFooter}
                    onEndReached={this.endReached}
                    onEndReachedThreshold={20}
                    scrollRenderAheadDistance={20}
                    // ListEmptyComponent={this._renderEmptyView}
                    initialNumToRender={initialNumToRender}
                    refreshControl={
                        isAllowRefresh ? <RefreshControl
                                    refreshing={this.dataSource.isRefreshing}
                                    onRefresh={this._updateData}
                                    tintColor="#ff0000"
                                    title="下拉刷新"
                                    titleColor="#999999"
                                    colors={refreshColor.progress}
                                    progressBackgroundColor={refreshColor.progressBackground}/>:null
                        }
                />)
                // <ListView
                //     ref="listView"
                //     removeClippedSubviews={false}
                //     enableEmptySections={true}
                //     scrollRenderAheadDistance={20}
                //     onEndReachedThreshold={20}
                //     dataSource={this.ds.cloneWithRows(this.dataSource.datas.slice(0))}
                //     renderRow={(rowData, sectionID, rowID) => this.props.renderRow(rowData, sectionID, rowID)}
                //     onEndReached={this.endReached}
                //     renderFooter={this.renderFooter}
                //     refreshControl={
                //         this.props.isAllowRefresh ?
                //             <RefreshControl
                //                 refreshing={this.dataSource.isRefreshing}
                //                 onRefresh={() => this._updateData()}
                //                 tintColor="#ff0000"
                //                 title="下拉刷新"
                //                 titleColor="#999999"
                //                 colors={['#ff0000', '#00ff00', '#0000ff']}
                //                 progressBackgroundColor="#ffff00"/> : null
                //     }/>)
        }
    }

    /**
     * 更新数据
     */
    _updateData=()=> {
        // var listView = this.refs.listView
        // if (listView) {
        //     listView.scrollToIndex({index:0,animated: true});
        // }
        this.pageNum = 0
        this.dataSource.updateData()
        this.loadDataFromNet()
    }


    loadDataFromNet() {
        this.props.loadDataFromNet(this.pageNum, this.props.pageSize, (response, data) => {
            this.dataSource.freshFinish()
            if (response.rs) {
                if (null != response.content) {
                    if (this.props.isRenderFooter) {
                        if (data.length < this.props.pageSize && this.pageNum != 0) {
                            this.noMoreData()
                        } else {
                            this.dataSource.foot = 0
                        }
                    }

                    this.dataSource.datas = _.concat(this.dataSource.datas.slice(0), data)
                } else {
                    this.dataSource.datas = []
                }
            } else if (response.status === 422) {
                if (this.props.isRenderFooter) {
                    this.noMoreData()
                }
            } else {
                Toast.showShortCenter('数据加载失败，请稍后再试!')
                this.dataSource.foot = 0
                if (this.dataSource.datas.length === 0) {
                    this.dataSource.isTimeOut = true
                }
            }
        })
    }

    noMoreData() {
        this.dataSource.foot = 1
        this.dataSource.moreText = '没有更多数据'
    }

    renderFooter=()=> {
        if (!this.props.isRenderFooter) {
            return null
        }
        if (this.dataSource.foot === 1) {//加载完毕
            return (
                <View
                    style={[{
                        height: 40,
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        backgroundColor: indexBgColor.itemBg
                    }, this.props.footStyle]}>
                    <Text style={{color: listViewTxtColor.content, fontSize: Size.font12, marginTop: 10}}>
                        {this.dataSource.moreText}
                    </Text>
                </View>);
        } else if (this.dataSource.foot === 2) {//加载中
            return (
                <View
                    style={[{
                        height: 40,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: indexBgColor.itemBg
                    }, this.props.footStyle]}>
                    <Text style={{color: listViewTxtColor.content, fontSize: Size.font12, marginTop: 10}}>
                        加载中...
                    </Text>
                </View>)
        } else if (this.dataSource.foot === 0) {
            return (<View></View>)
        }
    }

    endReached=()=>{
        if (!this.props.isRenderFooter) {
            return
        }
        if (this.dataSource.foot != 0) {
            return;
        }
        if (this.dataSource.datas.length < this.props.pageSize) {
            return;
        }
        this.dataSource.foot = 2
        this.timer = setTimeout(
            () => {
                this.pageNum = this.pageNum + 1;
                this.loadDataFromNet()
            }, 500);
    }
}

class StateModel {

    @observable
    isTimeOut = false //请求超时
    @observable
    datas = [] //数据源
    @observable
    foot = 0// 控制foot， 0：隐藏foot  1：已加载完成   2 ：显示加载中
    @observable
    moreText = '加载更多'
    @observable
    isRefreshing = false //是否正在刷新
    @observable
    isLoading = true

    constructor() {
    }

    @action
    updateData() {
        this.datas = []
        this.isRefreshing = true
        this.isTimeOut = false
        this.isLoading = true;
    }

    @action
    freshFinish() {
        this.isLoading = false;
        this.isRefreshing = false
    }

    @computed
    get isNoData() {
        return this.datas.length === 0 && !this.isRefreshing
    }
}
