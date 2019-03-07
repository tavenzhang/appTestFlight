import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
} from 'react-native';

import Picker from 'react-native-picker';
import PropTypes from 'prop-types'
//跟tchoose 类似，调整过 以适应动态根据数据 变换ui,适应有级联系关系的时候
export default class Chooser extends React.PureComponent {

    static propTypes = {
        value: PropTypes.any,
        onSelect: PropTypes.func,
        disable: PropTypes.bool,
        dataList: PropTypes.array,
        viewStyle: PropTypes.any,
        textStyle:PropTypes.any,
        textViewStyle: PropTypes.any,
        dataListLabel: PropTypes.string,
        dataListValue: PropTypes.string,
        placeholder:PropTypes.string,
        defaultIndex:PropTypes.any,
        isShowIco:PropTypes.any
    }
    static  defaultProps = {
        viewStyle: {},
        dataListLabel: 'name',
        dataListValue: 'value',
        textStyle:{fontSize: 12,textAlign:G_IS_IOS ? 'left':"center"},
        isShowIco:true,
        textViewStyle:{}
    }

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            forceFlush:""
        };
        this.pickerLabelList = [];
        this.pickValueList = [];
    }


    showPicker=()=> {
        const {onSelect, placeholder,dataList} = this.props;
        const selectText =  this.displayText
        if(dataList.length>0){
            Picker.init({
                pickerData: this.pickerLabelList.slice(),
                pickerConfirmBtnText: '确定',
                pickerCancelBtnText: '取消',
                pickerTitleText: placeholder || '请选择内容',
                pickerBg: [245, 245, 245, 1],
                pickerFontSize: 16,
                selectedValue: [selectText],
                onPickerConfirm: (pickedValue, i) => {
                    TW_Log("onPickerConfirm------==="+this.pickValueList[i],this.pickerLabelList[i])
                    onSelect({name:this.pickerLabelList[i],value:this.pickValueList[i]});
                    this.displayText = this.pickerLabelList[i]
                    this.setState({forceFlush:""})
                },
            })
            Picker.show();
        }
    }



    componentWillUnmount() {
        Picker.hide();
    }

    render() {
        const {value,dataList, dataListLabel,isShowIco, textViewStyle,dataListValue} = this.props;
        const {viewStyle, placeholder, textStyle} = this.props;
        this.pickValueList.length = 0;
        this.pickerLabelList.length=0;
        if(dataList) {
            dataList.map(v => {
                this.pickValueList.push(v[dataListValue]);
                this.pickerLabelList.push(v[dataListLabel]);
            });
        }
        this.displayText = ""
        let noTextStyle = null;
        let index = this.pickValueList.indexOf(value);

        if (index==-1) {
            this.displayText = placeholder ? placeholder : "请选择内容";
            noTextStyle = {color: "gray"}
        }else{
            this.displayText = this.pickerLabelList[index]
        }

        return (
            <View style={[viewStyle]}>
                <TouchableOpacity onPress={this.showPicker} activeOpacity={1}>
                        <View style={[textViewStyle]}>
                            <Text style={[{fontSize: 12},noTextStyle,textStyle  ]}>{`${this.displayText}`}</Text>
                        </View>
                </TouchableOpacity>
         </View>)
        }
}




