/**
 * Created by Sam on 2016/11/11.
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
    ImageBackground,
    TouchableOpacity
} from 'react-native';
import SoundHelper from '../../Common/JXHelper/SoundHelper'

import {width, indexTxtColor,Size} from '../../Page/resouce/theme'
import _ from 'lodash';
import {common} from '../../Page/resouce/images'

export default class TCNavigationBar extends Component {
    constructor(state) {
        super(state);
        this.state = {
            showBackButton: (this.props.needBackButton),
            showCloseButton: false
        };
    }

    static defaultProps = {
        title: '',
        needBackButton: true,
        rightTitle: '',
        rightImage: null,
        leftTitle: null,
        leftImage: null,
        rightButtonCall: null,
        closeButtonCall: null,
        titleStyle: null,
        centerViewShowStyleImage:false
    }

    componentDidMount() {

    }

    render() {
        return (
            <ImageBackground style={styles.navBarStyle} source={ common.topBg }
                   resizeMode={'cover'}>
                {/*左边*/}
                {this.renderGetBackButton()}
                {/*中间*/}
                <TouchableOpacity disabled={this.props.midCall ? false : true} onPress={()=>this.props.midCall()}>
                    <View style={[{width: width - 150, justifyContent: 'center', alignItems: 'center'}, this.props.titleStyle]}>
                        {this.getCenterView()}
                    </View>
                </TouchableOpacity>
                {this.renderGetRightButton()}
                {/*<View style={styles.rightViewStyle}>*/}
                {/*</View>*/}
            </ImageBackground>
        );
    }

    getCenterView(){
        if(this.props.renderCenter){
            return(this.props.renderCenter())
        }
        if(this.props.centerViewShowStyleImage&&common.topTitleIndex){
            return(<Image resizeMode={'contain'} style={{width: width - 180,height:40,marginTop: Platform.OS == 'ios' ? 22 : 2}} source={common.topTitleIndex}/>)
        }
        return (<Text style={styles.titleStyle} ellipsizeMode='tail'
                      numberOfLines={1}> {this.props.title} </Text>)
    }

    renderGetBackButton() {

        if (this.state.showCloseButton) {
            return (
                <View style={{flexDirection: 'row', position: 'absolute', left: -5}}>
                    <TouchableOpacity
                        onPress={()=>this.backButtonCall()}
                        underlayColor='#DEDEDE'
                        style={styles.leftImageViewStyle}
                    >
                        <Image source={common.back} style={styles.navLeftImgStyle}/>
                    </TouchableOpacity>

                    {/*<TouchableOpacity*/}
                    {/*onPress={()=> {this.closeButtonCall()}}*/}
                    {/*underlayColor='#DEDEDE'*/}
                    {/*style={{marginLeft: 5, backgroundColor: 'transparent'}}*/}
                    {/*>*/}
                    {/*<Text style={styles.leftTitleStyle}>关闭</Text>*/}
                    {/*</TouchableOpacity>*/}
                </View>
            )
        }

        if (this.props.needBackButton == true) {
            return (
                <TouchableOpacity
                    onPress={this.backButtonCall}
                    underlayColor='#DEDEDE'
                    style={styles.leftImageViewStyle}
                >
                    {this.getBackImage()}
                </TouchableOpacity>
            )
        }

        if (this.props.leftTitle) {
            return <TouchableOpacity
                onPress={()=> {
                    this.backButtonCall()
                }}
                underlayColor='#DEDEDE'
                style={styles.leftViewStyle}
            >
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={styles.leftTitleStyle}>{this.props.leftTitle}</Text>
                </View>
            </TouchableOpacity>
        }
    }

    getBackImage() {
        if (_.startsWith(this.props.leftImage, 'index_personal')) {
            return <Image source={common.topPersonal} style={styles.navLeftImgStyle}/>
        } else if (this.props.leftImage) {
            return <Image source={{uri: this.props.leftImage}} style={styles.navLeftImgStyle}/>
        } else {
            return <Image source={common.back} style={styles.navLeftImgStyle}/>
        }
    }

    backButtonCall = () => {
        if (this.props.backButtonCall == null) return;

        if (TC_BUTTON_SOUND_STATUS) {
            SoundHelper.playSoundBundle();
        }

        this.props.backButtonCall();
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
                    <View style={{justifyContent: 'center', alignItems: 'center'}}>
                        <Text
                            style={this.props.rightTitle.length === 2 ? styles.rightBoldTitleStyle : styles.rightTitleStyle}>{this.props.rightTitle}</Text>
                    </View>
                </TouchableOpacity>
            )
        } else if (this.props.rightImage) {
            return (<TouchableOpacity
                onPress={()=> {
                    this.rightButtonCall()
                }}
                underlayColor='#DEDEDE'
                style={styles.rightViewStyle}
            >
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                    <Image source={this.props.rightImage} style={styles.navRightImgStyle}/>
                </View>
            </TouchableOpacity>)
        }
    }

    closeButtonCall() {
        if (this.props.closeButtonCall == null) return;
        this.props.closeButtonCall();
    }

    rightButtonCall() {
        if (this.props.rightButtonCall == null) return;

        if (TC_BUTTON_SOUND_STATUS) {
            SoundHelper.playSoundBundle();
        }

        this.props.rightButtonCall();
    }

    _showCloseButton(show) {
        this.setState({showCloseButton: show})
    }
}

const styles = StyleSheet.create({
    navLeftImgStyle: {
        width: 45,
        height: 45,
        marginTop: Platform.OS == 'ios' ? 20 : 0,
    },
    navRightImgStyle: {
        width: 55,
        height: 55,
        marginTop: Platform.OS == 'ios' ? 20 : 0,
    },
    navBarStyle: {
        //导航条样式
        width: width,
        flexDirection: 'row',
        height: Platform.OS == 'ios' ? 64 : 44,
        // backgroundColor: '#d91d37',
        //垂
        alignItems: 'center',
        //设置主轴对齐方式
        justifyContent: 'center'
    },
    titleStyle: {
        marginTop: Platform.OS == 'ios' ? 20 : 0,
        fontSize: Size.font20,
        color: indexTxtColor.topTitle,
        fontWeight: 'bold',
        alignItems: 'center',
        backgroundColor: 'transparent'
    },
    leftImageViewStyle: {
        position: 'absolute',
        left: 0,
        width: 100,
    },
    leftViewStyle: {
        position: 'absolute',
        left: 0,
        backgroundColor: 'transparent',
        width: 60,
        height: Platform.OS == 'ios' ? 64 : 44,
    },
    closeViewStyle: {
        backgroundColor: 'transparent'
    },
    rightViewStyle: {
        position: 'absolute',
        right: 0,
        backgroundColor: 'transparent',
        width: 80,
        height: Platform.OS == 'ios' ? 64 : 44,
    },
    rightTitleStyle: {
        fontSize: Size.font16,
        color: indexTxtColor.topTitle,
        alignItems: 'center',
        marginTop: Platform.OS == 'ios' ? 35 : 10,
    },
    leftTitleStyle: {
        fontSize: Size.font18,
        color: indexTxtColor.topTitle,
        alignItems: 'center',
        marginTop: Platform.OS == 'ios' ? 35 : 10,
        fontWeight: 'bold'
    }, rightBoldTitleStyle: {
        fontSize: Size.font18,
        color: indexTxtColor.topTitle,
        fontWeight: 'bold',
        alignItems: 'center',
        marginTop: Platform.OS == 'ios' ? 35 : 10,
    },
});