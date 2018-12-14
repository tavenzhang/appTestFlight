/**
 * Created by taven on 6/18/2018.
 */

import React, {Component} from 'react';

import {
    StyleSheet,
    LayoutAnimation,
    View,
    Image
} from 'react-native';


import FastImage from 'react-native-fast-image'
import PropTypes from 'prop-types'
/*
* 对image 进行封装，支持缓存 以及图片占位符 方便升级 以及全局替换
*/
export default class TCImage extends Component {

    constructor(state) {
        super(state)
        let {imgPlaceHolder} = this.props
        this.state = {
            onPreFinish: imgPlaceHolder == null,
        }
    }

    componentWillUpdate() {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    }

    static propTypes = {
        style: PropTypes.any,
        styleHolder: PropTypes.any,
        resizeMode: PropTypes.any,
        resizeModeHolder: PropTypes.any,
        source: PropTypes.any,
        imgPlaceHolder: PropTypes.any,
        onLoadSucFun:PropTypes.any,

    }

    static defaultProps = {
        announcement: [],
        imgPlaceHolder: null,
        style:{}
    };


    render() {
        let {style, resizeMode, imgPlaceHolder, source, styleHolder, resizeModeHolder} = this.props
        let myHolderStyle = styleHolder ? styleHolder : style;
        let myResizeMode = resizeModeHolder ? resizeModeHolder : resizeMode
        let imgStyle = this.state.onPreFinish ? style : {width: 1, height: 1}  //通过设置宽高 达到隐藏的效果

        if(!this.state.onPreFinish){
            return (<View style={this.state.onPreFinish ? style:myHolderStyle} pointerEvents={"none"}>
                <Image   style={myHolderStyle}
                         resizeMode={myResizeMode}
                         source={imgPlaceHolder}/>
                <FastImage style={imgStyle}
                           resizeMode={resizeMode}
                           source={source}
                            onLoad={this.onLoadSucess}
                            onError={this.onLoadError}
                />
            </View>)
        }else{
            return  <FastImage style={imgStyle}
                                   resizeMode={resizeMode}
                                   source={source}/>
        }

    }

    onLoadSucess = (data) => {
        //let {style, resizeMode, imgPlaceHolder, source, styleHolder, resizeModeHolder} = this.props
        //TWLog("onLoadError=====onLoadSucess" ,source.uri)
        let {onLoadSucFun} = this.props
        if(!this.state.onPreFinish){
            this.setState({onPreFinish: true})
        }
        if(onLoadSucFun){
            onLoadSucFun();
        }
    }


    onLoadError = (data) => {
      //  TWLog("onLoadError=====")
    }
}

