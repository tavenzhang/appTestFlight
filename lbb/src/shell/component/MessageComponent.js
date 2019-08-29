'use-strict';
import React from 'react';
import {Image, Text, View} from 'react-native';

export default class MessageComponent extends React.Component {

  render() {
    const value = this.props.dataValue;
    return (
        <View style={{flexDirection: 'column', backgroundColor: '#FFFFFF', padding: 5}}>
          <View style={{flexDirection: 'row', alignItems: 'center', height: 40}}>
            <Image source={require('../images/ic_default_avatar.png')}
                   style={{width: 35, height: 35, resizeMode: 'cover'}}/>
            <View style={{flex: 1, marginLeft: 5, marginRight: 10}}>
              <Text style={{color: '#2B2B2B', fontSize: 14}}>{value.username}</Text>
              <Text style={{color: '#cccccc', fontSize: 12}}>{value.date}</Text>
            </View>
            <Image
                source={require('../images/ic_switch.png')}
                style={{width: 25, height: 25, resizeMode: 'cover'}}/>
          </View>
          <Text style={{color: '#2B2B2B', fontSize: 12, marginLeft: 40, marginTop: 5}}
                numberOfLines={1}>{value.comment}</Text>
        </View>
    );
  }
}
