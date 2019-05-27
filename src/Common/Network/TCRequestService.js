/**
 * Created by allen-jx on 2018/3/30.
 */
import RequestUtils from './TCRequestUitls'
import {appId, config,baseUrl} from './TCRequestConfig'

/**
 * 获取首页接口
 * @param callback
 */
export function getContent(callback) {
    RequestUtils.getUrlAndParamsAndCallback(config.api.getHome, null, callback)
}

/**
 * 获取游戏设置
 * @param params
 * @param callback
 */
export function getGameSetting(params, callback) {
    RequestUtils.getUrlAndParamsAndCallback(config.api.gameSetting, params, callback);
}

/**
 * 获取排行榜单
 * @param params
 * @param callback
 */
export function getTopWinners(params, callback) {
    RequestUtils.getUrlAndParamsAndCallback(config.api.findTopWinners, params, callback);
}

/**
 * 用户登录接口
 * @param param
 * @param callback
 */
export function userLogin(params, callback) {
    RequestUtils.postUrlAndParamsAndCallback(config.api.encryptLogin, params, callback, null, true);
}

/**
 * 用户登出接口
 */
export function userLogOut(callback) {
    RequestUtils.getUrlAndParamsAndCallback(config.api.logout, null, callback);
}

/**
 * 用户注册接口
 * @param params
 * @param callback
 */
export function userRegister(params, callback) {
    RequestUtils.postUrlAndParamsAndCallback(config.api.userEncryptRegister, params, callback, null, true);
}

/**
 * 获取注册项
 */
export function registerItem(callback) {
    RequestUtils.getUrlAndParamsAndCallback(config.api.registerSwitch, null, callback, null, true);
}

/**
 * 获取验证码图片地址
 * @param paramStr
 * @returns {string}
 */
export function validataCodeUrl(paramStr) {
    let url = baseUrl.baseUrl+config.api.validateCode + "?" + paramStr;
    return url;
}

/**
 * 查询签到
 * @param callback
 */
export function signInData(callback) {
    RequestUtils.getUrlAndParamsAndCallback(config.api.signIn, null, callback);
}

/**
 * 签到
 */
export function singin(callback) {
    RequestUtils.postUrlAndParamsAndCallback(config.api.signIn, null, callback);
}

/**
 * 获取游客用户名
 */
export function getGuestUserName(callback) {
    RequestUtils.postUrlAndParamsAndCallback(config.api.getGuestId, null, callback, null, true);
}

/**
 * 试玩账号注册
 * @param params
 * @param callback
 */
export function guestRegister(params, callback) {
    RequestUtils.postUrlAndParamsAndCallback(config.api.encryptRegisterGuest, params, callback, null, true);
}

/**
 * 获取余额
 * @param callback
 */
export function getBalance(callback) {
    RequestUtils.getUrlAndParamsAndCallback(config.api.userBalance, null, callback);
}

/**
 * 获取余额和用户信息
 */
export function getBalaceAndUserInfo(callback) {
    RequestUtils.getUrlAndParamsAndCallback(config.api.users, null, callback);
}

/**
 * 获取用户信息
 */
export function getUserInfo(callback) {
    RequestUtils.getUrlAndParamsAndCallback(config.api.userInfo, null, callback);
}

/**
 * 检测版本更新（android）
 * @param callback
 */
export function checkAppVersion(callback) {
    RequestUtils.getUrlAndParamsAndCallback(config.api.updateVersion, null, callback)
}

/**
 * 修改用户真实姓名
 */
export function modifyUserRealName(paramStr, callback) {
    RequestUtils.putUrlAndParamsAndCallback(config.api.updateRealName + "?realName=" + paramStr, null, callback);
}

/**
 * 获取银行卡列表
 * @param callback
 */
export function getBankList(callback) {
    RequestUtils.getUrlAndParamsAndCallback(config.api.getbankList, null, callback)
}


/**
 * 根据银行卡号查询银行名称
 * @param accountNum
 * @param callback
 */
export function getBankNameFromServer(accountNum,callback) {
    RequestUtils.getOtherServerUrlAndCallback("https://ccdcapi.alipay.com/validateAndCacheCardInfo.json?cardNo=" + accountNum + '&cardBinCheck=true',5000,{
        'Cache-Control': 'no-cache',
        'Accept': 'application/json'
    },callback)
}



/**
 * 添加银行卡
 * @param params
 * @param callback
 */
export function addBank(params, callback) {
    RequestUtils.putUrlAndParamsAndCallback(config.api.encryptRegisterInfo, params, callback);

}

/**
 * 添加手机号
 * @param params
 * @param callback
 */
export function addPhoneNumber(params, callback) {
    RequestUtils.putUrlAndParamsAndCallback(config.api.addUserPhoneNum, params, callback);


}

/**
 * 获取用户银行卡信息
 * @param callback
 */
export function getUserBank(callback) {
    RequestUtils.getUrlAndParamsAndCallback(config.api.userCards, null, callback);

}

/**
 * 修改登录密码
 * @param params
 * @param callback
 */
export function modifyPwd(params, callback) {
    RequestUtils.postUrlAndParamsAndCallback(config.api.encryptChangePwd, params, callback);
}

/**
 * 获取消息列表
 * @param params
 * @param callback
 */
export function getMessageList(params, callback) {
    RequestUtils.getUrlAndParamsAndCallback(config.api.getMessageList, params, callback);
}

/**
 * 获取消息状态
 * @param params
 * @param callback
 */
export function getMessageStatus(params, callback) {
    RequestUtils.getUrlAndParamsAndCallback(config.api.getMessageStatus, params, callback);
}

/**
 * 获取意见反馈列表
 */
export function getFeedBackList(params, callback) {
    RequestUtils.getUrlAndParamsAndCallback(config.api.getUserFeedbackList, params, callback);
}

/**
 * 添加意见反馈
 * @param params
 * @param callback
 */
export function addFeedBack(params, callback) {
    RequestUtils.postUrlAndParamsAndCallback(config.api.userFeedback, params, callback);
}

/**
 * 获取支付类型列表
 * @param callback
 */
export function getPaymentTypeList(callback) {
    RequestUtils.getUrlAndParamsAndCallback(config.api.paymentTypeList4, {version:5}, callback);
}

/**
 * 获取在线充值额度
 * @param callback
 */
export function getOnlineTopUp(callback) {
    RequestUtils.getUrlAndParamsAndCallback(config.api.onlineTopUp, null, callback);
}

/**
 * 获取银行转账的银行卡列表
 * @param params
 * @param callback
 */
export function getPayBankList(params, callback) {
    RequestUtils.getUrlAndParamsAndCallback(config.api.bankList, params, callback);
}

/**
 * 获取支付列表
 * @param callback
 */
export function getPaymentList(callback) {
    RequestUtils.getUrlAndParamsAndCallback(config.api.paymentList, null, callback);
}

/**
 * 获取第三方支付银行卡列表
 * @param params
 * @param callback
 */
export function getPaymentBankList(params, callback) {
    RequestUtils.getUrlAndParamsAndCallback(config.api.getPaymentBankList, params, callback);
}

/**
 * 银行卡转账申请
 * @param params
 * @param callback
 */
export function bankApplyFor(params, callback) {
    RequestUtils.postUrlAndParamsAndCallback(config.api.banktransfers, params, callback);
}

/**
 * 申请其他支付
 * @param params
 * @param callback
 */
export function applayOtherPay(params, callback) {
    RequestUtils.postUrlAndParamsAndCallback(config.api.otherPay, params, callback);
}

/**
 * 银行卡转账确认
 * @param params
 * @param callback
 */
export function banktransfersQuery(params, callback) {
    RequestUtils.putUrlAndParamsAndCallback(config.api.banktransfersQueryv3, params, callback);
}

/**
 * 刷新二维码
 * @param bankId
 * @param params
 * @param callback
 */
export function refreshCode(bankId, callback) {
    RequestUtils.getUrlAndParamsAndCallback(config.api.bankList + "/" + bankId, {id: appId}, callback);
}

/**
 * 申请白名单
 * @param callback
 */
export function applyWhite(callback) {
    RequestUtils.postUrlAndParamsAndCallback(config.api.applyWhite, null, callback);
}

/**
 * 账变明细
 * @param params
 * @param callback
 */
export function balanceHistory(params, callback) {
    RequestUtils.postUrlAndParamsAndCallback(config.api.balanceByDate, params, callback);
}

/**
 * 充提订单记录
 * @param params
 * @param callback
 */
export function payAndWithdrawHistory(params, callback) {
    RequestUtils.getUrlAndParamsAndCallback(config.api.orderhistory, params, callback);
}

/**
 * 转账记录
 * @param params
 * @param callback
 */
export function transferRecords(params, callback) {
    RequestUtils.getUrlAndParamsAndCallback(config.api.transferRecords, params, callback);
}

/**
 * 获取银行卡信息和取款信息
 * @param callback
 */
export function getUserCardsAndWithdrawInfo(callback) {
    RequestUtils.getUrlAndParamsAndCallback(config.api.getuserCardsAndWithdrawInfo, null, callback);
}

/**
 * 申请提款
 * @param params
 * @param callback
 */
export function applyWithdraw(params, callback) {
    RequestUtils.postUrlAndParamsAndCallback(config.api.encryptUserWithDraw, params, callback);
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//代理相关
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * 获取个人报表
 * @param params
 * @param callback
 */
export function getUserSheetsData(isUserSheet,params, callback) {
    RequestUtils.PostUrlAndParamsAndCallback(isUserSheet?config.api.getUserSheets:config.api.getGroupSheets, params, callback);
}



///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//体育相关
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * 获取厅主开通的平台
 * @param params
 * @param callback
 */
export function getPlatform(params, callback) {
    RequestUtils.getUrlAndParamsAndCallback(config.api.getPlatform, params, callback);
}

/**
 * 获取平台余额
 * @param params
 * @param callback
 */
export function getPlatformBalance(params, callback) {
    RequestUtils.getUrlAndParamsAndPlatformAndCallback(config.api.getPlatformBalance, params, null, callback);
}

/**
 * 平台转账
 * @param platform
 * @param params
 * @param callback
 */
export function platformTransfer(platform, params, callback) {
    RequestUtils.putUrlAndParamsAndAndPlatformAndCallback(config.api.platformTransfer, platform, params, callback);
}

/**
 * 启动游戏
 * @param platform
 * @param params
 * @param callback
 */
export function startGame(platform, params, callback) {
    RequestUtils.getUrlAndParamsAndPlatformAndCallback(config.api.startGame, platform, params, callback);
}

/**
 * 获取个人报表
 * @param platform
 * @param params
 * @param callback
 */
export function getUserSheet(platform, params, callback) {
    RequestUtils.getUrlAndParamsAndPlatformAndCallback(config.api.userSheet, platform, params, callback);
}

/**
 * 获取所有余额
 * @param callback
 */
export function getAllBalance(params, callback) {
    RequestUtils.getUrlAndParamsAndCallback(config.api.getAllBalance, params, callback);
}

/**
 * 一键转账
 * @param params
 * @param callback
 */
export function allBalanceTransferToCenter(params, callback) {
    RequestUtils.putUrlAndParamsAndCallback(config.api.allBalanceTransferToCenter, params, callback);
}

/**
 * 用户下注记录
 * @param params
 * @param callback
 */
export function userBetsRecords(platform, params, callback) {
    RequestUtils.getUrlAndParamsAndPlatformAndCallback(config.api.userBets, platform, params, callback);
}

/////////////////////////////////收藏//////////////////////////////////////////////////////

/**
 * 获取收藏列表
 * @param callback
 */
export function getUserCollects(callback) {
    RequestUtils.getUrlAndParamsAndCallback(config.api.getBookmarks, null, callback);
}

/**
 * 收藏彩票
 * @param params
 * @param callback
 */
export function saveUserCollects(params, callback) {
    RequestUtils.postUrlAndParamsAndCallback(config.api.saveBookmarks, params, callback);
}

/**
 * 取消收藏
 * @param params
 * @param callback
 */
export function cancelUserCollects(params, callback) {
    RequestUtils.deleteUrlAndParamsAndCallback(config.api.delBookmarks, params, callback);
}
