/**
 * Created by Sam on 2018/9/14.
 * Copyright © 2017年 JX. All rights reserved.
 */
/**
 * Created by Sam on 2016/11/12.
 */

import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, Dimensions, Image, TouchableOpacity } from 'react-native';

import { width, indexBgColor, indexTxtColor, Size } from '../../resouce/theme';
import Moment from 'moment';
import FastImage from 'react-native-fast-image';
import jdAppStore from '../../../Data/store/JDAppStore';
import {Other} from "../../asset";

export default class TCHomeSportsItem extends React.Component {
    constructor(state) {
        super(state);
        this.state = {
            timeStr: this.props.mTimer - Moment().format('X')
        };
    }

    static defaultProps = {
        pushToEvent: null,
        duration: 1000
    };

    render() {
        return (
            <TouchableOpacity
                style={styles.container}
                onPress={() => {
                    this.buttonCall();
                }}
            >
                {this.getImage()}
            </TouchableOpacity>
        );
    }

    getImage() {
        let img
        if (this.props.type === 'KY'){
            img = Other.cardGame.KY[this.props.rowData.gameId]
        }else if (this.props.type === 'FG') {
            img = Other.cardGame.FG[this.props.rowData.gameId]
        }
        return <FastImage source={img} style={styles.leftImgStyle} />;
    }

    buttonCall = () => {
        if (this.props.pushToEvent == null) return;
        jdAppStore.playSound();
        this.props.pushToEvent(this.props.rowData);
    };
}

let w = (width-40)/3
const styles = StyleSheet.create({
    container: {
        backgroundColor:'transparent',
        flexDirection: 'row',
        height: w/0.818+10,
        width: w+5,
        justifyContent:'center',
        alignItems: 'center',
        marginBottom: 0.5,
        marginLeft: 0.5,
    },

    leftImgStyle: {
        width: w,
        height: w/0.818,
    }
});
