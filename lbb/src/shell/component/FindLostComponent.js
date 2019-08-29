'use-strict';
import React from 'react';
import {Image, Text, View} from 'react-native';

export default class FindLostComponent extends React.Component {

  render() {
    const value = this.props.dataValue;
    return (
        <View style={{
          flexDirection: 'column',
          marginLeft: 5,
          marginRight: 5,
          padding: 5,
          backgroundColor: '#FFFFFF'
        }}>
          <View style={{flexDirection: 'row', alignItems: 'center', height: 40}}>
            <Image source={require('../images/ic_default_avatar.png')}
                   style={{width: 35, height: 35, resizeMode: 'cover'}}/>
            <View style={{flex: 1, marginLeft: 5, marginRight: 10}}>
              <Text style={{color: '#2B2B2B', fontSize: 14}}>{value.username ? value.username : value.realname}</Text>
              <Text style={{color: '#cccccc', fontSize: 12}}>{value.create_time}</Text>
            </View>
            <Image
                source={value.type === 0 ? require('../images/ic_lost.png') : require('../images/ic_find.png')}
                style={{width: 25, height: 25, resizeMode: 'cover'}}/>
          </View>
          <Text style={{color: '#2B2B2B', fontSize: 14}}
                numberOfLines={1}>{value.detail}</Text>
          <View style={{flexDirection: 'row', marginTop: 5}}>
            <Image source={require('../images/ic_coordinates.png')}
                   style={{width: 16, height: 16}}/>
            <Text style={{flex: 1, color: '#cccccc', fontSize: 12}}
                  numberOfLines={1}>{value.address}</Text>
            <Text style={{
              color: '#cccccc',
              fontSize: 12,
              marginLeft: 5
            }}>{value.view ? value.view : 0}人浏览</Text>
          </View>
        </View>
    );
  }
}
