import NavigationService from '../../Page/Route/NavigationService'


export default class Helper {
}

var navigator = null;

Helper.setNavigator = (args) => {
    navigator = args;
}

Helper.checkUserWhetherLogin = () => {
  //  if (userStore.userName && userStore.isLogin) return true
    return false
}


/**
 * 根据充值类型跳转
 * @param params
 */
// Helper.pushToTopUp = (params) => {
//     NavigationService.navigate("UserPayment", params);
// }

Helper.pushToTopUp = (route, params) => {
    NavigationService.navigate(route, params);
}



Helper.isTopPage = () => {
    return false;
}


/**
 * 通用----路由 pushView  配合JX_Componets, 减少 不断增加 pushToXXX的 需要
 * @param component
 * @param params
 */
Helper.pushView = (component, params) => {
    if (typeof component == 'string') {
        NavigationService.navigate(component, params)
    } else if (component && component.routName) {
        NavigationService.navigate(component.routName, params)
    }
}

Helper.popToBack = () => {
    NavigationService.goBack();
}

Helper.popToTop = () => {
    NavigationService.popToTop();
}

/**
 * 返回多级页面
 * @param n
 * @param routers
 * @param navigation
 */
Helper.popN = (n, routers, navigation) => {
    let length = routers.length;
    if (n === length - 1) {
        Helper.popToTop();
    } else if (n < length - 1) {
        let backRouter = routers[length - n - 1];
        navigation.goBack(backRouter.key);
    } else {
        return;
    }
}

Helper.popToN = (n) => {
    Helper.popN(n);
}

function routInStack(routeName, navigator) {
    let routes = navigator.getCurrentRoutes()
    if (routes.length >= 2) {
        let lastRoute = routes[routes.length - 2]
        if (lastRoute.name === routeName) {
            return true
        } else {
            return false
        }
    } else {
        return false
    }

}

/**
 * 控制页面返回任意指定页面
 * @param routers
 * @param navigation
 */
Helper.goBack = (routers, navigation) => {
    TWLog("-goBack====routers-----"+routers,routers)
    TWLog("goBack===navigation-----"+navigation,navigation)
    if (!routers) {
        Helper.popToTop();
        return;
    }
    let curentRoute = routers[routers.length - 1];
    if (curentRoute.routeName === "TCBillSucceedPage") {
        let backToPathName = curentRoute.params.pagePathName;
        for (let i = 0; i < routers.length; i++) {
            if (routers[i].routeName === backToPathName) {
                // if (i + 1 === routers.length) {
                //     navigation.goBack(null);
                //     return;
                // }
                navigation.goBack(routers[i + 1].key);
                return;
            }
        }
    } else {
        Helper.popToBack();
    }

}

module.exports = Helper

