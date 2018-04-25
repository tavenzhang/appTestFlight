/**
 * Created by Sam on 2016/12/13.
 */
/**
 * Created by Sam on 2016/11/11.
 */

import React, {
    Component
} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    WebView
} from 'react-native';

import TopNavigationBar from '../../Common/View/TCNavigationBar'

export default class MyComponent extends React.Component {
    constructor(state) {
        super(state);
        this.state = {
            url:'http://www.google.com'
        };
    }

    static defaultProps = {};

    componentDidMount() {

    }

    render() {
        return (
         <View style={styles.container}>
             <TopNavigationBar
                 title='发现'
                 needBackButton={false}
             />
             <WebView
                 automaticallyAdjustContentInsets={true}
                 style={styles.webView}
                 source={{uri: this.state.url}}
                 javaScriptEnabled={true}
                 domStorageEnabled={true}
                 decelerationRate="normal"
                 startInLoadingState={true}
                 scalesPageToFit={this.state.scalesPageToFit}
             />

         </View>
        );
    };
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2F2F2',
    }
});