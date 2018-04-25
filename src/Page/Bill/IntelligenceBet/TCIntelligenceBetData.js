/**
 * Created by Sam on 02/09/2017.
 * Copyright © 2017年 JX. All rights reserved.
 */

/**系统 npm类 */
import {observable, action} from 'mobx';
import * as _ from "lodash";
import * as Toast from "@remobile/react-native-toast/index";

/** 外部关系组件 如 页面跳转用 */

let instance = null;

class TCIntelligenceBetData {

    constructor(odds, price, units) {
        if (!instance) {
            instance = this;
        }
        instance.resetBaseData(odds, price, units);
        return instance;
    }

    resetBaseData(odds, price, units) {
        if (odds == 0) {
            instance.singleUnitsPrice = price;
            instance.allUnitsOnBet = units;
            instance.allAmountOnBet = price;
        } else {
            instance.data.odds = odds;
            instance.data.singlePrice = price;
        }

        instance.lastToAddIssueNumber = "10";//记录上一次追号期数
        instance.lowestRate = 30;//最低盈利率
        instance.lowestMoney = 30;//最低盈利元
        instance.outOfMultiplierOrAmoutIndex = false;//multiplier是否超过99999或者金额超过100w 标记
        instance.isListDataChanged = false;//用来判断 当前list data是否被修改了倍数
    }

    static getInstance() {
        return instance;
    }

    // @observable
    // isBetKeyboardHideByTopIssueInput=true; //智能追号页面标识 判断键盘是否因为顶部追号期数输入升起，如果升起就隐藏付款按钮

    //避免每次输入都会造成整个布局UI刷新
    expectedProfitArr = ['30', '5', '50', '20', '30'];
    @observable
    isShowLowest = false;//区分，true: 如果用户修改了具体某个期的倍数，则显示最低盈利率或者元
    @observable
    modalVisible = false;//是否显示model

    minWinUnits = 1;//当前订单 最低可中奖的注数
    minWinPrice = 1;//当前订单 最低获奖的金额
    maxWinUnits = 1;//当前订单 最高可中奖的注数
    maxWinPrice = 1; //当前订单 最高可中奖的注数
    pricePerUnit = 2;//每一注的价格

    @observable
    data = {
        listArray: [],
        odds: 0,//赔率
        singlePrice: 0,//一期的价格

        allAmount: 0,//总价

        winAndThenStop: true,


        limitType: 0,//约束类型
        lowestProfit: 30,//最低盈利%  外部只能追号 显示值

        firstExpectedProfit: true, //全程最低盈利率
        secondExpectedProfit: false,//前x期
        thirdExpectedProfit: false,//全程最低盈利元

        continueIssueNumber: '10',//连续追号期数
        startMultiple: '1',//起始倍数
        lowestProfitRate: '30',//全程最低盈利率
        topXIssueNumber: '5',//前x 期
        topXProfitRate: '50',//前x 期的盈利率%
        afterTopXProfitRate: '20', //之后的 盈利率%
        lowestProfitMoney: '30',//全程最低盈利元
    }

    @observable
    continueIssueNumberOnBet = '1'; //付款页 简单智能追号 期数
    @observable
    multiplierOnBet = '1'; //付款页 简单智能追号 倍数
    @observable
    isIssueNumberOnBet = false; //付款页 简单智能追号 焦点 issueNumber
    @observable
    isMultiplierOnBet = false; //付款页 简单智能追号 焦点 multiplier
    @observable
    allAmountOnBet = '1';// 付款页 简单智能追号 总价
    @observable
    allUnitsOnBet = '1'; //付款页 简单智能追号 总单数
    @observable
    singleUnitsPrice = 0; ////付款页 简单智能追号 总的一单的价格

    @action
    /**
     * 拼接正确的listArray
     * @param availableArray     拉取到的数组
     * @param rightData          正确的当前期号
     * @param toAddIssueNumber   追加期号
     * @param isChangeRate       最低盈利率是否变化了
     */
    checkAndChangeIssueArray(availableArray, rightData, toAddIssueNumber, isChangeRate) {
        instance.isShowLowest = false;
        let units = parseInt(toAddIssueNumber);
        if (instance.data.continueIssueNumber != toAddIssueNumber) {
            instance.data.continueIssueNumber = toAddIssueNumber.toString();
        }
        let rightPlanNo = parseInt(rightData.planNo);
        if (isChangeRate) {
            //生成方案按钮
            instance.resetExpectProfitData();
        }
        let len = availableArray.length;

        //找到开始投注的期号下标
        let startIndex = instance.findStartIndex(availableArray, rightData.uniqueIssueNumber, rightPlanNo.toString());
        //如果遍历后发现依然没有相同的,则先退出
        if (startIndex === len) {
            return;
        }

        let accumulative = instance.data.listArray[0].accumulative;
        //填充正确的期号 数组 先按一倍填充数据
        instance.setRightIssueNumArr(startIndex, units, availableArray, accumulative);
        //按最低盈利率计算倍数
        instance.resetArrayLowestRate();

        instance.data.continueIssueNumber = instance.data.listArray.length.toString();
        instance.isListDataChanged = false;
    }

    @action
    resetArrayLowestRate(isResetRate) {
        if (isResetRate) {
            instance.resetExpectProfitData();
            instance.resetListArray();
        }
        instance.outOfMultiplierOrAmoutIndex = false;

        instance.isShowLowest = false;
        let accumulative = 0;
        let len = instance.data.listArray.length;
        let lowestProfitRate = parseInt(instance.data.lowestProfitRate);
        //如果倍数超过99999或者累计投入金额大于1百万,那就丢弃剩下的期数，保证之前期数倍数小于等于99999，且满足最低盈利率
        let outOfMultiplierOrAmoutIndex = -1;
        for (let i = 0; i < len; i++) {
            let item = instance.data.listArray[i];
            if (instance.isNeedToIncreaseMultiple(item, lowestProfitRate, i)) {
                if (i > 0) {
                    accumulative = instance.data.listArray[i - 1].accumulative;
                }
                //第一注的最低盈利率与 倍数无关
                item.multiplier = Math.ceil(instance.getCloseMultiplier(accumulative, lowestProfitRate, i));
                instance.calItemInfo(item,accumulative);
                // JXLog("hehehe d profit : " + item.profitRate + " acc : " + item.accumulative + " i " + i + " mul :" + item.multiplier + " rate : " + item.profitRate);
                if (item.multiplier > 99999 || item.accumulative > 1000000 || item.multiplier <= 0) {
                    outOfMultiplierOrAmoutIndex = i;
                    instance.outOfMultiplierOrAmoutIndex = true;
                    break;
                }
            }
        }

        if (instance.outOfMultiplierOrAmoutIndex) {
            //删除之后的期号数 item
            instance.data.listArray.splice(outOfMultiplierOrAmoutIndex, len - outOfMultiplierOrAmoutIndex);
        }

        if (instance.data.listArray.length > 0) {
            instance.data.allAmount = instance.data.listArray[instance.data.listArray.length - 1].accumulative
        } else {
            instance.data.allAmount = 0;
        }
        instance.data.continueIssueNumber = instance.data.listArray.length.toString();
        instance.isListDataChanged = false;
    }

    /**
     * 计算最近的倍率
     * @param oldAccumulative
     * @param lowestProfitRate
     * @param index
     * @returns {*}
     */
    getCloseMultiplier(oldAccumulative, lowestProfitRate, index) {
        if (instance.data.firstExpectedProfit) {
            return (lowestProfitRate + 100).accMul(oldAccumulative).accDiv(instance.maxWinPrice * 100 * instance.data.odds - 100 * instance.data.singlePrice - lowestProfitRate * instance.data.singlePrice);
        } else if (instance.data.thirdExpectedProfit) {
            return (parseInt(instance.data.lowestProfitMoney) + oldAccumulative).accDiv(instance.maxWinPrice * instance.data.odds - instance.data.singlePrice);
        } else {
            if (index <= parseInt(instance.data.topXIssueNumber)) {
                lowestProfitRate=parseInt(instance.data.topXProfitRate);
                return (lowestProfitRate + 100).accMul(oldAccumulative).accDiv(instance.maxWinPrice * 100 * instance.data.odds - 100 * instance.data.singlePrice - lowestProfitRate * instance.data.singlePrice);
            } else {
                lowestProfitRate=parseInt(instance.data.afterTopXProfitRate);
                return (lowestProfitRate + 100).accMul(oldAccumulative).accDiv(instance.maxWinPrice * 100 * instance.data.odds - 100 * instance.data.singlePrice - lowestProfitRate * instance.data.singlePrice);
            }
        }
    }

    /**
     * 根据不同方案计算 是否达到最低标准
     * @param item
     * @param lowestRate
     * @param index
     * @returns {boolean}
     */
    isNeedToIncreaseMultiple(item, lowestProfitRate, index) {
        if (instance.data.firstExpectedProfit) {
            //方案一
            return item.maxProfitRate < lowestProfitRate;
        } else if (instance.data.secondExpectedProfit) {
            //方案二
            if (index <= parseInt(instance.data.topXIssueNumber)) {
                return item.maxProfitRate < parseInt(instance.data.topXProfitRate);
            } else {
                return item.maxProfitRate < parseInt(instance.data.afterTopXProfitRate);
            }
        } else {
            //方案三
            return item.maxProfit < parseInt(instance.data.lowestProfitMoney);
        }
    }

    /**
     * 找到对应的开始期号下标
     * @param availableArray
     * @param intCurIssueNumber
     * @returns {number}
     */
    findStartIndex(availableArray, curIssueNumber, rightPlanNo) {
        let startIndex = 0;
        let len = availableArray.length;
        let result = false;
        let intCurIssueNumber = parseInt(curIssueNumber);
        for (startIndex; startIndex < len; startIndex++) {
            let itemIssueNumber = parseInt(availableArray[startIndex].uniqueIssueNumber);
            // JXLog("hehehe itemIssue " + availableArray[startIndex].uniqueIssueNumber + " curIssueNumber " + curIssueNumber);

            if (intCurIssueNumber === itemIssueNumber) {
                result = true;
            }
            if (startIndex < len - 1 && intCurIssueNumber > itemIssueNumber && intCurIssueNumber < parseInt(availableArray[startIndex + 1].uniqueIssueNumber)) {
                result = true;
            }

            if (result) {
                let item = null;
                if (instance.data.listArray.length > 0) {
                    item = instance.data.listArray[0];
                    item.multiplier = parseInt(instance.data.startMultiple);
                    item.serialNumber = 1;
                    item.issueNum = curIssueNumber.toString();
                    item.planNo = rightPlanNo;
                } else {
                    item = instance.generateNewArrayItem(curIssueNumber,rightPlanNo,1);
                }
                instance.calItemInfo(item,0);
                // JXLog("hehehe d cost : " + item.cost + " acc : " + item.accumulative + " i " + startIndex + " mul :" + item.multiplier + " rate : " + item.profitRate);

                if (instance.data.listArray.length === 0) {
                    instance.data.listArray.push(item);
                }
                break;
            }

        }
        return startIndex;
    }

    /**
     * 生成新的item对象
     * @returns {{serialNumber: number, issueNum: string, planNo: *, multiplier: Number, accumulative: number, profit: number, profitRate: number, cost: number, maxProfit: number, maxProfitRate: number}}
     */
    generateNewArrayItem(issueNumber, planNo,serialNumber) {
        return {
            serialNumber: serialNumber,//序号
            issueNum: issueNumber.toString(),//期号
            planNo: planNo.toString(),
            multiplier: parseInt(instance.data.startMultiple),//倍数
            accumulative: 0,//累计投入
            profit: 1,//最低中奖注数盈利
            profitRate: 0,//最低中奖注数盈利率
            cost: 0,
            maxProfit: 1,//最高中奖注数盈利
            maxProfitRate: 0//最高中奖注数盈利率
        };
    }

    /**
     * 计算Item profit profitRate等信息
     * @param item
     * @param accumulative
     * @param isAdjustArray
     */
    calItemInfo(item,accumulative,isAdjustArray){
        if(!isAdjustArray) {
            item.cost = item.multiplier.accMul(instance.data.singlePrice);
            item.accumulative = item.cost.accAdd(accumulative);
        }
        item.profit = (instance.data.odds.accMul(item.multiplier).accMul(instance.minWinPrice).accSub(item.accumulative));
        item.profitRate = Math.floor((item.profit / item.accumulative) * 100);
        if (instance.minWinUnits === instance.maxWinUnits) {
            item.maxProfit = item.profit;
            item.maxProfitRate = item.profitRate;
        } else {
            item.maxProfit = (instance.data.odds.accMul(item.multiplier).accMul(instance.maxWinPrice).accSub(item.accumulative));
            item.maxProfitRate = Math.floor((item.maxProfit / item.accumulative) * 100);
        }


    }

    /**
     * 只填充正确的期号和序号
     * @param startIndex
     * @param units
     * @param availableArray
     * @param accumulative
     */
    setRightIssueNumArr(startIndex, units, availableArray, accumulative) {
        let len = availableArray.length;
        for (let i = startIndex + 1, j = 2; j < units + 1 && i < len; i++, j++) {
            let issueNumber = availableArray[i].uniqueIssueNumber;
            let planNo = availableArray[i].planNo;
            let item = null;
            if (instance.data.listArray.length > j - 1) {
                item = instance.data.listArray[j - 1];
                item.multiplier = parseInt(instance.data.startMultiple);
                item.serialNumber = j;
                item.issueNum = issueNumber.toString();
                item.planNo = planNo.toString();
            } else {
                item = instance.generateNewArrayItem(issueNumber,planNo,j);
            }
            instance.calItemInfo(item,accumulative);

            accumulative = item.accumulative;

            if (instance.data.listArray.length <= j - 1) {
                instance.data.listArray.push(item);
            }
        }
        if (instance.data.listArray.length > units) {
            // 删除多余的数据 --复用这个listArray
            instance.data.listArray.splice(units, instance.data.listArray.length - units);
        }
    }

    /**
     * 重新设置倍数 为1
     */
    resetListArray() {
        if (instance.data.listArray.length === 0) {
            return;
        }
        let accumulative = 0;
        for (let i = 0, len = instance.data.listArray.length; i < len; i++) {
            let item = instance.data.listArray[i];
            item.multiplier = 1;
            item.cost = item.multiplier.accMul(instance.data.singlePrice);
            item.accumulative = item.cost.accAdd(accumulative);
            accumulative = item.accumulative;
            item.profit = (instance.data.odds.accMul(item.multiplier).accMul(instance.minWinPrice).accSub(item.accumulative));
            item.profitRate = parseInt((item.profit / item.accumulative) * 100);
        }
    }

    /**
     *手动修改面板倍数值，相应数据跟着变化
     * @param index  整型
     * @param multiple 整型   -1表示点击了- + 图案
     * @return multiplier  修改倍数后的数值
     */
    @action
    adjustArrayData(index, multiple, isAdd) {
        if (index < 0 || instance.data.listArray.length === 0 || index >= instance.data.listArray.length) {
            return -1;
        }
        if (multiple === -1) {
            if (!isAdd && instance.data.listArray[index].multiplier == 1) {
                return 1;
            }
            if (isAdd && instance.data.listArray[index].multiplier == 99999) {
                return 99999;
            }
        }
        if (multiple == instance.data.listArray[index].multiplier) {
            return multiple;
        }

        instance.isListDataChanged = true;//简单判断 是被修改了
        let accumulative = 0;
        if (index > 0) {
            accumulative = instance.data.listArray[index - 1].accumulative;
        }

        for (let i = index,len=instance.data.listArray.length; i < len; i++) {
            let item = instance.data.listArray[i];
            if (i === index) {
                if (multiple === -1) {
                    isAdd ? item.multiplier++ : item.multiplier--;
                } else {
                    item.multiplier = parseInt(multiple);
                }
                item.cost = item.multiplier.accMul(instance.data.singlePrice);
                item.accumulative = item.cost.accAdd(accumulative);
                accumulative = item.accumulative;
            } else {
                item.accumulative = item.cost.accAdd(accumulative);
                accumulative = item.accumulative;
            }
            instance.calItemInfo(item,accumulative,true);
        }

        instance.findLowestProfitAndRate();
        return instance.data.listArray[index].multiplier;
    }

    /**
     * 找最低盈利率值
     */
    findLowestProfitAndRate(){
        let lowestRate = 0;
        let lowestMoney = 0;
        let len = instance.data.listArray.length;
        //找到最低盈利率 元 不能从0开始，这样是所有view都在render
        for (let i = 0; i < len; i++) {
            let item = instance.data.listArray[i];

            if (i === 0) {
                lowestRate = item.profitRate;
                lowestMoney = item.profit;
            }
            if (lowestMoney > item.profit) {
                lowestMoney = item.profit;
            }
            if (lowestRate > item.profitRate) {
                lowestRate = item.profitRate;
            }
        }

        //记录最低盈利率 和 元
        instance.lowestMoney = lowestMoney;
        instance.lowestRate = lowestRate;

        instance.isShowLowest = true;
        instance.data.allAmount = instance.data.listArray[instance.data.listArray.length - 1].accumulative;
    }

    setWinAndThenStop(isStop) {
        instance.data.winAndThenStop = isStop;
    }


    @action
    changeRadioState(selectedNumber) {
        switch (selectedNumber) {
            case 1: {
                //全程最低盈利率
                instance.data.firstExpectedProfit = true;
                instance.data.secondExpectedProfit = false;
                instance.data.thirdExpectedProfit = false;
            }
                break;
            case 2: {
                //前x期
                instance.data.firstExpectedProfit = false;
                instance.data.secondExpectedProfit = true;
                instance.data.thirdExpectedProfit = false;
            }
                break;
            case 3: {
                //全程最低盈利x元
                instance.data.firstExpectedProfit = false;
                instance.data.secondExpectedProfit = false;
                instance.data.thirdExpectedProfit = true;
            }
                break;
        }
    }

    /**
     * 生成方案 按钮
     */
    @action
    resetExpectProfitData() {
        if (instance.data.firstExpectedProfit) {

            instance.data.lowestProfitRate = instance.expectedProfitArr[0];
            instance.data.lowestProfit = instance.expectedProfitArr[0];
        } else if (instance.data.secondExpectedProfit) {
            instance.data.topXIssueNumber = instance.expectedProfitArr[1];
            instance.data.topXProfitRate = instance.expectedProfitArr[2];
            instance.data.afterTopXProfitRate = instance.expectedProfitArr[3];
        } else {
            instance.data.lowestProfitMoney = instance.expectedProfitArr[4];
        }

    }

    /**
     * 对三种盈利率方案中选择的方案 检测是否输入有误
     * @returns {boolean}
     */
    checkExpectProfitInputIsCorrect() {
        if (instance.data.firstExpectedProfit) {
            if (instance.expectedProfitArr[0] == '') {
                return false;
            }
        } else if (instance.data.secondExpectedProfit) {
            if (instance.expectedProfitArr[1] == '') {
                return false;
            }
            if (instance.expectedProfitArr[2] == '') {
                return false
            }
            if (instance.expectedProfitArr[3] == '') {
                return false
            }
        } else {
            if (instance.expectedProfitArr[4] == '') {
                return false;
            }
        }

        return true;
    }

    checkRate() {
        if (instance.data.firstExpectedProfit) {
            if (parseInt(instance.expectedProfitArr[0]) > instance.maxRate) {
                return false;
            }
        } else if (instance.data.secondExpectedProfit) {
            if (parseInt(instance.expectedProfitArr[2]) > instance.maxRate) {
                return false;
            }
            if (parseInt(instance.expectedProfitArr[3]) > instance.maxRate) {
                return false;
            }
        }
        return true;
    }

    setExpectedProfitArr(number, index) {
        instance.expectedProfitArr[index] = number;
    }

    setModalVisible(visible) {
        if (visible) {
            instance._data = _.cloneDeep(instance.data);
        }
        instance.modalVisible = visible;
    }

    @action
    calContinueIssueNumber(isAdd) {
        let number = _.cloneDeep(instance.data.continueIssueNumber);
        let tmpNumber = parseInt(number);

        if (isAdd) {
            if (tmpNumber === 99) {
                return;
            }
            instance.data.continueIssueNumber = (tmpNumber + 1).toString();
        } else {
            if (tmpNumber === 1) {
                return;
            }
            instance.data.continueIssueNumber = (tmpNumber - 1).toString();
        }
    }

    @action
    calStartMultiple(isAdd) {
        let multiple = _.cloneDeep(instance.data.startMultiple);
        let tmpMul = parseInt(multiple);

        if (isAdd) {
            if (tmpMul === 99999) {
                return;
            }
            instance.data.startMultiple = (tmpMul + 1).toString();
        } else {
            if (tmpMul === 1) {
                return;
            }
            instance.data.startMultiple = (tmpMul - 1).toString();
        }
    }

    setToAddIssueNumber(number) {
        instance.data.continueIssueNumber = number;
    }

    setStartMultiple(multiple) {
        instance.data.startMultiple = multiple;
    }

    @action
    resetData() {
        //取消操作还原为上次数据
        instance.data.continueIssueNumber = instance._data.continueIssueNumber;
        instance.data.startMultiple = instance._data.startMultiple;
        instance.data.firstExpectedProfit = instance._data.firstExpectedProfit;
        instance.data.secondExpectedProfit = instance._data.secondExpectedProfit;
        instance.data.thirdExpectedProfit = instance._data.thirdExpectedProfit;

    }

    @action
    setBetMulAndIssueNumberFalse() {
        instance.isMultiplierOnBet = false;
        instance.isIssueNumberOnBet = false;
    }

    @action
    setSelectedIndex(selectedKey) {
        if (instance.isMultiplierOnBet) {
            instance.setMultiplierOnBet(selectedKey);
        }
        if (instance.isIssueNumberOnBet) {
            instance.setContinueIssueNumber(selectedKey);
        }
    }

    @action
    setAllUnitsOnBet(allUnits, singlePrice) {
        if (instance.allUnitsOnBet != allUnits || instance.singleUnitsPrice != singlePrice) {
            instance.allUnitsOnBet = allUnits;
            instance.singleUnitsPrice = singlePrice;
            instance.allAmountOnBet = parseFloat(instance.singleUnitsPrice).accMul(parseInt(instance.continueIssueNumberOnBet)).accMul(parseInt(instance.multiplierOnBet));
        }
    }

    @action
    setContinueIssueNumber(number) {

        if (number != instance.continueIssueNumberOnBet) {
            instance.continueIssueNumberOnBet = number;
            instance.allAmountOnBet = parseFloat(instance.singleUnitsPrice).accMul(parseInt(instance.continueIssueNumberOnBet)).accMul(parseInt(instance.multiplierOnBet));
            // JXLog("hehehe allAmountonBet : " + instance.allAmountOnBet);

        }
    }

    @action
    setMultiplierOnBet(multiplier) {

        if (multiplier != instance.multiplierOnBet) {
            instance.multiplierOnBet = multiplier;
            instance.allAmountOnBet = parseFloat(instance.singleUnitsPrice).accMul(parseInt(instance.continueIssueNumberOnBet)).accMul(parseInt(instance.multiplierOnBet));

        }
    }

    @action
    setIsContinueIssueNumberTrue() {
        instance.isIssueNumberOnBet = true;
        instance.isMultiplierOnBet = false
    }

    @action
    setIsMultiplierTrue() {
        instance.isMultiplierOnBet = true;
        instance.isIssueNumberOnBet = false
    }

    getChildOrder() {
        let childOrder = {};
        let eachChildOrders = []
        childOrder.stopAfterWin = instance.data.winAndThenStop;
        childOrder.eachChildOrders = eachChildOrders;
        for (let i = 0, len = instance.data.listArray.length; i < len; i++) {
            let item = instance.data.listArray[i];
            let addItem = {};
            addItem.issueNum = item.issueNum;
            addItem.multiplier = item.multiplier;
            eachChildOrders.push(addItem);
            if (addItem.multiplier == '' || addItem.multiplier === 0) {
                return false;
            }
        }
        return childOrder;
    }

    getBetChildOrder(issueNumber, availableArray) {
        let childOrder = {};
        let eachChildOrders = [];
        childOrder.stopAfterWin = instance.data.winAndThenStop;
        childOrder.eachChildOrders = eachChildOrders;
        for (let i = 0, len = availableArray.length; i < parseInt(issueNumber) && i < len; i++) {
            let addItem = {};
            // JXLog("hehehe issueNumber " + availableArray[i].uniqueIssueNumber);
            addItem.issueNum = availableArray[i].uniqueIssueNumber;
            addItem.multiplier = instance.multiplierOnBet;
            eachChildOrders.push(addItem);
            if (addItem.multiplier == '' || addItem.multiplier === 0) {
                return false;
            }
        }
        return childOrder;
    }

    setMinMaxWinUnitsAndPricePerUnit(minWinUnits, pricePerUnit, maxWinUnit) {
        if (maxWinUnit < minWinUnits) {
            //不存在 或则还没增加相应玩法的maxWinUnit计算，
            maxWinUnit = minWinUnits;
        }
        instance.maxWinUnits = maxWinUnit;
        instance.minWinUnits = minWinUnits;
        instance.pricePerUnit = pricePerUnit;
        instance.maxWinPrice = instance.maxWinUnits * instance.pricePerUnit;
        instance.minWinPrice = instance.minWinUnits * instance.pricePerUnit;
    }

    @action
    setDataOddsAndSinglePrice(odds, price) {
        instance.data.odds = odds;
        instance.data.singlePrice = price;
        instance.maxRate = Math.round(parseFloat(instance.data.odds - 1) * 100);
    }

    clearInstance() {
        instance = null;
    }

    getListItemMultiplierWithIndexkey(indexKey) {
        if (indexKey < 0 || instance.data.listArray !== null || indexKey > instance.data.listArray.length >= indexKey) {
            return -1;
        }
        return instance.data.listArray[indexKey].multiplier;
    }

}

export default TCIntelligenceBetData
