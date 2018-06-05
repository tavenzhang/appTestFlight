/**
 * Created by Sam on 2016/11/14.
 */



/*

 ** use for import **
 import TopNavigationBar from '../../Common/View/TCNavigationBar'

 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Platform,
    Image,
    Button,
    TouchableOpacity,
    ImageBackground
} from 'react-native';
import SoundHelper from '../../../Common/JXHelper/SoundHelper'
import {common} from '../../resouce/images'
import {Size, width, indexTxtColor, titleBarStyle,navbarHight,navbarMarginTop} from '../../resouce/theme'
export default class TCBetBar extends React.Component {

    constructor(state) {
        super(state);
        this.state = {
            showBackButton: (this.props.needBackButton),
            title: this.props.title,
        };
    }

    static defaultProps = {
        title: '',
        needBackButton: true,
        backButtonCall: null,
        centerButtonCall: null,
        rightButtonCall: null,
        rightTitle: '购彩助手',
    }

    componentDidMount() {

    }

    render() {
        return (
            <ImageBackground style={styles.navBarStyle} source={common.topBg} resizeMode={'cover'}>
                {/*左边*/}
                {this.renderGetBackButton()}
                {/*中间*/}
                <Text
                    style={{width: 16, color: titleBarStyle.titleText, fontSize: Size.font12, marginTop:navbarMarginTop}}>玩法</Text>
                <TouchableOpacity onPress={this.centerButtonCall} style={{
                    borderRadius: 3,
                    borderWidth: 0.8,
                    borderColor: titleBarStyle.titleBorder,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: navbarMarginTop,
                    padding: 5
                }}>
                    <Text style={styles.titleStyle}>{this.state.title}</Text>
                    <Image source={common.topBarArrow} style={styles.arrowImgStyle}/>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={this.backButtonCall.bind(this)}
                    underlayColor='#DEDEDE'
                >
                    <Text style={styles.rightViewStyle}></Text>
                </TouchableOpacity>

                {this.renderGetRightButton()}
            </ImageBackground>
        );
    }

    renderGetBackButton() {

        if (this.state.showBackButton == true) {
            return (
                <TouchableOpacity
                    onPress={this.backButtonCall.bind(this)}
                    underlayColor='#DEDEDE'
                    style={styles.leftViewStyle}
                >
                    <View  >
                        <Image source={common.back} style={styles.navLeftImgStyle}/>
                    </View>
                </TouchableOpacity>
            )
        }
    }

    renderGetRightButton() {
        if (this.props.rightTitle) {
            return (
                <TouchableOpacity
                    onPress={()=> {
                        this.rightButtonCall()
                    }}
                    underlayColor='#DEDEDE'
                    style={styles.rightViewStyle}
                >
                    <View>
                        <Text style={styles.rightTitleStyle}>{this.props.rightTitle}</Text>
                    </View>
                </TouchableOpacity>
            )
        }
    }

    backButtonCall() {
        if (this.props.backButtonCall == null) return;

        if (TC_BUTTON_SOUND_STATUS) {
            SoundHelper.playSoundBundle();
        }

        this.props.backButtonCall();
    }

    rightButtonCall() {
        if (this.props.rightButtonCall == null) return;

        if (TC_BUTTON_SOUND_STATUS) {
            SoundHelper.playSoundBundle();
        }

        this.props.rightButtonCall();
    }

    centerButtonCall = () => {
        if (this.props.centerButtonCall == null) return;

        if (TC_BUTTON_SOUND_STATUS) {
            SoundHelper.playSoundBundle();
        }

        this.props.centerButtonCall();
    };

    setTitle(playMathName) {
        this.setState({
            title: playMathName
        })
    }
}


const styles = StyleSheet.create({
    navLeftImgStyle: {
        width: 45,
        height: 45,
        marginTop: navbarMarginTop,

    },
    arrowImgStyle: {
        width: Platform.OS === 'ios' ? 12 : 14.5,
        height: Platform.OS === 'ios' ? 7 : 9,
        marginLeft: 5,
        marginRight: 5
    },
    navBarStyle: {
        //导航条样式
        width: width,
        flexDirection: 'row',
        height: navbarHight,
        // backgroundColor: '#d91d37',
        //垂
        alignItems: 'center',
        //设置主轴对齐方式
        justifyContent: 'center',
        backgroundColor: 'transparent'
    },
    titleStyle: {
        fontSize: Size.font18,
        color: titleBarStyle.titleText,
        fontWeight: 'bold',
        alignItems: 'center',
        paddingLeft: 10,
        backgroundColor: 'transparent'
    },
    leftViewStyle: {
        position: 'absolute',
        left: 0,
        width: 100,
    },
    rightViewStyle: {
        top: navbarMarginTop+5,
        position: 'absolute',
        right: 5,
    },
    rightTitleStyle: {
        marginTop: 10,
        fontSize: Size.font15,
        color: indexTxtColor.topTitle,

    }
});