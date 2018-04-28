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
    Image,
    TextInput,
    ScrollView,
    NativeModules,
    Platform
} from 'react-native';

import {observer} from 'mobx-react/native'
import {observable, computed, action} from 'mobx'

import {ButtonView} from '../../Common/View';

import Toast from '../../Common/JXHelper/JXToast'
import TopNavigationBar from '../../Common/View/TCNavigationBar';
import LoadingSpinnerOverlay from '../../Common/View/LoadingSpinnerOverlay'
import dismissKeyboard from 'dismissKeyboard'
import {config, appVersion, versionHotFix} from '../../Common/Network/TCRequestConfig'
import NetUtils from '../../Common/Network/TCRequestUitls'
import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter'
import Base64 from '../../Common/JXHelper/Base64'
import BackBaseComponent from '../Base/TCBaseBackComponent'
import SecretUtils from '../../Common/JXHelper/SecretUtils'
import JXHelpers from '../../Common/JXHelper/JXHelper'
import NavigatorHelper from '../../Common/JXHelper/TCNavigatorHelper'
import ModalDropdown from '../../Common/View/ModalDropdown'
import TCUserCollectHelper from '../../Common/JXHelper/TCUserCollectHelper'
import {withMappedNavigationProps} from 'react-navigation-props-mapper'
let UserCollectHelper = new TCUserCollectHelper()
let base64 = new Base64()
let secretUtils = new SecretUtils()
import TCInitHelperC from '../../Common/JXHelper/TCInitHelper'
let TCInitHelper = new TCInitHelperC()
import {common, personal} from '../resouce/images'
import {
    Size, width, height,
    indexBgColor,
    loginAndRegeisterBgColor,
    loginAndRegeisterBorderColor,
    loginAndRegeisterTxtColor,
    dropDownStyle
} from '../resouce/theme'

/**
 * 登录界面
 */
@observer
@withMappedNavigationProps()
export default class TCUserLogin extends BackBaseComponent {

    password = ''
    nowVersion = ''
    stateModel = new StateModel()

    constructor(props) {
        super(props)
        this.stateModel.userName = props.userName ? props.userName : (TCUSER_DATA.username ? TCUSER_DATA.username : '')
        this.password = TCUSER_DATA.password ? base64.decode(TCUSER_DATA.password) : ''
    }

    static defaultProps = {};

    componentDidMount() {
        super.componentDidMount()
        this.getAppVersion()
        if (TCUSER_DATA.oauthToken && !TCUSER_DATA.islogin) {
            TCUSER_DATA.oauthToken = null
        }
        if (this.props.isFromRegister) {
            Toast.showShortCenter('注册成功，请用刚才注册信息登录');
        }
    }

    componentWillUnmount() {
        super.componentWillUnmount()
    }

    render() {
        return (
            <View style={[styles.container]}>
                < TopNavigationBar
                    title={'登录'}
                    needBackButton={true}
                    backButtonCall={() => {
                        this.gotoBack()
                    }}/>
                <ScrollView
                    keyboardShouldPersistTaps={"always"}
                    keyboardDismissMode={'on-drag'}>
                    <View style={{alignItems: 'center'}}>
                        < View style={styles.formstyle}>
                            <View style={styles.loginInputStyle}>
                                <Image source={personal.username}
                                       style={styles.imgstyle}
                                       resizeMode={'contain'}/>
                                <TextInput
                                    ref="login_name"
                                    placeholder='请输入用户名'
                                    style={[styles.loginInput, {marginRight: 30}]}
                                    maxLength={12}
                                    placeholderTextColor={loginAndRegeisterTxtColor.inputPlaceholder}
                                    placeholderTextSize={Size.default}
                                    underlineColorAndroid='transparent'
                                    defaultValue={this.stateModel.userName}
                                    onChangeText={(text) => this.onChangeUserName(text)}/>
                                <ModalDropdown
                                    textStyle={styles.dropDownTxtStyle}
                                    options={TC_LOGINED_USER_NAME}
                                    style={styles.dropStyle}
                                    dropdownStyle={styles.dropdownStyle}
                                    renderRow={(rowData, rowID) => this.renderDropDownRow(rowData, rowID)}
                                    onSelect={(idx, value) => this.onSelect(idx, value)}>
                                    <Image source={common.iconNext} style={styles.imgNext} resizeMode={'contain'}/>
                                </ModalDropdown>
                            </View>
                            <View style={styles.loginInputStyle}>
                                <Image source={personal.password}
                                       style={styles.imgstyle}/>
                                <TextInput
                                    ref="login_pwd"
                                    placeholder='请输入密码'
                                    style={styles.loginInput}
                                    secureTextEntry={true}
                                    maxLength={15}
                                    placeholderTextSize={Size.default}
                                    defaultValue={this.password}
                                    placeholderTextColor={loginAndRegeisterTxtColor.inputPlaceholder}
                                    underlineColorAndroid='transparent'
                                    onChangeText={(text) => this.onChangePassword(text)}/>
                            </View>
                            <View style={styles.registerWrap}>
                                <TouchableOpacity style={{alignItems: 'flex-start', flex: 1}}
                                                  onPress={() => this.onlineService()}>
                                    <Text
                                        style={{
                                            color: loginAndRegeisterTxtColor.forgetPwd,
                                            fontSize: Size.default,
                                        }}>在线客服 ></Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{alignItems: 'flex-end', flex: 1}}
                                                  onPress={() => NavigatorHelper.pushToForgetPwd()}>
                                    <Text
                                        style={{
                                            color: loginAndRegeisterTxtColor.forgetPwd,
                                            fontSize: Size.default,
                                        }}>忘记密码 ?</Text>
                                </TouchableOpacity>
                            </View>
                        </ View>
                        <ButtonView
                            btnStyle={styles.bottomBarButtonStyle}
                            txtstyle={{
                                color: loginAndRegeisterTxtColor.loginTxt,
                                fontWeight: 'bold',
                                fontSize: Size.large
                            }}
                            text={'登录'}
                            onClick={() => this.loginVal()}
                        />
                        <ButtonView
                            btnStyle={styles.bottomBarButtonStyle}
                            txtstyle={{
                                color: loginAndRegeisterTxtColor.regTxt,
                                fontWeight: 'bold',
                                fontSize: Size.large
                            }}
                            text={'立即注册'}
                            onClick={() => this.register()}
                        />

                        <ButtonView
                            btnStyle={styles.bottomBarButtonStyle1}
                            txtstyle={{
                                color: loginAndRegeisterTxtColor.freePlay,
                                fontWeight: 'bold',
                                fontSize: Size.large
                            }}
                            text={'免费试玩'}
                            onClick={() => {
                                NavigatorHelper.pushToUserFreePlay()
                            }}
                        />
                    </View>
                </ScrollView>
                <LoadingSpinnerOverlay
                    ref={component => this._partModalLoadingSpinnerOverLay = component}
                    modal={true}
                    marginTop={64}/>
            </View>);
    };

    register() {
        dismissKeyboard()
        NavigatorHelper.pushToUserRegister(true);
    }

    gotoBack() {
        dismissKeyboard()
        TCPUSH_TO_LOGIN = false
        setTimeout(() => {
            if (this.props.userName) {
                NavigatorHelper.popToTop();
            } else {
                NavigatorHelper.popToBack();
            }
        }, 500)
    }

    /**
     * 获取app版本
     */
    getAppVersion() {
        this.nowVersion = Platform.OS + '-' + JXAPPVersion + '-' + versionHotFix
    }

    onlineService() {
        let res = JXHelpers.getMenuIconsUrl('CUS_SERVICE')
        if (res) {
            NavigatorHelper.pushToWebView(res, '在线客服')
        }
    }

    gotoUserCenter() {
        dismissKeyboard()
        NavigatorHelper.popToTop();
        RCTDeviceEventEmitter.emit('setSelectedTabNavigator', 'mine');
    }

    loginVal() {
        let name = this.stateModel.userName + '';
        name = name.replace(/^\s+|\s+$/g, "")
        if (!name.length) {
            Toast.showShortCenter("请输入用户名");
            return;
        }
        let re = /^[0-9A-Za-z]{4,12}$/
        if (name.length < 4 || name.length > 12 || !name.match(re)) {
            Toast.showShortCenter("用户名格式错误");
            return;
        }
        if (!this.password.length) {
            Toast.showShortCenter("请输入密码");
            return;
        }
        if (Platform.OS === 'android' && TC_ANDROID_DEVICE_IS_ROOT) {
            Toast.showShortCenter("您的手机已经被root了，存在安全隐患，不能登录");
            return;
        }
        dismissKeyboard();
        this._partModalLoadingSpinnerOverLay.show()
        this.login(name.toLocaleLowerCase(), this.password);
    }

    login(userName, password) {
        secretUtils.encode(userName, password, (hash) => {
            let encryptPWD = secretUtils.rsaEncodePWD(password);
            let data = {'username': userName, 'password': encryptPWD, 'hash': hash, appVersion: this.nowVersion};
            NetUtils.PostUrlAndParamsAndCallback(config.api.encryptLogin, data, (res) => {
                this._partModalLoadingSpinnerOverLay.hide()
                if (res.rs) {
                    let user = res.content
                    if (user !== null) {
                        user.password = base64.encode(this.password)
                        user.islogin = true
                        TCPUSH_TO_LOGIN = false
                        this.loginStatistics(user.username)
                        this.saveUser(user)
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

    getUserCollects() {
        UserCollectHelper.getUserCollectsFromServer((res) => {
        })
    }

    loginStatistics(username) {
        try {
            NativeModules.DataStatistics.onLogin(username)
        } catch (e) {
        }
    }

    saveUser(user) {
        TCUSER_BALANCE = user.balance
        TCUSER_DATA = user
        storage.save({
            key: 'user',
            data: user
        })
        storage.save({
            key: 'balance',
            data: user.balance
        })
        this.getUserCollects()
        TCInitHelper.getMsgStatus()
        this.saveUserName(user.username)
        RCTDeviceEventEmitter.emit('balanceChange')
        if (this.props.gotoCenter) {
            this.gotoUserCenter()
        } else {
            this.gotoBack()
        }
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
        this.stateModel.userName = text;
    }

    onChangePassword(text) {
        this.password = text;
    }

    onSelect(idx, value) {
        this.stateModel.userName = value
    }

    renderDropDownRow(rowData, rowId) {
        return (
            <TouchableOpacity>
                <View style={styles.dropDownItemStyle}>
                    <Text
                        style={{fontSize: Size.font18, color: dropDownStyle.dropTxt}}>{rowData}</Text>
                </View>
            </TouchableOpacity>)
    }
}
class StateModel {
    @observable
    userName = ''
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
        borderRadius: 3,
        borderWidth: 1,
        borderColor: loginAndRegeisterBorderColor.inputBorder,
        margin: 5,
        paddingLeft: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: loginAndRegeisterBgColor.inputBg,
        width: width * 0.9,
    },
    loginInput: {
        height: 48,
        flex: 1,
        paddingLeft: 5,
        fontSize: Size.font17,
        width: width * 0.55,
        color: loginAndRegeisterTxtColor.inputTxt,
        backgroundColor: loginAndRegeisterBgColor.inputBg
    },
    imgstyle: {
        width: 25,
        height: 25,
        backgroundColor: loginAndRegeisterBgColor.inputBg
    },
    formstyle: {
        flexDirection: 'column',
        width: width * 0.9,
        alignItems: 'center',
        marginTop: 20,
    },
    registerWrap: {
        flexDirection: 'row',
        marginTop: 20,
        width: width * 0.9,
        paddingLeft: 20,
        paddingRight: 20,
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
    }, dropdownStyle: {
        width: width * 0.9,
        height: height * 0.5,
        borderWidth: 1,
        borderRadius: 3,
        borderColor: dropDownStyle.dropBorder,
        marginTop: 15,
        backgroundColor: dropDownStyle.dropBg
    }, dropDownItemStyle: {
        alignItems: 'center',
        margin: 20,
        backgroundColor: dropDownStyle.dropBg
    }, imgNext: {
        width: 20,
        height: 20,
        marginRight: 10,
        transform: [{rotate: '90deg'}]
    }, dropDownTxtStyle: {
        color: dropDownStyle.dropTxt,
    }
});
