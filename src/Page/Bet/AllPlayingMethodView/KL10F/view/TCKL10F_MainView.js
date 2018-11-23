/**
 * Created by Sam on 2016/11/14.
 */


import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableHighlight,
    Platform
} from 'react-native';

import NumberW from './TCKL10F_numberSelectView';

TCChongQingNumberView = new NumberW()
let showItemArray = [];

import TCKL10F_DPS from '../data/TCKL10F_DPS'
import {MathControllerFactory} from 'lottery-core'

let SingletonSSC = null;

import RNShakeEvent from 'react-native-shake-event';

import ShakeButton from '../../../View/TCBetShakeButtonView'
import {betHome} from '../../../../resouce/theme'

export default class TCKL10F_MainView extends React.Component {

    constructor(state) {
        super(state);
        this.state={
            type:this.props.defaultPlayType,
        };
        SingletonSSC = MathControllerFactory.getInstance().getMathController(this.props.gameUniqueId);

    }

    static defaultProps = {
        //一开始默认的玩法
        defaultPlayType:"首位数投",
        shakeEvent: null
    };

    componentDidMount() {
        if(!__DEV__&&Platform.OS == 'ios'){
            RNShakeEvent.addEventListener('shake', () => {
                this.byShake()
            });
        }
    }

    componentWillUnmount() {
        if(!__DEV__&&Platform.OS == 'ios'){
            RNShakeEvent.removeEventListener('shake')
        }
    }

    render() {
        /* <Text style={{marginLeft: 10, marginTop: 10, color: '#666666'}}>{this.getPlayInfo()}</Text> */
        return (
            <View style={styles.container}>
                {/*{this.getShakeView()}*/}
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
    };

    getPlayInfo() {
        let index = SingletonSSC.gameConfig.playType.indexOf(this.state.type)
        if (index >= 0) {
            return SingletonSSC.gameConfig.playInfo[index]
        }
        return ''
    };

    renderNumberView() {
        let itemArr = []
        let numberArr = SingletonSSC.getPlayTypeArray();
        switch (this.state.type) {
            case '首位数投': {
                itemArr.push(<NumberW titleName='首位' numberArray={numberArr.concat().splice(0, 18)} key={1}
                                      areaIndex={0} ref="ref1" numberEvent={this.props.numberEvent}/>)
                break;
            }
            case '首位红投': {
                itemArr.push(<NumberW titleName='首位' key={1} numberArray={numberArr.concat().splice(18, 2)}
                                      areaIndex={0} ref="ref1" numberEvent={this.props.numberEvent} isNoNeedQDXDSQ={true}/>)
                break;
            }
            case '二连直': {
                itemArr.push(<NumberW titleName='前位' key={1} areaIndex={0} ref="ref1" numberArray={numberArr}
                                      numberEvent={this.props.numberEvent}/>)
                itemArr.push(<NumberW titleName='后位' key={2} areaIndex={1} ref="ref2" numberArray={numberArr}
                                      numberEvent={this.props.numberEvent}/>)
                break;
            }
            case '二连组': {
                itemArr.push(<NumberW titleName='二连组' key={1} areaIndex={0} ref="ref1" numberArray={numberArr}
                                      numberEvent={this.props.numberEvent}/>)
                break;
            }
            case '前三直': {
                itemArr.push(<NumberW titleName='第一位' key={1} areaIndex={0} ref="ref1" numberArray={numberArr}
                                      numberEvent={this.props.numberEvent}/>)
                itemArr.push(<NumberW titleName='第二位' key={2} areaIndex={1} ref="ref2" numberArray={numberArr}
                                      numberEvent={this.props.numberEvent}/>)
                itemArr.push(<NumberW titleName='第三位' key={3} areaIndex={2} ref="ref3" numberArray={numberArr}
                                      numberEvent={this.props.numberEvent}/>)
                break;
            }
            case '前三组': {
                itemArr.push(<NumberW titleName='前三组' areaIndex={0} key={1} ref="ref1" numberArray={numberArr}
                                      numberEvent={this.props.numberEvent}/>)
                break;
            }
            case '快乐二': {
                itemArr.push(<NumberW titleName='快乐二' areaIndex={0} key={1} ref="ref1" numberArray={numberArr}
                                      numberEvent={this.props.numberEvent}/>)
                break;
            }
            case '快乐三': {
                itemArr.push(<NumberW titleName='快乐三' areaIndex={0} key={1} ref="ref1" numberArray={numberArr}
                                      numberEvent={this.props.numberEvent}/>)
                break;
            }
            case '快乐四': {
                itemArr.push(<NumberW titleName='快乐四' areaIndex={0} key={1} ref="ref1" numberArray={numberArr}
                                      numberEvent={this.props.numberEvent}/>)
                break;
            }
            case '快乐五': {
                itemArr.push(<NumberW titleName='快乐五' areaIndex={0} key={1} ref="ref1" numberArray={numberArr}
                                      numberEvent={this.props.numberEvent}/>)
                break;
            }
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