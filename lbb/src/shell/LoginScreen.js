import {NavigationActions} from "react-navigation";
import React from 'react';
import {StyleSheet, View, Text, Image, TextInput, TouchableOpacity, DeviceEventEmitter} from 'react-native';
import Toast from 'react-native-toast-native';
import TView from "../Common/View/TView";
import appStore from "../Data/AppStore";
import {observer} from 'mobx-react/native';

@observer
export default class LoginScreen extends TView{

  state = {
    account: '',
    password: ''
  }

  _onNavLeftClick() {
    // DeviceEventEmitter.emit('updateUI', 'a')
    // this.props.navigation.navigate('Main')
    this.props.navigation.goBack();
  }

  login() {
    if (!this.state.account) {
      Toast.show('请输入您的账号', Toast.SHORT, Toast.BOTTOM, toastStyle);
      return
    }
    if (!this.state.password) {
      Toast.show('请输入您的密码', Toast.SHORT, Toast.BOTTOM, toastStyle);
      return
    }
    fetch('http://result.eolinker.com/giseBuH1c3227abd30d32593adcd8938a1f2042158c89ba?uri=lbbapi/login', {
      method: 'POST',
      body: JSON.stringify({account: this.state.account, password: this.state.password})
    }).then((response) => response.json())
        .then((responseJson) => {
          console.info('login() status=' + responseJson.status + ', desc=' + responseJson.desc)
          Toast.show('登录成功', Toast.SHORT, Toast.BOTTOM, toastStyle);
          storage.save({
            key: 'account', // 注意:请不要在key中使用_下划线符号!
            data: {
              username:this.state.account,
              password:this.state.password
            }
          });
          // let resetAction = NavigationActions.reset({
          //   index: 0,
          //   actions: [NavigationActions.navigate({routeName: 'Main'})]
          // })
          //   this.props.navigation.dispatch(resetAction)
            this.props.navigation.goBack();
            appStore.loginIn({
                username:this.state.account,
                password:this.state.password
            })
        })
        .catch((error) => {
          console.warn('_commitFeedback() error=' + error)
          Toast.show('登录成功，请重试', Toast.SHORT, Toast.BOTTOM, toastStyle);
        })
        .done()
  }

  toRegisterScreen() {
    this.props.navigation.navigate('Register',{title:"注册"})
  }

  renderBody() {
    return (
        <View style={{flex:1, backgroundColor:'#EBEBEB'}}>
          <Image source={require('./images/ic_avatar.png')}
                 style={{width: 72, height: 72, alignSelf: 'center', marginTop: 40}}/>
          <View style={styles.inputContainer}>
            <Image source={require('./images/ic_user.png')} style={{width: 24, height: 24}}/>
            <TextInput editable={true} maxLength={32} multiline={false}
                       placeholder={'账号'}
                       placeholderTextColor={'#bfbfbf'}
                       underlineColorAndroid={'transparent'}
                       style={styles.smallTextInput}
                       autoCapitalize={"none"}
                       onChangeText={(text) => this.setState({account: text})}
                       aut

            />
          </View>
          <View style={[styles.inputContainer, {marginTop: 10}]}>
            <Image source={require('./images/ic_password.png')} style={{width: 24, height: 24}}/>
            <TextInput editable={true} maxLength={32} multiline={false}
                       placeholder={'密码'}
                       placeholderTextColor={'#bfbfbf'}
                       autoCapitalize={"none"}
                       secureTextEntry={true}
                       underlineColorAndroid={'transparent'}
                       style={styles.smallTextInput}
                       onChangeText={(text) => this.setState({password: text})}/>
          </View>
          <TouchableOpacity activeOpacity={0.8} style={styles.loginBtn}
                            onPress={() => this.login()}>
            <Text style={styles.loginBtnText}>登录</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.8} onPress={() => this.toRegisterScreen()}>
            <Text style={styles.registerText}>新用户注册</Text>
          </TouchableOpacity>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  inputContainer: {
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    height: 45,
    paddingLeft: 10,
    paddingRight: 10,
  },
  smallTextInput: {
    height: 45,
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    fontSize: 15,
    marginLeft: 10,
    paddingTop: 0,
    paddingBottom: 0,
  },
  loginBtn: {
    backgroundColor: '#1296db',
    height: 42,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
  },
  loginBtnText: {
    color: '#ffffff',
    fontSize: 16,
    backgroundColor: 'transparent'
  },
  registerText: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'flex-end',
    color: '#1296db',
    fontSize: 14,
  }
})
