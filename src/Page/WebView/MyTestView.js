import React, {Component} from 'react';

import {
    View,
} from 'react-native';
export default class MyTestView extends Component{

    componentDidMount() {
        setTimeout(()=>{
            TW_NavHelp.popToBack()
            TW_Log("componentDidMount=======MyTestView========", )
        },2000)
    }

    render(){
        return(<View/>)
    }
}