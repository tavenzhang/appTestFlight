import {
    NativeModules,
    Linking,
    Platform
} from 'react-native'

import Toast from '@remobile/react-native-toast';
/**
 * 打开用户支付App
 */
export default class TCUserOpenPayApp {

    WEICHAT_PACKAGE = "com.tencent.mm"
    QQ_PACKAGE = "com.tencent.mobileqq"
    ALIPAY_PACKAGE = "com.eg.android.AlipayGphone"
    JD_PACKAGE = "com.jingdong.app.mall"

    /**
     * 打开微信
     */
    openWeChat() {
        // NativeModules.TCOpenOtherAppHelper.openApp("com.tencent.mm", "微信");
        NativeModules.TCOpenOtherAppHelper.openWeiXin()
    }

    /**
     * 打开QQ
     */
    openQQ() {
        if (Platform.OS === 'ios') {
            this.linkingApp('mqq://', 'QQ')
        } else {
            try {
                NativeModules.TCOpenOtherAppHelper.openApp(this.QQ_PACKAGE, "QQ")
            } catch (e) {
                Toast.showShortCenter('暂时不支持打开QQ,请手动打开')
            }
        }
    }

    /**
     * 打开京东
     */
    openJD() {
        this.linkingApp("openApp.jdMobile://", "京东")
    }

    /**
     * 打开支付宝
     */
    openAlipay() {
        NativeModules.TCOpenOtherAppHelper.openAlipay();
    }

    linkingApp(url, payType) {
        Linking.openURL(url).catch(err => {
            Toast.showShortCenter('请您先安装' + payType + '应用！')
        })
    }
}
