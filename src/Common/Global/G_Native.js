import {
    NativeModules
} from 'react-native';

//所有的本地 native 接口聚集到此 方便维护
global.TN_GetPlatInfo = (callBack:func) => {
    if(G_IS_IOS){
        if(NativeModules.JDHelper.getPlatInfo){
            NativeModules.JDHelper.getPlatInfo(callBack);
        }else{
            callBack()
        }
    }else{
        if(NativeModules.JXHelper.getPlatInfo){
            NativeModules.JXHelper.getPlatInfo(callBack);
        }else{
            callBack();
        }
    }
}

global.TN_Notification = (title ="", body={}) => {
    if(G_IS_IOS){
        if(NativeModules.JDHelper.notification){
            NativeModules.JDHelper.notification(title,body)
        }
    }else{
        NativeModules.JXHelper.notification(title,body)
    }
}

global.TN_StartJPush=(Jkey="",channel="")=>{
    if(G_IS_IOS){
        if(NativeModules.JDHelper.startJPush){
            NativeModules.JDHelper.startJPush(Jkey,channel);
        }
    }else{

    }
}

global.TN_StartUMeng=(key="",channel="")=>{
    if(G_IS_IOS){
        if(NativeModules.JDHelper.startUMeng){
            NativeModules.JDHelper.startUMeng(key,channel);
        }
    }else{

    }
}

global.TN_CodePush_ASEET = (callBack:func) => {
    if(G_IS_IOS){
        NativeModules.JDHelper.getCodePushBundleURL(callBack);
    }else{
        NativeModules.JXHelper.getCodePushBundleURL(callBack);
    }
}
global.TN_START_Fabric = (key="4711ad6d815964a1103b461bc1d85ddf312b037d") => {
    if(G_IS_IOS){
        NativeModules.JDHelper&&NativeModules.JDHelper.startFarbic(key);
    }else{
        NativeModules.JDHelper&&NativeModules.JXHelper.startFarbic(key);
    }
}