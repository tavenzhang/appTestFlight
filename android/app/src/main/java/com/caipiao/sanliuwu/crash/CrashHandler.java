package com.caipiao.sanliuwu.crash;

import android.content.Context;
import android.os.Looper;
import android.util.Log;
import android.view.WindowManager;


/**
 * Created by jason on 2017/8/8.
 */

public class CrashHandler implements Thread.UncaughtExceptionHandler, NoticeDialog.OnNoticeDialogClickListener {

    private static final String TAG = CrashHandler.class.getSimpleName();
    private static final String CRASH_NOTICE = "APP运行异常，请退出重试。";

    /**
     * CrashHandler 实例
     */
    private static CrashHandler INSTANCE = new CrashHandler();

    private NoticeDialog mNoticeDialog;

    private Context mContext;

    /**
     * 系统默认的 UncaughtException 处理类
     */
    private Thread.UncaughtExceptionHandler mDefaultHandler;

    /**
     * 保证只有一个 CrashHandler 实例
     */
    private CrashHandler() {
    }

    /**
     * 获取 CrashHandler 实例 ,单例模式
     */
    public static CrashHandler getInstance() {
        return INSTANCE;
    }

    /**
     * 初始化
     *
     * @param context
     */
    public void init(Context context) {
        mContext = context;

        // 获取系统默认的 UncaughtException 处理器
        mDefaultHandler = Thread.getDefaultUncaughtExceptionHandler();

        // 设置该 CrashHandler 为程序的默认处理器
        Thread.setDefaultUncaughtExceptionHandler(this);
        Log.d("TEST", "Crash:init");
    }

    /**
     * 当 UncaughtException 发生时会转入该函数来处理
     */
    @Override
    public void uncaughtException(Thread thread, Throwable ex) {
        ErrorManager.getInstance().writeErrorFile(ex.getMessage());
        if (!handleException(ex) && mDefaultHandler != null) {
            // 如果用户没有处理则让系统默认的异常处理器来处理
            mDefaultHandler.uncaughtException(thread, ex);
        } else {
            try {
                Thread.sleep(2000);
            } catch (InterruptedException e) {
                Log.e(TAG, "error : ", e);
            }
//            退出程序
            android.os.Process.killProcess(android.os.Process.myPid());
            System.exit(0);

        }
    }

    /**
     * 自定义错误处理，收集错误信息，发送错误报告等操作均在此完成
     *
     * @param ex
     * @return true：如果处理了该异常信息；否则返回 false
     */
    private boolean handleException(Throwable ex) {
        if (ex == null) {
            return false;
        }
        // 异常的自定义处理
        // 日志书写之类的。。
        new Thread() {
            @Override
            public void run() {
                Looper.prepare();
                //相关UI处理
                showNoticeDialog();
                //启动APP时报异常会不停的重启，体验不友好，注释掉
//                Intent intent = new Intent(mContext, MainActivity.class);
//                PendingIntent restartIntent = PendingIntent.getActivity(mContext, 0, intent, Intent.FLAG_ACTIVITY_CLEAR_TOP | Intent.FLAG_ACTIVITY_NEW_TASK);
//                AlarmManager mgr = (AlarmManager) mContext.getSystemService(Context.ALARM_SERVICE);
//                mgr.set(AlarmManager.RTC, System.currentTimeMillis() + 500, restartIntent);

                Looper.loop();

            }
        }.start();
        return true;
    }

    private void showNoticeDialog() {
        if (null == mNoticeDialog) {
            mNoticeDialog = new NoticeDialog(mContext);
            mNoticeDialog.getWindow().setType(WindowManager.LayoutParams.TYPE_SYSTEM_ALERT);
            mNoticeDialog.setCancelable(false);
            mNoticeDialog.setClickListener(this);
        }
        mNoticeDialog.show(CRASH_NOTICE);
    }

    private void dismissNoticeDialog() {
        if (null != mNoticeDialog && mNoticeDialog.isShowing()) {
            mNoticeDialog.dismiss();
        }
    }

    @Override
    public void onConfirmClick() {
        dismissNoticeDialog();
        android.os.Process.killProcess(android.os.Process.myPid());
        System.exit(0);
    }
}
