'use-strict';
import React from 'react';
import {StyleSheet, View, TextInput, Text, Image} from 'react-native';
import CommonStyle from './common/Styles';
import NavBarImage from './component/NavBarImage';

export default class SearchScreen extends React.Component {

  _onNavImageClick = () => {
    this.props.navigation.goBack();
  }

  render() {
    return (
        <View>
          <View style={CommonStyle.headerContainer}>
            <NavBarImage navIcon={require('./images/ic_return_white.png')}
                         onNavImageClick={this._onNavImageClick}/>
            <View style={styles.headerInnerContainer}>
              <Image source={require('./images/ic_search_gray.png')}
                     resizeMode={Image.resizeMode.center}
                     style={{width: 24, height: 24}}/>
              <TextInput editable={true} maxLength={20} multiline={false}
                         placeholder={'请输入搜索关键字'}
                         placeholderTextColor={'#bfbfbf'}
                         underlineColorAndroid={'transparent'}
                         style={styles.textInput}/>
            </View>
          </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  headerInnerContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: '#ffffff',
    marginRight: 10,
    marginTop: 7,
    marginBottom: 7,
    paddingLeft: 10,
    paddingRight: 10
  },
  textInput: {
    flex: 1,
    height: 36,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 16,
    textAlignVertical: 'center',
    paddingTop: 0,
    paddingBottom: 0
  }
})
