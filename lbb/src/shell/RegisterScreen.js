import {NavigationActions} from "react-navigation";

'use-strict';
import React from 'react';
import {StyleSheet, View, Text, Image, TextInput, TouchableOpacity} from 'react-native';
import Toast from "react-native-toast-native";
import TView from "../Common/View/TView";
import appStore from "../Data/AppStore";
import {observer} from 'mobx-react/native';

@observer
export default class RegisterScreen extends TView{

  state = {
    account: '',
    email:'',
    password: '',
    passwordAgain: ''
  }


  register() {
    if (!this.state.account) {
      Toast.show('请输入账号', Toast.SHORT, Toast.BOTTOM, toastStyle);
      return
    }
    if (this.state.account.length < 4) {
      Toast.show('账号长度至少为4位', Toast.SHORT, Toast.BOTTOM, toastStyle);
      return
    }
    if (!this.state.email) {
      Toast.show('请输入手机号码', Toast.SHORT, Toast.BOTTOM, toastStyle);
      return
    }
    if (this.state.email.length < 10) {
      Toast.show('请输入正确的手机号码', Toast.SHORT, Toast.BOTTOM, toastStyle);
      return
    }
    if (!this.state.password) {
      Toast.show('请输入密码', Toast.SHORT, Toast.BOTTOM, toastStyle);
      return
    }
    if (this.state.password.length < 6) {
      Toast.show('密码长度至少为6位', Toast.SHORT, Toast.BOTTOM, toastStyle);
      return
    }
    if (!this.state.passwordAgain) {
      Toast.show('请再次输入密码', Toast.SHORT, Toast.BOTTOM, toastStyle);
      return
    }
    if (this.state.password !== this.state.passwordAgain) {
      Toast.show('密码不一致，请重新输入', Toast.SHORT, Toast.BOTTOM, toastStyle);
      return
    }

    fetch('http://result.eolinker.com/giseBuH1c3227abd30d32593adcd8938a1f2042158c89ba?uri=lbbapi/register', {
      method: 'POST',
      body: JSON.stringify({account: this.state.account, email:this.state.email, password: this.state.password})
    }).then((response) => response.json())
        .then((responseJson) => {
          console.info('register() status=' + responseJson.status + ', desc=' + responseJson.desc)
          Toast.show('注册成功', Toast.SHORT, Toast.BOTTOM, toastStyle);
          storage.save({
            key: 'account',
            data: {
              username:this.state.account,
              password:this.state.password
            }
          });

          appStore.loginIn({
                username:this.state.account,
                password:this.state.password
            })
        //  this.props.navigation.goBack();
            let resetAction = NavigationActions.reset({
              index: 0,
              actions: [NavigationActions.navigate({routeName: 'Main'})]
            })
              this.props.navigation.dispatch(resetAction)
        })
        .catch((error) => {
          Toast.show('注册失败，请重试', Toast.SHORT, Toast.BOTTOM, toastStyle);
          console.error('_commitFeedback() error=' + error)
        })
        .done()
  }

  renderBody() {
    return (
        <View style={{flex:1, backgroundColor:'#EBEBEB'}}>
          <View style={[styles.inputContainer, {marginTop:30}]}>
            <Image source={require('./images/ic_user.png')} style={{width: 24, height: 24}}/>
            <TextInput editable={true} maxLength={32} multiline={false}
                       placeholder={'账号'}
                       placeholderTextColor={'#bfbfbf'}
                       underlineColorAndroid={'transparent'}
                       autoCapitalize={"none"}
                       style={styles.smallTextInput}
                       onChangeText={(text) => this.setState({account: text})}/>
          </View>
          <View style={styles.inputContainer}>
            <Image source={require('./images/ic_email.png')} style={{width: 24, height: 24}}/>
            <TextInput editable={true} maxLength={11} multiline={false}
                       placeholder={'手机号码'}
                       keyboardType={'phone-pad'}
                       placeholderTextColor={'#bfbfbf'}
                       underlineColorAndroid={'transparent'}
                       style={styles.smallTextInput}
                       onChangeText={(text) => this.setState({email: text})}/>
          </View>
          <View style={styles.inputContainer}>
            <Image source={require('./images/ic_password.png')} style={{width: 24, height: 24}}/>
            <TextInput editable={true} maxLength={32} multiline={false}
                       placeholder={'密码'}
                       placeholderTextColor={'#bfbfbf'}
                       secureTextEntry={true}
                       underlineColorAndroid={'transparent'}
                       style={styles.smallTextInput}
                       onChangeText={(text) => this.setState({password: text})}/>
          </View>
          <View style={styles.inputContainer}>
            <Image source={require('./images/ic_password.png')} style={{width: 24, height: 24}}/>
            <TextInput editable={true} maxLength={32} multiline={false}
                       placeholder={'密码'}
                       placeholderTextColor={'#bfbfbf'}
                       secureTextEntry={true}
                       underlineColorAndroid={'transparent'}
                       style={styles.smallTextInput}
                       onChangeText={(text) => this.setState({passwordAgain: text})}/>
          </View>
          <TouchableOpacity activeOpacity={0.8} style={styles.loginBtn}
                            onPress={() => this.register()}>
            <Text style={styles.loginBtnText}>注册</Text>
          </TouchableOpacity>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  inputContainer: {
    marginTop: 10,
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
  registerText:{
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'flex-end',
    color: '#1296db',
    fontSize: 14,
  }
})
