import {observer} from "mobx-react";
import React from "react";
import TCImage from "../../../Common/View/image/TCImage";
import {ASSET_Other} from "../../asset";
import {View,Text} from "react-native";
import {Size} from "../../resouce/theme";


export default class VipLvView extends React.Component {


    static propTypes : {
        vip: PropTypes.any,//是否允许下拉刷新
        bgImg: PropTypes.any,//是否允许下拉刷新
        textStyle:PropTypes.any,
        style:PropTypes.any,
    }


    static defaultProps = {
        vip: 0,

    }

    static Blue="blue"
    static Yellow="yellow"
    static Gray="Gray"

    render(){
        let {vip,bgImg,textStyle,style}=this.props
        return <View style={[{alignItems:"center", justifyContent:"center"},style]}>
            {/*{this.getImgByNum(vip)}*/}

            <View style={{alignItems:"center", justifyContent:"center"}}>
               {this.renderBg(bgImg)}
            </View>
            <View style={{position:"absolute"}}>
                <Text style={[{fontSize:Size.font14},textStyle]}>{`V${vip}`}</Text>
            </View>
        </View>

    }

    // getImgByNum=(vipLv)=>{
    //     vipLv = parseInt(vipLv) ;
    //     vipLv = vipLv!=null ? vipLv:0;
    //     return (<View style={{flexDirection:"row", alignItems:"flex-end", justifyContent:"center"}}>
    //           <TCImage resizeMode={"contain"} source={ASSET_Other.Other.vip.vipV}/>
    //           <TCImage resizeMode={"contain"}  source={ASSET_Other.Other.vip[`vip${vipLv}`]}/>
    //     </View>)
    // }

    renderBg=(bgString)=>{
        switch (bgString){
            case VipLvView.Blue:
                return <TCImage resizeMode={"contain"}  source={ASSET_Other.Other.vip.blueTimeLine}/>
            case VipLvView.Yellow:
                return <TCImage  resizeMode={"contain"} source={ASSET_Other.Other.vip.yellowTimeLine}/>
            case VipLvView.Gray:
                return <TCImage  resizeMode={"contain"} source={ASSET_Other.Other.vip.greyTimeLine}/>
        }
        return null
    }
}