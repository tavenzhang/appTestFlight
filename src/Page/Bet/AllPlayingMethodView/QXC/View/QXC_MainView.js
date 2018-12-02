/**
 * Created by Sam on 05/03/2018.
 * Copyright © 2017年 JX. All rights reserved.
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Platform,
    Vibration,
} from 'react-native';

/**系统 npm类 */

/**组件内部显示需要引入的类 */

/** 外部关系组件 如 页面跳转用 */
import NumberW from './QXCNumberSelectView';
import TCBetHomeDSView from '../../../View/TCBetHomeDSView'
import KeyboardAvoidingScrollView from '../../../../../Common/View/TCKeyboardAvoidingScrollView'
TCChongQingNumberView = new NumberW()
let showItemArray = [];



let SingletonDPS = null;

import RNShakeEvent from 'react-native-shake-event';

import ShakeButton from '../../../View/TCBetShakeButtonView'
import {betHome} from '../../../../resouce/theme'

export default class QXC_MainView extends React.Component {
    constructor(state) {
        super(state);
        this.state={
            type:this.props.defaultPlayType,
        };
        SingletonDPS = MathControllerFactory.getInstance().getMathController(this.props.gameUniqueId);
    }

    static defaultProps = {
        //一开始默认的玩法
        defaultPlayType:"两定玩法-两定玩法",
        shakeEvent: null
    };

    componentDidMount() {
        if (!__DEV__ && Platform.OS == 'ios') {
            RNShakeEvent.addEventListener('shake', () => {
                this.byShake()
            });
        }
    }

    componentWillUnmount() {
        if (!__DEV__ && Platform.OS == 'ios') {
            RNShakeEvent.removeEventListener('shake')
        }
    }

    render() {
        /* <Text style={{marginLeft: 10, marginTop: 10, color: '#666666'}}>{this.getPlayInfo()}</Text> */
        return (
            <View style={styles.container}>
                    {/*<ShakeButton shakeEvent={()=>this.byShake()}/>*/}
                {this.renderNumberView()}
            </View>
        );
    };

    getShakeView() {
        return (
            <ShakeButton shakeEvent={() => this.byShake()}/>
        )
    };

    byShake() {
        if (this.props.shakeEvent == null) return
        this.props.shakeEvent()
        if (Platform.OS == 'ios') {
            Vibration.vibrate()
        }
    };

    getPlayInfo() {
        let index = SingletonDPS.gameConfig.playType.indexOf(this.state.type)
        if (index >= 0) {
            return SingletonDPS.gameConfig.playInfo[index]
        }
        return ''
    };

    renderNumberView() {
        let itemArr = [];
        let type = this.state.type;
        let playGameSetting = this.getSingleGamePrizeSettings(type);
        switch (type) {
            case '两定玩法-两定玩法':
            case '三定玩法-三定玩法':
            case '四定玩法-四定玩法':
            case '一定玩法-一定玩法': {
                itemArr.push(<NumberW numberEvent={this.props.numberEvent} titleName='千位' key={1} areaIndex={0}
                                      ref="ref1"/>)
                itemArr.push(<NumberW numberEvent={this.props.numberEvent} titleName='百位' key={2} areaIndex={1}
                                      ref="ref2"/>)
                itemArr.push(<NumberW numberEvent={this.props.numberEvent} titleName='十位' key={3} areaIndex={2}
                                      ref="ref3"/>)
                itemArr.push(<NumberW numberEvent={this.props.numberEvent} titleName='个位' key={4} areaIndex={3}
                                      ref="ref4"/>)
                break;
            }
            case '二字现-二字现':
            case '三字现-三字现': {
                itemArr.push(<NumberW numberEvent={this.props.numberEvent} titleName='不定位' areaIndex={0} key={1}
                                      ref="ref1"/>)
                break;
            }
            //大小单双
            case '大小单双-总和': {
                itemArr.push(<NumberW numberEvent={this.props.numberEvent} titleName='总和' areaIndex={0} key={1}
                                      ref="ref1"
                                      numberArray={SingletonDPS.getPlayTypeArray()} bigSize={true}
                                      prizeSettings={playGameSetting['prizeSettings']} isNoNeedQDXDSQ={true}/>)

            }
                break;
            case '大小单双-前二': {
                itemArr.push(<NumberW numberEvent={this.props.numberEvent} titleName='千位' dsStyle={true} areaIndex={0}
                                      key={1} ref="ref1" isNoNeedQDXDSQ={true}/>)
                itemArr.push(<NumberW numberEvent={this.props.numberEvent} titleName='百位' dsStyle={true} areaIndex={1}
                                      key={2} ref="ref2" isNoNeedQDXDSQ={true}/>)
                break;
            }
            case '大小单双-前三': {
                itemArr.push(<NumberW numberEvent={this.props.numberEvent} titleName='千位' dsStyle={true} areaIndex={0}
                                      key={0} ref="ref0" isNoNeedQDXDSQ={true}/>)
                itemArr.push(<NumberW numberEvent={this.props.numberEvent} titleName='百位' dsStyle={true} areaIndex={1}
                                      key={1} ref="ref1" isNoNeedQDXDSQ={true}/>)
                itemArr.push(<NumberW numberEvent={this.props.numberEvent} titleName='十位' dsStyle={true} areaIndex={2}
                                      key={2} ref="ref2" isNoNeedQDXDSQ={true}/>)
                break;
            }
            case '大小单双-后二': {
                itemArr.push(<NumberW numberEvent={this.props.numberEvent} titleName='十位' dsStyle={true} areaIndex={0}
                                      key={1} ref="ref1" isNoNeedQDXDSQ={true}/>)
                itemArr.push(<NumberW numberEvent={this.props.numberEvent} titleName='个位' dsStyle={true} areaIndex={1}
                                      key={2} ref="ref2" isNoNeedQDXDSQ={true}/>)
                break;
            }
            case '大小单双-后三': {
                itemArr.push(<NumberW numberEvent={this.props.numberEvent} titleName='百位' dsStyle={true} areaIndex={0}
                                      key={0} ref="ref0" isNoNeedQDXDSQ={true}/>)
                itemArr.push(<NumberW numberEvent={this.props.numberEvent} titleName='十位' dsStyle={true} areaIndex={1}
                                      key={1} ref="ref1" isNoNeedQDXDSQ={true}/>)
                itemArr.push(<NumberW numberEvent={this.props.numberEvent} titleName='个位' dsStyle={true} areaIndex={2}
                                      key={2} ref="ref2" isNoNeedQDXDSQ={true}/>)
                break;
            }
            case '大小单双-千位': {
                itemArr.push(<NumberW numberEvent={this.props.numberEvent} titleName='千位' dsStyle={true} areaIndex={0}
                                      key={1} ref="ref2" isNoNeedQDXDSQ={true}/>)
            }
                break;
            case '大小单双-百位': {
                itemArr.push(<NumberW numberEvent={this.props.numberEvent} titleName='百位' dsStyle={true} areaIndex={0}
                                      key={1} ref="ref2" isNoNeedQDXDSQ={true}/>)
            }
                break;
            case '大小单双-十位': {
                itemArr.push(<NumberW numberEvent={this.props.numberEvent} titleName='十位' dsStyle={true} areaIndex={0}
                                      key={1} ref="ref2" isNoNeedQDXDSQ={true}/>)
            }
                break;
            case '大小单双-个位': {
                itemArr.push(<NumberW numberEvent={this.props.numberEvent} titleName='个位' dsStyle={true} areaIndex={0}
                                      key={1} ref="ref2" isNoNeedQDXDSQ={true}/>)
            }
                break;

        }
        showItemArray = itemArr;
        return itemArr;
    }

    setPlayMathWith(mathName) {
        this.props.type = mathName;
        this.setState({
            type: mathName
        })
    }

    getSingleGamePrizeSettings(playMath) {
        let pys = SingletonDPS.getPlayTypeIdWithPlayType(playMath);
        let playGameUniqueId = this.props.gameUniqueId;
        if (pys && TCGameSetting) {
            let playGameSetting = TCGameSetting.content['allGamesPrizeSettings'][playGameUniqueId]['singleGamePrizeSettings'][pys]
            return playGameSetting
        }
        return null
    }
}

function alertObj(obj) {
    var output = "";
    for (var i in obj) {
        var property = obj[i];
        output += i + " = " + property + "\n";
    }
    alert(output);
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: betHome.betMidBg
    }
});