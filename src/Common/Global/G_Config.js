
import rootStore from "../../Data/store/RootStore";
import NavigatorHelper from "../JXHelper/TCNavigatorHelper";
//整合全局 不变的使用 引用 常量 减少import的数量 ，以JX_ 开头
global.JX_NavHelp = NavigatorHelper
global.JX_Store = rootStore




const hasOwn = Object.prototype.hasOwnProperty

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