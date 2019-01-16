import React, {Component} from 'react';

import {
    TextInput, Platform
} from 'react-native';


import {observer} from 'mobx-react/native';

import {Size} from "../../Page/asset/game/themeComponet";

@observer
export default class NumberOnlyInputText extends Component {

    constructor() {
        super();

        this.state = {
            number: '',
        };
        this.isChanged = false;
    }

    static defaultProps = {
        indexKey: 0,
        textChangedFunc: null,
        isEditable: true,
        maxLength: 5,
        fontSize: Size.font15,
        fontColor: '#333333',
        textHeight: 30,
        isFlex: false,
        textOfPlaceHolder: '',
        onFocusFunc: null,
        onBlurFunc: null,
        refName: '',
        borderColor: '#cccccc',
        borderRadius: 4,

    }

    shouldComponentUpdate(nextProps) {
        //如果前后defaultValue不一样 说明 点击了- +功能，数据要更新
        if (this.props.defaultValue != nextProps.defaultValue) {
            this.isChanged = false;
        }
        return true;
    }


    render() {
        return (
            <TextInput ref='numberOnlyTextInput' style={this.props.isFlex ? {
                flex: 1,
                backgroundColor: 'white',
                padding: 0,
                fontSize: this.props.fontSize,
                textAlign: 'center',
                height: this.props.textHeight,
                color: this.props.fontColor,
                alignSelf: 'center',//ios text
            } : {
                marginLeft: 5,
                marginRight: 5,
                width: this.props.textWidth,
                height: this.props.textHeight,
                backgroundColor: 'white',
                borderColor: this.props.borderColor,
                borderRadius: this.props.borderRadius,
                borderWidth: 0.5,
                padding: 0,
                fontSize: this.props.fontSize,
                textAlign: 'center',
                alignSelf: 'center',//ios text
                color: this.props.isEditable ? 'black' : 'grey',

            }} multiline={false} keyboardType={Platform.OS === 'ios' ? 'numbers-and-punctuation' : 'numeric'}
                       underlineColorAndroid={'transparent'} maxLength={this.props.maxLength}
                       editable={this.props.isEditable}
                       value={this.isChanged ? this.state.number : this.props.defaultValue}
                       onChangeText={(text) => {
                           this.onNumberOnlyInputTextChange(text)
                       }}
                       placeholder={this.props.textOfPlaceHolder}
                       onSubmitEditing={(e) => {
                           this.props.onSubmitEditing && this.props.onSubmitEditing(e.nativeEvent.text);
                       }}
                       onEndEditing={(e) => {
                           this.props.onEndEditing && this.props.onEndEditing(e.nativeEvent.text);
                       }}
                       onFocus={() => {
                           this.props.onFocusFunc && this.props.onFocusFunc();
                       }}
                       onBlur={() => {
                           this.props.onBlurFunc && this.props.onBlurFunc();
                       }}
            />);
    }


    onNumberOnlyInputTextChange(text) {
        let regExp = new RegExp("^\\+?[1-9][0-9]*$");
        if (text === '' || regExp.test(text)) {
            this.isChanged = true;
            this.props.textChangedFunc && this.props.textChangedFunc(text, this.props.indexKey);
            this.setState({
                number: text
            });
        }
    }

    setDisplayValue(text) {
        text = text.toString();
        if (!this.isChanged) {
            this.isChanged = true;
        }
        this.setState({
            number: text
        });

    }

    isFocused() {
        return this.refs.numberOnlyTextInput.isFocused();
    }

    getNumberText() {
        if(this.isChanged ) {
            return this.state.number;
        }else{
            return this.props.defaultValue;
        }
    }
}