import TView from "../../Common/View/TView";

'use-strict';
import React from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator
} from 'react-native';
import NavBarComponent from '../component/NavBarComponent';
import FindLostComponent from '../component/FindLostComponent';
import FindLostDivider from '../component/FindLostDivider';

const {width} = Dimensions.get('window');
const tabData = ['选择分类', '选择排序'];
const categoryItems = [{title: '人'}, {title: '车'}, {title: '宠物'}, {title: '钱包'}, {title: '首饰'}, {title: '全部'}];
const sortItems = [{title: '时间升序'}, {title: '时间倒序'}, {title: '不限'}];
let loadIndex = 0;
let sceneIndex = 0;

export default class FindLostScreen extends TView{

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
    this.getFindLostList()
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
        <View style={{flex: 1}}>
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
          <TouchableOpacity style={{flex: 1}} onPress={() => this.getFindLostList()} activeOpacity={0.8}>
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
    } else {
      return (<FlatList
          style={{backgroundColor: '#EBEBEB', marginTop: 5, marginBottom: 5}}
          ItemSeparatorComponent={FindLostDivider}
          ListHeaderComponent={this._renderHeader}
          onRefresh={this._onRefresh}
          refreshing={false}
          data={this.state.dataArray}
          renderItem={({item}) => this._renderItemView(item)}/>)
    }
  }

  _renderHeader() {
    return (
        <View>
        </View>
    );
  }

  _onRefresh() {

  }

  _renderItemView(item) {
    return (
        <TouchableOpacity underlayColor={'#E6E6E6'} onPress={() => this.onItemClick(item.value)}>
          <FindLostComponent dataKey={sceneIndex} dataValue={item.value}/>
        </TouchableOpacity>
    );
  }

  onItemClick(item) {
    this.props.navigation.navigate('FindLostDetail', {data: item});
  }

  getFindLostList() {
    let url = sceneIndex === 0
        ? 'http://result.eolinker.com/giseBuH1c3227abd30d32593adcd8938a1f2042158c89ba?uri=lbbapi/findList'
        : 'http://result.eolinker.com/giseBuH1c3227abd30d32593adcd8938a1f2042158c89ba?uri=lbbapi/lostList';
    fetch(url)
        .then((response) => response.json())
        .then((responseJson) => {
          console.warn('getFindLostList() responseJson=' + responseJson.desc)
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
            error: false,
            dataArray: this.state.dataArray.concat(dataBlob)
          })
          dataBlob = null;
        })
        .catch((error) => {
          console.log('getFindLostList() error=' + error)
          this.setState({
            isInitialLoad: false,
            isRefreshing: false,
            isLoadingMore: false,
            error: true
          })
        })
        .done();
  }
}
