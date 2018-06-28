/**
 * Created by Joyce on 2017/01/07.
 */

import React, {PropTypes} from 'react';
import {StyleSheet, Platform, View, Text, TouchableOpacity, Image, StatusBar} from 'react-native';
import {common} from '../../resouce/images';
import {Size, width} from '../../resouce/theme';
import Helper from '../../../Common/JXHelper/TCNavigatorHelper';
import {navbarHight,navbarMarginTop} from '../../asset'

export default class TCNavigationBar extends React.Component {
    // static propTypes = {
    //     title: PropTypes.string.isRequired,
    //     hiddenRightButton: PropTypes.bool,
    // }

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity underlayColor='#DEDEDE' onPress={() => this.goBack()}>
                    <View style={styles.leftContainer}>
                        <Image source={common.back} style={styles.leftImage}/>
                    </View>
                </TouchableOpacity>
                <Text style={styles.title} ellipsizeMode='tail' numberOfLines={1}>{this.props.title}</Text>
                <TouchableOpacity
                    style={styles.rightContainer}
                    underlayColor='#DEDEDE'
                    disabled={this.props.hiddenRightButton ? true : false}
                    onPress={() => this.goRules()}
                >
                        <Text style={styles.title}>{this.props.hiddenRightButton ? '' : '规则'}</Text>
                </TouchableOpacity>
            </View>
        );
    }

    goBack() {
        Helper.popToBack();
    }

    goRules() {
        Helper.pushToRedPacketRules();
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: width,
        height: navbarHight,
        paddingTop: StatusBar.currentHeight,
        borderBottomWidth: 1,
        borderBottomColor: '#CB202F',
        backgroundColor: '#E92637',
    },
    leftContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: 60,
    },
    leftImage: {
        width: 45,
        height: 45,
    },
    title: {
        color: '#FFFFFF',
        fontSize: Size.font17,
    },
    rightContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 50,
        height: 45,
    },
});
