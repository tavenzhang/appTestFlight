import {observer} from "mobx-react";
import React from "react";
import TCImage from "../../../Common/View/image/TCImage";
import {ASSET_Other} from "../../asset";
import {View,Text} from "react-native";
import {Size} from "../../resouce/theme";


export default class VipNameView extends React.Component {


    static propTypes : {
        vip: PropTypes.any,//是否允许下拉刷新
        name: PropTypes.any,
    }


    static defaultProps = {
        vip: 0,
        name:""
    }

    render(){
        let {vip,name}=this.props
        return <View style={{flexDirection:"row", width:140/2, height:44/2}}>
            <View style={{flex:1, justifyContent:"center", alignItems:"center"}}>
            {this.getImgByNum(vip)}
            </View>
            <View style={{flex:2,justifyContent:"center", alignItems:"center"}}>
            <Text style={{fontSize:Size.font13, color:"yellow"}}>{name}</Text>
            </View>
            <View style={{position:"absolute", zIndex:-10,alignItems:"center", justifyContent:"center"}}>
                <TCImage resizeMode={"contain"}  source={ASSET_Other.Other.vip.titleBackGround}/>
            </View>
        </View>

    }

    getImgByNum=(vipLv)=>{
        vipLv = parseInt(vipLv) ;
        vipLv = vipLv!=null ? vipLv:0;
        return (<View style={{flexDirection:"row",alignItems:"flex-end", justifyContent:"center"}}>
            <TCImage resizeMode={"contain"}  source={ASSET_Other.Other.vip.vipV}/>
            <TCImage resizeMode={"contain"} style={{width:7, height: 10}}  source={ASSET_Other.Other.vip[`vip${vipLv}`]}/>
        </View>)
    }


}