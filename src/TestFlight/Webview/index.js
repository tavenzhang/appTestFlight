import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, ActivityIndicator, View } from 'react-native';
import { WebView } from 'react-native-webview';

export default class WebViewComponent extends Component {
    static navigationOptions = {
        //title: 'WebView',
        headerStyle: {
          backgroundColor: '#000000',
          marginLeft: 10
        },
        headerTintColor: '#fff',
        //headerTitleStyle: {
        //  fontWeight: 'bold',
        //},
      };

    constructor(props) {
        super(props);
        this.state = { visible: true };
    }
        
    showSpinner() {
        //console.log('Show Spinner');
        this.setState({ visible: true });
    }
        
    hideSpinner() {
        //console.log('Hide Spinner');
        this.setState({ visible: false });
    }
     
render() {
    const { params } = this.props.navigation.state;
    const url = params ? params.source : null;

    //console.log('news', this.props.navigation.state);

    return (
        <WebView
            //style={styles.WebViewStyle}
            source={{ uri: url }}
            useWebKit
            allowsInlineMediaPlayback
            //onLoadStart={() => this.showSpinner()}
            //onLoad={() => this.hideSpinner()}
        />
    );
  }
}

const styles = StyleSheet.create({
    stylOld: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    styleNew: {
        flex: 1,
    },
    WebViewStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        //marginTop: 40,
    },
    ActivityIndicatorStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
    }
});