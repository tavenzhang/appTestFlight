/**
 * Created by Joyce on 2017/01/07.
 */
import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {common} from '../../resouce/images';
import {indexTxtColor, Size} from '../../resouce/theme';
import Helper from '../../../Common/JXHelper/TCNavigatorHelper';
import {NavBarHeaderHeight} from "../../asset/screen";
import {themeViewStyle} from "../../asset/theme";

const NavIconSize = NavBarHeaderHeight

export default class TCNavigationBar extends React.Component {

    render() {
        return (
            <View style={[themeViewStyle.navBar, styles.container]}>
                <TouchableOpacity style={themeViewStyle.navBarLeftItem} underlayColor='#DEDEDE' onPress={() => this.goBack()}>
                    <View style={{justifyContent: 'center', alignItems: 'center'}}>
                        <Image source={common.back} style={styles.navIcon}/>
                    </View>
                </TouchableOpacity>

                <View style={themeViewStyle.navBarCenterItem}>
                    <Text style={styles.titleStyle} ellipsizeMode='tail' numberOfLines={1}>{this.props.title}</Text>
                </View>

                <TouchableOpacity style={themeViewStyle.navBarRightItem} underlayColor='#DEDEDE' disabled={this.props.hiddenRightButton} onPress={() => this.goRules()}>
                    <View style={{justifyContent: 'center', alignItems: 'center', paddingRight: 10}}>
                        <Text style={styles.rightBoldTitleStyle}>{this.props.hiddenRightButton ? '' : '规则'}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
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
        borderBottomWidth: 1,
        borderBottomColor: '#CB202F',
        backgroundColor: '#E92637',
    },
    navIcon: {
        width: NavIconSize,
        height: NavIconSize,
    },
    titleStyle: {
        fontSize: Size.font20,
        color: indexTxtColor.topTitle,
        fontWeight: 'bold',
        textAlign: 'center',
        textAlignVertical: 'center',
    },
    rightBoldTitleStyle: {
        fontSize: Size.font18,
        color: indexTxtColor.topTitle,
        fontWeight: 'bold',
        textAlign: 'center',
        textAlignVertical: 'center',
    },
});
