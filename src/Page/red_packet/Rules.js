'use strict'
/**
 * Created by Joyce on 2017/01/11.
 */

import React from 'react';
import {StyleSheet, View, WebView} from 'react-native';
import {height, statusBarHeight} from '../resouce/theme';
import BackBaseComponent from '../Base/TCBaseBackComponent';
import TopNavigationBar from './components/TCNavigationBar';
import RedPacket from './RedPacketData';

export  default  class Rules extends BackBaseComponent {
    RedPacketData = new RedPacket();

    constructor(props) {
        super(props);
        this.webViewUrl = this.RedPacketData.getRedpacketRuleUrl();
    }

    render() {
        return (
            <View style={styles.container}>
                <TopNavigationBar title={'活动规则'} hiddenRightButton={true}/>
                <View  style={styles.webViewContainer}>
                    <WebView
                        ref="webView"
                        automaticallyAdjustContentInsets={true}
                        style={styles.webView}
                        source={{uri: this.webViewUrl}}
                        javaScriptEnabled={true}
                        domStorageEnabled={true}
                        decelerationRate="normal"
                        scalesPageToFit={false}
                        startInLoadingState={true}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: height - statusBarHeight,
        backgroundColor: '#C02218',
    },
    webViewContainer: {
        flex: 1,
        borderRadius: 2,
        margin: 8,
        backgroundColor: '#FFF2E2',
    },
    webView:{
        flex: 1,
        margin: 2,
        backgroundColor: '#FFF2E2',
    }
});
