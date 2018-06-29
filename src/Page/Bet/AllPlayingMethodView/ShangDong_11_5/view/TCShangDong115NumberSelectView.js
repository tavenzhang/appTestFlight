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
    Platform
} from 'react-native';

import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter'

let showItemArray = [];
// let selectedButton = null
let areaIndex = ''
import {width, betHome, indexBgColor, commonNumBallStyles} from '../../../../resouce/theme'
import TCBetChoiceTitleView from '../../../View/TCBetChoiceTitleView'
import TCQDXDSQBarView from "../../../View/TCQDXDSQBarView";

export default class TCShangDong115NumberSelectView extends React.PureComponent {

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
    };

    componentDidMount() {
    }

    componentWillMount() {

    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.state != nextState) {
            return false
        }
        return true
    }

    render() {
        //对齐全大小单双清  因为是wrap
        if (!this.props.isNoNeedQDXDSQ) {
            this.numberCount = parseInt((width - 31 - 6) / 60);
        }
        let contentView = null;
        if (this.props.isNoNeedQDXDSQ) {
            contentView = <View style={styles.container}>
                <View style={styles.leftViewStyle}>
                    <TCBetChoiceTitleView titleName={this.props.titleName}/>
                </View>

                <View style={styles.rightViewStyle}>
                    {this.getAllNumbers()}
                </View>
            </View>
        } else {
            contentView = <View style={styles.container1}>
                <TCQDXDSQBarView qdxdsArray={this.props.qdxdsArray} areaIndex={this.props.areaIndex}
                                 titleName={this.props.titleName} numberEvent={this.props.numberEvent}/>
                <View style={[styles.rightViewStyle1,{
                    marginLeft: 31 + (width - this.numberCount*60+20-31-6) / 2,  //对齐全大小单双清
                }]}>
                    {this.getAllNumbers()}
                </View>
            </View>
        }
        return contentView;
    }

    getAllNumbers() {
        var itemArr = [];
        let numberArray = this.props.numberArray
        let areaIndex = this.props.areaIndex
        for (let i = 0; i < numberArray.length; i++) {
            itemArr.push(<NumberView number={numberArray[i]} key={i} areaIndex={areaIndex}
                                     numberEvent={this.props.numberEvent}/>)
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


class NumberView extends React.PureComponent {

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
        });
        this.listener3 = RCTDeviceEventEmitter.addListener('qdxds_NumberCall_clear', (areaIndex) => {

            if (areaIndex == this.props.areaIndex) {
                this.reset();
            }
        })
    }

    componentWillUnmount() {
        this.listener && this.listener.remove();
        this.listener2 && this.listener2.remove();
        this.listener3 && this.listener3.remove();

    }

    render() {
        return (
            <TouchableOpacity style={[this.getNumberStyle(), !this.props.isNoNeedQDXDSQ ? {
                marginTop: 0,
                marginBottom: 15,
            } : {}]} onPress={() => this.numberSelected()}>
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
        this.props.numberEvent.userNumberCall(this.props.areaIndex, this.props.number, !this.state.selected);

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
        // backgroundColor: '#F5FCFF',
        flexDirection: 'row',
        borderBottomWidth: 0.5,
        borderColor: betHome.betMidBorder,
    },
    rightViewStyle: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 10,
        width: width - (Platform.OS == 'ios' ? 60 : 50)
    },
    leftViewStyle: {
        marginLeft: 10,
        marginRight: 10,
        justifyContent: 'center',
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
    },
    container1: {
        flex: 1,
    },
    rightViewStyle1: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: width - 31-6,
    },
});