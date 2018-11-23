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
        this.tryTime=0;
    }

    componentWillMount() {
        NetUitls.getUrlAndParamsAndCallback(config.api.vipLvInfo, null, (ret) => {
            this.onRequtDealData(ret);
        }, 10000, null, {})

    }

    onRequtDealData=(ret)=>{
        if (ret.rs) {
            ret.content.displayOrderCurrent = ret.content.displayOrderCurrent-1;
            let taskList = [];
            for (let unItem of ret.content.rewardsUnReceivedLevels) {
                for (let item of ret.content.vipLevels) {
                    if (unItem.id == item.id) {
                        item.amountGive = unItem.amountGive;
                        taskList.push(item);
                        break;
                    }
                }
            }
            let isMaxLv = true;
            let nextItem={}
            for (let item of ret.content.vipLevels) {
                item.displayOrder=item.displayOrder-1;
                if(isMaxLv&&item.displayOrder>ret.content.displayOrderCurrent){
                    item.dimBet = 1;
                    taskList.push(item);
                    nextItem = item;
                    isMaxLv= false
                }
            }
            if(!isMaxLv){
                JXLog("nextItem.betValid----ret.content.betTotal=="+ret.content.betTotal,nextItem.betValid)
                if((ret.content.betTotal -nextItem.betValid)>0&&this.tryTime<5){
                    //如果投注量大于未升级的当前lv 触发服务端vip 升级
                    this.tryTime++;
                    NetUitls.getUrlAndParamsAndCallback(config.api.vipUpdate, null, (ret) => {
                        this.onRequtDealData(ret);
                    })
                    return;
                }
            }
            //   nextItem.betValid - ret.content.betTotal
            this.setState({
                vipLevels: ret.content.vipLevels,
                taskList: taskList,
                content: ret.content,
                isMaxLv,
                nextItem:nextItem,
            })
        }else{
            Toast.showLongCenter(ret.message)
        }
        this.setState({inited:true})
    }

    render() {
        let imgWidth = ASSET_Screen.JX_PLAT_INFO.SCREEN_W;
        let imgHight = (350/750) * imgWidth;
        let progress = 1;
        let nextDim = 0;
        let statue = 1;
        let betTotal = this.state.content&&this.state.content.betTotal ?  this.state.content.betTotal:0;
        let isMaxLv =this.state.isMaxLv;

        if (this.state.content&&!isMaxLv) {
            progress = (betTotal/this.state.nextItem.betValid).toFixed(2);
            progress = progress == null ? 0:progress;
            progress = progress <0.01 ? 0.01:progress;
            nextDim = (this.state.nextItem.betValid - betTotal).toFixed(2);
            let tempDimStr =nextDim.toString();
            tempDimStr=tempDimStr.split(".")[1];
            if(tempDimStr=="00"){
                nextDim =parseInt(nextDim);
            }
            statue=this.state.content.vipPlan.status

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
                    <TCImage  style={{   position:this.state.content ? "absolute":"relative",width: imgWidth, height: imgHight, marginBottom: 5}}
                              source={ASSET_Other.Other.vip.vipBackGround}/>
                    {this.state.content ?
                        <View style={{
                            width: imgWidth,
                            height: imgHight,
                            justifyContent: "center",
                            alignItems: "center"
                        }}>
                            <Text style={{
                                color: "white",
                                fontSize: 22,
                                fontWeight: "bold",
                                marginBottom:3,
                                backgroundColor:"transparent"
                            }}>{this.state.content.userName}</Text>
                            <VipNameView   isDisplayBg={!JX_PLAT_INFO.IS_IOS} vip={this.state.content.displayOrderCurrent} name={this.state.content.levelNameCurrent}/>
                            <View style={{alignItems: "center", marginTop:10}}>
                                <View style={{flexDirection: "row", alignItems: "center"}}>
                                    <VipLvView style={{marginRight:-2}} vip={this.state.content.displayOrderCurrent}
                                               bgImg={VipLvView.Yellow}/>
                                    <View>
                                        <Bar color={ "rgb(255,159,100)"} style={{height:6}}  progress={progress} width={200}/>
                                    </View>
                                    <VipLvView style={{marginLeft:-6}} vip={isMaxLv ? this.state.content.displayOrderCurrent:this.state.nextItem.displayOrder}
                                               bgImg={VipLvView.Yellow}/>
                                </View>
                                {
                                    statue==2 ? <Text style={{color: "white",backgroundColor:"transparent",
                                        marginTop: 10,fontSize:Size.font13}}>(等级维护中，维护期间不累计打码量!)</Text> : (isMaxLv ?     <Text style={{color: "white",backgroundColor:"transparent", fontSize:Size.font13}}>当前已是最高等级 !</Text>:
                                        <View style={{justifyContent: "center", alignItems: "center"}}>
                                            <Text style={{color: "#fff", backgroundColor:"transparent",fontSize:Size.font13}}>还差 <Text style={{
                                                color: "rgb(0,246,241)",
                                                backgroundColor:"transparent",
                                                fontSize: Size.font15,
                                            }}>{nextDim}元 </Text>有效投注
                                            </Text>
                                            <Text style={{color: "#fff", backgroundColor:"transparent",fontSize:Size.font13}}>
                                                即可升级为{this.state.nextItem.name}</Text>
                                        </View>)
                                }
                            </View>
                        </View> : null
                    }
                </View>
                <View>
                    <View style={{padding:10,  marginTop: 5,borderBottomWidth: 0.2, borderBottomColor:"gray", backgroundColor:"white"}}>
                        <Text style={{fontSize: Size.font18}}>我的等级<Text style={{
                            fontSize: Size.font14,
                            fontWeight: "normal"
                        }}> (当前为{this.state.content ? this.state.content.levelNameCurrent : ""})</Text></Text>
                    </View>
                    <View style={{padding:10, paddingBottom: 1,flexDirection: "row",backgroundColor:"white",
                        alignItems: "center"}}>
                        <Text style={{fontSize: Size.font16,  color: "gray", width: 95}}>有效投注量:</Text>
                        <Text style={{
                            color: "rgb(0,175,244)",
                            fontSize: Size.font14,
                        }}>{betTotal} </Text>

                    </View>
                    <View style={{padding:10, paddingTop: 1,flexDirection: "row",alignItems: "center", borderBottomWidth: 0.5, borderBottomColor:"gray",backgroundColor:"white"}}>
                        <Text style={{fontSize: Size.font16, color: "gray", width: 95}}>    累计奖励:</Text>
                        <Text style={{
                            color: "rgb(0,175,244)",
                            fontSize: Size.font14,
                        }}>{this.state.content ? this.state.content.amountGiveTotal : 0} 元 </Text>
                    </View>
                </View>
                <View style={{flexDirection: "row", justifyContent: "space-between",padding:10, marginTop: 10,borderBottomWidth: 0.5, borderBottomColor:"gray", backgroundColor:"white"}}>
                    <Text style={{fontSize: Size.font18, }}>晋级奖励</Text>
                    <TouchableOpacity onPress={this.goHistoryView}>
                        <Text  style={{fontSize: Size.font13,   color: "rgb(0,175,244)"}}>查看领奖历史</Text>
                    </TouchableOpacity>
                </View>
                {
                    this.state.inited&&this.state.taskList.length==0 ? <View style={{flex:1, justifyContent:"center", alignItems:"center"}}>
                        <Text>暂无奖励!</Text>
                    </View>: <TCFlatList dataS={this.state.taskList} renderRow={this.onRenderTaskListRow}/>
                }

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
