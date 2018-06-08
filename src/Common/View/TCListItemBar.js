'use-strict';
import React from 'react';
import {StyleSheet, TouchableOpacity, View, Text, Image} from 'react-native';
import PropTypes from 'prop-types';
import {indexBgColor, listViewTxtColor, Size, width} from "../../Page/resouce/theme";

/**
 *
 * @author: Mason
 */
export default class TCListItemBar extends React.Component {

    render() {
        const {leftIcon, rightIcon, text, onClick} = this.props
        return (
            <TouchableOpacity style={styles.root} activeOpacity={0.7} onPress={onClick}>
                <View style={styles.leftContainer}>
                    <Image style={styles.leftIcon} resizeMode={'contain'} source={leftIcon}/>
                    <Text style={styles.text}>{text}</Text>
                </View>
                <Image style={styles.rightIcon} resizeMode={'contain'} source={rightIcon}/>
            </TouchableOpacity>
        );
    }
}

TCListItemBar.propTypes = {
    leftIcon: PropTypes.string,
    rightIcon: PropTypes.string,
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func
}

const styles = StyleSheet.create({
    root: {
        width: width,
        height: 55,
        backgroundColor: indexBgColor.itemBg,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 15,
        paddingRight: 15,
        borderBottomWidth: 1,
        borderBottomColor: indexBgColor.mainBg,
    },
    leftContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    leftIcon: {
        width: 40,
        height: 40,
        marginRight: 10
    },
    text: {
        fontSize: Size.default,
        color: listViewTxtColor.title
    },
    rightIcon: {
        width: 20,
        height: 20,
    },
})
