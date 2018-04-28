/**
 * Created by Sam on 06/02/2017.
 * Copyright © 2016年 JX. All rights reserved.
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ScrollView
} from 'react-native';
import {width, height, listViewTxtColor, indexBgColor} from '../../resouce/theme'
/**系统 npm类 */

/**组件内部显示需要引入的类 */
import TopNavigationBar from '../../../Common/View/TCNavigationBar';
import TCNavigatorHelper from '../../../Common/JXHelper/TCNavigatorHelper'

/** 外部关系组件 如 页面跳转用 */


export default class MyComponent extends React.Component {
    constructor(state) {
        super(state)
        this.state = {}
    }

    static defaultProps = {
        announcement: []
    }

    componentDidMount() {

    }

    render() {
        return (
            <View style={styles.container}>
                <TopNavigationBar title='公告' needBackButton={true} backButtonCall={()=> {
                    NavigatorHelper.popToBack()
                }}/>
                <ScrollView>
                    {this.getInnerView()}
                </ScrollView>
            </View>
        )
    }

    getInnerView() {
        let Arr = []
        if (this.props.announcement && this.props.announcement.length > 0) {
            this.props.announcement.map((item, index) => {
                Arr.push(<TCNoticeDetailCell content={item.content} createTime={item.createTime} key={index}/>)
            })
        }
        return Arr
    }
}

class TCNoticeDetailCell extends React.Component {
    constructor(state) {
        super(state)
        this.state = {}
    }

    static defaultProps = {
        content: null
    }

    componentDidMount() {
    }

    render() {
        return (
            <View style={styles.cellStyle}>
                <View style={{marginLeft: 15, marginTop: 15, marginRight: 15, marginBottom: 20}}>
                    <Text style={{fontSize: 15, color: listViewTxtColor.content}}>{this.props.content}</Text>
                </View>
                <View style={{ width: width - 30}}>
                    <Text
                        style={{fontSize: 13, color:listViewTxtColor.content, marginLeft: 14, marginBottom: 5}}>{this.props.createTime}</Text>
                </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: indexBgColor.mainBg,
    },
    cellStyle: {
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
