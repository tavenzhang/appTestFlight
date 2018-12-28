import {Platform, Dimensions} from 'react-native'

/**
 * 常用的全局常量
 **/
const width = Dimensions.get('window').width
const height = Dimensions.get('window').height
const isIOS = Platform.OS === "ios";

global.G_IS_IOS = isIOS;
global.SCREEN_W = width;
global.SCREEN_H = height;
global.TCLineW = (isIOS && width > 375) ? 0.33 : 0.5;
global.JXCodePushServerUrl ="";
global.TW_IS_DEBIG= __DEV__  ? true:false