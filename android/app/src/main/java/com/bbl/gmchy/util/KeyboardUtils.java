package com.bbl.gmchy.util;

import android.content.Context;
import android.view.inputmethod.InputMethodManager;

/**
 * author: allen.cai
 * created on: 2018/11/6 10:58
 * description:
 */
public class KeyboardUtils {


    public static void toggleSoftInput(Context context) {
        if (AndroidBug5497Workaround.KEYBOARD_SHOW) {
            InputMethodManager imm = (InputMethodManager) context.getSystemService(Context.INPUT_METHOD_SERVICE);
            imm.toggleSoftInput(0, InputMethodManager.HIDE_NOT_ALWAYS);
        }
    }

}
