import {bottomNavHeight, indexBgColor,} from "../resouce/theme";

export const Other = {
    redWallet: require('./other/ic_red_wallet.png'),
    announcement_top: require('./other/announcement_top.png'),
    refreshMoney: require('./other/ic_refresh_money.png'),
    transfer: require('./other/ic_transfer.png'),
    caiPiao: require('./other/icon_caipiao.png'),
}

//常用容器或者组件样式
export const themeViewStyle = {
    containTabView: IS_IOS ? {
        height: SCREEN_H - bottomNavHeight,
        width: SCREEN_W,
        backgroundColor: indexBgColor.mainBg
    } : {
        flex: 1,
        backgroundColor: indexBgColor.mainBg
    },
    containView: IS_IOS ? {
        height: SCREEN_H - 25,
        width: SCREEN_W,
        backgroundColor: indexBgColor.mainBg
    } : {
        flex: 1,
        backgroundColor: indexBgColor.mainBg
    },
}