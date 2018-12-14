/**
 * Created by allen-jx on 2018/4/4.
 */
import {observable, action, computed} from "mobx";
import {
    getFeedBackList,
    addFeedBack
} from '../../Common/Network/TCRequestService'
import Moment from 'moment';
import userStore from './UserStore'

export default class FeedBackStore {

    constructor() {
    }

    @observable
    startDate = Moment().add(-90, 'd').format('YYYY-MM-DD');
    @observable
    endDate = Moment().format('YYYY-MM-DD');
    @observable
    typeName = '已回复';

    @observable contentNumber = 0;

    @action
    initFeedBackList(status, pageNum, pageSize, callback) {
        let params = {
            pageSize: pageSize,
            start: pageNum * pageSize,
            createTimeFrom: this.startDate + ' 00:00:00',
            createTimeTo: this.endDate + ' 23:59:59',
            status: status,
            type: 'SPORT'
        }
        getFeedBackList(params, (res) => {
            if (res.rs) {
                userStore.newFeedBackCount = 0;
            }
            callback ? callback(res) : null;
        })
    }

    @action
    addFeedBack(title, content, callback) {

        addFeedBack({title: title, content: content, type: 'SPORT'}, (res) => {
            let result = {};
            if (res.rs) {
                result.status = true;
                result.message = "感谢您的宝贵意见，我们会尽快改正!";
            } else {
                result.status = false;
                result.message = res.message ? res.message : "服务器错误，添加失败!";
            }
            callback(result);
        });
    }
}