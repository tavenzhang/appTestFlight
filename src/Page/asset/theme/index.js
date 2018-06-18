//常用容器或者组件样式
import {indexBgColor} from "../../resouce/theme";
import {bottomNavHeight} from '../../asset/screen'

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