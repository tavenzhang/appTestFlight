import {
    Platform
} from 'react-native';

import {observable, action, computed, autorun} from "mobx";
import Base64 from '../../Common/JXHelper/Base64'
import SecretUtils from '../../Common/JXHelper/SecretUtils'
import Moment from 'moment'
import {
    userLogin,
    userRegister,
    signInData,
    singin,
    guestRegister,
    getBalance,
    getBalaceAndUserInfo,
    userLogOut,
    modifyUserRealName,
    getUserInfo,
    modifyPwd,
    getPlatformBalance,
    getAllBalance
} from '../../Common/Network/TCRequestService'
import JDAppStore from './JDAppStore'
import InitAppStore from './InitAppStore'
import messageStore from './UserMessageStore'
import userCollectStore from './UserCollectStore'
import NetUitls from "../../Common/Network/TCRequestUitls";
import {config} from "../../Common/Network/TCRequestConfig";

let base64 = new Base64()
let secretUtils = new SecretUtils()

/**
 *用户数据管理
 */
class UserStore {

    //当前用户是否登录
    @observable isLogin = false;

    //当前用户名
    @observable userName = "";

    //当前用户真实姓名
    @observable realName = "";

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

    //新消息数量
    @observable newMsgCount = 0;
    //意见反馈提示
    @observable newFeedBackCount = 0;

    //APP版本
    @observable
    loginAppVersion = Platform.OS + '-' + InitAppStore.appVersion + '-' + JDAppStore.hotFixVersion;


    sessionId;

    //vip信息
    @observable vipContent = null;

    constructor() {

    }

    //是否是试玩账号
    @computed get isGuest() {
        return this.userName.indexOf("guest") > -1;
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

    async updateUserOtherInfo() {
        await storage.load({key: 'USERLOGOCOLOR'}).then((res) => {
            this.userLogoColor = res;
        }).catch(err => {
            this.getRandomColorToSave();
        })
        this.getSignInData();
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
     * 验证登录
     * @param callback
     */
    @action
    loginVal(callback) {
        let name = this.userName.replace(/^\s+|\s+$/g, "");
        let res = {};
        if (!name.length) {
            res.status = false;
            res.message = "请输入用户名";
            callback(res);
            return;
        }
        let re = /^[0-9A-Za-z]{4,12}$/
        if (name.length < 4 || name.length > 12 || !name.match(re)) {
            res.status = false;
            res.message = "用户名格式错误";
            callback(res);
            return;
        }
        if (this.isGuest) {
            res.status = false;
            res.message = "试玩账号不能登录";
            callback(res);
            return;
        }

        if (!this.password.length) {
            res.status = false;
            res.message = "请输入密码";
            callback(res);
            return;
        }
        this.login(callback);
    }

    //登录
    @action
    login(callback) {
        JXLog("Begin Login")
        secretUtils.encode(this.userName, this.password, (hash) => {
            let encryptPWD = secretUtils.rsaEncodePWD(this.password);
            let data = {
                'username': this.userName,
                'password': encryptPWD,
                'hash': hash,
                appVersion: this.loginAppVersion
            };
            JXLog("data", data);
            userLogin(data, (res) => {
                if (res.rs) {
                    JXLog("Login success")
                    let user = res.content;
                    if (user) {
                        this.saveUserInfo(user);
                        callback({status: true, message: "登录成功!"})
                    } else {
                        callback({status: false, message: "服务器错误，登录失败!"})
                    }
                } else {
                    if (res.message) {
                        callback({status: false, message: res.message})
                    } else {
                        callback({status: false, message: "服务器错误，登录失败!"})
                    }
                }
            })
        }, InitAppStore.deviceToken)
    }

    //保存用户信息
    saveUserInfo(user) {
        this.isLogin = true;
        this.userName = user.username.toLocaleLowerCase();
        this.prizeGroup = user.prizeGroup;
        this.minMemberPrizeGroup = user.minMemberPrizeGroup;
        this.access_token = user["oauthToken"]["access_token"];
        user.password = base64.encode(this.password);
        this.realName = user.realname;
        this.oauthRole = user.oauthRole;
        this.balance = user.balance;
        this.sessionId = user.sessionId;
        storage.save({
            key: 'USERINFO',
            data: user
        });
        this.updateUserOtherInfo();
        this.getCollects();
        this.getHttpVipInfo();
    }

    getCollects() {
        userCollectStore.getCollects(null);
    }

    /**
     * 注册
     * @param params
     * @param callback
     */
    @action
    register(params, callback) {
        let {userName, password, affCode, validateCode, options} = params;
        this.password = password;
        if(validateCode){
            validateCode = validateCode.replace(/\s+/g,"")
        }
        secretUtils.encode(userName.toLocaleLowerCase(), password, (hash) => {
            let encryptedPWD = secretUtils.rsaEncodePWD(password);
            let data = {
                'username': userName.toLocaleLowerCase(),
                'password': encryptedPWD,
                'hash': hash,
                affCode: affCode,
                validateCode: validateCode,
                webUniqueCode: InitAppStore.deviceToken,
                options: options
            };
            userRegister(data, (res) => {
                if (res.rs) {
                    let user = res.content;
                    if (user) {
                        user.password = base64.encode(password);
                        this.saveUserInfo(user);
                        callback({status: true, message: "注册成功!"})
                    } else {
                        callback({status: false, message: "服务器错误，注册失败!"})
                    }
                } else {
                    if (res.message) {

                        callback({status: false, message: res.message})
                    } else {
                        callback({status: false, message: "服务器错误，注册失败!"})
                    }
                }
            })
        }, InitAppStore.deviceToken);
    }

    /**
     * 试玩账号注册
     * @param callback
     */
    @action
    guestRegister(callback) {
        secretUtils.encode(this.userName, this.password, (hash) => {
            let encryptPWD = secretUtils.rsaEncodePWD(this.password);
            JXLog("encryptPWD", encryptPWD)
            let data = {
                'username': this.userName,
                'password': encryptPWD,
                'hash': hash,
                appVersion: this.loginAppVersion
            };
            JXLog("data", data);
            guestRegister(data, (res) => {
                if (res.rs) {
                    JXLog("Login success")
                    let user = res.content;
                    if (user) {
                        user.password = base64.encode(this.password);
                        this.saveUserInfo(user);
                        callback({status: true, message: "登录成功!"})
                    } else {
                        callback({status: false, message: "服务器错误，登录失败!"})
                    }
                } else {
                    if (res.message) {
                        callback({status: false, message: res.message})
                    } else {
                        callback({status: false, message: "服务器错误，登录失败!"})
                    }
                }

            })
        }, InitAppStore.deviceToken)
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
            callback(res);
        });

    }

    //清楚登录数据
    @action
    clearLoginData() {
        this.isLogin = false;
        this.balance = 0;
        this.resetMsgCount();
        this.resetFeedBackCount();
        storage.save({
            key: 'USERINFO',
            data: {}
        });
    }

    @action
    resetMsgCount() {
        this.newMsgCount = 0;
    }

    @action
    resetFeedBackCount() {
        this.newFeedBackCount = 0;
    }

    //获取签到数据
    @action
    getSignInData() {
        signInData((res) => {
            if (res.rs) {
                this.isSigned = res.content.isSigned;
                this.keepSignInDays = res.content.keepSignInDays;
            }
        })
    }

    /**
     * 签到
     * @param callback
     */
    @action
    singIn(callback) {
        singin((res) => {
            if (res.rs) {
                this.getSignInData();
                callback({status: true})
            } else {
                callback({status: false, message: res.message ? res.message : "签到失败!"})
            }
        })
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
                this.balance = res.content.balance;
                this.realName = res.content.realName;
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

    @action
    getMessageStatus() {
        messageStore.getMessageStatus(res => {
            if (res.rs) {
                this.newMsgCount = res.content.messageCount;
                this.newFeedBackCount = res.content.replyNotReadCount;
            }
        })
    }

    @action
    getHttpVipInfo() {
        this.vipContent=null;
        NetUitls.getUrlAndParamsAndCallback(config.api.vipLvUser, {access_token: this.access_token}, (ret) => {
            if (ret.rs) {
                 this.vipContent=ret.content;
                }
           })
    }

}

const userStore = new UserStore();
export default userStore;
