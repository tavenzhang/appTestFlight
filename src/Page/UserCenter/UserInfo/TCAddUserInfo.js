import React, {Component,} from 'react'
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native'

import {observer, inject,} from 'mobx-react/native'
import {action, observable, computed} from 'mobx'

import TopNavigationBar from '../../../Common/View/TCNavigationBar';
import LoadingSpinnerOverlay from '../../../Common/View/LoadingSpinnerOverlay'
import Toast from '../../../Common/JXHelper/JXToast';
import dismissKeyboard from 'dismissKeyboard'
import ModalDropdown from '../../../Common/View/ModalDropdown'
import Dialog from '../../../Common/View/TipDialog'
import {common} from '../../asset/images'
import {
    buttonStyle,
    height,
    indexBgColor,
    inputStyle,
    listViewTxtColor,
    Size,
    width
} from '../../resouce/theme'
import BankStore from "../../../Data/store/BankStore";
import NavigationService from "../../Route/NavigationService";

/**
 * 添加用户信息
 */
@inject("userStore", "jdAppStore")
@observer
export default class TCAddUserInfo extends Component {

    bankStore = new BankStore();

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.loadDataFromNet()
    }

    componentWillUnmount() {
    }

    render() {
        return (
            <View style={styles.container}>
                < TopNavigationBar
                    title={'添加银行信息'}
                    needBackButton={true}
                    backButtonCall={() => {
                        this.back()
                    }}/>
                <ScrollView
                    keyboardShouldPersistTaps={'always'}
                    keyboardDismissMode={Platform.OS !== 'ios' ? 'none' : 'on-drag'}>
                    <View>
                        <Text style={styles.titleTipTxtStyle}>请绑定持卡人本人银行卡</Text>
                    </View>
                    <View>
                        <View style={styles.inputItemStyle}>
                            <View style={styles.inputTitleTxt}>
                                <Text style={{
                                    color: listViewTxtColor.title,
                                    fontSize: Size.default
                                }}>{'持 卡 人  '}</Text>
                            </View>
                            {this.getUserNameView()}
                            <TouchableOpacity onPress={() => this.bankStore.showTip = true}>
                                <Image source={common.warn} style={styles.tipIconStyle}/>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.inputItemStyle}>
                            <View style={styles.inputTitleTxt}>
                                <Text
                                    style={{color: listViewTxtColor.title, fontSize: Size.default}}>银行名称</Text>
                            </View>
                            <ModalDropdown
                                textStyle={styles.dropDownTxtStyle}
                                options={this.bankStore.bankList.bankNames.slice(0)}
                                defaultValue={'请选择开户银行'}
                                style={styles.dropStyle}
                                dropdownStyle={styles.dropdownStyle}
                                bankListWidth={width * 0.9 - 95}
                                renderRow={(rowData, rowID) => this.renderDropDownRow(rowData, rowID)}
                                onSelect={(idx, value) => this.onSelect(idx, value)}/>
                        </View>
                        <View style={styles.inputItemStyle}>
                            <View style={styles.inputTitleTxt}>
                                <Text
                                    style={{color: listViewTxtColor.title, fontSize: Size.default}}>银行卡号</Text>
                            </View>
                            <TextInput
                                style={styles.inputStyle}
                                placeholder='请输入银行卡号'
                                keyboardType={'numeric'}
                                placeholderTextColor={inputStyle.inputPlaceholder}
                                underlineColorAndroid='transparent'
                                maxLength={21}
                                onChangeText={(text) => this.onChangeAccountNum(text)}/>
                        </View>
                        <View style={styles.inputItemStyle}>
                            <View style={styles.inputTitleTxt}>
                                <Text
                                    style={{color: listViewTxtColor.title, fontSize: Size.default}}>开户支行</Text>
                            </View>
                            <TextInput
                                style={styles.inputStyle}
                                placeholder='请输入开户支行'
                                placeholderTextColor={inputStyle.inputPlaceholder}
                                underlineColorAndroid='transparent'
                                maxLength={30}
                                onChangeText={(text) => this.onChangeBankAddress(text)}/>
                        </View>
                        <View style={styles.inputItemStyle}>
                            <View style={styles.inputTitleTxt}>
                                <Text
                                    style={{color: listViewTxtColor.title, fontSize: Size.default}}>交易密码</Text>
                            </View>
                            <TextInput
                                style={styles.inputStyle}
                                placeholder='请设置交易密码'
                                keyboardType={'numeric'}
                                secureTextEntry={true}
                                placeholderTextColor={inputStyle.inputPlaceholder}
                                underlineColorAndroid='transparent'
                                maxLength={4}
                                onChangeText={(text) => this.onChangePassword(text)}/>
                            <TouchableOpacity
                                onPress={() => this.bankStore.showPwdTip = true}>
                                <Image source={common.warn} style={styles.tipIconStyle}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{alignItems: 'center'}}>
                        <TouchableOpacity
                            style={styles.bottomBarButtonStyle}
                            onPress={() => this.validateBankInfo()}>
                            <Text style={{color: buttonStyle.btnTxtColor, fontWeight: 'bold'}}>
                                完成
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
                <Dialog show={this.bankStore.showTip}
                        setModalVisible={() => this.bankStore.showTip = false}
                        dialogTitle={'持卡人说明'}
                        dialogContent={' 为了您的账户资金安全，只能绑定持卡人\n本人的银行卡。获取帮助，请联系在线客服'}
                        btnTxt={'我知道了'}/>
                <Dialog show={this.bankStore.showAddBankSuccess}
                        setModalVisible={() => {
                            this.bankStore.showAddBankSuccess = false;
                            this.back();
                        }
                        }
                        dialogTitle={'温馨提示'}
                        dialogContent={'银行卡已添加成功'}
                        btnTxt={'确定'}/>
                <Dialog show={this.bankStore.showPwdTip}
                        setModalVisible={() => this.bankStore.showPwdTip = false}
                        dialogTitle={'交易设置提示'}
                        dialogContent={'交易密码用于余额提现，\n可以在安全中心修改'}
                        btnTxt={'我知道了'}/>
                <LoadingSpinnerOverlay
                    ref={component => this._modalLoadingSpinnerOverLay = component}/>
            </View>
        )
    }

    back() {
        dismissKeyboard()
        if (this.props.backToTop) {
            NavigationService.popToTop()
        } else {
            NavigationService.goBack();
        }
    }

    @computed get realName() {
        return this.props.userStore.realName;
    }

    @computed get isGuest() {
        return this.props.userStore.isGuest;
    }

    getUserNameView() {
        if (this.realName && this.realName.length > 0) {
            return (<Text style={styles.inputStyle}>{this.realName}</Text>)
        } else {
            return (<TextInput
                style={styles.inputStyle}
                placeholder='请输入开户名'
                placeholderTextColor={inputStyle.inputPlaceholder}
                underlineColorAndroid='transparent'
                maxLength={30}
                onChangeText={(text) => this.onChangeRealName(text)}/>)
        }
    }

    /**
     * 加载厅主绑卡银行卡列表
     */
    loadDataFromNet() {
        this.bankStore.initBankList((res) => {
            if (!res.status) {
                Toast.showShortCenter(res.message);
            }
        })
    }

    onChangeAccountNum(text) {
        this.bankStore.bankInfo.accountNum = text;
    }

    onChangeRealName(text) {
        this.bankStore.bankInfo.realName = text
    }

    onChangePassword(text) {
        this.bankStore.bankInfo.password = text
    }

    onChangeBankAddress(text) {
        this.bankStore.bankInfo.bankAddress = text;
    }

    onSelect(idx, value) {
        this.bankStore.bankInfo.bankName = value
        this.bankStore.bankInfo.bankCode = this.bankStore.bankList.bankCodes[idx]
    }

    renderDropDownRow(rowData, rowId) {
        return (
            <TouchableOpacity>
                <View style={styles.dropDownItemStyle}>
                    <Image
                        source={ this.props.jdAppStore.getBankCardLogo(this.bankStore.bankList.bankCodes[rowId])}
                        resizeMode={'contain'}
                        style={styles.bankIcon}/>
                    <Text style={{fontSize: Size.font16, color: listViewTxtColor.title}}>{rowData}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    /***
     * 验证银行卡信息
     */
    validateBankInfo() {
        if (this.realName && this.realName.length > 0) {
            this.bankStore.bankInfo.realName = this.realName;
        } else {
            if (!this.bankStore.bankInfo.realName) {
                Toast.showShortCenter("请输入开户名");
                return;
            }
            let reg = /^([\u4e00-\u9fa5]{1}([·•● ]?[\u4e00-\u9fa5]){1,14})$|^[a-zA-Z\s]{4,30}$/;

            if (!this.bankStore.bankInfo.realName.match(reg)) {
                Toast.showShortCenter("请输入正确的开户名");
                return;
            }
        }
        if (!this.bankStore.bankInfo.accountNum.length) {
            Toast.showShortCenter("请输入银行卡号");
            return
        }
        let regs = /^[0-9]{10,}$/
        let bankCardNo = this.bankStore.bankInfo.accountNum.replace(/\s+/g, "");
        if (!bankCardNo.match(regs)) {
            Toast.showShortCenter("请输入正确的银行卡号")
            return
        }
        if (!this.bankStore.bankInfo.bankName.length) {
            Toast.showShortCenter("请选择开户银行")
            return
        }
        if (!this.bankStore.bankInfo.bankAddress.length) {
            Toast.showShortCenter("请输入开户支行")
            return
        }
        if (!this.bankStore.bankInfo.password) {
            Toast.showShortCenter("请输入交易密码")
            return
        }
        regs = /^[0-9]{4}$/
        if (!this.bankStore.bankInfo.password.match(regs)) {
            Toast.showShortCenter("交易密码格式错误")
            return
        }
        dismissKeyboard()
        if (this.isGuest) {
            Toast.showShortCenter('对不起，试玩账号不能添加银行卡信息!')
            return
        }
        this._modalLoadingSpinnerOverLay.show();
        this.bankStore.addBank((res) => {
            this._modalLoadingSpinnerOverLay.hide();
            if (!res.status) {
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
    bottomBarButtonStyle: {
        backgroundColor: buttonStyle.btnBg,
        justifyContent: 'center',
        flexDirection: 'row',
        height: 40,
        alignItems: 'center',
        borderRadius: 4,
        padding: 10,
        width: width * 0.8,
        marginTop: 40,
        marginBottom: Platform.OS === 'ios' ? 100 : 0
    },
    titleTipTxtStyle: {
        color: listViewTxtColor.title,
        marginTop: 20,
        marginLeft: 5,
        marginBottom: 5,
        fontSize: Size.default
    },
    inputItemStyle: {
        backgroundColor: indexBgColor.itemBg,
        height: 50,
        marginTop: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    inputStyle: {
        flex: 1,
        paddingLeft: 10,
        color: inputStyle.inputTxt,
        fontSize: Size.default
    }, inputTitleTxt: {
        justifyContent: 'center',
        paddingLeft: 15,
        width: 85,
    }, tipIconStyle: {
        width: 35,
        height: 35,
        marginRight: 10
    }, dropdownStyle: {
        width: width * 0.6,
        height: height * 0.6,
        borderWidth: 1,
        borderRadius: 3,
        backgroundColor: indexBgColor.mainBg
    }, dropDownItemStyle: {
        flexDirection: 'row',
        padding: 20,
        backgroundColor: indexBgColor.itemBg,
        alignItems: 'center'
    }, dropStyle: {
        marginLeft: 10,
        flex: 1,
        height: 30,
        justifyContent: 'center'
    }, dropDownTxtStyle: {
        color: listViewTxtColor.title,
        fontSize: Size.default
    },
    bankIcon: {
        width: 30,
        height: 30,
        marginRight: 5,
    }
})
