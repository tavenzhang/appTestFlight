/**
 * app主题配置文件
 **/
import { PixelRatio, Dimensions, Platform, StatusBar } from 'react-native';
const fontSizeScaler = 1 ? 1 : PixelRatio.get() / PixelRatio.getFontScale();
global.TCLineW = Platform.OS == 'ios' && Dimensions.get('window').width > 375 ? 0.33 : 0.5;
import { StyleSheet } from 'react-native';
// 全局字体大小
export const Size = {
    xxsmall: 10 * fontSizeScaler,
    xsmall: 12 * fontSizeScaler,
    small: 14 * fontSizeScaler,
    default: 15 * fontSizeScaler,
    large: 18 * fontSizeScaler,
    xlarge: 20 * fontSizeScaler,
    xxlarge: 24 * fontSizeScaler,
    pixel: 1 / PixelRatio.get(), // 最细边框
    font10: 10 * fontSizeScaler,
    font11: 11 * fontSizeScaler,
    font12: 12 * fontSizeScaler,
    font13: 13 * fontSizeScaler,
    font14: 14 * fontSizeScaler,
    font15: 15 * fontSizeScaler,
    font16: 16 * fontSizeScaler,
    font17: 17 * fontSizeScaler,
    font18: 18 * fontSizeScaler,
    font19: 19 * fontSizeScaler,
    font20: 20 * fontSizeScaler,
    font21: 21 * fontSizeScaler,
    font22: 22 * fontSizeScaler,
    font23: 23 * fontSizeScaler,
    font24: 24 * fontSizeScaler,
    font25: 25 * fontSizeScaler,
    font26: 26 * fontSizeScaler,
    font27: 27 * fontSizeScaler,
    font28: 28 * fontSizeScaler,
    font29: 29 * fontSizeScaler,
    font30: 30 * fontSizeScaler
};
// 全局Window尺寸
export const width = Dimensions.get('window').width;
export const height = Dimensions.get('window').height;
//手机状态栏高度
export const statusBarHeight =
    Platform.OS == 'ios' ? (isIphoneX() ? 44 : 20) : StatusBar.currentHeight;

// iPhoneX
const X_WIDTH = 375;
const X_HEIGHT = 812;

const JX_IPHON_X =
    Platform.OS === 'ios' &&
    ((height === X_HEIGHT && width === X_WIDTH) || (height === X_WIDTH && width === X_HEIGHT));

export function isIphoneX() {
    return JX_IPHON_X;
}

export const JX_PLAT_INFO = {
    
    G_IS_IOS: Platform.OS == 'ios',
    MarginBarHeight: Platform.OS == 'ios' ? (JX_IPHON_X ? 45 : 20) : 0,
    IS_IphoneX: JX_IPHON_X
};

export const navbarHight = Platform.OS == 'ios' ? (isIphoneX() ? 88 : 64) : 44;
export const navbarMarginTop = Platform.OS == 'ios' ? (isIphoneX() ? 44 : 20) : 0;
export const bottomNavHeight = Platform.OS == 'ios' ? (isIphoneX() ? 83 : 50) : 49;

/**
 * app主色调
 * @type {{}}
 */

export const baseColor = {
    white: '#FFFFFF',
    black: 'black',
    mainBg: '#F5F5F5', //主背景
    itemBg: '#FFFFFF', //次背景
    strong: 'red', //强调色
    tabBarBg: '#f5f5f5', //tabbar背景
    tabUnSelectTxt: '#7c7c7c', //tab字体未选中
    tabSelectedTxt: '#4292cd', //选中
    waitOpen: '#51CFAF', //等待开奖
    cpDetailTitle: '#66CCFF', //彩票详情投注号码标题
    blue: '#39c7ff',
    txtInput: '#ffffff',
    lightGray: '#cccccc',
    gray: '#666666',
    buttonBg: '#FE9C00',
    grayOverlay: 'rgba(0, 0, 0, 0.5)'
};

const fontColor = {
    headerTitle: 'white', //主要标题色
    headerTitle1: '#C48300', //次要标题色
    mainTxt: '#333333', //主要文本色
    minorTxt: '#999999', //次要文本色
    strong: 'red', //强调色
    hotCp: '#333333', //热门彩种
    issue: 'red', //期数
    waitOpen: '#999999', //正在开奖
    betMoney: '#EEEE03', //投注金额
    withdraw: '#12b120', //提款
    tintColor: '#ff0000',
    placeholderText: baseColor.lightGray,
    kefuTxt: '#4292cd',
    buttonTxt: '#410000'
};

export const indexTxtColor = {
    topTitle: fontColor.headerTitle, //顶部标题
    noticeTitle: fontColor.strong, //公告标题
    noticeContent: fontColor.mainTxt, //公告内容
    midMenuTitle: ['#FF9F4B', '#02BCF2', '#00CB7C', '#FB6387'], //客服充值
    recommendKind: fontColor.hotCp, //彩种推荐
    hotKind: fontColor.hotCp, //热门彩种
    homePageHotCPTitle: [
        '#4292cd',
        '#ef2d0e',
        '#18a53d',
        '#e79811',
        '#ef2d0e',
        '#18a53d',
        '#e79811'
    ], //彩种标题
    cpDescription: fontColor.minorTxt, //彩票描述
    cpTitle: fontColor.mainTxt, //彩票标题
    winnerTitle: fontColor.mainTxt, //中奖榜标题
    winner: fontColor.mainTxt, //中奖用户名
    winnerMoney: fontColor.strong, //中奖金额
    winnerCpName: fontColor.mainTxt, //彩票类型
    bottomMenuTitleNormal: baseColor.tabUnSelectTxt, //底部菜单未选中
    bottomMenuTitlePressed: baseColor.tabSelectedTxt, //底部菜单选中
    updateTip: fontColor.mainTxt, //更新提示
    gameTxt: '#FFC252' //KY,MG,FG
};

export const indexBgColor = {
    mainBg: baseColor.mainBg, //主页背景颜色
    itemBg: baseColor.itemBg, //主页子项颜色
    tabBg: baseColor.tabBarBg, //tabBar背景
    noticeBg: baseColor.itemBg, //公告背景
    homeHistoryEvenBg: baseColor.mainBg //投注页面历史偶数行背景
};

// 下拉刷新控件progress主题样式
export const refreshColor = {
    progress: ['#e4dc5f', '#e4dc5f', '#ede99d', '#f4f2c4'],
    progressBackground: '#2e4fa3'
};

export const moduleBasedColor = {
    transfer: {
        mainBg: indexBgColor.mainBg,
        itemBg: indexBgColor.itemBg,
        mainTxt: fontColor.mainTxt,
        minorTxt: fontColor.minorTxt
    },
    home: {
        mainBg: indexBgColor.mainBg,
        itemBg: indexBgColor.itemBg,
        mainTxt: fontColor.mainTxt,
        minorTxt: fontColor.minorTxt
    },
    shop: {
        mainBg: indexBgColor.mainBg,
        itemBg: indexBgColor.itemBg,
        mainTxt: fontColor.mainTxt,
        minorTxt: fontColor.minorTxt
    },
    lottery: {
        mainBg: indexBgColor.mainBg,
        itemBg: indexBgColor.itemBg,
        mainTxt: fontColor.mainTxt,
        minorTxt: fontColor.minorTxt
    },
    userCenter: {
        mainBg: indexBgColor.mainBg,
        itemBg: indexBgColor.itemBg,
        mainTxt: fontColor.mainTxt,
        minorTxt: fontColor.minorTxt
    },
    pay: {
        mainBg: indexBgColor.mainBg,
        itemBg: indexBgColor.itemBg,
        mainTxt: fontColor.mainTxt,
        minorTxt: fontColor.minorTxt
    },
    agentCenter: {
        mainBg: indexBgColor.mainBg,
        itemBg: indexBgColor.itemBg,
        mainTxt: fontColor.mainTxt,
        minorTxt: fontColor.minorTxt
    }
};

/**
 * 转账界面颜色
 */
export const transferColor = {
    title1: '#999999',
    title2: '#333333',
    title3: '#666666',
    title4: '#040404',
    money1: '#f26921',
    money2: '#3399ff',
    buttonBg1: '#e60012',
    buttonBg2: '#434a64',
    border1: '#e60012',
    border2: '#434a64',
    inputViewStyleBg: moduleBasedColor.transfer.itemBg,
    autoTransferTxtBg: moduleBasedColor.transfer.itemBg,
    autoTransferTxtBorderBottom: moduleBasedColor.transfer.mainBg,
    walletViewStyleBg: moduleBasedColor.transfer.itemBg,
    transferBtnBg: moduleBasedColor.transfer.itemBg,
    refreshBtnBg: moduleBasedColor.transfer.itemBg,
    loadingCenterBg: '#00000051',
    moneyDollarTxt: baseColor.black,
    queryBtnBg: '#f26921',
    queryTxt: '#FFFFFF'
};

//购彩大厅
export const shoppingTxtColor = {
    tabTitleNormal: fontColor.minorTxt, //tab未选中
    tabTitlePressed: fontColor.strong, //tab选中
    tabLine: fontColor.strong, //指示条
    cpTitle: fontColor.mainTxt, //彩票标题
    cpNum: fontColor.strong, //彩票开奖号码
    cpLastIssueNumber: fontColor.issue, //彩票最新期号
    cpTipTxt: fontColor.minorTxt, //彩票提示
    cpTime: fontColor.minorTxt, //彩票倒计时
    cpLotteryTip: fontColor.waitOpen //正在开奖提示
};

//开奖大厅
export const lotteryTxtColor = {
    cpTitle: moduleBasedColor.lottery.mainTxt, //彩票标题
    cpTime: moduleBasedColor.lottery.minorTxt, //彩票倒计时
    cpLastIssueNumber: moduleBasedColor.lottery.minorTxt, //彩票最新期号
    cpDate: moduleBasedColor.lottery.minorTxt, //彩票日期
    cpNum: baseColor.white, //彩票号码
    waitTxt: baseColor.white, //等待开奖
    operator: moduleBasedColor.lottery.mainTxt, //操作符号
    cpTip: moduleBasedColor.lottery.mainTxt //彩票提示
};

export const lotterBgColor = {
    cpBallBg: '#5891db', //号码球背景
    waitLotteryBg: '#5B5FE3', //等待开奖背景
    newLotteryBg: '#5B5FE3' //新彩种开奖背景
};

//登录注册样式
export const loginAndRegeisterTxtColor = {
    inputPlaceholder: fontColor.minorTxt, //输入框提示
    forgetPwd: '#1b81fb', //忘记密码
    loginTxt: fontColor.headerTitle, //登录文本
    regTxt: fontColor.headerTitle, //注册文本
    freePlay: '#3056b2', //试玩文本
    inputTxt: 'black', //输入文本
    protocolTxt: fontColor.mainTxt, //协议
    userProtocol: '#1b81fb',
    freePlayTip: '#3056b2' //免费试玩提醒
};

export const loginAndRegeisterBgColor = {
    loginBtn: '#3056b2', //登录按钮
    regBtn: '#3056b2', //注册按钮
    freePlayBtn: baseColor.white, //试玩按钮
    inputBg: baseColor.white, //输入框背景,
    unableBtn: '#cccccc',
    protocolBg: indexBgColor.mainBg
};

export const loginAndRegeisterBorderColor = {
    inputBorder: fontColor.minorTxt, //输入框边框
    forgetPwd: baseColor.white //文本下划线
};

//个人中心
export const userCenterTxtColor = {
    containerUserCenterBg: moduleBasedColor.userCenter.mainBg,
    userCenterHeaderBg: moduleBasedColor.userCenter.itemBg, //充值，提款，转账
    itemContainerBg: moduleBasedColor.userCenter.itemBg,
    itemDes: moduleBasedColor.userCenter.minorTxt,
    mainBorder: moduleBasedColor.userCenter.mainBg,
    minorBorder: moduleBasedColor.userCenter.mainBg,
    userName: fontColor.headerTitle, //用户名
    balance: moduleBasedColor.userCenter.mainTxt, //余额
    balanceTitle: moduleBasedColor.userCenter.mainTxt, //余额标题
    fresh: moduleBasedColor.userCenter.mainTxt, //刷新
    charge: moduleBasedColor.userCenter.mainTxt, //充值
    withdraw: moduleBasedColor.userCenter.mainTxt, //提款
    orderItemLeftTitle: moduleBasedColor.userCenter.mainTxt, //订单Item标题
    orderItemRightTitle: '#999999',
    unKJOrder: moduleBasedColor.userCenter.mainTxt, //未开奖订单
    zjOrder: moduleBasedColor.userCenter.mainTxt, //中奖订单
    kjOrder: moduleBasedColor.userCenter.mainTxt, //开奖订单
    menuItemTitle: moduleBasedColor.userCenter.mainTxt, //菜单标题
    userDetailTitle: moduleBasedColor.userCenter.mainTxt, //个人详细界面标题
    settingTitle: moduleBasedColor.userCenter.mainTxt, //设置界面
    version: moduleBasedColor.userCenter.mainTxt, //版本号
    feedBackTitle: moduleBasedColor.userCenter.mainTxt, //意见反馈
    feedBackPlaceHolderTxt: moduleBasedColor.userCenter.minorTxt,
    loginAndRegeisterBgColor: loginAndRegeisterBgColor.loginBtn,
    feedBackDropDownListBg: baseColor.white,
    feedbackDropDownBorder: baseColor.white,
    feedbackInputTxt: baseColor.black,
    feedbackInputBorderColor: loginAndRegeisterBorderColor.inputBorder,
    feedbackInputBg: loginAndRegeisterBgColor.inputBg,
    dropDownItemContainerBorder: baseColor.white,
    feedbackDropContainerBorder: loginAndRegeisterBgColor.loginBtn,
    feedbackDropContainerBg: moduleBasedColor.userCenter.itemBg,
    feedbackTopContainerBottomColor: moduleBasedColor.userCenter.itemBg,
    feedbackList: moduleBasedColor.userCenter.mainBg,
    msgPiontTxt: baseColor.white,
    msgPiontBg: baseColor.strong,
    signInBgColor: '#FF8500', //签到后按钮背景颜色
    statementTxt: '#e5e5e5', //个人报表
    betRecordTimeView: baseColor.white,
    betRecordHeader: '#434a64',
    statementRowButton: baseColor.white,
    freshViewBorder: moduleBasedColor.userCenter.mainTxt,
    accountDetailTxt: moduleBasedColor.userCenter.mainTxt,
    freshViewBg: baseColor.white,
    walletDetailViewBg: '#FF735D',
    accountDetailTxt2: baseColor.white,
    symbolTxt: '#FF5A3F',
    agentBg: '#FFF7EF',
    agentTxt: moduleBasedColor.userCenter.mainTxt,
    userTxt: '#dddddd',
    getSignInLabelTxt: baseColor.white,
    checkInTxt: baseColor.white,
    checkedTxt: baseColor.white, //已签到
    checkInCompletedTxt: baseColor.white, //今日签到完成
    checkInBorder: baseColor.white,
    emptyCircle: '#FF5A3F',

    //inviteFriend
    linkBorder: '#ddd', //分享好友，访问官方地址下载APP
    copyBtnBg: '#F02139', //复制下载地址
    copyTxt: '#FFF715',
    wechatBg: '#59B64C', //并打开微信推送好友
    wechatTxt: baseColor.white,
    iosQrBg: baseColor.black,
    iosQrFg: baseColor.white,
    androidQrBg: baseColor.black,
    androidQrFg: baseColor.white,
    stepContent: '#F5444A',
    stepText: '#151515',
    stepTextHighlight: moduleBasedColor.userCenter.mainTxt,

    //userAccount
    orderStateTxt: fontColor.strong,
    mySettingLeftTxtStyle: moduleBasedColor.userCenter.mainTxt,
    tabStyle: moduleBasedColor.userCenter.itemBg,
    tabTextStyle: moduleBasedColor.userCenter.mainTxt,
    PayWithdrawRecordsTabTitle: shoppingTxtColor.tabTitleNormal,
    PayWithdrawRecordsTabActive: shoppingTxtColor.tabTitlePressed,
    itemTitleStyle: moduleBasedColor.userCenter.mainTxt,
    itemContentStyle: moduleBasedColor.userCenter.minorTxt,
    itemGreenTxt: fontColor.withdraw,
    itemRedTxt: fontColor.strong,
    orderDetailTxt: loginAndRegeisterTxtColor.loginTxt,

    //userCollect
    containerCollectBg: moduleBasedColor.userCenter.mainBg,
    txtStyle: moduleBasedColor.userCenter.mainTxt,
    inputStyleBorder: baseColor.white,
    bindPhoneNumber: baseColor.black,

    //userInfo
    inputStyle: baseColor.txtInput,
    titleTipTxtStyle: moduleBasedColor.userCenter.mainTxt,
    bottomBarButtonStyle: '#cc0000',
    pointStyle: '#cc0000',

    //userMessage
    containerMessageItemView: moduleBasedColor.userCenter.itemBg,
    containerMessage: moduleBasedColor.userCenter.mainBg,
    messageTitle: moduleBasedColor.userCenter.mainTxt,
    messageContent: moduleBasedColor.userCenter.mainTxt,
    messageDate: moduleBasedColor.userCenter.mainTxt,

    //userOrder
    titleViewBg: '#45d2ff', //智能追号父订单
    titleViewBg1: '#40d96e', //普追号父订单
    txtColor: baseColor.white, //普
    txtColor1: baseColor.white, //智

    //userOrderDetail
    openTimeStyle: moduleBasedColor.userCenter.minorTxt,
    orderLeftTxtStyle: moduleBasedColor.userCenter.minorTxt,
    orderRightTxtStyle: moduleBasedColor.userCenter.mainTxt,
    orderBtmTitleStyle: moduleBasedColor.userCenter.itemBg,
    grayTxtStyle: moduleBasedColor.userCenter.minorTxt,

    //userOtherBetRecords
    dropDownStyle: moduleBasedColor.userCenter.mainTxt,

    //userPay
    containerPayBg: moduleBasedColor.pay.mainBg, //充值类型
    headerBg: moduleBasedColor.pay.mainBg,
    tipViewBg: moduleBasedColor.pay.itemBg,
    modalMainTxt: baseColor.black,
    containerItemPayButtonBg: moduleBasedColor.pay.itemBg, //任意金额
    containerPayBg1: moduleBasedColor.pay.mainBg,
    payMoneyItemStyle: moduleBasedColor.pay.mainBg,
    inputContainerBg: moduleBasedColor.pay.itemBg,
    containerPayRecord: moduleBasedColor.pay.mainBg, //充提记录
    myOrderTitleBorder: moduleBasedColor.pay.mainBg,
    mySettingStyleBg: moduleBasedColor.pay.itemBg,

    //Dialog.dialogView
    queryLeftTxtStyle: 'blue',
    modalContentTxt: 'red',
    dialogTxt: baseColor.white, //去填写资料
    modalContentBg: '#f5f5f5',

    //UserPayProgress
    itemViewLineStyle: fontColor.withdraw,
    itemViewGrayLineStyle: moduleBasedColor.userCenter.minorTxt,

    //userWithdraw账户提现
    circleShadow: 'red',
    circleBg: baseColor.white,
    circleTxt: moduleBasedColor.userCenter.mainTxt,
    btnUnableWithdrawBg: '#e4e4e4',
    btnUnableWithdrawTxt: baseColor.white,
    moneyIcon: moduleBasedColor.userCenter.mainTxt,

    //withdrawKeyboard
    keyboardWithdrawTxt: baseColor.gray, //取款
    taxTxt: 'red',
    contentStyleBg: indexBgColor.keyboard,
    inputKeyStyleBg: indexBgColor.keyboard,
    pwdStyleBorderRight: baseColor.lightGray,
    queryTxtStyle: baseColor.black,
    btmRightViewBg: 'red',

    //VIP
    userNameTxt: baseColor.white,
    contentTxt: baseColor.gray, //有效投注量

    //wallet
    walletContainer: moduleBasedColor.userCenter.mainBg,
    walletBorder: '#EAEAEA',
    walletName: '#111111',
    walletMoney: '#e60012',

    //securityCenter
    containerSecurityBg: moduleBasedColor.userCenter.mainBg,

    //agentTeamManager
    containerTeamManagerBg: moduleBasedColor.userCenter.mainBg,
    searchStyleBg: moduleBasedColor.userCenter.itemBg,
    searchBarBg: moduleBasedColor.userCenter.mainBg,
    loadedBg: moduleBasedColor.userCenter.itemBg, //加载完毕
    loadingBg: moduleBasedColor.userCenter.itemBg, //加载中
    loadingTxt: moduleBasedColor.userCenter.mainTxt,
    groupDropDownStyleBg: moduleBasedColor.userCenter.mainBg,
    groupViewStyleBorder: moduleBasedColor.userCenter.mainBg,

    //WelfareCenter
    containerFlzxBg: moduleBasedColor.userCenter.mainBg,
    welfareItemContainer: moduleBasedColor.userCenter.itemBg
};

export const userCenterBorderColor = {
    freshBorder: fontColor.mainTxt
};

//列表界面样式
export const listViewTxtColor = {
    title: fontColor.mainTxt,
    content: fontColor.minorTxt,
    redTip: fontColor.strong,
    greenTip: fontColor.withdraw,
    bankTitle: baseColor.white,
    homeHistoryStrong: fontColor.mainTxt
};

//弹出框样式
export const popuWinStyle = {
    titleColor: indexTxtColor.topTitle,
    titleBorder: loginAndRegeisterBorderColor.inputBorder,
    getTitleBg: '#23243B',
    contentStyleBg: '#23243B',
    contentBg: '#23243B',

    contentTxt: '#353535',
    contentBorder: '#442028',
    contentBtn: '#292F51',
    unSelectBorder: '#292F51',
    contentSelectBtnTxt: '#696969',

    btnSelectBg: '#442028', //弹出框按钮选中颜色
    btnUnSelectBg: '#292F51', //未选中颜色
    borderWidth: 1, //按钮边框宽度
    contentSelectColor: '#FFFFFF', //按钮文本选中颜色
    contentUnSelectColor: '#FFFFFF', //按钮文本未选中颜色
    contentSelectBorderColor: '#696969', //选择按钮边色
    contentUnselectBorderColor: '#696969', //选择未选中按钮边色

    //选择玩法
    GameTitleTxt: '#353535', //选择玩法标题
    GameTitleHeaderBg: '#F4F3F4', //选择玩法背景色
    GameSelectBg: '#F4F3F4', //玩法背景
    GameSelectedBg: baseColor.white, //选择玩法背景色
    GameSelectedTxtColor: '#353535',
    GameSelectTxtColor: '#353535', //未选择字体色
    GameSelectedBorder: '#ff0000',
    GameSelectBorder: '#E3E2E3',
    GameSelectBtn: baseColor.white //按钮背景色
};

//通用按钮样式
export const buttonStyle = {
    btnBg: loginAndRegeisterBgColor.loginBtn,
    btnTxtColor: loginAndRegeisterTxtColor.loginTxt,
    btnBorder: loginAndRegeisterBorderColor.inputBorder,
    btnRedBg: baseColor.strong,
    btnUnableBg: loginAndRegeisterBgColor.loginBtn
};
//通用输入框样式
export const inputStyle = {
    inputBg: loginAndRegeisterBgColor.inputBg,
    inputTxt: loginAndRegeisterTxtColor.inputTxt,
    inputPlaceholder: loginAndRegeisterTxtColor.inputPlaceholder,
    inputBorder: loginAndRegeisterBorderColor.inputBorder
};

//通用dropDown样式
export const dropDownStyle = {
    dropBorder: fontColor.minorTxt,
    dropBg: loginAndRegeisterBgColor.inputBg,
    timeView: loginAndRegeisterTxtColor.inputTxt
};

//充值样式
export const payTxtColor = {
    payMoney: fontColor.strong,
    payMoneyTip: moduleBasedColor.pay.mainTxt,
    moneyChecked: baseColor.white,
    moneyUnChecked: baseColor.strong,
    payDes: baseColor.strong,
    payPlaceHolder: moduleBasedColor.pay.minorTxt,

    //bankPayMessageNew
    bankSymbol: '#FF5A3F',
    placeholderTxt: '#BCBBC1',
    firstItemStyleBg: '#EFEFF4',
    firstItemTxtStyle: '#8E8E93',
    itemStyleBg: indexBgColor.itemBg,
    itemStyleBorder: indexBgColor.mainBg,
    itemTitleTxt: '#8E8E93',
    itemTips: '#EC2829',
    transferNoTxt: '#000000',
    transferMoney: '#EC2829',
    emptyCircle: '#FF5A3F',

    //UserPayNew
    kefuTxt: '#4292cd',
    kefuUnderlne: 'underline',
    getEmptyTip: listViewTxtColor.content,
    payMoneyItemStyleBg: indexBgColor.itemBg,
    inputContainerBg: indexBgColor.itemBg,
    payTipTxt: listViewTxtColor.title,
    payRemarkTxt: listViewTxtColor.content,
    emptyTipBg: indexBgColor.mainBg,
    itemMainStyleBg: indexBgColor.itemBg,
    itemTitleStyleTxt: listViewTxtColor.title,
    itemTitleRightStyleTxt: listViewTxtColor.content,
    payItemStyleBg: indexBgColor.itemBg,
    payTypeTitleStyleTxt: listViewTxtColor.title,
    bankItemView: indexBgColor.mainBg,
    inputHolderTxt: loginAndRegeisterTxtColor.inputPlaceholder,
    dateTxt: '#FFFFFF'
};

//二维码界面样式
export const ermaStyle = {
    title: baseColor.black,
    moneyContent: baseColor.strong,
    orderTitle: baseColor.black,
    orderContent: fontColor.mainTxt,
    btmBorder: baseColor.white,
    ermaBg: baseColor.white,
    tipTxtColor: baseColor.white,
    mainBg: '#3056b2',
    btnBg: baseColor.white,
    btnTxt: '#1b81fb'
};

//复制按钮样式
export const copyBtnStyle = {
    txtColor: '#39c7ff',
    borderColor: '#39c7ff',
    btnBg: indexBgColor.itemBg
};

//代理中心
export const agentCenter = {
    topTitle: fontColor.headerTitle,
    addAccountTopTxtNormal: fontColor.headerTitle,
    addAccountTopTxtSelected: '#1D3B84',
    addAccountTopSelectedBg: baseColor.white,
    addAccountTopBorder: fontColor.headerTitle,
    addAccountTopNormalBg: 'transparent',
    accountTypeTxtSelected: baseColor.cpDetailTitle,
    accountTypeSelectBorder: baseColor.cpDetailTitle,
    accountTypeTxtUnSelected: fontColor.mainTxt,
    title: fontColor.mainTxt, //用户名，余额，彩票返点
    titleName: fontColor.mainTxt,
    content: fontColor.minorTxt,
    btnBorder: baseColor.cpDetailTitle,
    btnTxt: baseColor.cpDetailTitle,
    updateBtnBg: baseColor.cpDetailTitle,
    deleteBtnBg: baseColor.strong,
    btnAffCodeTxt: baseColor.white,
    searchBtnBg: loginAndRegeisterBgColor.loginBtn,
    searchTxt: baseColor.white,
    userLayerBtnBg: baseColor.white,
    dateTxt: fontColor.mainTxt,
    dateChoiceBtnBg: indexBgColor.itemBg,
    userLayerBtnBorder: 'black',
    balance: fontColor.strong,
    txt: 'red', //至
    lotteryRebate: 'red', //奖金组
    totalAmount1: 'red', //盈利总额
    assignValue1: '#008000',
    totalAmount2: 'red', //有效投注总额
    assignValue2: '#008000',
    dropDownStyleBg: baseColor.mainBg,
    timeViewBg: '#FFFFFF',
    timeBeginText: '#000000',
    timeEndText: '#000000',
    rowButtonBg: '#FFFFFF',
    rowBorderBottomButton: baseColor.mainBg,
    rowText: userCenterTxtColor.minorTxt,
    redNoticeView: 'red'
};

export const titleBarStyle = {
    titleText: indexTxtColor.topTitle,
    titleBorder: fontColor.headerTitle
};

export const betHome = {
    issueTxt: fontColor.mainTxt,
    timeTxt: fontColor.strong,
    openNum: fontColor.strong,
    balanceTxt: fontColor.strong,
    betTopItemBg: baseColor.itemBg,
    betMidBg: '#f6f6f6',
    betMidBorder: '#DCDCDC',
    betBtmBg: '#2B2B2B',
    shoppingCarBorder: '#d3d3d3',
    shoppingCarTxt: '#666666',
    shoppingTipBallBg: '#f28f34',
    shoppingTipBallTxt: 'white',
    btmBg: '#2B2B2B',
    btmBtnBg: '#d48f08',
    btmBtnTxt: fontColor.mainTxt,
    btmBetNumTxt: '#FFFFFF',
    btmClearBtnBg: '#ececec',
    btmMoney: 'yellow',
    btmBets: baseColor.white,
    betLeftTitle: '#23243B',
    betLeftGrayTitle: '#23243B',
    betNumBallBg: baseColor.white,
    betNumBallTxt: '#E7381B',
    betNumBallSelectBg: '#E7381B',
    betNumBallSelectTxt: baseColor.white,
    betNumBallBorder: '#CFCFCF',
    //机选按钮颜色
    betChoiceBtnBg: baseColor.itemBg,
    betChoiceBtnTxt: fontColor.mainTxt,
    betChoiceBtnBorder: '#E8E8E8',
    totalMoney: '#EEEE03',
    totalBets: fontColor.minorTxt,
    betListBg: baseColor.itemBg,
    betListNum: fontColor.strong,
    betListDes: fontColor.minorTxt,
    betTipContent: fontColor.minorTxt,
    betGSBQWTitle: fontColor.mainTxt,
    betTitle: fontColor.mainTxt,
    cpOdd: fontColor.minorTxt,
    markSixRedBo: '#d03919',
    markSixBlueBo: '#5891db',
    markSixGreenBo: '#1d9118',
    betBillInputBg: baseColor.white,
    betBillMoney: '#666666',
    betXYPKSelectBorder: '#ffc583',
    xypkBorder: '#E8E8E8',
    betLeftQDXDSQTitle: '#999999',
    betQDXDSQBarText: '#333333',
    betQDXDSQBarTextPressed: 'red',
    intelligenceBetListItemBgDeep: 'rgba(214,214,213,0.7)'
};

export const indexBtmStyle = {
    iconStyle: {
        width: G_IS_IOS ? 25 : 25,
        height: G_IS_IOS ? 25 : 25,
        marginTop: G_IS_IOS ? 18 : 30
    },
    iconStyleSelected: {
        width: G_IS_IOS ? 25 : 25,
        height: G_IS_IOS ? 25 : 25,
        marginTop: G_IS_IOS ? 18 : 30
    }
};

//通用开奖号码样式
export const commonNumBallStyles = StyleSheet.create({
    numberViewStyle: {
        backgroundColor: betHome.betNumBallBg,
        borderRadius: 30,
        marginTop: 10,
        marginBottom: 5,
        marginRight: 20,
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 0.5,
        borderColor: betHome.betNumBallBorder
    },
    numberViewSelectedStyle: {
        borderRadius: 30,
        marginTop: 10,
        marginBottom: 5,
        marginRight: 20,
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: betHome.betNumBallSelectBg
    },
    numberViewTitleStyle: {
        color: betHome.betNumBallTxt,
        fontSize: G_IS_IOS ? Size.font18 : Size.font16
        // fontWeight:'bold'
    },
    numberViewTitleSelectedStyle: {
        color: betHome.betNumBallSelectTxt,
        fontSize: G_IS_IOS ? Size.font18 : Size.font16,
        fontWeight: 'bold'
    }
});

//开奖球大厅样式
export const lotteryNumbStyle = {
    ballStyle: {
        backgroundColor: lotterBgColor.cpBallBg,
        borderRadius: 20,
        height: 25,
        width: 25,
        marginRight: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 5
    }
};

export const customButtonStyle = StyleSheet.create({
    btnBlueBorder: {
        color: baseColor.blue,
        textAlign: 'center',
        paddingVertical: 3,
        paddingHorizontal: 8,
        borderWidth: 1,
        borderColor: baseColor.blue,
        borderRadius: 5,
        backgroundColor: indexBgColor.itemBg,
        fontSize: Size.default
    }
});
