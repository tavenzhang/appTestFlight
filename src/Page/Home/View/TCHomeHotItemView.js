/**
 * Created by Sam on 2016/12/13.
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
import {width,indexBgColor,indexTxtColor,Size} from '../../resouce/theme'

const colorArray = indexTxtColor.homePageHotCPTitle
import JXHelper from '../../../Common/JXHelper/JXHelper'
import SoundHelper from '../../../Common/JXHelper/SoundHelper'

export default class TCHomeHotItemView extends React.Component {

    constructor(state) {
        super(state);
        this.state = {
            timeStr: this.props.mTimer
        };
    }

    static defaultProps = {
        rowData: null,
        pushToEvent: null
    };

    componentDidMount() {
        // this.startTimer();
    }

    componentWillMount() {
        this.timer && clearInterval(this.timer);
    }

    startTimer = () => {
        // 2.添加定时器  this.timer --->可以理解成一个隐式的全局变量
        this.timer = setInterval(() => {
            this.setState({
                timeStr: (this.state.timeStr - 1)
            });
        }, this.props.duration);
    }

    render() {
        let index = (7 + this.props.rowID) % 7
        return (
            <TouchableOpacity style={styles.container} onPress={()=> {
                this.buttonCall()
            }}>
                <View style={{marginLeft: 10, justifyContent: 'center', width: width / 2 - 80} }>
                    <Text style={{color: colorArray[index], fontSize: Size.font16}} ellipsizeMode='tail'
                          numberOfLines={1}> {this.props.rowData.gameNameInChinese} </Text>
                    <Text style={{color: indexTxtColor.cpDescription, fontSize:width>=375?Size.font14:Size.font12, marginTop: 8}}
                          ellipsizeMode='tail' numberOfLines={1}> {this.props.rowData.gameDescription} </Text>
                </View>
                {this.getImage()}
            </TouchableOpacity>
        )
    }

    getImage() {
        if (!this.props.rowData.gameUniqueId) {
            return
        }
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
        if (!this.props.rowData.gameUniqueId) {
            return
        }
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

        if (this.state.timeStr) {
            hh = Math.floor(this.state.timeStr / 3600)
            hh = hh < 10 ? "0" + hh : hh
        }

        if (this.state.timeStr) {
            mm = Math.floor(this.state.timeStr % 3600 / 60)
            mm = mm < 10 ? "0" + mm : mm
        }

        if (this.state.timeStr) {
            ss = Math.floor(this.state.timeStr % 60)
            ss = ss < 10 ? "0" + ss : ss

        }
        return hh + ":" + mm + ":" + ss
    }

}

const styles = StyleSheet.create({
    container: {
        backgroundColor: indexBgColor.itemBg,
        flexDirection: 'row',
        height: 80,
        width: width / 2 - 0.5,
        alignItems: 'center',
        marginBottom: 0.5,
        marginLeft: 0.5
    },

    leftImgStyle: {
        width: 60,
        height: 60,
    }

});