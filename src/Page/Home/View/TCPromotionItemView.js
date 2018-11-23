/**
 * Created by Sam on 2017/1/12.
 * Copyright © 2016年 JX. All rights reserved.
 */

import React, {Component} from 'react';

import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image
} from 'react-native';
import Moment from 'moment'
import NavigatorHelper from '../../../Common/JXHelper/TCNavigatorHelper'
import {Size, width, height, indexBgColor, listViewTxtColor} from '../../resouce/theme'
export default class TCPromotionItemView extends Component {
    constructor(state) {
        super(state)
        this.state = {}
    }

    static defaultProps = {
        selectedEvent: null
    };

    componentDidMount() {
    }

    render() {
        return (
            <View style={styles.container}>
                    <Text
                        style={{
                            fontSize: Size.font15,
                            color: listViewTxtColor.title,
                            marginBottom: 5,
                            marginLeft:10,
                            marginTop:10
                        }}>{this.props.data.title}</Text>

                    <TouchableOpacity onPress={() => {
                        NavigatorHelper.pushToWebView(this.props.data.userClickUrl, this.props.data.title)
                    }}>
                        <Image source={{uri: this.props.data.bannerImageUrl}} style={styles.img}/>
                    </TouchableOpacity>
                    <Text
                        style={{
                            fontSize: Size.font12,
                            color: listViewTxtColor.content,
                            marginLeft:10,
                            marginTop:10,
                            marginBottom:5
                        }}>{this.props.data.summary}</Text>

                <TouchableOpacity onPress={() => {
                    NavigatorHelper.pushToWebView(this.props.data.userClickUrl, this.props.data.title)
                }}>
                    <Text
                    style={{
                        fontSize: Size.font15,
                        color: listViewTxtColor.title,
                        marginBottom: 5,
                        marginLeft:10,
                        paddingTop:5,
                        borderTopWidth:0.5,
                        borderTopColor:listViewTxtColor.content,
                        width:width-40
                    }}>查看详情</Text></TouchableOpacity>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: width - 20,
        backgroundColor: indexBgColor.itemBg,
        marginTop: 5,
        borderWidth: 0.5,
        borderColor: listViewTxtColor.content,
        borderRadius: 5,
        marginLeft:10
    }, img: {
        width: width-40,
        flex: 1,
        height: width * 0.383,
        marginLeft:10,
        resizeMode:'stretch'
    }
});
