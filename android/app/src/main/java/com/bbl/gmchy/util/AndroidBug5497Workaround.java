package com.bbl.gmchy.util;

import android.app.Activity;
import android.graphics.Rect;
import android.view.View;
import android.view.ViewTreeObserver;
import android.widget.FrameLayout;

/**
 * author: allen.cai
 * created on: 2018/10/5 14:39
 * description:
 */
public class AndroidBug5497Workaround {
    // For more information, see https://issuetracker.google.com/issues/36911528
    // To use this class, simply invoke assistActivity() on an Activity that already has its content view set.
    private static Activity mActivity;
    public static boolean KEYBOARD_SHOW = false;

    public static void assistActivity(Activity activity) {
        mActivity = activity;
        new AndroidBug5497Workaround(activity);
    }

    private View mChildOfContent;
    private int usableHeightPrevious;
    private FrameLayout.LayoutParams frameLayoutParams;

    private AndroidBug5497Workaround(Activity activity) {
        FrameLayout content = (FrameLayout) activity.findViewById(android.R.id.content);
        mChildOfContent = content.getChildAt(0);
        mChildOfContent.getViewTreeObserver().addOnGlobalLayoutListener(new ViewTreeObserver.OnGlobalLayoutListener() {
            public void onGlobalLayout() {
                possiblyResizeChildOfContent();
            }
        });
        frameLayoutParams = (FrameLayout.LayoutParams) mChildOfContent.getLayoutParams();
    }

    private void possiblyResizeChildOfContent() {
        int usableHeightNow = computeUsableHeight();
        if (usableHeightNow != usableHeightPrevious) {
            int usableHeightSansKeyboard = mChildOfContent.getRootView().getHeight();
            int heightDifference = usableHeightSansKeyboard - usableHeightNow;
            if (StatusBarUtils.hasNavigationBar(mActivity)) {
                heightDifference = heightDifference - StatusBarUtils.getNavigationBarHeight(mActivity) - 80;
            }

            if (heightDifference > (usableHeightSansKeyboard / 4)) {
                // keyboard probably just became visible
                KEYBOARD_SHOW = true;
                frameLayoutParams.height = usableHeightSansKeyboard - heightDifference;
            } else {
                // keyboard probably just became hidden
                KEYBOARD_SHOW = false;
                if (OSUtils.isOppo()) {
                    usableHeightSansKeyboard -= 20;
                }
                if (OSUtils.isFlyme()) {
                    usableHeightSansKeyboard += StatusBarUtils.getNavigationBarHeight(mActivity);
                }
                frameLayoutParams.height = usableHeightSansKeyboard;
            }
            mChildOfContent.requestLayout();
            usableHeightPrevious = usableHeightNow;
        }
    }

    private int computeUsableHeight() {
        Rect r = new Rect();
        mChildOfContent.getWindowVisibleDisplayFrame(r);
        return (r.bottom - r.top);
    }
}
