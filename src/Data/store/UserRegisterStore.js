/**
 * Created by allen-jx on 2018/3/31.
 */
import userStore from './UserStore'
import {observable, computed, action} from 'mobx'
import {registerItem, validataCodeUrl} from '../../Common/Network/TCRequestService'
import jdAppStore from './JDAppStore'
import JDHelper from '../../Common/JXHelper/JXHelper'
import initAppStore from './InitAppStore'

export default class UserRegisterStore {

    /**
     * 是否隐藏密码
     * @type {boolean}
     */
    @observable isHidePassword = true;

    /**
     * 是否同意协议
     * @type {boolean}
     */
    @observable isAgreeProtocol = true;

    /**
     * 注册配置项
     * @type {Array}
     */
    @observable registerItems = [];

    /**
     * 验证码刷新时间
     */
    @observable refreshValidateCodeTime

    /**
     * 用户注册的基本信息
     * @type {{userName: string, password: string, password1: string, validateCode: string, affCode: string, options: {}}}
     */
    userInfo = {
        userName: '',
        password: '',
        password1: '',
        validateCode: '',
        affCode: '',
        options: {}
    }

    /**
     * 验证码刷新
     * @type {boolean}
     */
    validateRefresh = true

    constructor() {

    }

    /**
     * 请求注册项
     * @param callback
     */
    @action
    initRegister(callback) {
        registerItem((res) => {
            if (res.rs) {
                let regs = res.content;
                //对于渠道包过滤邀请码
                if (jdAppStore.userAffCode.length > 0) {
                    let index
                    for (let item in regs) {
                        if (regs[item].key === "affCode") {
                            index = item;
                        }
                    }
                    if (index != null)
                        regs.splice(index, 1);
                }
                this.registerItems = regs;
                callback(null);
            } else {
                callback("服务器异常请求失败");
            }
        })
    }

    @action
    changePwdShow() {
        this.isHidePassword = !this.isHidePassword;
    }

    @action
    changeCheck() {
        this.isAgreeProtocol = !this.isAgreeProtocol;
    }


    onChangeUserName(text) {
        this.userInfo.userName = text;
    }

    onChangePassword(text) {
        this.userInfo.password = text;
    }

    onChangePassword1(text) {
        this.userInfo.password1 = text;
    }


    onChangeValidateCode(text) {
        this.userInfo.validateCode = text;
    }

    onChangeRegisterItem(key, text) {
        this.userInfo.options[key] = text
    }

    @action
    validateUserInfo(callback) {
        let res = {};
        if (!this.isAgreeProtocol) {
            res.status = false;
            callback(res);
            return;
        }
        let re = /^[0-9A-Za-z]{4,12}$/
        if (!this.userInfo.userName.length) {
            res.status = false;
            res.message = "请输入用户名";
            callback(res);
            return;
        }
        let name = this.userInfo.userName + ''
        name = name.replace(/^\s+|\s+$/g, "");
        if (!name.match(re)) {
            res.status = false;
            res.message = "用户名错误(4-12位数字或字母)";
            callback(res);
            return;
        }

        if (!name.match(/[a-zA-Z]/i)) {
            res.status = false;
            res.message = "用户名必须至少包含一位字母";
            callback(res);
            return;
        }

        if (!this.userInfo.password.length) {
            res.status = false;
            res.message = "请输入密码";
            callback(res);
            return;
        }
        let rep = /^[0-9A-Za-z]{6,15}$/
        if (!this.userInfo.password.match(rep)) {
            res.status = false;
            res.message = "密码格式错误(6-15位数字或字母)";
            callback(res);
            return;
        }
        if (!this.userInfo.password1.length) {
            res.status = false;
            res.message = "请输入确认密码";
            callback(res);
            return;
        }
        if (this.userInfo.password != this.userInfo.password1) {
            res.status = false;
            res.message = "两次密码不一致";
            callback(res);
            return;
        }
        let result = this.registerOptionsVal();
        if (!result.status) {
            callback(result);
            return;
        }
        if (!this.userInfo.validateCode.length) {
            res.status = false;
            res.message = "请输入验证码";
            this._refreshValidateCode();
            callback(res);
            return;
        }

        if (initAppStore.userAffCode && initAppStore.userAffCode.length > 0) {
            this.userInfo.affCode = initAppStore.userAffCode
        }
        userStore.register(this.userInfo, (res) => {
            if (res.message === "验证码错误") {
                this._refreshValidateCode();
            }
            callback(res);
        });
    }

    /**
     * 验证配置的注册信息
     * @returns {boolean}
     */
    registerOptionsVal() {
        let res = {};
        if (this.registerItems.length === 0) {
            res.status = true
            return res;
        }
        for (let i = 0; i < this.registerItems.length; i++) {
            let item = this.registerItems[i]
            if (item.required && (!this.userInfo.options[item.key] || !this.userInfo.options[item.key].length)) {//必填时，为空
                res.status = false;
                res.message = item.name + '不能为空！';
                return res;
            }
            if (!item.required && !this.userInfo.options[item.key] || !this.userInfo.options[item.key].length) {//不是必填时，为空
                continue;
            }
            if (!this.userInfo.options[item.key].match(item.regex)) {//不为空时，做验证
                res.status = false;
                res.message = item.name + '格式不正确！';
                return res;
            }
        }
        res.status = true
        return res;
    }


    getValidataCodeURL() {
        let paramStr = 'webUniqueCode=' + initAppStore.deviceToken + '&&a=' + this.refreshValidateCodeTime
        return TCDefaultDomain + "/" + validataCodeUrl(paramStr);
    }

    _refreshValidateCode() {
        let refreshValidateCodeTime = JDHelper.getRandomChars(true, 15, 35)
        this.refreshValidateCodeTime = refreshValidateCodeTime
        this.validateRefresh = false;
    }
}