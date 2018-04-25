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
import LotteryHistoryList from './TCLotteryHistoryList'
import LotteryResultData from '../../Data/JXLotteryResultData'
import {indexBgColor} from '../resouce/theme'

@observer
export default class TCLotteryLobby extends React.Component {
    constructor(state) {
        super(state)
        this.state = {
            isRefreshing: false
        }
        this.dataSource = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2});
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
        this.lotteryResultData && this.lotteryResultData.clear();;
    }

    render() {
        return (
            <View style={styles.container}>
                <TopNavigationBar title='开奖大厅' needBackButton={true}
                                  backButtonCall={() => {
                                      RCTDeviceEventEmitter.emit('setSelectedTabNavigator', 'home');
                                  }}
                />
                {/*列表*/}
                <ListView
                    ref="ListView"
                    dataSource={this.dataSource.cloneWithRows(this.lotteryResultData.resultsData.slice())}
                    renderRow={(rowData) => this.renderRow(rowData)}
                    removeClippedSubviews={false}
                    enableEmptySections={true}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.isRefreshing}
                            onRefresh={()=>this.loadDataFormNet(true)}
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
    renderRow(rowData) {
        return (
            <RowCell
                cpName={rowData.gameNameInChinese}
                cpNumbers={rowData.lastOpenCode}
                rowData={rowData}
                pushEvent={(cP)=>this._pushToBetHome3(rowData)}
            />
        )
    }

    _pushToBetHome3(rowData) {
        let {navigator} = this.props;
        if (navigator) {
            navigator.push({
                name: 'detail',
                component: LotteryHistoryList,
                passProps: {
                    title: rowData.gameNameInChinese,
                    gameUniqueId: rowData.gameUniqueId
                }
            })
        }
    }

    loadDataFormNet(manual) {
        this.lotteryResultData.getLotteryDetailRequest();
        if (manual) {
            this.refs['ListView'].scrollTo({x: 0, y: 0, animated: true})
        }

        if(this.lotteryResultData.resultsData && this.lotteryResultData.resultsData.length > 0){
            this.setState({isRefreshing: false});
        }
    }

    endRefreshing(){
        this.setState({isRefreshing: false});
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: indexBgColor.mainBg,
    }
});
