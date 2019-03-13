import { NativeModules } from 'react-native';

//所有的本地 native 接口聚集到此 方便维护
global.TN_GetPlatInfo = (callBack: func) => {
    if (G_IS_IOS) {
        if (NativeModules.JDHelper.getPlatInfo) {
            NativeModules.JDHelper.getPlatInfo(callBack);
        } else {
            callBack();
        }
    } else {
        if (NativeModules.JXHelper.getPlatInfo) {
            NativeModules.JXHelper.getPlatInfo(callBack);
        } else {
            callBack();
        }
    }
};

global.TN_Notification = (title = '', body = {}) => {
    if (G_IS_IOS) {
        if (NativeModules.JDHelper.notification) {
            NativeModules.JDHelper.notification(title, body);
        }
    } else {
        NativeModules.JXHelper.notification(title, body);
    }
};

global.TN_StartJPush = (Jkey = '', channel = '') => {
    if (G_IS_IOS) {
        if (NativeModules.JDHelper.startJPush) {
            NativeModules.JDHelper.startJPush(Jkey, channel);
        }
    } else {
    }
};

global.TN_StartUMeng = (key = '', channel = '') => {
    if (G_IS_IOS) {
        if (NativeModules.JDHelper.startUMeng) {
            NativeModules.JDHelper.startUMeng(key, channel);
        }
    } else {
    }
};

global.TN_CodePush_ASEET = (callBack: func) => {
    if (G_IS_IOS) {
        NativeModules.JDHelper.getCodePushBundleURL(callBack);
    } else {
        NativeModules.JXHelper.getCodePushBundleURL(callBack);
    }
};

global.TN_START_Fabric = (key = '4711ad6d815964a1103b461bc1d85ddf312b037d') => {
    if (G_IS_IOS) {
        NativeModules.JDHelper.startFarbic && NativeModules.JDHelper.startFarbic(key);
    } else {
        NativeModules.JXHelper.startFarbic && NativeModules.JXHelper.startFarbic(key);
    }
};

global.TN_START_SHARE = (
    appId = 'wx4705de7e82fa978f',
    api = '67de54808bba55e934e3126f3e607a42'
) => {
    if (G_IS_IOS) {
        NativeModules.JDHelper.startUMengShare &&
            NativeModules.JDHelper.startUMengShare(appId, api);
    } else {
        NativeModules.JXHelper.startUMengShare &&
            NativeModules.JXHelper.startUMengShare(appId, api);
    }
};

global.TN_START_SHARE = (
    appId = 'wx4705de7e82fa978f',
    api = '67de54808bba55e934e3126f3e607a42'
) => {
    if (G_IS_IOS) {
        NativeModules.JDHelper.startUMengShare &&
            NativeModules.JDHelper.startUMengShare(appId, api);
    } else {
        NativeModules.JXHelper.startUMengShare &&
            NativeModules.JXHelper.startUMengShare(appId, api);
    }
};

global.TN_IsWechatEnabled = (callBack: func) => {
    NativeModules.UMShareModule.isWechatEnabled(callBack);
};

global.TN_WechatShare = (text, image, url, title, isPyq) => {
    NativeModules.UMShareModule.share(text, image, url, title, isPyq? 3:2, (code, message) => {});
};

global.TN_UMShareModule = NativeModules.UMShareModule;
