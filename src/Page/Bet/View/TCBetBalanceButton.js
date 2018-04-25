/**
 * Created by Sam on 07/06/2017.
 * Copyright © 2017年 JX. All rights reserved.
 */

import React, {
    Component
} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    Image,
} from 'react-native';

import {config} from '../../../Common/Network/TCRequestConfig'
import NetUitls from '../../../Common/Network/TCRequestUitls'
import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter'
import {Size,betHome} from '../../resouce/theme'
export default class MyComponent extends React.Component {

    static defaultProps = {

    };

    constructor(state) {
        super(state);
        this.state = {
            balance:null
        };
    }


    componentDidMount() {
        this.freshBalance()
        this.listener = RCTDeviceEventEmitter.addListener('balanceChange', () => {
            this.freshBalance()
        })
    }


    componentWillUnmount() {
        this.listener && this.listener.remove()
    }

    render() {
        return (
            <View style={{flexDirection: 'row'}}>
                <TouchableHighlight onPress={()=> {
                    this.freshBalance()
                }} style={{marginRight:5, padding:2}} activeOpacity={0.3}
                                    underlayColor='transparent'>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={{color: betHome.balanceTxt, marginLeft: 5, fontSize: Size.font15}}>余额:{this.state.balance == null? (TCUSER_DATA.username && TCUSER_DATA.islogin?TCUSER_BALANCE:0):this.state.balance}元</Text>
                    </View>
                </TouchableHighlight>
            </View>
        );
    };

    freshBalance() {
        if (this.state.isLoading) return
        this.setState({
            isLoading:true
        })
        if (TCUSER_DATA.username && TCUSER_DATA.islogin){
            NetUitls.getUrlAndParamsAndCallback(config.api.userBalance, null, (response) => {
                if (response.rs) {
                    let balance = parseFloat(response.content.balance)
                    this.timer = setTimeout(() => {
                        this.setState({
                            balance:balance,
                            isLoading:false
                        })
                        TCUSER_BALANCE = balance
                    }, 1000)

                } else {

                }
            })
        }
    }
}

