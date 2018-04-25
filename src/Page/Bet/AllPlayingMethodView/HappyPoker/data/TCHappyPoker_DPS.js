import _ from 'lodash';
import  * as PlayMathConfig from '../../../../../Data/JXPlayMathConfig'

var JXHelper = require('../../../../../Common/JXHelper/JXHelper')

let instance = null

let config = {

    baoxuanNumbersArray: ['对子包选', '豹子包选', '同花包选', '顺子包选', '同花顺包选',],
    tonghuaNumbersArray: ['黑桃', '红心', '梅花', '方块',],
    shunziNumbersArray: ['A23', '234', '345', '456', '567', '678', '789', '8910', '910J', '10JQ', 'JQK', 'QKA',],
    tonghuashunNumbersArray: ['黑桃顺子', '红心顺子', '梅花顺子', '方块顺子',],
    baoziNumbersArray: ['AAA', '222', '333', '444', '555', '666', '777', '888', '999', '101010', 'JJJ', 'QQQ', 'KKK'],
    duiziNumbersArray: ['AA', '22', '33', '44', '55', '66', '77', '88', '99', '1010', 'JJ', 'QQ', 'KK'],
    singleNumbersArray: ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'],

    PlayType: ['包选', '同花单选', '顺子单选', '同花顺单选', '豹子单选', '对子单选', '任选一', '任选二', '任选三', '任选四', '任选五', '任选六'],


    getPlayMathNameWithIndex(index){
        return this.PlayType[index];
    },

    getBaoxuanNumbers(){
        return this.baoxuanNumbersArray;
    },

    getTonghuaNumbers(){
        return this.tonghuaNumbersArray;
    },

    getShunziNumbers(){
        return this.shunziNumbersArray;
    },

    getTonghuashunNumbers(){
        return this.tonghuashunNumbersArray;
    },

    getBaoziNumbers(){
        return this.baoziNumbersArray;
    },

    getDuiziNumbers(){
        return this.duiziNumbersArray;
    },

    getSingleNumbers(){
        return this.singleNumbersArray
    }
}

//  选注未添加
let numbers = [];

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

export default class HappyPokerDPS {
    // 构造
    constructor() {
        if (!instance) {
            instance = this
            this.config = config
        }
        return instance;
    }

    resetPlayMath(mathType) {
        numbers = []
        numberOfUnits = 0
        amount = 0
        myMathType = mathType
        myMathTypeID = PlayMathConfig.getGameMathKeyWithTitle(myMathType, 'HF_LFKLPK')
    }

    getmyMathTypeID() {
        return myMathTypeID
    }

    getmyMathType() {
        return myMathType
    }

    resetPlayGameUniqueId(uniqueId) {
        gameUniqueId = uniqueId
    }

    getAllJSon() {
        let str = '';
        let currentArray = this.getMathTypeArray();
        let tempNumbers = _.cloneDeep(numbers);
        let numbersCount = tempNumbers.length;
        for(let j = 0; j < currentArray.length; j++) {
            for (let i = 0; i < numbersCount; i++) {
                if (currentArray[j] == tempNumbers[i]) {
                    str = str + tempNumbers[i] + ' ';
                    numbersCount--;
                    tempNumbers.remove(currentArray[j]);
                    break;
                }
            }

            if (numbersCount <= 0) {
                break;
            }
        }

        str = _.trim(str);
        return str
    }

    getMathTypeArray(){
        let currentArray = [];
        switch (myMathType) {
            case '包选':
                currentArray = this.config.getBaoxuanNumbers();
                break;
            case '同花单选':
                currentArray = this.config.getTonghuaNumbers();
                break;
            case '顺子单选':
                currentArray = this.config.getShunziNumbers();
                break;
            case '同花顺单选':
                currentArray = this.config.getTonghuashunNumbers();
                break;
            case '豹子单选':
                currentArray = this.config.getBaoziNumbers();
                break;
            case '对子单选':
                currentArray = this.config.getDuiziNumbers();
                break;
            case '任选一':
            case '任选二':
            case '任选三':
            case '任选四':
            case '任选五':
            case '任选六':
                currentArray = this.config.getSingleNumbers();
                break;
        }

        return currentArray;
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
        numbers = [];
    }

    deleteOneItemWithJsonIndex(index) {
        totalAmount=parseFloat(totalAmount.accSub(numbersArray[index].amount))
        totalBetNumber -= numbersArray[index].numberOfUnits
        numbersArray.splice(index, 1)
    }

    addNumberWithType(args,number) {
        let numbersArr = numbers;
        numbersArr.push(number)
    }

    removeNumberWithType(args,number) {
        let numbersArr = numbers;
        numbersArr.remove(number)
    }

    //加注
    addNumbersDicToArray(odds, price, rebates) {
        if (!this.checkNumbers(myMathType)) return false
        if (numbers) {
            let aStr = this.getAllJSon()
            let json = {}
            if (aStr.length > 0) {
                json.betString = aStr
                json.gameplayMethod = PlayMathConfig.getGameMathKeyWithTitle(myMathType, 'HF_LFKLPK')
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
    getWillAddNumbers() {
        return numbers
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
        if (this.getNumberOfUnits(playMath) > 0) {
            return true
        }
        return false
    }


    //计算当前号码池 注单数
    getNumberOfUnits() {
        let count = numbers.length;
        switch (myMathType) {
            case '包选':
            case '同花单选':
            case '顺子单选':
            case '同花顺单选':
            case '豹子单选':
            case '对子单选':
            case '任选一': {
                numberOfUnits = count
            }
                break
            case '任选二':
                if (count > 1) {
                    numberOfUnits = JXHelper.getCombinatorialNumber(count, 2);
                } else {
                    numberOfUnits = 0;
                }
                break
            case '任选三':
                if (count > 2) {
                    numberOfUnits = JXHelper.getCombinatorialNumber(count, 3);
                } else {
                    numberOfUnits = 0;
                }
                break
            case '任选四':
                if (count > 3) {
                    numberOfUnits = JXHelper.getCombinatorialNumber(count, 4);
                } else {
                    numberOfUnits = 0;
                }
                break
            case '任选五':
                if (count > 4) {
                    numberOfUnits = JXHelper.getCombinatorialNumber(count, 5);
                } else {
                    numberOfUnits = 0;
                }
                break
            case '任选六':
                if (count > 5) {
                    numberOfUnits = JXHelper.getCombinatorialNumber(count, 6);
                } else {
                    numberOfUnits = 0;
                }
                break
        }

        return numberOfUnits;
    }


    //机选 添加注数
    randomSelect(numberOfUnits, dontAdd) {
        this.clearCurrentSelectData()

        let myArray = this.getMathTypeArray();
        let selectAccount = 1;
        switch (myMathType) {
            case '包选':
                break
            case '同花单选':
                break
            case '顺子单选':
                break
            case '同花顺单选':
                break
            case '豹子单选':
                break
            case '对子单选':
                break
            case '任选一':
                break
            case '任选二':
                selectAccount = 2;
                break
            case '任选三':
                selectAccount = 3;
                break
            case '任选四':
                selectAccount = 4;
                break
            case '任选五':
                selectAccount = 5;
                break
            case '任选六':
                selectAccount = 6;
        }
        this.getRandomNumberOfSingleEntryUnits(myArray, numberOfUnits, selectAccount, dontAdd)
    }

    getRandomNumberOfSingleEntryUnits(myArray, numberOfUnits, Digits, dontAdd) {
        for (let i = 0; i < numberOfUnits; i++) {
            let array = _.cloneDeep(myArray);
            for (let j = 0; j < Digits; j++) {
                let random = JXHelper.getRandomNumber(array.length - 1)
                let num = array[random]
                array.remove(num)
                this.addNumberWithType('',num)
            }
            if (!dontAdd)
                this.addNumbersDicToArray()
        }
    }

    _getRandomNumber() {
        this.randomSelect(1, true)
        let tempNumDic = _.cloneDeep(numbers)
        numbers = []
        return tempNumDic
    }
}

