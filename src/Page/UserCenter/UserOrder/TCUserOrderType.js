'use-strict';
import React from 'react';
import {StyleSheet, SafeAreaView, View, Text, Image} from 'react-native';
import {width, listViewTxtColor, Size} from "../../resouce/theme";
import {common as Common} from "../../resouce/images";
import NavigatorHelper from "../../../Common/JXHelper/TCNavigatorHelper";
import TopNavigationBar from '../../../Common/View/TCNavigationBar';
import TCListItemBar from '../../../Common/View/TCListItemBar'

/**
 * 投注类型
 * @author: Mason
 */
export default class TCUserOrderType extends React.Component {

    render() {
        return (
            <View style={styles.container}>
                <TopNavigationBar
                    title={'投注记录'}
                    needBackButton
                    backButtonCall={() => NavigatorHelper.popToBack()} />
                <Text style={styles.typeTitle}>彩票游戏</Text>
                <TCListItemBar text={'彩票游戏投注记录'} rightIcon={Common.iconNext} onClick={() => NavigatorHelper.pushToOrderRecord(0)}/>
                <Text style={styles.typeTitle}>体育竞技</Text>
                <TCListItemBar text={'IM体育投注记录'} rightIcon={Common.iconNext}/>
                <TCListItemBar text={'三昇体育投注记录'} rightIcon={Common.iconNext}/>
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
