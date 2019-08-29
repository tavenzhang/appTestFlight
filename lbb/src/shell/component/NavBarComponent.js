'use-strict';
import React from 'react';
import {Image, StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native';
import CommonStyle from '../common/Styles';

export default class NavBarComponent extends React.Component {

    static propTypes:{
        onNavLeftClick:PropTypes.func,
        onNavRightClick:PropTypes.func,
        navLeftIcon:PropTypes.object,
        navRightIcon:PropTypes.object,
        title:PropTypes.string,
        rightText:PropTypes.string
    }

    constructor(pro){
        super(pro)
        this.state={
            rightIconPress: false
        }
    }

  render() {
    return (
        <View style={CommonStyle.headerContainer}>
          <TouchableWithoutFeedback
              onPress={this.props.onNavLeftClick ? () => this.props.onNavLeftClick() : null}>
            <View style={styles.iconContainer}>
              <Image
                  source={!this.props.navLeftIcon ? require('../images/ic_return_white.png') : this.props.navLeftIcon}
                  resizeMode={Image.resizeMode.cover} style={{width: 30, height: 30}}/>
            </View>
          </TouchableWithoutFeedback>
          <Text style={styles.titleText}>{this.props.title}</Text>
          <TouchableWithoutFeedback
              onPress={this.props.onNavRightClick ? () => {
                this.setState({rightIconPress: !this.state.rightIconPress}), this.props.onNavRightClick()
              } : null}>
            <View style={styles.iconContainer}>
                {this.props.navRightIcon ? <Image
                    source={this.props.navRightIcon}
                    resizeMode={Image.resizeMode.cover} style={{width: 30, height: 30}}/>:null}
                    {this.props.rightText ?  <Text style={{fontSize:16, color: '#ffffff'}}>{this.props.rightText}</Text>:null}

            </View>
          </TouchableWithoutFeedback>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  titleText: {
    flex: 1,
    color: '#ffffff',
    fontSize: 20,
    textAlign: 'center',
    textAlignVertical: 'center'
  },
  iconContainer: {
    width: 50, height: 50, justifyContent: 'center', alignItems: 'center'
  }
});
