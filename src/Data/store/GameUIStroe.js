import {action, observable} from 'mobx'
import TCUserPayAndWithdrawRecordsMain from "../../Page/UserCenter/UserAccount/TCUserPayAndWithdrawRecordsMain";
import {View} from "react-native";
import BaseGameAlert from "../../Page/enter/game/GameMoneyInView";
import React from "react";
import TCUserBankPayMessageNew from "../../Page/UserCenter/UserPay/TCUserBankPayMessageNew";

export default class GameUIStroe {

    @observable
    isShowUserInfo = false;

    @observable
    isShowAddPayView= false;

    @observable
    isShowWithDraw = false;

    @observable
    isShowGuest= false;

    @observable
    gustWebUrl= "";

    @observable
    gameAlertData= {
        title:"",
        component:null,
        param:{},
        onBack:null
    };


    @action
    showTiXianDetail(isShow=true,onBack=null) {
            this.gameAlertData={
                title:"提现明细",
                component:TCUserPayAndWithdrawRecordsMain,
                param:{accountType: 0, isBackToTop: true},
                onBack
            }

    }

    @action
    showChongZhiDetail(isShow=true,onBack=null) {
            this.gameAlertData={
                title:"充值明细",
                component:TCUserPayAndWithdrawRecordsMain,
                param:{accountType: 1, isBackToTop: false},
                onBack
            }
    }

    @action
    showBankPay(param) {
        this.gameAlertData={
            title:"银行转账",
            component:TCUserBankPayMessageNew,
            param,
        }
    }

    @action
    showCommonView(title="",component=null,param={}){
        this.gameAlertData={
            title,
            component,
            param,
        }
    }


    @action
    hideAlertUI() {
        this.gameAlertData={
            title:"",
            component:null,
            param:{}
        }
    }
}
