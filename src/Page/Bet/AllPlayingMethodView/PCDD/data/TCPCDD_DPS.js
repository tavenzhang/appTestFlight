/**
 * Created by Sam on 2016/11/29.
 */

import _ from 'lodash';
import JXHelper from '../../../../../Common/JXHelper/JXHelper'
import  * as PlayMathConfig from '../../../../../Data/JXPlayMathConfig'

let instance = null

let config = {

    myNumbersArray: null,

    playInfo: [''],

    PlayType: ['混合', '特码', '特码包三', '波色','豹子'],

    getPlayMathNameWithIndex(index){
        return this.PlayType[index];
    },

    getNumbersArray(){
        if (myNumbersArray) {
            return myNumbersArray
        }
        let myNumbersArray = []
        for (let i = 0; i < 28; i++) {
            myNumbersArray.push(i)
        }
        return myNumbersArray
    },

    getSpecialKindArray(){
        return ['大', '小','单', '双', '大单','小单','大双','小双', '极大','极小']
    },

    getNumbersOfColorArray_half(){
        return ['红单', '红双', '红大', '红小', '蓝单', '蓝双', '蓝大', '蓝小', '绿单', '绿双', '绿大', '绿小']
    },

    getSheBo(){
        return ['红波', '蓝波', '绿波',]
    },

    getBaoZi(){
        return ['豹子']
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

    getmyMathTypeIDWithChineseName(name){
        return PlayMathConfig.getGameMathKeyWithTitle(name,gameUniqueId)
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

    //加注
    addNumbersDicToArray2(odds, price, rebates) {
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

                //
                // if (rebates){
                //     json.returnMoneyRatio = rebates
                // }
                json.pricePerUnit = price ? price : pricePerUnit

                numbersArray.push(json)
                totalBetNumber += json.numberOfUnits
                totalAmount += parseFloat(json.amount)
            }
        }
        this.resetPlayMath(myMathType)
        return true
    }

    addNumbersDicToArray(odds, price, rebates) {

        if (myMathType == '特码包三'){
            return this.addNumbersDicToArray2(odds,price,rebates)
        }

        if (!this.checkNumbers(myMathType)) return false
        if (numbersDic) {
            let bStr = this.getAllJSon()
            let aStr = bStr.split(" ")


            aStr.map((item) =>{
                if (item.length >0){
                    let json = {}
                    json.betString = item
                    json.gameplayMethod = PlayMathConfig.getGameMathKeyWithTitle(myMathType, gameUniqueId)
                    json.showGameplayMethod = myMathType
                    if (numberOfUnits == 0) {
                        this.getNumberOfUnits(myMathType)
                    }
                    json.numberOfUnits = 1
                    json.amount = (1 * (price ? price : pricePerUnit)).toFixed(2)
                    json.pricePerUnit = price ? price : pricePerUnit

                    numbersArray.push(json)
                    totalBetNumber += json.numberOfUnits
                    totalAmount = parseFloat(totalAmount.accAdd(json.amount))
                    this.resetPlayMath(myMathType)
                }
            })

        }
        return true
    }

    resetStraightbetPrice(newPrice) {
        if (newPrice == null) return
        totalAmount = 0
        numbersArray.forEach(json => {
                json.amount = (1 * (newPrice ? newPrice : pricePerUnit)).toFixed(2)
                json.pricePerUnit = newPrice ? newPrice : pricePerUnit
                totalAmount += parseFloat(json.amount)
            }
        )
    }

    resetNumberArrayItemWithIndexAndItem(item,index){
        numbersArray[index] = item
        totalAmount = 0
        numbersArray.map((item)=>{
            totalAmount += parseFloat(item.amount)
        })
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
        let i = 0
        let j = 0
        for (var key in numbersDic) {
            if (numbersDic[key].length > 0) {
                i++
                j+=numbersDic[key].length
            }
        }

        switch (playMath) {
            case '混合':
            case '特码':
            case '波色':
            case '豹子': {
                if (i == 1) return true
            }
                break
            case '特码包三':{
                if(j>=3){
                    return true
                }
            }break
        }
        return false
    }

    //计算当前号码池 注单数
    getNumberOfUnits(playMath) {
        if (!this.checkNumbers(playMath)) {
            return 0
        }
        switch (playMath) {
            case '混合':
            case '特码':
            case '波色':
            case '豹子': {
                let count = 1
                for (var key in numbersDic) {
                    let numArr = numbersDic[key]
                    if (numArr.length > 0)
                        count = count * numArr.length
                }
                return numberOfUnits = count
            }
                break
            case '特码包三':{
                let j = 0
                for (var key in numbersDic) {
                    if (numbersDic[key].length > 0) {
                        j+=numbersDic[key].length
                    }
                }
                if (j<3){
                    return numberOfUnits = 0
                }

                return numberOfUnits = JXHelper.getCombinatorialNumber(j,3)

            }break

        }
        return numberOfUnits = 0
    }

    //机选 添加注数
    randomSelect(numberOfUnits, dontAdd) {
        this.clearCurrentSelectData()
        switch (myMathType) {
            case '混合': {
                this.getRandomNumberOfSingleEntryUnits(numberOfUnits, this.config.getSpecialKindArray(), dontAdd)
            }break
            case '特码':{
                this.getRandomNumberOfSingleEntryUnits(numberOfUnits, this.config.getNumbersArray(), dontAdd)
            }break
            case '特码包三':{
                this.getRandomNumberOfCombinationEntryUnits(numberOfUnits,3,dontAdd)
            }break
            case '波色':{
                this.getRandomNumberOfSingleEntryUnits(numberOfUnits, this.config.getSheBo(), dontAdd)
            }
            break
            case '豹子': {
                this.getRandomNumberOfSingleEntryUnits(numberOfUnits, this.config.getBaoZi(), dontAdd)
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


