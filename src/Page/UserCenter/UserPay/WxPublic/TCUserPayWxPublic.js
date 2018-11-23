/**
 * Created by allen-jx on 2017/10/23.
 */
import React, {Component} from "react";
import {
    Image,
    Linking,
    NativeModules,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import {observer,} from 'mobx-react/native'
import {action, observable, computed} from 'mobx'
import {
    buttonStyle, copyBtnStyle,
    indexBgColor,
    listViewTxtColor, loginAndRegeisterTxtColor,
    payTxtColor,
    Size,
    width
} from '../../../resouce/theme'
import {userPay} from '../../../asset/images'
import TopNavigationBar from "../../../../Common/View/TCNavigationBar";
import TCKeyboardView from "../../../../Common/View/TCKeyboardView";
import LoadingSpinnerOverlay from "../../../../Common/View/LoadingSpinnerOverlay";
import NavigatorHelper from "../../../../Common/JXHelper/TCNavigatorHelper";
import dismissKeyboard from 'dismissKeyboard'
import WxPublicPay from './TCUserWXPublicPay'
import {withMappedNavigationProps} from "react-navigation-props-mapper";
import JXHelper from "../../../../Common/JXHelper/JXHelper";

/**
 * 提示对话框
 */
@withMappedNavigationProps()
@observer
export default class TCUserPayWxPublic extends Component {

    constructor(props) {
        super(props)
    }

    componentDidMount() {
    }

    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);
    }


    render() {
        return (
            <View style={styles.container}>
                <TCKeyboardView ref="tcKeyboardView" setInputValue={(number) => {
                    this.setTextInputValue(number)
                }}/>
                < TopNavigationBar
                    title={'微信公众号充值'}
                    needBackButton={true}
                    rightTitle={'充值明细'}
                    rightButtonCall={() => {
                        this.gotoPayRecord()
                    }}
                    backButtonCall={() => {
                        this.goBack()
                    }}/>

                <View style={[styles.payTipView, {flexDirection: 'row'}]}>
                    <Text style={styles.payTip}>请选择充值方式 (如有问题，请联系</Text>
                    <TouchableOpacity style={{justifyContent: 'center', alignItems: 'center'}}
                                      onPress={() => this.onlineService()}>
                        <Text style={[styles.payTip, {color: '#4292cd'}]}>在线客服</Text>
                    </TouchableOpacity>
                    <Text style={styles.payTip}>)</Text>
                </View>
                <ScrollView style={{marginTop: 5, marginBottom: 20}} keyboardDismissMode='on-drag'>
                    {this.props.payList && this.props.payList.length > 0 ? this.getContentView() : this.getEmptyTip()}
                </ScrollView>
                <LoadingSpinnerOverlay
                    ref={component => this._partModalLoadingSpinnerOverLay = component}
                    modal={true}
                    marginTop={64}/>
            </View>
        )
    }

    onlineService() {
        if (Platform.OS === 'ios') {
            NavigatorHelper.pushToWebView(JXHelper.getMenuIconsUrl('CUS_SERVICE'), '在线客服');
        } else {
            try {
                NativeModules.JXHelper.openWebViewFromJs(JXHelper.getMenuIconsUrl('CUS_SERVICE'));
            } catch (e) {
                NavigatorHelper.pushToWebView(JXHelper.getMenuIconsUrl('CUS_SERVICE'), '在线客服');
            }
        }
    }

    getContentView() {
        let paymentList = []
        this.props.payList.map((item, index) => {
            paymentList.push(this.getPayItemView(item, index))
        })
        return paymentList
    }

    /**
     * 当数据为空时提示
     * @returns {XML}
     */
    getEmptyTip() {
        return (
            <View style={styles.emptyTip}>
                <Image
                    source={userPay.noPayData} style={styles.payErrorImg}/>
                <Text style={{color: listViewTxtColor.content}}>该支付方式目前无法使用</Text>
                <Text style={{color: listViewTxtColor.content}}>敬请谅解!请选择其它支付方式!</Text>
            </View>
        )
    }

    /**
     * 获取支付方式item组件
     * @param paymentItem
     * @returns {XML}
     */
    getPayItemView(paymentItem, index) {
        return (<TouchableOpacity onPress={() => {
            this.gotoPay(paymentItem)
        }
        } key={"000" + index}>
            <View style={styles.payItemStyle}>
                {this.getPayImage(paymentItem)}
                <View style={styles.payTypeTxt}>
                    <Text
                        style={[styles.payTypeTitleStyle, {fontSize: Size.default}]}>{paymentItem.type ? paymentItem.merchantName : paymentItem.receiptName}</Text>
                    <Text style={styles.payRemarkTxt}>{paymentItem.remarks}</Text>
                </View>
            </View>
        </TouchableOpacity>)
    }


    gotoPay(data) {
        NavigatorHelper.pushToWxPublicPay({codeValue: data.bankCardNo})
    }

    /**
     * 获取支付图标
     * @param rowData
     * @returns {XML}
     */
    getPayImage(rowData) {
        return <Image source={userPay.wechat} style={styles.payTypeImg}/>
    }

    /**
     * 跳转到充值历史界面
     */
    gotoPayRecord() {
        NavigatorHelper.pushToUserPayAndWithDraw(1)
    }

    /**
     * 返回上一级
     */
    goBack() {
        dismissKeyboard();
        NavigatorHelper.popToBack();
    }

    /**
     * 显示加载提示
     */
    showLoading() {
        this._partModalLoadingSpinnerOverLay.show()
    }

    /**
     * 隐藏加载提示
     */
    hideLoading() {
        this._partModalLoadingSpinnerOverLay.hide()
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: indexBgColor.mainBg,
    },
    payMoneyItemStyle: {
        flexDirection: 'row',
        height: 50,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: buttonStyle.btnRedBg,
        margin: 10,
        backgroundColor: indexBgColor.itemBg
    },
    payTitleStyle: {
        fontSize: Size.large,
        marginLeft: 5,
        color: listViewTxtColor.title
    },
    inputContainer: {
        marginLeft: 10,
        width: width * 0.6,
        height: 45,
        justifyContent: 'center',
        backgroundColor: indexBgColor.itemBg
    },
    inputTextStyle: {
        color: payTxtColor.payMoney,
        fontSize: Size.default,
        width: width * 0.6,
        height: 45,
    },
    inputTextLabelStyle: {
        color: payTxtColor.payMoney,
        fontSize: Size.default,
    },
    inputHolder: {
        color: loginAndRegeisterTxtColor.inputPlaceholder
    },
    moneyLabel: {
        flexDirection: 'row',
        height: 50,
        justifyContent: 'space-around',
        flexWrap: 'wrap'
    }, moneyStyle: {
        justifyContent: 'center',
        height: 40,
        width: width / 4,
        alignItems: 'center',
        marginTop: 5
    },
    moneyTxtStyle: {
        color: payTxtColor.moneyUnChecked,
        backgroundColor: payTxtColor.moneyChecked,
        borderRadius: 5,
        fontSize: Size.default,
        width: width / 4 - 10,
        textAlign: 'center',
        paddingTop: 10,
        paddingBottom: 10
    }, moneyCheckedStyle: {
        color: payTxtColor.moneyChecked,
        backgroundColor: payTxtColor.moneyUnChecked,
        borderRadius: 5,
        fontSize: Size.default,
        width: width / 4 - 10,
        textAlign: 'center',
        paddingTop: 10,
        paddingBottom: 10
    },
    payTypeImg: {
        height: 50,
        width: 50,
    }, payTypeTxt: {
        justifyContent: 'center',
        paddingLeft: 10,
    }, payTip: {
        color: listViewTxtColor.title,
        fontSize: Size.default,

    }, payTipView: {
        marginTop: 10,
        paddingLeft: 5,
    }, payRemarkTxt: {
        color: listViewTxtColor.content,
        flexWrap: 'wrap',
        width: width - 50 - 10 - 30
    }, emptyTip: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        backgroundColor: indexBgColor.mainBg
    }, payErrorImg: {
        height: 100,
        width: 100,
    }, itemMainStyle: {
        backgroundColor: indexBgColor.itemBg,
        borderRadius: 5,
        margin: 10,
        flexDirection: 'row',
    }, itemTitleStyle: {
        color: listViewTxtColor.title,
        fontSize: Size.default,
        paddingLeft: 10,
        paddingTop: 10,
    }, itemLeftStyle: {
        padding: 10
    }, itemTitleRightStyle: {
        color: listViewTxtColor.content,
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
        backgroundColor: indexBgColor.itemBg,
        borderRadius: 5,
        marginBottom: 10,
        marginLeft: 10,
        marginRight: 10,
        padding: 10,
        alignItems: 'center'
    }, payTypeTitleStyle: {
        fontSize: Size.large,
        color: listViewTxtColor.title
    }, bankItemView: {
        paddingVertical: 10,
        paddingLeft: 10,
        borderBottomWidth: 1,
        borderBottomColor: indexBgColor.mainBg,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center'
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
})
