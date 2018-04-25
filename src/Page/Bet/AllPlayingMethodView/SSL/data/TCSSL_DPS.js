/**
 * Created by Sam on 2016/11/22.
 */
import _ from 'lodash';
import JXHelper from '../../../../../Common/JXHelper/JXHelper'
import  * as PlayMathConfig from '../../../../../Data/JXPlayMathConfig'

const config = {

    myNumbersArray: null,

    PlayMathType: [
        '三星',
        '二星',
        '定位胆',
        '不定位',
        '大小单双'
    ],
    PlayMathItemType: [
        ['直选复式', '直选和值','组三复式', '组六复式','组三和值', '组六和值'],
        ['前二直选','后二直选','前二组选', '后二组选'],
        ['定位胆'],
        ['一码不定位','二码不定位'],
        ['后二大小单双','前二大小单双']
    ],

    R3ZXHZCounts:[1,3,6,10,15,21,28,36,45,55,63,69,73,75],
    R3ZhuXuanHZCounts:[1,1,2,2,4,5,6,8,10,11,13,14,14,15],

    Z3HZCounts:[1,2,1,3,3,3,4,5,4,5,5,4,5,5,4,5,5,4,5,4,3,3,3,1,2,1],
    Z6HZCounts:[1,1,2,3,4,5,7,8,9,10,10,10,10,9,8,7,5,4,3,2,1,1],

    getPlayMathNameWithIndex(areaIndex, index){
        return this.PlayMathType[areaIndex] + '-' + this.PlayMathItemType[areaIndex][index];
    },

    getNumbersArray(){
        if (this.myNumbersArray) {
            return this.myNumbersArray
        }
        let myNumbersArray = []
        for (let i = 0; i < 10; i++) {
            myNumbersArray.push(i)
        }
        return this.myNumbersArray = myNumbersArray
    },

    getRX2HZNumbersArray(){
        if (this.myR2HZNumbersArray) {
            return this.myR2HZNumbersArray
        }
        let myNumbersArray = []
        for (let i = 0; i < 19; i++) {
            myNumbersArray.push(i)
        }
        return this.myR2HZNumbersArray = myNumbersArray
    },

    getRX2ZXHZNumbersArray(){
        if (this.myR2ZXHZNumbersArray) {
            return this.myR2ZXHZNumbersArray
        }
        let myNumbersArray = []
        for (let i = 1; i < 18; i++) {
            myNumbersArray.push(i)
        }
        return this.myR2ZXHZNumbersArray = myNumbersArray
    },

    getRX3HZNumbersArray(){
        if (this.myR3HZNumbersArray) {
            return this.myR3HZNumbersArray
        }
        let myNumbersArray = []
        for (let i = 0; i < 28; i++) {
            myNumbersArray.push(i)
        }
        return this.myR3HZNumbersArray = myNumbersArray
    },

    getRX3ZXHZNumbersArray(){
        if (this.myR3ZXHZNumbersArray) {
            return this.myR3ZXHZNumbersArray
        }
        let myNumbersArray = []
        for (let i = 1; i < 27; i++) {
            myNumbersArray.push(i)
        }
        return this.myR3ZXHZNumbersArray = myNumbersArray
    },

    getZ3HZNumbersArray(){
        if (this.Z3HZNumbersArray) {
            return this.Z3HZNumbersArray
        }
        let myNumbersArray = []
        for (let i = 1; i < 27; i++) {
            myNumbersArray.push(i)
        }
        return this.myR3HZNumbersArray = myNumbersArray
    },

    getZ6HZNumbersArray(){
        if (this.Z6HZNumbersArray) {
            return this.Z6HZNumbersArray
        }
        let myNumbersArray = []
        for (let i = 3; i < 25; i++) {
            myNumbersArray.push(i)
        }
        return this.Z6HZNumbersArray = myNumbersArray
    },

    getWhetherNeedShowGSBQW(playMath){
        return null
    }
}


let instance = null

//  选注未添加
let numbersDic = {}

//  选注未添加注数
let noAddNumberOfUnits = 0

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

//用户选中的个十百千玩
let GSBQW = []

export default class SingletonChongQingSSC_DPS {
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
        amount = 0
        noAddNumberOfUnits = 0
        myMathType = mathType
        myMathTypeID = PlayMathConfig.getGameMathKeyWithTitle(myMathType, gameUniqueId)
        GSBQW = this.config.getWhetherNeedShowGSBQW(mathType)
    }

    resetGSBQW(gsbqw){
        if (!gsbqw||gsbqw.length==0) {
            GSBQW = []
            return
        }
        GSBQW = gsbqw.sort(function (a, b) {
            return b-a;
        });
    }

    getmyMathTypeID() {
        return myMathTypeID
    }

    resetPlayGameUniqueId(uniqueId) {
        gameUniqueId = uniqueId
    }

    getAllJSon() {
        let str = ''
        let isD = false
        if (myMathType == '定位胆-定位胆') {
            for (let i = 0; i < 3; i++) {
                this.getAreaArrayWith(i)
            }
            isD = true
        }

        for (var item in numbersDic) {
            if (isD || numbersDic[item].length > 0) {
                str = str + (numbersDic[item].toString().replace(/\,/g, " ")) + '|'
            }
        }

        if (myMathType != '定位胆-定位胆') {
            str = _.trimEnd(str, "|")
        }
        return str
    }

    clearAllData() {
        this.resetPlayMath(myMathType)
        numbersArray = []
        totalBetNumber = 0
        totalAmount = 0
        multiplier = 1
        pricePerUnit = 2
    }

    //清除当前选中但是未加注前
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
    }

    removeNumberWithType(areaIndex, number) {
        let numbersArr = this.getAreaArrayWith(areaIndex)
        numbersArr.remove(number)
    }

    getAreaArrayWith(areaIndex) {
        let b = numbersDic[areaIndex]
        if (!b) {
            numbersDic[areaIndex] = []
            b = numbersDic[areaIndex]
        }
        return b
    }

    //加注
    addNumbersDicToArray(odds, price, rebates) {
        if (!this.checkNumbers(myMathType)) return false
        if (numbersDic) {
            let aStr = this.getAllJSon()
            let json = {}
            if (aStr.length > 0) {
                json.betString = aStr
                if (noAddNumberOfUnits == 0) {
                    this.getNumberOfUnits(myMathType)
                }
                json.gameplayMethod = PlayMathConfig.getGameMathKeyWithTitle(myMathType, gameUniqueId)
                json.showGameplayMethod = myMathType

                json.numberOfUnits = noAddNumberOfUnits
                json.amount = (noAddNumberOfUnits * (price ? price : pricePerUnit)).toFixed(2)
                if (rebates) {
                    json.returnMoneyRatio = (rebates / 100).toFixed(3)
                }
                json.pricePerUnit = price ? price : pricePerUnit

                let str = ''
                let str2 = ''
                if (null!=this.config.getWhetherNeedShowGSBQW(myMathType)){
                    GSBQW.map((item)=>{
                        str+=this.config.PositionPost[item]+' '
                        str2+=this.config.Position[item]
                    })
                    str = _.trimEnd(str, "|")
                    json.betString = str+':'+json.betString
                }

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
        return noAddNumberOfUnits
    }

    //添加投注前验证
    checkNumbers(playMath) {
        let numbersDic = this.getWillAddNumbersDic()
        let i = 0;
        for (var key in numbersDic) {
            if (numbersDic[key].length > 0) {
                i++
            }
        }

        switch (playMath) {
            case '定位胆-定位胆': {
                if (i > 0) {
                    return true
                }
            }
                break

            case '三星-直选复式': {
                if (i >= 3) return true
            }
                break

            case '三星-直选和值':{
                if (i>0) return true
            }break

            case '三星-组三复式': {
                for (var key in numbersDic) {
                    let numsArr = numbersDic[key]
                    if (numsArr.length >= 2) return true
                }
            }break

            case '三星-组六复式': {
                for (var key in numbersDic) {
                    let numsArr = numbersDic[key]
                    if (numsArr.length >= 3) {
                        return true
                    }
                }
            }break

            case '三星-组三和值': {
                if (i>0) return true

            }break
            case '三星-组六和值': {
                if (i>0) return true
            }break

            case '二星-前二直选':
            case '二星-后二直选': {
                if (i >= 2) return true
            }
                break

            case '不定位-二码不定位':
            case '二星-前二组选':
            case '二星-后二组选':{
                for (var key in numbersDic) {
                    let numsArr = numbersDic[key]
                    if (numsArr.length >= 2) {
                        return true
                    }
                }
            }break

            case '不定位-一码不定位': {
                if (i>0) return true
            }break

            case '大小单双-前二大小单双':
            case '大小单双-后二大小单双': {
                if (i == 2) return true
            }
        }
        return false
    }

    //计算当前号码池 注单数
    getNumberOfUnits(playMath) {

        if (!this.checkNumbers(playMath)) {
            return 0
        }
        switch (playMath) {
            case '三星-直选复式': {
                let array = []
                for (var key in numbersDic) {
                    let numArr = numbersDic[key]
                    if (numArr.length > 0) {
                        array.push(numArr)
                    }
                }
                noAddNumberOfUnits = getTotalBets(choose(array, 3))
                return noAddNumberOfUnits;
            }
                break

            case '三星-直选和值': {
                let count = 0
                for (var key in numbersDic) {
                    let numArr = numbersDic[key]
                    if (numArr.length > 0) {
                        numArr.map((item)=> {
                            let num = parseInt(item)
                            if (num > 13) {
                                count += this.config.R3ZXHZCounts[13 - (num - 14)]
                            } else {
                                count += this.config.R3ZXHZCounts[num]
                            }
                        })
                    }
                }
                let c = 3
                return noAddNumberOfUnits = count * (JXHelper.calc(c) / (JXHelper.calc(c - 3) * JXHelper.calc(3)))

            }
                break

            case '三星-组三和值':{
                let count = 0
                for (var key in numbersDic) {
                    let numArr = numbersDic[key]
                    if (numArr.length > 0) {
                        numArr.map((item)=> {
                            let num = parseInt(item)
                            count += this.config.Z3HZCounts[num-1]
                        })
                    }
                }
                return noAddNumberOfUnits = count;
            }break

            case '三星-组六和值':{
                let count = 0
                for (var key in numbersDic) {
                    let numArr = numbersDic[key]
                    if (numArr.length > 0) {
                        numArr.map((item)=> {
                            let num = parseInt(item)
                            count += this.config.Z6HZCounts[num-3]
                        })
                    }
                }
                return noAddNumberOfUnits = count;
            }break

            case '三星-组三复式': {
                let count = 0
                for (var key in numbersDic) {
                    let numArr = numbersDic[key]
                    count = numArr.length
                }
                let c = 3

                return noAddNumberOfUnits = ( JXHelper.calc(count) / (JXHelper.calc(count - 2) * JXHelper.calc(2)) * 2) * JXHelper.getCombinatorialNumber(c, 3)
            }
                break

            case '三星-组六复式': {
                let count = 0
                for (var key in numbersDic) {
                    let numArr = numbersDic[key]
                    count = numArr.length
                }
                let c = 3
                return noAddNumberOfUnits = ( JXHelper.calc(count) / (JXHelper.calc(count - 3) * JXHelper.calc(3))) * (JXHelper.calc(c) / (JXHelper.calc(c - 3) * JXHelper.calc(3)))
            }
                break

            case '二星-前二直选':
            case '二星-后二直选': {
                let count = 0
                let invalidCount = 0
                for (var key in numbersDic) {
                    let numArr = numbersDic[key]
                    if (numArr.length > 0) {
                        count += numArr.length
                    }
                    if (numArr.length >= 2) {
                        invalidCount += JXHelper.calc(numArr.length) / (JXHelper.calc(numArr.length - 2) * JXHelper.calc(2))
                    }
                }
                return noAddNumberOfUnits = (JXHelper.calc(count) / (JXHelper.calc(count - 2) * JXHelper.calc(2)) - invalidCount)
            }
                break

            case '二星-前二组选':
            case '二星-后二组选': {
                let count = 0
                for (var key in numbersDic) {
                    let numArr = numbersDic[key]
                    count = numArr.length
                }
                let c = 2
                return noAddNumberOfUnits = (JXHelper.calc(count) / (JXHelper.calc(count - 2) * JXHelper.calc(2))) * (JXHelper.calc(c) / (JXHelper.calc(c - 2) * JXHelper.calc(2)))
            }
                break


            case '定位胆-定位胆' : {
                let count = 0
                for (var key in numbersDic) {
                    let numArr = numbersDic[key]
                    if (numArr.length > 0)
                        count += numArr.length
                }
                return noAddNumberOfUnits = count
            }
                break

            case '不定位-一码不定位':{
                let count = 0
                count = numbersDic[0].length
                return noAddNumberOfUnits = count
            } break

            case '不定位-二码不定位': {
                let count = 0
                count = numbersDic[0].length
                let c = 2
                return noAddNumberOfUnits = (JXHelper.calc(count) / (JXHelper.calc(count - 2) * JXHelper.calc(2))) * (JXHelper.calc(c) / (JXHelper.calc(c - 2) * JXHelper.calc(2)))

            } break

            case '大小单双-前二大小单双':
            case '大小单双-后二大小单双': {
                let count = 1
                for (var key in numbersDic) {
                    let numArr = numbersDic[key]
                    if (numArr.length > 0)
                        count = count * numArr.length
                }
                return noAddNumberOfUnits = count
            }
                break

        }
        return noAddNumberOfUnits = 0
    }

    //机选 添加注数
    randomSelect(numberOfUnits, dontAdd) {
        this.clearCurrentSelectData()
        GSBQW = this.config.getWhetherNeedShowGSBQW(myMathType)
        if (GSBQW == null) GSBQW = []
        switch (myMathType) {
            case '定位胆-定位胆': {
                this.getDNRandomNumberOfCombinationEntryUnits(numberOfUnits, 2, dontAdd)
            }
                break
            case '三星-直选复式': {
                this.getXXXRandomNumberOfCombinationEntryUnits(numberOfUnits, 3, dontAdd, 3)
            }break

            case '三星-直选和值':{
                this.getRandomNumberOfSingleEntryUnits(numberOfUnits, 1, dontAdd,25,1)
            }break

            case '三星-组三复式':{
                this.getRandomNumberOfCombinationEntryUnits(numberOfUnits, 2, dontAdd)
            }break

            case '三星-组三和值': {
                this.getRandomNumberOfSingleEntryUnits(numberOfUnits, 1, dontAdd,25,1)

            }break

            case '三星-组六和值': {
                this.getRandomNumberOfSingleEntryUnits(numberOfUnits, 1, dontAdd,21,3)
            }break

            case '三星-组六复式':{
                this.getRandomNumberOfCombinationEntryUnits(numberOfUnits, 3, dontAdd)
            }break

            case '二星-前二直选':
            case '二星-后二直选': {
                this.getXXXRandomNumberOfCombinationEntryUnits(numberOfUnits, 2, dontAdd, 2)
            }break

            case '二星-前二组选':
            case '二星-后二组选': {
                this.getRandomNumberOfCombinationEntryUnits(numberOfUnits, 2, dontAdd)
            }break

            case '不定位-一码不定位':{
                this.getRandomNumberOfSingleEntryUnits(numberOfUnits, 1, dontAdd)
            } break

            case '不定位-二码不定位': {
                this.getRandomNumberOfCombinationEntryUnits(numberOfUnits, 2, dontAdd)
            } break

            case '大小单双-前二大小单双':
            case '大小单双-后二大小单双': {
                for (let i = 0; i < numberOfUnits; i++) {
                    for (let j = 0; j < 2; j++) {
                        let random = getRandom_DaXiaoDanShuang()
                        this.addNumberWithType(j, random)
                    }
                    if (!dontAdd)
                        this.addNumbersDicToArray()
                }
            }
                break
        }
    }

    getRandomNumberOfSingleEntryUnits(numberOfUnitss, Digits, dontAdd,maxRandomNumber,minRandomNumber) {
        for (let i = 0; i < numberOfUnitss; i++) {
            for (let j = 0; j < Digits; j++) {
                let random = JXHelper.getRandomNumber(maxRandomNumber?maxRandomNumber:9)+(minRandomNumber>0?minRandomNumber:0)
                this.addNumberWithType(j, random)
            }
            if (!dontAdd)
                this.addNumbersDicToArray()
        }
    }

    getRandomNumberOfCombinationEntryUnits(numberOfUnitss, Digits, dontAdd) {
        for (let i = 0; i < numberOfUnitss; i++) {
            let myArray = this.config.getNumbersArray().concat()
            for (let j = 0; j < Digits; j++) {
                let random = JXHelper.getRandomNumber(myArray.length - 1)
                let num = myArray[random]
                myArray.remove(num)
                this.addNumberWithType(0, num)
            }
            if (!dontAdd)
                this.addNumbersDicToArray()
        }
    }

    //获取定位胆的随机数
    getDNRandomNumberOfCombinationEntryUnits(numberOfUnitss, areaMax, dontAdd) {
        for (let i = 0; i < numberOfUnitss; i++) {
            let areaIndex = JXHelper.getRandomNumber(areaMax)
            let number = JXHelper.getRandomNumber(9)
            this.addNumberWithType(areaIndex, number)
            if (!dontAdd)
                this.addNumbersDicToArray()
        }
    }

    //获取直选复试的随机数
    getXXXRandomNumberOfCombinationEntryUnits(numberOfUnitss, areaMax, dontAdd, needAreaCount) {
        let areaArray = []
        for (let i = 0; i < areaMax; i++) {
            areaArray.push(i)
        }
        for (let i = 0; i < numberOfUnitss; i++) {
            let myArray = areaArray.concat()
            for (let j = 0; j < needAreaCount; j++) {
                let random = myArray[JXHelper.getRandomNumber(myArray.length - 1)]
                let areaIndex = random
                myArray.remove(random)
                let number = JXHelper.getRandomNumber(9)
                this.addNumberWithType(areaIndex, number)
                if (!dontAdd)
                    this.addNumbersDicToArray()
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


function getRandom_DaXiaoDanShuang() {
    let dxds = ['大', '小', '单', '双']
    let index = _.random(3)
    return dxds[index]
}


function choose(arr, size) {
    var allResult = [];

    (function (arr, size, result) {
        var arrLen = arr.length;
        if (size > arrLen) {
            return;
        }
        if (size == arrLen) {
            allResult.push([].concat(result, arr))
        } else {
            for (var i = 0; i < arrLen; i++) {
                var newResult = [].concat(result);
                newResult.push(arr[i]);

                if (size == 1) {
                    allResult.push(newResult);
                } else {
                    var newArr = [].concat(arr);
                    newArr.splice(0, i + 1);
                    arguments.callee(newArr, size - 1, newResult);
                }
            }
        }
    })(arr, size, []);

    return allResult;
}

function getTotalBets(result) {
    var res = 0;
    for (var i = 0, len = result.length; i < len; i++) {
        res += getPerBet(result[i])
    }
    return res
}

function getPerBet(arr) {
    var length = arr.length
    var res = 1
    for (var i = 0; i < length; i++) {
        res *= arr[i].length
    }
    return res
}