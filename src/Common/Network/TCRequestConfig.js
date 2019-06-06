import {
    configAppId,
    versionHotFix
} from '../../config/appConfig';


export const appVersion = '1.0.1';



export const baseUrl = {
    baseUrl: '/api/v1/'
};

export let headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'User-Agent': G_IS_IOS ? 'iphone' : 'android',
    ClientId: configAppId,
    AppVersion: appVersion,
    'Version-hotFix': versionHotFix
};

export const config = {

    api: {

        userInfo: 'account/webapi/account/users/current', //获取用户信息
        users: 'account/webapi/operate/users', //获取用户信息及余额



        checkIpInfo: 'update/checkIpInfo', //热更新开关
        gameSetting: 'adminsettings/user/prizeSettings', //获取游戏设定
        currentTime: 'result/service/mobile/results/currentTime',//获取当前时间

        getMessageStatus: 'cms/Message/playerMessagesStatus', //获取是否有新消息状态
       // getPromotionList: 'cms/internal/mobile/' + getClietnId() + '/promotionList', //获取优惠活动列表
        getHistoryList: 'result/service/mobile/results/today', //历史数据
        getBetHomeHistoryList: 'result/service/mobile/results/hist/', //下注页面历史数据
        getAllHistory: 'result/service/mobile/results/lastOpen', //开奖大厅
       // getCurrentResults: 'result/service/mobile/results/current/order/'+getClietnId(), //购彩大厅


        changePwd: 'account/webapi/account/users/change/password', //修改用户密码或取款密码
        encryptChangePwd: 'account/webapi/account/users/change/encryptPassword', //修改用户密码或取款密码加密接口
        updateRealName: 'account/webapi/account/users/updateRealName', //更新真实姓名
        register: 'account/webapi/account/users/userWebRegister', //用户注册
        validateCode:'account/webapi/account/validateCode/getValidatePic',//获取验证码
        userEncryptRegister: 'account/webapi/account/users/userWebEncryptRegister', // 用户注册加密接口
        encryptLogin: 'account//webapi/account/users/encryptLogin', //加密用户登录

        logout: 'account/account/system/logout', //用户登出
        refreshToken: 'account/account/system/refreshToken/', //刷新token
        register_info: 'account/webapi/account/users/register_info', //添加用户信息
        encryptRegisterInfo: 'account/webapi/account/users/encryptRegister_info', //添加用户信息加密
        registerSwitch: 'account/webapi/operate/users/new/registrySwitchs', //用户注册开关
        getuserCardsAndWithdrawInfo: 'cashmgt/me/cards/cardsAndWithdrawDetail', //获取银行卡和取款信息
        userCards: 'cashmgt/me/cards', //获取列表和添加银行卡
        banktransfers: 'cashmgt/me/transfer/topups/banktransfers/v2', //用户银行卡手工转账申请
        banktransfersQuery: 'cashmgt/me/transfer/topups/banktransfers/v2', //用户银行卡手工转账确认
        banktransfersQueryv3: 'cashmgt/me/transfer/topups/banktransfers/v4', //用户银行卡手工转账确认
        bankList: 'cashmgt/me/transfer/topups/banktransfers/banklist/v2', //获取用户银行卡转账列表
        userWithDraw: 'cashmgt/me/transfer/withdrawals', //用户申请取款
        getWithdrawSetting:'cashmgt/me/transfer/withdraw/settings', //获取用户提现设定

        encryptUserWithDraw: 'cashmgt/me/transfer/withdrawalsV2', //用户申请取款 加密接口
        paymentList: 'cashmgt/me/transfer/topups/payment/listV2', //获取用户的充值方式
        onlineTopUp: 'cashmgt/me/payments/settings/onlineTopup',//线上充值下限
        orderhistory: 'cashmgt/me/transfer/orderhistory', //获取订单历史记录
        otherPay: 'cashmgt/me/transfer/topups', //用户自动充值

        getbankList: 'cashmgt/me/cards/list', //用户绑卡银行卡列表
        //获取支付类型列表
        paymentTypeList4: 'cashmgt/me/payments/name',
        //获取网银支付的银行卡列表
        getPaymentBankList: 'cashmgt/me/paymentbanklist',

        ordercap: 'ordercap/me', //下订投注接口
        encryptOrdercap: 'ordercap/me/order', //下订单接口,加密订单内容
        cancelOrder: 'ordercap/me/cancel', //撤销订单

        orderRecord: 'orderdata/me/orders/findByState', //订单记录
        orderDetail: 'orderdata/me/orders/findByTimeuuid', //订单详情
        findTopWinners: 'orderdata/me/orders/findTopWinners',

        balanceByDate: 'balance/me/trans/byDate',//获取余额变动历史根据日期
        balanceHistory: 'balance/me/history', //获取余额变动历史
        userBalance: 'balance/me', //获取用户余额
        balanceHistoryV2: '/balance/me/balance/details', //余额变动历史
        applyWhite: 'ip/user/wl/apply', //玩家白名单申请


        getGuestId: 'account/webapi/account/users/preRegisterGuest', //获取试玩用户账号
        registerGuest: 'account/webapi/account/users/registerGuest', //注册试玩用户
        encryptRegisterGuest: 'account/webapi/account/users/encryptRegisterGuest', //试玩帐号加密注册

        userFeedback: 'cms/QA', //用户反馈
        getUserFeedbackList: 'cms/internal/playerListQa', //用户意见反馈列表

        getUserTeam: 'account/webapi/team/users/list', //获取团队
        agentBrokerageCalculation: 'balance/me/commissions/', //获取代理佣金统计列表
        agentCommissionsDetail: 'balance/me/commissions/details', //代理佣金详细列表

        //代理
        addUserPhoneNum:'account/webapi/account/users/',//add phone number


        redPacketCurrent: '/balance/me/hb/current', //查询当前红包活动
        drawHB: 'balance/me/hb/draw',// 抢红包
        quotaHB: 'balance/me/hb/quota',// 查询红包
        redPacketRank: 'balance/me/hb/rank', //红包排行榜
        redPacketDetails: 'balance/me/balance/hbdetails', //红包详情

        //体育相关
        getPlatform: "dsf/center/player/open/platform",//获取厅主开通的平台
        getPlatformBalance: "dsf/center/player/getBalance",//根据平台获取余额
        platformTransfer: "dsf/center/player/balance/transfer",//平台转账
        startGame: "dsf/center/player/mobile/startGame",//开始游戏
        userSheet: "dsf/center/player/statements/personal/total",//个人报表
        getAllBalance: "dsf/center/player/getAllBalance",//获取所有余额
        allBalanceTransferToCenter: "dsf/center/player/balance/allBalanceTransferToCenter",//一键转账
        userBets: "dsf/center/player/getBetLog",//用户下注记录
        transferRecords: "dsf/center/player/getTransfer",//转账记录


        //自己的游戏
        getInternalStartGame:"/cms/internal/startGame",//获取自己的游戏的链接

        //游戏客服
        gameCuest:"/api/v1/cms/internal/mobile/#0/otherSetting/pcCusService",

        //　获取下载以及分享数据
        gameShareDown:"/api/v1/gamecenter/player/brand/material/info?brand=#0"



    },
    map: {
        method: 'POST',
        headers: headers,
        follow: 20,
        timeout: 10000,
        size: 0
    },
    mapGet: {
        method: 'GET',
        headers: headers,
        follow: 20,
        timeout: 10000,
        size: 0
    },
    mapPut: {
        method: 'PUT',
        headers: headers,
        follow: 20,
        timeout: 10000,
        size: 0
    },
    mapDelete: {
        method: 'DELETE',
        headers: headers,
        follow: 20,
        timeout: 10000,
        size: 0
    }
};


// function  getClietnId(){
//
//         return TW_Store.appStore.clindId;
// }

export const UpDateHeadAppId =(newId)=> {
    headers.ClientId=newId;
    config.map.headers.ClientId=newId;
    config.mapGet.headers.ClientId=newId;
    config.mapPut.headers.ClientId=newId;
    config.mapDelete.headers.ClientId=newId;

};
