/**
 * Created by Sam on 31/08/2017.
 * Copyright © 2017年 JX. All rights reserved.
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    TouchableOpacity,
    Alert, Platform, BackAndroid, Keyboard
} from 'react-native';

/**系统 npm类 */
import {observer, inject} from 'mobx-react/native';
import {baseColor, betHome, Size} from '../../resouce/theme'

/**组件内部显示需要引入的类 */
import TopNavigationBar from '../../../Common/View/TCNavigationBar';
import AwardCoundtdownView from '../TCBetBillAwardCountdown';
import TCBetBillBottomView from '../TCBetBillBottomView'
import TCIntelligenceBet_Item from './TCIntelligenceBet_Item'
import TCBetSettingModal from './TCIntelligenceBet_Modal'
import LoadingSpinnerOverlay from '../../../Common/View/LoadingSpinnerOverlay'
import NumberOnlyInputText from "../../../Common/View/NumberOnlyInputText";
import dismissKeyboard from 'dismissKeyboard'
import NetUitls from "../../../Common/Network/TCRequestUitls";
import Toast from '../../../Common/JXHelper/JXToast';
import {config} from "../../../Common/Network/TCRequestConfig";
import Moment from 'moment'
import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter'
import TCBillSucceedPage from "../TCBillSucceedPage";

import {BottomStopBetView} from "./BottomStopBetView";
import KeyboardAvoidingScrollView from "../../../Common/View/TCKeyboardAvoidingScrollView";
import JXHelpers from '../../../Common/JXHelper/JXHelper'
import NavigatorHelper from "../../../Common/JXHelper/TCNavigatorHelper";

import PhotoHelper from '../../../Common/JXHelper/PhotoHelper'
import LineDivider from "../../../Common/View/LineDivider";
import * as _ from "lodash";
import {checkIfAmountCorrect} from "../TCBillCheckHelper";

let photoHelper = new PhotoHelper();
/** 外部关系组件 如 页面跳转用 */
const {width, height} = Dimensions.get('window')
import {withMappedNavigationProps} from 'react-navigation-props-mapper'

@withMappedNavigationProps()
@inject("userStore")
@observer
export default class IntelligenceBet extends Component {

    static defaultProps = {
        cpInfoData: {},//相应的
        mobxIntelligenceData: null,//mobx管理state的类
        navigator: null,//路由管理类
    }


    constructor(state) {
        super(state);
        this.state = {
            showMainFirst: false,//先不加载主页面的listview 先进入页面
        };
        this.isFirst = true;
        this.itemArr = []; //复用之前生成的盈利率方案
        this.isModalVisible = false;//避免出现焦点在top issue input text 但是点击修改后 触发getData();
    }

    componentWillMount() {
        this.mobxBetData = this.props.mobxIntelligenceData;
    }

    componentDidMount() {
        this.getData(this.mobxBetData.data.continueIssueNumber);
        if (Platform.OS === 'android') {
            BackAndroid.addEventListener('hardwareBackPress', this.onBackAndroid.bind(this))
        }
        // let keyBoardShow = Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
        let keyBoardHide = Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';

        this.listener1 = Keyboard.addListener(keyBoardHide, (frames) => {
            //焦点在追号输入框中
            if (this.refs.issueTextInput.isFocused()) {
                let number = this.refs.issueTextInput.getNumberText();
                if (number == '' || number === undefined || number === null) {
                    this.onModifyToAddIssueNumber(this.mobxBetData.data.continueIssueNumber);
                    return;
                }
                if (number != this.mobxBetData.data.continueIssueNumber) {
                    this.onModifyToAddIssueNumber(number);
                }
            }
        });

    }


    componentWillUnmount() {
        this.itemArr.length = 0;
        this.timer && clearTimeout(this.timer);
        this.timer1 && clearTimeout(this.timer1);
        this.timer3 && clearTimeout(this.timer3);
        this.listener1 && this.listener1.remove();
        if (Platform.OS === 'android') {
            BackAndroid.removeEventListener('hardwareBackPress', this.onBackAndroid);
        }
        dismissKeyboard();
    }

    onBackAndroid() {
        if (this.mobxBetData.modalVisible) {
            dismissKeyboard();
            this.refs.betSettingModal._setModalVisible(false);
            return true;
        }
        return false;
    }

    componentDidUpdate() {
        if (this.state.showMainFirst && this.isFirst) {
            this.isFirst = false;
            this._partModalLoadingSpinnerOverLay.hide();
            return;
        }
        if (!this.isFirst) {
            this._partModalLoadingSpinnerOverLay.hide();
        }

    }

    render() {
        return (
            <View style={styles.container}>
                <TopNavigationBar
                    title={'智能追号'}
                    needBackButton={true}
                    backButtonCall={() => {
                        this.goBack()
                    }}
                    rightTitle='说明'
                    rightButtonCall={() => {
                        this.navRightButtonCall();
                    }}/>
                <AwardCoundtdownView
                    ref="AwardCountDownView"
                    data={this.props.cpInfoData}
                    timeOutCallBack={() => {
                        this.getPlanNoDetailRequest(true)
                    }}/>
                {this.getTopIssueView()}

                <KeyboardAvoidingScrollView ref="contentScrollView"
                                            style={{height: height - 64 - 49 - 60, backgroundColor: baseColor.mainBg}}
                                            removeClippedSubviews={true}
                                            scrollRenderAheadDistance={20}
                                            keyboardShouldPersistTaps={"always"}>
                    {this.getContentScrollView()}
                </KeyboardAvoidingScrollView>

                {this.getBottomStopBetView()}
                <LineDivider/>
                <TCBetBillBottomView ref="TCBetBillBottomView"
                                     rightButtonTitle="号码列表"
                                     centerTitleOneLine={true}
                                     leftButtonCallEvent={() => this.goBack()}
                                     rightButtonCallEvent={() => this.checkPay()}
                                     isIntelligenceBet={1}
                                     continueIssueNumber={this.mobxBetData.data.listArray.length}
                                     totalAmount={this.mobxBetData.data.allAmount}/>

                <TCBetSettingModal ref='betSettingModal'
                                   modalMobxData={this.mobxBetData} getData={(isIssueNumberChanged) => {
                    this.onBetModalConfirmPress(isIssueNumberChanged);

                }}/>
                <LoadingSpinnerOverlay
                    ref={component => this._partModalLoadingSpinnerOverLay = component}
                    modal={true}
                    marginTop={64}/>


            </View>
        )
    }

    navRightButtonCall() {
        let url = JXHelpers.getChaseNumberIntro();
        if (!url) {
            Toast.showShortCenter("说明异常，请重新尝试");
        } else {
            dismissKeyboard();
            NavigatorHelper.pushToWebView(url, "智能追号");
        }
    }

    onBetModalConfirmPress(isIssueNumberChanged) {
        if (!this.mobxBetData.checkRate()) {
            this.alertOutOfLimit(2);
            return;
        }
        // this.refs.betSettingModal._setModalVisible(false);
        this.refs.contentScrollView._scrollToTop();

        this._partModalLoadingSpinnerOverLay.show();
        this.timer && clearTimeout(this.timer);
        this.timer = setTimeout(() => {
            if (isIssueNumberChanged || this.mobxBetData.data.listArray.length !== this.mobxBetData.data.continueIssueNumber) {
                this.getData(this.mobxBetData.data.continueIssueNumber, true);
            } else {
                this.mobxBetData.resetArrayLowestRate(true);
                if (this.mobxBetData.outOfMultiplierOrAmoutIndex) {
                    if (this.mobxBetData.data.listArray.length === 0) {
                        this.alertOutOfLimit(5);
                    } else {
                        this.alertOutOfLimit(1);
                    }
                }
                this.refreshUI();
                this._partModalLoadingSpinnerOverLay.hide();
            }
        }, 550);

    }


    refreshUI() {
        this.setState({
            showMainFirst: true
        });
    }

    /**
     * 获取数据
     * @param limitIssueNumber
     * @param isChangeRate
     */
    getData(limitIssueNumber, isChangeRate) {
        //防止滚动在底部的时候，如果此时设置的期数很小，会看不到内容
        this.refs.contentScrollView._scrollToTop();

        if (!isChangeRate) {
            this._partModalLoadingSpinnerOverLay.show();
        }
        //需要加时间，不然loadingView不会显示
        this.timer1 && clearTimeout(this.timer1);
        this.timer1 = setTimeout(() => {
            if (this.mobxBetData.data.listArray.length > 0) {
                //数据如果存在，不需要去请求数据
                let arr = this.mobxBetData.data.listArray;
                let firstIssue = arr[0].issueNum;
                let lastIssue = arr[arr.length - 1].issueNum;
                let rightIssueNumber = parseInt(this.props.cpInfoData.rightData.uniqueIssueNumber);
                if (parseInt(firstIssue) <= rightIssueNumber && rightIssueNumber + parseInt(limitIssueNumber) <= parseInt(lastIssue)) {
                    this.mobxBetData.checkAndChangeIssueArray(this.lastAvailableArray, this.props.cpInfoData.rightData, limitIssueNumber, isChangeRate);
                    if (this.mobxBetData.outOfMultiplierOrAmoutIndex) {
                        if (this.mobxBetData.data.listArray.length === 0) {
                            this.alertOutOfLimit(5);
                        } else {
                            this.alertOutOfLimit(1);
                        }
                    }
                    this.refreshUI();
                    return;
                }
            }

            this.getNetData(limitIssueNumber, isChangeRate);
        }, 500);

    }


    /**
     * 从网络获取
     * @param limitIssueNumber
     * @param isChangeRate
     */
    getNetData(limitIssueNumber, isChangeRate) {
        let params = {
            currentIssueNumber: this.props.cpInfoData.rightData.uniqueIssueNumber,
            limit: parseInt(limitIssueNumber) + 5,
        };
        NetUitls.getUrlAndParamsAndCallback(config.api.nextAvailableIssueNumber + this.props.cpInfoData.rightData.gameUniqueId, params, (response) => {
            if (response.rs) {
                this.lastAvailableArray = response.content;

                this.mobxBetData.checkAndChangeIssueArray(this.lastAvailableArray, this.props.cpInfoData.rightData, limitIssueNumber, isChangeRate);
                if (this.mobxBetData.outOfMultiplierOrAmoutIndex) {
                    if (this.mobxBetData.data.listArray.length === 0) {
                        this.alertOutOfLimit(5);
                    } else {
                        this.alertOutOfLimit(1);
                    }
                } else if (this.lastAvailableArray.length < limitIssueNumber) {
                    this.alertOutOfLimit(6, this.lastAvailableArray.length);
                }

                this.refs.issueTextInput.setDisplayValue(this.mobxBetData.data.continueIssueNumber);
                this.refreshUI();

            } else {
                let toastString = '投注失败，请检查网络后重试'
                if (response.message) {
                    toastString = response.message
                }
                this.processing = false;
                this.refreshUI();
                Toast.showShortCenter(toastString);
            }
        }, 0, true);
    }

    getContentScrollView() {
        if (this.state.showMainFirst) {
            let len = this.mobxBetData.data.listArray.length;
            for (let j = this.itemArr.length; j < len; j++) {
                if (this.itemArr.length <= j) {
                    this.itemArr.push(<TCIntelligenceBet_Item style={{overflow: 'hidden'}} key={j}
                                                              data={this.mobxBetData.data}
                                                              mobxData={this.mobxBetData}
                                                              index={j}/>)
                }
            }

            if (this.itemArr.length > len) {
                this.itemArr.splice(len, this.itemArr.length - len);
            }
            return this.itemArr
        }
    }

    getTopIssueView() {
        return (
            <View style={{marginTop: 10}}>
                <View style={{flexDirection: 'row', marginLeft: 20, alignItems: 'center'}}>
                    <Text style={styles.chaseAndProfitTextStyle}>追号</Text>
                    <NumberOnlyInputText
                        ref="issueTextInput"
                        maxLength={2}
                        defaultValue={this.mobxBetData.data.continueIssueNumber}
                        textHeight={25}
                        textWidth={60}
                        fontSize={Size.font15}
                        onSubmitEditing={(number) => {
                            if (!this.isModalVisible) {
                                this.onModifyToAddIssueNumber(number);
                            }
                        }}
                        onEndEditing={(number) => {
                            if (!this.isModalVisible) {
                                this.onModifyToAddIssueNumber(number);
                            }
                        }}/>

                    <Text style={styles.chaseAndProfitTextStyle}>期</Text>
                    <Text
                        style={[styles.chaseAndProfitTextStyle, {
                            marginLeft: 10,
                        }]}>{this.getExpectText()}</Text>
                </View>

                <View style={{alignItems: 'flex-end'}}>
                    <TouchableOpacity onPress={() => {
                        this.modificationScheme()
                    }} style={{width: 100, paddingLeft: 15,}}>
                        <Text style={{
                            marginRight: 10,
                            marginBottom: 8,
                            marginTop: 2,
                            color: '#168bfe',
                            fontSize: Size.font15
                        }}>修改方案
                            ></Text>
                    </TouchableOpacity>
                </View>
                <TCIntelligenceBet_Item styleForTitle={true}/>
            </View>)
    }

    getExpectText() {
        if (this.mobxBetData.isShowLowest) {

            if (this.mobxBetData.data.thirdExpectedProfit) {
                return '全程最低盈利' + this.mobxBetData.lowestMoney + '元';
            } else {
                return '全程最低盈利率' + this.mobxBetData.lowestRate + '%';
            }
        }
        if (this.mobxBetData.data.firstExpectedProfit) {
            //方案一
            return '全程最低盈利率' + this.mobxBetData.data.lowestProfitRate + '%';
        } else if (this.mobxBetData.data.secondExpectedProfit) {
            //方案二
            return '前' + this.mobxBetData.data.topXIssueNumber + '期' + this.mobxBetData.data.topXProfitRate + '%之后盈利率' + this.mobxBetData.data.afterTopXProfitRate + '%';
        } else {
            //方案三
            return '全程最低盈利' + this.mobxBetData.data.lowestProfitMoney + '元';

        }
    }

    onModifyToAddIssueNumber(number) {
        if (number == '') {
            //可能存在list数据被改
            this.refs.issueTextInput.setDisplayValue(this.mobxBetData.data.continueIssueNumber);
            number = this.mobxBetData.data.continueIssueNumber;
        }

        //如果追号相同，并且和当前期一直，并且listdata没有修改，不进行数据更新
        if (number == this.mobxBetData.data.continueIssueNumber && !this.mobxBetData.isListDataChanged
            && this.mobxBetData.data.listArray && this.mobxBetData.data.listArray.length > 0
            && this.mobxBetData.data.listArray[0].issueNum == this.props.cpInfoData.rightData.uniqueIssueNumber) {
            return;
        }
        this.getData(number);
    }

    getBottomStopBetView() {
        return (<BottomStopBetView pressFunc={(isStop) => {
            this.mobxBetData.setWinAndThenStop(isStop)
        }} isStop={this.mobxBetData.data.winAndThenStop}/>)
    }


    modificationScheme() {
        this.isModalVisible = true;
        if (this.refs.issueTextInput.isFocused()) {
            let number = this.refs.issueTextInput.getNumberText();
            if (number == '' || number === undefined || number === null) {
                this.refs.issueTextInput.setDisplayValue(this.mobxBetData.data.continueIssueNumber);
            } else if (number != this.mobxBetData.data.continueIssueNumber) {
                dismissKeyboard();
                this.onModifyToAddIssueNumber(number);
                this.isModalVisible = false;
                return;
            }
        }
        dismissKeyboard();
        this.timer1 && clearTimeout(this.timer1);
        this.timer1 = setTimeout(() => {
            let betSettingView = this.refs['betSettingModal'];
            betSettingView._setModalVisible(true);
            this.isModalVisible = false;
        }, 20);

    }

    goBack() {
        NavigatorHelper.popToBack()
    }


    alertOutOfLimit(limitType, continueIssueNumber) {
        let content = '';
        switch (limitType) {
            case 1: {
                content = '倍数超过99999或者总金额超一百万，已自动丢弃超出倍数的期数';
            }
                break;
            case 2: {
                content = '超过当前玩法最大盈利率' + this.mobxBetData.maxRate + "%";
            }
                break;
            case 3: {
                content = '倍数不能为空'
            }
                break;
            case 4: {
                content = '总金额不能超过一百万，请重新设置'
            }
                break;
            case 5: {
                content = '当前全程最低盈利率无法计算，请降低追号注数或者降全程最低盈利率'
            }
                break;
            case 6: {
                content = '当前玩法最多可追' + continueIssueNumber + '期'
            }
                break;
            case 7:
            case 8: {
                content = '请生成追号方案再付款'
            }
                break;
        }
        let title = '温馨提示';
        Alert.alert(title,
            content, null,
            [{
                text: '确定', onPress: () => {
                }
            }
            ]);

    }

    alertOutOfDate() {
        Alert.alert(
            '当期已经封单，请重新下单', null,
            [{
                text: '确定', onPress: () => {
                    this.getData(this.mobxBetData.data.continueIssueNumber);
                }
            }
            ])
    }

    alertToTopUp() {
        Alert.alert(
            '余额不足,下单失败是否去充值？', null,
            [{
                text: '确定', onPress: () => {
                    dismissKeyboard();
                    NavigatorHelper.pushToPay()
                }
            },
                {
                    text: '取消', onPress: () => {
                    }
                },
            ])
    }


    checkPay() {
        if (this.processing) {
            return
        }
        this.processing = true;

        let downTime = this.refs['AwardCountDownView']._getAwardCountdownTime();
        if (this.mobxBetData.data.listArray.length <= 0 || this.mobxBetData.data.continueIssueNumber == "" || this.mobxBetData.data.continueIssueNumber == '0') {
            this.processing = false;
            this.alertOutOfLimit(7);
            return;
        }

        if (downTime <= 2 || this.mobxBetData.data.listArray[0].issueNum != this.props.cpInfoData.rightData.uniqueIssueNumber) {
            this.processing = false;
            this.alertOutOfDate();
        } else {
            this.payButtonCall();
        }
    }

    payButtonCall() {

        if (this.mobxBetData.data.allAmount >= 1000000) {
            this.processing = false;
            this.alertOutOfLimit(4);
            return;
        }

        if (this.refs.issueTextInput.isFocused()) {
            let number = this.refs.issueTextInput.getNumberText();
            if (number == '' || number === undefined || number === null) {
                this.processing = false;
                this.alertOutOfLimit(8);
                return
            }
            // JXLog("hehehe number "+number+" issue : "+this.mobxBetData.data.continueIssueNumber);
            if (number != this.mobxBetData.data.continueIssueNumber) {
                this.processing = false;
                this.alertOutOfLimit(8);
                return;
            }
        }

        let postJson = {}
        let numberArray = []

        let DPS = this.getSingletonDataSource();
        if (DPS) {
            numberArray = DPS.getAddedBetArr()
        }
        postJson.betEntries = numberArray;

        //彩票信息
        postJson.drawIdentifier = {
            "gameUniqueId": this.props.cpInfoData.rightData.gameUniqueId,
            "issueNum": this.props.cpInfoData.rightData.uniqueIssueNumber
        }


        postJson.numberOfUnits = DPS.getAddedAllUnits();

        if (postJson.numberOfUnits > 1000 || DPS.getAddedBetArr().length > 100) {
            this.processing = false;
            Alert.alert('您要投注的注数过多，\n请分批投注 谢谢！')
            return
        } else if (postJson.numberOfUnits === 0) {
            Toast.showShortCenter('请您先添加注单后再付款谢谢');
            this.processing = false;
            return
        }


        postJson.totalAmount = DPS.getAddedAllAmount();

        if (postJson.numberOfUnits > 100 && postJson.totalAmount / postJson.numberOfUnits < 0.1) {
            this.processing = false;
            Alert.alert('投注单数大于100注时, \n单注的金额不能低于0.1元，\n请修改订单后重试 谢谢！')
            return
        }

        postJson.userSubmitTimestampMillis = Moment().format('X');
        let childOrder = this.mobxBetData.getChildOrder();
        if (childOrder === false) {
            this.processing = false;
            this.alertOutOfLimit(3);
            return;
        }
        postJson.purchaseInfo = {'childOrder': childOrder, "purchaseType": "ICO"};
        postJson.username = this.props.userStore.userName ? this.props.userStore.userName : '';
        this.freshBalance(postJson)
    }


    freshBalance(postJson) {
        this._partModalLoadingSpinnerOverLay.show();
        NetUitls.getUrlAndParamsAndCallback(config.api.userBalance, null, (response) => {
            if (response.rs) {
                let balance = parseFloat(response.content.balance);
                if (postJson.totalAmount > balance) {
                    this._partModalLoadingSpinnerOverLay.hide();
                    this.timer3 && clearTimeout(this.timer3);
                    this.timer3 = setTimeout(() => {
                        this.alertToTopUp();

                    }, 500);
                    this.processing = false;
                } else {
                    this.payRequest(postJson);
                }
            } else {
                this._partModalLoadingSpinnerOverLay.hide();
                let toastString = '投注失败，请检查网络后重试';
                if (response.message) {
                    toastString = response.message;
                }
                this.processing = false;
                this.timer3 && clearTimeout(this.timer3);
                this.timer3 = setTimeout(() => {
                    this._partModalLoadingSpinnerOverLay.hide();
                    Toast.showShortCenter(toastString);
                }, 500)
            }
        })
    }

    payRequest(json) {
        if (_.isEmpty(this.props.userStore.sessionId)) {
            //防止用户出现更新后，但是没有拿取到相应的sessionId值
            this.endingProcessing();
            this._partModalLoadingSpinnerOverLay.hide();
            Toast.showShortCenter("请重新登录");
            return
        }

        if (!checkIfAmountCorrect(json)) {
            this.endingProcessing();
            Toast.showShortCenter("网络不稳定，请重新下注");
            this._modalLoadingSpinnerOverLay.hide();
            return
        }

        this._partModalLoadingSpinnerOverLay.show();
        let jsonData = this.checkAnProcessJson(json);
        if (!jsonData) {
            this._modalLoadingSpinnerOverLay.hide();
            this.endingProcessing();
            Toast.showShortCenter("请重新登录");
            return
        }
        NetUitls.PostUrlAndParamsAndCallback(config.api.encryptOrdercap, jsonData, (data) => {
            this._partModalLoadingSpinnerOverLay.hide();
            if (data && data.rs) {
                this.processing = false;
                RCTDeviceEventEmitter.emit('balanceChange');
                NavigatorHelper.pushToBetSucceed({
                    pagePathName: this.props.pagePathName,
                    cpName: this.props.cpInfoData.rightData.gameNameInChinese,
                    issue: json.drawIdentifier.issueNum,
                    isIntelligence: true,
                    isNeedBack3: true,
                    lastContinueIssueNumber: this.mobxBetData.data.listArray[this.mobxBetData.data.listArray.length - 1].issueNum
                });
                this.clearDPSData();
                this._partModalLoadingSpinnerOverLay.hide();
            } else {
                this.processing = false;
                let toastString = '投注失败，请检查网络后重试'
                if (data.message) {
                    toastString = data.message
                }
                this.timer3 && clearTimeout(this.timer3);
                this.timer3 = setTimeout(() => {
                    this._partModalLoadingSpinnerOverLay.hide();
                    if (toastString.indexOf('期') > 0) {
                        this.processing = false;
                        this.alertOutOfDate();
                    } else {
                        Toast.showShortCenter(toastString);
                    }
                }, 500)
            }
        }, 0, false, true);
    }

    checkAnProcessJson(json) {
        let encryptJson = photoHelper.cropPhoto(this.props.userStore.sessionId, JSON.stringify(json));
        //加密异常
        if (!encryptJson) {
            return false;
        }
        return encryptJson;
    }

    clearDPSData() {
        let DPS = this.getSingletonDataSource();
        if (DPS) {
            DPS.resetAllData();
        }
        RCTDeviceEventEmitter.emit('upDataUI_forBillDataChange')
    }


    getSingletonDataSource() {
        //return MathControllerFactory.getInstance().getMathController(this.props.cpInfoData.rightData.gameUniqueId);
        return {}
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: baseColor.mainBg,
    },
    chaseAndProfitTextStyle: {
        color: betHome.betChoiceBtnTxt,
        fontSize: Size.font15
    },
});
