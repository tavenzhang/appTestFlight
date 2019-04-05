package com.jd.jxhelper;

import android.Manifest;
import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.content.pm.ApplicationInfo;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.support.v4.content.ContextCompat;
import android.telephony.TelephonyManager;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.JSApplicationIllegalArgumentException;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.jd.MainActivity;
import com.jd.util.AppUtil;
import com.jd.util.UpdateManager;
import com.jd.webview.JXGameWebView;
import com.jd.webview.JXWebView;

import org.json.JSONObject;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;
import com.microsoft.codepush.react.CodePush;
import cn.jpush.android.api.JPushInterface;
import cn.jpush.android.data.JPushLocalNotification;


public class JXHelper extends ReactContextBaseJavaModule {
    private static final String KEY_UUID = "uuid";
    private static final String KEY_RANDOM_UUID = "random_uuid";
    Context context;
    SharedPreferences pref;
    SharedPreferences.Editor editor;

    public JXHelper(ReactApplicationContext reactContext) {
        super(reactContext);
        this.context = reactContext;
    }

    @Override
    public String getName() {
        return "JXHelper";
    }


    @ReactMethod
    public void getPlatInfo(Callback resultCallback) {
        String  idStr =  MainActivity.instance.readMetaDataByTag("PLAT_ID");
        String  channel = MainActivity.instance.readMetaDataByTag("PLAT_CH");
        String  subType = MainActivity.instance.readMetaDataByTag("SUB_TYPE");
        JSONObject obj= new JSONObject();
        try {
            obj.put("PlatId",idStr);
            obj.put("Channel",channel);
            obj.put("Affcode",getAffCode());
            obj.put("SubType",subType);
            String ret= obj.toString();
            resultCallback.invoke(ret);
        }
        catch (Exception e){
            e.printStackTrace();
            resultCallback.invoke("error");
        }
    }

    @ReactMethod
    public void getCodePushBundleURL(Callback resultCallback) {
        resultCallback.invoke(CodePush.getJSBundleFile());
    }

    @ReactMethod
    public void notification(String title, String content) {
        JPushLocalNotification ln = new JPushLocalNotification();
        ln.setBuilderId(0);
        ln.setContent(content);
        ln.setTitle(title);
        ln.setNotificationId(System.currentTimeMillis()) ;
        ln.setBroadcastTime(System.currentTimeMillis() + 1000*1);
        Map<String , Object> map = new HashMap<String, Object>() ;
        map.put("name", "thomas") ;
        map.put("data", "test") ;
        JSONObject json = new JSONObject(map) ;
        ln.setExtras(json.toString()) ;
       // JPushInterface.addLocalNotification(MainActivity.mainContent, ln);
        JPushInterface.addLocalNotification(this.context, ln);
    }

//    @ReactMethod
//    public void getCFUUID(Callback resultCallback) {
//        TelephonyManager TelephonyMgr = (TelephonyManager) context.getSystemService(Context.TELEPHONY_SERVICE);
//      //  String szImei = TelephonyMgr.getDeviceId();
//        String res = null;
////        try {
////            res = UUID.nameUUIDFromBytes(szImei.getBytes("utf8")).toString();
////        } catch (Exception e) {
////        }
////        if (res == null) {
////            res = UUID.randomUUID().toString();
////        }
//        res = UUID.randomUUID().toString();
//        resultCallback.invoke("deviceId", res);
//    }

    @ReactMethod
    public void getCFUUID(Callback resultCallback) {
        resultCallback.invoke("deviceId", getCFUUID());
    }

    public String getCFUUID() {
        String storedUuid = pref.getString(KEY_UUID, null);
        String storedRandomUuid = pref.getString(KEY_RANDOM_UUID, null);
        String randomUuid = UUID.randomUUID().toString();
        boolean isGranted = ContextCompat.checkSelfPermission(context, Manifest.permission.READ_PHONE_STATE) == PackageManager.PERMISSION_GRANTED;

        if (storedUuid != null && storedUuid != "") {
            return storedUuid;
        } else {
            if (isGranted) {
                TelephonyManager TelephonyMgr = (TelephonyManager) context.getSystemService(Context.TELEPHONY_SERVICE);
                String szImei = TelephonyMgr.getDeviceId();
                String res = null;
                try {
                    res = UUID.nameUUIDFromBytes(szImei.getBytes("utf8")).toString();
                } catch (Exception e) {
                }
                if (res == null) {
                    res = randomUuid;
                }

                editor.putString(KEY_UUID, res);
                editor.commit();
                return res;
            } else {
                if (storedRandomUuid != null && storedRandomUuid != "") {
                    return storedRandomUuid;
                } else {
                    editor.putString(KEY_RANDOM_UUID, randomUuid);
                    editor.commit();
                    return randomUuid;
                }
            }
        }
    }

    @ReactMethod
    public void getVersionCode(Callback resultCallback) {
        String versionName = getPackageInfo(context).versionName;
        if (versionName != null && versionName != "") {
            resultCallback.invoke(versionName);
        }
    }

    @ReactMethod
    public void getAffCode(Callback resultCallback) {
        String affCode = AppUtil.getAFFCode(context);
        if (null == affCode) affCode = "";
        resultCallback.invoke(affCode);
    }

    @ReactMethod
    public void isAndroidRootDevice(Callback resultCallback) {
        try {
//            boolean result = RootUtil.isDeviceRooted();
//            resultCallback.invoke(result);
        } catch (Exception e) {

        }
    }

    private static PackageInfo getPackageInfo(Context context) {
        PackageInfo pi = null;

        try {
            PackageManager pm = context.getPackageManager();
            pi = pm.getPackageInfo(context.getPackageName(),
                    PackageManager.GET_CONFIGURATIONS);

            return pi;
        } catch (Exception e) {
            e.printStackTrace();
        }

        return pi;
    }

    @ReactMethod
    public void updateApp(String url) {
        UpdateManager updateManager = new UpdateManager(getCurrentActivity());
        updateManager.setUrl(url);
        updateManager.update();
    }

    @ReactMethod
    public void getAppName(Callback callback) {
        PackageManager packageManager = null;
        ApplicationInfo applicationInfo = null;
        try {
            packageManager = context.getPackageManager();
            applicationInfo = packageManager.getApplicationInfo(context.getPackageName(), 0);
        } catch (PackageManager.NameNotFoundException e) {
            applicationInfo = null;
        }
        String applicationName = (String) packageManager.getApplicationLabel(applicationInfo);
        callback.invoke(applicationName);
    }


    @ReactMethod
    public void openWebViewFromJs(String url) {
        try {
            Activity currentActivity = getCurrentActivity();
            Intent intent = new Intent(currentActivity, JXWebView.class);
            intent.putExtra("url", url);
            currentActivity.startActivity(intent);
        } catch (Exception e) {
            throw new JSApplicationIllegalArgumentException(
                    "不能打开Activity : " + e.getMessage());
        }
    }

    @ReactMethod
    public void openGameWebViewFromJs(String url, String title, String platform) {
        try {
            Activity currentActivity = getCurrentActivity();
            Intent intent = new Intent(currentActivity, JXGameWebView.class);
            intent.putExtra("url", url);
            intent.putExtra("title", title);
            intent.putExtra("platform", platform);
            currentActivity.startActivity(intent);
        } catch (Exception e) {
            throw new JSApplicationIllegalArgumentException(
                    "不能打开Activity : " + e.getMessage());
        }
    }

    @ReactMethod
    public void getCanShowIntelligenceBet(Callback resultCallback) {
        try {
            resultCallback.invoke(true);
        } catch (Exception e) {

        }
    }

    @ReactMethod
    public void getAppInfo(Callback callback){
        WritableMap map = Arguments.createMap();
        String applicationId = getReactApplicationContext().getPackageName();
        String  idStr =  MainActivity.instance.readMetaDataByTag("PLAT_ID");
        String  channel = MainActivity.instance.readMetaDataByTag("PLAT_CH");
        String  subType = MainActivity.instance.readMetaDataByTag("SUB_TYPE");
        String  appDownloadVersion = MainActivity.instance.readMetaDataByTag("APP_DOWNLOAD_VERSION");
        String  openInstallKey = MainActivity.instance.readMetaDataByTag("com.openinstall.APP_KEY");
        map.putString("versionName",getVersionCode());
        map.putString("Affcode",getAffCode());
        map.putString("applicationId",applicationId);
        map.putString("APP_DOWNLOAD_VERSION",appDownloadVersion);
        map.putString("PLAT_ID",idStr);
        map.putString("PLAT_CH",channel);
        map.putString("SUB_TYPE",subType);
        map.putString("com.openinstall.APP_KEY",openInstallKey);
        callback.invoke(map);
    }
    public String getAffCode() {
        return  MainActivity.instance.readMetaDataByTag("TD_CHANNEL_AFFCODE");
    }
    public String getVersionCode() {
        return getPackageInfo(context).versionName;
    }
}
