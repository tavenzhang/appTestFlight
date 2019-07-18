'use strict'
/**
 * Created by taven on 2018/7/5.
 */
import React, {Component,PureComponent} from 'react'
import {
    StyleSheet,
    View,
    Animated,
    Easing
} from 'react-native'

import {observer} from 'mobx-react';
import rootStore from "../../Data/store/RootStore";
import {JX_PLAT_INFO} from "../asset";
import TCImage from "../../Common/View/image/TCImage";
import {Images} from "../asset/images";
import PropTypes from "prop-types";

const TIMES=1
@observer // 通用全局弹窗 借助mobox 实现通用弹窗控制 减少重复代码
export default class LoadingView extends Component {

    static propTypes = {
        myStyle: PropTypes.any,
    }

    static defaultProps = {
        myStyle:{}
    };

    constructor(props) {
        super(props);
        this.state = {
            animatedValue: new Animated.Value(0),
            isAnimating:true
        }
        this.rotate=0;
    }

    componentDidMount() {
        this.onStartAnimate()
    }

   componentWillUnmount(): void {
            this.setState({isAnimating:false})
   }

    onStartAnimate=()=>{
        if(this.state.isAnimating){
            this.isAnimating=true
            this.rotate+=720
            Animated.timing(this.state.animatedValue, {
                toValue: this.rotate,
                duration: 3000,
                easing: Easing.linear
            }).start(()=>{
                    this.onStartAnimate();
            });
        }
    }





    render() {
        TW_Log("LoadingView--render---this.props--"+rootStore.bblStore.isLoading,this.props);
        let interpolatedAnimation = this.state.animatedValue.interpolate({
            inputRange: [0, 360],
            outputRange: ['0deg', '360deg']
        });
        let {myStyle}=this.props
        TW_Log("LoadingView--render---myStyle--",myStyle);
       // if(this.animateNow!=rootStore.bblStore.isLoading){
       //     this.animateNow = rootStore.bblStore.isLoading;
       //     if(this.animateNow){
       //         this.onStartAnimate()
       //     }
       // }

        //暂时只 放置一个spinLoader
        return (<View style={{width:JX_PLAT_INFO.SCREEN_W,
            height: JX_PLAT_INFO.SCREEN_H,
            backgroundColor:'transparent' ,
            justifyContent: "center",
            alignItems: "center",
            ...myStyle}} pointerEvents={"none"}>
            <Animated.View
                style={[{},
                    {transform: [
                            { rotateZ: interpolatedAnimation},
                        ]}]}>
                            <TCImage source={Images.bbl.logo} style={{width:60,height:60}}/>
                    </Animated.View>
                 </View>)
    };
}



