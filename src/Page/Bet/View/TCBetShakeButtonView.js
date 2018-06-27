/**
 * Created by Sam on 2016/12/22.
 */
/**
 * Created by Sam on 2016/11/11.
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    Image,
    Alert
} from 'react-native';

import  * as PlayMathConfig from '../../../Data/JXPlayMathConfig'

import {betIcon} from '../../resouce/images'

import {observer} from 'mobx-react/native';

@observer
export default class MyComponent extends React.Component {

    constructor(state) {
        super(state);
        this.state = {
            playMath: '',
            gameUniqueId: ''
        };
    }

    static defaultProps = {};



    render() {
        JXLog("TCSSC------------TCBetShake--333-----------");
        return (
            <View style={{flexDirection: 'row'}}>
                <TouchableHighlight onPress={null} style={{width: 60}} activeOpacity={0.5}
                                    underlayColor='transparent'>
                    <View style={{flexDirection: 'row', marginTop: 7, alignItems: 'center'}}>
                        <Image source={betIcon.shake} style={{width: 25, height: 25, marginLeft: 10}}/>
                        {/*<Text style={{color: '#666666', marginLeft: 5, fontSize: 15}}>摇一摇</Text>*/}
                    </View>
                </TouchableHighlight>
            </View>
        );
    };

    resetPlayMath(playMath, gameUniqueId) {
        JXLog("TCSSC------------TCBetShake--------resetPlayMath-----")
        this.setState({
            gameUniqueId: gameUniqueId,
            playMath: playMath
        })
    }

}
