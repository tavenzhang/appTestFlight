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

import {width, indexBgColor, indexTxtColor,Size} from '../../resouce/theme'
import Moment from 'moment'
import JXHelper from '../../../Common/JXHelper/JXHelper'
import SoundHelper from '../../../Common/JXHelper/SoundHelper'
import FastImage from 'react-native-fast-image';

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
            return <FastImage
                source={{uri:this.props.rowData.status=='FORBIDDEN'?this.props.rowData.gameIconGrayUrl:this.props.rowData.gameIconUrl}}
                style={styles.leftImgStyle}/>
        } else {
            return <FastImage source={{uri:this.props.rowData.gameIconUrl}}
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