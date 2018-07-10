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

/**
 * 导航栏按钮下拉框距离顶部位置
 */
export const NavBarModalTop = IS_IOS ? NavBarHeight : NavBarHeaderHeight

export const bottomNavHeight = IS_IOS ? (JX_IPHON_X  ? 83 : 50) : 49

/**
 * 屏幕占比
 */
export const ScreenRatio = SCREEN_H / SCREEN_W

export const JX_PLAT_INFO = {
    MarginBarHeight: StatusBarHeight,
    IS_IphoneX: JX_IPHON_X,
    SCREEN_W,
    SCREEN_H,
    TCLineW,
    IS_IOS
}
