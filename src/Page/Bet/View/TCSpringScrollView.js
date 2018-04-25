/**
 * Created by Sam on 06/06/2017.
 * Copyright © 2017年 JX. All rights reserved.
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ScrollView
} from 'react-native';

/**系统 npm类 */

/**组件内部显示需要引入的类 */

/** 外部关系组件 如 页面跳转用 */

export default class MyComponent extends ScrollView {

    constructor(state) {
        super(state)
        this.startMove = false;
        this.startPointY = -1;
    }

    componentWillUnmount(){
        this.startMove = false;
        this.startPointY = -1;
        this.isMoved = false;
    }

    onResponderMove(evt){
        if (this.startMove ==false){
            this.startMove = true
            this.startPointY = evt.nativeEvent.pageY
        }
        if ((evt.nativeEvent.pageY -this.startPointY)>60){
            if (this.props.shouldMoveEvent){
                this.props.shouldMoveEvent('down')
                this.isMoved = true;
            }
        }else if ((evt.nativeEvent.pageY -this.startPointY)<20){
            if (this.props.shouldMoveEvent){
                this.props.shouldMoveEvent('top')
                this.isMoved = false;
            }

        }
    }

    onResponderRelease(evt){
        this.startMove = false
        this.startPointY = -1;
    }
}