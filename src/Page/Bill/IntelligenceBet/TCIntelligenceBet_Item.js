/**
 * Created by Sam on 01/09/2017.
 * Copyright © 2017年 JX. All rights reserved.
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Dimensions,
    TouchableOpacity,
    Image
} from 'react-native';
import {observer} from 'mobx-react/native';

/**系统 npm类 */

/**组件内部显示需要引入的类 */
import {IntelligenceBet} from '../../resouce/images'
import {baseColor, betHome, Size} from "../../resouce/theme";
import NumberOnlyInputText from "../../../Common/View/NumberOnlyInputText";

/** 外部关系组件 如 页面跳转用 */
const {width, height} = Dimensions.get('window')

@observer
export default class MyComponent extends React.Component {

    static defaultProps = {
        styleForTitle: false,
        data: null,
        mobxData: null,
    }


    render() {
        return this.getTitleView()
    }

    getTitleView() {
        if (this.props.styleForTitle) {
            return (
                <View style={styles.container}>
                    <View style={[styles.titleItemView, {
                        flex: 1 / 11,
                    }]}>
                        <Text style={styles.topTextColor}>序号</Text>
                    </View>
                    <View style={[styles.titleItemView, {
                        flex: 1 / 11,
                    }]}>
                        <Text style={styles.topTextColor}>期号</Text>
                    </View>
                    <View style={[styles.titleItemView, {
                        flex: 1 / 3,
                    }]}>
                        <Text style={styles.topTextColor}>倍数</Text>
                    </View>
                    <View style={[styles.titleItemView, {
                        flex: 1 / 5,
                    }]}>
                        <Text style={styles.topTextColor}>累计投入</Text>
                    </View>

                    <View style={[styles.titleItemView, {
                        flex: 1 / 5,
                    }]}>
                        <Text style={styles.topTextColor}>中奖盈利</Text>
                    </View>
                    <View style={[styles.titleItemView, {
                        flex: 1 / 7,
                    }]}>
                        <Text style={styles.topTextColor}>盈利率</Text>
                    </View>
                </View>
            )
        }

        let item = this.props.data.listArray[this.props.index]

        return (
            <View
                style={[styles.container, this.props.index % 2 === 0 ? {backgroundColor: betHome.intelligenceBetListItemBgDeep} : {}]}>
                <View style={[styles.contentItemView, {flex: 1 / 11}]}>
                    <Text style={styles.itemTextColor}>{item.serialNumber}</Text>
                </View>
                <View style={[styles.contentItemView, {flex: 1 / 11}]}>
                    <Text
                        style={styles.itemTextColor}>{item.planNo.length > 3 ? item.planNo.substring(item.planNo.length - 3) : item.planNo}</Text>
                </View>
                <View style={[styles.contentItemView, {flex: 1 / 3}]}>
                    <MultipleNumberInput mobxData={this.props.mobxData} indexKey={this.props.index} itemData={item}/>

                </View>
                <View style={[styles.contentItemView, {flex: 1 / 5}]}>
                    <Text style={styles.itemTextColor}>{item.accumulative}</Text>
                </View>

                {this.getProfitView(item, false)}
                {this.getProfitView(item, true)}
            </View>
        )
    }

    getProfitView(item, isRate) {
        let profit = 0;
        let maxProfit = 0;
        if (isRate) {
            profit = item.profitRate + '%';
            maxProfit = item.maxProfitRate + '%';
        } else {
            profit = item.profit;
            maxProfit = item.maxProfit;
        }
        if (item.profit != item.maxProfit) {
            return (
                <View style={[styles.contentItemView, {flex: isRate ? 1 / 7 : 1 / 5}]}>
                    <Text style={{
                        fontSize: Size.font14,
                        textAlign: 'center',
                        lineHeight: 16,
                        marginTop: 1,
                        color: parseFloat(isRate ? item.profitRate : item.profit) >= 0 ? 'red' : 'green',
                    }}>{profit}</Text>
                    <Text style={{
                        fontSize: Size.font14,
                        textAlign: 'center',
                        color: betHome.betChoiceBtnTxt,
                        marginLeft: isRate ? -1 : 0,//因为百分比看起来无法居中
                        lineHeight: 16,
                    }}>至</Text>
                    <Text style={{
                        fontSize: Size.font14,
                        textAlign: 'center',
                        lineHeight: 16,
                        marginBottom: 1,
                        color: parseFloat(isRate ? item.maxProfitRate : item.maxProfit) >= 0 ? 'red' : 'green',
                    }}>{maxProfit}</Text>
                </View>
            )
        } else {
            return (
                <View style={[styles.contentItemView, {flex: isRate ? 1 / 7 : 1 / 5, height: 40}]}>
                    <Text style={{
                        fontSize: Size.font14,
                        textAlign: 'center',
                        marginTop: 2,
                        color: parseFloat(isRate ? item.profitRate : item.profit) >= 0 ? 'red' : 'green',
                    }}>{profit}</Text>
                </View>

            );
        }
    }

}


class MultipleNumberInput extends Component {
    constructor() {
        super();
        this.inputNumber = '';
        this.curInputNumber = '';
    }

    static defaultValue = {
        indexKey: 0,
        itemData: null,
        mobxData: null,
    }

    componentDidMount() {
        this.inputNumber = this.props.itemData.multiplier.toString();

    }

    render() {
        return (<View style={{
            flexDirection: 'row',
            borderColor: '#cccccc', borderWidth: 1, marginLeft: 2,
            marginRight: 2, alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#ffffff'
        }}>
            <TouchableOpacity style={{
                width: 22,
                borderColor: 'transparent',
                borderWidth: 1,
                borderRightColor: '#cccccc',
                height: 25,
                alignItems: 'center',
                justifyContent: 'center'
            }} onPress={() => this.onImagePress(false)}>

                <Image style={{width: 13, height: 13}} resizeMode={'contain'}
                       source={IntelligenceBet.subtract}/>
            </TouchableOpacity>


            <NumberOnlyInputText
                ref={this.props.indexKey + "ItemInputText"}
                maxLength={5}
                defaultValue={this.props.itemData.multiplier.toString()}
                indexKey={this.props.indexKey}
                textChangedFunc={(text, indexKey) => this.multiplyNumberChange(text, indexKey)}
                isFlex={true}
                onBlurFunc={() => {
                    this.modifyInputNumberIfNeed()
                }}
                onSubmitEditing={() => {
                    this.modifyInputNumberIfNeed()
                }}
                onEndEditing={() => {
                    this.modifyInputNumberIfNeed()
                }}
                textHeight={25}/>

            <TouchableOpacity style={{
                width: 22,
                borderColor: 'transparent',
                borderWidth: 1,
                borderLeftColor: '#cccccc',
                height: 25,
                alignItems: 'center',
                justifyContent: 'center',
            }} onPress={() => this.onImagePress(true)}>
                <Image style={{width: 13, height: 13}} resizeMode={'contain'} source={IntelligenceBet.add}/>

            </TouchableOpacity>
        </View>);
    }

    multiplyNumberChange(text, indexKey) {
        this.curInputNumber = text;
        if (text != '') {
            this.inputNumber = text;
            this.props.mobxData.adjustArrayData(indexKey, text);
        }
    }

    onImagePress(isAdd) {
        if (this.processing) {
            return;
        }
        this.processing = true;
        let multiplier = this.props.mobxData.adjustArrayData(this.props.indexKey, -1, isAdd);
        if (multiplier > 0) {
            this.curInputNumber = multiplier;
        }
        this.processing = false;

    }


    modifyInputNumberIfNeed() {
        if (this.curInputNumber == '') {
            this.curInputNumber = this.inputNumber;
            this.refs[this.props.indexKey + "ItemInputText"].setDisplayValue(this.curInputNumber);
        }
    }
}

class VerticalScaleText extends Component {
    constructor() {
        super();
    }

    static defaultProps = {
        item: null,
        isRate: false,
    }

    render() {
        return (
            <View style={styles.verticalScaleContainer}>
                <Text style={{
                    fontSize: Size.font14,
                    textAlign: 'center',
                    marginTop: 2,
                    color: parseFloat(this.props.isRate ? this.props.item.profitRate : this.props.item.profit) >= 0 ? 'red' : 'green',
                }}>{this.props.isRate ? this.props.item.profitRate : this.props.item.profit}</Text>
                <Text style={{
                    fontSize: Size.font14,
                    textAlign: 'center',
                    color: betHome.betChoiceBtnTxt,
                }}>至</Text>
                <Text style={{
                    fontSize: Size.font14,
                    textAlign: 'center',
                    marginBottom: 2,
                    color: parseFloat(this.props.isRate ? this.props.item.profitRate : this.props.item.profit) >= 0 ? 'red' : 'green',
                }}>{this.props.isRate ? this.props.item.profitRate : this.props.item.profit}</Text>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: baseColor.mainBg,
        flexDirection: 'row',
        width: width,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    titleItemView: {
        height: 40,
        alignItems: 'center',
        justifyContent: 'center'
    },
    contentItemView: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    topTextColor: {
        color: betHome.betChoiceBtnTxt,
        fontSize: Size.font15,
        textAlign: 'center',
    },
    itemTextColor: {
        color: betHome.betChoiceBtnTxt,
        fontSize: Size.font14,
        textAlign: 'center'
    },
    verticalScaleContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    }
});
