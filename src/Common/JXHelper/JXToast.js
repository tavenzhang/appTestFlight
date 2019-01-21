/**
 * Created by allen-jx on 2018/3/28.
 */
import Toast from 'react-native-root-toast'
import {Platform} from "react-native"
import {baseColor, Size} from "../../Page/asset/game/themeComponet"

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
        Toast.show(message, {
            duration: Toast.durations.SHORT,
            position: Toast.positions.CENTER,
            shadow: true,
            animation: true,
            hideOnPress: true,
            delay: 0
        });
    }

    static showShortTop(message) {
        Toast.show(message, {
            duration: Toast.durations.SHORT,
            position: Toast.positions.TOP,
            shadow: true,
            animation: true,
            hideOnPress: true,
            delay: 0
        });
    }

    static showLongCenter(message) {
        Toast.show(message, {
            duration: Toast.durations.LONG,
            position: Toast.positions.CENTER,
            shadow: true,
            animation: true,
            hideOnPress: true,
            delay: 0
        });
    }

    static showShortBottom(message) {
        Toast.show(message, {
            duration: Toast.durations.SHORT,
            position: Toast.positions.BOTTOM,
            shadow: true,
            animation: true,
            hideOnPress: true,
            delay: 0
        });
    }

    static showLongBottom(message) {
        Toast.show(message, {
            duration: Toast.durations.LONG,
            position: Toast.positions.BOTTOM,
            shadow: true,
            animation: true,
            hideOnPress: true,
            delay: 0
        });
    }
}
