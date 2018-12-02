import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Platform
} from 'react-native';


import HappyPoker_DPS from '../data/TCHappyPoker_DPS'
import TCHappyPokerSelectView from './TCHappyPokerSelectView'
import RNShakeEvent from 'react-native-shake-event';

let SingletonDPS = null;
const bxStrArray = ['对子', '豹子', '同花', '顺子', '同花顺']
import {xypk} from '../../../../asset/images'
import {betHome,width,Size} from '../../../../resouce/theme'

export default class TCHappyPoker_MainView extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            type:this.props.defaultPlayType,
        };
        SingletonDPS=MathControllerFactory.getInstance().getMathController(this.props.gameUniqueId);

    }

    static defaultProps={
        //一开始默认的玩法
        defaultPlayType:"包选",
    };

    componentDidMount() {
        if(!__DEV__&&Platform.OS == 'ios'){
            RNShakeEvent.addEventListener('shake', () => {
                this.byShake()
            });
        }
    }

    componentWillUnmount() {
        if(!__DEV__&&Platform.OS == 'ios'){
            RNShakeEvent.removeEventListener('shake')
        }
    }

    render() {
        let textRuleRemind = '';
        switch (this.state.type) {
            case '包选':
                textRuleRemind = '即将开出3张扑克，你猜会开';
                break
            case '同花单选':
                textRuleRemind = '开出的3张牌都是所选花色即中奖';
                break
            case '顺子单选':
                textRuleRemind = '所选的顺子开出（不分花色）即中奖';
                break
            case '同花顺单选':
                textRuleRemind = '开出同花顺且为所选花色即中奖';
                break
            case '豹子单选':
                textRuleRemind = '所选的豹子开出（不分花色）即中奖';
                break
            case '对子单选':
                textRuleRemind = '所选的对子开出（不分花色）即中奖';
                break
            case '任选一':
                textRuleRemind = '至少选1个号，猜对任意1个开奖号（不分花色）即中奖';
                break
            case '任选二':
                textRuleRemind = '至少选2个号，猜对任意2个开奖号（不分花色）即中奖';
                break
            case '任选三':
                textRuleRemind = '至少选3个号，选号包含开奖号（不分花色）即中奖';
                break
            case '任选四':
                textRuleRemind = '至少选4个号，选号包含开奖号（不分花色）即中奖';
                break
            case '任选五':
                textRuleRemind = '至少选5个号，选号包含开奖号（不分花色）即中奖';
                break
            case '任选六':
                textRuleRemind = '至少选6个号，选号包含开奖号（不分花色）即中奖';
        }

        return (
            <View style={styles.container}>
                <View style={styles.topTextContainer}>
                    <Text style={styles.topText}>{textRuleRemind}</Text>
                </View>
                <View style={styles.contentContainer}>
                    {this.getContentView()}
                </View>
            </View>
        );
    };

    getContentView() {
        let itemArray = [];
        switch (this.state.type) {
            case '包选':
                itemArray.push(this.getBaoXuanItemArray());
                break
            case '同花单选':
                itemArray.push(this.getTongHuaItemArray());
                break
            case '顺子单选':
                itemArray.push(this.getShunZiItemArray());
                break
            case '同花顺单选':
                itemArray.push(this.getTongHuaShunItemArray());
                break
            case '豹子单选':
                itemArray.push(this.getBaoZiItemArray());
                break
            case '对子单选':
                itemArray.push(this.getDuiZiItemArray());
                break
            case '任选一':
            case '任选二':
            case '任选三':
            case '任选四':
            case '任选五':
            case '任选六':
                itemArray.push(this.getDanXuanItemArray());
        }

        return itemArray;
    }

    getDanXuanItemArray() {
        let itemArray = [];
        let icon = null;
        for (let index = 0; index < 13; index++) {
            let iconIndex = 'icon' + index
            icon = xypk.dxIcon[iconIndex]
            this.setItemArray(itemArray, index, icon);
        }
        return itemArray;
    }

    getDuiZiItemArray() {
        let itemArray = [];
        let icon = null;
        for (let index = 0; index < 13; index++) {
            let iconIndex = 'icon' + index
            icon = xypk.dzdxIcon[iconIndex]
            this.setItemArray(itemArray, index, icon);
        }

        return itemArray;
    }

    getBaoZiItemArray() {
        let itemArray = [];
        let icon = null;
        for (let index = 0; index < 13; index++) {
            let iconIndex = 'icon' + index
            icon = xypk.bzdxIcon[iconIndex]
            this.setItemArray(itemArray, index, icon);
        }
        return itemArray;
    }

    getTongHuaShunItemArray() {
        let itemArray = [];
        let icon = null;
        for (let index = 0; index < 4; index++) {
            let iconIndex = 'icon' + index
            icon = xypk.thsdxIcon[iconIndex]
            this.setItemArray(itemArray, index, icon);
        }

        return itemArray;
    }

    getShunZiItemArray() {
        let itemArray = [];
        let icon = null;
        for (let index = 0; index < 12; index++) {
            let iconIndex = 'icon' + index
            icon = xypk.szdxIcon[iconIndex]
            this.setItemArray(itemArray, index, icon);
        }
        return itemArray;
    }

    getTongHuaItemArray() {
        let itemArray = [];
        let icon = null;
        for (let index = 0; index < 4; index++) {
            let iconIndex = 'icon' + index
            icon = xypk.thdxIcon[iconIndex]
            this.setItemArray(itemArray, index, icon);
        }

        return itemArray;
    }

    getBaoXuanItemArray() {
        let itemArray = [];
        let itemName = '';
        let icon = null;
        for (let index = 0; index < 5; index++) {
            let iconIndex = 'icon' + index
            itemName = bxStrArray[index]
            icon = xypk.bxIcon[iconIndex]
            this.setItemArray(itemArray, index, icon, itemName);
        }
        return itemArray;
    }

    setItemArray(itemArray, index, icon, itemName) {
        itemArray.push(
            <TCHappyPokerSelectView
                key={index+700}
                titleName={this.state.type}
                itemName={itemName}
                numberEvent={this.props.numberEvent}
                icon={icon}
                number={SingletonDPS.getPlayTypeArray()[index]}
            />
        );
        return itemArray;
    }

    setPlayMathWith(mathName) {
        this.props.type = mathName;
        this.setState({type: mathName})
    }

    byShake() {
        if (this.props.shakeEvent == null) return
        this.props.shakeEvent()
    };
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: betHome.betMidBg,
    },
    topTextContainer: {
        alignItems: 'center',
        marginVertical: 10,
        marginHorizontal: 10,
    },
    topText: {
        fontSize: Size.font14,
        color: betHome.betTitle,
    },
    contentContainer: {
        flexWrap: 'wrap',
        alignItems: 'center',
        flexDirection: 'row',
        width:width,
        backgroundColor: 'transparent',
    },
    tonghuaContainer: {
        justifyContent: 'space-around'
    },
});
