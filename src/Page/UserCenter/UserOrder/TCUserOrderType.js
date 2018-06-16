'use-strict';
import React from 'react';
import {StyleSheet, SafeAreaView, View, Text, Image} from 'react-native';
import {width, listViewTxtColor, Size} from "../../resouce/theme";
import {common as Common} from "../../resouce/images";
import {Other} from "../../asset/drawable";
import NavigatorHelper from "../../../Common/JXHelper/TCNavigatorHelper";
import TopNavigationBar from '../../../Common/View/TCNavigationBar';
import TCListItemBar from '../../../Common/View/TCListItemBar'
import JXHelper from "../../../Common/JXHelper/JXHelper";

/**
 * 投注类型
 * @author: Mason
 */
export default class TCUserOrderType extends React.Component {

    renderOtherPlatform() {
        let tempComponent = [];
        let sportPlatforms = JXHelper.getDSFOpenList().dsfSportInfos;
        if (sportPlatforms && sportPlatforms.length > 0) {
            tempComponent.push(<Text style={styles.typeTitle}>体育竞技</Text>)
            sportPlatforms.map((platform) => {
                tempComponent.push(
                    <TCListItemBar
                        text={`${platform.gameNameInChinese}投注记录`}
                        leftIcon={{uri: platform.gameIconUrl}}
                        rightIcon={Common.iconNext}
                        onClick={() => NavigatorHelper.pushToOtherBetRecord(platform.gamePlatform)}/>
                )
            })
        }
        let eGamePlatforms = JXHelper.getDSFOpenList().dsfEgameInfos;
        if (eGamePlatforms && eGamePlatforms.length > 0) {
            tempComponent.push(<Text style={styles.typeTitle}>电子竞技</Text>)
            eGamePlatforms.map((platform) => {
                tempComponent.push(
                    <TCListItemBar
                        text={`${platform.gameNameInChinese}投注记录`}
                        leftIcon={{uri:platform.gameIconUrl}}
                        rightIcon={Common.iconNext}
                        onClick={() => NavigatorHelper.pushToOtherBetRecord(platform.gamePlatform)}/>
                )
            })
        }
        let cardPlatforms = JXHelper.getDSFOpenList().dsfCardInfos;
        if (cardPlatforms && cardPlatforms.length > 0) {
            tempComponent.push(<Text style={styles.typeTitle}>棋牌竞技</Text>)
            cardPlatforms.map((platform) => {
                tempComponent.push(
                    <TCListItemBar
                        text={`${platform.gameNameInChinese}投注记录`}
                        leftIcon={{uri:platform.gameIconUrl}}
                        rightIcon={Common.iconNext}
                        onClick={() => NavigatorHelper.pushToOtherBetRecord(platform.gamePlatform)}/>
                )
            })
        }
        return tempComponent
    }

    render() {
        return (
            <View style={styles.container}>
                <TopNavigationBar
                    title={'投注平台'}
                    needBackButton
                    backButtonCall={() => NavigatorHelper.popToBack()}/>
                <Text style={styles.typeTitle}>彩票游戏</Text>
                <TCListItemBar text={'彩票游戏投注记录'}
                               leftIcon={Other.caiPiao}
                               rightIcon={Common.iconNext}
                               onClick={() => NavigatorHelper.pushToOrderRecord(0)}/>
                {this.renderOtherPlatform()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    typeTitle: {
        width: width,
        paddingLeft: 15,
        paddingTop: 15,
        paddingBottom: 5,
        fontSize: Size.font14,
        color: listViewTxtColor.content
    }
})
