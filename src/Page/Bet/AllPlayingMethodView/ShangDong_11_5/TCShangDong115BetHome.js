/**
 * Created by Sam on 2016/11/28.
 */

import React, {Component} from 'react';


//系统 npm类

import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter'
import {observer} from 'mobx-react';

//组件内部显示需要引入的类

import Shangdong115_MainView from './view/TCShangdong115_MainView'


import {withMappedNavigationProps} from 'react-navigation-props-mapper'


import TCBaseBetHome from "../../../Base/TCBaseBetHome";

@withMappedNavigationProps()
@observer
export default class TCShangDong115BetHome extends TCBaseBetHome {

    constructor(props) {
        super({...props,gameName:"D115",
            contentView:Shangdong115_MainView,
            popViewTitle:{selectTitle:"普通",secondAreaTitle:'胆拖'},
            isMultyMethod:false,
            isHighlightStyle:true})
    }


    static defaultProps = {
        cp_playMath: '任选一',
        unit_price: 2,
    }

    clearSelectedNumbers() {
        this.SingletonDPS.resetUnAddedSelectedNumbers()
        RCTDeviceEventEmitter.emit('ShangDong115NumberCall_clear');
        RCTDeviceEventEmitter.emit('qdxdsReset');
        this.userPlayNumberEvent.resetStrData();
    }

    //
    // renderPopUpView(){
    //     return <TCCQSSCPlayMethodSelectPopupView
    //         ref='TCSelectPopupView'
    //         selectTitle='普通'
    //         selectTitleArr={this.initialPlayMath()}
    //         selectedFunc={(index, areaIndex) => {
    //             this.choosePlayType(index, areaIndex)
    //         }}
    //         secondAreaTitleArr={this.SingletonDPS.getFilterPlayTypeArray()[1]}
    //         secondAreaTitle='胆拖'
    //     />
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
    //
    //             <TCBetHelperModal
    //                 ref="TCBetHelperModal"
    //                 selectedFunc={this.helperJumpTo}
    //                 gameUniqueId={this.props.gameUniqueId}
    //             />
    //
    //             <TCSelectPopupView
    //                 ref='TCSelectPopupView'
    //                 selectTitle='普通'
    //                 selectTitleArr={this.initialPlayMath()}
    //                 selectedFunc={(index, areaIndex) => {
    //                     this.choosePlayType(index, areaIndex)
    //                 }}
    //                 secondAreaTitleArr={this.SingletonDPS.getFilterPlayTypeArray()[1]}
    //                 secondAreaTitle='胆拖'
    //             />
    //
    //             <AwardCoundtdownView
    //                 resultsData={this.currentResultData.resultsData}
    //             />
    //
    //             <TCHomeHistoryListNewSSC
    //                 ref="TCHomeHistoryList"
    //                     gameUniqueId={this.props.gameUniqueId}
    //                     title={this.props.title}
    //                     isHighlightStyle={true}
    //                 />
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
    //             <TCBetHomeBottomView ref="TCBetHomeBottomView"
    //                                  leftButtonCallEvent={() => this.randomSelect()}
    //                                  rightButtonCallEvent={() => this.checkNumbers()}
    //                                  clearButtonCallEvent={() => this.clearSelectedNumbers()}
    //                                  data={this.userPlayNumberEvent.str}
    //                                  mob={true}
    //             />
    //
    //             <TCBetSettingModal ref='betSettingModal' settingEndingEvent={(e) => this.betSetEndingEvent(e)}/>
    //             <LoadingSpinnerOverlay ref={component => this._modalLoadingSpinnerOverLay = component}/>
    //
    //         </View>
    //     )
    // }


    // componentDidMount() {
    //     this.clearSelectedNumbers()
    //     // myPlayMath = this.props.cp_playMath
    //     this.SingletonDPS.setGameUniqueId(this.props.gameUniqueId)
    //     this.SingletonDPS.resetPlayType(myPlayMath)
    //     this.refs['TCBetShakeButtonView'].resetPlayMath(myPlayMath, this.props.gameUniqueId)
    //     this.listener3 = RCTDeviceEventEmitter.addListener('upDataUI_forBillDataChange', () => {
    //         this.userPlayNumberEvent.userNumberCallBackRefresh();
    //     });
    //
    //     this.checkGameSetting()
    // }

    // componentWillUnmount() {
    //     this.listener && this.listener.remove();
    //     this.listener2 && this.listener2.remove();
    //     this.listener3 && this.listener3.remove();
    //     this.didFocusListener && this.didFocusListener.remove()
    //     this.didBlurListener && this.didBlurListener.remove()
    //     this.currentResultData && this.currentResultData.clear();
    //     TCIntelligenceBetData.getInstance() && TCIntelligenceBetData.getInstance().clearInstance();
    //
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

    //初始化玩法号码选择
    // initialContentView() {
    //     return <Shangdong115_MainView ref='Shangdong115_MainView' numberEvent={this.userPlayNumberEvent}
    //                                   shakeEvent={() => this.byShake()} gameUniqueId={this.props.gameUniqueId}
    //                                   defaultPlayType={myPlayMath}/>
    // }

    //初始化玩法选择器
    // initialPlayMath() {
    //     return this.SingletonDPS.getFilterPlayTypeArray()[0]
    // }

   // 玩法选择切换
   //  choosePlayType(index, areaIndex) {
   //      console.log(areaIndex + '===' + index);
   //      let platMath = this.SingletonDPS.getPlayTypeNameByIndex(index, areaIndex);
   //      if (this.myPlayMath == platMath) return
   //      this.myPlayMath = platMath;
   //      this.SingletonDPS.resetPlayType(platMath);
   //
   //      this.refs['contentScrollView'].scrollTo({x: 0, y: 0, animated: false})
   //
   //      let contentView = this.refs['contentView']
   //      if (contentView) {
   //          contentView.setPlayMathWith(platMath)
   //      }
   //
   //      let navBar = this.refs.TopNavigationBar
   //      navBar.setTitle(platMath)
   //
   //      var popView = this.refs.TCSelectPopupView
   //      popView._setModalSelectedIndex(index, areaIndex)
   //
   //      this.refs['TCBetShakeButtonView'].resetPlayMath(platMath, this.props.gameUniqueId)
   //
   //      this.clearSelectedNumbers()
   //  }

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

    // showBetSettingModal() {
    //     if (!myGameSetting) {
    //         Toast.showShortCenter('玩法异常，请切换其他玩法');
    //         return
    //     }
    //     let prizeSettings = myGameSetting['singleGamePrizeSettings'][this.SingletonDPS.getPlayTypeId()]
    //
    //     if (!prizeSettings) {
    //         Toast.showShortCenter('玩法异常，请切换其他玩法');
    //         return
    //     }
    //     let odds = prizeSettings['prizeSettings'][0]['prizeAmount'];
    //     this.SingletonDPS.addOddsArray(odds);
    //
    //     let betSettingView = this.refs['betSettingModal']
    //
    //     betSettingView._setModalVisibleAndOddsAndMaxRebateAndNumberOfUnits(true,
    //         odds,
    //         prizeSettings['ratioOfReturnAmount'] * 100,
    //         this.SingletonDPS.getUnAddedAllUnits())
    // }

    // betSetEndingEvent(json) {
    //     this.SingletonDPS.addToBetArray(json.odds, json.unitPrice, json.rebate)
    //     this.userPlayNumberEvent.str.alreadyAdd = this.SingletonDPS.getAddedBetArr().length;
    //     this.pushToBetBill()
    // }

    // pushToBetBill() {
    //     this.clearSelectedNumbers()
    //     NavigatorHelper.pushToBetBill(this.props.title, 'D115', this.currentResultData.resultsData, this.props.gameUniqueId, this.props.pagePathName);
    //     this.refs['contentScrollView'].scrollTo({x: 0, y: 0, animated: false})
    // }



    // showPopView() {
    //     var popView = this.refs.TCSelectPopupView
    //     if (popView.state.modalVisible) {
    //         popView._setModalVisible(false);
    //     } else {
    //         popView._setModalVisible(true);
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
    //
    // byShake() {
    //     this.clearSelectedNumbers()
    //     let tempDic = this.SingletonDPS.addRandomToUnAddedArr();
    //     console.log('shake = ' + JSON.stringify(tempDic))
    //     for (let ite in tempDic) {
    //         let tempArr = tempDic[ite]
    //         for (let i = 0; i < tempArr.length; i++) {
    //             console.log('areaIndex = ' + ite + ' number = ' + tempArr[i])
    //             RCTDeviceEventEmitter.emit('randomSelectedNumber', ite, tempArr[i]);
    //         }
    //     }
    // }


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
    //
    // getShoppingCartView() {
    //     if (this.userPlayNumberEvent.str.alreadyAdd > 0) {
    //         return (<TCBetGoBackShoppingCart style={{position: 'absolute', top: 0}}
    //                                          cc={this.userPlayNumberEvent.str.alreadyAdd}
    //                                          shakeEvent={() => this.pushToBetBill()}/>)
    //     }
    // }
}
//
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: indexBgColor.mainBg
//     }
// });
