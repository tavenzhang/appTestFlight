/**
 * Created by Sam on 01/09/2017.
 * Copyright © 2017年 JX. All rights reserved.
 */
import React, {
    Component
} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableHighlight,
    Dimensions,
    Platform,
    TouchableOpacity,
    Image,
    Alert,Keyboard
} from 'react-native';

/**系统 npm类 */

var Modal = require('react-native-modalbox');
import {observer} from 'mobx-react/native';
import dismissKeyboard from 'dismissKeyboard'


/** 外部关系组件 如 页面跳转用 */
var JXHelper = require('../../../Common/JXHelper/JXHelper')
import {IntelligenceBet, agent} from '../../resouce/images'
import {Size, width, height} from '../../resouce/theme'
import NumberOnlyInputText from "../../../Common/View/NumberOnlyInputText";

@observer
export default class MyComponent extends React.Component {
    constructor(state) {
        super(state);
        this.state = {
            keyboardSpace: 0,
        }
    }

    static defaultProps = {
        settingEndingEvent: null,
        animationType: 'none',//none slide fade
        modalMobxData: null,

    };

    reset() {

    }


    componentDidMount() {
        this.props.modalMobxData.lastToAddIssueNumber = this.props.modalMobxData.data.continueIssueNumber;
        //因为升级了modal 会自动适配键盘的高度，所以这段适配代码 ，注释掉
        // let keyBoardShow = Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
        // let keyBoardHide = Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';
        //
        // this.listener = Keyboard.addListener(keyBoardShow, (frames) => {
        //     if (!frames.endCoordinates) return;
        //
        //     if (Platform.OS === 'ios') {
        //         this.setState({keyboardSpace: frames.endCoordinates.height});
        //     }
        // });
        // this.listener1 = Keyboard.addListener(keyBoardHide, (frames) => {
        //     this.setState({keyboardSpace: 0});
        // });
    }

    componentWillUnmount() {
        // this.listener && this.listener.remove();
        // this.listener1 && this.listener1.remove();

    }


    render() {
        if(width<=350) {
            this.modalWidth = width - 35;//因为小屏幕 显示问题，所以-35
        }else{
            this.modalWidth = width - 60;//因为大一点的屏幕显示问题，所以-60
        }
        return (
            <Modal
                isOpen={this.props.modalMobxData.modalVisible}
                style={{
                    width: this.modalWidth,
                    height: 348.5,
                    borderRadius: 8,
                    backgroundColor: 'transparent',
                    // top: this.state.keyboardSpace && Platform.OS === 'ios' ? -(this.state.keyboardSpace - (height - 348.5 - 5) / 2) : 0,
                    position: 'absolute'
                }}

                animationDuration={500}
                position={'center'}
                backdropPressToClose={false}
                animationType={this.props.animationType}
                transparent={true}
                visible={this.props.modalMobxData.modalVisible}
                onRequestClose={() => {
                    this._setModalVisible(false)
                }}
            >
                {this.getRenderView()}
            </Modal>
        )
    }

    getRenderView() {
        return (

            <TouchableHighlight onPress={() => {
                dismissKeyboard()
            }} style={{width: this.modalWidth, height: 348.5}} activeOpacity={1} underlayColor='transparent'>

                <View style={[styles.container,{width:this.modalWidth}]}>
                    <Text style={[styles.titleStyle,{width:this.modalWidth}]}>修改追号方案</Text>
                    <View style={{flex: 1, height: 0.5, backgroundColor: '#dcdcdc', marginBottom: 10}}></View>

                    {this.getIssue('连续追号:', "期")}
                    {this.getIssue('起始倍数:', "倍")}
                    {this.getExpectProfit()}
                    <View style={styles.bottomStyle}>
                        <TouchableHighlight onPress={() => this.bottomButtonCall('取消')}
                                            activeOpacity={0.5}
                                            underlayColor='transparent'>
                            <View style={{
                                width: 120,
                                height: 30,
                                backgroundColor: 'white',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: 4
                            }}>
                                <Text style={{
                                    width: 80,
                                    color: '#333333',
                                    textAlign: 'center',
                                    fontSize: Size.font17
                                }}>取消</Text>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight onPress={() => this.bottomButtonCall('确定')}
                                            activeOpacity={0.5}
                                            underlayColor='transparent'>
                            <View style={{
                                width: 120,
                                height: 30,
                                backgroundColor: '#EA2727',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: 4
                            }}>
                                <Text style={{
                                    width: 90,
                                    color: '#ffffff',
                                    textAlign: 'center',
                                    fontSize: Size.font17
                                }}>生成方案</Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                </View>
            </TouchableHighlight>
        )

    }

    getIssue(title1, title2, value) {
        return (
            <View style={{flexDirection: 'row', alignItems: 'center', marginLeft: 15, marginBottom: 15}}>
                <Text style={styles.defaultTextStyle}>{title1}</Text>


                <View style={{
                    flexDirection: 'row',
                    borderColor: '#cccccc',
                    borderWidth: 1,
                    marginLeft: 7,
                    marginRight: 7,
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    backgroundColor: '#ffffff'
                }}>
                    <TouchableOpacity style={{
                        width: 22,
                        borderColor: 'transparent',
                        borderWidth: 1,
                        borderRightColor: '#cccccc',
                        height: 25,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                                      onPress={title2 === '期' ? () => this.onToAddIssueNumPress(false) : () => this.onStartMultiplePress(false)}>

                        <Image style={{width: 13, height: 13}} resizeMode={'contain'}
                               source={IntelligenceBet.subtract}/>
                    </TouchableOpacity>

                    <NumberOnlyInputText textWidth={55} maxLength={title2 === '期' ? 2 : 5}
                                         defaultValue={title2 === '期' ? this.props.modalMobxData.data.continueIssueNumber : this.props.modalMobxData.data.startMultiple}
                                         textChangedFunc={title2 === '期' ? (text) => {
                                             this.props.modalMobxData.setToAddIssueNumber(text)
                                         } : (text) => {
                                             this.props.modalMobxData.setStartMultiple(text)
                                         }
                                         }
                                         textHeight={25}
                                         borderColor="transparent"/>

                    <TouchableOpacity style={{
                        width: 22,
                        borderColor: 'transparent',
                        borderWidth: 1,
                        borderLeftColor: '#cccccc',
                        height: 25,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                                      onPress={title2 === '期' ? () => this.onToAddIssueNumPress(true) : () => this.onStartMultiplePress(true)}>
                        <Image style={{width: 13, height: 13}} resizeMode={'contain'} source={IntelligenceBet.add}/>

                    </TouchableOpacity>
                </View>
                <Text style={styles.defaultTextStyle}>{title2}</Text>
            </View>
        )
    }

    getExpectProfit() {
        return (
            <View style={{marginLeft: 15, marginBottom: 0, flexDirection: 'row', alignItems: 'center'}}>
                <Text style={styles.defaultTextStyle}>预期盈利:</Text>
                <View>
                    <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 10}}>
                        {this.getRadioImage(1)}
                        <Text style={styles.defaultTextStyle}>全程最低盈利率</Text>
                        {this.getInputView(50, 5, 0, this.props.modalMobxData.data.lowestProfitRate)}
                        <Text style={styles.defaultTextStyle}>%</Text>
                    </View>


                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        {this.getRadioImage(2)}
                        <View>
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <Text style={styles.defaultTextStyle}>前</Text>
                                {this.getInputView(40, 1, 1, this.props.modalMobxData.data.topXIssueNumber)}
                                <Text style={styles.defaultTextStyle}>期</Text>
                                {this.getInputView(50, 5, 2, this.props.modalMobxData.data.topXProfitRate)}
                                <Text style={styles.defaultTextStyle}>%</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        marginTop: 10,
                        marginBottom: 10,
                        marginLeft: 5 + 15 + 10,
                        alignItems: 'center'
                    }}>
                        <Text style={styles.defaultTextStyle}>之后盈利率</Text>
                        {this.getInputView(50, 5, 3, this.props.modalMobxData.data.afterTopXProfitRate)}
                        <Text style={styles.defaultTextStyle}>%</Text>
                    </View>


                    <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 10}}>
                        {this.getRadioImage(3)}
                        <Text style={styles.defaultTextStyle}>全程最低盈利</Text>
                        {this.getInputView(50, 5, 4, this.props.modalMobxData.data.lowestProfitMoney)}
                        <Text style={styles.defaultTextStyle}>元</Text>
                    </View>

                </View>
            </View>)
    }

    getRadioImage(radioNumber) {
        return <RadioImage radioNumber={radioNumber} mobxData={this.props.modalMobxData}/>
    }


    getInputView(w, maxLength, key, defaultValue) {
        return <ExpectedProfitInputText textWidth={w} maxLength={maxLength}
                                        defaultValue={defaultValue}
                                        indexKey={key} mobxData={this.props.modalMobxData}/>
    }


    _setModalVisible(visible) {
        this.props.modalMobxData.setModalVisible(visible);
    }

    bottomButtonCall(str) {

        switch (str) {
            case '确定': {
                if(this.props.modalMobxData.data.continueIssueNumber=='' || this.props.modalMobxData.data.continueIssueNumber==0){
                    Alert.alert(
                        '温馨提示', '当前所选方案的追号期数为0或者为空,请重新修改',
                        [{text: '确定'}]);
                    return
                }
                if(this.props.modalMobxData.data.startMultiple==''||this.props.modalMobxData.data.startMultiple==0){
                    Alert.alert(
                        '温馨提示', '当前所选方案的倍数为0或者为空,请重新修改',
                        [{text: '确定'}]);
                    return
                }
                if(!this.props.modalMobxData.checkExpectProfitInputIsCorrect()){
                    Alert.alert(
                        '温馨提示', '当前所选方案数值不能为空',
                        [{text: '确定'}]);
                    return
                }
                this.props.getData(this.props.modalMobxData.lastToAddIssueNumber != this.props.modalMobxData.data.continueIssueNumber);
            }
                break;
            case '取消': {
                this.props.modalMobxData.resetData();
            }
                break;
        }
        this._setModalVisible(false);

    }

    onToAddIssueNumPress(isAdd) {
        this.props.modalMobxData.calContinueIssueNumber(isAdd);
    }

    onStartMultiplePress(isAdd) {
        this.props.modalMobxData.calStartMultiple(isAdd);
    }


}

@observer
class RadioImage extends Component {
    constructor() {
        super();
    }

    render() {
        return <TouchableOpacity onPress={() => {
            this.props.mobxData.changeRadioState(this.props.radioNumber)
        }} style={{
            width: 15 + 5 + 5,
            height: 15 + 10,
            alignItems: 'center',
            justifyContent: 'center',
            paddingTop: 5,
            paddingBottom: 5
        }}><Image
            style={styles.radioButtonStyle}
            source={this.getSelected() ? agent.typeOn : agent.type}/></TouchableOpacity>
    }

    getSelected() {
        switch (this.props.radioNumber) {
            case 1: {
                return this.props.mobxData.data.firstExpectedProfit;
            }
                break;
            case 2: {
                return this.props.mobxData.data.secondExpectedProfit;

            }
                break;
            case 3: {
                return this.props.mobxData.data.thirdExpectedProfit;

            }
                break;
        }
        return false;
    }
}

@observer
class ExpectedProfitInputText extends Component {
    constructor() {
        super();
    }

    static defaultProps = {
        indexKey: 0,
        mobxData: null,

    }

    render() {
        return <NumberOnlyInputText maxLength={this.props.maxLength} isEditable={this.getSelected()}
                                    defaultValue={this.props.defaultValue}
                                    indexKey={this.props.indexKey}
                                    textChangedFunc={(text, indexKey) => this.props.mobxData.setExpectedProfitArr(text, indexKey)}
                                    textWidth={this.props.textWidth}/>
    }

    getSelected() {
        switch (this.props.indexKey) {
            case 0: {
                return this.props.mobxData.data.firstExpectedProfit;
            }
                break;
            case 1:
            case 2:
            case 3: {
                return this.props.mobxData.data.secondExpectedProfit;

            }
                break;
            case 4: {
                return this.props.mobxData.data.thirdExpectedProfit;

            }
                break;
        }
        return false;
    }
}


const styles = StyleSheet.create({
    container: {
        width: width - 60,
        borderRadius: 8,
        backgroundColor: '#f2f2f2',

    },
    defaultTextStyle: {
        fontSize: Size.font15,
        color: '#333333',
    },
    titleStyle: {
        width: width - 70,
        height: 28,
        marginTop: 15,
        color: '#333333',
        textAlign: 'center',
        fontSize: Size.font18,
        fontWeight: 'bold',
    },
    // bottomButtonStyle: {
    //     width: (width - 60) / 2,
    //     color: '#f4492d',
    //     textAlign: 'center',
    //     fontSize: Size.font19,
    //     fontWeight: 'bold',
    //     marginRight: 0.7,
    //     flex: 1,
    //     marginTop: 15,
    // },
    bottomStyle: {
        height: 45,
        flexDirection: 'row',
        // borderTopWidth: TCLineW,
        // borderTopColor: '#dcdcdc',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    radioButtonStyle: {
        width: 15,
        height: 15,
        marginRight: 5
    }
});