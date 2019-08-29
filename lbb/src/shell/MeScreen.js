import React from 'react';
import {Image, StatusBar, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import TabItemComponent from './component/TabItemComponent';
import NavBarComponent from './component/NavBarComponent';
import TView from "../Common/View/TView";

import {observer} from 'mobx-react/native';
import appStore from "../Data/AppStore";

@observer
export default class MeScreen extends TView {


    _onTabItemClick = (navTitle, sceneIndex) => {
        if (sceneIndex === 0 || sceneIndex === 1 || sceneIndex === 2) {
            this.props.navigation.navigate('MyLostFound', {title: navTitle, index: sceneIndex})
        } else if (sceneIndex === 3) {
            this.props.navigation.navigate('Feedback', {title: navTitle})
        } else if (sceneIndex === 4) {
            this.props.navigation.navigate('AboutApp', {title: navTitle})
        }
    }

    _onNavRightClick = () => {
        this.props.navigation.navigate('Settings', {title: "设置"})
    }

    renderNavBar() {
        return (<NavBarComponent
            title={'我的'}
            navLeftIcon={'?'}
            navRightIcon={appStore.userData.login ? require('./images/ic_setup.png') : null}
            onNavRightClick={this._onNavRightClick}/>)
    }

    renderBody() {
        let contentView = (<View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
            <Image source={require('./images/ic_logo.png')} style={{width: 72, height: 72}}/>
            <Text style={{
                color: '#515151',
                fontSize: 14,
                textAlign: 'center',
                textAlignVertical: 'center',
                marginTop: 5
            }}>尚未登录~</Text>
            <TouchableOpacity activeOpacity={0.8} style={styles.loginBtn}
                              onPress={() => {
                                  this.props.navigation.navigate('Login', {title: "登陆"})}
                              }>
                <Text style={styles.loginBtnText}>登录</Text>
            </TouchableOpacity>
        </View>)
        if (appStore.userData.login) {
            contentView = (<View style={{flex: 1}}>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    padding: 10,
                    backgroundColor: '#ffffff'
                }}>
                    <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center'}}>
                        <Text style={{color: '#000000', fontSize: 18}}>{appStore.userData.username}</Text>
                    </View>
                    <Image source={require('./images/ic_avatar.png')} style={{width: 72, height: 72}}/>
                </View>
                <View style={{flex: 1, flexDirection: 'column', backgroundColor: '#EBEBEB'}}>
                    <View style={{height: 1, backgroundColor: '#E9E9E9', marginTop: 10}}/>
                    <TabItemComponent tabTxt={'我的发布'} rightIcon={require('./images/ic_my_publish.png')}
                                      onTabItemClick={() => this._onTabItemClick('我的发布', 0)}/>
                    <View style={{height: 1, backgroundColor: '#E9E9E9'}}/>
                    <TabItemComponent tabTxt={'我的收藏'} rightIcon={require('./images/ic_my_collection.png')}
                                      onTabItemClick={() => this._onTabItemClick('我的收藏', 1)}/>
                    <View style={{height: 1, backgroundColor: '#E9E9E9'}}/>
                    <TabItemComponent tabTxt={'我的留言'} rightIcon={require('./images/ic_my_survey.png')}
                                      onTabItemClick={() => this._onTabItemClick('我的留言', 2)}/>
                    <View style={{height: 1, backgroundColor: '#E9E9E9'}}/>

                    <View style={{height: 1, backgroundColor: '#E9E9E9', marginTop: 10}}/>
                    <TabItemComponent tabTxt={'意见反馈'} rightIcon={require('./images/ic_feedback.png')}
                                      onTabItemClick={() => this._onTabItemClick('意见反馈', 3)}/>
                    <View style={{height: 1, backgroundColor: '#E9E9E9'}}/>
                    <TabItemComponent tabTxt={'关于我们'} rightIcon={require('./images/ic_about.png')}
                                      onTabItemClick={() => this._onTabItemClick('关于我们', 4)}/>
                    <View style={{height: 1, backgroundColor: '#E9E9E9'}}/>
                </View>
            </View>)
        }
        return contentView;
    }
}

const styles = StyleSheet.create({
    headerText: {
        color: '#ffffff',
        fontSize: 20,
        textAlign: 'center',
        textAlignVertical: 'center',
        flex: 1
    },
    headerImage: {
        width: 24,
        height: 24,
        marginRight: 10,
    },
    loginBtn: {
        backgroundColor: '#1296db',
        height: 42,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 20,
        width:200,
    },
    loginBtnText: {
        color: '#ffffff',
        fontSize: 16,
        backgroundColor: 'transparent'
    },

});
