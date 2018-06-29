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

import TCBetChoiceTitleView from '../../../View/TCBetChoiceTitleView'
import {width, indexBgColor, commonNumBallStyles, betHome, Size} from '../../../../resouce/theme'
import TCQDXDSQBarView from "../../../View/TCQDXDSQBarView";

export default class TCChongQing_numberSelectView extends React.PureComponent {

    constructor(state) {
        super(state);
        this.state = {
            selectedButton: null
        };
    }

    static defaultProps = {
        titleName: '',
        numberArray: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        dsStyle: false,
        areaIndex: '0',
        bigSize: false,
        prizeSettings: null,
        qdxdsArray: ['全', '大', '小', '单', '双', '清',]
    };

    componentDidMount() {
    }

    componentWillMount(){

    }
    componentWillUnmount() {
    }

    render() {
        JXLog("TCSSC------------ball---render-----")
        if (!this.props.isNoNeedQDXDSQ) {
            this.numberCount = parseInt((width - 31 - 6) / 60);
        }
        let contentView = null;
        if (!this.props.isNoNeedQDXDSQ) {
            contentView = <View style={styles.container1}>
                <TCQDXDSQBarView qdxdsArray={this.props.qdxdsArray} areaIndex={this.props.areaIndex}
                                 titleName={this.props.titleName} numberEvent={this.props.numberEvent}/>
                <View style={[styles.rightViewStyle1,{
                    marginLeft: 31 + (width - this.numberCount*60+20-31-6) / 2,  //对齐全大小单双清
                }]}>
                    {this.getAllNumbers()}
                </View>
            </View>;
        } else {
            contentView = <View style={styles.container}>
                <View style={[styles.leftViewStyle, this.props.prizeSettings && styles.leftViewWithOdds]}>
                    <TCBetChoiceTitleView titleName={this.props.titleName}/>
                    {this.props.prizeSettings &&
                    <TCBetChoiceTitleView titleName='赔率' style={{marginTop: 10}} isGrayBackground={true}/>
                    }
                </View>

                <View style={styles.rightViewStyle}>
                    {this.getAllNumbers()}
                </View>
            </View>
        }
        return contentView


    }

    getAllNumbers() {
        var itemArr = [];
        //return itemArr;
        let numberArray = this.props.numberArray
        if (this.props.dsStyle) {
            numberArray = ['大', '小', '单', '双']
        }
        let areaIndex = this.props.areaIndex;
        let prizeAmount = this.props.prizeSettings;

        for (let i = 0; i < numberArray.length; i++) {
            if (this.props.dsStyle) {
                itemArr.push(<NumberView numberEvent={this.props.numberEvent} number={numberArray[i]} key={i}
                                         areaIndex={areaIndex}
                                         selectedEvent={(e) => this.buttonCall(e)} bigSize={this.props.bigSize}
                                         isNoNeedQDXDSQ={this.props.isNoNeedQDXDSQ}/>)
            } else {
                let odds = 0;
                if (prizeAmount) {
                    for (let j = 0; j < prizeAmount.length; j++) {
                        let set = prizeAmount[j];
                        if (set.prizeNameForDisplay == numberArray[i]) {
                            odds = set.prizeAmount;
                            break;
                        }
                    }
                }
                itemArr.push(<NumberView numberEvent={this.props.numberEvent} number={numberArray[i]} key={i}
                                         areaIndex={areaIndex}
                                         bigSize={this.props.bigSize} myOdds={odds}
                                         isNoNeedQDXDSQ={this.props.isNoNeedQDXDSQ}/>)
            }
        }
        showItemArray = itemArr
        return itemArr;
    }

    buttonCall(e) {
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
        selectedEvent: null,
        myOdds: 0,
    }

    componentDidMount() {
        this.listener = RCTDeviceEventEmitter.addListener('TCChongQing_numberSelectView_clear', () => {
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
        if (this.props.myOdds <= 0) {
            return (
                <TouchableOpacity style={[this.getNumberStyle(), !this.props.isNoNeedQDXDSQ ? {
                    marginTop: 0,
                    marginBottom: 15,
                } : {}]} onPress={() => this.numberSelected()}>
                    <Text style={this.getTitleStyle()}>{this.props.number}</Text>
                </TouchableOpacity>
            )
        } else {
            return (
                <View style={styles.numberItemStyle}>
                    <TouchableOpacity style={this.getNumberStyle()} onPress={() => this.numberSelected()}>
                        <Text style={this.getTitleStyle()}>{this.props.number}</Text>
                    </TouchableOpacity>
                    <Text style={{
                        marginLeft: -20,
                        fontSize: Size.font12,
                        color: betHome.cpOdd,
                        marginTop: 3
                    }}>{this.props.myOdds}</Text>
                </View>
            )
        }
    }

    getNumberStyle() {
        let style = {}
        if (this.state.selected) {
            style = commonNumBallStyles.numberViewSelectedStyle
        } else {
            style = commonNumBallStyles.numberViewStyle
        }
        if (this.props.bigSize) {
            style = [style, {width: 70}]
        }
        return style
    }

    getTitleStyle() {
        let style = {}
        if (this.state.selected) {
            style = commonNumBallStyles.numberViewTitleSelectedStyle;
        } else {
            style = commonNumBallStyles.numberViewTitleStyle
        }
        if (this.props.bigSize) {
            style = [style, {width: 65, textAlign: 'center'}]
        }
        return style;
    }

    numberSelected() {
        if (this.props.selectedEvent != null) {
            this.props.selectedEvent(this)
        }
        this.props.numberEvent.userNumberCall(this.props.areaIndex, this.props.number, !this.state.selected)
        this.setState({
            selected: !this.state.selected
        })
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
        borderBottomWidth: 0.5,
        borderColor: betHome.betMidBorder,
    },
    rightViewStyle: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 10,
        marginLeft: 10,
        width: width - (Platform.OS == 'ios' ? 60 : 50)
    },
    leftViewStyle: {
        marginLeft: 10,
        marginRight: 10,
        justifyContent: 'center',
        width: 50,
    },
    numberItemStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 60,
        height: 50,
        marginTop: 10,
        marginRight: 20,
        marginLeft: 20,
        marginBottom: 10
    },
    leftViewWithOdds: {
        justifyContent: 'flex-start',
        marginTop: 15,
    },

    container1: {
        flex: 1,
    },
    rightViewStyle1: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: (width - 31-6) ,
    },

});