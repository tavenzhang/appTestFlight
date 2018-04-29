'use strict'
/**
 * Created by Allen on 2016/12/10.
 */
import React, {Component} from 'react';
import TopNavigationBar from '../../Common/View/TCNavigationBar';
import Toast from '../../Common/JXHelper/JXToast';
import {config} from '../../Common/Network/TCRequestConfig'
import TimerMixin from 'react-timer-mixin'
import LoadingSpinnerOverlay from '../../Common/View/LoadingSpinnerOverlay'
import JXHelper from '../../Common/JXHelper/JXHelper'

import dismissKeyboard from 'dismissKeyboard';
import {Size, width, height} from '../../Page/resouce/theme'
import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter'
import NavigatorHelper from '../../Common/JXHelper/TCNavigatorHelper'
import KeyboardAvoidingScrollView from '../../Common/View/TCKeyboardAvoidingScrollView';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    TextInput,
    Platform,
    NativeModules
} from 'react-native';

import {observer} from 'mobx-react/native'
import {observable, computed, action} from 'mobx'

import NetUtils from '../../Common/Network/TCRequestUitls'
import Base64 from '../../Common/JXHelper/Base64'
import Helper from '../../Common/JXHelper/TCNavigatorHelper'
import JXHelpers from '../../Common/JXHelper/JXHelper'

let base64 = new Base64()
import SecretUtils from '../../Common/JXHelper/SecretUtils'
import FreePlay from './TCUserFreePlay'

let secretUtils = new SecretUtils()
import UserInfo from '../UserCenter/UserInfo/TCAddUserInfo'
import TCInitHelperC from '../../Common/JXHelper/TCInitHelper'

let TCInitHelper = new TCInitHelperC()
import {common, personal} from '../resouce/images'
import {
    loginAndRegeisterBgColor,
    loginAndRegeisterTxtColor,
    indexBgColor,
    loginAndRegeisterBorderColor
} from '../resouce/theme'

import JXUPLogs from '../../Common/JXHelper/JXNetWorkUpLog'

let UPLogs = new JXUPLogs()

let deviceToken = ''

@observer
export default class TCUserRegister extends Component {

    stateModel = new StateModel()
    registerItems = []
    userInfo = {
        userName: '',
        password: '',
        password1: '',
        validateCode: '',
        affCode: '',
        options: {}
    }

    constructor(props) {
        super(props)
        //线上app有没有设备码的
        deviceToken = (TCUSER_DEVICE_TOKEN ? TCUSER_DEVICE_TOKEN : JXHelper.getRandomChars(true, 15, 35))
    }

    static defaultProps = {};

    componentDidMount() {
        this.getRegisterItems()
    }

    componentWillUnmount() {
    }

    render() {
        return (
            <View style={[styles.container]}>
                < TopNavigationBar
                    title="立即注册"
                    needBackButton={true}
                    backButtonCall={() => this.back()}/>
                <KeyboardAvoidingScrollView
                    keyboardShouldPersistTaps={Platform.OS !== 'ios' ? 'handled' : false}
                    keyboardDismissMode={'on-drag'}>
                    <View style={{alignItems: 'center'}}>
                        < View style={styles.formstyle}>
                            <View style={styles.loginInputStyle}>
                                <Image source={personal.username}
                                       style={styles.imgstyle}
                                       resizeMode={'contain'}/>
                                <TextInput
                                    ref="login_name"
                                    placeholder='用户名(4-12位字母和数字)'
                                    style={styles.loginInput}
                                    placeholderTextColor={loginAndRegeisterTxtColor.inputPlaceholder}
                                    placeholderTextSize={Size.default}
                                    underlineColorAndroid='transparent'
                                    maxLength={12}
                                    onChangeText={(text) => this.onChangeUserName(text)}/>
                            </View>
                            <View style={styles.loginInputStyle}>
                                <Image source={personal.password}
                                       style={styles.imgstyle}
                                       resizeMode={'contain'}/>
                                <TextInput
                                    ref="login_pwd"
                                    placeholder='密码(6-15位字母或数字)'
                                    style={styles.loginInput}
                                    secureTextEntry={this.stateModel.isHide}
                                    placeholderTextColor={loginAndRegeisterTxtColor.inputPlaceholder}
                                    placeholderTextSize={Size.default}
                                    underlineColorAndroid='transparent'
                                    maxLength={15}
                                    onChangeText={(text) => this.onChangePassword(text)}/>
                                <TouchableOpacity onPress={() => this.stateModel.changePwdShow()} activeOpacity={1}>
                                    <Image
                                        source={!this.stateModel.isHide ? personal.imgEye : personal.imgEye2}
                                        style={styles.imgpwdeye}
                                        resizeMode={'contain'}/>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.loginInputStyle}>
                                <Image source={personal.password}
                                       style={styles.imgstyle}
                                       resizeMode={'contain'}/>
                                <TextInput
                                    ref="login_pwd"
                                    placeholder='确认密码'
                                    style={styles.loginInput}
                                    secureTextEntry={this.stateModel.isHide}
                                    placeholderTextSize={Size.default}
                                    placeholderTextColor={loginAndRegeisterTxtColor.inputPlaceholder}
                                    underlineColorAndroid='transparent'
                                    maxLength={15}
                                    onChangeText={(text) => this.onChangePassword1(text)}/>
                            </View>
                            {this.getRegisterView()}
                            <ValidateCode ref='ValidateCode'
                                          onChangeValidateCode={(text) => this.onChangeValidateCode(text)}/>
                            <View style={styles.loginInputStyle}>
                                <Image source={personal.affCode}
                                       style={styles.imgstyle}
                                       resizeMode={'contain'}/>
                                <TextInput
                                    ref="login_name"
                                    placeholder='邀请码(选填)'
                                    placeholderTextSize={Size.default}
                                    style={styles.loginInput}
                                    placeholderTextColor={loginAndRegeisterTxtColor.inputPlaceholder}
                                    underlineColorAndroid='transparent'
                                    maxLength={20}
                                    onChangeText={(text) => this.onChangeAffCode(text)}/>
                            </View>
                            <View style={{flexDirection: 'row', marginTop: 10, alignItems: 'center'}}>
                                <View>
                                    <TouchableOpacity onPress={() => {
                                        this.stateModel.changeCheck()
                                    }}>
                                        {
                                            this.stateModel.isChecked ? (<Image
                                                source={personal.check}
                                                style={styles.agreeStyle}
                                                resizeMode={'contain'}
                                            />) : <Image
                                                source={personal.unCheck}
                                                style={styles.agreeStyle}
                                                resizeMode={'contain'}/>
                                        }
                                    </TouchableOpacity>
                                </View>
                                <Text style={styles.protocolTxtStyle}>我已看过并同意《</Text>
                                <TouchableOpacity
                                    onPress={() => {
                                        this.gotoProtocol()
                                    }}>
                                    <Text style={styles.protocolStyle}>用户购彩服务协议</Text>
                                </TouchableOpacity><Text style={styles.protocolTxtStyle}>》</Text>
                            </View>
                            <TouchableOpacity
                                onPress={() => this.registerVal()}
                                style={this.getBtnStyle()}
                                activeOpacity={this.stateModel.isChecked ? 1 : 0.2}>
                                <Text style={{
                                    color: loginAndRegeisterTxtColor.regTxt,
                                    fontWeight: 'bold',
                                    fontSize: Size.large
                                }}>
                                    立即注册
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.bottomBarButtonStyle1}
                                onPress={() => {
                                    this.props.navigator.push({
                                        name: 'freePlay', component: FreePlay, passProps: {gotoCenter: true}
                                    })
                                }}>
                                <Text style={{
                                    color: loginAndRegeisterTxtColor.freePlay,
                                    fontWeight: 'bold',
                                    fontSize: Size.large
                                }}>
                                    免费试玩
                                </Text>
                            </TouchableOpacity>
                        </ View>
                        <View style={styles.registerWrap}>
                            <TouchableOpacity style={{alignItems: 'flex-start', flex: 1}}
                                              onPress={() => Helper.pushToUserLogin(true)}>
                                <Text
                                    style={{
                                        color: loginAndRegeisterTxtColor.forgetPwd,
                                        fontSize: Size.default
                                    }}>快速登录></Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{alignItems: 'flex-end', flex: 1}}
                                              onPress={() => this.forgetPwd()}>
                                <Text
                                    style={{
                                        color: loginAndRegeisterTxtColor.forgetPwd,
                                        fontSize: Size.default
                                    }}>忘记密码?</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </KeyboardAvoidingScrollView>
                <LoadingSpinnerOverlay
                    ref={component => this._modalLoadingSpinnerOverLay = component}/>
            </ View>
        );
    };

    /**
     * 获取配置的注册组件
     * @returns {Array}
     */
    getRegisterView() {
        let views = []
        this.stateModel.registerItems.map((item) => {
            this.registerItems.push(item)
            views.push(<View style={styles.loginInputStyle}>
                <Image source={personal[item.key]}
                       style={styles.imgstyle}
                       resizeMode={'contain'}/>
                <TextInput
                    placeholder={item.hint}
                    style={styles.loginInput}
                    keyboardType={item.keyboardType}
                    placeholderTextColor={loginAndRegeisterTxtColor.inputPlaceholder}
                    placeholderTextSize={Size.default}
                    underlineColorAndroid='transparent'
                    maxLength={30}
                    onChangeText={(text) => this.onChangeRegisterItem(item.key, text)}/>
            </View>)
        })
        return views
    }

    /**
     * 获取注册项提示
     * @param item
     */
    getRegisterPlaceHolder(item) {
        let res = item.name
        if (item.required) {
            res += '(必填)'
        } else {
            res += '(选填)'
        }
        return res
    }


    forgetPwd() {
        dismissKeyboard()
        Helper.pushToForgetPwd()
    }

    gotoProtocol() {
        let res = JXHelpers.getGeneralContents('PROTOCOL')
        if (res) {
            NavigatorHelper.pushToWebView(res, '用户购彩服务协议')
        }
    }

    getBtnStyle() {
        if (this.stateModel.isChecked) {
            return styles.bottomBarButtonStyle;
        } else {
            return styles.bottomBarButtonUnableStyle
        }
    }

    /**
     * 跳过
     */
    skip() {
        Toast.showShortCenter('注册成功!')
        TCPUSH_TO_LOGIN = false
        RCTDeviceEventEmitter.emit('UserLoginStateChangeCall');
        RCTDeviceEventEmitter.emit('setSelectedTabNavigator', 'mine')
        Helper.popToTop()
    }

    back() {
        dismissKeyboard();
        Helper.popToBack();
    }

    /**
     * 注册验证
     */
    registerVal() {
        if (!this.stateModel.isChecked) {
            return
        }
        let re = /^[0-9A-Za-z]{4,12}$/
        if (!this.userInfo.userName.length) {
            Toast.showShortCenter("请输入用户名");
            return;
        }
        let name = this.userInfo.userName + ''
        name = name.replace(/^\s+|\s+$/g, "");
        if (!name.match(re)) {
            Toast.showShortCenter("用户名错误(4-12位数字或字母)");
            return;
        }

        if (!name.match(/[a-zA-Z]/i)) {
            Toast.showShortCenter("用户名必须至少包含一位字母");
            return;
        }

        if (!this.userInfo.password.length) {
            Toast.showShortCenter("请输入密码");
            return;
        }
        let rep = /^[0-9A-Za-z]{6,15}$/
        if (!this.userInfo.password.match(rep)) {
            Toast.showShortCenter("密码格式错误(6-15位数字或字母)");
            return;
        }
        if (!this.userInfo.password1.length) {
            Toast.showShortCenter("请输入确认密码");
            return;
        }
        if (this.userInfo.password != this.userInfo.password1) {
            Toast.showShortCenter("两次密码不一致");
            return;
        }
        if (!this.registerOptionsVal()) {
            return;
        }
        if (!this.userInfo.validateCode.length) {
            Toast.showShortCenter("请输入验证码");
            let validateCode = this.refs.ValidateCode
            validateCode._refreshValidateCode();
            return;
        }
        rep = /^[0-9A-Za-z]{1,20}$/
        let affCode = this.userInfo.affCode
        affCode = affCode.replace(/^\s+|\s+$/g, "");
        if (affCode.length && !affCode.match(rep)) {
            Toast.showShortCenter("邀请码格式错误(1-20位数字或字母)");
            return;
        }
        if (affCode.length == 0 && TC_DEFAULT_AFFCODE != null) {
            affCode = TC_DEFAULT_AFFCODE
        }
        if (Platform.OS === 'android' && TC_ANDROID_DEVICE_IS_ROOT) {
            Toast.showShortCenter("您的手机已经被root了，存在安全隐患，不能注册");
            return;
        }
        dismissKeyboard();
        this._modalLoadingSpinnerOverLay.show()
        this.register(name.toLocaleLowerCase(), this.userInfo.password, affCode, this.userInfo.validateCode)
    }

    /**
     * 验证配置的注册信息
     * @returns {boolean}
     */
    registerOptionsVal() {
        if (this.registerItems.length === 0) {
            return true
        }
        for (let i = 0; i < this.registerItems.length; i++) {
            let item = this.registerItems[i]
            if (item.required && (!this.userInfo.options[item.key] || !this.userInfo.options[item.key].length)) {//必填时，为空
                Toast.showShortCenter(item.name + '不能为空！')
                return false
            }
            if (!item.required && !this.userInfo.options[item.key] || !this.userInfo.options[item.key].length) {//不是必填时，为空
                continue
            }
            if (!this.userInfo.options[item.key].match(item.regex)) {//不为空时，做验证
                Toast.showShortCenter(item.name + '格式不正确！')
                return false
            }
        }

        return true
    }

    register(userName, password, affCode, validateCode) {
        secretUtils.encode(userName, password, (hash) => {
            let encryptedPWD = secretUtils.rsaEncodePWD(password);
            let data = {
                'username': userName,
                'password': encryptedPWD,
                'hash': hash,
                affCode: affCode,
                validateCode: validateCode,
                webUniqueCode: deviceToken,
                options: this.userInfo.options
            };
            NetUtils.PostUrlAndParamsAndCallback(config.api.userEncryptRegister, data, (response) => {
                this._modalLoadingSpinnerOverLay.hide();
                UPLogs.addRequestLog(config.api.userEncryptRegister, response.duration)
                if (response.rs) {
                    let user = response.content
                    user.password = base64.encode(this.userInfo.password)
                    user.islogin = true
                    this.registerStatistics(user.username)
                    this.timer = setTimeout(() => {
                        this.saveUser(user)
                    }, 500)
                } else {
                    if (response.status === 400) {
                        if (response.message) {
                            this.timer = setTimeout(() => {
                                Toast.showShortCenter(response.message)
                                if (response.message == '验证码错误') {
                                    let validateCode = this.refs.ValidateCode
                                    validateCode._refreshValidateCode();
                                }
                            }, 500)
                        } else {
                            Toast.showShortCenter('服务器错误，注册失败!');
                        }
                    } else {
                        if (response.message) {
                            Toast.showShortCenter(response.message)
                        } else {
                            Toast.showShortCenter('注册失败!');
                        }
                    }
                }
            }, null, true)
        })
    }

    /**
     * 获取注册项
     */
    getRegisterItems() {
        NetUtils.getUrlAndParamsAndCallback(config.api.registerSwitch, null, (response) => {
            if (response.rs) {
                this.stateModel.registerItems = response.content
            } else {
                Toast.showShortCenter('服务器异常！')
            }
        })
    }

    registerStatistics(username) {
        try {
            NativeModules.DataStatistics.onRegister(username)
        } catch (e) {
        }
    }

    saveUser(user) {
        storage.save({
            key: 'user',  // 注意:请不要在key中使用_下划线符号!
            data: user
        });
        TCUSER_DATA = user;
        TCUSER_BALANCE = user.balance
        this.saveUserName(user.username)
        RCTDeviceEventEmitter.emit('userStateChange', 'login');
        TCInitHelper.getMsgStatus()
        this.skip()
    }

    saveUserName(userName) {
        if (TC_LOGINED_USER_NAME && TC_LOGINED_USER_NAME.length > 0) {
            for (var i = 0; i < TC_LOGINED_USER_NAME.length; i++) {
                if (TC_LOGINED_USER_NAME[i] == userName) {
                    return
                }
            }
        }
        TC_LOGINED_USER_NAME.push(userName)
        storage.save({
            key: 'loginUserNames',
            data: TC_LOGINED_USER_NAME
        })
    }

    onChangeUserName(text) {
        this.userInfo.userName = text;
    }

    onChangePassword(text) {
        this.userInfo.password = text;
    }

    onChangePassword1(text) {
        this.userInfo.password1 = text;
    }

    onChangeAffCode(text) {
        this.userInfo.affCode = text;
    }

    onChangeValidateCode(text) {
        this.userInfo.validateCode = text;
    }

    onChangeRegisterItem(key, text) {
        this.userInfo.options[key] = text
    }
}

class StateModel {
    @observable
    isHide = true
    @observable
    isChecked = true
    @observable
    registerItems = []

    @action
    changePwdShow() {
        this.isHide = !this.isHide
    }

    @action
    changeCheck() {
        this.isChecked = !this.isChecked
    }
}

@observer
class ValidateCode extends Component {

    @observable
    refreshValidateCodeTime
    validateRefresh = true

    render() {
        return (<View style={styles.loginInputStyle}>
            <Image source={personal.validateCode}
                   style={styles.imgstyle}
                   resizeMode={'contain'}/>
            <TextInput
                ref="validateCode"
                placeholder='验证码(必填)'
                placeholderTextSize={Size.default}
                style={[styles.loginInput, {width: width * 0.9 - 10 - 10 - 20 - 140 - 1}]}
                placeholderTextColor={loginAndRegeisterTxtColor.inputPlaceholder}
                underlineColorAndroid='transparent'
                maxLength={20}
                onChangeText={(text) => this.props.onChangeValidateCode(text)}
                onFocus={() => this.textInputOnFocus()}
                onEndEditing={() => {
                    this.textInputOnEndEdit()
                }}/>
            <TouchableOpacity onPress={() => this.onPressValidationCode()}>
                {this.getValidateView()}
            </TouchableOpacity>
        </View>)
    }

    getValidateView() {
        if (!this.refreshValidateCodeTime) {
            return (
                <View style={styles.validateContainer}>
                    <Text style={styles.txtValidateStyle}>获取验证码</Text>
                </View>
            );
        }
        return (
            <Image source={{uri: this.getValidataCodeURL()}}
                   style={{width: 140, height: 50, marginRight: 1}}
                   resizeMode={'contain'}
                   aa={this.refreshValidateCodeTime}
            />
        );
    }

    getValidataCodeURL() {
        let url = TCDefaultDomain + '/api/v1/account/webapi/account/validateCode/getValidatePic?webUniqueCode=' + deviceToken + '&&a=' + this.refreshValidateCodeTime
        JXLog('url = ' + url)
        return url
    }


    _refreshValidateCode() {
        let refreshValidateCodeTime = JXHelper.getRandomChars(true, 15, 35)
        this.refreshValidateCodeTime = refreshValidateCodeTime
    }

    textInputOnEndEdit() {
        this.validateRefresh = false;
    }

    textInputOnFocus() {
        if (this.validateRefresh) {
            this._refreshValidateCode();
        }
    }

    onPressValidationCode() {
        this.validateRefresh = false;
        this.refs.validateCode.focus();
        this._refreshValidateCode();
    }
}

const styles = StyleSheet.create({
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
    imgstyle: {
        width: 20,
        height: 25,
    },
    agreeStyle: {
        width: 30,
        height: 30
    },
    formstyle: {
        flexDirection: 'column',
        width: width * 0.9,
        alignItems: 'center',
        marginTop: 20,
    },
    registerWrap: {
        flexDirection: 'row',
        width: width * 0.9,
        padding: 20,
    },
    imgpwdeye: {
        width: 25,
        height: 15,
        marginRight: 5
    },
    bottomBarButtonUnableStyle: {
        backgroundColor: loginAndRegeisterBgColor.unableBtn,
        justifyContent: 'center',
        flexDirection: 'row',
        height: 40,
        alignItems: 'center',
        borderRadius: 4,
        padding: 10,
        width: width * 0.8,
        marginTop: 20
    },
    protocolTxtStyle: {
        fontSize: Size.default,
        color: loginAndRegeisterTxtColor.protocolTxt,
        textAlign: 'center'
    }, protocolStyle: {
        fontSize: Size.default,
        color: loginAndRegeisterTxtColor.userProtocol
    }, bottomBarButtonStyle1: {
        backgroundColor: loginAndRegeisterBgColor.freePlayBtn,
        justifyContent: 'center',
        flexDirection: 'row',
        height: 40,
        alignItems: 'center',
        borderRadius: 4,
        padding: 10,
        width: width * 0.8,
        marginTop: 20,
    },
    validateContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: loginAndRegeisterBorderColor.inputBorder,
        backgroundColor: 'white',
        paddingHorizontal: 5,
        paddingVertical: 5,
        height: 35,
        borderRadius: 5
    },
    txtValidateStyle: {
        color: '#333333',
    },
})
