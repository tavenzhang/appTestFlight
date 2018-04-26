import {TabNavigator, StackNavigator, TabBarBottom} from 'react-navigation';
import React, {Component} from 'react';
import Helper from "../../Common/JXHelper/JXHelper"
import {Provider} from 'mobx-react'


import NavigationService from './NavigationService'
import MainScreen from '../Main/TCMain'


const Components = {
    Main: {screen: MainScreen},

}

const MainStackNavigator = StackNavigator({
    ...Components
}, {
    navigationOptions: {
        header: null
    }
})

export default class Main extends Component {
    render() {
        return (
            <MainStackNavigator
                ref={
                    navigatiorRef => {
                        NavigationService.setTopLevelNavigator(navigatiorRef)
                    }
                }
            />
        )
    }
}