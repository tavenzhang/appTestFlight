/**
 * Created by Sam on 2018/9/14.
 * Copyright © 2017年 JX. All rights reserved.
 */
/**
 * Created by Sam on 2016/11/12.
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Dimensions,
    Image,
    TouchableOpacity
} from 'react-native';

import {width, indexBgColor, indexTxtColor, Size} from '../../resouce/theme'
import Moment from 'moment'
import FastImage from 'react-native-fast-image';
import jdAppStore from '../../../Data/store/JDAppStore'

export default class TCHomeSportsItem extends React.Component {

    constructor(state) {
        super(state);
        this.state = {
            timeStr: this.props.mTimer - Moment().format('X')
        };
    }

    static defaultProps = {
        pushToEvent: null,
        duration: 1000,
    };

    render() {
        if (this.props.rowData.gamePlatform) {
            return (<TouchableOpacity style={styles.container} onPress={() => {
                this.buttonCall()
            }}
            >
                {this.getImage()}
            </TouchableOpacity>)
        } else {
            return <View style={styles.container}/>
        }
    };

    getImage() {
        JXLog('this.props.rowData.icon == '+this.props.rowData.icon)
        return <FastImage source={{uri: this.props.rowData.icon}}
                              style={styles.leftImgStyle}/>
    }

    buttonCall = () => {
        if (this.props.pushToEvent == null) return
        jdAppStore.playSound();
        this.props.pushToEvent(this.props.rowData);
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: indexBgColor.itemBg,
        flexDirection: 'row',
        height: 90,
        width: width / 2 - 0.5,
        alignItems: 'center',
        marginBottom: 0.5,
        marginLeft: 0.5
    },

    leftImgStyle: {
        width: 60,
        height: 60,
        marginLeft: 8
    }

});