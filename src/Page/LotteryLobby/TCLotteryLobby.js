import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
    Image,
    Platform,
    ScrollView,
    ListView,
    TouchableHighlight,
    RefreshControl
} from 'react-native';


import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter'
import RowCell from './View/TCLotteryLobbyRowView'
import TopNavigationBar from '../../Common/View/TCNavigationBar'
import LotteryHistoryList from './TCLotteryHistoryList'
import LotteryResultData from '../../Data/JXLotteryResultData'
import {indexBgColor, height, width} from '../resouce/theme'
import {JX_PLAT_INFO, bottomNavHeight} from '../asset'
import NavigatorHelper from '../../Common/JXHelper/TCNavigatorHelper';
import TCFlatList from "../../Common/View/RefreshListView/TCFLatList";
import {TC_LayoutAnimaton} from "../../Common/View/layoutAnimation/LayoutAnimaton";
import {observer, inject} from 'mobx-react'
@inject("mainStore")
@observer
export default class TCLotteryLobby extends React.Component {
    constructor(state) {
        super(state)
        this.state = {
            isRefreshing: false
        }

    }

    componentWillUpdate() {
        TC_LayoutAnimaton.configureNext(TC_LayoutAnimaton.easeNoDelete);
    }

    componentWillMount() {
        this.lotteryResultData = new LotteryResultData();
    }

    componentDidMount() {
        if (this.lotteryResultData.resultsData && this.lotteryResultData.resultsData.length > 0) {
            this.setState({isRefreshing: false})
        }
    }

    componentWillUnmount() {
        this.lotteryResultData && this.lotteryResultData.clear();
    }

    render() {
        return (
            <View style={JX_PLAT_INFO.IS_IphoneX ? styles.containerIOS : styles.container}>
                <TopNavigationBar title='开奖大厅' needBackButton={true}
                                  backButtonCall={() => this.props.mainStore.changeTab('home')}
                />
                {/*列表*/}
                <TCFlatList
                    dataS={this.lotteryResultData.resultsData.slice()}
                    renderRow={this.renderRow}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.isRefreshing}
                            onRefresh={this.loadDataFormNet}
                            tintColor="#ff0000"
                            title="下拉刷新"
                            titleColor="#999999"
                            colors={['#ff0000', '#00ff00', '#0000ff']}
                            progressBackgroundColor="#ffff00"
                        />
                    }
                />
            </View>
        )
    }

    //CELL ROW DATA
    renderRow=(rowData)=> {
        return (
            <RowCell
                cpName={rowData.gameNameInChinese}
                cpNumbers={rowData.lastOpenCode}
                rowData={rowData}
                pushEvent={(cP) => this._pushToBetHome3(rowData)}
            />
        )
    }

    _pushToBetHome3=(rowData)=>{
        NavigatorHelper.pushToLotteryHistoryList({
            title: rowData.gameNameInChinese,
            gameUniqueId: rowData.gameUniqueId
        })
    }

    loadDataFormNet=()=>  {
        this.lotteryResultData.getLotteryDetailRequest();

        if (this.lotteryResultData.resultsData && this.lotteryResultData.resultsData.length > 0) {
            this.setState({isRefreshing: false});
        }
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: indexBgColor.mainBg
    },
    containerIOS: {
        height: height - bottomNavHeight,
        width: width,
        backgroundColor: indexBgColor.mainBg
    },
});
