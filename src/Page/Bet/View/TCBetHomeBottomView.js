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
import {Size, width, betHome} from '../../resouce/theme'

import { observer } from 'mobx-react/native';
@observer
export default class TCBetHomeBottomView extends Component {
    constructor(state) {
        super(state);
        this.state = {};
    }

    static defaultProps = {
        leftButtonCallEvent: null,
        rightButtonCallEvent: null,
        clearButtonCallEvent: null,
        mob:false
    };

    componentDidMount() {

    }

    resetWithNumbers(numbersStr, numberOfUnits, price) {
        this.setState({
            numbers: numbersStr,
            numberOfUnits: numberOfUnits,
            price: price
        })
    }

    render() {
        return (
            <View style={styles.bottomBarStyle}>

                {this.getLeftButton()}

                <View style={styles.container}>
                    <Text allowFontScaling={false}  style={{color: betHome.btmBetNumTxt, marginTop: 3, fontSize: Size.font16}} ellipsizeMode='tail'
                          numberOfLines={1}>{this.props.mob?this.props.data.numberStr:this.state.numbers}</Text>
                    {this.getBottomTitleView()}
                </View>

                <TouchableOpacity
                    style={styles.rightTitleStyle}
                    onPress={() => this.checkNumbers()}>
                    <Text allowFontScaling={false} 
                        style={{
                            fontWeight: 'bold',
                            marginLeft: 5,
                            marginRight: 5,
                            fontSize: Size.font19,
                            color: betHome.btmBtnTxt
                        }}>确定</Text>
                </TouchableOpacity>
            </View>
        );
    }

    getLeftButton() {
        let numbers = this.props.mob?this.props.data.numberStr:this.state.numbers
        if ( numbers && numbers.length > 0) {
            return (
                <TouchableOpacity
                    style={styles.leftTitleClearStyle} onPress={() => this.clearButtonCall()}>
                    <Text allowFontScaling={false}
                        style={{
                            fontWeight: 'bold',
                            marginLeft: 5,
                            marginRight: 5,
                            fontSize: Size.font19,
                            color: betHome.btmBtnTxt
                        }}>清空</Text>
                </TouchableOpacity>
            )
        } else {
            return (
                <TouchableOpacity
                    style={styles.leftTitleStyle} onPress={() => this.randomSelect()}>
                    <Text allowFontScaling={false} 
                        style={{
                            fontWeight: 'bold',
                            marginLeft: 5,
                            marginRight: 5,
                            fontSize: Size.font19,
                            color: betHome.btmBtnTxt
                        }}>机选</Text>
                </TouchableOpacity>
            )
        }
    }

    getBottomTitleView() {
        if (this.props.mob?(this.props.data.numberStr!=null&&this.props.data.numberStr.length > 0):(this.state.numbers != null && this.state.numbers.length > 0)) {
            return <View style={{flexDirection: 'row'}}>
                <Text allowFontScaling={false} 
                    style={{
                        color: betHome.btmBets,
                        marginRight: 5,
                        fontSize: Size.font16
                    }}>共{this.props.mob?this.props.data.units:this.state.numberOfUnits}注 </Text>
                <Text allowFontScaling={false}  style={{color: betHome.btmMoney, fontSize: Size.font16}}>{this.props.mob?this.props.data.price:this.state.price}元 </Text>
            </View>
        }
    }

    randomSelect() {
        if (this.props.leftButtonCallEvent == null) return
        this.props.leftButtonCallEvent()
    }

    checkNumbers() {
        if (this.props.rightButtonCallEvent == null) return
        this.props.rightButtonCallEvent()
    }

    clearButtonCall() {
        if (this.props.clearButtonCallEvent == null) return
        this.props.clearButtonCallEvent()
    }
}

const styles = StyleSheet.create({
    bottomBarStyle: {
        backgroundColor: betHome.btmBg,
        justifyContent: 'space-between',
        flexDirection: 'row',
        height: 49,
    },
    leftTitleClearStyle: {
        backgroundColor: betHome.btmClearBtnBg,
        justifyContent: 'center',
        margin: 5,
        padding: 5,
        borderRadius: 5,
    },
    leftTitleStyle: {
        backgroundColor: betHome.btmBtnBg,
        justifyContent: 'center',
        margin: 5,
        padding: 5,
        borderRadius: 5,
    },
    rightTitleStyle: {
        backgroundColor: betHome.btmBtnBg,
        borderRadius: 5,
        justifyContent: 'center',
        margin: 5,
        padding: 5,
    },
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 49,
        width: width - 140
    }
});