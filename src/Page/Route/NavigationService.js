/**
 * Created by allen-jx on 2018/3/29.
 */
import {NavigationActions} from 'react-navigation'
import Helper from '../../Common/JXHelper/JXHelper'
import Toast from '../../Common/JXHelper/JXToast'
import NavigatorHelper from "../../Common/JXHelper/TCNavigatorHelper";

let _navigator;

function setTopLevelNavigator(navigatorRef) {
    _navigator = navigatorRef;
}

let debounce = true; // 防止快速点击操作

/**
 * 跳转到指定页面
 * @param routeName 页面名字
 * @param params 参数
 */
function navigate(routeName, params) {
  if (debounce) {
    debounce = false
    _navigator.dispatch(
        NavigationActions.navigate({
          type: NavigationActions.NAVIGATE,
          routeName,
          params
        })
    )
    setTimeout(() => {
      debounce = true
    }, 1000)
  }
}


/**
 * 返回
 */
function goBack() {
    _navigator.dispatch(
        NavigationActions.back()
    )
}

/**
 * 返回到顶部
 */
function popToTop() {
    _navigator.dispatch(
        NavigationActions.popToTop()
    )
}

function popN(n) {
    _navigator.dispatch(
        NavigationActions.popN(n)
    )
}

/**
 * 返回指定层级页面
 * @param n
 * @param params
 */
function pop(n, params) {
    _navigator.dispatch(
        NavigationActions.pop(n, params)
    )
}

/**
 * 重置导航
 * @param index
 * @param routeName
 */
function reset(rootRoute, displayRoute, params) {
    _navigator.dispatch(
        NavigationActions.reset({
            index: 1,
            actions: [
                NavigationActions.navigate({routeName: rootRoute}),
                NavigationActions.navigate({routeName: displayRoute, params})
            ]
        })
    )
}

function login(isBackTop) {
    navigate("UserLogin", {isBackTop: isBackTop});
}

/**
 * token失效
 */
function tokenIsError() {
    login(false);
}

/**
 * 跳转到webview
 * @param url
 * @param title
 */
function loadingWebViewWithUrl(url, title) {
    navigate("WebView", {url: url, title: title})
}

/**
 * 跳转到投注界面
 * @param data
 */
function pushToBetHome(data) {
    let page = null;
    switch (data.gameUniqueId) {
        case 'HF_JSMS':
        case 'MARK_SIX':
        case '六合彩': {
            page = 'MarkSixBetHome';
        }
            break
        case 'HF_FFSSC':
        case 'HF_LFSSC':
        case "HF_CQSSC":
        case 'HF_TJSSC':
        case 'HF_XJSSC':
        case 'HF_JXSSC':
        case '重庆时时彩': {
            page = 'ChongQingSSCBetHome';
        }
            break
        case 'HF_LFD11':
        case 'HF_GDD11':
        case 'HF_AHD11':
        case 'HF_JXD11':
        case 'HF_SDD11':
        case 'HF_SHD11':
        case '山东11选5': {
            page = 'TCShangDong115BetHome';
        }
            break
        case 'HF_FFPK10':
        case 'HF_LFPK10':
        case 'HF_BJPK10':
        case '北京PK10': {
            page = 'TCBJPK10BetHome';
        }
            break
        case 'HF_CQKL10F':
        case 'HF_TJKL10F':
        case 'HF_GDKL10F':
        case '重庆快乐十分': {
            page = 'TCKL10FBetHome';
        }
            break

        case 'HF_JND28':
        case 'HF_LF28':
        case 'HF_SG28':
        case 'HF_BJ28': {
            page = 'TCPCDDBetHome';
        }
            break

        case 'X3D':
        case '福彩3D':
        case 'HF_SHSSL':
        case 'HF_JS3D':
        case 'PL3': {
            page = 'TCSSLBetHome';
        }
            break
        // 七星彩
        case 'QXC': {
            page = 'QXCBetHome';
        }
            break
        case 'HF_FFK3':
        case 'HF_LFK3':
        case 'HF_BJK3':
        case 'HF_JLK3':
        case 'HF_AHK3':
        case 'HF_GXK3':
        case "HF_HBK3":
        case "HF_GSK3":
        case "HF_SHK3":
        case 'HF_JSK3':
        case 'HF_KUAI3': {
            page = 'TCK3BetHome';
        }
            break
        case 'HF_LFKLPK':
            page = 'TCHappyPokerBetHome';
            break
        case 'HF_XYFT':
        case 'HF_XYSM':
            page = 'TCXYFTBetHome';
            break
    }

    if (data.gameUniqueId == 'more' || data.gameUniqueId == '更多玩法') {
        this.props.mainStore.changeTab('shoping');
        return;
    }
    //跳转到PCDD
    if (data.gameUniqueId == 'PCDD' || data.gameNameInChinese == 'PC蛋蛋') {
        NavigatorHelper.gotoPCDD(this.props.cpArray);
        return;
    }

    let model = Helper.getGameInfoWithUniqueId(data.gameUniqueId)
    if (!model || !model.status || model.status != 'NORMAL') {
        Toast.showShortCenter('该玩法维护中暂停开放');
        return
    }
    if (navigator && page) {
        navigate(page, {title: data.gameNameInChinese, gameUniqueId: data.gameUniqueId, pagePathName: page})
    } else {
        Toast.showShortCenter('该玩法暂未开放')
    }
}

export default {
    navigate,
    setTopLevelNavigator,
    goBack,
    reset,
    pop,
    popToTop,
    login,
    tokenIsError,
    loadingWebViewWithUrl,
    pushToBetHome,
    popN,
}
