import React, {Component} from "react";
import {Image, Clipboard, StyleSheet, Text, TouchableOpacity, View} from "react-native";

import {ASSET_Images} from "../../../asset";
import TCImage from "../../../../Common/View/image/TCImage";
import {TCButtonImg} from "../../../../Common/View/button/TCButtonView";
import {TCTextInput} from "../../../../Common/View/TCTextInput";
import BtnMoneyView from "./BtnMoneyView";
import {observer} from "mobx-react";

import PropTypes from "prop-types";
import TCFlatList from "../../../../Common/View/RefreshListView/TCFLatList";
import {userPay} from "../../../asset/images";
import {copyBtnStyle, indexBgColor, listViewTxtColor, payTxtColor, Size, width} from "../../../resouce/theme";
import payHelper from "../../../UserCenter/UserPay/PayHelper";
import UserPayStore from "../../../../Data/store/UserPayStore";
import BaseGameAlert from "../GameMoneyInView";
import Toast from '../../../../Common/JXHelper/JXToast';
import ModalInputDialog from "../../../../Common/View/ModalInputDialog";
import ModalList from "../../../UserCenter/UserPay/View/ModalList";
import TCButtonView from "../../../UserCenter/UserPay/TCUserPayNew";
import TCUserPayProgress from "../../../UserCenter/UserPay/TCUserPayProgress";

@observer
export default class GamePayStepOne extends Component {
    userPayStore = new UserPayStore();

    static propTypes = {
        itemData:PropTypes.any,
        type: PropTypes.any
    }
    isTop = false;
    isChange = true;
    static defaultProps = {
        type: "",
        itemData:{}
    }


    constructor(prop) {
        super(prop)
        this.state = {
            money: "",
            selectItem:null,
            showArrow:true
        }
        this.moneyList = [100, 300, 500, 1000, 5000, 10000, 20000, 30000, 40000, 50000]
    }

    componentDidMount(): void {
        setTimeout(()=>{
            this.setState({test:""})
        },1000)

    }
    componentWillReceiveProps(newProps) {
        this.isChange = newProps.isChange;
    }


    render() {
        let {itemData} = this.props;
        let payList = TW_Store.userPayTypeStore.getPayList(itemData.code);
        let promotionHeight = (itemData.promotionTips != null) ? 10 : 0
        payHelper.props = itemData;
        let marginTop = (itemData.code.indexOf("FIXED") === -1 && itemData.code != "VIP") ? 160 + promotionHeight : promotionHeight
        let height = itemData.code.indexOf("FIXED") === -1 && itemData.code != "VIP" ? SCREEN_H - 220 - promotionHeight : SCREEN_H - 55 - promotionHeight
        if (this.isChange) {
            this.scrollListToStart();
        }
        return (<View style={styles.container}>
            {
                (itemData.promotionTips != null) ?
                    (<Text style={{color: "#FFBA25", fontSize: 16, textAlign: 'center'}}
                    >{itemData.promotionTips}</Text>) : null
            }
            {
                (itemData.code.indexOf("FIXED") === -1 && itemData.code != "VIP") ? (<View>
                    <TCImage source={ASSET_Images.gameUI.stepOneBg1}
                             style={{
                                 position: "absolute",
                                 left: 2,
                                 top: promotionHeight
                             }}
                             resizeMode={'contain'}/>

                    <TCTextInput onChangeText={this.onInputChage} value={`${this.state.money}`}
                                 viewStyle={{position: "absolute", left: 165, top: promotionHeight + 6}}
                                 placeholder={"请输入金额"}
                                 keyboardType={"numeric"}
                                 inputStyle={[styles.inputStyle, {fontSize: 14, textAlign: "center"}]}
                                 placeholderTextColor={"rgb(132,168,168)"}
                                 maxLength={12}/>
                    <View style={{
                        position: "absolute",
                        left: 2,
                        top: promotionHeight + 28,
                        flexDirection: "row",
                        flexWrap: "wrap",
                        width: SCREEN_W - 250
                    }}>
                        {this.moneyList.map((item, index) => {
                            return <BtnMoneyView key={"index" + index} style={{marginHorizontal: 1, marginBottom: 2}}
                                                 data={item}
                                                 onClick={this.onInputChage}
                                                 isSelect={`${item}` == `${this.state.money}`}/>
                        })}
                    </View>
                    <TCImage source={ASSET_Images.gameUI.stepOneBg2} style={{top: promotionHeight + 135}}
                             resizeMode={'contain'}/>
                    <TCButtonImg imgSource={ASSET_Images.gameUI.btn_onLine}
                                 soundName={TW_Store.bblStore.SOUND_ENUM.enterPanelClick}
                                 btnStyle={{position: "absolute", left: 308, top: promotionHeight + 135}} imgStyle={{}}
                                 onClick={() => {
                                     TW_Store.gameUIStroe.showGusetView(true);
                                 }}/>
                </View>) : null
            }
            <View style={{position: "absolute", top: marginTop + promotionHeight, left: 10}}>
                {payList && payList.length > 0 ?
                    <TCFlatList ref={"payList"} style={{height: height , marginBottom: 0}}
                                dataS={payList}
                                onScroll={this._scroll}
                                renderRow={this.onRenderItemView}/> : this.getEmptyTip()}

            </View>
            <ModalList
                show={this.userPayStore.showList}
                dataList={this.userPayStore.bankList}
                closeModal={() => {
                    this.userPayStore.showList = false;
                }}
                renderRow={(rowData) => this.renderBankList(rowData)}
            />
            <ModalInputDialog
                show={this.userPayStore.showInputName}
                dialogTitle={"存款人信息"}
                btnLeftTxt={"取消"}
                btnRigthTxt={"下一步"}
                content={payHelper.payData}
                btnLeftClick={() => {
                    this.userPayStore.showInputName = false
                }}
                btnRightClick={(inputData) => {
                    let {realname, phoneNum, cardNo} = inputData
                    // let reg = /^([\s\u4e00-\u9fa5]{1}([·•● ]?[\s\u4e00-\u9fa5]){1,14})$|^[a-zA-Z\s]{4,30}$/;
                    // if (payHelper.payData.realNameReq && !realname.match(reg)) {
                    // Toast.showShortCenter("请输入正确的存款人姓名")
                    //     return false;
                    // }
                    // reg = /^134[0-8]\d{7}$|^13[^4]\d{8}$|^14[5-9]\d{8}$|^15[^4]\d{8}$|^16[6]\d{8}$|^17[0-8]\d{8}$|^18[\d]{9}$|^19[8,9]\d{8}$/
                    //
                    // if (payHelper.payData.mobileNoReq && !phoneNum.match(reg)) {
                    //     Toast.showShortCenter("请输入正确的手机号码")
                    //     return false;
                    // }
                    // if (payHelper.payData.cardNoReq && cardNo.length < 14) {
                    //     Toast.showShortCenter("请输入正确的银行卡号")
                    //     return false;
                    // }
                    payHelper.payData.realName = realname ? realname : "";
                    payHelper.payData.mobileNo = phoneNum ? phoneNum : "";
                    payHelper.payData.cardNo = cardNo ? cardNo : "";
                    this.userPayStore.showInputName = false;
                    this.gotoPay(payHelper.payData)
                }}
            />
        </View>)
    }

    scrollList =()=>{
        this.refs.payList&&this.refs.payList.scrollToEnd();
        this.setState({
            showArrow:false
        })
        this.isTop = false;
    }

    scrollListToStart = ()=>{
        if(!this.isTop&&this.isChange){
            this.refs.payList&&this.refs.payList.scrollToTop();
            this.isTop = true;
            this.isChange = false;
        }
    }

    currentY =10000;
    _scroll =(event) =>{
        let y = event.nativeEvent.contentOffset.y;
        if(this.currentY === 10000){
            this.currentY = y;
        }else{
            let dy = y - this.currentY;
            if(!this.state.showArrow&&dy<0){
                this.setState({
                    showArrow:true
                })
                this.isTop = true;
            }else{

                if(y>SCREEN_H - 60){
                    this.setState({
                        showArrow:false
                    })
                }
                this.isTop = false;

            }
        }
    }

    onInputChage=(money)=>{
        this.setState({money: money})
        //TW_Store.bblStore.playSoundByFile(TW_Store.bblStore.SOUND_ENUM.returnLobbyClick)
        payHelper.money = money;
        this.userPayStore.inputMoney = money;
    }

    onRenderItemView = (data, index) => {
        //TW_Log("GamePayStepOne---onRenderItemView--" + index, data);
        let {itemData} = this.props;
        if (itemData.code == 'BANK') {
            let bank = data;
            return (<TouchableOpacity
                onPress={() => {
                    payHelper.bankApplyFor(bank)
                }}>
                <View style={{width: SCREEN_W - 250, height: 120, justifyContent: "center"}}>
                    <TCImage source={ASSET_Images.gameUI.listItemBg}
                             style={{position: "absolute", width: SCREEN_W - 250, height: 110}}/>
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
        } else if (itemData.code == 'VIP') {
            let vip = data;
            return (
                <View style={{width: SCREEN_W - 250, height: 100, justifyContent: "center"}}>
                    <TCImage source={ASSET_Images.gameUI.listItemVIPBg}
                             style={{position: "absolute", width: SCREEN_W - 250, height: 80}}/>
                    <View style={{flexDirection: "row"}}>
                        <Text style={{
                            color: "#F9CB46",
                            fontSize: 14,
                            fontWeight: "bold",
                            marginLeft: 50,
                            marginBottom: 12,
                            width: 200
                        }}>{vip.merchantName}</Text>
                        <TouchableOpacity style={{position: "absolute", top:0, marginLeft: SCREEN_W - 320}}
                                          onPress={()=>this.vipHandler(vip)}>
                            <Image style={styles.button}
                                   source={ASSET_Images.gameUI.btn_copy}/>
                        </TouchableOpacity>
                    </View>
                    <View style={{flexDirection: "row"}}>
                        <Text style={{
                            color: "#A2E1EE",
                            fontSize: 14,
                            marginLeft: 50,
                            marginBottom: 6,
                            flexWrap: 'wrap'
                        }}>{vip.methodName}：</Text>
                        <Text style={{color: "#FFFFFF", fontSize: 14}}>{vip.methodInfo}</Text>
                    </View>
                    <View style={{flexDirection: "row"}}>
                        <Text style={{
                            color: "#A2E1EE",
                            fontSize: 14,
                            marginLeft: 50,
                            flexWrap: 'wrap'
                        }}>{vip.remarks}</Text>
                    </View>
                </View>)
        } else if (itemData.code.indexOf("FIXED") != -1) {
            let paymentItem = data;
            let itemHeight = 0;
            let icon=ASSET_Images.gameUI.payExpand
            let isSelected = this.state.selectItem != null && this.state.selectItem.paymentId === paymentItem.paymentId;
            if (isSelected) {
                icon=ASSET_Images.gameUI.payCollapse
                let rowCount = parseInt(paymentItem.fixedAmount.length / 5);
                if (rowCount === 0) {
                    rowCount = 1;
                } else {
                    let temp = paymentItem.fixedAmount.length % 5;
                    if (temp > 0) {
                        rowCount += 1;
                    }
                }
                itemHeight = 60 * rowCount;
            }

            TW_Log("paymentItemFixed---" + this.state.selectedItem);
            return (
                (<View style={{
                    width: SCREEN_W - 250,
                    height: 40 + itemHeight,
                    alignItems: "center",
                    marginBottom: 5,
                    justifyContent: 'center'
                }}>
                    <TouchableOpacity onPress={() => this.toggle(paymentItem)}>
                        <TCImage source={ASSET_Images.gameUI.fixedListItemBg}
                                 style={{position: "absolute", width: SCREEN_W - 250, height: 40 + itemHeight}}
                                 resizeMode={"stretch"}/>
                        <View style={{
                            width: SCREEN_W - 250,
                            height: 40,
                            alignItems: "center",
                            flexDirection: "row",
                            marginBottom: 5,
                            justifyContent: 'center'
                        }}>
                            <TCImage source={payHelper.getPayTypeIcon(paymentItem.type)}
                                     style={{height: 25, width: 25, marginLeft: 10}}/>
                            <Text
                                style={[styles.itemLable, {
                                    fontSize: 14,
                                    width: SCREEN_W * 0.5 - 170
                                }]}>{paymentItem.type ? paymentItem.merchantName : paymentItem.receiptName}</Text>
                            <View style={{flexDirection: 'row', alignItems: "center",}}>
                                <Text style={{fontSize: 14, color: '#ffffff'}}>金额范围</Text>
                                <TCImage source={ASSET_Images.gameUI.moneyLabelBg}
                                         style={{width: 100, height: 30, marginLeft: 5}} resizeMode={"contain"}/>
                                <Text style={{
                                    position: "absolute",
                                    fontSize: 14,
                                    color: '#ffffff',
                                    left: 65
                                }}>{`￥ ${paymentItem.minAmount}-${paymentItem.maxAmount}`}</Text>
                                <TCButtonImg imgSource={icon}
                                             soundName={TW_Store.bblStore.SOUND_ENUM.enterPanelClick}
                                             btnStyle={{width: 30, height: 30, marginLeft: 10, marginTop: 12}}
                                             resizeMode={"contain"}
                                             onClick={() =>
                                                 this.toggle(paymentItem)
                                             }/>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <View style={{flexDirection: 'row', flexWrap: "wrap", width: SCREEN_W - 250,}}>
                        {
                            isSelected && paymentItem.fixedAmount.map((item, index) => {
                                return <BtnMoneyView key={"index" + index}
                                                     style={{marginHorizontal: 1, marginBottom: 2}}
                                                     data={item}
                                                     onClick={() => {
                                                         payHelper.money = item;
                                                         payHelper.payData = paymentItem;
                                                         payHelper.applayPay(paymentItem.paymentType, null, () => {
                                                         })
                                                     }}
                                />
                            })
                        }
                    </View>
                </View>)
            )
        } else {
            let paymentItem = data;
            TW_Log("paymentItem---", paymentItem)
            return (<TouchableOpacity
                onPress={() => {
                    this.onPressPay(paymentItem)
                }}>
                <View style={{width: SCREEN_W - 250, height: 110, alignItems: "center", flexDirection: "row"}}>
                    <TCImage source={ASSET_Images.gameUI.listItemBg}
                             style={{position: "absolute", width: SCREEN_W - 250, height: 100}} resizeMode={"contain"}/>
                    <TCImage
                        source={paymentItem.type == null ? payHelper.getPayTypeIcon(paymentItem.bankCode) : payHelper.getPayTypeIcon(paymentItem.type)}
                        style={{height: 50, width: 50, marginLeft: 10}}/>
                    <View>
                        <Text
                            style={[styles.itemLable, {
                                fontSize: 14,
                                width: SCREEN_W - 340
                            }]}>{paymentItem.type ? paymentItem.merchantName : paymentItem.receiptName}</Text>
                        <Text style={[styles.itemData, {
                            fontSize: 14,
                            alignSelf: "center",
                            marginLeft: 10
                        }]}>{paymentItem.remarks}</Text>
                    </View>
                </View></TouchableOpacity>)
        }
        return null
    }

    /**
     * 选择固定金额时，显示或隐藏金额详情
     */
    toggle(item) {
        if (this.state.selectItem == null) {
            this.setState({selectItem: item})
        } else {
            this.setState({selectItem: null})
        }
    }

    onPressPay = (paymentItem) => {
        TW_Log("GamePayStepOne---paymentItem--payHelper.validMoney--"+payHelper.validMoney(paymentItem, false),paymentItem)
        TW_Store.bblStore.playSoundByFile(TW_Store.bblStore.SOUND_ENUM.enterPanelClick)
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

        let {initedData}=this.props;
        if(initedData){
            return (
                <View style={styles.emptyTip}>
                    <Image
                        source={userPay.noPayData} style={styles.payErrorImg}/>
                    <Text style={{color: listViewTxtColor.content, fontSize: 11}}>该支付方式目前无法使用</Text>
                    <Text style={{color: listViewTxtColor.content, fontSize: 11}}>敬请谅解!请选择其它支付方式!</Text>
                </View>
            )
        }else {
            return null
        }

    }

    /**
     * 渲染银行列表
     * @param rowData
     * @returns {XML}
     */
    renderBankList(rowData) {
        return (<TouchableOpacity
            onPress={() => {
                if (!rowData.bankType) {
                    this.onPayBankList(rowData.bankValue)
                }
            }}
        >
            <View style={styles.bankItemView}>
                <Text>{rowData.bankName}</Text>
                {this.getBankTypeView(rowData)}
            </View></TouchableOpacity>)
    }

    getBankTypeView=(rowData)=> {
        if (!rowData.bankType) {
            return null;
        }

        if (rowData.bankType.length === 2) {
            return (<View style={{flexDirection: 'row'}}>
                <TCButtonView text="储蓄卡" btnStyle={{marginHorizontal: 5}}
                              onClick={() => this.onPayBankList(rowData.bankValue, 'DC')}/>
                <TCButtonView text="信用卡" btnStyle={{marginHorizontal: 5}}
                              onClick={() => this.onPayBankList(rowData.bankValue, 'CC')}/>
            </View>)
        } else {
            let type = rowData.bankType[0];
            if (type === 'DC') {
                return (<TCButtonView text={'储蓄卡'} btnStyle={{marginHorizontal: 5}}
                                      onClick={() => this.onPayBankList(rowData.bankValue, 'DC')}/>)
            } else {
                return (<TCButtonView text={'信用卡'} btnStyle={{marginHorizontal: 5}}
                                      onClick={() => this.onPayBankList(rowData.bankValue, 'CC')}/>)
            }
        }
    }

    onPayBankList=(bankValue, bankType)=>{
        this.userPayStore.showList = false;
        payHelper.applayPay("THIRD", bankValue, null, bankType);
    }

    /**
     * 处理VIP充值
     * @param rowData
     */
    vipHandler(rowData) {
        Clipboard.setString(rowData.methodInfo);
        if (rowData.vipTopUpType != 'OTHER' && rowData.vipTopUpType != null) {
            TW_Store.bblStore.playSoundByFile(TW_Store.bblStore.SOUND_ENUM.enterPanelClick);
            TW_Store.gameUIStroe.showPrompt(true, null, {
                vipData: rowData, accountType: 2, isBackToTop: false
            });
        } else {
            TW_Store.bblStore.playSoundByFile(TW_Store.bblStore.SOUND_ENUM.click);
            Toast.showShortCenter("已复制！")
        }
    }
}

const styles = StyleSheet.create({
    container: {
        width:SCREEN_W - 200,
        height:SCREEN_H - 88
    },
    inputStyle: {
        fontSize: 11,
        fontWeight: "bold",
        color: "#efe8cd",
        width:150
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
        color: "#F9CB46",
        width: 80,
        fontSize: 14,
        fontWeight: "bold",
        marginLeft: 10,
        marginBottom: 4
    },
    itemData: {
        color: "#9cc5d8",
        fontSize: 14,
        marginRight:50,
        flexWrap:'wrap',
        width:SCREEN_W - 340
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
