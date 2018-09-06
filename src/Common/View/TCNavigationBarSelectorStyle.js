/**
 * Created by Sam on 2016/11/14.
 *
 *  ** use for import **
 *  import TopNavigationBar from '../../Common/View/TCNavigationBar'
 *
 */
import React from 'react';
import {
    Image,
    ImageBackground,
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import {common} from '../../Page/resouce/images'
import {NavBarHeaderHeight} from "../../Page/asset/screen";
import {themeViewStyle} from "../../Page/asset/theme";

const NavIconSize = NavBarHeaderHeight
import {Size, width, indexTxtColor, popuWinStyle} from '../../Page/resouce/theme'
import jdAppStore from '../../Data/store/JDAppStore'

export default class TCBetBar extends React.Component {

    constructor(state) {
        super(state);
        this.state = {
            showBackButton: (this.props.needBackButton),
            title: this.props.title,
        };
    }

    static defaultProps = {
        title: '',
        needBackButton: true,
        backButtonCall: null,
        centerButtonCall: null,
        rightButtonCall: null,
        rightTitle: '',
    }

    render() {
        return (
            <ImageBackground style={themeViewStyle.navBar} source={common.topBg} resizeMode={'cover'}>
                <View style={themeViewStyle.navBarLeftItem}>{this.renderLeftItem()}</View>
                <View style={themeViewStyle.navBarCenterItem}>
                    <TouchableOpacity onPress={this.centerButtonCall} style={styles.centerItemBorder}>
                        <Text style={styles.titleStyle}>{this.state.title}</Text>
                        <Image source={common.topBarArrow} style={styles.arrowImgStyle}/>
                    </TouchableOpacity>
                </View>
                <View style={themeViewStyle.navBarRightItem}>{this.renderRightItem()}</View>
            </ImageBackground>
        );
    }

    renderLeftItem() {
        if (this.state.showBackButton) {
            return (
                <TouchableOpacity onPress={this.backButtonCall.bind(this)} underlayColor='#DEDEDE'>
                    <Image source={common.back} style={styles.navIcon}/>
                </TouchableOpacity>
            )
        }
    }

    renderRightItem() {
        if (this.props.rightTitle) {
            return (
                <TouchableOpacity onPress={() => {this.rightButtonCall()}} underlayColor='#DEDEDE'>
                    <View style={{justifyContent: 'center', alignItems: 'center', paddingRight: 10}}>
                        <Text style={this.props.rightTitle.length === 2 ? styles.rightBoldTitleStyle : styles.rightTitleStyle}>
                            {this.props.rightTitle}
                        </Text>
                    </View>
                </TouchableOpacity>
            )
        }
    }

    backButtonCall() {
        if (this.props.backButtonCall == null) return;
        jdAppStore.playSound();
        this.props.backButtonCall();
    }

    rightButtonCall() {
        if (this.props.rightButtonCall == null) return;
        this.props.rightButtonCall();
    }

    centerButtonCall = () => {
        if (this.props.centerButtonCall == null) return;
        this.props.centerButtonCall();
    };

    setTitle(playMathName) {
        this.setState({
            title: playMathName
        })
    }
}

const styles = StyleSheet.create({
    navIcon: {
        width: NavIconSize,
        height: NavIconSize,
    },
    centerItemBorder:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 3,
        borderWidth: 1,
        borderColor: popuWinStyle.titleBorder,
        paddingLeft: 10,
        paddingRight: 10,
        marginTop: 5,
        marginBottom:5,
        height: 34
    },
    arrowImgStyle: {
        width: Platform.OS === 'ios' ? 12 : 16,
        height: Platform.OS === 'ios' ? 7 : 10,
        marginLeft: 5,
    },
    titleStyle: {
        fontSize: Size.font20,
        color: popuWinStyle.titleColor,
        fontWeight: 'bold',
        textAlign: 'center',
        textAlignVertical: 'center',
    },
    rightTitleStyle: {
        fontSize: Size.font16,
        color: indexTxtColor.topTitle,
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
