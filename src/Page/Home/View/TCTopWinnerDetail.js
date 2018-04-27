/**
 * Created by Sam on 10/02/2017.
 * Copyright © 2017年 JX. All rights reserved.
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ListView,
    Dimensions,
    RefreshControl
} from 'react-native';

/**系统 npm类 */
import Toast from '@remobile/react-native-toast';

/**组件内部显示需要引入的类 */
import TopNavigationBar from '../../../Common/View/TCNavigationBar';
import {width, height, indexBgColor, listViewTxtColor, indexTxtColor} from '../../resouce/theme'
/** 外部关系组件 如 页面跳转用 */
import {config, appId} from '../../../Common/Network/TCRequestConfig';
import NetUitls from '../../../Common/Network/TCRequestUitls'
import Helper from '../../../Common/JXHelper/TCNavigatorHelper';
import {withMappedNavigationProps} from 'react-navigation-props-mapper'

@withMappedNavigationProps()
export default class MyComponent extends React.Component {
    constructor(state) {
        super(state)
        this.state = {
            dataSource: new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2}),
            isRefreshing:false
        }
    }

    static defaultProps = {}

    componentDidMount() {
        this.request()
    }

    componentWillUnmount() {
        this.timer && clearInterval(this.timer)
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.container}>
                    <TopNavigationBar title='最新中奖榜' needBackButton={true} backButtonCall={()=> {
                        Helper.popToBack()
                    }}/>
                    <View
                        style={{flexDirection: 'row', justifyContent: 'space-between', backgroundColor:indexBgColor.mainBg, padding: 5}}>
                        <Text style={{marginLeft: 10, fontSize: 15, color: listViewTxtColor.title,width:60}}>用户名</Text>
                        <Text style={{fontSize: 15, color: listViewTxtColor.title,width:80}}>中奖金额</Text>
                        <Text style={{marginRight: 20, fontSize: 15, color: listViewTxtColor.title,width:80}}>彩种</Text>
                    </View>
                    <ListView
                        style={{height: height - 104}}
                        dataSource={this.state.dataSource}
                        renderRow={(rowData, sectionID, rowID)=>this.renderRow(rowData, sectionID, rowID)}
                        ref="ListView"
                        removeClippedSubviews={false}
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.isRefreshing}
                                onRefresh={()=>this.request()}
                                tintColor="#ff0000"
                                title="下拉刷新"
                                titleColor="#999999"
                                colors={['#ff0000', '#00ff00', '#0000ff']}
                                progressBackgroundColor="#ffff00"
                            />
                        }
                    />
                </View>
            </View>
        )
    }

    renderRow(rowData, sectionID, rowID) {
        return (
            <TopWinnerLabel data={rowData}/>
        )
    }

    request() {
        if (this.state.isLoading) return
        this.setState({
            isLoading:true
        })
        NetUitls.getUrlAndParamsAndCallback(config.api.findTopWinners, {clientId: appId}, (data) => {
            if (this.refs['ListView']) {
                this.refs['ListView'].scrollTo({x: 0, y: 0, animated: true})
            }
            this.timer = setTimeout(() => {
                this.setState({
                    isLoading:false,
                })
            }, 3000)
            if (data && data.content) {
                this.props.winnerTarget.updateAction(data.content)
                this.setState({
                    isRefreshing:false,
                    dataSource: this.state.dataSource.cloneWithRows(data.content),
                })
            } else {
                this.setState({
                    isRefreshing:false,
                })
                Toast.showShortCenter('网络异常 请稍后再试')
            }
        }, null, true)
    }

}

class TopWinnerLabel extends React.Component {
    constructor(state) {
        super(state)
        this.state = {}
    }

    static defaultProps = {
        data: {}
    }

    componentDidMount() {
    }

    render() {
        return (
            <View style={styles.labelStyle}>
                <Text
                    style={{width: 70, marginLeft: 10,marginRight:20,color: indexTxtColor.winner}}>{this.props.data.username}</Text>
                <Text
                    style={{width: width / 3+20, color: indexTxtColor.winnerMoney,fontSize:width>=375?15:13}}>喜中{this.props.data.winningAmount}元</Text>
                <Text
                    style={{width: width / 3+30, color: indexTxtColor.winnerCpName,fontSize:width>=375?15:13}}>购买{this.props.data.gameNameInChinese}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: indexBgColor.mainBg,
    },
    labelStyle: {
        marginTop: 0,
        backgroundColor: indexBgColor.itemBg,
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 40,
        borderBottomWidth: TCLineW,
        borderBottomColor: indexBgColor.mainBg,
        alignItems: 'center'
    }
});
