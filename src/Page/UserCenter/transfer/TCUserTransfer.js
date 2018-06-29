'use-strict';
import React from 'react';
import {Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {observer} from 'mobx-react/native'
import ModalDropdown from 'react-native-modal-dropdown';
import {userAccount} from '../../resouce/images';
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
import Button from '../../../Common/View/ButtonView'
import walletStore from '../../../Data/store/WalletStore';
import JXText from "../../widget/JXText";

/**
 * 转账
 * @author: Mason
 */
@observer
export default class TCUserTransfer extends React.Component {

    constructor(props) {
        super(props)
        walletStore.getAllPlatforms()
    }

    render() {
        const keyboardDismissMode = IS_IOS ? 'on-drag' : 'none'
        return (
            <View style={styles.container}>
                <TopNavigationBar title={'转账'} needBackButton backButtonCall={() => Helper.popToBack()}
                                  rightTitle={'转账记录'} rightButtonCall={() => Helper.pushToUserPayAndWithDraw(2)}/>
                <ScrollView keyboardDismissMode={keyboardDismissMode} contentContainerStyle={styles.content}>
                    <OneTouchTransferView />
                    <View style={{backgroundColor: 'transparent', height:10}} />
                    <ManualTransferView />
                </ScrollView>
            </View>
        )
    }
}

/**
 * 一键转账View
 */
@observer
class OneTouchTransferView extends React.Component {

    renderWallet(platform, balance, leftBtnTxt, rightBtnTxt, leftBtnCallback, rightBtnCallback) {
        return (
            <View style={styles.platformItemContainer} key={platform}>
                <Text style={styles.platformTxt}>{platform}</Text>
                <Text style={styles.platformBalanceTxt}>{balance}</Text>
                {leftBtnTxt
                    ? <Button
                        text={leftBtnTxt}
                        btnStyle={styles.transferBtn}
                        txtstyle={styles.transferBtnTxt}
                        onClick={leftBtnCallback}/>
                    : null
                }
                {rightBtnTxt
                    ? <Button
                        text={rightBtnTxt}
                        btnStyle={styles.refreshBtn}
                        txtstyle={styles.refreshBtnTxt}
                        onClick={rightBtnCallback} />
                    : null
                }
            </View>
        );
    }

    renderPlatform() {
        return walletStore.allBalances.map(item => {
            return this.renderWallet(
                item.gameNameInChinese,
                item.balance.toFixed(2),
                item.gamePlatform === 'LOTTERY' ? null : '一键转入',
                item.gamePlatform === 'LOTTERY' ? null : '刷新',
                item.gamePlatform === 'LOTTERY' ? null : () => {
                    walletStore.transfer(item.gamePlatform, 'TopUp', walletStore.allBalances[0].balance, (res) => {
                        if (res.rs) {
                            Toast.showShortCenter('转入成功!');
                        } else {
                            Toast.showShortCenter(res.message ? res.message : '转入失败!');
                        }
                    })
                },
                item.gamePlatform === 'LOTTERY' ? null : () => {
                    walletStore.getOtherWalletBalance(item.gamePlatform)
                }
            );
        });
    }

    render() {
        return (
            <View style={styles.walletViewStyle}>
                {this.renderPlatform()}
            </View>
        );
    }
}

/**
 * 手动转账View
 */
@observer
class ManualTransferView extends React.Component {

    constructor(props) {
        super(props);
        this.moneyLabels = ['50', '100', '300', '500', '1000', '2000', '3000', '5000'] // 快捷转账/充值金额
        this.state = {
            fromIndex: 0,                   // 左侧label选中index
            toIndex: 1,                     // 右侧label选中index
            moneyLabelSelectedIndex: -1,    // 快捷转账/充值金额选中index
            transferMoney: '',              // 转账金额
        }
    }

    renderTransferPlatform() {
        return (
            <View style={styles.dropDownContainer}>
                <View style={styles.dropDownView}>
                    <Text style={styles.dropDownLeftText}>{'从'}</Text>
                    <ModalDropdown
                        ref="fromDropDown"
                        options={walletStore.allWalletsName}
                        defaultIndex={this.state.fromIndex}
                        defaultValue={walletStore.allWalletsName[0]}
                        style={styles.dropDownBtnStyle}
                        textStyle={styles.dropDownText}
                        dropdownStyle={styles.dropdownStyle}
                        dropdownTextStyle={styles.dropdownTextStyle}
                        onSelect={(index, value) => {
                            this.selectFromAccount(index, value);
                        }}
                    />
                    {this.state.fromIndex !== 0
                        ?
                        <TouchableOpacity onPress={()=>this.refs.fromDropDown.show()}>
                            <Image source={userAccount.calendarDropDown} style={styles.dropDownArrow} />
                        </TouchableOpacity>
                        : null
                    }
                </View>
                <TouchableOpacity onPress={() => this.changeSelect()}>
                    <Image source={Other.transfer} style={styles.withdrawIconStyle} />
                </TouchableOpacity>
                <View style={styles.dropDownView}>
                    <Text style={styles.dropDownLeftText}>{'到'}</Text>
                    <ModalDropdown
                        ref="toDropDown"
                        options={walletStore.allWalletsName}
                        defaultIndex={this.state.toIndex}
                        defaultValue={walletStore.allWalletsName[1]}
                        style={styles.dropDownBtnStyle}
                        textStyle={styles.dropDownText}
                        dropdownStyle={styles.dropdownStyle}
                        dropdownTextStyle={styles.dropdownTextStyle}
                        onSelect={(index, value) => {
                            this.selectToAccount(index, value);
                        }}
                    />
                    {this.state.toIndex !== 0
                        ?
                        <TouchableOpacity onPress={()=>this.refs.toDropDown.show()}>
                            <Image source={userAccount.calendarDropDown} style={styles.dropDownArrow} />
                        </TouchableOpacity>
                        : null
                    }
                </View>
            </View>
        )
    }

    renderMoneyLabel() {
        let views = [];
        this.moneyLabels.map((item, index) => {
            views.push(
                <JXText
                    key={index + '00'}
                    text={item}
                    borderRadius={5}
                    textStyle={index === this.state.moneyLabelSelectedIndex ? styles.moneyLabelTextSelect : styles.moneyLabelTextNormal}
                    backgroundStyle={index === this.state.moneyLabelSelectedIndex ? styles.moneyLabelItemSelect : styles.moneyLabelItem}
                    onPress={() => this.setState({moneyLabelSelectedIndex: index, transferMoney: this.moneyLabels[index]})}
                />
            )
        })
        return <View style={styles.moneyLabelContainer}>{views}</View>
    }

    renderInputMoneyBar() {
        return (
            <View style={styles.inputViewStyle}>
                <Text style={styles.moneyDollarTxt}>￥</Text>
                <TextInput
                    style={styles.inputTextStyle}
                    maxLength={8}
                    keyboardType={'numeric'}
                    defaultValue={this.state.transferMoney}
                    underlineColorAndroid={'transparent'}
                    onChangeText={text => {
                        this.setState({transferMoney: text})
                        this.changeMoneyLabelIndex(text)
                    }}
                />
            </View>
        )
    }

    render() {
        return (
            <View style={{width: width, justifyContent: 'center', alignItems: 'center'}}>
                {this.renderTransferPlatform()}
                {this.renderMoneyLabel()}
                {this.renderInputMoneyBar()}
                <Button text="确认转账" btnStyle={styles.queryBtn} txtstyle={styles.queryTxt}
                        onClick={() => {this.checkMoney()}} />
            </View>
        )
    }

    selectFromAccount(index, value) {
        JXLog('selectFromAccount', 'index='+index)
        let toDropDown = this.refs.toDropDown;
        if (index !== '0') {
            toDropDown.select(0);
            this.setState({toIndex: 0})
        } else {
            if (this.state.toIndex === 0) {
                toDropDown.select(1);
                this.setState({toIndex: 1})
            }
        }
        this.setState({fromIndex: parseInt(index)})
    }

    selectToAccount(index, value) {
        JXLog('selectToAccount', 'index='+index)
        let fromDropDown = this.refs.fromDropDown;
        if (index === '0') {
            if (this.state.fromIndex === 0) {
                fromDropDown.select(1);
                this.setState({fromIndex: 1})
            }
        } else {
            if (this.state.fromIndex !== 0) {
                fromDropDown.select(0)
                this.setState({fromIndex: 0})
            }
        }
        this.setState({toIndex: parseInt(index)})
    }

    /**
     * 切换转账账号
     */
    changeSelect() {
        let fromDropDown = this.refs.fromDropDown
        let toDropDown = this.refs.toDropDown
        fromDropDown.select(this.state.toIndex)
        toDropDown.select(this.state.fromIndex)
        this.setState({
            fromIndex: this.state.toIndex,
            toIndex: this.state.fromIndex,
        })
    }

    changeMoneyLabelIndex(money) {
        let index = this.moneyLabels.indexOf(money)
        this.setState({moneyLabelSelectedIndex: index})
    }

    checkMoney() {
        let reg = /^[0-9]+([.]{1}[0-9]{1,2})?$/;
        let inputMoney = this.state.transferMoney;
        if (inputMoney.length < 1) {
            Toast.showShortCenter('请输入充值金额!');
            return;
        }
        if (!inputMoney.match(reg)) {
            Toast.showShortCenter('您输入的金额格式不正确!');
            return;
        }
        if (inputMoney === '' || inputMoney < 1) {
            Toast.showShortCenter('充值金额不能小于1元!');
            return;
        }

        let transferType = this.state.fromIndex === 0 ? "TopUp" : "Withdraw"
        let platformIndex = this.state.fromIndex === 0 ? this.state.toIndex : this.state.fromIndex
        let platform = walletStore.allBalance[platformIndex].gamePlatform;

        walletStore.transfer(platform, transferType, inputMoney, (res) => {
            if (res.rs) {
                Toast.showShortCenter('转账成功!');
            } else {
                let message = res.message ? res.message : '转账失败，请稍后再试!';
                Toast.showShortCenter(message);
            }
        })
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: indexBgColor.mainBg
    },
    dropDownContainer:{
        flexDirection:'row',
        backgroundColor: indexBgColor.itemBg,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#EAEAEA',
    },
    dropDownView: {
        flex: 1,
        flexDirection: 'row',
        height: 45,
        alignItems: 'center',
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
        flex: 1,
    },
    dropDownLeftText: {
        color: transferColor.title1,
        fontSize: Size.font14,
        paddingLeft: 10,
        paddingRight: 10,
    },
    dropDownArrow:{
        width: 15,
        height: 12,
        marginLeft: 10,
        marginRight: 10,
    },
    dropDownText: {
        color: transferColor.title2,
        fontSize: Size.font18
    },
    dropdownStyle: {
        width: width * 0.3,
        height: height * 0.25,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10
    },
    dropdownTextStyle: {
        width: width * 0.3,
        textAlign: 'center',
        fontSize: Size.font16
    },
    moneyLabelContainer: {
        width: width,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 10,
        paddingTop: 5,
    },
    moneyLabelItem: {
        justifyContent: 'center',
        height: 35,
        width: width / 4 - 10,
        alignItems: 'center',
        marginTop: 5,
        backgroundColor: payTxtColor.moneyChecked,
    },
    moneyLabelItemSelect: {
        justifyContent: 'center',
        height: 35,
        width: width / 4 - 10,
        alignItems: 'center',
        marginTop: 5,
        backgroundColor: payTxtColor.moneyUnChecked,
    },
    moneyLabelTextNormal: {
        color: payTxtColor.moneyUnChecked,
    },
    moneyLabelTextSelect: {
        color: payTxtColor.moneyChecked,
    },
    inputViewStyle: {
        flexDirection: 'row',
        backgroundColor: indexBgColor.itemBg,
        alignItems: 'center',
        width: width
    },
    inputTextStyle: {
        color: transferColor.money1,
        fontSize: Size.font20,
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
        // height: 50,
        // marginTop: 15,
        color: transferColor.title4,
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: Size.large,
        backgroundColor: indexBgColor.itemBg,
        borderBottomWidth: 1,
        borderBottomColor: indexBgColor.mainBg
    },
    walletViewStyle: {
        width: width,
        // paddingTop: 10,
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
        width: width * 0.3
    },
    transferBtn: {
        height: 30,
        backgroundColor: indexBgColor.itemBg,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: transferColor.border1,
        marginRight: 5,
        justifyContent: 'center'
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
        marginRight: 5,
        justifyContent: 'center'
    },
    refreshBtnTxt: {
        color: transferColor.border2,
        fontSize: Size.font14,
        fontWeight: '400'
    },
});
