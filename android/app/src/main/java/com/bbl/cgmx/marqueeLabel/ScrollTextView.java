package com.bbl.cgmx.marqueeLabel;

import android.content.Context;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.Paint;
import android.text.TextUtils;
import android.util.AttributeSet;
import android.view.Display;
import android.view.WindowManager;
import android.widget.TextView;


/**
 * 自定义单行文本滚动view
 * Created by Allen on 2016/11/25.
 */

public class ScrollTextView extends TextView {
    public final static String TAG = ScrollTextView.class.getSimpleName();

    private int viewWidth = 0;
    public boolean isStarting = false;//是否开始滚动
    private Paint paint = null;//绘图样式
    private String text = "";//文本内容
    private String mText; //内容
    private Context mContext;
    private float mTextSize = 46; //字体大小
    private int mTextColor = Color.BLACK; //字体的颜色
    private int mBackgroundColor = Color.WHITE;//背景色
    private boolean mIsRepeat;//是否重复滚动
    private int mStartPoint;// 开始滚动的位置  0是从最左面开始    1是从最末尾开始
    private int mDirection;//滚动方向 0 向左滚动   1向右滚动
    private float mScrollDuration;//滚动速度
    public int currentX = 0;// 当前x的位置
    private int textWidth = 0, textHeight = 0;
    public float sepX = 5;//每一步滚动的距离

    public ScrollTextView(Context context) {
        this(context, null);
    }

    public ScrollTextView(Context context, AttributeSet attrs) {
        this(context, attrs, 0);
    }

    public ScrollTextView(Context context, AttributeSet attrs, int defStyle) {
        super(context, attrs, defStyle);
        this.mContext = context;
        init();
    }


    void setText(String text) {
        mText = text;
    }

    void setViewTextSize(float size) {
        mTextSize = size;
    }

    void setViewTextColor(int color) {
        mTextColor = color;
    }

    void setPaintBackgroundColor(int color) {
        mBackgroundColor = color;
    }

    void setIsRepeat(boolean flag) {
        mIsRepeat = flag;
    }

    void setStartPoint(int point) {
        mStartPoint = point;
    }

    void setDirection(int direction) {
        mDirection = direction;
    }

    void setScrollDuration(float scrollDuration) {
        sepX = scrollDuration;
    }

    /**
     * 文本初始化，每次更改文本内容或者文本效果等之后都需要重新初始化一下
     */
    public void init() {
        paint = getPaint();
        paint.setColor(Color.BLACK);
        mTextColor = Color.RED;
        mTextSize = 48;
        mBackgroundColor = Color.WHITE;
        mIsRepeat = true;
        mStartPoint = 0;
        mDirection = 0;
        mScrollDuration = 10;
        paint.setFlags(Paint.ANTI_ALIAS_FLAG);
        paint.setTextAlign(Paint.Align.LEFT);
    }


    protected void measurementsText(String msg) {
        text = msg;
        textWidth = (int) paint.measureText(msg);
        viewWidth = getWidth();
        paint.setTextSize(mTextSize);
        paint.setColor(mTextColor);
        WindowManager wm = (WindowManager) mContext.getSystemService(Context.WINDOW_SERVICE);
        if (viewWidth == 0) {
            if (wm != null) {
                Display display = wm.getDefaultDisplay();
                viewWidth = display.getWidth();
            }
        }
        if (mStartPoint == 0)
            currentX = 0;
        else
            currentX = viewWidth - getPaddingLeft() - getPaddingRight();

    }

    /**
     * 开始滚动
     */
    public void startScroll() {
        isStarting = true;
        if (!TextUtils.isEmpty(mText)) {
            measurementsText(mText);
        }
        invalidate();
    }

    /**
     * 停止滚动
     */
    public void stopScroll() {
        isStarting = false;
        invalidate();
    }

    @Override
    protected void onAttachedToWindow() {
        super.onAttachedToWindow();
        startScroll();
    }

    @Override
    protected void onDetachedFromWindow() {
        super.onDetachedFromWindow();
        stopScroll();
    }

    @Override
    public void onDraw(Canvas canvas) {
        try {
            if (TextUtils.isEmpty(text)) {
                Thread.sleep(1000);//睡眠时间为1秒
                return;
            }
            int paddingLeft = getPaddingLeft();
            int paddingTop = getPaddingTop();
            int paddingRight = getPaddingRight();
            int paddingBottom = getPaddingBottom();
            int contentWidth = getWidth() - paddingLeft - paddingRight;
            int contentHeight = getHeight() - paddingTop - paddingBottom;
            int centeYLine = paddingTop + contentHeight / 2;//中心线


            if (mDirection == 0) {//向左滚动
                if (currentX <= -textWidth) {
                    currentX = contentWidth;
                } else {
                    currentX -= sepX;
                }
            } else {//  向右滚动
                if (currentX >= contentWidth) {
                    currentX = -textWidth;
                } else {
                    currentX += sepX;
                }
            }
//            canvas.drawColor(Color.WHITE);
            canvas.drawColor(mBackgroundColor);
            canvas.drawText(text, currentX, centeYLine + dip2px(getContext(), textHeight) / 2, paint);
            invalidate();
        } catch (Exception e) {

        }
    }

    /**
     * dip转换为px
     *
     * @param context
     * @param dpValue
     * @return
     */
    public static int dip2px(Context context, float dpValue) {
        final float scale = context.getResources().getDisplayMetrics().density;
        return (int) (dpValue * scale + 0.5f);
    }

}