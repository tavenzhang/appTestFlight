import React, {Component,} from 'react'
import {Image, PanResponder, StyleSheet, TouchableOpacity, View} from 'react-native';
/**组件内部显示需要引入的类 */
import PropTypes from 'prop-types'

import {JX_PLAT_INFO} from "../../../Page/asset";
import {NavBarHeight} from "../../../Page/asset/screen";

/**系统 npm类 */

export default class TCTouchMoveButton extends React.Component {

    static propTypes = {
        onClick: PropTypes.func,//获取数据源方法
        contentView:PropTypes.any,
        edgeW:PropTypes.any,
        edgeH:PropTypes.any,
        initX:PropTypes.any,
        initY:PropTypes.any,
        topMargin:PropTypes.any,
        rightMargin:PropTypes.any,
        bottomMargin:PropTypes.any,
    }

    static defaultProps = {
        edgeW:JX_PLAT_INFO.SCREEN_W,
        edgeH:JX_PLAT_INFO.SCREEN_H,
        initX:50,
        initY:60,
        topMargin:NavBarHeight,
        rightMargin:0,
        bottomMargin:0
    }

    constructor(props) {
        super(props);
        this._handlePanResponderGrant = this._handlePanResponderGrant.bind(this);
        this._handlePanResponderMove = this._handlePanResponderMove.bind(this);
        this._handlePanResponderEnd = this._handlePanResponderEnd.bind(this);
        this._handleStartShouldSetPanResponder = this._handleStartShouldSetPanResponder.bind(this);
        this._handleMoveShouldSetPanResponder = this._handleMoveShouldSetPanResponder.bind(this);
        let {initX,initY}=this.props;
        this.redPacketStyls = {
            style: {
                left: initX,
                top: initY
            }
        };
    }


    componentWillMount() {
        let {initX,initY}=this.props;
        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: this._handleStartShouldSetPanResponder,
            onStartShouldSetResponderCapture: this._handleStartShouldSetPanResponder,
            onMoveShouldSetPanResponderCapture: this._handleMoveShouldSetPanResponder,
            onMoveShouldSetPanResponder: this._handleMoveShouldSetPanResponder,
            onPanResponderGrant: this._handlePanResponderGrant,
            onPanResponderMove: this._handlePanResponderMove,
            onPanResponderRelease: this._handlePanResponderEnd,
            onPanResponderTerminate: this._handlePanResponderEnd,
            onShouldBlockNativeResponder: this._handleStartShouldSetPanResponder
        });
        this.previousLeft = initX;
        this.previousTop = initY;
    }

    componentDidMount() {
        this.redPacketStyls = {
            style: {
                left: this.previousLeft,
                top: this.previousTop
            }
        };
        this._updateNativeStyles();
    }


    render() {
        let {onClick,contentView}=this.props
        return (
            <View{...this.panResponder.panHandlers}
                ref="touchView"
                style={styles.redPacket}
            >
                <TouchableOpacity onPress={onClick}>
                    {contentView}
                </TouchableOpacity>
            </View>
        );
    }

    _highlight() {
        this._updateNativeStyles();
    }

    _unHighlight() {
        this._updateNativeStyles();
    }

    _updateNativeStyles() {
        this.refs.touchView && this.refs.touchView.setNativeProps(this.redPacketStyls);
    }

    _handleStartShouldSetPanResponder(e, gestureState) {
        return true;
    }

    _handleMoveShouldSetPanResponder(e, gestureState) {
        return true;
    }

    _handlePanResponderGrant() {
        this._highlight();
    }

    _handlePanResponderMove(e, gestureState) {
        let {edgeW,edgeH,topMargin,rightMargin,bottomMargin}=this.props;
        //TW_Log("_handlePanResponderMove-----gestureState=dx=="+gestureState.dx,gestureState.dy)
        let dx = this.previousLeft + gestureState.dx;
        let dy = this.previousTop + gestureState.dy;

        dx = dx < 0 ? 0 : dx;
        dy = dy < topMargin ? topMargin : dy;
        dy = (dy+bottomMargin)>edgeH ? (edgeH-bottomMargin):dy;
        dx =(dx+rightMargin)>edgeW ? (edgeW-rightMargin):dx;
      //  dy = dy < 0 ? 0 : dy;
        dx = dx > edgeW ? edgeW : dx;
        dy = dy > edgeH ? edgeH : dy;

        this.redPacketStyls.style.left = dx;
        this.redPacketStyls.style.top = dy;
        this._updateNativeStyles();
    }

    _handlePanResponderEnd(e, gestureState) {
        this._unHighlight();
        let dx = gestureState.dx;
        let dy = gestureState.dy;

        this.previousLeft += dx;
        this.previousTop += dy;

        if (gestureState.dx == 0 && gestureState.dx == 0) {
            let {onClick}=this.props;
          if(onClick){
              onClick()
          }
        }
    }
}

const styles = StyleSheet.create({
    redPacket: {
        position: 'absolute',
        left: 60,
        top: 60
    }
});
