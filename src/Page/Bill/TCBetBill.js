/**
 * Created by Sam on 2016/11/18.
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Dimensions,
    ListView,
    TouchableOpacity,
    Image,
    Alert,
    ScrollView,
    AppState,
    Platform,
    Keyboard,
    DeviceEventEmitter
} from 'react-native';

//系统 npm类
import LoadingSpinnerOverlay from '../../Common/View/LoadingSpinnerOverlay'
import Toast from '../../Common/JXHelper/JXToast'
import Moment from 'moment';
import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter';
import _ from 'lodash';

//组件内部显示需要引入的类
import TopNavigationBar from '../../Common/View/TCNavigationBar';
import AwardCoundtdownView from './TCBetBillAwardCountdown';
import BillViewButton from './TCBillViewButton';
import TCBetBillListItemView from './TCBetBillListItemView';
import TCBetBillListStyleEdit from './TCBetBillListItemStyleEdit';

import TCBillMultipleBar from './TCBillMultipleBar';
import TCBillKeyboard from './TCBillKeyboard';
import TCBetBillBottomView from './TCBetBillBottomView';
import {config} from '../../Common/Network/TCRequestConfig';
import NetUitls from '../../Common/Network/TCRequestUitls';
import {betHome, indexBgColor, Size} from '../resouce/theme';
import {betIcon} from '../resouce/images';
import JXHelpers from '../../Common/JXHelper/JXHelper';

// 外部关系组件 如 页面跳转用

import Helper from '../../Common/JXHelper/TCNavigatorHelper';
import IntelligenceBet from './IntelligenceBet/TCIntelligence_bet';

import TCBillSucceedPage from './TCBillSucceedPage';

const {width, height} = Dimensions.get('window');
import TCKeyboardView from '../../Common/View/TCKeyboardView';
import {observer, inject} from 'mobx-react/native';

import {MathControllerFactory} from 'lottery-core';
import NumberOnlyInputText from '../../Common/View/NumberOnlyInputText';
import TCIntelligenceBetData from './IntelligenceBet/TCIntelligenceBetData';
import {BottomStopBetView} from './IntelligenceBet/BottomStopBetView';
import dismissKeyboard from 'dismissKeyboard';
import PhotoHelper from '../../Common/JXHelper/PhotoHelper';
import LineDivider from '../../Common/View/LineDivider';
import {checkIfAmountCorrect} from './TCBillCheckHelper';
import JXUPLogs from '../../Common/JXHelper/JXNetWorkUpLog'

let UPLogs = new JXUPLogs()
let photoHelper = new PhotoHelper();
import {withMappedNavigationProps} from 'react-navigation-props-mapper'
import userStore from "../../Data/store/UserStore";

@withMappedNavigationProps()
@inject("userStore")
@observer
export default class TCBetBill extends React.Component {
    constructor(state) {
        super(state);
        this.state = {
            numbersArray: [],
            keyboardSpace: 0
        };
        this.processing = false;
        this.keyboardDismissMode = false;
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
        this.checkAndInitIntelligence();
        this.checkWhenKeyboardUp = this.checkWhenKeyboardUp.bind(this);
    }

    checkAndInitIntelligence() {
        let DPS = this.getSingletonDataSource();
        let odds = DPS.getSameOdds();
        this.isIntelligence = true;
        if (odds == -3) {
            this.isIntelligence = false; //是否显示智能追号
        }
        if (
            this.props.gameName === 'MarkSix' ||
            this.props.cpInfoData.rightData.gameUniqueId === 'X3D' ||
            this.props.cpInfoData.rightData.gameUniqueId === 'PL3' ||
            this.props.cpInfoData.rightData.gameUniqueId === 'QXC' ||
            DPS.isDsTz()
        ) {
            this.isIntelligence = false;
        }
        //chaseNumber 开关
        if (JXHelpers.getChaseNumberOn()) {
            this.isChaseNumberOn = true; //显示普通追号功能和判断是否关闭所有智能、普通追号功能
        } else {
            this.isChaseNumberOn = false;
            this.isIntelligence = false;
        }

        if (this.mobxIntelligenceData) {
            this.mobxIntelligenceData.setAllUnitsOnBet(DPS.getAddedAllUnits(), DPS.getAddedAllAmount());
        } else {
            this.mobxIntelligenceData = TCIntelligenceBetData.getInstance();
            if (!this.mobxIntelligenceData) {
                this.mobxIntelligenceData = new TCIntelligenceBetData(
                    0,
                    DPS.getAddedAllAmount().toString(),
                    DPS.getAddedAllUnits().toString()
                );
            }
        }
    }

    static defaultProps = {
        title: '',
        gameName: '',
        cpInfoData: null
    };

    componentDidMount() {
        this.upDataUI();
        let keyBoardShow = Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
        let keyBoardHide = Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';

        this.timer2 = setTimeout(() => {
            this.refs['contentScrollView'].scrollTo({x: 0, y: 1, animated: true});
        }, 500);
        this.listener = Keyboard.addListener(keyBoardShow, frames => {
            if (!frames.endCoordinates) return;
            this.checkWhenKeyboardUp();
            this.setState({keyboardSpace: frames.endCoordinates.height});
        });
        this.listener1 = Keyboard.addListener(keyBoardHide, frames => {
            this.mobxIntelligenceData.setBetMulAndIssueNumberFalse();
            this.setState({keyboardSpace: 0});
        });
        AppState.addEventListener('change', this.handleAppStateChange);
    }

    /**
     * 智能追号
     */
    checkWhenKeyboardUp() {
        if (this.refs.issueNumberTextInput.isFocused()) {
            this.mobxIntelligenceData.isIssueNumberOnBet = true;
        }
        if (this.refs.multiplierTextInput.isFocused()) {
            this.mobxIntelligenceData.isMultiplierOnBet = true;
        }
    }

    componentWillUnmount() {
        this.refs['contentScrollView'].scrollTo({x: 0, y: 0, animated: false});
        this.timer && clearTimeout(this.timer);
        this.timer2 && clearTimeout(this.timer2);
        this.listener && this.listener.remove();
        this.listener1 && this.listener1.remove();
    }

    render() {
        let h = (this.props.cpInfoData.rightData.gameUniqueId.indexOf('28') >= 0) ? 40 : 0

        return (
            <View style={[styles.container, {flex: 1}]}>
                <TopNavigationBar
                    title={this.props.title}
                    needBackButton={true}
                    backButtonCall={() => {
                        this.goBack();
                    }}
                    rightTitle={this.isIntelligence ? '清空列表' : null}
                    rightButtonCall={() => this.clearButtonCall()}
                />
                <TCBillKeyboard ref="betBillKeyboard" multipleEventCall={e => this._resetMultipleWith(e)}/>
                <TCKeyboardView
                    ref="tcKeyboardView"
                    setInputValue={number => {
                        this.setTextInputValue(number);
                    }}
                    closeEvent={() => this.closeKeyBoard()}
                />
                <AwardCoundtdownView
                    ref="AwardCountDownView"
                    data={this.props.cpInfoData}
                    timeOutCallBack={() => {
                        this.getPlanNoDetailRequest(true);
                    }}
                />
                <View style={styles.upButtonViewStyle}>
                    <BillViewButton
                        title="自选号码"
                        icon="bottom_home1"
                        buttonCallBack={() => this.addNumbersButtonCall()}
                    />
                    <BillViewButton
                        title="机选一注"
                        num="1"
                        icon="bottom_home5"
                        buttonCallBack={num => this.addRandomNumbersButtonCall(num)}
                    />
                    <BillViewButton
                        title="机选五注"
                        num="5"
                        icon="bottom_home5"
                        buttonCallBack={num => this.addRandomNumbersButtonCall(num)}
                    />
                </View>

                {this.getUnifyPrice()}

                <Image
                    key={725389}
                    source={betIcon.orderTop}
                    style={{width: width - 20, marginLeft: 10, marginRight: 10, height: 6}}
                    resizeMode="stretch"
                />
                <ScrollView
                    ref="contentScrollView"
                    style={{flex: 1}}
                    scrollRenderAheadDistance={20}
                    keyboardShouldPersistTaps={Platform.OS !== 'ios' ? 'handled' : 'never'}
                    keyboardDismissMode={'on-drag'}
                    removeClippedSubviews={true}
                >
                    {this.renderRow()}
                </ScrollView>

                {this.getIntelligenceBottomView()}
                <TCBetBillBottomView
                    ref="TCBetBillBottomView"
                    rightButtonTitle={this.isIntelligence ? '智能选号' : '清除列表'}
                    leftButtonCallEvent={
                        this.isIntelligence ? () => this.goToIntelligenceBet() : () => this.clearButtonCall()
                    }
                    rightButtonCallEvent={() => this.payCheck()}
                    isIntelligenceBet={this.isChaseNumberOn ? 2 : 0}
                    allAmountOnBet={this.isChaseNumberOn ? this.mobxIntelligenceData.allAmountOnBet : 0}
                    allUnitsOnBet={this.isChaseNumberOn ? this.mobxIntelligenceData.allUnitsOnBet : 0}
                />
                {this.getKeyboardSpaceView()}

                <LoadingSpinnerOverlay ref={component => (this._modalLoadingSpinnerOverLay = component)}/>
            </View>
        );
    }

    getKeyboardSpaceView() {
        if (this.isIntelligence && Platform.OS === 'ios') {
            return <View style={{height: this.state.keyboardSpace === 0 ? 0 : this.state.keyboardSpace}}/>;
        }
    }

    getIntelligenceBottomView() {
        let playTypeName = this.getSingletonDataSource().getPlayTypeName();
        if (
            this.isChaseNumberOn &&
            this.props.gameName != 'MarkSix' &&
            this.props.cpInfoData.rightData.gameUniqueId !== 'X3D' &&
            this.props.cpInfoData.rightData.gameUniqueId !== 'PL3' &&
            this.props.cpInfoData.rightData.gameUniqueId !== 'QXC' &&
            playTypeName.indexOf('单式') === -1
        ) {
            return (
                <View style={{backgroundColor: '#ffffff'}}>
                    <LineDivider/>
                    <View style={{height: 40, flexDirection: 'row'}}>
                        <View style={styles.chaseTopCenterStyle}>
                            <Text style={styles.chaseTopTextStyle}>连续买</Text>
                            <NumberOnlyInputText
                                ref="issueNumberTextInput"
                                textWidth={52}
                                maxLength={2}
                                isFlex={false}
                                textHeight={24}
                                textOfPlaceHolder={'1'}
                                defaultValue={this.mobxIntelligenceData.continueIssueNumberOnBet}
                                onFocusFunc={() => {
                                    this.mobxIntelligenceData.setIsContinueIssueNumberTrue();
                                }}
                                onBlurFunc={() => {
                                    this.onBlurFuncListener(false);
                                }}
                                textChangedFunc={number => {
                                    this.onTextChangedListener(number, false);
                                }}
                            />
                            <Text style={styles.chaseTopTextStyle}>期</Text>
                        </View>
                        <LineDivider mode="vertical" lineHeight={40}/>
                        <View style={styles.chaseTopCenterStyle}>
                            <Text style={styles.chaseTopTextStyle}>投</Text>
                            <NumberOnlyInputText
                                ref="multiplierTextInput"
                                textWidth={52}
                                maxLength={3}
                                isFlex={false}
                                textHeight={24}
                                textOfPlaceHolder={'1'}
                                defaultValue={this.mobxIntelligenceData.multiplierOnBet}
                                onFocusFunc={() => {
                                    this.mobxIntelligenceData.setIsMultiplierTrue();
                                }}
                                onBlurFunc={() => {
                                    this.onBlurFuncListener(true);
                                }}
                                textChangedFunc={number => {
                                    this.onTextChangedListener(number, true);
                                }}
                            />
                            <Text style={styles.chaseTopTextStyle}>倍</Text>
                        </View>
                    </View>

                    {this.getStopBetView()}

                    <LineDivider/>

                    {this.getMulOrIssueNumberBarView()}
                    <LineDivider/>
                </View>
            );
        }
    }

    getMulOrIssueNumberBarView() {
        if (this.state.keyboardSpace > 0) {
            return (
                <MultiplierOrIssueNumBarView
                    isMultiplier={this.mobxIntelligenceData.isMultiplierOnBet}
                    onBtnPressFunc={selectedKey => {
                        this.onBtnPressFunc(selectedKey);
                    }}
                    selectedIndex={
                        this.mobxIntelligenceData.isMultiplierOnBet
                            ? this.mobxIntelligenceData.multiplierOnBet
                            : this.mobxIntelligenceData.continueIssueNumberOnBet
                    }
                />
            );
        }
    }

    onBtnPressFunc(selectedKey) {
        if (this.mobxIntelligenceData.isMultiplierOnBet) {
            this.refs.multiplierTextInput.setDisplayValue(selectedKey);
        }
        if (this.mobxIntelligenceData.isIssueNumberOnBet) {
            this.refs.issueNumberTextInput.setDisplayValue(selectedKey);
        }
        this.mobxIntelligenceData.setSelectedIndex(selectedKey.toString());
    }

    /**
     *  普通追号输入框 文字变化 监听函数
     * @param number
     * @param isMultiplier
     */
    onTextChangedListener(number, isMultiplier) {
        if (isMultiplier) {
            if (number === '') {
                this.mobxIntelligenceData.setMultiplierOnBet('1');
                return;
            }
            this.mobxIntelligenceData.setMultiplierOnBet(number);
        } else {
            if (number === '') {
                this.mobxIntelligenceData.setContinueIssueNumber('1');
                return;
            }
            this.mobxIntelligenceData.setContinueIssueNumber(number);
        }
    }

    /**
     * 普通追号输入框 焦点失去后的监听函数
     * @param isMultiplier
     */
    onBlurFuncListener(isMultiplier) {
        if (isMultiplier) {
            this.mobxIntelligenceData.isMultiplierOnBet = false;
            if (this.refs.multiplierTextInput.getNumberText() === '') {
                this.refs.multiplierTextInput.setDisplayValue(this.mobxIntelligenceData.multiplierOnBet);
            }
        } else {
            this.mobxIntelligenceData.isIssueNumberOnBet = false;
            if (this.refs.issueNumberTextInput.getNumberText() === '') {
                this.refs.issueNumberTextInput.setDisplayValue(this.mobxIntelligenceData.continueIssueNumberOnBet);
            }
        }
    }

    getStopBetView() {
        if (this.state.keyboardSpace > 0) {
            return (
                <BottomStopBetView
                    pressFunc={isStop => {
                        this.mobxIntelligenceData.setWinAndThenStop(isStop);
                    }}
                    isStop={this.mobxIntelligenceData.data.winAndThenStop}
                />
            );
        }
    }

    getUnifyPrice() {
        if (this.props.gameName == 'MarkSix' || this.props.gameName == 'PCDD') {
            return (
                <View
                    style={{
                        alignItems: 'center',
                        flexDirection: 'row',
                        marginTop: 0,
                        justifyContent: 'flex-end',
                        marginBottom: 10
                    }}
                >
                    <Text style={{color: betHome.betTitle, fontSize: Size.font14}}>统一金额</Text>
                    <TouchableOpacity onPress={() => this.showKeyBoard()}>
                        <View
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: 120,
                                height: 30,
                                marginRight: 5
                            }}
                        >
                            <View
                                style={{
                                    borderColor: betHome.betChoiceBtnBorder,
                                    backgroundColor: 'white',
                                    borderWidth: 1,
                                    width: 100,
                                    height: 30,
                                    marginRight: 5
                                }}
                            >
                                {this.getInputLabel()}
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
            );
        }
    }

    renderRow(rowData, sectionID, rowID) {
        let itemArr = [];
        let numbersArray = this.getAllNumbersArray();
        if (this.props.gameName === 'MarkSix' || this.props.gameName === 'PCDD') {
            for (let i = 0; i < numbersArray.length; i++) {
                let index = numbersArray.length - 1 - i;
                if (numbersArray[index].length < 1) return;
                let json = numbersArray[index];
                itemArr.push(
                    <TCBetBillListStyleEdit
                        key={i}
                        index={index}
                        jsonData={json}
                        dataSource={this.getSingletonDataSource()}
                        callBackEvent={() => this.upDataUI()}
                        deleteButtonEvent={e => this.deleteOneItem(e)}
                        style={{overflow: 'hidden'}}
                    />
                );
            }
        } else {//使用ListView显示订单列表防止卡顿
            if (numbersArray.length > 0) {
                itemArr.push(
                    <ListView
                        dataSource={this.ds.cloneWithRows(numbersArray)}
                        key={1001}
                        enableEmptySections={true}
                        renderRow={(rowData, sectionID, rowID) => {
                            return (
                                <TCBetBillListItemView
                                    index={rowID}
                                    jsonData={rowData}
                                    deleteButtonEvent={e => this.deleteOneItem(e)}
                                    style={{overflow: 'hidden'}}
                                    removeClippedSubviews={false}
                                    enableEmptySections={true}
                                />)
                        }}
                        initialListSize={50}
                    />);
            }
        }

        if (itemArr.length > 0) {
            itemArr.push(
                <Image
                    key={725388}
                    source={betIcon.orderBottom}
                    style={{
                        width: width - 40,
                        marginLeft: 20,
                        marginRight: 20,
                        height: 9,
                        marginTop: -1,
                        overflow: 'hidden'
                    }}
                    resizeMode="contain"
                />
            );
        } else {
            itemArr.push(
                <Text
                    key={21321}
                    style={{
                        marginLeft: 20,
                        marginRight: 20,
                        marginTop: 100,
                        textAlign: 'center',
                        color: betHome.betTipContent,
                        overflow: 'hidden'
                    }}
                >
                    {' 您没有任何投注 \n 点击 +自选号码 可以返回加注哦'}
                </Text>
            );
        }

        return itemArr;
    }

    getInputLabel() {
        return (
            <Text
                style={{
                    marginLeft: 10,
                    marginTop: 5,
                    width: 80,
                    fontSize: Size.font16,
                    color: betHome.betBillMoney
                }}
            >
                {this.state.money}
            </Text>
        );
    }

    setTextInputValue(number) {
        let currentStr = this.state.money;
        if (number == '确认') {
            this.onEndEditing(currentStr);
        } else if (number == '删除') {
            currentStr = currentStr.substring(0, currentStr.length - 1);
        } else {
            currentStr = currentStr + '' + number;
        }

        if (currentStr.length > 8) return;

        this.setState({
            money: currentStr
        });
    }

    onEndEditing(e) {
        this.keyboardDismissMode = false;
        let jsonData = _.cloneDeep(this.props.jsonData);
        let price = e;
        if (price.length == 0 || parseFloat(price) == 0) {
            return;
        } else {
            price = parseFloat(e).toFixed(2);
        }
        this.getSingletonDataSource().resetAddedBetArrPrice(price);
        this.upDataUI();
    }

    showKeyBoard() {
        var popView = this.refs['tcKeyboardView'];
        if (popView.modalVisible) {
            popView._setModalVisible(false);
            this.keyboardDismissMode = false;
        } else {
            if (this.refs['TextInput']) {
                this.refs['TextInput'].clear();
            }
            this.setState({
                money: ''
            });
            this.keyboardDismissMode = true;
            popView._setModalVisible(true);
        }
    }

    closeKeyBoard() {
        this.keyboardDismissMode = false;
        this.setState({
            money: ''
        });
    }

    handleAppStateChange(nextAppState) {
        if (nextAppState === 'active') {
            RCTDeviceEventEmitter.emit('goActiveRefreshBill');
        }
    }

    upDataUI() {
        this.checkAndInitIntelligence();
        this.setState({
            numbersArray: this.getAllNumbersArray()
        });

        let DPS = this.getSingletonDataSource();
        if (DPS) {
            {
                /* 倍投 */
            }
            if (this.isIntelligence) {
                this.mobxIntelligenceData.setAllUnitsOnBet(DPS.getAddedAllUnits(), DPS.getAddedAllAmount());
            } else {
                this.refs.TCBetBillBottomView._resetWithNumbers(
                    DPS.getMultiplier(),
                    DPS.getAddedAllUnits(),
                    DPS.getAddedAllAmount()
                );
            }
        }
        RCTDeviceEventEmitter.emit('upDataUI_forBillDataChange');
    }

    deleteOneItem(index) {
        let DPS = this.getSingletonDataSource();
        if (DPS) {
            DPS.removeAddedBetByIndex(index);
        }
        this.upDataUI();
    }

    addNumbersButtonCall() {
        Helper.popToBack()
    }

    addRandomNumbersButtonCall(num) {
        let le = this.getAllNumbersArray().length;
        if (le >= 1000 || le + parseInt(num) > 1000) {//原来限制为100，现因单式投注增加到1000
            Alert.alert('您要投注的注数过多，\n请分批投注 谢谢！');
            return;
        }
        let DPS = this.getSingletonDataSource();
        if (DPS) {
            DPS.randomSelect(num);
        }
        this.upDataUI();
    }

    // --------支付---------
    payCheck() {
        Keyboard.dismiss();
        if (this.processing) {
            return;
        }
        this.processing = true;
        let downTime = this.refs['AwardCountDownView']._getAwardCountdownTime();
        if (downTime <= 2) {
            this.payAlert();
        } else {
            this.payButtonCall();
        }
    }

    payAlert() {
        this.endingProcessing();
        let nextUniqueIssueNumber = this.props.cpInfoData.rightData.nextUniqueIssueNumber
        Alert.alert('当期已经封单，\n是否投注到下一期？', null, [
            {
                text: '投注',
                onPress: () => {
                    this.payButtonCall(nextUniqueIssueNumber);
                }
            },
            {
                text: '取消',
                onPress: () => {
                }
            }
        ]);
    }

    payButtonCall(nextUniqueIssueNumber) {
        let postJson = {};
        let numberArray = [];

        let DPS = this.getSingletonDataSource();
        if (DPS) {
            numberArray = DPS.getAddedBetArr();
        }
        postJson.betEntries = numberArray;

        //彩票信息
        postJson.drawIdentifier = {
            gameUniqueId: this.props.cpInfoData.rightData.gameUniqueId,
            issueNum: nextUniqueIssueNumber ? nextUniqueIssueNumber : this.props.cpInfoData.rightData.uniqueIssueNumber
            // "issueNum": addToNextPlaNo ? (this.props.cpInfoData.current.nextUniqueIssueNumber) : this.props.cpInfoData.rightData.uniqueIssueNumber
        };

        postJson.numberOfUnits = DPS.getAddedAllUnits();
        if (postJson.numberOfUnits > 1000 || DPS.getAddedBetArr().length > 1000) {////原来限制为100，现因单式投注增加到1000
            this.endingProcessing();
            Alert.alert('您要投注的注数过多，\n请分批投注 谢谢！');
            return;
        } else if (postJson.numberOfUnits == 0) {
            Toast.showShortCenter('请您先添加注单后再付款谢谢');
            this.endingProcessing();
            return;
        }

        postJson.totalAmount = DPS.getAddedAllAmount();

        // if (postJson.numberOfUnits > 100 && postJson.totalAmount / postJson.numberOfUnits < 0.1) {
        //     this.endingProcessing();
        //     Alert.alert('投注单数大于100注时, \n单注的金额不能低于0.1元，\n请修改订单后重试 谢谢！');
        //     return;
        // }

        postJson.userSubmitTimestampMillis = Moment().format('X');
        postJson.username = this.props.userStore.userName ? this.props.userStore.userName : '';
        if (
            this.mobxIntelligenceData.continueIssueNumberOnBet != '1' ||
            this.mobxIntelligenceData.multiplierOnBet != '1'
        ) {
            this.scoGetAvailableArray(postJson);
        } else {
            postJson.purchaseInfo = {purchaseType: 'ONCE_ONLY'};
            this.freshBalance(postJson);
        }
    }

    payRequest(json) {
        // dismissKeyboard()
        if (_.isEmpty(this.props.userStore.sessionId)) {
            //防止用户出现更新后，但是没有拿取到相应的sessionId值
            this.endingProcessing();
            this._modalLoadingSpinnerOverLay.hide();
            Toast.showShortCenter('请重新登录');
            return;
        }

        if (!checkIfAmountCorrect(json)) {
            this.endingProcessing();
            Toast.showShortCenter('网络不稳定，请重新下注');
            this._modalLoadingSpinnerOverLay.hide();
            return;
        }

        this._modalLoadingSpinnerOverLay.show();

        let jsonData = this.checkAnProcessJson(json);
        if (!jsonData) {
            this._modalLoadingSpinnerOverLay.hide();
            this.endingProcessing();
            Toast.showShortCenter('请重新登录');
            return;
        }
        NetUitls.PostUrlAndParamsAndCallback(
            config.api.encryptOrdercap,
            jsonData,
            data => {
                this._modalLoadingSpinnerOverLay.hide();
                UPLogs.addRequestLog(config.api.encryptOrdercap, data.duration)
                if (data && data.rs) {
                    this.endingProcessing();
                    RCTDeviceEventEmitter.emit('balanceChange');

                    Helper.pushToBetSucceed({
                        pagePathName: this.props.pagePathName,
                        cpName: this.props.cpInfoData.rightData.gameNameInChinese,
                        issue: json.drawIdentifier.issueNum,
                        isIntelligence: json.purchaseInfo.purchaseType !== 'ONCE_ONLY'
                            ? json.purchaseInfo.childOrder.eachChildOrders.length > 1
                            : false,
                        lastContinueIssueNumber: json.purchaseInfo.purchaseType !== 'ONCE_ONLY'
                            ? json.purchaseInfo.childOrder.eachChildOrders[
                            parseInt(this.mobxIntelligenceData.continueIssueNumberOnBet) - 1
                                ].issueNum
                            : 0
                    })
                    this.clearData();
                } else {
                    this.endingProcessing();
                    let toastString = '投注失败，请检查网络后重试';
                    if (data.message) {
                        toastString = data.message;
                    }
                    this.timer = setTimeout(() => {
                        Toast.showShortCenter(toastString);
                    }, 500);
                }
            },
            0,
            false,
            true
        );
    }

    checkAnProcessJson(json) {
        let encryptJson = photoHelper.cropPhoto(this.props.userStore.sessionId, JSON.stringify(json));
        if (!encryptJson) {
            return false;
        }
        return encryptJson;
    }

    scoGetAvailableArray(postJson) {
        let limitIssueNumber = this.mobxIntelligenceData.continueIssueNumberOnBet;
        let params = {
            currentIssueNumber: this.props.cpInfoData.rightData.uniqueIssueNumber,
            limit: parseInt(limitIssueNumber) + 5
        };
        //一期就不需要去获取数据
        if (this.mobxIntelligenceData.continueIssueNumberOnBet == 1) {
            let childOrder = this.mobxIntelligenceData.getBetChildOrder(
                this.props.cpInfoData.rightData.uniqueIssueNumber,
                [{uniqueIssueNumber: this.props.cpInfoData.rightData.uniqueIssueNumber}]
            );
            if (childOrder === false) {
                this.processing = false;
                this._modalLoadingSpinnerOverLay.hide();
                Toast.showShortCenter('订单异常，请重新尝试!');
                return;
            }
            postJson.purchaseInfo = {childOrder: childOrder, purchaseType: 'SCO'};
            this.freshBalance(postJson);
        } else {
            NetUitls.getUrlAndParamsAndCallback(
                config.api.nextAvailableIssueNumber + this.props.cpInfoData.rightData.gameUniqueId,
                params,
                response => {
                    if (response.rs) {
                        let availableArray = response.content;
                        //超期提示
                        if (availableArray.length < parseInt(this.mobxIntelligenceData.continueIssueNumberOnBet)) {
                            this._modalLoadingSpinnerOverLay.hide();
                            this.mobxIntelligenceData.setContinueIssueNumber(availableArray.length.toString());
                            this.processing = false;
                            Toast.showShortCenter('当前最大可追期数为' + availableArray.length + '期');
                            this.refs.issueNumberTextInput.setDisplayValue(availableArray.length);
                        } else {
                            let childOrder = this.mobxIntelligenceData.getBetChildOrder(
                                this.mobxIntelligenceData.continueIssueNumberOnBet,
                                availableArray
                            );
                            if (childOrder === false) {
                                this.processing = false;
                                this._modalLoadingSpinnerOverLay.hide();
                                Toast.showShortCenter('订单异常，请重新尝试!');
                                return;
                            }
                            postJson.purchaseInfo = {childOrder: childOrder, purchaseType: 'SCO'};
                            this.freshBalance(postJson);
                        }
                    } else {
                        let toastString = '投注失败，请检查网络后重试';
                        if (response.message) {
                            toastString = response.message;
                        }
                        this.processing = false;
                        this._modalLoadingSpinnerOverLay.hide();
                        Toast.showShortCenter(toastString);
                    }
                },
                0,
                true
            );
        }
    }

    endingProcessing() {
        this.processing = false;
    }

    freshBalance(postJson) {
        this._modalLoadingSpinnerOverLay.show();
        NetUitls.getUrlAndParamsAndCallback(config.api.userBalance, null, response => {
            if (response.rs) {
                let balance = parseFloat(response.content.balance);
                if (postJson.totalAmount > balance) {
                    this._modalLoadingSpinnerOverLay.hide();
                    this.timer = setTimeout(() => {
                        this.alertToTopUp();
                    }, 500);
                    this.endingProcessing();
                    return;
                } else {
                    this.payRequest(postJson);
                }
            } else {
                this._modalLoadingSpinnerOverLay.hide();
                let toastString = '投注失败，请检查网络后重试';
                if (response.message) {
                    toastString = response.message;
                }
                this.endingProcessing();
                this.timer = setTimeout(() => {
                    Toast.showShortCenter(toastString);
                }, 500);
            }
        });
    }

    alertToTopUp() {
        Alert.alert('余额不足,下单失败是否去充值？', null, [
            {
                text: '确定',
                onPress: () => {
                    Helper.pushToPay();
                }
            },
            {
                text: '取消',
                onPress: () => {
                }
            }
        ]);
    }

    clearButtonCall() {
        this.refs['contentScrollView'].scrollTo({x: 0, y: 0, animated: true});
        this.clearData();
        this.upDataUI();
    }

    clearData() {
        let DPS = this.getSingletonDataSource();
        if (DPS) {
            DPS.resetAllData();
        }
        RCTDeviceEventEmitter.emit('upDataUI_forBillDataChange');
    }

    getAllNumbersArray() {
        let DPS = this.getSingletonDataSource();
        if (DPS) {
            return DPS.getAddedBetArr();
        }
        return [];
    }

    getSingletonDataSource() {
        return MathControllerFactory.getInstance().getMathController(this.props.gameUniqueId);
    }

    _resetMultipleWith(multiple) {
        let DPS = this.getSingletonDataSource();
        if (DPS) {
            DPS.setMultiplier(multiple);
        }
        this.refs.billMultipleBar._resetTextWith(multiple);
        this.upDataUI();
    }

    goToIntelligenceBet() {
        let DPS = this.getSingletonDataSource();
        if (DPS.getAddedBetArr().length === 0) {
            Toast.showShortCenter('请您先添加注单后再付款谢谢');
            return;
        }
        if (!this.intelligenceBetCheck()) {
            Alert.alert(
                '温馨提示',
                '您的当前订单暂无法进行智能追号，可能存在以下情况:\n1、包含多种玩法 \n2、每注单价或者赔率不相同 \n3、当前玩法不支持智能追号',
                [{text: '确定'}]
            );
            return;
        }
        if (DPS.getMinWinUnits() === -1) {
            Alert.alert('温馨提示', '当前方案全程最低盈利率小于等于零', [{text: '确定'}]);
            return;
        }
        if (DPS.getMinWinUnits() === -2) {
            Alert.alert('温馨提示', '当前玩法暂时只支持一单', [{text: '确定'}]);
            return;
        }
        dismissKeyboard();
        if (this.mobxIntelligenceData) {
            this.mobxIntelligenceData.setDataOddsAndSinglePrice(DPS.getSameOdds(), DPS.getAddedAllAmount());
            let minWinUnits = Math.min(DPS.getMinWinUnits(), DPS.getAddedAllUnits());
            let maxWinUnits = Math.max(DPS.getMaxWinUnits());
            let pricePerUnit = DPS.getAddedBetArr()[0].pricePerUnit;
            this.mobxIntelligenceData.setMinMaxWinUnitsAndPricePerUnit(minWinUnits, pricePerUnit, maxWinUnits);
            if (this.mobxIntelligenceData.data.continueIssueNumber == 0) {
                this.mobxIntelligenceData.data.continueIssueNumber = '10'; //如果上一次结果为0 则恢复默认追号10期
            }
        }

        Helper.pushToIntelligenceBet({
            pagePathName: this.props.pagePathName,
            cpInfoData: this.props.cpInfoData,
            singlePrice: DPS.getAddedAllAmount(),
            odds: DPS.getSameOdds(),
            gameUniqueId: this.props.gameUniqueId,
            mobxIntelligenceData: this.mobxIntelligenceData
        })
    }

    intelligenceBetCheck() {

        let DPS = this.getSingletonDataSource();

        let gameplayMethod = null;
        let arr = DPS.getAddedBetArr();
        let perPrice = 0;
        if (arr.length > 0) {
            perPrice = arr[0].pricePerUnit;
        } else {
            return false;
        }

        for (let i = 0; i < arr.length; i++) {
            let json = arr[i];
            if (gameplayMethod && gameplayMethod !== json.gameplayMethod) {
                return false;
            }

            if (perPrice != json.pricePerUnit) {
                //每注单价不相等 也不给显示
                return false;
            }
            gameplayMethod = json.gameplayMethod;
        }
        DPS.reAdjustForIntelligence();
        let odds = DPS.getSameOdds();
        if (odds == 0 || odds === undefined || odds == -3) {
            return false;
        }
        if (DPS.calMinWinUnits() === 0) {
            return false;
        }
        DPS.calMaxWinUnits();

        return true;
    }

    goBack() {
        Helper.popToBack()
        return;
    }
}

class RedCheckButtonView extends Component {
    constructor() {
        super();
    }

    static defaultProps = {
        indexKey: 10,
        selectedIndex: 1,
        text: '',
        onBtnPressFunc: null
    };

    render() {
        return (
            <TouchableOpacity style={{flex: 1}} onPress={this.onBtnPress.bind(this)}>
                <View style={{alignItems: 'center', justifyContent: 'center', height: 40}}>
                    <Text
                        style={{
                            color: this.props.indexKey != this.props.selectedIndex ? '#333333' : '#FF0000',
                            fontSize: Size.font13
                        }}
                    >
                        {this.props.text}
                    </Text>
                </View>

                {this.getRedCheckView()}
            </TouchableOpacity>
        );
    }

    onBtnPress() {
        this.props.onBtnPressFunc && this.props.onBtnPressFunc(this.props.indexKey);
    }

    getRedCheckView() {
        if (this.props.indexKey == this.props.selectedIndex) {
            return (
                <Image
                    style={{width: 20, height: 20, marginTop: -20, marginLeft: width / 3 - 20}}
                    resizeMode={'contain'}
                    source={betIcon.redCheck}
                />
            );
        }
    }
}

class MultiplierOrIssueNumBarView extends Component {
    constructor() {
        super();
    }

    static defaultProps = {
        isMultiplier: false,
        multiplierArray: ['投10倍', '投20倍', '投50倍'],
        issueNumArray: ['追10期', '追20期', '追50期'],
        selectedIndex: 1,
        onBtnPressFunc: null
    };

    render() {
        return (
            <View
                style={{
                    width: width,
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'row',
                    height: 40
                }}
            >
                <RedCheckButtonView
                    indexKey={10}
                    selectedIndex={this.props.selectedIndex}
                    onBtnPressFunc={this.props.onBtnPressFunc}
                    text={this.props.isMultiplier ? this.props.multiplierArray[0] : this.props.issueNumArray[0]}
                />
                <LineDivider mode="vertical" lineHeight={40}/>
                <RedCheckButtonView
                    indexKey={20}
                    selectedIndex={this.props.selectedIndex}
                    onBtnPressFunc={this.props.onBtnPressFunc}
                    text={this.props.isMultiplier ? this.props.multiplierArray[1] : this.props.issueNumArray[1]}
                />
                <LineDivider mode="vertical" lineHeight={40}/>
                <RedCheckButtonView
                    indexKey={50}
                    selectedIndex={this.props.selectedIndex}
                    onBtnPressFunc={this.props.onBtnPressFunc}
                    text={this.props.isMultiplier ? this.props.multiplierArray[2] : this.props.issueNumArray[2]}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: indexBgColor.mainBg
    },
    upButtonViewStyle: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 10,
        backgroundColor: indexBgColor.mainBg
    },
    chaseTopTextStyle: {
        color: '#333333',
        fontSize: Size.font13
    },
    chaseTopCenterStyle: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    }
});
