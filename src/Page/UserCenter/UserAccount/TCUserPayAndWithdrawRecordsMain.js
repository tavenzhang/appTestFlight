'use strict'
/**
 * 充值和提款记录主界面
 * Created by Allen on 2016/12/10.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';
import TopNavigationBar from '../../../Common/View/TCNavigationBar';
import ScrollableTabView from '../../../Common/View/ScrollableTab/index'
import DefaultTabBar from '../../../Common/View/ScrollableTab/DefaultTabBar'
import UserAccount from './TCUserPayAndWithdrawRecords'
import Helper from '../../../Common/JXHelper/TCNavigatorHelper'
import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter'
import {Size, shoppingTxtColor, indexBgColor, listViewTxtColor} from '../../resouce/theme'
import {withMappedNavigationProps} from 'react-navigation-props-mapper'

@withMappedNavigationProps()
export default class TCUserPayAndWithdrawRecordsMain extends Component {

    constructor(props) {
        super(props)
    }

    static defaultProps = {
        initPage: 0,
    }

    componentDidMount() {

    }

    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);
    }

    render() {
        return (
            <View style={styles.container}>
                < TopNavigationBar
                    title={this.props.accountType === 1 ? '充值记录' : '提款记录'}
                    needBackButton={true}
                    backButtonCall={() => {
                        this.back()
                    }}
                />
                <ScrollableTabView
                    renderTabBar={() => <DefaultTabBar style={{height: 45}} textStyle={{marginTop: 30}}/>}
                    tabBarUnderlineStyle={{backgroundColor: shoppingTxtColor.tabLine, height: 2}}
                    tabBarBackgroundColor={indexBgColor.itemBg}
                    locked={true}
                    initialPage={0}
                    tabBarActiveTextColor={shoppingTxtColor.tabTitlePressed}
                    tabBarInactiveTextColor={shoppingTxtColor.tabTitleNormal}
                    tabBarTextStyle={{fontSize: Size.font15, fontWeight: 'normal', marginTop: 10,}}>
                    <UserAccount tabLabel='全部' navigator={this.props.navigator} type={1}
                                 accountType={this.props.accountType}/>
                    <UserAccount tabLabel='已完成' navigator={this.props.navigator} type={2}
                                 accountType={this.props.accountType}/>
                    <UserAccount tabLabel='失败' navigator={this.props.navigator} type={3}
                                 accountType={this.props.accountType}/>
                </ScrollableTabView>
            </View>
        );

    };

    back() {
        if (this.props.isBackToTop) {
            RCTDeviceEventEmitter.emit('balanceChange')
            Helper.popToTop()
        } else {
            Helper.popToBack()
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});