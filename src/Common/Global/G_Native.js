import {
    NativeModules
} from 'react-native';
//所有的本地 native 接口聚集到此 方便维护

global.TN_Notification = (title ="", body={}) => {
    if(G_IS_IOS){
        if(NativeModules.JDHelper.notification){
            NativeModules.JDHelper.notification(title,body)
        }
    }else{

    }
}
