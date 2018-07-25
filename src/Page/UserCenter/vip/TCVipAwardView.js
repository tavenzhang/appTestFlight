import React, {Component} from 'react';

import {
    StyleSheet,
    Text,
    View,
    ScrollView, TouchableOpacity
} from 'react-native';


import {Size} from "../../resouce/theme";
import TCNavigationBar from "../../../Common/View/TCNavigationBar";
import TCImage from "../../../Common/View/image/TCImage";
import {ASSET_Other, ASSET_Screen, ASSET_Theme, JX_PLAT_INFO} from "../../asset";
import NetUitls from "../../../Common/Network/TCRequestUitls";
import {config} from "../../../Common/Network/TCRequestConfig";
import Toast from "../../../Common/JXHelper/JXToast";
import TCFlatList from "../../../Common/View/RefreshListView/TCFLatList";
import TCButtonView from "../../../Common/View/button/TCButtonView";
import {Bar} from "react-native-progress";

import VipLvView from "./VipLvView";
import VipNameView from "./VipNameView";



export default class TCVipAwardView extends Component {
    constructor(state) {
        super(state)
        this.state = {
            vipLevels:[],
            taskList: [],
            content: null,
        }
    }

    componentWillMount() {
        NetUitls.getUrlAndParamsAndCallback(config.api.vipLvInfo, {access_token: JX_Store.userStore.access_token}, (ret) => {
            if (ret.rs) {
                let taskList = [];
                for (let item of ret.content.vipLevels) {
                    if (item.betValid > ret.content.betTotal) {
                        item.dimBet = item.betValid - ret.content.betTotal;
                        taskList.push(item)
                        break;
                    }
                    for (let unItem of ret.content.rewardsUnReceivedLevels) {
                        if (unItem.id == item.id) {
                            taskList.push(item)
                            break;
                        }
                    }
                }
                this.setState({
                    vipLevels: ret.content.vipLevels,
                    taskList: taskList,
                    content: ret.content
                })
            }
        }, 10000, null, {})


    }


    render() {
        let imgWidth = ASSET_Screen.JX_PLAT_INFO.SCREEN_W;
        let imgHight = (350/750) * imgWidth;
        let progress = 1;
        let nextDim = 0;
        if (this.state.content) {
            progress = (this.state.content.betTotal / this.state.content.levelBetNext).toFixed(1);
            nextDim = this.state.content.levelBetNext - this.state.content.betTotal;
        }
        return (
            <View style={ASSET_Theme.themeViewStyle.containView}>
                <TCNavigationBar
                    title={'VIP'}
                    needBackButton={true}
                    backButtonCall={JX_NavHelp.popToBack}
                    rightTitle={"规则"}
                    rightButtonCall={this.onClickTabRight}/>
                <View>
                    <TCImage style={{width: imgWidth, height: imgHight, marginBottom: 5}}
                             source={ASSET_Other.Other.vip.vipBackGround}/>
                    {this.state.content ?
                        <View style={{
                            position: "absolute",
                            width: imgWidth,
                            height: imgHight,
                            justifyContent: "center",
                            alignItems: "center"
                        }}>
                            <Text style={{
                                color: "white",
                                fontSize: 22,
                                fontWeight: "bold",
                                marginBottom:3
                            }}>{this.state.content.userName}</Text>
                            <VipNameView   isDisplayBg={!JX_PLAT_INFO.IS_IOS} vip={this.state.content.levelIdCurrent} name={this.state.content.levelNameCurrent}/>
                            <View style={{alignItems: "center", marginTop:10}}>
                                <View style={{flexDirection: "row", alignItems: "center"}}>
                                    <VipLvView style={{marginRight:-2}} vip={this.getVipLvById(this.state.content.levelIdCurrent)}
                                               bgImg={VipLvView.Yellow}/>
                                    <View>
                                        <Bar color={ "rgb(255,159,100)"}style={{height:6}}  progress={progress} width={200}/>
                                    </View>
                                    <VipLvView style={{marginLeft:-6}} vip={this.getVipLvById(this.state.content.levelIdNext)}
                                               bgImg={VipLvView.Yellow}/>
                                </View>
                                <View style={{justifyContent: "center", alignItems: "center"}}>
                                    <Text style={{color: "#fff", fontSize:Size.font13}}>还差 <Text style={{
                                        color: "rgb(0,246,241)",
                                        fontSize: 16, fontWeight: "bold"
                                    }}>{nextDim}元 </Text>有效投注
                                    </Text>
                                    <Text style={{color: "white", fontSize:Size.font13}}>即可升级为V{this.getVipLvById(this.state.content.levelIdNext)}</Text>
                                </View>
                            </View>
                        </View> : null
                    }
                </View>
                <View>
                    <View style={{padding:10, marginTop: 5,borderBottomWidth: 0.2, borderBottomColor:"gray", backgroundColor:"white"}}>
                        <Text style={{fontSize: 16, fontWeight: "bold"}}>我的等级<Text style={{
                            fontSize: 14,
                            fontWeight: "normal"
                        }}> (当前为V{this.getVipLvById(this.state.content ? this.state.content.levelIdCurrent : 0)})</Text></Text>
                    </View>
                    <View style={{padding:10, paddingBottom: 1,flexDirection: "row",backgroundColor:"white"}}>
                        <Text style={{fontSize: 16, fontWeight: "bold", color: "gray", width: 100}}>有效投注量:</Text>
                        <Text style={{
                            color: "rgb(0,175,244)",
                            fontSize: 16, fontWeight: "bold"
                        }}>{this.state.content ? this.state.content.betTotal : 0} </Text>

                    </View>
                    <View style={{padding:10, paddingTop: 1,flexDirection: "row", borderBottomWidth: 0.5, borderBottomColor:"gray",backgroundColor:"white"}}>
                        <Text style={{fontSize: 16, fontWeight: "bold", color: "gray", width: 100}}>累计奖励    :</Text>
                        <Text style={{
                            color: "rgb(0,175,244)",
                            fontSize: 16, fontWeight: "bold"
                        }}>{this.state.content ? this.state.content.amountGiveTotal : 0}元 </Text>
                    </View>
                </View>
                <View style={{flexDirection: "row", justifyContent: "space-between",padding:10, marginTop: 10,borderBottomWidth: 0.5, borderBottomColor:"gray", backgroundColor:"white"}}>
                    <Text style={{fontSize: 16, fontWeight: "bold"}}>晋级奖励</Text>
                    <TouchableOpacity onPress={this.goHistoryView}>
                         <Text  style={{fontSize: 13,   color: "rgb(0,175,244)"}}>查看领奖历史</Text>
                    </TouchableOpacity>
                </View>
                <TCFlatList dataS={this.state.taskList} renderRow={this.onRenderTaskListRow}/>
            </View>
        );
    }


    onRenderTaskListRow = (data) => {
        return (<View style={{
            flexDirection: "row",
            justifyContent: 'space-between',
            alignItems: "center",
            paddingRight:10,
            // padding: 10,
           // paddingVertical: 20,
            borderBottomWidth: 0.5,
            borderColor: "#aaa",
            backgroundColor:"white",
        }}>
            <View style={{flexDirection: "row"}}>
                <View style={{justifyContent: "center",alignItems: "center",height: 60 ,width: 80,borderRightWidth:0.5,
                    borderColor: "gray",}}>
                    <Text style={{fontSize:20, }} >{`V${data.displayOrder}`}</Text>
                </View>
                <View style={{alignSelf: "center", marginLeft: 40}}>
                    <Text>赠送彩金: <Text style={{color: "rgb(34,168,245)", fontWeight: "bold"}}>{data.amountGive} 元</Text></Text>
                </View>
            </View>
            {
                data.dimBet ? <TCButtonView  btnStyle={{padding:10, borderRadius:6}}   txtstyleDisabled={{color: "white"}} disabled={true} text={"领取"}/> :
                    <TCButtonView btnStyle={{padding:10, borderRadius:6}} onClick={() => this.onClickVip(data)} text={"领取"}/>
            }
        </View>)
    }


    goHistoryView = () => {
        if(this.state.vipLevels.length>0){
            JX_NavHelp.pushView(JX_Compones.TCVipHistoryView,{vipLevels:this.state.vipLevels})
        }
    }


    onClickVip = (data) => {
        NetUitls.getUrlAndParamsAndCallback(config.api.vipAward, {
            access_token: JX_Store.userStore.access_token,
            unreceivedLevelId: data.id
        }, (ret) => {
            if (ret.rs) {
                Toast.showLongCenter("领取成功!")
                this.componentWillMount()
            } else {
                Toast.showLongCenter(ret.message);
            }
        }, null, null, {})
    }


    onClickTabRight = () => {
        JX_NavHelp.pushView(JX_Compones.WebView, {url: "www.baidu.com", title: "vip规则"});
    }

    getVipLvById = (vipId) => {
        let vipLvList = this.state.vipLevels;
        vipLvList = vipLvList ? vipLvList : []
        let displayLv = 0;
        for (let item of vipLvList) {
            if (item.id == vipId) {
                displayLv = item.displayOrder;
                break;
            }
        }
        return displayLv;
    }
}
