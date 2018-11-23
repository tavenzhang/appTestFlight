import React, {Component,} from 'react'
import {View, Text, Platform, StyleSheet, requireNativeComponent} from "react-native";
import PropTypes from 'prop-types'
//安卓平台用的原生库
var RCTMarqueeLabel = Platform.OS == 'android' ? requireNativeComponent('RCTMarqueeLabel', MarqueeLabel) : null;

export default class MarqueeLabel extends Component {
    static propTypes = {
        ...View.propTypes,
        style: Text.propTypes.style,
        text: PropTypes.string,
        scrollDuration: PropTypes.number, //秒
        marqueeType: PropTypes.number, //ios
        fadeLength: PropTypes.number, //ios
        leadingBuffer: PropTypes.number, //ios
        trailingBuffer: PropTypes.number, //ios
        animationDelay: PropTypes.number, //ios
        isRepeat: PropTypes.bool, //android
        startPoint: PropTypes.number, //android
        direction: PropTypes.number //android
    }

    render() {
        const {children, ...props} = this.props;
        const nativeProps = Object.assign({}, props, {text: children});
        return <RCTMarqueeLabel {...nativeProps} />;
    }
}