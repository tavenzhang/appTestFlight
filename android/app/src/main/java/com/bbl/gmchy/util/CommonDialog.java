package com.bbl.gmchy.util;

import android.app.Dialog;
import android.content.Context;
import android.support.annotation.NonNull;
import android.support.annotation.StyleRes;
import android.view.Gravity;
import android.view.View;
import android.view.Window;
import android.widget.Button;
import android.widget.TextView;

import com.bbl.gmchy.R;

/**
 * Created by mason on 2018/9/19.
 */
public class CommonDialog extends Dialog {

    private TextView mTvTitle; // 文本提示控件

    private Button mBtnNegative, mBtnPositive; // 左、中、右按钮控件

    public CommonDialog(@NonNull Context context) {
        this(context, 0);
    }

    public CommonDialog(@NonNull Context context, @StyleRes int themeResId) {
        super(context, themeResId == 0 ? R.style.DefaultDialogStyle : themeResId);

        final Window window = getWindow();
        window.setGravity(Gravity.CENTER);
        setCancelable(true);
        setCanceledOnTouchOutside(true);

        View rootView = View.inflate(context, R.layout.dialog_common_layout, null);
        mTvTitle = (TextView) rootView.findViewById(R.id.tv_dialog_title);
        mBtnNegative = (Button) rootView.findViewById(R.id.btn_negative);
        mBtnPositive = (Button) rootView.findViewById(R.id.btn_positive);

        setContentView(rootView);
    }

    /**
     * 设置标题
     */
    public void setDialogTitle(String title) {
        mTvTitle.setText(title);
    }

    /**
     * 设置左侧按钮点击事件
     *
     * @param negative 按钮文本
     * @param listener 点击事件
     */
    public void setNegativeBtn(String negative, @NonNull View.OnClickListener listener) {
        mBtnNegative.setText(negative);
        mBtnNegative.setOnClickListener(listener);
    }

    /**
     * 设置右侧按钮点击事件
     *
     * @param positive 按钮文本
     * @param listener 点击事件
     */
    public void setPositiveBtn(String positive, @NonNull View.OnClickListener listener) {
        mBtnPositive.setText(positive);
        mBtnPositive.setOnClickListener(listener);
    }
}
