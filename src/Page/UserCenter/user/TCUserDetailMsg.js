'use strict'
/**
 * Created by Allen on 2016/12/10.
 */
import React, {Component} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View,} from 'react-native';
import {observer, inject} from 'mobx-react'


import TopNavigationBar from '../../../Common/View/TCNavigationBar';
import JXHelper from '../../../Common/JXHelper/JXHelper'
import {personal} from '../../asset/images'
import {indexBgColor, Size} from '../../asset/game/themeComponet'
import {computed} from "mobx/lib/mobx";
import NavigationService from "../../Route/NavigationService";
import Toast from "../../../Common/JXHelper/JXToast";


@observer
export default class TCUserDetailMsg extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
       
    }

    componentWillUnmount() {
    }

    render() {
       // TW_Log("TCUserDetailMsg----------TW_Store.userStore==",this.props)
        return (
            <View style={styles.container}>
                <TopNavigationBar
                    title={'个人信息'}
                    needBackButton={true}
                    backButtonCall={() => {
                        this.back()
                    }}/>
                <View style={styles.setItem}>
                    <Text style={styles.itemTxt}>头像</Text>
                    {/*<Image source={personal.userDefaultIcon} style={styles.imgUser}/>*/}
                    <View style={{
                        marginRight: 10,
                        height: 40,
                        width: 40,
                        borderRadius: 20,
                        borderWidth: TCLineW,
                        borderColor: 'rgba(0,0,0,0.3)',
                        backgroundColor: TW_Store.userStore.userLogoColor,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <Text style={{
                            fontSize: 15,
                            fontWeight: 'bold',
                            color: 'white'
                        }}>{JXHelper.getUserIconShowName(this.userName)}</Text>
                    </View>
                </View>
                <View style={styles.setItem}>
                    <Text style={styles.itemTxt}>用户名</Text>
                    <Text style={styles.itemRightTxt}>{this.userName}</Text>
                </View>
                <TouchableOpacity onPress={() => {
                    this.gotoChangeRealName()
                }}>
                    <View style={styles.setItem}>
                        <Text style={styles.itemTxt}>身份信息</Text>
                        {this.getUserInfo()}
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    this.gotoChangePhoneNumber()
                }}>
                    <View style={styles.setItem}>
                        <Text style={styles.itemTxt}>手机号码</Text>
                        {this.getPhoneInfo()}
                    </View>
                </TouchableOpacity>
                <View style={{marginTop: 10}}>
                    <View style={styles.setItem}>
                        <Text style={styles.itemTxt}>余额</Text>
                        <Text style={styles.itemRightTxt}>{TW_Store.userStore.balance}</Text>
                    </View>
                    {this.getPrizeGroup()}
                </View>
            </View>);
    };

    @computed get userName() {
        return TW_Store.userStore.userName;
    }

    back() {
       TW_NavHelp.goBack()
    }

    /**
     * 跳转到修改真实姓名
     */
    gotoChangeRealName() {
        if (TW_Store.userStore.isGuest) {
            Toast.showShortCenter('试玩账号不能修改身份信息！')
            return
        }
        TW_NavHelp.pushView(TW_Store.userStore.realName ? JX_Compones.TCUserMessage : JX_Compones.TCAddUserInfo)
    }

    gotoChangePhoneNumber() {
        if (TW_Store.userStore.isGuest) {
            Toast.showShortCenter('试玩账号不能修改手机号码！')
            return
        }
        if (TW_Store.userStore.phoneNumber) {
            Toast.showShortCenter('如需修改请联系客服！')
            return;
        }
        TW_NavHelp.pushView(JX_Compones.TCAddPhoneNumberInfo)

    }

    /**
     * 获取奖金组信息
     * @returns {XML}
     */
    getPrizeGroup() {
        if (TW_Store.userStore.prizeGroup) {
            return (<View style={styles.setItem}>
                <Text style={styles.itemTxt}>彩票返点</Text>
                <Text style={styles.itemRightTxt}>{TW_Store.userStore.prizeGroup}</Text>
            </View>)
        }
    }

    /**
     * 根据用户是否存在真实姓名显示组件
     * @returns {XML}
     */
    getUserInfo() {
        if (TW_Store.userStore.realName) {
            return (<View style={styles.itemRight}>
                <Text style={styles.itemRightTxt}>{TW_Store.userStore.realName}</Text>
                <Image source={personal.imgNext} style={styles.imgNext}/>
            </View>)
        } else {
            return (<View style={styles.itemRight}>
                <Text style={styles.itemRightTxt}>待认证</Text>
                <View style={styles.pointStyle}/>
                <Image source={personal.imgNext} style={styles.imgNext}/>
            </View>)
        }
    }

    getPhoneInfo() {
        if (TW_Store.userStore.phoneNumber) {
            return (<View style={styles.itemRight}>
                <Text style={styles.itemRightTxt}>{TW_Store.userStore.phoneNumber}</Text>
                <Image source={personal.imgNext} style={styles.imgNext}/>
            </View>)
        } else {
            return (<View style={styles.itemRight}>
                <Text style={styles.itemRightTxt}>未绑定</Text>
                <View style={styles.pointStyle}/>
                <Image source={personal.imgNext} style={styles.imgNext}/>
            </View>)
        }
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: indexBgColor.mainBg,
    },
    imgNext: {
        width: 10,
        height: 15,
        marginRight: 10
    },
    setItem: {
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: indexBgColor.itemBg,
        marginTop: 1,
        justifyContent: 'space-between'
    },
    itemTxt: {
        marginLeft: 10,
        fontSize: Size.font16,
        color: '#333333'
    }, itemRightTxt: {
        fontSize: Size.large,
        marginRight: 10,
        color: '#333333'
    },
    pointStyle: {
        width: 4,
        height: 4,
        borderRadius: 2,
        backgroundColor: 'red'
    },
    imgUser: {
        width: 40,
        height: 40,
        marginRight: 10
    }, itemRight: {
        flexDirection: 'row',
        alignItems: 'center'
    }
});
