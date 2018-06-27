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
    Dimensions
} from 'react-native';

import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter'
let showItemArray = [];
// let selectedButton = null
let areaIndex = ''
import {Size, width, indexBgColor, commonNumBallStyles, betHome} from '../../../../resouce/theme'
import TCBetChoiceTitleView from '../../../View/TCBetChoiceTitleView'
import TCQDXDSQBarView from "../../../View/TCQDXDSQBarView";

export default class TCK3NumberSelectView extends React.PureComponent {

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
        numberAddEvent: null
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
        //对齐全大小单双清  因为这里 width 变为70
        if (!this.props.isNoNeedQDXDSQ) {
            this.numberCount = parseInt((width - 31 - 6) / 70);
        }
        let contentView = null;
        if (this.props.isNoNeedQDXDSQ) {
            contentView =  <View style={styles.container}>
                <View style={styles.leftViewStyle}>
                    <TCBetChoiceTitleView titleName={this.props.titleName} style={{marginTop: 20}}/>
                    {this.props.prizeSettings ? (
                        <TCBetChoiceTitleView titleName='赔率' style={{marginTop: 10}} isGrayBackground={true}/>) : null}
                </View>
                <View style={styles.rightViewStyle}>
                    {this.getAllNumbers()}
                </View>
            </View>;
        } else {
            contentView=<View style={styles.container1}>
                <TCQDXDSQBarView qdxdsArray={this.props.qdxdsArray} areaIndex={this.props.areaIndex}
                                 titleName={this.props.titleName} numberEvent={this.props.numberEvent}/>
                <View style={[styles.rightViewStyle1,{
                    marginLeft: 31 + (width - this.numberCount*70+20-31-6) / 2,  //对齐全大小单双清
                }]}>
                    {this.getAllNumbers()}
                </View>
            </View>;
        }

        return contentView;
    }

    getAllNumbers() {
        var itemArr = [];
        let numberArray = this.props.numberArray
        let areaIndex = this.props.areaIndex
        let prizeAmount = this.props.prizeSettings
        let odd = null
        for (let i = 0; i < numberArray.length; i++) {
            if (prizeAmount) {
                odd = prizeAmount[i]
            }
            if (this.props.numberAddEvent) {

                itemArr.push(<NumberView number={numberArray[i]} ref={'NumberView' + numberArray[i]} key={i}
                                         areaIndex={areaIndex} selectedEvent={(e, p)=>this.buttonCall(e, p)} numberEvent={this.props.numberEvent} isNoNeedQDXDSQ={this.props.isNoNeedQDXDSQ}/>)
            } else {
                itemArr.push(<NumberView number={numberArray[i]} ref={'NumberView' + numberArray[i]} key={i}
                                         myOdds={odd?odd.prizeAmount:null}
                                         areaIndex={areaIndex} numberEvent={this.props.numberEvent} isNoNeedQDXDSQ={this.props.isNoNeedQDXDSQ}/>)
            }
        }
        showItemArray = itemArr
        return itemArr;
    }

    buttonCall(number, areaIndex) {
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
            <View style={styles.numberItemStyle}>
                <TouchableOpacity style={[this.getNumberStyle(), !this.props.isNoNeedQDXDSQ ? {
                    marginTop: 0,
                    marginBottom: 15,
                } : {}]} onPress={()=>this.numberSelected()}>
                    <Text style={this.getTitleStyle()}>{this.props.number}</Text>
                </TouchableOpacity>
                {this.props.myOdds ? (<Text
                    style={{marginLeft: -20, fontSize: Size.font12, color:betHome.cpOdd , marginTop: 0}}>{this.props.myOdds}</Text>) : null}
            </View>
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
            this.props.numberEvent.userNumberCall(this.props.areaIndex, this.props.number,  !this.state.selected);
        }
    }

    reset() {
        this.setState({
            selected: false
        })
    }

    clear() {
        this.props.numberEvent.userNumberCall(this.props.areaIndex, this.props.number, false);
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#F5FCFF',
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
        width: 60,
    }, numberItemStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 50,
        height: 50,
        marginTop: 10,
        marginRight: 10,
        marginLeft: 10,
        marginBottom: 20,
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