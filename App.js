/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import AnalyticsUtil from './AnalyticsUtil';
import { Platform, StyleSheet, Text, View } from 'react-native';

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
    android: 'Double tap R on your keyboard to reload,\n' + 'Shake or press menu button for dev menu'
});

type Props = {};

import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/FontAwesome';
const MK = require('react-native-material-kit');
const { MKButton, MKColor } = MK;

const ColoredRaisedButton = MKButton.coloredButton()
    .withText('BUTTON3')
    .withOnPress(() => {
        console.log("Hi, it's a colored button!");
    })
    .build();

import Svg, {
    Circle,
    Ellipse,
    G,
    LinearGradient,
    RadialGradient,
    Line,
    Path,
    Polygon,
    Polyline,
    Rect,
    Symbol,
    Use,
    Defs,
    Stop
} from 'react-native-svg';

import { BlurView, VibrancyView } from 'react-native-blur';
import SplashScreen from 'react-native-splash-screen'
import ActionButton from 'react-native-action-button';
import Icon2 from 'react-native-vector-icons/Ionicons';
var DeviceInfo = require('react-native-device-info');


export default class App extends Component<Props> {
    componentDidMount() {
        // do anything while splash screen keeps, use await to wait for an async task.
        SplashScreen.hide();//关闭启动屏幕

        const uniqueId = DeviceInfo.getUniqueID();
        console.log('uniqueId = ' + uniqueId)

    }
    render() {
        // AnalyticsUtil.onEvent('123456')
        return (
            <View style={styles.container}>
                <FastImage
                    style={styles.image}
                    source={{
                        uri: 'https://media2.giphy.com/avatars/nikdudukovic/ylDRTR05sy6M.gif',
                        headers: { Authorization: 'someAuthToken' },
                        priority: FastImage.priority.normal
                    }}
                    resizeMode={FastImage.resizeMode.contain}
                />
                <Icon name="rocket" size={30} color="#900" />
                <ColoredRaisedButton />
                <Svg height="150" width="300">
                    <Defs>
                        <LinearGradient id="grad" x1="0" y1="0" x2="170" y2="0">
                            <Stop offset="0" stopColor="rgb(255,255,0)" stopOpacity="0" />
                            <Stop offset="1" stopColor="red" stopOpacity="1" />
                        </LinearGradient>
                    </Defs>
                    <Ellipse cx="150" cy="75" rx="85" ry="55" fill="url(#grad)" />
                </Svg>

                <View style={{backgroundColor: '#f3f3f3'}}>
                    {/* Rest of the app comes ABOVE the action button component !*/}
                    <ActionButton buttonColor="rgba(231,76,60,1)">
                        <ActionButton.Item buttonColor='#9b59b6' title="New Task" onPress={() => console.log("notes tapped!")}>
                            <Icon2 name="md-create" style={styles.actionButtonIcon} />
                        </ActionButton.Item>
                        <ActionButton.Item buttonColor='#3498db' title="Notifications" onPress={() => {}}>
                            <Icon2 name="md-notifications-off" style={styles.actionButtonIcon} />
                        </ActionButton.Item>
                        <ActionButton.Item buttonColor='#1abc9c' title="All Tasks" onPress={() => {}}>
                            <Icon2 name="md-done-all" style={styles.actionButtonIcon} />
                        </ActionButton.Item>
                    </ActionButton>
                </View>

                <BlurView blurType={'light'} blurAmount={100} style={[styles.blurView]} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5
    },
    image: {
        width: 80,
        height: 80
    },
    blurView: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 100,
        bottom: 600
    },actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: 'white',
    }
});
