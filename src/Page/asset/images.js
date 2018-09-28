/**
 * Created by Sam on 18/04/2017.
 * Copyright © 2017年 JX. All rights reserved.
 */
//彩票默认图片
export const defaultCpIcon = require('../resouce/gameIcon/mo.png')
//彩种图标
export const gameIconKeyValue = {
    'HF_FFSSC': require('../resouce/gameIcon/ff_ssc.png'),
    'HF_LFSSC': require('../resouce/gameIcon/2f_ssc.png'),
    'HF_CQSSC': require('../resouce/gameIcon/cq_ssc.png'),
    'HF_TJSSC': require('../resouce/gameIcon/tj_ssc.png'),
    'HF_XJSSC': require('../resouce/gameIcon/xj_ssc.png'),

    'HF_FFPK10': require('../resouce/gameIcon/ff_pk10.png'),
    'HF_LFPK10': require('../resouce/gameIcon/2f_pk10.png'),
    'HF_BJPK10': require('../resouce/gameIcon/bj_pk10.png'),

    'MARK_SIX': require('../resouce/gameIcon/xg_lhc.png'),
    'HF_JSMS': require('../resouce/gameIcon/js_lhc.png'),

    'X3D': require('../resouce/gameIcon/fc_3d.png'),

    'HF_GDD11': require('../resouce/gameIcon/gd_115.png'),
    'HF_AHD11': require('../resouce/gameIcon/ah_115.png'),
    'HF_JXD11': require('../resouce/gameIcon/jx_115.png'),
    'HF_SDD11': require('../resouce/gameIcon/sd_115.png'),
    'HF_SHD11': require('../resouce/gameIcon/sh_115.png'),

    'HF_CQKL10F': require('../resouce/gameIcon/cq_kl10f.png'),
    'HF_TJKL10F': require('../resouce/gameIcon/tj_kl10f.png'),
    'HF_GDKL10F': require('../resouce/gameIcon/gd_kl10f.png'),

    'HF_JND28': require('../resouce/gameIcon/jnd_28.png'),
    'HF_SG28': require('../resouce/gameIcon/xjp_28.png'),
    'HF_BJ28': require('../resouce/gameIcon/bj_28.png'),
    'HF_LF28': require('../resouce/gameIcon/xy_28.png'),

    'HF_FFK3': require('../resouce/gameIcon/ff_k3.png'),
    'HF_BJK3': require('../resouce/gameIcon/bj_k3.png'),
    'HF_JLK3': require('../resouce/gameIcon/jl_k3.png'),
    'HF_JSK3': require('../resouce/gameIcon/js_k3.png'),
    'HF_GXK3': require('../resouce/gameIcon/gx_k3.png'),
    'HF_AHK3': require('../resouce/gameIcon/ah_k3.png'),
    'HF_LFK3': require('../resouce/gameIcon/2f_k3.png'),

    'HF_SHSSL': require('../resouce/gameIcon/sh_ssl.png'),
    'PL3': require('../resouce/gameIcon/pl_3.png'),
    'UNRECOGNIZED': require('../resouce/gameIcon/pc_dd.png'),
    'more': require('../resouce/gameIcon/more.png'),
    'HF_LFKLPK': require('../resouce/gameIcon/xy_pk.png'),
    'HF_XYFT': require('../resouce/gameIcon/xy_ft.png'),
    'HF_XYSM': require('../resouce/gameIcon/xy_sm.png'),
    'QXC':require('../resouce/gameIcon/qxc.png'),
    'HF_BJ5FC':require('../resouce/gameIcon/bj_5fc.png')
}

/**
 * 公共图片
 * @type {{topBg: *, topPersonal: *, back: *, topBarArrow: *, topBarList: *, topBarSudoku: *, bottomHomeNormal: *}}
 */
export const common = {
    topBg: require('../resouce/addon/other/top_bg_750.png'),
    topPersonal: require('../resouce/addon/other/index_personal.png'),
    back: require('../resouce/addon/other/top_bar_back.png'),
    topBarList: require('../resouce/addon/other/top_bar_list.png'),
    topBarSudoku: require('../resouce/addon/other/top_bar_sudoku.png'),
    iconNext: require('../resouce/addon/other/icon_next.png'),
    warn: require('../resouce/addon/other/warn.png'),
    close: require('../resouce/addon/other/close.png'),
    noData: require('../resouce/addon/other/no_data.png'),
    noNet: require('../resouce/addon/other/broken_network.png'),
    noPayData: require('../resouce/addon/other/pay_error.png'),
    select: require('../resouce/addon/other/bank_select.png'),
    unSelect: require('../resouce/addon/other/bank_select2.png'),
    downArrow: require('../resouce/addon/agentCenter/arrow.png'),
    backSpace: require('../resouce/addon/other/backspace.png'),
    topBarArrow: require('../resouce/addon/other/top_bar_arrow.png'),
    search: require('../resouce/addon/other/search.png'),
}

/**
 * 主页图标
 * @type {{indexHomeNormal: *, indexHomePressed: *}}
 */
export const home = {
    indexHomeNormal: require('../resouce/homeIcon/index_home.png'),
    indexHomePressed: require('../resouce/homeIcon/index_home_pressed.png'),
    indexPromotionNormal: require('../resouce/homeIcon/index_promotion.png'),
    indexPromotionPressed: require('../resouce/homeIcon/index_promotion_pressed.png'),
    indexShoppingNormal: require('../resouce/homeIcon/index_shopping.png'),
    indexShoppingPressed: require('../resouce/homeIcon/index_shopping_pressed.png'),
    indexLotteryNormal: require('../resouce/homeIcon/index_lottery.png'),
    indexLotteryPressed: require('../resouce/homeIcon/index_lottery_pressed.png'),
    indexTrendNormal: require('../resouce/homeIcon/index_trend.png'),
    indexTrendPressed: require('../resouce/homeIcon/index_trend_pressed.png'),
    indexMineNormal: require('../resouce/homeIcon/index_mine.png'),
    indexMinePressed: require('../resouce/homeIcon/index_mine_pressed.png'),
    indexAccess: require('../resouce/homeIcon/index_access.png'),
    indexKefu: require('../resouce/homeIcon/index_kefu.png'),
    indexOrder: require('../resouce/homeIcon/index_order.png'),
    indexYouhui: require('../resouce/homeIcon/index_youhui.png'),
    indexNotice: require('../resouce/homeIcon/index_notice.png'),
}

export const homeMenu = {
    'TOPUP': home.indexAccess,
    'ORDER': home.indexOrder,
    'PROMOTION': home.indexYouhui,
    'CUS_SERVICE': home.indexKefu
}


//个人中心
export const personal = {
    userDefaultIcon: require('../resouce/addon/userCenterIcon/user_default_icon.png'),
    userDefaultLocalIcon: 'user_default_icon',
    userCenterBg: require('../resouce/addon/userCenterIcon/usercenter_default_background.png'),
    userBarTool: require('../resouce/addon/userCenterIcon/top_bar_tools.png'),
    imgEye: require('../resouce/addon/userCenterIcon/icon_eye.png'),
    imgEye2: require('../resouce/addon/userCenterIcon/icon_eye2.png'),
    iconPay: require('../resouce/addon/userCenterIcon/icon_pay.png'),
    iconDraw: require('../resouce/addon/userCenterIcon/icon_drawings.png'),
    iconTransfer: require('../resouce/addon/userCenterIcon/icon_transfer.png'),
    transfer: require('../resouce/addon/userCenterIcon/icon_drawings.png'),
    imgNext: common.iconNext,
    daiKaiJjiangIcon: require('../resouce/addon/userCenterIcon/dai.png'),
    jiangliIcon: require('../resouce/addon/userCenterIcon/jiangli.png'),
    yiKaiJiangIcon: require('../resouce/addon/userCenterIcon/dingdan.png'),
    personalInfo: require('../resouce/addon/userCenterIcon/personal_info.png'),
    secure: require('../resouce/addon/userCenterIcon/secure.png'),
    account: require('../resouce/addon/userCenterIcon/account.png'),
    agent: require('../resouce/addon/agentCenter/group.png'),
    message: require('../resouce/addon/userCenterIcon/person_news.png'),
    collect: require('../resouce/addon/userCenterIcon/shoucang.png'),
    imgSet: require('../resouce/addon/userCenterIcon/set.png'),
    toolUpdate: require('../resouce/addon/userCenterIcon/tool_update.png'),
    toolAbout: require('../resouce/addon/userCenterIcon/tool_about.png'),
    toolFeedBack: require('../resouce/addon/userCenterIcon/feedback.png'),
    toolMusic: require('../resouce/addon/userCenterIcon/tool_music.png'),
    toolPassword: require('../resouce/addon/userCenterIcon/tools_password.png'),
    toolPassword2: require('../resouce/addon/userCenterIcon/tools_password2.png'),
    bankManager: require('../resouce/addon/userCenterIcon/bank_manage.png'),
    payRecord: require('../resouce/addon/userCenterIcon/pay_records.png'),
    withDraw: require('../resouce/addon/userCenterIcon/withdraw_withdraw.png'),
    username: require('../resouce/addon/userCenterIcon/user.png'),
    password: require('../resouce/addon/userCenterIcon/password.png'),
    affCode: require('../resouce/addon/userCenterIcon/affcode.png'),
    check: require('../resouce/addon/userCenterIcon/icon_checked.png'),
    unCheck: require('../resouce/addon/userCenterIcon/icon_uncheck.png'),
    signIn: require('../resouce/addon/userCenterIcon/signIn.png'),
    email: require('../resouce/addon/userRegister/email.png'),
    identityNumber: require('../resouce/addon/userRegister/identity_number.png'),
    phoneNumber: require('../resouce/addon/userRegister/phone_number.png'),
    QQ: require('../resouce/addon/userRegister/qq.png'),
    validateCode: require('../resouce/addon/userRegister/validate_code.png'),
    tzRecord: require('../resouce/addon/userCenterIcon/tz_record.png'),
    ctRecord: require('../resouce/addon/userCenterIcon/ct_record.png'),
    userSheet: require('../resouce/addon/userCenterIcon/user_sheet.png'),
    userManager: require('../resouce/addon/userCenterIcon/user_manager.png'),
    agentCommission: require('../resouce/addon/userCenterIcon/agent_commission.png'),
    teamSheet: require('../resouce/addon/userCenterIcon/team_sheet.png'),
    onlineServicer: require('../resouce/addon/userCenterIcon/service.png'),
    more: require('../resouce/addon/userCenterIcon/agent_more.png'),
    shareFriends: require('../resouce/addon/userCenterIcon/invite_friends.png'),
    promotions: require('../resouce/addon/userCenterIcon/promotions.png'),
}


//用户充值
export const userPay = {
    noPayData: common.noPayData,
    qqPay: require('../resouce/addon/other/qq_pay.png'),
    thirdPay: require('../resouce/addon/other/third_pay.png'),
    wechat: require('../resouce/addon/other/wechat.png'),
    alipay: require('../resouce/addon/other/alipay.png'),
    bank: require('../resouce/addon/other/bank.png'),
    jdzf: require('../resouce/addon/other/jdzf.png'),
    userAlipayHelp01: require('../resouce/addon/other/alipay01.png'),
    userAlipayHelp02: require('../resouce/addon/other/alipay02.png'),
    userWechatPayHelper02: require('../resouce/addon/other/wechat02.png'),
    userAlipayHelp03: require('../resouce/addon/other/alipay03.png'),
    userWechatPayHelper03: require('../resouce/addon/other/wechat03.png'),
    userAlipayHelp04: require('../resouce/addon/other/alipay04.png'),
    userWechatPayHelper04: require('../resouce/addon/other/wechat04.png'),
    paidui01: common.select,
    paidui02: require('../resouce/addon/other/paidui22.png'),
    paidui03: require('../resouce/addon/other/win.png'),
    step1: require('./pay_step/step_1.png'),
    step3: require('./pay_step/step_3.png'),
    step4: require('./pay_step/step_4.png'),
    step5: require('./pay_step/step_5.png'),
    step6: require('./pay_step/step_6.png'),
    step7: require('./pay_step/step_7.png'),
    step8: require('./pay_step/step_8.png'),
    step9: require('./pay_step/step_9.png'),
    stepWx3: require('./pay_step/wx_step_3.png'),
    stepWx4: require('./pay_step/wx_step_4.png'),
    payTypeWx: require('./pay_icon/wx.png'),
    payTypeAlipay: require('./pay_icon/alipay.png'),
    payTypeJdzf: require('./pay_icon/jdzf.png'),
    payTypeUnionpay: require('./pay_icon/wy.png'),
    payTypeOther: require('./pay_icon/unionpay.png'),
    payTypeBank: require('./pay_icon/bank.png')
}

//代理中心
export const agent = {
    headAgent: require('../resouce/addon/agentCenter/head_agent.png'),
    headAgentOn: require('../resouce/addon/agentCenter/head_agent_on.png'),
    headPlayer: require('../resouce/addon/agentCenter/head_player.png'),
    headPlayerOn: require('../resouce/addon/agentCenter/head_player_on.png'),
    type: require('../resouce/addon/agentCenter/type.png'),
    typeOn: require('../resouce/addon/agentCenter/type_on.png'),
    arrow: common.downArrow,
    agentSubordinate: require('../resouce/addon/agentCenter/icon_subordinate.png'),
    agentSubordinateGray: require('../resouce/addon/agentCenter/icon_subordinate_gray.png'),
    agentlitre: require('../resouce/addon/agentCenter/icon_litre.png'),
    agentLitreGray: require('../resouce/addon/agentCenter/icon_litre_gray.png'),
    agentTransfer: require('../resouce/addon/agentCenter/icon_transfer.png'),
    agentTransferGray: require('../resouce/addon/agentCenter/icon_transfer_gray.png'),
    agentDetail: require('../resouce/addon/agentCenter/icon_detail.png'),
    agentDetailGray: require('../resouce/addon/agentCenter/icon_detail_gray.png'),
    agentCommission: require('../resouce/addon/agentCenter/commission.png'),
    agentBettingMoney: require('../resouce/addon/agentCenter/bettingmoney.png'),
    banner: require('../resouce/addon/agentCenter/banner.png'),
    shut:require('../resouce/addon/agentCenter/shut.png'),
    close: require('../resouce/addon/other/buttonClose.png'),
    swipe_right: require('../resouce/addon/other/swipe_right.png'),
    // userLayer1: require('./addon/agentCenter/daili_cengji_next1.png'),
    // userLayer2: require('./addon/agentCenter/daili_cengji_next2.png')

}

//投注页面
export const betIcon = {
    bgPlace: require('../resouce/addon/other/bg_place.png'),
    bgPlace02: require('../resouce/addon/other/bg_place02.png'),
    back: require('../resouce/addon/other/fanhui2.png'),
    handPointing: require('../resouce/addon/other/hand_pointing.png'),
    topBg: require('../resouce/addon/other/top_bg.png'),
    shake: require('../resouce/addon/other/icon_shake.png'),
    explain: require('../resouce/addon/other/explain.png'),
    check: personal.check,
    unCheck: personal.unCheck,
    orderTop: require('../resouce/addon/other/order_top.png'),
    orderBottom: require('../resouce/addon/other/order_bottom.png'),
    orderQingChu: require('../resouce/addon/other/icon_qingchu.png'),
    success: common.select,
    redCheck: require('../resouce/addon/other/red_check.png'),
}

export const IntelligenceBet = {
    'add': require('../resouce/addon/other/jia.png'),
    'subtract': require('../resouce/addon/other/jian.png')
}

//快3
export const k3 = {
    'dice1': require('../resouce/addon/newLottery/k3/dice1.png'),
    'dice2': require('../resouce/addon/newLottery/k3/dice2.png'),
    'dice3': require('../resouce/addon/newLottery/k3/dice3.png'),
    'dice4': require('../resouce/addon/newLottery/k3/dice4.png'),
    'dice5': require('../resouce/addon/newLottery/k3/dice5.png'),
    'dice6': require('../resouce/addon/newLottery/k3/dice6.png'),
}

//幸运扑克
export const xypk = {
    black: require('../resouce/addon/newLottery/xypk/pk_top_heitao.png'),
    red: require('../resouce/addon/newLottery/xypk/pk_top_taoxin.png'),
    flower: require('../resouce/addon/newLottery/xypk/pk_top_meihua.png'),
    fk: require('../resouce/addon/newLottery/xypk/pk_top_fangkuai.png'),
    blackHistory: require('../resouce/addon/newLottery/xypk/pk_buttom_heitao.png'),
    redHistory: require('../resouce/addon/newLottery/xypk/pk_buttom_taoxin.png'),
    flowerHistory: require('../resouce/addon/newLottery/xypk/pk_buttom_meihua.png'),
    fkHistory: require('../resouce/addon/newLottery/xypk/pk_buttom_fangkuai.png'),
    waitLottery: require('../resouce/addon/newLottery/xypk/pk_moren.png'),
    bxIcon: {
        'icon0': require('../resouce/addon/newLottery/xypk/pk_duizi.png'),
        'icon1': require('../resouce/addon/newLottery/xypk/pk_baozi.png'),
        'icon2': require('../resouce/addon/newLottery/xypk/pk_tonghua.png'),
        'icon3': require('../resouce/addon/newLottery/xypk/pk_shunzi.png'),
        'icon4': require('../resouce/addon/newLottery/xypk/pk_tonghuashun.png')
    },
    thdxIcon: {
        'icon0': require('../resouce/addon/newLottery/xypk/pk_center_heitao.png'),
        'icon1': require('../resouce/addon/newLottery/xypk/pk_center_taoxin.png'),
        'icon2': require('../resouce/addon/newLottery/xypk/pk_center_meihua.png'),
        'icon3': require('../resouce/addon/newLottery/xypk/pk_center_fangkuai.png'),
    },
    szdxIcon: {
        'icon0': require('../resouce/addon/newLottery/xypk/pk_123.png'),
        'icon1': require('../resouce/addon/newLottery/xypk/pk_234.png'),
        'icon2': require('../resouce/addon/newLottery/xypk/pk_345.png'),
        'icon3': require('../resouce/addon/newLottery/xypk/pk_456.png'),
        'icon4': require('../resouce/addon/newLottery/xypk/pk_567.png'),
        'icon5': require('../resouce/addon/newLottery/xypk/pk_678.png'),
        'icon6': require('../resouce/addon/newLottery/xypk/pk_789.png'),
        'icon7': require('../resouce/addon/newLottery/xypk/pk_8910.png'),
        'icon8': require('../resouce/addon/newLottery/xypk/pk_910j.png'),
        'icon9': require('../resouce/addon/newLottery/xypk/pk_10jq.png'),
        'icon10': require('../resouce/addon/newLottery/xypk/pk_jqk.png'),
        'icon11': require('../resouce/addon/newLottery/xypk/pk_qka.png'),
    },
    thsdxIcon: {
        'icon0': require('../resouce/addon/newLottery/xypk/pk_heitao_shunzi.png'),
        'icon1': require('../resouce/addon/newLottery/xypk/pk_taoxin_shunzi.png'),
        'icon2': require('../resouce/addon/newLottery/xypk/pk_meihua_shunzi.png'),
        'icon3': require('../resouce/addon/newLottery/xypk/pk_fangkuai_shunzi.png'),
    },
    bzdxIcon: {
        'icon0': require('../resouce/addon/newLottery/xypk/pk_aaa.png'),
        'icon1': require('../resouce/addon/newLottery/xypk/pk_222.png'),
        'icon2': require('../resouce/addon/newLottery/xypk/pk_333.png'),
        'icon3': require('../resouce/addon/newLottery/xypk/pk_444.png'),
        'icon4': require('../resouce/addon/newLottery/xypk/pk_555.png'),
        'icon5': require('../resouce/addon/newLottery/xypk/pk_666.png'),
        'icon6': require('../resouce/addon/newLottery/xypk/pk_777.png'),
        'icon7': require('../resouce/addon/newLottery/xypk/pk_888.png'),
        'icon8': require('../resouce/addon/newLottery/xypk/pk_999.png'),
        'icon9': require('../resouce/addon/newLottery/xypk/pk_101010.png'),
        'icon10': require('../resouce/addon/newLottery/xypk/pk_jjj.png'),
        'icon11': require('../resouce/addon/newLottery/xypk/pk_qqq.png'),
        'icon12': require('../resouce/addon/newLottery/xypk/pk_kkk.png'),
    },
    dzdxIcon: {
        'icon0': require('../resouce/addon/newLottery/xypk/pk_aa.png'),
        'icon1': require('../resouce/addon/newLottery/xypk/pk_22.png'),
        'icon2': require('../resouce/addon/newLottery/xypk/pk_33.png'),
        'icon3': require('../resouce/addon/newLottery/xypk/pk_44.png'),
        'icon4': require('../resouce/addon/newLottery/xypk/pk_55.png'),
        'icon5': require('../resouce/addon/newLottery/xypk/pk_66.png'),
        'icon6': require('../resouce/addon/newLottery/xypk/pk_77.png'),
        'icon7': require('../resouce/addon/newLottery/xypk/pk_88.png'),
        'icon8': require('../resouce/addon/newLottery/xypk/pk_99.png'),
        'icon9': require('../resouce/addon/newLottery/xypk/pk_1010.png'),
        'icon10': require('../resouce/addon/newLottery/xypk/pk_jj.png'),
        'icon11': require('../resouce/addon/newLottery/xypk/pk_qq.png'),
        'icon12': require('../resouce/addon/newLottery/xypk/pk_kk.png'),
    }, dxIcon: {
        'icon0': require('../resouce/addon/newLottery/xypk/pk_a.png'),
        'icon1': require('../resouce/addon/newLottery/xypk/pk_2.png'),
        'icon2': require('../resouce/addon/newLottery/xypk/pk_3.png'),
        'icon3': require('../resouce/addon/newLottery/xypk/pk_4.png'),
        'icon4': require('../resouce/addon/newLottery/xypk/pk_5.png'),
        'icon5': require('../resouce/addon/newLottery/xypk/pk_6.png'),
        'icon6': require('../resouce/addon/newLottery/xypk/pk_7.png'),
        'icon7': require('../resouce/addon/newLottery/xypk/pk_8.png'),
        'icon8': require('../resouce/addon/newLottery/xypk/pk_9.png'),
        'icon9': require('../resouce/addon/newLottery/xypk/pk_10.png'),
        'icon10': require('../resouce/addon/newLottery/xypk/pk_j.png'),
        'icon11': require('../resouce/addon/newLottery/xypk/pk_q.png'),
        'icon12': require('../resouce/addon/newLottery/xypk/pk_k.png'),
    }


}

//账变明细
export const userAccount = {
    calendar: require('../resouce/addon/userAccount/calendar.png'),
    calendarDropDown: require('../resouce/addon/userAccount/calendar_drop_down.png'),
    dayAfter: require('../resouce/addon/userAccount/day_after.png'),
    dayBefore: require('../resouce/addon/userAccount/day_before.png')
}

// 邀请好友
export const inviteFriends = {
    inviteLogo: require('./share/ic_invite_logo.png'),
    inviteStep1: require('./share/ic_invite_step_1.png'),
    inviteStep2: require('./share/ic_invite_step_2.png'),
    inviteStep3: require('./share/ic_invite_step_3.png'),
    bgQRCode: require('./share/bg_share_qrcode.png'),
    wechat: require('./share/ic_wechat_white.png')
}
