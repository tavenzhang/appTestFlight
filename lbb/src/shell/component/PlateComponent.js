'use-strict';
import React from 'react';
import {Image, StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native';

export default class PlateComponent extends React.Component {
  render() {
    return (
        <TouchableWithoutFeedback
            onPress={this.props.onPlateClick ? () => this.props.onPlateClick() : null}>
          <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection:'row'}}>
            <Image
                source={this.props.normalIcon}
                style={[{tintColor: this.props.tintColor}, styles.plateIcon]}/>
            <Text style={styles.plateTxt}>{this.props.txt}</Text>
          </View>
        </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  plateIcon: {
    width: 36,
    height: 36,
    resizeMode: 'cover'
  },
  plateTxt: {
    fontSize: 14,
    color: '#515151',
    marginTop: 2,
    marginLeft:5
  }
});
