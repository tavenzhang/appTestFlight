import React, {Component} from 'react'
import {
    StyleSheet,
    View,
} from 'react-native'
import {observer} from 'mobx-react';
import TCImage from "../../../Common/View/image/TCImage";
import {ASSET_Images,ASSET_Screen} from "../../asset";
import {TCButtonImg} from "../../../Common/View/button/TCButtonView";
import PropTypes from 'prop-types';
import BtnPayType from "./pay/BtnPayType";
import TCFlatList from "../../../Common/View/RefreshListView/TCFLatList";
import GamePayStepOne from "./pay/GamePayStepOne";
import Toast from "../../../Common/JXHelper/JXToast";


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
        initedData:false,
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
            isChange:false,
            initedData:false,
        }
        this.bblStore = TW_Store.bblStore;
        this.userPayStore=TW_Store.userPayTypeStore;

    }

    componentWillMount(): void {
        this.userPayStore.selectPayType((res) => {
            if (res.status) {
               // this.gotoPayPage(item.code);
                this.setState({initedData:true})
            } else {
                Toast.showShortCenter(res.message);
            }
        })
        TW_Store.userPayTypeStore.initPayTypeList();
    }


    render() {
        let {pointerEvents}=this.props;
        let bankitem = this.state.selectPayitem;
        if(!bankitem&&this.userPayStore.payTypeList.length>0){
            bankitem = this.userPayStore.payTypeList[0];
        }
        let fullWithStyle= SCREEN_ISFULL ? {width:SCREEN_W*0.22}:null
        return (<View style={styles.container} pointerEvents={pointerEvents}>
            <TCImage source={ASSET_Images.gameUI.moneyInBg} style={{ width:SCREEN_W, height:SCREEN_H}} resizeMode={'stretch'}/>
            <TCImage source={ASSET_Images.gameUI.payTypeBg} style={[{position: "absolute",left:SCREEN_ISFULL ? -20:-15,top:SCREEN_H*0.14, height:SCREEN_H-50}, fullWithStyle]} resizeMode={'stretch'}/>
            <TCImage source={ASSET_Images.gameUI.payTopLeftBg} style={{position: "absolute",width:SCREEN_W*0.30,height:SCREEN_H*0.15}} resizeMode={'stretch'}/>
            <TCImage source={ASSET_Images.gameUI.payTopIcon} style={{position: "absolute",width:SCREEN_W*0.08,height:SCREEN_H*0.15,left:SCREEN_W*0.02,top:5}} resizeMode={'stretch'}/>
            <TCImage source={ASSET_Images.gameUI.payTopTxt} style={{position: "absolute",left:SCREEN_W*0.12,top:13}} resizeMode={'contain'}/>
            <TCImage source={ASSET_Images.gameUI.moneyBottomBg} style={{position: "absolute",right:0,bottom:0}} resizeMode={'contain'}/>
            <TCImage source={ASSET_Images.gameUI.payBackBg} style={{position: "absolute",right: 0, top: 0,width:SCREEN_W*0.20,height:SCREEN_H*0.12}} resizeMode={'stretch'}/>
            <TCButtonImg imgSource={ASSET_Images.gameUI.payBack}
                         onClick={() => TW_Store.gameUIStroe.isShowAddPayView = false}
                         soundName={TW_Store.bblStore.SOUND_ENUM.returnLobbyClick}
                         btnStyle={{position: "absolute", right: -15, top: 7,width:SCREEN_W*0.20,height:SCREEN_H*0.12}} resizeMode={'stretch'}/>
            <TCButtonImg imgSource={ASSET_Images.gameUI.btn_minxi}
                         soundName={TW_Store.bblStore.SOUND_ENUM.enterPanelClick}
                         btnStyle={{position: "absolute", right: SCREEN_W*0.15, top: 10}}  onClick={()=>TW_Store.gameUIStroe.showChongZhiDetail() }
            />

            <View style={{position: "absolute", top:61,left:0,}}>
                <TCFlatList
                    ref="payTypeList"
                    style={{height:SCREEN_H - SCREEN_H*0.2,top:10,left:SCREEN_ISFULL ? 20:0}}
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
                 <GamePayStepOne itemData={bankitem} isChange={this.state.isChange} initedData={this.state.initedData}/>
            </View>
            {
                this.state.showDownArrow&&
                    <TCButtonImg imgSource={ASSET_Images.gameUI.downArrow} btnStyle={{position: "absolute",bottom:15,left:60}}
                                 soundName={TW_Store.bblStore.SOUND_ENUM.click}
                                 onClick={this.scrollList}/>
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
