import React, {Component} from "react";
import {Image, StyleSheet, Text, TextInputComponent, TouchableOpacity, View} from "react-native";

import {ASSET_Images} from "../../../asset";
import TCImage from "../../../../Common/View/image/TCImage";
import {TCButtonImg} from "../../../../Common/View/button/TCButtonView";
import {TCTextInput} from "../../../../Common/View/TCTextInput";
import BtnMoneyView from "./BtnMoneyView";
import {observer} from "mobx-react/native";

;
import PropTypes from "prop-types";
import TCFlatList from "../../../../Common/View/RefreshListView/TCFLatList";
import {userPay} from "../../../asset/images";
import {copyBtnStyle, indexBgColor, listViewTxtColor, payTxtColor, Size, width} from "../../../resouce/theme";
import payHelper from "../../../UserCenter/UserPay/PayHelper";
import UserPayStore from "../../../../Data/store/UserPayStore";
import BaseGameAlert from "../GameMoneyInView";

@observer
export default class GamePayStepOne extends Component {
    userPayStore = new UserPayStore();

    static propTypes = {
        dataList: PropTypes.any,
        type: PropTypes.any
    }

    static defaultProps = {
        type: "",
        dataList: []
    }


    constructor(prop) {
        super(prop)
        this.state = {
            money: ""
        }
        this.moneyList = [100, 300, 500, 1000, 5000, 10000, 20000, 30000, 40000, 50000]
    }

    componentDidMount(): void {
        setTimeout(()=>{
            this.setState({test:""})
        },1000)
    }

    render() {
        let {type} = this.props;
        let payList = TW_Store.userPayTypeStore.getPayList(type);

        return (<View style={styles.container}>
            <TCImage source={ASSET_Images.gameUI.stepOneBg1}/>

            <TCTextInput onChangeText={this.onInputChage} value={`${this.state.money}`} viewStyle={{position: "absolute", right: 30, top: 5}}
                         placeholder={"充值无上限,可自行填写金额"}
                         keyboardType={"numeric"}
                         inputStyle={[styles.inputStyle, {fontSize: 11}]}
                         placeholderTextColor={"rgb(132,168,168)"}
                         maxLength={20}

            />
            <View style={{position: "absolute", left: 2, top: 28, flexDirection: "row", flexWrap: "wrap", width: 380}}>
                {this.moneyList.map((item, index) => {
                    return <BtnMoneyView key={"index" + index} style={{marginHorizontal: 1, marginBottom: 2}}
                                         data={item}
                                         onClick={this.onInputChage}
                                         isSelect={`${item}` == `${this.state.money}`}/>
                })}
            </View>
            <View style={{position: "absolute", top: 90, left: 24}}>
                {payList.length > 0 ? <TCFlatList style={{height: 120, marginTop: 12}} dataS={payList}
                                                  renderRow={this.onRenderItemView}/> : this.getEmptyTip()}

            </View>
            <TCButtonImg imgSource={ASSET_Images.gameUI.btn_onLine}
                         btnStyle={{position: "absolute", right: 48, top: 88}} onClick={() => {
                TW_Store.gameUIStroe.isShowGuest = true;
            }}/>
            {/*{*/}
                {/*//TW_NavHelp.pushView(JX_Compones.UserAcountPay,{accountType: 0, isBackToTop: true})*/}
                {/*this.state.isShowHistory ? <BaseGameAlert  onClose={this.onShowHistoyView}>*/}
                    {/*<TCUserPayAndWithdrawRecordsMain onBack={this.onShowHistoyView}  accountType={1} isBackToTop={false}/>*/}
                {/*</BaseGameAlert>:null*/}
            {/*}*/}

        </View>)
    }



    onInputChage=(money)=>{
        this.setState({money: money})
        payHelper.money = money;
        this.userPayStore.inputMoney = money;
    }

    onRenderItemView = (data, index) => {
        TW_Log("GamePayStepOne---onRenderItemView--" + index, data);
        let {type} = this.props;
        if (type == 'BANK') {
            let bank = data;
            return (<TouchableOpacity
                onPress={() => {
                    payHelper.bankApplyFor(bank)
                }}>
                <View style={{width: 320, height: 100, justifyContent: "center"}}>
                    <TCImage source={ASSET_Images.gameUI.listItemBg}
                             style={{position: "absolute", width: 350, height: 100}}/>
                    <View style={{flexDirection: "row"}}>
                        <Text style={styles.itemLable}>收款银行</Text>
                        <Text style={styles.itemData}>{bank.bankName}</Text>
                    </View>
                    <View style={{flexDirection: "row"}}>
                        <Text style={styles.itemLable}>收款人</Text>
                        <Text style={styles.itemData}>{bank.receiptName}</Text>
                    </View>
                    <View style={{flexDirection: "row"}}>
                        <Text style={styles.itemLable}>收款支行</Text>
                        <Text style={styles.itemData}>{bank.bankAddress}</Text>
                    </View>
                    <View style={{flexDirection: "row"}}>
                        <Text style={styles.itemLable}>汇款资讯</Text>
                        <Text style={styles.itemData}>{bank.remarks}</Text>
                    </View>
                </View>
            </TouchableOpacity>)
        } else {
            let paymentItem = data;
            return (<TouchableOpacity
                onPress={() => {
                    this.onPressPay(paymentItem)
                }}><View style={{width: 320, height: 100, alignItems: "center", flexDirection: "row"}}>
                <TCImage source={ASSET_Images.gameUI.listItemBg}
                         style={{position: "absolute", width: 350, height: 100}}/>
                <TCImage source={payHelper.getPayTypeIcon(type)} style={{height: 50, width: 50, marginLeft: 10}}/>
                <View>
                    <Text
                        style={[styles.itemLable, {fontSize: 12}]}>{paymentItem.type ? paymentItem.merchantName : paymentItem.receiptName}</Text>
                    <Text style={[styles.itemData, {fontSize: 10, alignSelf: "center"}]}>{paymentItem.remarks}</Text>
                </View>
            </View></TouchableOpacity>)

        }
        return null
    }

    onPressPay = (paymentItem) => {
        if (!payHelper.isFixedPay() && !payHelper.validMoney(paymentItem, false))
            return
        if (this.inputUserName(paymentItem)) {
            this.userPayStore.showInputName = true
            payHelper.payData = paymentItem
        } else {
            payHelper.payData = {};
            this.gotoPay(paymentItem)
        }
    }

    gotoPay(rowData) {
        payHelper.payItemSelected(rowData, (res) => {
            if (res) {
                this.userPayStore.showList = true;
                this.userPayStore.bankList = res;
            }
        })
    }

    inputUserName(rowData) {
        if (rowData.realNameReq || rowData.mobileNoReq || rowData.cardNoReq) {
            return true;
        } else {
            return false;
        }
    }



    /**
     * 当数据为空时提示
     * @returns {XML}
     */
    getEmptyTip = () => {

        return (
            <View style={styles.emptyTip}>
                <Image
                    source={userPay.noPayData} style={styles.payErrorImg}/>
                <Text style={{color: listViewTxtColor.content, fontSize: 11}}>该支付方式目前无法使用</Text>
                <Text style={{color: listViewTxtColor.content, fontSize: 11}}>敬请谅解!请选择其它支付方式!</Text>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {},
    inputStyle: {
        fontSize: 11,
        fontWeight: "bold",
        color: "#efe8cd"
    },
    emptyTip: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        marginLeft: 50

    }, payErrorImg: {
        height: 75,
        width: 100,
    },
    itemLable: {
        color: "#efe8cd",
        width: 100,
        fontSize: 11,
        fontWeight: "bold",
        marginLeft: 20,
        marginBottom: 4
    },
    itemData: {
        color: "#9cc5d8",
        fontSize: 11,
    },
    itemMainStyle: {
        backgroundColor: payTxtColor.itemMainStyle,
        borderRadius: 5,
        margin: 10,
        flexDirection: 'row',
    }, itemTitleStyleTxt: {
        color: payTxtColor.itemTitleStyleTxt,
        fontSize: Size.default,
        paddingLeft: 10,
        paddingTop: 10,
    }, itemLeftStyle: {
        padding: 10
    }, itemTitleRightStyle: {
        color: payTxtColor.itemTitleRightStyleTxt,
        fontSize: Size.default,
        paddingLeft: 10,
        paddingTop: 10,
        width: width * 0.58
    }, itemRightViewStyle: {
        alignItems: 'center',
        justifyContent: 'center',
    }, bankRowStyle: {
        flexDirection: 'row',
    }, payItemStyle: {
        flexDirection: 'row',
        backgroundColor: payTxtColor.payItemStyleBg,
        borderRadius: 5,
        marginBottom: 10,
        marginLeft: 10,
        marginRight: 10,
        padding: 10,
        alignItems: 'center'
    }, payTypeTitleStyle: {
        fontSize: Size.large,
        color: payTxtColor.payTypeTitleStyleTxt
    }, bankItemView: {
        paddingVertical: 10,
        paddingLeft: 10,
        borderBottomWidth: 1,
        borderBottomColor: payTxtColor.bankItemView,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center'
    },
    inputHolder: {
        color: payTxtColor.inputHolderTxt
    }, itemBtnTxtStyle: {
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

});