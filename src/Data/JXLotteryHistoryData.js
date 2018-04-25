/**
 * Created by Joyce on 22/09/2017.
 * Copyright © 2017年 JX. All rights reserved.
 */

/**系统 npm类 */
import {observable, action} from 'mobx';
import _ from 'lodash';
/**组件内部显示需要引入的类 */

/** 外部关系组件 如 页面跳转用 */
import {config} from '../Common/Network/TCRequestConfig'
import NetUitls from '../Common/Network/TCRequestUitls'
import Toast from '@remobile/react-native-toast'
import TimeOutEvent from '../Common/JXHelper/JXTimeOutEventHelper'
import Moment from 'moment'
class HistoryDataEvent {

    constructor() {
        this.TimeOutEvent = new TimeOutEvent()
    }

    @observable historyData = [];
    @observable isRefreshing = false;

    @action
    getLotteryHistoryRequest(gameUniqueId, params, dontAddHeadersAuthorization, back) {

        this.isRefreshing = true;

        let request = () => {
            NetUitls.getUrlAndParamsAndCallback(config.api.getBetHomeHistoryList + gameUniqueId, params, (data) => {
                if (data && data.rs && data.content) {
                    data.content = _.sortBy(data.content, function (item) {
                        return -item.uniqueIssueNumber;
                    });

                    if (data.content.length > 0) {
                        this.historyData = data.content;
                        this.isRefreshing = false;
                    } else {
                        Toast.showShortCenter('暂无数据')
                        this.isRefreshing = false;
                    }
                } else {
                    Toast.showShortCenter('网络异常')
                    this.isRefreshing = false;
                }
                back && back()
            }, null, dontAddHeadersAuthorization)
        }

        if (gameUniqueId == 'MARK_SIX') {
            this.TimeOutEvent.pullEvent(request, 6000, () => {
                this.isRefreshing = false;
                back && back()
            }, 500)
        } else {
            request()
        }
    }
}

export default HistoryDataEvent

