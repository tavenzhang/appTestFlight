import {action, observable} from 'mobx'
import TCUserPayAndWithdrawRecordsMain from "../../Page/UserCenter/UserAccount/TCUserPayAndWithdrawRecordsMain";
import {View} from "react-native";
import BaseGameAlert from "../../Page/enter/game/GameMoneyInView";
import React from "react";
import TCUserBankPayMessageNew from "../../Page/UserCenter/UserPay/TCUserBankPayMessageNew";

import NetUitls from "../../Common/Network/TCRequestUitls";
import {config} from "../../Common/Network/TCRequestConfig";
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
    isShowShare= false;

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
    showGusetView(isShow=true){
        this.isShowGuest = isShow;
    }


    @action
    hideAlertUI() {
        this.gameAlertData={
            title:"",
            component:null,
            param:{}
        }
    }
    @action
    getGustUrl(){
        let  url = TW_Store.bblStore.gameDomain+ config.api.gameCuest.replace("#0",TW_Store.appStore.clindId);
        NetUitls.getUrlAndParamsAndCallback(url, null, (ret) => {
            //{"content":{"pcCusService":"https://vp8.livechatvalue.com/chat/chatClient/chatbox.jsp?companyID=80002762&configID=2931&k=1"},
            if(ret.rs){
                this.gustWebUrl = ret.content.pcCusService;
            }
        },10,false,false);
    }


}
