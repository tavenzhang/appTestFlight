/**
 * Created by Sam on 2016/11/11.
 */

/*
 ** use for import **
 import TopNavigationBar from '../../Common/View/TCNavigationBar'
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Platform,
    Image,
    ImageBackground,
    TouchableOpacity
} from 'react-native';
import jdAppStore from '../../Data/store/JDAppStore'
import {width, indexTxtColor, Size} from '../../Page/resouce/theme'

import _ from 'lodash';
import {common} from '../../Page/asset/images'
import {NavBarHeaderHeight} from "../../Page/asset/screen";
import {themeViewStyle} from "../../Page/asset/theme";
import PropTypes from 'prop-types'

const NavIconSize = NavBarHeaderHeight

export default class TCNavigationBar extends Component {

    constructor(state) {
        super(state);
        this.state = {
            showBackButton: (this.props.needBackButton),
            showCloseButton: false
        };
    }

    static propTypes = {
        title: PropTypes.any,
        needBackButton: PropTypes.any,
        rightTitle: PropTypes.any,
        rightImage: PropTypes.any,
        leftTitle: PropTypes.any,
        leftImage: PropTypes.any,
        rightButtonCall: PropTypes.any,
        closeButtonCall: PropTypes.any,
        titleStyle: PropTypes.object,
        centerViewShowStyleImage: PropTypes.any,
        backButtonCall: PropTypes.fun
    }

    static defaultProps = {
        title: '',
        needBackButton: true,
        rightTitle: '',
        rightImage: null,
        leftTitle: null,
        leftImage: null,
        rightButtonCall: null,
        closeButtonCall: null,
        titleStyle: null,
        centerViewShowStyleImage: false
    }

    render() {
        return (
            <ImageBackground style={themeViewStyle.navBar} source={common.topBg} resizeMode={'cover'}>
                <View style={themeViewStyle.navBarLeftItem}>{this.renderLeftItem()}</View>
                <View style={themeViewStyle.navBarCenterItem}>
                    <TouchableOpacity disabled={!this.props.midCall} onPress={()=>this.props.midCall()}>
                        {this.renderCenterItem()}
                    </TouchableOpacity>
                </View>
                <View style={themeViewStyle.navBarRightItem}>{this.renderRightItem()}</View>
            </ImageBackground>
        );
    }

    renderCenterItem() {
        if (this.props.renderCenter) {
            return (this.props.renderCenter())
        }
        if (this.props.centerViewShowStyleImage && common.topTitleIndex) {
            return (
                <Image source={common.topTitleIndex} resizeMode={'contain'}
                       style={{width: width - 180, height: NavIconSize,}}/>
            )
        }
        return (<Text style={styles.titleStyle} ellipsizeMode='tail' numberOfLines={1}> {this.props.title} </Text>)
    }

    renderLeftItem() {
        if (this.state.showCloseButton) {
            return (
                <TouchableOpacity
                    onPress={() => this.backButtonCall()}
                    underlayColor='#DEDEDE'>
                    <Image source={common.back} style={styles.navIcon}/>
                </TouchableOpacity>
            )
        }

        if (this.props.needBackButton) {
            return (
                <TouchableOpacity
                    onPress={this.backButtonCall}
                    underlayColor='#DEDEDE'>
                    {this.getBackImage()}
                </TouchableOpacity>
            )
        }

        if (this.props.leftTitle) {
            return (
                <TouchableOpacity
                    onPress={() => {
                        this.backButtonCall()
                    }}
                    underlayColor='#DEDEDE'>
                    <View style={{justifyContent: 'center', alignItems: 'center', paddingLeft: 10}}>
                        <Text style={styles.leftTitleStyle}>{this.props.leftTitle}</Text>
                    </View>
                </TouchableOpacity>
            )
        }
    }

    getBackImage() {
        if (_.startsWith(this.props.leftImage, 'index_personal')) {
            return <Image source={common.topPersonal} style={styles.navIcon} resizeMode={Image.resizeMode.contain}/>
        } else if (this.props.leftImage) {
            return <Image source={{uri: this.props.leftImage}} style={styles.navIcon}
                          resizeMode={Image.resizeMode.contain}/>
        } else {
            return <Image source={common.back} style={styles.navIcon}/>
        }
    }

    backButtonCall = () => {
        if (this.props.backButtonCall == null) return;
        jdAppStore.playSound();
        this.props.backButtonCall();
    }

    renderRightItem() {
        if (this.props.rightTitle) {
            return (
                <TouchableOpacity underlayColor='#DEDEDE' onPress={() => {
                    this.rightButtonCall()
                }}>
                    <View style={{justifyContent: 'center', alignItems: 'center', paddingRight: 10}}>
                        <Text
                            style={this.props.rightTitle.length === 2 ? styles.rightBoldTitleStyle : styles.rightTitleStyle}>
                            {this.props.rightTitle}
                        </Text>
                    </View>
                </TouchableOpacity>
            )
        } else if (this.props.rightImage) {
            return (
                <TouchableOpacity underlayColor='#DEDEDE' onPress={() => {
                    this.rightButtonCall()
                }}>
                    <View style={{justifyContent: 'center', alignItems: 'center'}}>
                        <Image source={this.props.rightImage} style={styles.navIcon}/>
                    </View>
                </TouchableOpacity>
            )
        }
    }

    closeButtonCall() {
        if (this.props.closeButtonCall == null) return;
        this.props.closeButtonCall();
    }

    rightButtonCall() {
        if (this.props.rightButtonCall == null) return;
        jdAppStore.playSound();
        this.props.rightButtonCall();
    }

    _showCloseButton(show) {
        this.setState({showCloseButton: show})
    }
}

const styles = StyleSheet.create({
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
    leftTitleStyle: {
        fontSize: Size.font18,
        color: indexTxtColor.topTitle,
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
