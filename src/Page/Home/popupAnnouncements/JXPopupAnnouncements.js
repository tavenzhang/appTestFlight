/**
 * Created by Sam on 06/06/2018.
 * Copyright © 2017年 JX. All rights reserved.
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    ImageBackground
} from 'react-native';

/**系统 npm类 */
import Modal from 'react-native-modalbox';
import Button from 'apsl-react-native-button'

/**组件内部显示需要引入的类 */
import {Other} from "../../asset/drawable";
import { Size,width,height } from '../../../Page/resouce/theme';
// import ViewPager from 'react-native-viewpager';
// import PageIndicator from '../../../Common/View/PageIndicator';
import Swiper from '../../../Common/View/swiper/Swiper'
import NavigatorHelper from '../../../Common/JXHelper/TCNavigatorHelper';

import {setReadPopupAnnouncements} from './JXPopupNoticeHelper';

const h = 170;

/** 外部关系组件 如 页面跳转用 */

export default class MyComponent extends React.Component {
    constructor(state) {
        super(state)
        this.state = {
            title:'',
            ViewPagerDataSource:[],
            content:[]
        }
    }

    static defaultProps = {
        animationType: 'none'
    }

    componentDidMount() {
    }

    render() {
        return (
            <Modal
                coverScreen={true}
                swipeToClose={false}
                ref={"modal"}
                isOpen={false}
                style={{
                    flex:1,
                    backgroundColor: 'transparent',
                    position: 'absolute',
                    justifyContent:'center',
                    alignItems:'center',
                    height:height,
                    width:width
                }}
                animationDuration={500}
                position={'center'}
                backdropPressToClose={false}
                animationType={this.props.animationType}
                transparent={true}
                visible={true}
                onRequestClose={() => {
                    this._setModalVisible(false)
                }}
            >
                {this.getRenderView()}
            </Modal>
        )
    }

    getRenderView(){
        return (
            <View style={{width: 300,borderRadius:8,justifyContent:'center',backgroundColor:'white',alignItems:'center',overflow:'hidden'}}>
            <ImageBackground source={Other.announcement_top} style={{width:300,height:80,alignItems:'center',justifyContent:'center'}} >
               <MyTitleView ref="txtView" title={this.state.title}/>
            </ImageBackground>
                <View style={{ width: 300, height: h ,backgroundColor:'white',overflow:'hidden'}}>
                    {/*<ViewPager*/}
                        {/*style={{width:300}}*/}
                        {/*dataSource={this.state.ViewPagerDataSource}*/}
                        {/*renderPage={(d, p) => this.renderPage(d, p)}*/}
                        {/*isLoop={false}*/}
                        {/*autoPlay={false}*/}
                        {/*renderPageIndicator={() => <PageIndicator />}*/}
                        {/*onChangePage={(p) =>{*/}
                            {/*this.setState({title:this.state.content[p].title})*/}
                        {/*}}*/}
                    {/*/>*/}
                    <Swiper
                        width={300}
                        autoplay={true}
                        dataSource={this.state.ViewPagerDataSource}
                        renderRow={this.renderPage}
                        onWillChange={this.onDidChange}
                    />
                </View>
                <View style={{flexDirection:'row'}}>
                    <Button style={{width:150,marginBottom:0,borderRadius:0,borderWidth:1,borderColor:'#ddd'}} textStyle={{color:'#666'}} onPress={()=>{
                        this.close()
                    }}>关闭</Button>
                    <Button style={{width:150,marginBottom:0,borderRadius:0,borderWidth:1,borderColor:'#ddd'}} textStyle={{color:'#1DA57A'}} onPress={()=>{
                        this.close()
                        setReadPopupAnnouncements(this.state.content)
                    }}>不再提醒</Button>
                </View>
            </View>
        )
    }

    onDidChange=(d,b)=>{
        this.refs.txtView.updateTitle(d.title)
    }

    renderPage=(d,p)=>{
        return (
                <View style={styles.page}>
                    <Text style={{margin:10,fontSize:Size.font16,color:'#333'}}>{d.content}</Text>
                    <View style={{alignSelf:'flex-end',marginRight:10}}>
                    <Text style={{fontSize:Size.font14,color:'#333'}}>{d.createTime}</Text>
                    </View>
                </View>
        )
    }

    open(d){
        if(d && d.length > 0 ){
            this.setState({
                ViewPagerDataSource: d,
                content:d,
                  title:d[0].title
            });
            this.refs.modal.open();
        }
    }

    close(){
        this.refs.modal.close();
    }
}

//简单的封装title，方便 通过ref 局部刷新 也可以利用MoboxStore间隔实现
class MyTitleView extends React.Component {

    constructor(props){
        super(props)
        this.state={
            title:props.title ? props.title:""
        }
    }

    updateTitle(txt) {
        this.setState({title: txt})
    }


    render(){
        return  (<Text style={{marginBottom:20,fontSize:Size.font18,fontWeight:'bold',color:'white',backgroundColor:'transparent'}}>
            {this.state.title}</Text>)
    }
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F2F2F2',
    },
    page:{
        width: 300,
        height: h,
        resizeMode: 'cover',
        alignItems:'center'
    }
});
