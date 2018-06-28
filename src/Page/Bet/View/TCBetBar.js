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
    View
} from 'react-native';
import SoundHelper from '../../../Common/JXHelper/SoundHelper'
import {common} from '../../resouce/images'
import {indexTxtColor, popuWinStyle, Size, titleBarStyle} from '../../resouce/theme'
import {NavBarHeaderHeight} from "../../asset/screen";
import {themeViewStyle} from "../../asset/theme";

const NavIconSize = NavBarHeaderHeight

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
        rightTitle: '购彩助手',
    }

    render() {
        let centerTitle = this.state.title
        let withTail = centerTitle.includes('-');
        if (withTail) {
            centerTitle = centerTitle.replace('-', `${'\n'}`)
        }
        return (
            <ImageBackground style={themeViewStyle.navBar} source={common.topBg} resizeMode={'cover'}>
                <View style={themeViewStyle.navBarLeftItem}>{this.renderLeftItem()}</View>
                <View style={themeViewStyle.navBarCenterItem}>
                    <Text style={styles.playTitle}>玩法</Text>
                    <TouchableOpacity onPress={this.centerButtonCall}>
                        <View style={styles.centerItemBorder}>
                            <Text style={withTail ? styles.titleWithTailStyle : styles.titleStyle}>{centerTitle}</Text>
                            <Image source={common.topBarArrow} style={styles.arrowImgStyle}/>
                        </View>
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
                    <Image source={common.back} style={styles.navIcon} resizeMode={Image.resizeMode.contain}/>
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

        if (TC_BUTTON_SOUND_STATUS) {
            SoundHelper.playSoundBundle();
        }

        this.props.backButtonCall();
    }

    rightButtonCall() {
        if (this.props.rightButtonCall == null) return;

        if (TC_BUTTON_SOUND_STATUS) {
            SoundHelper.playSoundBundle();
        }

        this.props.rightButtonCall();
    }

    centerButtonCall = () => {
        if (this.props.centerButtonCall == null) return;

        if (TC_BUTTON_SOUND_STATUS) {
            SoundHelper.playSoundBundle();
        }

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
        flexDirection:'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 3,
        borderWidth: 1,
        borderColor: popuWinStyle.titleBorder,
        paddingLeft: 10,
        paddingRight: 10,
        marginTop: 5,
        marginBottom:5,
        height: 35
    },
    arrowImgStyle: {
        width: Platform.OS === 'ios' ? 12 : 12,
        height: Platform.OS === 'ios' ? 7 : 8,
        marginLeft: 5,
    },
    playTitle: {
        width: 16,
        color: titleBarStyle.titleText,
        fontSize: Size.font12,
        marginRight: 5,
    },
    titleStyle: {
        fontSize: Size.font18,
        color: popuWinStyle.titleColor,
        // fontWeight: 'bold',
        textAlign: 'center',
        textAlignVertical: 'center',
    },
    titleWithTailStyle: {
        fontSize: Size.font15,
        color: popuWinStyle.titleColor,
        // fontWeight: 'bold',
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
