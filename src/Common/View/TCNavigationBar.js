/**
 * Created by Sam on 2016/11/11.
 */

/*
 ** use for import **
 import TopNavigationBar from '../../Common/View/TCNavigationBar'
 */

import React, {Component, PropTypes} from 'react';
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

import {width, indexTxtColor,Size} from '../../Page/resouce/theme'
import _ from 'lodash';
export default class TCNavigationBar extends React.Component {
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
            <ImageBackground style={styles.navBarStyle}
                   resizeMode={'cover'}>
                <TouchableOpacity disabled={this.props.midCall ? false : true} onPress={()=>this.props.midCall()}>
                    <View style={[{width: width - 150, justifyContent: 'center', alignItems: 'center'}, this.props.titleStyle]}>
                        {this.getCenterView()}
                    </View>
                </TouchableOpacity>
            </ImageBackground>
        );
    }

    getCenterView(){
        return (<Text style={styles.titleStyle} ellipsizeMode='tail'
              numberOfLines={1}> {this.props.title} </Text>)
    }
}

const styles = StyleSheet.create({
    navLeftImgStyle: {
        width: 45,
        height: 45,
        marginTop: Platform.OS == 'ios' ? 20 : 0,
    },
    navRightImgStyle: {
        width: 60,
        height: 60,
        marginTop: Platform.OS == 'ios' ? 20 : 0,
    },
    navBarStyle: {
        //导航条样式
        width: width,
        flexDirection: 'row',
        height: Platform.OS == 'ios' ? 64 : 44,
        backgroundColor: '#0187f7',
        //垂
        alignItems: 'center',
        //设置主轴对齐方式
        justifyContent: 'center'
    },
    titleStyle: {
        marginTop: Platform.OS == 'ios' ? 20 : 0,
        fontSize: 22,
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