package com.jd.webview;

import android.app.Activity;
import android.app.AlertDialog;
import android.content.Intent;
import android.content.res.Configuration;
import android.content.res.Resources;
import android.graphics.Bitmap;
import android.graphics.Color;
import android.os.Build;
import android.os.Bundle;
import android.text.TextUtils;
import android.view.KeyEvent;
import android.view.View;
import android.view.ViewGroup;
import android.view.Window;
import android.view.WindowManager;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.ImageView;
import android.widget.ProgressBar;
import android.widget.RelativeLayout;
import android.widget.TextView;

import com.jd.R;
import com.jd.util.CommonDialog;
import com.jd.util.JXDragView;
import com.jd.util.StatusBarUtils;
import com.umeng.analytics.MobclickAgent;


/**
 * Created by allen-jx on 2017/7/10.
 */
public class JXGameWebView extends Activity {

    private WebView webView;
    private ProgressBar mProgressBar;
    private String gameName;
    private CommonDialog mExitDialog;
    private JXDragView mDragView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        this.requestWindowFeature(Window.FEATURE_NO_TITLE);
        this.getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN,
                WindowManager.LayoutParams.FLAG_FULLSCREEN);
        super.onCreate(savedInstanceState);
        setContentView(R.layout.jx_game_webview_layout);
        RelativeLayout container = (RelativeLayout) findViewById(R.id.webview_container);
        mProgressBar = (ProgressBar) findViewById(R.id.loading);
        webView = new WebView(getApplicationContext());
        webView.setLayoutParams(new RelativeLayout.LayoutParams(RelativeLayout.LayoutParams.MATCH_PARENT, RelativeLayout.LayoutParams.MATCH_PARENT));
        container.addView(webView, 0);

        Intent intent = getIntent();
        gameName = intent.getStringExtra("title");
        String url = intent.getStringExtra("url");
        String platform = intent.getStringExtra("platform");

        hideVirtualKeys();

        createDragView();

        initWebView(url, platform);

        getWindow().getDecorView().setOnSystemUiVisibilityChangeListener(new View.OnSystemUiVisibilityChangeListener() {
            @Override
            public void onSystemUiVisibilityChange(int visibility) {
                hideVirtualKeys();
            }
        });
    }

    private void initWebView(String url, String platform) {
        WebSettings webSettings = webView.getSettings();
        webSettings.setJavaScriptEnabled(true);
        webSettings.setAllowUniversalAccessFromFileURLs(true);
        webSettings.setAllowFileAccessFromFileURLs(true);
        webSettings.setLoadWithOverviewMode(true);
        webSettings.setDomStorageEnabled(true);
        if (!TextUtils.isEmpty(platform) && platform.equals("FG")) {
            String ua = webSettings.getUserAgentString();
            webSettings.setUserAgentString(ua + "Browser_Type/Android_APP");
        }

        int layerType = Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT ? WebView.LAYER_TYPE_HARDWARE : WebView.LAYER_TYPE_SOFTWARE;
        webView.setLayerType(layerType, null);
        webView.setWebChromeClient(new JXWebChromeClient());
        webView.setWebViewClient(new JXWebViewClient());
        webView.loadUrl(url);
    }

    private void createDragView() {
        ImageView returnView = new ImageView(this);
        returnView.setScaleType(ImageView.ScaleType.CENTER_CROP);
        returnView.setImageResource(R.drawable.ic_return_button);
        returnView.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                showExitDialog();
            }
        });

        mDragView = new JXDragView.Builder()
                .setActivity(this)
                .setDefaultLeft(5)
                .setDefaultTop(5)
                .setView(returnView)
                .build();
    }

    protected void hideVirtualKeys() {
        if (Build.VERSION.SDK_INT < 19) {
            View v = this.getWindow().getDecorView();
            v.setSystemUiVisibility(View.GONE);
        } else {
            View decorView = getWindow().getDecorView();
            int uiOptions = View.SYSTEM_UI_FLAG_HIDE_NAVIGATION
                    | View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY | View.SYSTEM_UI_FLAG_FULLSCREEN;
            decorView.setSystemUiVisibility(uiOptions);
            if (Build.VERSION.SDK_INT > 21) {
                getWindow().setNavigationBarColor(Color.TRANSPARENT);
            }
        }
    }

    @Override
    protected void onResume() {
        super.onResume();
        MobclickAgent.onResume(this);
    }

    @Override
    protected void onPause() {
        super.onPause();
        MobclickAgent.onPause(this);
    }

    // 捕捉"回退"按键，让WebView能回退到上一页，而不是直接关闭Activity。
    @Override
    public boolean onKeyDown(int keyCode, KeyEvent event) {
        if (keyCode == KeyEvent.KEYCODE_BACK) {
            if (webView.canGoBack()) {
                webView.goBack();
            } else {
                showExitDialog();
            }
            return true;
        }
        return super.onKeyDown(keyCode, event);
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
    public void finish() {
        clearWebViewResource();
        super.finish();
        System.exit(0);
    }

    public void clearWebViewResource() {
        if (webView != null) {
            webView.removeAllViews();
            ((ViewGroup) webView.getParent()).removeView(webView);
            webView.setTag(null);
            webView.clearHistory();
            webView.destroy();
            webView = null;
        }
    }

    private void showExitDialog() {
        if (null == mExitDialog) {
            mExitDialog = new CommonDialog(this);
            mExitDialog.setDialogTitle("退出" + gameName + "游戏？");
            mExitDialog.setNegativeBtn("退出游戏", new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    mExitDialog.dismiss();
                    JXGameWebView.this.finish();
                }
            });
            mExitDialog.setPositiveBtn("继续玩会", new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    if (null != mExitDialog && mExitDialog.isShowing()) {
                        mExitDialog.dismiss();
                    }
                }
            });
        }
        mExitDialog.show();
    }

    @Override
    public void onConfigurationChanged(Configuration newConfig) {
        super.onConfigurationChanged(newConfig);
        if (null != mDragView) {
            mDragView.onConfigurationChanged();
        }
    }

    private class JXWebViewClient extends WebViewClient {

        @Override
        public void onPageStarted(WebView view, String url, Bitmap favicon) {
            mProgressBar.setVisibility(View.VISIBLE);
            super.onPageStarted(view, url, favicon);
        }

        @Override
        public void onPageFinished(WebView view, String url) {
            super.onPageFinished(view, url);
            mProgressBar.setVisibility(View.GONE);
        }
    }

    private class JXWebChromeClient extends WebChromeClient {
    }
}
