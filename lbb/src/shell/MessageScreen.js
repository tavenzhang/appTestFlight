import React from 'react';
import {StyleSheet, View,} from 'react-native';
import TabItemComponent from './component/TabItemComponent';
import NavBarComponent from './component/NavBarComponent';
import TView from "../Common/View/TView";
import {observer} from 'mobx-react/native';
import appStore from "../Data/AppStore";

@observer
export default class MessageScreen extends TView{

  _onTabItemClick(navTitle, sceneIndex) {
    this.props.navigation.navigate('Notification', {title: navTitle, index: sceneIndex})
  }

  renderNavBar(){
      return (<NavBarComponent title={'消息'} navLeftIcon={'?'}/>)
  }

  renderBody() {
    return (
        <View style={{flex: 1}}>
          <View style={{flex: 1, flexDirection: 'column', backgroundColor: '#EBEBEB'}}>
            <View style={{height: 1, backgroundColor: '#E9E9E9', marginTop: 10}}/>
              {appStore.userData.login ?      <TabItemComponent leftIcon={require('./images/ic_my_message.png')}
                                                                rightIcon={require('./images/ic_arrow_right.png')}
                                                                tabTxt={'我的消息'}
                                                                onTabItemClick={() => this._onTabItemClick('我的消息', 0)}/>:null}

              {appStore.userData.login ?    <View style={{height: 1, backgroundColor: '#E9E9E9'}}/>:null}
              {appStore.userData.login ?    <View style={{height: 1, backgroundColor: '#E9E9E9', marginTop: 10}}/>:null}

            <TabItemComponent leftIcon={require('./images/ic_system_notification.png')}
                              rightIcon={require('./images/ic_arrow_right.png')}
                              tabTxt={'系统消息'}
                              onTabItemClick={() => this._onTabItemClick('系统消息', 1)}/>
            <View style={{height: 1, backgroundColor: '#E9E9E9'}}/>
          </View>
        </View>
    );
  }

}

const styles = StyleSheet.create({
  headerText: {
    color: '#ffffff',
    fontSize: 20,
    textAlign: 'center',
    textAlignVertical: 'center'
  }
});
