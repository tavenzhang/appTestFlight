'use strict'
/**
 * Created by taven on 2018/7/5.
 */
import React, {Component} from 'react'
import {
    StyleSheet,
    View,
} from 'react-native'

import LoadingSpinnerOverlay from '../../Common/View/LoadingSpinnerOverlay'

import {observer} from 'mobx-react/native';
import rootStore from "../../Data/store/RootStore";

@observer // 通用全局弹窗 借助mobox 实现通用弹窗控制 减少重复代码
export default class CommonBoxLayer extends Component {

    constructor(props) {
        super(props)
    }

    // componentDidMount() {
    //     setInterval(() => {
    //         rootStore.commonBoxStore.spinState.visible ? rootStore.commonBoxStore.hideSpin() : rootStore.commonBoxStore.showSpin({backgroundColor: "rgba(0, 0, 0, 0.3)"})
    //     }, 2000)
    // }

    render() {
        let {spinState} = rootStore.commonBoxStore
        //暂时只 放置一个spinLoader
        return (rootStore.bblStore.isLoading ?
                <View style={styles.container}>
                    <LoadingSpinnerOverlay style={{width:40, height:40}} overlayStyle={spinState.overStyle}
                                           visible={spinState.visible} modal={spinState.isModal}/>
                </View> : null

        );
    };
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: "absolute",
        backgroundColor:"transparent",
        zIndex: 300
    },

});
