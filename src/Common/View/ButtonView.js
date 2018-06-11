import React, {Component,} from 'react'

import {View, StyleSheet, Text, TouchableOpacity, Platform} from 'react-native'


export default class ButtonView extends Component {


    static propTypes = {
        disabled: JX_PropTypes.bool,//按钮不可用状态（true不可用，false可用）
        btnStyle: JX_PropTypes.any,//按钮样式
        styleDisabled: JX_PropTypes.style,//按钮不可用状态样式
        text: JX_PropTypes.string,//按钮文本
        txtstyle: JX_PropTypes.style,//文本样式
        txtstyleDisabled: JX_PropTypes.style,//文本不可用样式
        onClick: JX_PropTypes.func//按钮点击事件
    };

    static defaultProps = {
        disabled: false,
        btnStyle: null,
        styleDisabled: null,
        text: 'button',
        txtstyle: null,
        txtstyleDisabled: null,
        onClick: this.onClick
    }

    // 构造函数
    constructor(props) {
        super(props)
    }

    onClick() {
        return;
    }

    render() {
        let {disabled, onClick, text, btnStyle, styleDisabled, txtstyle, txtstyleDisabled} = this.props;
        const buttonStyles = [styles.button];
        const textStyles = [styles.text];
        if (disabled) {
            buttonStyles.push(styleDisabled);
            textStyles.push(txtstyleDisabled);
        } else {
            buttonStyles.push(btnStyle);
            textStyles.push(txtstyle);
        }
        return (
            <TouchableOpacity
                style={buttonStyles}
                onPress={onClick}>
                <Text style={textStyles}>
                    {text}
                </Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2196F3',
        borderRadius: 2,
    },
    buttonDisabled: {
        backgroundColor: '#dfdfdf',
    },
    text: {
        color: 'white',
        textAlign: 'center',
        textAlignVertical: 'center',
        padding: 8,
        fontWeight: '500',
    },
    textDisabled: {
        color: '#cdcdcd',
    }
})
