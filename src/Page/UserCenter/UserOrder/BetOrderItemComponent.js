'use-strict';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import PropTypes from 'prop-types'
import {indexBgColor, listViewTxtColor, Size} from "../../resouce/theme";

export default class BetOrderItemComponent extends React.Component {

    render() {
        return (
            <View style={styles.itemStyle}>
                <Text style={styles.itemTitleStyle}>{this.props.title}：</Text>
                <Text style={styles.itemContentStyle}>{this.props.content}</Text>
            </View>
        );
    }
}

BetOrderItemComponent.propTypes = {
    title: PropTypes.string.isRequired,
    content: PropTypes.any.isRequired,
}

const styles = StyleSheet.create({
    itemStyle: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: indexBgColor.itemBg,
        borderBottomWidth: TCLineW,
        borderBottomColor: indexBgColor.mainBg,
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 10,
        paddingBottom: 10,
    },
    itemTitleStyle: {
        fontSize: Size.font16,
        color: listViewTxtColor.title
    },
    itemContentStyle: {
        flex: 1,
        textAlign: 'right',
        fontSize: Size.font16,
        color: listViewTxtColor.content,
    },
})
