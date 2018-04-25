/**
 * Created by Jason on 2017/09/09.
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

import {width, indexBgColor, commonNumBallStyles, betHome, indexTxtColor, Size} from '../../resouce/theme'
import {VerticalText} from "../../../Common/View/Extension/VerticalText";


export default class TCQDXDSQBarView extends Component {


    constructor() {
        super();
    }

    static defaultProps = {
        titleName: '',
        areaIndex: '0',
        qdxdsArray: ['全', '大', '小', '单', '双', '清',],
    }

    render() {
        return <View
            style={[styles.container, {marginTop: !this.props.areaIndex || this.props.areaIndex == '0' ? 10 : 0}]}>
            <View style={styles.leftView}>
                <VerticalText textStyle={styles.leftTitle} string={this.props.titleName}/>
            </View>
            <View style={styles.rightBarView}>
                {this.getBarTextViews()}
            </View>
        </View>
    }

    getBarTextViews() {
        let barTextArray = [];
        for (let i = 0, len = this.props.qdxdsArray.length; i < len; i++) {
            barTextArray.push(<BarText areaIndex={this.props.areaIndex} key={i} index={i} qdxdsArray={this.props.qdxdsArray}
                                       numberEvent={this.props.numberEvent}/>)
        }
        return barTextArray;
    }


}

class BarText extends Component {
    constructor() {
        super();
        this.state = {
            pressed: false,
        };
    }

    static defaultProps = {
        index: 0,
        areaIndex: 0,
    }


    render() {
        return <TouchableOpacity onPress={() => this.onBarTextPress()}><Text style={[styles.barText, {
            paddingLeft: this.props.index === 0 ? 22 : 15,
            paddingRight: this.props.index === this.props.index - 1 ? 22 : 15,
            color: this.state.pressed ? betHome.betQDXDSQBarTextPressed : betHome.betQDXDSQBarText,
        }]}>{this.props.qdxdsArray[this.props.index]}</Text></TouchableOpacity>
    }

    shouldComponentUpdate(nextProps, nextState) {
        return this.state.pressed !== nextState.pressed;
    }

    componentDidMount() {
        this.listener = RCTDeviceEventEmitter.addListener('qdxdsPress', (areaIndex, index) => {
            if (this.props.areaIndex == areaIndex) {
                if (this.props.index == index) {
                    this.setState({
                        pressed: !this.state.pressed
                    });
                }else{
                    this.setState({
                        pressed: false
                    });
                }

            }
        });

        this.listener2 = RCTDeviceEventEmitter.addListener('qdxdsReset', () => {
            if (this.state.pressed) {
                this.setState({
                    pressed: false
                });
            }
        });
    }

    componentWillUnmount() {
        this.listener && this.listener.remove();
        this.listener2 && this.listener2.remove();
    }

    onBarTextPress() {
        this.props.numberEvent.qdxdsqPressCallBack(this.props.areaIndex, this.props.qdxdsArray[this.props.index], this.state.pressed);

        RCTDeviceEventEmitter.emit('qdxdsPress', this.props.areaIndex, this.props.index);
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 10,
        height: 40,
    },

    leftTitle: {
        color: betHome.betLeftQDXDSQTitle,
        fontSize: Size.font15,
        fontWeight: 'bold',
        lineHeight: 16,
    },
    leftView: {
        width: 31,
        alignItems: 'center',
        justifyContent: 'center'
    },
    rightBarView: {
        height: 25,
        flexDirection: 'row',
        width: width - 37,
        borderColor: "#dddddd",
        backgroundColor: "#fefefe",
        borderRadius: 20,
        borderWidth: 1,
        justifyContent: 'space-between',
        alignItems:'center',
    },
    barText: {
        fontSize: Size.font15,
        color: betHome.betQDXDSQBarText,
        paddingRight: 15,
        paddingLeft: 15,
        backgroundColor:'transparent',
        alignItems:'center',
        justifyContent:'center'

    }

});