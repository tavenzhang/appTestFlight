/**
 * Created by Sam on 2017/1/5.
 * Copyright © 2016年 JX. All rights reserved.
 */

import React, {
    Component
} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    InteractionManager
} from 'react-native';

import NetWorkTool from '../../Common/Network/TCToolNetWork'
import TopNavigationBar from '../../Common/View/TCNavigationBar'
import BackBaseComponent from './TCBaseBackComponent'
import {Size, indexBgColor, listViewTxtColor} from '../resouce/theme'
export default class TCBaseComponent extends BackBaseComponent {
    constructor(state) {
        super(state)
        this.state = {
            renderPlaceholderOnly: true,
            renderEmptyContentPlaceholderOnly: false
        }
    }

    static defaultProps = {};

    componentDidMount() {
        super.componentDidMount()
        // InteractionManager.runAfterInteractions(() => {
        //     this.setState({renderPlaceholderOnly: false});
        // })
        NetWorkTool.addEventListener(NetWorkTool.TAG_NETWORK_CHANGE, this.handleMethod);
    }

    componentWillUnmount() {
        super.componentWillUnmount()
        NetWorkTool.removeEventListener(NetWorkTool.TAG_NETWORK_CHANGE, this.handleMethod);
    }

    /*  子类重写示例
     render() {
     let sp = super.render()
     if (sp) return sp

     ... you self code
     return (
     <View style={styles.container}> </View>
     )
     }

     */

    render() {
        if (this.state.renderPlaceholderOnly) {
            return this._renderPlaceholderView();
        }
    }

    _renderPlaceholderView() {
        return (
            <View style={{
                flex: 1,
                backgroundColor: indexBgColor.mainBg,
            }}>
                <TopNavigationBar
                    title={this.props.title}
                    needBackButton={true}
                    backButtonCall={()=> {
                        this.props.navigator.pop()
                    }}
                />
                <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
                    <View style={{alignItems: 'center', justifyContent: 'center'}}>
                        <Text style={{color:listViewTxtColor.title ,fontSize:Size.default}}> 努力加载中... </Text>
                    </View>
                </View>
            </View>
        )
    }


    showEmptyContentPlaceholderView() {
        this.setState({
            renderEmptyContentPlaceholderOnly: true
        })
    }

    handleMethod(isConnected) {

    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2F2F2',
    }
});
