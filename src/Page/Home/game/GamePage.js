import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    FlatList, Image
} from 'react-native';
//import NoDataView from "../../Common/View/NoDataView";
import {observer} from 'mobx-react/native'
import {indexBgColor,baseColor,width} from "../../resouce/theme";
import PropTypes from 'prop-types'



@observer
export default class GamePage extends Component {

    static propTypes ={
        datas:PropTypes.any,
        onClickItem:PropTypes.any,
        initNumRender:PropTypes.any
    }

    static  default={
        initNumRender:10
    }

    constructor(props) {
        super(props)
    }

    render() {
        let {initNumRender} = this.props
        return (<FlatList
                ItemSeparatorComponent={() => <View
                    style={{height: 1, backgroundColor: indexBgColor.mainBg, width: width}}/>}
                data={this.props.datas}
                initialNumToRender={initNumRender}
                ListEmptyComponent={this.getNodataView}
                numColumns={2}
                keyExtractor={(item, index) => "list" + index}
                renderItem={this.renderItemView}
            />)
    }



    getNodataView=()=> {
        return (<View style={{flex:1, alignItems:"center", justifyContent:"center"}}>
                    <Text>
                        游戏加载中...
                    </Text>
              </View>)
        // return <NoDataView
        //     ref='NoDataView'
        //     unNetwork={true}
        //     titleTip={'加载失败'}
        //     contentTip="服务器出错啦，请稍后再试~"
        //     btnTxt="重新加载"
        //     gotoDoing={() => {
        //         // this.loadData();
        //     }}
        // />
    }
    // _renderItem = ({item}) => (
    //     <MyListItem
    //         id={item.id}
    //         onPressItem={this._onPressItem}
    //         selected={!!this.state.selected.get(item.id)}
    //         title={item.title}
    //     />
    // );



    renderItemView=({item})=> {
        return (<TouchableOpacity onPress={()=>this.onItemClick(item)}><View style={{
            backgroundColor: baseColor.itemBg,
            alignItems: 'center',
            paddingHorizontal: width * 0.2,
            paddingBottom: 20,
            width: width * 0.5,
        }}>
            <Image
                style={{
                    height: 100,
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: width * 0.46,
                }}
                resizeMode="stretch"
                source={{uri: item.icon}}
            />
            <Text style={{width: width * 0.46, textAlign: 'center', marginTop: 5}}>{item.name}</Text>
        </View>
        </TouchableOpacity>)
    }

    onItemClick=(item)=>{
        let {onClickItem}=this.props
        if(onClickItem){
            onClickItem(item)
        }
    }
}

