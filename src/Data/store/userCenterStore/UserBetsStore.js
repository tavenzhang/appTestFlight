/**
 * Created by allen-jx on 2018/4/10.
 */
import {action, observable} from 'mobx'
import Moment from 'moment'
import RequestUtils from "../../../Common/Network/TCRequestUitls";
import {config} from "../../../Common/Network/TCRequestConfig";

export default class UserBetsStore {

    constructor() {

    }

    //右侧快捷选择日期标题
    @observable
    fasterDateTitle = "今天";

    @observable
    beginTime = Moment().format('YYYY-MM-DD');

    @observable
    endTime = Moment().format('YYYY-MM-DD');

    @observable
    loading = false;

    @observable
    status = true;

    @observable betData;

    selectBetTypeIndex = 0;

    getDateArray() {
        return ['今天', '昨天', '一周', '半月', '一月', "三月"];
    }

    /**
     * 获取投注类型
     * @returns {[string,string,string,string,string]}
     */
    getBetsType() {
        return ['全部', '赢', '输', '平局', '未结算'];
    }


    getBetsSelectTypeStr() {
        let temp = ['', 'WIN', 'LOSS', 'DRAW', 'NOTSETTLED'];
        return temp[this.selectBetTypeIndex];
    }

    @action
    setDateArrayKey(index) {
        this.getSearchTime(index);
    }

    getSearchTime(type) {
        switch (type) {
            case '0':
                this.beginTime = Moment().format('YYYY-MM-DD');
                this.endTime = Moment().format('YYYY-MM-DD');
                break;
            case '1':
                this.beginTime = Moment()
                    .subtract(1, 'days')
                    .format('YYYY-MM-DD');
                this.endTime = Moment()
                    .subtract(1, 'days')
                    .format('YYYY-MM-DD');
                break;
            case '2':
                this.beginTime = Moment()
                    .subtract(7, 'days')
                    .format('YYYY-MM-DD');
                break;
            case '3':
                this.beginTime = Moment()
                    .subtract(15, 'days')
                    .format('YYYY-MM-DD');
                break;
            case '4':
                this.beginTime = Moment()
                    .subtract(30, 'days')
                    .format('YYYY-MM-DD');
                break;
            case '5':
                this.beginTime = Moment()
                    .subtract(90, 'days')
                    .format('YYYY-MM-DD');
                break;
        }

    }

    @action
    loadUserBets(platform, callback) {
        this.loading = true;
        let params = {
            gamePlatform: platform,
            startTime: this.beginTime,
            endTime: this.endTime,
            winLossStatus: this.getBetsSelectTypeStr(),
            access_token: TCUSER_DATA.oauthToken.access_token
        }
        RequestUtils.getUrlAndParamsAndPlatformAndCallback(config.api.userBets, platform, params, (res) => {
            this.loading = false;
            if (res.rs) {
                this.betData = res.content;
            }
            this.status = res.rs;
            callback({status: res.rs, message: res.message ? res.message : "加载失败!"});
        })
    }

}
