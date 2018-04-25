/**
 * Created by Sam on 18/01/2017.
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
    Image,
    TouchableOpacity,
    BackAndroid,
    Platform
} from 'react-native';

import TopNavigationBar from '../../Common/View/TCNavigationBar';
import {betIcon} from '../resouce/images'
import {Size, indexBgColor, buttonStyle, listViewTxtColor, width, height} from '../resouce/theme'

export default class MyComponent extends React.Component {
    constructor(state) {
        super(state)
        this.state = {}
        this.handleBackAndroid = this.handleBackAndroid.bind(this);
    }

    static defaultProps = {
        isIntelligence: false,
        lastContinueIssueNumber: 0,
        isNeedBack3: false,
    };

    componentDidMount() {
        if (Platform.OS === "android") {
            BackAndroid.addEventListener('hardwareBackPress', this.handleBackAndroid);
        }
    }

    componentWillUnmount() {
        if (Platform.OS === "android") {
            BackAndroid.removeEventListener('hardwareBackPress', this.handleBackAndroid);
        }
    }

    handleBackAndroid() {
        if (this.props.isIntelligence && this.props.isNeedBack3) {
            this.props.navigator.popN(3);
        } else {
            this.props.navigator.popN(2);
        }
        return true;
    }

    render() {
        return (
            <View style={styles.container}>
                <TopNavigationBar title='投注成功' needBackButton={true} backButtonCall={() => {
                    if (this.props.isIntelligence && this.props.isNeedBack3) {
                        this.props.navigator.popN(3);
                    } else {
                        this.props.navigator.popN(2);
                    }
                }}/>

                <View style={styles.innerView}>
                    <Image source={betIcon.success} style={{width: 60, height: 60, marginTop: 30}}/>
                    <Text style={{fontSize: Size.font18, marginTop: 20, color: listViewTxtColor.title}}>投注成功，祝您中奖</Text>
                    <Text
                        style={{
                            fontSize: Size.font14,
                            marginTop: 20,
                            color: listViewTxtColor.content
                        }}>当前投注彩种：{this.props.cpName}</Text>
                    <Text
                        style={{
                            fontSize: Size.font14,
                            marginTop: 10,
                            color: listViewTxtColor.content
                        }}>{this.props.isIntelligence?'当前投注期数：第 '+this.props.issue+' 至 '+this.props.lastContinueIssueNumber+' 期':'当前投注期数：第'+this.props.issue+'期'}</Text>
                </View>

                <TouchableOpacity style={{marginTop: 20}} onPress={() => {
                    if (this.props.isIntelligence && this.props.isNeedBack3) {
                        this.props.navigator.popN(3);
                    } else {
                        this.props.navigator.popN(2);
                    }
                }}>
                    <View
                        style={{
                            width: width - 80,
                            height: 45,
                            backgroundColor: buttonStyle.btnBg,
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 8,
                            marginLeft: 40
                        }}>
                        <Text style={{fontSize: Size.font15, color: buttonStyle.btnTxtColor}}>确定</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: indexBgColor.mainBg,
    },
    innerView: {
        padding: 10,
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
        width: width - 20,
        backgroundColor: indexBgColor.itemBg,
        height: 220
    }
});
