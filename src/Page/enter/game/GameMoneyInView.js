import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text, WebView,
    TouchableOpacity
} from 'react-native'
import {observer} from 'mobx-react/native';
import TCImage from "../../../Common/View/image/TCImage";
import {ASSET_Images,ASSET_Screen} from "../../asset";
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
            selectPayitem:null,
            payList:[],
            isShowHistory:false,
            showDownArrow:true,
            isChange:false
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
        let {pointerEvents}=this.props;
        let bankitem = this.state.selectPayitem;
        if(!bankitem&&this.userPayStore.payTypeList.length>0){
            bankitem = this.userPayStore.payTypeList[0];
        }

        return (<View style={styles.container} pointerEvents={pointerEvents}>
            <TCImage source={ASSET_Images.gameUI.moneyInBg} style={{ width:SCREEN_W-20, height:SCREEN_H}} resizeMode={'stretch'}/>
            {/*<TCImage source={ASSET_Images.gameUI.payTopLeftBg} style={{position: "absolute",width:SCREEN_W*0.35,height:SCREEN_H*0.15}} resizeMode={'contain'}/>*/}
            {/*<TCImage source={ASSET_Images.gameUI.payTopIcon} style={{position: "absolute",width:SCREEN_W*0.08,height:SCREEN_H*0.15,left:SCREEN_W*0.05,top:3}} resizeMode={'stretch'}/>*/}
            <TCImage source={ASSET_Images.gameUI.payTopTxt} style={{position: "absolute",width:SCREEN_W*0.1,height:SCREEN_H*0.06,left:SCREEN_W*0.11,top:SCREEN_H*0.05 - 5}} resizeMode={'contain'}/>

            {/*<TCImage source={ASSET_Images.gameUI.payBackBg} style={{position: "absolute",right: 0, top: 0,width:SCREEN_W*0.25,height:SCREEN_H*0.13}} resizeMode={'stretch'}/>*/}
            <TCButtonImg imgSource={ASSET_Images.gameUI.payBack}
                         onClick={() => TW_Store.gameUIStroe.isShowAddPayView = false}
                         btnStyle={{position: "absolute", right: 10, top: 5,}} imgStyle={{width:SCREEN_W*0.12,height:SCREEN_H*0.1}}/>
            <TCButtonImg imgSource={ASSET_Images.gameUI.btn_minxi}
                         btnStyle={{position: "absolute", right: SCREEN_W*0.15, top: 10}} imgStyle={{width:SCREEN_W*0.20,height:SCREEN_H*0.08}} onClick={()=>TW_Store.gameUIStroe.showChongZhiDetail() }
            />


            <TCImage source={ASSET_Images.gameUI.payTypeBg} style={{position: "absolute",top:SCREEN_H*0.14,left:0,width:SCREEN_W*0.25,height:SCREEN_H}} resizeMode={'stretch'}/>

            <View style={{position: "absolute", top:SCREEN_H*0.20,left:0}}>
                <TCFlatList
                    ref="payTypeList"
                    style={{height:SCREEN_H - SCREEN_H*0.20}}
                    dataS={ this.userPayStore.payTypeList}
                    renderRow={this.onRenderPayTypeItem}
                    showsVerticalScrollIndicator = {false}
                    getItemLayout={(data, index) => (
                        {length: 60, offset: 60 * index, index}
                    )}
                    onScroll={this._scroll}
                />
            </View>

                <View style={{position: "absolute", top:60,left:210}}>
                {bankitem ? <GamePayStepOne itemData={bankitem} isChange={this.state.isChange}/>:null}
            </View>
            {
                this.state.showDownArrow&&
                    <TCButtonImg imgSource={ASSET_Images.gameUI.downArrow} btnStyle={{position: "absolute",bottom:15,left:60}} resizeMode={'stretch'}
                                 imgStyle={{width:60,height:40}} onClick={()=>this.scrollList() }/>
            }
        </View>)

    }

    scrollList =()=>{
        this.refs.payTypeList.scrollToEnd();
    }

    currentY =10000;
    _scroll =(event) =>{
        let y = event.nativeEvent.contentOffset.y
        if(this.currentY === 10000){
            this.currentY = y;
        }else{
            let dy = y - this.currentY;
            if(!this.state.showDownArrow&&dy<0){
                this.setState({
                    showDownArrow:true
                })
            }else{

                if(y>SCREEN_H - 60){
                    this.setState({
                        showDownArrow:false
                    })
                }
            }
        }
    }


    onRenderPayTypeItem=(item, index)=>{

        let bankitem = this.state.selectPayitem;
        if(!bankitem && this.userPayStore.payTypeList.length>0){
            bankitem = this.userPayStore.payTypeList[0];
        }
        bankitem= bankitem ? bankitem:{}
        return  <BtnPayType onClick={(data)=>{
           this.setState({selectPayitem:data,isChange:true});

         }
        }  isSelect={item.code === bankitem.code} data={item}/>
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