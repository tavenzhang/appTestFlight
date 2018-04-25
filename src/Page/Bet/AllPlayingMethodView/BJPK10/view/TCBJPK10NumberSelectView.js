/**
 * Created by Sam on 2016/11/14.
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Dimensions,
    Image
} from 'react-native';

import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter'

let showItemArray = [];
import {width, indexBgColor, commonNumBallStyles, betHome} from '../../../../resouce/theme'

// let selectedButton = null
let areaIndex = ''
import TCBetChoiceTitleView from '../../../View/TCBetChoiceTitleView'
import {observer} from 'mobx-react/native';
import TCQDXDSQBarView from "../../../View/TCQDXDSQBarView";

export default class TCShangDong115NumberSelectView extends React.Component {

    constructor(state) {
        super(state);
        this.state = {
            selectedButton: null
        };
        this.numberCount=0;
    }

    static defaultProps = {
        titleName: '',
        numberArray: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        areaIndex: '0',
    };

    componentDidMount() {
    }

    componentWillMount() {
        //对齐全大小单双清  因为是wrap
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.state != nextState) {
            return false
        }
        return true
    }

    render() {
        this.numberCount= parseInt((width - 31-6)/60);
        return (
            <View style={styles.container}>
                <TCQDXDSQBarView qdxdsArray={this.props.qdxdsArray} areaIndex={this.props.areaIndex}
                                 titleName={this.props.titleName} numberEvent={this.props.numberEvent}/>
                <View style={[styles.rightViewStyle,{
                    marginLeft: 31 + (width - this.numberCount*60+20-31-6) / 2,  //对齐全大小单双清
                }]}>
                    {this.getAllNumbers()}
                </View>
            </View>
        );
    }

    getAllNumbers() {
        var itemArr = [];
        let numberArray = this.props.numberArray
        let areaIndex = this.props.areaIndex
        for (let i = 0; i < numberArray.length; i++) {
            itemArr.push(<NumberView numberEvent={this.props.numberEvent} number={numberArray[i]} key={i}
                                     areaIndex={areaIndex}/>)
        }
        showItemArray = itemArr
        return itemArr;
    }

    buttonCall(e) {
        if (this.state.selectedButton != null) {
            this.state.selectedButton.reset()
        }
        this.setState({
            selectedButton: e
        })
        areaIndex = e.props.areaIndex
    }
}


@observer
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

    shouldComponentUpdate(nextProps, nextState) {
        return this.state.selected !== nextState.selected;
    }


    componentDidMount() {
        this.listener = RCTDeviceEventEmitter.addListener('BJPK10NumberCall_clear', () => {
            this.reset();
        })

        this.listener2 = RCTDeviceEventEmitter.addListener('randomSelectedNumber', (areaIndex, number, isQDXDSQ, isCancel) => {
            if (this.props.areaIndex == areaIndex && this.props.number == number) {
                if (!isQDXDSQ) {
                    this.props.numberEvent.userNumberCall(this.props.areaIndex, this.props.number, true)
                    this.setState({
                        selected: true
                    })
                } else {
                    this.setState({
                        selected: !isCancel
                    })
                }

            }
        })

        this.listener3 = RCTDeviceEventEmitter.addListener('qdxds_NumberCall_clear', (areaIndex) => {

            if (areaIndex == this.props.areaIndex) {
                this.reset();
            }
        })


    }

    componentWillUnmount() {
        this.listener && this.listener.remove();
        this.listener2 && this.listener2.remove();
        this.listener3&& this.listener3.remove();
    }

    render() {
        return (
            <TouchableOpacity style={[this.getNumberStyle(), {
                marginTop: 0,
                marginBottom: 15,
            }]} onPress={() => this.numberSelected()}>
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
        if (this.props.selectedEvent != null) {
            this.props.selectedEvent(this)
        }
        this.setState({
            selected: !this.state.selected
        })

        this.props.numberEvent.userNumberCall(this.props.areaIndex, this.props.number, !this.state.selected)

        // RCTDeviceEventEmitter.emit('BJPK10NumberCall', this.props.areaIndex, this.props.number, !this.state.selected);
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
        // flexDirection: 'row',
    },
    rightViewStyle: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: width - 31-6,
    },

});