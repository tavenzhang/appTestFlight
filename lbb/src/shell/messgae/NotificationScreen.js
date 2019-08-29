import TView from "../../Common/View/TView";

'use-strict';
import React from 'react';
import {View, Text, Image} from 'react-native';

export default class NotificationScreen extends TView{

  renderBody() {
    const {params} = this.props.navigation.state;
    const sceneIndex = params ? params.index : 0;
    return (
        <View style={{flex:1, backgroundColor:'#EBEBEB'}}>
          {this.renderContent(sceneIndex)}
        </View>
    );
  }

  renderContent(sceneIndex) {
    if (sceneIndex === 1) {
      return (
          <Text style={{margin:10, backgroundColor:'#ffffff', color:'#515151', fontSize:14, padding:10, borderRadius:5}}>
            你好，欢迎加入我们的乐帮帮！在这里你可以寻找你丢失的物品，也可以发布你拾到的物品，但是我们这里提供的信息都是需要真实的哦。希望你在这里可以有一个愉快的体验，并把我们的APP推荐给你身边的朋友，让更多的人加入乐帮帮这个大家庭。
          </Text>
      );
    } else {
      return (
          <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
            <Image source={require('../images/ic_logo.png')} style={{width: 72, height: 72}}/>
            <Text style={{
              color: '#515151',
              fontSize: 14,
              textAlign: 'center',
              textAlignVertical: 'center',
              marginTop: 5
            }}>亲，你暂时还没有任何消息哦~</Text>
          </View>
      );
    }
  }
}
