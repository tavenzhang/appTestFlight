import React from "react";
import TCImage from "../../../Common/View/image/TCImage";
import {ASSET_Other, JX_PLAT_INFO} from "../../asset";
import {View,Text} from "react-native";
import {Size} from "../../resouce/theme";
import PropTypes from 'prop-types'

export default class VipNameView extends React.Component {


    static propTypes : {
        vip: PropTypes.any,//是否允许下拉刷新
        name: PropTypes.any,
        isDisplayBg:PropTypes.any
    }


    static defaultProps = {
        vip: 0,
        name:"",
        isDisplayBg:false
    }

    render(){
        let {vip,name,isDisplayBg}=this.props
        let myDisplayBg = {backgroundColor:"rgb(244,80,15)"};
        myDisplayBg =  isDisplayBg ? myDisplayBg:null;
        return <View style={[{flexDirection:"row", width:110, height:28},myDisplayBg]}>
            <View style={{position:"absolute", zIndex:-10,alignItems:"center", justifyContent:"center"}}>
                <TCImage resizeMode={"contain"}   source={ASSET_Other.Other.vip.titleBackGround}/>
            </View>
            <View style={{flex:1, justifyContent:"center", alignItems:"center"}}>
                {this.getImgByNum(vip)}
            </View>
            <View style={{flex:3,justifyContent:"center",alignItems:"center"}}>
                <Text style={{fontSize:Size.font14, color:"rgba(230,211,160,1)", fontWeight: "bold",backgroundColor:"transparent"}}>{name}</Text>
            </View>

        </View>
    }

    getImgByNum=(vipLv)=>{
        vipLv = vipLv!=null ? vipLv:"0";
        // let vipLvStr = String(vipLv);
        // let numList =vipLvStr.split("");
        return (<View style={{flexDirection:"row",alignItems:"center", justifyContent:"center"}}>
            {/*<TCImage resizeMode={"contain"}  source={ASSET_Other.Other.vip.vipV}/>*/}
            {this.getNumVip(vipLv)}
            {/*{*/}
            {/*numList.map((item)=>{*/}
            {/*return (this.getNumVip(item))*/}
            {/*})*/}
            {/*}*/}
        </View>)
    }

    getNumVip=(num)=>{
        if(ASSET_Other.Other.vip[`vip${num}`]){
            return (<TCImage resizeMode={"contain"} style={{marginLeft:2}}  source={ASSET_Other.Other.vip[`vip${num}`]}/>)
        }
        else{
            return (<Text style={{color:"yellow", fontSize: Size.font10,backgroundColor:"transparent"}}><Text style={{fontSize:Size.font13,
                fontWeight:
                    "bold"}}>V</Text>{`${num}`}</Text>)
        }
    }

}