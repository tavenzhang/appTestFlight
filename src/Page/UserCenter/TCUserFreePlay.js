'use strict'
/**
 * Created by Allen on 2016/12/10.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
    ScrollView,
} from 'react-native';

import {observer} from 'mobx-react/native'
import {observable, computed, action} from 'mobx'

import Toast from '@remobile/react-native-toast'
import TopNavigationBar from '../../Common/View/TCNavigationBar';
import LoadingSpinnerOverlay from '../../Common/View/LoadingSpinnerOverlay'
import  dismissKeyboard from 'dismissKeyboard'
import {Size, width, height} from '../../Page/resouce/theme'
import {config} from '../../Common/Network/TCRequestConfig'
import NetUtils from '../../Common/Network/TCRequestUitls'
import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter'
import Base64 from '../../Common/JXHelper/Base64'
import BackBaseComponent from '../Base/TCBaseBackComponent'
import SecretUtils from '../../Common/JXHelper/SecretUtils'
let base64 = new Base64()
let secretUtils = new SecretUtils()
import {
    loginAndRegeisterTxtColor,
    loginAndRegeisterBorderColor,
    loginAndRegeisterBgColor,
    indexBgColor
} from '../../Page/resouce/theme'

/**
 * 免费试玩
 */
@observer
export  default  class TCUserFreePlay extends BackBaseComponent {

    stateModel = new StateModel()
    password = ''

    constructor(props) {
        super(props)
    }

    static defaultProps = {};

    componentDidMount() {
        super.componentDidMount()
        this.getGuestUserName()
    }


    componentWillUnmount() {
        super.componentWillUnmount()
    }

    render() {
        return (
            <View style={[styles.container]}>
                < TopNavigationBar
                    title={'免费试玩'}
                    needBackButton={true}
                    backButtonCall={() => {
                        this.gotoBack()
                    }}/>
                <ScrollView
                    keyboardShouldPersistTaps={true}
                    keyboardDismissMode={'on-drag'}>
                    <View style={{alignItems: 'center', marginTop: 20}}>
                        < View style={styles.formstyle}>
                            <View style={styles.loginInputStyle}>
                                <Text
                                    style={{color: loginAndRegeisterTxtColor.inputPlaceholder, fontSize: Size.default}}>试玩账号</Text>
                                <Text style={styles.guestNameStyle}>{this.stateModel.userName}</Text>
                            </View>
                            <View style={styles.loginInputStyle}>
                                <Text
                                    style={{color: loginAndRegeisterTxtColor.inputPlaceholder, fontSize: Size.default}}>登录密码</Text>
                                <TextInput
                                    ref="login_pwd"
                                    placeholder='密码(6-15位字母或数字)'
                                    style={styles.loginInput}
                                    secureTextEntry={true}
                                    maxLength={15}
                                    placeholderTextColor={loginAndRegeisterTxtColor.inputPlaceholder}
                                    underlineColorAndroid='transparent'
                                    onChangeText={(text) => this.onChangePassword(text)}/>
                            </View>
                            <TouchableOpacity
                                style={styles.bottomBarButtonStyle}
                                onPress={() => this.loginVal()}>
                                <Text style={{
                                    fontWeight: 'bold',
                                    fontSize: Size.large,
                                    color: loginAndRegeisterTxtColor.loginTxt
                                }}>
                                    立即登录
                                </Text>
                            </TouchableOpacity>
                        </ View >
                        <View style={styles.tipTxt}>
                            <Text style={styles.tipTxtColor}>1、每个试玩账号初始金额为2000RMB，不允许充值；</Text>
                            <Text style={styles.tipTxtColor}>2、每个IP每天仅允许有3个试玩账号；</Text>
                            <Text style={styles.tipTxtColor}>3、每个试玩账号从注册开始，有效时间为72小时，超过时间系统自动回收；</Text>
                            <Text style={styles.tipTxtColor}>4、试玩账号仅供玩家熟悉游戏，不允许充值和提款；</Text>
                            <Text style={styles.tipTxtColor}>5、试玩账号不享有参加优惠活动的权利；</Text>
                            <Text style={styles.tipTxtColor}>6、试玩账号的赔率仅供参考，可能与正式账号赔率不相符；</Text>
                        </View>
                    </View>
                </ScrollView>
                <LoadingSpinnerOverlay
                    ref={ component => this._partModalLoadingSpinnerOverLay = component }
                    modal={true}
                    marginTop={64}/>
            </View>);
    };

    gotoBack() {
        let {navigator} = this.props
        if (navigator) {
            dismissKeyboard()
            navigator.pop()
        }
    }

    gotoUserCenter() {
        let {navigator} = this.props;
        if (navigator) {
            dismissKeyboard()
            navigator.popToTop();
            RCTDeviceEventEmitter.emit('setSelectedTabNavigator', 'mine');
        }
    }

    /**
     * 获取试玩账号
     */
    getGuestUserName() {
        this._partModalLoadingSpinnerOverLay.show()
        NetUtils.PostUrlAndParamsAndCallback(config.api.getGuestId, null, (res) => {
            this._partModalLoadingSpinnerOverLay.hide()
            if (res.rs) {
                if (res.content && res.content.username) {
                    this.stateModel.userName = res.content.username.toLocaleLowerCase()
                } else {
                    Toast.showLongCenter('服务器出错，请稍后再试!')
                    this.gotoBack()
                }
            } else {
                Toast.showLongCenter('服务器出错，请稍后再试!')
                this.gotoBack()
            }

        })
    }

    loginVal() {
        if (!this.password.length) {
            Toast.showShortCenter("请输入密码");
            return;
        }
        let rep = /^[0-9A-Za-z]{6,15}$/
        if (!this.password.match(rep)) {
            Toast.showShortCenter("密码格式错误(6-15位数字或字母)");
            return;
        }
        dismissKeyboard();
        this._partModalLoadingSpinnerOverLay.show()
        this.login(this.stateModel.userName.toLocaleLowerCase(), this.password);
    }

    login(userName, password) {
        secretUtils.encode(userName, password, (hash) => {
            let encryptedPWD = secretUtils.rsaEncodePWD(password);
            let data = {'username': userName, 'password': encryptedPWD, 'hash': hash};
            NetUtils.PostUrlAndParamsAndCallback(config.api.encryptRegisterGuest, data, (res) => {
                this._partModalLoadingSpinnerOverLay.hide()
                if (res.rs) {
                    let user = res.content
                    if (user !== null) {
                        user.password = base64.encode(this.password)
                        user.islogin = true
                        this.saveUser(user)
                        TCPUSH_TO_LOGIN = false
                        RCTDeviceEventEmitter.emit('userBankChange')
                        RCTDeviceEventEmitter.emit('userStateChange')
                        RCTDeviceEventEmitter.emit('userStateChange', 'login')
                    } else {
                        Toast.showShortCenter('服务器错误，登录失败!')
                    }
                } else {
                    if (res.message) {
                        Toast.showShortCenter(res.message)
                    } else {
                        Toast.showShortCenter('服务器错误，登录失败!')
                    }
                }
            }, null, true);
        })
    }

    saveUser(user) {
        storage.save({
            key: 'user',
            data: user
        })
        storage.save({
            key: 'balance',
            data: user.balance
        })
        TCUSER_BALANCE = user.balance
        TCUSER_DATA = user
        RCTDeviceEventEmitter.emit('balanceChange')
        if (this.props.gotoCenter) {
            this.gotoUserCenter()
        } else {
            this.gotoBack()
        }
    }

    onChangePassword(text) {
        this.password = text;
    }
}

class StateModel {
    @observable
    userName = ''
}
const
    styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: indexBgColor.mainBg,
        },
        bottomBarButtonStyle: {
            backgroundColor: loginAndRegeisterBgColor.loginBtn,
            justifyContent: 'center',
            flexDirection: 'row',
            height: 40,
            alignItems: 'center',
            borderRadius: 4,
            padding: 10,
            width: width * 0.8,
            marginTop: 20
        },
        loginInputStyle: {
            flexDirection: 'row',
            height: 50,
            borderRadius: 4,
            borderWidth: 1,
            borderColor: loginAndRegeisterBorderColor.inputBorder,
            margin: 5,
            paddingLeft: 10,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: loginAndRegeisterBgColor.inputBg
        },
        loginInput: {
            height: 50,
            flex: 1,
            paddingLeft: 5,
            fontSize: Size.font17,
            width: width * 0.6,
            color: loginAndRegeisterTxtColor.inputTxt
        },
        guestNameStyle: {
            flex: 1,
            paddingLeft: 5,
            fontSize: Size.font17,
            width: width * 0.6,
            color: loginAndRegeisterTxtColor.inputTxt,
            alignItems: 'center',
        },
        registerWrap: {
            flexDirection: 'row',
            marginTop: 20,
            width: width * 0.9,
            paddingLeft: 20,
            paddingRight: 20,
        }, tipTxt: {
            margin: 10,
            padding: 10,
        }, tipTxtColor: {
            color: loginAndRegeisterTxtColor.freePlayTip
        }
    });
