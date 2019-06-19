import {
    Platform
} from 'react-native';

import {observable, action, computed, autorun} from "mobx";
import Base64 from '../../Common/JXHelper/Base64'
import SecretUtils from '../../Common/JXHelper/SecretUtils'
import Moment from 'moment'
import {
    getBalance,
    getBalaceAndUserInfo,
    userLogOut,
    modifyUserRealName,
    getUserInfo,
    modifyPwd,
} from '../../Common/Network/TCRequestService'
import UserWithdrawStore from "./UserWithdrawStore";


let base64 = new Base64()
let secretUtils = new SecretUtils()

/**
 *用户数据管理
 */
export default class UserStore {

    //当前用户是否登录
    @observable isLogin = false;

    //当前用户名
    @observable userName = "";

    //当前用户真实姓名
    @observable realName = "";


    @observable phoneNumber = "";

    //用户logo颜色
    @observable userLogoColor = "#44b1f5";

    //用户奖金组
    @observable prizeGroup = 1960;

    @observable minMemberPrizeGroup = 0;

    //当前用户状态 正式用户，试玩用户
    @observable currentState = "";

    //用户角色
    @observable oauthRole;

    //用户登录token
    @observable access_token = "";

    //用户余额
    @observable balance = 0;

    //是否签到
    @observable isSigned = false;

    //签到天数
    @observable keepSignInDays;

    //是否绑定银行卡
    @observable hasBank = false;

    //使用base64加密过的密码
    @observable password;

    //金额是否可见
    @observable moneyIsVisable = true;

    //手机是否验证过
    @observable isCertifiedPhone = false;


    constructor() {
       // this.initUserInfo()
    }

    //是否是试玩账号
    @computed get isGuest() {
       // return this.userName.indexOf("guest") > -1;
        return false;
    }

    //是否是代理
    @computed
    get isAgent() {
        return this.oauthRole !== "USER";
    }

    @action
    changeMoneyIsVisable() {
        this.moneyIsVisable = !this.moneyIsVisable;
    }

    @action
    initLoginToken(access_token){
        if(this.access_token!=access_token){
            TW_Log("initLoginToken---"+access_token);
            this.access_token=access_token;
            this.freshBalance(false);
            TW_Store.bankStore.initUserBank();
            TW_Store.userPayTypeStore.initPopUp();
            TW_Store.userPayTypeStore.initPayTypeList();
            TW_Store.bblStore.getAppData();
        }

    }


    getBankCardLogo(bankCode) {
       // return {uri: TCHomeContents.content.otherSettings.bankCardLogoUrlPrefix + bankCode + ".png"};
        return {uri:  bankCode + ".png"}
    }

    getBankBackground(bankCode) {
      //  return {uri: TCHomeContents.content.otherSettings.bankCardLogoUrlPrefix + bankCode + "_bg.png"};
        return {uri:  bankCode + "_bg.png"}
    }

    @action
    async initData(callback) {
        await storage.load({
            key: 'USERINFO',
        }).then(res => {
            if (res) {
                if (res.username) {
                    this.userName = res.username;
                    this.realName = res.realname;
                    this.access_token = res.oauthToken.access_token;
                    this.oauthRole = res.oauthRole;
                    this.prizeGroup = res.prizeGroup;
                    this.password = base64.decode(res.password);
                    this.login(callback);
                }
            } else {
                this.isLogin = false;
            }
        }).catch(err => {
            JXLog("get userinfo false")
            this.isLogin = false;
        });
    }


   // async initUserInfo(){
   //      await storage.load({
   //          key: 'USERINFO',
   //      }).then(res => {
   //          if (res) {
   //              if (res.username) {
   //                  this.userName = res.username;
   //                  this.realName = res.realname;
   //                  this.access_token = res.oauthToken.access_token;
   //                  this.oauthRole = res.oauthRole;
   //                  this.prizeGroup = res.prizeGroup;
   //                  this.password = base64.decode(res.password);
   //              }
   //          } else {
   //              this.isLogin = false;
   //          }
   //      }).catch(err => {
   //          JXLog("get userinfo false")
   //          this.isLogin = false;
   //      });
   //  }

    // async updateUserOtherInfo() {
    //     await storage.load({key: 'USERLOGOCOLOR'}).then((res) => {
    //         this.userLogoColor = res;
    //     }).catch(err => {
    //         this.getRandomColorToSave();
    //     })
    //     this.getSignInData();
    // }

    saveUserInfo(user) {

        this.isLogin = true;
        this.userName = user.username.toLocaleLowerCase();

        this.prizeGroup = user.prizeGroup;
        this.minMemberPrizeGroup = user.minMemberPrizeGroup;

        // user.password = base64.encode(this.password);
        this.realName = user.realname;
        this.oauthRole = user.oauthRole;
        this.balance = user.balance;
        this.isCertifiedPhone =user.certifiedPhone;
        TW_Log("isCertifiedPhone----"+ this.isCertifiedPhone,user)

    }

    //更新用户数据
    updateUserAllInfo() {
        getUserInfo((res) => {
            if (res.rs) {
                this.prizeGroup = res.content.prizeGroup;
                this.userName = res.content.username;
                this.realName = res.content.realName;
            }
        });
    }

    //随机Logo背景色
    getRandomColorToSave() {
        let colorArray = ['#44b1f5', '#FFB561', '#FF6366', '#67D06D']
        let r = Math.floor(Math.random() * 4)
        let color = colorArray[r]
        storage.save({
            key: 'USERLOGOCOLOR',
            data: color
        })
        this.userLogoColor = color;
    }





    /**
     * 修改用户密码
     * @param oldPwd
     * @param newPwd
     * @param mode
     * @param callback
     */
    @action
    modifyUserPwd(oldPwd, newPwd, mode, callback) {
        let oldEncryptPwd = secretUtils.rsaEncodePWD(oldPwd);
        let newEncryptPwd = secretUtils.rsaEncodePWD(newPwd);
        let params = {'password': oldEncryptPwd, 'newPassword': newEncryptPwd, 'mode': mode};
        modifyPwd(params, (res) => {
            let result = {};
            if (res.rs) {
                result.status = true;
                mode === 'PASSWORD' ? this.clearLoginData() : null;
                callback(result);
            } else {
                result.status = false;
                if (res.status === 500) {
                    result.message = "服务器出错啦!";
                } else {
                    result.message = res.message ? res.message : "修改失败，请输入正确密码!";
                }
                callback(result);
            }
        })
    }

    /**
     * 退出登录
     * @param callback
     */
    @action
    exitAppToLoginPage(callback) {
        userLogOut((res) => {
            if (res.rs) {
                this.clearLoginData();
            }
            callback&&callback(res);
        });
        this.access_token="";
    }

    //清楚登录数据
    @action
    clearLoginData() {
        this.isLogin = false;
        this.balance = 0;
        this.phoneNumber = "";
        TW_Store.bankStore.clearBank();
        TW_Store.userPayTypeStore.clearPlayTypeData();
        TW_Store.userWithdrawStore = new UserWithdrawStore();
    }




    lastRequestTime = 0;

    /**
     * 刷新余额
     * @param isMoneyChange
     */
    @action
    freshBalance(isMoneyChange = true) {
        if (this.lastRequestTime === 0) {
            this.lastRequestTime = Moment().format("X");
        } else {
            let temp = Moment().format('X') - this.lastRequestTime;
            if (temp < 1) {
                return;
            } else {
                this.lastRequestTime = Moment().format('X');
            }
        }
        if (isMoneyChange) {
            this.getBalance();
        } else {
            this.getBalanceAnUserInfo();
        }
    }

    //获取余额
    getBalance(callback) {
        getBalance((res) => {
            if (res.rs) {
                this.balance = res.content.balance;
            }
            callback && callback(res);
        })
    }

    //获取余额和用户信息
    getBalanceAnUserInfo() {
        getBalaceAndUserInfo((res) => {
            if (res.rs) {
                TW_Log("TW_Store.userStore.phoneNumber-getBalaceAndUserInfo-",res)
                this.balance = res.content.userBalance.balance;
                this.realName = res.content.realName;
                this.phoneNumber = res.content.phoneNumber;
                this.userName = res.content.username;
            }
        })
    }

    /**
     * 修改用户真实姓名
     * @param name
     * @param callback
     */
    @action
    changeRealName(name, callback) {
        let response = {};
        modifyUserRealName(name, (res) => {
            if (res.rs) {
                response.status = true;
                this.realName = name;
                callback(response);
                return;
            } else {
                response.status = false;
                if (res.status === 500) {
                    response.message = "服务器出错啦!";
                } else {
                    response.message = res.message ? res.message : "修改失败，请稍后再试!";
                }
                callback(response);
                return;
            }
        })
    }


}


