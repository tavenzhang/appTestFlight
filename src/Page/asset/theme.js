//常用容器或者组件样式
import {indexBgColor, width} from "./game/themeComponet";
import {bottomNavHeight} from '../asset/screen'
import {JX_PLAT_INFO, NavBarHeaderHeight, NavBarHeight, StatusBarHeight} from "./screen";

export const gameUIStyle = {
    subViewContainStye:{
        height:240,
    }
}
export const themeViewStyle = {
    containTabView: JX_PLAT_INFO.IS_IphoneX ? {
        height: SCREEN_H - bottomNavHeight,
        width: SCREEN_W,
        backgroundColor: indexBgColor.mainBg
    } : {
        flex: 1,
        backgroundColor: indexBgColor.mainBg
    },
    containView: JX_PLAT_INFO.IS_IphoneX ? {
        height: SCREEN_H - 25,
        width: SCREEN_W,
        backgroundColor: indexBgColor.mainBg
    } : {
        flex: 1,
        backgroundColor: indexBgColor.mainBg
    },
    navBar: {
        width: width,
        height: NavBarHeight,
        paddingTop: StatusBarHeight,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    navBarHeader: {
        width: width,
        height: NavBarHeaderHeight,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: StatusBarHeight
    },
    navBarLeftItem: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'center',
        height: NavBarHeaderHeight,
    },
    navBarCenterItem: {
        flex: 2,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: NavBarHeaderHeight,
    },
    navBarRightItem: {
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'center',
        height: NavBarHeaderHeight,
    },
}
