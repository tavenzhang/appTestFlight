package com.caipiao.sanliuwu.util;

import android.app.AlertDialog.Builder;
import android.app.Dialog;
import android.content.Context;
import android.content.DialogInterface;
import android.content.DialogInterface.OnClickListener;
import android.content.Intent;
import android.net.Uri;
import android.os.Environment;
import android.os.Handler;
import android.os.Message;
import android.view.LayoutInflater;
import android.view.View;


import com.caipiao.sanliuwu.R;
import com.caipiao.sanliuwu.numberprogressbar.NumberProgressBar;
import com.zhy.http.okhttp.OkHttpUtils;
import com.zhy.http.okhttp.callback.FileCallBack;

import java.io.File;

import okhttp3.Call;

/**
 * @author coolszy
 * @date 2012-4-26
 * @blog http://blog.92coding.com
 */

public class UpdateManager {
    /* 下载中 */
    private static final int DOWNLOAD = 1;
    /* 下载结束 */
    private static final int DOWNLOAD_FINISH = 2;
    /* 下载保存路径 */
    private String mSavePath;
    /* 记录进度条数量 */
    private int progressTip;
    private static final String SAVE_NAME = "cpApp.apk";

    private String url;
    private Context mContext;
    /* 更新进度条 */
    private NumberProgressBar mProgress;
    private Dialog mDownloadDialog;
    private Handler mHandler = new Handler() {
        public void handleMessage(Message msg) {
            switch (msg.what) {
                // 正在下载
                case DOWNLOAD:
                    // 设置进度条位置
                    mProgress.setProgress(progressTip);
                    break;
                case DOWNLOAD_FINISH:
                    // 安装文件
                    installApk();
                    mDownloadDialog.dismiss();
                    break;
                default:
                    break;
            }
        }

        ;
    };

    public UpdateManager(Context context) {
        this.mContext = context;
        String sdpath = Environment.getExternalStorageDirectory() + "/";
        mSavePath = sdpath + "download";
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public void update() {
        showDownloadDialog();
    }

    /**
     * 显示软件下载对话框
     */
    private void showDownloadDialog() {
        // 构造软件下载对话框
        Builder builder = new Builder(mContext);
        // 给下载对话框增加进度条
        final LayoutInflater inflater = LayoutInflater.from(mContext);
        View v = inflater.inflate(R.layout.softupdate_progress, null);
        mProgress = (NumberProgressBar) v.findViewById(R.id.update_progress);
        builder.setView(v);
        // 取消更新
        builder.setNegativeButton(R.string.soft_update_cancel, new OnClickListener() {
            @Override
            public void onClick(DialogInterface dialog, int which) {
                dialog.dismiss();
                // 设置取消状态
                OkHttpUtils.getInstance().cancelTag(UpdateManager.this);
            }
        });
        mDownloadDialog = builder.create();
        mDownloadDialog.show();
        mProgress.setMax(100);
        // 下载文件
        dowloadFile();
    }

    /**
     * 安装APK文件
     */
    private void installApk() {
        File apkfile = new File(mSavePath, SAVE_NAME);
        if (!apkfile.exists()) {
            return;
        }
        // 通过Intent安装APK文件
        Intent i = new Intent(Intent.ACTION_VIEW);
        i.setDataAndType(Uri.parse("file://" + apkfile.toString()), "application/vnd.android.package-archive");
        mContext.startActivity(i);
    }


    private void dowloadFile() {
        File file = new File(mSavePath);
        // 判断文件目录是否存在
        if (file.exists()) {
            file.delete();
        }

        OkHttpUtils.get().url(url).tag(UpdateManager.this).build().execute(new FileCallBack(mSavePath, SAVE_NAME) {
            @Override
            public void onError(Call call, Exception e, int id) {
            }

            @Override
            public void onResponse(File response, int id) {
            }

            @Override
            public void inProgress(float progress, long total, int id) {
                super.inProgress(progress, total, id);
                // 更新进度
                progressTip = (int) (progress * 100);
                mHandler.sendEmptyMessage(DOWNLOAD);
                if (progress >= 1) {
                    // 下载完成
                    mHandler.sendEmptyMessage(DOWNLOAD_FINISH);
                }
            }
        });
    }
}
