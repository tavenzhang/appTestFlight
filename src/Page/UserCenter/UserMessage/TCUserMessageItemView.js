/**
 * Created by Sam on 2017/1/12.
 * Copyright © 2016年 JX. All rights reserved.
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';
import Moment from 'moment'
import {Size, width, height, indexBgColor, listViewTxtColor} from '../../resouce/theme'

export default class TCUserMessageItemView extends Component {

    constructor(state) {
        super(state)
    }

    componentDidMount() {
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{marginLeft: 40, marginTop: 15, marginRight: 15, width: width - 60}}>
                    <Text
                        style={{
                            fontSize: Size.font15,
                            color: listViewTxtColor.title,
                            marginBottom: 10
                        }}>{this.props.data.title}</Text>
                </View>
                <View
                    style={{borderBottomWidth: 0.5, borderBottomColor: listViewTxtColor.title, width: width - 30}}>
                    <Text
                        style={{
                            fontSize: Size.font13,
                            color: listViewTxtColor.content,
                            marginLeft: 14,
                            marginBottom: 5
                        }}>{Moment.unix(this.props.data.createTime).format("YYYY年MM月DD号")}</Text>
                </View>
                <View style={{marginLeft: 15, marginTop: 15, marginRight: 15, marginBottom: 20}}>
                    <Text
                        style={{
                            fontSize: Size.font15,
                            color: listViewTxtColor.content
                        }}>{this.props.data.content}</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: width - 20,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: indexBgColor.itemBg,
        marginTop: 15,
        marginLeft: 10
    }
});
