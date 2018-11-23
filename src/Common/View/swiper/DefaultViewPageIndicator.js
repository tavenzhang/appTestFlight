'use strict';
import React, {Component,} from 'react'

import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    Modal,
    Dimensions,
    Animated
} from 'react-native'
import PropTypes from 'prop-types'

var deviceWidth = Dimensions.get('window').width;
var DOT_SIZE = 8;
var DOT_SAPCE = 4;


var styles = StyleSheet.create({
    tab: {
        alignItems: 'center',
    },

    tabs: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    indicators: {
        flex: 1,
        alignItems: 'center',
        position: 'absolute',
        bottom: 10,
        left: 0,
        right: 0,
        backgroundColor: 'transparent',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    dot: {
        width: DOT_SIZE,
        height: DOT_SIZE,
        borderRadius: DOT_SIZE / 2,
        backgroundColor: '#E0E1E2',
        marginLeft: DOT_SAPCE,
        marginRight: DOT_SAPCE,
    },

    curDot: {
        position: 'absolute',
        width: DOT_SIZE,
        height: DOT_SIZE,
        borderRadius: DOT_SIZE / 2,
        backgroundColor: '#80ACD0',
        margin: DOT_SAPCE,
    },
});


export default class DefaultViewPageIndicator extends Component {

    static propTypes = {
        activePage: PropTypes.number,
        pageCount: PropTypes.number
    }

    static defaultProps = {}

    constructor(props) {
        super(props)
        this.state = {viewWidth: 0,}
    }

    renderIndicator(page) {
        return (
            <View style={styles.dot} key={'idc_' + page}/>
        );
    }

    render() {
        var pageCount = this.props.pageCount;
        var itemWidth = DOT_SIZE + (DOT_SAPCE * 2);
        var offset = (this.state.viewWidth - itemWidth * pageCount) / 2 + itemWidth * this.props.activePage;

        var left = offset;
        var indicators = [];
        for (var i = 0; i < pageCount; i++) {
            indicators.push(this.renderIndicator(i))
        }

        return (
            <View style={styles.indicators}
                  onLayout={(event) => {
                      var viewWidth = event.nativeEvent.layout.width;
                      if (!viewWidth || this.state.viewWidth === viewWidth) {
                          return;
                      }
                      this.setState({
                          viewWidth: viewWidth,
                      });
                  }}>
                {indicators}
                <Animated.View style={[styles.curDot, {left}]}/>
            </View>
        );
    }
}