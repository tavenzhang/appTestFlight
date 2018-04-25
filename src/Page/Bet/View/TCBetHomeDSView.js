/**
 * Created by allen-jx on 2018/1/2.
 */
import React, {Component, PropTypes,} from 'react'

import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    Modal,
    TextInput,
    Platform
} from 'react-native'
import {Size, width, height, indexBgColor, listViewTxtColor,loginAndRegeisterBorderColor,loginAndRegeisterBgColor} from '../../resouce/theme'
import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter'
import Toast from '@remobile/react-native-toast'
import {observable, action} from 'mobx';
import {observer} from 'mobx-react';
/**
 *单式投注组件
 */
@observer
export default class TCBetHomeDSView extends Component {

    static propTypes = {}

    static defaultProps = {}

    @observable
    clearRepeatNum = ""

    @action
    clearRepeat(num) {
        this.clearRepeatNum = num;
    }


    constructor(props) {
        super(props)
    }

    componentDidMount() {
        RCTDeviceEventEmitter.addListener("qdxdsReset", () => {
            this.clearText()
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{width: width, marginVertical: 5, marginLeft: 10}}>
                    <Text style={styles.titleStyle}>1.多注号码请用空格[ ]、逗号[,] 或分号[;] 隔开</Text>
                    <Text style={styles.titleStyle}>2.自动过滤重复号码和不合法号码</Text>
                    <Text style={styles.titleStyle}>3.可复制号码粘贴到输入框</Text>
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                    ref="textInput"
                    style={styles.inputStyle}
                    underlineColorAndroid={'transparent'}
                    multiline={true}
                    defaultValue={this.clearRepeatNum}
                    placeholder={' 请手动输入单式投注'}
                    placeholderTextColor={listViewTxtColor.content}
                    returnKeyType={"done"}
                    onChange={(event) => {
                        this.checkText(event.nativeEvent.text)
                    }}
                />
                </View>
            </View>
        )
    }

    clearText() {
        let textInput = this.refs.textInput;
        textInput && textInput.clear();
    }

    checkText(text) {
        let number = text.replace(/[^0-9\t\n,，; ；]/g, '');

        number = number.replace(/\s+/g, ' ');
        number = number.replace(/\n+/g, '\n');
        number = number.replace(/[\t\n,，; ；]/g, " ");

        let numberArr = number.split(/[\t\n,，; ；]/g);
        numberArr = numberArr.filter((item) => {
            return item != "";
        })
        if (this.isZX()) {
            numberArr = numberArr.map((item) => {
                let itemArr = item.split("");
                return itemArr.sort(this.sortNum).join("");
            })
        }

        let numberSize = numberArr.length
        let setData = Array.from(new Set(numberArr));
        if (numberSize > setData.length) {
            this.clearRepeat(setData.join(",") + ",")
            Toast.showShortCenter("号码重复，系统自动去重")
        } else {
            this.clearRepeat(text)
        }
        this.props.numberEvent.onChangeText(setData.join(","))
    }

    /**
     * 判断玩法是否为组选
     * @returns {boolean}
     */
    isZX() {
        let playType = this.props.playTypeName;
        if (playType.indexOf("组三") !== -1 || playType.indexOf("组六") !== -1 || playType.indexOf("组选") !== -1) {
            return true;
        }
        return false;
    }

    /**
     * 排序
     * @param a
     * @param b
     * @returns {number}
     */
    sortNum(a, b) {
        a = parseInt(a);
        b = parseInt(b);
        return (a - b);
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    titleStyle: {
        fontSize: Size.font12,
        color: listViewTxtColor.content,
    },
    inputStyle: {
        fontSize:Platform.OS === 'ios'?Size.font16:Size.font14,
        height: height -306,
        backgroundColor: indexBgColor.itemBg,
        textAlignVertical: 'top',
    },
    inputContainer: {
        justifyContent: 'space-around',
        width: width * 0.9,
        height: height -300,
        paddingLeft: 5,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: loginAndRegeisterBorderColor.inputBorder,
        backgroundColor: loginAndRegeisterBgColor.inputBg,
    },
})