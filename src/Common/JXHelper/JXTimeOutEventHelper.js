/**
 * Created by Sam on 26/12/2017.
 * Copyright © 2017年 JX. All rights reserved.
 */

export default class TimeOutEvent {
    constructor() {
        this.lastEventTime = 0;
    }

    /**
     * 发起一个事件，在固定时间间隔内这个事件只能被调用一次的方法
     *
     * @param (event) require   需要调用的事件
     * @param (minimumInterval) require 最小时间间隔
     * @param (timeoutEvent) option  超时事件，如本次事件距离上一次事件时间小于minimumInterval 可设置一个回调超时方法
     * @param (timeout) option  超时事件，如本次事件距离上一次事件时间小于minimumInterval 可设置一个超时回调时间
     */
    pullEvent(event, minimumInterval, timeoutEvent, timeout) {
        let now = new Date();
        if (now - this.lastEventTime < minimumInterval) {
            if (timeout) {
                setTimeout(() => {
                    timeoutEvent && timeoutEvent();
                }, timeout);
            }
            return;
        }
        // 记录上次事件发起时间
        this.lastEventTime = now;
        event && event();
    }
}
