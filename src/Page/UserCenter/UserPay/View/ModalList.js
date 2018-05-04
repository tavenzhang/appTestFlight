/**
 * Created by allen-jx on 2018/4/25.
 */
import React, {Component, PropTypes,} from 'react'

import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    Modal,
    ListView
} from 'react-native'

import {Size, width, height, indexBgColor, indexTxtColor, baseColor} from '../../../../Page/resouce/theme'


/**
 *弹出列表框
 */
export default class ModalList extends Component {

    static propTypes = {}

    static defaultProps = {}

    constructor(props) {
        super(props)
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: this.props.dataList.slice(0),
            show: this.props.show
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            dataSource: nextProps.dataList.slice(),
            show: nextProps.show
        })
    }

    render() {
        return (
            <Modal
                animationType='fade'
                transparent={true}
                visible={this.state.show}
                onRequestClose={() => {
                }}
            >
                <View style={styles.modalStyle}>
                    <View style={styles.modalMain}>
                        <View style={{justifyContent: "center", width: width * 0.8}}><Text
                            style={{
                                color: 'black',
                                fontSize: Size.large,
                                textAlign: 'center',
                                padding: 5
                            }}>请选择支付银行</Text></View>
                        <ListView
                            dataSource={this.ds.cloneWithRows(this.state.dataSource.slice(0))}
                            enableEmptySections={true}
                            renderRow={this.props.renderRow}
                            pageSize={10}/>
                        <TouchableOpacity
                            onPress={() => {
                                this.props.closeModal()
                            }}
                        >
                            <Text style={styles.cancelTxt}>取消</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }, modalStyle: {
        backgroundColor: 'rgba(52,52,52,0.5)',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }, modalMain: {
        backgroundColor: 'white',
        height: height * 0.7,
        width: width * 0.8,
        borderRadius: 5,
        alignItems: 'center'
    }, cancelTxt: {
        padding: 5,
        fontSize: Size.large,
        width: width * 0.8,
        textAlign: 'center'
    }
})