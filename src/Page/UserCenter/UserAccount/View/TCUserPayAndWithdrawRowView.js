'use strict'
/**
 * Created by Allen on 2016/12/10.
 */
import React, {Component} from 'react';

import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    TouchableOpacity,
    LayoutAnimation,
    UIManager,
    Platform,
    Image,
    TextInput, Clipboard
} from 'react-native';
import Moment from 'moment'
import {common} from '../../../asset/images'
import {Size, width, height, indexBgColor, listViewTxtColor, copyBtnStyle} from '../../../resouce/theme'
import {ASSET_Images} from "../../../asset";
import TCImage from "../../../../Common/View/image/TCImage";
import Toast from "../../../../Common/JXHelper/JXToast";
export  default  class TCUserPayAndWithdrawRowView extends Component {

    constructor(props) {
        super(props)
        this.state = {
            textLayoutHeight: 0,
            updatedHeight: 0,
            expanded: false
        }

        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true);
        }

        this.icons={
            'down':ASSET_Images.gameUI.payExpand,
            'up':ASSET_Images.gameUI.payCollapse
        };
    }

    static defaultProps = {};

    expand_collapse_Function =()=>
    {
        LayoutAnimation.configureNext( LayoutAnimation.Presets.easeInEaseOut );

        if( this.state.expand == false )
        {
            this.setState({
                updatedHeight:this.state.textLayoutHeight,
                expand: true,
            });
        }
        else
        {
            this.setState({
                updatedHeight: 0,
                expand: false,
            });
        }
    }

    getHeight(height)
    {
        this.setState({ textLayoutHeight: height });
    }

    componentDidMount() {
    }

    render() {
        let icon = this.icons['down'];

        if(this.state.expanded){
            icon = this.icons['up'];
        }
        let orderId = this.props.rowData.transactionId.toString()
        let type = this.props.rowData.type
        return (

            <View style={{width: SCREEN_W - 250, height: 110, alignItems: "center", flexDirection: "row"} }>
                <TCImage source={ASSET_Images.gameUI.listItemBg}
                         style={{position: "absolute", width: SCREEN_W - 250, height: 110}}/>
                <View style={styles.itemStyle}>
                    <View style={styles.itemLeftStyle}>
                        <Text style={styles.itemLabel}>{this.getType()}: <Text
                            style={{color: this.getState()==='失败'?'#ff002a':this.getState()==='已完成'?'#7cfc00':'#FAF421',
                                fontSize: Size.font14}}>{this.getState()}</Text></Text>
                        <Text style={styles.itemLabel}>支付方式：<Text
                            style={styles.itemData}>{this.getSubType()}</Text>
                        </Text>
                        <Text style={styles.itemLabel}>订单号：
                            <Text style={styles.itemData}>{this.formatOrderId()}</Text>
                            <Text onPress={() => {this.onCopy(orderId)}}
                                  style={styles.itemBtnTxtStyle}>复制</Text>
                        </Text>
                        <Text style={styles.itemLabel}>创建时间：<Text
                            style={styles.itemData}>{this.getTime()}</Text>
                        </Text>
                        {/*<TouchableOpacity*/}
                            {/*style={{width: 30, height: 30,marginLeft:(SCREEN_W-400) / 2}}*/}
                            {/*onPress={()=>{this.changeLayout()}}>*/}
                            {/*<TCImage source={icon}/>*/}
                        {/*</TouchableOpacity>*/}
                        {/*<View style={{ height: this.state.expanded ? null : 0, overflow: 'hidden' }}>*/}
                            {/*<Text style={styles.itemBigLabel} >收入：*/}
                                {/*<Text style={styles.itemData}>{this.props.accountType == 0? this.getPayAndWithdrawMoneyExact() : ""}</Text></Text>*/}

                            {/*<Text style={styles.itemLabel}>支付金额：<Text style={styles.itemData}>54543</Text></Text>*/}
                        {/*</View>*/}
                    </View>
                    <View style={styles.itemRightStyle}>
                        <Text style={styles.itemLabel}>{type==='WITHDRAWAL'?'提现金额：':'支付金额'}<Text style={styles.itemData}>{this.getPayAndWithdrawMoneyExact()}元</Text></Text>
                        <Text style={styles.itemLabel}>{type==='WITHDRAWAL'?'手续费：':'优惠金额'}<Text style={styles.itemData}>{this.getPayAndWithdrawMoneyRebate()}元</Text></Text>
                        <Text style={{color: "#F9CB46", marginTop:12,
                            fontSize: Size.font14,alignItems: 'flex-end'}}>总计金额：<Text style={styles.itemCyanTxt}>{this.getPayAndWithdrawMoney()}元</Text></Text>

                    </View>
                </View>
            </View>
        );
    };

    changeLayout = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        this.setState({ expanded: !this.state.expanded });
    }

    /**
     * 用户充值提现转账
     * @param accountType：0-提现， 1-充值， 2-转账
     */
    getPayOrWithdraw(accountType){
        if(accountType == 1)
        {
            return(
                <View>
                    <View style={styles.itemStyle}>
                        <Text style={styles.itemLabel}>支付金额：</Text>
                        {this.props.isPayAndWithdrawRecord? this.getPayAndWithdrawMoneyExact() : this.getAccountBalance()}
                    </View>

                    <View style={styles.itemStyle}>
                        <Text style={styles.itemLabel}>优惠金额：</Text>
                        {this.props.isPayAndWithdrawRecord? this.getPayAndWithdrawMoneyRebate() :  this.getAccountBalance()}
                    </View>

                    <View style={styles.itemStyle}>
                        <Text style={styles.itemLabel}>总计金额：</Text>
                        {this.props.isPayAndWithdrawRecord ? this.getPayAndWithdrawMoney() : this.getAccountBalance()}
                    </View>
                </View>
            )
        }
    }

    getBalance() {
        let type = this.props.rowData.type
        let balance = this.props.rowData.amount
        if (type === 'WITHDRAWAL') {
            return (<Text>{'- ' + (balance).toFixed(2)}</Text>)
        } else if (type === 'TOPUP' || type === 'TOPUP_FOR_CANCEL_WITHDRAWAL') {
            return (<Text>{'+ ' + (balance).toFixed(2)}</Text>)
        }
    }

    /**
     * 获取指定时间格式
     * @returns {string}
     */
    getTime() {
        return Moment(this.props.rowData.createTime).format("YYYY-MM-DD HH:mm:ss")
    }

    /**
     * 获取账单类型
     * @returns {*}
     */
    getType() {
        let type = this.props.rowData.type
        if (type === 'WITHDRAWAL') {
            return '提现'
        } else if (type === 'TOPUP') {
            return '充值'
        }
    }

    getState() {
        return this.props.rowData.stateChineseDisplay
    }



    /**
     * 获取支付方式
     * @returns {*}
     */
    getSubType() {
        return this.props.rowData.subTypeChineseDisplay
    }

    /**
     * 格式化订单号
     * @returns {string}
     */
    formatOrderId() {
        return this.props.rowData.transactionId.toString()
    }

    onCopy(text) {
        Clipboard.setString(text);
        Toast.showShortCenter("已复制！")
    }

    getLeftRecord(accountType){
        if(accountType == 0) {
            return(
                <View style={{ height: this.state.expanded ? null : 0, overflow: 'hidden' }}>
                    <Text style={styles.itemBigLabel} >收入：
                        <Text style={styles.itemData}>{this.props.accountType == 0? this.getPayAndWithdrawMoneyExact() : ""}</Text></Text>

                    <Text style={styles.itemLabel}>支付金额：<Text style={styles.itemData}>54543</Text></Text>
                </View>
            )
        }
    }


    /**
     * 获取账单余额
     * @returns {XML}
     */
    getAccountBalance() {
        let balance = this.props.rowData.delta

        if (balance < 0) {
            return (<Text style={styles.itemData}>{(balance).toFixed(2)}</Text>)
        } else {
            return (<Text style={styles.itemData}>{'+' + (balance).toFixed(2)}</Text>)
        }
    }

    /**
     * 获取充值总额金额
     * @returns {XML}
     */
    getPayAndWithdrawMoney() {
        let amount = this.props.rowData.effectiveAmount
        let type = this.props.rowData.type
        TW_Log("amount: "+amount)
        if (type === 'WITHDRAWAL') {
            return (<Text style={styles.itemData}>{'- ' + (amount).toFixed(2)}</Text>)
        } else if (type === 'TOPUP') {
            return (<Text style={styles.itemData}>{'+ ' + (amount).toFixed(2)}</Text>)
        }
        return amount
    }

    /**
     * 获取充值优惠金额
     * @returns {XML}
     */
    getPayAndWithdrawMoneyRebate(){
        let rebate = this.props.rowData.effectiveAmount - this.props.rowData.amount
        let type = this.props.rowData.type
        if (type === 'WITHDRAWAL') {
            return (<Text style={styles.itemData}>{'- ' + (rebate).toFixed(2)}</Text>)
        } else if (type === 'TOPUP') {
            return (<Text style={styles.itemData}>{'+ ' + (rebate).toFixed(2)}</Text>)
        }
        return rebate
    }

    /**
     * 获取充值支付金额
     * @returns {XML}
     */
    getPayAndWithdrawMoneyExact(){
        let topUp = this.props.rowData.amount
        let type = this.props.rowData.type
        if (type === 'WITHDRAWAL') {
            return (<Text style={styles.itemData}>{'- ' + (topUp).toFixed(2)}</Text>)
        } else if (type === 'TOPUP') {
            return (<Text style={styles.itemData}>{'+ ' + (topUp).toFixed(2)}</Text>)
        }
        return topUp
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: indexBgColor.mainBg,
    },
    itemBigLabel: {
        color: "#F9CB46",
        fontSize: Size.font16
    },
    itemLabel: {
        color: "#F9CB46",
        fontSize: Size.font14
    },
    itemData: {
        color: "#a2e1ee",
        fontSize: Size.font14
    },
    itemStyle: {
        //justifyContent:'space-between',
        flexDirection: 'row',
        //backgroundColor: indexBgColor.itemBg,
        justifyContent:"center",
        alignItems:"center",
        marginTop: 1
    },
    imgNext: {
        width: 10,
        height: 15,
        position: 'absolute',
        top: 23,
        left: width * 0.9
    },
    itemLeftStyle: {
        margin: 10,
        alignSelf: 'flex-start'
    },
    itemRightStyle: {
        marginTop: 10,
        alignItems: 'flex-end'
    }, itemTitle: {
        color: listViewTxtColor.title,
        fontSize: Size.font18
    }, itemContent: {
        marginTop: 5,
        color: listViewTxtColor.content,
        fontSize: Size.font12
    }, orderState: {
        fontSize: Size.small,

    }, orderStateTxt: {
        fontSize: Size.small,
        color: listViewTxtColor.redTip
    }, itemGreenTxt: {
        color: listViewTxtColor.greenTip,
        fontSize: Size.font18
    }, itemRedTxt: {
        color: '#ff002a',
        fontSize: Size.font14
    }, itemCyanTxt: {
        color: '#dbf9ff',
        fontSize: Size.font14,
        paddingTop: 10
    }, itemBtnStyle: {
        paddingLeft: 0
    }, itemBtnTxtStyle: {
        color: copyBtnStyle.txtColor,
        textAlign: 'center',
        paddingTop: 4,
        paddingBottom: 4,
        paddingLeft: 28,
        paddingRight: 8,
        borderWidth: 15,
        borderColor: copyBtnStyle.borderColor,
        borderRadius: 5,
        fontSize: Size.default
    },

});

