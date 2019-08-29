import React from 'react';
import {
    ActivityIndicator,
    FlatList,
    Image,
    StyleSheet,
    Text,
    TouchableHighlight,
    View,
    StatusBar,
    SafeAreaView
} from 'react-native';
import Swiper from 'react-native-swiper';
import PlateComponent from './component/PlateComponent';
import FindLostComponent from './component/FindLostComponent';
import FindLostDivider from './component/FindLostDivider';
import NavBarComponent from './component/NavBarComponent';
import TView from "../Common/View/TView";
import {NavigationActions} from 'react-navigation';

let loadIndex = 0;

const BANNERS = [
    require('./images/bg_banner_1.jpg'),
    require('./images/bg_banner_2.jpg'),
];

import {observer} from 'mobx-react/native';
import appStore from "../Data/AppStore";
@observer
export default class HomeScreen extends TView{

    constructor(props) {
        super(props);
        this.state = {
            isInitialLoad: true, // 初始加载
            isRefreshing: false, // 下拉刷新
            isLoadingMore: false, // 上拉加载
            footerStatus: 0, // 加载更多控件状态：0-隐藏；1-显示加载中，2-显示已加载全部
            error: false, // 请求错误
            errorInfo: "", // 请求错误信息
            dataArray: [], // 请求数据
            isSwiperShow: false,
        }
        this.setState({
            dataArray: this.state.dataArray.push({key: 'stick', value: 'stick'}), // add stick header
        });
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({isSwiperShow: true});
        }, 0)
        this.getLatestInfo();
    }

    renderNavBar(){
        return (<NavBarComponent title={'乐帮帮'} navLeftIcon={'?'}/>)
    }

    renderBody() {
        JXLog("appStore ----render",appStore.userData)
        return (
            <View style={{flex: 1, backgroundColor:"red"}}>
                <FlatList
                        style={{backgroundColor: '#EBEBEB'}}
                        ItemSeparatorComponent={FindLostDivider}
                        ListHeaderComponent={this._renderHeader}
                        onRefresh={this._onRefresh}
                        refreshing={false}
                        data={this.state.dataArray}
                        renderItem={({item}) => this._renderItemView(item)}/>
                </View>
        );
    }

    _renderInitialLoadView() {
        return (
            <View style={styles.container}>
                <ActivityIndicator color='#1296db'  size='large' animating={true}/>
            </View>
        );
    }

    _renderErrorView(error) {
        return (
            <View style={styles.container}>
                <Text>Load Failed:{error}</Text>
            </View>
        );
    }

    _renderHeader() {
        return (<View>
            </View>);
    }

    _onRefresh() {

    }

    _onPlateClick(navTitle, sceneIndex) {
        if (sceneIndex === 0 || sceneIndex === 1) {
            this.props.navigation.navigate('FindLost', {title: navTitle, index: sceneIndex})
        } else if (sceneIndex === 2) {
            this.props.navigation.navigate('MyLostFound', {title: navTitle, index: 0})
        } else if (sceneIndex === 3) {
            this.props.navigation.navigate('PublishFindLost')
        }
    }

    _renderItemView(item) {
        if (item.key === 'stick') {
            return (
                <View>
                    <Swiper height={140}
                            autoplay={true}
                            autoplayTimeout={2}
                            removeClippedSubviews={false}
                            dot={<View style={styles.swiperInactiveDot}/>}
                            activeDot={<View style={styles.swiperActiveDot}/>}
                            paginationStyle={{bottom: 5, right: 20, left: null}}>
                        {
                            BANNERS.map((item) => {
                                return (
                                    <View style={{flex: 1}}>
                                        <Image resizeMode={Image.resizeMode.cover}
                                               style={{width: '100%', height: '100%'}}
                                               source={item}/>
                                    </View>
                                );
                            })
                        }
                    </Swiper>
                    <View style={{backgroundColor: '#ffffff'}}>
                        <View style={{flexDirection: 'row', height: 55}}>
                            <PlateComponent normalIcon={require('./images/ic_stealth_fill.png')} txt={'招领启事'}
                                            onPlateClick={() => this._onPlateClick('招领启事', 0)}/>
                            <View style={{width: 1, backgroundColor: '#eeeeee'}}/>
                            <PlateComponent normalIcon={require('./images/ic_order_fill.png')} txt={'寻物启事'}
                                            onPlateClick={() => this._onPlateClick('寻物启事', 1)}/>
                        </View>
                        <View style={{height: 1, backgroundColor: '#eeeeee'}}/>
                        {appStore.userData.login ?     <View style={{flexDirection: 'row', height: 55}}>
                            <PlateComponent normalIcon={require('./images/ic_like_fill.png')} txt={'我的招寻'}
                                            onPlateClick={() => this._onPlateClick('我的招寻', 2)}/>
                            <View style={{width: 1, backgroundColor: '#eeeeee'}}/>
                            <PlateComponent normalIcon={require('./images/ic_flag_fill.png')} txt={'发布招寻'}
                                            onPlateClick={() => this._onPlateClick('发布招寻', 3)}/>
                        </View>:null}
                    </View>
                    <View style={{flex: 1, height: 5, backgroundColor: 'transparent'}}/>
                    <View style={{padding: 5, flexDirection: 'row', backgroundColor: '#ffffff'}}>
                        <View style={{width: 2, backgroundColor: '#1296db', marginTop: 2, marginBottom: 2}}/>
                        <Text style={{
                            fontSize: 16,
                            color: '#1296db',
                            fontWeight: 'bold',
                            marginLeft: 5
                        }}>最新发布</Text>
                    </View>
                </View>
            );
        }
        return (
            <TouchableHighlight underlayColor={'#E6E6E6'} onPress={() => this._onItemClick(item.value)}>
                <FindLostComponent dataKey={item.key} dataValue={item.value}/>
            </TouchableHighlight>
        );
    }

    _onItemClick(item) {
        this.props.navigation.navigate('FindLostDetail', {data: item});
    }

    getLatestInfo() {
        fetch('http://result.eolinker.com/giseBuH1c3227abd30d32593adcd8938a1f2042158c89ba?uri=lbbapi/getLatestInfo')
            .then((response) => response.json())
            .then((responseJson) => {
                console.warn('getLatestInfo() responseJson=' + responseJson.desc)
                let results = responseJson.results;
                let dataBlob = [];
                let index = loadIndex;
                results.map(function (item) {
                    dataBlob.push({key: index, value: item})
                    index++
                })
                loadIndex = index;
                this.setState({
                    isInitialLoad: false,
                    isRefreshing: false,
                    isLoadingMore: false,
                    dataArray: this.state.dataArray.concat(dataBlob)
                })
            })
            .catch((error) => {
                JXLog('getLatestInfo() error=' + error)
            })
            .done();
    }

    componentWillMount(){
        T_Stroge.load('account',(ret)=>{
                appStore.loginIn(ret)
            })
        }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    headerContainer: {
        height: 50,
        backgroundColor: '#1296db'
    },
    headerInnerContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        backgroundColor: '#ffffff',
        marginLeft: 10,
        marginRight: 10,
        marginTop: 7,
        marginBottom: 7
    },
    headerText: {
        color: '#1296db',
        textAlign: 'center',
        textAlignVertical: 'center'
    },
    swiperActiveDot: {
        backgroundColor: '#00bfff',
        width: 8,
        height: 8,
        borderRadius: 4,
        marginLeft: 3,
        marginRight: 3,
        marginTop: 3,
        marginBottom: 3,
    },
    swiperInactiveDot: {
        backgroundColor: '#f8f8ff',
        width: 5,
        height: 5,
        borderRadius: 4,
        marginLeft: 3,
        marginRight: 3,
        marginTop: 3,
        marginBottom: 3
    },
    title: {
        fontSize: 15,
        color: 'blue',
    },
    content: {
        fontSize: 15,
        color: 'black',
    },
    footer: {
        flexDirection: 'row',
        height: 24,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    plateContainer: {
        flexDirection: 'row',
        backgroundColor: '#ffffff',
        paddingTop: 5,
        paddingBottom: 5
    }
});
