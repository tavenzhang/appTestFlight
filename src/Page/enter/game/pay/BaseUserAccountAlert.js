import {StyleSheet, Text, TouchableNativeFeedbackComponent, TouchableWithoutFeedback, View} from "react-native";

import {ASSET_Images} from "../../../asset";
import {TCButtonImg} from "../../../../Common/View/button/TCButtonView";
import React, {Component} from "react";
import PropTypes from "prop-types";
import TCImage from "../../../../Common/View/image/TCImage";
import {observer} from 'mobx-react/native';
import {indexBgColor} from "../../../resouce/theme";

@observer
export default class BaseGameAlert extends Component {

    static propTypes = {
        isSelect: PropTypes.bool,
        onClick: PropTypes.func,
        data: PropTypes.any,
        style: PropTypes.any,
        onClose: PropTypes.any,
        title: PropTypes.any
    }

    static defaultProps = {
        isSelect: false,
        title: "充值明细"
    }


    render() {
        let {onClose, title} = this.props;

        return (<View style={{position: "absolute", width:SCREEN_W*0.7,height:SCREEN_H*0.9,left:SCREEN_W*0.1}}>
            <TCImage source={ASSET_Images.gameUI.uiTitleBg1} style={{width:SCREEN_W*0.8,height:SCREEN_H*0.9}} resizeMode={"stretch"}/>
            <View style={{
                 marginTop: 48, width: SCREEN_W*0.74,
                alignSelf: "center",
                position: "absolute",
                left:SCREEN_W*0.03
            }}>
                {this.props.children}
            </View>
            {/*<View style={{*/}
                {/*position: "absolute", top: 24, width: 460, height: 20, justifyContent: "center",*/}
                {/*alignItems: "center", alignSelf: "center"*/}
            {/*}}>*/}
                {/*<Text style={{color: "#937e7e", fontSize: 18}}>{title}</Text>*/}
            {/*</View>*/}
            <TCImage source={ASSET_Images.gameUI.czmxIcon} style={{width:60,height:20,position: "absolute", top: 15,left:SCREEN_W*0.35}} resizeMode={"stretch"}/>

            <TouchableWithoutFeedback>
                <View style={{position: "absolute", left: SCREEN_W*0.74, top: 10, width: 40, height: 40,}}>
                    <TCButtonImg imgSource={ASSET_Images.gameUI.closeIcon}
                                 soundName={TW_Store.bblStore.SOUND_ENUM.close}
                                 onClick={() => {
                                     onClose();
                                 }}
                                 imgStyle={{width:35,height:35}}
                                 btnStyle={{width:35,height:35}}/>
                </View>
            </TouchableWithoutFeedback>

            <TCImage source={ASSET_Images.gameUI.czmxTip} style={{width:SCREEN_W*0.5,height:20,position: "absolute", top: SCREEN_H*0.8,left:SCREEN_W*0.05}} resizeMode={"stretch"}/>
            <TCButtonImg imgSource={ASSET_Images.gameUI.onlineService} btnStyle={{position: "absolute", top: SCREEN_H*0.8 - 5,right:0}} imgStyle={{width:SCREEN_W*0.1,height:30,}} resizeMode={"stretch"}
                         onClick={()=>{
                             TW_Store.gameUIStroe.showGusetView();
                         }}/>

        </View>)

    }
}

