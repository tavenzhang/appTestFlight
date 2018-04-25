/**
 * Created by allen-jx on 2017/5/31.
 */
import React, {Component, PropTypes,} from 'react'

import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    Modal,
    Image,
    ScrollView
} from 'react-native'
import {Size, indexBgColor, listViewTxtColor, width, height} from '../../../resouce/theme'
import TopNavigationBar from '../../../../Common/View/TCNavigationBar'
import {agent} from '../../../resouce/images'
/**
 * 代理说明
 */
export default class TCAgentIntroduce extends Component {

    // 构造函数
    constructor(props) {

        super(props)

        this.state = {}
    }

    render() {
        return (
            <View style={styles.container}>
                <TopNavigationBar
                    ref='TopNavigationBar'
                    title={'代理说明'}
                    needBackButton={true}
                    backButtonCall={()=> {
                        this.props.navigator.pop()
                    }}
                />
                <ScrollView>
                    <View>
                        <Image source={agent.banner} style={styles.imgStyle}/>
                    </View>
                    <View style={styles.rowSpace}>
                        <Text style={styles.titleStyle}>
                            如何赚取返点
                        </Text>
                        <Text style={styles.contentStyle}>
                            如果你是资深代理，可以跳过这个页面不看，如果你是初级代理，或者不是代理，想了解代理的正常工作，请耐心看完。
                        </Text>
                        <Text style={styles.titleStyle}>
                            如何成为代理？
                        </Text>
                        <Text style={styles.contentStyle}>
                            如果您想要成为代理，您可以联系我们在线客服。
                        </Text>
                        <Text style={styles.titleStyle}>
                            如何赚取返点？
                        </Text>
                        <Text style={styles.contentStyle}>
                            赚取返点 = （自身返点 - 下级返点）÷ 2000，如自身返点1950，下级返点1940，你将能获得下级投注金额0.5%的返点，如下级投注1000元，你将会获5元。点击下级开户，可查看自身返点，也可为下级设置返点。
                        </Text>
                        <Text style={styles.titleStyle}>
                            如何为下级开户？
                        </Text>
                        <Text style={styles.contentStyle}>
                            点击下级开户，先为您的下级设置返点，设置成功后会生成一条邀请码，将邀请码发送给您的下级注册，注册后他就是您的下级，点击会员管理，就能查看他注册的账号；
如果您为下级设置的是代理类型的账号，那么您的下级就能继续发展下级，如果设置的是玩家类型，那么您的下级只能投注，不能再发展下级，也看不到代理中心；
                        </Text>

                        <Text style={styles.titleStyle}>
                            温馨提示
                        </Text>
                        <Text style={styles.contentStyle}>
                            返点不同赔率也不同，点击返点赔率表，可查看返点赔率；
返点越低，赔率就越低，建议为下级设置的返点不要过低；
可在代理报表、投注明细、交易明细查看代理的发展情况；
建议开设的下级也是代理类型，无论发展了几级，您都能获得返点。
                        </Text>
                    </View>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: indexBgColor.mainBg
    }, contentStyle: {
        margin: 15,
        fontSize: Size.xsmall,
        lineHeight:20,
        color: listViewTxtColor.content,
    }, titleStyle: {
        marginLeft: 15,
        fontSize: Size.large,
        color: listViewTxtColor.title,
        fontWeight:'800',
    }, imgStyle: {
        width: width,
        height: height * 0.3
    },
    rowSpace:{
        paddingTop:15,
        paddingBottom:15
    }
})