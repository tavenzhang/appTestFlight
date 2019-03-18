
import rootStore from "../../Data/store/RootStore";
import NavigatorHelper from "../JXHelper/TCNavigatorHelper";
import { Text } from 'react-native';

// 关闭应用中字体适应系统字体变化的效果
Text.defaultProps = { ...Text.defaultProps, allowFontScaling: false};

global.TW_Log = (string, str2) => {
    if (str2) {
        if (__DEV__) console.log(string, str2)
    } else if (__DEV__) console.log(string)
}

//整合全局 不变的使用 引用 常量 减少import的数量 ，以JX_ 开头
global.TW_NavHelp = NavigatorHelper;
global.TW_Store = rootStore;

const hasOwn = Object.prototype.hasOwnProperty;

function is(x, y) {
    if (x === y) {
        return x !== 0 || y !== 0 || 1 / x === 1 / y
    } else {
        return x !== x && y !== y
    }
}

//浅层比较 用户特殊 shouldComponentUpdate 优化比较
global.JX_ShallowEqual= shallowEqual=(objA, objB)=> {
    if (is(objA, objB)) return true

    if (typeof objA !== 'object' || objA === null ||
        typeof objB !== 'object' || objB === null) {
        return false
    }

    const keysA = Object.keys(objA)
    const keysB = Object.keys(objB)

    if (keysA.length !== keysB.length) return false

    for (let i = 0; i < keysA.length; i++) {
        if (!hasOwn.call(objB, keysA[i]) ||
            !is(objA[keysA[i]], objB[keysA[i]])) {
            return false
        }
    }

    return true
}


global.TW_GetQueryString= (name,url="") =>{
    let myUrl=url;
    let hasindex= myUrl.indexOf("?");
    TW_Log("TW_GetQueryString--url--"+myUrl+"--hasindex--"+hasindex);
    if(hasindex>-1){
        myUrl = myUrl.substr(hasindex);
    }

    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = myUrl.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}

