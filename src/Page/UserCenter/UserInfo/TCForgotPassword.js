/**
 * Created by Allen on 2016/12/13.
 */
'user strict'
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';

import TopNavigationBar from '../../../Common/View/TCNavigationBar';
import {Size, indexBgColor, width, height, listViewTxtColor} from '../../resouce/theme'
import NavigatorHelper from '../../../Common/JXHelper/TCNavigatorHelper'

export default class TCForgotPassword extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    render() {
        return (
            <View style={styles.container}>
                < TopNavigationBar
                    title={'找回密码'}
                    needBackButton={true}
                    backButtonCall={() => {
                        NavigatorHelper.popToBack();
                    }}/>
                <View style={styles.tipTextStyle}>
                    <Text style={{fontSize: Size.default, color: listViewTxtColor.title}}>温馨提示：</Text>
                    <Text style={{fontSize: Size.default, color: listViewTxtColor.content}}>如您忘记密码或者需要修改密码;</Text>
                    <Text style={{fontSize: Size.default, color: listViewTxtColor.content}}>请联系在线客服帮您解决，谢谢！</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: indexBgColor.mainBg,
    },
    inputItem: {
        flexDirection: 'row',
        height: 50,
        borderBottomWidth: 1,
        borderBottomColor: indexBgColor.mainBg,
        paddingLeft: 10,
        backgroundColor: indexBgColor.itemBg,
        alignItems: 'center'
    },
    bottomBarButtonStyle: {
        backgroundColor: '#cc0000',
        justifyContent: 'center',
        flexDirection: 'row',
        height: 40,
        alignItems: 'center',
        borderRadius: 4,
        padding: 10,
        width: width * 0.8,
        marginTop: 20
    },
    inputStyle: {
        flex: 1
    },
    tipTextStyle: {
        marginTop: 30,
        marginLeft: width * 0.1,
    }
});

{/*  <View style={{marginTop:20,flexDirection:'column'}}>
 <View style={styles.inputItem}>
 <Text>真实姓名</Text>
 <TextInput
 style={styles.inputStyle}
 placeholder='请填写注册时的用户名'
 placeholderTextColor='#cccccc'
 underlineColorAndroid='transparent'
 />
 </View>
 <View  style={styles.inputItem}>
 <Text>身份证号</Text>
 <TextInput
 style={styles.inputStyle}
 placeholder='请填写正确的身份证号码'
 placeholderTextColor='#cccccc'
 underlineColorAndroid='transparent'
 />

 </View>
 <View  style={styles.inputItem}>
 <Text>手机号码</Text>
 <TextInput
 style={styles.inputStyle}
 placeholder='请填写当前用户名下的手机号'
 placeholderTextColor='#cccccc'
 underlineColorAndroid='transparent'
 />
 </View>
 </View>
 <View style={{alignItems:'center'}}>

 <TouchableOpacity
 style={styles.bottomBarButtonStyle}
 >
 <Text style={{color:'white',fontWeight:'bold'}}>
 提交
 </Text>
 </TouchableOpacity>
 </View>*/
}
