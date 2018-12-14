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
import {observer} from 'mobx-react/native';

import TCListRowView from './TCLottertHistoryListRowView'
import {Size, width, indexBgColor, listViewTxtColor} from '../../Page/resouce/theme'
import {betIcon} from '../../Page/asset/images'
import NavigatorHelper from '../JXHelper/TCNavigatorHelper'
import JXLotteryHistoryData from '../../Data/JXLotteryHistoryData';
import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter';
import TCFlatList from "./RefreshListView/TCFLatList";
import {TC_LayoutAnimaton} from "./layoutAnimation/LayoutAnimaton";


@observer
export default class TCHomeHistoryListNew extends React.Component {

    constructor(state) {
        super(state);
        this.loadDataFormNet = this.loadDataFormNet.bind(this);
        this.dataSource = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2});
        this.isLoading = false;
        this.state = {
            height: this.props.height,
            listHightState:0
        }
        this.isChanging=false
    }

    static defaultProps = {
        title: '',
        gameUniqueId: '',
        isHighlightStyle: true,
        height: 1,
        panResponder: null,
    };


    componentWillMount() {
        this.lotteryHistoryData = new JXLotteryHistoryData();
        setTimeout(()=>{
            this.loadDataFormNet();
        },1500)
    }

    onShowListView=()=>{
        let {onGuestureChange}=this.props
        TWLog("TCJPK----------onShowListView--pre",this.state.listHightState)
        if(this.state.listHightState<2){
            if(!this.isChanging){
                this.isChanging=true;
                TWLog("TCJPK----------onShowListView--start",this.state.listHightState)
                this.setState({listHightState:this.state.listHightState+1},()=>{
                    setTimeout(()=>{
                        this.isChanging=false;
                    },300)

                    onGuestureChange(true);
                })
            }

        }
    }

    onHideListView=()=>{
        let {onGuestureChange}=this.props
        TWLog("TCJPK----------onHideListView--pre",this.state.listHightState)
        if(this.state.listHightState>0){
            if(!this.isChanging) {
                this.isChanging = true;
                TWLog("TCJPK----------onHideListView--start",this.state.listHightState)
                this.setState({listHightState: this.state.listHightState - 1}, () => {
                    setTimeout(()=>{
                        this.isChanging=false;
                    },300)
                    if(this.state.listHightState==0){
                        onGuestureChange(false);
                    }
                })
            }
        }

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
        if(this.state.listHightState==0){
            return null
        }
        return (
            <View
                style={[styles.container]} >
                {this.getHomeHistoryTopView()}
                {this.renderListView()}
                {this.getHomeHistoryBottomView()}
            </View>
        );
    }

    renderLoading() {
        return (
            <ActivityIndicator size='small' style={[styles.centering, {paddingTop: this.props.height * 0.5 - 26}]}/>
        );
    }

    renderListView() {
        // if (!this.lotteryHistoryData.historyData || this.lotteryHistoryData.historyData.length <= 0) {
        //     return (
        //         <View style={styles.dataFailView}>
        //             <Text>未加载出数据</Text>
        //         </View>
        //     );
        // }
        let h=0;
        if(this.state.listHightState==1){
            h=128;
        }else if(this.state.listHightState==2){
            h=256
        }
      TWLog("TCJPK-------renderListView--this.state.listHightState=="+this.state.listHightState,h)
       // style={[{height: this.state.height - 52}]}
        return (
            <View pointerEvents={"none"}>
            <TCFlatList  style={[{height: h}]}
                      dataS={this.lotteryHistoryData.historyData.slice()}
                      renderRow={this.renderRow}
                      pageSize={5}
                      // onScroll={this.onScrollList}
            />
            </View>
        );
    }

    onScrollList=()=> {
        if (this.state.height < 312) {
            this.setState({height: 312});
            RCTDeviceEventEmitter.emit('heightChange')
        }
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

    pushToMoreHistory=()=> {
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

