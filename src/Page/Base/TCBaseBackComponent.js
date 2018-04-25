/**
 * Created by Sam on 2017/1/5.
 * Copyright © 2016年 JX. All rights reserved.
 */

import React, {
    Component
} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    InteractionManager,
    BackAndroid,
    Platform
} from 'react-native';
import Helper from '../../Common/JXHelper/TCNavigatorHelper'
export default class TCBaseBackComponent extends React.Component {
    constructor(state) {
        super(state)
        this.state = {}
    }

    static defaultProps = {};

    componentDidMount() {
        if (Platform.OS === 'android') {
            BackAndroid.addEventListener('hardwareBackPress', () => {
                this.onBackAndroid()
                return !Helper.isTopPage()
            })
        }
    }

    componentWillUnmount() {
        if (Platform.OS === 'android') {
            BackAndroid.removeEventListener('hardwareBackPress', this.onBackAndroid);
        }
    }


    render() {
    }

    onBackAndroid() {
        Helper.popToBack()
    }

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2F2F2',
    }
});
