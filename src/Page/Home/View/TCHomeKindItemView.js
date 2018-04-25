/**
 * Created by Sam on 2016/11/12.
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Dimensions,
    Image,
    TouchableOpacity
} from 'react-native';

// import TimerMixin from 'react-timer-mixin';
//

import {width, indexBgColor, indexTxtColor,Size} from '../../resouce/theme'
import Moment from 'moment'
import JXHelper from '../../../Common/JXHelper/JXHelper'
import SoundHelper from '../../../Common/JXHelper/SoundHelper'

export default class HomeKindItemView extends React.Component {

    constructor(state) {
        super(state);
        this.state = {
            timeStr: this.props.mTimer - Moment().format('X')
        };
    }

    static defaultProps = {
        pushToEvent: null,
        duration: 1000,
    };

    componentDidMount() {
        // this.startTimer();
    }

    componentWillReceiveProps() {
        // this.startTimer()
    }

    componentWillMount() {
        this.timer && clearInterval(this.timer);
    }

    startTimer = () => {
        this.timer && clearInterval(this.timer);
        // 2.添加定时器  this.timer --->可以理解成一个隐式的全局变量
        this.timer = setInterval(() => {
            let sTime = this.props.mTimer - Moment().format('X')
            this.setState({timeStr: sTime})
        }, this.props.duration)
    }

    render() {
        return (
            <TouchableOpacity style={styles.container} onPress={()=> {
                this.buttonCall()
            }}
            >
                {this.getImage()}
                <View style={{marginLeft: 5, justifyContent: 'center', flex: 1, marginRight: 8} }>
                    <Text style={{color: indexTxtColor.cpTitle, fontSize: Size.font16}} ellipsizeMode='tail'
                          numberOfLines={1}> {this.props.rowData.gameNameInChinese} </Text>
                    <Text
                        style={{color: indexTxtColor.cpDescription, fontSize: width >= 375 ? Size.font14 : Size.font12, marginTop: 5}}
                        ellipsizeMode='tail'
                        numberOfLines={1}> {this.props.rowData.gameDescription} </Text>
                </View>
            </TouchableOpacity>
        );
    };

    getImage() {
        if (this.props.rowData && this.props.rowData.status && this.props.rowData.status == 'FORBIDDEN') {
           return <Image
                source={{uri:this.props.rowData.status=='FORBIDDEN'?this.props.rowData.gameIconGrayUrl:this.props.rowData.gameIconUrl}}
                style={styles.leftImgStyle}/>
        } else {
            return <Image source={JXHelper.getGameIconWithUniqueId(this.props.rowData.gameUniqueId)}
                          style={styles.leftImgStyle}/>
        }
    }

    buttonCall = () => {
        if (this.props.pushToEvent == null) return

        if (TC_BUTTON_SOUND_STATUS) {
            SoundHelper.playSoundBundle();
        }

        this.props.pushToEvent(this.props.rowData);
    }

    getSurplusTime = () => {
        let hh = '00'
        let mm = '00'
        let ss = '00'
        if (this.props.title.length <= 0) {
            return ' '
        }

        if (!this.state.timeStr) {
            return ''
        }

        if (!this.props.mTimer || this.props.mTimer <= 0) {
            if (this.props.title && this.props.title.length > 0)
                return hh + ":" + mm + ":" + ss
        }

        if (this.state.timeStr) {
            hh = Math.floor(this.state.timeStr / 3600)
            if (hh < 0) {
                hh = 0
            }
            hh = hh < 10 ? "0" + hh : hh
        }

        if (this.state.timeStr) {
            mm = Math.floor(this.state.timeStr % 3600 / 60)
            if (mm < 0) {
                mm = 0
            }
            mm = mm < 10 ? "0" + mm : mm
        }

        if (this.state.timeStr) {
            ss = Math.floor(this.state.timeStr % 60)
            if (ss < 0) {
                ss = 0
            }
            ss = ss < 10 ? "0" + ss : ss
        }
        return hh + ":" + mm + ":" + ss
    }

}

const styles = StyleSheet.create({
    container: {
        backgroundColor: indexBgColor.itemBg,
        flexDirection: 'row',
        height: 90,
        width: width / 2 - 0.5,
        alignItems: 'center',
        marginBottom: 0.5,
        marginLeft: 0.5
    },

    leftImgStyle: {
        width: 60,
        height: 60,
        marginLeft: 8
    }

});