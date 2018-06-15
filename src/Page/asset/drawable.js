import {bottomNavHeight, height, indexBgColor, width, JX_PLAT_INFO} from "../resouce/theme";

export const Other = {
    redWallet: require('./other/ic_red_wallet.png'),
    announcement_top: require('./other/announcement_top.png'),
    refreshMoney: require('./other/ic_refresh_money.png'),
    transfer: require('../asset/other/ic_transfer.png'),
}

//常用容器或者组件样式
export const themeViewStyle={
    containTabView:JX_PLAT_INFO.IS_IOS ? {
        height:height-bottomNavHeight,
        width:width,
        backgroundColor: indexBgColor.mainBg
    }:{
        flex:1,
        backgroundColor: indexBgColor.mainBg
    },
    containView:JX_PLAT_INFO.IS_IOS ? {
        height:height-25,
        width:width,
        backgroundColor: indexBgColor.mainBg
    }:{
        flex:1,
        backgroundColor: indexBgColor.mainBg
    },
}