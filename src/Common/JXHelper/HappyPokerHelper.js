/**
 * Created by allen-jx on 2017/5/12.
 */
import React, {Component, PropTypes,} from 'react'

import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    Modal,
    Image,
    ImageBackground,
} from 'react-native'
let BLACK = '1', RED = '2', FLOWER = '3', FK = '4'
let A = '01', J = '11', Q = '12', K = '13'

import {xypk} from '../../Page/resouce/images'
import {betHome,indexBgColor} from '../../Page/resouce/theme'
/**
 * 提示对话框
 */
export default class HappyPokerHelper {


    getOpenCodeView(lastOpenCode, isHistory, withBorder, isBetHomeHistory) {
        let codeArr = isHistory ? lastOpenCode : this.splitCode(lastOpenCode)
        let viewArray = []
        for (var i = 0; i < 3; i++) {
            let numArray = this.splitStr(codeArr[i] + '')
            let icon = isHistory ? this.getHistoryCodeColorView(numArray[0]) : this.getOpenCodeColorView(numArray[0])
            let numStr = this.getNumStr(numArray[1])
            viewArray.push(this.getCodeView(icon, numStr, numArray[0], i, isHistory, withBorder, isBetHomeHistory))
            // this.getOpenCodeColorView(numArray[0])
        }
        return viewArray
    }

    splitStr(num) {
        let arr = [];

        arr[0] = num.substr(0, 1)
        arr[1] = num.substr(1, 2)
        return arr;
    }

    splitCode(code) {
        let arr = []
        arr = code.split(',')
        return arr
    }

    getCodeView(icon, num, color, index, isHistory, withBorder, isBetHomeHistory) {
        return (
            <ImageBackground
                source={icon}
                style={[
                    isHistory && styles.imgHistoryPokerStyle,
                    !isHistory && styles.imgPokerStyle,
                    withBorder && styles.borderStyle,
                    isBetHomeHistory && styles.imgHomeHistoryPokerStyle,
                ]}
                resizeMode={'contain'}
                key={color + num + index + ''}
            >
                <Text
                    style={[
                        color == BLACK || color == FLOWER ?
                            (isHistory ? styles.textHistoryCodeBlack : styles.textOpenCodeBlack) :
                            (isHistory ? styles.textHistoryCodeRed : styles.textOpenCodeRed),
                        isBetHomeHistory && styles.textHomeHistoryCode
                    ]}
                >
                    {num}
                </Text>
            </ImageBackground>
        )
    }


    getOpenCodeColorView(color) {
        var icon;
        switch (color) {
            case BLACK://黑桃
                icon = xypk.black
                break;
            case  RED://红桃
                icon = xypk.red
                break;
            case FLOWER://梅花
                icon = xypk.flower
                break;
            case FK://方块
                icon = xypk.fk
                break;
        }
        return icon
    }

    getHistoryCodeColorView(color) {
        let icon;
        switch (color) {
            case BLACK://黑桃
                return icon = xypk.blackHistory
            case RED://红桃
                return icon = xypk.redHistory
            case FLOWER://梅花
                return icon = xypk.flowerHistory
            case FK://方块
                return icon = xypk.fkHistory
        }
    }

    getNumStr(num) {
        switch (num) {
            case A:
                return 'A'
            case J:
                return 'J'
            case Q:
                return 'Q'
            case K:
                return 'K'
            default:
                if (num.length > 1) {
                    let first = num.substr(0, 1)
                    if (first == '0') {
                        return num.substr(1, 1)
                    }
                }
                return num
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: indexBgColor.mainBg,
    }, imgPokerStyle: {
        height: 40,
        width: 30,
        marginHorizontal: 0.1,
        borderWidth: 0.5,
        borderColor: betHome.xypkBorder
    },
    textOpenCodeBlack: {
        marginLeft: 3,
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
    }, textHistoryCodeBlack: {
        marginTop: 3,
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'right',
        marginRight: 8,
        backgroundColor: 'transparent',
    },
    textOpenCodeRed: {
        marginLeft: 3,
        fontSize: 18,
        fontWeight: 'bold',
        color: 'red',
    },
    textHistoryCodeRed: {
        marginTop: 3,
        fontSize: 18,
        fontWeight: 'bold',
        color: 'red',
        textAlign: 'right',
        marginRight: 8,
        backgroundColor: 'transparent',
    },
    imgHistoryPokerStyle: {
        height: 40,
        width: 50,
        marginHorizontal: 0.1,
    },
    imgHomeHistoryPokerStyle: {
        height: 21,
        width: 30,
    },
    borderStyle: {
        backgroundColor: betHome.betTopItemBg,
        borderWidth: 1,
        borderColor: betHome.xypkBorder,
        borderRadius: 5,
    },
    textHomeHistoryCode: {
        marginTop: 1,
        fontSize: 13,
        marginRight: 3,
    },
})