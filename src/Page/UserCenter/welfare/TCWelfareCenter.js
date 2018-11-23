'use-strict';
import React from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';
import {observer, inject} from "mobx-react/native";
import {indexBgColor, listViewTxtColor, Size} from "../../resouce/theme";
import TopNavigationBar from '../../../Common/View/TCNavigationBar';
import NavigatorHelper from "../../../Common/JXHelper/TCNavigatorHelper";
import Helper from "../../../Common/JXHelper/TCNavigatorHelper";
import {Other} from "../../asset";
import {personal} from '../../asset/images'
import RedPacket from '../../red_packet/RedPacketData';

let RedPacketData = new RedPacket();

/**
 * 福利中心
 */
@inject("mainStore")
@observer
export default class extends React.Component {

    constructor(props) {
        super(props)
        RedPacketData.requestRedPacketCurrent();
    }

    toRedWallet() {
        NavigatorHelper.pushToRedPacket()
    }

    renderRedWallet() {
        if (RedPacketData.hbdisplay) {
            return (
                <TouchableOpacity onPress={() => {
                    this.toRedWallet()
                }}>
                    <View style={styles.welfareItemContainer}>
                        <View style={styles.welfareLeftItem}>
                            <Image source={Other.redWallet} style={styles.welfareLeftIcon}/>
                            <Text style={styles.welfareItemTxt}>红包游戏</Text>
                        </View>
                        <View style={{paddingRight: 10}}>
                            <Image source={personal.imgNext} style={styles.welfareRightIcon}/>
                        </View>
                    </View>
                </TouchableOpacity>
            )
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <TopNavigationBar
                    title={'福利中心'}
                    needBackButton
                    backButtonCall={this.props.backHome ? () => this.props.mainStore.changeTab('home') : () => Helper.popToBack()}/>
                {this.renderRedWallet()}
                <View style={styles.moreWelfareContainer}>
                    <Text style={styles.moreWelfareTxt}>更多福利，敬请期待！</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: indexBgColor.mainBg,
    },
    welfareItemContainer: {
        flexDirection: 'row',
        backgroundColor: indexBgColor.itemBg,
        height: 50,
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 15,
    },
    welfareLeftItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    welfareLeftIcon: {
        width: 30,
        height: 30,
        marginLeft: 15
    },
    welfareRightIcon: {
        width: 10,
        height: 15,
    },
    welfareItemTxt: {
        fontSize: Size.default,
        color: listViewTxtColor.title,
        marginLeft: 10
    },
    moreWelfareContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 50
    },
    moreWelfareTxt: {
        fontSize: Size.default,
        color: listViewTxtColor.content
    }
})
