//常用容器或者组件样式
import {indexBgColor} from "../resouce/theme";
import {bottomNavHeight,JX_PLAT_INFO} from '../asset/screen'


export const themeViewStyle = {
    containTabView: JX_PLAT_INFO.IS_IphoneX  ? {
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
}