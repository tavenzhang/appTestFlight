/**
 * Created by allen-jx on 2018/3/29.
 */
import {NavigationActions} from 'react-navigation'

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
   // TW_Log("_navigator-------",_navigator)
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
//function reset(rootRoute, displayRoute, params) {
function reset(rootRoute, params) {
    _navigator.dispatch(
        NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({routeName: rootRoute,params}),
               // NavigationActions.navigate({routeName: displayRoute, params})
            ]
        })
    )
}



export default {
    navigate,
    setTopLevelNavigator,
    goBack,
    reset,
    pop,
    popToTop,
    popN,
}
