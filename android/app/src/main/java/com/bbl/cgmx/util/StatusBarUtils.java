package com.bbl.cgmx.util;

import android.annotation.TargetApi;
import android.app.Activity;
import android.content.res.Resources;
import android.graphics.Color;
import android.os.Build;
import android.provider.Settings;
import android.support.annotation.NonNull;
import android.util.DisplayMetrics;
import android.util.Log;
import android.view.Display;
import android.view.View;
import android.view.ViewGroup;
import android.view.Window;
import android.view.WindowManager;

public class StatusBarUtils {

    /**
     * 设置页面最外层布局 FitsSystemWindows 属性
     *
     * @param activity
     * @param value
     */
    public static void setFitsSystemWindows(Activity activity, boolean value) {
        ViewGroup contentFrameLayout = (ViewGroup) activity.findViewById(android.R.id.content);
        View parentView = contentFrameLayout.getChildAt(0);
        if (parentView != null && Build.VERSION.SDK_INT >= 16) {
            parentView.setFitsSystemWindows(value);
        }
    }

    @TargetApi(Build.VERSION_CODES.LOLLIPOP)
    public static void translucentStatusBar(Activity activity) {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
            Window window = activity.getWindow();
            window.clearFlags(WindowManager.LayoutParams.FLAG_TRANSLUCENT_STATUS
                    | WindowManager.LayoutParams.FLAG_TRANSLUCENT_NAVIGATION);
            int uiOptions = View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN
                    | View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION
                    | View.SYSTEM_UI_FLAG_LAYOUT_STABLE;
            window.getDecorView().setSystemUiVisibility(uiOptions);
            window.addFlags(WindowManager.LayoutParams.FLAG_DRAWS_SYSTEM_BAR_BACKGROUNDS);
            window.setStatusBarColor(Color.TRANSPARENT);
            window.setNavigationBarColor(Color.BLACK);
        }
        int navigationBarHeight = getNavigationBarHeight(activity);
        Log.e("nav", "navHeight:" + navigationBarHeight);
        if (navigationBarHeight > 0) {
            ViewGroup contentLayout = (ViewGroup) activity.findViewById(android.R.id.content);
            View parentView = contentLayout.getChildAt(0);
            if (parentView != null) {
                parentView.setPadding(0, 0, 0, navigationBarHeight);
            }
        }
    }

    @TargetApi(Build.VERSION_CODES.LOLLIPOP)
    public static void adjustWebGameBar(Activity activity) {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
            Window window = activity.getWindow();
            window.clearFlags(WindowManager.LayoutParams.FLAG_TRANSLUCENT_STATUS
                    | WindowManager.LayoutParams.FLAG_TRANSLUCENT_NAVIGATION);
            int uiOptions = View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN
                    | View.SYSTEM_UI_FLAG_HIDE_NAVIGATION
                    | View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY;
            window.getDecorView().setSystemUiVisibility(uiOptions);
            window.addFlags(WindowManager.LayoutParams.FLAG_DRAWS_SYSTEM_BAR_BACKGROUNDS);
            window.setStatusBarColor(Color.TRANSPARENT);
            window.setNavigationBarColor(Color.TRANSPARENT);
        }
    }

    public static int getNavigationBarHeight(@NonNull Activity activity) {

        if (hasNavigationBar(activity)) {
            return getInternalDimensionSize(activity.getResources());
        }
        return 0;
    }

    public static boolean hasNavigationBar(@NonNull Activity activity) {
        Display display = activity.getWindowManager().getDefaultDisplay();
        DisplayMetrics realMetrics = new DisplayMetrics();
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.JELLY_BEAN_MR1) {
            display.getRealMetrics(realMetrics);
        }
        int realHeight = realMetrics.heightPixels;
        int realWidth = realMetrics.widthPixels;

        DisplayMetrics displayMetrics = new DisplayMetrics();
        display.getMetrics(displayMetrics);

        int displayHeight = displayMetrics.heightPixels;
        int displayWidth = displayMetrics.widthPixels;

        if (OSUtils.isMiui()) {
            Log.e("nav", "vheight:" + getInternalDimensionSize(activity.getResources()));
            if (Settings.Global.getInt(activity.getContentResolver(), "force_fsg_nav_bar", 0) != 0) {
                //开启手势，不显示虚拟键
                return false;
            }
        }
        if (OSUtils.isFlyme()) {
            return true;
        }

        return (realWidth - displayWidth) > 0 || (realHeight - displayHeight) > 0;
    }

    private static int getInternalDimensionSize(Resources resources) {
        int resourceId = resources.getIdentifier("navigation_bar_height", "dimen", "android");
        return resources.getDimensionPixelSize(resourceId);
    }
}
