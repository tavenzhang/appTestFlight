'use-strict';
import React from 'react';
import {Image, View} from 'react-native';
import {NavigationActions} from 'react-navigation';

export default class SplashScreen extends React.Component {

  componentDidMount() {
    setTimeout(() => {
      storage.load({
        key: 'account',
        autoSync: true,
        syncInBackground: true,
      }).then(ret => {
        console.log('SplashScreen#componentDidMount() account=' + ret.account);
        let resetAction = NavigationActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({routeName: 'Main'})]
        })
        this.props.navigation.dispatch(resetAction)
      }).catch(err => {
        console.log('SplashScreen#componentDidMount() err=' + err.message);
        let resetAction = NavigationActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({routeName: 'Login'})]
        })
        this.props.navigation.dispatch(resetAction)
      })
    }, 2000)
  }

  render() {
    return (
        <View>
          <Image resizeMode={Image.resizeMode.cover} style={{width: '100%', height: '100%'}}
                 source={require('./images/bg_splash.jpg')}/>
        </View>
    );
  }
}
