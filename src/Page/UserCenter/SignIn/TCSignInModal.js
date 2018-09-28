/**
 * Created by Sam on 22/11/2017.
 * Copyright © 2017年 JX. All rights reserved.
 */


/**系统 npm类 */
import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Modal,
    Image,
    TouchableHighlight
} from 'react-native';
import {common, personal} from '../../asset/images'
import * as Animatable from 'react-native-animatable';

/**组件内部显示需要引入的类 */
import {indexBgColor, userCenterTxtColor, userCenterBorderColor, Size, width, height,baseColor} from '../../resouce/theme'

export default class MyComponent extends React.Component {
    constructor(state) {
        super(state)
        this.state = {
            animationType: 'fade',//none slide fade
            modalVisible: false,//模态场景是否可见
            transparent: true,//是否透明显示
            amToFinish:false,//动画结束
        }
    }

    componentDidMount() {
    }

    render() {
        return (
            <Modal
                animationType={this.state.animationType}
                transparent={this.state.transparent}
                visible={this.state.modalVisible}
                onRequestClose={() => {
                    this._setModalVisible(false)
                }}
            >
                <TouchableHighlight onPress={() => {
                    this._setModalVisible(false)
                }} style={styles.modalBackgroundStyle} underlayColor='transparent'>
                    <View style={styles.contentStyle} >
                        <Animatable.Image animation="zoomInUp" onAnimationEnd={()=>{
                            this.setState({amToFinish:true})
                        }} source={personal.signIn} style={{marginTop:100,width:250,height:250}} />
                        <Text style={{position:'absolute',top:305,left:width/2-50, color:'white',fontSize:Size.font16}}>{this.state.amToFinish?'今日签到完成':''}</Text>
                    </View>
                </TouchableHighlight>
            </Modal>
        )
    }

    _setModalVisible(visible) {
        this.setState({modalVisible: visible,amToFinish:false});
    }
}


const styles = StyleSheet.create({
    modalBackgroundStyle: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        marginTop: 0,
    },
    contentStyle: {
        backgroundColor: 'transparent',
        justifyContent:'center',
        alignItems:'center'
    },
});
