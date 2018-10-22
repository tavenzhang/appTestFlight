'use strict'
/**
 * Created by Allen on 2016/12/10.
 */
import React, {Component} from 'react';
import TopNavigationBar from '../../Common/View/TCNavigationBar';
import Toast from '../../Common/JXHelper/JXToast';
import LoadingSpinnerOverlay from '../../Common/View/LoadingSpinnerOverlay'

import dismissKeyboard from 'dismissKeyboard';
import {Size, width, height} from '../../Page/resouce/theme'
import NavigatorHelper from '../../Common/JXHelper/TCNavigatorHelper'
import KeyboardAvoidingScrollView from '../../Common/View/TCKeyboardAvoidingScrollView';
import {
    Alert,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    TextInput,
    Platform,
    NativeModules
} from 'react-native';

import {observer, inject} from 'mobx-react/native'
import {observable, computed, action} from 'mobx'

import Helper from '../../Common/JXHelper/TCNavigatorHelper'
import JXHelpers from '../../Common/JXHelper/JXHelper'
import UserRegisterStore from '../../Data/store/UserRegisterStore'


import {common, personal} from '../resouce/images'
import {
    loginAndRegeisterBgColor,
    loginAndRegeisterTxtColor,
    indexBgColor,
    loginAndRegeisterBorderColor
} from '../resouce/theme'

@inject("mainStore", "jdAppStore", "userStore","initAppStore")
@observer
export default class TCUserRegister extends Component {

    userRegister = new UserRegisterStore();

    constructor(props) {
        super(props)
    }

    static defaultProps = {};

    componentDidMount() {
        this.userRegister.initRegister((res) => {
            res && Toast.showShortCenter(res);
        })
    }

    componentWillUnmount() {
    }

    render() {
        const keyboardDismissMode = IS_IOS ? 'on-drag' : 'none'
        return (
            <View style={[styles.container]}>
                < TopNavigationBar
                    title="立即注册"
                    needBackButton={true}
                    backButtonCall={() => this.back()}/>
                <KeyboardAvoidingScrollView
                    keyboardShouldPersistTaps={Platform.OS !== 'ios' ? 'handled' : false}
                    keyboardDismissMode={keyboardDismissMode}>
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
                                    onChangeText={(text) => this.userRegister.onChangeUserName(text)}/>
                            </View>
                            <View style={styles.loginInputStyle}>
                                <Image source={personal.password}
                                       style={styles.imgstyle}
                                       resizeMode={'contain'}/>
                                <TextInput
                                    ref="login_pwd"
                                    placeholder='密码(6-15位字母或数字)'
                                    style={styles.loginInput}
                                    secureTextEntry={this.userRegister.isHidePassword}
                                    placeholderTextColor={loginAndRegeisterTxtColor.inputPlaceholder}
                                    placeholderTextSize={Size.default}
                                    underlineColorAndroid='transparent'
                                    maxLength={15}
                                    onChangeText={(text) => this.userRegister.onChangePassword(text)}/>
                                <TouchableOpacity onPress={() => this.userRegister.changePwdShow()} activeOpacity={1}>
                                    <Image
                                        source={!this.userRegister.isHidePassword ? personal.imgEye : personal.imgEye2}
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
                                    secureTextEntry={this.userRegister.isHidePassword}
                                    placeholderTextSize={Size.default}
                                    placeholderTextColor={loginAndRegeisterTxtColor.inputPlaceholder}
                                    underlineColorAndroid='transparent'
                                    maxLength={15}
                                    onChangeText={(text) => this.userRegister.onChangePassword1(text)}/>
                            </View>
                            {this.getRegisterView()}
                            <ValidateCode ref='ValidateCode'
                                          userRegisterStore={this.userRegister}
                                          onChangeValidateCode={(text) => this.userRegister.onChangeValidateCode(text)}/>
                            <View style={{flexDirection: 'row', marginTop: 10, alignItems: 'center'}}>
                                <View>
                                    <TouchableOpacity onPress={() => {
                                        this.userRegister.changeCheck()
                                    }}>
                                        {
                                            this.userRegister.isAgreeProtocol ? (<Image
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
                                activeOpacity={this.userRegister.isAgreeProtocol ? 1 : 0.2}>
                                <Text style={{
                                    color: loginAndRegeisterTxtColor.regTxt,
                                    fontWeight: 'bold',
                                    fontSize: Size.large
                                }}>
                                    立即注册
                                </Text>
                            </TouchableOpacity>
                            {/*<TouchableOpacity*/}
                                {/*style={styles.bottomBarButtonStyle1}*/}
                                {/*onPress={() => {*/}
                                    {/*NavigatorHelper.pushToUserFreePlay()*/}
                                {/*}}>*/}
                                {/*<Text style={{*/}
                                    {/*color: loginAndRegeisterTxtColor.freePlay,*/}
                                    {/*fontWeight: 'bold',*/}
                                    {/*fontSize: Size.large*/}
                                {/*}}>*/}
                                    {/*免费试玩*/}
                                {/*</Text>*/}
                            {/*</TouchableOpacity>*/}
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
        this.userRegister.registerItems.map((item) => {
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
                    onChangeText={(text) => this.userRegister.onChangeRegisterItem(item.key, text)}/>
            </View>)
        })
        return views
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
        if (this.userRegister.isAgreeProtocol) {
            return styles.bottomBarButtonStyle;
        } else {
            return styles.bottomBarButtonUnableStyle
        }
    }

    back() {
        dismissKeyboard();
        Helper.popToBack();
    }

    /**
     * 注册验证
     */
    registerVal() {
        dismissKeyboard();
        this._modalLoadingSpinnerOverLay.show()
        this.userRegister.validateUserInfo((res) => {
            this._modalLoadingSpinnerOverLay.hide();
            Toast.showShortCenter(res.message);
            if (res.status) {
                this.props.userStore.getMessageStatus();
                this.props.mainStore.changeTab("mine")
                Helper.popToTop()
                setTimeout(()=>{
                    Alert.alert(
                        '绑定银行卡',
                        '绑定银行卡能更加方便提款哦~',
                        [
                            {
                                text: '取消', onPress: () => {
                                }
                            },
                            {
                                text: '绑定', onPress: () => {
                                    Helper.pushToAddBank(true)
                                }
                            }
                        ],
                        {cancelable: false}
                    )
                },1000)
            }
        });
    }

    registerStatistics(username) {
        try {
            NativeModules.DataStatistics.onRegister(username)
        } catch (e) {
        }
    }

}

@observer
class ValidateCode extends Component {

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


    @computed get refreshValidateCodeTime() {
        return this.props.userRegisterStore.refreshValidateCodeTime;
    }

    @computed get validateRefresh() {
        return this.props.userRegisterStore.validateRefresh;
    }

    set validateRefresh(value) {
        this.props.userRegisterStore.validateRefresh = value;
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
            <Image source={{uri: this.props.userRegisterStore.getValidataCodeURL()}}
                   style={{width: 140, height: 50, marginRight: 1}}
                   resizeMode={'contain'}
                   aa={this.refreshValidateCodeTime}
            />
        );
    }

    textInputOnEndEdit() {
        this.validateRefresh = false;
    }

    textInputOnFocus() {
        if (this.validateRefresh) {
            this.props.userRegisterStore._refreshValidateCode();
        }
    }

    onPressValidationCode() {
        this.validateRefresh = false;
        this.refs.validateCode.focus();
        this.props.userRegisterStore._refreshValidateCode();
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
