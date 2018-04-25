/**
 * Created by Sam on 2016/11/16.
 */


import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ListView,
    TouchableOpacity,
    Dimensions,
    RefreshControl,
    InteractionManager,
    WebView
} from 'react-native';
import TopNavigationBar from '../../Common/View/TCNavigationBarSelectorStyle'
import  PopView from '../../Common/View/TCSelectModal'
import Moment from 'moment'
import {width, indexBgColor} from '../../Page/resouce/theme'
const lotteryType = ['HF_CQSSC', 'HF_LFSSC', 'HF_XJSSC', 'HF_TJSSC','HF_FFSSC', 'X3D', 'HF_LFPK10', 'HF_BJPK10','HF_FFPK10', 'HF_GDD11', 'HF_AHD11', 'HF_JXD11', 'HF_SDD11', 'HF_SHD11', 'HF_JSK3', 'HF_GXK3', 'HF_AHK3','HF_FFK3', 'HF_SHSSL', 'PL3','HF_BJK3','HF_JLK3','HF_XYFT','HF_XYSM']

const lotteryName = ['重庆时时彩', '二分时时彩', '新疆时时彩', '天津时时彩','分分时时彩', '福彩3D', '两分PK拾', '北京PK拾','分分PK拾', '广东11选5', '安徽11选5', '江西11选5', '山东11选5', '上海11选5', '江西快3', '广西快3', '安徽快3','分分快3', '上海时时乐', '排列3','北京快3', '吉林快3', '幸运飞艇', '幸运赛马']

import  RCTDeviceEventEmitter from 'RCTDeviceEventEmitter'
import LoadingSpinnerOverlay from '../../Common/View/LoadingSpinnerOverlay'
import {trendServer} from '../resouce/appConfig'
export default class TCTrend extends Component {

    constructor(state) {
        super(state)
        this.type = ''
        this.baseUrl = '' + (TCDefaultTendDomain?TCDefaultTendDomain:trendServer) + '/trend?gameUniqueId='
        this.state = {
            lotteryType: null,
            title: lotteryName[0],
            url: this.baseUrl + lotteryType[0] + '&navigationBar=0'
        }
    }

    static defaultProps = {
        title: '',
        type: '',
    };

    componentDidMount() {
        this.showPopView();
        this._modalLoadingSpinnerOverLay.show()
    }

    componentWillUnmount() {
        this._modalLoadingSpinnerOverLay && this._modalLoadingSpinnerOverLay.hide()
    }

    render() {

        return (
            <View style={styles.container}>
                <TopNavigationBar
                    ref='TopNavigationBar'
                    title={this.state.title}
                    needBackButton={false}
                    centerButtonCall={()=> {
                        this.showPopView()
                    }}

                    backButtonCall={()=> {
                        RCTDeviceEventEmitter.emit('balanceChange')
                        this.props.navigator.pop()
                    }}
                    rightTitle={'刷新'}
                    rightButtonCall={()=> {
                        this.refresh()
                    }
                    }
                />

                <PopView
                    ref='TCSelectPopupView'
                    SelectorTitleArr={this.initialMessageType()}
                    selectedFunc={(index) => {
                        this.selectMsgType(index)
                    }}
                    selectedIndex={0}
                />
                <WebView
                    automaticallyAdjustContentInsets={true}
                    style={styles.webView}
                    source={{uri: this.state.url}}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    decelerationRate="normal"
                    startInLoadingState={true}
                    scalesPageToFit={false}
                    onNavigationStateChange={this.onNavigationStateChange}
                    onShouldStartLoadWithRequest={this.onShouldStartLoadWithRequest}
                    onLoadEnd={()=>this.onLoadEnd()}
                />
                <LoadingSpinnerOverlay
                    ref={ component => this._modalLoadingSpinnerOverLay = component }/>

            </View>
        );
    }


    initialMessageType() {
        return lotteryName
    }


    refresh() {
        this.setState({
            url: this.state.url + '&temp=' + Moment().format('X')
        })
        // this._modalLoadingSpinnerOverLay && this._modalLoadingSpinnerOverLay.show()
    }

    selectMsgType(index) {
        var popView = this.refs.TCSelectPopupView
        popView._setModalSelectedIndex(index, 0);
        let navBar = this.refs.TopNavigationBar
        navBar.setTitle(this.initialMessageType()[index])
        this.setState({
            url: this.baseUrl + lotteryType[index] + '&navigationBar=0'
        })
        // this._modalLoadingSpinnerOverLay && this._modalLoadingSpinnerOverLay.show()
    }

    onShouldStartLoadWithRequest = (event) => {
        return true;
    };

    onLoadEnd() {
        this._modalLoadingSpinnerOverLay && this._modalLoadingSpinnerOverLay.hide()
    }

    onNavigationStateChange = (navState) => {
        JXLog(navState)
        this.setState({
            backButtonEnabled: navState.canGoBack,
            title: navState.title,
            scalesPageToFit: true
        });
    };

    backButtonCall() {
        if (this.state.backButtonEnabled) {
            this.refs['topNavigation']._showCloseButton(true)
        } else {
            this.props.navigator.pop()
        }
    }

    showPopView() {
        var popView = this.refs.TCSelectPopupView
        if (popView.state.modalVisible) {
            popView._setModalVisible(false);
        } else {
            popView._setModalVisible(true);
        }
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: indexBgColor.mainBg,
    },
    webView: {
        marginTop: 0,
        width: width
    }
});

