import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text
} from 'react-native'
import {observer} from 'mobx-react/native';
import TCImage from "../../Common/View/image/TCImage";
import {ASSET_Images, JX_PLAT_INFO} from "../asset";
import TCButtonView, {TCButtonImg} from "../../Common/View/button/TCButtonView";
import {TCTextInput} from "../../Common/View/TCTextInput";
import TCText from "../../Common/View/widget/TCText";


@observer
export default class GameUIView extends Component {
    constructor(prop) {
        super(prop);
        this.state = {
            isPwdOpen: true,
        }
    }


    render() {
        return (<View style={styles.container}>
            <View>
                <TCImage source={ASSET_Images.gameAccount.personBg}/>
                <TCButtonImg imgSource={ASSET_Images.gameAccount.btnPhone}
                             btnStyle={{position: "absolute", right: 50, top: 95}}/>

                <TCImage source={ASSET_Images.gameAccount.persionText}
                         style={{position: "absolute", right: 205, top: 20}}/>
                <TCButtonImg imgSource={ASSET_Images.gameAccount.btnClose}
                             btnStyle={{position: "absolute", right: 0, top: 10}}/>
                <TCButtonImg imgSource={ASSET_Images.gameAccount.btnOk}
                             btnStyle={{position: "absolute", right: 200, top: 260}}/>
                <TCButtonImg onClick={() => {
                    this.setState({isPwdOpen:!this.state.isPwdOpen});
                    }}
                             imgSource={this.state.isPwdOpen ? ASSET_Images.gameAccount.pwdOpen : ASSET_Images.gameAccount.pwdClose}
                             btnStyle={{position: "absolute", right: 50, top: 235}}/>
                             <View style={{position: "absolute",left:120,top:155}}>
                                <TCTextInput   placeholder={"请输入持卡人姓名"} inputStyle={styles.inputStyle} placeholderTextColor={"#9cc5d8"}/>
                                 <TCTextInput keyboardType={"numeric"} viewStyle={{marginTop:8}} placeholder={"请输入银行卡号"} inputStyle={styles.inputStyle} placeholderTextColor={"#9cc5d8"}/>
                                 <TCTextInput viewStyle={{marginTop:8}} placeholder={"请选择开户银行"} inputStyle={styles.inputStyle} placeholderTextColor={"#9cc5d8"}/>
                                 <TCTextInput viewStyle={{marginTop:8}} placeholder={"请输入省市区"} inputStyle={styles.inputStyle} placeholderTextColor={"#9cc5d8"}/>
                                 <TCTextInput keyboardType={"numeric"}  viewStyle={{marginTop:8}} placeholder={"请设置提现密码"} inputStyle={styles.inputStyle} placeholderTextColor={"#9cc5d8"}/>

                             </View>
                <View style={{position: "absolute",left:170,top:68}}>
                    <TCText backgroundStyle={{backgroundColor:"transparent"}} textStyle={{color:"#efe8cd", }} text={"soon007"}/>
                    <TCText backgroundStyle={{backgroundColor:"transparent", marginTop:10}} textStyle={{color:"#efe8cd" ,}}  text={"994,443.22"}/>
                </View>
            </View>
        </View>)

    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: JX_PLAT_INFO.SCREEN_H,
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        position: "absolute",
        backgroundColor: "transparent",
        zIndex: 150
    },
    inputStyle:{
        fontSize:11,
        fontWeight:"bold"
    }

});
