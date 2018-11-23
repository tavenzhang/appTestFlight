import NavigatorHelper from "../../Common/JXHelper/TCNavigatorHelper";
import {observer} from "mobx-react/native";
import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter'
import JXUserPlayNumberEvent from "../../Data/JXUserPlayNumberEvent";
import React from "react";
import JXCurrentResultData from "../../Data/JXCurrentResultData";
import TCIntelligenceBetData from "../Bill/IntelligenceBet/TCIntelligenceBetData";
import JXHelper from "../../Common/JXHelper/JXHelper";
import {MathControllerFactory} from "lottery-core";
import Toast from "../../Common/JXHelper/JXToast";
import {
    StyleSheet,
    View,
    Dimensions,
    ScrollView,
    PanResponder,
    Image,
    Alert
} from 'react-native';
import TCBetHelperModal from "../Bet/View/TCBetHelperModal";
import TCHomeHistoryListNewSSC from "../../Common/View/TCHomeHistoryListNewSSC";
import {betHome, indexBgColor} from "../resouce/theme";
import {ASSET_Other} from "../asset";
import TCBetShakeButtonView from "../Bet/View/TCBetShakeButtonView";
import TCBetBalanceButton from "../Bet/View/TCBetBalanceButton";
import TCBetHomeBottomView from "../Bet/View/TCBetHomeBottomView";
import TCBetSettingModal from "../Bet/View/TCBetSettingModal";
import LoadingSpinnerOverlay from "../../Common/View/LoadingSpinnerOverlay";
import TCBetGoBackShoppingCart from "../Bet/View/TCBetGoBackShoppingCart";
import TCBetBar from "../Bet/View/TCBetBar";
import TCSelectPopupView from "../Bet/View/TCPlayMethodSelectPopupView";
import AwardCoundtdownView from "../Bet/View/TCBetAwardCountdown";
import TCImage from "../../Common/View/image/TCImage";
import TCPlayMethodMultilevelSelectPopupView from "../Bet/View/TCPlayMethodMultilevelSelectPopupView";


export let SingletonDPS = null;

export let myGameSetting = null

@observer
export default class TCBaseBetHome extends React.Component {

    constructor(props) {
        super(props);
        JXLog("TCBaseBetHome-----constructor--", props)
        this.state = {
            isHistoryShow: false,
            gameName: props.gameName ? props.gameName : this.props.gameUniqueId,
            isMultyMethod: props.isMultyMethod ? props.isMultyMethod : false,
            contentView:props.contentView,
            popViewTitle:props.popViewTitle,
            isHighlightStyle:props.isHighlightStyle!=null ? props.isHighlightStyle:true
        };
        SingletonDPS = MathControllerFactory.getInstance().getMathController(this.props.gameUniqueId);
        this.gestureState = {
            gestureCase: null,
            moveTop: 0,
            topFinal: 0,
        }
        this._panResponder = {};
        this.myPlayMath = '';
        this.initialContentView = this.initialContentView.bind(this);
        this.renderHeader = this.renderHeader.bind(this);
        this.renderBody = this.renderBody.bind(this);
        this.goBack = this.goBack.bind(this);
        this.pushToBetBill = this.pushToBetBill.bind(this);
        this.byShake=this.byShake.bind(this);
        this.checkNumbers=this.checkNumbers.bind(this);
        this.randomSelect=this.randomSelect.bind(this);
        this.clearSelectedNumbers=this.clearSelectedNumbers.bind(this);
        this.SingletonDPS=SingletonDPS;
    };

    componentWillMount() {
        this.userPlayNumberEvent = new JXUserPlayNumberEvent(SingletonDPS);
        this.currentResultData = new JXCurrentResultData(this.props.gameUniqueId);
        this.myPlayMath = this.props.cp_playMath;
        SingletonDPS.setGameUniqueId(this.props.gameUniqueId);
        SingletonDPS.filterPlayType(TCGameSetting.content['allGamesPrizeSettings'][this.props.gameUniqueId]["singleGamePrizeSettings"]);
        this.myPlayMath = SingletonDPS.getDefaultPlayNameFromFilterArray(this.props.cp_playMath);
        SingletonDPS.resetAllData(this.myPlayMath);
        this._panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (evt, gestureState) => true,
            onMoveShouldSetPanResponder: (evt, gestureState) => {
                const {dx} = gestureState;
                return Math.abs(dx) > 0;
            },
            onPanResponderGrant: (evt, gestureState) => {
                this.updateHistoryViewHigh({
                    gestureCase: gestureState,
                    moveTop: this.gestureState.topFinal
                })
            },
            onPanResponderMove: (evt, gestureState) => {
                if (this.gestureState.topFinal >= 312 && gestureState.vy > 0) {
                    return;
                }
                if (gestureState.vy > 0 && gestureState.dy >= 312 || this.gestureState.topFinal == 182 && gestureState.dy >= 182) {
                    this.updateHistoryViewHigh({gestureCase: null, topFinal: 312});
                } else {
                    this.updateHistoryViewHigh({gestureCase: gestureState});
                }
            },
            onPanResponderRelease: (evt, gestureState) => {
                let topFailHeight = 0;
                if (gestureState.vy > 0 && gestureState.dy > 0) {
                    topFailHeight = this.refs.TCHomeHistoryList.getHightState() == 1 ? 182 : 312
                } else if (gestureState.vy == 0) {
                    if (gestureState.dy >= 0) {
                        if (this.gestureState.topFinal == 0) {
                            topFailHeight = 182;
                        }
                    } else {
                        topFailHeight = 0;
                    }
                } else if (gestureState.vy < 0) {
                    topFailHeight = 0;
                }
                let isShowHistory = topFailHeight > 0;
                if (this.state.isHistoryShow != isShowHistory) {
                    clearTimeout(this.timerShow);
                    this.timerShow = setTimeout(() => this.setState({isHistoryShow: isShowHistory}), 150);//错开render 时机
                }

                this.updateHistoryViewHigh({
                    isBegin: false,
                    isMove: false,
                    isEnd: true,
                    gestureCase: null,
                    topFinal: topFailHeight,
                });
            },
        });
        this.didFocusListener = this.props.navigation.addListener('didFocus', () => this.currentResultData.didBlur(false))
        this.didBlurListener = this.props.navigation.addListener('willBlur', () => this.currentResultData.didBlur(true))
        this.checkGameSetting();
    }

    updateHistoryViewHigh = (newState) => {
        this.gestureState = {...this.gestureState, ...newState};
        this.refs.TCHomeHistoryList.updateHistoryHight(this.gestureState);
    }


    componentDidMount() {
        this.clearSelectedNumbers()
        // this.myPlayMath = this.props.cp_playMath
        SingletonDPS.setGameUniqueId(this.props.gameUniqueId);
        SingletonDPS.resetPlayType(this.myPlayMath);
        this.refs['TCBetShakeButtonView'].resetPlayMath(this.myPlayMath, this.props.gameUniqueId)

        this.listener = RCTDeviceEventEmitter.addListener('upDataUI_forBillDataChange', () => {
            this.userPlayNumberEvent.userNumberCallBackRefresh()
        })

    }

    componentWillUnmount() {
        this.listener && this.listener.remove()
        this.listener1 && this.listener1.remove();
        this.listener2 && this.listener2.remove();
        this.didFocusListener && this.didFocusListener.remove()
        this.didBlurListener && this.didBlurListener.remove()
        this.currentResultData && this.currentResultData.clear();
        TCIntelligenceBetData.getInstance() && TCIntelligenceBetData.getInstance().clearInstance();
    }


    render() {
        return (
            <View style={styles.container}>
                {this.renderHeader()}
                {this.renderBody()}
            </View>
        )
    }

    renderHeader() {

        return <TCBetBar
            ref='TopNavigationBar'
            backButtonCall={this.goBack}
            centerButtonCall={this.showPopView}
            rightButtonCall={() => {
                this.refs['TCBetHelperModal']._setModalVisible(true)
            }}
            title={this.myPlayMath}
        />
    }

    renderBody() {
        return (<View style={{flex: 1}}>
            {this.renderPopUpView()}

            <TCBetHelperModal
                ref="TCBetHelperModal"
                selectedFunc={(index) => this.helperJumpTo(index)}
                gameUniqueId={this.props.gameUniqueId}
            />
            <AwardCoundtdownView
                resultsData={this.currentResultData.resultsData}
                is10Num={true}
            />
            <TCHomeHistoryListNewSSC
                ref="TCHomeHistoryList"
                gameUniqueId={this.props.gameUniqueId}
                title={this.props.title}
                isHighlightStyle={this.state.isHighlightStyle}
            />

            <View style={{
                flexDirection: 'column',
                justifyContent: 'flex-start',
                height: 13,
                width: Dimensions.get('window').width,
                alignItems: 'center',
                backgroundColor: betHome.betTopItemBg,
            }} {...this._panResponder.panHandlers}>
                <TCImage
                    source={this.state.isHistoryShow ?
                        ASSET_Other.Other.betIco.stdui_arrow_up : ASSET_Other.Other.stdui_arrow_down}
                    resizeMode={'contain'}
                    style={{height: 13, width: 55, marginTop: 0}}
                />
            </View>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: betHome.betTopItemBg,
            }} {...this._panResponder.panHandlers}>
                <TCBetShakeButtonView ref="TCBetShakeButtonView" style={{position: 'absolute', top: 0}}
                                      shakeEvent={this.byShake}/>
                <TCBetBalanceButton shakeEvent={this.byShake}/>
                {this.getShoppingCartView()}
            </View>

            <View style={{flex: 1}}>
                <ScrollView ref="contentScrollView">{this.initialContentView()}</ScrollView>
            </View>
            {this.renderSpecialView()}
            <TCBetHomeBottomView ref="TCBetHomeBottomView"
                                 leftButtonCallEvent={this.randomSelect}
                                 rightButtonCallEvent={this.checkNumbers}
                                 clearButtonCallEvent={this.clearSelectedNumbers}
                                 data={this.userPlayNumberEvent.str}
                                 mob={true}
            />
            <TCBetSettingModal ref='betSettingModal' settingEndingEvent={(json)=>this.betSetEndingEvent(json)}/>
            <LoadingSpinnerOverlay
                ref={component => this._modalLoadingSpinnerOverLay = component}
            />
        </View>)
    }

    renderPopUpView(){
        return this.state.isMultyMethod ?  <TCPlayMethodMultilevelSelectPopupView
            ref='TCSelectPopupView'
            selectTitleArr={this.initialPlayMath()}
            secondAreaTitleArr={this.initialPlayMatnItem()}
            selectTitle={true}
            selectedFunc={(index, areaIndex) => {
                this.choosePlayType(index, areaIndex)
            }}
            secondAreaTitle={this.state.secondAreaTitle}
        />:<TCSelectPopupView
            ref='TCSelectPopupView'
            selectTitleArr={this.initialPlayMath()}
            selectedFunc={(index, areaIndex) => {
                this.choosePlayType(index, areaIndex)
            }}
            secondAreaTitleArr={this.initialPlayMatnItem()}
            selectTitle={this.state.popViewTitle ? this.state.popViewTitle.selectTitle:null}
            secondAreaTitle={this.state.popViewTitle ? this.state.popViewTitle.secondAreaTitle:null}
        />
    }

    renderSpecialView(){
        return null
    }


    getShoppingCartView() {
        if (this.userPlayNumberEvent.str.alreadyAdd > 0) {
            return (<TCBetGoBackShoppingCart style={{position: 'absolute', top: 0}}
                                             cc={this.userPlayNumberEvent.str.alreadyAdd}
                                             shakeEvent={this.pushToBetBill}/>)
        }
    }


    checkGameSetting = () => {
        storage.load({
            key: 'TCGameSetting',
        }).then(res => {
            if (res) {
                myGameSetting = res.content['allGamesPrizeSettings'][this.props.gameUniqueId]
            }
        }).catch(err => {

        })
    }


    //初始化玩法选择器
    initialPlayMath() {
        return SingletonDPS.getFilterPlayTypeArray()[0];
    }

    initialPlayMatnItem() {
        return SingletonDPS.getFilterPlayTypeArray()[1];
    }

    //玩法选择切换
    choosePlayType(index, areaIndex) {
        let platMath = SingletonDPS.getPlayTypeNameByIndex(index, areaIndex);
        JXLog("TCBaseBetHome-------this.areaIndex==" + areaIndex, index)
        if (this.myPlayMath === platMath) return
        this.myPlayMath = platMath;
        SingletonDPS.resetPlayType(platMath);

        this.refs['contentScrollView'].scrollTo({x: 0, y: 0, animated: false});

        let contentView = this.refs['contentView']
        if (contentView) {
            contentView.setPlayMathWith(platMath)
        }

        let navBar = this.refs['TopNavigationBar']
        navBar.setTitle(platMath)

        var popView = this.refs['TCSelectPopupView']
         popView._setModalSelectedIndex(index, areaIndex)
        this.refs['TCBetShakeButtonView'].resetPlayMath(this.myPlayMath, this.props.gameUniqueId)
        this.clearSelectedNumbers()
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
        let betSettingView = this.refs['betSettingModal'];
        betSettingView._setModalVisibleAndOddsAndMaxRebateAndNumberOfUnits(true,
            odds,
            prizeSettings['ratioOfReturnAmount'] * 100,
            SingletonDPS.getUnAddedAllUnits())
    }



    showPopView = () => {
        var popView = this.refs['TCSelectPopupView']
        if (popView.state.modalVisible) {
            popView._setModalVisible(false,);
        } else {
            popView._setModalVisible(true);
        }
    }

    randomSelect = () => {
        if (!NavigatorHelper.checkUserWhetherLogin()) {
            NavigatorHelper.pushToUserLogin()
            return
        }
        JXLog("TCBaseBetHome-----randomSelect--start--SingletonDPS.getPlayTypeId==", myGameSetting);
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

    byShake ()  {
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


    checkNumbers () {
        if (!NavigatorHelper.checkUserWhetherLogin()) {
            NavigatorHelper.pushToUserLogin()
            return
        }
        let res = SingletonDPS.isDsTz() ? SingletonDPS.getUnAddedDSUnits() : SingletonDPS.calUnAddedNumberOfUnits()
        if (res == 0) {
            //验证未通过
            Toast.showShortCenter('号码选择有误');
            return
        }
        this.showBetSettingModal()
    }



    //初始化玩法号码选择
    initialContentView() {

        let  MyContentBetView    = this.state.contentView;
        return <MyContentBetView ref='contentView' numberEvent={this.userPlayNumberEvent}
                                  shakeEvent={this.byShake} gameUniqueId={this.props.gameUniqueId}
                                  defaultPlayType={this.myPlayMath}/>
    }

    // initialContentView() {
    //     return <TCChongQingSSC ref='contentView' numberEvent={this.userPlayNumberEvent}
    //                            shakeEvent={this.byShake} gameUniqueId={this.props.gameUniqueId}
    //                            defaultPlayType={this.myPlayMath}/>
    // }


    betSetEndingEvent(json) {
        SingletonDPS.addToBetArray(json.odds, json.unitPrice, json.rebate);
      // this.userPlayNumberEvent.str.alreadyAdd = SingletonDPS.getAddedAllUnits()
        this.userPlayNumberEvent.userNumberCallBackRefresh()
        this.pushToBetBill()
    }


    pushToBetBill() {
        this.clearSelectedNumbers()
        this.refs['contentScrollView'].scrollTo({x: 0, y: 0, animated: false})
        NavigatorHelper.pushToBetBill(this.props.title, this.state.gameName, this.currentResultData.resultsData, this.props.gameUniqueId, this.props.pagePathName)
    }


    clearSelectedNumbers()  {
        SingletonDPS.resetUnAddedSelectedNumbers()
        this.userPlayNumberEvent.resetStrData();
        // RCTDeviceEventEmitter.emit('BJPK10NumberCall_clear');
        // RCTDeviceEventEmitter.emit('qdxdsReset');
    }


    helperJumpTo(index) {
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
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: indexBgColor.mainBg,
    }
});
