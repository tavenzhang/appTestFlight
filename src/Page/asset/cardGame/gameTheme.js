import {width} from "../../resouce/theme";

export const gameTheme={
    tabBg:'#231e58', //导航下方 tabbar背景, 单独抽离方便替换
}

export const gameImgTextStyle={
    contain:{
        position:"absolute",
        bottom:14,
        width:(width-40)/3,
        alignItems:"center"
    },
    textStyle:{
        color:"white" ,
        fontSize: 16,
        fontWeight:"bold"
    }
}