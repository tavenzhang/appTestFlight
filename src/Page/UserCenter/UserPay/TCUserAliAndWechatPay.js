import React, {Component,} from 'react'

import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    NativeModules,
    CameraRoll,
    Platform,
    Linking,
    Alert
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
import TCUserOpenPayApp from './TCUserOpenPayApp'

let userOpenPayApp = new TCUserOpenPayApp()
import {withMappedNavigationProps} from 'react-navigation-props-mapper'
import UserPayStore from "../../../Data/store/UserPayStore";


/**
 * 支付宝支付
 */
@withMappedNavigationProps()
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
        JXLog("TCUserAliAndWechatPay---",this.props)
        return (
            <View style={styles.container}>
                < TopNavigationBar
                    title={this.getPayTypeTitle()}
                    needBackButton={true}
                    rightTitle={'帮助'}
                    rightButtonCall={() => {
                        if (this.props.type === 'WX' || this.props.type === 'ZHB') {
                            this.userPayStore.next(0)
                        }
                    }}
                    backButtonCall={() => {
                        this.showBackTip();
                    }}
                />
                <UserPay
                    payType={this.getPayType()}
                    gotoPay={() => {
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
                    dialogContent={'将为您截屏并打开' + (this.getPayType()) + ',是否立即充值？'}
                    btnTxt={'打开'}
                    leftTxt={'取消'}
                />
            </View>
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
            case 'OTHER':
                return '其他充值'
        }
    }

    isQQpay() {
        return (this.props.merchantName.indexOf('Q') != -1 || this.props.merchantName.indexOf('q') != -1)
    }

    getPayType() {
        switch (this.props.type) {
            case 'WX':
                return this.isQQpay() ? 'QQ' : '微信'
            case 'ZHB':
                return '支付宝'
            case 'JD':
                return '京东'
            case 'OTHER':
                return '其他支付'
        }
    }

    onOpen() {
        this.timer2 = setTimeout(() => {
            this.snapshot()
            this.openAppsAndSnapshot()
        }, 1000)
        this.setModalVisible();
        setTimeout(() => {
            this.hadPay()
        }, 3000)
    }

    openAppsAndSnapshot() {
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
            case 'JD':
                userOpenPayApp.openJD()
                break;
            case 'OTHER':
                Toast.showShortCenter('暂时不支持打开该应用,请手动打开')
                break
        }
    }

    snapshot() {
        NativeModules.TCOpenOtherAppHelper.screenShotSave();
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

    hadPay() {
        NavigationHelper.pushToUserPayAndWithDraw(1, true);
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: indexBgColor.mainBg,
    },
})