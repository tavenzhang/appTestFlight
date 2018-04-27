/**
 * Created by allen-jx on 2017/6/10.
 */
import React, {Component, PropTypes,} from 'react'

import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    Image
} from 'react-native'
import {Size, indexBgColor, listViewTxtColor} from '../resouce/theme'
import TopNavigationBar from '../../Common/View/TCNavigationBar';
import UserInfo from '../UserCenter/UserInfo/TCAddUserInfo'
import  BankManager from './UserBank/TCUserBankManager'
import ModifyPwd from './UserInfo/TCModifyPassword'
import ModifySecurityPwd from './UserInfo/TCModifySecurityPwd'
import  InitHelper from '../../Common/JXHelper/TCInitHelper'
import Toast from '../../Common/JXHelper/JXToast';
import {personal} from '../resouce/images'
import Helper from "../../Common/JXHelper/TCNavigatorHelper";
import NavigatorHelper from '../../Common/JXHelper/TCNavigatorHelper'
let helper = new InitHelper()

/**
 * 安全中心
 */
export default class TCUserSecurityCenter extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style={styles.container}>
                < TopNavigationBar
                    title={'安全中心'}
                    needBackButton={true}
                    backButtonCall={() => {
                      Helper.popToBack()
                    }}/>
                <View style={styles.mySettingStyle}>
                    <TouchableOpacity onPress={() => {
                        this.gotoModifyPwd()
                    }}>
                        <View style={styles.myOrderTitle}>
                            <View style={styles.mySetttingLeftStyle}>
                                <Image source={personal.toolPassword} style={styles.img}/>
                                <Text style={styles.mySettingLeftTxtStyle}>修改登录密码</Text>
                            </View>
                            <View style={{paddingRight: 10}}>
                                <Image source={personal.imgNext} style={styles.imgNext}/>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        this.goModifySecurityPwd()
                    }}>
                        <View style={styles.myOrderTitle}>
                            <View style={styles.mySetttingLeftStyle}>
                                <Image source={personal.toolPassword2} style={styles.img}/>
                                <Text style={styles.mySettingLeftTxtStyle}>修改交易密码</Text>
                            </View>
                            <View style={{paddingRight: 10}}>
                                <Image source={personal.imgNext} style={styles.imgNext}/>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        this.gotoBankManager()
                    }}>
                        <View style={styles.myOrderTitle}>
                            <View style={styles.mySetttingLeftStyle}>
                                <Image source={personal.bankManager} style={styles.img}/>
                                <Text style={styles.mySettingLeftTxtStyle}>银行卡管理</Text>
                            </View>
                            <View style={{paddingRight: 10}}>
                                <Image source={personal.imgNext} style={styles.imgNext}/>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    gotoBankManager() {
        NavigatorHelper.pushToUserBankManager()
    }

    gotoModifyPwd() {
        NavigatorHelper.pushToModifyPassword()
    }

    /**
     * 修改取款密码
     */
    goModifySecurityPwd() {
        if (helper.isGuestUser()) {
            Toast.showShortCenter('对不起，试玩账号不能修改交易密码!')
            return
        }
      NavigatorHelper.pushToModifySecurityPwd()
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: indexBgColor.mainBg,
    }, myOrderTitle: {
        flexDirection: 'row',
        borderBottomWidth: 0.5,
        borderBottomColor: indexBgColor.mainBg,
        height: 50,
        alignItems: 'center',
        justifyContent: 'space-between'
    }, myOrderLeftTitle: {
        paddingLeft: 15,
        fontSize: Size.default,
        color: listViewTxtColor.title
    }, imgNext: {
        width: 10,
        height: 15,
    }, mySettingStyle: {
        marginTop: 10,
        backgroundColor: indexBgColor.itemBg
    }, img: {
        width: 30,
        height: 30,
        marginLeft: 15
    }, mySetttingLeftStyle: {
        flexDirection: 'row',
        alignItems: 'center',
    }, mySettingLeftTxtStyle: {
        marginLeft: 10,
        fontSize: Size.default,
        color: listViewTxtColor.title
    }
})
