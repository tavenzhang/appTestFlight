import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text, TextInput, TouchableOpacity, Image,
    Picker, Alert
} from 'react-native'
import {observer} from 'mobx-react';
import TCImage from "../../../Common/View/image/TCImage";
import {ASSET_Images, JX_PLAT_INFO} from "../../asset";
import {TCButtonImg} from "../../../Common/View/button/TCButtonView";
import {TCTextInput} from "../../../Common/View/TCTextInput";
import TCText from "../../../Common/View/widget/TCText";
import {G_LayoutAnimaton} from "../../../Common/Global/G_LayoutAnimaton";
import Toast from "../../../Common/JXHelper/JXToast";
import {addPhoneNumber} from "../../../Common/Network/TCRequestService";
import {inputStyle, listViewTxtColor, Size, width} from "../../resouce/theme";
import ModalDropdown from "../../UserCenter/user/TCAddUserInfo";
import Chooser from "../../../Common/View/Chooser";
import NavigationService from "../../Route/NavigationService";


@observer
export default class GameUserInfoView extends Component {

    constructor(prop) {
        super(prop);
        this.bankStore = TW_Store.bankStore;
        let defaultData = this.bankStore.bankInfo;
        this.state = {
            isPwdOpen: false,
            inputRealName: defaultData.realName,
            inputBankNum: defaultData.accountNum,
            inputBankName: defaultData.bankName,
            inputBrunchAddr: defaultData.bankAddress,
            inputPwd: defaultData.password,
            isShowPhone: false,
            isShowRealName:false,
            inputChangeRelName:"",
            phoneNum: "",
        }
    }

    // componentWillUpdate(nextProps, nextState, nextContext: any): void {
    //     G_LayoutAnimaton.configureNext(G_LayoutAnimaton.springNoDelete);
    // }

    componentWillMount(): void {
        /**
         * 加载厅主绑卡银行卡列表
         */
        TW_Store.userStore.freshBalance(false);
        this.bankStore.initBankList((res) => {
            if (!res.status) {
                Toast.showShortCenter(res.message);
            }
        })
        TW_Store.bankStore.initUserBank();
    }


    render() {
        let {pointerEvents}=this.props;
        return (<View style={styles.container} pointerEvents={pointerEvents}>
            {this.getInfoView()}
            {this.state.isShowPhone ? this.getBindPhoneView() : null}
            {this.state.isShowRealName ? this.getRealNameView():null}
        </View>)

    }

    getInfoView = () => {
        TW_Log("TW_Store.userStore.phoneNumber--",this.state);

        let realName = TW_Store.userStore.realName;
        let isHaveCard =this.bankStore.bankInfo.accountNum&&this.bankStore.bankInfo.accountNum.length > 0;
        let pickDataList = [];
        this.bankStore.bankList.bankCodes.map((item, index) => {
            pickDataList.push({name: this.bankStore.bankList.bankNames[index], value: item})
        });
        let isHavePhone =TW_Store.userStore.phoneNumber&&TW_Store.userStore.isCertifiedPhone;
        let isHaveRelName = TW_Store.userStore.realName&&TW_Store.userStore.realName.length>0;

        return (<View >
            <TCImage source={ASSET_Images.gameUI.personBg}/>
            {
                isHavePhone? null : <TCButtonImg imgSource={ASSET_Images.gameUI.btnPhone}
                                                                 onClick={() => {
                                                                     //this.setState({isShowPhone: true})
                                                                     TW_OnValueJSHome(TW_Store.bblStore.getWebAction(TW_Store.bblStore.ACT_ENUM.bindPhone));
                                                                     TW_Store.gameUIStroe.isShowUserInfo=false;
                                                                 }}
                                                                 soundName={TW_Store.bblStore.SOUND_ENUM.enterPanelClick}
                                                                 btnStyle={{
                                                                     position: "absolute",
                                                                     right: 80,
                                                                     top: isHaveRelName ? 65:80
                                                                 }}/>

        }
            {
                isHaveRelName ?  <TCButtonImg imgSource={ASSET_Images.gameUI.btnRelName}
                                                                    onClick={() => {
                                                                        this.setState({isShowRealName : true})
                                                                    }}
                                                                    soundName={TW_Store.bblStore.SOUND_ENUM.enterPanelClick}
                                                                    btnStyle={{
                                                                        position: "absolute",
                                                                        right: 80,
                                                                        top: 92
                                                                    }}/>:null
            }

            <TCImage source={ASSET_Images.gameUI.persionText}
                     style={{position: "absolute", right: 205, top: 20}}/>
            <TCButtonImg imgSource={ASSET_Images.gameUI.btnClose}
                         soundName={TW_Store.bblStore.SOUND_ENUM.close}
                         onClick={() => TW_Store.gameUIStroe.isShowUserInfo = false}
                         btnStyle={{position: "absolute", right: 0, top: 10}}/>

            {isHaveCard ?  <View style={{position: "absolute", right: 150, top: 270}}>
                <Text style={{color:"#9cc5d8", fontWeight:"bold", fontSize:14}}>如需修改银行卡信息,请联系客服!</Text>
            </View>:<TCButtonImg imgSource={ASSET_Images.gameUI.btnOk}
                                 soundName={TW_Store.bblStore.SOUND_ENUM.click}
                                        btnStyle={{position: "absolute", right: 200, top: 260}} onClick={this.onAddBank}/>}

            { isHaveCard ? null:<TCButtonImg onClick={() => {
                this.setState({isPwdOpen: !this.state.isPwdOpen});
            }} imgSource={this.state.isPwdOpen ? ASSET_Images.gameUI.pwdOpen : ASSET_Images.gameUI.pwdClose}
                         btnStyle={{position: "absolute", right: 50, top: 235}}/>}
            <View style={{position: "absolute", left: 120, top: 153}} pointerEvents={isHaveCard ? "none" : "auto"}>
                <TCTextInput viewStyle={{}} value={this.state.inputRealName} onChangeText={(text) => {
                    this.setState({inputRealName: text})
                }} placeholder={"请输入持卡人姓名"} inputStyle={styles.inputStyle} placeholderTextColor={"#9cc5d8"}/>

                <TCTextInput value={this.onChangeAccountNum(this.state.inputBankNum)}
                             onChangeText={(num) => {
                                 this.setState({inputBankNum: this.onChangeAccountNum(num)})
                             }}
                             onBlur={this.onCardNumCheck}
                             keyboardType={"numeric"} viewStyle={{marginTop: 8}}
                             placeholder={"请输入银行卡号"} maxLength={26} inputStyle={styles.inputStyle}
                             placeholderTextColor={"#9cc5d8"}/>
                <View style={{marginTop: 4}}>
                    <Chooser textStyle={{color: "#9cc5d8", fontSize: 11}}
                             value={this.bankStore.bankInfo.bankCode}
                             placeholder={"请选择开户银行"} dataList={pickDataList} onSelect={(item)=>{
                                 this.bankStore.bankInfo.bankCode =item.value;
                                 this.bankStore.bankInfo.bankName = item.name;
                                // this.setState({pickValue:item.value})
                             }
                    }/>
                </View>
                <TCTextInput onChangeText={(text) => {
                    this.setState({inputBrunchAddr: text})
                }} value={this.state.inputBrunchAddr} viewStyle={{marginTop: 9}} placeholder={"请输入省市区"}
                             inputStyle={styles.inputStyle} placeholderTextColor={"#9cc5d8"}/>
                <TCTextInput onChangeText={(text) => {
                    this.setState({inputPwd: text})
                }} value={this.state.inputPwd} keyboardType={"numeric"} maxLength={4}
                             secureTextEntry={!this.state.isPwdOpen} viewStyle={{marginTop:5}}
                             placeholder={"请设置提现密码"} inputStyle={styles.inputStyle}
                             placeholderTextColor={"#9cc5d8"}/>

            </View>
            <View style={{position: "absolute", left: 160, top: 66}}>
                <TCText backgroundStyle={{backgroundColor: "transparent"}} textStyle={{color: "#efe8cd",}}
                        text={TW_Store.userStore.userName}/>
                <TCText backgroundStyle={{backgroundColor: "transparent", marginTop: G_IS_IOS ? 12:8}}
                        textStyle={{color: "#efe8cd",}} text={`${TW_Store.userStore.balance}`}/>
                {TW_Store.userStore.phoneNumber&&TW_Store.userStore.isCertifiedPhone ?
                    <View style={{position: "absolute", flexDirection: "row", alignItems: "center", top: 0, left: 140}}>
                        <TCImage source={ASSET_Images.gameUI.titlePhone}/>
                        <TCText backgroundStyle={{backgroundColor: "transparent", marginLeft: 5}}
                                textStyle={{color: "#efe8cd", width: 100}} text={`${TW_Store.userStore.phoneNumber}`}/>
                    </View> : null}

            </View>
            <TCImage  source={{uri:TW_Store.bblStore.getHeadIcoUrl()}}
                      style={{position: "absolute", width: 45, height: 46,left: 42, top: 68,}}/>
        </View>)
    }

    // getUserNameView = () => {
    //     let realName = TW_Store.userStore.realName;
    //     if (realName && realName.length > 0) {
    //         return (<Text style={styles.inputStyle}>{realName}</Text>)
    //     } else {
    //         return (<TCTextInput value={this.bankStore.bankInfo.realName} onChangeText={(text) => {
    //             this.bankStore.bankInfo.realName = text;
    //         }} placeholder={"请输入持卡人姓名"} inputStyle={styles.inputStyle} placeholderTextColor={"#9cc5d8"}/>)
    //     }
    // }


    onChangeAccountNum = (text) => {
        let newValue = '';
        text = text.replace(/\s/g, '');
        for (let i = 0; i < text.length; i++) {
            if (i % 4 == 0 && i > 0) newValue = newValue.concat(' ');
            newValue = newValue.concat(text[i]);
        }
        return newValue;
    }

    onCardNumCheck=()=> {
        if (this.state.inputBankNum.length >= 14) {
            this.bankStore.getBankName((res)=> {
                // if (!res.status) {
                //     Toast.showShortCenter(res.message)
                // }
            },this.state.inputBankNum)
        } else {
            Toast.showShortCenter('请输入正确的银行卡号,必须不小于14位');
        }
    }


    onAddBank=()=>{
        TW_Log("onAddBank------")
        this.bankStore.addBank((ret)=>{
            if(ret.status){
                Toast.showShortCenter('添加成功！');
            }else{
                Toast.showShortCenter(ret.message)
            }
        },{
            accountNum: this.state.inputBankNum,
            password:this.state.inputPwd,
            realName: this.state.inputRealName,
            bankAddress: this.state.inputBrunchAddr,
            bankCode: this.bankStore.bankInfo.bankCode ,
            bankName: this.bankStore.bankInfo.bankName ,
        })
    }




    onSelect(idx, value) {
        this.bankStore.bankInfo.bankName = value
        this.bankStore.bankInfo.bankCode = this.bankStore.bankList.bankCodes[idx]
    }


    //绑定手机页面
    getBindPhoneView = () => {
        return (<View style={{position: "absolute"}}>
            <TCImage source={ASSET_Images.gameUI.bindPhoneBg}/>
            <TCButtonImg imgSource={ASSET_Images.gameUI.btnClose}
                         btnStyle={{position: "absolute", right: 0, top: 10}}
                         soundName={TW_Store.bblStore.SOUND_ENUM.close}
                         onClick={() => {
                             this.setState({isShowPhone: false})
                         }}/>
            <View style={{position: "absolute", left: 190, top: 125}}>
                <TCTextInput onChangeText={(text) => {
                    this.setState({phoneNum: text})
                }} value={this.state.phoneNum} viewStyle={{}} placeholder={"请输入手机号码"} keyboardType={"numeric"}
                             inputStyle={[styles.inputStyle, {fontSize: 16,}]} placeholderTextColor={"#9cc5d8"}/>
            </View>
            <TCButtonImg imgSource={ASSET_Images.gameUI.btnOk}
                         soundName={TW_Store.bblStore.SOUND_ENUM.click}
                         btnStyle={{position: "absolute", right: 200, top: 260}} onClick={this.registerPhoneInfo}/>
        </View>)
    }

    //修改真实姓名
    getRealNameView = () => {
        return (<View style={{position: "absolute"}}>
            <TCImage source={ASSET_Images.gameUI.btnRelChangeBg}/>
            <TCButtonImg imgSource={ASSET_Images.gameUI.btnClose}
                         btnStyle={{position: "absolute", right: 0, top: 10}}
                         soundName={TW_Store.bblStore.SOUND_ENUM.close}
                         onClick={() => {
                             this.setState({isShowRealName: false})
                         }}/>
            <View style={{position: "absolute", left: 190, top: 125}}>
                <TCTextInput onChangeText={(text) => {
                    this.setState({inputChangeRelName: text})
                }} value={this.state.inputChangeRelName} viewStyle={{}} placeholder={"提交修改后,可联系客服火速处理"}
                             maxLength={12}
                             inputStyle={[styles.inputStyle, {fontSize: 16, width:250, height:20}]} placeholderTextColor={"#9cc5d8"}/>
            </View>
            <TCButtonImg imgSource={ASSET_Images.gameUI.btnOk}
                         soundName={TW_Store.bblStore.SOUND_ENUM.click}
                         btnStyle={{position: "absolute", right: 200, top: 260}} onClick={this.onChangeRealName}/>
        </View>)
    }



    registerPhoneInfo = () => {

        let regs = /^134[0-8]\d{7}$|^13[^4]\d{8}$|^14[5-9]\d{8}$|^15[^4]\d{8}$|^16[6]\d{8}$|^17[0-8]\d{8}$|^18[\d]{9}$|^19[8,9]\d{8}$/
        if (!this.state.phoneNum || this.state.phoneNum.length < 11 || !this.state.phoneNum.match(regs)) {
            Toast.showShortCenter("请输入正确号码")
            return;

        }
        addPhoneNumber({"phoneNumber": this.state.phoneNum, username: TW_Store.userStore.userName}, (response) => {
            if (response.rs) {
                TW_Store.userStore.phoneNumber = this.state.phoneNum
                Toast.showShortCenter('已绑定成功！')
                this.setState({isShowPhone: false});
            } else {
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

    onChangeRealName=()=>{

        let realName = this.state.inputChangeRelName;
        let reg = /^([\u4e00-\u9fa5]{1}([·•● ]?[\u4e00-\u9fa5]){1,14})$|^[a-zA-Z\s]{4,30}$/
        if (!realName.match(reg)) {
            Toast.showShortCenter("您输入的格式错误，请重新输入!")
            return
        }
        if (this.userRealName && this.userRealName == realName) {
            Toast.showShortCenter("目前真实姓名为：" + this.userRealName)
            return
        }

        TW_Store.userStore.changeRealName(realName, (res) => {
            this.setState({inputChangeRelName:"",isShowRealName:false})
            if (res.status) {
                this.timer = setTimeout(() => {
                    Toast.showLongCenter("修改已提交，请等待管理员审核!")
                 }, 500)
            } else {
                Toast.showLongCenter(res.message);
            }
        })
    }

}


const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        position: "absolute",
        backgroundColor: "transparent",
        zIndex: 150
    },
    inputStyle: {
        fontSize: 12,
        fontWeight: "bold",
        textAlign:"left",
        color: "#efe8cd",
        width:SCREEN_W*2/7
    }

});