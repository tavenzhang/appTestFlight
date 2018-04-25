/**
 * Created by Sam on 2016/11/28.
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Platform
} from 'react-native';

import MarkSix_DPS from '../data/TCPCDD_DPS'
import _ from 'lodash';

import * as PlayConfig from '../../../../../Data/JXPlayMathConfig'
import {MathControllerFactory} from 'lottery-core'


let SingletonDPS = null;

import TCMarkSixSpecialKindSelectView from './TCPCDDSpecialKindSelectView'
import TCPCDDNumberSelectView from './TCPCDDNumberSelectView'

import ShakeButton from '../../../View/TCBetShakeButtonView'
import RNShakeEvent from 'react-native-shake-event';
import {betHome} from '../../../../resouce/theme'

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
        defaultPlayType:"混合",
    };

    componentDidMount() {
        if(!__DEV__&&Platform.OS == 'ios'){
            RNShakeEvent.addEventListener('shake', () => {
                this.byShake()
            });
        }
    }

    componentWillUnmount() {
        if(!__DEV__&&Platform.OS == 'ios'){
            RNShakeEvent.removeEventListener('shake')
        }
    }

    render() {
        return (
            <View style={styles.container}>
                {/*<ShakeButton shakeEvent={()=>this.byShake()}/>*/}
                {this.renderNumberView()}
            </View>
        );
    };

    renderNumberView() {
        let itemArray = []
        let type = this.state.type
        let playGameSetting = this.getSingleGamePrizeSettings(type)
        if (!playGameSetting) return
        SingletonDPS.addOddsArray(playGameSetting['prizeSettings'][0].prizeAmount);
        switch (type) {
            case '混合': {
                itemArray.push(<TCMarkSixSpecialKindSelectView titleName={'混合'} key={1} odds={' '}
                                                               numberArray={SingletonDPS.getPlayTypeArray()}
                                                               prizeSettings={playGameSetting['prizeSettings']}
                                                               numberEvent={this.props.numberEvent}
                />)
            }
                break
            case '特码': {
                itemArray.push(<TCPCDDNumberSelectView titleName={'特码'} key={1} odds={' '}
                                                       numberArray={SingletonDPS.getPlayTypeArray()}
                                                       prizeSettings={playGameSetting['prizeSettings']}
                                                       numberEvent={this.props.numberEvent}
                                                       isNeedQDXDSQ={true}
                />)
            }
                break
            case '特码包三': {
                let xprizeSettings = playGameSetting['prizeSettings']
                let set = xprizeSettings[0]
                itemArray.push(<TCPCDDNumberSelectView titleName={'包三'} key={1} odds={set.prizeAmount}
                                                       numberArray={SingletonDPS.getPlayTypeArray()}
                                                       numberEvent={this.props.numberEvent}
                />)
            }
                break
            case '波色': {
                itemArray.push(<TCMarkSixSpecialKindSelectView titleName={'波色'} key={1} odds={' '}
                                                               numberArray={SingletonDPS.getPlayTypeArray()}
                                                               prizeSettings={playGameSetting['prizeSettings']}
                                                               numberEvent={this.props.numberEvent}
                />)
            }
                break
            case '豹子': {
                itemArray.push(<TCMarkSixSpecialKindSelectView titleName={'豹子'} key={1} odds={' '}
                                                               numberArray={SingletonDPS.getPlayTypeArray()}
                                                               prizeSettings={playGameSetting['prizeSettings']}
                                                               numberEvent={this.props.numberEvent}
                />)
            }
                break

        }
        return itemArray;
    }

    getSingleGamePrizeSettings(playMath) {
        let pys = SingletonDPS.getPlayTypeIdWithPlayType(playMath)
        if (pys && TCGameSetting) {
            let playGameSetting = TCGameSetting.content['allGamesPrizeSettings'][this.props.gameUniqueId]['singleGamePrizeSettings'][pys]
            return playGameSetting
        }
        return null
    }

    setPlayMathWith(mathName) {
        this.props.type = mathName;
        console.log(mathName)
        this.setState({
            type: mathName
        })
    }

    byShake() {
        if (this.props.shakeEvent == null) return
        this.props.shakeEvent()
    };

}


const styles = StyleSheet.create({
    container: {
        backgroundColor: betHome.betMidBg
    }
});