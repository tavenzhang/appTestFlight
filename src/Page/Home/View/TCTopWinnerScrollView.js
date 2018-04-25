/**
 * Created by Sam on 10/02/2017.
 * Copyright © 2017年 JX. All rights reserved.
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ListView,
    Dimensions,
    TouchableOpacity,
    Animated,
    Easing,
    Platform
} from 'react-native';

/**系统 npm类 */
import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter'

/**组件内部显示需要引入的类 */
import {width, indexBgColor, indexTxtColor, Size} from '../../resouce/theme'


/** 外部关系组件 如 页面跳转用 */
import NavigatorHelper from '../../../Common/JXHelper/TCNavigatorHelper'

let listItem = []


export default class MyComponent extends React.Component {

  updateAction = (data) => {
    this.setState({
      rowData: data,
    })
  }

  constructor(state) {
    super(state)
    this.state = {
      dataSource: new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2}),
      y: new Animated.Value(0),
    }
    this.stateAnimation = 'start';
    this.lastAnimationDuration = 0;
    this.lastTimeStopValue = 0;
  }

  static defaultProps = {
    rowData: []
  }

  componentDidMount() {
    if (!this.props.rowData || this.props.rowData.length == 0) {
      return
    }

    let array = this.props.rowData.slice(0, 4)
    let c = this.props.rowData.concat(array)

    listItem = c
    this.animatedWithValue()

    this.setState({
      rowData: this.props.rowData
    })

    this.listener = RCTDeviceEventEmitter.addListener('needChangeAnimated', (state) => {
      this.animationState(state);
    })

    if (Platform.OS === 'ios') {
      this.state.y.addListener((obj) => {
        if (obj.value != 0) {
          this.lastTimeStopValue = obj.value
        }
      })
    }
  }

  animationState(state) {
    if (this.stateAnimation == state) return;
    this.stateAnimation = state;
    if (state == 'stop') {
      this.state.y.stopAnimation(()=> {
        if (this.lastTimeStopValue != 0) {
          let duration = listItem.length * 1500
          this.lastAnimationDuration = duration - (-this.lastTimeStopValue) / 25 * 1500
          let toValueLast = this.lastTimeStopValue
          Animated.timing(this.state.y, {toValue: toValueLast, duration: 0, easing: Easing.linear}).start(() => {

          });
        }
      });
    } else {
      if (this.lastAnimationDuration > 0) {
        this.animatedWithValue(this.lastAnimationDuration);
      } else {
        this.animatedWithValue();
      }
    }
  }

  componentWillUnmount() {
    if (this._autoPlayer) {
      clearInterval(this._autoPlayer);
      this._autoPlayer = null;
    }
    this.listener && this.listener.remove()
    this.state.y.removeAllListeners()
  }

  componentWillReceiveProps(nextprops) {
    this.setState({
      rowData: nextprops.rowData
    })
  }

  animatedWithValue(durationLast) {

    let value = -listItem.length * 25 + 25 * 4
    let duration = listItem.length * 1500
    this.animatedObj = Animated.timing(this.state.y, {
      toValue: value < 0 ? value : -30,
      duration: durationLast ? durationLast : duration,
      easing: Easing.linear
    });

    if (this.stateAnimation != 'stop') {
      this.animatedObj.start(() => {
        Animated.timing(this.state.y, {toValue: 0, duration: 0, easing: Easing.linear}).start(() => {
          this.lastAnimationDuration = 0
          if (this.stateAnimation != 'stop')
          this.animatedWithValue()
        });
      });
    }
  }

  render() {
    return (
        <View style={styles.container}>
          <View style={{backgroundColor: indexBgColor.mainBg, height: 10}}></View>
          <Text
              style={{
                marginLeft: 10,
                marginTop: 8,
                marginBottom: 10,
                color: indexTxtColor.winnerTitle,
                fontSize: Size.font16
              }}>最新中奖榜</Text>
          <TouchableOpacity style={{height: 110, marginBottom: 5, overflow: 'hidden'}}
                            onPress={() => NavigatorHelper.pushToTopWinnerDetail(this)}>
            {this.getAnimatedView()}
          </TouchableOpacity>
        </View>
    )
  }

  getAnimatedView() {
    return (
        <Animated.View style={{height: 105, position: 'absolute', top: this.state.y}}>
          {this.getInputView()}
        </Animated.View>
    )
  }

  getInputView() {
    if (!this.state.rowData || this.state.rowData.length == 0) {
      return
    }
    let array = this.state.rowData.slice(0, 4)
    let c = this.state.rowData.concat(array)
    listItem = c
    let Arr = []
    listItem.map(
        (item, index) => {
          Arr.push(<TopWinnerLabel data={item} key={index}/>)
        }
    )
    return Arr
  }

  renderRow(rowData, sectionID, rowID) {
    return (<TopWinnerLabel data={rowData}/>)
  }
}


class TopWinnerLabel extends React.Component {
  constructor(state) {
    super(state)
    this.state = {}
  }

  static defaultProps = {
    data: {}
  }

  componentDidMount() {
  }

  render() {
    return (
        <View style={styles.labelStyle}>
          <Text
              style={{
                width: 70,
                marginLeft: 10,
                marginRight: 20,
                color: indexTxtColor.winner,
                fontSize: Size.font16
              }}>{this.props.data.username}</Text>
          <Text
              style={{
                width: width / 3 + 20,
                color: indexTxtColor.winnerMoney,
                fontSize: (width >= 375 ? Size.font15 : Size.font13)
              }}>喜中{this.props.data.winningAmount}元</Text>
          <Text
              style={{
                width: width / 3 + 30,
                color: indexTxtColor.winnerCpName,
                fontSize: (width >= 375 ? Size.font15 : Size.font13)
              }}>购买{this.props.data.gameNameInChinese}</Text>
        </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: indexBgColor.itemBg,
    height: 150,
    width: width,
  },
  labelStyle: {
    backgroundColor: indexBgColor.itemBg,
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 25,
  }

});
