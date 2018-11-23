/**
 * Created by Sam on 2016/11/30.
 */
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

import {Size, width, indexBgColor, commonNumBallStyles, betHome} from '../../../../resouce/theme'
import TCQDXDSQBarView from "../../../View/TCQDXDSQBarView";
//特码种类
export default class TCMarkSixSpecialKind extends React.Component {

    constructor(state) {
        super(state);
        this.state = {
            selectedButton: null
        };
    }

    static defaultProps = {
        titleName: '选号',
        numberArray: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        areaIndex: '0',
        odds: '1.98',
        oddsArray: null,
        prizeSettings: null,
        prizeType_CUR: false,
        isNeedQDXDSQ: false,
    };

    render() {
        if (this.props.isNeedQDXDSQ) {
            this.numberCount = parseInt((width - 31 - 6) / 70);
        }
        let contentView = null;
        if (this.props.isNeedQDXDSQ) {
            contentView = <View style={styles.container1}>
                <TCQDXDSQBarView qdxdsArray={this.props.qdxdsArray} areaIndex={this.props.areaIndex}
                                 titleName={this.props.titleName} numberEvent={this.props.numberEvent}/>
                <View style={[styles.rightViewStyle1, {
                    marginLeft: 31 + (width - this.numberCount * 70 + 20 - 31 - 6) / 2,  //对齐全大小单双清
                }]}>
                    {this.getAllNumbers()}
                </View>
            </View>
        } else {
            contentView = <View style={styles.container}>
                <View style={styles.leftViewStyle}>
                    <TCBetChoiceTitleView titleName={this.props.titleName} style={{marginTop: 10}}/>
                    <TCBetChoiceTitleView titleName='赔率' style={{marginTop: 10}} isGrayBackground={true}/>
                </View>
                <View style={styles.rightViewStyle}>
                    {this.getAllNumbers()}
                </View>
            </View>
        }
        return (contentView);
    }

    getAllNumbers() {
        var itemArr = [];
        let numberArray = this.props.numberArray
        let areaIndex = this.props.areaIndex
        let prizeAmount = this.props.prizeSettings
        if (prizeAmount && !this.props.prizeType_CUR) {
            for (let i = 0; i < prizeAmount.length; i++) {
                let set = prizeAmount[i]
                itemArr.push(<NumberView number={set.prizeNameForDisplay} myOdds={set.prizeAmount} key={i}
                                         areaIndex={areaIndex} numberEvent={this.props.numberEvent}
                                         isNeedQDXDSQ={this.props.isNeedQDXDSQ}/>)
            }
            return itemArr
        } else if (prizeAmount && this.props.prizeType_CUR) {
            for (let i = 0; i < numberArray.length; i++) {
                if (this.props.prizeType_CUR == numberArray[i]) {
                    let set = prizeAmount[0]
                    itemArr.push(<NumberView number={numberArray[i]} myOdds={set.prizeAmount} key={i}
                                             areaIndex={areaIndex} numberEvent={this.props.numberEvent}
                                             isNeedQDXDSQ={this.props.isNeedQDXDSQ}/>)
                } else {
                    let set = prizeAmount[1]
                    itemArr.push(<NumberView number={numberArray[i]} key={i} areaIndex={areaIndex}
                                             myOdds={set.prizeAmount} numberEvent={this.props.numberEvent}
                                             isNeedQDXDSQ={this.props.isNeedQDXDSQ}/>)
                }
            }
            return itemArr;
        } else {
            for (let i = 0; i < numberArray.length; i++) {
                if (this.props.oddsArray) {
                    itemArr.push(<NumberView number={numberArray[i]} myOdds={this.props.oddsArray[i]} key={i}
                                             areaIndex={areaIndex} numberEvent={this.props.numberEvent}
                                             isNeedQDXDSQ={this.props.isNeedQDXDSQ}/>)
                } else {
                    itemArr.push(<NumberView number={numberArray[i]} key={i} areaIndex={areaIndex}
                                             myOdds={this.props.odds} numberEvent={this.props.numberEvent}
                                             isNeedQDXDSQ={this.props.isNeedQDXDSQ}/>)
                }
            }
            return itemArr;
        }
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
        this.listener = RCTDeviceEventEmitter.addListener('TCMarkSixSelectView_clear', () => {
            this.reset()
        })

        this.listener2 = RCTDeviceEventEmitter.addListener('randomSelectedNumber', (areaIndex, number,isQDXDSQ,isCancel) => {
            if (this.props.areaIndex == areaIndex && this.props.number == number) {
                if(!isQDXDSQ) {
                    this.setState({
                        selected: true
                    })
                    this.props.numberEvent.pcddUserNumberCall(this.props.areaIndex, this.props.number, true);
                }else{
                    this.setState({
                        selected: !isCancel
                    })
                }
                // RCTDeviceEventEmitter.emit('TCMarkSixSelectView_numberSelected', this.props.areaIndex, this.props.number, true);


            }
        });
        this.listener3 = RCTDeviceEventEmitter.addListener('qdxds_NumberCall_clear', (areaIndex) => {

            if (areaIndex == this.props.areaIndex) {
                this.reset();
            }
        })

        this.listener4 = RCTDeviceEventEmitter.addListener('randomSelectedNumber_unselected', (areaIndex, number) => {
            if (this.props.areaIndex == areaIndex && this.props.number == number) {
                this.setState({
                    selected: false
                });
            }
        })
    }

    componentWillUnmount() {
        this.listener && this.listener.remove();
        this.listener2 && this.listener2.remove();
        this.listener3 && this.listener3.remove();
        this.listener4 && this.listener4.remove();

    }

    render() {
        return (
            <View style={styles.numberItemStyle}>
                <TouchableOpacity style={[this.getNumberStyle(), this.props.isNeedQDXDSQ ? {
                    marginTop: 0,
                    marginBottom: 5,
                } : {}]} onPress={() => this.numberSelected()}>
                    <Text style={this.getTitleStyle()}>{this.props.number}</Text>
                </TouchableOpacity>
                <Text
                    style={{
                        marginLeft: -20,
                        fontSize: Size.font12,
                        color: betHome.cpOdd,
                        marginTop: 0
                    }}>{this.props.myOdds}</Text>
            </View>
        )
    }

    getNumberStyle() {
        if (this.state.selected) {
            return [commonNumBallStyles.numberViewSelectedStyle, {
                width: 50,
                height: 50,
                padding: 5,
                borderRadius: 25
            }]
        } else {
            return [commonNumBallStyles.numberViewStyle, {
                width: 50,
                height: 50,
                padding: 5,
                borderRadius: 25
            }]
        }
    }

    getTitleStyle() {
        if (this.state.selected) {
            return [commonNumBallStyles.numberViewTitleSelectedStyle, {fontSize: Size.font17}];
        }
        return [commonNumBallStyles.numberViewTitleStyle, {fontSize: Size.font17}];
    }

    numberSelected() {
        if (this.props.selectedEvent != null) {
            this.props.selectedEvent(this)
        }
        this.setState({
            selected: !this.state.selected
        })
        // RCTDeviceEventEmitter.emit('TCMarkSixSelectView_numberSelected', this.props.areaIndex, this.props.number, !this.state.selected);
        this.props.numberEvent.pcddUserNumberCall(this.props.areaIndex, this.props.number, !this.state.selected);


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
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginBottom: 10,
        width: width - 60
    },
    leftViewStyle: {
        marginLeft: 10,
        marginRight: 10,
        marginTop: 12
    },
    numberItemStyle: {
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
        width: width - 31 - 6,
    },
});