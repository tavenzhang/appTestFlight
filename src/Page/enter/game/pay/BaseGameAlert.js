import {StyleSheet, View} from "react-native";

import {ASSET_Images} from "../../../asset";
import {TCButtonImg} from "../../../../Common/View/button/TCButtonView";
import React, {Component} from "react";
import PropTypes from "prop-types";
import TCImage from "../../../../Common/View/image/TCImage";
import {observer} from 'mobx-react/native';

@observer
export default class BaseGameAlert extends Component {

    static propTypes = {
        isSelect: PropTypes.bool,
        onClick: PropTypes.func,
        data: PropTypes.any,
        style: PropTypes.any,
        onClose:PropTypes.any
    }

    static defaultProps = {
        isSelect: false,
    }

    render() {
        let {onClose}=this.props;

        return (<View style={{position:"absolute"}}>
            <TCImage source={ASSET_Images.gameUI.guestBg}/>
            <View style={{position: "absolute"}}>
                {this.props.children}
            </View>
            <TCButtonImg imgSource={ASSET_Images.gameUI.btnClose}
                         onClick={onClose}
                         btnStyle={{position: "absolute", right: 0, top: 0}}/>
            <TCButtonImg imgSource={ASSET_Images.gameUI.btn}
                         onClick={() => TW_Store.gameUIStroe.isShowGuest = false}
                         btnStyle={{position: "absolute", right: 0, top: 20}}/>
        </View>)

    }
}

