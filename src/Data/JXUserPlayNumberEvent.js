/**
 * Created by Sam on 16/08/2017.
 * Copyright © 2017年 JX. All rights reserved.
 */

/**系统 npm类 */
import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter'

import {observable, action} from 'mobx';
import {getNumWithAnimal} from "../Page/Bet/AllPlayingMethodView/MarkSix/data/MarkSixNum2AnimalHelper";

/** 外部关系组件 如 页面跳转用 */

class JXUserPlayNumberEvent {

    constructor(dps) {
        this.SingletonDPS = dps
    }

    @observable
    str = {
        numberStr: '',
        units: 0,
        price: 0,
        alreadyAdd: this.SingletonDPS.getAddedBetArr().length
    }

    @action
    userNumberCall = (areaIndex, number, isAdd) => {
        // JXLog('hehehe' + 'areaIndex = ' + areaIndex + ' ' + ' number= ' + number + ' isAdd = ' + isAdd)
        // JXLog('hehehe' + 'typename' + this.SingletonDPS.getPlayTypeName());
        if (isAdd) {
            this.SingletonDPS.addToUnAddedNumbersByIndex(areaIndex, number)
        } else {
            this.SingletonDPS.removeUnAddedNumberByIndex(areaIndex, number)
        }

        let string = this.SingletonDPS.getAllUnAddedNumbersJson()
        let units = this.SingletonDPS.calUnAddedNumberOfUnits()
        let alreadyAdd = this.SingletonDPS.getAddedBetArr().length

        // JXLog('hehehe' + 'string = ' + string + ' ' + ' units= ' + units + ' alreadyAdd = ' + alreadyAdd)

        this.str.alreadyAdd = alreadyAdd
        this.str.units = units
        this.str.price = units * 2
        this.str.numberStr = string
    }

    @action
    userNumberCallBackRefresh = () => {
        let string = this.SingletonDPS.getAllUnAddedNumbersJson();
        let units = this.SingletonDPS.calUnAddedNumberOfUnits();
        let alreadyAdd = this.SingletonDPS.getAddedBetArr().length;
        this.str.alreadyAdd = alreadyAdd;
        this.str.units = units;
        this.str.price = units * 2;
        this.str.numberStr = string;
    }



    qdxdsqPressCallBack = (areaIndex, type, isCancel,shengXiao) => {
        let qdxdsqArr = this.SingletonDPS.addQDXDSQToUnAddedArr(type, areaIndex);
        if (type === '清') {
            RCTDeviceEventEmitter.emit('qdxds_NumberCall_clear', areaIndex);
            this.SingletonDPS.resetUnAddedSelectedNumbersWithIndex(areaIndex);
        } else {
            //如果是添加，则先清空当前选择的面板 和mathController的数据
            if (!isCancel) {
                RCTDeviceEventEmitter.emit('qdxds_NumberCall_clear', areaIndex);
                this.SingletonDPS.resetUnAddedSelectedNumbersWithIndex(areaIndex);
            }
            if(type=="生肖"){
                if(shengXiao){
                    let dataList=shengXiao.split(",")
                    let resultStr ="";
                    for (let item of dataList){
                        resultStr+=getNumWithAnimal(item)+",";
                    }
                    resultStr = resultStr ? resultStr:""
                    qdxdsqArr = resultStr.split(",");
                }
            }else{

            }
            for (let i = 0, len = qdxdsqArr.length; i < len; i++) {
                let num = qdxdsqArr[i];
                RCTDeviceEventEmitter.emit('randomSelectedNumber', areaIndex, num, true, isCancel);
                if (isCancel) {
                    this.SingletonDPS.removeUnAddedNumberByIndex(areaIndex, num);
                } else {
                    this.SingletonDPS.addToUnAddedNumbersByIndex(areaIndex, num);
                }
            }

        }

        this.userNumberCallBackRefresh();
    }

    @action
    resetStrData() {
        this.str.numberStr = '';
        this.str.units = '';
        this.str.price = '';
    }

    @action
    refreshBottomData() {
        let str = this.SingletonDPS.getAllUnAddedNumbersJson()
        let count = this.SingletonDPS.calUnAddedNumberOfUnits()
        let price = count * this.SingletonDPS.getPerUnitPrice();
        this.str.numberStr = str;
        this.str.units = count;
        this.str.price = price;
    }

    @action
    markSixUserNumberCall = (areaIndex, number, isAdd) => {
        if (isAdd) {
            this.SingletonDPS.addToUnAddedNumbersByIndex(areaIndex, number)
        } else {
            this.SingletonDPS.removeUnAddedNumberByIndex(areaIndex, number)
        }

        let type = this.SingletonDPS.getPlayTypeId();

        if (this.SingletonDPS.getPlayTypeName().indexOf('合肖') >= 0) {
            RCTDeviceEventEmitter.emit('TCMarkSixSelectView_numberSelected');
        }

        if (isAdd) {
            let length = 200;
            // if (type === 'GRPX') {
            //     length = 12
            // } else
            if (type === 'NB5' || type === 'NB6' || type === 'NB7') {
                length = 10
            } else if (type === 'NB8') {
                length = 11
            } else if (type === 'NB9') {
                length = 12
            } else if (type === 'NB10' || type === 'NB11') {
                length = 13
            } else if (type === 'NB12') {
                length = 14
            } else if (type === 'LM3Z2' || type === 'LMTC' || type === 'LM2QZ' || type === 'LM2ZT' || type === 'LM3QZ' || type === 'LM4QZ') {
                length = 10
            }
            let array = this.SingletonDPS.getUnAddedArrByIndex(0)
            if (array.length > length) {
                let deleteNum = array[0] == number ? array[1] : array[0];
                this.SingletonDPS.removeUnAddedNumberByIndex(0, deleteNum);
                RCTDeviceEventEmitter.emit('randomSelectedNumber_unselected', 0, deleteNum);

            }
        }

        this.userNumberCallBackRefresh();
    }

    @action
    pcddUserNumberCall = (areaIndex, number, isAdd) => {
        if (isAdd) {
            this.SingletonDPS.addToUnAddedNumbersByIndex(areaIndex, number)
        } else {
            this.SingletonDPS.removeUnAddedNumberByIndex(areaIndex, number)
        }
        if (this.SingletonDPS.getPlayTypeId() == 'SP3' && isAdd) {
            let array = this.SingletonDPS.getUnAddedArrByIndex(0);
            if (array.length > 3) {
                let deleteNum = array[0] == number ? array[1] : array[0];
                this.SingletonDPS.removeUnAddedNumberByIndex(0, deleteNum);
                RCTDeviceEventEmitter.emit('randomSelectedNumber_unselected', 0, deleteNum);

            }
        }
        this.userNumberCallBackRefresh();
    }

    @action
    onChangeText = (number) => {

        this.SingletonDPS.dsManager.addToUnAddedDSNumbersByNumberStr(number)
        let string = this.SingletonDPS.dsManager.getDSUnAddedNumbersJson()
        let units = this.SingletonDPS.getUnAddedDSUnits();
        let alreadyAdd = this.SingletonDPS.getAddedBetArr().length

        this.str.alreadyAdd = alreadyAdd
        this.str.units = units
        this.str.price = units * 2
        this.str.numberStr = string
    }
}

export default JXUserPlayNumberEvent
