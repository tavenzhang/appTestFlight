/**
 * Created by Sam on 2016/11/22.
 */
import _ from 'lodash';
import JXHelper from '../../../../../Common/JXHelper/JXHelper'
import  * as PlayMathConfig from '../../../../../Data/JXPlayMathConfig'

const config = {

    myNumbersArray: null,

    PlayType: ['首位数投', '首位红投', '二连直', '二连组', '前三直', '前三组', '快乐二', '快乐三', '快乐四', '快乐五'],
    getPlayMathNameWithIndex(index){
        return this.PlayType[index];
    },

    getNumbersArray(){
        if (this.myNumbersArray) {
            return this.myNumbersArray
        }
        let myNumbersArray = []
        for (let i = 1; i < 21; i++) {
            myNumbersArray.push(JXHelper.foo(i))
        }
        return this.myNumbersArray = myNumbersArray
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


export default class SingletonKL10F_DPS {

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
        noAddNumberOfUnits = 0
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
                json.gameplayMethod = PlayMathConfig.getGameMathKeyWithTitle(myMathType, gameUniqueId)
                json.showGameplayMethod = myMathType
                if (noAddNumberOfUnits == 0) {
                    this.getNumberOfUnits(myMathType)
                }
                json.numberOfUnits = noAddNumberOfUnits
                json.amount = (noAddNumberOfUnits * (price ? price : pricePerUnit)).toFixed(2)

                if (rebates) {
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
        return noAddNumberOfUnits
    }

    //添加投注前验证
    checkNumbers(playMath) {
        if (this.getNumberOfUnits(playMath) > 0) {
            return true
        }
        return false
    }

    //计算当前号码池 注单数
    getNumberOfUnits(playMath) {

        switch (playMath) {
            case '首位数投':
            case '首位红投': {
                let count = 1
                for (var key in numbersDic) {
                    let numArr = numbersDic[key]
                    if (numArr.length > 0)
                        count = count * numArr.length
                }
                return noAddNumberOfUnits = count
            }
                break

            case '二连组':
            case '快乐二': {
                let count = 0
                for (var key in numbersDic) {
                    let numArr = numbersDic[key]
                    count = numArr.length
                }
                if (count > 1)
                    return noAddNumberOfUnits = ( JXHelper.calc(count) / (JXHelper.calc(count - 2) * JXHelper.calc(2)))
                else return noAddNumberOfUnits = 0
            }
                break

            case '二连直': {
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
                return noAddNumberOfUnits = r.length
            }
                break
            case '前三直': {
                var b = this.getAreaArrayWith(0),
                    s = this.getAreaArrayWith(1),
                    g = this.getAreaArrayWith(2),
                    r = [];
                if (b.length < 1 || s.length < 1 || g.length < 1) {
                    return noAddNumberOfUnits = 0
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
                return noAddNumberOfUnits = r.length
            }
                break

            case '快乐三':
            case '前三组': {
                let count = 0
                for (var key in numbersDic) {
                    let numArr = numbersDic[key]
                    count = numArr.length
                }
                if (count > 2)
                    return noAddNumberOfUnits = ( JXHelper.calc(count) / (JXHelper.calc(count - 3) * JXHelper.calc(3)))
                else return noAddNumberOfUnits = 0
            }
                break

            case '快乐四': {
                let count = 0
                for (var key in numbersDic) {
                    let numArr = numbersDic[key]
                    count = numArr.length
                }
                if (count > 3)
                    return noAddNumberOfUnits = ( JXHelper.calc(count) / (JXHelper.calc(count - 4) * JXHelper.calc(4)))
                else return noAddNumberOfUnits = 0
            }
                break
            case '快乐五': {
                let count = 0
                for (var key in numbersDic) {
                    let numArr = numbersDic[key]
                    count = numArr.length
                }
                if (count > 4)
                    return noAddNumberOfUnits = ( JXHelper.calc(count) / (JXHelper.calc(count - 5) * JXHelper.calc(5)))
                else return noAddNumberOfUnits = 0
            }
                break
        }
        return noAddNumberOfUnits = 0
    }

    //机选 添加注数
    randomSelect(numberOfUnits, dontAdd) {
        this.clearCurrentSelectData()

        switch (myMathType) {
            case '首位数投': {
                this.getRandomNumberOfSingleEntryUnits(numberOfUnits, 1, dontAdd, this.config.getNumbersArray().concat().splice(0, 18))
            }
                break
            case '首位红投': {
                this.getRandomNumberOfSingleEntryUnits(numberOfUnits, 1, dontAdd, this.config.getNumbersArray().concat().splice(18, 2))
            }
                break
            case '二连直': {
                this.getRandomNumberOfSingleEntryUnits(numberOfUnits, 2, dontAdd, null, true)
            }
                break
            case '快乐二':
            case '二连组': {
                this.getRandomNumberOfCombinationEntryUnits(numberOfUnits, 2, dontAdd)
            }
                break

            case '前三直': {
                this.getRandomNumberOfSingleEntryUnits(numberOfUnits, 3, dontAdd, null, true)
            }
                break

            case '前三组': {
                this.getRandomNumberOfCombinationEntryUnits(numberOfUnits, 3, dontAdd)
            }
                break

            case '快乐三': {
                this.getRandomNumberOfCombinationEntryUnits(numberOfUnits, 3, dontAdd)
            }
                break

            case '快乐四': {
                this.getRandomNumberOfCombinationEntryUnits(numberOfUnits, 4, dontAdd)
            }
                break

            case '快乐五': {
                this.getRandomNumberOfCombinationEntryUnits(numberOfUnits, 5, dontAdd)
            }
                break
        }
    }

    getRandomNumberOfSingleEntryUnits(numberOfUnitss, Digits, dontAdd, dataSource, noEqual) {
        if (dataSource == null) {
            dataSource = this.config.getNumbersArray().concat()
        }
        for (let i = 0; i < numberOfUnitss; i++) {
            for (let j = 0; j < Digits; j++) {
                let random = JXHelper.getRandomNumber(dataSource.length - 1)
                let num = dataSource[random]
                this.addNumberWithType(j, num)
                if (noEqual) {
                    dataSource.remove(num)
                }
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

    _getRandomNumber() {
        this.randomSelect(1, true)
        let tempNumDic = _.cloneDeep(numbersDic)
        numbersDic = {}
        return tempNumDic
    }
}

