import TView from "../../Common/View/TView";

'use-strict';
import React from 'react';
import {Platform, ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';
import Toast from 'react-native-toast-native';
import NavBarComponent from '../component/NavBarComponent';
import RadioButtonComponent from '../component/RadioButtonComponent';

export default class PublishFindLostScreen extends TView {

  state = {
    checkedId: 0,
    category:'',
    date:'',
    location:'',
    details:'',
    name:'',
    phone:'',
    address:'',
    remuneration:'',
  }

  _onNavLeftClick() {
    this.props.navigation.goBack();
  }

  _onNavRightClick() {
    console.info('_onNavRightClick() checkedId=' + this.state.checkedId
        + ', category=' + this.state.category + ', date='+this.state.date
        + ', location=' + this.state.location + ', details='+this.state.details
        + ', name=' + this.state.name + ', phone='+this.state.phone
        + ', address=' + this.state.address + ', remuneration='+this.state.remuneration
        + ', create_time=' + new Date().getTime())

    if (!this.state.category) {
      Toast.show('请输入类别', Toast.SHORT, Toast.BOTTOM, toastStyle);
      return
    }
    if (!this.state.date) {
      Toast.show(this.state.checkedId === 0 ? '请输入遗失时间' : '请输入拾到时间', Toast.SHORT, Toast.BOTTOM, toastStyle);
      return
    }
    if (!this.state.location) {
      Toast.show(this.state.checkedId === 0 ? '请输入遗失地点' : '请输入拾到地点', Toast.SHORT, Toast.BOTTOM, toastStyle);
      return
    }
    if (!this.state.details) {
      Toast.show('请输入详细描述', Toast.SHORT, Toast.BOTTOM, toastStyle);
      return
    }
    if (!this.state.name) {
      Toast.show('请输入你的姓名', Toast.SHORT, Toast.BOTTOM, toastStyle);
      return
    }
    if (!this.state.phone) {
      Toast.show('请输入你的联系电话', Toast.SHORT, Toast.BOTTOM, toastStyle);
      return
    }
    if (!this.state.address) {
      Toast.show('请输入你的联系地址', Toast.SHORT, Toast.BOTTOM, toastStyle);
      return
    }

    let bodyValue = this.getBodyObject();
    fetch('http://mock.eolinker.com/giseBuH1c3227abd30d32593adcd8938a1f2042158c89ba?uri=lbbapi/publish', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bodyValue)
    })
        .then((response) => response.json())
        .then((responseJson) => {
          console.info('publish() status=' + responseJson.status + ', desc=' + responseJson.desc)
          Toast.show('您的信息已进入后台审核', Toast.SHORT, Toast.BOTTOM, toastStyle);
          storage.save({
            key: 'find&lost-publish', // 注意:请不要在key中使用_下划线符号!
            id: new Date().getTime(),
            data: this.getBodyObject()
          });
          this.props.navigation.goBack();
        })
        .catch((error) => {
          console.log('error=' + error)
        })
        .done();
  }

  getBodyObject() {
    return {
      type: this.state.checkedId,
      category: this.state.category,
      fl_date: this.state.date,
      fl_address: this.state.location,
      detail: this.state.details,
      realname: this.state.name,
      phone: this.state.phone,
      address: this.state.address,
      money: this.state.remuneration,
      create_time: new Date().getTime(),
    };
  }

  _onRadioChecked(id) {
    if (this.state.checkedId !== id) {
      this.setState({checkedId: id})
    }
  }

  updateText(textIndex, text) {
    switch (textIndex) {
      case 1:
        this.setState({category: text})
        break;
      case 2:
        this.setState({date: text})
        break;
      case 3:
        this.setState({location: text})
        break;
      case 4:
        this.setState({details: text})
        break;
      case 5:
        this.setState({name: text})
        break;
      case 6:
        this.setState({phone: text})
        break;
      case 7:
        this.setState({address: text})
        break;
      case 8:
        this.setState({remuneration: text})
        break;
    }
  }

  renderNavBar(){
    return (<NavBarComponent title={'发布信息'}
                                 rightText={'发布'}
                                 onNavLeftClick={() => this._onNavLeftClick()}
                                 onNavRightClick={() => this._onNavRightClick()}/>)
  }

  renderBody() {
    console.warn('render() checkedId=' + this.state.checkedId);
    return (
        <View style={{flex:1, backgroundColor:'#EBEBEB'}}>
            <ScrollView keyboardDismissMode={'interactive'}>
            <Text style={styles.tipsText}>
              温馨提示{'\n'}
              1、本APP内的酬金是双方约定的线下报酬，本平台不收取任何提成。同时，因此而造成额纠纷，本平台概不负责；{'\n'}
              2、本平台内发布的遗失或招领信息需真实合法，不接受虚假信息；{'\n'}
              3、在线下交易时，如果发生意外情况，请及时报警处理。
            </Text>
            <View style={{margin: 10, flexDirection: 'row', alignItems: 'center', height: 20}}>
              <View style={{width: 2, height: 16, backgroundColor: '#1296db', marginRight: 3}}/>
              <Text>选择发布类型：</Text>
              <View style={{marginLeft: 10, flexDirection: 'row'}}>
                <RadioButtonComponent radioId={0} radioText={'遗失'}
                                      checked={this.state.checkedId === 0}
                                      onRadioChecked={(radioId) => this._onRadioChecked(radioId)}/>
              </View>
              <View style={{marginLeft: 20, flexDirection: 'row'}}>
                <RadioButtonComponent radioId={1} radioText={'招领'}
                                      checked={this.state.checkedId === 1}
                                      onRadioChecked={(radioId) => this._onRadioChecked(radioId)}/>
              </View>
            </View>
            <View style={{margin: 10, marginBottom:5, flexDirection: 'row', alignItems: 'center', height: 30}}>
              <View style={{width: 2, height: 16, backgroundColor: '#1296db', marginRight: 3}}/>
              <Text>物品类型：</Text>
              <TextInput editable={true} maxLength={10} multiline={false}
                         placeholder={'请输入物品类型（如：钱包、项链等）'}
                         placeholderTextColor={'#bfbfbf'}
                         underlineColorAndroid={'transparent'}
                         style={styles.smallTextInput}
                         onChangeText={(text)=>this.updateText(1, text)}/>
            </View>
            <View style={{margin: 10, marginBottom:5, flexDirection: 'row', alignItems: 'center', height: 30}}>
              <View style={{width: 2, height: 16, backgroundColor: '#1296db', marginRight: 3}}/>
              <Text>丢失时间：</Text>
              <TextInput editable={true} maxLength={30} multiline={false}
                         placeholder={'请输入物品丢失的大致时间'}
                         placeholderTextColor={'#bfbfbf'}
                         underlineColorAndroid={'transparent'}
                         style={styles.smallTextInput}
                         onChangeText={(text)=>this.updateText(2, text)}/>
            </View>
            <View style={{margin: 10, marginBottom:5, flexDirection: 'row', alignItems: 'center', height: 30}}>
              <View style={{width: 2, height: 16, backgroundColor: '#1296db', marginRight: 3}}/>
              <Text>丢失地点：</Text>
              <TextInput editable={true} maxLength={50} multiline={false}
                         placeholder={'请输入物品丢失的大致地点'}
                         placeholderTextColor={'#bfbfbf'}
                         underlineColorAndroid={'transparent'}
                         style={styles.smallTextInput}
                         onChangeText={(text)=>this.updateText(3, text)}/>
            </View>
            <View style={{margin: 10, marginBottom:5, flexDirection: 'row', alignItems: 'center', height: 20}}>
              <View style={{width: 2, height: 16, backgroundColor: '#1296db', marginRight: 3}}/>
              <Text>详细描述：</Text>
            </View>
            <TextInput editable={true} maxLength={300} multiline={true}
                       placeholder={'请输入发布信息（如：大家好，我在北京市丰台区老庄子乡附近丢失棕色钱包一个，里面有银行卡等物品，如有拾到的朋友请联系我，谢谢。）'}
                       placeholderTextColor={'#bfbfbf'}
                       underlineColorAndroid={'transparent'}
                       style={styles.largeTextInput}
                       onChangeText={(text)=>this.updateText(4, text)}/>
            <View style={{margin: 10, marginBottom:5, flexDirection: 'row', alignItems: 'center', height: 30}}>
              <View style={{width: 2, height: 16, backgroundColor: '#1296db', marginRight: 3}}/>
              <Text>联  系  人：</Text>
              <TextInput editable={true} maxLength={5} multiline={false}
                         placeholder={'请输入您的姓名'}
                         placeholderTextColor={'#bfbfbf'}
                         underlineColorAndroid={'transparent'}
                         style={styles.smallTextInput}
                         onChangeText={(text)=>this.updateText(5, text)}/>
            </View>
            <View style={{margin: 10, marginBottom:5, flexDirection: 'row', alignItems: 'center', height: 30}}>
              <View style={{width: 2, height: 16, backgroundColor: '#1296db', marginRight: 3}}/>
              <Text>联系电话：</Text>
              <TextInput editable={true} maxLength={11} multiline={false}
                         placeholder={'请输入您的联系电话'}
                         placeholderTextColor={'#bfbfbf'}
                         underlineColorAndroid={'transparent'}
                         keyboardType={'phone-pad'}
                         style={styles.smallTextInput}
                         onChangeText={(text)=>this.updateText(6, text)}/>
            </View>
            <View style={{margin: 10, marginBottom:5, flexDirection: 'row', alignItems: 'center', height: 30}}>
              <View style={{width: 2, height: 16, backgroundColor: '#1296db', marginRight: 3}}/>
              <Text>位        置：</Text>
              <TextInput editable={true} maxLength={50} multiline={false}
                         placeholder={'请输入您的联系位置'}
                         placeholderTextColor={'#bfbfbf'}
                         underlineColorAndroid={'transparent'}
                         style={styles.smallTextInput}
                         onChangeText={(text)=>this.updateText(7, text)}/>
            </View>
            <View style={{margin: 10, marginBottom:20, flexDirection: 'row', alignItems: 'center', height: 30}} >
              <View style={{width: 2, height: 16, backgroundColor: '#1296db', marginRight: 3}}/>
              <Text>酬        金：</Text>
              <TextInput editable={true} maxLength={10} multiline={false}
                         placeholder={'请输入酬金'}
                         placeholderTextColor={'#bfbfbf'}
                         underlineColorAndroid={'transparent'}
                         keyboardType={'numeric'}
                         style={styles.smallTextInput}
                         onChangeText={(text)=>this.updateText(8, text)}/>
            </View>
            <View style={{height: Platform.OS === 'ios' ? 0 : 50}} />
          </ScrollView>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  tipsText: {
    color: '#2c2c2c',
    fontSize: 12,
    backgroundColor: '#c9ecff',
    padding: 10,
  },
  smallTextInput: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    fontSize: 14,
    borderWidth: 1,
    borderColor: '#eeeeee',
    marginLeft: 10,
    marginRight: 10,
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 5,
    paddingRight: 5,
  },
  largeTextInput: {
    flex: 1,
    height: 100,
    backgroundColor: 'white',
    fontSize: 14,
    borderWidth: 1,
    borderColor: '#eeeeee',
    marginLeft: 10,
    marginRight: 10,
    textAlignVertical: 'top',
    padding: 5,
  },
})
