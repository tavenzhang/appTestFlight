import TView from "../../Common/View/TView";

'use-strict';
import React from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import NavBarComponent from '../component/NavBarComponent';

export default class AboutAppScreen extends TView {



  renderBody() {
    return (
        <View>
            <Image resizeMode={Image.resizeMode.cover} style={{width:'100%', height:'100%'}}
                 source={require('../images/bg_about_app.jpg')}/>
        </View>
    );
  }
}
