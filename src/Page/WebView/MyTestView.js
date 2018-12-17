import React, {Component} from 'react';

import {
    StyleSheet,
    View,
    WebView,
} from 'react-native';
export default class MyTestView extends Component{

    componentDidMount() {
        setTimeout(()=>{
            JX_NavHelp.popToBack()
            TWLog("componentDidMount=======MyTestView========", )
        },2000)
    }

    render(){
        return(<View/>)
    }
}