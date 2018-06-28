import Toast from "../../Common/JXHelper/JXToast";
import {action, observable} from "mobx";
import Moment from "moment";
import _ from "lodash";
import {
    balanceHistory,
    payAndWithdrawHistory
} from '../../Common/Network/TCRequestService'

export default class UserAccountStore {

    constructor() {
    }

    @observable
    selected = 0
    @observable
    date = Moment().format('YYYY-MM-DD')
    @observable
    hasBeforeDay = true;
    @observable
    hasAfterDay = false;

    @observable
    datas = [];

    pageSize = 20;
    @observable
    foot = 0

    @observable
    moreText

    pagingState = ""

    @observable
    isRefreshing = false;

    pageNum = 1;

    type = null;


    /**
     * 获取账变历史
     * @param start
     * @param pageSize
     * @param callback
     */
    getBalanceHistory(start, pageSize = 20, callback) {
        balanceHistory({start: start, pageSize: pageSize}, callback);
    }


    /**
     * 获取充提记录
     * @param type
     * @param pageNum
     * @param pageSize
     * @param state
     * @param callback
     */
    getPayAndWithdrawHistory(type, pageNum, pageSize, state, callback) {
        payAndWithdrawHistory({
            type: type,
            start: pageNum * pageSize,
            pageSize: pageSize,
            state: state
        }, callback);
    }


    @action
    before() {
        this.isRefreshing = true
        this.date = Moment(this.date)
            .subtract(1, 'days')
            .format('YYYY-MM-DD');
        let days = Moment().diff(this.date, 'days');
        if (days < 90) {
            this.hasAfterDay = true;
        } else {
            this.hasBeforeDay = false;
        }
        this.clearData();
    }

    clearData() {
        this.datas = [];
        this.pageNum = 1;
        this.pagingState = "";
        this.foot = 0;
        this.loadDataFromNet();
    }

    @action
    after() {
        this.date = Moment(this.date)
            .add(1, 'days')
            .format('YYYY-MM-DD');
        let days = Moment().diff(this.date, 'days');
        if (days > 0) {
            this.hasBeforeDay = true;
        } else {
            this.hasAfterDay = false;
        }
        this.clearData();
    }

    @action
    changeDate(date) {
        let days = Moment().diff(date, 'days');
        this.isRefreshing = true;
        if (days <= 0) {
            this.hasBeforeDay = true;
            this.hasAfterDay = false;
        } else if (days >= 90) {
            this.hasBeforeDay = false;
            this.hasAfterDay = true;
        } else {
            this.hasAfterDay = true;
            this.hasBeforeDay = true;
        }
        this.date = Moment(date).format('YYYY-MM-DD');
        this.clearData();
    }

    changeType(type) {
        this.isRefreshing = true;
        switch (type) {
            case 0:
                this.type = null;
                break;
            case 1:
                this.type = 'TOPUP';
                break;
            case 2:
                this.type = 'WITHDRAW'
                break;
            case 3:
                this.type = 'CHARGE';
                break;
            case 4:
                this.type = 'WIN';
                break;
            case 5:
                this.type = "BONUS";
                break;
        }
        this.clearData();
    }

    loadDataFromNet() {
        let params = {
            date: this.date,
            pagingState: this.pagingState
        }
        if (this.type) {
            params.moneyOperationType = this.type;
        }

        balanceHistory(params, (res) => {
            this.isRefreshing = false;
            JXLog("==================balance"+this.isRefreshing);
            if (res.rs) {
                this.datas = _.concat(this.datas.slice(0), res.content.datas);
                this.pagingState = res.content.pagingState;
                if (this.pageNum === 1 && this.datas.length < this.pageSize) {
                    this.foot = 0;
                } else if (this.pageNum > 1 && res.content.datas < this.pageSize) {
                    this.noMoreData();
                } else {
                    this.foot = 2;
                }
            } else {
                Toast.showShortCenter(res.message ? res.message : "网络异常，请求失败")
                this.foot = 0;
            }
        })
    }

    noMoreData() {
        this.foot = 1
        this.moreText = '没有更多数据'
    }

    @action
    updateData() {
        this.clearData();

    }

}