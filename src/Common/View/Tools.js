import {
    NativeModules,
} from 'react-native'

export default class Tools {
    saveScreenshot() {
        if (!G_IS_IOS) {
            NativeModules.TCOpenOtherAppHelper.screenShotSave();
        }else{

        }
    }

   static onSaveScreenPhone=()=>{
        if (!G_IS_IOS) {
            NativeModules.TCOpenOtherAppHelper.screenShotSave();
        }else{
            NativeModules.JDHelper.screenShotSave();
        }
    }
}