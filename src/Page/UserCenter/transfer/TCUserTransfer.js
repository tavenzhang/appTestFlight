'use-strict';
import React from 'react';
import {
    ActivityIndicator,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import {computed} from 'mobx'
import {observer} from 'mobx-react/native'
import ModalDropdown from 'react-native-modal-dropdown';
import {common} from '../../resouce/images'
import {Other} from "../../asset";
import {
    baseColor,
    height,
    indexBgColor,
    payTxtColor,
    Size,
    transferColor,
    width
} from "../../resouce/theme";
import TopNavigationBar from '../../../Common/View/TCNavigationBar';
import Helper from "../../../Common/JXHelper/TCNavigatorHelper";
import Toast from '../../../Common/JXHelper/JXToast';
import TransferStore from '../../../Data/store/TransferStore'
import Button from '../../../Common/View/ButtonView'
import NoDataView from '../../../Common/View/TCNoDataView'

/**
 * 转账
 * @author: Mason
 */
@observer
export default class TCUserTransfer extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            loadStatus: 1 // 页面数据加载状态（0：加载中，1：加载成功，2：加载失败）
        }
        this.transferStore = new TransferStore();
        this.loadBalance();
    }

    loadBalance() {
        JX_Store.balanceStore.getPlatforms()
    }

    render() {
        return (
            <View style={styles.container}>
                <TopNavigationBar
                    title={'转账'}
                    needBackButton
                    backButtonCall={() => Helper.popToBack()}/>
                <ScrollView keyboardDismissMode='on-drag'>
                    <View style={styles.content}>
                        <SelectBarView transferStore={this.transferStore}/>
                        <MoneyLabelView transferStore={this.transferStore}/>
                        <MoneyInputBarView transferStore={this.transferStore}/>
                        <Button
                            text="确认转账"
                            btnStyle={styles.queryBtn}
                            txtstyle={styles.queryTxt}
                            onClick={() => {
                                this.checkMoney();
                            }}/>
                        <Text style={styles.autoTransferTxt}>自动额度转换</Text>
                        <WalletLabelView transferStore={this.transferStore}/>
                    </View>
                </ScrollView>
            </View>
        );
    }

    @computed get money() {
        return this.transferStore.transferMoney;
    }

    checkMoney() {
        let reg = /^[0-9]+([.]{1}[0-9]{1,2})?$/
        let inputMoney = this.money + ''
        if (inputMoney.length < 1) {
            Toast.showShortCenter('请输入充值金额!')
            return
        }
        if (!inputMoney.match(reg)) {
            Toast.showShortCenter('您输入的金额格式不正确!')
            return
        }
        if (inputMoney === '' || inputMoney < 1) {
            Toast.showShortCenter("充值金额不能小于1元!");
            return
        }
        this.transferStore.transfer((res) => {
            if (res.rs) {
                Toast.showShortCenter("转账成功!");
            } else {
                let message = res.message ? res.message : "转账失败，请稍后再试!";
                Toast.showShortCenter(message);
            }
        });
    }

}

/**
 * 转账bar
 */
@observer
class SelectBarView extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style={styles.content}>
                {this.getWithdrawFromDropDownView()}
                <TouchableOpacity onPress={() => this.changeSelect()}>
                    <Image source={Other.transfer} style={styles.withdrawIconStyle}/>
                </TouchableOpacity>
                {this.getWithdrawToDropDownView()}
            </View>
        )
    }

    @computed get transferAccountName() {
        return JX_Store.balanceStore.transferAccountName.slice(0);
    }

    /**
     * 获取转账下拉菜单控件
     * @param isTo
     */
    getWithdrawFromDropDownView() {
        return (
            <View style={styles.dropDownView}>
                <Text style={styles.titleTxt}>{"从"}</Text>
                <ModalDropdown
                    ref="fromDropDown"
                    options={this.transferAccountName}
                    defaultIndex={this.props.transferStore.fromIndex}
                    defaultValue={this.transferAccountName[0]}
                    style={styles.dropDownBtnStyle}
                    textStyle={styles.dropDownBtnTxt}
                    dropdownStyle={styles.dropdownStyle}
                    dropdownTextStyle={styles.dropdownTextStyle}
                    onSelect={(index, value) => {
                        this.selectFromAccount(index, value)
                    }}
                />
                <Image source={common.iconNext} style={{width: 8, height: 17}}/>
            </View>
        )
    }

    /**
     * 获取转账下拉菜单控件
     * @param isTo
     */
    getWithdrawToDropDownView() {
        return (<View style={styles.dropDownView}>
            <Text style={styles.titleTxt}>{"到"}</Text>
            <ModalDropdown
                ref="toDropDown"
                options={this.transferAccountName}
                defaultIndex={this.props.transferStore.toIndex}
                defaultValue={this.transferAccountName[1]}
                style={styles.dropDownBtnStyle}
                textStyle={styles.dropDownBtnTxt}
                dropdownStyle={styles.dropdownStyle}
                dropdownTextStyle={styles.dropdownTextStyle}
                onSelect={(index, value) => {
                    this.selectToAccount(index, value)
                }}
            />
            <Image source={common.iconNext} style={{width: 8, height: 17}}/>
        </View>)
    }


    selectFromAccount(index, value) {
        let toDropDown = this.refs.toDropDown;
        if (index !== "0") {
            toDropDown.select(0);
            this.props.transferStore.toIndex = 0;
        } else {
            if (this.props.transferStore.toIndex === 0) {
                toDropDown.select(1);
                this.props.transferStore.toIndex = 1;
            }
        }
        this.props.transferStore.fromIndex = parseInt(index);
        console.debug('selectFromAccount()', 'index='+index+', value='+value+', fromIndex='+this.props.transferStore.fromIndex)
    }

    selectToAccount(index, value) {
        let fromDropDown = this.refs.fromDropDown;
        if (index === "0") {
            if (this.props.transferStore.fromIndex === 0) {
                fromDropDown.select(1);
                this.props.transferStore.fromIndex = 1;
            }
        } else {
            if (this.props.transferStore.fromIndex !== 0) {
                fromDropDown.select(0);
                this.props.transferStore.fromIndex = 0;
            }
        }
        this.props.transferStore.toIndex = parseInt(index);
        console.info('selectToAccount()', 'index='+index+', value='+value+', toIndex='+this.props.transferStore.toIndex)
    }

    @computed get toIndex() {
        return this.props.transferStore.toIndex;
    }

    @computed get fromIndex() {
        return this.props.transferStore.fromIndex;
    }

    /**
     * 切换转账账号
     */
    changeSelect() {
        let toDropDown = this.refs.toDropDown;
        let fromDropDown = this.refs.fromDropDown;
        fromDropDown.select(this.toIndex);
        toDropDown.select(this.fromIndex);
        let temp = this.props.transferStore.fromIndex;
        this.props.transferStore.fromIndex = this.props.transferStore.toIndex;
        this.props.transferStore.toIndex = temp;
    }
}

/**
 * 金额label组件
 */
@observer
class MoneyLabelView extends React.Component {

    render() {
        let views = []
        this.props.transferStore.moneyData.map((item, index) => {
            views.push(
                <TouchableOpacity
                    key={index + '00'}
                    onPress={() => {this.checkMoney(item, index)}}>
                    <View style={styles.moneyStyle}>
                        <Text style={this.getMoneyTxtStyle(index)}>{item}</Text>
                    </View>
                </TouchableOpacity>)
        })
        return (<View style={styles.moneyContent}>{views}</View>)
    }

    /**
     * 选择固定金额label
     * @param text
     * @param index
     */
    checkMoney(money, index) {
        this.props.transferStore.selectedIndex = index;
        this.props.transferStore.transferMoney = money;
    }

    /**
     * 获取金额label样式
     * @param index
     * @returns {*}
     */
    getMoneyTxtStyle(index) {
        if (index === this.props.transferStore.selectedIndex) {
            return styles.moneyTxtSelect
        } else {
            return styles.moneyTxtNormal
        }
    }
}

@observer
class MoneyInputBarView extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style={styles.inputViewStyle}>
                <Text style={styles.moneyDollarTxt}>￥</Text>
                <TextInput
                    ref="inputTextMoney"
                    style={styles.inputTextStyle}
                    maxLength={8}
                    keyboardType={'numeric'}
                    defaultValue={this.props.transferStore.transferMoney.toString()}
                    underlineColorAndroid={'transparent'}
                    onChangeText={(text) => this.setMoneyInputValue(text)}
                    onEndEditing={e => this.textInputOnEndEditing(e)}
                    onSubmitEditing={() => {
                        this.endingEditing()
                    }}
                />
            </View>
        )
    }

    setMoneyInputValue(money) {
        this.props.transferStore.transferMoney = money;
        this.props.transferStore.changeSelectIndex();
    }

    textInputOnEndEditing() {
        this.endingEditing()
    }

    endingEditing() {
    }
}

@observer
class WalletLabelView extends React.Component {

    renderWallet(platform, balance, leftBtnTxt, rightBtnTxt, leftBtnCallback, rightBtnCallback) {
        return (
            <View style={styles.platformItemContainer}>
                <Text style={styles.platformTxt}>{platform}</Text>
                <Text style={styles.platformBalanceTxt}>{balance}</Text>
                <Button text={leftBtnTxt}
                        btnStyle={styles.transferBtn}
                        txtstyle={styles.transferBtnTxt}
                        onClick={leftBtnCallback}/>
                <Button text={rightBtnTxt}
                        btnStyle={styles.refreshBtn}
                        txtstyle={styles.refreshBtnTxt}
                        onClick={rightBtnCallback}/>
            </View>
        )
    }

    renderPlatform() {
        let platforms = JX_Store.balanceStore.platformBalances;
        return (
            platforms.map((item) => {
                return (
                    this.renderWallet(item.gameNameInChinese, item.balance.toFixed(2), '一键转入', '刷新',
                        () => {
                            this.props.transferStore.allTransfer(item.gamePlatform, (res) => {
                                if (res.rs) {
                                    Toast.showShortCenter("转入成功!")
                                } else {
                                    Toast.showShortCenter(res.message ? res.message : "转入失败!")
                                }
                            })
                        },
                        () => {
                            this.props.transferStore.refresh(item.gamePlatform)
                        })
                )
            })
        )
    }

    render() {
        return (
            <View style={styles.walletViewStyle}>
                <View style={styles.platformItemContainer}>
                    <Text style={styles.platformTxt}>{'中心钱包'}</Text>
                    <Text style={styles.platformBalanceTxt}>{this.balance.toFixed(2)}</Text>
                </View>
                {this.renderPlatform()}
            </View>
        )
    }

    @computed get balance() {
        return JX_Store.balanceStore.centerBalance;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: indexBgColor.mainBg
    },
    dropDownView: {
        flexDirection: 'row',
        width: width,
        height: 45,
        backgroundColor: indexBgColor.itemBg,
        alignItems: 'center'
    },
    withdrawIconStyle: {
        width: 30,
        height: 30,
        marginVertical: 5
    },
    content: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    dropDownBtnStyle: {
        width: width * 0.75
    },
    titleTxt: {
        width: width * 0.1,
        color: transferColor.title1,
        fontSize: Size.font16,
        marginLeft: 20
    },
    dropDownBtnTxt: {
        color: transferColor.title2,
        fontSize: Size.font18
    },
    dropdownStyle: {
        width: width * 0.3,
        height: height * 0.25,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10
    },
    dropdownTextStyle: {
        width: width * 0.3,
        textAlign: 'center',
        fontSize: Size.font16
    },
    moneyContent: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
        marginTop: 5,
        marginBottom: 10,
        marginLeft: 10,
        marginRight: 10,
        width: width
    },
    moneyStyle: {
        justifyContent: 'center',
        height: 40,
        width: width / 4,
        alignItems: 'center',
        marginTop: 5
    },
    moneyImg: {
        width: 60,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center'
    },
    moneyTxtNormal: {
        color: payTxtColor.moneyUnChecked,
        backgroundColor: payTxtColor.moneyChecked,
        borderRadius: 5,
        fontSize: Size.default,
        width: width / 4 - 10,
        textAlign: 'center',
        paddingTop: 10,
        paddingBottom: 10
    },
    moneyTxtSelect: {
        color: payTxtColor.moneyChecked,
        backgroundColor: payTxtColor.moneyUnChecked,
        borderRadius: 5,
        fontSize: Size.default,
        width: width / 4 - 10,
        textAlign: 'center',
        paddingTop: 10,
        paddingBottom: 10
    },
    inputViewStyle: {
        flexDirection: 'row',
        backgroundColor: indexBgColor.itemBg,
        alignItems: 'center',
        width: width,
    },
    inputTextStyle: {
        color: transferColor.money1,
        fontSize: Size.font18,
        fontWeight: 'bold',
        width: width * 0.6,
        height: 45,
        marginLeft: 10
    },
    moneyDollarTxt: {
        paddingLeft: 15,
        color: transferColor.title1,
        fontSize: Size.default
    },
    queryBtn: {
        width: width * 0.8,
        height: 40,
        backgroundColor: transferColor.money1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        marginTop: 15
    },
    queryTxt: {
        fontSize: Size.large,
        color: baseColor.white
    },
    autoTransferTxt: {
        width: width,
        height: 50,
        marginTop: 15,
        color: transferColor.title4,
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: Size.large,
        backgroundColor: indexBgColor.itemBg,
        borderBottomWidth: 1,
        borderBottomColor: indexBgColor.mainBg,
    },
    walletViewStyle: {
        width: width,
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: indexBgColor.itemBg
    },
    platformItemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
        paddingLeft: 5,
        paddingRight: 5
    },
    platformTxt: {
        fontSize: Size.font16,
        color: transferColor.title3,
        width: width * 0.25
    },
    platformBalanceTxt: {
        fontSize: Size.font16,
        color: transferColor.money2,
        width: width * 0.3,
    },
    transferBtn: {
        height: 30,
        backgroundColor: indexBgColor.itemBg,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: transferColor.border1,
        marginRight: 5
    },
    transferBtnTxt: {
        color: transferColor.buttonBg1,
        fontSize: Size.font14,
        fontWeight: '400'
    },
    refreshBtn: {
        height: 30,
        backgroundColor: indexBgColor.itemBg,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: transferColor.border2,
        marginRight: 5
    },
    refreshBtnTxt: {
        color: transferColor.border2,
        fontSize: Size.font14,
        fontWeight: '400'
    },
    centering: {
        position: 'absolute',
        top: (height - 80) / 2,
        marginHorizontal: width / 2,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20
    }
})
