/**
 * Created by allen-jx on 2017/6/13.
 */
import React, {Component, PropTypes,} from 'react'

import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    Modal
} from 'react-native'
import {Size, Color, Window, Direction} from '../../Common/Style/AppStyle'
/**
 * 提示对话框
 */
export default class UpdateUserPriceGroupView extends Component {

    // 构造函数
    constructor(props) {

        super(props)

        this.state = {}
    }

    render() {
        return (
            <View></View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.bg.mainBg,
    }
})