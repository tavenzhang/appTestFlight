'use-strict';
import React from 'react';
import {Image, TouchableWithoutFeedback} from 'react-native';

export default class NavBarImage extends React.Component {
  render() {
    return (
        <TouchableWithoutFeedback onPress={() => this.props.onNavImageClick()}>
          <Image source={this.props.navIcon}
                 resizeMode={Image.resizeMode.center}
                 style={{width: 30, height: 30, marginLeft: 5, marginRight: 5}}/>
        </TouchableWithoutFeedback>
    );
  }
}