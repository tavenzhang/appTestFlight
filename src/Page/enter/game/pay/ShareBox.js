import {Component} from "react";
import PropTypes from "prop-types";
import { Share, StyleSheet, View} from "react-native";

import {ASSET_Images} from "../../../asset";
import {TCButtonImg} from "../../../../Common/View/button/TCButtonView";
import React from "react";
import TCImage from "../../../../Common/View/image/TCImage";
import {MyAppName} from "../../../../config/appConfig";


export default class ShareBox extends Component {

    static propTypes = {
        isSelect: PropTypes.bool,
        onClose: PropTypes.func,
        data: PropTypes.any,
        isShow: PropTypes.any
    }

    static defaultProps = {
        isSelect: false,
        isShow: false
    }

    render() {
        let {onClose} = this.props
        return (<View style={styles.container}>
            <TCImage source={ASSET_Images.gameShare.boxBg}/>
            <TCButtonImg imgSource={ASSET_Images.gameUI.btnClose}
                         onClick={onClose}
                         btnStyle={{position: "absolute", right: 0, top: 0}}/>
            <View style={{
                position: "absolute", flexDirection: "row",
                left: 50, top: 55
            }}>
                <TCButtonImg imgSource={ASSET_Images.gameShare.btnWX}
                             onClick={this.onCickWXShare}/>
                <TCButtonImg imgSource={ASSET_Images.gameShare.btPYQ}
                             onClick={this.onClickPYQSHare} btnStyle={{marginLeft: 20}}/>
            </View>

        </View>)

    }

    onCickWXShare = () => {
       this.onSimpleShare();
    }

    onSimpleShare=()=>{
        let url =  G_IS_IOS ?TW_Store.bblStore.shareURL.ios:TW_Store.bblStore.shareURL.android
        Share.share({
            title: MyAppName,
            message: url
        }).then(this.showResult)
            .catch((error) =>TW_Log({result: 'error: ' + error.message}));
        // Share.share({
        //     title:"uat棋牌",
        //     message: 'React Native | A framework for building native apps using React'
        // }).then(this.showResult)
        //     .catch((error) => this.setState({result: 'error: ' + error.message}));
    }


    showResult = (result) => {
        if (result.action === Share.sharedAction) {
            if (result.activityType) {
                this.setState({result: 'shared with an activityType: ' + result.activityType});
            } else {
                this.setState({result: 'shared'});
            }
        } else if (result.action === Share.dismissedAction) {
            this.setState({result: 'dismissed'});
        }

    }
    onClickPYQSHare = () => {
        this.onSimpleShare();
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "transparent",
        position: "absolute",

    },
    inputStyle: {
        fontSize: 11,
        fontWeight: "bold",
        color: "#efe8cd"
    },
    webView: {
        marginTop: 18,
        height: 250,
        width: 485,
        backgroundColor: "transparent",
    }

});