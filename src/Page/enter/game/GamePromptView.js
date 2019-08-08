'use strict'
/**
 * 提示界面
 * Created by Benny on 2019/08/05.
 */
import React, {Component} from 'react';
import {
    Linking,
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
        this.state={
             isInstalled:false
        }
    }

    async componentDidMount() {

    }

    componentWillUnmount() {

    }

    render() {
        let appName = this.getAppName(this.vipType)

        return (
            <View>
                <Text style={styles.text}>{this.merchant}</Text>
                <Text style={styles.text}>{this.methodName}：{this.methodInfo}</Text>
                <Text style={styles.text}>充值代理的账号已经复制到系统粘贴板上</Text>
                <Text style={[styles.text, {top: 90}]}>
                    {/*{TW_Log("Benny >> SetText: "+this.appID+": "+this.installed)}*/}
                    {(this.state.isInstalled) ? "是否现在跳转到" + appName : "未安装" + appName + "，请安装" + appName + "后联系充值代理"}
                </Text>
                <TCButtonImg imgSource={ASSET_Images.gameUI.query}
                             btnStyle={{position: "absolute", top: 220, left: 190}}
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
                this.appID='alipay://'
                this.checkAppInstallation(this.appID)
                return "支付宝"
            case 'WECHAT':
                this.appID='weixin://'
                this.checkAppInstallation(this.appID)
                return "微信"
            case 'QQ':
                this.appID='mqq://'
                this.checkAppInstallation(this.appID)
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

    checkAppInstallation(appID){
        Linking.canOpenURL(appID).then(supported => {
            if (supported) {
                this.setState({isInstalled:true})
            } else {
                this.setState({isInstalled:false})
            }
        }).catch(err => TW_Log('错误：'+ err))
    }
}

const styles = StyleSheet.create({
    text: {
        color: "#A2E1EE", fontSize: 18, textAlign: 'center', top: 50
    }
});

