'use-strict';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {listViewTxtColor, Size, width} from "../../../resouce/theme";
import {common as Common} from "../../../resouce/images";
import {Other} from "../../../asset/drawable";
import NavigatorHelper from "../../../../Common/JXHelper/TCNavigatorHelper";
import TopNavigationBar from '../../../../Common/View/TCNavigationBar';
import TCListItemBar from '../../../../Common/View/TCListItemBar'
import JXHelper from "../../../../Common/JXHelper/JXHelper";

/**
 * 个人报表类型
 * @author: Mason
 */
export default class TCUserStatementsType extends React.Component {

    renderOtherPlatform() {
        let tempComponent = [];
        let eGamePlatforms = JXHelper.getDSFOpenList().dsfEgameInfos;
        if (eGamePlatforms && eGamePlatforms.length > 0) {
            eGamePlatforms.map((platform) => {
                if (platform.status === 'ON' && platform.gamePlatform === 'FG') {
                    tempComponent.push(
                        <TCListItemBar
                            key={platform.gamePlatform}
                            text={`${platform.gameNameInChinese}个人报表`}
                            leftIcon={{uri: platform.gameIconUrl}}
                            rightIcon={Common.iconNext}
                            onClick={() => NavigatorHelper.pushToUserStatements(platform.gamePlatform)}/>
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
                            text={`${platform.gameNameInChinese}个人报表`}
                            leftIcon={{uri: platform.gameIconUrl}}
                            rightIcon={Common.iconNext}
                            onClick={() => NavigatorHelper.pushToUserStatements(platform.gamePlatform)}/>
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
                    title={'报表平台'}
                    needBackButton
                    backButtonCall={() => NavigatorHelper.popToBack()}/>
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
