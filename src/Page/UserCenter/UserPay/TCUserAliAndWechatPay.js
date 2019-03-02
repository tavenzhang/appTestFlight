import React, {Component,} from 'react'

import {
    View,
    StyleSheet,
    Text,
    Alert, ScrollView
} from 'react-native'
import {observer} from 'mobx-react/native'
import {observable, computed, action} from 'mobx'
import UserPay from './View/TCUserPayView'
import {indexBgColor} from '../../resouce/theme'
import TopNavigationBar from '../../../Common/View/TCNavigationBar';
import NavigationHelper from '../../../Common/JXHelper/TCNavigatorHelper'
import Help01 from '../UserPayHelp/TCUserHelp01'
import Help02 from '../UserPayHelp/TCUserHelp02'
import Help03 from '../UserPayHelp/TCUserHelp03'
import Help04 from '../UserPayHelp/TCUserHelp04'
import Dialog from './Dialog'
import Toast from "../../../Common/JXHelper/JXToast";
import TcTools from '../../../Common/View/Tools'
import TCUserOpenPayApp from './TCUserOpenPayApp'
import UserPayStore from "../../../Data/store/UserPayStore";
import {ASSET_Theme} from "../../asset";

let userOpenPayApp = new TCUserOpenPayApp()
let Tools = new TcTools()

/**
 * 支付宝支付
 */

@observer
export default class TCUserAliAndWechatPay extends Component {

    userPayStore = new UserPayStore();

    // 构造函数
    constructor(props) {
        super(props)
    }

    static defaultProps = {};

    componentDidMount() {

    }

    componentWillUnmount() {
        this.timer2 && clearTimeout(this.timer2)
    }

    render() {
        TW_Log("TCUserAliAndWechatPay---",this.props);
        return (
            <ScrollView style={[ASSET_Theme.gameUIStyle.subViewContainStye,{backgroundColor:"white"}]}>
                {/*<TopNavigationBar*/}
                    {/*title={this.getPayTypeTitle()}*/}
                    {/*needBackButton={true}*/}
                    {/*rightTitle={'帮助'}*/}
                    {/*rightButtonCall={() => {*/}
                        {/*if (this.props.type === 'WX' || this.props.type === 'ZHB') {*/}
                            {/*this.userPayStore.next(0)*/}
                        {/*}*/}
                    {/*}}*/}
                    {/*backButtonCall={() => {*/}
                        {/*this.showBackTip();*/}
                    {/*}}*/}
                {/*/>*/}
                <UserPay
                    payType={this.getPayType()}
                    gotoPay={() => {
                        Tools.saveScreenshot();
                        this.gotoPay()
                    }}
                    codeType={this.props.codeType}
                    codeValue={this.props.codeValue}
                    money={this.props.money}
                    prompt={this.props.payData ? this.props.payData.userPrompt:0}
                    leftBtnTitle={'立即充值'}

                />

                <Help01 show={this.userPayStore.showhelper0} next={() => this.userPayStore.next(1)}
                        isWeChat={this.props.type !== 1}/>
                <Help02 show={this.userPayStore.showhelper1} next={() => this.userPayStore.next(2)}
                        isWeChat={this.props.type !== 1}/>
                <Help03 show={this.userPayStore.showhelper2} next={() => this.userPayStore.next(3)}
                        isWeChat={this.props.type !== 1}/>
                <Help04 show={this.userPayStore.showhelper3} next={() => this.userPayStore.next(4)}
                        isWeChat={this.props.type !== 1}/>

                <Dialog
                    ref="Dialog"
                    show={false}
                    rightBtnClick={() => this.onOpen()}
                    leftBtnClick={() => this.setModalVisible()}
                    dialogTitle={'温馨提示'}
                    dialogContent={G_IS_IOS? '请先手动截屏保存二维码至相册再打开':'已为您截屏保存二维码至相册并打开' + (this.getPayType()) + ',是否立即充值？'}
                    btnTxt={'打开'}
                    leftTxt={'取消'}
                />
            </ScrollView>
        )
    }

    showBackTip() {
        Alert.alert('您确定退出充值吗？', '请确保已支付完成再退出!', [
            {
                text: '确定',
                onPress: () => {
                    NavigationHelper.popToBack();
                }
            },
            {
                text: '取消',
                onPress: () => {

                }
            }
        ]);
    }

    getPayTypeTitle() {
        switch (this.props.type) {
            case 'WX':
                return this.isQQpay() ? 'QQ钱包充值' : '微信充值'
            case 'ZHB':
                return '支付宝充值'
            case 'JD':
                return '京东充值'
            case 'QQ':
                return 'QQ充值'
            case 'OTHER':
                return '其他充值'
        }
    }

    isQQpay() {
        return /qq/i.test(this.props.merchantName);
    }

    getPayType() {
        switch (this.props.type) {
            case 'WX':
                return this.isQQpay() ? 'QQ' : '微信'
            case 'ZHB':
                return '支付宝'
            case 'JD':
                return '京东'
            case 'QQ':
                return 'QQ'
            case 'OTHER':
                return '其他支付'
        }
    }

    onOpen=()=> {
        this.timer2 = setTimeout(() => {
            this.openApps()
        }, 1000)
        this.setModalVisible();
        setTimeout(() => {
            this.hadPay()
        }, 3000)
    }

    openApps=()=>{
        switch (this.props.type) {
            case 'ZHB':
                userOpenPayApp.openAlipay()
                break
            case 'WX': {
                if (this.isQQpay()) {
                    userOpenPayApp.openQQ()
                } else {
                    userOpenPayApp.openWeChat()
                }
            }
                break
            case 'QQ':
                userOpenPayApp.openQQ();
            case 'JD':
                userOpenPayApp.openJD()
                break;
            case 'OTHER':
                Toast.showShortCenter('暂时不支持打开该应用,请手动打开')
                break
        }
    }

    // 显示/隐藏 modal
    setModalVisible() {
        let dialog = this.refs.Dialog
        if (dialog.modalVisible) {
            dialog._setModalVisible(false);
        } else {
            dialog._setModalVisible(true);
        }
    }


    gotoPay() {
        this.setModalVisible();
    }

    hadPay=()=>{
        TW_Store.gameUIStroe.showChongZhiDetail()
        //NavigationHelper.pushToUserPayAndWithDraw(1, true);
    }
}
