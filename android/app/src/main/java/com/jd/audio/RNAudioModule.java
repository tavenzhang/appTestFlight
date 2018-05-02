package com.jd.audio;

import android.media.AudioManager;
import android.media.SoundPool;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.jd.R;

/**
 * @author: Mason
 */
public class RNAudioModule extends ReactContextBaseJavaModule {

    private SoundPool mSoundPool;
    private int mSoundId;

    public RNAudioModule(ReactApplicationContext reactContext) {
        super(reactContext);
        mSoundPool = new SoundPool(1, AudioManager.STREAM_MUSIC, 0);
        mSoundId = mSoundPool.load(reactContext, R.raw.bet, 1);
    }

    @Override
    public String getName() {
        return "RNAudio";
    }

    @ReactMethod
    public void playBet() {
        if (null != mSoundPool) {
            mSoundPool.play(mSoundId, 1, 1, 0, 0, 1);
        }
    }

    @ReactMethod
    public void release() {
        if (null != mSoundPool) {
            mSoundPool.release();
        }
    }
}
