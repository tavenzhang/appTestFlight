package com.jd.crash;

import android.app.AlertDialog;
import android.content.Context;
import android.os.Bundle;
import android.support.annotation.StyleRes;
import android.text.TextUtils;
import android.view.View;
import android.widget.TextView;

import com.jd.R;


/**
 * Created by jason on 2017/8/9.
 */

public class NoticeDialog extends AlertDialog implements View.OnClickListener{

    private static final String TAG=NoticeDialog.class.getSimpleName();

    private OnNoticeDialogClickListener mClickListenenr;
    private TextView mContentTv;
    private String mContent;
    public NoticeDialog(Context context) {
        this(context,0);
    }

    public NoticeDialog(Context context, @StyleRes int themeResId) {
        super(context, R.style.NoticeDialog);
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.notice_dialog);
        initView();
    }

    private void initView(){
        findViewById(R.id.notice_dialog_confirm_tv).setOnClickListener(this);
        mContentTv= (TextView) findViewById(R.id.notice_dialog_content_tv);
        if(!TextUtils.isEmpty(mContent)){
            mContentTv.setText(mContent);
        }
    }

    @Override
    public void onClick(View v) {
        switch (v.getId()){
            case R.id.notice_dialog_confirm_tv:
                if(null!=mClickListenenr){
                    mClickListenenr.onConfirmClick();
                }
                break;
        }
    }

    public void setClickListener(OnNoticeDialogClickListener clickListenenr) {
        this.mClickListenenr = clickListenenr;
    }

    public interface OnNoticeDialogClickListener{
        void onConfirmClick();
    }

    public void show(String content) {
        this.mContent=content;
        if(null!=mContentTv){
            mContentTv.setText(content);
        }
        super.show();
    }
}
