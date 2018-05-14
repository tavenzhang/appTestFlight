/**
 * Created by Joyce on 20/09/2017.
 * Copyright © 2017年 JX. All rights reserved.
 */

/**系统 npm类 */
import {observable, action} from 'mobx';
import {AppState} from 'react-native';
/**组件内部显示需要引入的类 */

/** 外部关系组件 如 页面跳转用 */
import {config} from '../Common/Network/TCRequestConfig';
import NetUitls from '../Common/Network/TCRequestUitls';
import JXHelper from '../Common/JXHelper/JXHelper';

let instance = null;
const intervalTime = 30000;

class LotteryResultDataEvent {
    constructor() {
        // 单例 mobx数据可以完全共用
        if (!instance) {
            this.getLotteryDetailRequest();
            this.startTimer(intervalTime);
            this.handleAppStateChange = this.handleAppStateChange.bind(this);
            AppState.addEventListener('change', this.handleAppStateChange);
            this.timer3 = null;
            this.timer2 = null;
            this.timer = null;
            this.isRefreshing = false;
            this.isLoadFinish = false;
            instance = this;
        }
        return instance;
    }

    @observable resultsData = [];
    @observable countDownData = [];

    @action
    currentDataIntervalEvent = () => {
        if (this.countDownData && this.countDownData.length > 0) {
            let myArray = this.countDownData;
            for (let j = 0, len = myArray.length; j < len; j++) {
                let d = myArray[j];
                if (d.remainingTime > 0) {
                    d.remainingTime -= 1;
                } else if (d.nextremainingTime && d.nextremainingTime > 0) {
                    d.nextremainingTime -= 1;
                }
            }
        }
    };

    /*   MARK 必须调用  */
    clear() {
        this.timer3 && clearInterval(this.timer3);
        this.timer2 && clearTimeout(this.timer2);
        this.timer && clearInterval(this.timer);
        AppState.removeEventListener('change', this.handleAppStateChange());
    }

    startTimer = intervalTime => {
        this.timer3 && clearInterval(this.timer3);
        this.timer3 = setInterval(() => {
            this.getLotteryDetailRequest();
        }, intervalTime);
    };

    startCountDownTimer = () => {
        this.timer && clearInterval(this.timer);
        this.timer = setInterval(() => {
            if (this.countDownData.length >= 1) {
                this.currentDataIntervalEvent();
            }
        }, 1000);
    };

    getLotteryDetailRequest() {
        if (this.isRefreshing) return;
        this.isRefreshing = true;
        this.timer2 && clearTimeout(this.timer2);
        NetUitls.getUrlAndParamsAndCallback(
            config.api.getCurrentResults,
            null,
            data => {
                this.isRefreshing = false;
                let addRcmdCnt = 0; //统计添加推荐彩种的个数，最多7个，和首页推荐彩种保持一致
                if (data && data.rs && data.content) {
                    this.isLoadFinish = true;
                    let filterData = []
                    // modified by Mason at 2018.05.14
                    // modified content: 购彩页面（全部彩种）和开奖页面，显示的彩种为首页热门彩种和推荐彩种
                    for (let item of data.content) {
                        let gameInfo = JXHelper.getGameInfoWithUniqueId(item.gameUniqueId);
                        if (gameInfo && gameInfo.recommendType === 'HOT') {
                            filterData = filterData.concat(item)
                        } else if (gameInfo && gameInfo.recommendType === 'RECOMMEND') {
                            filterData = filterData.concat(item)
                        }
                    }
                    try {
                        this.resultsData = filterData;
                        this.countDownData = JXHelper.currentResultsDataHandle(filterData);
                    } catch (e) {
                    }
                } else {
                    if (!this.isLoadFinish) {
                        this.timer2 = setTimeout(() => {
                            this.getLotteryDetailRequest();
                        }, 5000);
                    }
                }
            },
            null,
            true
        );
    }

    handleAppStateChange(nextAppState) {
        if (nextAppState === 'active') {
            this.getLotteryDetailRequest();
        }
    }
}

export default LotteryResultDataEvent;
