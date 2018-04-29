import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Dimensions,
    Platform,
    ScrollView,
    PanResponder,
    Image,
    Alert
} from 'react-native';

//系统 npm类
import Toast from '../../../../Common/JXHelper/JXToast';
import LoadingSpinnerOverlay from '../../../../Common/View/LoadingSpinnerOverlay'
import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter'
import {observer} from 'mobx-react/native';


//组件内部显示需要引入的类
import TopNavigationBar from '../../View/TCBetBar'
import TCHappyPoker_MainView from './view/TCHappyPoker_MainView'
import TCSelectPopupView from '../../View/TCPlayMethodSelectPopupView'
import AwardCoundtdownView from '../../View/TCBetAwardCountdown'
import TCBetHomeBottomView from '../../View/TCBetHomeBottomView'
import TCBetSettingModal from '../../View/TCBetSettingModal'
import TCBetHelperModal from '../../View/TCBetHelperModal'
import TCBetGoBackShoppingCart from '../../View/TCBetGoBackShoppingCart'
import TCBetShakeButtonView from '../../View/TCBetShakeButtonView'
import TCBetBalanceButton from '../../View/TCBetBalanceButton'

// 外部关系组件 如 页面跳转用
import TCBetBill from '../../../Bill/TCBetBill'
import HappyPokerDPS from './data/TCHappyPoker_DPS'
import NavigatorHelper from '../../../../Common/JXHelper/TCNavigatorHelper'
import JXHelper from '../../../../Common/JXHelper/JXHelper'
import JXCurrentResultData from '../../../../Data/JXCurrentResultData'
import JXUserPlayNumberEvent from '../../../../Data/JXUserPlayNumberEvent'
import TCHomeHistoryList from '../../../../Common/View/TCHomeHistoryList'
import {MathControllerFactory} from 'lottery-core'
let SingletonDPS = null;
let myPlayMath = '';
let myGameSetting = null
import {height, betHome, indexBgColor, statusBarHeight} from '../../../resouce/theme'
import TCIntelligenceBetData from "../../../Bill/IntelligenceBet/TCIntelligenceBetData";

import {withMappedNavigationProps} from 'react-navigation-props-mapper'

@withMappedNavigationProps()
@observer
export default class TCHappyPokerBetHome extends React.Component {
    constructor(state) {
        super(state);
        this.state = {
            cpInfoData: {},
            gestureCase:null,
            moveTop:0,
            topFinal:0,
        };
        this.helperJumpTo = this.helperJumpTo.bind(this);
        SingletonDPS=MathControllerFactory.getInstance().getMathController(this.props.gameUniqueId);
    }



    static defaultProps = {
        cp_playMath: '包选',
        unit_price: 2,
        gameUniqueId: ''
    }

    _panResponder = {}

    componentWillMount() {
        this.userPlayNumberEvent = new JXUserPlayNumberEvent(SingletonDPS)
        this.currentResultData = new JXCurrentResultData(this.props.gameUniqueId)
        myPlayMath=this.props.cp_playMath;
        SingletonDPS.setGameUniqueId(this.props.gameUniqueId);
        SingletonDPS.filterPlayType(TCGameSetting.content['allGamesPrizeSettings'][this.props.gameUniqueId]["singleGamePrizeSettings"]);
        myPlayMath=SingletonDPS.getDefaultPlayNameFromFilterArray(this.props.cp_playMath);
        SingletonDPS.resetAllData(myPlayMath);
        this._panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (evt, gestureState) => true,
            onMoveShouldSetPanResponder: (evt, gestureState) => {
                const { dx } = gestureState;
                return Math.abs(dx) > 0;
            },
            onPanResponderGrant: (evt, gestureState) => {
                this.setState({
                    isBegin: true,
                    isMove: false,
                    isEnd: false,
                    gestureCase: gestureState,
                    moveTop: this.state.topFinal
                })
            },
            onPanResponderMove: (evt, gestureState) => {
                if(this.state.topFinal >= 312 && gestureState.vy > 0){
                    return;
                }

                if (gestureState.vy > 0 && gestureState.dy >= 312 || this.state.topFinal == 182 && gestureState.dy >= 182){
                    this.setState({isBegin: false, isMove: false, isEnd: true, gestureCase: null, topFinal: 312,})
                }else {
                    this.setState({isBegin: false, isMove: true, isEnd: false, gestureCase: gestureState});
                }
            },
            onPanResponderRelease: (evt, gestureState) => {
                let topFailHeight = 0;
                if(gestureState.vy > 0 && gestureState.dy > 0){
                    topFailHeight = 312;
                } else if (gestureState.vy == 0){
                    if(this.state.topFinal == 0 && gestureState.dy >= 0){
                        topFailHeight = 182;
                    } else {
                        topFailHeight = 0;
                    }
                } else if (gestureState.vy < 0 ) {
                    topFailHeight = 0;
                }

                this.setState({
                    isBegin: false,
                    isMove: false,
                    isEnd: true,
                    gestureCase: null,
                    topFinal: topFailHeight,
                })
            },
            onPanResponderTerminate: (evt, gestureState) => {
                this.setState({isBegin: false, isMove: false, isEnd: true, gestureCase: null, topFinal: gestureState.vy >= 0 ? 312 : 0})
            },
        });
    }

    render() {
        let historyHeight = this.state.gestureCase == null ? this.state.topFinal : this.state.gestureCase.dy + this.state.moveTop;
        if (historyHeight < 0){
            historyHeight = 0;
        }else if(historyHeight > 312){
            historyHeight = 312;
        }

        return (
            <View style={styles.container}>
                <TopNavigationBar
                    ref='TopNavigationBar'
                    backButtonCall={()=> {
                        this.goBack()
                    }}
                    centerButtonCall={()=> {
                        this.showPopView()
                    }}
                    rightButtonCall={ () => {
                        this.refs['TCBetHelperModal']._setModalVisible(true)
                    } }
                    title={myPlayMath}
                />
                <TCSelectPopupView
                    ref='TCSelectPopupView'
                    selectTitleArr={this.initialPlayMath()}
                    selectedFunc={(index, areaIndex) => {
                        this.choosePlayType(index, areaIndex)
                    }}
                />
                <TCBetHelperModal
                    ref="TCBetHelperModal"
                    selectedFunc={this.helperJumpTo}
                    gameUniqueId={this.props.gameUniqueId}
                />
                <AwardCoundtdownView
                    resultsData={this.currentResultData.resultsData}
                    isHappyPoker={true}
                />

                <View style={{width:Dimensions.get('window').width,height:historyHeight,backgroundColor:'green'}}>
                    <TCHomeHistoryList
                        height={historyHeight}
                        gameUniqueId={this.props.gameUniqueId}
                        title={this.props.title}
                        isHighlightStyle={true}
                        panResponder={this._panResponder}
                    />
                </View>
                <View
                    style={{
                        flexDirection:'column',
                        justifyContent:'flex-start',
                        height:13,
                        width:Dimensions.get('window').width,
                        alignItems:'center',
                        backgroundColor:betHome.betTopItemBg,
                    }}
                    {...this._panResponder.panHandlers}>
                    <Image
                        source={ historyHeight >= 26 * 7 ?
                            require('../../../resouce/addon/other/stdui_arrow_up.png') :
                            require('../../../resouce/addon/other/stdui_arrow_down.png')
                        }
                        resizeMode ={'contain'}
                        style={{height: 13, width: 55, marginTop: 0}}
                    />
                </View>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems:'center',
                        backgroundColor:betHome.betTopItemBg
                    }} {...this._panResponder.panHandlers}>
                    <TCBetShakeButtonView ref="TCBetShakeButtonView" style={{position: 'absolute', top: 0}} shakeEvent={()=>this.byShake()}/>
                    <TCBetBalanceButton style={{}} shakeEvent={()=>this.byShake()}/>
                    {this.getShoppingCartView()}
                </View>

                <View style={{height: (height - statusBarHeight - 44 - 70 - 49 - 20 - 20 - historyHeight)}}>
                    <ScrollView ref="contentScrollView">{this.initialContentView()}</ScrollView>
                </View>
                <TCBetHomeBottomView ref="TCBetHomeBottomView"
                                     leftButtonCallEvent={()=>this.randomSelect()}
                                     rightButtonCallEvent={()=>this.checkNumbers()}
                                     clearButtonCallEvent={()=>this.clearSelectedNumbers()}
                                     data={this.userPlayNumberEvent.str}
                                     mob={true}
                />
                <TCBetSettingModal ref='betSettingModal' settingEndingEvent={(e)=>this.betSetEndingEvent(e)}/>
                <LoadingSpinnerOverlay
                    ref={ component => this._modalLoadingSpinnerOverLay = component }
                />
            </View>
        )
    }


    componentDidMount() {
        this.clearSelectedNumbers()
        // myPlayMath = this.props.cp_playMath

        this.refs['TCBetShakeButtonView'].resetPlayMath(myPlayMath, this.props.gameUniqueId)

        this.listener = RCTDeviceEventEmitter.addListener('upDataUI_forBillDataChange', () => {
            this.userPlayNumberEvent.userNumberCallBackRefresh()
        });
        this.checkGameSetting()
    }

    componentWillUnmount() {
        this.listener && this.listener.remove();
        this.currentResultData && this.currentResultData.clear();
        TCIntelligenceBetData.getInstance()&&TCIntelligenceBetData.getInstance().clearInstance();

    }

    getShoppingCartView() {
        if (this.userPlayNumberEvent.str.alreadyAdd > 0) {
            return (<TCBetGoBackShoppingCart style={{position: 'absolute', top: 0}}
                                             cc={this.userPlayNumberEvent.str.alreadyAdd}
                                             shakeEvent={()=>this.pushToBetBill()}/>)
        }
    }

    helperJumpTo = (index) => {
        if (index == 0) {
            NavigatorHelper.pushToOrderRecord()
        } else if (index == 1) {
            NavigatorHelper.pushToLotteryHistoryList(this.props.title, this.props.gameUniqueId, true)
        } else if (index == 2) {
            let gameInfo = JXHelper.getGameInfoWithUniqueId(this.props.gameUniqueId)
            if (gameInfo) {
                NavigatorHelper.pushToWebView(gameInfo['guideUrl'])
            }
        }
    }

    async checkGameSetting() {
        await  storage.load({
            key: 'TCGameSetting',
        }).then(res => {
            if (res) {
                myGameSetting = res.content['allGamesPrizeSettings'][this.props.gameUniqueId]
            }
        }).catch(err => {

        })
    }

    //初始化玩法号码选择
    initialContentView() {
        return <TCHappyPoker_MainView ref='TCHappyPoker_MainView' numberEvent={this.userPlayNumberEvent} shakeEvent={()=>this.byShake()} gameUniqueId={this.props.gameUniqueId} defaultPlayType={myPlayMath}/>
    }

    //初始化玩法选择器
    initialPlayMath() {
        return SingletonDPS.getFilterPlayTypeArray()[0];
    }

    //玩法选择切换
    choosePlayType(index, areaIndex) {
        let platMath = SingletonDPS.getPlayTypeNameByIndex(index);
        if (myPlayMath == platMath) return
        myPlayMath = platMath;
        SingletonDPS.resetPlayType(platMath);

        let contentView = this.refs['TCHappyPoker_MainView']
        contentView.setPlayMathWith(platMath)

        let navBar = this.refs['TopNavigationBar']
        navBar.setTitle(platMath)

        var popView = this.refs['TCSelectPopupView']
        popView._setModalSelectedIndex(index, areaIndex)
        this.refs['TCBetShakeButtonView'].resetPlayMath(platMath, this.props.gameUniqueId)

        this.clearSelectedNumbers()
    }

    checkNumbers() {
        if (!NavigatorHelper.checkUserWhetherLogin()) {
            NavigatorHelper.pushToUserLogin()
            return
        }
        let res = SingletonDPS.calUnAddedNumberOfUnits()
        if (res == 0) {
            //验证未通过
            Toast.showShortCenter('号码选择有误');
            return
        }
        this.showBetSettingModal()
    }

    showBetSettingModal() {
        if (!myGameSetting) {
            Toast.showShortCenter('玩法异常，请切换其他玩法');
            return
        }
        let prizeSettings = myGameSetting['singleGamePrizeSettings'][SingletonDPS.getPlayTypeId()]
        if (!prizeSettings) {
            Toast.showShortCenter('玩法异常，请切换其他玩法');
            return
        }

        let odds = 0;
        if (SingletonDPS.getPlayTypeName() == '包选') {
            let selectedNumbers = SingletonDPS.getUnAddedNumbersArr();
            let prizeSetting = prizeSettings['prizeSettings'];
            for (let i = 0; i < selectedNumbers.length; i++) {
                for (let j = 0; j < prizeSetting.length; j++) {
                    if (selectedNumbers[i] == prizeSetting[j]['prizeNameForDisplay']) {
                        if (odds < prizeSetting[j]['prizeAmount']) {
                            odds = prizeSetting[j]['prizeAmount']
                        }
                        break;
                    }
                }
            }
        } else {
            odds = prizeSettings['prizeSettings'][0]['prizeAmount'];
        }

        let betSettingView = this.refs['betSettingModal']
        betSettingView._setModalVisibleAndOddsAndMaxRebateAndNumberOfUnits(true,
            odds,
            prizeSettings['ratioOfReturnAmount'] * 100,
            SingletonDPS.getUnAddedAllUnits())
    }

    betSetEndingEvent(json) {
        SingletonDPS.addToBetArray(json.odds, json.unitPrice, json.rebate)
        let alreadyAdd = SingletonDPS.getAddedBetArr().length
        this.userPlayNumberEvent.str.alreadyAdd = alreadyAdd
        this.pushToBetBill()
    }

    pushToBetBill() {
        this.clearSelectedNumbers()
        NavigatorHelper.pushToBetBill(this.props.title,'KLPK',this.currentResultData.resultsData,this.props.gameUniqueId,this.props.pagePathName)
        this.refs['contentScrollView'].scrollTo({x: 0, y: 0, animated: false})
    }

    clearSelectedNumbers() {
        SingletonDPS.resetUnAddedSelectedNumbers()
        RCTDeviceEventEmitter.emit('HappyPokerNumberCall_clear');
        this.userPlayNumberEvent.str.numberStr = ''
        this.userPlayNumberEvent.str.units = ''
        this.userPlayNumberEvent.str.price = ''
    }

    showPopView() {
        var popView = this.refs['TCSelectPopupView']
        if (popView.state.modalVisible) {
            popView._setModalVisible(false,);
        } else {
            popView._setModalVisible(true);
        }
    }

    randomSelect() {
        if (!NavigatorHelper.checkUserWhetherLogin()) {
            NavigatorHelper.pushToUserLogin()
            return
        }
        SingletonDPS.randomSelect(1)
        this.pushToBetBill()
    }

    byShake() {
        this.clearSelectedNumbers()
        let tempArr = SingletonDPS.addRandomToUnAddedArr();

        for (let i = 0; i < tempArr.length; i++) {
            RCTDeviceEventEmitter.emit('randomHappyPokerSelectedNumber', tempArr[i]);
        }
    }

    goBack() {
        if (SingletonDPS.getAddedBetArr().length > 0) {
            Alert.alert(
                '退出页面会清空已选注单，\n是否退出？', null,
                [{
                    text: '确定', onPress: () => {
                        SingletonDPS.resetAllData()
                        this.props.navigator.popToTop()
                    }
                },
                    {
                        text: '取消', onPress: () => {
                    }
                    },
                ])
        }else {
            NavigatorHelper.popToBack()
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: indexBgColor.mainBg
    }
});
