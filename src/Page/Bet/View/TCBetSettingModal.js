/**
 * Created by Sam on 2016/12/17.
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableHighlight,
    Dimensions,
    Platform,
    TouchableOpacity
} from 'react-native';

// （原赔率 - x% * 原赔率）
var Modal = require('react-native-modalbox');
var Slider = require('../../../Common/View/react-native-slider/Slider');
var JXHelper = require('../../../Common/JXHelper/JXHelper');
import {Size, width, height} from '../../resouce/theme';
import {observer} from 'mobx-react/native';
import {observable, action} from 'mobx';
import dismissKeyboard from 'dismissKeyboard';

@observer
export default class MyComponent extends React.Component {
    constructor(state) {
        super(state);
        this.isFirst = true; //记录是开了了Modal，用于第一次显示为空值
        this.d = new BetData();
    }

    static defaultProps = {
        settingEndingEvent: null,
        needSetOdds: true
    };

    pricesArray = [10, 100, 1000, 5000, 10000, 50000]; //快捷prices Array

    render() {
        return (
            <Modal
                isOpen={this.d.modalVisible}
                style={{width: width - 60, height: 410, borderRadius: 8, backgroundColor: 'transparent'}}
                position="center"
                animationDuration={500}
                backdropPressToClose={false}
                animationType={'fade'}
                transparent={true}
                onRequestClose={() => {}}
            >
                {this.getRenderView()}
            </Modal>
        );
    }

    getRenderView() {
        return (
            <TouchableHighlight
                onPress={() => { dismissKeyboard() }}
                style={{width: width, height: height}}
                activeOpacity={1}
                underlayColor="transparent"
            >
                <View style={styles.container}>
                    <Text style={styles.titleStyle}>注单设定</Text>
                    <View style={styles.plTextStyle}>
                        <Text style={{marginLeft: 15, marginTop: 5, fontSize: Size.font13, color: '#999999'}}>
                            最高赔率:{(this.d.odds - this.d.rebate / 100 * this.d.odds).toFixed(2)}
                        </Text>
                        <Text style={{marginRight: 15, marginTop: 5, fontSize: Size.font13, color: '#999999'}}>
                            返利:{this.d.rebate.toFixed(1)}%
                        </Text>
                    </View>
                    <Slider
                        value={0}
                        onValueChange={e => this.d.resetRebate(e)}
                        minimumValue={0}
                        maximumValue={this.d.maxRebate}
                        step={0.01}
                        maximumTrackTintColor="#eeeeee"
                        minimumTrackTintColor="#ff9600"
                        style={{marginTop: 10, marginLeft: 20, width: width - 60 - 50}}
                        trackStyle={{height: 10}}
                        thumbStyle={styles.sliderStyle}
                    />
                    <View style={styles.priceSettingStyle}>
                        <Text style={styles.textStyle}>单注金额:</Text>
                        {this.getInputView()}
                        {this.getYJFButton()}
                    </View>

                    {this.getPriceItems(0, 3)}
                    {this.getPriceItems(3, 6)}

                    <Text style={[styles.textStyle, {marginLeft: 20, marginTop: 10}]}>
                        注数: {this.d.numberOfUnits}注{' '}
                    </Text>
                    <Text style={[styles.textStyle, {marginLeft: 20, marginTop: 10}]}>
                        总额: {this.getPrice()}元{' '}
                    </Text>
                    <View style={styles.lotteryPriceStyle}>
                        <Text style={styles.textStyle}>若中奖,最高中: </Text>
                        <Text style={[styles.textStyle, {color: '#00b439'}]}>
                            {this.getAllPrice()}
                        </Text>
                        <Text style={styles.textStyle}> 元</Text>
                    </View>
                    <View style={styles.bottomStyle}>
                        <TouchableHighlight
                            onPress={() => this.bottomButtonCall('取消')}
                            style={{height: 45, marginTop: 0, flex: 1}}
                            activeOpacity={0.5}
                            underlayColor="transparent"
                        >
                            <Text style={[styles.bottomButtonStyle, {color: '#999999'}]}>取消</Text>
                        </TouchableHighlight>
                        <View style={{width: 0.8, height: 15, backgroundColor: '#dcdcdc'}}/>
                        <TouchableHighlight
                            onPress={() => this.bottomButtonCall('确定')}
                            style={{height: 45, marginTop: 0, flex: 1}}
                            activeOpacity={0.5}
                            underlayColor="transparent"
                        >
                            <Text style={styles.bottomButtonStyle}>确定</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </TouchableHighlight>
        );
    }

    getPrice() {
        return parseFloat(this.d.numberOfUnits * this.verifyPrice(this.d.unitPriceInput) * this.d.multiple).toFixed(2);
    }

    getAllPrice() {
        return ((this.d.odds - this.d.rebate / 100 * this.d.odds) * this.verifyPrice(this.d.unitPriceInput) * this.d.multiple).toFixed(3)
    }

    getInputView() {
        if (Platform.OS == 'ios') {
            return (
                <View style={{borderBottomColor: 'red', borderBottomWidth: 1, width: 70, height: 40}}>
                    {this.getTextInput()}
                </View>
            );
        } else {
            return this.getTextInput();
        }
    }

    getTextInput() {
        return (
            <TextInput
                ref="textInputView"
                placeholder={'2'}
                defaultValue={this.isFirst ? '' : this.d.unitPriceInput.toString()}
                keyboardType="numeric"
                maxLength={7}
                underlineColorAndroid={Platform.OS == 'ios' ? null : 'red'}
                style={styles.textInputStyle}
                onChangeText={e => this.textInputOnChangeText(e)}
                onEndEditing={(event) => {
                    this.textInputOnEndEditing(event);
                }}
                onSubmitEditing={()=> {
                    this.endingEditing()
                }}
            />
        )
    }

    getYJFButton() {
        return (
            <View style={{flexDirection: 'row', borderRadius: 5, overflow: 'hidden', marginRight: 20}}>
                {this.getPriceUnitButton('元', 1)}
                {this.getPriceUnitButton('角', 0.1)}
                {this.getPriceUnitButton('分', 0.01)}
            </View>
        );
    }

    getPriceUnitButton(unitStr, multiple) {
        return (
            <TouchableHighlight
                style={{borderRightWidth: 0.5, borderRightColor: '#dcdcdc'}}
                onPress={() => this.priceUnitButtonCall(unitStr)}
            >
                <Text style={[styles.textStyle, {
                    backgroundColor: this.d.multiple == multiple ? '#ff9600' : '#eeeeee',
                    color: this.d.multiple == multiple ? 'white' : '#666666',
                    padding: 10
                }]}>{unitStr}</Text>
            </TouchableHighlight>
        )
    }

    getPriceItems(start, end) {
        let itemArr = [];
        for (start; start < end; start++) {
            itemArr.push(
                <ChoosePricesItemView
                    key={start}
                    pricesArray={this.pricesArray}
                    index={start}
                    selectPrice={this.d.unitPriceInput}
                    onChoosePricesPressFunc={itemPrice => {
                        this.isFirst = false;
                        this.onChoosePricesPressFunc(itemPrice);
                    }}
                />
            );
        }
        return <View style={styles.choosePricesArrayStyle}>{itemArr}</View>;
    }

    onChoosePricesPressFunc(itemPrice) {
        this.d.resetPrice(itemPrice)
    }

    textInputOnChangeText(text) {
        this.isFirst = false;
        this.d.resetPrice(text)
        return text;
    }

    textInputOnEndEditing() {
        this.isFirst = false;
        this.endingEditing()
    }

    verifyPrice(price){
        let verifyP = parseFloat(price).toFixed(2);
        let regExp = new RegExp('^[0-9]+(.[0-9]{0,6})?$');
        if (!regExp.test(verifyP)||verifyP == 0 || (this.d.multiple==0.01&&verifyP<0.5)) {
            verifyP = 2;
        }
        return verifyP
    }

    endingEditing() {
        //输入完毕后校验金额
        this.d.resetPrice(this.verifyPrice(this.d.unitPriceInput))
    }

    _setModalVisibleAndOddsAndMaxRebateAndNumberOfUnits(visible, odds, maxRebate, numberOfUnits) {
        this.isFirst = visible;
        this.d.setModalVisibleAndOddsAndMaxRebateAndNumberOfUnits(visible, odds, maxRebate, numberOfUnits)
    }

    //元 角 分
    priceUnitButtonCall(str) {
        if (str == '元') {
            this.d.resetMultiple(1)
        } else if (str == '角') {
            this.d.resetMultiple(0.1)
        } else {
            this.d.resetMultiple(0.01)
        }
    }

    bottomButtonCall(str) {
        let time = this.refs['textInputView'].isFocused()? 500 : 0
        dismissKeyboard();
        this.isFirst = false;
        setTimeout(()=> {
            if (str == '确定') {
                this.endingEditing()
                if (this.props.settingEndingEvent == null) return;
                let json = {};
                json.odds = (this.d.odds - this.d.rebate / 10).toFixed(2);
                json.maxRebate = this.d.maxRebate;
                json.numberOfUnits = this.d.numberOfUnits;
                json.unitPrice = (this.d.unitPriceInput * this.d.multiple).toFixed(2);
                json.rebate = this.d.rebate;
                json.maxLotteryPrice = this.d.maxLotteryPrice;
                this.props.settingEndingEvent(json);
            }
            this.d.reset()
        },time)
    }
}

/**
 * 选择输入投注金额item view
 */
class ChoosePricesItemView extends Component {
    static defaultProps = {
        pricesArray: [],
        index: 0,
        onChoosePricesPressFunc: null,
        selectPrice: 2
    };

    render() {
        let isSelected = this.props.selectPrice == this.props.pricesArray[this.props.index];
        return (
            <TouchableOpacity
                style={[styles.choosePriceItemStyle, {backgroundColor: isSelected ? '#ff9600' : '#eeeeee'}]}
                onPress={() => {
                    this.props.onChoosePricesPressFunc &&
                    this.props.onChoosePricesPressFunc(this.props.pricesArray[this.props.index]);
                }}
            >
                <Text style={[styles.priceItemTextStyle, {color: isSelected ? 'white' : '#666666'}]}>
                    {this.props.pricesArray[this.props.index]}元
                </Text>
            </TouchableOpacity>
        );
    }
}

class BetData {
    @observable
    modalVisible = false;
    @observable
    odds = 1; //初始赔率
    @observable
    maxRebate = 13; //最大返利
    @observable
    numberOfUnits = 1; //注数
    @observable
    rebate = 0; //初始返利
    @observable
    unitPriceInput = 2; //输入单注金额 默认2元
    @observable
    multiple = 1;  //倍数 元 角 分

    @action
    reset() {
        this.modalVisible = false;
        this.unitPriceInput = '2';
        this.multiple = 1;
        this.rebate = 0;
    }

    @action
    resetRebate(rebate) {
        this.rebate = rebate
    }

    @action
    resetPrice(unitPriceInput) {
        this.unitPriceInput = unitPriceInput
    }

    @action
    resetMultiple(m) {
        this.multiple = m
    }

    @action
    setModalVisibleAndOddsAndMaxRebateAndNumberOfUnits(visible, odds, maxRebate, numberOfUnits) {
        this.modalVisible = visible
        this.odds = odds  //初始赔率
        this.maxRebate = maxRebate //最大返利
        this.numberOfUnits = numberOfUnits //注数
    }
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 8,
        backgroundColor: 'white',
        width: width - 60,
        position: 'absolute',
        top: 0,
        left: 0
    },
    sliderStyle: {
        width: 20,
        height: 20,
        backgroundColor: 'white',
        borderColor: '#ff9600',
        borderWidth: 5,
        borderRadius: 10,
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 2,
        shadowOpacity: 0.35
    },
    textInputStyle: {
        width: 70,
        height: 40,
        color: 'red',
        textAlign: 'center',
        fontSize: Size.default
    },
    titleStyle: {
        width: width - 70,
        height: 30,
        marginTop: 15,
        color: '#333333',
        textAlign: 'center',
        fontSize: Size.font18
    },
    plTextStyle: {
        borderTopWidth: TCLineW,
        borderTopColor: '#dcdcdc',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    priceSettingStyle: {
        flexDirection: 'row',
        marginLeft: 20,
        marginTop: 5,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    lotteryPriceStyle: {
        flexDirection: 'row',
        marginLeft: 20,
        marginTop: 10,
        marginBottom: 10
    },
    bottomButtonStyle: {
        width: (width - 60) / 2,
        color: '#f4492d',
        textAlign: 'center',
        fontSize: Size.font17,
        marginRight: 0.7,
        flex: 1,
        marginTop: 15
    },
    textStyle: {
        fontSize: Size.font14,
        color: '#999999'
    },
    bottomStyle: {
        height: 45,
        flexDirection: 'row',
        borderTopWidth: TCLineW,
        borderTopColor: '#dcdcdc',
        justifyContent: 'center',
        alignItems: 'center'
    },
    choosePricesArrayStyle: {
        flexDirection: 'row',
        marginLeft: 20,
        marginRight: 20,
        marginTop: 5,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    choosePriceItemStyle: {
        backgroundColor: '#dcdcdc',
        width: (width - 60 - 40 - 16) / 3,
        justifyContent: 'center',
        alignItems: 'center',
        height: 30,
        marginTop: 7,
        borderRadius: 2
    },
    priceItemTextStyle: {
        fontSize: Size.font14
    }
});
