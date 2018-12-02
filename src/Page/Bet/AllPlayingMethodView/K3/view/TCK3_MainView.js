/**
 * Created by Sam on 2016/11/28.
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Platform
} from 'react-native';

import TCK3_DPS from '../data/TCK3_DPS'


let SingletonDPS = null;

import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter'
import TCK3NumberSelectView from './TCK3NumberSelectView'
import TCK3SpecialKindSelectView from './TCK3SpecialKindSelectView'
import TCK3DuplexSelectView from './TCK3DuplexSelectView'
import ShakeButton from '../../../View/TCBetShakeButtonView'
import RNShakeEvent from 'react-native-shake-event';
import {betHome} from '../../../../resouce/theme'

export default class TCK3_MainView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            type: this.props.defaultPlayType,
        };
        SingletonDPS = MathControllerFactory.getInstance().getMathController(this.props.gameUniqueId);
    }

    static defaultProps = {
        //一开始默认的玩法
        defaultPlayType: "和值",
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
        return (
            <View style={styles.container}>
                {/*<ShakeButton shakeEvent={()=>this.byShake()}/>*/}
                {this.renderNumberView()}
            </View>
        );
    };

    renderNumberView() {
        let itemArray = []
        switch (this.state.type) {
            case '和值': {
                let playGameSetting = this.getSingleGamePrizeSettings('和值')
                if (!playGameSetting) return
                itemArray.push(<TCK3NumberSelectView titleName='和值'
                                                     key={1} areaIndex={0}
                                                     numberArray={SingletonDPS.getPlayTypeArray()}
                                                     prizeSettings={playGameSetting['prizeSettings']}
                                                     numberEvent={this.props.numberEvent}
                />)
            }
                break
            case '三同号通选': {
                itemArray.push(<TCK3SpecialKindSelectView titleName='号码' key={1} areaIndex={0}
                                                          numberArray={SingletonDPS.getPlayTypeArray()}
                                                          numberEvent={this.props.numberEvent} isNoNeedQDXDSQ={true}/>)
            }
                break
            case '三同号单选': {
                itemArray.push(<TCK3SpecialKindSelectView titleName='号码' key={1} areaIndex={0}
                                                          numberArray={SingletonDPS.getPlayTypeArray()}
                                                          numberEvent={this.props.numberEvent} isNoNeedQDXDSQ={true}/>)
            }
                break
            case '三不同号': {
                itemArray.push(<TCK3NumberSelectView titleName='号码' key={1} areaIndex={0}
                                                     numberArray={SingletonDPS.getPlayTypeArray()}
                                                     numberEvent={this.props.numberEvent}/>)
            }
                break
            case '三连号通选': {
                itemArray.push(<TCK3SpecialKindSelectView titleName='号码' key={1} areaIndex={0}
                                                          numberArray={SingletonDPS.getPlayTypeArray()}
                                                          numberEvent={this.props.numberEvent} isNoNeedQDXDSQ={true}/>)
            }
                break
            case '二同号复选': {
                itemArray.push(<TCK3NumberSelectView titleName='号码' key={1} areaIndex={0}
                                                     numberArray={SingletonDPS.getPlayTypeArray()}
                                                     numberEvent={this.props.numberEvent}/>)
            }
                break
            case '二同号单选': {
                itemArray.push(<TCK3DuplexSelectView titleName='同号' key={1} areaIndex={0}
                                                     numberAddEvent={(e, p) => this._numberSpecialButtonCall(e, p)}
                                                     ref="ref1"
                                                     numberArray={SingletonDPS.getPlayTypeArray(0)}
                                                     numberEvent={this.props.numberEvent}
                                                     playTypeName={SingletonDPS.getPlayTypeName()}/>)
                itemArray.push(<TCK3DuplexSelectView titleName='不同号' key={2} areaIndex={1}
                                                     numberAddEvent={(e, p) => this._numberSpecialButtonCall(e, p)}
                                                     ref="ref2"
                                                     numberArray={SingletonDPS.getPlayTypeArray(1)}
                                                     numberEvent={this.props.numberEvent}
                                                     playTypeName={SingletonDPS.getPlayTypeName()}/>)
            }
                break
            case '二不同号': {
                itemArray.push(<TCK3NumberSelectView titleName='号码' key={1} areaIndex={0}
                                                     numberArray={SingletonDPS.getPlayTypeArray()}
                                                     numberEvent={this.props.numberEvent}/>)

            }
                break
            case '和值大小单双': {
                let playGameSetting = this.getSingleGamePrizeSettings('和值大小单双')
                if (!playGameSetting) return
                // itemArray.push(<TCK3NumberSelectView titleName='号码' key={1} areaIndex={0}
                //                                      numberArray={SingletonDPS.getPlayTypeArray()}
                //                                      numberEvent={this.props.numberEvent}
                //                                      isNoNeedQDXDSQ={true}
                //                                      prizeSettings={playGameSetting['prizeSettings']}/>)
                itemArray.push(<TCK3SpecialKindSelectView titleName='号码' key={1} areaIndex={0}
                                                          numberArray={SingletonDPS.getPlayTypeArray()}
                                                          prizeSettings={playGameSetting['prizeSettings']}
                                                          numberEvent={this.props.numberEvent} isNoNeedQDXDSQ={true}/>)

            }
                break

            case '二不同号胆拖': {
                itemArray.push(<TCK3DuplexSelectView titleName='胆码' key={1} areaIndex={0}
                                                     numberAddEvent={(e, p) => this._numberButtonCall(e, p)}
                                                     ref="ref1"
                                                     numberArray={SingletonDPS.getPlayTypeArray()}
                                                     numberEvent={this.props.numberEvent}
                                                     isNoNeedQDXDSQ={true}/>)
                itemArray.push(<TCK3DuplexSelectView titleName='拖码' key={2} areaIndex={1}
                                                     numberAddEvent={(e, p) => this._numberButtonCall(e, p)}
                                                     ref="ref2"
                                                     numberArray={SingletonDPS.getPlayTypeArray()}
                                                     numberEvent={this.props.numberEvent}
                                                     isNoNeedQDXDSQ={true}/>)
            }
                break
            case '猜一个号': {
                itemArray.push(<TCK3NumberSelectView titleName='号码' key={1} areaIndex={0}
                                                     numberArray={SingletonDPS.getPlayTypeArray()}
                                                     numberEvent={this.props.numberEvent}/>)
            }
                break
        }
        return itemArray;
    }

    getSingleGamePrizeSettings(playMath) {
        let pys = SingletonDPS.getPlayTypeIdWithPlayType(playMath)
        if (pys && TCGameSetting) {
            let playGameSetting = TCGameSetting.content['allGamesPrizeSettings'][this.props.gameUniqueId]['singleGamePrizeSettings'][pys]
            return playGameSetting
        }
        return null
    }

    setPlayMathWith(mathName) {
        this.props.type = mathName;
        this.setState({
            type: mathName
        })
    }

    _numberSpecialButtonCall(number, areaIndex) {
        //重号区点击
        // 如果已经有号码清空
        // 判断单号区是否存在该号码 如果存在 清空 不让这个号码被选中
        // 否则被选中


        //单号区
        // 如果已经有号码清空
        // 判断重号区是否存在该号码 如果存在 清空 不让这个号码被选中
        // 否则被选中

        let duplexSelectViewC = this.refs['ref1'];
        let duplexSelectViewD = this.refs['ref2'];
        // RCTDeviceEventEmitter.emit('K3NumberCall', areaIndex, number, true);
        this.props.numberEvent.userNumberCall(areaIndex, number, true);
        let CHQ = SingletonDPS.getUnAddedArrByIndex(0)
        let DHQ = SingletonDPS.getUnAddedArrByIndex(1)
        if (areaIndex == 0) {
            if (DHQ.length > 0)
                duplexSelectViewD.resetNumberViewWithNumber(number.substr(0, 1))
        } else {
            if (CHQ.length > 0) {
                duplexSelectViewC.resetNumberViewWithNumber(number + '' + number)
            }
        }

    }


    _numberButtonCall(number, areaIndex) {
        //重号区点击
        // 如果已经有号码清空
        // 判断单号区是否存在该号码 如果存在 清空 不让这个号码被选中
        // 否则被选中


        //单号区
        // 如果已经有号码清空
        // 判断重号区是否存在该号码 如果存在 清空 不让这个号码被选中
        // 否则被选中

        let duplexSelectViewC = this.refs['ref1']
        let duplexSelectViewD = this.refs['ref2']
        // RCTDeviceEventEmitter.emit('K3NumberCall', areaIndex, number, true);
        this.props.numberEvent.userNumberCall(areaIndex, number, true);

        let CHQ = SingletonDPS.getUnAddedArrByIndex(0)
        let DHQ = SingletonDPS.getUnAddedArrByIndex(1)
        if (areaIndex == 0) {
            if (DHQ.length > 0)
                duplexSelectViewD.resetNumberViewWithNumber(number)
            if (CHQ.length > 1) {
                let resetNum = number === CHQ[0] ? CHQ[1] : CHQ[0]

                duplexSelectViewC.resetNumberViewWithNumber(resetNum)
                SingletonDPS.removeUnAddedNumberByIndex(0, resetNum)
            }
        } else {
            if (CHQ.length > 0) {
                duplexSelectViewC.resetNumberViewWithNumber(number)
            }
        }

    }

    byShake() {
        if (this.props.shakeEvent == null) return
        this.props.shakeEvent()
    }
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: betHome.betMidBg
    }
});