package com.bbl.cgmx.marqueeLabel;

import android.util.Log;

import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;

public class RCTMarqueeLabelManager extends SimpleViewManager<ScrollTextView> {
    @Override
    public String getName() {
        return "RCTMarqueeLabel";
    }

    @Override
    public ScrollTextView createViewInstance(ThemedReactContext reactContext) {
        return new ScrollTextView(reactContext);
    }

    @ReactProp(name = "text")
    public void setText(ScrollTextView view, String text) {
        view.setText(text);
    }

    @ReactProp(name = "fontSize")
    public void setFontSize(ScrollTextView view, float fontSize) {
        view.setViewTextSize(fontSize);
    }

    @ReactProp(name = "color")
    public void setColor(ScrollTextView view, int color) {
        Log.d("text", "color:" + color);
        view.setViewTextColor(color);
    }

    @ReactProp(name = "backgroundColor")
    public void setBackgroundColor(ScrollTextView view, int color) {
        view.setPaintBackgroundColor(color);
    }

    @ReactProp(name = "isRepeat")
    public void setIsRepeat(ScrollTextView view, boolean flag) {
        view.setIsRepeat(flag);
    }

    @ReactProp(name = "startPoint")
    public void setStartPoint(ScrollTextView view, int point) {
        view.setStartPoint(point);
    }

    @ReactProp(name = "direction")
    public void setDirection(ScrollTextView view, int direction) {
        view.setDirection(direction);
    }

    @ReactProp(name = "scrollDuration")
    public void setScrollDuration(ScrollTextView view, int scrollDuration) {
        view.setScrollDuration(scrollDuration);
    }

}
