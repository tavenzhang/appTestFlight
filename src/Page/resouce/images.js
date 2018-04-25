/**
 * Created by Sam on 18/04/2017.
 * Copyright © 2017年 JX. All rights reserved.
 */
//彩票默认图片
export const defaultCpIcon = require('./gameIcon/mo.png')
//彩种图标
export const gameIconKeyValue = {
    'HF_FFSSC': require('./gameIcon/ff_ssc.png'),
    'HF_LFSSC': require('./gameIcon/2f_ssc.png'),
    'HF_CQSSC': require('./gameIcon/cq_ssc.png'),
    'HF_TJSSC': require('./gameIcon/tj_ssc.png'),
    'HF_XJSSC': require('./gameIcon/xj_ssc.png'),

    'HF_FFPK10': require('./gameIcon/ff_pk10.png'),
    'HF_LFPK10': require('./gameIcon/2f_pk10.png'),
    'HF_BJPK10': require('./gameIcon/bj_pk10.png'),

    'MARK_SIX': require('./gameIcon/xg_lhc.png'),
    'HF_JSMS': require('./gameIcon/js_lhc.png'),

    'X3D': require('./gameIcon/fc_3d.png'),

    'HF_GDD11': require('./gameIcon/gd_115.png'),
    'HF_AHD11': require('./gameIcon/ah_115.png'),
    'HF_JXD11': require('./gameIcon/jx_115.png'),
    'HF_SDD11': require('./gameIcon/sd_115.png'),
    'HF_SHD11': require('./gameIcon/sh_115.png'),

    'HF_CQKL10F': require('./gameIcon/cq_kl10f.png'),
    'HF_TJKL10F': require('./gameIcon/tj_kl10f.png'),
    'HF_GDKL10F': require('./gameIcon/gd_kl10f.png'),

    'HF_JND28': require('./gameIcon/jnd_28.png'),
    'HF_SG28': require('./gameIcon/xjp_28.png'),
    'HF_BJ28': require('./gameIcon/bj_28.png'),
    'HF_LF28': require('./gameIcon/xy_28.png'),

    'HF_FFK3': require('./gameIcon/ff_k3.png'),
    'HF_BJK3': require('./gameIcon/bj_k3.png'),
    'HF_JLK3': require('./gameIcon/jl_k3.png'),
    'HF_JSK3': require('./gameIcon/js_k3.png'),
    'HF_GXK3': require('./gameIcon/gx_k3.png'),
    'HF_AHK3': require('./gameIcon/ah_k3.png'),
    'HF_LFK3': require('./gameIcon/2f_k3.png'),

    'HF_SHSSL': require('./gameIcon/sh_ssl.png'),
    'PL3': require('./gameIcon/pl_3.png'),
    'UNRECOGNIZED': require('./gameIcon/pc_dd.png'),
    'more': require('./gameIcon/more.png'),
    'HF_LFKLPK': require('./gameIcon/xy_pk.png'),
    'HF_XYFT': require('./gameIcon/xy_ft.png'),
    'HF_XYSM': require('./gameIcon/xy_sm.png'),
    'QXC':require('./gameIcon/qxc.png'),
    'HF_BJ5FC':require('./gameIcon/bj_5fc.png')
}

/**
 * 公共图片
 * @type {{topBg: *, topPersonal: *, back: *, topBarArrow: *, topBarList: *, topBarSudoku: *, bottomHomeNormal: *}}
 */
export const common = {
    // topBg: require('./addon/other/top_bg_750.png'),
    // topPersonal: require('./addon/other/index_personal.png'),
    // back: require('./addon/other/top_bar_back.png'),
    // topBarList: require('./addon/other/top_bar_list.png'),
    // topBarSudoku: require('./addon/other/top_bar_sudoku.png'),
    // iconNext: require('./addon/other/icon_next.png'),
    // warn: require('image!warn'),
    // close: require('image!close'),
    // noData: require('./addon/other/no_data.png'),
    // noNet: require('./addon/other/broken_network.png'),
    // noPayData: require('./addon/other/pay_error.png'),
    // select: require('image!bank_select'),
    // unSelect: require('image!bank_select2'),
    // downArrow: require('./addon/agentCenter/arrow.png'),
    // backSpace: require('./addon/other/backspace.png'),
    // topBarArrow: require('image!top_bar_arrow'),
    search: require('./addon/other/search.png'),
}

/**
 * 主页图标
 * @type {{indexHomeNormal: *, indexHomePressed: *}}
 */
export const home = {
    indexHomeNormal: require('./homeIcon/index_home.png'),
    indexHomePressed: require('./homeIcon/index_home_pressed.png'),
    indexShoppingNormal: require('./homeIcon/index_shopping.png'),
    indexShoppingPressed: require('./homeIcon/index_shopping_pressed.png'),
    indexLotteryNormal: require('./homeIcon/index_lottery.png'),
    indexLotteryPressed: require('./homeIcon/index_lottery_pressed.png'),
    indexTrendNormal: require('./homeIcon/index_trend.png'),
    indexTrendPressed: require('./homeIcon/index_trend_pressed.png'),
    indexMineNormal: require('./homeIcon/index_mine.png'),
    indexMinePressed: require('./homeIcon/index_mine_pressed.png'),
    indexAccess: require('./homeIcon/index_access.png'),
    indexKefu: require('./homeIcon/index_kefu.png'),
    indexOrder: require('./homeIcon/index_order.png'),
    indexYouhui: require('./homeIcon/index_youhui.png'),
    // indexNotice: require('image!index_notice'),
}

export const homeMenu = {
    'TOPUP': home.indexAccess,
    'ORDER': home.indexOrder,
    'PROMOTION': home.indexYouhui,
    'CUS_SERVICE': home.indexKefu
}


//个人中心
export const personal = {
    // userDefaultIcon: require('./addon/userCenterIcon/user_default_icon.png'),
    // userDefaultLocalIcon: 'user_default_icon',
    // userCenterBg: require('./addon/userCenterIcon/usercenter_default_background.png'),
    // userBarTool: require('./addon/userCenterIcon/top_bar_tools.png'),
    // imgEye: require('./addon/userCenterIcon/icon_eye.png'),
    // imgEye2: require('./addon/userCenterIcon/icon_eye2.png'),
    // iconPay: require('./addon/userCenterIcon/icon_pay.png'),
    // iconDraw: require('./addon/userCenterIcon/icon_drawings.png'),
    // imgNext: common.iconNext,
    // daiKaiJjiangIcon: require('./addon/userCenterIcon/dai.png'),
    // jiangliIcon: require('./addon/userCenterIcon/jiangli.png'),
    // yiKaiJiangIcon: require('./addon/userCenterIcon/dingdan.png'),
    // personalInfo: require('./addon/userCenterIcon/personal_info.png'),
    // secure: require('./addon/userCenterIcon/secure.png'),
    // account: require('./addon/userCenterIcon/account.png'),
    // agent: require('./addon/agentCenter/group.png'),
    // message: require('./addon/userCenterIcon/person_news.png'),
    // collect: require('./addon/userCenterIcon/shoucang.png'),
    // imgSet: require('./addon/userCenterIcon/set.png'),
    // toolUpdate: require('image!tool_update'),
    // toolAbout: require('image!tool_about'),
    // toolFeedBack: require('./addon/userCenterIcon/feedback.png'),
    // toolMusic: require('image!tool_music'),
    // toolPassword: require('image!tools_password'),
    // toolPassword2: require('image!tools_password2'),
    // bankManager: require('image!bank_manage'),
    // payRecord: require('image!pay_records'),
    // withDraw: require('image!withdraw_withdraw'),
    // username: require('image!user'),
    // password: require('image!password'),
    // affCode: require('./addon/userCenterIcon/affcode.png'),
    // check: require('./addon/userCenterIcon/icon_checked.png'),
    // unCheck: require('./addon/userCenterIcon/icon_uncheck.png'),
    // signIn: require('./addon/userCenterIcon/signIn.png'),
    // email: require('./addon/userRegister/email.png'),
    // identityNumber: require('./addon/userRegister/identity_number.png'),
    // phoneNumber: require('./addon/userRegister/phone_number.png'),
    // QQ: require('./addon/userRegister/qq.png'),
    // validateCode:require('./addon/userRegister/validate_code.png'),
    // tzRecord:require('./addon/userCenterIcon/tz_record.png'),
    // ctRecord:require('./addon/userCenterIcon/ct_record.png'),
    // userSheet:require('./addon/userCenterIcon/user_sheet.png'),
    // userManager:require('./addon/userCenterIcon/user_manager.png'),
    // agentCommission:require('./addon/userCenterIcon/agent_commission.png'),
    // teamSheet:require('./addon/userCenterIcon/team_sheet.png'),
    // onlineServicer: require('./addon/userCenterIcon/service.png'),
    // more:require('./addon/userCenterIcon/agent_more.png'),
}


//用户充值
export const userPay = {
    // noPayData: common.noPayData,
    qqPay: require('./addon/other/qq_pay.png'),
    thirdPay: require('./addon/other/third_pay.png'),
    // wechat: require('image!wechat'),
    // alipay: require('image!alipay'),
    // bank: require('image!bank'),
    jdzf: require('./addon/other/jdzf.png'),
    // userAlipayHelp01: require('image!alipay01'),
    // userAlipayHelp02: require('image!alipay02'),
    // userWechatPayHelper02: require('image!wechat02'),
    // userAlipayHelp03: require('image!alipay03'),
    // userWechatPayHelper03: require('image!wechat03'),
    // userAlipayHelp04: require('image!alipay04'),
    // userWechatPayHelper04: require('image!wechat04'),
    // paidui01: common.select,
    // paidui02: require('image!paidui22'),
    // paidui03: require('image!win'),
    // step1: require('../asset/pay_step/step_1@3x.png'),
    // step3: require('../asset/pay_step/step_3@3x.png'),
    // step4: require('../asset/pay_step/step_4@3x.png'),
    // step5: require('../asset/pay_step/step_5@3x.png'),
    // step6: require('../asset/pay_step/step_6@3x.png'),
    // step7: require('../asset/pay_step/step_7@3x.png'),
    // step8: require('../asset/pay_step/step_8@3x.png'),
    // step9: require('../asset/pay_step/step_9@3x.png'),
    // stepWx3: require('../asset/pay_step/wx_step_3@3x.png'),
    // stepWx4: require('../asset/pay_step/wx_step_4@3x.png'),
    // payTypeWx: require('../asset/pay_icon/wx.png'),
    // payTypeAlipay: require('../asset/pay_icon/alipay.png'),
    // payTypeJdzf: require('../asset/pay_icon/jdzf.png'),
    // payTypeUnionpay: require('../asset/pay_icon/wy.png'),
    // payTypeOther: require('../asset/pay_icon/unionpay.png'),
    // payTypeBank: require('../asset/pay_icon/bank.png')
}

//代理中心
export const agent = {
    headAgent: require('./addon/agentCenter/head_agent.png'),
    headAgentOn: require('./addon/agentCenter/head_agent_on.png'),
    headPlayer: require('./addon/agentCenter/head_player.png'),
    headPlayerOn: require('./addon/agentCenter/head_player_on.png'),
    type: require('./addon/agentCenter/type.png'),
    typeOn: require('./addon/agentCenter/type_on.png'),
    // arrow: common.downArrow,
    agentSubordinate: require('./addon/agentCenter/icon_subordinate.png'),
    agentSubordinateGray: require('./addon/agentCenter/icon_subordinate_gray.png'),
    agentlitre: require('./addon/agentCenter/icon_litre.png'),
    agentLitreGray: require('./addon/agentCenter/icon_litre_gray.png'),
    agentTransfer: require('./addon/agentCenter/icon_transfer.png'),
    agentTransferGray: require('./addon/agentCenter/icon_transfer_gray.png'),
    agentDetail: require('./addon/agentCenter/icon_detail.png'),
    agentDetailGray: require('./addon/agentCenter/icon_detail_gray.png'),
    agentCommission: require('./addon/agentCenter/commission.png'),
    agentBettingMoney: require('./addon/agentCenter/bettingmoney.png'),
    banner: require('./addon/agentCenter/banner.png'),
    close: require('./addon/other/buttonClose.png'),
    swipe_right: require('./addon/other/swipe_right.png'),
    // userLayer1: require('./addon/agentCenter/daili_cengji_next1.png'),
    // userLayer2: require('./addon/agentCenter/daili_cengji_next2.png')

}

//投注页面
export const betIcon = {
    // bgPlace: require('image!bg_place'),
    // bgPlace02: require('image!bg_place02'),
    back: require('./addon/other/fanhui2.png'),
    handPointing: require('./addon/other/hand_pointing.png'),
    // topBg: require('image!top_bg'),
    // shake: require('image!icon_shake'),
    explain: require('./addon/other/explain.png'),
    check: personal.check,
    unCheck: personal.unCheck,
    orderTop: require('./addon/other/order_top.png'),
    orderBottom: require('./addon/other/order_bottom.png'),
    // orderQingChu: require('image!icon-qingchu'),
    // success: common.select,
    redCheck: require('./addon/other/red_check.png')

}

export const IntelligenceBet = {
    'add': require('./addon/other/jia.png'),
    'subtract': require('./addon/other/jian.png')
}

//快3
export const k3 = {
    'dice1': require('./addon/newLottery/k3/dice1.png'),
    'dice2': require('./addon/newLottery/k3/dice2.png'),
    'dice3': require('./addon/newLottery/k3/dice3.png'),
    'dice4': require('./addon/newLottery/k3/dice4.png'),
    'dice5': require('./addon/newLottery/k3/dice5.png'),
    'dice6': require('./addon/newLottery/k3/dice6.png'),
}

//幸运扑克
export const xypk = {
    black: require('./addon/newLottery/xypk/pk_top_heitao.png'),
    red: require('./addon/newLottery/xypk/pk_top_taoxin.png'),
    flower: require('./addon/newLottery/xypk/pk_top_meihua.png'),
    fk: require('./addon/newLottery/xypk/pk_top_fangkuai.png'),
    blackHistory: require('./addon/newLottery/xypk/pk_buttom_heitao.png'),
    redHistory: require('./addon/newLottery/xypk/pk_buttom_taoxin.png'),
    flowerHistory: require('./addon/newLottery/xypk/pk_buttom_meihua.png'),
    fkHistory: require('./addon/newLottery/xypk/pk_buttom_fangkuai.png'),
    waitLottery: require('./addon/newLottery/xypk/pk_moren.png'),
    bxIcon: {
        'icon0': require('./addon/newLottery/xypk/pk_duizi.png'),
        'icon1': require('./addon/newLottery/xypk/pk_baozi.png'),
        'icon2': require('./addon/newLottery/xypk/pk_tonghua.png'),
        'icon3': require('./addon/newLottery/xypk/pk_shunzi.png'),
        'icon4': require('./addon/newLottery/xypk/pk_tonghuashun.png')
    },
    thdxIcon: {
        'icon0': require('./addon/newLottery/xypk/pk_center_heitao.png'),
        'icon1': require('./addon/newLottery/xypk/pk_center_taoxin.png'),
        'icon2': require('./addon/newLottery/xypk/pk_center_meihua.png'),
        'icon3': require('./addon/newLottery/xypk/pk_center_fangkuai.png'),
    },
    szdxIcon: {
        'icon0': require('./addon/newLottery/xypk/pk_123.png'),
        'icon1': require('./addon/newLottery/xypk/pk_234.png'),
        'icon2': require('./addon/newLottery/xypk/pk_345.png'),
        'icon3': require('./addon/newLottery/xypk/pk_456.png'),
        'icon4': require('./addon/newLottery/xypk/pk_567.png'),
        'icon5': require('./addon/newLottery/xypk/pk_678.png'),
        'icon6': require('./addon/newLottery/xypk/pk_789.png'),
        'icon7': require('./addon/newLottery/xypk/pk_8910.png'),
        'icon8': require('./addon/newLottery/xypk/pk_910j.png'),
        'icon9': require('./addon/newLottery/xypk/pk_10jq.png'),
        'icon10': require('./addon/newLottery/xypk/pk_jqk.png'),
        'icon11': require('./addon/newLottery/xypk/pk_qka.png'),
    },
    thsdxIcon: {
        'icon0': require('./addon/newLottery/xypk/pk_heitao_shunzi.png'),
        'icon1': require('./addon/newLottery/xypk/pk_taoxin_shunzi.png'),
        'icon2': require('./addon/newLottery/xypk/pk_meihua_shunzi.png'),
        'icon3': require('./addon/newLottery/xypk/pk_fangkuai_shunzi.png'),
    },
    bzdxIcon: {
        'icon0': require('./addon/newLottery/xypk/pk_aaa.png'),
        'icon1': require('./addon/newLottery/xypk/pk_222.png'),
        'icon2': require('./addon/newLottery/xypk/pk_333.png'),
        'icon3': require('./addon/newLottery/xypk/pk_444.png'),
        'icon4': require('./addon/newLottery/xypk/pk_555.png'),
        'icon5': require('./addon/newLottery/xypk/pk_666.png'),
        'icon6': require('./addon/newLottery/xypk/pk_777.png'),
        'icon7': require('./addon/newLottery/xypk/pk_888.png'),
        'icon8': require('./addon/newLottery/xypk/pk_999.png'),
        'icon9': require('./addon/newLottery/xypk/pk_101010.png'),
        'icon10': require('./addon/newLottery/xypk/pk_jjj.png'),
        'icon11': require('./addon/newLottery/xypk/pk_qqq.png'),
        'icon12': require('./addon/newLottery/xypk/pk_kkk.png'),
    },
    dzdxIcon: {
        'icon0': require('./addon/newLottery/xypk/pk_aa.png'),
        'icon1': require('./addon/newLottery/xypk/pk_22.png'),
        'icon2': require('./addon/newLottery/xypk/pk_33.png'),
        'icon3': require('./addon/newLottery/xypk/pk_44.png'),
        'icon4': require('./addon/newLottery/xypk/pk_55.png'),
        'icon5': require('./addon/newLottery/xypk/pk_66.png'),
        'icon6': require('./addon/newLottery/xypk/pk_77.png'),
        'icon7': require('./addon/newLottery/xypk/pk_88.png'),
        'icon8': require('./addon/newLottery/xypk/pk_99.png'),
        'icon9': require('./addon/newLottery/xypk/pk_1010.png'),
        'icon10': require('./addon/newLottery/xypk/pk_jj.png'),
        'icon11': require('./addon/newLottery/xypk/pk_qq.png'),
        'icon12': require('./addon/newLottery/xypk/pk_kk.png'),
    }, dxIcon: {
        'icon0': require('./addon/newLottery/xypk/pk_a.png'),
        'icon1': require('./addon/newLottery/xypk/pk_2.png'),
        'icon2': require('./addon/newLottery/xypk/pk_3.png'),
        'icon3': require('./addon/newLottery/xypk/pk_4.png'),
        'icon4': require('./addon/newLottery/xypk/pk_5.png'),
        'icon5': require('./addon/newLottery/xypk/pk_6.png'),
        'icon6': require('./addon/newLottery/xypk/pk_7.png'),
        'icon7': require('./addon/newLottery/xypk/pk_8.png'),
        'icon8': require('./addon/newLottery/xypk/pk_9.png'),
        'icon9': require('./addon/newLottery/xypk/pk_10.png'),
        'icon10': require('./addon/newLottery/xypk/pk_j.png'),
        'icon11': require('./addon/newLottery/xypk/pk_q.png'),
        'icon12': require('./addon/newLottery/xypk/pk_k.png'),
    }


}
