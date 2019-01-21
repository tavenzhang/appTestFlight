/**
 * app主题配置文件
 **/
import {
    PixelRatio,
    Dimensions,
    Platform,
    StatusBar
} from 'react-native'
//const fontSizeScaler = JX_ProjectName === 'JD' ? 1 : PixelRatio.get() / PixelRatio.getFontScale()
const fontSizeScaler =1;
global.TCLineW = (Platform.OS == 'ios' && Dimensions.get('window').width > 375) ? 0.33 : 0.5
import {
    StyleSheet
} from 'react-native';
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
        font30: 30 * fontSizeScaler,
    }
    // 全局Window尺寸
export const width = Dimensions.get('window').width
export const height = Dimensions.get('window').height
    //手机状态栏高度
export const statusBarHeight = Platform.OS == 'ios' ? (isIphoneX()?44:20) : StatusBar.currentHeight

// iPhoneX
const X_WIDTH = 375;
const X_HEIGHT = 812;

const JX_IPHON_X = Platform.OS === 'ios' &&
    ((height === X_HEIGHT && width === X_WIDTH) ||
    (height === X_WIDTH && width === X_HEIGHT))



export function isIphoneX() {
    return JX_IPHON_X
}

// export const JX_PLAT_INFO = {
//     IS_IOS:Platform.OS == 'ios',
//     MarginBarHeight:Platform.OS == 'ios' ? (JX_IPHON_X ? 45:20):0,
//     IS_IphoneX:JX_IPHON_X
// }

export const navbarHight = Platform.OS == 'ios'? (isIphoneX()?88:64):44
export const navbarMarginTop = Platform.OS == 'ios'? (isIphoneX()?44:20):0
export const bottomNavHeight = Platform.OS == 'ios'? (isIphoneX()?83:50):49
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
    tabUnSelectTxt: "#7c7c7c", //tab字体未选中
    tabSelectedTxt: 'red', //选中
    waitOpen: '#51CFAF', //等待开奖
    cpDetailTitle: '#66CCFF', //彩票详情投注号码标题
    blue: '#39c7ff'
}

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
}


export const indexTxtColor = {
    topTitle: fontColor.headerTitle, //顶部标题
    noticeTitle: fontColor.strong, //公告标题
    noticeContent: fontColor.mainTxt, //公告内容
    midMenuTitle: ['#FF9F4B', '#02BCF2', '#00CB7C', '#FB6387'], //客服充值
    recommendKind: fontColor.hotCp, //彩种推荐
    hotKind: fontColor.hotCp, //热门彩种
    homePageHotCPTitle: ['#4292cd', '#ef2d0e', '#18a53d', '#e79811', '#ef2d0e', '#18a53d', '#e79811'], //彩种标题
    cpDescription: fontColor.minorTxt, //彩票描述
    cpTitle: fontColor.mainTxt, //彩票标题
    winnerTitle: fontColor.mainTxt, //中奖榜标题
    winner: fontColor.mainTxt, //中奖用户名
    winnerMoney: fontColor.strong, //中奖金额
    winnerCpName: fontColor.mainTxt, //彩票类型
    bottomMenuTitleNormal: baseColor.tabUnSelectTxt, //底部菜单未选中
    bottomMenuTitlePressed: baseColor.tabSelectedTxt, //底部菜单选中
    updateTip: fontColor.mainTxt, //更新提示

}

export const indexBgColor = {
    mainBg: baseColor.mainBg, //主页背景颜色
    itemBg: baseColor.itemBg, //主页子项颜色
    tabBg: baseColor.tabBarBg, //tabBar背景
    noticeBg: baseColor.itemBg, //公告背景
    homeHistoryEvenBg: baseColor.mainBg, //投注页面历史偶数行背景
}

// 下拉刷新控件progress主题样式
export const refreshColor = {
    progress: ['#00f8f5', '#32fdf6', '#9efef7', '#dafffc'],
    progressBackground: '#f74953'
}

export const borderColor = {}

/**
 * 转账界面颜色
 */
export const transferColor = {
    title1: "#999999",
    title2: "#333333",
    title3: "#666666",
    title4: "#040404",
    money1: "#f26921",
    money2: "#3399ff",
    buttonBg1: "#e60012",
    buttonBg2: "#434a64",
    border1: "#e60012",
    border2: "#434a64"
}

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
    cpLotteryTip: fontColor.waitOpen, //正在开奖提示
}

//开奖大厅
export const lotteryTxtColor = {
    cpTitle: fontColor.mainTxt, //彩票标题
    cpTime: fontColor.minorTxt, //彩票倒计时
    cpLastIssueNumber: fontColor.minorTxt, //彩票最新期号
    cpDate: fontColor.minorTxt, //彩票日期
    cpNum: baseColor.white, //彩票号码
    waitTxt: baseColor.white, //等待开奖
    operator: fontColor.mainTxt, //操作符号
    cpTip: fontColor.mainTxt, //彩票提示
}

export const lotterBgColor = {
    cpBallBg: '#FF4301', //号码球背景
    waitLotteryBg: '#5B5FE3', //等待开奖背景
    newLotteryBg: '#5B5FE3', //新彩种开奖背景
}

//登录注册样式
export const loginAndRegeisterTxtColor = {
    inputPlaceholder: fontColor.minorTxt, //输入框提示
    forgetPwd: 'red', //忘记密码
    loginTxt: fontColor.headerTitle, //登录文本
    regTxt: fontColor.headerTitle, //注册文本
    freePlay: 'red', //试玩文本
    inputTxt: 'black', //输入文本
    protocolTxt: fontColor.mainTxt, //协议
    userProtocol: '#1b81fb',
    freePlayTip: '#3056b2', //免费试玩提醒
}

export const loginAndRegeisterBgColor = {
    loginBtn: 'red', //登录按钮
    regBtn: 'red', //注册按钮
    freePlayBtn: baseColor.white, //试玩按钮
    inputBg: baseColor.white, //输入框背景,
    unableBtn: '#cccccc'
}

export const loginAndRegeisterBorderColor = {
    inputBorder: fontColor.minorTxt, //输入框边框
    forgetPwd: baseColor.white, //文本下划线
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
}



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