import {PixelRatio, Dimensions, Platform, StatusBar} from 'react-native'
import {statusBarHeight,height,width,indexBgColor,navbarMarginTop,bottomNavHeight,Size,navbarHight,JX_PLAT_INFO} from "../../Page/resouce/theme";
import rootStore from "../../Data/store/RootStore";

global.JX_Store=rootStore

global.JX_PLAT_INFO = {
    indexBgColor,
    statusBarHeight,
    screenH:height,
    screenW:width,
    Size,
    navbarMarginTop,
    navbarHight,
    bottomNavHeight,
    ...JX_PLAT_INFO
}
