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
        onClose:PropTypes.any,
        title:PropTypes.any
    }

    static defaultProps = {
        isSelect: false,
        title:"充值明细"
    }



    render() {
        let {onClose,title}=this.props;

        return (<View style={{position:"absolute",height:280}}>
            <TCImage source={ASSET_Images.gameUI.uiTitleBg}/>
            <View style={{position: "absolute", marginTop: 48,width:459,
                alignSelf:"center", backgroundColor:indexBgColor.mainBg}}>
                {this.props.children}
            </View>
            <View style={{position: "absolute",top:24,width:460,height:20, justifyContent:"center",
                alignItems: "center",alignSelf:"center"}}>
                <Text style={{color:"#937e7e", fontSize:18}}>{title}</Text>
            </View>
            <TouchableWithoutFeedback>
            <View style={{position: "absolute", right:30, top: 20,  width:60, height:30, }}>
                <TCButtonImg imgSource={ASSET_Images.gameUI.btn_fanhui}
                             onClick={onClose}
                             btnStyle={{}}/>
            </View>
            </TouchableWithoutFeedback>

        </View>)

    }
}

