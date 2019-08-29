import TView from "../../Common/View/TView";

'use-strict';
import React from 'react';
import {View, ActivityIndicator, TouchableOpacity, Image, Text, FlatList} from 'react-native';
import NavBarComponent from '../component/NavBarComponent';
import FindLostComponent from '../component/FindLostComponent';
import FindLostDivider from '../component/FindLostDivider';

let sceneIndex = 0;

export default class MyLostFoundScreen extends TView {

  constructor(props) {
    super(props);
    const {params} = this.props.navigation.state;
    sceneIndex = params ? params.index : 0;
    this.state = {
      isInitialLoad: true, // 初始加载
      isRefreshing: false, // 下拉刷新
      isLoadingMore: false, // 上拉加载
      error: false, // 请求错误
      footerStatus: 0, // 加载更多控件状态：0-隐藏；1-显示加载中，2-显示已加载全部
      errorInfo: "", // 请求错误信息
      dataArray: [], // 请求数据
    }
  }

  componentDidMount() {
    if (sceneIndex === 0) { // 发布
      storage.getAllDataForKey('find&lost-publish')
          .then((publish) => {
            console.info('MyLostFoundScreen#componentDidMount() publishSize=' + publish.length);
            this.setState({
              isInitialLoad: false,
              dataArray: this.state.dataArray.concat(publish)
            })
          })
          .catch((error) => {
            console.warn('MyLostFoundScreen#componentDidMount() error=' + error.message);
            this.setState({isInitialLoad: false})
          })
    } else if (sceneIndex === 1) { // 收藏
      storage.getAllDataForKey('find&lost-collection')
          .then((collections) => {
            console.info('MyLostFoundScreen#componentDidMount() collectionSize=' + collections.length);
            this.setState({
              isInitialLoad: false,
              dataArray: this.state.dataArray.concat(collections)
            })
          })
          .catch((error) => {
            console.warn('MyLostFoundScreen#componentDidMount() error=' + error.message);
            this.setState({isInitialLoad: false})
          })
    } else if (sceneIndex === 2) { //留言
      setTimeout(() => {
        this.setState({isInitialLoad: false})
      }, 1200)
    }
  }

  _onNavLeftClick = () => {
    this.props.navigation.goBack();
  }
  renderNavBar(){
      const {params} = this.props.navigation.state;
      const navTitle = params ? params.title : '';
      return (<NavBarComponent title={navTitle} onNavLeftClick={this._onNavLeftClick}/>)
  }

  renderBody() {


    return (
        <View style={{flex: 1, backgroundColor:'#EBEBEB'}}>

          {this._renderContent()}
        </View>
    );
  }

  _renderContent() {
    if (this.state.isInitialLoad) {
      return (
          <ActivityIndicator color='#1296db' size='large'
                             style={{alignItems: 'center', justifyContent: 'center', flex: 1}}/>
      )
    } else if (this.state.error) {
      return (
          <TouchableOpacity style={{flex: 1}} onPress={() => this.getFindLostList()}
                            activeOpacity={0.8}>
            <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
              <Image source={require('../images/ic_error.png')} style={{width: 42, height: 42}}/>
              <Text style={{
                color: '#515151',
                fontSize: 16,
                textAlign: 'center',
                textAlignVertical: 'center',
                marginTop: 10
              }}>亲，出了一些状况哦~{'\n'}点击重新加载数据</Text>
            </View>
          </TouchableOpacity>
      )
    } else if (!this.state.dataArray || this.state.dataArray.length === 0) {
      return (
          <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
            <Image source={require('../images/ic_logo.png')} style={{width: 72, height: 72}}/>
            <Text style={{
              color: '#515151',
              fontSize: 14,
              textAlign: 'center',
              textAlignVertical: 'center',
              marginTop: 5
            }}>什么都没有，跑去火星了吗~</Text>
          </View>
      )
    } else {
      return (
          <FlatList
              style={{backgroundColor: '#EBEBEB', marginTop: 5, marginBottom: 5}}
              ItemSeparatorComponent={FindLostDivider}
              ListHeaderComponent={this._renderHeader}
              onRefresh={this._onRefresh}
              refreshing={false}
              data={this.state.dataArray}
              renderItem={({item}) => this._renderItemView(item)}/>)
    }
  }

  _renderItemView(item) {
    console.warn('//// '+item.toString())
    return (
        <TouchableOpacity underlayColor={'#E6E6E6'} onPress={() => this.onItemClick(item)}>
          <FindLostComponent dataKey={sceneIndex} dataValue={item}/>
        </TouchableOpacity>
    );
  }

  onItemClick(item) {
    this.props.navigation.navigate('FindLostDetail', {data: item});
  }
}
