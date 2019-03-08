package com.bbl.cgmx.util;

import android.content.Context;
import android.content.pm.ApplicationInfo;
import android.content.pm.PackageManager;
import android.os.Bundle;
import android.os.Environment;
import android.support.annotation.NonNull;
import android.text.TextUtils;
import android.util.Log;

import java.io.File;

/**
 * Created by Mason at 03/07/2018
 */
public class AppUtil {

    public static final String JX_PATH = Environment.getExternalStorageDirectory().getAbsolutePath() + "/JXCP";
    public static final String JX_AFF_PATH = JX_PATH + "/aff";

    /**
     * 获取应用指定MetaData数据
     */
    public static String getAppMetaDataString(@NonNull Context context, String key) {
        String value = null;
        try {
            ApplicationInfo applicationInfo = context.getPackageManager()
                    .getApplicationInfo(context.getPackageName(), PackageManager.GET_META_DATA);
            Bundle bundle = applicationInfo.metaData;
            Object obj = bundle.get(key);
            value = String.valueOf(obj);
        } catch (PackageManager.NameNotFoundException e) {
            Log.d("AppUtil", "Failed to load meta-data, NameNotFound: " + e.getMessage());
        } catch (NullPointerException e) {
            Log.d("AppUtil", "Failed to load meta-data, NullPointer: " + e.getMessage());
        }

        return value != null ? value : "";
    }

    /**
     * 获取应用ApplicationId
     */
    private static String getApplicationId(@NonNull Context context) {
        return context.getPackageName();
    }

    /**
     * 更新本地缓存邀请码
     */
    public static void updateLocalAFFCode(@NonNull Context context) {
        String applicationId = getApplicationId(context);
        String metaData = getAppMetaDataString(context, "TD_CHANNEL_AFFCODE");
        if (!TextUtils.isEmpty(metaData)) {
            String filePath = JX_AFF_PATH + File.separator + applicationId;
            FileUtil.deleteFile(new File(filePath));
            FileUtil.writeStringToFile(metaData, filePath);
        }
    }

    /**
     * 从本地缓存获取邀请码
     */
    public static String getAFFCode(@NonNull Context context) {
        String applicationId = getApplicationId(context);
        String filePath = JX_AFF_PATH + File.separator + applicationId;
        String affCode = FileUtil.readFileToString(filePath);
        return affCode;
    }


}
