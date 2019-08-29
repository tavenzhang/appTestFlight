import TView from "../../Common/View/TView";

'use-strict';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {NavigationActions} from 'react-navigation';
import NavBarComponent from '../component/NavBarComponent';
import TabItemComponent from '../component/TabItemComponent';
import Toast from "react-native-toast-native";

import {observer} from 'mobx-react/native';
import appStore from "../../Data/AppStore";

@observer
export default class SettingsScreen extends TView{

  exitAccount() {
    storage.remove({key: 'account'});
    appStore.loginOut(); this.props.navigation.goBack();

    this.props.navigation.navigate('Login', {title: "登陆"})
    // let resetAction = NavigationActions.reset({
    //   index: 0,
    //   actions: [NavigationActions.navigate({routeName: 'Login'})]
    // })
    // this.props.navigation.dispatch(resetAction)
  }

  clearCache() {

    setTimeout(() => {
      Toast.show('已清除缓存', Toast.SHORT, Toast.BOTTOM, toastStyle);
    }, 300)
  }


  renderBody() {
    return (
        <View style={{flex: 1, backgroundColor:'#EBEBEB'}}>

          <View style={{flex: 1, backgroundColor: '#EBEBEB'}}>
            <View style={{height: 1, backgroundColor: '#E9E9E9', marginTop: 10}}/>
            <TabItemComponent tabTxt={'版本号'} rightText={'v1.0.0'}/>
            <View style={{height: 1, backgroundColor: '#E9E9E9'}}/>
            <TabItemComponent tabTxt={'清除缓存'} rightIcon={require('../images/ic_arrow_right.png')}
                              onTabItemClick={() => this.clearCache()}/>
            <View style={{height: 1, backgroundColor: '#E9E9E9'}}/>
            <View style={{flex: 1, justifyContent: 'flex-end'}}>
              <TouchableOpacity style={styles.exitBtn} onPress={() => this.exitAccount()}>
                <Text style={styles.exitBtnText}>退出登录</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  textInput: {
    height: 200,
    backgroundColor: '#ffffff',
    fontSize: 16,
    padding: 10,
    margin: 10,
    textAlignVertical: 'top'
  },
  exitBtn: {
    backgroundColor: '#1296db',
    height: 42,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  exitBtnText: {
    color: '#ffffff',
    fontSize: 16,
    backgroundColor: 'transparent'
  }
})
