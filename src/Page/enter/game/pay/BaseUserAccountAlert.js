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
        let {onClose, title,accountType} = this.props;

        return (<View style={{position: "absolute"}}>
            <TCImage source={ASSET_Images.gameUI.uiTitleBg1} />
            <View style={{
                 marginTop: 35, width: SCREEN_W*0.55,
                alignSelf: "center",
                position: "absolute",

            }}>
                {this.props.children}
            </View>
            {/*<View style={{*/}
                {/*position: "absolute", top: 24, width: 460, height: 20, justifyContent: "center",*/}
                {/*alignItems: "center", alignSelf: "center"*/}
            {/*}}>*/}
                {/*<Text style={{color: "#937e7e", fontSize: 18}}>{title}</Text>*/}
            {/*</View>*/}
            <TCImage source={accountType==0 ? ASSET_Images.gameUI.txmxIcon :ASSET_Images.gameUI.czmxIcon} style={{position: "absolute", top: 12,left:215}} />

            <TouchableWithoutFeedback>
                <View style={{position: "absolute",right:2, top: 5, width: 40, height: 40,}}>
                    <TCButtonImg imgSource={ASSET_Images.gameUI.closeIcon}
                                 soundName={TW_Store.bblStore.SOUND_ENUM.close}
                                 onClick={onClose}
                                 btnStyle={{width:35,height:35}}/>
                </View>
            </TouchableWithoutFeedback>

            <TCImage source={accountType==0 ? ASSET_Images.gameUI.txmxTip:ASSET_Images.gameUI.czmxTip} style={{position: "absolute", bottom:10,left:30}} />
            <TCButtonImg imgSource={ASSET_Images.gameUI.onlineService} btnStyle={{position: "absolute", bottom:5,right:20}}
                         onClick={()=>{
                             TW_Store.gameUIStroe.showGusetView();
                             if(onClose){
                                 onClose()
                             }
                         }}/>

        </View>)

    }
}

