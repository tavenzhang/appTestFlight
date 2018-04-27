package com.jd.openapp;

import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.widget.Toast;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

/**
 * Created by Allen on 2016/12/30.
 */

public class TCOpenOtherAppHelper extends ReactContextBaseJavaModule {
    private Context context;

    public TCOpenOtherAppHelper(ReactApplicationContext reactContext) {
        super(reactContext);
        this.context = reactContext;
    }

    @Override
    public String getName() {
        return "TCOpenOtherAppHelper";
    }


    @ReactMethod
    public void openWeiXin() {
        openApp("com.tencent.mm", "微信");
    }

    @ReactMethod
    public void openQQ() {
        openApp("com.tencent.mobileqq", "QQ");
    }

    @ReactMethod
    public void openAlipay() {
        openApp("com.eg.android.AlipayGphone", "支付宝");
    }

    @ReactMethod
    public void openApp(String appPackage, String appName) {
        try {
            PackageManager packageManager = context.getApplicationContext().getPackageManager();
            Intent intent = packageManager.getLaunchIntentForPackage(appPackage);
            context.startActivity(intent);
        } catch (Exception e) {
            Toast.makeText(context, "请安装" + appName + "应用!", Toast.LENGTH_SHORT).show();
        }
    }
}
