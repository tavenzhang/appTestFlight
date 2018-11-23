/**
 * Created by Sam on 2016/12/5.
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Dimensions
} from 'react-native';

import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter'
let showItemArray = [];
import {Size, width, betHome, commonNumBallStyles, indexBgColor} from '../../../../resouce/theme'
// let selectedButton = null
let areaIndex = ''

import TCBetChoiceTitleView from '../../../View/TCBetChoiceTitleView'

export default class TCShangDong115NumberSelectView extends React.Component {

    constructor(state) {
        super(state);
        this.state = {
            selectedButton: null
        };
    }

    static defaultProps = {
        titleName: '',
        numberArray: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11'],
        areaIndex: '0',
        maxSelectNumbers: 1,
        numberAddEvent: null
    };

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.leftViewStyle}>
                    <TCBetChoiceTitleView titleName={this.props.titleName}/>
                </View>
                <View>
                    <View style={{flexDirection: 'row', marginTop: 10, alignItems: 'center'}}>
                        <Text style={{fontSize:Size.default,color:betHome.betTitle}}>{this.getAreaTitle()}</Text>
                        <Text
                            style={{color: betHome.betTipContent, fontSize: Size.font12}}>{this.getAreaInfoTitle()}</Text>
                    </View>
                    <View style={styles.rightViewStyle}>
                        {this.getAllNumbers()}
                    </View>
                </View>
            </View>
        );
    }

    getAreaTitle() {
        if (this.props.areaIndex == 0) {
            return '我认为必出的号'
        }
        return '我认为可能出的号'
    }

    getAreaInfoTitle() {
        if (this.props.areaIndex == 0) {
            return '    至少选1个，最多' + this.props.maxSelectNumbers + '个'
        }
    }

    getAllNumbers() {
        var itemArr = [];
        let numberArray = this.props.numberArray
        let areaIndex = this.props.areaIndex
        for (let i = 0; i < numberArray.length; i++) {
            itemArr.push(<NumberView ref={'NumberView' + numberArray[i]} number={numberArray[i]} key={i}
                                     areaIndex={areaIndex} selectedEvent={(e, p)=>this.buttonCall(e, p)} numberEvent={this.props.numberEvent}/>)
        }
        showItemArray = itemArr
        return itemArr;
    }

    buttonCall(number, areaIndex) {
        //如果是胆拖区域先判断是否已经超过最大可以选数量 超出就不让选中return 否则继续
        //把另外一个分区的当前号码清空
        if (this.props.numberAddEvent == null) return
        this.props.numberAddEvent(number, areaIndex)
    }

    //清除指定号码
    resetNumberViewWithNumber(number) {
        let refStr = 'NumberView' + number
        let NumberView = this.refs[refStr]
        NumberView.reset()
        NumberView.clear()
    }

}


class NumberView extends React.Component {

    constructor(state) {
        super(state);
        this.state = {
            selected: false
        };
    }

    static defaultProps = {
        number: '',
        areaIndex: '0',
        selectedEvent: null
    }

    componentDidMount() {
        this.listener = RCTDeviceEventEmitter.addListener('ShangDong115NumberCall_clear', () => {
            this.reset()
        })

        this.listener2 = RCTDeviceEventEmitter.addListener('randomSelectedNumber', (areaIndex, number) => {
            if (this.props.areaIndex == areaIndex && this.props.number == number) {
                this.setState({selected: true})
                this.props.numberEvent.userNumberCall(this.props.areaIndex, this.props.number, true);

            }
        })
    }

    componentWillUnmount() {
        this.listener && this.listener.remove()
        this.listener2 && this.listener2.remove()
    }

    render() {
        return (
            <TouchableOpacity style={this.getNumberStyle()} onPress={()=>this.numberSelected()}>
                <Text style={this.getTitleStyle()}>{this.props.number}</Text>
            </TouchableOpacity>
        )
    }

    getNumberStyle() {
        if (this.state.selected) {
            return commonNumBallStyles.numberViewSelectedStyle
        } else {
            return commonNumBallStyles.numberViewStyle
        }
    }

    getTitleStyle() {
        if (this.state.selected) {
            return commonNumBallStyles.numberViewTitleSelectedStyle;
        }
        return commonNumBallStyles.numberViewTitleStyle;
    }

    numberSelected() {
        this.setState({selected: !this.state.selected})
        if (this.props.selectedEvent != null && !this.state.selected) {
            this.props.selectedEvent(this.props.number, this.props.areaIndex)
        } else {
            this.props.numberEvent.userNumberCall(this.props.areaIndex, this.props.number, !this.state.selected);
        }
    }

    reset() {
        this.setState({
            selected: false
        })
        return this
    }

    clear() {
        // RCTDeviceEventEmitter.emit('ShangDong115NumberCall', this.props.areaIndex, this.props.number, false);
        this.props.numberEvent.userNumberCall(this.props.areaIndex, this.props.number, false);

    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        borderBottomWidth: 0.5,
        borderColor:betHome.betMidBorder ,
    },
    rightViewStyle: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 10,
        width: width - 50
    },
    leftViewStyle: {
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
    },
    leftTitleStyle: {
        backgroundColor: '#FAEBD7',
        borderColor: 'gray',
        borderWidth: 0.5,
        padding: 5,
        borderRadius: 3,
    },
    numberViewStyle: {
        backgroundColor: 'white',
        borderRadius: 30,
        marginTop: 10,
        marginRight: 20,
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'gray',
        borderWidth: 0.5
    }
});