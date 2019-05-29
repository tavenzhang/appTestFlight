/**
 * Created by Sam on 2016/12/6.
 */
import _ from 'lodash';
import moment from "moment-timezone";
//var Banks = require('../../Data/banks.json');



Array.prototype.remove = function (val) {
    var index = this.indexOf(val);
    if (index > -1) {
        this.splice(index, 1);
    }
};

Object.assign(Number.prototype, {
    accAdd(arg1) {
        let r1, r2, m, c;
        let arg2 = this;
        try {
            r1 = arg1.toString().split(".")[1].length;
        }
        catch (e) {
            r1 = 0;
        }
        try {
            r2 = this.toString().split(".")[1].length;
        }
        catch (e) {
            r2 = 0;
        }
        c = Math.abs(r1 - r2);
        m = Math.pow(10, Math.max(r1, r2));
        if (c > 0) {
            var cm = Math.pow(10, c);
            if (r1 > r2) {
                arg1 = Number(arg1.toString().replace(".", ""));
                arg2 = Number(arg2.toString().replace(".", "")) * cm;
            } else {
                arg1 = Number(arg1.toString().replace(".", "")) * cm;
                arg2 = Number(arg2.toString().replace(".", ""));
            }
        } else {
            arg1 = Number(arg1.toString().replace(".", ""));
            arg2 = Number(arg2.toString().replace(".", ""));
        }
        return (arg1 + arg2) / m;
    },

    accSub(arg2) {
        let r1, r2, m, n;
        try {
            r1 = this.toString().split(".")[1].length;
        }
        catch (e) {
            r1 = 0;
        }
        try {
            r2 = arg2.toString().split(".")[1].length;
        }
        catch (e) {
            r2 = 0;
        }
        m = Math.pow(10, Math.max(r1, r2)); //last modify by deeka //动态控制精度长度
        n = (r1 >= r2) ? r1 : r2;
        return ((this * m - arg2 * m) / m).toFixed(n);
    },
    accMul(arg2) {
        let arg1 = this;
        let m = 0, s1 = arg1.toString(), s2 = arg2.toString();
        try {
            m += s1.split(".")[1].length;
        }
        catch (e) {
        }
        try {
            m += s2.split(".")[1].length;
        }
        catch (e) {
        }
        return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
    },
    accDiv(arg2) {
        let arg1 = this;
        let t1 = 0, t2 = 0, r1, r2;
        try {
            t1 = arg1.toString().split(".")[1].length;
        }
        catch (e) {
        }
        try {
            t2 = arg2.toString().split(".")[1].length;
        }
        catch (e) {
        }

        r1 = Number(arg1.toString().replace(".", ""));
        r2 = Number(arg2.toString().replace(".", ""));
        return (r1 / r2) * Math.pow(10, t2 - t1);

    }

});


let Helper = {};

Helper.getRandomNumber = (MaxDigits) => {
    return _.random(MaxDigits)
}

Helper.getTimeRegularTimeZone = (time, format) => {
    return moment.tz(time, "Asia/Shanghai").format(format);
}

Helper.getRandomChars = (randomFlag, min, max) => {
    var str = ""
    var range = min
    let arr = ['a', 'A', 'b', 'B', 'c', 'C', 'd', 'D', 'e', 'E', 'f', 'F', 'g', 'G', 'h', 'H', 'i', 'I', 'j', 'J', 'k', 'K', 'l', 'L', 'm', 'M', 'n', 'N', 'o', 'O', 'p', 'P', 'q', 'Q', 'r', 'R', 's', 'S', 't', 'T', 'u', 'U', 'v', 'V', 'w', 'W', 'x', 'X', 'y', 'Y', 'z', 'Z'];
    // 随机产生
    if (randomFlag) {
        range = Math.round(Math.random() * (max - min)) + min;
    }
    for (var i = 0; i < range; i++) {
        let pos = Math.round(Math.random() * (arr.length - 1));
        str += arr[pos];
    }
    let a = Math.floor(Math.random() * (999999 - 100000)) + 100000;
    return a + str;
}

Helper.getRandomNumberWithFoo = (MaxDigits) => {
    return Helper.foo(_.random(MaxDigits))
}


Helper.calc = (n) => {
    if (n > 0) return (Helper.calc(n - 1) * n);
    return (1)
}

Helper.getCombinatorialNumber = (m, n) => {
    return ( Helper.calc(m) / (Helper.calc(m - n) * Helper.calc(n)))
}

Helper.hasDot = (num) => {
    if (!isNaN(num)) {
        return ((num + '').indexOf('.') != -1) ? true : false;
    }
    return true
}

Helper.foo = (str) => {
    str = '0' + str;
    return str.substring(str.length - 2, str.length);
}

/***  业务相关  ***/
Helper.gameUniqueIDIsMarkSix = (gameUniqueId) => {
    if (gameUniqueId === 'MARK_SIX' || gameUniqueId === 'HF_JSMS') {
        return true
    }
    return false
}

Helper.getGameInfoWithUniqueId = (gameUniqueId) => {
    if (TCHomeContents.content) {
        let gameInfosHot = TCHomeContents.content.gameInfosHot
        let gameInfosRecommend = TCHomeContents.content.gameInfosRecommend
        let array = gameInfosHot
        if (gameInfosHot && gameInfosRecommend) {
            array = _.concat(gameInfosHot, gameInfosRecommend)
        }
        for (let item in array) {
            if (array[item].gameUniqueId === gameUniqueId) {
                return array[item]
            }
        }
    }
    return null
}

Helper.currentTwoDataHandle = (data) => {
    let current = data.current
    let rightData = {}
    let lastOpen = data.lastOpen
    if (current.stopOrderTimeEpoch - current.currentTimeEpoch > 1) {
        //正常
        rightData = current
        rightData.remainingTime = current.stopOrderTimeEpoch - current.currentTimeEpoch
        rightData.nextremainingTime = current.nextStopOrderTimeEpoch - current.stopOrderTimeEpoch - 1
        data.rightData = rightData
    } else {
        //服务器超时处理 用下一期的期号与时间
        rightData.remainingTime = current.nextStopOrderTimeEpoch - current.currentTimeEpoch - 1 //剩余时间
        rightData.planNo = current.nextPlanNo
        rightData.uniqueIssueNumber = current.nextUniqueIssueNumber
        rightData.gameNameInChinese = current.gameNameInChinese
        rightData.gameUniqueId = current.gameUniqueId
        rightData.nextUniqueIssueNumber = null
        rightData.nextremainingTime = 0
        data.rightData = rightData
    }
    if (lastOpen) {
        let openCode = lastOpen.openCode
        if (openCode) {
            openCode = openCode.replace(/,/g, ' ')
        } else {
            openCode = ' 等待开奖'
        }
        lastOpen.lastOpenCode = openCode
        data.lastOpen = lastOpen
    } else {
        lastOpen = {}
        let openCode = ' 等待开奖'
        lastOpen.lastOpenCode = openCode
        data.lastOpen = lastOpen
    }
    return data
}

Helper.currentResultsDataHandle = (data) => {
    for (let j = 0, len = data.length; j < len; j++) {
        let d = data[j]
        if (d.stopOrderTimeEpoch - d.currentTimeEpoch > 1) {
            //正常
            d.remainingTime = d.stopOrderTimeEpoch - d.currentTimeEpoch - 1
            d.nextremainingTime = d.nextStopOrderTimeEpoch - d.stopOrderTimeEpoch - 1 //剩余时间
        } else {
            //服务器超时处理 用下一期的期号与时间
            d.remainingTime = d.nextStopOrderTimeEpoch - d.currentTimeEpoch - 1 //剩余时间
            d.planNo = d.nextPlanNo
            d.uniqueIssueNumber = d.nextUniqueIssueNumber
            d.nextremainingTime = 0
        }
    }
    return data
}


Helper.currentTwoDataHandleForLast = (data) => {
    //倒计时结束强制用下一期的期号与时间
    let current = data.current
    let rightData = {}
    rightData.remainingTime = current.nextStopOrderTimeEpoch - current.stopOrderTimeEpoch - 1//剩余时间
    rightData.planNo = current.nextPlanNo
    rightData.uniqueIssueNumber = current.nextUniqueIssueNumber
    rightData.gameNameInChinese = current.gameNameInChinese
    rightData.gameUniqueId = current.gameUniqueId
    rightData.nextUniqueIssueNumber = null
    // rightData.now = new Date().getTime()
    data.rightData = rightData

    let lastOpen = {}
    let openCode = ' 等待开奖'
    lastOpen.lastOpenCode = openCode
    lastOpen.planNo = current.planNo
    data.lastOpen = lastOpen
    return data
}

Helper.inspectResultsData = (data) => {
    //开奖结果数据校验

}

Helper.getTimeHHMMSSWithSecond = (time) => {
    let hh = '00'
    let mm = '00'
    let ss = '00'
    if (time <= 0) {
        return hh + ":" + mm + ":" + ss
    }
    if (time) {
        hh = Math.floor(time / 3600)
        if (hh < 0) {
            hh = 0
        }
        hh = hh < 10 ? "0" + hh : hh
    }

    if (time) {
        mm = Math.floor(time % 3600 / 60)
        if (mm < 0) {
            mm = 0
        }
        mm = mm < 10 ? "0" + mm : mm
    }
    if (time) {
        ss = Math.floor(time % 60)
        if (ss < 0) {
            ss = 0
        }
        ss = ss < 10 ? "0" + ss : ss
    }
    return hh + ":" + mm + ":" + ss
}


/** 获取用户协议 */
Helper.getGeneralContents = (type) => {
    if (TCHomeContents.content) {
        let generalContents = TCHomeContents.content.generalContents
        for (var i = 0; i < generalContents.length; i++) {
            if (generalContents[i].type === type) {
                return generalContents[i].contentUrl
            }
        }
    }
    return null
}

/** 获取智能追号开关 */
Helper.getChaseNumberOn = () => {
    let otherSetting = Helper.getotherSettings()
    if (otherSetting) {
        return otherSetting.chaseNumberOn
    }
    return false
}

/** 获取智能追号说明网址 */
Helper.getChaseNumberIntro = () => {
    let otherSetting = Helper.getotherSettings()
    if (otherSetting) {
        return otherSetting.chaseNumberIntro
    }
    return null
}

/** 获取游客奖金租 */
Helper.getVisitorPrizeGroup = () => {
    let otherSetting = Helper.getotherSettings()
    if (otherSetting) {
        return otherSetting.visitorPrizeGroup
    }
    return ''
}

/** 获取代理说明网址 */
Helper.getAgentInstruction = () => {
    let otherSetting = Helper.getotherSettings()
    if (otherSetting) {
        return otherSetting.agentInstruction
    }
    return null
}

/** 获取web用户注册网址 */
Helper.getWebUserRegister = () => {
    let otherSetting = Helper.getotherSettings()
    if (otherSetting) {
        return otherSetting.wapUserRegUrl
    }
    return null
}

/** 获取银行卡logo网址 */
Helper.getBankCardLogo = () => {
    let otherSetting = Helper.getotherSettings()
    if (otherSetting) {
        return otherSetting.bankCardLogoUrlPrefix
    }
    return null
}

/** 获取Wap分享链接 */
Helper.getShareUrl4Wap = () => {
    let otherSetting = Helper.getotherSettings()
    if (otherSetting) {
        return otherSetting.shareUrl4Wap
    }
    return null
}

/** 获取IOS分享链接 */
Helper.getShareUrl4Ios = () => {
    let otherSetting = Helper.getotherSettings();
    if (otherSetting) {
        return otherSetting.shareUrl4Ios
    }
    return null
}

/** 获取Android分享链接 */
Helper.getShareUrl4Android = () => {
    let otherSetting = Helper.getotherSettings();
    if (otherSetting) {
        return otherSetting.shareUrl4Android
    }
    return null
}

/** 判断本地或网络获取图片 */
// Helper.determineLocal = (bankCode) => {
//     let localBanks = Banks.exclude.banks;
//     for (let i = 0; i < localBanks.length; i++) {
//         if (bankCode === localBanks[i].code) {
//             return true;
//         }
//     }
//     return false;
// }

/** 获取开通的体育和电子平台链接 */
Helper.getDSFOpenList = () => {
    let dsfInfos ={}

    function filterSelfGamePlatformType(data) {
        return _.filter(data,(platform) => {
            return platform.gamePlatformType == 1
        })
    }

    if (TCHomeContents.content) {
        let dsfEgameInfos = filterSelfGamePlatformType(TCHomeContents.content.dsfEgameInfos)
        let dsfSportInfos = filterSelfGamePlatformType(TCHomeContents.content.dsfSportInfos)
        let dsfCardInfos = filterSelfGamePlatformType(TCHomeContents.content.dsfCardInfos)
        let array = []
        if(!_.isEmpty(dsfSportInfos)){
            array =[...array, ...dsfSportInfos]
        }
        if(!_.isEmpty(dsfEgameInfos)){
            array =[...array, ...dsfEgameInfos]
        }
        if(!_.isEmpty(dsfCardInfos)){
            array =[...array, ...dsfCardInfos]
        }
        dsfInfos.dsfAll = array;
        dsfInfos.dsfEgameInfos = dsfEgameInfos
        dsfInfos.dsfSportInfos = dsfSportInfos
        dsfInfos.dsfCardInfos = dsfCardInfos
    }
    return dsfInfos
}

Helper.getBankBackground = (bankCode) => {
    return {uri: Helper.getBankCardLogo() + bankCode + '_bg.png'};
}

Helper.getBankIcon = (bankCode) => {
    return {uri: Helper.getBankCardLogo() + bankCode + '.png'}
}

Helper.getotherSettings = () => {
    if (TCHomeContents.content) {
        let otherSetting = TCHomeContents.content.otherSettings
        return otherSetting
    }
    return null
}

/** 获取图标菜单链接 */
Helper.getMenuIconsUrl = (type) => {
    if (TCHomeContents.content) {
        let menuIcons = TCHomeContents.content.menuIcons;
        for (var i = 0; i < menuIcons.length; i++) {
            if (menuIcons[i].type === type) {
                return menuIcons[i].contentUrl
            }
        }
    }
    return null
}

Helper.getGameIconWithUniqueId = (id) => {

    let icon = gameIconKeyValue[(id)]
    if (icon == null) {
        icon = defaultCpIcon
    }
    return icon
}

Helper.getUserIconShowName = (str) => {
    if (typeof str !== 'string') {
        return ''
    }
    let a = str.toUpperCase()
    // let b = a.replace(/(.)(?=.*\1)/g,"")
    var value1 = a.replace(/[^A-Z]+/ig, "");
    var value2 = a.replace(/[^0-9]/ig, "");
    if (value1.length > 0 && value2.length > 0) {
        value1 = value1.substr(0, 1) + value2.substr(0, 1);
        return value1
    }
    if (a.length >= 2) {
        a = a.substr(0, 2);
        return a
    }
    return ''
}

Helper.regularTestUrl = (url) => {
    var strRegex = '^((https|http|ftp|rtsp|mms)?://)'
        + '?(([0-9a-z_!~*\'().&=+$%-]+: )?[0-9a-z_!~*\'().&=+$%-]+@)?' //ftp的user@
        + '(([0-9]{1,3}.){3}[0-9]{1,3}' // IP形式的URL- 199.194.52.184
        + '|' // 允许IP和DOMAIN（域名）
        + '([0-9a-z_!~*\'()-]+.)*' // 域名- www.
        + '([0-9a-z][0-9a-z-]{0,61})?[0-9a-z].' // 二级域名
        + '[a-z]{2,6})' // first level domain- .com or .museum
        + '(:[0-9]{1,4})?' // 端口- :80
        + '((/?)|' // a slash isn't required if there is no file name
        + '(/[0-9a-z_!~*\'().;?:@&=+$,%#-]+)+/?)$';
    let regExp = new RegExp(strRegex);
    if (regExp.test(url)) {
        return true
    }
    return false
}

Helper.checkHaveTrend = (gameUniqueId) => {
    if (!gameUniqueId) return

    switch (gameUniqueId) {
        case 'QXC': {
            return false
        }
        default:
            if(gameUniqueId.indexOf("KL10F")>-1){
                return false
            }
    }
    return true
}

Helper.getQData = () => {
    let a =  base64.layout2('MWM3YWM3ZjBkMzkyOGY0YjQxYmFmYWY2ZjUwOGZiOThmYTRjOWM1MmQ4N2FiYzkwMTY3NmYwZmIxNjFkODMxYzMyZjdiYTQxMTQ2MzRiZDVkZjU4OGEwNWI4YzllMWIwM2FjNTUwZmM3YjNlODcwNDA2NTc4MTZhNDQ2ZjFjNDZmM2Q0YmFkZWMxYzlmMTRhZmI5YjQ0NTc1ZWY2ODg4Y2E4NzhmNGQ4ODkyZmNiMzI4ZDA3YTBjMGYyZDU1OWNkYzFjOTZjN2M0YTY1OGI5NmFmZWYxNTg3M2FmYzI1Y2RlY2ZiMmEyNmFiMzIxOGRhMWMyZmFlMWI4ODkxYmVlY2NiMDYxMGNiY2RhY2VjNWIwYTZjODRkYmEwMDU1MjlmYzJkNTZjM2M4MmNiZmZiNmY4ODEyMTk1NGEwMDM1MmEzMWNiMzExOTY2ZGJhZDI5MTExZmFjNmZhYzMxYTg3NjBmMWM5M2Y4MGRiYmI0NDQ0NmVhN2RmNmZkMGNmNGUyMzE2YzEyZDAyNmY3Y2JkMDI0MDA4MjNkNjVlYTBjZDRhNWJiM2NhOWI3N2U5NjA3MTA0MDQyZDc5MWY1NDQyYTIzYWQ1MGNkOWI5NzkwOTJhN2M0NzJkNDdiMGJkYzgxNmRjYWM5ZWY0NDg4MDc3NjY2OTg3OThkNDA4MjhjOGQ')
    return a
}

Helper.replace = (string,a,b) =>{
    return string.replace(/M8172DS/,b)
}

module.exports = Helper
