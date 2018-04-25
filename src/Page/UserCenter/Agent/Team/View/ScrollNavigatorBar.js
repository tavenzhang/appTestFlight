/**
 * Created by allen-jx on 2017/6/1.
 */
import React, {Component, PropTypes,} from 'react'

import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    Modal,
    ScrollView,
    InteractionManager,
    Dimensions,
    Image
} from 'react-native'
const WINDOW_WIDTH = Dimensions.get('window').width;
import {Size, agentCenter} from '../../../../resouce/theme'
import {agent} from '../../../../resouce/images'
/**
 * 滚动导航菜单
 */
export default class ScrollNavigatorBar extends Component {

    // 构造函数
    constructor(props) {

        super(props)
        this._tabsMeasurements = [];
        this._containerWidth = 0;
        this.containerWidth = []
        this.hiddenPos = -1
        this.state = {
            tabs: this.props.data,
        }
    }


    componentWillReceiveProps(nextProps) {
        this.setState({
            tabs: nextProps.data
        })
    }

    componentDidMount() {

    }

    render() {
        return (
            <View >
                <ScrollView style={styles.userLayer}
                            showsHorizontalScrollIndicator={false}
                            horizontal={true}
                            ref={(scrollView) => {_scrollView = scrollView; }}
                >
                    <View
                        onLayout={(e)=>this.onTabContainerLayout(e)}
                        style={{ flexDirection: 'row'}}
                    >
                        {this.getView()}
                    </View>
                </ScrollView>
            </View>
        )
    }

    getView() {
        let array = []
        for (var i = 0; i < this.state.tabs.length; i++) {
            let temp = i
            array.push(
                <TouchableOpacity onPress={()=>{this.props.selectTab(temp)}} key={this.props.data[i].userId}
                                  onLayout={(e)=>this.onLayoutTab(e,temp)}>


                    <View
                        style={{flexDirection:'row',marginTop:10,marginLeft:13,height:40,backgroundColor:agentCenter.userLayerBtnBg,
                            justifyContent:'center',paddingRight:5,alignItems:'center', borderRadius:5}}>
                        <Text style={styles.userName}>  {this.props.data[i].username}</Text>
                        {agent.userLayer1 ? ( <Image source={agent.userLayer1} style={styles.imgStyle}>
                            <Image source={agent.userLayer2} style={styles.imgStyle}>
                            </Image>
                        </Image>) : null}
                    </View>
                </TouchableOpacity>)
        }

        return array
    }

    onLayoutTab(event, postion) {
        const {x, width, height,} = event.nativeEvent.layout;
        this._tabsMeasurements[postion] = {left: x, right: x + width, width, height,};
    }

    _updateView() {

        setTimeout(()=> {
            let hiddenPos = this.state.hiddenPos
            if (this._containerWidth + 20 > WINDOW_WIDTH) {
                this.hiddenPos += 1
                try {
                    let newScrollX = this._tabsMeasurements[this.hiddenPos + 1].right
                    _scrollView.scrollTo({x: newScrollX, y: 0, animated: true,});

                } catch (e) {
                }
            } else {
                if (hiddenPos == -1) {
                    return
                } else {
                    _scrollView.scrollTo({x: 0, y: 0, animated: true,});
                    this.hiddenPos = -1
                }
            }
        }, 500)
    }

    onTabContainerLayout(e) {
        let width = e.nativeEvent.layout.width;
        this._containerWidth = width
        if (this.containerWidth.length > 0 && this.isExit(width) != -1 && this.state.hiddenPos != 1) {
            this.setState({
                hiddenPos: this.state.hiddenPos - (this.containerWidth.length - this.isExit(width) - 1)
            })
        } else {
            this.containerWidth.push(width)
        }
        this._updateView()
    }

    _clearData() {
        this._containerWidth = 0;
        this._tabsMeasurements = []
    }


    isExit(width) {
        let len = this.containerWidth.length
        for (var i = 0; i < this.containerWidth.length; i++) {
            if (this.containerWidth[i].username === width) {
                this.containerWidth = this.containerWidth.splice(i + 1, len - (i + 1))
                return i
            }
        }
        return -1
    }

    consoleLog(str) {
        console.log(str)
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }, userLayer: {
        flexDirection: 'row',
        marginBottom: 10,
    }, userName: {
        textAlign: 'center',
        color: '#666666',
        fontSize: Size.font14,
    }, imgStyle: {
        width: 25,
        height: 40
    },
})