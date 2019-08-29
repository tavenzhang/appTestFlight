/**
 * app主题配置文件
 **/
import {PixelRatio, Dimensions, Platform, StatusBar} from 'react-native'
const fontSizeScaler = PixelRatio.get() / PixelRatio.getFontScale()
global.TCLineW = (Platform.OS == 'ios' && Dimensions.get('window').width > 375) ? 0.33 : 0.5
import {StyleSheet} from 'react-native';
// 全局字体大小
export const Size = {
    xxsmall: 10 * fontSizeScaler,
    xsmall: 12 * fontSizeScaler,
    small: 14 * fontSizeScaler,
    default: 15 * fontSizeScaler,
    large: 18 * fontSizeScaler,
    xlarge: 20 * fontSizeScaler,
    xxlarge: 24 * fontSizeScaler,
    pixel: 1 / PixelRatio.get(),  // 最细边框
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
    font30: 30 * fontSizeScaler,
}
// 全局Window尺寸
export const width = Dimensions.get('window').width
export const height = Dimensions.get('window').height
//手机状态栏高度
export const statusBarHeight = Platform.OS == 'ios' ? 20 : StatusBar.currentHeight
/**
 * app主色调
 * @type {{}}
 */

export const baseColor = {
    white: '#FFFFFF',
    black: 'black',
    mainBg: '#F5F5F5',//主背景
    itemBg: '#FFFFFF',//次背景
    strong: 'red',//强调色
    tabBarBg: '#f5f5f5',//tabbar背景
    tabUnSelectTxt: "#7c7c7c",//tab字体未选中
    tabSelectedTxt: '#4292cd',//选中
    waitOpen: '#51CFAF',//等待开奖
    cpDetailTitle: '#66CCFF',//彩票详情投注号码标题
    blue: '#39c7ff'
}

const fontColor = {
    headerTitle: 'white',//主要标题色
    headerTitle1: '#C48300',//次要标题色
    mainTxt: '#333333',//主要文本色
    minorTxt: '#999999',//次要文本色
    strong: 'red',//强调色
    hotCp: '#333333',//热门彩种
    issue: 'red',//期数
    waitOpen: '#999999',//正在开奖
    betMoney: '#EEEE03',//投注金额
    withdraw: '#12b120',//提款
}


export const indexTxtColor = {
    topTitle: fontColor.headerTitle, //顶部标题
    noticeTitle: fontColor.strong,//公告标题
    noticeContent: fontColor.mainTxt,//公告内容
    midMenuTitle: ['#FF9F4B', '#02BCF2', '#00CB7C', '#FB6387'],//客服充值
    recommendKind: fontColor.hotCp,//彩种推荐
    hotKind: fontColor.hotCp,//热门彩种
    homePageHotCPTitle: ['#4292cd', '#ef2d0e', '#18a53d', '#e79811', '#ef2d0e', '#18a53d', '#e79811'],//彩种标题
    cpDescription: fontColor.minorTxt,//彩票描述
    cpTitle: fontColor.mainTxt,//彩票标题
    winnerTitle: fontColor.mainTxt,//中奖榜标题
    winner: fontColor.mainTxt,//中奖用户名
    winnerMoney: fontColor.strong,//中奖金额
    winnerCpName: fontColor.mainTxt,//彩票类型
    bottomMenuTitleNormal: baseColor.tabUnSelectTxt,//底部菜单未选中
    bottomMenuTitlePressed: baseColor.tabSelectedTxt,//底部菜单选中
    updateTip: fontColor.mainTxt,//更新提示

}

export const indexBgColor = {
    mainBg: baseColor.mainBg,//主页背景颜色
    itemBg: baseColor.itemBg,//主页子项颜色
    tabBg: baseColor.tabBarBg,//tabBar背景
    noticeBg: baseColor.itemBg,//公告背景
    homeHistoryEvenBg: baseColor.mainBg,//投注页面历史偶数行背景
}

export const borderColor = {}

//购彩大厅
export const shoppingTxtColor = {
    tabTitleNormal: fontColor.minorTxt,//tab未选中
    tabTitlePressed: fontColor.strong,//tab选中
    tabLine: fontColor.strong,//指示条
    cpTitle: fontColor.mainTxt,//彩票标题
    cpNum: fontColor.strong,//彩票开奖号码
    cpLastIssueNumber: fontColor.issue,//彩票最新期号
    cpTipTxt: fontColor.minorTxt,//彩票提示
    cpTime: fontColor.minorTxt,//彩票倒计时
    cpLotteryTip: fontColor.waitOpen,//正在开奖提示
}

//开奖大厅
export const lotteryTxtColor = {
    cpTitle: fontColor.mainTxt,//彩票标题
    cpTime: fontColor.minorTxt,//彩票倒计时
    cpLastIssueNumber: fontColor.minorTxt,//彩票最新期号
    cpDate: fontColor.minorTxt,//彩票日期
    cpNum: baseColor.white,//彩票号码
    waitTxt: baseColor.white,//等待开奖
    operator: fontColor.mainTxt,//操作符号
    cpTip: fontColor.mainTxt,//彩票提示
}

export const lotterBgColor = {
    cpBallBg: '#5891db',//号码球背景
    waitLotteryBg: '#5B5FE3',//等待开奖背景
    newLotteryBg: '#5B5FE3',//新彩种开奖背景
}

//登录注册样式
export const loginAndRegeisterTxtColor = {
    inputPlaceholder: fontColor.minorTxt,//输入框提示
    forgetPwd: '#1b81fb',//忘记密码
    loginTxt: fontColor.headerTitle,//登录文本
    regTxt: fontColor.headerTitle,//注册文本
    freePlay: '#3056b2',//试玩文本
    inputTxt: 'black',//输入文本
    protocolTxt: fontColor.mainTxt,//协议
    userProtocol: '#1b81fb',
    freePlayTip: '#3056b2',//免费试玩提醒
}

export const loginAndRegeisterBgColor = {
    loginBtn: '#3056b2',//登录按钮
    regBtn: '#3056b2',//注册按钮
    freePlayBtn: baseColor.white,//试玩按钮
    inputBg: baseColor.white,//输入框背景,
    unableBtn: '#cccccc'
}

export const loginAndRegeisterBorderColor = {
    inputBorder: fontColor.minorTxt,//输入框边框
    forgetPwd: baseColor.white,//文本下划线
}

//个人中心
export const userCenterTxtColor = {
    userName: fontColor.headerTitle,//用户名
    balance: fontColor.mainTxt,//余额
    balanceTitle: fontColor.mainTxt,//余额标题
    fresh: fontColor.mainTxt,//刷新
    charge: fontColor.mainTxt,//充值
    withdraw: fontColor.mainTxt,//提款
    orderItemLeftTitle: fontColor.mainTxt,//订单Item标题
    orderItemRightTitle: fontColor.mainTxt,
    unKJOrder: fontColor.mainTxt,//未开奖订单
    zjOrder: fontColor.mainTxt,//中奖订单
    kjOrder: fontColor.mainTxt,//开奖订单
    menuItemTitle: fontColor.mainTxt,//菜单标题
    userDetailTitle: fontColor.mainTxt,//个人详细界面标题
    settingTitle: fontColor.mainTxt,//设置界面
    version: fontColor.mainTxt,//版本号
    feedBackTitle: fontColor.mainTxt,//意见反馈
    msgPiontTxt: baseColor.white,
    msgPiontBg: baseColor.strong,
    signInBgColor:'#FF8500' //签到后按钮背景颜色
}
export const userCenterBorderColor = {
    freshBorder: fontColor.mainTxt
}

//列表界面样式
export const listViewTxtColor = {
    title: fontColor.mainTxt,
    content: fontColor.minorTxt,
    redTip: fontColor.strong,
    greenTip: fontColor.withdraw,
    bankTitle: baseColor.white,
    homeHistoryStrong: fontColor.mainTxt,
}

//弹出框样式
export const popuWinStyle = {
    titleColor: indexTxtColor.topTitle,
    titleBorder: loginAndRegeisterBorderColor.inputBorder,
    contentTxt: '#696969',
    contentBorder: fontColor.strong,
    contentBtn: loginAndRegeisterBgColor.inputBg,
    unSelectBorder: '#e5e5e5',
    contentSelectBtnTxt: '#696969'
}

//通用按钮样式
export const buttonStyle = {
    btnBg: loginAndRegeisterBgColor.loginBtn,
    btnTxtColor: loginAndRegeisterTxtColor.loginTxt,
    btnBorder: loginAndRegeisterBorderColor.inputBorder,
    btnRedBg: baseColor.strong,
    btnUnableBg: loginAndRegeisterBgColor.loginBtn
}
//通用输入框样式
export const inputStyle = {
    inputBg: loginAndRegeisterBgColor.inputBg,
    inputTxt: loginAndRegeisterTxtColor.inputTxt,
    inputPlaceholder: loginAndRegeisterTxtColor.inputPlaceholder,
    inputBorder: loginAndRegeisterBorderColor.inputBorder
}

//通用dropDown样式
export const dropDownStyle = {
    dropBorder: fontColor.minorTxt,
    dropBg: loginAndRegeisterBgColor.inputBg,
    dropTxt: loginAndRegeisterTxtColor.inputTxt
}

//充值样式
export const payTxtColor = {
    payMoney: fontColor.strong,
    payMoneyTip: fontColor.mainTxt,
    moneyChecked: baseColor.white,
    moneyUnChecked: baseColor.strong,
    payDes: baseColor.strong
}

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
}

//复制按钮样式
export const copyBtnStyle = {
    txtColor: '#39c7ff',
    borderColor: '#39c7ff',
    btnBg: indexBgColor.itemBg
}

//代理中心
export const agentCenter = {
    addAccountTopTxtNormal: fontColor.headerTitle,
    addAccountTopTxtSelected: '#1D3B84',
    addAccountTopSelectedBg: baseColor.white,
    addAccountTopBorder: fontColor.headerTitle,
    addAccountTopNormalBg: 'transparent',
    accountTypeTxtSelected: baseColor.cpDetailTitle,
    accountTypeSelectBorder: baseColor.cpDetailTitle,
    accountTypeTxtUnSelected: fontColor.mainTxt,
    title: fontColor.mainTxt,
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
    balance:fontColor.strong,
}

export const titleBarStyle = {
    titleText: indexTxtColor.topTitle,
    titleBorder: fontColor.headerTitle
}


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
    betQDXDSQBarText:'#333333',
    betQDXDSQBarTextPressed: 'red',
    intelligenceBetListItemBgDeep: 'rgba(214,214,213,0.7)',
}

export const indexBtmStyle = {
    iconStyle: {
        width: Platform.OS === 'ios' ? 25 : 25,
        height: Platform.OS === 'ios' ? 25 : 25,
        marginTop: Platform.OS === 'ios' ? 18 : 30
    },
    iconStyleSelected: {
        width: Platform.OS === 'ios' ? 25 : 25,
        height: Platform.OS === 'ios' ? 25 : 25,
        marginTop: Platform.OS === 'ios' ? 18 : 30
    },
}

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
        backgroundColor: betHome.betNumBallSelectBg,
    },
    numberViewTitleStyle: {
        color: betHome.betNumBallTxt,
        fontSize: Size.font18,
        // fontWeight:'bold'
    },
    numberViewTitleSelectedStyle: {
        color: betHome.betNumBallSelectTxt,
        fontSize: Size.font18,
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
        marginBottom: 5,
    }
}