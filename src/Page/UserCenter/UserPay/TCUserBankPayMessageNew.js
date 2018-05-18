import React, {Component, PropTypes,} from 'react'

import {
    Alert,
    Clipboard,
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native'

import {observer} from 'mobx-react/native'
import {observable} from 'mobx'
import {
    betHome,
    buttonStyle,
    copyBtnStyle,
    indexBgColor,
    inputStyle,
    listViewTxtColor,
    Size,
    width
} from '../../resouce/theme'
import TopNavigationBar from '../../../Common/View/TCNavigationBar';
import KeyboardAvoidingScrollView from '../../../Common/View/TCKeyboardAvoidingScrollView';
import Toast from '../../../Common/JXHelper/JXToast';
import Dialog from './Dialog'
import RequestUtils from '../../../Common/Network/TCRequestUitls'
import {appId, config} from '../../../Common/Network/TCRequestConfig'
import NavigatorHelper from '../../../Common/JXHelper/TCNavigatorHelper'
import LoadingSpinnerOverlay from '../../../Common/View/LoadingSpinnerOverlay'
import DatePicker from '../../../Common/View/datepicker';
import Moment from 'moment'
import _ from 'lodash'
import dismissKeyboard from 'dismissKeyboard'
import {betIcon, common} from '../../resouce/images'
import {withMappedNavigationProps} from 'react-navigation-props-mapper'

/**
 * 银行充值
 */
@observer
@withMappedNavigationProps()
export default class TCUserBankPayMessageNew extends Component {

    transferToupType = 'BANK_ONLINE'//默认网银转账
    stateModel = new StateModel()

    constructor(props) {
        super(props)
        this.money = this.props.transInfo.amount
        this.name = ''
    }

    static defaultProps = {};

    componentDidMount() {
    }


    render() {
        return (
            <View style={styles.container}>
                < TopNavigationBar
                    title={'转账资料'}
                    needBackButton={true}
                    rightTitle={'充值明细'}
                    rightButtonCall={() => {
                        this.gotoPayRecord()
                    }}
                    backButtonCall={() => {
                        this.showBackTip();
                    }}/>
                <KeyboardAvoidingScrollView>
                    <View style={styles.mainItemStyle}>
                        <View style={styles.firstItemStyle}>
                            <Text style={styles.firstItemTxtStyle}>入款确认信息</Text>
                        </View>
                        {this.renderOrderId()}
                        <View style={styles.itemStyle}>
                            <Text style={styles.itemTitleTxtStyle}>存款时间</Text>
                            <View style={{flex:1}}>
                                <DatePicker
                                    ref='datePicker'
                                    style={{backgroundColor: 'transparent'}}
                                    date={this.stateModel.date}
                                    mode="datetime"
                                    format="YYYY-MM-DD HH:mm"
                                    confirmBtnText="确认"
                                    cancelBtnText="取消"
                                    showIcon={false}
                                    is24Hour={true}
                                    customStyles={{
                                        dateIcon: null,
                                        dateInput: {flex: 1, alignItems: 'flex-start', borderWidth: 0,},
                                        dateText: {color: '#000000', fontSize: Size.default, padding: 10, flex: 1}
                                    }}
                                    onDateChange={(date) => {this.stateModel.date = date}}
                                />
                            </View>
                            <TouchableOpacity
                                activeOpacity={0.6}
                                onPress={()=>{this.refs.datePicker.onPressDate()}}
                                style={{width: 53, height: 26, marginRight:12, marginLeft:12, justifyContent: 'center', alignItems: 'center'}}>
                                <Image source={betIcon.orderQingChu} style={{height: 20, width: 20}}/>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.itemStyle}>
                            <Text style={styles.itemTitleTxtStyle}>存入金额</Text>
                            <Text style={[styles.transferNoTxt, {color: '#EC2829', fontSize: Size.font22}]}>{this.props.transInfo.amount}</Text>
                            <TouchableOpacity
                                activeOpacity={0.6}
                                style={styles.itemRightStyle}
                                onPress={() => this.onCopy(this.props.transInfo.amount + '')}>
                                <Text style={styles.itemBtnTxtStyle}>复制</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={[styles.itemStyle, {borderBottomWidth:0}]}>
                            <View style={styles.emptyCircle}><Text style={{fontSize: Size.font10,textAlign:'center',color:'#FF5A3F'}}>!</Text></View>
                            <Text style={styles.itemTipsTxtStyle}>银行转账务必依照系统提供金额进行转账，才能快速到账！</Text>
                        </View>
                        <View style={styles.firstItemStyle}>
                            <Text style={styles.firstItemTxtStyle}>转账收款银行信息</Text>
                        </View>
                        <View style={styles.itemStyle}>
                            <Text style={styles.itemTitleTxtStyle}>收  款  人</Text>
                            <Text style={styles.transferNoTxt}>{this.props.transInfo.receiptName}</Text>
                            <TouchableOpacity
                                activeOpacity={0.6}
                                style={styles.itemRightStyle}
                                onPress={() => this.onCopy(this.props.transInfo.receiptName)}>
                                <Text style={styles.itemBtnTxtStyle}>复制</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.itemStyle}>
                            <Text style={styles.itemTitleTxtStyle}>收款账号</Text>
                            <Text style={styles.transferNoTxt}>{this.props.transInfo.bankCardNo}</Text>
                            <TouchableOpacity
                                activeOpacity={0.6}
                                style={styles.itemRightStyle}
                                onPress={() => this.onCopy(this.props.transInfo.bankCardNo)}>
                                <Text style={styles.itemBtnTxtStyle}>复制</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.itemStyle}>
                            <Text style={styles.itemTitleTxtStyle}>开户网点</Text>
                            <Text style={styles.transferNoTxt}>{this.props.transInfo.bankAddress}</Text>
                            <TouchableOpacity
                                activeOpacity={0.6}
                                style={styles.itemRightStyle}
                                onPress={() => this.onCopy(this.props.transInfo.bankAddress)}>
                                <Text style={styles.itemBtnTxtStyle}>复制</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.itemStyle}>
                            <Text style={styles.itemTitleTxtStyle}>开户银行</Text>
                            <Text style={styles.transferNoTxt}>{this.props.transInfo.bankName}</Text>
                            <TouchableOpacity
                                activeOpacity={0.6}
                                style={styles.itemRightStyle}
                                onPress={() => this.onCopy(this.props.transInfo.bankName)}>
                                <Text style={styles.itemBtnTxtStyle}>复制</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={[styles.itemStyle, {borderBottomWidth:0}]}>
                            <View style={styles.emptyCircle}><Text style={{fontSize:Size.font10,textAlign:'center',color:'#FF5A3F'}}>!</Text></View>
                            <Text style={styles.itemTipsTxtStyle}>依照系统提供带有小数点金额，进行汇款可快速自动到账！</Text>
                        </View>
                        <View style={styles.firstItemStyle}>
                            <Text style={styles.firstItemTxtStyle}>存款人</Text>
                        </View>
                        <View style={[styles.itemStyle, {marginLeft: 0, paddingRight: 0}]}>
                            <Text style={[styles.itemTitleTxtStyle, {marginLeft:16}]}>存款人姓名</Text>
                            <TextInput style={[styles.inputTxtStyle]}
                                       ref='textInputRefer'
                                       underlineColorAndroid='transparent'
                                       placeholder={'请输入您的姓名...'}
                                       placeholderTextColor='#BCBBC1'
                                       multiline={false}
                                       maxLength={12}
                                       onSubmitEditing={() => {
                                           dismissKeyboard();
                                       }}
                                       onChangeText={(text) => {
                                           this.changeName(text)
                                       }}/>
                            <TouchableOpacity
                                activeOpacity={0.6}
                                onPress={()=>{this.refs.textInputRefer.clear(); this.changeName('')}}
                                style={{alignItems: 'center', justifyContent: 'center',width:53, height:40, marginRight:6}}>
                                <Image source={betIcon.orderQingChu} style={{height: 20, width: 20}}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.btmStyle}>
                        <View style={{alignItems: 'center'}}>
                            <TouchableOpacity
                                activeOpacity={0.6}
                                style={styles.bottomBarButtonStyle}
                                onPress={() => {NavigatorHelper.popToBack()}}>
                                <Text style={{color: buttonStyle.btnTxtColor, fontWeight: 'bold', fontSize: Size.font17}}>
                                    上一步
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{alignItems: 'center', marginLeft: 30}}>
                            <TouchableOpacity
                                activeOpacity={0.6}
                                style={styles.bottomBarButtonStyle}
                                onPress={() => this.submitPay()}>
                                <Text style={{color: buttonStyle.btnTxtColor, fontWeight: 'bold', fontSize: Size.font17}}>
                                    我已转账
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <Dialog
                            ref='Dialog'
                            dialogTitle={'温馨提示'}
                            dialogContent={'是否已记住转账信息？'}
                            leftTxt={'是'}
                            btnTxt={'否'}
                            show={false}
                            rightBtnClick={() => this.setModalVisible()}
                            leftBtnClick={() => this.submitPay()}
                        />
                        <LoadingSpinnerOverlay
                            ref={component => this._modalLoadingSpinnerOverLay = component}/>
                    </View>
                </KeyboardAvoidingScrollView>
            </View>
        )
    }

    renderOrderId() {
        if (this.props.transInfo.transactionNo) {
            return (
                <View style={styles.itemStyle}>
                    <Text style={styles.itemTitleTxtStyle}>订  单  号</Text>
                    <Text style={styles.transferNoTxt}>{this.props.transInfo.transactionNo}</Text>
                    <TouchableOpacity
                        activeOpacity={0.6}
                        style={styles.itemRightStyle}
                        onPress={() => this.onCopy(this.props.transInfo.bankName)}>
                        <Text style={styles.itemBtnTxtStyle}>复制</Text>
                    </TouchableOpacity>
                </View>
            )
        }
    }

    showBackTip() {
        Alert.alert('您确定退出充值吗？', '请确保已支付完成再退出!', [
            {
                text: '确定',
                onPress: () => {
                    NavigatorHelper.popToBack();
                }
            },
            {
                text: '取消',
                onPress: () => {

                }
            }
        ]);
    }

    /**
     * 获取随机订单号
     */
    getRandomOrderNo() {
        let nowTime = Moment().format('x');
        let math = _.random(99999, 1000000);
        return nowTime + math
    }

    /**
     * 显示或隐藏提示框
     */
    setModalVisible() {
        let dialog = this.refs.Dialog
        if (dialog.state.modalVisible) {
            dialog._setModalVisible(false);
        } else {
            dialog._setModalVisible(true);
        }
    }

    /**
     * 修改名字
     * @param text
     */
    changeName(text) {
        this.name = text
    }

    changeMoney(text) {
        if (text.length === 0) {
            this.money = this.props.transInfo.amount
        } else {
            this.money = text
        }
    }

    /**
     * copy
     * @param text
     */
    onCopy(text) {
        Clipboard.setString(text);
        Toast.showShortCenter("已复制！")
    }

    /**
     * 验证输入
     * @returns {boolean}
     */
    validateInfo() {
        let reg = /^[0-9]+([.]{1}[0-9]{1,2})?$/
        let m = this.money + ''
        if (!m.match(reg)) {
            Toast.showShortCenter('您输入的金额格式不正确!')
            return false
        }
        reg = /^([\u4e00-\u9fa5]{1}([·•● ]?[\u4e00-\u9fa5]){1,14})$|^[a-zA-Z\s]{4,30}$/
        let temp = this.name + ''
        if (!temp.match(reg)) {
            Toast.showShortCenter("请输入正确的存款人姓名!")
            return false
        }
        return true
    }

    /**
     * 提交转账请求
     */
    submitPay() {
        if (!this.validateInfo()) {
            return
        }
        this._modalLoadingSpinnerOverLay.show()
        let params = {
            adminBankId: this.props.adminBankId,
            topupAmount: this.money,
            topupCardRealname: this.name,
            topupTime: this.stateModel.date,
            transferToupType: this.transferToupType,
            paymentPlatformOrderNo: this.props.transInfo.transactionNo ? this.props.transInfo.transactionNo : this.getRandomOrderNo(),
            thirdOrderNo: this.props.transInfo.thirdOrderNo,
            id: appId
        }
        RequestUtils.PutUrlAndParamsAndCallback(config.api.banktransfersQueryv3, params, (response) => {
            this._modalLoadingSpinnerOverLay.hide()
            if (response.rs) {
                this.gotoProgress(response.content.topupAmount)
            } else {
                if (response.status === 500) {
                    Toast.showShortCenter('服务器出错啦!')
                } else {
                    if (response.message) {
                        Toast.showShortCenter(response.message)
                    } else {
                        Toast.showShortCenter('转账确认失败,请您联系客服!')
                    }
                }
            }
        })
    }

    gotoProgress(money) {
        NavigatorHelper.pushToUserPayProgress({topupAmount: money});
    }

    /**
     * 跳转到充值历史界面
     */
    gotoPayRecord() {
        NavigatorHelper.pushToUserPayAndWithDraw(1)
    }
}

@observer
class PayTypeView extends Component {

    bankPays = [{typeId: 0, typeName: '网银转账', typeCode: 'BANK_ONLINE'},
        {typeId: 1, typeName: 'ATM自动柜员机', typeCode: 'BANK_ATM'},
        {typeId: 2, typeName: 'ATM现金入款', typeCode: 'BANK_ATM_CASH'},
        {typeId: 3, typeName: '银行柜台转账', typeCode: 'BANK_COUNTER'},
        {typeId: 4, typeName: '手机银行转账', typeCode: 'BANK_PHONE'},
        {typeId: 5, typeName: '其他', typeCode: 'OTHER'}]
    @observable
    selectTypeId = 0

    render() {
        let views = []
        this.bankPays.map((item, index) => {
            views.push(<TouchableOpacity
                style={styles.itemContainer}
                key={index + '110'}
                onPress={() => {
                    this.checkPayType(item)
                }}>
                <Image
                    source={this.selectTypeId === item.typeId ? common.select : common.unSelect}
                    style={styles.itemImageStyle}/>
                <View style={{marginLeft: 10, justifyContent: 'center', width: width / 2 - 80}}>
                    <Text
                        style={{
                            color: listViewTxtColor.title,
                            fontSize: Size.default
                        }}> {item.typeName} </Text>
                </View>
            </TouchableOpacity>)
        })
        return (<View style={styles.listViewStyle}>{views}</View>)
    }

    checkPayType(item) {
        this.selectTypeId = item.typeId
        this.props.btnClick && this.props.btnClick(item.typeCode)
    }
}


class StateModel {
    @observable
    date = Moment().format('YYYY-MM-DD HH:mm:ss')
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: indexBgColor.mainBg,
    },
    bottomBarButtonStyle: {
        width: 160,
        height: 40,
        backgroundColor: buttonStyle.btnBg,
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 4,
        marginTop: 30
    },
    mainItemStyle: {
        backgroundColor: indexBgColor.itemBg,
    },
    firstItemStyle: {
        borderBottomWidth: 1,
        borderBottomColor: '#BCBBC1',
        backgroundColor: '#EFEFF4'
    },
    firstItemTxtStyle: {
        color: '#8E8E93',
        paddingLeft: 16,
        paddingTop: 14,
        paddingBottom: 6,
        fontSize: Size.default,
    },
    itemStyle: {
        width: width,
        height: 40,
        flexDirection: 'row',
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: '#BCBBC1',
        alignItems: 'center',
        marginLeft: 16,
        paddingRight: 12
    },
    itemTitleTxtStyle: {
        fontSize: Size.default,
        paddingTop: 9,
        paddingBottom: 9,
        color: '#8E8E93',
        width: 103
    },
    itemTipsTxtStyle: {
        fontSize: Size.font12,
        color: '#EC2829',
        flex: 1
    },
    transferNoTxt: {
        color: '#000000',
        fontSize: Size.default,
        padding: 10,
        flex: 1
    },
    itemBtnStyle: {
        marginRight: 20,
    },
    itemBtnTxtStyle: {
        width: 53,
        height: 26,
        color: copyBtnStyle.txtColor,
        borderWidth: 1,
        borderColor: copyBtnStyle.borderColor,
        borderRadius: 5,
        textAlign: 'center',
        textAlignVertical: 'center'
    },
    itemRightStyle: {
        marginRight: 12,
        marginLeft: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    btmStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 30
    },
    tipBtmTxt: {
        color: 'red',
        margin: 10
    },
    inputStyle: {
        height: 40,
        alignItems: 'center',
        justifyContent: 'center'
    },
    inputTxtStyle: {
        flex: 1,
        paddingLeft: 10,
        paddingRight: 10,
        borderColor: 'transparent',
        fontSize: Size.default,
        color: inputStyle.inputTxt
    },
    inputViewStyle: {
        borderColor: inputStyle.inputBorder,
        width: width * 0.58,
        borderWidth: 0.5,
        height: 30,
        padding: 4,
    },
    textStyle: {
        fontSize: Size.default,
        color: inputStyle.inputTxt
    },
    itemContainer: {
        flexDirection: 'row',
        height: 50,
        width: width / 2 - 20,
        alignItems: 'center',
        backgroundColor: indexBgColor.itemBg,
        marginBottom: 0.5,
        marginLeft: 20
    },
    itemImageStyle: {
        flexDirection: 'row',
        width: 20,
        height: 20,
        paddingLeft: 10,
    },
    listViewStyle: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        width: width,
    },
    listDivider: {height: 1, backgroundColor: '#BCBBC1', marginLeft: 16},
    emptyCircle: {
        marginRight: 8,
        alignItems: 'center',
        justifyContent: 'center',
        width: 14,
        height: 14,
        borderColor: '#FF5A3F',
        borderStyle: 'solid',
        borderRadius: 7,
        borderWidth: 1
    },
    solidCircle: {
        marginRight: 8,
        alignItems: 'center',
        justifyContent: 'center',
        width: 12,
        height: 12,
        backgroundColor: '#8E8E93',
        borderColor: '#8E8E93',
        borderStyle: 'solid',
        borderRadius: 6
    }
})
