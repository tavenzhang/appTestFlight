/**
 * Created by Sam on 2016/11/12.
 */

import React, {Component} from 'react';

/**系统 npm类 */
import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter'

/**组件内部显示需要引入的类 */

import TCChongQingSSC from './view/TCChongQingSSC_MainView'
import JXGSBQWView from './view/TCcqsscPositionView'



import {withMappedNavigationProps} from 'react-navigation-props-mapper'

import {observer} from 'mobx-react/native';
import TCBaseBetHome from "../../../Base/TCBaseBetHome";
import Toast from "../../../../Common/JXHelper/JXToast";

@withMappedNavigationProps()
@observer
export default class TCBetHome extends TCBaseBetHome {

    constructor(props) {
        super({...props,gameName:"SSC",contentView:TCChongQingSSC, isMultyMethod:true,isHighlightStyle:true})
        this.state = {
            ...this.state,
            showGSBQW: false,
            showGSBQWArr: [],
        }
    }

    static defaultProps = {
        gameUniqueId: '',
        cp_playMath: '定位胆-定位胆',
        unit_price: 2
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


    GSBQWChange(checkList) {
        this.SingletonDPS.resetGSBQW(checkList)
        this.userPlayNumberEvent.refreshBottomData();
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
        this.setState({showGSBQW: checkList})
        if (this.refs['GSBQW']) {
            this.refs['GSBQW']._resetCheked(checkList)
        }
        this.SingletonDPS.resetGSBQW(checkList)
        this.SingletonDPS.resetUnAddedSelectedNumbers()
        RCTDeviceEventEmitter.emit('TCChongQing_numberSelectView_clear');
        RCTDeviceEventEmitter.emit('qdxdsReset');
        this.userPlayNumberEvent.resetStrData();
    }


    // pushToBetBill=()=> {
    //     this.clearSelectedNumbers()
    //     NavigatorHelper.pushToBetBill(this.props.title, 'SSC', this.currentResultData.resultsData, this.props.gameUniqueId, this.props.pagePathName)
    //     this.refs['contentScrollView'].scrollTo({x: 0, y: 0, animated: false})
    // }


    // componentWillUnmount() {
    //     this.listener && this.listener.remove();
    //     this.listener1 && this.listener1.remove();
    //     this.didFocusListener && this.didFocusListener.remove()
    //     this.didBlurListener && this.didBlurListener.remove()
    //     this.currentResultData && this.currentResultData.clear();
    //     TCIntelligenceBetData.getInstance() && TCIntelligenceBetData.getInstance().clearInstance();
    // }
    //
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
    //
    // setModalVisible=()=>{
    //     this.refs['TCBetHelperModal']._setModalVisible(true);
    // }


    // render() {
    //     JXLog("TCSSC-----------------BetHome-------------render");
    //     return (
    //         <View style={styles.container}>
    //             <TopNavigationBar
    //                 ref='TopNavigationBar'
    //                 backButtonCall={this.goBack}
    //                 centerButtonCall={this.showPopView}
    //                 rightButtonCall={this.setModalVisible}
    //                 title={this.SingletonDPS.getPlayTypeNameByIndex(0, 0)}
    //             />
    //
    //             <TCSelectPopupView
    //                 ref='TCSelectPopupView'
    //                 selectTitleArr={this.initialPlayMath()}
    //                 secondAreaTitleArr={this.initialPlayMatnItem()}
    //                 selectTitle={true}
    //                 selectedFunc={this.choosePlayType}
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
    //
    //             <TCHomeHistoryListNewSSC
    //                     ref="TCHomeHistoryList"
    //                     gameUniqueId={this.props.gameUniqueId}
    //                     title={this.props.title}
    //                     isHighlightStyle={true}
    //                 />
    //             <View style={{
    //                 flexDirection: 'column',
    //                 justifyContent: 'flex-start',
    //                 height: 13,
    //                 width: width,
    //                 alignItems: 'center',
    //                 backgroundColor: betHome.betTopItemBg,
    //             }} {...this._panResponder.panHandlers}>
    //                 <Image
    //                     source={this.state.isHistoryShow ?
    //                         betIcon.stdui_arrow_up:betIcon.stdui_arrow_down}
    //                     resizeMode={'contain'}
    //                     style={{height: 13, width: 55, marginTop: 0}}
    //                 />
    //             </View>
    //
    //             <View
    //                 style={{
    //                     flexDirection: 'row',
    //                     justifyContent: 'space-between',
    //                     alignItems: 'center',
    //                     backgroundColor: betHome.betTopItemBg,
    //                 }} {...this._panResponder.panHandlers}>
    //                 <TCBetShakeButtonView ref="TCBetShakeButtonView" style={styles.shadowStyle}
    //                                       shakeEvent={this.byShake}/>
    //                 <TCBetBalanceButton />
    //                 {this.getShoppingCartView()}
    //             </View>
    //
    //
    //             <View style={{flex:1}}>
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
    //


    // initialContentView() {
    //     return <TCChongQingSSC ref='contentView' numberEvent={this.userPlayNumberEvent}
    //                            shakeEvent={this.byShake} gameUniqueId={this.props.gameUniqueId}
    //                            defaultPlayType={this.myPlayMath}/>
    // }

    // initialPlayMatnItem() {
    //     return this.SingletonDPS.getFilterPlayTypeArray()[1];
    // }
    //
    //
    // initialPlayMath() {
    //     return this.SingletonDPS.getFilterPlayTypeArray()[0];
    // }

    // choosePlayType=(parentIndex, itemIndex)=> {
    //     let platMath = this.SingletonDPS.getPlayTypeNameByIndex(parentIndex, itemIndex);
    //     if (myPlayMath === platMath) return;
    //
    //     this.refs['contentScrollView'].scrollTo({x: 0, y: 0, animated: false})
    //
    //     myPlayMath = platMath
    //     this.SingletonDPS.resetPlayType(platMath)
    //
    //     let contentView = this.refs['TCChongQingSSC']
    //     contentView.setPlayMathWith(platMath)
    //
    //     let playMathName = platMath
    //
    //     let navBar = this.refs['TopNavigationBar']
    //     navBar.setTitle(playMathName)
    //
    //     var popView = this.refs['TCSelectPopupView']
    //     popView._setModalSelectedIndex(parentIndex, itemIndex)
    //
    //     this.refs['TCBetShakeButtonView'].resetPlayMath(platMath, this.props.gameUniqueId);
    //
    //     this.clearSelectedNumbers()
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
    //     let odds = prizeSettings['prizeSettings'][0]['prizeAmount'];
    //     this.SingletonDPS.addOddsArray(odds);
    //
    //     let betSettingView = this.refs['betSettingModal']
    //     betSettingView._setModalVisibleAndOddsAndMaxRebateAndNumberOfUnits(true,
    //         odds,
    //         prizeSettings['ratioOfReturnAmount'] * 100,
    //         this.SingletonDPS.getUnAddedAllUnits())
    // }


    // showPopView=()=> {
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
    //     if (myGameSetting) {
    //         let prizeSettings = myGameSetting['singleGamePrizeSettings'][this.SingletonDPS.getPlayTypeId()]
    //         if (!prizeSettings) {
    //             return
    //         }
    //         let odds = prizeSettings['prizeSettings'][0]['prizeAmount'];
    //         this.SingletonDPS.addOddsArray(odds);
    //
    //     }
    //     this.pushToBetBill()
    // }

    // goBack=()=> {
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
    //
    // getShoppingCartView=()=> {
    //     if (this.userPlayNumberEvent.str.alreadyAdd > 0) {
    //         return (<TCBetGoBackShoppingCart style={styles.shakeButton}
    //                                          cc={this.userPlayNumberEvent.str.alreadyAdd}
    //                                          shakeEvent={this.pushToBetBill}/>)
    //     }
    // }
}

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: indexBgColor.mainBg
//     },
//     shakeButton:{
//         position: 'absolute',
//         top: 0
//     }
// });
