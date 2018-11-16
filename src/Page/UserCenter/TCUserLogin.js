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

import {observer, inject} from 'mobx-react/native'
import {observable, computed, action} from 'mobx'
import {ButtonView} from '../../Common/View';
import Toast from '../../Common/JXHelper/JXToast'
import TopNavigationBar from '../../Common/View/TCNavigationBar';
import LoadingSpinnerOverlay from '../../Common/View/LoadingSpinnerOverlay'
import dismissKeyboard from 'dismissKeyboard'
import JXHelpers from '../../Common/JXHelper/JXHelper'
import NavigatorHelper from '../../Common/JXHelper/TCNavigatorHelper'
import ModalDropdown from '../../Common/View/ModalDropdown'
import {withMappedNavigationProps} from 'react-navigation-props-mapper'

import {common, personal} from '../asset/images'
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
@inject("jdAppStore", "mainStore", "userStore")
@withMappedNavigationProps()
@observer
export default class TCUserLogin extends Component {


    constructor(props) {
        super(props)
        this.userName = this.defaultUserName ? this.defaultUserName : "";
    }

    static defaultProps = {};

    componentDidMount() {

        if (this.props.isFromRegister) {
            Toast.showShortCenter('注册成功，请用刚才注册信息登录');
        }
    }

    componentWillUnmount() {
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
                                    defaultValue={this.userName}
                                    onChangeText={(text) => this.onChangeUserName(text)}/>
                                <ModalDropdown
                                    textStyle={styles.dropDownTxtStyle}
                                    options={this.loginNames}
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

                        {/*<ButtonView*/}
                            {/*btnStyle={styles.bottomBarButtonStyle1}*/}
                            {/*txtstyle={{*/}
                                {/*color: loginAndRegeisterTxtColor.freePlay,*/}
                                {/*fontWeight: 'bold',*/}
                                {/*fontSize: Size.large*/}
                            {/*}}*/}
                            {/*text={'免费试玩'}*/}
                            {/*onClick={() => {*/}
                                {/*NavigatorHelper.pushToUserFreePlay()*/}
                            {/*}}*/}
                        {/*/>*/}
                    </View>
                </ScrollView>
                <LoadingSpinnerOverlay
                    ref={component => this._partModalLoadingSpinnerOverLay = component}
                    modal={true}
                    marginTop={64}/>
            </View>);
    };


    @computed get loginNames() {
        return this.props.jdAppStore.loginedUserNames
    }

    @computed get defaultUserName() {
        return this.props.jdAppStore.getDefaultUserName();
    }

    @computed get userName() {
        return this.props.userStore.userName;
    }

    set userName(userName) {
        this.props.userStore.userName = userName.toLocaleLowerCase();
    }

    @computed get password() {
        return this.props.userStore.password;
    }

    set password(password) {
        this.props.userStore.password = password;
    }

    register() {
        dismissKeyboard()
        NavigatorHelper.pushToUserRegister(true);
    }

    gotoBack() {
        dismissKeyboard()
        if (this.props.isBackToTop) {
            NavigatorHelper.popToTop();
            this.props.mainStore.changeTab("home")
        } else {
            NavigatorHelper.goBack()
        }
    }

    onlineService() {
        let res = JXHelpers.getMenuIconsUrl('CUS_SERVICE')
        if (res) {
            NavigatorHelper.pushToWebView(res, '在线客服')
        }
    }

    loginVal() {
        dismissKeyboard();
        this._partModalLoadingSpinnerOverLay.show();
        this.props.userStore.loginVal((res) => {
            this._partModalLoadingSpinnerOverLay.hide()
            Toast.showShortCenter(res.message);

            if (res.status) {
                this.props.userStore.getMessageStatus();
                if (this.props.isBackToTop) {
                    NavigatorHelper.popToTop();
                } else {
                    this.props.mainStore.changeTab("mine")
                    NavigatorHelper.goBack();
                }
            }
        })
    }

    onChangeUserName(text) {
        this.userName = text;
    }

    onChangePassword(text) {
        this.password = text;
    }

    onSelect(idx, value) {
        this.userName = value
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
        height: 45,
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
        height: 45,
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
