/**
 * Created by Sam on 2016/11/22.
 */
import _ from 'lodash';
import JXHelper from '../../../../../Common/JXHelper/JXHelper'
import  * as PlayMathConfig from '../../../../../Data/JXPlayMathConfig'

const config = {

    myNumbersArray: null,

    playInfo: ['每位至少选择1一个号，按位猜对开奖号码最高中奖20440元', ''],

    // PlayType: ['定位胆', '五星通选', '五星直选', '三星直选', '三星组三', '三星组六', '二星直选', '二星组选', '一星直选', '大小单双'],
    PlayMathType: [
        '定位胆',
        '五星',
        '三星',
        '二星',
        '大小单双',
        '不定位',
        '任选二',
        '任选三',
        '任选四',
        '龙虎',
        '顺子',
        '斗牛',
    ],
    PlayMathItemType: [
        ['定位胆'],
        ['五星通选', '五星直选'],
        ['三星直选', '三星组三', '三星组六'],
        ['二星直选', '二星组选'],
        ['后二大小单双', '后三大小单双', '前二大小单双', '前三大小单双', '万位', '千位', '百位', '十位', '个位','总和'],
        ['前三一码', '前三二码', '后三一码', '后三二码', '前四一码', '前四二码', '后四一码', '后四二码', '五星一码', '五星二码', '五星三码'],
        ['直选复式', '直选和值', '组选复式', '组选和值'],
        ['直选复式', '直选和值', '组三复式', '组六复式', '组选和值'],
        ['直选复式', '组选24', '组选12', '组选6', '组选4'],
        ['总和','龙虎-万千','龙虎-万百','龙虎-万十','龙虎-万个','龙虎-千百','龙虎-千十','龙虎-千个','龙虎-百十','龙虎-百个','龙虎-十个'],
        ['前三球', '中三球', '后三球'],
        ['斗牛']
    ],
    Position: ['个位', '十位', '百位', '千位', '万位'],
    PositionPost: ['G', 'S', 'B', 'Q', 'W'],

    shunZi: ['豹子', '对子', '顺子', '半顺', '杂六'],
    niuNiu: ['牛牛', '牛九', '牛八', '牛七', '牛六', '牛五', '牛四', '牛三', '牛二', '牛一', '无牛'],
    longHu: ['龙', '虎', '和'],
    DXDS: ['大', '小', '单', '双'],


    R3ZXHZCounts: [1, 3, 6, 10, 15, 21, 28, 36, 45, 55, 63, 69, 73, 75],
    R3ZhuXuanHZCounts: [1, 1, 2, 2, 4, 5, 6, 8, 10, 11, 13, 14, 14, 15],

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

    getWhetherNeedShowGSBQW(playMath){
        switch (playMath) {
            case '任选四-组选24':
            case '任选四-组选12':
            case '任选四-组选6':
            case '任选四-组选4': {
                return [3, 2, 1, 0]
            }
            case '任选二-直选和值':
            case '任选二-组选复式':
            case '任选二-组选和值': {
                return [1, 0]
            }
            case '任选三-直选和值':
            case '任选三-组三复式':
            case '任选三-组六复式':
            case '任选三-组选和值': {
                return [2, 1, 0]
            }
        }
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

    resetGSBQW(gsbqw) {
        if (!gsbqw || gsbqw.length == 0) {
            GSBQW = []
            return
        }
        GSBQW = gsbqw.sort(function (a, b) {
            return b - a;
        });
    }

    getmyMathTypeID() {
        return myMathTypeID
    }

    getmyMathTypeIDWithChineseName(name) {
        return PlayMathConfig.getGameMathKeyWithTitle(name, gameUniqueId)
    }

    getPlayGameUniqueId() {
        return gameUniqueId;
    }

    resetPlayGameUniqueId(uniqueId) {
        gameUniqueId = uniqueId
    }

    getAllJSon() {
        let str = ''
        let isD = false
        if (myMathType == '定位胆-定位胆' || myMathType == '任选二-直选复式' || myMathType == '任选三-直选复式' || myMathType == '任选四-直选复式') {
            for (let i = 0; i < 5; i++) {
                this.getAreaArrayWith(i)
            }
            isD = true
        }

        for (var item in numbersDic) {
            if (isD || numbersDic[item].length > 0) {
                str = str + (numbersDic[item].toString().replace(/\,/g, " ")) + '|'
            }
        }

        if (myMathType != '定位胆-定位胆' && myMathType != '任选二-直选复式' && myMathType != '任选三-直选复式' && myMathType != '任选四-直选复式') {
            str = _.trimEnd(str, "|")
        }
        if (str === "|||||" ){
            str = ''
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
        totalAmount = parseFloat(totalAmount.accSub(numbersArray[index].amount))
        totalBetNumber -= numbersArray[index].numberOfUnits
        numbersArray.splice(index, 1)
    }

    addNumberWithType(areaIndex, number) {
        let numbersArr = this.getAreaArrayWith(areaIndex)
        // if (myMathType == '大小单双') {
        //     numbersArr.pop()
        // }
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
                if (null != this.config.getWhetherNeedShowGSBQW(myMathType)) {
                    GSBQW.map((item)=> {
                        str += this.config.PositionPost[item] + ' '
                        str2 += this.config.Position[item]
                    })
                    str = _.trimEnd(str, "|")
                    json.betString = str + ':' + json.betString
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
            case '龙虎-龙虎-万千':
            case '龙虎-龙虎-万百':
            case '龙虎-龙虎-万十':
            case '龙虎-龙虎-万个':
            case '龙虎-龙虎-千百':
            case '龙虎-龙虎-千十':
            case '龙虎-龙虎-千个':
            case '龙虎-龙虎-百十':
            case '龙虎-龙虎-百个':
            case '龙虎-龙虎-十个':
            case '顺子-前三球':
            case '顺子-中三球':
            case '顺子-后三球':
            case '大小单双-万位':
            case '大小单双-千位':
            case '大小单双-百位':
            case '大小单双-十位':
            case '大小单双-个位':
            case '斗牛-斗牛':
            case '定位胆-定位胆': {
                if (i > 0) {
                    return true
                }
            }
                break
            case '五星-五星通选': {
                if (i == 5)return true
            }
                break

            case '五星-五星直选': {
                if (i == 5)return true
            }
                break

            case '任选四-直选复式': {
                if (i >= 4)return true
            }
                break

            case '任选三-直选复式':
            case '三星-三星直选': {
                if (i >= 3) return true
            }
                break

            case '三星-三星组三': {
                for (var key in numbersDic) {
                    let numsArr = numbersDic[key]
                    if (numsArr.length >= 2) return true
                }
            }
                break

            case '不定位-五星三码':
            case '三星-三星组六': {
                for (var key in numbersDic) {
                    let numsArr = numbersDic[key]
                    if (numsArr.length >= 3) {
                        return true
                    }
                }
            }
                break

            case '任选二-直选复式':
            case '二星-二星直选': {
                if (i >= 2) return true
            }
                break

            case '不定位-前三二码':
            case '不定位-后三二码':
            case '不定位-前四二码':
            case '不定位-后四二码':
            case '不定位-五星二码':
            case '二星-二星组选': {
                for (var key in numbersDic) {
                    let numsArr = numbersDic[key]
                    if (numsArr.length >= 2) {
                        return true
                    }
                }
            }
                break

            case '不定位-前三一码':
            case '不定位-前四一码':
            case '不定位-后三一码':
            case '不定位-后四一码':
            case '不定位-五星一码':
            case '一星-一星直选': {
                if (i == 1) return true
            }
                break

            case '大小单双-前二大小单双':
            case '大小单双-后二大小单双': {
                if (i == 2) return true
            }
                break
            case '大小单双-前三大小单双':
            case '大小单双-后三大小单双': {
                if (i == 3) return true
            }
                break

            case '任选二-组选和值':
            case '任选二-直选和值': {
                if (i > 0 && GSBQW.length >= 2) return true
            }
                break

            case '任选三-组六复式': {
                for (var key in numbersDic) {
                    let numsArr = numbersDic[key]
                    if (numsArr.length > 2 && GSBQW.length > 2) return true
                }
            }
                break

            case '任选三-组选和值':
            case '任选三-直选和值': {
                if (i > 0 && GSBQW.length >= 3) return true
            }
                break

            case '任选四-组选24': {
                for (var key in numbersDic) {
                    let numsArr = numbersDic[key]
                    if (numsArr.length > 3 && GSBQW.length > 3) return true
                }
            }
                break

            case '任选四-组选12': {
                let ECH = numbersDic[0]
                let DH = numbersDic[1]
                let c = GSBQW.length

                if (!ECH || ECH.length == 0 || !DH || DH.length < 2 || c < 4) {
                    return false
                }
                let repetition = 0
                ECH.map((item)=> {
                    DH.map((item2)=> {
                        if (item == item2) {
                            repetition++
                        }
                    })
                })
                let count = (ECH.length * JXHelper.getCombinatorialNumber(DH.length, 2) - (DH.length - 1) * repetition) * JXHelper.getCombinatorialNumber(c, 4)
                if (count > 0) return true
            }
                break

            case '任选四-组选6': {
                for (var key in numbersDic) {
                    let numsArr = numbersDic[key]
                    if (numsArr.length >= 2 && GSBQW.length > 3) {
                        return true
                    }
                }
            }
                break

            case '任选四-组选4': {
                let ECH = numbersDic[0]
                let DH = numbersDic[1]
                let c = GSBQW.length
                if (!ECH || ECH.length == 0 || !DH || DH.length == 0 || c < 4) {
                    return false
                }
                let repetition = 0
                ECH.map((item)=> {
                    DH.map((item2)=> {
                        if (item == item2) {
                            repetition++
                        }
                    })
                })
                let count = (ECH.length * DH.length - repetition) * JXHelper.getCombinatorialNumber(c, 4)
                if (count > 0) return true
            }
                break

            case '任选二-组选复式': {
                for (var key in numbersDic) {
                    let numsArr = numbersDic[key]
                    if (numsArr.length >= 2 && GSBQW.length > 1) {
                        return true
                    }
                }
            }
                break

            case '任选三-组三复式': {
                for (var key in numbersDic) {
                    let numsArr = numbersDic[key]
                    if (numsArr.length >= 2 && GSBQW.length > 2) {
                        return true
                    }
                }
            }


        }
        return false
    }

    //计算当前号码池 注单数
    getNumberOfUnits() {
        if (!this.checkNumbers(myMathType)) {
            return 0
        }
        switch (myMathType) {

            case '任选二-直选复式': {
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

            case '任选二-直选和值': {
                let count = 0
                for (var key in numbersDic) {
                    let numArr = numbersDic[key]
                    if (numArr.length > 0) {
                        numArr.map((item)=> {
                            let num = parseInt(item)
                            if (num > 9) {
                                count += (18 - num + 1)
                            } else {
                                count += num + 1
                            }
                        })
                    }
                }
                let c = GSBQW.length
                return noAddNumberOfUnits = count * (JXHelper.calc(c) / (JXHelper.calc(c - 2) * JXHelper.calc(2)))

            }
                break

            case '任选二-组选复式': {
                let count = 0
                for (var key in numbersDic) {
                    let numArr = numbersDic[key]
                    count = numArr.length
                }
                let c = GSBQW.length
                return noAddNumberOfUnits = (JXHelper.calc(count) / (JXHelper.calc(count - 2) * JXHelper.calc(2))) * (JXHelper.calc(c) / (JXHelper.calc(c - 2) * JXHelper.calc(2)))

            }
                break

            case '任选二-组选和值': {
                let count = 0
                for (var key in numbersDic) {
                    let numArr = numbersDic[key]
                    if (numArr.length > 0) {
                        numArr.map((item)=> {
                            let num = parseInt(item)
                            if (num > 9) {
                                count += parseInt((18 - num + 2) / 2)
                            } else {
                                count += parseInt((num + 2) / 2)
                            }
                        })
                    }
                }
                let c = GSBQW.length
                return noAddNumberOfUnits = count * (JXHelper.calc(c) / (JXHelper.calc(c - 2) * JXHelper.calc(2)))
            }
                break


            case '任选三-组三复式': {
                let count = 0
                for (var key in numbersDic) {
                    let numArr = numbersDic[key]
                    count = numArr.length
                }
                let c = GSBQW.length

                return noAddNumberOfUnits = ( JXHelper.calc(count) / (JXHelper.calc(count - 2) * JXHelper.calc(2)) * 2) * JXHelper.getCombinatorialNumber(c, 3)
            }
                break

            case '任选三-组六复式': {
                let count = 0
                for (var key in numbersDic) {
                    let numArr = numbersDic[key]
                    count = numArr.length
                }
                let c = GSBQW.length
                return noAddNumberOfUnits = ( JXHelper.calc(count) / (JXHelper.calc(count - 3) * JXHelper.calc(3))) * (JXHelper.calc(c) / (JXHelper.calc(c - 3) * JXHelper.calc(3)))
            }
                break

            case '任选三-组选和值': {
                let count = 0
                for (var key in numbersDic) {
                    let numArr = numbersDic[key]
                    if (numArr.length > 0) {
                        numArr.map((item)=> {
                            let num = parseInt(item)
                            if (num > 13) {
                                count += this.config.R3ZhuXuanHZCounts[13 - (num - 14)]
                            } else {
                                count += this.config.R3ZhuXuanHZCounts[num]
                            }

                            if (num > 0 && num % 3 == 0 && num != 27) {
                                count++
                            }
                        })
                    }
                }
                let c = GSBQW.length
                return noAddNumberOfUnits = count * (JXHelper.calc(c) / (JXHelper.calc(c - 3) * JXHelper.calc(3)))
            }
                break

            case '任选三-直选和值': {
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
                let c = GSBQW.length
                return noAddNumberOfUnits = count * (JXHelper.calc(c) / (JXHelper.calc(c - 3) * JXHelper.calc(3)))

            }
                break

            case '任选三-直选复式': {
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

            case '任选四-组选24': {
                let count = 0
                for (var key in numbersDic) {
                    let numArr = numbersDic[key]
                    if (numArr.length > 0) {
                        count = numArr.length
                    }
                }
                let c = GSBQW.length
                return noAddNumberOfUnits = JXHelper.getCombinatorialNumber(count, 4) * JXHelper.getCombinatorialNumber(c, 4)
            }
                break

            case '任选四-组选12': {
                let ECH = numbersDic[0]
                let DH = numbersDic[1]
                let c = GSBQW.length

                if (!ECH || ECH.length == 0 || !DH || DH.length < 2 || c.length < 4) {
                    return noAddNumberOfUnits = 0
                }

                let repetition = 0
                ECH.map((item)=> {
                    DH.map((item2)=> {
                        if (item == item2) {
                            repetition++
                        }
                    })
                })
                return noAddNumberOfUnits = (ECH.length * JXHelper.getCombinatorialNumber(DH.length, 2) - (DH.length - 1) * repetition) * JXHelper.getCombinatorialNumber(c, 4)
            }
                break

            case '任选四-组选6': {
                let count = 0
                for (var key in numbersDic) {
                    let numArr = numbersDic[key]
                    if (numArr.length > 0) {
                        count = numArr.length
                    }
                }
                let c = GSBQW.length
                return noAddNumberOfUnits = JXHelper.getCombinatorialNumber(count, 2) * JXHelper.getCombinatorialNumber(c, 4)
            }
                break

            case '任选四-组选4': {
                let ECH = numbersDic[0]
                let DH = numbersDic[1]
                let c = GSBQW.length
                if (!ECH || ECH.length == 0 || !DH || DH.length == 0 || c.length < 4) {
                    return noAddNumberOfUnits = 0
                }
                let repetition = 0
                ECH.map((item)=> {
                    DH.map((item2)=> {
                        if (item == item2) {
                            repetition++
                        }
                    })
                })
                return noAddNumberOfUnits = (ECH.length * DH.length - repetition) * JXHelper.getCombinatorialNumber(c, 4)
            }
                break

            case '任选四-直选复式': {
                let array = []
                for (var key in numbersDic) {
                    let numArr = numbersDic[key]
                    if (numArr.length > 0) {
                        array.push(numArr)
                    }
                }
                noAddNumberOfUnits = getTotalBets(choose(array, 4))
                return noAddNumberOfUnits;
            }
                break

            case '龙虎-龙虎-万千':
            case '龙虎-龙虎-万百':
            case '龙虎-龙虎-万十':
            case '龙虎-龙虎-万个':
            case '龙虎-龙虎-千百':
            case '龙虎-龙虎-千十':
            case '龙虎-龙虎-千个':
            case '龙虎-龙虎-百十':
            case '龙虎-龙虎-百个':
            case '龙虎-龙虎-十个':
            case '龙虎-龙虎':
            case '顺子-前三球':
            case '顺子-中三球':
            case '顺子-后三球':
            case '大小单双-万位':
            case '大小单双-千位':
            case '大小单双-百位':
            case '大小单双-十位':
            case '大小单双-个位':
            case '斗牛-斗牛':
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

            case '不定位-前三一码':
            case '不定位-前四一码':
            case '不定位-后三一码':
            case '不定位-后四一码':
            case '不定位-五星一码':
            case '五星-五星通选':
            case '五星-五星直选':
            case '三星-三星直选':
            case '二星-二星直选':
            case '一星-一星直选':
            case '大小单双-前二大小单双':
            case '大小单双-后二大小单双':
            case '大小单双-前三大小单双':
            case '大小单双-后三大小单双': {
                let count = 1
                for (var key in numbersDic) {
                    let numArr = numbersDic[key]
                    if (numArr.length > 0)
                        count = count * numArr.length
                }
                return noAddNumberOfUnits = count
            }
                break
            case '三星-三星组三': {
                let count = 0
                for (var key in numbersDic) {
                    let numArr = numbersDic[key]
                    count = numArr.length
                }
                return noAddNumberOfUnits = ( JXHelper.calc(count) / (JXHelper.calc(count - 2) * JXHelper.calc(2)) * 2)
            }
                break

            case '不定位-五星三码':
            case '三星-三星组六': {
                let count = 0
                for (var key in numbersDic) {
                    let numArr = numbersDic[key]
                    count = numArr.length
                }
                return noAddNumberOfUnits = ( JXHelper.calc(count) / (JXHelper.calc(count - 3) * JXHelper.calc(3)))
            }
                break

            case '不定位-前三二码':
            case '不定位-后三二码':
            case '不定位-前四二码':
            case '不定位-后四二码':
            case '不定位-五星二码':
            case '二星-二星组选': {
                let count = 0
                for (var key in numbersDic) {
                    let numArr = numbersDic[key]
                    count = numArr.length
                }
                return noAddNumberOfUnits = ( JXHelper.calc(count) / (JXHelper.calc(count - 2) * JXHelper.calc(2)))
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
                this.getDNRandomNumberOfCombinationEntryUnits(numberOfUnits, 4, dontAdd)
            }
                break
            case '任选二-直选复式': {
                this.getXXXRandomNumberOfCombinationEntryUnits(numberOfUnits, 5, dontAdd, 2)
            }
                break
            case '任选三-直选复式': {
                this.getXXXRandomNumberOfCombinationEntryUnits(numberOfUnits, 5, dontAdd, 3)
            }
                break
            case '任选四-直选复式': {
                this.getXXXRandomNumberOfCombinationEntryUnits(numberOfUnits, 5, dontAdd, 4)
            }
                break
            case '五星-五星通选': {
                this.getRandomNumberOfSingleEntryUnits(numberOfUnits, 5, dontAdd)
            }
                break
            case '五星-五星直选': {
                this.getRandomNumberOfSingleEntryUnits(numberOfUnits, 5, dontAdd)
            }
                break
            case '三星-三星直选': {
                this.getRandomNumberOfSingleEntryUnits(numberOfUnits, 3, dontAdd)
            }
                break

            case '任选三-组三复式':
            case '三星-三星组三': {
                this.getRandomNumberOfCombinationEntryUnits(numberOfUnits, 2, dontAdd)
            }
                break

            case '任选三-组六复式':
            case '不定位-五星三码':
            case '三星-三星组六': {
                this.getRandomNumberOfCombinationEntryUnits(numberOfUnits, 3, dontAdd)
            }
                break

            case '二星-二星直选': {
                this.getRandomNumberOfSingleEntryUnits(numberOfUnits, 2, dontAdd)
            }
                break

            case '任选二-组选复式':
            case '任选四-组选6':
            case '不定位-前三二码':
            case '不定位-后三二码':
            case '不定位-前四二码':
            case '不定位-后四二码':
            case '不定位-五星二码':
            case '二星-二星组选': {
                this.getRandomNumberOfCombinationEntryUnits(numberOfUnits, 2, dontAdd)
            }
                break

            case '不定位-前三一码':
            case '不定位-前四一码':
            case '不定位-后三一码':
            case '不定位-后四一码':
            case '不定位-五星一码':
            case '一星-一星直选': {
                this.getRandomNumberOfSingleEntryUnits(numberOfUnits, 1, dontAdd)
            }
                break

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
            case '大小单双-前三大小单双':
            case '大小单双-后三大小单双': {
                for (let i = 0; i < numberOfUnits; i++) {
                    for (let j = 0; j < 3; j++) {
                        let random = getRandom_DaXiaoDanShuang()
                        this.addNumberWithType(j, random)
                    }
                    if (!dontAdd)
                        this.addNumbersDicToArray()
                }
            }
                break

            case '任选三-组选和值':
            case '任选三-直选和值': {
                this.getRandomNumberOfSingleEntryUnits(numberOfUnits, 1, dontAdd, 27)
            }
                break
            case '任选二-组选和值':
            case '任选二-直选和值': {
                this.getRandomNumberOfSingleEntryUnits(numberOfUnits, 1, dontAdd, 18)
            }
                break

            case '任选四-组选24': {
                this.getRandomNumberOfCombinationEntryUnits(numberOfUnits, 4, dontAdd)
            }
                break

            case '任选四-组选4': {
                for (let i = 0; i < numberOfUnits; i++) {
                    let myArray = this.config.getNumbersArray().concat()
                    for (let j = 0; j < 2; j++) {
                        let random = JXHelper.getRandomNumber(myArray.length - 1)
                        let num = myArray[random]
                        myArray.remove(num)
                        this.addNumberWithType(j, num)
                    }
                    if (!dontAdd)
                        this.addNumbersDicToArray()
                }
            }
                break

            case '任选四-组选12': {
                for (let i = 0; i < numberOfUnits; i++) {
                    let myArray = this.config.getNumbersArray().concat()
                    for (let j = 0; j < 2; j++) {
                        let random = JXHelper.getRandomNumber(myArray.length - 1)
                        let num = myArray[random]
                        myArray.remove(num)
                        this.addNumberWithType(j, num)
                        if (j == 1) {
                            let random2 = JXHelper.getRandomNumber(myArray.length - 1)
                            let num2 = myArray[random2]
                            this.addNumberWithType(j, num2)
                        }
                    }
                    if (!dontAdd)
                        this.addNumbersDicToArray()
                }
            }
                break

            case '龙虎-龙虎-万千':
            case '龙虎-龙虎-万百':
            case '龙虎-龙虎-万十':
            case '龙虎-龙虎-万个':
            case '龙虎-龙虎-千百':
            case '龙虎-龙虎-千十':
            case '龙虎-龙虎-千个':
            case '龙虎-龙虎-百十':
            case '龙虎-龙虎-百个':
            case '龙虎-龙虎-十个':
            case '龙虎-龙虎': {
                this.randomAddWith(numberOfUnits,dontAdd,this.config.longHu)
            }break
            case '顺子-前三球':
            case '顺子-中三球':
            case '顺子-后三球':{
                this.randomAddWith(numberOfUnits,dontAdd,this.config.shunZi)
            }break
            case '大小单双-万位':
            case '大小单双-千位':
            case '大小单双-百位':
            case '大小单双-十位':
            case '大小单双-个位':{
                this.randomAddWith(numberOfUnits,dontAdd,this.config.DXDS)
            }break
            case '大小单双-总和':{
                this.randomAddWith(numberOfUnits,dontAdd,this.config.DXDS)
            }break
            case '斗牛-斗牛': {
                this.randomAddWith(numberOfUnits,dontAdd,this.config.niuNiu)
            }break
        }
    }

    randomAddWith(numberOfUnits,dontAdd,values) {
        for (let i = 0; i < numberOfUnits; i++) {
            let index = _.random(values.length - 1)
            this.addNumberWithType(0, values[index])
            if (!dontAdd)
                this.addNumbersDicToArray()
        }
    }

    getRandomNumberOfSingleEntryUnits(numberOfUnitss, Digits, dontAdd, maxRandomNumber) {
        for (let i = 0; i < numberOfUnitss; i++) {
            for (let j = 0; j < Digits; j++) {
                let random = JXHelper.getRandomNumber(maxRandomNumber ? maxRandomNumber : 9)
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