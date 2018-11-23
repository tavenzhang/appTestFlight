/**
 * Created by Sam on 2016/11/16.
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image
} from 'react-native';
import NumbersView from './TCLotteryNumbersView'
import JXHelper from '../JXHelper/JXHelper'
import {Size, width, height, indexBgColor, listViewTxtColor, lotterBgColor} from '../../Page/resouce/theme'

export default class MyComponent extends React.Component {

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {};
    }

    static defaultProps = {
        issue: '',
        date: '',
        number: '',
        type: '',
        rowData: null,
        isFirstRow: false,
        isBetHomeHistory: false,
        isHighlightStyle: true,
        rowId: 0,
    }

    componentDidMount() {

    }

    render() {
        return (
            <View
                style={[
                    styles.container,
                    this.props.isBetHomeHistory && (JXHelper.gameUniqueIDIsMarkSix(this.props.rowData.gameUniqueId)? styles.markSixHomeHistoryContainer:styles.homeHistoryContainer),
                    this.props.isBetHomeHistory && this.props.rowId % 2 != 0 && styles.evenRowBackground,
                ]}
            >
                <View style={[styles.leftViewStyle, this.props.isBetHomeHistory && styles.homeHistoryLeftView]}>
                    {this.getItemText()}
                    {this.getNumberView()}
                </View>
            </View>
        );
    };

    getNumberView() {
        return (
            <NumbersView
                data={this.props.rowData}
                cpNumbers={this.props.number.split(',')}
                isHighlightStyle={this.props.isHighlightStyle}
                showStyle={this.props.rowData.gameUniqueId}
                isBetHomeHistory={this.props.isBetHomeHistory}
            />
        )
    }

    getItemText() {
        let itemText = '';
        if (this.props.isBetHomeHistory) {
            let gameUniqueIdIsSSC = false;
            let showIssueValue = this.props.issue.toString();
            if (this.props.rowData.gameUniqueId.indexOf('SSC') >= 0){
                gameUniqueIdIsSSC = true;
                showIssueValue = showIssueValue.slice(showIssueValue.length - 3, showIssueValue.length);
            }
            itemText = '第' + showIssueValue + '期';
            return (
                <View  style={[styles.homeHistoryItemTitleView, gameUniqueIdIsSSC && styles.sscHomeItemTitleView]}>
                    <View style={styles.verticalBarStyle}/>
                    <Text
                        style={[styles.itemTextStyle, this.props.isBetHomeHistory && styles.homeHistoryItemText]}
                    >
                        {itemText}
                    </Text>
                </View>
            );
        } else {
          itemText = '第' + this.props.issue + '期' + '   ' + JXHelper.getTimeRegularTimeZone(this.props.rowData.openTime,"YYYY-MM-DD HH:mm:ss");
            return (
                <Text
                    style={[styles.itemTextStyle, this.props.isBetHomeHistory && styles.homeHistoryItemText]}
                >
                    {itemText}
                </Text>
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: indexBgColor.itemBg,
        flexDirection: 'row',
        borderBottomWidth: TCLineW,
        borderBottomColor: indexBgColor.mainBg,
    },
    leftViewStyle: {
        justifyContent: 'center',
        flex: 1,
        marginLeft: 10,
        marginTop: 10
    },
    imageStyle: {
        width: 15,
        height: 15,
    },
    itemTextStyle:{
        color: listViewTxtColor.title,
        fontSize: Size.default,
    },
    homeHistoryContainer:{
        borderBottomWidth: 0,
        height: 26,
        justifyContent: 'center',
    },
    markSixHomeHistoryContainer:{
        borderBottomWidth: 0,
        justifyContent: 'center',
        height: 43,
    },
    homeHistoryLeftView:{
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 0,
        marginTop: 0,
    },
    homeHistoryItemText:{
        color: listViewTxtColor.content,
        fontSize: Size.xsmall,
    },
    evenRowBackground:{
        backgroundColor: indexBgColor.homeHistoryEvenBg,
    },
    verticalBarStyle:{
        width: 4,
        height: 16,
        marginRight: 5,
        backgroundColor: lotterBgColor.cpBallBg,
    },
    homeHistoryItemTitleView:{
        width: width * 0.35,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    sscHomeItemTitleView:{
        width: width * 0.15,
    },
});