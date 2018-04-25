/**
 * Created by joyce-jx on 2017/6/17.
 */

import React from 'react';
import {View, StyleSheet, Text, ScrollView, Platform} from 'react-native';
import Moment from 'moment';

import {Size, width, indexBgColor, userCenterTxtColor, loginAndRegeisterBorderColor} from '../../resouce/theme';
import TopNavigationBar from '../../../Common/View/TCNavigationBar';
import BackBaseComponent from '../../Base/TCBaseBackComponent';

export default class TCUserFeedbackView extends BackBaseComponent {
    getItemContent(title, rightTxt, content) {
        return (
            <View style={styles.contentItemContainer}>
                <View style={styles.itemContainer}>
                    <Text style={styles.txtLeft}>{title}</Text>
                    <Text style={styles.txtRight}>{rightTxt}</Text>
                </View>
                <View style={styles.itemContentContainer}>
                    <Text style={styles.txtItem}>{content}</Text>
                </View>
            </View>
        );
    }

    goBack() {
        this.props.navigator.pop();
    }

    render() {
        let questionUser = this.props.rowData.userName ? '提问人:' + this.props.rowData.username : '';
        let createdTime = this.props.rowData.createTime;
        let updatedTime = this.props.rowData.updateTime;
        let createdTimeValue = null;
        let updatedTimeValue = null;
        if (createdTime && createdTime != 0) {
            createdTimeValue = Moment(createdTime * 1000).format("YYYY-MM-DD HH:mm");
        }

        if (updatedTime && updatedTime != 0) {
            updatedTimeValue = Moment(updatedTime * 1000).format("YYYY-MM-DD HH:mm");
        }

        return (
            <View style={styles.container}>
                <TopNavigationBar
                    title={'意见反馈'}
                    needBackButton
                    backButtonCall={() => this.goBack()}
                />
                <ScrollView
                    keyboardShouldPersistTaps={Platform.OS !== 'ios'}
                    keyboardDismissMode={Platform.OS == 'ios' ? 'on-drag' : 'none'}>
                    <View style={styles.contentContainer}>
                        {this.getItemContent('标题', questionUser, this.props.rowData.title)}
                        {this.getItemContent('反馈内容', createdTimeValue, this.props.rowData.content)}
                        {
                            this.props.rowData.answer &&
                            this.getItemContent('回复内容', updatedTimeValue, this.props.rowData.answer)
                        }
                    </View>
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
    contentItemContainer: {
        marginVertical: 10,
    },
    contentContainer: {
        width: width * 0.9,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: width * 0.9,
    },
    txtLeft: {
        marginLeft: 5,
        color: userCenterTxtColor.feedBackTitle,
        textAlign: 'center',
        fontSize: Size.font14,
    },
    txtRight: {
        color: userCenterTxtColor.feedBackTitle,
        textAlign: 'center',
        fontSize: Size.font12,
    },
    itemContentContainer: {
        marginTop: 6,
        justifyContent: 'center',
        padding: 10,
        borderWidth: 0.6,
        borderRadius: 3,
        borderColor: loginAndRegeisterBorderColor.inputBorder,
        backgroundColor: indexBgColor.itemBg,
    },
    txtItem: {
        color: userCenterTxtColor.feedBackTitle,
    },
})
