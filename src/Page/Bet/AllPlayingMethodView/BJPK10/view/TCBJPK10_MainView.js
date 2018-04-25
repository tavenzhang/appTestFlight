/**
 * Created by Sam on 2016/11/28.
 */

import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, Platform } from 'react-native';
import TCBJPK10SpecialKindSelectView from './TCBJPK10SpecialKindSelectView';
import TCBJPK10NumberSelectView from './TCBJPK10NumberSelectView';
import RNShakeEvent from 'react-native-shake-event';
import { MathControllerFactory } from 'lottery-core';
let SingletonDPS = null;
import { betHome } from '../../../../resouce/theme';
export default class TCMarkSix_MainView extends React.Component {
    constructor(props) {
        super(props);
        this.state={
          type:this.props.defaultPlayType,
        };
        SingletonDPS = MathControllerFactory.getInstance().getMathController(this.props.gameUniqueId);
    }

    static defaultProps={
        //一开始默认的玩法
        defaultPlayType:"定位胆",
    };
    componentWillMount() {}
    componentDidMount() {
        if (!__DEV__ && Platform.OS == 'ios') {
            RNShakeEvent.addEventListener('shake', () => {
                this.byShake();
            });
        }
    }

    componentWillUnmount() {
        if (!__DEV__ && Platform.OS == 'ios') {
            RNShakeEvent.removeEventListener('shake');
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                </View>
                {this.renderNumberView()}
            </View>
        );
    }

    renderNumberView() {
        let itemArray = [];
        let duplexMaxCount = 10;
        let type = this.state.type;
        let playGameSetting;
        let offset = 0;
        switch (type) {
            case '前一':
                {
                    duplexMaxCount = 1;
                }
                break;
            case '前二':
                {
                    duplexMaxCount = 2;
                }
                break;
            case '前三':
                {
                    duplexMaxCount = 3;
                }
                break;
            case '后一':
                {
                    offset = 9;
                    duplexMaxCount = 1;
                }
                break;
            case '后二':
                {
                    offset = 8;
                    duplexMaxCount = 2;
                }
                break;
            case '后三':
                {
                    offset = 7;
                    duplexMaxCount = 3;
                }
                break;
            case '定位胆':
                {
                    duplexMaxCount = 10;
                }
                break;
            case '第一名':
            case '第二名':
            case '第三名':
            case '第四名':
            case '第五名':{
                playGameSetting = this.getSingleGamePrizeSettings(type);
                if (!playGameSetting) return;
                itemArray.push(
                    <TCBJPK10SpecialKindSelectView
                        titleName={this.state.type}
                        key={1}
                        odds={' '}
                        areaIndex={0}
                        numberEvent={this.props.numberEvent}
                        numberArray={SingletonDPS.getPlayTypeArray()}
                        prizeSettings={playGameSetting['prizeSettings']}
                    />
                );
                return itemArray;
            }
            case '冠亚和值': {
                playGameSetting = this.getSingleGamePrizeSettings(type);
                if (!playGameSetting) return;
                itemArray.push(
                    <TCBJPK10SpecialKindSelectView
                        titleName={'和值'}
                        key={1}
                        odds={' '}
                        numberEvent={this.props.numberEvent}
                        numberArray={SingletonDPS.getPlayTypeArray()}
                        prizeSettings={playGameSetting['prizeSettings']}
                    />
                );
                return itemArray;
            }
            case '冠亚和': {
                playGameSetting = this.getSingleGamePrizeSettings(type);
                if (!playGameSetting) return;
                itemArray.push(
                    <TCBJPK10SpecialKindSelectView
                        titleName={'和值'}
                        key={1}
                        odds={' '}
                        numberEvent={this.props.numberEvent}
                        numberArray={SingletonDPS.getPlayTypeArray()}
                        prizeSettings={playGameSetting['prizeSettings']}
                    />
                );
                return itemArray;
            }
        }

        this.getDuplexItemArray(itemArray, duplexMaxCount, offset);
        return itemArray;
    }
    getSingleGamePrizeSettings(playMath) {
        let pys = SingletonDPS.getPlayTypeIdWithPlayType(playMath);
        if (pys && TCGameSetting) {
            let playGameSetting =
                TCGameSetting.content['allGamesPrizeSettings'][this.props.gameUniqueId]['singleGamePrizeSettings'][pys];
            return playGameSetting;
        }
        return null;
    }
    getDuplexItemArray(itemArray, duplexMaxCount, offset) {
        for (let i = 0; i < duplexMaxCount; i++) {
            itemArray.push(
                <TCBJPK10NumberSelectView
                    numberEvent={this.props.numberEvent}
                    titleName={SingletonDPS.gameConfig.typeTitles[i + offset]}
                    key={i}
                    areaIndex={i}
                    ref={'ref' + i}
                    numberArray={SingletonDPS.getPlayTypeArray()}
                />
            );
        }
    }

    setPlayMathWith(mathName) {
        this.props.type = mathName;
        this.setState({
            type: mathName
        });
    }

    byShake() {
        if (this.props.shakeEvent == null) return;
        this.props.shakeEvent();
    }

    _numberButtonCall(number, areaIndex) {}
}

const styles = StyleSheet.create({
    container: {
        // justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: betHome.betMidBg
    }
});
