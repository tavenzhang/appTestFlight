/**
 * Created by Sam on 16/08/2017.
 * Copyright © 2017年 JX. All rights reserved.
 */

/**系统 npm类 */
import {observable, action} from 'mobx';
import {AppState,} from 'react-native';
/**组件内部显示需要引入的类 */

/** 外部关系组件 如 页面跳转用 */
import JXHelper from '../Common/JXHelper/JXHelper'
import {config} from '../Common/Network/TCRequestConfig'
import NetUitls from '../Common/Network/TCRequestUitls'
import Toast from '@remobile/react-native-toast';

class ResultDataEvent {

    constructor(gameUniqueId) {
        this.gameUniqueId = gameUniqueId
        this.getPlanNoDetailRequest()
        this.startTimer()
        this.handleAppStateChange = this.handleAppStateChange.bind(this);
        AppState.addEventListener('change', this.handleAppStateChange);
    }

    @observable
    resultsData = {
        rightData: null,
        current: null,
        lastOpen: null
    }

    @action
    currentDataIntervalEvent = () => {
        if (this.resultsData && this.resultsData.rightData) {
            let d = this.resultsData.rightData
            if (d && d.remainingTime && d.remainingTime > 0) {
                d.remainingTime -= 1
            } else if (d.nextremainingTime && d.nextremainingTime > 0) {
                d.nextremainingTime -= 1
            }

            if (d.remainingTime == 0 && d.nextremainingTime && d.nextremainingTime > 0) {
                // Toast.showLongCenter(d.uniqueIssueNumber+'期已截止\n'+d.nextUniqueIssueNumber+'期已开售'+'\n  投注时注意期号变化');
                JXHelper.currentTwoDataHandleForLast(this.resultsData)
            }

            if ((d.remainingTime <= 0 && d.nextremainingTime > 0) || (d.remainingTime > 0 && this.resultsData.lastOpen && (this.resultsData.lastOpen.lastOpenCode.indexOf('等待开奖') > 0))) {
                if (this.isRefreshing) return
                this.isRefreshing = true
                let rt = JXHelper.getRandomNumber(6) + 6
                this.timeOutToRequestData(rt)
            }
        }
    }

    /*   MARK 必须调用  */
    clear() {
        this.timerD && clearTimeout(this.timerD);
        this.timer3 && clearInterval(this.timer3);
        this.timer2 && clearTimeout(this.timer2);
        AppState.removeEventListener('change', this.handleAppStateChange);
    }

    startTimer = () => {
        this.timer3 && clearInterval(this.timer3);
        this.timer3 = setInterval(() => {
            this.currentDataIntervalEvent()
        }, 1000)
    }

    timeOutToRequestData(rt) {
        this.timerD = setTimeout(() => {
            this.getPlanNoDetailRequest()
        }, rt * 1000)
    }

    getPlanNoDetailRequest() {
        this.isRefreshing = false
        this.timer2 && clearTimeout(this.timer2);
        NetUitls.getUrlAndParamsAndCallback(config.api.plannodetail, this.gameUniqueId, (data) => {
            if (data && data.rs && data.content) {
                let aData = JXHelper.currentTwoDataHandle(data.content)
                this.resultsData.rightData = aData.rightData
                this.resultsData.current = aData.current
                this.resultsData.lastOpen = aData.lastOpen
            } else {
                this.timer2 = setTimeout(() => {
                    this.getPlanNoDetailRequest()
                }, 5000)
            }
        }, 5000)
    }

    handleAppStateChange(nextAppState) {
        if (nextAppState === 'active') {
            this.getPlanNoDetailRequest()
        }
    }
}

export default ResultDataEvent

