
import React from 'react';
import {
    View,
    StyleSheet,
    TextInput
} from 'react-native';
import PropTypes from 'prop-types'
export class TCTextInput extends React.Component {

    static propTypes = {
        value: PropTypes.any,
        onChangeText: PropTypes.func,
        placeholder: PropTypes.any,
        inputStyle: PropTypes.any,
        viewStyle:PropTypes.any,
        placeholderTextColor:PropTypes.any,
        multiline:PropTypes.bool,
        keyboardType:PropTypes.string,
        secureTextEntry:PropTypes.bool,
        autoFocus:PropTypes.bool,
        onfocus:PropTypes.func,
        maxLength:PropTypes.number,
        onSubmitEditing:PropTypes.func,
        onBlur:PropTypes.func,
        isDefaultTextStyle:PropTypes.bool
    }

  static defaultProps= {
      viewStyle:{},
      isDefaultTextStyle:true,
      inputStyle:{
          fontSize: 14,
      }
  }

    render() {
        const {onBlur,onSubmitEditing,placeholder, maxLength,onfocus,inputStyle, autoFocus, viewStyle,secureTextEntry,onChangeText,multiline,keyboardType,value,placeholderTextColor,editable} = this.props;
        return (
            <View style={viewStyle}>
                <TextInput
                    onBlur={onBlur}
                    onFocus={()=>{
                        onfocus;
                    }}
                    textAlignVertical={"top"}
                    style={[styles.textStyle,inputStyle]}
                    onChangeText={onChangeText}
                    value={value}
                    editable={ typeof editable === 'undefined' ? true : editable}
                    maxLength={maxLength ? maxLength:200}
                    placeholder={placeholder}
                    placeholderTextColor={placeholderTextColor ? placeholderTextColor : "gray"}
                    multiline={multiline ? multiline : false}
                    autoFocus={autoFocus ? autoFocus :false}
                    autoCapitalize={"none"}
                    keyboardType={keyboardType ? keyboardType :"default"}
                    underlineColorAndroid={'transparent'}
                    secureTextEntry={secureTextEntry ? secureTextEntry:false}
                    onSubmitEditing={onSubmitEditing}
                />
            </View>)
    }
}

const styles = StyleSheet.create({
    textStyle: {
        padding: 0,
        height:16,
    },

})

