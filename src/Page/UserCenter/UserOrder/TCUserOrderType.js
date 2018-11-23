'use-strict';
import React from 'react';
import {StyleSheet, SafeAreaView, View, Text, Image, ScrollView} from 'react-native';
import {width, listViewTxtColor, Size, indexBgColor} from "../../resouce/theme";
import {common as Common} from "../../asset/images";
import {Other} from "../../asset";
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
        let eGamePlatforms = JXHelper.getDSFOpenList().dsfEgameInfos;
        if (eGamePlatforms && eGamePlatforms.length > 0) {
            eGamePlatforms.map((platform) => {
                if (platform.status === 'ON' && platform.gamePlatform === 'FG') {
                    tempComponent.push(
                        <TCListItemBar
                            key={platform.gamePlatform}
                            text={`${platform.gameNameInChinese}投注记录`}
                            leftIcon={{uri: platform.gameIconUrl}}
                            rightIcon={Common.iconNext}
                            onClick={() => NavigatorHelper.pushToOtherBetRecord(platform.gamePlatform)}/>
                    )
                }
            })
        }
        let cardPlatforms = JXHelper.getDSFOpenList().dsfCardInfos;
        if (cardPlatforms && cardPlatforms.length > 0) {
            cardPlatforms.map((platform) => {
                if (platform.status === 'ON' && platform.gamePlatform === 'KY') {
                    tempComponent.push(
                        <TCListItemBar
                            key={platform.gamePlatform}
                            text={`${platform.gameNameInChinese}投注记录`}
                            leftIcon={{uri: platform.gameIconUrl}}
                            rightIcon={Common.iconNext}
                            onClick={() => NavigatorHelper.pushToOtherBetRecord(platform.gamePlatform)}/>
                    )
                }
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
                <ScrollView contentContainerStyle={styles.contentContainer}>
                    {this.renderOtherPlatform()}
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: indexBgColor.mainBg,
    },
    contentContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    typeTitle: {
        width: width,
        paddingLeft: 15,
        paddingTop: 15,
        paddingBottom: 5,
        fontSize: Size.font14,
        color: listViewTxtColor.content
    }
})
