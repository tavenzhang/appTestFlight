/**
 * Created by allen-jx on 2018/3/29.
 */
import {NavigationActions} from 'react-navigation'

let _navigator;
function setTopLevelNavigator(navigatorRef) {
    _navigator = navigatorRef;
}

/**
 * 跳转到指定页面
 * @param routeName 页面名字
 * @param params 参数
 */
function navigate(routeName, params) {
    _navigator.dispatch(
        NavigationActions.navigate({
            type: NavigationActions.NAVIGATE,
            routeName,
            params
        })
    )
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

export default {
    navigate,
    setTopLevelNavigator,
    goBack,
    reset,
    pop,
    popToTop,
    login,
    tokenIsError,
    loadingWebViewWithUrl
}