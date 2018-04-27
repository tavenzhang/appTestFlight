'use strict'
/**
 * Created by Allen on 2016/12/10.
 */
import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View,} from 'react-native';

import TopNavigationBar from '../../../Common/View/TCNavigationBar';
import BackBaseComponent from '../../Base/TCBaseBackComponent'
import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter'
import UserInfo from '../../UserCenter/UserInfo/TCAddUserInfo'
import InitHelper from '../../../Common/JXHelper/TCInitHelper'
import JXHelper from '../../../Common/JXHelper/JXHelper'
import {personal} from '../../resouce/images'
import {indexBgColor, Size, userCenterTxtColor} from '../../resouce/theme'
import Toast from '../../../Common/JXHelper/JXToast';

let helper = new InitHelper()

export default class TCUserDetailMsg extends BackBaseComponent {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    super.componentDidMount()
  }

  componentWillUnmount() {
    super.componentWillUnmount()
  }

  render() {
    return (
        <View style={styles.container}>
          < TopNavigationBar
              title={'个人信息'}
              needBackButton={true}
              backButtonCall={() => {
                this.back()
              }}/>
          <View style={styles.setItem}>
            <Text style={styles.itemTxt}>头像</Text>
            {/*<Image source={personal.userDefaultIcon} style={styles.imgUser}/>*/}
            <View style={{
              marginRight: 10,
              height: 40,
              width: 40,
              borderRadius: 20,
              borderWidth: TCLineW,
              borderColor: 'rgba(0,0,0,0.3)',
              backgroundColor: TCUSER_ICON_BGCOLOR,
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Text style={{
                fontSize: 15,
                fontWeight: 'bold',
                color: 'white'
              }}>{JXHelper.getUserIconShowName(TCUSER_DATA.username)}</Text>
            </View>
          </View>
          <View style={styles.setItem}>
            <Text style={styles.itemTxt}>用户名</Text>
            <Text style={styles.itemRightTxt}>{TCUSER_DATA.username}</Text>
          </View>
          <TouchableOpacity onPress={() => {
            this.gotoChangeRealName()
          }}>
            <View style={styles.setItem}>
              <Text style={styles.itemTxt}>身份信息</Text>
              {this.getUserInfo()}
            </View>
          </TouchableOpacity>
          <View style={{marginTop: 10}}>
            <View style={styles.setItem}>
              <Text style={styles.itemTxt}>余额</Text>
              <Text style={styles.itemRightTxt}>{TCUSER_BALANCE}</Text>
            </View>
            {this.getPrizeGroup()}
          </View>
        </View>);
  };

  back() {
    RCTDeviceEventEmitter.emit('balanceChange')
    this.props.navigation.goBack()
  }

  /**
   * 跳转到修改真实姓名
   */
  gotoChangeRealName() {
    if (helper.isGuestUser()) {
      Toast.showShortCenter('试玩账号不能修改身份信息！')
      return
    }
    let page = TCUSER_DATA.realname ? 'UserMessage' : 'UserInfo'
    this.props.navigation.navigate(page)
    // let {navigator} = this.props;
    // if (navigator) {
    //     var page = UserRealName
    //     if (!TCUSER_DATA.realname) {
    //         page = UserInfo
    //     }
    //     navigator.push({
    //         name: 'userRealName',
    //         component: page,
    //         passProps: {
    //             ...this.props,
    //         }
    //     })
    // }
  }

  /**
   * 获取奖金组信息
   * @returns {XML}
   */
  getPrizeGroup() {
    if (TCUSER_DATA.prizeGroup) {
      return (<View style={styles.setItem}>
        <Text style={styles.itemTxt}>彩票返点</Text>
        <Text style={styles.itemRightTxt}>{TCUSER_DATA.prizeGroup}</Text>
      </View>)
    }
  }

  /**
   * 根据用户是否存在真实姓名显示组件
   * @returns {XML}
   */
  getUserInfo() {
    if (TCUSER_DATA.realname) {
      return (<View style={styles.itemRight}>
        <Text style={styles.itemRightTxt}>{TCUSER_DATA.realname}</Text>
        <Image source={personal.imgNext} style={styles.imgNext}/>
      </View>)
    } else {
      return (<View style={styles.itemRight}>
        <Text style={styles.itemRightTxt}>待认证</Text>
        <View style={styles.pointStyle}/>
        <Image source={personal.imgNext} style={styles.imgNext}/>
      </View>)
    }
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: indexBgColor.mainBg,
  },
  imgNext: {
    width: 10,
    height: 15,
    marginRight: 10
  },
  setItem: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: indexBgColor.itemBg,
    marginTop: 1,
    justifyContent: 'space-between'
  },
  itemTxt: {
    marginLeft: 10,
    fontSize: Size.font16,
    color: userCenterTxtColor.userDetailTitle
  }, itemRightTxt: {
    fontSize: Size.large,
    marginRight: 10,
    color: userCenterTxtColor.userDetailTitle
  },
  pointStyle: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'red'
  },
  imgUser: {
    width: 40,
    height: 40,
    marginRight: 10
  }, itemRight: {
    flexDirection: 'row',
    alignItems: 'center'
  }
});
