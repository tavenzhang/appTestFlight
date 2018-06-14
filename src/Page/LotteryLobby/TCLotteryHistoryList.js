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
    SectionList
} from 'react-native';
import {observer} from 'mobx-react/native';

import BaseComponent from '../Base/TCBaseComponent'
import TopNavigationBar from '../../Common/View/TCNavigationBar'
import TCListRowView from '../../Common/View/TCLottertHistoryListRowView'
import {trendServerAddress} from '../../Common/Network/TCRequestConfig';
import TCNavigatorHelper from '../../Common/JXHelper/TCNavigatorHelper'
import JXHelpers from '../../Common/JXHelper/JXHelper'
import JXLotteryHistoryData from '../../Data/JXLotteryHistoryData'
import {Size, width, height, indexBgColor, listViewTxtColor, buttonStyle} from '../../Page/resouce/theme'
import {withMappedNavigationProps} from 'react-navigation-props-mapper'

@observer
@withMappedNavigationProps()
export default class TCLotteryHistoryList extends BaseComponent {

    constructor(state) {
        super(state);
        this.state = {
            renderPlaceholderOnly: true
        };
        this.loadDataFormNet = this.loadDataFormNet.bind(this);
        this.dataSource = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2});
    }

    static defaultProps = {
        title: '',
        type: '',
        gameUniqueId: ''
    };



    componentWillMount() {
        this.lotteryHistoryData = new JXLotteryHistoryData();
    }

    componentDidMount() {
        super.componentDidMount();
        this.loadDataFormNet();
    }

    render() {
        let sp = super.render()
        if (sp) return sp

        return (
            <View style={JX_ThemeViewStyle.containView}>
                {this.getTopNavigationBar()}
                <ListView style={{height: height - 64-50}}
                          ref="ListView1"
                          dataSource={this.dataSource.cloneWithRows(this.lotteryHistoryData.historyData.slice())}
                          renderRow={(rowData, sectionID, rowID)=>this.renderRow(rowData, sectionID, rowID)}
                          removeClippedSubviews={false}
                          scrollRenderAheadDistance={20}
                          refreshControl={
                              <RefreshControl
                                  refreshing={this.lotteryHistoryData.isRefreshing}
                                  onRefresh={()=>this.loadDataFormNet()}
                                  tintColor="#ff0000"
                                  title="下拉刷新"
                                  titleColor="#999999"
                                  colors={['#ff0000', '#00ff00', '#0000ff']}
                                  progressBackgroundColor="#ffff00"
                              />
                          }
                />
                <TouchableOpacity style={{justifyContent:'center',alignItems:'center'}} onPress={()=> {
                    this.pushToBetHome(this.props.gameUniqueId)
                }}>
                    <View
                        style={{width:width-40,justifyContent:'center',alignItems:'center',height:40,marginLeft:20,marginRight: 20,marginBottom:5,marginTop:5,backgroundColor:buttonStyle.btnBg,borderRadius:5}}>
                        <Text style={{width:100,color:buttonStyle.btnTxtColor,fontSize:Size.font20,fontWeight:'bold'}}>立即下注</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }

    getTopNavigationBar() {
        if (JXHelpers.checkHaveTrend(this.props.gameUniqueId)) {
            return (<TopNavigationBar
                title={this.props.title}
                rightTitle={'走势图'}
                rightButtonCall={()=>{TCNavigatorHelper.pushView(JX_Compones.TCWebTrendView,{game:this.props.gameUniqueId,title:this.props.title})}}
                needBackButton={true}
                backButtonCall={()=> {
                    TCNavigatorHelper.popToBack()
                }}
            />)
        } else {
            return (<TopNavigationBar
                title={this.props.title}
                needBackButton={true}
                backButtonCall={()=> {
                    TCNavigatorHelper.popToBack()
                }}
            />)
        }
    }

    //CELL ROW DATA
    renderRow(rowData, sectionID, rowID) {
        return (
            <TCListRowView
                issue={rowData.uniqueIssueNumber}
                number={rowData.openCode}
                rowData={rowData}
                isFirstRow={rowID == 0 ? true : false}
            />
        )
    }

    pushToBetHome = (cpName) => {
        if (this.props.betBack) {
            TCNavigatorHelper.popToBack()
            return
        }
        let rowData = {}
        rowData.gameUniqueId = this.props.gameUniqueId
        rowData.gameNameInChinese = this.props.title
        TCNavigatorHelper.pushToBetHome(rowData)
    }

    loadDataFormNet() {
        let params = {limit: 100};
        this.lotteryHistoryData.getLotteryHistoryRequest(this.props.gameUniqueId, params, true,()=>{
          this.setState({ renderPlaceholderOnly: false});
          if (this.refs['ListView1']) {
            this.refs['ListView1'].scrollTo({x: 0, y: 0, animated: true})
          }
        });
    }
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: indexBgColor.mainBg,
    },

});

