import React, {Component} from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    ScrollView,
    StyleSheet,
    Platform
} from 'react-native'

import TopNavigationBar from '../../../Common/View/TCNavigationBar';
import { indexBgColor, inputStyle, buttonStyle} from '../../asset/game/themeComponet'
import Helper from "../../../Common/JXHelper/TCNavigatorHelper";
import dismissKeyboard from 'dismissKeyboard'
import Toast from '../../../Common/JXHelper/JXToast';
import NavigationService from "../../Route/NavigationService";
import {addPhoneNumber} from "../../../Common/Network/TCRequestService";
import LoadingSpinnerOverlay from '../../../Common/View/LoadingSpinnerOverlay'

export default class TCAddPhoneNumberInfo extends Component {

    constructor(props) {
        super(props);

        this.state = {
            phoneNum: ''
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <TopNavigationBar
                    title={'绑定手机号'}
                    needBackButton={true}
                    backButtonCall={() => {
                        this.back()
                    }}/>
                <ScrollView
                    keyboardShouldPersistTaps={Platform.OS !== 'ios'}
                    keyboardDismissMode={Platform.OS !== 'ios' ? 'none' : 'on-drag'}>
                    <View>
                        <TextInput
                            style={styles.inputStyle}
                            keyboardType = 'numeric'
                            placeholder='请输入手机号码'
                            placeholderAlign='center'
                            placeholderTextColor={inputStyle.inputPlaceholder}
                            underlineColorAndroid='transparent'
                            maxLength={11}
                            onChangeText={(text) => this.SetPhoneNumber(text)}/>
                    </View>
                    <View>
                        <Text style={styles.tips}>
                            温馨提示：手机号码绑定后不支持自行修改，如需修改请联系客服！
                        </Text>
                    </View>
                    <View style={{alignItems: 'center'}}>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => this.RegisterPhoneInfo()}>
                            <Text style={{color: buttonStyle.btnTxtColor, fontWeight: 'bold'}}>
                                确定绑定
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
                <LoadingSpinnerOverlay
                    ref={component => this._modalLoadingSpinnerOverLay = component}/>
            </View>

        )
    }


    RegisterPhoneInfo() {

          let regs = /^134[0-8]\d{7}$|^13[^4]\d{8}$|^14[5-9]\d{8}$|^15[^4]\d{8}$|^16[6]\d{8}$|^17[0-8]\d{8}$|^18[\d]{9}$|^19[8,9]\d{8}$/
        if (!this.state.phoneNum||this.state.phoneNum.length < 11 ||!this.state.phoneNum.match(regs)) {
            Toast.showShortCenter("请输入正确号码")
            return;

        }
       addPhoneNumber({"phoneNumber": this.state.phoneNum,username:TW_Store.userStore.userName}, (response) => {
            if (response.rs) {
                TW_Store.userStore.phoneNumber = this.state.phoneNum
                Toast.showShortCenter('已绑定成功！')
                Helper.popToTop()
            }
            else {
                this.timer = setTimeout(() => {
                    if (response.status === 500) {
                        Toast.showShortCenter("服务器出错啦")
                    } else {
                        if (response.message) {
                            Toast.showShortCenter(response.message)
                        } else {
                            Toast.showShortCenter("添加信息失败，请稍后再试！")
                        }
                    }
                }, 500)
            }
        })
    }




    back() {
        dismissKeyboard()
        // if (this.props.backToTop) {
        //     NavigationService.popToTop()
        // } else {
            NavigationService.goBack();
        // }
    }


    SetPhoneNumber(text) {
        this.state.phoneNum = text
    }

}



const styles = StyleSheet.create({
    container: {
            flex: 1,
            backgroundColor: indexBgColor.mainBg,
        },
    inputStyle: {
        textAlign:'left',
        height:40,
        backgroundColor:'#ffffff',
        borderWidth:1,
        borderColor:'#ffffff',
        borderRadius:4,
        width:300,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        alignSelf: 'center',
        marginBottom:15,
        marginTop:30
    },

    bindPhoneNumber:{
        marginTop:20,
        marginBottom:20,
        color:'#000000',
        fontSize:15,
        marginLeft:33
    },

    tips:{
        color:'red',
        fontSize:13,
        alignSelf:'center',
        justifyContent:'center',
        marginBottom:20,
        marginTop:20,
        marginLeft:33,
        alignItems: 'center'
    },

    button:{
        backgroundColor: buttonStyle.btnBg,
        justifyContent: 'center',
        height: 40,
        alignItems: 'center',
        borderRadius: 4,
        padding: 10,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        alignSelf: 'center',
        marginBottom:15,
        width:300

    }


})
