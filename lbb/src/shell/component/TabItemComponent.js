'use-strict';
import React, {PropTypes} from 'react';
import {StyleSheet, Text, Image, View, TouchableWithoutFeedback} from 'react-native';

export default class TabItemComponent extends React.Component {

  static propTypes: {
      onTabItemClick:PropTypes.func,
      leftIcon:PropTypes.any,
      tabTxt:PropTypes.any,
      rightIcon:PropTypes.object
  }

  render() {
    return (
        <TouchableWithoutFeedback
            onPress={this.props.onTabItemClick ? () => this.props.onTabItemClick() : null}>
          <View  style={styles.itemContainer}>
            <Image source={this.props.leftIcon}
                   resizeMode={Image.resizeMode.enter}
                   style={{width: 24, height: 24, marginRight: 10}}/>
            <Text  style={styles.itemText}>{this.props.tabTxt}</Text>
            <View style={{justifyContent:"center",alignItems:"center",flexDirection:"row"}}>
              <Text style={{fontSize:14, color:'#8a8a8a'}}>{this.props.rightText}</Text>
              <Image source={this.props.rightIcon}
                     resizeMode={Image.resizeMode.enter} style={{width: 20, height: 20}}/>
            </View>
          </View>
        </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  itemContainer: {
    height: 45,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 15
  },
  itemText: {
    flex: 1,
    color: '#000000',
    fontSize: 16,
    justifyContent: 'center',
  }
});