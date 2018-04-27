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

import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter'
import Toast from '../../../../../Common/JXHelper/JXToast';

import MarkSix_DPS from '../data/TCShanDong115_DPS'
import {MathControllerFactory} from 'lottery-core'

let SingletonDPS = null;


import TCShangDong115NumberSelectView from './TCShangDong115NumberSelectView'
import TCShangDong115DuplexSelectView from './TCShangDong115DuplexSelectView'
import ShakeButton from '../../../View/TCBetShakeButtonView'
import RNShakeEvent from 'react-native-shake-event';

import {betHome} from '../../../../resouce/theme'

export default class TCMarkSix_MainView extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            type:this.props.defaultPlayType,
        };
        SingletonDPS = MathControllerFactory.getInstance().getMathController(this.props.gameUniqueId);
    }

    static defaultProps={
        //一开始默认的玩法
        defaultPlayType:"任选一",
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
            case '任选一':
            case '任选二':
            case '任选三':
            case '任选四':
            case '任选五':
            case '任选六':
            case '任选七':
            case '任选八': {
                itemArray.push(<TCShangDong115NumberSelectView titleName='选号' key={1} areaIndex={0} ref="ref1"  numberEvent={this.props.numberEvent}
                />)
            }
                break
            case '前一直选': {
                itemArray.push(<TCShangDong115NumberSelectView titleName='万位' key={1} areaIndex={0} ref="ref1" numberEvent={this.props.numberEvent}
                />)
            }
                break
            case '前二组选': {
                itemArray.push(<TCShangDong115NumberSelectView titleName='选号' key={1} areaIndex={0} ref="ref1"numberEvent={this.props.numberEvent}
                />)
            }
                break
            case '前二直选': {
                itemArray.push(<TCShangDong115NumberSelectView titleName='万位' key={1} areaIndex={0} ref="ref1"numberEvent={this.props.numberEvent}
                />)
                itemArray.push(<TCShangDong115NumberSelectView titleName='千位' key={2} areaIndex={1} ref="ref2"numberEvent={this.props.numberEvent}
                />)
            }
                break
            case '前三组选': {
                itemArray.push(<TCShangDong115NumberSelectView titleName='选号' key={1} areaIndex={0} ref="ref1"numberEvent={this.props.numberEvent}
                />)
            }
                break
            case '前三直选': {
                itemArray.push(<TCShangDong115NumberSelectView titleName='万位' key={1} areaIndex={0} ref="ref1"numberEvent={this.props.numberEvent}
                />)
                itemArray.push(<TCShangDong115NumberSelectView titleName='千位' key={2} areaIndex={1} ref="ref2"numberEvent={this.props.numberEvent}
                />)
                itemArray.push(<TCShangDong115NumberSelectView titleName='百位' key={3} areaIndex={2} ref="ref3"numberEvent={this.props.numberEvent}
                />)
            }
                break
            case '前二组选胆拖': {
                this.getDuplexItemArray(itemArray, 1)
            }
                break
            case '前三组选胆拖': {
                this.getDuplexItemArray(itemArray, 2)
            }
                break
            case '任选二胆拖': {
                this.getDuplexItemArray(itemArray, 1)
            }
                break
            case '任选三胆拖': {
                this.getDuplexItemArray(itemArray, 2)
            }
                break
            case '任选四胆拖': {
                this.getDuplexItemArray(itemArray, 3)
            }
                break
            case '任选五胆拖': {
                this.getDuplexItemArray(itemArray, 4)
            }
                break
            case '任选六胆拖': {
                this.getDuplexItemArray(itemArray, 5)
            }
                break
            case '任选七胆拖': {
                this.getDuplexItemArray(itemArray, 6)
            }
                break
            case '任选八胆拖': {
                this.getDuplexItemArray(itemArray, 7)
            }
                break
        }
        return itemArray;
    }

    getDuplexItemArray(itemArray, duplexMaxCount) {
        itemArray.push(<TCShangDong115DuplexSelectView numberAddEvent={(e, p) => this._numberButtonCall(e, p)}
                                                       titleName='胆码' maxSelectNumbers={duplexMaxCount} key={1}
                                                       areaIndex={0} ref="ref1" numberEvent={this.props.numberEvent}
                                                       isNoNeedQDXDSQ={true}
        />)

        itemArray.push(<TCShangDong115DuplexSelectView numberAddEvent={(e, p) => this._numberButtonCall(e, p)}
                                                       titleName='拖码' maxSelectNumbers={duplexMaxCount} key={2}
                                                       areaIndex={1} ref="ref2" numberEvent={this.props.numberEvent}
                                                       isNoNeedQDXDSQ={true}
        />)
    }

    setPlayMathWith(mathName) {
        this.props.type = mathName;
        console.log(mathName)
        this.setState({
            type: mathName
        })
    }

    _numberButtonCall(number, areaIndex) {
        //如果是胆拖区域先判断是否已经超过最大可以选数量 超出就不让选中return 否则继续
        let duplexSelectViewD = this.refs['ref1']
        let duplexSelectViewT = this.refs['ref2']

        let alreadyAddNumberCount = SingletonDPS.getUnAddedNumbersCountWithIndex(0)
        if (areaIndex == 0 && alreadyAddNumberCount >= duplexSelectViewD.props.maxSelectNumbers) {
            //超出
            Toast.showShortCenter(this.state.type + '最多只能选择' + duplexSelectViewD.props.maxSelectNumbers + '个胆码');
            duplexSelectViewD.resetNumberViewWithNumber(number)
            return false
        }
        console.log('areaIndex = ' + areaIndex)

        //把另外一个分区的当前号码清空
        if (areaIndex == 0) {
            console.log('清除 拖')
            duplexSelectViewT.resetNumberViewWithNumber(number)
        } else {
            console.log('清除 胆')
            duplexSelectViewD.resetNumberViewWithNumber(number)
        }
        //添加
        // RCTDeviceEventEmitter.emit('ShangDong115NumberCall', areaIndex, number, true)
        this.props.numberEvent.userNumberCall(areaIndex, number, true);

        return true
    }

    byShake() {
        if (this.props.shakeEvent == null) return
        this.props.shakeEvent()
    };
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: betHome.betMidBg
    }
});
