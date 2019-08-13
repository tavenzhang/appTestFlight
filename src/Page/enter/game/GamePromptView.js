'use strict'
/**
 * 提示界面
 * Created by Benny on 2019/08/05.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text
} from 'react-native';
import {observer} from 'mobx-react';
import {ASSET_Images} from "../../asset";
import {TCButtonImg} from "../../../Common/View/button/TCButtonView";
import TCUserOpenPayApp from "../../../Page/UserCenter/UserPay/TCUserOpenPayApp";

let userOpenPayApp = new TCUserOpenPayApp()

@observer
export default class GamePromptView extends Component {

    appID='';

    constructor(props) {
        super(props)
        this.merchant = this.props.vipData.merchantName
        this.methodName = this.props.vipData.methodName
        this.methodInfo = this.props.vipData.methodInfo
        this.vipType = this.props.vipData.vipTopUpType
        this.state = {
            isInstalled: true
        }
    }

    render() {
        let appName = this.getAppName(this.vipType)
        return (
            <View>
                <Text style={styles.text}>{this.merchant}</Text>
                <Text style={styles.text}>{this.methodName}：{this.methodInfo}</Text>
                <Text style={styles.text}>充值代理的账号已经复制到系统粘贴板上</Text>
                <Text style={[styles.text, {top: 40}]}>{"是否现在跳转到" + appName}</Text>
                <TCButtonImg imgSource={ASSET_Images.gameUI.query}
                             btnStyle={{position: "absolute", top: 150, left: 170}}
                             soundName={TW_Store.bblStore.SOUND_ENUM.enterPanelClick}
                             onClick={() => {
                                 this.openApp(this.vipType)
                                 TW_Store.gameUIStroe.hideAlertUI();
                             }}/>
            </View>
        );
    }

    /**
     * 获取app名字
     * @param topUpType
     * @returns {appName}
     */
    getAppName=(topUpType)=> {
        switch (topUpType) {
            case 'ALIPAY':
                this.appID = 'alipay://'
                return "支付宝"
            case 'WECHAT':
                this.appID = 'weixin://'
                return "微信"
            case 'QQ':
                this.appID = 'mqq://'
                return "QQ"
            default:
                return "其它"
        }
    }

    /**
     * 打开app
     * @param topUpType
     * @returns {appName}
     */
    openApp=(topUpType)=> {
        switch (topUpType) {
            case 'ALIPAY':
                userOpenPayApp.openAlipay()
                break
            case 'WECHAT':
                userOpenPayApp.openWeChat()
                break
            case 'QQ':
                userOpenPayApp.openQQ()
                break
            default:
                return
        }
    }
}

const styles = StyleSheet.create({
    text: {
        color: "#A2E1EE", fontSize: 18, textAlign: 'center', top: 20
    }
});

