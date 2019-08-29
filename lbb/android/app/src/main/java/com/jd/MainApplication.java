package com.jd;

import android.app.Application;

import com.facebook.react.ReactApplication;
import fr.greweb.reactnativeviewshot.RNViewShotPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.toast.RCTToastPackage;
import com.horcrux.svg.SvgPackage;
import org.devio.rn.splashscreen.SplashScreenReactPackage;
import com.zmxv.RNSound.RNSoundPackage;
import com.jadsonlourenco.RNShakeEvent.RNShakeEventPackage;
import com.github.xinthink.rnmk.ReactMaterialKitPackage;
import com.wix.interactable.Interactable;
import com.imagepicker.ImagePickerPackage;
import com.reactnative.ivpusic.imagepicker.PickerPackage;
import com.RNFetchBlob.RNFetchBlobPackage;
import com.dylanvann.fastimage.FastImageViewPackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.microsoft.codepush.react.CodePush;
import com.cmcewen.blurview.BlurViewPackage;
import cn.jpush.reactnativejpush.JPushPackage;
import fr.greweb.reactnativeviewshot.RNViewShotPackage;
import com.toast.RCTToastPackage;
import com.jadsonlourenco.RNShakeEvent.RNShakeEventPackage;
import com.microsoft.codepush.react.CodePush;
import com.oblador.vectoricons.VectorIconsPackage;
import com.horcrux.svg.SvgPackage;
import org.devio.rn.splashscreen.SplashScreenReactPackage;
import com.zmxv.RNSound.RNSoundPackage;
import com.github.xinthink.rnmk.ReactMaterialKitPackage;
import com.wix.interactable.Interactable;
import com.imagepicker.ImagePickerPackage;
import com.RNFetchBlob.RNFetchBlobPackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.cmcewen.blurview.BlurViewPackage;
import com.dylanvann.fastimage.FastImageViewPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

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
            new RNViewShotPackage(),
            new VectorIconsPackage(),
            new RCTToastPackage(),
            new SvgPackage(),
            new SplashScreenReactPackage(),
            new RNSoundPackage(),
            new RNShakeEventPackage(),
            new ReactMaterialKitPackage(),
            new Interactable(),
            new ImagePickerPackage(),
            new PickerPackage(),
            new RNFetchBlobPackage(),
            new FastImageViewPackage(),
            new RNDeviceInfo(),
            new CodePush(getResources().getString(R.string.reactNativeCodePush_androidDeploymentKey), getApplicationContext(), BuildConfig.DEBUG),
            new BlurViewPackage(),
            new JPushPackage(),
            new RNViewShotPackage(),
            new RCTToastPackage(),
            new RNShakeEventPackage(),
            new CodePush(getResources().getString(R.string.reactNativeCodePush_androidDeploymentKey), getApplicationContext(), BuildConfig.DEBUG),
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
            new FastImageViewPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
