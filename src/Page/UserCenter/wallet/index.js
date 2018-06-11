'use-strict';
import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import PropTypes from 'prop-types';
import {personal} from '../../resouce/images'
import {indexBgColor, Size} from "../../resouce/theme";
import TransferStore from "../../../Data/store/userCenterStore/TransferStore";
import TopNavigationBar from '../../../Common/View/TCNavigationBar';
import NavigationHelper from "../../../Common/JXHelper/TCNavigatorHelper";
import RequestUtils from "../../../Common/Network/TCRequestUitls";
import JXHelper from "../../../Common/JXHelper/JXHelper";
import {config} from "../../../Common/Network/TCRequestConfig";
import Toast from '../../../Common/JXHelper/JXToast';

class WalletItemComponent extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            balance: this.props.walletMoney
        }
    }

    updateBalance(balance) {
        this.setState = ({balance: balance})
    }

    render() {
        return (
            <View style={styles.walletContainer}>
                <Text style={styles.walletName}>{this.props.walletName}</Text>
                <View style={{flexDirection: 'row'}}>
                    <Text style={styles.walletMoney}>{this.state.balance.toFixed(2)}{' 元'}</Text>
                    <TouchableOpacity activeOpacity={0.7} onPress={this.props.onClick}>
                        <Image source={personal.refreshMoney} style={styles.refreshIcon}
                               resizeMode={'contain'}/>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

}

WalletItemComponent.propTypes = {
    walletName: PropTypes.string.isRequired,
    walletMoney: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired
}

/**
 * 钱包详情
 * @author: Mason
 */
export default class extends React.Component {

    constructor(props) {
        super(props)
        this.transferStore = new TransferStore();
    }

    // 刷新中心钱包金额
    refreshCenterBalance() {
        RequestUtils.getUrlAndParamsAndCallback(config.api.userBalance, null, (response) => {
            if (response.rs) {
                storage.save({
                    key: 'balance',
                    data: response.content.balance
                })
                TCUSER_BALANCE = response.content.balance
                this.refs.centerPlatform.setState({balance: TCUSER_BALANCE})
            }
        })
    }

    renderOtherWallet() {
        let otherPlatform = JXHelper.getDSFOpenList().dsfAll;
        if (otherPlatform) {
            return (
                otherPlatform.map((platform) => {
                    return (
                        <WalletItemComponent
                            key={platform.gamePlatform}
                            ref={platform.gamePlatform}
                            walletName={platform.gameNameInChinese}
                            walletMoney={0}
                            onClick={() => {
                                this.transferStore.refresh(platform.gamePlatform, (res) => {
                                    if (res && res.rs && res.content) {
                                        this.refs[platform.gamePlatform].setState({balance: res.content.balance})
                                        // this.refs[platform.gamePlatform].updateBalance(res.content.balance)
                                    } else {
                                        Toast.showShortCenter(res.message)
                                    }
                                })
                            }}/>
                    )
                })
            )
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <TopNavigationBar
                    title={'我的钱包'}
                    needBackButton
                    backButtonCall={() => NavigationHelper.popToBack()}/>
                <WalletItemComponent
                    ref={'centerPlatform'}
                    walletName={'中心钱包'}
                    walletMoney={TCUSER_BALANCE}
                    onClick={() => {this.refreshCenterBalance()}}/>
                {this.renderOtherWallet()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: indexBgColor.mainBg,
    },
    walletContainer: {
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 15,
        paddingRight: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#EAEAEA',
        backgroundColor: indexBgColor.itemBg,
    },
    walletName: {
        color: '#111111',
        fontSize: Size.font18
    },
    walletMoney: {
        color: '#e60012',
        fontSize: Size.font18,
        fontWeight: '400'
    },
    refreshIcon: {
        width: 25,
        height: 25,
        marginLeft: 10
    }
})
