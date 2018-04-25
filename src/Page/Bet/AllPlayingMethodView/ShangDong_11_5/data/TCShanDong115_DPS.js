/**
 * Created by Sam on 2016/11/29.
 */

import _ from 'lodash';
import JXHelper from '../../../../../Common/JXHelper/JXHelper'
import  * as PlayMathConfig from '../../../../../Data/JXPlayMathConfig'

let instance = null

let config = {

    myNumbersArray: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11'],

    playInfo: [''],

    PlayType: ['任选二', '任选三', '任选四', '任选五', '任选六', '任选七', '任选八', '前一直选', '前二组选', '前二直选', '前三组选', '前三直选'],
    DuplexPlayType: ['任选二', '任选三', '任选四', '任选五', '任选六', '任选七', '任选八', '前二组选', '前三组选'],

    getPlayMathNameWithIndex(index, areaIndex){
        if (areaIndex == 2) {
            return this.DuplexPlayType[index] + '胆拖';
        }
        return this.PlayType[index];
    },

    getNumbersArray(){
        return this.myNumbersArray
    }
}


//  选注未添加
let numbersDic = {}

//  选注未添加注数
let numberOfUnits = 0

// 选注未添加金额
let amount = 0

//  价格单位
let pricePerUnit = 2

//  倍投数
let multiplier = 1

//选注已添加 价格总数
let totalAmount = 0

//选注已添加 注数总数
let totalBetNumber = 0

//选注已添加json对象
let numbersArray = []

//玩法
let myMathType = ''
let myMathTypeID = ''

//彩票 uid
let gameUniqueId = ''


export default class SingletonMarkSixDPS {
    // 构造
    constructor() {
        if (!instance) {
            instance = this
            this.config = config
        }
        return instance;
    }

    resetPlayMath(mathType) {
        numbersDic = {}
        numberOfUnits = 0
        amount = 0
        myMathType = mathType
        myMathTypeID = PlayMathConfig.getGameMathKeyWithTitle(myMathType,gameUniqueId)
    }

    getmyMathTypeID(){
        return myMathTypeID
    }

    resetPlayGameUniqueId(uniqueId){
        gameUniqueId = uniqueId
    }

    getAllJSon() {
        let str = ''
        for (var item in numbersDic) {
            if (numbersDic[item].length > 0) {
                str = str + (numbersDic[item].toString().replace(/\,/g, " ")) + '|'
            }
        }
        str = _.trimEnd(str, "|")
        return str
    }

    clearAllData() {
        this.resetPlayMath(myMathType)
        numbersArray = []
        totalBetNumber = 0
        totalAmount = 0
        multiplier = 1
    }

    //清除当前选中但是未加注前的号码
    clearCurrentSelectData() {
        numbersDic = {}
    }

    deleteOneItemWithJsonIndex(index) {
        totalAmount=parseFloat(totalAmount.accSub(numbersArray[index].amount))
        totalBetNumber -= numbersArray[index].numberOfUnits
        numbersArray.splice(index, 1)
    }

    addNumberWithType(areaIndex, number) {
        let numbersArr = this.getAreaArrayWith(areaIndex)
        numbersArr.push(number)
        numbersArr.sort(function (a, b) {
            return a - b;
        });
        console.log('numbersDic = ' + JSON.stringify(numbersDic))
    }

    removeNumberWithType(areaIndex, number) {
        let numbersArr = this.getAreaArrayWith(areaIndex)
        numbersArr.remove(number)
        console.log('removeNumberWithType = ' + number)
        console.log('numbersDic = ' + JSON.stringify(numbersDic))
    }

    getAreaArrayWith(areaIndex) {
        let b = numbersDic[areaIndex]
        if (!b) {
            numbersDic[areaIndex] = []
            b = numbersDic[areaIndex]
        }
        return b
    }

    getAreaNumbersCount(areaIndex) {
        return this.getAreaArrayWith(areaIndex).length
    }

    //加注
    addNumbersDicToArray(odds, price, rebates) {
        if (!this.checkNumbers(myMathType)) return false
        if (numbersDic) {
            let aStr = this.getAllJSon()
            let json = {}
            if (aStr.length > 0) {
                json.betString = aStr
                json.gameplayMethod = PlayMathConfig.getGameMathKeyWithTitle(myMathType,gameUniqueId)
                json.showGameplayMethod = myMathType
                if (numberOfUnits == 0) {
                    this.getNumberOfUnits(myMathType)
                }
                json.numberOfUnits = numberOfUnits
                json.amount = (numberOfUnits * (price ? price : pricePerUnit)).toFixed(2)

                if (rebates){
                    json.returnMoneyRatio = (rebates/100).toFixed(3)
                }
                json.pricePerUnit = price ? price : pricePerUnit

                numbersArray.push(json)
                totalBetNumber += json.numberOfUnits
                totalAmount = parseFloat(totalAmount.accAdd(json.amount))
            }
        }
        this.resetPlayMath(myMathType)
        return true
    }

    //已经添加的存在的字典数组
    getAlreadyNumberArray() {
        return numbersArray
    }

    //获取未加入的 号码字典
    getWillAddNumbersDic() {
        return numbersDic
    }

    //已经添加的 总价格 注数*倍率
    _getTotalAmount() {
        return totalAmount.accMul(multiplier)
    }

    //设置倍率
    _setMultipleNumber(number) {
        multiplier = number
    }

    //获取倍率
    _getMultipleNumber() {
        return multiplier
    }

    //获取总注数
    _getNumberOfUnits() {
        return totalBetNumber
    }

    //获取未添加的注数
    _getNoAddNumberOfUnits() {
        return numberOfUnits
    }

    //添加投注前验证
    checkNumbers(playMath) {
        let numbersDic = this.getWillAddNumbersDic()
        let i = 0;
        for (var key in numbersDic) {
            let numsArr = numbersDic[key]
            if (numsArr.length > 0) {
                i++
            }
        }

        let DCount = this.getAreaNumbersCount(0)
        let TCount = this.getAreaNumbersCount(1)

        console.log('numbersDic = ' + JSON.stringify(numbersDic))
        console.log('playMath = ' + playMath + 'DCount = ' + DCount)

        switch (playMath) {
            case '任选二': {
                if (DCount >= 2) return true
            }
                break
            case '任选三': {
                if (DCount >= 3) return true
            }
                break
            case '任选四': {
                if (DCount >= 4) return true
            }
                break
            case '任选五': {
                if (DCount >= 5) return true
            }
                break
            case '任选六': {
                if (DCount >= 6) return true
            }
                break
            case '任选七': {
                if (DCount >= 7) return true
            }
                break
            case '任选八': {
                if (DCount >= 8) return true
            }
                break
            case '前一直选': {
                if (i == 1) return true
            }
                break
            case '前二直选': {
                if (i == 2) return true
            }
                break
            case '前二组选': {
                if (DCount >= 2) return true
            }
                break
            case '前三组选': {
                if (DCount >= 3) return true
            }
                break
            case '前三直选': {
                if (i == 3) return true
            }
                break
            case '前二组选胆拖': {
                if (DCount > 0 && TCount > 0 && (DCount + TCount) > 1) {
                    return true
                }
            }
                break
            case '前三组选胆拖': {
                if (DCount > 0 && TCount > 0 && (DCount + TCount) > 2) {
                    return true
                }
            }
                break
            case '任选二胆拖': {
                if (DCount > 0 && TCount > 0 && (DCount + TCount) > 1) {
                    return true
                }
            }
                break
            case '任选三胆拖': {
                if (DCount > 0 && TCount > 0 && (DCount + TCount) > 2) {
                    return true
                }
            }
                break
            case '任选四胆拖': {
                if (DCount > 0 && TCount > 0 && (DCount + TCount) > 3) {
                    return true
                }
            }
                break
            case '任选五胆拖': {
                if (DCount > 0 && TCount > 0 && (DCount + TCount) > 4) {
                    return true
                }
            }
                break
            case '任选六胆拖': {
                if (DCount > 0 && TCount > 0 && (DCount + TCount) > 5) {
                    return true
                }
            }
                break
            case '任选七胆拖': {
                if (DCount > 0 && TCount > 0 && (DCount + TCount) > 6) {
                    return true
                }
            }
                break
            case '任选八胆拖': {
                if (DCount > 0 && TCount > 0 && (DCount + TCount) > 7) {
                    return true
                }
            }
                break
        }
        return false
    }

    //计算当前号码池 注单数
    getNumberOfUnits(playMath) {


        if (!this.checkNumbers(playMath)) {
            return 0
        }

        let count = 0
        let DCount = this.getAreaNumbersCount(0)
        let TCount = this.getAreaNumbersCount(1)
        let combinationNumber = 0
        switch (playMath) {
            case '任选二':
                count = DCount
                combinationNumber = 2;
                break
            case '任选三':
                count = DCount
                combinationNumber = 3;
                break
            case '任选四':
                count = DCount
                combinationNumber = 4;
                break
            case '任选五':
                count = DCount
                combinationNumber = 5;
                break
            case '任选六':
                count = DCount
                combinationNumber = 6;
                break
            case '任选七':
                count = DCount
                combinationNumber = 7;
                break
            case '任选八':
                count = DCount
                combinationNumber = 8;
                break
            case '前二组选':
                count = DCount
                combinationNumber = 2;
                break
            case '前三组选':
                count = DCount
                combinationNumber = 3;
                break
            case '前一直选':{
                let count = 1
                for (var key in numbersDic) {
                    let numArr = numbersDic[key]
                    if (numArr.length > 0)
                        count = count * numArr.length
                }
                return numberOfUnits = count
            }break
            case '前二直选': {
                var b = this.getAreaArrayWith(0),
                    s = this.getAreaArrayWith(1),
                    r = [];
                if (b.length < 1 || s.length < 1) {
                    return numberOfUnits = 0
                }
                let i, j = 0
                for (i = 0; i < b.length; i++) {
                    for (j = 0; j < s.length; j++) {
                        if (b[i] != s[j]) {
                            r.push("" + b[i] + s[j]);
                        }
                    }
                }
                return numberOfUnits = r.length
            }break
            case '前三直选': {
                var b = this.getAreaArrayWith(0),
                    s = this.getAreaArrayWith(1),
                    g = this.getAreaArrayWith(2),
                    r = [];
                if (b.length < 1 || s.length < 1 || g.length < 1) {
                    return numberOfUnits = 0
                }
                let i, j, k = 0
                for (i = 0; i < b.length; i++) {
                    for (j = 0; j < s.length; j++) {
                        for (k = 0; k < g.length; k++) {
                            if (b[i] != s[j] && b[i] != g[k] && s[j] != g[k]) {
                                r.push("" + b[i] + s[j] + g[k]);
                            }
                        }
                    }
                }
                return numberOfUnits = r.length
            }
                break
            case '前二组选胆拖': {
                count = TCount
                combinationNumber = 2 - DCount

            }
                break
            case '前三组选胆拖': {
                count = TCount
                combinationNumber = 3 - DCount
            }
                break
            case '任选二胆拖': {
                count = TCount
                combinationNumber = 2 - DCount
            }
                break
            case '任选三胆拖': {
                count = TCount
                combinationNumber = 3 - DCount
            }
                break
            case '任选四胆拖': {
                count = TCount
                combinationNumber = 4 - DCount
            }
                break
            case '任选五胆拖': {
                count = TCount
                combinationNumber = 5 - DCount
            }
                break
            case '任选六胆拖': {
                count = TCount
                combinationNumber = 6 - DCount
            }
                break
            case '任选七胆拖': {
                count = TCount
                combinationNumber = 7 - DCount
            }
                break
            case '任选八胆拖': {
                count = TCount
                combinationNumber = 8 - DCount
            }
                break
        }


        if (combinationNumber > 0) {
            console.log('getCombinatorialNumber' + count + ' ' + combinationNumber)
            return numberOfUnits = JXHelper.getCombinatorialNumber(count, combinationNumber)
        }
        return numberOfUnits = 0
    }

    //机选 添加注数
    randomSelect(numberOfUnits, dontAdd, duplex) {
        this.clearCurrentSelectData()
        switch (myMathType) {
            case '任选二': {
                this.getRandomNumberOfCombinationEntryUnits(numberOfUnits, 2, dontAdd)
            }
                break
            case '任选三': {
                this.getRandomNumberOfCombinationEntryUnits(numberOfUnits, 3, dontAdd)
            }
                break
            case '任选四': {
                this.getRandomNumberOfCombinationEntryUnits(numberOfUnits, 4, dontAdd)
            }
                break
            case '任选五': {
                this.getRandomNumberOfCombinationEntryUnits(numberOfUnits, 5, dontAdd)
            }
                break
            case '任选六': {
                this.getRandomNumberOfCombinationEntryUnits(numberOfUnits, 6, dontAdd)
            }
                break
            case '任选七': {
                this.getRandomNumberOfCombinationEntryUnits(numberOfUnits, 7, dontAdd)
            }
                break
            case '任选八': {
                this.getRandomNumberOfCombinationEntryUnits(numberOfUnits, 8, dontAdd)
            }
                break
            case '前二组选': {
                this.getRandomNumberOfCombinationEntryUnits(numberOfUnits, 2, dontAdd)
            }
                break
            case '前三组选': {
                this.getRandomNumberOfCombinationEntryUnits(numberOfUnits, 3, dontAdd)
            }
                break
            case '前一直选': {
                this.getRandomNumberOfSingleEntryUnits(numberOfUnits, 1, dontAdd)
            }
                break
            case '前二直选': {
                this.getRandomNumberOfSingleEntryUnits(numberOfUnits, 2, dontAdd)
            }
                break
            case '前三直选': {
                this.getRandomNumberOfSingleEntryUnits(numberOfUnits, 3, dontAdd)
            }
                break
            case '前二组选胆拖': {
                if (duplex) {
                    this.getDuplexRandomNumberOfCombinationEntryUnits(numberOfUnits, 2, 1, dontAdd)
                } else {
                    myMathType = '前二组选'
                    this.getRandomNumberOfCombinationEntryUnits(numberOfUnits, 2, dontAdd)
                    myMathType = '前二组选胆拖'
                }
            }
                break
            case '前三组选胆拖': {
                if (duplex) {
                    this.getDuplexRandomNumberOfCombinationEntryUnits(numberOfUnits, 3, 2, dontAdd)
                } else {
                    myMathType = '前三组选'
                    this.getRandomNumberOfCombinationEntryUnits(numberOfUnits, 3, dontAdd)
                    myMathType = '前三组选胆拖'
                }
            }
                break
            case '任选二胆拖': {
                if (duplex) {
                    this.getDuplexRandomNumberOfCombinationEntryUnits(numberOfUnits, 2, 1, dontAdd)
                } else {
                    myMathType = '任选二'
                    this.getRandomNumberOfCombinationEntryUnits(numberOfUnits, 2, dontAdd)
                    myMathType = '任选二胆拖'
                }
            }
                break
            case '任选三胆拖': {
                if (duplex) {
                    this.getDuplexRandomNumberOfCombinationEntryUnits(numberOfUnits, 3, 2, dontAdd)
                } else {
                    myMathType = '任选三'
                    this.getRandomNumberOfCombinationEntryUnits(numberOfUnits, 3, dontAdd)
                    myMathType = '任选三胆拖'
                }
            }
                break
            case '任选四胆拖': {
                if (duplex) {
                    this.getDuplexRandomNumberOfCombinationEntryUnits(numberOfUnits, 4, 3, dontAdd)
                } else {
                    myMathType = '任选四'
                    this.getRandomNumberOfCombinationEntryUnits(numberOfUnits, 4, dontAdd)
                    myMathType = '任选四胆拖'
                }
            }
                break
            case '任选五胆拖': {
                if (duplex) {
                    this.getDuplexRandomNumberOfCombinationEntryUnits(numberOfUnits, 5, 4, dontAdd)
                } else {
                    myMathType = '任选五'
                    this.getRandomNumberOfCombinationEntryUnits(numberOfUnits, 5, dontAdd)
                    myMathType = '任选五胆拖'
                }
            }
                break
            case '任选六胆拖': {
                if (duplex) {
                    this.getDuplexRandomNumberOfCombinationEntryUnits(numberOfUnits, 6, 5, dontAdd)
                } else {
                    myMathType = '任选六'
                    this.getRandomNumberOfCombinationEntryUnits(numberOfUnits, 6, dontAdd)
                    myMathType = '任选六胆拖'
                }
            }
                break
            case '任选七胆拖': {
                if (duplex) {
                    this.getDuplexRandomNumberOfCombinationEntryUnits(numberOfUnits, 7, 6, dontAdd)
                } else {
                    myMathType = '任选七'
                    this.getRandomNumberOfCombinationEntryUnits(numberOfUnits, 7, dontAdd)
                    myMathType = '任选七胆拖'
                }
            }
                break
            case '任选八胆拖': {
                if (duplex) {
                    this.getDuplexRandomNumberOfCombinationEntryUnits(numberOfUnits, 8, 7, dontAdd)
                } else {
                    myMathType = '任选八'
                    this.getRandomNumberOfCombinationEntryUnits(numberOfUnits, 8, dontAdd)
                    myMathType = '任选八胆拖'
                }
            }
                break
        }
    }

    getRandomNumberOfSingleEntryUnits(numberOfUnitss, Digits, dontAdd) {
        for (let i = 0; i < numberOfUnitss; i++) {
            let myArray = this.config.getNumbersArray().concat()
            for (let j = 0; j < Digits; j++) {
                let random = JXHelper.getRandomNumber(myArray.length - 1)
                let num = myArray[random]
                myArray.remove(num)
                this.addNumberWithType(j, num)
            }
            if (!dontAdd)
                this.addNumbersDicToArray(myMathType)
        }
    }

    getRandomNumberOfCombinationEntryUnits(units, digits, dontAdd) {
        for (let i = 0; i < units; i++) {
            let myArray = this.config.getNumbersArray().concat()
            for (let j = 0; j < digits; j++) {
                let random = JXHelper.getRandomNumber(myArray.length - 1)
                let num = myArray[random]
                myArray.remove(num)
                this.addNumberWithType(0, num)
                if (!dontAdd)
                    this.addNumbersDicToArray(myMathType)
            }
        }
    }

    getDuplexRandomNumberOfCombinationEntryUnits(units, digits, duplexMaxCount, dontAdd) {
        for (let i = 0; i < units; i++) {
            let myArray = this.config.getNumbersArray().concat()
            for (let j = 0; j < digits; j++) {
                if (j == 1) {
                    for (let k = 0; k < duplexMaxCount; k++) {
                        let random = JXHelper.getRandomNumber(myArray.length - 1)
                        let num = myArray[random]
                        this.addNumberWithType(j, num)
                        myArray.remove(num)
                    }
                } else {
                    let random = JXHelper.getRandomNumber(myArray.length - 1)
                    let num = myArray[random]
                    myArray.remove(num)
                    this.addNumberWithType(j, num)
                }
            }
            if (!dontAdd)
                this.addNumbersDicToArray(myMathType)
        }
    }

    _getRandomNumber() {
        let duplex = false
        if (myMathType.indexOf('胆拖')) {
            duplex = true
        }
        this.randomSelect(1, true, duplex)
        let tempNumDic = _.cloneDeep(numbersDic)
        numbersDic = {}
        return tempNumDic
    }
}


function getRandomNumbersWithCount(count) {

    let sub_arr = new Array()
    let myArray = this.config.getNumbersArray().concat()
    for (var i = 0; i < count; i++) {
        let random = JXHelper.getRandomNumber(myArray.length - 1)
        let num = myArray[random]
        sub_arr.push(num)
        myArray.remove(num)
    }
    return sub_arr.sort(function (a, b) {
        return a - b;
    })
}




