/**
 * Created by Sam on 11/01/2018.
 * Copyright © 2017年 JX. All rights reserved.
 */

import {observable, action} from 'mobx';
import * as _ from 'lodash';
import NetUitls from '../../Common/Network/TCRequestUitls';
import {config, appId, appVersion, AppName} from '../../Common/Network/TCRequestConfig';
import TimeOutEvent from '../../Common/JXHelper/JXTimeOutEventHelper';
import Moment from 'moment';
import momentTimeZone from 'moment-timezone';
import JXHelper from '../../Common/JXHelper/JXHelper'
let instance = null;

export default class RedPacketData {
    constructor() {
        if (!instance) {
            instance = this;
        }
        this.TimeOutEvent = new TimeOutEvent();
        return instance;
    }

    // 红包开关
    @observable hbdisplay = false;

    // 条件红包
    @observable TJHongbao = null;

    // 福利红包
    @observable FLHongbao = null;

    // 条件红包
    @observable TJHongbaoInfo = null;

    // 福利红包
    @observable FLHongbaoInfo = null;

    //条件红包倒计时
    @observable TJHongbaoCountDown = "";
    //福利红包倒计时
    @observable FLHongbaoCountDown = "";

    //服务器时间
    serverDateTime = Moment().format('X');
    //当天日期
    nowDate = Moment().format('YYYY-MM-DD')

    @action
    resetHbdisplay(display) {
        this.hbdisplay = display;
    }

    // 条件红包 次数
    @action
    resetTjHongbao(data) {
        this.TJHongbao = data;
        if (!_.isEmpty(data)) {
            this.TJHongbao.remainderTimes = this.TJHongbao.chances - this.TJHongbao.usedChances
        }
    }

    // 福利红包 次数
    @action
    resetFlHongbao(data) {
        this.FLHongbao = data;
        if (!_.isEmpty(data)) {
            this.FLHongbao.remainderTimes = this.FLHongbao.chances - this.FLHongbao.usedChances
        }
    }

    // 条件红包 时间
    @action
    resetTjHongbaoInfo(data) {
        this.TJHongbaoInfo = data;
    }

    // 福利红包 时间
    @action
    resetFlHongbaoInfo(data) {
        this.FLHongbaoInfo = data;
    }

    @action
    beginTJHongbaoCountDown() {
        if (!_.isEmpty(this.TJHongbaoInfo)) {
            this.timer && clearInterval(this.timer);
            this.timer = setInterval(() => {
                this.TJHongbaoCountDown = this.countDown(this.TJHongbaoInfo.hongbaoStartTime, this.TJHongbaoInfo.hongbaoEndTime)
            }, 1000);
        }
    }

    @action
    beginFLHongbaoCountDown() {
        if (!_.isEmpty(this.FLHongbaoInfo)) {
            this.timer1 && clearInterval(this.timer1);
            this.timer1 = setInterval(() => {
                this.FLHongbaoCountDown = this.countDown(this.FLHongbaoInfo.hongbaoStartTime, this.FLHongbaoInfo.hongbaoEndTime)
            }, 1000);
        }
    }

    beginCountDown() {
        this.beginTJHongbaoCountDown();
        this.beginFLHongbaoCountDown();
    }


    //倒计时
    countDown(startDate, endDate) {
        let startTime = momentTimeZone.tz(this.nowDate + ' ' + startDate, 'Asia/Shanghai') / 1000;
        let endTime = momentTimeZone.tz(this.nowDate + ' ' + endDate, 'Asia/Shanghai') / 1000;
        let countDownStr = "";
        if (startTime - this.serverDateTime > 0) {
            countDownStr = "还有" + JXHelper.getTimeHHMMSSWithSecond(startTime - this.serverDateTime) + "开始";
        } else if (endTime - this.serverDateTime > 0) {
            countDownStr = "还有" + JXHelper.getTimeHHMMSSWithSecond(endTime - this.serverDateTime) + "结束";
        } else {
            countDownStr = "今天活动已经结束";
            // if (this.nowDate !== Moment().format('YYYY-MM-DD')) {//凌晨过后，再次请求数据
            //     this.requestRedPacketCurrent();
            // }
            this.clearTimer();
        }
        this.serverDateTime++;
        return countDownStr;
    }

    clearTimer() {
        console.log('+++=============clearTimer')
        this.timer && clearInterval(this.timer);
        this.timer1 && clearInterval(this.timer1);
    }

    //获取红包规则
    getRedpacketRuleUrl() {
        if (this.TJHongbaoInfo && this.TJHongbaoInfo.url) {
            return this.TJHongbaoInfo.url;
        }
    }

    // 红包开关
    requestRedPacketCurrent = () => {
        NetUitls.getUrlAndParamsAndCallback(config.api.redPacketCurrent, appId, data => {
            if (data.rs) {
                this.resetHbdisplay(data.content.display);
                this.resetTjHongbaoInfo(data.content.tjHongbao);
                this.resetFlHongbaoInfo(data.content.flHongbao);
            } else {
                setTimeout(() => {
                    this.requestRedPacketCurrent();
                }, 5000);
            }
        }, 0, true);
    };

    // 查询红包个数
    requestRedPacketInfo() {
        NetUitls.getUrlAndParamsAndCallback(config.api.quotaHB, null, data => {
            if (data.rs) {
                this.serverDateTime = new Date(data.serverDate).getTime() / 1000;
                this.nowDate = Moment(new Date(data.serverDate).getTime()).format('YYYY-MM-DD')
                this.beginCountDown();
                this.resetTjHongbao(data.content.tjHongbao);
                this.resetFlHongbao(data.content.flHongbao);
            } else {
                setTimeout(() => {
                    this.requestRedPacketCurrent();
                }, 5000);
            }
        });
    }

    // 抢红包接口
    requestGetRedPacketInfo(type, callBack) {
        let hbtype = {"hongbaoType": type}
        this.TimeOutEvent.pullEvent(() => {
            NetUitls.PostUrlAndParamsAndCallback(config.api.drawHB, hbtype, data => {
                if (data.rs) {
                    this.requestRedPacketInfo();
                }
                callBack && callBack(data);
            });
        }, 1000);
    }
}
