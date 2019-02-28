import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text, WebView
} from 'react-native'
import {observer} from 'mobx-react/native';
import TCImage from "../../../Common/View/image/TCImage";
import {ASSET_Images} from "../../asset";
import {TCButtonImg} from "../../../Common/View/button/TCButtonView";
import PropTypes from 'prop-types';
import BtnPayType from "./pay/BtnPayType";
import TCFlatList from "../../../Common/View/RefreshListView/TCFLatList";
import GamePayStepOne from "./pay/GamePayStepOne";
import Toast from "../../../Common/JXHelper/JXToast";

import TCUserPayAndWithdrawRecordsMain from "../../UserCenter/UserAccount/TCUserPayAndWithdrawRecordsMain";
import BaseGameAlert from "./pay/BaseGameAlert";

@observer
export default class GameMoneyInView extends Component {

    static propTypes = {
        value: PropTypes.any,
        onChangeText: PropTypes.func,
        placeholder: PropTypes.any,
        inputStyle: PropTypes.any,
        viewStyle:PropTypes.any,
        placeholderTextColor:PropTypes.any,
        multiline:PropTypes.bool,
        keyboardType:PropTypes.string,
        secureTextEntry:PropTypes.bool,
        autoFocus:PropTypes.bool,
        onfocus:PropTypes.func,
        maxLength:PropTypes.number,
        onSubmitEditing:PropTypes.func,
        onBlur:PropTypes.func,
        isDefaultTextStyle:PropTypes.bool
    }

    static defaultProps= {
        viewStyle:{flex:1, justifyContent:"center"},
        isDefaultTextStyle:true,
        inputStyle:{
            fontSize: 14,
        }
    }

    constructor(state) {
        super(state)
        this.state = {
            selectPayCode:"",
            payList:[],
            isShowHistory:false
        }
        this.bblStore = TW_Store.bblStore;
        this.userPayStore=TW_Store.userPayTypeStore;

    }

    componentWillMount(): void {
        this.userPayStore.selectPayType((res) => {
            if (res.status) {
               // this.gotoPayPage(item.code);
                this.setState({test:""})
            } else {
                Toast.showShortCenter(res.message);
            }
        })
    }


    render() {
        let bankCode = this.state.selectPayCode;
        if(bankCode.length==0&&this.userPayStore.payTypeList.length>0){
            bankCode = this.userPayStore.payTypeList[0].code;
        }
        return (<View style={styles.container}>
            <TCImage source={ASSET_Images.gameUI.moneyInBg}/>
            <TCButtonImg imgSource={ASSET_Images.gameUI.btnClose}
                         onClick={() => TW_Store.gameUIStroe.isShowAddPayView = false}
                         btnStyle={{position: "absolute", right: 0, top: 10}}/>
            <TCButtonImg imgSource={ASSET_Images.gameUI.btn_minxi}
                         btnStyle={{position: "absolute", right: 30, top: 53}} onClick={()=>TW_Store.gameUIStroe.showChongZhiDetail()}
            />
            <TCImage source={ASSET_Images.gameUI.title_pay} style={{position: "absolute", right: 180, top: 60}}/>

            <View style={{position: "absolute", top:82,left:24}}>
                <TCFlatList style={{height:220}} dataS={ this.userPayStore.payTypeList} renderRow={this.onRenderPayTypeItem}/>
            </View>
            <View style={{position: "absolute", top:82,left:147}}>
                {this.state.selectPayCode.length >0 ? <GamePayStepOne  type={bankCode}/>:null}
            </View>
        </View>)

    }



    onRenderPayTypeItem=(item, index)=>{

        let bankCode = this.state.selectPayCode;
        if(bankCode.length==0&&this.userPayStore.payTypeList.length>0){
            this.setState({selectPayCode:this.userPayStore.payTypeList[0].code})
        }
        return  <BtnPayType onClick={(data)=>{
           this.setState({selectPayCode:data.code});

         }
        }  isSelect={item.code==this.state.selectPayCode} data={item}/>
    }




}


const styles = StyleSheet.create({
    container: {
        // justifyContent: "center",
        // alignItems: "center",
        // alignSelf: "center",
         position: "absolute",
        // backgroundColor: "red",
        // zIndex: 100
    },

    inputStyle: {
        fontSize: 11,
        fontWeight: "bold",
        color: "#efe8cd"
    },
    webView: {
        marginTop:18,
        height:250,
        width:485,
        backgroundColor: "transparent",
    }

});