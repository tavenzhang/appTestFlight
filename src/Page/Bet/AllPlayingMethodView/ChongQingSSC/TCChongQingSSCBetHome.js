/**
 * Created by Sam on 2016/11/12.
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    Modal,
    Platform,
    PanResponder,
    Image,
    Alert
} from 'react-native';


/**系统 npm类 */
import {observable, action} from 'mobx';
import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter'

/**组件内部显示需要引入的类 */
import TopNavigationBar from '../../View/TCBetBar'
import TCChongQingSSC from './view/TCChongQingSSC_MainView'
import TCSelectPopupView from './view/TCCQSSCPlayMethodSelectPopupView'
import TCBetBill from '../../../Bill/TCBetBill'
import AwardCoundtdownView from '../../View/TCBetAwardCountdown'
import TCBetHomeBottomView from '../../View/TCBetHomeBottomView'
import Toast from '../../../../Common/JXHelper/JXToast';
import TCBetSettingModal from '../../View/TCBetSettingModal'
import TCBetHelperModal from '../../View/TCBetHelperModal'
import LoadingSpinnerOverlay from '../../../../Common/View/LoadingSpinnerOverlay'
import JXGSBQWView from './view/TCcqsscPositionView'

import TCHomeHistoryList from '../../../../Common/View/TCHomeHistoryList'

import TCBetGoBackShoppingCart from '../../View/TCBetGoBackShoppingCart'
import TCBetShakeButtonView from '../../View/TCBetShakeButtonView'
import TCBetBalanceButton from '../../View/TCBetBalanceButton'
import TCSpringScrollView from '../../View/TCSpringScrollView'

/** 外部关系组件 如 页面跳转用 */
import NavigatorHelper from '../../../../Common/JXHelper/TCNavigatorHelper'
import JXCurrentResultData from '../../../../Data/JXCurrentResultData'
import JXUserPlayNumberEvent from '../../../../Data/JXUserPlayNumberEvent'
import JXHelper from '../../../../Common/JXHelper/JXHelper'
import {height, width, betHome, indexBgColor, statusBarHeight} from '../../../resouce/theme'
import TCChongQingSSC_DPS from './data/TCChongQingSSC_DPS'
import {MathControllerFactory} from 'lottery-core';
import TCIntelligenceBetData from "../../../Bill/IntelligenceBet/TCIntelligenceBetData";

let SingletonDPS = null;
let myPlayMath = '';
let myGameSetting = null
import {withMappedNavigationProps} from 'react-navigation-props-mapper'

import {observer} from 'mobx-react/native';

@withMappedNavigationProps()
@observer
export default class TCBetHome extends React.Component {

    constructor(state) {
        super(state);
        this.state = {
            selectedType: null,
            showGSBQW: false,
            showGSBQWArr: [],
            scrollToPoint: 0,
            gestureCase: null,
            moveTop: 0,
            topFinal: 0,
        }
        this.helperJumpTo = this.helperJumpTo.bind(this);
        SingletonDPS = MathControllerFactory.getInstance().getMathController(this.props.gameUniqueId);
    }


    _panResponder = {}

    static defaultProps = {
        gameUniqueId: '',
        cp_playMath: '定位胆-定位胆',
        unit_price: 2
    }


    componentDidMount() {
        this.clearSelectedNumbers();
        this.refs['TCBetShakeButtonView'].resetPlayMath(myPlayMath, this.props.gameUniqueId)
        this.listener = RCTDeviceEventEmitter.addListener('upDataUI_forBillDataChange', () => {
            this.userPlayNumberEvent.userNumberCallBackRefresh()
        });
        this.checkGameSetting()
    }

    componentWillMount() {
        this.userPlayNumberEvent = new JXUserPlayNumberEvent(SingletonDPS)
        this.currentResultData = new JXCurrentResultData(this.props.gameUniqueId)
        myPlayMath = this.props.cp_playMath;
        SingletonDPS.setGameUniqueId(this.props.gameUniqueId);
        SingletonDPS.filterPlayType(TCGameSetting.content['allGamesPrizeSettings'][this.props.gameUniqueId]["singleGamePrizeSettings"]);
        myPlayMath = SingletonDPS.getDefaultPlayNameFromFilterArray(this.props.cp_playMath);
        SingletonDPS.resetAllData(myPlayMath);
        this._panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (evt, gestureState) => true,
            onMoveShouldSetPanResponder: (evt, gestureState) => {
                const {dx} = gestureState;
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
                if (this.state.topFinal >= 312 && gestureState.vy > 0) {
                    return;
                }

                if (gestureState.vy > 0 && gestureState.dy >= 312 || this.state.topFinal == 182 && gestureState.dy >= 182) {
                    this.setState({isBegin: false, isMove: false, isEnd: true, gestureCase: null, topFinal: 312,})
                } else {
                    this.setState({isBegin: false, isMove: true, isEnd: false, gestureCase: gestureState});
                }
            },
            onPanResponderRelease: (evt, gestureState) => {
                let topFailHeight = 0;
                if (gestureState.vy > 0 && gestureState.dy > 0) {
                    topFailHeight = 312;
                } else if (gestureState.vy == 0) {
                    if (this.state.topFinal == 0 && gestureState.dy >= 0) {
                        topFailHeight = 182;
                    } else {
                        topFailHeight = 0;
                    }
                } else if (gestureState.vy < 0) {
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
                this.setState({
                    isBegin: false,
                    isMove: false,
                    isEnd: true,
                    gestureCase: null,
                    topFinal: gestureState.vy >= 0 ? 312 : 0
                })
            },
        });
        this.listener1 = RCTDeviceEventEmitter.addListener('heightChange', () => {
            this.setState({isBegin: false, isMove: false, isEnd: true, gestureCase: null, topFinal: 312,})
        });
        this.didBlurListener = this.props.navigation.addListener('didBlur', () => this.currentResultData.didBlur())
    }

    componentWillUnmount() {
        this.listener && this.listener.remove();
        this.listener1 && this.listener1.remove();
        this.didBlurListener && this.didBlurListener.remove()
        this.currentResultData && this.currentResultData.clear();
        TCIntelligenceBetData.getInstance() && TCIntelligenceBetData.getInstance().clearInstance();
    }

    helperJumpTo = (index) => {
        if (index == 0) {
            NavigatorHelper.pushToOrderRecord()
        } else if (index == 1) {
            NavigatorHelper.pushToLotteryHistoryList({
                title: this.props.title,
                gameUniqueId: this.props.gameUniqueId,
                betBack: true
            })
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

    render() {
        let historyHeight = this.state.gestureCase == null ? this.state.topFinal : this.state.gestureCase.dy + this.state.moveTop;
        if (historyHeight < 0) {
            historyHeight = 0;
        } else if (historyHeight > 312) {
            historyHeight = 312;
        }

        return (
            <View style={styles.container}>
                <TopNavigationBar
                    ref='TopNavigationBar'
                    backButtonCall={() => {
                        this.goBack()
                    }}
                    centerButtonCall={() => {
                        this.showPopView()
                    }}

                    rightButtonCall={() => {
                        this.refs['TCBetHelperModal']._setModalVisible(true)
                    }}

                    title={SingletonDPS.getPlayTypeNameByIndex(0, 0)}
                />


                <TCSelectPopupView
                    ref='TCSelectPopupView'
                    selectTitleArr={this.initialPlayMath()}
                    secondAreaTitleArr={this.initialPlayMatnItem()}
                    selectTitle={true}
                    selectedFunc={(parentIndex, itemIndex) => {
                        this.choosePlayType(parentIndex, itemIndex)
                    }}
                />

                <TCBetHelperModal
                    ref="TCBetHelperModal"
                    selectedFunc={this.helperJumpTo}
                    gameUniqueId={this.props.gameUniqueId}
                />

                <AwardCoundtdownView
                    resultsData={this.currentResultData.resultsData}
                />

                <View
                    style={{width: width, height: historyHeight, backgroundColor: 'green'}}>
                    <TCHomeHistoryList
                        height={historyHeight}
                        gameUniqueId={this.props.gameUniqueId}
                        title={this.props.title}
                        isHighlightStyle={true}
                    />
                </View>

                {/*<TCScrollLotteryListView ref="TCScrollLotteryListView" style={{position:'absolute',top:130,height:this.state.scrollToPoint>0?height/3:0,width:this.state.scrollToPoint>0?width:0}}>*/}
                {/*</TCScrollLotteryListView>*/}

                <View style={{
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    height: 13,
                    width: width,
                    alignItems: 'center',
                    backgroundColor: betHome.betTopItemBg,
                }} {...this._panResponder.panHandlers}>
                    <Image
                        source={historyHeight >= 26 * 7 ?
                            require('../../../resouce/addon/other/stdui_arrow_up.png') :
                            require('../../../resouce/addon/other/stdui_arrow_down.png')
                        }
                        resizeMode={'contain'}
                        style={{height: 13, width: 55, marginTop: 0}}
                    />
                </View>

                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        backgroundColor: betHome.betTopItemBg,
                    }} {...this._panResponder.panHandlers}>
                    <TCBetShakeButtonView ref="TCBetShakeButtonView" style={{position: 'absolute', top: 0}}
                                          shakeEvent={() => this.byShake()}/>
                    <TCBetBalanceButton style={{}}/>
                    {this.getShoppingCartView()}
                </View>


                <View
                    style={{height: (height - statusBarHeight - 44 - 70 - 49 - (this.state.showGSBQW ? 40 : 0) - 20 - 20 - historyHeight)}}>
                    <ScrollView ref="contentScrollView">{this.initialContentView()}</ScrollView>
                </View>

                {this.getGSBQW()}

                <TCBetHomeBottomView ref="TCBetHomeBottomView"
                                     leftButtonCallEvent={() => this.randomSelect()}
                                     rightButtonCallEvent={() => this.checkNumbers()}
                                     clearButtonCallEvent={() => this.clearSelectedNumbers()}
                                     data={this.userPlayNumberEvent.str}
                                     mob={true}
                />
                <TCBetSettingModal ref='betSettingModal' settingEndingEvent={(e) => this.betSetEndingEvent(e)}/>
                <LoadingSpinnerOverlay ref={component => this._modalLoadingSpinnerOverLay = component}/>
            </View>
        )
    }


    getGSBQW() {

        let checkList = SingletonDPS.gameConfig.getWhetherNeedShowGSBQW(myPlayMath)
        if (this.state.showGSBQW) {
            return (<JXGSBQWView ref="GSBQW" style={{overflow: this.state.showGSBQW ? 'visible' : 'hidden'}}
                                 checkedList={checkList} positionArr={SingletonDPS.gameConfig.position}
                                 checkedChangeCallback={(e) => this.GSBQWChange(e)}/>)
        } else {

        }
    }

    initialContentView() {

        return <TCChongQingSSC ref='TCChongQingSSC' numberEvent={this.userPlayNumberEvent}
                               shakeEvent={() => this.byShake()} gameUniqueId={this.props.gameUniqueId}
                               defaultPlayType={myPlayMath}/>
    }

    initialPlayMatnItem() {
        return SingletonDPS.getFilterPlayTypeArray()[1];
    }


    initialPlayMath() {
        return SingletonDPS.getFilterPlayTypeArray()[0];
    }

    choosePlayType(parentIndex, itemIndex) {
        let platMath = SingletonDPS.getPlayTypeNameByIndex(parentIndex, itemIndex);
        if (myPlayMath === platMath) return;

        this.refs['contentScrollView'].scrollTo({x: 0, y: 0, animated: false})

        myPlayMath = platMath
        SingletonDPS.resetPlayType(platMath)

        let contentView = this.refs['TCChongQingSSC']
        contentView.setPlayMathWith(platMath)

        let playMathName = platMath

        let navBar = this.refs['TopNavigationBar']
        navBar.setTitle(playMathName)

        var popView = this.refs['TCSelectPopupView']
        popView._setModalSelectedIndex(parentIndex, itemIndex)

        this.refs['TCBetShakeButtonView'].resetPlayMath(platMath, this.props.gameUniqueId)

        this.clearSelectedNumbers()
    }

    GSBQWChange(checkList) {
        SingletonDPS.resetGSBQW(checkList)
        this.userPlayNumberEvent.refreshBottomData();
    }

    checkNumbers() {
        if (!NavigatorHelper.checkUserWhetherLogin()) {
            NavigatorHelper.pushToUserLogin()
            return
        }
        let res = SingletonDPS.isDsTz() ? SingletonDPS.getUnAddedDSUnits() : SingletonDPS.calUnAddedNumberOfUnits()
        if (res == 0) {
            //验证未通过
            Toast.showShortCenter('号码选择有误')
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
        let odds = prizeSettings['prizeSettings'][0]['prizeAmount'];
        SingletonDPS.addOddsArray(odds);

        let betSettingView = this.refs['betSettingModal']
        betSettingView._setModalVisibleAndOddsAndMaxRebateAndNumberOfUnits(true,
            odds,
            prizeSettings['ratioOfReturnAmount'] * 100,
            SingletonDPS.getUnAddedAllUnits())
    }

    betSetEndingEvent(json) {
        if (SingletonDPS.isDsTz()) {
            if (SingletonDPS.getUnAddedDSUnits() > 700) {
                Toast.showShortCenter("单词输入有效号码总数不能超过700注！");
                return;
            }
            SingletonDPS.addToDsBetArray(json.odds, json.unitPrice, json.rebate);
        } else {
            SingletonDPS.addToBetArray(json.odds, json.unitPrice, json.rebate);
        }
        this.userPlayNumberEvent.str.alreadyAdd = SingletonDPS.getAddedBetArr().length;
        this.pushToBetBill();
    }

    pushToBetBill() {
        this.clearSelectedNumbers()
        NavigatorHelper.pushToBetBill(this.props.title, 'SSC', this.currentResultData.resultsData, this.props.gameUniqueId, this.props.pagePathName)
        this.refs['contentScrollView'].scrollTo({x: 0, y: 0, animated: false})
    }

    byShake() {
        this.clearSelectedNumbers()
        let tempDic = SingletonDPS.addRandomToUnAddedArr()
        JXLog('shake = ' + JSON.stringify(tempDic))
        for (let ite in tempDic) {
            let tempArr = tempDic[ite]
            for (let i = 0; i < tempArr.length; i++) {
                RCTDeviceEventEmitter.emit('randomSelectedNumber', ite, tempArr[i]);
            }
        }
    }

    clearSelectedNumbers() {
        let checkList = SingletonDPS.gameConfig.getWhetherNeedShowGSBQW(myPlayMath)
        this.setState({showGSBQW: checkList})
        if (this.refs['GSBQW']) {
            this.refs['GSBQW']._resetCheked(checkList)
        }
        SingletonDPS.resetGSBQW(checkList)
        SingletonDPS.resetUnAddedSelectedNumbers()
        RCTDeviceEventEmitter.emit('TCChongQing_numberSelectView_clear');
        RCTDeviceEventEmitter.emit('qdxdsReset');

        this.userPlayNumberEvent.resetStrData();

    }

    showPopView() {
        var popView = this.refs.TCSelectPopupView
        if (popView.state.modalVisible) {
            popView._setModalVisible(false)
        } else {
            popView._setModalVisible(true)
        }
    }

    randomSelect() {
        if (!NavigatorHelper.checkUserWhetherLogin()) {
            NavigatorHelper.pushToUserLogin()
            return
        }
        SingletonDPS.randomSelect(1)
        if (myGameSetting) {
            let prizeSettings = myGameSetting['singleGamePrizeSettings'][SingletonDPS.getPlayTypeId()]
            if (!prizeSettings) {
                return
            }
            let odds = prizeSettings['prizeSettings'][0]['prizeAmount'];
            SingletonDPS.addOddsArray(odds);

        }
        this.pushToBetBill()
    }

    goBack() {
        if (SingletonDPS.getAddedBetArr().length > 0) {
            Alert.alert(
                '退出页面会清空已选注单，\n是否退出？', null,
                [{
                    text: '确定', onPress: () => {
                        SingletonDPS.resetAllData()
                        NavigatorHelper.popToBack()
                    }
                },
                    {
                        text: '取消', onPress: () => {
                        }
                    },
                ])
        } else {
            NavigatorHelper.popToBack()
        }
    }

    getShoppingCartView() {
        if (this.userPlayNumberEvent.str.alreadyAdd > 0) {
            return (<TCBetGoBackShoppingCart style={{position: 'absolute', top: 0}}
                                             cc={this.userPlayNumberEvent.str.alreadyAdd}
                                             shakeEvent={() => this.pushToBetBill()}/>)
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: indexBgColor.mainBg
    },
});
