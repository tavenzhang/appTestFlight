/**
 * 存与其他配置不相关联的全局常量
 **/
import {Platform, Dimensions} from 'react-native'
// 全局Window尺寸
const width = Dimensions.get('window').width
const height = Dimensions.get('window').height
const isIOS = Platform.OS === "ios";

global.IS_IOS = isIOS;
global.SCREEN_W = width;
global.SCREEN_H = height;