'use strict'
/**
 * 用户信息
 * Created by Allen on 2016/12/10.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
    Alert,
    ScrollView
} from 'react-native';

import {observer, inject} from 'mobx-react'
import {observable, computed, action} from 'mobx'

import TopNavigationBar from '../../../Common/View/TCNavigationBar';
import LoadingSpinnerOverlay from '../../../Common/View/LoadingSpinnerOverlay'
import dismissKeyboard from 'dismissKeyboard';
import Toast from '../../../Common/JXHelper/JXToast';
import {
    indexBgColor,
    listViewTxtColor,
    inputStyle,
    buttonStyle,
    Size,
    width,
    height,
    baseColor
} from '../../resouce/theme'
import NavigationService from "../../Route/NavigationService";

@inject("userStore")
@observer
export default class TCUserMessage extends Component {

    realName = ''

    constructor(props) {
        super(props)
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                < TopNavigationBar
                    title={'领奖身份信息'}
                    needBackButton={true}
                    backButtonCall={() => {
                        this.back()
                    }}/>
                <View>
                    <Text style={styles.topTipStyle}>
                        亲，中了大奖要凭身份信息进行领取哦，来花一分钟填写一下吧！
                    </Text>
                </View>
                <View style={{flexDirection: 'column'}}>
                    <View>
                        <View style={styles.inputItem}>
                            <Text style={styles.userTitleStyle}>
                                {this.userRealName ? '修改真实姓名' : '真实姓名'}
                            </Text>
                            <TextInput
                                style={styles.inputStyle}
                                placeholder='领取大奖凭证，不可更改'
                                placeholderTextColor={inputStyle.inputPlaceholder}
                                placeholderTextSize={Size.default}
                                underlineColorAndroid='transparent'
                                maxLength={30}
                                onChangeText={(text) => this.changeRealName(text)}
                            />
                        </View>
                        <View style={{alignItems: 'center'}}>
                            <Text
                                style={{
                                    color: baseColor.strong,
                                    marginTop: 10,
                                    fontSize: Size.default
                                }}>此姓名可能会影响到您提现，请谨慎填写!</Text>
                        </View>
                    </View>
                </View>
                <View style={{alignItems: 'center'}}>
                    <TouchableOpacity
                        style={styles.bottomBarButtonStyle}
                        onPress={() => {
                            this.updateRealName()
                        }}>
                        <Text style={{
                            color: buttonStyle.btnTxtColor,
                            fontWeight: 'bold',
                            fontSize: Size.default
                        }}>提交</Text>
                    </TouchableOpacity>
                    <LoadingSpinnerOverlay
                        ref={component => this._modalLoadingSpinnerOverLay = component}/>
                </View>
            </ScrollView>

        );

    };

    changeRealName(text) {
        this.realName = text;
    }


    @computed get userRealName() {
        return this.props.userStore.realName;
    }

    back() {
        dismissKeyboard()
        NavigationService.goBack();
    }

    updateRealName() {
        dismissKeyboard()
        let realName = this.realName
        let reg = /^([\u4e00-\u9fa5]{1}([·•● ]?[\u4e00-\u9fa5]){1,14})$|^[a-zA-Z\s]{4,30}$/
        if (!realName.match(reg)) {
            Toast.showShortCenter("您输入的格式错误，请重新输入!")
            return
        }
        if (this.userRealName && this.userRealName == realName) {
            Toast.showShortCenter("目前真实姓名为：" + this.userRealName)
            return
        }
        this._modalLoadingSpinnerOverLay.show();
        this.props.userStore.changeRealName(this.realName, (res) => {
            this._modalLoadingSpinnerOverLay.hide();
            if (res.status) {
                this.timer = setTimeout(() => {
                    Alert.alert(
                        '温馨提示',
                        '修改已提交，请等待管理员审核!',
                        [
                            {text: '确定', onPress: () => NavigationService.goBack()},
                        ]
                    )
                }, 500)
            } else {
                Toast.showShortCenter(res.message);
            }
        })
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: indexBgColor.mainBg,
    },
    inputItem: {
        flexDirection: 'row',
        height: 60,
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
        marginLeft: 5,
        fontSize: Size.default,
        backgroundColor: indexBgColor.itemBg
    },
    topTipStyle: {
        color: listViewTxtColor.title,
        fontSize: Size.font20,
        margin: 20,
    },
    userTitleStyle: {
        color: listViewTxtColor.title,
        fontSize: Size.font16,
        marginLeft: 5
    }
});
