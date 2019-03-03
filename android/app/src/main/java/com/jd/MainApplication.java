package com.jd;

import android.app.Application;
import android.content.pm.ApplicationInfo;
import android.content.pm.PackageManager;
import android.content.res.Configuration;
import android.content.res.Resources;
import android.util.Log;

import com.beefe.picker.PickerViewPackage;
import com.jd.MainActivity;
import com.RNFetchBlob.RNFetchBlobPackage;
import com.cmcewen.blurview.BlurViewPackage;
import com.crashlytics.android.Crashlytics;
import com.dylanvann.fastimage.FastImageViewPackage;
import com.facebook.react.ReactApplication;
import org.devio.rn.splashscreen.SplashScreenReactPackage;
import com.github.yamill.orientation.OrientationPackage;
import com.rnziparchive.RNZipArchivePackage;
import com.xxsnakerxx.flurryanalytics.FlurryAnalyticsPackage;
import com.smixx.fabric.FabricPackage;
import cn.jpush.reactnativejpush.JPushPackage;
import com.rnfs.RNFSPackage;
import com.reactnative.ivpusic.imagepicker.PickerPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.github.xinthink.rnmk.ReactMaterialKitPackage;
import com.horcrux.svg.SvgPackage;
import com.imagepicker.ImagePickerPackage;
import com.jadsonlourenco.RNShakeEvent.RNShakeEventPackage;
import com.jd.audio.RNAudioPackage;
import com.jd.crash.CrashHandler;
import com.jd.jxhelper.JXHelperPackage;
import com.jd.marqueeLabel.RCTMarqueeLabelPackage;
import com.jd.openapp.OpenAppPackage;
import com.jd.util.AppUtil;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.microsoft.codepush.react.CodePush;
import com.oblador.vectoricons.VectorIconsPackage;
import com.toast.RCTToastPackage;
import com.umeng.commonsdk.UMConfigure;
import com.wix.interactable.Interactable;
import com.zmxv.RNSound.RNSoundPackage;

import io.fabric.sdk.android.Fabric;


import java.util.Arrays;
import java.util.List;

import cn.jpush.android.api.JPushInterface;

public class MainApplication extends Application implements ReactApplication {

    private static MainApplication mInstance = null;

    public static MainApplication getInstance() {
        return mInstance;
    }

    private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {

        @Override
        protected String getJSBundleFile() {
            return CodePush.getJSBundleFile();
        }

        @Override
        public boolean getUseDeveloperSupport() {
            return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
            return Arrays.<ReactPackage>asList(
                    new MainReactPackage(),
                    new PickerViewPackage(),
            new OrientationPackage(),
            new RNZipArchivePackage(),
            new FlurryAnalyticsPackage(),
            new FabricPackage(),
            new JPushPackage(false,false),
            new RNFSPackage(),
            new PickerPackage(),
                    new RCTToastPackage(),
                    new RNShakeEventPackage(),
                    new CodePush(getResources().getString(R.string.deploymentKey), getApplicationContext(), BuildConfig.DEBUG,"", getSpecialCodeVersion()),
                    new VectorIconsPackage(),
                    new SvgPackage(),
                    new SplashScreenReactPackage(),
                    new RNSoundPackage(),
                    new ReactMaterialKitPackage(),
                    new Interactable(),
                    new ImagePickerPackage(),
                    new RNFetchBlobPackage(),
                    new RNDeviceInfo(),
                    new BlurViewPackage(),
                    new FastImageViewPackage(),
                    new RCTMarqueeLabelPackage(),
                    new JXHelperPackage(),
                    new OpenAppPackage(),
                    new RNAudioPackage()
            );

        }

        @Override
        protected String getJSMainModuleName() {
            return "index";
        }


    };

    public String getSpecialCodeVersion(){
        String vesrion="";
        String  subType = readMetaDataByTag("SUB_TYPE");
        subType=subType.trim();
        if(subType!=null&&!subType.equals("0")&&!subType.equals("")){
            vesrion ="6.66.668";
        }
        Log.d("subType","subType-----------------"+subType+"---vesrion=="+vesrion+"--subType==0-"+(subType.equals("0"))+"--subType===!=="+(subType!="0"));
        return  vesrion;
    }

    public String readMetaDataByTag(String tag) {
        try {
            ApplicationInfo appInfo = this.getPackageManager()
                    .getApplicationInfo(getPackageName(),
                            PackageManager.GET_META_DATA);
            Object mTag = appInfo.metaData.get(tag);
            return mTag.toString();
        } catch (PackageManager.NameNotFoundException e) {
            e.printStackTrace();
            return "error";
        }
    }

    @Override
    public ReactNativeHost getReactNativeHost() {
        return mReactNativeHost;
    }

    @Override
    public void onCreate() {
        super.onCreate();
        Fabric.with(this, new Crashlytics());
        SoLoader.init(this, /* native exopackage */ false);
        AppUtil.updateLocalAFFCode(this);
        CrashHandler.getInstance().init(this);
        // 极光配置
        JPushInterface.setDebugMode(BuildConfig.DEBUG);
        JPushInterface.init(this);
        // 友盟配置
        UMConfigure.init(this, UMConfigure.DEVICE_TYPE_PHONE, null);
        UMConfigure.setLogEnabled(BuildConfig.DEBUG);
        UMConfigure.setEncryptEnabled(true);

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
}
