/**
 * Created by Sam on 2016/11/11.
 */

import React, {Component} from 'react';
import {AppRegistry, StyleSheet, Text, View, Image, PixelRatio} from 'react-native';
import {
    getAnimalsWithOpenCodes,
    getAnimalWithOpenCode
} from '../../Page/Bet/AllPlayingMethodView/MarkSix/data/MarkSixNum2AnimalHelper'
import HappyPokerHelper from '../../Common/JXHelper/HappyPokerHelper';
import {Mark_SixBallColor, PCDD_ballColor} from '../../Data/JXGameInfo';
let happyPoker = new HappyPokerHelper();
import {
    lotteryTxtColor,
    lotterBgColor,
    indexBgColor,
    width,
    Size,
    lotteryNumbStyle,
    listViewTxtColor
} from '../../Page/resouce/theme';
import {k3} from '../../Page/resouce/images';
import JXHelper from '../JXHelper/JXHelper'
import {pk10Ball} from '../../Page/asset/pk10_ball/index'
import TCImage from "./image/TCImage";

export default class TCLotteryNumbersView extends React.PureComponent {
    constructor(state) {
        super(state);
        this.state = {};
    }

    static defaultProps = {
        cpNumbers: [1, 2, 3, 45, 22, 22, 2, 2, 12, 2, 1],
        width: null,
        marginRight: null,
        isHighlightStyle: true,
        showStyle: '',
        isBetHomeHistory: false,
        data: {}
    };

    componentDidMount() {
    }

    render() {
        let gameUniqueIdIsSSC = false;
        if (this.props.showStyle.indexOf('SSC') >= 0) {
            gameUniqueIdIsSSC = true;
        }
        return (
            <View
                style={[
                    styles.container,
                    this.props.isBetHomeHistory && styles.homeHistoryContainer,
                    gameUniqueIdIsSSC && styles.sscHomeHistoryContainer
                ]}
            >
                {this.getAllItems(gameUniqueIdIsSSC)}
            </View>
        );
    }

    getAllItems(gameUniqueIdIsSSC) {
        var itemArr = [];
        let num = 0;
        let S = -1;
        let G = -1;
        let FN = -1;
        let SN = -1;
        let TN = -1;

        // 快3
        if (this.props.showStyle.indexOf('K3') > 0) {
            for (let i = 0; i < this.props.cpNumbers.length; i++) {
                num += parseInt(this.props.cpNumbers[i]);
            }
            return (
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    {<View style={styles.imgDiceContainer}>{this.getDiceImages()}</View>}
                    <Text
                        allowFontScaling={false}
                        style={[
                            styles.totalValueStyle,
                            this.props.isBetHomeHistory && styles.homeHistoryDXDSText,
                            this.props.isBetHomeHistory && styles.homeHistoryDiceText
                        ]}
                    >
                        和值:{num}
                    </Text>
                </View>
            );
        }

        // Pk10玩法
        if (this.props.showStyle.indexOf('PK10') >= 0 || this.props.showStyle.indexOf('HF_XY') >= 0) {
            return itemArr = this.getPK10(itemArr)
        }

        for (let i = 0; i < this.props.cpNumbers.length; i++) {
            // 六合彩
            if (JXHelper.gameUniqueIDIsMarkSix(this.props.showStyle)) {
                itemArr = this.getMarkSixArray(itemArr, i)
            } else {
                itemArr.push(
                    <View key={i} style={this.getMyBallStyle(this.props.cpNumbers[i])}>
                        <Text
                            allowFontScaling={false}
                            style={{
                                color: this.props.isHighlightStyle ? lotteryTxtColor.cpNum : lotterBgColor.cpBallBg,
                                fontSize: this.props.isBetHomeHistory
                                    ? lotteryNumbStyle.ballStyle.borderWidth ? Size.font12 : Size.font13
                                    : Size.font15,
                                backgroundColor: 'transparent'
                            }}
                        >
                            {' '}
                            {this.props.cpNumbers[i]}{' '}
                        </Text>
                    </View>
                );
            }

            // 28玩法
            if (this.props.showStyle.indexOf('28') >= 0) {
                num += parseInt(this.props.cpNumbers[i]);
                itemArr = this.get28Array(itemArr, num, i)
            }

            // 时时彩
            if (gameUniqueIdIsSSC) {
                if (this.props.isBetHomeHistory) {
                    if (width >= 350) {
                        switch (i) {
                            case 0:
                                FN = this.props.cpNumbers[i];
                                break;
                            case 1:
                                SN = this.props.cpNumbers[i];
                                break;
                            case 2:
                                TN = this.props.cpNumbers[i];
                                break;
                            case 3:
                                S = this.props.cpNumbers[i];
                                break;
                            case 4: {
                                G = this.props.cpNumbers[i];
                                itemArr.push(
                                    <Text
                                        allowFontScaling={false}
                                        key={i + 112}
                                        style={styles.sscHomeHistoryDXDSText}
                                    >
                                        {this.getDXDS(FN)} | {this.getDXDS(SN)} | {this.getDXDS(TN)} |{' '}
                                        {this.getDXDS(S)} | {this.getDXDS(G)}
                                    </Text>
                                );
                            }
                                break;
                        }
                    }
                } else {
                    if (i == 4) {
                        G = this.props.cpNumbers[i];
                        itemArr.push(
                            <Text allowFontScaling={false} key={i + 112} style={styles.DXDSTextStyle}>
                                {this.getSSCSumText(this.props.cpNumbers)} | {this.getSSCNiuText(this.props.cpNumbers)}
                            </Text>
                        );
                    } else if (i == 3) {
                        S = this.props.cpNumbers[i];
                    }
                }
            }
        }

        // 快乐扑克
        if (this.props.showStyle.indexOf('LFKLPK') > 0) {
            return (
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    {
                        <View
                            style={[
                                styles.imgDiceContainer,
                                this.props.isBetHomeHistory && styles.homeHistoryImgDiceContainer
                            ]}
                        >
                            {this.getPKView()}
                        </View>
                    }
                </View>
            );
        }
        return itemArr;
    }

    // 28玩法
    get28Array(itemArr, num, i) {
        if (i < 2) {
            itemArr.push(
                <Text allowFontScaling={false} key={i + 100}
                      style={[styles.operatorStyle, this.props.isBetHomeHistory && styles.homeHistoryOperator]}>
                    +{' '}
                </Text>
            );
        } else {
            itemArr.push(
                <Text allowFontScaling={false} key={i + 100}
                      style={[styles.operatorStyle, this.props.isBetHomeHistory && styles.homeHistoryOperator]}>
                    ={' '}
                </Text>
            );
            itemArr.push(
                <View key={i + 300} style={this.getMyBallStyle(num < 10 ? '0' + num : num, true)}>
                    <Text
                        allowFontScaling={false}
                        key={i + 202}
                        style={{
                            fontSize: Size.font14,
                            marginBottom: 0,
                            color: lotteryTxtColor.cpNum,
                            backgroundColor: 'transparent'
                        }}
                    >
                        {num}
                    </Text>
                </View>
            );
        }
        if (i == 2) {
            itemArr.push(
                <Text
                    allowFontScaling={false}
                    key={i + 1022}
                    style={[styles.DXDSTextStyle, this.props.isBetHomeHistory && styles.homeHistoryDXDSText]}
                >
                    {this.getDXDS(num, true)}
                </Text>
            );
        }
        return itemArr;
    }

    //六合彩处理
    getMarkSixArray(itemArr, i) {

        itemArr.push(
            <View key={i} style={{justifyContent: 'center', alignItems: 'center'}}>
                <View key={i} style={this.getMyBallStyle(this.props.cpNumbers[i])}>
                    <Text
                        allowFontScaling={false}
                        style={{
                            color: this.props.isHighlightStyle ? lotteryTxtColor.cpNum : Mark_SixBallColor[this.props.cpNumbers[i]],
                            fontSize: this.props.isBetHomeHistory
                                ? lotteryNumbStyle.ballStyle.borderWidth ? Size.font12 : Size.font13
                                : Size.font15,
                            backgroundColor: 'transparent'
                        }}
                    >
                        {' '}{this.props.cpNumbers[i]}{' '}
                    </Text>
                </View>
                <Text style={{
                    fontSize: this.props.isBetHomeHistory
                        ? lotteryNumbStyle.ballStyle.borderWidth ? Size.font12 : Size.font13
                        : Size.font15,
                    backgroundColor: 'transparent', color: listViewTxtColor.homeHistoryStrong
                }}>{getAnimalWithOpenCode(this.getStopOrderTime(), this.props.cpNumbers[i]) + ' ' }</Text>
            </View>
        );
        if (i == 5) {
            itemArr.push(
                <Text
                    allowFontScaling={false}
                    key={i + 100}
                    style={[styles.operatorStyle, this.props.isBetHomeHistory && styles.homeHistoryOperator]}
                >
                    +{' '}
                </Text>
            );
        }
        return itemArr;
    }

    //两个接口返回的时间格式不一致，暂时这样解决
    getStopOrderTime() {

        if (this.props.data.lastPlanNo) {
            return new Date(this.props.data.lastOpenTime).getTime() / 1000;
        } else {
            return this.props.data.stopOrderTimeEpoch
        }
    }

    getDiceImages() {
        let imagesArr = [];
        for (let i = 0; i < this.props.cpNumbers.length; i++) {
            let numStr = this.props.cpNumbers[i] ? 'dice' + this.props.cpNumbers[i].toString() : '';
            imagesArr.push(
                <TCImage
                    key={i}
                    source={k3[numStr]}
                    style={[styles.imgDiceStyle, this.props.isBetHomeHistory && styles.homeHistoryImgDice]}
                    resizeMode={'contain'}
                />
            );
        }
        return imagesArr;
    }

    // PK10类号码球处理
    getPK10(itemArr) {
        for (let i = 0; i < this.props.cpNumbers.length; i++) {
            let numStr = this.props.cpNumbers[i] ? 'pk10_' + parseInt(this.props.cpNumbers[i].toString()) : '';
            itemArr.push(
                <TCImage
                    key={i + 100}
                    source={pk10Ball[numStr]}
                    style={[styles.imgPk10BallStyle, this.props.isBetHomeHistory && styles.homeHistoryImgDice, this.props.isBetHomeHistory && width < 350 && styles.pk10BallSmall]}
                    resizeMode={'contain'}
                />
            );
        }
        return itemArr
    }

    getPKView() {
        return (
            <View
                style={[styles.openCodeContainer, this.props.isBetHomeHistory && styles.homeHistoryOpenCodeContainer]}>
                {happyPoker.getOpenCodeView(this.props.cpNumbers, true, false, this.props.isBetHomeHistory)}
            </View>
        );
    }

    getDXDS(number, JZ) {
        let str = '';
        if (JZ) {
            if (number < 6) {
                return '极小';
            } else if (number > 21) {
                return '极大';
            }
        }

        if (JZ) {
            if (number > 13) {
                str += '大';
            } else {
                str += '小';
            }
        } else {
            if (number > 4) {
                str += '大';
            } else {
                str += '小';
            }
        }

        if ((parseInt(number) + 2) % 2 == 0) {
            str += '双';
        } else {
            str += '单';
        }
        return str;
    }

    getSSCSumText(nums) {
        let total = 0;
        nums.forEach(item => {
            total += Number(item);
        });
        let numText1 = total < 23 ? '小' : '大';
        let numText2 = total % 2 == 0 ? '双' : '单';
        return numText1 + numText2;
    }

    getSSCNiuText(cards) {
        var s = 0;
        var dict = {};
        for (let i = 0; i < cards.length; i++) {
            var ci = Number(cards[i]);
            s += ci;
            dict[ci] = dict[ci] === undefined ? 1 : dict[ci] + 1;
        }
        var point = s % 10;
        var exists = false;
        for (let i in dict) {
            var other = (10 + point - Number(i)) % 10;
            if (dict[other]) {
                if ((other == Number(i) && dict[other] >= 2) || (other != Number(i) && dict[other] >= 1)) {
                    exists = true;
                    break;
                }
            }
        }
        let index1 = exists ? point : -1;
        let niuObj = {
            '-1': '无牛',
            '0': '牛牛',
            '1': '牛一',
            '2': '牛二',
            '3': '牛三',
            '4': '牛四',
            '5': '牛五',
            '6': '牛六',
            '7': '牛七',
            '8': '牛八',
            '9': '牛九'
        };
        return niuObj[index1];
    }

    getMyBallStyle(number, dos) {
        let styArr = [];
        let ballWidthBorder = lotteryNumbStyle.ballStyle.borderWidth ? true : false;
        styArr.push(this.props.isHighlightStyle ? lotteryNumbStyle.ballStyle : styles.ballNoBackgroundStyle);

        if (this.props.isBetHomeHistory) {
            //快乐10分
            if (this.props.showStyle.indexOf('KL10F')) {
                styArr.push(
                    this.props.isHighlightStyle
                        ? [styles.betHomeHistoryBall, {marginHorizontal: -2}, ballWidthBorder && {borderWidth: 1}]
                        : styles.betHomeHistoryBallNoBackground
                );
            } else {
                styArr.push(
                    this.props.isHighlightStyle
                        ? [styles.betHomeHistoryBall, ballWidthBorder && {borderWidth: 1}]
                        : styles.betHomeHistoryBallNoBackground
                );
            }
        }

        if (JXHelper.gameUniqueIDIsMarkSix(this.props.showStyle) && this.props.isHighlightStyle) {
            styArr.push(
                ballWidthBorder
                    ? {
                    borderWidth: this.props.isBetHomeHistory ? 1 : lotteryNumbStyle.ballStyle.borderWidth,
                    borderColor: Mark_SixBallColor[number]
                }
                    : {backgroundColor: Mark_SixBallColor[number]}
            );
        }

        if (dos && (this.props.showStyle.indexOf('28') >= 0 )) {
            styArr.push(
                ballWidthBorder
                    ? {
                    borderWidth: this.props.isBetHomeHistory ? 1 : lotteryNumbStyle.ballStyle.borderWidth,
                    borderColor: PCDD_ballColor[number]
                }
                    : {backgroundColor: PCDD_ballColor[number]}
            );
        }

        return styArr;
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: indexBgColor.itemBg,
        flexDirection: 'row',
        marginLeft: 10,
        marginRight: 5,
        flexWrap: 'wrap',
        marginBottom: 12,
        marginTop: 10
    },
    ballStyle: {
        backgroundColor: lotterBgColor.cpBallBg,
        borderRadius: 20,
        height: 25,
        width: 25,
        marginRight: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 5
    },
    ballNoBackgroundStyle: {
        height: 35,
        width: 35,
        marginRight: 0,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 5
    },
    betHomeHistoryBallNoBackground: {
        height: 20,
        width: 20,
        marginBottom: null
    },
    imgDiceContainer: {
        flexDirection: 'row',
        paddingHorizontal: 10,
        backgroundColor: lotterBgColor.newLotteryBg,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imgDiceStyle: {
        marginVertical: 5,
        marginHorizontal: 5,
        height: 25,
        width: 25
    },
    imgPk10BallStyle: {
        marginVertical: 2,
        marginHorizontal: 2,
        height: 25,
        width: 25
    },
    totalValueStyle: {
        marginLeft: 10,
        fontSize: Size.font16,
        color: lotteryTxtColor.cpTip
    },
    openCodeContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        width: width / 2 - 12,
        marginTop: 2
    },
    betHomeHistoryBall: {
        borderRadius: 10,
        height: 21,
        width: 21,
        marginHorizontal: 1.5,
        marginBottom: null
    },
    homeHistoryContainer: {
        marginBottom: null,
        marginTop: null,
        width: width * 0.65,
        justifyContent: 'center',
        marginLeft: 0,
        marginRight: 0,
        backgroundColor: 'transparent'
    },
    DXDSTextStyle: {
        fontSize: Size.font16,
        marginLeft: 10,
        marginBottom: 5,
        color: lotteryTxtColor.cpTip
    },
    homeHistoryDXDSText: {
        fontSize: Size.xsmall,
        marginLeft: 5,
        marginBottom: null
    },
    homeHistoryImgDice: {
        marginVertical: 2,
        height: 18,
        width: 18
    },
    pk10BallSmall: {
        marginHorizontal: 1,
        marginVertical: 2,
        height: 18,
        width: 18
    },
    homeHistoryDiceText: {
        width: 50
    },
    homeHistoryOpenCodeContainer: {
        alignItems: 'center',
        width: 90,
        marginVertical: 1
    },
    homeHistoryImgDiceContainer: {
        paddingHorizontal: 8,
        borderRadius: 15
    },
    operatorStyle: {
        fontSize: Size.font18,
        marginBottom: 10,
        color: lotteryTxtColor.operator
    },
    homeHistoryOperator: {
        marginBottom: null,
        marginLeft: -0.5
    },
    sscHomeHistoryContainer: {
        width: width * 0.85
    },
    sscHomeHistoryDXDSText: {
        color: lotteryTxtColor.cpTip,
        fontSize: Size.xsmall,
        marginLeft: 5,
        marginBottom: null
    }
});
