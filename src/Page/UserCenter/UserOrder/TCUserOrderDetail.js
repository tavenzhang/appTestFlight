'use strict';
/**
 * 每注订单详情
 * Created by Allen on 2016/12/10.
 */
import React, {Component} from 'react';

import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    TouchableOpacity,
    Image,
    TextInput,
    ScrollView,
    Clipboard
} from 'react-native';

import TopNavigationBar from '../../../Common/View/TCNavigationBar';
import BaseComponent from '../../../Page/Base/TCBaseComponent';
import Helper from '../../../Common/JXHelper/TCNavigatorHelper';
import JXHelper from '../../../Common/JXHelper/JXHelper';
import Toast from '../../../Common/JXHelper/JXToast';
import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter';
import {Size, width, height, indexBgColor, listViewTxtColor, buttonStyle, copyBtnStyle} from '../../resouce/theme';
import TCUserOrderBetList from './TCUserOrderBetList';
import HappyPokerHelper from '../../../Common/JXHelper/HappyPokerHelper';
import _ from 'lodash';

const limitItemCount = 5

let happyPoker = new HappyPokerHelper();
import {withMappedNavigationProps} from 'react-navigation-props-mapper'

@withMappedNavigationProps()
export default class TCUserOrderDetail extends BaseComponent {
    constructor(props) {
        super(props);
    }

    static defaultProps = {};

    componentDidMount() {
        super.componentDidMount();
        this.timer = setTimeout(() => {
            this.setState({renderPlaceholderOnly: false});
        }, 500);
    }

    componentWillUnmount() {
        super.componentWillUnmount();
        this.timer && clearTimeout(this.timer);
    }

    render() {
        let sp = super.render();
        if (sp) return sp;
        let {orderData, orderInfo} = this.props;

        return (
            <View style={styles.container}>
                <TopNavigationBar
                    title={'彩票详情'}
                    needBackButton={true}
                    backButtonCall={() => {
                        Helper.popToBack();
                    }}
                />

                <View style={styles.topItemStyle}>
                    <Image
                        source={JXHelper.getGameIconWithUniqueId(orderInfo.gameUniqueId)}
                        style={styles.topImgStyle}
                    />
                    <View style={styles.topTitleStyle}>
                        <View style={styles.topTitleItemStyle}>
                            <Text style={styles.titleTxtStyle}>
                                {orderInfo.gameNameInChinese}(<Text style={styles.openTimeStyle}>
                                {orderData.gameMethodInChinese}
                            </Text>)
                            </Text>
                        </View>
                        <View>
                            <Text style={styles.openTimeStyle}>第 {orderInfo.gameIssueNo} 期</Text>
                            <View style={styles.topTitleItemStyle}>
                                <Text style={styles.grayTxtStyle}>开奖号码:</Text>
                                {this.getDrawNumberContent(orderInfo)}
                            </View>
                        </View>
                    </View>
                </View>
                <ScrollView ref={'ScrollView'} style={{flex: 1}}>
                    <View style={styles.orderTitleStyle}>
                        <View style={styles.titleIconStyle}/>
                        <Text style={styles.titleTxtStyle}>订单内容</Text>
                    </View>
                    <View style={styles.orderContentStyle}>
                        {this.getOrderShowView(orderInfo)}

                        <View style={styles.orderRowStyle}>
                            <Text style={styles.orderLeftTxtStyle}>投注金额</Text>
                            <Text style={styles.orderRightTxtStyle}>{orderData.bettingAmount.toFixed(2)} 元</Text>
                        </View>
                        <View style={styles.orderRowStyle}>
                            <Text style={styles.orderLeftTxtStyle}>投注注数</Text>
                            <Text style={styles.orderRightTxtStyle}>{orderData.totalUnits} 注</Text>
                        </View>
                        <View style={styles.orderRowStyle}>
                            <Text style={styles.orderLeftTxtStyle}>投注返点</Text>
                            <Text style={styles.orderRightTxtStyle}>
                                {orderData.returnMoneyRatio
                                    ? (orderData.returnMoneyRatio * orderData.bettingAmount).toFixed(2)
                                    : 0.0}
                                元
                            </Text>
                        </View>
                        <View style={styles.orderRowStyle}>
                            <Text style={styles.orderLeftTxtStyle}>投注时间</Text>
                            <Text style={styles.orderRightTxtStyle}>{orderInfo.bettingTime}</Text>
                        </View>
                        <View style={styles.orderRowStyle}>
                            <Text style={styles.orderLeftTxtStyle}>是否中奖</Text>
                            <Text style={styles.orderRightTxtStyle}>{this.getOrderState(orderData)}</Text>
                        </View>
                        {/*{this.getPrizeView(orderData)}*/}
                    </View>
                    <View style={styles.orderBtmTitleStyle}>
                        <View style={styles.topTitleItemStyle}>
                            <View style={styles.titleIconStyle}/>
                            <Text style={styles.titleTxtStyle}>投注号码</Text>
                        </View>
                        <TCUserOrderBetList
                            style={styles.listStyles}
                            ordeBetList={orderData.perBetUnits.slice(0)}
                            orderMoney={orderData.perBetUnit}
                            orderState={orderData.transactionState}
                            {...this.props}
                        />
                        {/*<Text style={styles.orderLeftTxtStyle}>{orderData.betString }</Text>*/}
                    </View>
                </ScrollView>

                <View style={styles.bottomStyle}>
                    <TouchableOpacity
                        style={styles.bottomBarButtonStyle}
                        onPress={() => {
                            this.gotoOrderBet();
                        }}
                    >
                        <Text style={{color: buttonStyle.btnTxtColor, fontWeight: 'bold', fontSize: Size.default}}>
                            再来一注
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    getPrizeView(orderData) {
        let data = orderData.prizeSettings;

        if (data.length > limitItemCount && !this.checkIsMarkSixABGame(orderData)) {
            return (<TouchableOpacity
                onPress={() => {
                    this.refs['ScrollView'].scrollTo({x: 0, y: 0, animated: false})
                    this.setState({openPrize: !this.state.openPrize});
                }}
            >
                <View style={styles.orderRowStyle}>
                    <Text style={styles.orderLeftTxtStyle}>赔率 </Text>
                    <View>
                        <Text style={styles.orderRightTxtStyle}>{this.getPrizeSettingsInfo(orderData)}</Text>
                        <Text style={{
                            color: listViewTxtColor.content,
                            paddingLeft: 10,
                            fontSize: Size.font14,
                            marginTop: 5
                        }}>{this.state.openPrize ? '⇧收起' : '⇩查看更多'}</Text>
                    </View>
                </View>
            </TouchableOpacity>);
        }

        return (
            <View style={styles.orderRowStyle}>
                <Text style={styles.orderLeftTxtStyle}>赔率 </Text>
                <Text style={styles.orderRightTxtStyle}>{this.getPrizeSettingsInfo(orderData)}</Text>
            </View>
        );
    }

    checkIsMarkSixABGame(orderData) {
        return JXHelper.gameUniqueIDIsMarkSix(this.props.orderInfo.gameUniqueId) && (orderData.gameMethodInChinese === '特码A盘' || orderData.gameMethodInChinese === '特码B盘')
    }

    getPrizeSettingsInfo(orderData) {
        let data = orderData.prizeSettings;
        let ratio = parseFloat(orderData.returnMoneyRatio)
        if (!_.isEmpty(data) && data.length == 1) {
            return (data[0].prizeAmount - data[0].prizeAmount * ratio).toFixed(2);
        }

        let label1 = '';
        let label2 = '';
        let i = 0;

        // 对六合彩特码AB 盘特殊处理
        if (this.checkIsMarkSixABGame(orderData)) {
            let newArr = []
            let dic = {}
            data.forEach(item => {
                let prizeAmount = item.prizeAmount
                let Arr = _.isEmpty(dic[prizeAmount]) ? [] : dic[prizeAmount]
                Arr.push(item.prizeNameForDisplay)
                dic[prizeAmount] = Arr
            })

            for (let key in dic) {
                let item = dic[key]
                if (item.length == 1) {
                    newArr.push({'prizeAmount': key, 'prizeNameForDisplay': item[0]})
                } else if (item.length > 1 && item.length <= 4) {
                    newArr.push({'prizeAmount': key, 'prizeNameForDisplay': item})
                } else if (item.length > 4) {
                    newArr.push({'prizeAmount': key, 'prizeNameForDisplay': '其他号码'})
                }
            }
            data = newArr
        }

        data.forEach(item => {
            let prizeAmount = parseFloat(item.prizeAmount)
            if (i < limitItemCount) {
                label1 += item.prizeNameForDisplay + '：' + (prizeAmount - prizeAmount * ratio).toFixed(2) + '\n';
            } else {
                label2 += item.prizeNameForDisplay + '：' + (prizeAmount - prizeAmount * ratio).toFixed(2) + '\n';
            }
            i++;
        });
        if (this.state.openPrize) {
            return (label1 + label2).slice(0, -1);
        }
        return label1.slice(0, -1);
    }

    getOrderShowView(orderInfo) {
        let text = '订单号    ';
        if (this.props.isCO_DontOpen) {
            text = '追号订单号';
        }
        return (
            <View style={styles.orderRowStyle}>
                <Text style={styles.orderLeftTxtStyle}>{text}</Text>
                <Text style={styles.orderRightTxtStyle}>{this.formatOrderId(orderInfo.transactionTimeuuid)}</Text>

                <TouchableOpacity
                    onPress={() => {
                        this.onCopy(orderInfo.transactionTimeuuid);
                    }}
                >
                    <View style={styles.itemBtnStyle}>
                        <Text style={styles.itemBtnTxtStyle}>复制</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }

    getOrderState(orderData) {
        switch (orderData.transactionState) {
            case 'PENDING':
                return '待开奖';
            case 'WIN':
                return <Text style={{color: listViewTxtColor.redTip}}>中{orderData.winningAmount.toFixed(2)}元</Text>;
            case 'LOSS':
                return '未中奖';
            case 'CANCELLED':
                return '已取消';
            case 'CO_SUB_WIP':
                return '待开奖';
            case 'CO_SUB_WIN':
                return <Text style={{color: listViewTxtColor.redTip}}>中{orderData.winningAmount.toFixed(2)}元</Text>;
            case 'CO_SUB_LOSS':
                return '未中奖';
            case 'CO_COMPLETE':
                return '追号完成';
            case 'CO_IN_PROGRESS':
                return '追号中';
        }
    }

    gotoOrderBet() {
        Helper.popToTop();
        RCTDeviceEventEmitter.emit('setSelectedTabNavigator', 'shoping');
        return;
        let {orderInfo} = this.props;
        let data = {gameUniqueId: orderInfo.gameUniqueId, gameNameInChinese: orderInfo.gameNameInChinese};
        // Helper.pushToBetHome(data)
    }

    getDrawNumberContent(orderInfo) {
        if (orderInfo.gameUniqueId == 'HF_LFKLPK' && orderInfo && orderInfo.drawNumber) {
            let drawNumbers = orderInfo.drawNumber.split('|');
            return (
                <View style={styles.drawNumberContainer}>{happyPoker.getOpenCodeView(drawNumbers, true, true)}</View>
            );
        } else {
            return <Text style={styles.redTxtStyle}>{orderInfo.drawNumber ? orderInfo.drawNumber : '未开奖'}</Text>;
        }
    }

    formatOrderId(orderId) {
        return orderId.substr(0, 6) + ' ****** ' + orderId.substr(orderId.length - 5, orderId.length);
    }

    onCopy(text) {
        Clipboard.setString(text);
        Toast.showShortCenter('已复制！');
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: indexBgColor.mainBg
    },
    bottomBarButtonStyle: {
        backgroundColor: buttonStyle.btnBg,
        justifyContent: 'center',
        flexDirection: 'row',
        height: 40,
        alignItems: 'center',
        borderRadius: 4,
        padding: 10,
        width: width * 0.8,
        marginTop: 5
    },
    topItemStyle: {
        flexDirection: 'row',
        backgroundColor: indexBgColor.itemBg,
        borderBottomColor: indexBgColor.mainBg,
        borderBottomWidth: 0.5,
        paddingBottom: 10
    },
    topImgStyle: {
        width: width >= 360 ? 60 : 40,
        height: width >= 360 ? 60 : 40,
        margin: 5
    },
    bottomStyle: {
        alignItems: 'center',
        marginBottom: 10
    },
    topTitleStyle: {
        flexDirection: 'column',
        flex: 1
    },
    topTitleItemStyle: {
        flexDirection: 'row',
        marginTop: 5,
        marginBottom: 5
    },
    orderContentStyle: {
        backgroundColor: indexBgColor.itemBg,
        paddingLeft: 10,
        paddingTop: 5
    },
    orderTitleStyle: {
        backgroundColor: indexBgColor.itemBg,
        paddingLeft: 20,
        paddingTop: 5,
        marginTop: 0,
        flexDirection: 'row'
    },
    titleTxtStyle: {
        color: listViewTxtColor.title,
        fontSize: Size.font18
    },
    openTimeStyle: {
        color: listViewTxtColor.content,
        fontSize: Size.font16,
        marginTop: 6
    },
    orderLeftTxtStyle: {
        color: listViewTxtColor.content,
        fontSize: Size.font16,
        paddingLeft: 10,
        paddingTop: 5
    },
    orderRightTxtStyle: {
        color: listViewTxtColor.title,
        fontSize: Size.default,
        paddingLeft: 10,
        paddingTop: 5
    },
    orderBtmTitleStyle: {
        backgroundColor: indexBgColor.itemBg,
        paddingLeft: 20,
        paddingTop: 20,
        paddingRight: 20,
        flex: 1
    },
    orderRowStyle: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginLeft: 20
    },
    redTxtStyle: {
        color: listViewTxtColor.redTip
    },
    grayTxtStyle: {
        color: listViewTxtColor.content,
        fontSize: Size.default
    },
    titleIconStyle: {
        backgroundColor: listViewTxtColor.redTip,
        width: 6,
        height: 20
    },
    itemBtnStyle: {
        paddingLeft: width >= 360 ? 20 : 2
    },
    itemBtnTxtStyle: {
        color: copyBtnStyle.txtColor,
        textAlign: 'center',
        paddingTop: 4,
        paddingBottom: 4,
        paddingLeft: 8,
        paddingRight: 8,
        borderWidth: 1,
        borderColor: copyBtnStyle.borderColor,
        borderRadius: 5,
        fontSize: Size.default
    },
    listStyles: {
        marginTop: 10
    },
    drawNumberContainer: {
        flexDirection: 'row'
    }
});
