/**
 * Created by allen-jx on 2018/3/28.
 */
import Toast from 'react-native-toast-native'
import {Platform} from "react-native"
import {baseColor, Size} from "../../Page/resouce/theme"
const style = Platform.OS === "ios" ? {
    backgroundColor: baseColor.black,
    height: 50,
    color: "#ffffff",
    borderRadius: 15,
} : {
    height: 120,
    fontWeight: "bold",
    fontSize: Size.font14,
    paddingLeft: 5,
    paddingRight: 5
};
/**
 *
 */
export default class JDToast {

    static showShortCenter(message) {
        Toast.show(message, Toast.SHORT, Toast.CENTER, style);
    }

    static showShortTop(message) {
        Toast.show(message, Toast.SHORT, Toast.TOP, style);
    }

    static showLongCenter(message) {
        Toast.show(message, Toast.LONG, Toast.CENTER, style);
    }

    static showShortBottom(message) {
        Toast.show(message, Toast.SHORT, Toast.BOTTOM, style);
    }

    static showLongBottom(message) {
        Toast.show(message, Toast.LONG, Toast.BOTTOM, style);
    }
}
