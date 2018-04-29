/**
 * Created by Sam on 2017/1/3.
 * Copyright © 2016年 JX. All rights reserved.
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Dimensions,
    TouchableOpacity,
    Image
} from 'react-native';

import NavigatorHelper from '../../../Common/JXHelper/TCNavigatorHelper'
import Moment from 'moment'
import JXHelper from '../../../Common/JXHelper/JXHelper'
import SoundHelper from '../../../Common/JXHelper/SoundHelper'
import {indexBgColor, shoppingTxtColor,Size,width} from '../../resouce/theme'
import { observer } from 'mobx-react/native';

@observer
export default class MyComponent extends Component {

    constructor(state) {
        super(state);
        this.state = {
            timeStr: this.props.mTimer
        };
        this.buttonCall = this.buttonCall.bind(this);
        this.timeCount = 0;

    }

    static defaultProps = {
        icon: 'icon_cp_3',
        title: '',
        mTimer: 1000,
        describe: '',
        duration: 1000,
        pushToEvent: null
    };

    componentDidMount() {
        // this.startTimer();
    }

    componentWillUnmount() {
        this.timer && clearInterval(this.timer);
    }

    componentWillReceiveProps() {
        // this.startTimer()
    }
    //
    // startTimer = () => {
    //     this.timer && clearInterval(this.timer);
    //     this.timeCount = 0;
    //     // 2.添加定时器  this.timer --->可以理解成一个隐式的全局变量
    //     this.timer = setInterval(() => {
    //         let sTime = this.props.mTimer;
    //         this.timeCount = this.timeCount + 1;
    //         this.setState({timeStr: sTime - this.timeCount})
    //     }, this.props.duration)
    // }

    render() {
        return (
            <TouchableOpacity style={styles.container} onPress={this.buttonCall}>
                {this.getImage()}
                <View
                    style={{justifyContent: 'center', alignItems: 'center', flex: 1, marginTop: 5, marginBottom: 10} }>
                    <Text style={{color: shoppingTxtColor.cpTitle, fontSize: Size.font16,marginTop:5}}
                          ellipsizeMode='tail'
                          numberOfLines={1}> {this.props.title} </Text>
                    <Text
                        style={{color:shoppingTxtColor.cpTime, fontSize: Size.font16, marginTop:3,marginBottom:5,width:80,textAlign:"center"}}
                        ellipsizeMode='tail' numberOfLines={1}> {this.props.mobData?this.getShowTime(this.props.mobData.remainingTime>0?this.props.mobData.remainingTime:this.props.mobData.nextremainingTime):''} </Text>
                </View>
            </TouchableOpacity>
        );
    }

    getImage() {
        if (this.props.gameInfo && this.props.gameInfo.status && this.props.gameInfo.status == 'FORBIDDEN') {
            return <Image source={{uri: this.props.icon}} style={styles.leftImgStyle}/>
        } else {
            if (this.props.rowData) {
                return <Image source={JXHelper.getGameIconWithUniqueId(this.props.rowData.gameUniqueId)}
                              style={styles.leftImgStyle}/>
            }
        }
    }

    buttonCall = () => {
        if (this.props.title) {
            if (TC_BUTTON_SOUND_STATUS) {
                SoundHelper.playSoundBundle();
            }

            NavigatorHelper.pushToBetHome(this.props.rowData)
        }
    }

    getShowTime(time){
        return JXHelper.getTimeHHMMSSWithSecond(time)
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        height: width / 3,
        width: width / 3,
        backgroundColor: indexBgColor.itemBg,
        marginBottom: 1
    },

    leftImgStyle: {
        width: 60,
        height: 60,
        marginTop: 10
    }

});
