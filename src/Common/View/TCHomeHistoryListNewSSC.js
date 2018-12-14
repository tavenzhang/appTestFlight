/**
 * Created by Joyce on 2017/08/19.
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    ActivityIndicator,
} from 'react-native';


import TCListRowView from './TCLottertHistoryListRowView'
import {Size, width, indexBgColor, listViewTxtColor} from '../../Page/resouce/theme'
import {betIcon} from '../../Page/asset/images'
import NavigatorHelper from '../JXHelper/TCNavigatorHelper'
import JXLotteryHistoryData from '../../Data/JXLotteryHistoryData'
import TCFlatList from "./RefreshListView/TCFLatList";
import {TC_LayoutAnimaton} from "./layoutAnimation/LayoutAnimaton";
import {observer} from 'mobx-react/native';
import PropTypes from 'prop-types'
@observer
export default class TCHomeHistoryList extends React.Component {

    constructor(state) {
        super(state);
        this.isLoading = false;
        this.state = {
            height: this.props.height
        }
        this.hightViewNum=0;
    }
    static  propTypes={
        title: PropTypes.text,
        gameUniqueId: PropTypes.any,
        isHighlightStyle: PropTypes.any,
        height: PropTypes.any,
    }

    static defaultProps = {
        title: '',
        gameUniqueId: '',
        isHighlightStyle: true,
        height: 0,
    };

    componentWillUpdate() {
        TC_LayoutAnimaton.configureNext(TC_LayoutAnimaton.easeNoDelete);
    }

    componentWillMount() {
        this.lotteryHistoryData = new JXLotteryHistoryData();
        setTimeout(()=>{
            this.loadDataFormNet();
        },1500)
    }


    updateHistoryHight=(gustrueState)=>{
      //  TWLog("TCSSC------------TCHomeHistoryList----gustrueState---------top==="+gustrueState.topFinal+"--gustrueState.gestureCase == null=="
      //       +(gustrueState.gestureCase == null)
      //       ,(gustrueState.gestureCase ? gustrueState.gestureCase.dy:0  + gustrueState.moveTop))
        let historyHeight = gustrueState.gestureCase == null ? gustrueState.topFinal : gustrueState.gestureCase.dy + gustrueState.moveTop;
        if (historyHeight < 0) {
            historyHeight = 0;
        } else if (historyHeight > 312) {
            historyHeight = 312;
        }

        this.refs.historyView.setNativeProps({height:historyHeight});
        //用户从0开始下拉 获取新数据
        if(this.hightViewNum ==0 &&historyHeight>0){
            clearTimeout(this.timeOut);
            this.timeOut=setTimeout(()=>{this.loadDataFormNet()},200);

        }
        this.hightViewNum = historyHeight;
    }

   getHightState=(hightView=null)=>{
        let testHight = hightView ? hightView : this.hightViewNum;
        let hightState = 0
        if(testHight==0){
            hightState=0
        }
        else if(testHight<=182){
            hightState =1
        }else{
            hightState =2
        }
        return hightState;
    }

    render() {
        TWLog("TCSSC------------TCHomeHistoryList----render---------",this.state);
        let dataList=this.lotteryHistoryData.historyData.slice();
        return (
            <View ref="historyView" style={[styles.container,{height:this.state.height}]}>
                {this.getHomeHistoryTopView()}
                {dataList.length<=0 ? null: this.renderListView()}
                {dataList.length>0 && this.getHomeHistoryBottomView()}
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


        return ( <TCFlatList
            dataS={this.lotteryHistoryData.historyData.slice()}
            initialNumToRender={6}
            renderRow={this.renderRow}
        />)
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
    renderRow=(rowData, sectionID, rowID)=> {
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

    loadDataFormNet=()=> {
        let params = {limit: 50};
        if(!this.lotteryHistoryData.isRefreshing){
            this.lotteryHistoryData.getLotteryHistoryRequest(this.props.gameUniqueId, params);
        }
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

