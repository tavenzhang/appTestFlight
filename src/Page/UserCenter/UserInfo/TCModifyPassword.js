/**
 * 修改用户登录密码
 * Created by Allen on 2016/12/13.
 */
'user strict'
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
    Alert
} from 'react-native';

import TopNavigationBar from '../../../Common/View/TCNavigationBar';
import {Size, width, height, indexBgColor, buttonStyle, inputStyle} from '../../resouce/theme'
import Toast from '../../../Common/JXHelper/JXToast';
import LoadingSpinnerOverlay from '../../../Common/View/LoadingSpinnerOverlay'
import {config} from '../../../Common/Network/TCRequestConfig'
import  RequestUtils from '../../../Common/Network/TCRequestUitls'
import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter'
import Helper from '../../../Common/JXHelper/TCNavigatorHelper'
import  dismissKeyboard from 'dismissKeyboard'
import SecretUtils from '../../../Common/JXHelper/SecretUtils'
var secretUtils = new SecretUtils()

export default class TCModifyPassword extends Component {

    oldPwd = ''
    newPwd1 = ''
    newPwd2 = ''

    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    render() {
        return (
            <View style={styles.container}>
                < TopNavigationBar
                    title={'修改登录密码'}
                    needBackButton={true}
                    backButtonCall={() => {
                      Helper.popToBack()
                    }}/>
                <View style={{marginTop: 40, flexDirection: 'column'}}>
                    <View style={styles.inputItem}>
                        <TextInput
                            style={styles.inputStyle}
                            placeholder='旧密码'
                            placeholderTextColor={inputStyle.inputPlaceholder}
                            placeholderTextSize={Size.default}
                            secureTextEntry={true}
                            maxLength={15}
                            underlineColorAndroid='transparent'
                            onChangeText={(text) => this.changeOldPwd(text)}/>
                    </View>
                    <View style={styles.inputItem}>
                        <TextInput
                            style={styles.inputStyle}
                            placeholder='新密码(6-15位)'
                            secureTextEntry={true}
                            maxLength={15}
                            placeholderTextColor={inputStyle.inputPlaceholder}
                            placeholderTextSize={Size.default}
                            underlineColorAndroid='transparent'
                            onChangeText={(text) => this.changeNewPwd1(text)}/>
                    </View>
                    <View style={styles.inputItem}>
                        <TextInput
                            style={styles.inputStyle}
                            placeholder='再次输入新密码'
                            placeholderTextColor={inputStyle.inputPlaceholder}
                            placeholderTextSize={Size.default}
                            secureTextEntry={true}
                            maxLength={15}
                            underlineColorAndroid='transparent'
                            onChangeText={(text) => this.changeNewPwd2(text)}
                        />
                    </View>
                </View>
                <View style={{alignItems: 'center'}}>
                    <TouchableOpacity
                        style={styles.bottomBarButtonStyle}
                        onPress={() => this.newPwdVal()}>
                        <Text style={{color: buttonStyle.btnTxtColor, fontWeight: 'bold', fontSize: Size.default}}>
                            确定
                        </Text>
                    </TouchableOpacity>
                </View>
                <LoadingSpinnerOverlay
                    ref={ component => this._modalLoadingSpinnerOverLay = component }/>
            </View>
        );
    }

    changeOldPwd(text) {
        this.oldPwd = text;
    }

    changeNewPwd1(text) {
        this.newPwd1 = text;
    }

    changeNewPwd2(text) {
        this.newPwd2 = text;
    }

    /**
     * 验证输入
     */
    newPwdVal() {
        if (!this.oldPwd.length) {
            Toast.showShortCenter("请输入旧密码");
            return;
        }
        if (!this.newPwd1.length || !this.newPwd2.length) {
            Toast.showShortCenter("请输入新密码");
            return;
        }
        if (this.newPwd1.length < 6) {
            Toast.showShortCenter("密码格式错误(6-15)");
            return;
        }
        if (this.newPwd1 !== this.newPwd2) {
            Toast.showShortCenter("两次输入新密码不一致");
            return;
        }
        dismissKeyboard()
        this.modifyPwd(this.oldPwd, this.newPwd2);
    }

    /**
     * 提交修改密码请求
     * @param oldPwd
     * @param newPwd
     */
    modifyPwd(oldPwd, newPwd) {
        this._modalLoadingSpinnerOverLay.show()
        let oldEncryptPwd = secretUtils.rsaEncodePWD(oldPwd);
        let newEncryptPwd = secretUtils.rsaEncodePWD(newPwd);
        let data = {'password': oldEncryptPwd, 'newPassword': newEncryptPwd, 'mode': 'PASSWORD'};
        RequestUtils.PostUrlAndParamsAndCallback(config.api.encryptChangePwd, data, (response) => {
            this._modalLoadingSpinnerOverLay.hide()
            if (response.rs) {
                this.timer = setTimeout(() => {
                    Alert.alert(
                        '温馨提示',
                        '您的密码已经修改成功，请重新登录!',
                        [
                            {text: '确定', onPress: () => this.modifySuccess()},
                        ]
                    )
                }, 500)
            } else {
                if (response.status === 500) {
                    Toast.showShortCenter("服务器出错啦")
                } else {
                    if (response.message) {
                        Toast.showShortCenter(response.message)
                    } else {
                        Toast.showShortCenter("修改失败，请输入正确密码!")
                    }
                }
            }
        })

    }

    /**
     * 修改成功
     */
    modifySuccess() {
        storage.remove({
            key: 'user',
        });
        TCUSER_DATA = {}
        RCTDeviceEventEmitter.emit('setSelectedTabNavigator', 'home');
        RCTDeviceEventEmitter.emit('userStateChange', 'logout');
        Helper.pushToUserLogin(true)
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: indexBgColor.mainBg,
    },
    inputItem: {
        flexDirection: 'row',
        height: 50,
        borderBottomWidth: 1,
        borderBottomColor: indexBgColor.mainBg,
        paddingLeft: 10,
        backgroundColor: indexBgColor.itemBg,
        alignItems: 'center'
    },
    bottomBarButtonStyle: {
        backgroundColor: buttonStyle.btnBg,
        justifyContent: 'center',
        flexDirection: 'row',
        height: 40,
        alignItems: 'center',
        borderRadius: 4,
        padding: 10,
        width: width * 0.8,
        marginTop: 20
    },
    inputStyle: {
        flex: 1,
        marginLeft: 20,
        fontSize: Size.default,
        backgroundColor: inputStyle.inputBg,
        color: inputStyle.inputTxt
    }

});
