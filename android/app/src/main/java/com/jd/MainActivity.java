package com.jd;

import android.content.res.Configuration;
import android.content.res.Resources;

import com.facebook.react.ReactActivity;
import com.jd.crash.ErrorManager;
import com.umeng.analytics.MobclickAgent;

public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "JD";
    }

    @Override
    public Resources getResources() {
        Resources resources = super.getResources();
        Configuration configuration = resources.getConfiguration();
        if (configuration.fontScale != 1.0f) {
            configuration.fontScale = 1.0f;
            resources.updateConfiguration(configuration, resources.getDisplayMetrics());
        }
        return resources;
    }

    @Override
    protected void onResume() {
        super.onResume();
        MobclickAgent.onResume(this);
        ErrorManager.getInstance().checkAndUpdateErrorLogIfNeed();
    }

    @Override
    protected void onPause() {
        super.onPause();
        ErrorManager.getInstance().checkAndUpdateErrorLogIfNeed();
        MobclickAgent.onPause(this);
    }
}
