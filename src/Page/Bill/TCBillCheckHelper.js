

/**
 * check 总金额是否正确
 * @param json
 * @return {boolean} true: 正确 false :金额错误
 */
export function checkIfAmountCorrect (json) {
    let betArr = json.betEntries;
    let totalAmount = json.totalAmount;
    let tmpAmount = 0;
    for (let i = 0, len = betArr.length; i < len; i++) {
        let bet = betArr[i];
        let betAmount = parseInt(bet.numberOfUnits).accMul(parseFloat(bet.pricePerUnit));
        if (betAmount !== parseFloat(bet.amount)) {
            return false;
        }
        tmpAmount = tmpAmount.accAdd(betAmount);

    }
    return tmpAmount === parseFloat(totalAmount)
}