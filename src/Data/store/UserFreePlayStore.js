import userStore from './UserStore'
import {getGuestUserName} from '../../Common/Network/TCRequestService'
import {action} from 'mobx'

export default class UserFreePlayStore {

    constructor() {
    }


    @action
    getGuestUserName(callback) {
        getGuestUserName((res) => {
            if (res.rs) {
                if (res.content && res.content.username) {
                    userStore.userName = res.content.username.toLocaleLowerCase();
                    res.status = true;
                    callback(res);
                    return;
                } else {
                    res.status = false;
                    res.message = "服务器出错，获取账号失败!"
                    callback(res);
                    return;
                }
            } else {
                res.status = false;
                res.message = "服务器出错，请稍后再试!"
                callback(res);
                return;
            }
        })
    }

    loginVal(callback) {
        let res = {}
        if (!userStore.password.length) {
            res.status = false;
            res.message = "请输入密码";
            callback(res);
            return;
        }
        let rep = /^[0-9A-Za-z]{6,15}$/
        if (!userStore.password.match(rep)) {
            res.status = false;
            res.message = "密码格式错误(6-15位数字或字母)";
            callback(res);
            return;
        }
        userStore.guestRegister(callback);
    }
}