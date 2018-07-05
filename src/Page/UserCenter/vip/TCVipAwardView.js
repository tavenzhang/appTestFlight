

import React, {Component} from 'react';

import {
    StyleSheet,
    Text,
    View,
    ScrollView
} from 'react-native';


import {Size} from "../../resouce/theme";
import TCNavigationBar from "../../../Common/View/TCNavigationBar";
import TCImage from "../../../Common/View/image/TCImage";
import {ASSET_Other, ASSET_Screen, ASSET_Theme} from "../../asset";
import TCButtonView from "../../../Common/View/button/TCButtonView";
import NetUitls from "../../../Common/Network/TCRequestUitls";
import {config} from "../../../Common/Network/TCRequestConfig";
import Toast from "../../../Common/JXHelper/JXToast";

export default class TCVipAwardView extends Component {
    constructor(state) {
        super(state)
        this.state= {
            vipInfo: {
                rewardsUnReceivedLevels:[]
            }
        }
    }

    componentWillMount() {
        JXLog("config.vipLvInfo-----",config.vipLvInfo)
        NetUitls.getUrlAndParamsAndCallback(config.api.vipLvInfo,{access_token:JX_Store.userStore.access_token},()=>{

        },10000,null,{})
    }

    render() {
        return (
            <View style={ASSET_Theme.themeViewStyle.containView}>
            <TCNavigationBar
                    title={'晋级奖励'}
                    needBackButton={true}
                    backButtonCall={JX_NavHelp.popToBack} rightTitle={this.state.vipInfo.rewardsUnReceivedLevels.length>0 ? "一键领取" :null} rightButtonCall={this.onGetAllAwards}/>
            <ScrollView>
                <TCImage style={{width:ASSET_Screen.JX_PLAT_INFO.SCREEN_W,height:130, marginBottom:5}} source={ASSET_Other.Other.mg_holder}/>
                <View style={styles.itemContain}>
                        <Text style={{fontSize:Size.font16}}>当前等级:</Text>
                    <Text style={{marginLeft:15}}>Vip5</Text>
                </View>
                <View style={styles.itemContain}>
                    <Text style={{fontSize:Size.font16}}>晋级奖励:</Text>
                    <Text style={{marginLeft:15}}>Vip5</Text>
                </View>
                <View style={styles.itemContain}>
                    <Text style={{fontSize:Size.font16}}>我的有效投注量:</Text>
                    <Text style={{marginLeft:15}}>Vip5</Text>
                </View>
                <TCButtonView onClick={this.onGetLvAward} btnStyle={{marginHorizontal:20, marginTop:15, borderRadius:10,height:40}} text={"在投注领取vip6"}/>
            </ScrollView>
            </View>
        );
    }

    onGetLvAward=()=>{
        NetUitls.getUrlAndParamsAndCallback(config.api.vipAward,{access_token:JX_Store.userStore.access_token,unreceivedLevelId:"unreceivedLevelId"},(ret)=>{
            Toast.showLongCenter(ret.content.message);
        })
    }

    onGetAllAwards=()=>{
        NetUitls.getUrlAndParamsAndCallback(config.api.vipAllAward,{access_token:JX_Store.userStore.access_token},(ret)=>{
            ret.rs ?  Toast.showLongCenter("领取成功!"):null;
        });
    }
}

const styles = StyleSheet.create({
   itemContain:{
       flexDirection:"row",
       paddingVertical:5,
       paddingHorizontal:10
   }
});