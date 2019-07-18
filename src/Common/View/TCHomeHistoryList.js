/**
 * Created by Joyce on 2017/08/19.
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ListView,
    TouchableOpacity,
    Image,
    ActivityIndicator,
    PanResponder
} from 'react-native';
import {observer} from 'mobx-react';

import TCListRowView from './TCLottertHistoryListRowView'
import {Size, width, indexBgColor, listViewTxtColor} from '../../Page/asset/game/themeComponet'
import {betIcon} from '../../Page/asset/images'
import NavigatorHelper from '../JXHelper/TCNavigatorHelper'
import JXLotteryHistoryData from '../../Data/JXLotteryHistoryData'
import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter'


@observer
export default class TCHomeHistoryList extends React.Component {

    constructor(state) {
        super(state);
        this.loadDataFormNet = this.loadDataFormNet.bind(this);
        this.dataSource = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2});
        this.isLoading = false;
        this.state = {
            height: this.props.height
        }
    }

    static defaultProps = {
        title: '',
        gameUniqueId: '',
        isHighlightStyle: true,
        height: 0,
        panResponder: null,
    };


    componentWillMount() {
        this.lotteryHistoryData = new JXLotteryHistoryData();
        setTimeout(()=>{
            this.loadDataFormNet();
        },1300)
    }


    componentWillReceiveProps(nextProps) {
        if (this.props.height === 0 && this.props.height < nextProps.height) {
            this.loadDataFormNet();
        }
        this.setState({
            height: nextProps.height
        })
    }

    render() {
        return (
            <View
                style={[styles.container, {height: this.state.height}]}>
                {this.getHomeHistoryTopView()}
                {this.lotteryHistoryData.isRefreshing ? this.renderLoading() : this.renderListView()}
                {!this.lotteryHistoryData.isRefreshing && this.getHomeHistoryBottomView()}
            </View>
        );
    }

    renderLoading() {
        return (
            <ActivityIndicator size='small' style={[styles.centering, {paddingTop: this.props.height * 0.5 - 26}]}/>
        );
    }

    renderListView() {
        if (!this.lotteryHistoryData.historyData || this.lotteryHistoryData.historyData.length <= 0) {
            return (
                <View style={styles.dataFailView}>
                    <Text>未加载出数据</Text>
                </View>
            );
        }

        return (
            <ListView style={[{height: this.state.height - 52}]}
                      ref="ListView1"
                      dataSource={this.dataSource.cloneWithRows(this.lotteryHistoryData.historyData.slice())}
                      renderRow={(rowData, sectionID, rowID) => this.renderRow(rowData, sectionID, rowID)}
                      removeClippedSubviews={false}
                      scrollRenderAheadDistance={20}
                      scrollEnabled={true}
                      pageSize={5}
                      showsVerticalScrollIndicator={true}
                      showsHorizontalScrollIndicator={false}
                      onScroll={() => {
                          if (this.state.height < 312) {
                              this.setState({
                                  height: 312
                              });
                              RCTDeviceEventEmitter.emit('heightChange');
                          }
                      }}
            />
        );
    }

    getHomeHistoryTopView() {
        let gameUniqueIdIsSSC = false;
        if (this.props.gameUniqueId.indexOf('SSC') >= 0) {
            gameUniqueIdIsSSC = true;
        }
        return (
            <View style={styles.homeHistoryTopView}>
                <Text allowFontScaling={false}
                      style={[styles.homeHistoryIssueText, gameUniqueIdIsSSC && styles.sscIssueText]}>期次</Text>
                <Text allowFontScaling={false}
                      style={[styles.homeHistoryOpenCodeText, gameUniqueIdIsSSC && styles.sscOpenCodeText]}>开奖号码</Text>
            </View>
        );
    }

    getHomeHistoryBottomView() {
        return (
            <View style={styles.homeHistoryBottomView}>
                <TouchableOpacity onPress={() => {
                    this.pushToMoreHistory(this.props.gameUniqueId)
                }}>
                    <View style={styles.homeHistoryBottomTouchable}>
                        <Image style={styles.showMoreHistoryImage} source={betIcon.handPointing}
                               resizeMode={'contain'}/>
                        <Text allowFontScaling={false} style={styles.showMoreHistoryText}>点击查看更多开奖历史</Text>
                    </View>
                </TouchableOpacity>
                <View style={styles.homeHistoryBottomOtherView}/>
            </View>
        );
    }

    pushToMoreHistory() {
        NavigatorHelper.pushToLotteryHistoryList({
            title: this.props.title,
            gameUniqueId: this.props.gameUniqueId,
            betBack: true
        })
    }

    //CELL ROW DATA
    renderRow(rowData, sectionID, rowID) {
        return (
            <TCListRowView
                issue={rowData.uniqueIssueNumber}
                number={rowData.openCode}
                rowData={rowData}
                isFirstRow={rowID == 0 ? true : false}
                isBetHomeHistory={true}
                isHighlightStyle={this.props.isHighlightStyle}
                rowId={rowID}
            />
        )
    }

    loadDataFormNet() {
        let params = {limit: 50};
        this.lotteryHistoryData.getLotteryHistoryRequest(this.props.gameUniqueId, params, true);
    }
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: indexBgColor.mainBg,
    },
    dataFailView: {
        width: width,
        alignItems: 'center',
    },
    homeHistoryTopView: {
        height: 26,
        backgroundColor: indexBgColor.homeHistoryEvenBg,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    homeHistoryBottomView: {
        height: 26,
        borderBottomWidth: TCLineW,
        borderBottomColor: indexBgColor.mainBg,
        backgroundColor: indexBgColor.itemBg,
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    homeHistoryBottomTouchable: {
        height: 26,
        width: 150,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    homeHistoryBottomOtherView: {
        height: 25,
        width: width - 150,
        backgroundColor: indexBgColor.itemBg,
    },
    homeHistoryIssueText: {
        width: width * 0.3,
        textAlign: 'center',
        justifyContent: 'center',
        color: listViewTxtColor.homeHistoryStrong,
        fontSize: Size.xsmall,
    },
    homeHistoryOpenCodeText: {
        width: width * 0.7,
        textAlign: 'center',
        color: listViewTxtColor.homeHistoryStrong,
        fontSize: Size.xsmall,
    },
    showMoreHistoryImage: {
        width: 20,
        height: 20,
    },
    showMoreHistoryText: {
        marginLeft: 3,
        color: listViewTxtColor.homeHistoryStrong,
        fontSize: Size.xsmall,
    },
    sscIssueText: {
        width: width * 0.15,
    },
    sscOpenCodeText: {
        width: width * 0.85,
    },
    centering: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8
    },
});

