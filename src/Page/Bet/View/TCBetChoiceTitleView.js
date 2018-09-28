/**
 * Created by Sam on 2016/12/13.
 */
/**
 * Created by Sam on 2016/11/11.
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    ImageBackground,
    Platform
} from 'react-native';
import {betIcon} from '../../asset/images'
import {Size, betHome} from '../../resouce/theme'
export default class TCBetChoiceTitleView extends Component {

    static defaultProps = {
        titleName: '',
        isGrayBackground: false,
        style: []
    };

    render() {
        return (
            <ImageBackground source={this.props.isGrayBackground ? betIcon.bgPlace02 : betIcon.bgPlace}
                   style={[{width: 45*1.3, height: 20*1.3,alignItems:'center'}, this.props.style]}>
                <Text
                    style={[styles.leftTitleStyle, this.props.isGrayBackground ? {color:betHome.betLeftGrayTitle} : {}]}>{this.props.titleName}</Text>
            </ImageBackground>
        );
    };
}


const styles = StyleSheet.create({
    leftTitleStyle: {
        fontSize: Size.font15,
        textAlign: "center",
        height: 20 * 1.3,
        width: 50,
        marginTop: Platform.OS == 'ios' ? 5 : 0,
        marginLeft: 1,
        color: betHome.betLeftTitle,
        backgroundColor: 'transparent'
    },
});