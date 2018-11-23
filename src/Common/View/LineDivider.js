/**
 * Created by jason on 17/11/01.
 */

import React, {Component,} from 'react'
import {View, Dimensions, StyleSheet} from "react-native";
import {Size} from "../../Page/resouce/theme";

const {width,height} = Dimensions.get('window')

/**
 * 水平和垂直分割线 组件
 * 使用方式：1、mode:horizontal vertical 分别为水平模式和垂直模式
 *          2、lineSize 分割线粗细值
 *          3、lineHeight: 在垂直模式，为垂直分割线高度
 *          4、默认为水平分割线
 */
export default class LineDivider extends Component {

    static defaultProps = {
        bgColor: '#eeeeee',//分割线的颜色
        mode: 'horizontal',//默认为水平分割线
        lineSize: Size.pixel,//默认为一个像素的宽度
        lineHeight:40,//垂直模式下 的高度
    };

    // static propTypes={
    //     bgColor:PropTypes.string,
    //     mode:PropTypes.string,//horizontal vertical
    //     lineSize:PropTypes.number,
    //     lineHeight:PropTypes.number,
    // };

    render() {
        if (this.props.mode==='horizontal') {
            return <View
                style={[styles.horizontalStyle, {height: this.props.lineSize, backgroundColor: this.props.bgColor}]}/>
        } else {
            return <View
                style={[styles.verticalStyle, {width: this.props.lineSize,height:this.props.lineHeight, backgroundColor: this.props.bgColor,}]}/>

        }
    }
}

let styles = StyleSheet.create({
    horizontalStyle: {
        width: width,
        height: Size.pixel,
    },
    verticalStyle: {
        width: Size.pixel,
    }
});