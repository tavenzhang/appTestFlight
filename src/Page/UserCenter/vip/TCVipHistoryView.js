import React,{Component} from "react";
import {withMappedNavigationProps} from "react-navigation-props-mapper";
import {ASSET_Other, ASSET_Theme} from "../../asset";
import {View,Text} from "react-native";
import TCFlatList from "../../../Common/View/RefreshListView/TCFLatList";
import TCNavigationBar from "../../../Common/View/TCNavigationBar";
import NetUitls from "../../../Common/Network/TCRequestUitls";
import {config} from "../../../Common/Network/TCRequestConfig";
import VipLvView from "./VipLvView";
import TCImage from "../../../Common/View/image/TCImage";
import {Size} from "../../resouce/theme";

@withMappedNavigationProps()
export default class TCVipHistoryView extends React.Component {
    constructor(state) {
        super(state)
        this.state = {
            taskHistoryList: [],
            inited:false
        }
    }

    componentWillMount() {

        NetUitls.getUrlAndParamsAndCallback(config.api.vipAwardHistory, {access_token: JX_Store.userStore.access_token}, (ret) => {
            if (ret.rs) {
                this.setState({
                    inited:true,
                    taskHistoryList: ret.content,
                })
            }
        },)
    }

    render() {
        return (
            <View style={ASSET_Theme.themeViewStyle.containView}>
                    <TCNavigationBar
                        title={'领奖历史'}
                        needBackButton={true}
                        backButtonCall={JX_NavHelp.popToBack}
                     />
                {
                    this.state.inited&&this.state.taskHistoryList.length==0 ?  <View style={{flex:1, justifyContent:"center", alignItems:"center"}}>
                        <Text>暂无领奖记录!</Text>
                    </View>:  <TCFlatList  styleContain={{marginTop:20}} dataS={this.state.taskHistoryList} renderRow={this.onRenderHistoryListRow}/>
                }

            </View>)
    }


    onRenderHistoryListRow = (data,index) => {
         let VipLv =this.getVipLvById(data.levelIdLast);
         let timStr = data.createdTime.split(" ")[0]
         timStr =timStr ? timStr:"";
         timStr=timStr.replace(/-/g,"/")

        return (
            <View style={{marginHorizontal:20}}>
                {index!=0 ?<TCImage resizeMode={"contain"} style={{left:23}} source={ASSET_Other.Other.vip.blueBar}/>:null}
                <View style={{flexDirection: "row",  alignItems:"center"}}>
                    <VipLvView vip={VipLv} bgImg={VipLvView.Blue} textStyle={{color:"white", fontSize:Size.font16, fontWeight:"bold"}}/>
                    <View style={{left:40}}>
                        <Text style={{}}> {timStr} </Text>
                        <Text> {data.levelNameLast} 领取奖励 <Text  style={{  color: "rgb(0,175,244)"}}>{data.amountGive}元</Text></Text>
                    </View>
                </View>
            </View>)
    }

    getVipLvById = (vipId) => {
        let {vipLevels} = this.props
        let vipLvList = vipLevels;
        vipLvList = vipLvList ? vipLvList : []
        let displayLv = 0;
     //   JXLog("vipId-----" + vipId, vipLvList);
        for (let item of vipLvList) {
            if (item.id == vipId) {
                displayLv = item.displayOrder;
                break;
            }
        }
        return displayLv;
    }

}