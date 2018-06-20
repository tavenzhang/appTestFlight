/**
 * Created by Sam on 09/01/2018.
 * Copyright © 2017年 JX. All rights reserved.
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    PanResponder,
    Dimensions,
    Platform,
    TouchableOpacity
} from 'react-native';

var imgSize = {w: 82, h: 96};
var edgeW = width - imgSize.w;
var edgeH = height - imgSize.h - (bottomNavHeight) -10;

/**系统 npm类 */

/**组件内部显示需要引入的类 */
import {width, height}from '../../resouce/theme';
import {navbarHight,bottomNavHeight} from '../../asset'

/** 外部关系组件 如 页面跳转用 */
import NavigatorHelper from '../../../Common/JXHelper/TCNavigatorHelper';

export default class MyComponent extends React.Component {
    constructor(state) {
        super(state);
        this._handlePanResponderGrant = this._handlePanResponderGrant.bind(this);
        this._handlePanResponderMove = this._handlePanResponderMove.bind(this);
        this._handlePanResponderEnd = this._handlePanResponderEnd.bind(this);
        this._handleStartShouldSetPanResponder = this._handleStartShouldSetPanResponder.bind(this);
        this._handleMoveShouldSetPanResponder = this._handleMoveShouldSetPanResponder.bind(this);
    }

    componentDidMount() {
        this.redPacketStyls = {
            style: {
                left: this.previousLeft,
                top: this.previousTop
            }
        };
    }

    componentWillMount() {
        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: this._handleStartShouldSetPanResponder,
            onStartShouldSetResponderCapture: this._handleStartShouldSetPanResponder,
            onMoveShouldSetPanResponderCapture: this._handleMoveShouldSetPanResponder,
            onMoveShouldSetPanResponder: this._handleMoveShouldSetPanResponder,
            onPanResponderGrant: this._handlePanResponderGrant,
            onPanResponderMove: this._handlePanResponderMove,
            onPanResponderRelease: this._handlePanResponderEnd,
            onPanResponderTerminate: this._handlePanResponderEnd,
            onShouldBlockNativeResponder: this._handleStartShouldSetPanResponder
        });
        this.previousLeft = edgeW;
        this.previousTop = edgeH;
    }

    render() {
        return (
            <View
                {...this.panResponder.panHandlers}
                ref={redPacket => {
                    this.redPacket = redPacket;
                }}
                style={styles.redPacket}
            >
                <TouchableOpacity
                    onPress={() => {
                        if (!NavigatorHelper.checkUserWhetherLogin()) {
                            NavigatorHelper.pushToUserLogin()
                            return
                        }
                        NavigatorHelper.pushToRedPacket();
                    }}
                >
                    <Image
                        source={require('../asset/home_entrence.png')}
                        style={styles.imgStyle}
                    />
                </TouchableOpacity>
            </View>
        );
    }

    _highlight() {
        this._updateNativeStyles();
    }

    _unHighlight() {
        this._updateNativeStyles();
    }

    _updateNativeStyles() {
        this.redPacket && this.redPacket.setNativeProps(this.redPacketStyls);
    }

    _handleStartShouldSetPanResponder(e, gestureState) {
        return true;
    }

    _handleMoveShouldSetPanResponder(e, gestureState) {
        return true;
    }

    _handlePanResponderGrant() {
        this._highlight();
    }

    _handlePanResponderMove(e, gestureState) {
        let dx = this.previousLeft + gestureState.dx;
        let dy = this.previousTop + gestureState.dy;

        dx = dx < 0 ? 0 : dx;
        dy = dy < navbarHight ? navbarHight : dy;

        dx = dx > edgeW ? edgeW : dx;
        dy = dy > edgeH ? edgeH : dy;

        this.redPacketStyls.style.left = dx;
        this.redPacketStyls.style.top = dy;
        this._updateNativeStyles();
    }

    _handlePanResponderEnd(e, gestureState) {
        this._unHighlight();
        let dx = gestureState.dx;
        let dy = gestureState.dy;

        this.previousLeft += dx;
        this.previousTop += dy;
        //
        if (gestureState.dx == 0 && gestureState.dx == 0) {
            if (!NavigatorHelper.checkUserWhetherLogin()) {
                NavigatorHelper.pushToUserLogin()
                return
            }
            NavigatorHelper.pushToRedPacket();
        }
    }
}

const styles = StyleSheet.create({
    redPacket: {
        position: 'absolute',
        left: edgeW,
        top: edgeH
    }, imgStyle: {
        width: imgSize.w,
        height: imgSize.h,
    }
});
