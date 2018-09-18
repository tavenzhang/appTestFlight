package com.jd.webview;

import android.app.Activity;
import android.content.Intent;
import android.content.res.Configuration;
import android.content.res.Resources;
import android.graphics.Bitmap;
import android.os.Build;
import android.os.Bundle;
import android.text.TextUtils;
import android.view.KeyEvent;
import android.view.View;
import android.view.ViewGroup;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.ProgressBar;
import android.widget.RelativeLayout;
import android.widget.TextView;

import com.jd.R;
import com.jd.util.StatusBarUtils;
import com.umeng.analytics.MobclickAgent;


/**
 * Created by allen-jx on 2017/7/10.
 */

public class JXGameWebView extends Activity {

    private WebView webView;
    private ProgressBar mProgressBar;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.jx_game_webview_layout);
        StatusBarUtils.adjustWebGameBar(this);
        TextView titleTv = (TextView) findViewById(R.id.tv_title);
        RelativeLayout container = (RelativeLayout) findViewById(R.id.webview_container);
        mProgressBar = (ProgressBar) findViewById(R.id.loading);
        webView = new WebView(getApplicationContext());
        webView.setLayoutParams(new RelativeLayout.LayoutParams(RelativeLayout.LayoutParams.MATCH_PARENT, RelativeLayout.LayoutParams.MATCH_PARENT));
        container.addView(webView, 0);
        findViewById(R.id.img_back).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                JXGameWebView.this.finish();
            }
        });

        Intent intent = getIntent();
        String title = intent.getStringExtra("title");
        String url = intent.getStringExtra("url");
        String platform = intent.getStringExtra("platform");
        titleTv.setText(title);

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
        if ((keyCode == KeyEvent.KEYCODE_BACK) && webView.canGoBack()) {
            webView.goBack();
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
