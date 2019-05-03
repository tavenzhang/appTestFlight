import React, {Component,PureComponent} from 'react'

import { StyleSheet, Text, TouchableOpacity,View, Platform} from 'react-native'
import PropTypes from 'prop-types'
import FastImage from "react-native-fast-image";


class  TCButtonCommon extends PureComponent {

    static propTypes = {
        disabled: PropTypes.bool,//按钮不可用状态（true不可用，false可用）
        containStyles: PropTypes.any,//按钮样式
        styleDisabled: PropTypes.any,//按钮不可用状态样式
        text: PropTypes.any,//按钮文本
        txtstyle: PropTypes.any,//文本样式
        txtstyleDisabled: PropTypes.any,//文本不可用样式
        onClick: PropTypes.any,//按钮点击事件
        isClose:PropTypes.any,
        soundName:PropTypes.any,
    };

    static defaultProps = {
        disabled: false,
        containStyles: null,
        styleDisabled: null,
        text: 'button',
        txtstyle: null,
        txtstyleDisabled: null,
        onClick: null,
        isClose:false,
        soundName:null
    }


    onClick=()=> {
        let {onClick,soundName} = this.props
       if(onClick){
           if(soundName&&soundName.length>0){
               TW_Store.bblStore.playSoundByFile(soundName);
           }else{
               TW_Store.bblStore.playSoundByFile(TW_Store.bblStore.SOUND_ENUM.click);
           }

           onClick()
       }
    }

    render() {
        let {containStyles,disabled} = this.props;
        return ( disabled ?  <View style={containStyles} onPress={this.onClick}>
                {this.props.children}
            </View>:
            <TouchableOpacity style={containStyles} onPress={this.onClick}>
                {this.props.children}
            </TouchableOpacity>
        )
    }
}





export default class TCButtonView extends PureComponent {

    static propTypes = {
        disabled: PropTypes.bool,//按钮不可用状态（true不可用，false可用）
        btnStyle: PropTypes.any,//按钮样式
        styleDisabled: PropTypes.any,//按钮不可用状态样式
        text: PropTypes.any,//按钮文本
        txtstyle: PropTypes.any,//文本样式
        txtstyleDisabled: PropTypes.any,//文本不可用样式
        onClick: PropTypes.any,//按钮点击事件,
        soundName:PropTypes.any,
    };

    static defaultProps = {
        disabled: false,
        btnStyle: null,
        styleDisabled: null,
        text: 'button',
        txtstyle: null,
        txtstyleDisabled: null,
        onClick: null,
    }


    render() {
        let {disabled, text,  txtstyle, txtstyleDisabled,styleDisabled,btnStyle} = this.props;
        const textStyles = [styles.text];
        const buttonStyles = [styles.button];
        if (disabled) {
            buttonStyles.push(styles.buttonDisabled);
            buttonStyles.push(styleDisabled);
            textStyles.push(styles.textDisabled);
            textStyles.push(txtstyleDisabled);
            buttonStyles.push(btnStyle);
        } else {
            buttonStyles.push(btnStyle);
            textStyles.push(txtstyle);
        }
        return (
            <TCButtonCommon {...this.props} containStyles={buttonStyles}>
                {text ? <Text style={textStyles}>
                    {text}
                </Text>:null}

            </TCButtonCommon>
        )
    }
}


export  class TCButtonImg extends PureComponent {

    static propTypes = {
        disabled: PropTypes.bool,//按钮不可用状态（true不可用，false可用）
        btnStyle: PropTypes.any,//按钮样式
        styleDisabled: PropTypes.any,//按钮不可用状态样式
        imgStyle: PropTypes.any,
        imgStyleDisable:PropTypes.any,
        imgSource: PropTypes.any,//文本样式
        imgSourceDisable: PropTypes.any,//文本不可用样式
        onClick: PropTypes.any,//按钮点击事件
        text: PropTypes.any,//按钮文本
        textStyle:PropTypes.any,
        isHorizon:PropTypes.bool,
        isClose:PropTypes.bool,
        soundName:PropTypes.any,

    };

    static defaultProps = {
        disabled: false,
        btnStyle: null,
        styleDisabled: null,
        imgSource:null,
        imgSourceDisable:null,
        onClick: null,
        text:null,
        isHorizon:true,
        isClose:false,
        soundName:null
    }


    render() {
        let {disabled,text,imgSource, isHorizon,btnStyle,textStyle,imgStyle,imgSourceDisabled, imgStyleDisable,resizeMode='contain'} = this.props;
        let myImgSourceDisabled = imgSourceDisabled ? imgSourceDisabled:imgSource;
        return (
            <TCButtonCommon  {...this.props} containStyles={btnStyle}>
                <View style={{flexDirection:isHorizon ? "row":"column", justifyContent:"center",alignItems:"center"}}>
                <FastImage style={disabled ? imgStyleDisable:imgStyle}
                           source={disabled ? myImgSourceDisabled:imgSource}
                           resizeMode={resizeMode}/>
                {text ? <Text style={[styles.text,textStyle]}>{text}</Text>:null}
                </View>
            </TCButtonCommon>
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
        padding:6
    },
    buttonDisabled: {
        backgroundColor: '#dfdfdf',
    },
    text: {
        color: 'white',
        textAlign: 'center',
        textAlignVertical: 'center',
      //  padding: 8,
        fontWeight: '500',
    },
    textDisabled: {
        color: '#cdcdcd',
    }
})
