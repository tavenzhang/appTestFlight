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

import NumberW from './TCChongQingSSC_numberSelectView';
import TCBetHomeDSView from '../../../View/TCBetHomeDSView'
import KeyboardAvoidingScrollView from '../../../../../Common/View/TCKeyboardAvoidingScrollView'
TCChongQingNumberView = new NumberW()
let showItemArray = [];

import TCChongQingSSC_DPS from '../data/TCChongQingSSC_DPS'


let SingletonSSC = null;

import RNShakeEvent from 'react-native-shake-event';

import ShakeButton from '../../../View/TCBetShakeButtonView'
import {betHome} from '../../../../resouce/theme'
import TCFlatList from "../../../../../Common/View/RefreshListView/TCFLatList";

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
        defaultPlayType:"定位胆-定位胆",
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
        let firstList= this.getFirstRender(this.state.type);
        if(firstList.length>0){
            return (
                <View style={styles.container}>
                    <TCFlatList dataS={firstList} initialNumToRender={1} renderRow={this.onRenderRow}/>
                </View>
            );
        }
        else{
            return (
                <View style={styles.container}>
                    {/*{this.getShakeView()}*/}
                    {this.renderNumberView()}
                </View>
            );
        }
    };

    onRenderRow=(data,index)=>{
        let {numberEvent, titleName, areaIndex, ref}=data;
         return (<NumberW numberEvent={numberEvent} titleName={titleName} areaIndex={areaIndex} ref={ref}/>)
    }

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
    
    // 对默认玩法定位胆采用 flatList 方便限定 局部优先渲染,减少过渡的时候卡顿
    getFirstRender=()=> {
        let dataList = [];
        switch (this.state.type) {
            case '任选二-直选复式':
            case '任选三-直选复式':
            case '任选四-直选复式':
            case '五星-五星通选':
            case '五星-五星直选':
            case '定位胆-定位胆': {
                dataList.push({numberEvent: this.props.numberEvent, titleName: '万位', areaIndex: 0, ref: "ref1"});

                dataList.push({numberEvent: this.props.numberEvent, titleName: '千位', areaIndex: 1, ref: "ref2"});

                dataList.push({numberEvent: this.props.numberEvent, titleName: '百位', areaIndex: 2, ref: "ref3"});

                dataList.push({numberEvent: this.props.numberEvent, titleName: '十位', areaIndex: 3, ref: "ref4"});

                dataList.push({numberEvent: this.props.numberEvent, titleName: '个位', areaIndex: 4, ref: "ref5"});
                break;
            }
        }
        return dataList;
    }

    
    renderNumberView() {
        let itemArr = [];
        let type = this.state.type;
        let playGameSetting = this.getSingleGamePrizeSettings(type);

        switch (this.state.type) {
            case '任选二-直选复式':
            case '任选三-直选复式':
            case '任选四-直选复式':
            case '五星-五星通选':
            case '五星-五星直选':
            case '定位胆-定位胆': {
                itemArr.push(<NumberW numberEvent={this.props.numberEvent} titleName='万位' key={1} areaIndex={0}
                                      ref="ref1"/>)
                itemArr.push(<NumberW numberEvent={this.props.numberEvent} titleName='千位' key={2} areaIndex={1}
                                      ref="ref2"/>)
                itemArr.push(<NumberW numberEvent={this.props.numberEvent} titleName='百位' key={3} areaIndex={2}
                                      ref="ref3"/>)
                itemArr.push(<NumberW numberEvent={this.props.numberEvent} titleName='十位' key={4} areaIndex={3}
                                      ref="ref4"/>)
                itemArr.push(<NumberW numberEvent={this.props.numberEvent} titleName='个位' key={5} areaIndex={4}
                                      ref="ref5"/>)
                break;
            }
            //三星直选
            case '三星-三星直选': {
                itemArr.push(<NumberW numberEvent={this.props.numberEvent} titleName='百位' key={1} areaIndex={0}
                                      ref="ref1"/>)
                itemArr.push(<NumberW numberEvent={this.props.numberEvent} titleName='十位' key={2} areaIndex={1}
                                      ref="ref2"/>)
                itemArr.push(<NumberW numberEvent={this.props.numberEvent} titleName='个位' key={3} areaIndex={2}
                                      ref="ref3"/>)
                break;
            }
            //三星组三  // 三星组六
            case '三星-三星组三':
            case '三星-三星组六':
            case '任选三-组六复式':
            case '任选三-组三复式': {
                itemArr.push(<NumberW numberEvent={this.props.numberEvent} titleName='选号' areaIndex={0} key={1}
                                      ref="ref1"/>)
                break;
            }
            //二星直选
            case '二星-二星直选': {
                itemArr.push(<NumberW numberEvent={this.props.numberEvent} titleName='十位' areaIndex={0} key={1}
                                      ref="ref1"/>)
                itemArr.push(<NumberW numberEvent={this.props.numberEvent} titleName='个位' areaIndex={1} key={2}
                                      ref="ref2"/>)
                break;
            }
            //二星组选
            case '二星-二星组选': {
                itemArr.push(<NumberW numberEvent={this.props.numberEvent} titleName='选号' areaIndex={0} key={1}
                                      ref="ref1"/>)
                break;
            }
            //一星组选
            case '一星-一星直选': {
                itemArr.push(<NumberW numberEvent={this.props.numberEvent} titleName='个位' areaIndex={0} key={1}
                                      ref="ref1"/>)
                break;
            }
            //大小单双
            case '大小单双-后二大小单双': {
                itemArr.push(<NumberW numberEvent={this.props.numberEvent} titleName='十位' dsStyle={true} areaIndex={0}
                                      key={1} ref="ref1" isNoNeedQDXDSQ={true}/>)
                itemArr.push(<NumberW numberEvent={this.props.numberEvent} titleName='个位' dsStyle={true} areaIndex={1}
                                      key={2} ref="ref2" isNoNeedQDXDSQ={true}/>)
                break;
            }
            case '大小单双-前二大小单双': {
                itemArr.push(<NumberW numberEvent={this.props.numberEvent} titleName='万位' dsStyle={true} areaIndex={0}
                                      key={1} ref="ref1" isNoNeedQDXDSQ={true}/>)
                itemArr.push(<NumberW numberEvent={this.props.numberEvent} titleName='千位' dsStyle={true} areaIndex={1}
                                      key={2} ref="ref2" isNoNeedQDXDSQ={true}/>)
                break;
            }
            case '大小单双-后三大小单双': {
                itemArr.push(<NumberW numberEvent={this.props.numberEvent} titleName='百位' dsStyle={true} areaIndex={0}
                                      key={0} ref="ref0" isNoNeedQDXDSQ={true}/>)
                itemArr.push(<NumberW numberEvent={this.props.numberEvent} titleName='十位' dsStyle={true} areaIndex={1}
                                      key={1} ref="ref1" isNoNeedQDXDSQ={true}/>)
                itemArr.push(<NumberW numberEvent={this.props.numberEvent} titleName='个位' dsStyle={true} areaIndex={2}
                                      key={2} ref="ref2" isNoNeedQDXDSQ={true}/>)
                break;
            }
            case '大小单双-前三大小单双': {
                itemArr.push(<NumberW numberEvent={this.props.numberEvent} titleName='万位' dsStyle={true} areaIndex={0}
                                      key={0} ref="ref0" isNoNeedQDXDSQ={true}/>)
                itemArr.push(<NumberW numberEvent={this.props.numberEvent} titleName='千位' dsStyle={true} areaIndex={1}
                                      key={1} ref="ref1" isNoNeedQDXDSQ={true}/>)
                itemArr.push(<NumberW numberEvent={this.props.numberEvent} titleName='百位' dsStyle={true} areaIndex={2}
                                      key={2} ref="ref2" isNoNeedQDXDSQ={true}/>)
                break;
            }
            case '大小单双-总和': {
                itemArr.push(<NumberW numberEvent={this.props.numberEvent} titleName='总和' dsStyle={true} areaIndex={0}
                                      key={1} ref="ref2" isNoNeedQDXDSQ={true}/>)
            }
                break
            case '不定位-五星三码':
            case '不定位-五星二码':
            case '不定位-五星一码':
            case '不定位-后四二码':
            case '不定位-后四一码':
            case '不定位-前四二码':
            case '不定位-前四一码':
            case '不定位-后三二码':
            case '不定位-后三一码':
            case '不定位-前三二码':
            case '不定位-前三一码': {
                itemArr.push(<NumberW numberEvent={this.props.numberEvent} titleName='不定位' areaIndex={0} key={1}
                                      ref="ref1"/>)
                break;
            }

            case '任选二-直选和值': {
                itemArr.push(<NumberW numberEvent={this.props.numberEvent} titleName='和值' areaIndex={0} key={1}
                                      ref="ref1"
                                      numberArray={SingletonSSC.getPlayTypeArray()}/>)
                break;
            }
            case '任选三-直选和值': {
                itemArr.push(<NumberW numberEvent={this.props.numberEvent} titleName='和值' areaIndex={0} key={1}
                                      ref="ref1"
                                      numberArray={SingletonSSC.getPlayTypeArray()}/>)
                break;
            }

            case '任选二-组选和值': {
                itemArr.push(<NumberW numberEvent={this.props.numberEvent} titleName='和值' areaIndex={0} key={1}
                                      ref="ref1"
                                      numberArray={SingletonSSC.getPlayTypeArray()}/>)
                break;
            }
            case '任选三-组选和值': {
                itemArr.push(<NumberW numberEvent={this.props.numberEvent} titleName='和值' areaIndex={0} key={1}
                                      ref="ref1"
                                      numberArray={SingletonSSC.getPlayTypeArray()}/>)
                break;
            }
            case '任选二-组选复式': {
                itemArr.push(<NumberW numberEvent={this.props.numberEvent} titleName='组选' areaIndex={0} key={1}
                                      ref="ref1"/>)
                break;
            }
            case '任选四-组选24': {
                itemArr.push(<NumberW numberEvent={this.props.numberEvent} titleName='组选24' areaIndex={0} key={1}
                                      ref="ref1"/>)
                break;
            }
            case '任选四-组选12': {
                itemArr.push(<NumberW numberEvent={this.props.numberEvent} titleName='二重号' areaIndex={0} key={1}
                                      ref="ref1"/>)
                itemArr.push(<NumberW numberEvent={this.props.numberEvent} titleName='单号' areaIndex={1} key={2}
                                      ref="ref2"/>)
                break;
            }
            case '任选四-组选6': {
                itemArr.push(<NumberW numberEvent={this.props.numberEvent} titleName='二重号' areaIndex={0} key={1}
                                      ref="ref1"/>)
                break;
            }
            case '任选四-组选4': {
                itemArr.push(<NumberW numberEvent={this.props.numberEvent} titleName='三重号' areaIndex={0} key={1}
                                      ref="ref1"/>)
                itemArr.push(<NumberW numberEvent={this.props.numberEvent} titleName='单号' areaIndex={1} key={2}
                                      ref="ref2"/>)
                break;
            }

            case '龙虎-龙虎-万千':
            case '龙虎-龙虎-万百':
            case '龙虎-龙虎-万十':
            case '龙虎-龙虎-万个':
            case '龙虎-龙虎-千百':
            case '龙虎-龙虎-千十':
            case '龙虎-龙虎-千个':
            case '龙虎-龙虎-百十':
            case '龙虎-龙虎-百个':
            case '龙虎-龙虎-十个': {
                itemArr.push(<NumberW numberEvent={this.props.numberEvent} titleName='龙虎' areaIndex={0} key={1}
                                      ref="ref1"
                                      numberArray={SingletonSSC.getPlayTypeArray()}
                                      prizeSettings={playGameSetting['prizeSettings']} isNoNeedQDXDSQ={true}/>)
            }
                break
            case '顺子-前三球': {
                itemArr.push(<NumberW numberEvent={this.props.numberEvent} titleName='前三' bigSize={true} areaIndex={0}
                                      key={1} ref="ref1"
                                      numberArray={SingletonSSC.getPlayTypeArray()}
                                      prizeSettings={playGameSetting['prizeSettings']} isNoNeedQDXDSQ={true}/>)
            }
                break
            case '顺子-中三球': {
                itemArr.push(<NumberW numberEvent={this.props.numberEvent} titleName='中三' bigSize={true} areaIndex={0}
                                      key={1} ref="ref1"
                                      numberArray={SingletonSSC.getPlayTypeArray()}
                                      prizeSettings={playGameSetting['prizeSettings']} isNoNeedQDXDSQ={true}/>)
            }
                break
            case '顺子-后三球': {
                itemArr.push(<NumberW numberEvent={this.props.numberEvent} titleName='后三' bigSize={true} areaIndex={0}
                                      key={1} ref="ref1"
                                      numberArray={SingletonSSC.getPlayTypeArray()}
                                      prizeSettings={playGameSetting['prizeSettings']} isNoNeedQDXDSQ={true}/>)
            }
                break
            case '大小单双-万位': {
                itemArr.push(<NumberW numberEvent={this.props.numberEvent} titleName='万位' dsStyle={true} areaIndex={0}
                                      key={1} ref="ref2" isNoNeedQDXDSQ={true}/>)
            }
                break
            case '大小单双-千位': {
                itemArr.push(<NumberW numberEvent={this.props.numberEvent} titleName='千位' dsStyle={true} areaIndex={0}
                                      key={1} ref="ref2" isNoNeedQDXDSQ={true}/>)
            }
                break
            case '大小单双-百位': {
                itemArr.push(<NumberW numberEvent={this.props.numberEvent} titleName='百位' dsStyle={true} areaIndex={0}
                                      key={1} ref="ref2" isNoNeedQDXDSQ={true}/>)
            }
                break
            case '大小单双-十位': {
                itemArr.push(<NumberW numberEvent={this.props.numberEvent} titleName='十位' dsStyle={true} areaIndex={0}
                                      key={1} ref="ref2" isNoNeedQDXDSQ={true}/>)
            }
                break
            case '大小单双-个位': {
                itemArr.push(<NumberW numberEvent={this.props.numberEvent} titleName='个位' dsStyle={true} areaIndex={0}
                                      key={1} ref="ref2" isNoNeedQDXDSQ={true}/>)
            }
                break
            case '斗牛-斗牛': {
                itemArr.push(<NumberW numberEvent={this.props.numberEvent} titleName='斗牛' areaIndex={0} key={1}
                                      ref="ref1"
                                      numberArray={SingletonSSC.getPlayTypeArray()} bigSize={true}
                                      prizeSettings={playGameSetting['prizeSettings']} isNoNeedQDXDSQ={true}/>)
            }
                break
            case '五星-五星通选单式':
            case '五星-五星直选单式':
            case '三星-三星直选单式':
            case '三星-三星组三单式':
            case '三星-三星组六单式':
            case '二星-二星直选单式':
            case '二星-二星组选单式':
                itemArr.push(<TCBetHomeDSView numberEvent={this.props.numberEvent} key={0}
                                              playTypeName={this.state.type}/>)
                break
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
        let pys = SingletonSSC.getPlayTypeIdWithPlayType(playMath);
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