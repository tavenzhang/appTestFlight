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
} from 'react-native';
import {observer} from 'mobx-react/native';

import TCListRowView from './TCLottertHistoryListRowView'
import {Size, width, indexBgColor, listViewTxtColor} from '../../Page/resouce/theme'
import {betIcon} from '../../Page/resouce/images'
import NavigatorHelper from '../JXHelper/TCNavigatorHelper'
import JXLotteryHistoryData from '../../Data/JXLotteryHistoryData'

@observer
export default class TCHomeHistoryList extends React.Component {

    constructor(state) {
        super(state);
        this.loadDataFormNet = this.loadDataFormNet.bind(this);
        this.dataSource = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2});
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
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.height == 0 && this.props.height < nextProps.height) {
            this.loadDataFormNet();
        }
    }

    render() {
        return (
            <View style={[styles.container, {height: this.props.height}]} {...this.props.panResponder.panHandlers}>
                {this.getHomeHistoryTopView()}
                {this.lotteryHistoryData.isRefreshing ? this.renderLoading() : this.renderListView()}
                {!this.lotteryHistoryData.isRefreshing && this.getHomeHistoryBottomView()}
            </View>
        );
    }

    renderLoading() {
        return (
            <ActivityIndicator size='small'/>
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
            <ListView style={[{height: this.props.height - 52}]}
                      ref="ListView1"
                      dataSource={this.dataSource.cloneWithRows(this.lotteryHistoryData.historyData.slice())}
                      renderRow={(rowData, sectionID, rowID) => this.renderRow(rowData, sectionID, rowID)}
                      removeClippedSubviews={false}
                      scrollRenderAheadDistance={20}
                      scrollEnabled={false}
                      showsVerticalScrollIndicator={false}
                      showsHorizontalScrollIndicator={false}
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
                <Text allowFontScaling={false} style={[styles.homeHistoryIssueText, gameUniqueIdIsSSC && styles.sscIssueText]}>期次</Text>
                <Text allowFontScaling={false} style={[styles.homeHistoryOpenCodeText, gameUniqueIdIsSSC && styles.sscOpenCodeText]}>开奖号码</Text>
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
                        <Image style={styles.showMoreHistoryImage} source={betIcon.handPointing} resizeMode={'contain'}/>
                        <Text allowFontScaling={false} style={styles.showMoreHistoryText}>点击查看更多开奖历史</Text>
                    </View>
                </TouchableOpacity>
                <View style={styles.homeHistoryBottomOtherView}/>
            </View>
        );
    }

    pushToMoreHistory(gameUniqueId) {
        NavigatorHelper.pushToLotteryHistoryList(this.props.title, gameUniqueId, true);
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
        let params = {limit: 10};
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
});

