/**
 * Created by Sam on 2016/12/10.
 */
import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Dimensions,
    TextInput,
    TouchableHighlight
} from 'react-native';

//系统 npm类
import Toast from '../../Common/JXHelper/JXToast';

const {width, height} = Dimensions.get('window')

import {Size} from '../../Page/resouce/theme'

export default class TCBillMultipleBar extends Component {
    constructor(state) {
        super(state);
        this.state = {
            multipleNumber: this.props.multipleNumber
        };
    }

    static defaultProps = {
        inputEvent: null,
        multipleNumber: ''
    };

    componentDidMount() {
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={{color: '#999999'}}>投</Text>
                <TouchableHighlight onPress={() => this.inPutCall()} style={styles.inputStyle}>
                    <Text style={{fontSize: Size.font16, textAlign: 'center', color: '#333333'}}>
                        {this.state.multipleNumber}
                    </Text>
                </TouchableHighlight>
                <Text style={{color: '#999999'}}>倍</Text>
            </View>);
    };

    _getTextInputValue() {
        return this.state.multipleNumber
    }

    _setTextInputValue(number) {

        let curentStr = this.state.multipleNumber
        if (number == '确定') {
        } else if (number == '删除') {
            curentStr = curentStr.substring(0, curentStr.length - 1)
        } else {
            curentStr = curentStr + number
            if (curentStr > 9999) {
                Toast.showShortCenter('倍率最大设置9999倍');
                return
            } else if (curentStr == 0) {
                Toast.showShortCenter('倍率最小为1');
                return
            }
        }
        this.setState({
            multipleNumber: curentStr
        })
    }

    _resetTextWith(number) {
        if (!number) {
            number = '1'
        }
        this.setState({multipleNumber: number})
    }

    inPutCall() {
        if (this.props.inputEvent == null) return
        this.props.inputEvent()
    }

}


const styles = StyleSheet.create({
    container: {
        width: width,
        height: 35,
        flexDirection: 'row',
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderTopWidth: 0.5,
        borderTopColor: '#F2F2F2',
    },
    inputStyle: {
        width: 80,
        height: 28,
        marginTop: 2,
        marginLeft: 10,
        marginRight: 10,
        borderWidth: 1,
        borderColor: '#EBEBEB',
        paddingLeft: 5,
        paddingRight: 5,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
