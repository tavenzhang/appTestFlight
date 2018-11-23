/**
 * Created by Sam on 2016/11/29.
 */

import _ from 'lodash';
import  * as PlayMathConfig from '../../../../../Data/JXPlayMathConfig'

var JXHelper = require('../../../../../Common/JXHelper/JXHelper')

let instance = null

let config = {

    myNumbersArray: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10',],
dxdsNumbersArray:['大','小','单','双','大单','大双','小单','小双','龙','虎'],
    playInfo: [''],

    PlayType: ['前一', '前二', '前三', '定位胆','第一名','第二名','第三名','冠亚和值','冠亚和'],

    typeTitles: ['冠军', '亚军', '季军', '第四名', '第五名', '第六名', '第七名', '第八名', '第九名', '第十名'],

    getPlayMathNameWithIndex(index){
        return this.PlayType[index];
    },

    getNumbersArray(){
        return this.myNumbersArray
    },
    getDXDSNumbersArray(){
        return this.dxdsNumbersArray
    },getHZArray(){
        let myNumbersArray = []
        for (let i =3; i < 20; i++) {
            myNumbersArray.push(i)
        }
        return myNumbersArray
    },getHZDXSArray(){
        return ['大','小','单','双','大单','大双','小单','小双']
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
        myMathTypeID = PlayMathConfig.getGameMathKeyWithTitle(myMathType,'HF_BJPK10')
    }

    getmyMathTypeID(){
        return myMathTypeID
    }

    resetPlayGameUniqueId(uniqueId){
        gameUniqueId = uniqueId
    }
    getmyMathTypeIDWithChineseName(name){
        return PlayMathConfig.getGameMathKeyWithTitle(name,gameUniqueId)
    }
    getAllJSon() {
        let str = ''
        let isD = false
        if (myMathType == '定位胆') {
            for (let i = 0; i < 10; i++) {
                this.getAreaArrayWith(i)
            }
            isD = true
        }
        for (var item in numbersDic) {
            if (isD || numbersDic[item].length > 0) {
                str = str + (numbersDic[item].toString().replace(/\,/g, " ")) + '|'
            }
        }

        if (myMathType != '定位胆') {
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
    }

    //清除当前选中但是未加注前的号码
    clearCurrentSelectData() {
        numbersDic = {}
    }

    deleteOneItemWithJsonIndex(index) {
        JXLog('delete :',numbersArray)
        JXLog("delete :",numbersArray[index].amount)
        totalAmount=parseFloat(totalAmount.accSub(numbersArray[index].amount));
        JXLog("delete :",totalAmount)
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
                json.gameplayMethod = PlayMathConfig.getGameMathKeyWithTitle(myMathType,'HF_BJPK10')
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
        return parseFloat(totalAmount.accMul(multiplier))
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
        if (this.getNumberOfUnits(playMath) > 0) {
            return true
        }
        return false
    }



    //计算当前号码池 注单数
    getNumberOfUnits() {

        switch (myMathType) {
            case '前一': {
                let DCount = this.getAreaNumbersCount(0)
                return numberOfUnits = DCount
            }
                break
            case '前二': {
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
            }
                break
            case '前三': {
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
            case '定位胆': {
                let i = 0
                for (var key in numbersDic) {
                    let numsArr = numbersDic[key]
                    if (numsArr.length > 0) {
                        i += numsArr.length
                    }
                }
                return numberOfUnits = i
            }
            case '第一名':
            case '第二名':
            case '第三名':
            case '冠亚和值':
            case '冠亚和':
                {
                let DCount = this.getAreaNumbersCount(0)
                return numberOfUnits = DCount
            }
        }
        return numberOfUnits = 0
    }


    //机选 添加注数
    randomSelect(numberOfUnits, dontAdd) {
        this.clearCurrentSelectData()
        switch (myMathType) {
            case '前一': {
                this.getRandomNumberOfSingleEntryUnits(numberOfUnits, 1, dontAdd, this.config.getNumbersArray().concat())
            }
                break
            case '前二': {
                this.getRandomNumberOfSingleEntryUnits(numberOfUnits, 2, dontAdd, this.config.getNumbersArray().concat())
            }
                break
            case '前三': {
                console.log('randomSelect = ' + myMathType)
                this.getRandomNumberOfSingleEntryUnits(numberOfUnits, 3, dontAdd, this.config.getNumbersArray().concat())
            }
                break
            case '定位胆': {
                this.getRandomNumberOfCombinationEntryUnits(numberOfUnits, dontAdd)
            }
            break
            case '第一名':
            case '第二名':
            case '第三名':
                {
                this.getRandomNumberOfSingleEntryUnits(numberOfUnits,1,dontAdd,this.config.getDXDSNumbersArray())
            }
            break
            case '冠亚和值':{
                this.getRandomNumberOfSingleEntryUnits(numberOfUnits,1,dontAdd,this.config.getHZArray())
            }
            break
            case '冠亚和':{
                this.getRandomNumberOfSingleEntryUnits(numberOfUnits,1,dontAdd,this.config.getHZDXSArray())
            }
            break
        }
    }

    getRandomNumberOfSingleEntryUnits(numberOfUnitss, Digits, dontAdd,dataArray) {
        let myArray =dataArray.concat()
        for (let i = 0; i < numberOfUnitss; i++) {
            for (let j = 0; j < Digits; j++) {
                let random = JXHelper.getRandomNumber(myArray.length - 1)
                let num = myArray[random]
                myArray.remove(num)
                this.addNumberWithType(j, num)
            }
            if (!dontAdd)
                this.addNumbersDicToArray()
        }
    }



    //获取定位胆的随机数
    getRandomNumberOfCombinationEntryUnits(numberOfUnitss, dontAdd) {
        for (let i = 0; i < numberOfUnitss; i++) {
            let areaIndex = JXHelper.getRandomNumber(9)
            let number = JXHelper.getRandomNumber(9) + 1
            this.addNumberWithType(areaIndex, number)
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

