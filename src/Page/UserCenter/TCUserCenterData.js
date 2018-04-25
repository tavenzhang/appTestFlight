/**
 * Created by Sam on 22/11/2017.
 * Copyright © 2017年 JX. All rights reserved.
 */
/**系统 npm类 */
import { observable, action } from 'mobx';
/** 外部关系组件 */
import RequestUtils from '../../Common/Network/TCRequestUitls';
import { config } from '../../Common/Network/TCRequestConfig';
import Toast from '@remobile/react-native-toast'

export default class TCUserCenterData {

    constructor (){
        this.processing = false;
    }

    @observable
    signInData = {
        isSigned: false,
        keepSignInDays: 0,
    };

    @observable
    isSee = true
    @observable
    balance = TCUSER_BALANCE

    // 显示或隐藏金额
    @action
    setMoneyVisible() {
        this.isSee = !this.isSee
    }

    //签到
    @action
    userSignIn(callBack) {
        if (this.processing) {
            return
        }
        this.processing = true;
        RequestUtils.PostUrlAndParamsAndCallback(config.api.signIn, null, response => {
            if(callBack) callBack(response.rs)
            if (response.rs) {
                this.getSignInData();
            }else {
                Toast.showShortCenter(response.message ? response.message:'签到失败')
            }
            this.processing = false;
        });
    }

    @action
    //查询签到
    getSignInData() {
        RequestUtils.getUrlAndParamsAndCallback(config.api.signIn, null, response => {
            if (response.rs && response.content) {
                this.signInData.isSigned = response.content.isSigned;
                this.signInData.keepSignInDays = response.content.keepSignInDays;
            }
        });
    }

    @action
    closeAnimation() {
     this.signInData.signInSucceedShowAnimation = false
    }

}
