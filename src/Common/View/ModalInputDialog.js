import React, {Component, PropTypes,} from 'react'

import {View, StyleSheet, Text, TouchableOpacity, Modal, TextInput} from 'react-native'
import {
    Size,
    width,
    height,
    indexBgColor,
    indexTxtColor,
    baseColor,
    loginAndRegeisterTxtColor
} from '../../Page/resouce/theme'
import payHelper from "../../Page/UserCenter/UserPay/PayHelper";
import Toast from "../JXHelper/JXToast";
/**
 * 提示对话框
 */
export default class TipDialog extends Component {

    // 构造函数
    constructor(props) {
        super(props)
        this.realname =""
        this.state = {
            nameMsg:false,
            mobileMsg:false,
            cardMsg:false,
            errMsg:""
        }
        this.inputdata={
            realname:"",
            phoneNum:"",
            cardNo:""
        };
    }


    render() {
        TW_Log("GamePayStepOne-----TipDialog--",this.props)
        let {btnLeftTxt,show,content,btnLeftClick,btnRightClick,btnRigthTxt} = this.props;
        let myContent = content ? content:{}
        let { realNameReq, mobileNoReq, cardNoReq} = myContent;
        //TW_Log("GamePayStepOne-----TipDialog--",this.props)
        return (
            <Modal
                animationType='fade'
                transparent={true}
                supportedOrientations={[ "portrait", "portrait-upside-down" ,"landscape" ,"landscape-left" , "landscape-right"]}
                visible={show}
                onRequestClose={() => {
                }}
            >
                <View style={styles.modalStyle}>

                    <View style={styles.modalMain}>

                        <View style={{ height: 40,justifyContent:"center",borderBottomWidth:0.5, borderBottomColor:'#cccccc',alignItems:'center',width:width * 0.8}}><Text
                            style={styles.modalTitle}>{this.props.dialogTitle}</Text></View>
                        <View>
                            <Text style={{color:'green',fontSize:Size.font12,paddingTop:5}}>请务必填写正确存款人信息，否则会入款失败</Text>
                        </View>
                        {realNameReq ?( <View style={styles.modalContent}>
                            <TextInput
                                placeholder='请输入姓名'
                                autoCapitalize={"none"}
                                style={{backgroundColor:"#F5F5F5",width:width * 0.8-60,borderRadius:6,height:40,marginLeft:G_IS_IOS?10:0}}
                                maxLength={6}
                                placeholderTextSize={Size.default}
                                underlineColorAndroid='transparent'
                                onChangeText={(text) => this.inputdata.realname = text}/>
                            {/*{this.state.nameMsg&&<Text style={{color:'red'}}>请输入正确的存款人姓名!</Text>}*/}
                        </View>):null}
                        {mobileNoReq ?( <View style={styles.modalContent}>
                            <TextInput
                                placeholder='请输入手机号'
                                autoCapitalize={"none"}
                                style={{backgroundColor:"#F5F5F5",width:width * 0.8-60,borderRadius:6,height:40,marginLeft:G_IS_IOS?10:0}}
                                maxLength={11}
                                keyboardType={'numeric'}
                                placeholderTextSize={Size.default}
                                underlineColorAndroid='transparent'
                                onChangeText={(text) => this.inputdata.phoneNum = text}/>
                            {/*{this.state.mobileMsg&&<Text style={{color:'red'}}>请输入正确的存款人手机号!</Text>}*/}
                        </View>):null}
                        {cardNoReq ? ( <View style={styles.modalContent}>
                            <TextInput
                                placeholder='请输入银行卡号'
                                autoCapitalize={"none"}
                                style={{backgroundColor:"#F5F5F5",width:width * 0.8-60,borderRadius:6,height:40,marginLeft:G_IS_IOS?10:0}}
                                maxLength={20}
                                keyboardType={'numeric'}
                                placeholderTextSize={Size.default}
                                underlineColorAndroid='transparent'
                                onChangeText={(text) => this.inputdata.cardNo = text}/>
                            {/*{this.state.cardMsg&&<Text style={{color:'red'}}>请输入正确的存款人银行卡号!</Text>}*/}
                        </View>):null}
                        <View>
                            <Text style={{color:'red',fontSize:Size.font12,}}>{this.state.errMsg}</Text>
                        </View>
                        <View style={{flexDirection:"row",marginBottom:10,marginTop:10}}>
                            <TouchableOpacity onPress={()=>{
                                this.clearData();
                                btnLeftClick()
                            }}>
                                <View style={[styles.queryBtnStyle,{borderWidth:1,borderColor:baseColor.blue}]}>
                                    <Text style={styles.queryTxtStyle}>{btnLeftTxt}</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>{
                                if(!this.showErrorMsg()){
                                    btnRightClick(this.inputdata);
                                    this.clearData();
                                }
                            }}>
                                <View style={[styles.queryBtnStyle,{backgroundColor:baseColor.blue}]}>
                                    <Text style={[styles.queryTxtStyle,{color:"white"}]}>{btnRigthTxt}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>
            </Modal>
        )
    }


    clearData(){
        this.inputdata={
            realname:"",
            phoneNum:"",
            cardNo:""
        };
        this.setState({
            nameMsg:false,
            mobileMsg:false,
            cardMsg:false
        })
    }

    showErrorMsg=()=>{
        let {content} = this.props;
        let myContent = content ? content:{}
        let { realNameReq, mobileNoReq, cardNoReq} = myContent;
        let reg = /^([\s\u4e00-\u9fa5]{1}([·•● ]?[\s\u4e00-\u9fa5]){1,14})$|^[a-zA-Z\s]{4,30}$/;
        let {realname,phoneNum,cardNo} = this.inputdata;
        let nameMsg = false,
            mobileMsg = false,
            cardMsg = false;
        let errMsg=""
        if (realNameReq && !realname.match(reg)) {

            errMsg ="请输入正确的存款人姓名!";
            nameMsg = true;
        }
        reg = /^134[0-8]\d{7}$|^13[^4]\d{8}$|^14[5-9]\d{8}$|^15[^4]\d{8}$|^16[6]\d{8}$|^17[0-8]\d{8}$|^18[\d]{9}$|^19[8,9]\d{8}$/

        if (mobileNoReq && !phoneNum.match(reg)) {
            errMsg ="请输入正确的存款人手机号!";
           mobileMsg = true;
        }
        if (cardNoReq && cardNo.length < 14) {
            errMsg ="请输入正确的存款人银行卡号!";
           cardMsg = true;
        }
        this.setState({errMsg})

        return nameMsg || mobileMsg || cardMsg;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 300,
        backgroundColor: '#F2F2F2',
    },
    modalStyle: {
        backgroundColor: 'rgba(52,52,52,0.5)',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }, modalTitle: {
        fontSize: Size.font14,
        paddingHorizontal:5,
        paddingVertical:5
    }, modalContent: {
        height: height * 0.1,
        marginVertical:5,
        justifyContent: 'center',
        alignItems: 'center',

    },
    queryBtnStyle: {
        justifyContent:"center",
        height: 40,
        marginLeft:5,
        borderRadius:4
    }, queryTxtStyle: {
        color: baseColor.blue,
        width: width * 0.4-10,
        textAlign: 'center',
        fontSize: Size.font14,
    },
    modalMain: {
        backgroundColor: 'white',
        width: width * 0.8,
        borderRadius: 5,
        alignItems:'center'
    }
})