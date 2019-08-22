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
        <SafeAreaView style={{ flex: 1, backgroundColor: '#000000' }}>
            <StatusBar
                animated={true}
                translucent={true}
                barStyle="light-content" 
                //backgroundColor='#fff'
            />

            <ScrollableTabView
                style={{ backgroundColor: '#000000' }}
                tabBarBackgroundColor='#000000'
                tabBarInactiveTextColor='#bdc3c7'
                tabBarActiveTextColor='#bb86fc'
                tabBarUnderlineStyle={{ backgroundColor: '#bb86fc' }}
                tabBarTextStyle={{ fontWeight: '500', fontSize: 16 }}
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