
import {Platform, Dimensions} from 'react-native'
/**
 * 常用的全局常量
 **/
const width = Dimensions.get('window').width
const height = Dimensions.get('window').height
const isIOS = Platform.OS === "ios";

global.IS_IOS = isIOS;
global.SCREEN_W = width;
global.SCREEN_H = height;

