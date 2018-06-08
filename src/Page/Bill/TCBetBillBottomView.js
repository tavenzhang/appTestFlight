/**
 * Created by Sam on 2016/11/29.
 */
import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Dimensions,
    TouchableOpacity
} from 'react-native';

var {
    width
} = Dimensions.get('window');
import {Size, betHome,bottomNavHeight} from '../resouce/theme'

export default class TCBetHomeBottomView extends Component {
    constructor(state) {
        super(state);
        this.state = {};
    }

    static defaultProps = {
        rightButtonTitle: null,
        leftButtonCallEvent: null,
        rightButtonCallEvent: null,
        centerTitleOneLine: false,
        isIntelligenceBet: 0,//1:智能追号页面  2:下注付款页 支持普通追号
        totalAmount: 0,
        continueIssueNumber: 0,
        isShowPayButton: true,

    };

    componentDidMount() {

    }

    _resetWithNumbers(multiple, numberOfUnits, price) {
        this.setState({
            multiple: multiple,
            numberOfUnits: numberOfUnits,
            price: price
        })
    }

    render() {
        return (
            <View style={styles.bottomBarStyle}>
                {this.getLeftButton()}

                {this.getCenterView()}

                {this.getRightButton()}

            </View>
        );
    }

    getRightButton() {
        if (this.props.isShowPayButton) {
            return (
                <TouchableOpacity style={styles.rightTitleStyle} onPress={() => this.payButtonCall()}>
                    <Text
                        style={{
                            fontWeight: 'bold',
                            marginLeft: 5,
                            marginRight: 5,
                            fontSize: Size.font19,
                            color: betHome.btmBtnTxt
                        }}>付款</Text>
                </TouchableOpacity>);
        } else {
            return (
                <View style={[styles.rightTitleStyle, {backgroundColor: '#f5f5f5'}]}>
                    <Text
                        style={{
                            fontWeight: 'bold',
                            marginLeft: 5,
                            marginRight: 5,
                            fontSize: Size.font19,
                            color: 'grey'
                        }}>付款</Text>
                </View>)
        }
    }

    getCenterView() {
        if (this.props.centerTitleOneLine) {
            return (
                <View style={styles.container}>
                    <Text style={{color: betHome.totalMoney, marginTop: 3, fontSize: Size.font16}} ellipsizeMode='tail'
                          numberOfLines={1}>{this.getBottomText()}</Text>
                </View>)
        }
        return (
            <View style={styles.container}>
                <Text style={{color: betHome.totalMoney, marginTop: 3, fontSize: Size.font16}} ellipsizeMode='tail'
                      numberOfLines={1}>共{this.props.isIntelligenceBet == 2 ? this.props.allAmountOnBet : this.state.price}元</Text>
                <View style={{flexDirection: 'row'}}>
                    <Text
                        style={{
                            color: betHome.totalBets,
                            fontSize: Size.font12
                        }}>共{this.props.isIntelligenceBet == 2 ? this.props.allUnitsOnBet : this.state.numberOfUnits}注 </Text>
                </View>
            </View>)
    }

    getBottomText() {
        if (this.props.isIntelligenceBet == 1) {
            return '共追' + this.props.continueIssueNumber + '期 ' + this.props.totalAmount + '元'
        } else {
            return '共' + this.state.price + '期 ' + this.state.price + '元';
        }
    }

    getLeftButton() {
        if (!this.props.rightButtonTitle) {
            return <TouchableOpacity style={{}}/>
        }
        return (<TouchableOpacity style={styles.leftTitleStyle} onPress={() => this.clearButtonCall()}>
            <Text
                style={{
                    fontWeight: 'bold',
                    marginLeft: 5,
                    marginRight: 5,
                    fontSize: Size.font17,
                    color: betHome.btmBtnTxt
                }}>{this.props.rightButtonTitle}</Text>
        </TouchableOpacity>)
    }

    clearButtonCall() {
        if (this.props.leftButtonCallEvent == null) return
        this.props.leftButtonCallEvent()
    }

    payButtonCall() {
        if (this.props.rightButtonCallEvent == null) return
        this.props.rightButtonCallEvent()
    }

}

const styles = StyleSheet.create({
    bottomBarStyle: {
        backgroundColor: betHome.betBtmBg,
        justifyContent: 'space-between',
        flexDirection: 'row',
        height: bottomNavHeight,
        width: width
    },
    leftTitleStyle: {
        backgroundColor: betHome.btmClearBtnBg,
        justifyContent: 'center',
        margin: 5,
        padding: 5,
        borderRadius: 5,
        height:40
    },
    rightTitleStyle: {
        backgroundColor: betHome.btmBtnBg,
        borderRadius: 5,
        justifyContent: 'center',
        margin: 5,
        padding: 5,
        height:40
    },
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 45,
        width: width - 170,
    }
});