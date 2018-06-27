/**
 * Created by Sam on 2016/11/28.
 */

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
    Alert,
    InteractionManager, TouchableWithoutFeedback
} from 'react-native';

//系统 npm类
import Toast from '../../../../Common/JXHelper/JXToast';
import LoadingSpinnerOverlay from '../../../../Common/View/LoadingSpinnerOverlay'
import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter'
import {observer} from 'mobx-react/native';

//组件内部显示需要引入的类
import TopNavigationBar from '../../View/TCBetBar'
import TCBJPK10_MainView from './view/TCBJPK10_MainView'
import TCSelectPopupView from '../../View/TCPlayMethodSelectPopupView'
import AwardCoundtdownView from '../../View/TCBetAwardCountdown'
import TCBetHomeBottomView from '../../View/TCBetHomeBottomView'
import TCBetSettingModal from '../../View/TCBetSettingModal'
import TCBetHelperModal from '../../View/TCBetHelperModal'
import TCBetGoBackShoppingCart from '../../View/TCBetGoBackShoppingCart'
import TCBetShakeButtonView from '../../View/TCBetShakeButtonView'
import TCBetBalanceButton from '../../View/TCBetBalanceButton'
import TCHomeHistoryListNew from '../../../../Common/View/TCHomeHistoryListNew'

// 外部关系组件 如 页面跳转用
import TCBetBill from '../../../Bill/TCBetBill'
import NavigatorHelper from '../../../../Common/JXHelper/TCNavigatorHelper'
import JXHelper from '../../../../Common/JXHelper/JXHelper'
import JXCurrentResultData from '../../../../Data/JXCurrentResultData'
import JXUserPlayNumberEvent from '../../../../Data/JXUserPlayNumberEvent'

import {betHome, indexBgColor} from '../../../resouce/theme'
import {MathControllerFactory} from 'lottery-core'
import TCIntelligenceBetData from "../../../Bill/IntelligenceBet/TCIntelligenceBetData";
import {withMappedNavigationProps} from 'react-navigation-props-mapper'
import {betIcon} from "../../../resouce/images";
import {TC_LayoutAnimaton} from "../../../../Common/View/layoutAnimation/LayoutAnimaton";

let SingletonDPS = null;
let myPlayMath = '';
let myGameSetting = null

@withMappedNavigationProps()
@observer
export default class TCMarkSixBetHome extends React.Component {
    constructor(state) {
        super(state);
        this.state = {
            gestureCase: null,
            moveTop: 0,
            topFinal: 0,
            isAnimation:true,
            enableGesture:false
        };
        this.helperJumpTo = this.helperJumpTo.bind(this);
        SingletonDPS = MathControllerFactory.getInstance().getMathController(this.props.gameUniqueId);
    };


    static defaultProps = {
        cp_playMath: '定位胆',
        unit_price: 2,
        gameUniqueId: ''
    }



    _panResponder = {}

    componentWillMount() {
        this.userPlayNumberEvent = new JXUserPlayNumberEvent(SingletonDPS);
        this.currentResultData = new JXCurrentResultData(this.props.gameUniqueId)
        // myPlayMath=this.props.cp_playMath;
        SingletonDPS.setGameUniqueId(this.props.gameUniqueId);
        SingletonDPS.filterPlayType(TCGameSetting.content['allGamesPrizeSettings'][this.props.gameUniqueId]["singleGamePrizeSettings"]);
        myPlayMath = SingletonDPS.getDefaultPlayNameFromFilterArray(this.props.cp_playMath);
         SingletonDPS.resetAllData(myPlayMath);
        this._panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponder: ()=> true,
            onPanResponderGrant: (evt,gs)=>{
                //滑动开始时，获取矩形的左上坐标，并设置背景为红色
             //  JXLog("TCJPK------global-onPanResponderGrant==");zz
            },
            onPanResponderMove: (evt,gs)=>{
             //   JXLog("TCJPK-----global-onPanResponderMove==");
                if(gs.dy<0) {
                    this.refs.historyView.onHideListView();
                }else if(gs.dy>0){
                    this.refs.historyView.onShowListView();
                }
            },
        })

        this.didFocusListener = this.props.navigation.addListener('willFocus', () => {
            JXLog("TCJPK------willFocus");
        })

      this.didFocusListener = this.props.navigation.addListener('didFocus', () => {
          JXLog("TCJPK------didFocus")
          this.currentResultData.didBlur(false)}
          )
        this.didBlurListener = this.props.navigation.addListener('willBlur', () =>{
            JXLog("TCJPK------willBlur")

            this.currentResultData.didBlur(true)})
      this.didBlurListener = this.props.navigation.addListener('didBlur', () =>{
          JXLog("TCJPK------didBlur")

          this.currentResultData.didBlur(true)})
       // JXLog("TCJPK-----runAfterInteractions-begin")
       //  InteractionManager.runAfterInteractions(() => {
       //      this.setState({isAnimation:false})
       //      JXLog("TCJPK-----runAfterInteractions-fish");
       //      // ...耗时较长的同步的任务...
       //  });
    }

    render() {
        let historyHeight = this.state.gestureCase == null ? this.state.topFinal : this.state.gestureCase.dy + this.state.moveTop;
        if (historyHeight < 0) {
            historyHeight = 0;
        } else if (historyHeight > 312) {
            historyHeight = 312;
        }
        let globalGuest= this.state.enableGesture ? this._panResponder.panHandlers:{}
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
                    is10Num={true}
                />
                <View style={{flex:1}} {...globalGuest}>
                <TCHomeHistoryListNew
                        ref="historyView"
                        onGuestureChange={(enable)=>{
                            this.setState({enableGesture:enable})
                        }}
                        height={historyHeight}
                        gameUniqueId={this.props.gameUniqueId}
                        title={this.props.title}
                        isHighlightStyle={false}
                    />

                <View style={{
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    height: 13,
                    width: Dimensions.get('window').width,
                    alignItems: 'center',
                    backgroundColor: betHome.betTopItemBg,
                }} >
                    <Image
                        source={this.state.enableGesture ? betIcon.stdui_arrow_up:betIcon.stdui_arrow_down}
                        resizeMode={'contain'}
                        style={{height: 13, width: 55, marginTop: 0}}
                    />
                </View>
                <TouchableWithoutFeedback onPress={()=>{
                    if(!this.state.enableGesture){
                        this.refs.historyView.onShowListView();
                    }else{
                        this.refs.historyView.onHideListView();

                    }
                }}>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    backgroundColor: betHome.betTopItemBg,
                }}>
                    <TCBetShakeButtonView ref="TCBetShakeButtonView" style={{position: 'absolute', top: 0}}
                                          shakeEvent={() => this.byShake()}/>
                    <TCBetBalanceButton style={{}} shakeEvent={() => this.byShake()}/>
                    {this.getShoppingCartView()}
                </View>
                </TouchableWithoutFeedback>
                    <ScrollView ref="contentScrollView"
                                scrollEventThrottle={6}
                                onTouchStart={(data) => {
                                   // JXLog( 'TCJPK------touch start')
                                    this.startY = parseFloat(data.nativeEvent.pageY)
                                }}
                                onTouchMove={(data) => {

                                    let dim = data.nativeEvent.pageY - this.startY;
                                   // JXLog( 'TCJPK------onTouchMove'+dim+" this.scrollOffY== ",this.scrollOffY)
                                    // TLog("onTouchMove---" + dim + "  this.scrollOffY==" + this.scrollOffY, this.startY) //增加10 垂直的距离
                                    if (dim > 6 && this.scrollOffY <= 0 ) {
                                        this.refs.historyView.onShowListView();
                                       JXLog("TCJPK----------contentScrollView"+dim,this.scrollOffY)
                                    }
                                }}
                                onScroll={(data) => {
                                    this.scrollOffY = data.nativeEvent.contentOffset.y
                                }}
                    >{this.initialContentView()}</ScrollView>

                <TCBetHomeBottomView ref="TCBetHomeBottomView"
                                     leftButtonCallEvent={() => this.randomSelect()}
                                     rightButtonCallEvent={() => this.checkNumbers()}
                                     clearButtonCallEvent={() => this.clearSelectedNumbers()}
                                     data={this.userPlayNumberEvent.str}
                                     mob={true}
                />
                <TCBetSettingModal ref='betSettingModal' settingEndingEvent={(e) => this.betSetEndingEvent(e)}/>
                </View>
                <LoadingSpinnerOverlay ref={component => this._modalLoadingSpinnerOverLay = component}
                />
            </View>
        )
    }

    getShoppingCartView() {
        if (this.pk10Data.str.alreadyAdd > 0) {
            return (<TCBetGoBackShoppingCart style={{position: 'absolute', top: 0}}
                                             cc={this.pk10Data.str.alreadyAdd}
                                             shakeEvent={() => this.pushToBetBill()}/>)
        }
    }

    componentDidMount() {
        this.clearSelectedNumbers()
        // myPlayMath = this.props.cp_playMath
        SingletonDPS.setGameUniqueId(this.props.gameUniqueId);
        SingletonDPS.resetPlayType(myPlayMath);
        this.refs['TCBetShakeButtonView'].resetPlayMath(myPlayMath, this.props.gameUniqueId)

        this.listener = RCTDeviceEventEmitter.addListener('upDataUI_forBillDataChange', () => {
            this.userPlayNumberEvent.userNumberCallBackRefresh()
        })
        this.checkGameSetting();
    }

    componentWillUnmount() {
        this.listener && this.listener.remove()
        this.listener1 && this.listener1.remove();
        this.didFocusListener && this.didFocusListener.remove()
        this.didBlurListener && this.didBlurListener.remove()
        this.currentResultData && this.currentResultData.clear();
        TCIntelligenceBetData.getInstance() && TCIntelligenceBetData.getInstance().clearInstance();
    }

    getShoppingCartView() {
        if (this.userPlayNumberEvent.str.alreadyAdd > 0) {
            return (<TCBetGoBackShoppingCart style={{position: 'absolute', top: 0}}
                                             cc={this.userPlayNumberEvent.str.alreadyAdd}
                                             shakeEvent={() => this.pushToBetBill()}/>)
        }
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

    //初始化玩法号码选择
    initialContentView=()=> {
        // if(this.state.isAnimation){
        //     return null
        // }
       // return null
        return <TCBJPK10_MainView ref='TCBJPK10_MainView' numberEvent={this.userPlayNumberEvent}
                                  shakeEvent={this.byShake} gameUniqueId={this.props.gameUniqueId}
                                  defaultPlayType={myPlayMath}/>
    }

    //初始化玩法选择器
    initialPlayMath() {
        return SingletonDPS.getFilterPlayTypeArray()[0];
    }

    //玩法选择切换
    choosePlayType(index, areaIndex) {
        let platMath = SingletonDPS.getPlayTypeNameByIndex(index, areaIndex);
        if (myPlayMath === platMath) return
        myPlayMath = platMath;
        SingletonDPS.resetPlayType(platMath);

        this.refs['contentScrollView'].scrollTo({x: 0, y: 0, animated: false});

        let contentView = this.refs['TCBJPK10_MainView']
        contentView.setPlayMathWith(platMath)

        let navBar = this.refs['TopNavigationBar']
        navBar.setTitle(platMath)

        var popView = this.refs['TCSelectPopupView']
        popView._setModalSelectedIndex(index, areaIndex)
        this.refs['TCBetShakeButtonView'].resetPlayMath(myPlayMath, this.props.gameUniqueId)
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
        let odds = prizeSettings['prizeSettings'][0]['prizeAmount'];
        SingletonDPS.addOddsArray(odds);
        let betSettingView = this.refs['betSettingModal']
        betSettingView._setModalVisibleAndOddsAndMaxRebateAndNumberOfUnits(true,
            odds,
            prizeSettings['ratioOfReturnAmount'] * 100,
            SingletonDPS.getUnAddedAllUnits())
    }

    betSetEndingEvent(json) {
        SingletonDPS.addToBetArray(json.odds, json.unitPrice, json.rebate)
        this.userPlayNumberEvent.str.alreadyAdd = SingletonDPS.getAddedAllUnits()
        this.pushToBetBill()
    }

    pushToBetBill() {
        // JXLog("hehehe pushToBill");
        this.clearSelectedNumbers()
        NavigatorHelper.pushToBetBill(this.props.title, 'BJPK10', this.currentResultData.resultsData, this.props.gameUniqueId, this.props.pagePathName)
        this.refs['contentScrollView'].scrollTo({x: 0, y: 0, animated: false})
    }

    clearSelectedNumbers() {
        SingletonDPS.resetUnAddedSelectedNumbers()
        RCTDeviceEventEmitter.emit('BJPK10NumberCall_clear');
        RCTDeviceEventEmitter.emit('qdxdsReset');
        this.userPlayNumberEvent.resetStrData();
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

    byShake=()=> {
        this.clearSelectedNumbers()
        let tempDic = SingletonDPS.addRandomToUnAddedArr();
        for (let ite in tempDic) {
            let tempArr = tempDic[ite]
            for (let i = 0; i < tempArr.length; i++) {
                RCTDeviceEventEmitter.emit('randomSelectedNumber', ite, tempArr[i]);
            }
        }
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
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: indexBgColor.mainBg,
    }
});
