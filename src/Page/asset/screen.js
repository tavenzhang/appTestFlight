import {StatusBar, Platform} from 'react-native'

// iPhoneX
const X_WIDTH = 375;
const X_HEIGHT = 812;
const JX_IPHON_X = IS_IOS &&
    ((SCREEN_H === X_HEIGHT && SCREEN_W === X_WIDTH) ||
        (SCREEN_H === X_WIDTH && SCREEN_W === X_HEIGHT));





/**
 * 手机状态栏高度
 * for ios:     iPhoneX is 44, other is 20
 * for android: version less than 21 is 0
 */
export const StatusBarHeight = IS_IOS ? (JX_IPHON_X ? 44 : 20) : (Platform.Version >= 21 ? StatusBar.currentHeight : 0)

/**
 * 导航Header高度
 */
export const NavBarHeaderHeight = 44

/**
 * 导航Header高度（加上状态栏）
 */
export const NavBarHeight = StatusBarHeight + NavBarHeaderHeight

//手机状态栏高度
export const statusBarHeight = IS_IOS ? (JX_PLAT_INFO.IS_IphoneX ? 44 : 20) : StatusBar.currentHeight

export const navBarHeaderHeight = IS_IOS ? (JX_PLAT_INFO.IS_IphoneX  ? 88 : 64) : 44

export const navbarHight = IS_IOS ? navBarHeaderHeight : navBarHeaderHeight + statusBarHeight

export const navbarMarginTop = IS_IOS ? (JX_PLAT_INFO.IS_IphoneX  ? 44 : 20) : 0

export const bottomNavHeight = IS_IOS ? (JX_PLAT_INFO.IS_IphoneX  ? 83 : 50) : 49

export const JX_PLAT_INFO = {
    MarginBarHeight: StatusBarHeight,
    IS_IphoneX: JX_IPHON_X,
    SCREEN_W,
    SCREEN_H,
    TCLineW,
    IS_IOS
}
