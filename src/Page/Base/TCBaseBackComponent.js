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
    BackHandler,
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
        // if (Platform.OS === 'android') {
        //     BackHandler.addEventListener('hardwareBackPress', () => {
        //         return this.onBackAndroid();
        //     })
        // }
    }

    componentWillUnmount() {
        // if (Platform.OS === 'android') {
        //     BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid);
        // }
    }


    render() {
    }

    onBackAndroid() {
        JXLog("=============back");
        Helper.popToBack();
        return true;
    }

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2F2F2',
    }
});
