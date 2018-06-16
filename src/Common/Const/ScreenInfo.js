/**
 * 通用的屏幕常量
 **/

import {
    StatusBar
} from 'react-native'
import {height, width} from "../../Page/resouce/theme";

// iPhoneX
const X_WIDTH = 375;
const X_HEIGHT = 812;
const JX_IPHON_X = IS_IOS &&
    ((height === X_HEIGHT && width === X_WIDTH) ||
        (height === X_WIDTH && width === X_HEIGHT));

export function isIphoneX() {
    return JX_IPHON_X
}

export const JX_PLAT_INFO = {
    MarginBarHeight: IS_IOS? (JX_IPHON_X ? 45 : 20) : 0,
    IS_IphoneX: JX_IPHON_X
}

//手机状态栏高度
export const statusBarHeight = IS_IOS ? (isIphoneX() ? 44 : 20) : StatusBar.currentHeight

export const navbarHight = IS_IOS? (isIphoneX() ? 88 : 64) : 44

export const navbarMarginTop = IS_IOS ? (isIphoneX() ? 44 : 20) : 0

export const bottomNavHeight = IS_IOS? (isIphoneX() ? 83 : 50) : 49