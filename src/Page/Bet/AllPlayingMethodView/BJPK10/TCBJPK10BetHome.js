/**
 * Created by Sam on 2016/11/28.
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Dimensions,
    Platform,
    ScrollView,
    PanResponder,
    Image,
    Alert
} from 'react-native';

//系统 npm类
import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter'
import {observer} from 'mobx-react/native';

//组件内部显示需要引入的类

import TCBJPK10_MainView from './view/TCBJPK10_MainView'


import {withMappedNavigationProps} from 'react-navigation-props-mapper'

import TCBaseBetHome, {SingletonDPS} from "../../../Base/TCBaseBetHome";


@withMappedNavigationProps()
@observer
export default class TCBJPK10BetHome extends TCBaseBetHome {

    static defaultProps = {
        cp_playMath: '定位胆',
        unit_price: 2,
        gameUniqueId: ''
    }

    constructor(props){
        super({...props,gameName:"BJPK10",contentView:TCBJPK10_MainView,isHighlightStyle:false})
    }


    clearSelectedNumbers() {
        SingletonDPS.resetUnAddedSelectedNumbers()
        this.userPlayNumberEvent.resetStrData();
        RCTDeviceEventEmitter.emit('BJPK10NumberCall_clear');
        RCTDeviceEventEmitter.emit('qdxdsReset');
    }

}
