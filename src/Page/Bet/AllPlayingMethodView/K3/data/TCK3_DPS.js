/**
 * Created by Sam on 2016/11/29.
 */

import _ from 'lodash';
import  * as PlayMathConfig from '../../../../../Data/JXPlayMathConfig'

var JXHelper = require('../../../../../Common/JXHelper/JXHelper')

let instance = null

let config = {

    myNumbersArray: null,

    playInfo: [''],
    PlayType: ['和值', '三同号通选', '三同号单选', '三不同号', '三连号通选', '二同号复选', '二同号单选', '二不同号', '二不同号胆拖', '猜一个号'],

    getPlayMathNameWithIndex(index){
        return this.PlayType[index];
    },

    getNumbersArray(){

        return ['1', '2', '3', '4', '5', '6']
    },
    getAddArray(){
        if (this.myNumbersArray) {
            return this.myNumbersArray
        }
        let myNumbersArray = []
        for (let i = 3; i < 19; i++) {
            myNumbersArray.push(i)
        }
        return this.myNumbersArray = myNumbersArray
    },
    getSameNumberArray(){
        return ['111', '222', '333', '444', '555', '666']
    }, getTwoSameNumberArray(){
        return ['11', '22', '33', '44', '55', '66']
    }, getSTHTXArray(){
        return ['三同号通选']
    }, getSLHTXArray(){
        return ['三连号通选']
    }, getDXDSArray(){
        return ['大', '小', '单', '双']
    },
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
        myMathTypeID = PlayMathConfig.getGameMathKeyWithTitle(myMathType, gameUniqueId)
    }

    getmyMathTypeID() {
        return myMathTypeID
    }

    resetPlayGameUniqueId(uniqueId) {
        gameUniqueId = uniqueId
    }

    getAllJSon() {
        let str = ''

        switch (myMathType) {
            case '二同号复选':
                for (var item in numbersDic) {
                    if (numbersDic[item].length > 0) {
                        for (var i = 0; i < numbersDic[item].length; i++) {
                            let num = numbersDic[item][i]
                            str = str + num.substr(0, 1) + '|' + num.substr(1, 2) + '|*,'
                        }

                    }
                }
                str = _.trimEnd(str, ",")
                break
            case '三同号通选':
            case '三连号通选':
                str = '*|*|*'
                break
            case '三同号单选':
            case '三不同号':
            case '二不同号':
                for (var item in numbersDic) {
                    if (numbersDic[item].length > 0) {
                        for (var i = 0; i < numbersDic[item].length; i++) {
                            let num = numbersDic[item][i]
                            str = str + num.substr(0, 1) + ' '
                        }

                    }
                }
                str = _.trimEnd(str, " ")
                break
            case '二同号单选': {
                for (var item in numbersDic) {
                    if (numbersDic[item].length > 0) {
                        for (var i = 0; i < numbersDic[item].length; i++) {
                            let num = numbersDic[item][i]
                            str = str + num + ' '
                        }
                        str = str + '|'
                    }
                }
                str = _.trimEnd(str, "|")
            }
                break
            default:
                for (var item in numbersDic) {
                    if (numbersDic[item].length > 0) {
                        str = str + (numbersDic[item].toString().replace(/\,/g, " ")) + '|'
                    }
                }
                str = _.trimEnd(str, "|")
                break
        }

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
        console.log('=====numbersDic = ' + JSON.stringify(numbersDic))
    }

    removeNumberWithType(areaIndex, number) {
        let numbersArr = this.getAreaArrayWith(areaIndex)
        numbersArr.remove(number)
        console.log('===removeNumberWithType = ' + number)
        console.log('===numbersDic = ' + JSON.stringify(numbersDic))
    }

    getAreaArrayWith(areaIndex) {
        let b = numbersDic[areaIndex]
        if (!b) {
            numbersDic[areaIndex] = []
            b = numbersDic[areaIndex]
        }
        return b
    }

    getmyMathTypeIDWithChineseName(name) {
        return PlayMathConfig.getGameMathKeyWithTitle(name, gameUniqueId)
    }

    _getMaxRebate(gameSetting) {
        if (myMathType === '和值') {
            let b = numbersDic[0]
            let maxRebate = 0
            for (var i = 0; i < b.length; i++) {
                let rebate = gameSetting['prizeSettings'][b[i] - 3]['prizeAmount']
                if (rebate > maxRebate) {
                    maxRebate = rebate
                }
            }
            return maxRebate
        } else {
            return gameSetting['prizeSettings'][0]['prizeAmount']
        }
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
                json.gameplayMethod = PlayMathConfig.getGameMathKeyWithTitle(myMathType, gameUniqueId)
                json.showGameplayMethod = myMathType
                if (numberOfUnits == 0) {
                    this.getNumberOfUnits(myMathType)
                }
                json.numberOfUnits = numberOfUnits
                json.amount = (numberOfUnits * (price ? price : pricePerUnit)).toFixed(2)

                if (rebates) {
                    json.returnMoneyRatio = (rebates / 100).toFixed(3)
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

        let i = 0
        for (var key in numbersDic) {
            let numsArr = numbersDic[key]
            if (numsArr.length > 0) {
                i++
            }
        }

        switch (playMath) {
            case '和值':
            case '三同号通选':
            case '三同号单选':
            case '三不同号':
            case '三连号通选':
            case '二同号复选':
            case '二不同号':
            case '和值大小单双':
            case '猜一个号': {
                if (i > 0) return true
            }
                break
            case '二同号单选':
            case '二不同号胆拖': {
                if (i > 1)return true
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
        let combinationNumber = 0
        let count = 0
        switch (playMath) {
            case '和值': {
                let count = 1
                count = this.getAreaNumbersCount(0)
                return numberOfUnits = count
            }
                break
            case '三同号通选':
            case '三连号通选': {
                return numberOfUnits = 1
            }
                break
            case '三同号单选':
            case '二同号复选':
            case '和值大小单双': {
                count = this.getAreaNumbersCount(0)
                return numberOfUnits = count
            }
                break
            case '三不同号': {
                combinationNumber = 3
                count = this.getAreaNumbersCount(0)
                console.log('=============c:', count)
                if (count > 2) {
                    numberOfUnits = JXHelper.getCombinatorialNumber(count, combinationNumber)
                    console.log('=============numberOfUnits:', numberOfUnits)
                    return numberOfUnits
                }
            }
                break

            case '二不同号': {
                combinationNumber = 2
                count = this.getAreaNumbersCount(0)
                if (count > 1) {
                    return numberOfUnits = JXHelper.getCombinatorialNumber(count, combinationNumber)
                }
            }
                break

            case '二同号单选': {
                let area1 = this.getAreaNumbersCount(0)
                let area2 = this.getAreaNumbersCount(1)
                return numberOfUnits = area1 * area2
            }
                break

            case '二不同号胆拖': {
                let area2 = this.getAreaNumbersCount(1)
                return numberOfUnits = area2
            }
                break
            case '猜一个号': {
                let area1 = this.getAreaNumbersCount(0)
                return numberOfUnits = 21 * area1
            }
                break
        }
        return numberOfUnits = 0
    }

    //机选 添加注数
    randomSelect(units, dontAdd) {
        this.clearCurrentSelectData()
        switch (myMathType) {
            case '和值': {
                this.getRandomNumbersOfSingleEntryUnits(units, 1, true, dontAdd, 3, 18)
            }
                break
            case '三同号通选': {
                this.getRandomNumberOfSingleEntryUnits(units, config.getSTHTXArray(), dontAdd)
            }
                break
            case '三同号单选': {
                this.getRandomNumberOfSingleEntryUnits(units, config.getSameNumberArray(), dontAdd)
            }
                break
            case '三不同号': {
                this.getRandomNumbersOfSingleEntryUnits(units, 3, false, dontAdd, 1, 6)
            }
                break
            case '三连号通选': {
                this.getRandomNumberOfSingleEntryUnits(units, config.getSLHTXArray(), dontAdd)
            }
                break
            case '二同号复选': {
                this.getRandomNumberOfSingleEntryUnits(units, config.getTwoSameNumberArray(), dontAdd)
            }
                break
            case '二不同号': {
                this.getRandomNumbersOfSingleEntryUnits(units, 2, false, dontAdd, 1, 6)
            }
                break
            case '和值大小单双': {
                this.getRandomNumberOfSingleEntryUnits(units, config.getDXDSArray(), dontAdd)
            }
                break
            case '猜一个号': {
                this.getRandomNumbersOfSingleEntryUnits(units, 1, true, dontAdd, 1, 6)
            }
                break
            case '二同号单选': {
                this.getRandomNumberOfDTEntry(units, true, dontAdd)
            }
                break
            case '二不同号胆拖': {
                this.getRandomNumberOfDTEntry(units, false, dontAdd)
            }
                break
        }
    }


    //机选 特码 选号
    getRandomNumberOfSingleEntryUnits(numberOfUnits, dataOrigin, dontAdd) {
        for (let i = 0; i < numberOfUnits; i++) {
            let random = JXHelper.getRandomNumber(dataOrigin.length - 1)
            this.addNumberWithType(0, dataOrigin[random])
            if (!dontAdd)
                this.addNumbersDicToArray(myMathType)
        }
    }


    getRandomNumberOfDTEntry(units, isETHDX, dontAdd) {
        for (let i = 0; i < units; i++) {
            let random1 = JXHelper.getRandomNumber(6)
            if (random1 == 0) {
                random1 += 1
            }
            let random2 = random1

            while (random1 == random2) {
                random2 = JXHelper.getRandomNumber(6)
                if (random2 == 0) {
                    random2 += 1
                }
            }
            if (isETHDX) {
                this.addNumberWithType(0, random1 + '' + random1)
            } else {

                this.addNumberWithType(0, random1)
            }
            this.addNumberWithType(1, random2)
            if (!dontAdd)
                this.addNumbersDicToArray(myMathType)
        }
    }


    getRandomNumbersOfSingleEntryUnits(units, digits, allowDuplicate, dontAdd, min, max) {
        if (allowDuplicate) {
            for (let i = 0; i < units; i++) {
                for (let j = 0; j < digits; j++) {
                    let random = JXHelper.getRandomNumber(max)
                    if (random < min) {
                        random += min
                    }
                    this.addNumberWithType(0, random)
                }
                if (!dontAdd)
                    this.addNumbersDicToArray(myMathType)
            }

        } else {
            for (let i = 0; i < units; i++) {
                let myArray = this.config.getNumbersArray().concat()
                for (let j = 0; j < digits; j++) {
                    let random = JXHelper.getRandomNumber(myArray.length - 1)
                    let num = myArray[random]
                    myArray.remove(num)
                    this.addNumberWithType(0, num)
                }
                if (!dontAdd)
                    this.addNumbersDicToArray(myMathType)
            }
        }
    }

    //获取定位胆的随机数
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

    _getRandomNumber() {
        this.randomSelect(1, true)
        let tempNumDic = _.cloneDeep(numbersDic)
        numbersDic = {}
        return tempNumDic
    }
}

