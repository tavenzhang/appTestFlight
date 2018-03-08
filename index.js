/**
 * Created by Sam on 2016/12/29.
 */
import React, {
    Component
} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Navigator,
    Alert,
    Image,
    Platform,
    NativeModules,
    TouchableOpacity,
    AsyncStorage,
    BackAndroid,
    AppState
} from 'react-native';

import CodePush from 'react-native-code-push'
import APP from './App'
let MText = '22222222222222222222'

export default class TC168 extends Component {

    constructor() {
        super();
        this.state = {
            updateFinished: false,
            syncMessage: "初始化配置中...",
            updateStatus: 0,
            appVersion:''
        };
    }

    componentWillMount () {
        this.hotFix()
    }

    render() {
        if (!this.state.updateFinished && this.state.updateStatus == 0) {
            return this.getLoadingView();
        } else if (!this.state.updateFinished && this.state.updateStatus == -1) {
            return this.updateFailView()
        } else {
            return (<APP />)
            return ( < Navigator initialRoute={{
                    name: 'root',
                    component: APP
                }}
                                 configureScene={() => {return Navigator.SceneConfigs.PushFromRight;}}
                                 renderScene={
                                     (route, navigator) => {
                                         let Compoment = route.component;
                                         return <Compoment {...route.passProps} navigator={navigator}/>
                                     }
                                 }
                />
            );
        }
    }

    codePushDownloadDidProgress (progress) {
        this.setState({
            progress
        })
    }

    hotFix (hotfixDeploymentKey) {
        this.setState({
            syncMessage: '检测更新中...',
            updateStatus: 0
        })

        CodePush.checkForUpdate().then((update) => {
            if (update !== null) {
                if (Platform.OS == 'ios'){
                }
                this.setState({
                    syncMessage: '获取到更新，正在疯狂加载...',
                    updateFinished:false,
                })

                update.download(this.codePushDownloadDidProgress.bind(this)).then((localPackage) => {
                    if (localPackage) {
                        this.setState({
                            syncMessage: '下载完成,开始安装',
                            progress: false,
                        })
                        localPackage.install(CodePush.InstallMode.IMMEDIATE).then(() => {
                            CodePush.notifyAppReady().then(() => {
                                // this.setUpdateFinished()
                            })
                        }).catch((ms) => {
                        })
                    } else {
                        this.updateFail('下载失败,请重试...')
                    }
                }).catch((ms) => {
                    this.updateFail('下载失败,请重试...')
                })
            }
            else {
                this.skipUpdate()
            }
        }).then(() => {
            setTimeout(() => {
                this.setState({
                    syncMessage: '正在加速更新中...',
                })
            }, 3000)
        }).then(() => { // here stop
            this.timer = setTimeout(() => {
                if (!this.state.progress&&!this.state.updateFinished) {
                    this.updateFail('下载失败,请重试...')
                }
            }, 10 * 1000)
        }).catch((ms, error) => {
            this.updateFail('更新失败,请重试...')
        })
    }

    updateFail(message){
        this.setState({
            syncMessage:message ,
            updateStatus: -1
        })
    }

    getLoadingView () {
        let progressView
        if (this.state.progress) {
            progressView = (
                <Text>
                    正在下载({parseFloat(this.state.progress.receivedBytes / 1024 / 1024).toFixed(2)}M/{parseFloat(this.state.progress.totalBytes / 1024 / 1024).toFixed(2)}M) { (parseFloat(this.state.progress.receivedBytes / this.state.progress.totalBytes).toFixed(2) * 100).toFixed(1)}%</Text>
            )
        } else {
            return(<View  style={{ flex: 1}}>
                <View style={{justifyContent:'center',alignItems:'center',flex:1}}>
                    <Text style={{fontSize: 16}}>{MText}</Text>
                    <Text style={{fontSize: 16}}>{this.state.syncMessage}</Text>
                </View>
                <Text style={{fontSize:13,color:'#666666',marginBottom:10,width:320,textAlign:'center'}}>{'版本号:'+1 + '  '+(Platform.OS == 'ios' ?'iOS':'安卓')+':' + this.state.appVersion}</Text>
            </View>)
        }
        return (
            <View style={{ flex: 1}}>
                <View style={{justifyContent:'center',alignItems:'center',flex:1}}>
                    <Text style={{fontSize: 16}}>{MText}</Text>
                    {progressView}
                </View>
                <Text style={{fontSize:13,color:'#666666',marginBottom:10,width:320,textAlign:'center'}}>{'当前版本号:'+1}</Text>
            </View>
        )
    }

    skipUpdate () {
        this.setState({
            progress: false,
            updateFinished: true,
            updateStatus: 0
        })
    }

    updateFailView () {
        return (
            <View style={{ flex: 1}}>
                <Text style={{fontSize: 16}}>{MText}</Text>
                <View title={'11'} needBackButton={false}/>
                <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
                    <Text style={{
                        fontWeight: 'bold',
                        fontSize: 16
                    }}> {this.state.syncMessage}</Text>
                    <View>
                        <TouchableOpacity
                            onPress={() => {
                            }}
                            style={{
                                backgroundColor: '#3056b2',
                                justifyContent: 'center',
                                flexDirection: 'row',
                                height: 40,
                                alignItems: 'center',
                                borderRadius: 4,
                                padding: 10,
                                width: 320 * 0.6,
                                marginTop: 20
                            }}
                        >
                            <Text style={{
                                color: 'white',
                                fontWeight: 'bold',
                                fontSize: 18
                            }}>
                                重试一下
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    launchImageStyle: {
        flex: 1,
        backgroundColor:'red'
    },

    messages: {
        textAlign: "center",
    },
    restartToggleButton: {
        color: "blue",
        fontSize: 17
    },
    syncButton: {
        color: "green",
        fontSize: 17
    },
    welcome: {
        fontSize: 20,
        textAlign: "center",
        margin: 10
    },
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: 'gray',
        paddingTop: 50
    },
});


TC168 = CodePush({
    checkFrequency: CodePush.CheckFrequency.MANUAL,
    installMode: CodePush.InstallMode.IMMEDIATE
})(TC168);

AppRegistry.registerComponent('TC168', () => TC168);