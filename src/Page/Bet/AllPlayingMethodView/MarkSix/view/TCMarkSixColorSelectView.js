/**
 * Created by Sam on 2016/11/30.
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
import TCBetChoiceTitleView from '../../../View/TCBetChoiceTitleView'
import {Size, width, commonNumBallStyles, betHome, indexBgColor} from '../../../../resouce/theme'

//特码种类
export default class TCMarkSixColorSelectView extends React.Component {

    constructor(state) {
        super(state);
        this.state = {
            selectedButton: null
        };
    }

    static defaultProps = {
        titleName: '种类',
        numberArray: [],
        areaIndex: '0',
        odds: '1.98',
        oddsArray: null,
        prizeSettings: null
    };

    componentDidMount() {
    }

    componentWillUnmount() {

    }

    shouldComponentUpdate(nextProps, nextState) {
        return true
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.leftViewStyle}>
                    <TCBetChoiceTitleView titleName={this.props.titleName} style={{marginTop: 30}}/>
                </View>

                <View style={styles.rightViewStyle}>
                    {this.getAllNumbers()}
                </View>
            </View>
        );
    }

    getAllNumbers() {
        var itemArr = [];
        let numberArray = this.props.numberArray
        let areaIndex = this.props.areaIndex
        let i = 0
        let prizeAmount = this.props.prizeSettings

        for (let item in numberArray) {
            let a = numberArray[item]
            if (this.props.oddsArray) {
                itemArr.push(<NumberView number={prizeAmount[i].prizeNameForDisplay} key={i} areaIndex={areaIndex}
                                         describe={a} odds={prizeAmount[i].prizeAmount} numberEvent={this.props.numberEvent}/>)
            } else {
                itemArr.push(<NumberView number={prizeAmount[i].prizeNameForDisplay} key={i} areaIndex={areaIndex}
                                         describe={a} odds={this.props.odds} numberEvent={this.props.numberEvent}/>)
            }
            i++
        }
        return itemArr;
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
        selectedEvent: null,
        describe: ''
    }

    componentDidMount() {
        this.listener = RCTDeviceEventEmitter.addListener('TCMarkSixSelectView_clear', () => {
            this.reset()
        })

        this.listener2 = RCTDeviceEventEmitter.addListener('randomSelectedNumber', (areaIndex, number) => {
            if (this.props.areaIndex == areaIndex && this.props.number == number) {
                // RCTDeviceEventEmitter.emit('TCMarkSixSelectView_numberSelected', this.props.areaIndex, this.props.number, true);
                //避免多次调用，如果是添加 才调用，取消的话，就不需要调用，因为已经删除了，只需要改变状态
                this.props.numberEvent.markSixUserNumberCall(this.props.areaIndex, this.props.number, true);
                this.setState({
                    selected: true
                });


            }
        })

        this.listener4 = RCTDeviceEventEmitter.addListener('randomSelectedNumber_unselected', (areaIndex, number) => {
            if (this.props.areaIndex == areaIndex && this.props.number == number) {
                this.setState({
                    selected: false
                });
            }
        });
    }

    componentWillUnmount() {
        this.listener && this.listener.remove();
        this.listener2 && this.listener2.remove();
        this.listener4 && this.listener4.remove();

    }

    render() {
        return (
            <View style={styles.numberItemStyle}>
                <TouchableOpacity style={this.getNumberStyle()} onPress={()=>this.numberSelected()}>
                    <Text style={this.getTitleStyle()}>{this.props.number}</Text>
                    <Text style={this.getDescTitleStyle()}> {this.props.describe} </Text>
                </TouchableOpacity>
                <Text
                    style={{marginLeft: -20, fontSize: Size.font12, color: betHome.cpOdd, marginTop: 3,marginBottom:20}}>赔率 {this.props.odds}</Text>
            </View>
        )
    }

    getNumberStyle() {
        let bgColor = betHome.betMidBg
        if (this.props.number == '红波') {
            bgColor = betHome.markSixRedBo
        } else if (this.props.number == '蓝波') {
            bgColor = betHome.markSixBlueBo
        } else {
            bgColor = betHome.markSixGreenBo
        }

        if (this.state.selected) {
            return [styles.numberViewStyle, {backgroundColor: bgColor}]
        } else {
            return styles.numberViewStyle
        }
    }

    getTitleStyle() {
        let textColor = '#ffffff'
        if (this.props.number == '红波') {
            textColor = betHome.markSixRedBo
        } else if (this.props.number == '蓝波') {
            textColor = betHome.markSixBlueBo
        } else {
            textColor = betHome.markSixGreenBo
        }

        if (this.state.selected) {
            return [commonNumBallStyles.numberViewTitleSelectedStyle, {fontSize: Size.font18, marginTop: 13}];
        }
        return [commonNumBallStyles.numberViewTitleStyle, {fontSize: Size.font18, color: textColor, marginTop: 13}];
    }

    getDescTitleStyle() {
        let textColor = '#ffffff'
        if (this.props.number == '红波') {
            textColor = betHome.markSixRedBo
        } else if (this.props.number == '蓝波') {
            textColor = betHome.markSixBlueBo
        } else {
            textColor = betHome.markSixGreenBo
        }

        if (this.state.selected) {
            return [{color: '#E6E6E6', fontSize: Size.font14, marginTop: 5, padding: 10}];
        }
        return [{color: '#E6E6E6', fontSize: Size.font14, marginTop: 5, padding: 10}, {color: textColor}];
    }

    numberSelected() {
        if (this.props.selectedEvent != null) {
            this.props.selectedEvent(this)
        }
        this.setState({
            selected: !this.state.selected
        })
        // RCTDeviceEventEmitter.emit('TCMarkSixSelectView_numberSelected', this.props.areaIndex, this.props.number, !this.state.selected);
        this.props.numberEvent.markSixUserNumberCall(this.props.areaIndex, this.props.number, !this.state.selected);

    }

    reset() {
        this.setState({
            selected: false
        })
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        borderColor: betHome.betMidBorder,
        marginTop: 5
    },
    rightViewStyle: {
        // flexDirection: 'row',
        // flexWrap: 'wrap',
        justifyContent: 'center',
        marginBottom: 10,
        width: width - 60,
        backgroundColor: betHome.betMidBg,
    },
    leftViewStyle: {
        marginLeft: 10,
        marginRight: 0,
        marginTop: 12,
        width: 50,
    },
    leftTitleStyle: {
        backgroundColor: '#FAEBD7',
        borderColor: 'gray',
        borderWidth: 0.5,
        padding: 5,
        borderRadius: 3,
    },
    numberViewStyle: {
        backgroundColor: '#ffffff',
        borderRadius: 5,
        marginTop: 10,
        marginRight: 20,
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center',
        width: width - 80,
        height: 100
    },
    numberItemStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        width: width - 60,
        height: 110,
        marginRight: 10,
        marginLeft: 10,
        marginTop: 20,

    }
});