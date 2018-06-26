/**
 * Created by Sam on 19/06/2018.
 * Copyright © 2017年 JX. All rights reserved.
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    ImageBackground,
    TouchableOpacity,
    ScrollView
} from 'react-native';

/**系统 npm类 */

/**组件内部显示需要引入的类 */
import { betHome, indexBgColor, Size, width, height, navbarHight } from '../resouce/theme';
import { Other } from '../asset';
import TopNavigationBar from '../../Common/View/TCNavigationBar';
import JXHelper from '../../Common/JXHelper/JXHelper';
import Toast from '../../Common/JXHelper/JXToast';
import NavigatorHelper from '../../Common/JXHelper/TCNavigatorHelper';
import InitHelper from "../../Common/JXHelper/TCInitHelper";

/** 外部关系组件 如 页面跳转用 */

let TCInitHelper = new InitHelper();
export default class MyComponent extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <TopNavigationBar
                    title={'2018世界杯'}
                    needBackButton={true}
                    backButtonCall={() => {
                        this.goBack();
                    }}
                />
                {this.getContentView()}
                <Image
                    source={Other.worldCup.bg}
                    style={{ width: width, height: 110, position: 'absolute', top: height - 110 }}
                />
            </View>
        );
    }

    goBack() {
        NavigatorHelper.popToBack();
    }

    getContentView() {
        let Arr = [];
        let dsfSportInfos = JXHelper.getDSFOpenList().dsfSportInfos;
        dsfSportInfos.map(platform => {
            if (platform.status && platform.status === 'ON') {
                Arr.push(<MyComponent2 data={platform} />);
            }
        });
        return <ScrollView>{Arr}</ScrollView>;
    }
}

export class MyComponent2 extends React.Component {
    render() {
        return (
            <View style={[styles.container, { marginTop: 5 }]}>
                <ImageBackground
                    source={Other.worldCup[this.props.data.gamePlatform]}
                    resizeMode={'cover'}
                    style={{ width: width - 10, height: 144, justifyContent: 'flex-end' }}
                >
                    <View
                        style={{
                            flexDirection: 'row',
                            backgroundColor: 'rgba(0, 0, 0, 0.6)',
                            height: 40,
                            justifyContent: 'space-between'
                        }}
                    >
                        <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                            <Image
                                source={Other.DSF[this.props.data.gamePlatform]}
                                resizeMode={'cover'}
                                style={{ marginLeft: 3, width: 35, height: 35 }}
                            />
                            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: Size.font16, marginLeft: 5 }}>
                                {this.props.data.gameNameInChinese}
                            </Text>
                        </View>
                        <TouchableOpacity
                            style={{
                                height: 40,
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: 85,
                                marginRight: 10
                            }}
                            onPress={() => this.goToSports(this.props.data)}
                        >
                            <View
                                style={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderColor: 'white',
                                    borderWidth: 1,
                                    width: 85,
                                    height: 30,
                                    borderRadius: 5
                                }}
                            >
                                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: Size.font16 }}>点击进入</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
            </View>
        );
    }

    goToSports(data) {
        if (data.status == 'ON') {
            if (NavigatorHelper.checkUserWhetherLogin()) {
                if(TCInitHelper.isGuestUser()){
                    Toast.showShortCenter(`你当前是: 试玩账号 暂时无法体验,请尽快注册正式账号参与体验吧！`);
                }else {
                    JX_NavHelp.pushView(JX_Compones.TCWebGameView, { gameData: data, title: data.gameDescription });
                }
            } else {
                JX_NavHelp.pushToUserLogin(true);
            }
        } else {
            Toast.showShortCenter(` ${item.gameNameInChinese} 尚未开启! `);
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: indexBgColor.mainBg
    }
});
