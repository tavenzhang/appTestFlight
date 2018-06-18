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
import { observer } from 'mobx-react/native';

import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter'
import RowCell from './View/TCLotteryLobbyRowView'
import TopNavigationBar from '../../Common/View/TCNavigationBar'
import LotteryResultData from '../../Data/JXLotteryResultData'
import {indexBgColor,height,width,bottomNavHeight,JX_PLAT_INFO} from '../resouce/theme'
import NavigatorHelper from '../../Common/JXHelper/TCNavigatorHelper';
import TCFlatList from "../../Common/View/RefreshListView/TCFLatList";

@observer
export default class TCLotteryLobby extends React.Component {
    constructor(state) {
        super(state)
        this.state = {
            isRefreshing: false
        }
        this.dataSource = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2});
    }

    componentWillUpdate() {
        JX_LayoutAnimaton.configureNext(JX_LayoutAnimaton.easeNoDelete)
    }

    componentWillMount() {
        this.lotteryResultData = new LotteryResultData();
    }

    componentDidMount() {
        if(this.lotteryResultData.resultsData && this.lotteryResultData.resultsData.length > 0) {
            this.setState({ isRefreshing: false})
        }
    }

    componentWillUnmount() {
        this.lotteryResultData && this.lotteryResultData.clear();
    }

    render() {
        return (
            <View style={JX_PLAT_INFO.IS_IphoneX?styles.containerIOS:styles.container}>
                <TopNavigationBar title='开奖大厅' needBackButton={true}
                                  backButtonCall={() => {
                                      RCTDeviceEventEmitter.emit('' +
                                          'setSelectedTabNavigator', 'home');
                                  }}
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
                pushEvent={(cP)=>this._pushToBetHome3(rowData)}
            />
        )
    }

    _pushToBetHome3=(rowData)=> {
        NavigatorHelper.pushToLotteryHistoryList({title: rowData.gameNameInChinese,
            gameUniqueId: rowData.gameUniqueId})
    }

    loadDataFormNet=(manual=true)=> {
        this.lotteryResultData.getLotteryDetailRequest();
        if(this.lotteryResultData.resultsData && this.lotteryResultData.resultsData.length > 0){
            this.setState({isRefreshing: false});
        }
    }

}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: indexBgColor.mainBg
    },
    containerIOS:{
        height:height-bottomNavHeight,
        width:width,
        backgroundColor: indexBgColor.mainBg
    },
});
