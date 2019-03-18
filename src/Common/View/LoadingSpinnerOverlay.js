/*
 * A smart loading spinner overlay for React Native apps, written in JS
 * https://github.com/react-native-component/react-native-smart-loading-spinner-overlay/
 * Released under the MIT license
 * Copyright (c) 2016 react-native-component <moonsunfall@aliyun.com>
 */

import React, {Component} from 'react';

import {
    View,
    Modal,
    StyleSheet,
    Animated,
    Easing,
    Dimensions,
    ActivityIndicator,
} from 'react-native'

import TimerEnhance from './TimerEnhance'
import  PropTypes from 'prop-types'
const {width: deviceWidth, height: deviceHeight,} = Dimensions.get('window')
const styles = StyleSheet.create({
    overlay: {
        position: 'absolute',
        left: 0,
        top: 0,
        zIndex: 998,
    },
    container: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        position: 'absolute',
        borderRadius: 8,
        padding: 20.5,
        left: -9999,
        top: -9999,
        zIndex: 999,
    },
})
const noop = () => {
}

class LoadingSpinnerOverlay extends Component {

    static defaultProps = {
        duration: 255,
        delay: 0,
        marginTop: 0,
        modal: true,
        visible:false
    }

    static propTypes = {
        duration: PropTypes.number,
        delay: PropTypes.number,
        marginTop: PropTypes.number,
        modal: PropTypes.bool,
        visible: PropTypes.bool,
        overlayStyle:PropTypes.any,
        style:PropTypes.any
    }

    constructor(props) {
        super(props)
        this.state = {
            visible: props.visible,
            opacity: new Animated.Value(0),
            children: props.children,
            modal: props.modal,
            marginTop: props.marginTop,
        }
        this._loadingSpinnerWidth = null
        this._loadingSpinnerHeight = null
        this._loadingSpinnerShowAnimation = null
        this._loadingSpinnerHideAnimation = null
        this._loadingSpinnerAnimationToggle = null
    }

    render() {
        let loadingSpinner = this._renderLoadingSpinner()
        return this._renderOverLay(loadingSpinner)
    }


    getWidth(){
        let marginLeft = this.props.marginLeft
        let width = deviceWidth
        if(marginLeft){
            width = deviceHeight +marginLeft;
        }
        return width;
    }

    _renderOverLay(loadingSpinner) {

        return (
            this.state.modal ?
                (this.state.marginTop === 0 ?
                    <Modal animationType={'none'}
                           transparent={true} visible={this.state.visible}
                           onRequestClose={noop}
                           supportedOrientations={[
                               'portrait',
                               'portrait-upside-down',
                               'landscape',
                               'landscape-left',
                               'landscape-right',
                           ]}
                    >

                        {loadingSpinner}
                    </Modal> :
                    (this.state.visible ?
                        <View
                            style={[styles.overlay, {
                                marginTop: this.props.marginTop,
                                width: this.getWidth(),
                                height: deviceHeight - this.props.marginTop,
                            }, this.props.overlayStyle,]}>
                            {loadingSpinner}
                        </View> : null))
                : loadingSpinner
        )
    }

    _renderLoadingSpinner() {
        let children
        if (this.state.children == null) {
            children = this._renderActivityIndicator()
        }
        else {
            children = React.Children.map(this.state.children, (child) => {
                if (!React.isValidElement(child)) {
                    return null
                }
                return child
            })
        }
        return (
            this.state.visible ?
                <Animated.View
                    ref={ component => this._container = component }
                    onLayout={this._onLoadingSpinnerLayout}
                    style={[styles.container, this.props.style, {opacity: this.state.opacity,}]}>
                    {children}
                </Animated.View> : null
        )
    }

    show({modal = this.state.modal, marginTop = this.state.marginTop, children = this.state.children, duration = this.props.duration, easing = Easing.linear, delay = this.props.delay, animationEnd,}
             = {
        modal: this.state.modal,
        marginTop: this.state.marginTop,
        children: this.state.children,
        duration: this.props.duration,
        easing: Easing.linear,
        delay: this.props.delay,
    }) {

        this._loadingSpinnerShowAnimation && this._loadingSpinnerShowAnimation.stop()
        this._loadingSpinnerHideAnimation && this._loadingSpinnerHideAnimation.stop()
        this._loadingSpinnerAnimationToggle && this.clearTimeout(this._loadingSpinnerAnimationToggle)

        if (this.state.visible) {
            this._setLoadingSpinnerOverlayPosition({modal, marginTop})
        }

        this.setState({
            children,
            modal,
            marginTop,
            visible: true,
        })

        this._loadingSpinnerShowAnimation = Animated.timing(
            this.state.opacity,
            {
                toValue: 1,
                duration,
                easing,
                delay,
            }
        )
        this._loadingSpinnerShowAnimation.start(() => {
            this._loadingSpinnerShowAnimation = null
            animationEnd && animationEnd()
        })
    }

    hide({duration = this.props.duration, easing = Easing.linear, delay = this.props.delay, animationEnd,}
             = {duration: this.props.duration, easing: Easing.linear, delay: this.props.delay,}) {

        this._loadingSpinnerShowAnimation && this._loadingSpinnerShowAnimation.stop()
        this._loadingSpinnerHideAnimation && this._loadingSpinnerHideAnimation.stop()
        this.clearTimeout(this._loadingSpinnerAnimationToggle)

        this._loadingSpinnerHideAnimation = Animated.timing(
            this.state.opacity,
            {
                toValue: 0,
                duration,
                easing,
                delay,
            }
        )
        this._loadingSpinnerHideAnimation.start(() => {
            this._loadingSpinnerHideAnimation = null
            this.setState({
                visible: false,
            })
            animationEnd && animationEnd()
        })
    }

    _onLoadingSpinnerLayout = (e) => {
        this._loadingSpinnerWidth = e.nativeEvent.layout.width
        this._loadingSpinnerHeight = e.nativeEvent.layout.height
        this._setLoadingSpinnerOverlayPosition()
    }

    _setLoadingSpinnerOverlayPosition({modal, marginTop} = {modal: this.state.modal, marginTop: this.state.marginTop}) {
        if (!this._loadingSpinnerWidth || !this._loadingSpinnerHeight) {
            return
        }

        let left = (this.getWidth() - this._loadingSpinnerWidth) / 2
        let top = (deviceHeight - this._loadingSpinnerHeight) / 2 - (modal && marginTop === 0 ? 0 : marginTop)
        this._container.setNativeProps({
            style: {
                left,
                top,
            }
        })
    }

    _renderActivityIndicator() {
        return (
            <ActivityIndicator
                style={{position: 'relative', left: 1, top: 1,}}
                animating={true}
                color={'#fff'}
                size={'large'}/>
        )
    }

    componentDidMount(){
        if(this.state.visible){
            this.show()
        }
    }
}

export default TimerEnhance(LoadingSpinnerOverlay)