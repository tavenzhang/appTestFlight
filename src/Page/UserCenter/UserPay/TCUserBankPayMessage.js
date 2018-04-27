import React, {Component, PropTypes,} from 'react'

import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    Image,
    ListView,
    ScrollView,
    Clipboard,
    Platform,
    TextInput,
    Alert
} from 'react-native'

import {observer} from 'mobx-react/native'
import {observable, computed, action} from 'mobx'
import {
    Size,
    indexBgColor,
    width,
    height,
    listViewTxtColor,
    buttonStyle,
    copyBtnStyle,
    inputStyle
} from '../../resouce/theme'
import TopNavigationBar from '../../../Common/View/TCNavigationBar';
import  PayProgress from './TCUserPayProgress'
import KeyboardAvoidingScrollView from '../../../Common/View/TCKeyboardAvoidingScrollView';
import Toast from '../../../Common/JXHelper/JXToast';
import Dialog from './Dialog'
import RequestUtils from '../../../Common/Network/TCRequestUitls'
import {config, appId} from '../../../Common/Network/TCRequestConfig'
import NavigatorHelper from '../../../Common/JXHelper/TCNavigatorHelper'
import LoadingSpinnerOverlay from '../../../Common/View/LoadingSpinnerOverlay'
import DatePicker from '../../../Common/View/datepicker';
import Moment from 'moment'
import _ from 'lodash'
import dismissKeyboard from 'dismissKeyboard'
import {common} from '../../resouce/images'
/**
 * 银行充值
 */
@observer
export default class TCUserBankPayMessage extends Component {

    transferToupType = 'BANK_ONLINE'//默认网银转账
    stateModel = new StateModel()

    constructor(props) {
        super(props)
        this.money = this.props.money
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
                            <Text style={styles.firstItemTxtStyle}>收款账号信息</Text>
                        </View>
                        <View style={styles.itemStyle}>
                            <View><Text style={styles.itemTitleTxtStyle}>收款银行</Text></View>
                            <View><Text style={styles.transferNoTxt}>{this.props.bank.bankName}</Text></View>
                            <TouchableOpacity
                                style={styles.itemRightStyle}
                                onPress={() => this.onCopy(this.props.bank.bankName)}>
                                <View style={styles.itemBtnStyle}>
                                    <Text style={styles.itemBtnTxtStyle}>复制</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.itemStyle}>
                            <View><Text style={styles.itemTitleTxtStyle}>{'收 款 人  '}</Text></View>
                            <View><Text style={styles.transferNoTxt}>{this.props.bank.receiptName}</Text></View>
                            <TouchableOpacity
                                style={styles.itemRightStyle}
                                onPress={() => this.onCopy(this.props.bank.receiptName)}>
                                <View style={styles.itemBtnStyle}>
                                    <Text style={styles.itemBtnTxtStyle}>复制</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.itemStyle}>
                            <View><Text style={styles.itemTitleTxtStyle}>收款账号</Text></View>
                            <View><Text style={styles.transferNoTxt}>{this.props.bank.bankCardNo}</Text></View>
                            <TouchableOpacity
                                style={styles.itemRightStyle}
                                onPress={() => this.onCopy(this.props.bank.bankCardNo)}>
                                <View style={styles.itemBtnStyle}>
                                    <Text style={styles.itemBtnTxtStyle}>复制</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.itemStyle}>
                            <View><Text style={styles.itemTitleTxtStyle}>开户网点</Text></View>
                            <View><Text style={styles.transferNoTxt}>{this.props.bank.bankAddress}</Text></View>
                            <TouchableOpacity
                                style={styles.itemRightStyle}
                                onPress={() => this.onCopy(this.props.bank.bankAddress)}>
                                <View style={styles.itemBtnStyle}>
                                    <Text style={styles.itemBtnTxtStyle}>复制</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.mainItemStyle}>
                        <View style={styles.itemStyle}>
                            <View><Text style={styles.itemTitleTxtStyle}>存入时间{'    '}</Text></View>
                            <View>
                                <DatePicker
                                    style={{width: width * 0.58, backgroundColor: inputStyle.inputBg}}
                                    date={this.stateModel.date}
                                    mode="datetime"
                                    format="YYYY-MM-DD HH:mm"
                                    confirmBtnText="确认"
                                    cancelBtnText="取消"
                                    showIcon={false}
                                    is24Hour={true}
                                    customStyles={{
                                        dateIcon: null,
                                        dateInput: {
                                            height: 30,
                                            borderColor: inputStyle.inputBorder,
                                            borderWidth: 0.5,
                                            alignItems: 'flex-start',
                                            backgroundColor: inputStyle.inputBg
                                        },
                                        dateText: {
                                            width: width * 0.58 - 2,
                                            height: 29,
                                            padding: 5,
                                            color: inputStyle.inputTxt
                                        }
                                    }}
                                    onDateChange={(date) => {
                                        this.stateModel.date = date
                                    }}
                                />
                            </View>
                        </View>
                        <View style={styles.itemStyle}>
                            <View><Text style={styles.itemTitleTxtStyle}>存入金额{'    '}</Text></View>
                            <View style={styles.inputStyle}>
                                <TextInput
                                    style={styles.inputTxtStyle}
                                    keyboardType={'numeric'}
                                    underlineColorAndroid='transparent'
                                    maxLength={6}
                                    placeholderTextColor={inputStyle.inputTxt}
                                    placeholder={this.props.money + ''}
                                    onChangeText={(text) => {
                                        this.changeMoney(text)
                                    }}
                                    onSubmitEditing={() => {
                                        dismissKeyboard();
                                    }}
                                    multiline={false}
                                /></View>
                        </View>
                        <View style={styles.itemStyle}>
                            <View><Text style={styles.itemTitleTxtStyle}>存款人姓名</Text></View>
                            <View style={styles.inputStyle}>
                                <TextInput
                                    style={styles.inputTxtStyle}
                                    underlineColorAndroid='transparent'
                                    multiline={false}
                                    maxLength={30}
                                    onSubmitEditing={() => {
                                        dismissKeyboard();
                                    }}
                                    onChangeText={(text) => {
                                        this.changeName(text)
                                    }}/>
                            </View>
                        </View>
                    </View>
                    <View style={styles.mainItemStyle}>
                        <PayTypeView btnClick={(typeCode) => {
                            this.transferToupType = typeCode
                        }}/>
                    </View>
                    <View style={styles.btmStyle}>
                        <View style={{alignItems: 'center', marginBottom: 20}}>
                            <TouchableOpacity
                                style={[styles.bottomBarButtonStyle, {paddingLeft: 25, paddingRight: 25}]}
                                onPress={() => {
                                    this.props.navigator.pop()
                                }}>
                                <Text style={{color: buttonStyle.btnTxtColor, fontWeight: 'bold'}}>
                                    上一步
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{alignItems: 'center', marginBottom: 20, marginLeft: 30}}>
                            <TouchableOpacity
                                style={styles.bottomBarButtonStyle}
                                onPress={() => this.submitPay()}>
                                <Text style={{color: buttonStyle.btnTxtColor, fontWeight: 'bold'}}>
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
                            ref={ component => this._modalLoadingSpinnerOverLay = component }/>
                    </View>
                </KeyboardAvoidingScrollView>
            </View>
        )
    }

    showBackTip() {
        Alert.alert('您确定退出充值吗？', '请确保已支付完成再退出!', [
            {
                text: '确定',
                onPress: () => {
                    this.props.navigator.pop()
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
        if (text.length == 0) {
            this.money = this.props.money
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
            paymentPlatformOrderNo: this.getRandomOrderNo(),
            id: appId
        }
        RequestUtils.PutUrlAndParamsAndCallback(config.api.banktransfersQueryv3, params, (response) => {
            this._modalLoadingSpinnerOverLay.hide()
            if (response.rs) {
                this.gotoProgress()
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

    gotoProgress() {
        let {navigator} = this.props;
        if (navigator) {
            navigator.push({
                name: 'payProgress',
                component: PayProgress,
                passProps: {
                    topupAmount: this.money,
                    ...this.props,
                }
            })
        }
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
                <View style={{marginLeft: 10, justifyContent: 'center', width: width / 2 - 80} }>
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
        backgroundColor: buttonStyle.btnBg,
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 4,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 20,
        paddingRight: 20,
        marginTop: 40
    }, mainItemStyle: {
        backgroundColor: indexBgColor.itemBg,
        marginTop: 10
    }, firstItemTxtStyle: {
        color: listViewTxtColor.title,
        paddingLeft: 5,
        fontSize: Size.default
    }, firstItemStyle: {
        borderBottomWidth: 1,
        borderBottomColor: indexBgColor.itemBg,
        padding: 10
    }, itemStyle: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: indexBgColor.itemBg,
        alignItems: 'center',
        paddingLeft: 10
    }, itemTitleTxtStyle: {
        fontSize: Size.default,
        padding: 10,
        color: listViewTxtColor.title
    },
    transferNoTxt: {
        color: listViewTxtColor.content,
        fontSize: Size.default,
        padding: 10,
        width: width * 0.58
    },
    itemBtnStyle: {
        marginRight: 10,

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
    }, itemRightStyle: {
        marginRight: 20,
        alignItems: 'center',

    }, btmStyle: {
        flexDirection: 'row',
        justifyContent: 'center'
    }, tipBtmTxt: {
        color: 'red',
        margin: 10
    }, inputStyle: {
        height: 40,
        alignItems: 'center',
        justifyContent: 'center'
    }, inputTxtStyle: {
        borderColor: inputStyle.inputBorder,
        width: width * 0.58,
        borderWidth: 0.5,
        height: 30,
        padding: 4,
        fontSize: Size.default,
        color: inputStyle.inputTxt
    }, inputViewStyle: {
        borderColor: inputStyle.inputBorder,
        width: width * 0.58,
        borderWidth: 0.5,
        height: 30,
        padding: 4,
    }, textStyle: {
        fontSize: Size.default,
        color: inputStyle.inputTxt
    }, itemContainer: {
        flexDirection: 'row',
        height: 50,
        width: width / 2 - 20,
        alignItems: 'center',
        backgroundColor: indexBgColor.itemBg,
        marginBottom: 0.5,
        marginLeft: 20
    }, itemImageStyle: {
        flexDirection: 'row',
        width: 20,
        height: 20,
        paddingLeft: 10,
    }, listViewStyle: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        width: width,
    },
})
