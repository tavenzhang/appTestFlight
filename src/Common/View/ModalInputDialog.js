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
            realNameReq:false,
            mobileNoReq:false,
            cardNoReq:false,
            nameMsg:false,
            mobileMsg:false,
            cardMsg:false
        }
        this.inputdata={
            realname:"",
            phoneNum:"",
            cardNo:""
        };
    }

    componentDidMount() {
    }

    componentWillReceiveProps(nextProps) {
        this.updateData(nextProps);
    }

    render() {
        return (
            <Modal
                animationType='fade'
                transparent={true}
                visible={this.props.show}
                onRequestClose={() => {
                }}
            >
                <View style={styles.modalStyle}>

                    <View style={styles.modalMain}>

                        <View style={{ height: 40,justifyContent:"center",borderBottomWidth:0.5, borderBottomColor:'#cccccc',alignItems:'center',width:width * 0.8}}><Text
                            style={styles.modalTitle}>{this.props.dialogTitle}</Text></View>
                        <View>
                            <Text style={{color:'red',fontSize:Size.font12,paddingTop:5}}>请务必填写正确存款人信息，否则会入款失败</Text>
                        </View>
                        {this.state.realNameReq?( <View style={styles.modalContent}>
                            <TextInput
                                placeholder='请输入姓名'
                                style={{backgroundColor:"#F5F5F5",width:width * 0.8-20,borderRadius:6,height:40,marginLeft:IS_IOS?10:0}}
                                maxLength={6}
                                placeholderTextSize={Size.default}
                                underlineColorAndroid='transparent'
                                onChangeText={(text) => this.inputdata.realname = text}/>
                            {this.state.nameMsg&&<Text style={{color:'red'}}>请输入正确的存款人姓名!</Text>}
                        </View>):null}
                        {this.state.mobileNoReq?( <View style={styles.modalContent}>
                            <TextInput
                                placeholder='请输入手机号'
                                style={{backgroundColor:"#F5F5F5",width:width * 0.8-20,borderRadius:6,height:40,marginLeft:IS_IOS?10:0}}
                                maxLength={11}
                                keyboardType={'numeric'}
                                placeholderTextSize={Size.default}
                                underlineColorAndroid='transparent'
                                onChangeText={(text) => this.inputdata.phoneNum = text}/>
                            {this.state.mobileMsg&&<Text style={{color:'red'}}>请输入正确的存款人手机号!</Text>}
                        </View>):null}
                        {this.state.cardNoReq?( <View style={styles.modalContent}>
                            <TextInput
                                placeholder='请输入银行卡号'
                                style={{backgroundColor:"#F5F5F5",width:width * 0.8-20,borderRadius:6,height:40,marginLeft:IS_IOS?10:0}}
                                maxLength={20}
                                keyboardType={'numeric'}
                                placeholderTextSize={Size.default}
                                underlineColorAndroid='transparent'
                                onChangeText={(text) => this.inputdata.cardNo = text}/>
                            {this.state.cardMsg&&<Text style={{color:'red'}}>请输入正确的存款人银行卡号!</Text>}
                        </View>):null}

                        <View style={{flexDirection:"row",marginBottom:10,marginTop:20}}>
                            <TouchableOpacity onPress={()=>{
                                this.clearData();
                                this.props.btnLeftClick()
                            }}>
                                <View style={[styles.queryBtnStyle,{borderWidth:1,borderColor:baseColor.blue}]}>

                                    <Text style={styles.queryTxtStyle}>{this.props.btnLeftTxt}</Text>

                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>{
                                if(!this.showErrorMsg()){
                                   this.props.btnRightClick(this.inputdata);
                                    this.clearData();
                                }
                            }}>
                                <View style={[styles.queryBtnStyle,{backgroundColor:baseColor.blue}]}>

                                    <Text style={[styles.queryTxtStyle,{color:"white"}]}>{this.props.btnRigthTxt}</Text>

                                </View>
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>
            </Modal>
        )
    }

    updateData(props){
        let { realNameReq,
            mobileNoReq,
            cardNoReq} = props.content;
        this.setState({
            realNameReq,
            mobileNoReq,
            cardNoReq
        });
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

    showErrorMsg(){
        let reg = /^([\s\u4e00-\u9fa5]{1}([·•● ]?[\s\u4e00-\u9fa5]){1,14})$|^[a-zA-Z\s]{4,30}$/;
        let {realname,phoneNum,cardNo} = this.inputdata;
        let nameMsg = false,mobileMsg = false,cardMsg = false;
        if (this.state.realNameReq && !realname.match(reg)) {
            nameMsg = true;
        }
        reg = /^134[0-8]\d{7}$|^13[^4]\d{8}$|^14[5-9]\d{8}$|^15[^4]\d{8}$|^16[6]\d{8}$|^17[0-8]\d{8}$|^18[\d]{9}$|^19[8,9]\d{8}$/

        if (this.state.mobileNoReq && !phoneNum.match(reg)) {
           mobileMsg = true;
        }
        if (this.state.cardNoReq && cardNo.length < 14) {
           cardMsg = true;
        }
        this.setState({
            nameMsg:nameMsg,
            mobileMsg:mobileMsg,
            cardMsg:cardMsg
        })
        return nameMsg || mobileMsg || cardMsg;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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