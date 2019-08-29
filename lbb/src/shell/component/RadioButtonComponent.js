'use-strict';
import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

export default class RadioButtonComponent extends React.Component {

  state = {
    radius: 10,
  }

  _onRadioChecked() {
    this.props.onRadioChecked(this.props.radioId)
  }

  render() {
    console.info('RadioButtonComponent#render() radioId='+this.props.radioId+'; propsChecked='+this.props.checked)
    return (
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity onPress={() => this._onRadioChecked()}>
            <View style={{
              width: this.state.radius,
              height: this.state.radius,
              borderRadius: this.state.radius / 2,
              borderColor: '#d9d9d9',
              borderWidth: 1,
              backgroundColor: this.props.checked ? '#1296db' : '#8a8a8a'
            }}/>
          </TouchableOpacity>
          <Text
              style={{fontSize: 14, color: '#515151', marginLeft: 3}}>{this.props.radioText}</Text>
        </View>
    );
  }
}
