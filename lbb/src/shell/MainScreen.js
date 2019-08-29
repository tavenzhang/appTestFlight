import React from 'react';
import {Image, StyleSheet} from 'react-native';
import {TabBarBottom, TabNavigator, StackNavigator} from 'react-navigation';
import Storage from 'react-native-storage';
import { AsyncStorage } from 'react-native';
import HomeScreen from './HomeScreen';
import MessageScreen from './MessageScreen';
import MeScreen from './MeScreen';
import SearchScreen from './SearchScreen';
import NotificationScreen from './messgae/NotificationScreen';
import MyLostFoundScreen from './me/MyLostFoundScreen';
import FeedbackScreen from './me/FeedbackScreen';
import SettingsScreen from './me/SettingsScreen';
import FindLostScreen from './home/FindLostScreen';
import FindLostDetailScreen from "./home/FindLostDetailScreen";
import PublishFindLostScreen from "./home/PublishFindLostScreen";
import AboutAppScreen from "./me/AboutAppScreen";
import LoginScreen from "./LoginScreen";
import RegisterScreen from "./RegisterScreen";
import SplashScreen from "./SplashScreen";

class TabBarItem extends React.Component {
    static  propTypes:{
        selectedImage: PropTypes.any,
        normalImage:PropTypes.any,
        tintColor:PropTypes.any,
        focused:PropTypes.bool
    }

  render() {
    return (
        <Image
            resizeMode={Image.resizeMode.cover}
            source={this.props.focused ? this.props.selectedImage : this.props.normalImage}
            style={[{tintColor: this.props.tintColor}, styles.tabIcon]}/>
    );
  }
}

const MainNavigator = TabNavigator({
      Home: {
        screen: HomeScreen,
        navigationOptions: {
          tabBarLabel: '主页',
          tabBarIcon: ({focused, tintColor}) => (
              <TabBarItem
                  tintColor={tintColor}
                  focused={focused}
                  normalImage={require('./images/ic_homepage.png')}
                  selectedImage={require('./images/ic_homepage_fill.png')}
              />
          ),
        }
      },
      Message: {
        screen: MessageScreen,
        navigationOptions: {
          tabBarLabel: '消息',
          tabBarIcon: ({focused, tintColor}) => (
              <TabBarItem
                  tintColor={tintColor}
                  focused={focused}
                  normalImage={require('./images/ic_message.png')}
                  selectedImage={require('./images/ic_message_fill.png')}
              />
          ),
        }
      },
      Me: {
        screen: MeScreen,
        navigationOptions: {
          tabBarLabel: '我的',
          tabBarIcon: ({focused, tintColor}) => (
              <TabBarItem
                  tintColor={tintColor}
                  focused={focused}
                  normalImage={require('./images/ic_people.png')}
                  selectedImage={require('./images/ic_people_fill.png')}
              />
          ),
        }
      }
    },
    {
      tabBarComponent: TabBarBottom,
      tabBarPosition: 'bottom',
      tabBarOptions: {
        activeTintColor: '#1296db',
        inactiveTintColor: '#8a8a8a',
        showIcon: true,
        style: {
          backgroundColor: '#FCFCFC', // TabBar 背景色
          paddingBottom: 0,
        },
        labelStyle: {
          fontSize: 14 // label字体大小
        },
        indicatorStyle: {
          height: 0
        }
      },
      animationEnabled: false,
      swipeEnabled: false,
      backBehavior: 'none' // 按back键是否跳转到第一个Tab，none为不跳转
    }
);

export const RootStack = StackNavigator(
    {
      Main: {
        screen: MainNavigator,
      },
      Search: {screen: SearchScreen},
      Notification: {screen: NotificationScreen},
      MyLostFound: {screen: MyLostFoundScreen},
      Feedback: {screen: FeedbackScreen},
      Settings: {screen: SettingsScreen},
      FindLost: {screen: FindLostScreen},
      FindLostDetail: {screen: FindLostDetailScreen},
      PublishFindLost: {screen: PublishFindLostScreen},
      AboutApp: {screen: AboutAppScreen},
      Login: {screen: LoginScreen},
      Register: {screen: RegisterScreen},
      Splash: {screen: SplashScreen},
    },
    {
      'initialRouteName': 'Main',
        navigationOptions: {  // 屏幕导航的默认选项, 也可以在组件内用 static navigationOptions 设置(会覆盖此处的设置)
            // headerStyle: {
            //     backgroundColor: '#ffff00',
            // },
            // headerTintColor: '#fff',
            // headerTitleStyle: {
            //     fontWeight: 'bold',
            // },
            header:null,
            cardStack: {
                gesturesEnabled: true
            }
        },
    }
);

const styles = StyleSheet.create({
  tabIcon: {
    width: 26,
    height: 26
  }
});

let storage = new Storage({
  // 最大容量，默认值1000条数据循环存储
  size: 100,

  // 存储引擎：RN使用AsyncStorage，如果不指定则数据只会保存在内存中，重启后即丢失
  storageBackend: AsyncStorage,

  // 数据过期时间，默认一整天（1000 * 3600 * 24 毫秒），设为null则永不过期
  defaultExpires: null,

  // 读写时在内存中缓存数据。默认启用。
  enableCache: true,
})

global.storage = storage;

global.toastStyle = {
  backgroundColor: "#17abe3",
  color: "#ffffff",
  fontSize: 13,
  borderRadius: 10,
  width: 200,
  height: 60,
  yOffset: 100,
  paddingLeft:20,
  paddingRight:20
}
