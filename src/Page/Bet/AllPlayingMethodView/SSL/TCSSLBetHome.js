import React, {Component} from 'react';

import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter'
import TopNavigationBar from '../../View/TCBetBar'

import TCSSL_MainView from './view/TCSSL_MainView'
import TCSelectPopupView from '../../View/TCPlayMethodMultilevelSelectPopupView'

import Toast from '../../../../Common/JXHelper/JXToast';

import JXGSBQWView from './view/TCSSLPositionView'

import TCBetShakeButtonView from '../../View/TCBetShakeButtonView'


import {observer} from 'mobx-react/native';


import {withMappedNavigationProps} from 'react-navigation-props-mapper'
import TCBaseBetHome from "../../../Base/TCBaseBetHome";

@withMappedNavigationProps()
@observer
export default class TCSSLBetHome extends TCBaseBetHome{
    static defaultProps = {
        gameUniqueId: '',
        cp_playMath: '三星-直选复式',
        unit_price: 2
    }

    constructor(props){
        super({...props,gameName:'SSL',contentView:TCSSL_MainView,isMultyMethod:true})
        this.state={
            ...this.state,
            showGSBQW: false,
            showGSBQWArr: [],
        }
    }

    renderSpecialView(){
        return this.getGSBQW();
    }

    getGSBQW() {
        let checkList = this.SingletonDPS.gameConfig.getWhetherNeedShowGSBQW(this.myPlayMath)
        if (this.state.showGSBQW) {
            return (<JXGSBQWView ref="GSBQW" style={{overflow: this.state.showGSBQW ? 'visible' : 'hidden'}}
                                 checkedList={checkList} positionArr={this.SingletonDPS.gameConfig.position}
                                 checkedChangeCallback={(e) => this.GSBQWChange(e)}/>)
        }
    }

    //玩法选择切换
    choosePlayType(parentIndex, itemIndex) {
        let platMath = this.SingletonDPS.getPlayTypeNameByIndex(parentIndex, itemIndex);
        if (this.myPlayMath == platMath) return

        this.refs['contentScrollView'].scrollTo({x: 0, y: 0, animated: false})

        this.myPlayMath = platMath
        this.SingletonDPS.resetPlayType(platMath)
        let contentView = this.refs['contentView']
        if (contentView) {
            contentView.setPlayMathWith(platMath)
        }
        let playMathName = platMath

        let navBar = this.refs['TopNavigationBar']
        navBar.setTitle(playMathName.replace('大小单双-', ''))

        var popView = this.refs['TCSelectPopupView']
        popView._setModalSelectedIndex(parentIndex, itemIndex)

        this.refs['TCBetShakeButtonView'].resetPlayMath(platMath, this.props.gameUniqueId)

        this.clearSelectedNumbers()
    }

    GSBQWChange(checkList) {
        this.SingletonDPS.resetGSBQW(checkList)
        this.refreshBottomView()
    }

    refreshBottomView() {
        let str = this.SingletonDPS.getAllUnAddedNumbersJson()
        let count = this.SingletonDPS.calUnAddedNumberOfUnits()
        let price = count * this.props.unit_price;
        this.userPlayNumberEvent.str.numberStr = str;
        this.userPlayNumberEvent.str.units = count;
        this.userPlayNumberEvent.str.price = price;
    }


    betSetEndingEvent(json) {
        if (this.SingletonDPS.isDsTz()) {
            if (this.SingletonDPS.getUnAddedDSUnits() > 700) {
                Toast.showShortCenter("单词输入有效号码总数不能超过700注！");
                return;
            }
            this.SingletonDPS.addToDsBetArray(json.odds, json.unitPrice, json.rebate);
        } else {
            this.SingletonDPS.addToBetArray(json.odds, json.unitPrice, json.rebate);
        }
        this.userPlayNumberEvent.str.alreadyAdd = this.SingletonDPS.getAddedBetArr().length;
        this.pushToBetBill();
    }



    clearSelectedNumbers() {
        let checkList = this.SingletonDPS.gameConfig.getWhetherNeedShowGSBQW(this.myPlayMath)
        this.setState({showGSBQW: checkList});
        if (this.refs['GSBQW']) {
            this.refs['GSBQW']._resetCheked(checkList)
        }
        this.SingletonDPS.resetGSBQW(checkList);
        this.SingletonDPS.resetUnAddedSelectedNumbers();

        RCTDeviceEventEmitter.emit('TCChongQing_numberSelectView_clear');
        RCTDeviceEventEmitter.emit('qdxdsReset');
        this.userPlayNumberEvent.resetStrData();
    }


    //
    // constructor(state) {
    //     super(state);
    //     this.state = {
    //         selectedType: null,
    //         showGSBQW: false,
    //         showGSBQWArr: [],
    //         isHistoryShow:false
    //     }
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
    //     this.userPlayNumberEvent = new JXUserPlayNumberEvent(this.SingletonDPS);
    //     this.currentResultData = new JXCurrentResultData(this.props.gameUniqueId);
    //     myPlayMath = this.props.cp_playMath;
    //     this.SingletonDPS.setGameUniqueId(this.props.gameUniqueId);
    //     this.SingletonDPS.filterPlayType(TCGameSetting.content['allGamesPrizeSettings'][this.props.gameUniqueId]["singleGamePrizeSettings"]);
    //     myPlayMath = this.SingletonDPS.getDefaultPlayNameFromFilterArray(this.props.cp_playMath);
    //     this.SingletonDPS.resetAllData(myPlayMath);
    //
    //     //182== 26 * 7: half history height
    //     //312== 26 * 12: history height
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
    //     this.didFocusListener = this.props.navigation.addListener('didFocus', () => this.currentResultData.didBlur(false))
    //     this.didBlurListener = this.props.navigation.addListener('didBlur', () => this.currentResultData.didBlur(true))
    // }

    // componentDidMount() {
    //
    //     this.clearSelectedNumbers()
    //     // myPlayMath = this.props.cp_playMath
    //     this.SingletonDPS.setGameUniqueId(this.props.gameUniqueId);
    //     this.SingletonDPS.resetPlayType(myPlayMath);
    //     this.refs['TCBetShakeButtonView'].resetPlayMath(myPlayMath, this.props.gameUniqueId)
    //     this.listener1 = RCTDeviceEventEmitter.addListener('upDataUI_forBillDataChange', () => {
    //         this.userPlayNumberEvent.userNumberCallBackRefresh();
    //     });
    //
    //     this.checkGameSetting()
    // }
    //
    // componentWillUnmount() {
    //     this.listener && this.listener.remove();
    //     this.listener1 && this.listener1.remove();
    //     this.didFocusListener && this.didFocusListener.remove()
    //     this.didBlurListener && this.didBlurListener.remove()
    //     this.currentResultData && this.currentResultData.clear();
    //     TCIntelligenceBetData.getInstance() && TCIntelligenceBetData.getInstance().clearInstance();
    // }



    // helperJumpTo = (index) => {
    //     if (index == 0) {
    //         NavigatorHelper.pushToOrderRecord()
    //     } else if (index == 1) {
    //         NavigatorHelper.pushToLotteryHistoryList({
    //             title: this.props.title,
    //             gameUniqueId: this.props.gameUniqueId,
    //             betBack: true
    //         })
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

    // updateHistoryViewHigh=(newState)=>{
    //     this.gestureState={...this.gestureState,...newState};
    //     this.refs.TCHomeHistoryList.updateHistoryHight(this.gestureState);
    // }

    // render() {
    //
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
    //
    //                 rightButtonCall={() => {
    //                     this.refs['TCBetHelperModal']._setModalVisible(true)
    //                 }}
    //
    //                 title={this.SingletonDPS.getPlayTypeNameByIndex(0, 0)}
    //             />
    //
    //
    //             <TCSelectPopupView
    //                 ref='TCSelectPopupView'
    //                 selectTitleArr={this.initialPlayMath()}
    //                 secondAreaTitleArr={this.initialPlayMatnItem()}
    //                 selectTitle={true}
    //                 selectedFunc={(parentIndex, itemIndex) => {
    //                     this.choosePlayType(parentIndex, itemIndex)
    //                 }}
    //             />
    //
    //             <TCBetHelperModal
    //                 ref="TCBetHelperModal"
    //                 selectedFunc={this.helperJumpTo}
    //                 gameUniqueId={this.props.gameUniqueId}
    //             />
    //
    //             <AwardCoundtdownView
    //                 resultsData={this.currentResultData.resultsData}
    //             />
    //
    //             <TCHomeHistoryListNewSSC
    //                     ref="TCHomeHistoryList"
    //                     gameUniqueId={this.props.gameUniqueId}
    //                     title={this.props.title}
    //                     isHighlightStyle={true}
    //                 />
    //
    //             <View
    //                 style={{
    //                     flexDirection: 'column',
    //                     justifyContent: 'flex-start',
    //                     height: 13,
    //                     width: Dimensions.get('window').width,
    //                     alignItems: 'center',
    //                     backgroundColor: betHome.betTopItemBg,
    //                 }}
    //                 {...this._panResponder.panHandlers}
    //             >
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
    //             <View style={{flex: 1}}>
    //                 <ScrollView ref="contentScrollView">{this.initialContentView()}</ScrollView>
    //             </View>
    //
    //             {this.getGSBQW()}
    //
    //             <TCBetHomeBottomView ref="TCBetHomeBottomView"
    //                                  leftButtonCallEvent={() => this.randomSelect()}
    //                                  rightButtonCallEvent={() => this.checkNumbers()}
    //                                  clearButtonCallEvent={() => this.clearSelectedNumbers()}
    //                                  data={this.userPlayNumberEvent.str}
    //                                  mob={true}
    //             />
    //             <TCBetSettingModal ref='betSettingModal' settingEndingEvent={(e) => this.betSetEndingEvent(e)}/>
    //             <LoadingSpinnerOverlay ref={component => this._modalLoadingSpinnerOverLay = component}/>
    //         </View>
    //     )
    // }


    // //初始化玩法号码选择
    // initialContentView() {
    //     return <TCSSL_MainView ref='TCChongQingSSC' numberEvent={this.userPlayNumberEvent}
    //                            shakeEvent={() => this.byShake()} gameUniqueId={this.props.gameUniqueId}/>
    // }

    //初始化子玩法选择
    // initialPlayMatnItem() {
    //     return this.SingletonDPS.getFilterPlayTypeArray()[1];
    // }


    //初始化玩法选择器
    // initialPlayMath() {
    //     return this.SingletonDPS.getFilterPlayTypeArray()[0];
    // }



    // checkNumbers() {
    //     if (!NavigatorHelper.checkUserWhetherLogin()) {
    //         NavigatorHelper.pushToUserLogin()
    //         return
    //     }
    //     let res = this.SingletonDPS.isDsTz() ? this.SingletonDPS.getUnAddedDSUnits() : this.SingletonDPS.calUnAddedNumberOfUnits()
    //     if (res == 0) {
    //         //验证未通过
    //         Toast.showShortCenter('号码选择有误')
    //         return
    //     }
    //     this.showBetSettingModal()
    // }

    // showBetSettingModal() {
    //     if (!myGameSetting) {
    //         Toast.showShortCenter('玩法异常，请切换其他玩法');
    //         return
    //     }
    //     let prizeSettings = myGameSetting['singleGamePrizeSettings'][this.SingletonDPS.getPlayTypeId()]
    //     if (!prizeSettings) {
    //         Toast.showShortCenter('玩法异常，请切换其他玩法');
    //         return
    //     }
    //     let betSettingView = this.refs['betSettingModal']
    //     betSettingView._setModalVisibleAndOddsAndMaxRebateAndNumberOfUnits(true,
    //         prizeSettings['prizeSettings'][0]['prizeAmount'],
    //         prizeSettings['ratioOfReturnAmount'] * 100,
    //         this.SingletonDPS.getUnAddedAllUnits())
    // }

    // pushToBetBill() {
    //     this.clearSelectedNumbers()
    //     NavigatorHelper.pushToBetBill(this.props.title, 'SSL', this.currentResultData.resultsData, this.props.gameUniqueId, this.props.pagePathName)
    //     this.refs['contentScrollView'].scrollTo({x: 0, y: 0, animated: false})
    // }

    // byShake() {
    //     this.clearSelectedNumbers()
    //     let tempDic = this.SingletonDPS.addRandomToUnAddedArr()
    //     JXLog('shake = ' + JSON.stringify(tempDic))
    //     for (let ite in tempDic) {
    //         let tempArr = tempDic[ite]
    //         for (let i = 0; i < tempArr.length; i++) {
    //             RCTDeviceEventEmitter.emit('randomSelectedNumber', ite, tempArr[i]);
    //         }
    //     }
    // }

    //
    // showPopView() {
    //     var popView = this.refs.TCSelectPopupView
    //     if (popView.state.modalVisible) {
    //         popView._setModalVisible(false)
    //     } else {
    //         popView._setModalVisible(true)
    //     }
    // }
    //
    // randomSelect() {
    //     if (!NavigatorHelper.checkUserWhetherLogin()) {
    //         NavigatorHelper.pushToUserLogin()
    //         return
    //     }
    //     this.SingletonDPS.randomSelect(1)
    //     this.pushToBetBill()
    // }
    //
    //
    // goBack() {
    //     if (this.SingletonDPS.getAddedBetArr().length > 0) {
    //         Alert.alert(
    //             '退出页面会清空已选注单，\n是否退出？', null,
    //             [{
    //                 text: '确定', onPress: () => {
    //                     this.SingletonDPS.resetAllData()
    //                     NavigatorHelper.popToBack()
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

    // getShoppingCartView() {
    //     if (this.userPlayNumberEvent.str.alreadyAdd  > 0) {
    //         return (<TCBetGoBackShoppingCart style={{position: 'absolute', top: 0}}
    //                                          cc={this.userPlayNumberEvent.str.alreadyAdd }
    //                                          shakeEvent={() => this.pushToBetBill()}/>)
    //     }
    // }
}
//
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: indexBgColor.mainBg
//     },
// });
