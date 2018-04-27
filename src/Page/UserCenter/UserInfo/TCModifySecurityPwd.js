/**
 * 修改用户交易密码
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
    Image
} from 'react-native';

import {observer} from 'mobx-react/native'
import {observable, computed, action} from 'mobx'

import TopNavigationBar from '../../../Common/View/TCNavigationBar';
import Toast from '../../../Common/JXHelper/JXToast';
import LoadingSpinnerOverlay from '../../../Common/View/LoadingSpinnerOverlay'
import {config} from '../../../Common/Network/TCRequestConfig'
import RequestUtils from '../../../Common/Network/TCRequestUitls'
import BackBaseComponent from '../../Base/TCBaseBackComponent'
import  dismissKeyboard from 'dismissKeyboard'
import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter'
import {common} from '../../resouce/images'
import {Size, width, height, indexBgColor, buttonStyle, inputStyle, listViewTxtColor} from '../../resouce/theme'
import SecretUtils from '../../../Common/JXHelper/SecretUtils'
import Helper from "../../../Common/JXHelper/TCNavigatorHelper";
var secretUtils = new SecretUtils()

@observer
export default class TCModifySecurityPwd extends BackBaseComponent {

    oldPwd = ''
    newPwd1 = ''
    newPwd2 = ''
    stateModel = new StateModel()

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        super.componentDidMount()
    }

    componentWillUnmount() {
        super.componentWillUnmount()
    }

    render() {
        return (
            <View style={styles.container}>
                < TopNavigationBar
                    title={'修改交易密码'}
                    needBackButton={true}
                    backButtonCall={() => {
                      Helper.popToBack()
                    }}/>
                {this.renderTip()}
                <View style={{marginTop: 40, flexDirection: 'column'}}>
                    <View style={styles.inputItem}>
                        <TextInput
                            style={styles.inputStyle}
                            placeholder='请输入旧密码'
                            placeholderTextColor={inputStyle.inputPlaceholder}
                            secureTextEntry={true}
                            keyboardType={'numeric'}
                            maxLength={4}
                            underlineColorAndroid='transparent'
                            onChangeText={(text) => this.changeOldPwd(text)}/>
                    </View>
                    <View style={styles.inputItem}>
                        <TextInput
                            style={styles.inputStyle}
                            placeholder='请输入新密码'
                            placeholderTextColor={inputStyle.inputPlaceholder}
                            secureTextEntry={true}
                            maxLength={4}
                            keyboardType={'numeric'}
                            underlineColorAndroid='transparent'
                            onChangeText={(text) => this.changeNewPwd1(text)}/>
                    </View>
                    <View style={styles.inputItem}>
                        <TextInput
                            style={styles.inputStyle}
                            placeholder='确定密码'
                            secureTextEntry={true}
                            maxLength={4}
                            keyboardType={'numeric'}
                            placeholderTextColor={inputStyle.inputPlaceholder}
                            underlineColorAndroid='transparent'
                            onChangeText={(text) => this.changeNewPwd2(text)}/>
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
     * 校验输入
     */
    newPwdVal() {
        if (!this.oldPwd.length) {
            Toast.showShortCenter("请输入旧密码");
            return;
        }
        let reg = /^[0-9]{4}$/
        if (!this.oldPwd.match(reg)) {
            Toast.showShortCenter('旧密码格式错误')
            return
        }
        if (!this.newPwd1.length) {
            Toast.showShortCenter("请输入新密码");
            return;
        }
        if (!this.newPwd1.match(reg)) {
            Toast.showShortCenter('新密码格式错误')
            return
        }
        if (!this.newPwd2.length) {
            Toast.showShortCenter("请输入确认密码");
            return;
        }
        if (this.newPwd1 !== this.newPwd2) {
            Toast.showShortCenter("两次输入密码不一致");
            return;
        }
        dismissKeyboard()
        this.modifyPwd(this.oldPwd, this.newPwd1);
    }

    /**
     * 提交修改请求
     * @param oldPwd
     * @param newPwd
     */
    modifyPwd(oldPwd, newPwd) {
        this._modalLoadingSpinnerOverLay.show()
        let oldEncryptPwd = secretUtils.rsaEncodePWD(oldPwd);
        let newEncryptPwd = secretUtils.rsaEncodePWD(newPwd);
        let data = {'password': oldEncryptPwd, 'newPassword': newEncryptPwd, 'mode': 'SECURITY_PASSWORD'};
        RequestUtils.PostUrlAndParamsAndCallback(config.api.encryptChangePwd, data, (response) => {
            this._modalLoadingSpinnerOverLay.hide();
            if (response.rs) {
                Toast.showShortCenter("密码修改成功！");
                this.timer = setTimeout(() => {
                    this.finsh();
                }, 1000)
            } else {
                if (response.status === 500) {
                    Toast.showShortCenter('服务器出错啦!')
                } else {
                    if (response.message) {
                        Toast.showShortCenter(response.message)
                    }
                }
            }
        })
    }

    finsh() {
        let {navigator} = this.props;
        if (navigator) {
            navigator.popN(2)
        }
    }

    renderTip() {
        if (this.stateModel.isClose) {
            return;
        } else {
            return (<View style={styles.tipViewStyle}>
                <Image source={common.warn} style={styles.tipIconStyle}/>
                <Text style={styles.tipTextStyle}>交易密码会影响您的充值和提现，请谨慎填写！</Text>
                <View>
                    <TouchableOpacity onPress={() => this.stateModel.close()}>
                        <Image source={common.close}
                               style={styles.closeIconStyle}/>
                    </TouchableOpacity></View>
            </View>);
        }
    }

}

class StateModel {
    @observable
    isClose = false

    @action
    close() {
        this.isClose = !this.isClose
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
    },
    tipViewStyle: {
        flexDirection: 'row',
        backgroundColor: indexBgColor.itemBg,
        justifyContent: 'center',
        alignItems: 'center',
    }, tipTextStyle: {
        color: listViewTxtColor.redTip,
        fontSize: Size.small,
        textAlign: 'center',
        padding: 10
    }, closeIconStyle: {
        width: 20,
        height: 20,
    }, tipIconStyle: {
        width: 25,
        height: 25,
    },
});
