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

// let selectedButton = null
let areaIndex = ''
import TCBetChoiceTitleView from '../../../View/TCBetChoiceTitleView'

import {Size, width, height, commonNumBallStyles, betHome, indexBgColor} from '../../../../resouce/theme'
import TCQDXDSQBarView from "../../../View/TCQDXDSQBarView";

export default class TCK3DuplexSelectView extends React.Component {

    constructor(state) {
        super(state);
        this.state = {
            selectedButton: null
        };
    }

    static defaultProps = {
        titleName: '',
        numberArray: [1, 2, 3, 4, 5, 6],
        areaIndex: '0',
        maxSelectNumbers: 1,
        numberAddEvent: null
    };

    componentDidMount() {
    }

    componentWillMount() {

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
            </View>;
        } else {
            contentView = <View style={styles.container1}>
                <TCQDXDSQBarView qdxdsArray={this.props.qdxdsArray} areaIndex={this.props.areaIndex}
                                 titleName={this.props.titleName} numberEvent={this.props.numberEvent}/>
                <View style={[styles.rightViewStyle1,{
                    marginLeft: 31 + (width - this.numberCount*60+20-31-6) / 2,  //对齐全大小单双清
                }]}>
                    {this.getAllNumbers()}
                </View>
            </View>;
        }
        return contentView;
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
                                     areaIndex={areaIndex} selectedEvent={(e, p) => this.buttonCall(e, p)}
                                     numberEvent={this.props.numberEvent} isNoNeedQDXDSQ={this.props.isNoNeedQDXDSQ}
                                     playTypeName={this.props.playTypeName}
            />)
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
        this.listener = RCTDeviceEventEmitter.addListener('K3NumberCall_clear', () => {
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
                return;
            }

            if (this.props.playTypeName === '二同号单选' && !isCancel && isQDXDSQ && this.props.number.substring(0, 1) === number.substring(0, 1)) {
                //添加操作才需要 判断

                // 同号与不同号 不能重复选
                this.props.numberEvent.userNumberCall(this.props.areaIndex, this.props.number, false);

                if (this.state.selected) {
                    this.setState({
                        selected: false
                    });
                }
            }
        });
        this.listener3 = RCTDeviceEventEmitter.addListener('qdxds_NumberCall_clear', (areaIndex) => {

            if (areaIndex == this.props.areaIndex) {
                this.reset();
            }
        });
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
        this.setState({selected: !this.state.selected})
        if (this.props.selectedEvent != null && !this.state.selected) {
            this.props.selectedEvent(this.props.number, this.props.areaIndex)
        } else {
            // RCTDeviceEventEmitter.emit('K3NumberCall', this.props.areaIndex, this.props.number, !this.state.selected);
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
        // RCTDeviceEventEmitter.emit('K3NumberCall', this.props.areaIndex, this.props.number, false);
        this.props.numberEvent.userNumberCall(this.props.areaIndex, this.props.number, false);
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        borderBottomWidth: 0.5,
        borderColor: betHome.betMidBorder,
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