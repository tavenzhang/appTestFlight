import {observable, action, computed} from "mobx";
import {getUserSheetsData} from '../../Common/Network/TCRequestService'
import userStore from './UserStore'
import Moment from 'moment';
import {config} from "../../Common/Network/TCRequestConfig";
import NetUitls from "../../Common/Network/TCRequestUitls";
import Toast from "../../Common/JXHelper/JXToast";

export default class UserSheetsStore {

    isUserSheet = true; //是否是个人报表
    agentUsername = null;

    constructor(isUserSheet, agentUsername) {
        this.isUserSheet = isUserSheet;
        this.agentUsername = agentUsername;
    }

    @observable
    sheetData = {
        count: 0,
        sumCommission: 0,
        sumRebate: 0,
        sumFee: 0,
        sumTransferIn: 0,
        sumTransferOut: 0,
        sumGrantTotal: 0,
        sumPnl: 0,
        sumTopup: 0,
        sumCharge: 0,
        sumWin: 0,
        sumWithdrawal: 0,
        sumBonus: 0,
        sumEffectiveBet: 0
    };
    @observable
    beginTime = '';
    @observable
    endTime = '';
    @observable
    rightButtonTitle = '今天';
    @observable
    loading = false;


    getContentTitle() {
        if (userStore.oauthRole === 'USER') {
            return ['盈利总额', '有效投注总额', '派彩总额', '充值总额', '提款总额'];
        } else if (this.isUserSheet) {
            return ['盈利总额', '有效投注总额', '派彩总额', '佣金总额', '充值总额', '提款总额'];
        } else {
            return ['盈利总额', '有效投注总额', '派彩总额', '佣金总额', '充值总额', '提款总额', '返点总额', '优惠总额'];
        }
    }

    getTitle() {
        if (this.isUserSheet) {
            return "个人报表";
        } else {
            return "团队报表";
        }
    }

    getSearchTime(type) {
        this.endTime = Moment().format('YYYY-MM-DD');
        this.beginTime = Moment().format('YYYY-MM-DD');
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
        this.loading = true;
        this.loadDataFormNet();
    }


    loadDataFormNet() {

        let params = {
            endDateInclusive: this.endTime,
            startDateInclusive: this.beginTime,
            agentUsername: this.agentUsername ? this.agentUsername : null,
            username: userStore.userName
        }
        getUserSheetsData(this.isUserSheet, params, (data) => {
            this.loading = false;
            if (data && data.rs && data.content) {
                if (this.isUserSheet) {
                    this.sheetData = data.content.userStatementSummaryDto;
                } else {
                    this.sheetData = data.content;
                }
            } else {
                Toast.showShortCenter(data.message ? data.message : '网络异常');
            }
        })
    }

    assignValue(key) {
        if (key === '盈利总额') {
            return (this.sheetData.sumPnl + this.sheetData.sumCommission + this.sheetData.sumBonus).toFixed(2);
        } else if (key === '有效投注总额') {
            return this.sheetData.sumEffectiveBet;
        } else if (key === '派彩总额') {
            return this.sheetData.sumWin;
        } else if (key === '佣金总额') {
            return this.sheetData.sumCommission;
        } else if (key === '充值总额') {
            return this.sheetData.sumTopup;
        } else if (key === '提款总额') {
            return this.sheetData.sumWithdrawal;
        } else {
            if (this.isUserSheet) {
                return null;
            } else {
                if (key === '返点总额') {
                    return this.sheetData.sumRebate;
                } else if (key === '优惠总额') {
                    return this.sheetData.sumBonus;
                }
            }
        }
        return '';
    }

}