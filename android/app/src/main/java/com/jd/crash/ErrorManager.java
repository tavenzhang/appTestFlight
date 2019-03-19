package com.jd.crash;

import android.os.Environment;
import android.text.TextUtils;


import com.jd.MainApplication;
import com.jd.util.FileUtil;
import com.umeng.analytics.MobclickAgent;

import java.io.File;

/**
 * Created by jason on 2017/8/19.
 */

public class ErrorManager {
    private static ErrorManager instance;

    private static final String TAG = ErrorManager.class.getSimpleName();
    private static final String ERROR_PATH = MainApplication.getInstance().getFilesDir().getAbsolutePath()+"/error/error.txt";
    private static final String ERROR_BACK_UP_PATH = Environment.getExternalStorageDirectory().getAbsolutePath() + "/error_log/error332132.txt";

    private ErrorManager() {

    }

    public static ErrorManager getInstance() {
        if (instance == null) {
            instance = new ErrorManager();
        }
        return instance;
    }

    public void checkAndUpdateErrorLogIfNeed() {
        new Thread(new Runnable() {
            @Override
            public void run() {

                File file = new File(ERROR_PATH);
                if (file.exists()) {
                    updateAndDeleteErrorFile(file);
                    return;
                }

                File externalFile=new File(ERROR_BACK_UP_PATH);
                if(externalFile.exists()){
                    updateAndDeleteErrorFile(externalFile);
                }
            }
        }).start();

    }

    private void updateAndDeleteErrorFile(File file) {
        String error = FileUtil.readFileToString(file.getAbsolutePath());
        if (TextUtils.isEmpty(error)) {
            return;
        }
        MobclickAgent.reportError(MainApplication.getInstance(), error);
        FileUtil.deleteFile(file);
    }

    public boolean writeErrorFile(String error) {
        boolean result=FileUtil.writeStringToFile(error, ERROR_PATH);
        return result || FileUtil.writeStringToFile(error,ERROR_BACK_UP_PATH);
    }


}
