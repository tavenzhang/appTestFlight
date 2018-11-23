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

import {observer,inject} from 'mobx-react/native'
import {observable, computed, action} from 'mobx'

import Toast from '../../Common/JXHelper/JXToast';
import TopNavigationBar from '../../Common/View/TCNavigationBar';
import LoadingSpinnerOverlay from '../../Common/View/LoadingSpinnerOverlay'
import dismissKeyboard from 'dismissKeyboard'
import {Size, width, height} from '../../Page/resouce/theme'
import NavigatorHelper from '../../Common/JXHelper/TCNavigatorHelper'
import UserFreePlayStore from '../../Data/store/UserFreePlayStore'
import {
    loginAndRegeisterTxtColor,
    loginAndRegeisterBorderColor,
    loginAndRegeisterBgColor,
    indexBgColor
} from '../../Page/resouce/theme'
import {withMappedNavigationProps} from 'react-navigation-props-mapper'

/**
 * 免费试玩
 */
@withMappedNavigationProps()
@inject("userStore")
@observer
export default class TCUserFreePlay extends Component {

    userFreePlayStore = new UserFreePlayStore();

    constructor(props) {
        super(props)
    }

    static defaultProps = {};

    componentDidMount() {
        this.initGuestUserName()
    }


    componentWillUnmount() {
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
                    keyboardShouldPersistTaps={"always"}
                    keyboardDismissMode={'on-drag'}>
                    <View style={{alignItems: 'center', marginTop: 20}}>
                        < View style={styles.formstyle}>
                            <View style={styles.loginInputStyle}>
                                <Text
                                    style={{
                                        color: loginAndRegeisterTxtColor.inputPlaceholder,
                                        fontSize: Size.default
                                    }}>试玩账号</Text>
                                <Text style={styles.guestNameStyle}>{this.userName}</Text>
                            </View>
                            <View style={styles.loginInputStyle}>
                                <Text
                                    style={{
                                        color: loginAndRegeisterTxtColor.inputPlaceholder,
                                        fontSize: Size.default
                                    }}>登录密码</Text>
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
                        </ View>
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
                    ref={component => this._partModalLoadingSpinnerOverLay = component}
                    modal={true}
                    marginTop={64}/>
            </View>);
    };

    @computed get userName() {
        return this.props.userStore.userName;
    }

    set password(password) {
        this.props.userStore.password = password;
    }

    gotoBack() {
        dismissKeyboard();
        NavigatorHelper.goBack();
    }


    /**
     * 获取试玩账号
     */
    initGuestUserName() {
        this._partModalLoadingSpinnerOverLay.show()
        this.userFreePlayStore.getGuestUserName((res) => {
            this._partModalLoadingSpinnerOverLay && this._partModalLoadingSpinnerOverLay.hide()
            if (!res.status) {
                Toast.showShortCenter(res.message);
                this.gotoBack()
            }
        })
    }

    loginVal() {
        dismissKeyboard();
        this._partModalLoadingSpinnerOverLay.show()
        this.userFreePlayStore.loginVal((res) => {
            this._partModalLoadingSpinnerOverLay && this._partModalLoadingSpinnerOverLay.hide()
            Toast.showShortCenter(res.message);
            if (res.status) {
                NavigatorHelper.popToTop();
            }
        });
    }

    onChangePassword(text) {
        this.password = text;
    }
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
