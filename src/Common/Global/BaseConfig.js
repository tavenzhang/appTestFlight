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
global.JXCodePushVersion=""
global.TW_IS_DEBIG= __DEV__  ? true:false;
global.TW_Base64=new Base64();
global.TW_OnBackHomeJs=null;

import G_Native from "./G_Native.js";
import  * as animation  from "./G_LayoutAnimaton.js"
import Base64 from "../JXHelper/Base64";