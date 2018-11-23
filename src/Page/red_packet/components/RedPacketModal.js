/**
 * Created by Sam on 22/11/2017.
 * Copyright © 2017年 JX. All rights reserved.
 */

/**系统 npm类 */
import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, Modal, Image, ImageBackground, TouchableOpacity, TouchableHighlight } from 'react-native';
import { common, personal } from '../../asset/images';
import * as Animatable from 'react-native-animatable';

var winImage = require('../asset/hb.png');
var lostImage = require('../asset/wzj.png');
var wmzImage = require('../asset/wzj_wmz.png');
var bgImg = require('../asset/she.png');
var closeImg = require('../asset/guanbi.png');
import * as _ from 'lodash';

/**组件内部显示需要引入的类 */
import {
    indexBgColor,
    userCenterTxtColor,
    userCenterBorderColor,
    Size,
    width,
    height,
    baseColor
} from '../../resouce/theme';

import Helper from '../../../Common/JXHelper/TCNavigatorHelper';

export default class MyComponent extends React.Component {
    constructor(state) {
        super(state);
        this.state = {
            animationType: 'fade', //none slide fade
            modalVisible: false, //模态场景是否可见
            transparent: true, //是否透明显示
            amToFinish: false, //动画结束
            data: { content: {}, rs: false },
            continueDraw: null,
            showRules: false
        };
    }

    render() {
        return (
            <Modal
                animationType={this.state.animationType}
                transparent={this.state.transparent}
                visible={this.state.modalVisible}
                onRequestClose={() => {
                    this._setModalVisible(false);
                }}
            >
                <TouchableHighlight
                    onPress={() => {
                        this._setModalVisible(false);
                    }}
                    activeOpacity={1}
                    style={styles.modalBackgroundStyle}
                    underlayColor="transparent"
                >
                    <Animatable.View animation="" source={bgImg} style={{ width: width, height: height }}>
                        <Image source={closeImg} style={styles.bgImg} />
                        <Animatable.View
                            style={styles.contentStyle}
                            animation="zoomIn"
                            duration={500}
                            onAnimationEnd={() => {
                                this.setState({ amToFinish: true });
                            }}
                        >
                            {this.getLabel()}
                            {this.getContinueLabel()}
                            {this.getRulesView()}
                            {this.getRulesLabel()}
                        </Animatable.View>
                    </Animatable.View>
                </TouchableHighlight>
            </Modal>
        );
    }

    getLabel() {
        let data = this.state.data.content;
        if (_.isEmpty(data)) {
            return;
        }
        let img = data.hasResult ? winImage : lostImage;
        let remainderTime = data.hongbaoFinal.chances - data.hongbaoFinal.usedChances;
        let winAmount = data.winAmount;
        return (
            <ImageBackground source={img} style={styles.centerImg}>
                {data.hasResult ? this.getWinLabel(remainderTime, winAmount) : this.getLostLabel(remainderTime)}
            </ImageBackground>
        );
    }

    getWinLabel(remainderTime, winAmount) {
        return (
            <View>
                <Text style={styles.winLabel1}>{this.state.amToFinish ? winAmount + '元' : ''}</Text>
                <Text style={styles.winLabel2}>{this.state.amToFinish ? '恭喜你获得' + winAmount + '元红包' : ''}</Text>
                <Text style={styles.winLabel3}>{this.state.amToFinish ? '你还有' + remainderTime + '次抢红包的机会哦' : ''}</Text>
            </View>
        );
    }

    getLostLabel(remainderTime) {
        return (
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Text style={styles.lostLabelTitle}>{this.state.amToFinish ? '未中奖' : ''}</Text>
                <Text style={styles.lostLabel1}>{this.state.amToFinish ? '再接再厉' : ''}</Text>
                <Text style={styles.lostLabel2}>{this.state.amToFinish ? '还剩' + remainderTime + '次机会' : ''}</Text>
            </View>
        );
    }

    getContinueLabel() {
        let data = this.state.data.content;
        if (_.isEmpty(data)) return;
        let remainderTime = data.hongbaoFinal.chances - data.hongbaoFinal.usedChances;
        if (remainderTime > 0) {
            return (
                <TouchableOpacity
                    activeOpacity={0}
                    onPress={() => {
                        this.continueBtnCall();
                    }}
                >
                    <ImageBackground source={require('../asset/kai_button.png')} style={styles.continueImg}>
                        <Text style={{ fontSize: Size.font22, fontWeight: 'bold', color: 'white' }}>继续抢红包</Text>
                    </ImageBackground>
                </TouchableOpacity>
            );
        }
    }

    getRulesView(){
        if(this.state.showRules) {
            return (
                <ImageBackground source={wmzImage} style={styles.wmzImg}>
                    <Text style={ styles.lostLabel3}>{'您还未满足抢红包的条件资\n格,请查看抢红包具体规则,\n方便您早日参加红包活动。'}</Text>
                </ImageBackground>
            );
        }
    }


    getRulesLabel() {
        if(this.state.showRules){
            return (
                <TouchableOpacity
                    activeOpacity={0}
                    onPress={() => {
                        this.showRulesButtonCall();
                    }}
                >
                    <ImageBackground source={require('../asset/kai_button.png')} style={styles.continueImg}>
                        <Text style={{ fontSize: Size.font22, fontWeight: 'bold', color: 'white' }}>查看规则</Text>
                    </ImageBackground>
                </TouchableOpacity>
            );
        }
    }

    _setModalVisible(visible, data, type,showRules) {
        if (_.isEmpty(data)) {
            data = { content: {}, rs: false };
        }
        this.setState({ modalVisible: visible, amToFinish: false, data: data, type: type,showRules:showRules });
    }

    continueBtnCall() {
        this._setModalVisible(false);
        this.props.continueDraw && this.props.continueDraw(this.state.type);
    }

    showRulesButtonCall() {
        this._setModalVisible(false);
        Helper.pushToRedPacketRules();
    }
}

const styles = StyleSheet.create({
    modalBackgroundStyle: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        marginTop: 0
    },
    contentStyle: {
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center'
    },
    winLabel1: {
        color: 'white',
        fontSize: Size.font30,
        fontWeight: 'bold',
        marginTop: 160,
        marginLeft: 18
    },
    winLabel2: {
        color: 'white',
        fontSize: Size.font12,
        marginTop: 20,
        marginLeft: 18
    },
    winLabel3: {
        color: 'white',
        fontSize: Size.font12,
        marginTop: 5,
        marginLeft: 18
    },
    lostLabelTitle: {
        color: '#EA2D19',
        fontSize: Size.font16,
        marginTop: 115,
        textAlign: 'center',
    },
    lostLabel1: {
        color: 'white',
        fontSize: Size.font12,
        marginTop: 75,
        textAlign: 'center'
    },
    lostLabel2: {
        color: 'white',
        fontSize: Size.font12,
        marginTop: 5
    },
    lostLabel3: {
        color: '#333333',
        fontSize: Size.font16,
        // fontWeight:'bold',
        marginTop: 100,
        textAlign: 'center'
    },
    continueImg: {
        marginLeft: 18,
        marginTop: 20,
        width: 220,
        height: 62,
        justifyContent: 'center',
        alignItems: 'center'
    },
    centerImg: {
        marginTop: (height - 300) / 2,
        width: 320,
        height: 300,
        alignItems: 'center'
    },
    wmzImg: {
        marginTop: (height - 300) / 2,
        width: 272,
        height: 230,
        marginLeft:20,
        alignItems: 'center'
    },
    bgImg: {
        width: 32,
        height: 32,
        position: 'absolute',
        left: width - 80,
        top: 80
    }
});
