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
    Vibration,
    Platform
} from 'react-native';

import NumberW from './TCSSL_numberSelectView';
import TCBetHomeDSView from '../../../View/TCBetHomeDSView'
TCChongQingNumberView = new NumberW()
let showItemArray = [];
import {betHome} from '../../../../resouce/theme'
import TCChongQingSSC_DPS from '../data/TCSSL_DPS'
import {MathControllerFactory} from 'lottery-core'

let SingletonSSC = null;

import RNShakeEvent from 'react-native-shake-event';

import ShakeButton from '../../../View/TCBetShakeButtonView'

export default class TCChongQing_WXZX extends React.Component {

    constructor(state) {
        super(state);
        this.state={
            type:this.props.defaultPlayType,
        };
        SingletonSSC = MathControllerFactory.getInstance().getMathController(this.props.gameUniqueId);

    }

    static defaultProps = {
        //一开始默认的玩法
        defaultPlayType:"三星-直选复式",
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
        if (Platform.OS == 'ios') {
            Vibration.vibrate()
        }
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
        switch (this.state.type) {
            case '三星-直选和值': {
                itemArr.push(<NumberW titleName='和值' areaIndex={0} key={1} ref="ref1"
                                      numberArray={SingletonSSC.getPlayTypeArray()}
                                      numberEvent={this.props.numberEvent}/>)
                break;
            }
            //三星直选
            case '三星-直选复式': {
                itemArr.push(<NumberW titleName='百位' key={1} areaIndex={0} ref="ref1"
                                      numberEvent={this.props.numberEvent}/>)
                itemArr.push(<NumberW titleName='十位' key={2} areaIndex={1} ref="ref2"
                                      numberEvent={this.props.numberEvent}/>)
                itemArr.push(<NumberW titleName='个位' key={3} areaIndex={2} ref="ref3"
                                      numberEvent={this.props.numberEvent}/>)
                break;
            }

            case '三星-组六复式':
            case '三星-组三复式': {
                itemArr.push(<NumberW titleName='选号' areaIndex={0} key={1} ref="ref1"
                                      numberEvent={this.props.numberEvent}/>)
                break;
            }
            case '三星-组三和值': {
                itemArr.push(<NumberW titleName='和值' areaIndex={0} key={1} ref="ref1"
                                      numberArray={SingletonSSC.getPlayTypeArray()}
                                      numberEvent={this.props.numberEvent}/>)
                break;
            }
            case '三星-组六和值': {
                itemArr.push(<NumberW titleName='和值' areaIndex={0} key={1} ref="ref1"
                                      numberArray={SingletonSSC.getPlayTypeArray()}
                                      numberEvent={this.props.numberEvent}/>)
                break;
            }

            //二星直选
            case '二星-前二直选': {
                itemArr.push(<NumberW titleName='百位' areaIndex={0} key={0} ref="ref1"
                                      numberEvent={this.props.numberEvent}/>)
                itemArr.push(<NumberW titleName='十位' areaIndex={1} key={1} ref="ref2"
                                      numberEvent={this.props.numberEvent}/>)
                break;
            }
            case '二星-后二直选': {
                itemArr.push(<NumberW titleName='十位' areaIndex={0} key={0} ref="ref1"
                                      numberEvent={this.props.numberEvent}/>)
                itemArr.push(<NumberW titleName='个位' areaIndex={1} key={1} ref="ref2"
                                      numberEvent={this.props.numberEvent}/>)
                break;
            }
            //二星组选
            case '二星-前二组选':
            case '二星-后二组选': {
                itemArr.push(<NumberW titleName='选号' areaIndex={0} key={1} ref="ref1"
                                      numberEvent={this.props.numberEvent}/>)
                break;
            }

            case '定位胆-定位胆': {
                itemArr.push(<NumberW titleName='百位' key={3} areaIndex={0} ref="ref3"
                                      numberEvent={this.props.numberEvent}/>)
                itemArr.push(<NumberW titleName='十位' key={4} areaIndex={1} ref="ref4"
                                      numberEvent={this.props.numberEvent}/>)
                itemArr.push(<NumberW titleName='个位' key={5} areaIndex={2} ref="ref5"
                                      numberEvent={this.props.numberEvent}/>)
                break;
            }

            case '不定位-一码不定位': {
                itemArr.push(<NumberW titleName='一码' areaIndex={0} key={1} ref="ref1"
                                      numberEvent={this.props.numberEvent}/>)
                break;
            }

            case '不定位-二码不定位': {
                itemArr.push(<NumberW titleName='二码' areaIndex={0} key={1} ref="ref1"
                                      numberEvent={this.props.numberEvent}/>)
                break;
            }

            //大小单双
            case '大小单双-后二大小单双': {
                itemArr.push(<NumberW titleName='十位' dsStyle={true} areaIndex={0} key={1} ref="ref1"
                                      isNoNeedQDXDSQ={true} numberEvent={this.props.numberEvent}/>)
                itemArr.push(<NumberW titleName='个位' dsStyle={true} areaIndex={1} key={2} ref="ref2"
                                      isNoNeedQDXDSQ={true} numberEvent={this.props.numberEvent}/>)
                break;
            }
            case '大小单双-前二大小单双': {
                itemArr.push(<NumberW titleName='百位' dsStyle={true} areaIndex={0} key={1} ref="ref1"
                                      isNoNeedQDXDSQ={true} numberEvent={this.props.numberEvent}/>)
                itemArr.push(<NumberW titleName='十位' dsStyle={true} areaIndex={1} key={2} ref="ref2"
                                      isNoNeedQDXDSQ={true} numberEvent={this.props.numberEvent}/>)
                break;
            }
            case '三星-直选单式':
            case '三星-组六单式':
            case '三星-组三单式':
            case '二星-前二直选单式':
            case '二星-后二直选单式':
            case '二星-前二组选单式':
            case '二星-后二组选单式': {
                itemArr.push(<TCBetHomeDSView numberEvent={this.props.numberEvent} key={0}
                                              playTypeName={this.state.type}/>)
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