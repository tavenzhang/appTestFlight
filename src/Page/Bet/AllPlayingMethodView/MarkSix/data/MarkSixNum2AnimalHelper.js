import Moment from 'moment'
import * as _ from "lodash";

/**
 * @author jason on 2017/11/23.
 */

const TEN_YEAR_CONFIG = {

    '2017': {
        'endTime': 127,
        'old': '猴',
        'new': '鸡',
    },
    '2018': {
        'endTime': 215,
        'old': '鸡',
        'new': '狗',
    },
    '2019': {
        'endTime': 204,
        'old': '狗',
        'new': '猪',
    },
    '2020': {
        'endTime': 124,
        'old': '猪',
        'new': '鼠',
    },
    '2021': {
        'endTime': 211,
        'old': '鼠',
        'new': '牛',
    },
    '2022': {
        'endTime': 131,
        'old': '牛',
        'new': '虎',
    },
    '2023': {
        'endTime': 121,
        'old': '虎',
        'new': '兔',
    },
    '2024': {
        'endTime': 209,
        'old': '兔',
        'new': '龙',
    },
    '2025': {
        'endTime': 128,
        'old': '龙',
        'new': '蛇',
    },
    '2026': {
        'endTime': 216,
        'old': '蛇',
        'new': '马',
    },
    '2027': {
        'endTime': 205,
        'old': '马',
        'new': '羊',
    },

};

const DEFAULT_ANIMAL_ORDER = ['鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊', '猴', '鸡', '狗', '猪'];

const DEFAULT_ANIMAL2NUM_ORDER = {
    '鼠': 0,
    '牛': 1,
    '虎': 2,
    '兔': 3,
    '龙': 4,
    '蛇': 5,
    '马': 6,
    '羊': 7,
    '猴': 8,
    '鸡': 9,
    '狗': 10,
    '猪': 11
};

let RIGHT_ORDER = [];

let LAST_YEAR_ANIMAL_ORDER = [];//去年生肖顺序
let NOW_YEAR_ANIMAL_ORDER = [];//今年生肖顺序
const NOW_YEAR = Moment().format('YYYY')
let ANIMAL_SORT = []

/**
 * 根据开奖日期得到正确对应的号码与生肖 单个号码
 * @param time 开奖日期  unix 时间戳 stopOrderTimeEpoch 传这个字段就好
 * @param openCode 开奖号码 01-49
 * @return results 对应开奖号码的生肖  false : 参数有问题，无法转换
 */
export function getAnimalWithOpenCode(time, openCode) {
    if (_.isEmpty(openCode + '')) {
        return false;
    }
    let code = parseInt(openCode);
    if (code < 0 || code > 49) {
        return false;
    }
    let date = Moment.unix(time).format('YYYY-MM-DD');
    let dateArr = date.split('-');
    let year = TEN_YEAR_CONFIG[dateArr[0]];
    if (_.isEmpty(year)) {
        return false;
    }

    let monthDay = parseInt(dateArr[1] + dateArr[2]);

    let nowYearAnimal;
    let isNewYear = false;
    if (monthDay <= year.endTime) {
        nowYearAnimal = year.old;
        isNewYear = false;
    } else {
        nowYearAnimal = year.new;
        if (dateArr[0] < NOW_YEAR) {
            isNewYear = false;
        } else {
            isNewYear = true;
        }
    }
    ANIMAL_SORT = getYearAnimals(isNewYear, nowYearAnimal);
    return ANIMAL_SORT[(code - 1) % 12];
}

export function getNumWithAnimal(animal) {
    let animalNums = ["01,13,25,37,49", "02,14,26,38", "03,15,27,39", "04,16,28,40", "05,17,29,41", "06,18,30,42", "07,19,31,43", "08,20,32,44", "09,21,33,45", "10,22,34,46", "11,23,35,47", "12,24,36,48"]
    let index = ANIMAL_SORT.indexOf(animal)
    return animalNums[index];
}

/**
 * 获取生肖数组
 * @param isNewYear 是否是新的一年
 * @param nowYearAnimal 当年肖
 */
function getYearAnimals(isNewYear, nowYearAnimal) {
    let startAnimalIndex = DEFAULT_ANIMAL2NUM_ORDER[nowYearAnimal]
    if (isNewYear) {
        sortYearAnimals(startAnimalIndex, NOW_YEAR_ANIMAL_ORDER);
        return NOW_YEAR_ANIMAL_ORDER;
    } else {
        sortYearAnimals(startAnimalIndex, LAST_YEAR_ANIMAL_ORDER);
        return LAST_YEAR_ANIMAL_ORDER;
    }
}

/**
 * 根据当年肖索引排序生肖
 * @param startAnimalIndex  当年肖索引
 * @param animalArray 排序后的数组
 */
function sortYearAnimals(startAnimalIndex, animalArray, nowYearAnimal) {
    if (animalArray && animalArray.length == 12 && nowYearAnimal === animalArray[0]) {
        return;
    }
    animalArray.length = 0;
    for (let i = startAnimalIndex; i >= 0; i--) {
        animalArray.push(DEFAULT_ANIMAL_ORDER[i]);
    }
    for (let i = 11; i >= startAnimalIndex + 1; i--) {
        animalArray.push(DEFAULT_ANIMAL_ORDER[i]);
    }
}

/**
 * 根据开奖日期得到正确对应的号码与生肖 多个号码
 * @param time  开奖日期  unix 时间戳 stopOrderTimeEpoch 传这个字段就好
 * @param lastOpenCode  开奖号码 01-49 号码直接 空格隔开
 * @return {*}  01生肖 02生肖...格式  如果是等待开奖 则直接返回等待开奖
 */
export function getAnimalsWithOpenCodes(time, lastOpenCode) {
    if (_.isEmpty(lastOpenCode) || lastOpenCode === '等待开奖') {
        return lastOpenCode;
    }

    let results = '';
    let openCodeArr = lastOpenCode.split(' ');

    for (let i = 0, len = openCodeArr.length; i < len; i++) {
        let item = openCodeArr[i];
        let codeAnimal = getAnimalWithOpenCode(time, item);
        if (!codeAnimal) {
            return lastOpenCode;
        }
        results += item + codeAnimal + ' ';
    }

    return results.trim();
}