import React, {Component} from 'react'

import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    Platform,
    Alert,
    Image,
    ScrollView
} from 'react-native'
import {observer} from 'mobx-react'
import {observable, computed, action} from 'mobx'
import {copyBtnStyle, ermaStyle, height, indexBgColor, Size, width} from '../../../resouce/theme'
import TopNavigationBar from '../../../../Common/View/TCNavigationBar';
import Dialog from '../Dialog'
import UserAccount from '../../UserAccount/TCUserPayAndWithdrawRecordsMain'
import TCUserOpenPayApp from '../TCUserOpenPayApp'
import {userPay} from '../../../asset/images'
import TCNavigatorHelper from "../../../../Common/JXHelper/TCNavigatorHelper";
import TcTools from '../../../../Common/View/Tools'
import {withMappedNavigationProps} from "react-navigation-props-mapper";

let userOpenPayApp = new TCUserOpenPayApp()
let Tools = new TcTools()
/**
 * 支付宝支付
 */
@withMappedNavigationProps()
@observer
export default class TCUserAliAndWechatPay extends Component {


    // 构造函数
    constructor(props) {
        super(props)
    }

    static defaultProps = {};

    componentDidMount() {
        this.state = {
            value: {
                format: "png",
                quality: 0.9,
                result: "file"
            }
        }
    }

    componentWillUnmount() {
        this.timer2 && clearTimeout(this.timer2)
    }

    render() {
        return (
            <View style={styles.container}>
                <TopNavigationBar
                    title={'微信公众号充值'}
                    needBackButton={true}
                    backButtonCall={() => {
                        this.showBackTip();
                    }}
                />
                <ScrollView>
                    <View style={{alignItems: 'center'}}>
                        <View style={styles.topItemStyle} ref="erweimaaa">
                            {this.getQRCode()}
                        </View>
                        <View
                            style={[styles.btmBtnItemStyle, {justifyContent: 'space-around',}]}>
                            <TouchableOpacity onPress={() => this.gotoPay()}
                                              style={styles.btmBtnStyle}><Text
                                style={styles.btmBtnTxtStyle}>{"打开微信"}</Text></TouchableOpacity>
                            <TouchableOpacity onPress={() => this.hadPay()}
                                              style={styles.btmBtnStyle}><Text
                                style={styles.btmBtnTxtStyle}>{"我已支付"}</Text></TouchableOpacity>
                        </View>
                        <View style={{marginBottom: 20}}>
                            {this.getInfoView()}
                        </View>
                    </View>
                </ScrollView>
                <Dialog
                    ref="Dialog"
                    show={false}
                    rightBtnClick={() => this.onOpen()}
                    leftBtnClick={() => this.setModalVisible()}
                    dialogTitle={'温馨提示'}
                    dialogContent={(IS_IOS ? '请先手动截屏保存二维码至相册再打开':'已为您截屏保存二维码至相册并打开') + '微信，是否立即打开？'}
                    btnTxt={'打开'}
                    leftTxt={'取消'}
                />
            </View>
        )
    }

    getInfoView() {
        let d1 = Platform.OS === 'ios' ? '1.先手动截屏,保存二维码至相册。' : '1.点击"打开微信"将自动为您截屏并保存到相册(若图片未保存至相册，请手动截屏)。'
        return (
            <View style={{marginTop: 15, marginLeft: 5}}>
                <Text style={{color: ermaStyle.tipTxtColor, fontSize: Size.large, marginLeft: 5}}>充值步骤：</Text>
                {this.getItemView(d1, null)}
                {this.getItemView('2.请在微信中打开"扫一扫",关注公众号。', null)}
                {this.getItemView('3.进入公众号后，点击下方"在线充值"按钮。',userPay.stepWx1)}
                {this.getItemView('4.输入账号、金额，完成充值(账号是本平台的登录账号《我的->个人信息->用户名》)。',userPay.stepWx2)}
            </View>
        )
    }

    getItemView(title, pic) {
        return (<View style={{marginTop: 10, marginLeft: 10}}>
            <Text style={styles.titleTxt}>{title}</Text>
            {pic ? (<View style={{alignItems: 'center', marginTop: 5}}>
                <Image source={pic}
                       resizeMode='stretch'
                       style={{marginTop: 10, width: width * 0.9, borderRadius: 10, height: height * 0.4}}/>
            </View>) : null}
        </View>)
    }


    getQRCode() {
        return (<Image
            source={{uri: this.props.codeValue}}
            resizeMode='stretch'
            style={{marginTop: 10, width: width * 0.7, height: height * 0.35}}
        />)
    }

    showBackTip() {
        Alert.alert('您确定退出充值吗？', '请确保已支付完成再退出!', [
            {
                text: '确定',
                onPress: () => {
                    TCNavigatorHelper.popToBack()
                }
            },
            {
                text: '取消',
                onPress: () => {

                }
            }
        ]);
    }

    onOpen() {
        this.timer2 = setTimeout(() => {
            userOpenPayApp.openWeChat()
        }, 1000)
        this.setModalVisible();
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
        Tools.saveScreenshot();
        this.setModalVisible();
    }

    hadPay() {
        let {navigator} = this.props
        if (navigator) {
            navigator.push({
                name: 'userAccount', component: UserAccount, passProps: {accountType: 1, isBackToTop: true}
            });
        }
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: ermaStyle.mainBg,
        alignItems: 'center',
    },
    topItemStyle: {
        marginTop: 20,
        backgroundColor: ermaStyle.ermaBg,
        height: height * 0.4,
        width: width * 0.8,
        justifyContent: 'center',
        alignItems: 'center'
    }, topItemStyle1: {
        marginTop: 20,
        backgroundColor: ermaStyle.ermaBg,
        height: height * 0.55,
        width: width * 0.9
    }, payTitleItemStyle: {
        justifyContent: 'center',
        borderBottomWidth: 0.5,
        borderBottomColor: ermaStyle.btmBorder,
        height: height * 0.08,
        paddingLeft: 5
    }, payNoticeItemStyle: {
        justifyContent: 'center',
        borderBottomWidth: 0.5,
        borderBottomColor: ermaStyle.btmBorder,
        paddingLeft: 5
    }, payTitleTxtStyle: {
        color: ermaStyle.title,
        fontSize: Size.default
    }, ewmImgItemStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        height: height * 0.35,
        marginTop: 1,
    },
    imgewmStyle: {
        height: height * 0.3,
        width: width * 0.6
    },
    btmBtnItemStyle: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: width * 0.9,
        marginTop: 20,
        alignItems: 'center',
        height: height * 0.08
    }, btmBtnTxtStyle: {
        backgroundColor: ermaStyle.btnBg,
        color: ermaStyle.btnTxt,
        padding: 8,
        borderRadius: Platform.OS == 'ios' ? 0 : 5,
        textAlign: 'center',
        fontSize: Size.default
    }, tipTxtStyle: {
        color: ermaStyle.tipTxtColor,
        padding: 10,
        fontSize: Size.small,
    }, btmBtnStyle: {
        height: height * 0.08,
        width: width * 0.3,
    }, moneyTxtStyle: {
        color: ermaStyle.moneyContent,
        fontSize: Size.font14
    }, btmBtnStyle1: {
        height: height * 0.08,
        width: width * 0.39,
    },
    titleTxt: {
        color: ermaStyle.tipTxtColor,
        fontSize: Size.default,
        width: width * 0.9

    }
})