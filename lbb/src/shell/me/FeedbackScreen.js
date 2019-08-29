import TView from "../../Common/View/TView";

'use-strict';
import React from 'react';
import {StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import Toast from 'react-native-toast-native';
import NavBarComponent from '../component/NavBarComponent';

export default class FeedbackScreen extends TView {

    static navigationOptions = {
        title: 'Welcome2',
    };
    state = {
        advise: ''
    }

    _onNavLeftClick = () => {
        this.props.navigation.goBack();
    }

    _commitFeedback() {
        if (!this.state.advise) {
            Toast.show('请输入您的宝贵意见', Toast.SHORT, Toast.BOTTOM, toastStyle);
            return
        }
        fetch('http://mock.eolinker.com/giseBuH1c3227abd30d32593adcd8938a1f2042158c89ba?uri=lbbapi/feedback', {
            method: 'POST',
            body: JSON.stringify({userid: 1, advise: this.state.advise})
        }).then((response) => response.json())
            .then((responseJson) => {
                console.info('commitFeedback() status=' + responseJson.status + ', desc=' + responseJson.desc)
                Toast.show('您的宝贵意见我们已经收到', Toast.SHORT, Toast.BOTTOM, toastStyle);
                this.props.navigation.goBack();
            })
            .catch((error) => {
                console.error('_commitFeedback() error=' + error)
            })
            .done()
    }


    renderBody() {
        const {params} = this.props.navigation.state;
        const navTitle = params ? params.title : '';
        return (
            <View style={{flex: 1, backgroundColor: '#EBEBEB'}}>
                <View style={{flex: 1, backgroundColor: '#EBEBEB'}}>
                    <TextInput editable={true} maxLength={300} multiline={true}
                               placeholder={'请输入您的意见和建议...'}
                               placeholderTextColor={'#bfbfbf'}
                               underlineColorAndroid={'transparent'}
                               style={styles.textInput}
                               onChangeText={(text) => this.setState({advise: text})}/>
                    <TouchableOpacity style={styles.commitBtn} onPress={() => this._commitFeedback()}>
                        <Text style={styles.commitBtnText}>提交</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    textInput: {
        height: 200,
        backgroundColor: '#ffffff',
        fontSize: 16,
        padding: 10,
        margin: 10,
        textAlignVertical: 'top'
    },
    commitBtn: {
        backgroundColor: '#1296db',
        height: 42,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10
    },
    commitBtnText: {
        color: '#ffffff',
        fontSize: 16,
        backgroundColor: 'transparent'
    }
})
