import React, { Component } from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';
import { StackNavigator } from 'react-navigation';

import News from '../News';
import WebViewComponent from '../Webview';

class HomeScreen extends Component {
    static navigationOptions = {
        //title: 'Home',
        header: null
    };

    render() {
      return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <StatusBar
                animated={true}
                translucent={true}
                barStyle="dark-content" 
            />

            <ScrollableTabView
                //style={{ marginTop: 10 }}
                initialPage={0}
                renderTabBar={() => <ScrollableTabBar />}
            >
                <News tabLabel='头条新闻' navigation={this.props.navigation} />
                <News tabLabel='商业' sources='business' navigation={this.props.navigation} />
                <News tabLabel='娱乐' sources='entertainment' navigation={this.props.navigation} />
                {/*<News tabLabel='健康' sources='health' navigation={this.props.navigation} />*/}
                <News tabLabel='科学' sources='science' navigation={this.props.navigation} />
                <News tabLabel='体育' sources='sports' navigation={this.props.navigation} />
                <News tabLabel='科技' sources='technology' navigation={this.props.navigation} />
            </ScrollableTabView>
        </SafeAreaView>
      );
    }
  }

  const RootStack = StackNavigator(
    {
      Home: {
        screen: HomeScreen,
      },
      Webview: {
        screen: WebViewComponent,
      },
    },
    {
      initialRouteName: 'Home',
    }
  );

export default class Home extends Component {
    render() {
        return <RootStack />;
    }
}