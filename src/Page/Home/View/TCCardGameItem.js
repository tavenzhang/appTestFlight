/**
 * Created by Sam on 2018/9/14.
 * Copyright © 2017年 JX. All rights reserved.
 */
/**
 * Created by Sam on 2016/11/12.
 */

import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, Dimensions, Image, TouchableOpacity } from 'react-native';

import { width } from '../../resouce/theme';
import Moment from 'moment';
import jdAppStore from '../../../Data/store/JDAppStore';
import { Other } from '../../asset';
import TCImage from '../../../Common/View/image/TCImage';
import FastImage from 'react-native-fast-image';

export default class TCHomeSportsItem extends React.Component {
    constructor(state) {
        super(state);
        this.state = {
            timeStr: this.props.mTimer - Moment().format('X'),
            loadImgOk: false
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
        let imgUrl = this.props.rowData.icon;
        let data = this.props.rowData;
        let firstPost = imgUrl.indexOf('//') + 2;
        let preHttp = imgUrl.substring(0, firstPost);
        let tagetUrl = imgUrl.substr(firstPost, imgUrl.length);
        tagetUrl = tagetUrl.substring(0, tagetUrl.indexOf('/'));
        if (data.platForm == 'KY') {
            //ky 特殊处理 其他平台图片不加前缀
            tagetUrl =
                preHttp +
                tagetUrl +
                '/common/gameIcon/cardGame/' +
                data.platForm +
                '/' +
                data.platForm +
                '_' +
                data.gameId +
                '.png';
        } else {
            tagetUrl = preHttp + tagetUrl + '/common/gameIcon/cardGame/' + data.platForm + '/' + data.gameId + '.png';
        }

        let img;
        // if (this.props.type === 'KY') {
        //     img = Other.cardGame.KY[this.props.rowData.gameId];
        // } else if (this.props.type === 'FG') {
        //     img = Other.cardGame.FG[this.props.rowData.gameId];
        // }
        if (!img) {
            img = { uri: tagetUrl };
        }
        return <FastImage source={img} style={styles.leftImgStyle} onError ={()=>{
            JXLog('999 999 99 加载失败'+JSON.stringify(img))
        }
        }/>;
    }

    onLoadImge = () => {
        this.setState({ loadImgOk: true });
    };

    buttonCall = () => {
        if (this.props.pushToEvent == null) return;
        jdAppStore.playSound();
        this.props.pushToEvent(this.props.rowData);
    };
}

let w = (width - 40) / 3;
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'transparent',
        flexDirection: 'row',
        height: w / 0.818 + 10,
        width: w + 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 0.5,
        marginLeft: 0.5
    },

    leftImgStyle: {
        width: w,
        height: w / 0.818
    }
});
