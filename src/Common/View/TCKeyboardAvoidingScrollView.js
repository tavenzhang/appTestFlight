import React, {Component} from 'react';
import ReactNativeComponentTree from 'react-native/Libraries/Renderer/shims/ReactNativeComponentTree';
import {Keyboard, TextInput, ScrollView, Platform,UIManager, View} from 'react-native';
import PropTypes from 'prop-types'
/**
 * 解决 React Native 自带 KeyboardAvoidingView 无法在 ScrollView 中使用的问题，用之直接替换 ScrollView 即可。
 *
 * 尝试过以下第三方库，各有问题，最终决定自己实现：
 *
 * - https://github.com/jrans/react-native-smart-scroll-view
 * - https://github.com/APSL/react-native-keyboard-aware-scroll-view
 *
 * 遗留问题:
 *
 * - 在 iOS(<9) 上，点击键盘“下一步”不能自动滚动，在 Android 上尽管未使用该组件，但也存在类似的问题
 * - 滚动动画与键盘弹出动画不同步
 */

export default class TCKeyboardAvoidingScrollView extends React.Component {
    static propTypes = {
        children: PropTypes.node,
        keyboardTopPadding: PropTypes.number,
        keyboardDismissMode:PropTypes.any,
        keyboardShouldPersistTaps:PropTypes.any,
        contentContainerStyle:PropTypes.any,
        style: PropTypes.style,
    }

    static defaultProps = {
        keyboardTopPadding: 0,
        keyboardDismissMode:"none"
    }

    constructor(props) {
        super(props);
        this._scrollView = {
            layoutMeasurement: {height: 0},
            contentSize: {height: 0},
            contentOffset: {y: 0},
        };
    }

    componentDidMount = () => {
        const keyboardShow = Platform.select({
            ios: Keyboard.addListener('keyboardWillShow', this._onShowKeyboard),
            android: Keyboard.addListener('keyboardDidShow', this._onShowKeyboard),
        });
        const keyboardHide = Platform.select({
            ios: Keyboard.addListener('keyboardWillHide', this._onHideKeyBoard),
            android: Keyboard.addListener('keyboardDidHide', this._onHideKeyBoard),
        });

        this._keyboardListeners = [keyboardShow, keyboardHide];
    }

    componentWillUnmount = () => {
        this._keyboardListeners.forEach((listener) => listener.remove());
    }

    _onShowKeyboard = (event) => {
        const focusedTextInputId = TextInput.State.currentlyFocusedField();
        // http://stackoverflow.com/questions/38651770/how-can-i-get-real-elment-by-node-id-react-native
        const focusedTextInput = ReactNativeComponentTree.getInstanceFromNode(focusedTextInputId);
        if (!focusedTextInput) {
            return;
        }

        // TODO: 升级 React Native 后，使用 UIManger.viewIsdescendantOf 判断该 TextInput 是否在当前 ScrollView 内
        //使用  UIManager.measure
        UIManager.measure(focusedTextInputId, (originX, originY, width, height, pageX, pageY) => {
           // JXLog("_onShowKeyboard----event",event)
                const keyboardEndCoordinates = event.endCoordinates;
                const overlapping = (pageY + height) -
                    keyboardEndCoordinates.screenY;
                if (overlapping + this.props.keyboardTopPadding > 0) {
                    const contentOffset = overlapping + this.props.keyboardTopPadding + this._scrollView.contentOffset.y;
                    this._delayScrollTo(contentOffset);
                }
        });
    }

    _onHideKeyBoard = () => {
        const maxOffset = this._scrollView.contentSize.height - this._scrollView.layoutMeasurement.height;
        let contentOffsetYOffset = Math.min(maxOffset, this._scrollView.contentOffset.y);
        contentOffsetYOffset = Math.max(contentOffsetYOffset, 0);
        this._delayScrollTo(contentOffsetYOffset);
    }

    _onScroll = (event) => {
        this._scrollView = event.nativeEvent;
    }

    _onLayout = (e) => {
        const layoutMeasurement = e.nativeEvent.layout;
        this._scrollView = {...this._scrollView, layoutMeasurement};
    }

    _onContentSizeChange = (width, height) => {
        const contentSize = {width, height};
        this._scrollView = {...this._scrollView, contentSize};
    }

    // 如果第一次 scrollTo 没有结束, 第二次 scrollTo 会不起作用
    _delayScrollTo = (contentOffsetY) => {
        if (Platform.OS === 'android') {
            return
        }
        if (this._delayScrollTimer) {
            clearTimeout(this._delayScrollTimer);
            this._delayScrollTimer = null;
        }

        this._delayScrollTimer = setTimeout(() => {
            if (this.refs.scrollView) {
                // JXLog("hehehe contentY scroll " + contentOffsetY);
                this.refs.scrollView.scrollTo({y: contentOffsetY});
            }

            clearTimeout(this._delayScrollTimer);
            this._delayScrollTimer = null;
        }, 20);
    }

    _scrollToTop() {
        this.refs.scrollView && this.refs.scrollView.scrollTo({y: 0});

    }


    render = () => {
        let {style,keyboardShouldPersistTaps,keyboardDismissMode,contentContainerStyle}=this.props
        if (Platform.OS === 'android') {
            return (<ScrollView style={style}
                                ref="scrollView"
                                contentContainerStyle={contentContainerStyle}
                                keyboardShouldPersistTaps={keyboardShouldPersistTaps}
                                keyboardDismissMode={keyboardDismissMode}
            >{this.props.children}</ScrollView>);
        } else {
            return (
                <ScrollView
                    style={style}
                    ref="scrollView"
                    {...this.props}
                    onScroll={this._onScroll}
                    onLayout={this._onLayout}
                    onContentSizeChange={this._onContentSizeChange}
                    scrollEventThrottle={16}
                    contentContainerStyle={contentContainerStyle}
                >
                    {this.props.children}
                </ScrollView>
            );
        }
    }
}
