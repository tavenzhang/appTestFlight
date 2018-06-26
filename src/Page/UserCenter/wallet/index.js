'use-strict';
import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {observer} from "mobx-react"
import {Other} from "../../asset";
import {indexBgColor, Size} from "../../resouce/theme";
import TopNavigationBar from '../../../Common/View/TCNavigationBar';
import NavigationHelper from "../../../Common/JXHelper/TCNavigatorHelper";
import walletStore from '../../../Data/store/WalletStore'

/**
 * 钱包详情
 * @author: Mason
 */
@observer
export default class Wallet extends React.Component {

    constructor(props) {
        super(props)
        walletStore.getAllPlatforms()
    }

    refreshBalance(gamePlatform) {
        if (gamePlatform === 'LOTTERY') {
            walletStore.getLotteryWalletBalance(gamePlatform)
        } else {
            walletStore.getOtherWalletBalance(gamePlatform)
        }
    }

    renderAllWallet() {
        let component = []
        walletStore.allBalances.map((platform) => {
            component.push (
                <View style={styles.walletContainer}>
                    <Text style={styles.walletName}>{platform.gameNameInChinese}</Text>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={styles.walletMoney}>{platform.balance.toFixed(2)}{' 元'}</Text>
                        <TouchableOpacity activeOpacity={0.7} onPress={() => this.refreshBalance(platform.gamePlatform)}>
                            <Image source={Other.refreshMoney} style={styles.refreshIcon}
                                   resizeMode={'contain'}/>
                        </TouchableOpacity>
                    </View>
                </View>
            )
        })
        return component
    }

    render() {
        return (
            <View style={styles.container}>
                <TopNavigationBar
                    title={'我的钱包'}
                    needBackButton
                    backButtonCall={() => NavigationHelper.popToBack()}/>
                {this.renderAllWallet()}
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
