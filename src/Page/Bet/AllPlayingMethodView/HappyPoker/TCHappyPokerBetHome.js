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
import TCHappyPoker_MainView from './view/TCHappyPoker_MainView'

// 外部关系组件 如 页面跳转用


import {withMappedNavigationProps} from 'react-navigation-props-mapper'

import TCBaseBetHome, {myGameSetting} from "../../../Base/TCBaseBetHome";

@withMappedNavigationProps()
@observer
export default class TCHappyPokerBetHome extends TCBaseBetHome {

    static defaultProps = {
        cp_playMath: '包选',
        unit_price: 2,
        gameUniqueId: ''
    }


    constructor(props){
        super({...props,gameName:"KLPK",contentView:TCHappyPoker_MainView})
    }


    showBetSettingModal() {
        if (!myGameSetting) {
            Toast.showShortCenter('玩法异常，请切换其他玩法');
            return
        }
        let prizeSettings = myGameSetting['singleGamePrizeSettings'][this.SingletonDPS.getPlayTypeId()]
        if (!prizeSettings) {
            Toast.showShortCenter('玩法异常，请切换其他玩法');
            return
        }

        let odds = 0;
        if (this.SingletonDPS.getPlayTypeName() == '包选') {
            let selectedNumbers = this.SingletonDPS.getUnAddedNumbersArr();
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
            this.SingletonDPS.getUnAddedAllUnits())
    }

    clearSelectedNumbers() {
        this.SingletonDPS.resetUnAddedSelectedNumbers()
        RCTDeviceEventEmitter.emit('HappyPokerNumberCall_clear');
        this.userPlayNumberEvent.str.numberStr = ''
        this.userPlayNumberEvent.str.units = ''
        this.userPlayNumberEvent.str.price = ''
    }


    // constructor(state) {
    //     super(state);
    //     this.state = {
    //         cpInfoData: {},
    //         isHistoryShow:false
    //     };
    //     this.helperJumpTo = this.helperJumpTo.bind(this);
    //     this.SingletonDPS = MathControllerFactory.getInstance().getMathController(this.props.gameUniqueId);
    //     this.gestureState={
    //         gestureCase: null,
    //         moveTop: 0,
    //         topFinal: 0,
    //     }
    // }



    // _panResponder = {}
    //
    // componentWillMount() {
    //     this.userPlayNumberEvent = new JXUserPlayNumberEvent(this.SingletonDPS)
    //     this.currentResultData = new JXCurrentResultData(this.props.gameUniqueId)
    //     myPlayMath = this.props.cp_playMath;
    //     this.SingletonDPS.setGameUniqueId(this.props.gameUniqueId);
    //     this.SingletonDPS.filterPlayType(TCGameSetting.content['allGamesPrizeSettings'][this.props.gameUniqueId]["singleGamePrizeSettings"]);
    //     myPlayMath = this.SingletonDPS.getDefaultPlayNameFromFilterArray(this.props.cp_playMath);
    //     this.SingletonDPS.resetAllData(myPlayMath);
    //     this._panResponder = PanResponder.create({
    //         onStartShouldSetPanResponder: (evt, gestureState) => true,
    //         onMoveShouldSetPanResponder: (evt, gestureState) => {
    //             const {dx} = gestureState;
    //             return Math.abs(dx) > 0;
    //         },
    //         onPanResponderGrant: (evt, gestureState) => {
    //             this.updateHistoryViewHigh({
    //                 gestureCase: gestureState,
    //                 moveTop: this.gestureState.topFinal
    //             })
    //         },
    //         onPanResponderMove: (evt, gestureState) => {
    //             if (this.gestureState.topFinal >= 312 && gestureState.vy > 0) {
    //                 return;
    //             }
    //             if (gestureState.vy > 0 && gestureState.dy >= 312 || this.gestureState.topFinal == 182 && gestureState.dy >= 182) {
    //                 this.updateHistoryViewHigh({gestureCase: null, topFinal: 312});
    //             } else {
    //                 this.updateHistoryViewHigh({ gestureCase: gestureState});
    //             }
    //         },
    //         onPanResponderRelease: (evt, gestureState) => {
    //             let topFailHeight = 0;
    //             if (gestureState.vy > 0 && gestureState.dy > 0) {
    //                 topFailHeight = this.refs.TCHomeHistoryList.getHightState() ==1 ? 182 :312
    //             } else if (gestureState.vy == 0) {
    //                 if (gestureState.dy >= 0) {
    //                     if(this.gestureState.topFinal==0){
    //                         topFailHeight = 182;
    //                     }
    //                 } else {
    //                     topFailHeight = 0;
    //                 }
    //             } else if (gestureState.vy < 0) {
    //                 topFailHeight = 0;
    //             }
    //             let isShowHistory=topFailHeight >0;
    //             if(this.state.isHistoryShow!=isShowHistory){
    //                 clearTimeout(this.timerShow);
    //                 this.timerShow=setTimeout(()=>this.setState({isHistoryShow:isShowHistory}),150);//错开render 时机
    //             }
    //
    //             this.updateHistoryViewHigh({
    //                 isBegin: false,
    //                 isMove: false,
    //                 isEnd: true,
    //                 gestureCase: null,
    //                 topFinal: topFailHeight,
    //             });
    //         },
    //     });
    //   this.didFocusListener = this.props.navigation.addListener('didFocus', () => this.currentResultData.didBlur(false))
    //   this.didBlurListener = this.props.navigation.addListener('didBlur', () => this.currentResultData.didBlur(true))
    // }


    // updateHistoryViewHigh=(newState)=>{
    //     this.gestureState={...this.gestureState,...newState};
    //     this.refs.TCHomeHistoryList.updateHistoryHight(this.gestureState);
    // }


    // render() {
    //
    //     return (
    //         <View style={styles.container}>
    //             <TopNavigationBar
    //                 ref='TopNavigationBar'
    //                 backButtonCall={() => {
    //                     this.goBack()
    //                 }}
    //                 centerButtonCall={() => {
    //                     this.showPopView()
    //                 }}
    //                 rightButtonCall={() => {
    //                     this.refs['TCBetHelperModal']._setModalVisible(true)
    //                 }}
    //                 title={myPlayMath}
    //             />
    //             <TCSelectPopupView
    //                 ref='TCSelectPopupView'
    //                 selectTitleArr={this.initialPlayMath()}
    //                 selectedFunc={(index, areaIndex) => {
    //                     this.choosePlayType(index, areaIndex)
    //                 }}
    //             />
    //             <TCBetHelperModal
    //                 ref="TCBetHelperModal"
    //                 selectedFunc={this.helperJumpTo}
    //                 gameUniqueId={this.props.gameUniqueId}
    //             />
    //             <AwardCoundtdownView
    //                 resultsData={this.currentResultData.resultsData}
    //                 isHappyPoker={true}
    //             />
    //
    //             <TCHomeHistoryListNewSSC
    //                 ref="TCHomeHistoryList"
    //                 gameUniqueId={this.props.gameUniqueId}
    //                 title={this.props.title}
    //                 isHighlightStyle={true}
    //             />
    //             <View
    //                 style={{
    //                     flexDirection: 'column',
    //                     justifyContent: 'flex-start',
    //                     height: 13,
    //                     width: Dimensions.get('window').width,
    //                     alignItems: 'center',
    //                     backgroundColor: betHome.betTopItemBg,
    //                 }}
    //                 {...this._panResponder.panHandlers}>
    //                 <Image
    //                     source={this.state.isHistoryShow ?
    //                         betIcon.stdui_arrow_up:betIcon.stdui_arrow_down}
    //                     resizeMode={'contain'}
    //                     style={{height: 13, width: 55, marginTop: 0}}
    //                 />
    //             </View>
    //             <View
    //                 style={{
    //                     flexDirection: 'row',
    //                     justifyContent: 'space-between',
    //                     alignItems: 'center',
    //                     backgroundColor: betHome.betTopItemBg
    //                 }} {...this._panResponder.panHandlers}>
    //                 <TCBetShakeButtonView ref="TCBetShakeButtonView" style={{position: 'absolute', top: 0}}
    //                                       shakeEvent={() => this.byShake()}/>
    //                 <TCBetBalanceButton style={{}} shakeEvent={() => this.byShake()}/>
    //                 {this.getShoppingCartView()}
    //             </View>
    //
    //             <View style={{flex:1}}>
    //                 <ScrollView ref="contentScrollView">{this.initialContentView()}</ScrollView>
    //             </View>
    //             <TCBetHomeBottomView ref="TCBetHomeBottomView"
    //                                  leftButtonCallEvent={() => this.randomSelect()}
    //                                  rightButtonCallEvent={() => this.checkNumbers()}
    //                                  clearButtonCallEvent={() => this.clearSelectedNumbers()}
    //                                  data={this.userPlayNumberEvent.str}
    //                                  mob={true}
    //             />
    //             <TCBetSettingModal ref='betSettingModal' settingEndingEvent={(e) => this.betSetEndingEvent(e)}/>
    //             <LoadingSpinnerOverlay
    //                 ref={component => this._modalLoadingSpinnerOverLay = component}
    //             />
    //         </View>
    //     )
    // }

    //
    // componentDidMount() {
    //     this.clearSelectedNumbers()
    //     // myPlayMath = this.props.cp_playMath
    //
    //     this.refs['TCBetShakeButtonView'].resetPlayMath(myPlayMath, this.props.gameUniqueId)
    //
    //     this.listener = RCTDeviceEventEmitter.addListener('upDataUI_forBillDataChange', () => {
    //         this.userPlayNumberEvent.userNumberCallBackRefresh()
    //     });
    //     this.checkGameSetting()
    // }

    // componentWillUnmount() {
    //     this.listener && this.listener.remove();
    //     this.listener1 && this.listener1.remove();
    //     this.didFocusListener && this.didFocusListener.remove()
    //     this.didBlurListener && this.didBlurListener.remove()
    //     this.currentResultData && this.currentResultData.clear();
    //     TCIntelligenceBetData.getInstance() && TCIntelligenceBetData.getInstance().clearInstance();
    //
    // }

    // getShoppingCartView() {
    //     if (this.userPlayNumberEvent.str.alreadyAdd > 0) {
    //         return (<TCBetGoBackShoppingCart style={{position: 'absolute', top: 0}}
    //                                          cc={this.userPlayNumberEvent.str.alreadyAdd}
    //                                          shakeEvent={() => this.pushToBetBill()}/>)
    //     }
    // }
    //
    // helperJumpTo = (index) => {
    //     if (index == 0) {
    //         NavigatorHelper.pushToOrderRecord()
    //     } else if (index == 1) {
    //         NavigatorHelper.pushToLotteryHistoryList(this.props.title, this.props.gameUniqueId, true)
    //     } else if (index == 2) {
    //         let gameInfo = JXHelper.getGameInfoWithUniqueId(this.props.gameUniqueId)
    //         if (gameInfo) {
    //             NavigatorHelper.pushToWebView(gameInfo['guideUrl'])
    //         }
    //     }
    // }

    // async checkGameSetting() {
    //     await  storage.load({
    //         key: 'TCGameSetting',
    //     }).then(res => {
    //         if (res) {
    //             myGameSetting = res.content['allGamesPrizeSettings'][this.props.gameUniqueId]
    //         }
    //     }).catch(err => {
    //
    //     })
    // }

    // //初始化玩法号码选择
    // initialContentView() {
    //     return <TCHappyPoker_MainView ref='TCHappyPoker_MainView' numberEvent={this.userPlayNumberEvent}
    //                                   shakeEvent={() => this.byShake()} gameUniqueId={this.props.gameUniqueId}
    //                                   defaultPlayType={myPlayMath}/>
    // }
    //
    // //初始化玩法选择器
    // initialPlayMath() {
    //     return this.SingletonDPS.getFilterPlayTypeArray()[0];
    // }
    //
    // //玩法选择切换
    // choosePlayType(index, areaIndex) {
    //     let platMath = this.SingletonDPS.getPlayTypeNameByIndex(index);
    //     if (myPlayMath == platMath) return
    //     myPlayMath = platMath;
    //     this.SingletonDPS.resetPlayType(platMath);
    //
    //     let contentView = this.refs['TCHappyPoker_MainView']
    //     contentView.setPlayMathWith(platMath)
    //
    //     let navBar = this.refs['TopNavigationBar']
    //     navBar.setTitle(platMath)
    //
    //     var popView = this.refs['TCSelectPopupView']
    //     popView._setModalSelectedIndex(index, areaIndex)
    //     this.refs['TCBetShakeButtonView'].resetPlayMath(platMath, this.props.gameUniqueId)
    //
    //     this.clearSelectedNumbers()
    // }

    // checkNumbers() {
    //     if (!NavigatorHelper.checkUserWhetherLogin()) {
    //         NavigatorHelper.pushToUserLogin()
    //         return
    //     }
    //     let res = this.SingletonDPS.calUnAddedNumberOfUnits()
    //     if (res == 0) {
    //         //验证未通过
    //         Toast.showShortCenter('号码选择有误');
    //         return
    //     }
    //     this.showBetSettingModal()
    // }


    // betSetEndingEvent(json) {
    //     this.SingletonDPS.addToBetArray(json.odds, json.unitPrice, json.rebate)
    //     let alreadyAdd = this.SingletonDPS.getAddedBetArr().length
    //     this.userPlayNumberEvent.str.alreadyAdd = alreadyAdd
    //     this.pushToBetBill()
    // }

    // pushToBetBill() {
    //     this.clearSelectedNumbers()
    //     NavigatorHelper.pushToBetBill(this.props.title, 'KLPK', this.currentResultData.resultsData, this.props.gameUniqueId, this.props.pagePathName)
    //     this.refs['contentScrollView'].scrollTo({x: 0, y: 0, animated: false})
    // }


    //
    // showPopView() {
    //     var popView = this.refs['TCSelectPopupView']
    //     if (popView.state.modalVisible) {
    //         popView._setModalVisible(false,);
    //     } else {
    //         popView._setModalVisible(true);
    //     }
    // }

    // randomSelect() {
    //     if (!NavigatorHelper.checkUserWhetherLogin()) {
    //         NavigatorHelper.pushToUserLogin()
    //         return
    //     }
    //     this.SingletonDPS.randomSelect(1)
    //     this.pushToBetBill()
    // }

    // byShake() {
    //     this.clearSelectedNumbers()
    //     let tempArr = this.SingletonDPS.addRandomToUnAddedArr();
    //
    //     for (let i = 0; i < tempArr.length; i++) {
    //         RCTDeviceEventEmitter.emit('randomHappyPokerSelectedNumber', tempArr[i]);
    //     }
    // }

    // goBack() {
    //     if (this.SingletonDPS.getAddedBetArr().length > 0) {
    //         Alert.alert(
    //             '退出页面会清空已选注单，\n是否退出？', null,
    //             [{
    //                 text: '确定', onPress: () => {
    //                     this.SingletonDPS.resetAllData()
    //                     this.props.navigator.popToTop()
    //                 }
    //             },
    //                 {
    //                     text: '取消', onPress: () => {
    //                     }
    //                 },
    //             ])
    //     } else {
    //         NavigatorHelper.popToBack()
    //     }
    // }
}

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: indexBgColor.mainBg
//     }
// });
