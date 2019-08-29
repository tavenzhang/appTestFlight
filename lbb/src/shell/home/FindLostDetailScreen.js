import TView from "../../Common/View/TView";

'use-strict';
import React from 'react';
import {View, Text, Image, FlatList, StyleSheet, Linking, TouchableOpacity} from 'react-native';
import NavBarComponent from '../component/NavBarComponent';
import MessageComponent from '../component/MessageComponent';

let value;
export default class FindLostDetailScreen extends TView {

  constructor(props) {
    super(props)

    this.state = {
      collection: 0,
      comments: []
    }

    const {params} = this.props.navigation.state;
    value = params ? params.data : null;
    storage.load({
      key: 'find&lost-collection',
      id: value.id
    }).then(ret => {
      console.info('FindLostDetailScreen#constructor() data='+ret.detail);
      this.setState({collection: 1});
    }).catch(err => {
      console.warn('FindLostDetailScreen#constructor() err='+err.message);
    })
  }

  componentDidMount() {
    this.getComments();
  }

  _onNavLeftClick = () => {
    this.props.navigation.goBack();
  }

  _onNavRightClick() {
    if (this.state.collection === 0) {
      storage.save({
        key: 'find&lost-collection', // 注意:请不要在key中使用_下划线符号!
        id: value.id,
        data: value
      });
      this.setState({collection: 1});
    } else {
      storage.remove({
        key: 'find&lost-collection',
        id: value.id,
        data:value.id
      });
      this.setState({collection: 0});
    }
  }

  renderNavBar(){
      if (!value) {
          return (
              <View style={{flex: 1}}>
                  <Text>Empty Content</Text>
              </View>
          );
      }
    return (<NavBarComponent title={'详情'}
                               navRightIcon={this.state.collection === 0 ? require('../images/ic_like_white.png') : require('../images/ic_like_fill_white.png')}
                               onNavLeftClick={this._onNavLeftClick}
                               onNavRightClick={this._onNavRightClick.bind(this)}/>)
  }

  renderBody() {
    if (!value) {
      return (
          <View style={{flex: 1}}>
            <Text>Empty Content</Text>
          </View>
      );
    }
    return (
        <View style={{flex: 1}}>
          <FlatList
              style={{flex: 1}}
              ItemSeparatorComponent={this._renderDivider}
              ListHeaderComponent={this._renderHeader(value)}
              data={this.state.comments}
              renderItem={({item}) => this._renderItemView(item)}/>
        </View>
    );
  }

  _renderDivider() {
    return (
        <View style={{backgroundColor: '#eeeeee', height: 1}}/>
    );
  }

  _renderItemView(item) {
    return (
        <MessageComponent dataValue={item.value}/>
    )
  }

  _renderHeader(value) {
    return (
        <View>
          <View style={styles.userInfoContainer}>
            <Image source={require('../images/ic_default_avatar.png')}
                   style={{width: 35, height: 35, resizeMode: 'cover'}}/>
            <View style={{flex: 1, marginLeft: 5, marginRight: 10}}>
              <Text style={{color: '#2B2B2B', fontSize: 14}}>{value.realname}</Text>
              <Text style={{color: '#cccccc', fontSize: 12}}>{value.create_time}</Text>
            </View>
            <View
                style={[styles.labelContainer, {backgroundColor: value.type === 0 ? '#4A8AF6' : '#F91B38'}]}>
              <Text style={styles.labelText}>{value.type === 0 ? '寻物启事' : '招领启事'}</Text>
            </View>
          </View>
          <View style={{height: 1, backgroundColor: '#eeeeee'}}/>
          <View style={{backgroundColor: '#ffffff', padding: 10}}>
            <Text style={{color: '#515151', fontSize: 13}}>物品类型：{value.category}</Text>
            <Text style={{color: '#515151', fontSize: 13, marginTop: 5}}>
              丢失地点：{value.fl_address}
            </Text>
            <Text style={{color: '#515151', fontSize: 13, marginTop:5}}>联系电话：{value.phone}</Text>
            <View style={{flexDirection: 'row', marginTop: 10, alignItems: 'center'}}>
              <Image source={require('../images/ic_workbench.png')} style={{width: 18, height: 18}}
                     resizeMode={Image.resizeMode.enter}/>
              <Text style={{color: '#8a8a8a', fontSize: 13, marginLeft: 3}}>详细描述</Text>
            </View>
            <Text style={styles.detailText}>{value.detail}</Text>
            <View style={{flexDirection: 'row', marginTop: 10, alignItems: 'center'}}>
              <Text style={{color: '#F91B38', fontSize: 15}}>酬金：￥{value.money}</Text>
              <Image source={require('../images/ic_doubt_fill.png')}
                     style={{width: 18, height: 18, marginLeft: 3}}
                     resizeMode={Image.resizeMode.enter}/>
            </View>
          </View>
          <View style={{height: 10, backgroundColor: '#EBEBEB'}}/>
          <View style={{
            flexDirection: 'row',
            padding: 10,
            alignItems: 'center',
            backgroundColor: '#ffffff'
          }}>
            <Image source={require('../images/ic_mail.png')} style={{width: 18, height: 18}}
                   resizeMode={Image.resizeMode.enter}/>
            <Text style={{color: '#515151', fontSize: 13, marginLeft: 3}}>留言信息</Text>
          </View>
          <View style={{height: 1, backgroundColor: '#eeeeee'}}/>
        </View>
    );
  }

  getComments() {
    // setTimeout(() => {
    //   let _str = '[{"username":"张天翼", "date":"2018-04-21 14:26", "comment":"希望你能找到，加油！"}, {"username":"何川", "date":"2018-04-21 14:26", "comment":"希望你能找到，加油！"},{"username":"葛建", "date":"2018-04-21 14:26", "comment":"希望你能找到，加油！"},{"username":"李霞", "date":"2018-04-21 14:26", "comment":"希望你能找到，加油！"},{"username":"周倩", "date":"2018-04-21 14:26", "comment":"希望你能找到，加油！"}]';
    //   let str = JSON.parse(_str);
    //   let dataBlob = [];
    //   let index = 0;
    //   str.map(function (item) {
    //     dataBlob.push({key: index, value: item});
    //     index++;
    //   })
    //   this.setState({comments: this.state.comments.concat(dataBlob)})
    //   dataBlob = null
    // }, 500)

    fetch('http://result.eolinker.com/giseBuH1c3227abd30d32593adcd8938a1f2042158c89ba?uri=lbbapi/getComments', {
      method: 'POST',
      body: JSON.stringify({userid: '1', flid: '1'})
    }).then((response) => response.json())
        .then((responseJson) => {
          console.info('getComments() status=' + responseJson.status + ', desc=' + responseJson.desc)
          let index = 0;
          let dataBlob = [];
          responseJson.results.map(function (item) {
            dataBlob.push({key: index, value: item});
            index++;
          })
          this.setState({comments: this.state.comments.concat(dataBlob)})
          dataBlob = null
        })
        .catch((error) => {
          console.error('getComments() error=' + error)
        })
        .done()
  }

  comment() {

  }

  dialPhone() {
    const {params} = this.props.navigation.state;
    const phone = params ? params.ra_phone : null;
    console.info('dialPhone() phone=' + phone)
    if (phone) {
      Linking.openURL('tel:' + phone);
    }
  }

}

const styles = StyleSheet.create({
  userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#ffffff'
  },
  labelContainer: {width: 65, height: 22, borderRadius: 3, justifyContent: 'center'},
  labelText: {color: '#ffffff', fontSize: 12, textAlign: 'center', textAlignVertical: 'center'},
  detailText: {
    color: '#2c2c2c',
    fontSize: 12,
    backgroundColor: '#c9ecff',
    padding: 10,
    marginTop: 5
  },
  bottomTabContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  }
})
