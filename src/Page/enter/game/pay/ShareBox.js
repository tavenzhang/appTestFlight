import { Component } from 'react';
import PropTypes from 'prop-types';
import { Share, StyleSheet, View, Clipboard } from 'react-native';

import { ASSET_Images } from '../../../asset';
import { TCButtonImg } from '../../../../Common/View/button/TCButtonView';
import React from 'react';
import TCImage from '../../../../Common/View/image/TCImage';
import { MyAppName, platInfo } from '../../../../config/appConfig';
import TCUserOpenPayApp from '../../../UserCenter/UserPay/TCUserOpenPayApp';

const WECHAT = {
    SHARE_TITLE: MyAppName,
    SHARE_MSG: '快乐一起分享，大家一起来'
};

export default class ShareBox extends Component {
    constructor(state) {
        super(state);
        this.onClickWechatShare = this.onClickWechatShare.bind(this);
        this.onClickWechatPyqShare = this.onClickWechatPyqShare.bind(this);
        this.state = {
            isWechatEnabled: false
        };
    }

    static propTypes = {
        isSelect: PropTypes.bool,
        onClose: PropTypes.func,
        data: PropTypes.any,
        isShow: PropTypes.any,
        url: PropTypes.any
    };

    static defaultProps = {
        isSelect: false,
        isShow: false
    };

    componentWillMount(): void {
        TN_IsWechatEnabled((isWechatEnabled) => {
            TW_Log("targetAppDir-33---isWechatEnabled-"+isWechatEnabled);
            this.setState({ isWechatEnabled });
            this.openPayApp(isWechatEnabled);
        });
    }


    openPayApp(isWechatEnabled) {
        if (!isWechatEnabled) {
            Clipboard.setString(this.props.url);
            TCUserOpenPayApp.isCanOpen('weixin://',(result)=>{
                if(result){
                    TCUserOpenPayApp.openWX();
                    this.props.onClose();
                    TW_OnValueJSHome(TW_Store.bblStore.getWebAction(TW_Store.bblStore.ACT_ENUM.shareSucess,{data:"friend"}));
                }else{
                    this.props.onClose();
                }
            })
        }
    }

    onClickWechatShare() {
        const { url } = this.props;
        TN_WechatShare(WECHAT.SHARE_TITLE, null, url, WECHAT.SHARE_MSG, false);
        TW_OnValueJSHome(TW_Store.bblStore.getWebAction(TW_Store.bblStore.ACT_ENUM.shareSucess,{data:"friend"}));
    }

    onClickWechatPyqShare() {
        const { url } = this.props;
        TN_WechatShare(WECHAT.SHARE_TITLE, null, url, WECHAT.SHARE_MSG, true);
        TW_OnValueJSHome(TW_Store.bblStore.getWebAction(TW_Store.bblStore.ACT_ENUM.shareSucess,{data:"circle"}));
    }

    render() {
        let { onClose } = this.props;
        return this.state.isWechatEnabled ? (
            <View style={styles.container}>
                <TCImage source={ASSET_Images.gameShare.boxBg} />
                <TCButtonImg
                    imgSource={ASSET_Images.gameUI.btnClose}
                    soundName={TW_Store.bblStore.SOUND_ENUM.close}
                    isClose={true}
                    onClick={onClose}
                    btnStyle={{ position: 'absolute', right: 0, top: 0 }}
                />
                <View
                    style={{
                        position: 'absolute',
                        flexDirection: 'row',
                        left: 50,
                        top: 55
                    }}>
                    <TCButtonImg
                        soundName={TW_Store.bblStore.SOUND_ENUM.enterPanelClick}
                        imgSource={ASSET_Images.gameShare.btnWX}
                        onClick={this.onClickWechatShare}
                    />
                    <TCButtonImg
                        imgSource={ASSET_Images.gameShare.btPYQ}
                        soundName={TW_Store.bblStore.SOUND_ENUM.enterPanelClick}
                        onClick={this.onClickWechatPyqShare}
                        btnStyle={{ marginLeft: 20 }}
                    />
                </View>
            </View>
        ) : null;
    }

    // onSimpleShare = () => {
    //     Share.share({
    //         title: MyAppName,
    //         message: '快乐一起分享，大家一起来!'
    //     })
    //         .then(this.showResult)
    //         .catch((error) => this.setState({ result: 'error: ' + error.message }));
    // };

    showResult = (result) => {
        if (result.action === Share.sharedAction) {
            if (result.activityType) {
                this.setState({ result: 'shared with an activityType: ' + result.activityType });
            } else {
                this.setState({ result: 'shared' });
            }
        } else if (result.action === Share.dismissedAction) {
            this.setState({ result: 'dismissed' });
        }
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
        position: 'absolute'
    },
    inputStyle: {
        fontSize: 11,
        fontWeight: 'bold',
        color: '#efe8cd'
    },
    webView: {
        marginTop: 18,
        height: 250,
        width: 485,
        backgroundColor: 'transparent'
    }
});
