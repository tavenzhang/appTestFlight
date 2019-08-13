import React, { Component } from 'react'
import {
    Text,
    View,
    StyleSheet,
    Image
} from 'react-native'
import moment from "moment";
import DeviceInfo from 'react-native-device-info';
//import NetInfo from "@react-native-community/netinfo";
import { observer } from 'mobx-react';
import { NativeEventEmitter, NativeModules } from 'react-native'

import { phoneState } from '../asset/images';
let deviceInfoEmitter={}
if(NativeModules.RNDeviceInfo){
     deviceInfoEmitter = new NativeEventEmitter(NativeModules.RNDeviceInfo);
}

@observer
export default class PhoneStateView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            battStat: 0,
            isCharging: false,
            time: moment(new Date()).format("HH:mm"),
            isWifi: false,
            isConnected: false,
            isInternetReachable: false,
            carrierName: DeviceInfo.getCarrier(),
            ip: null
        }
    }

    async componentDidMount() {
        /*
        NetInfo.fetch().then(state => {
            console.log("Connection type", state.type);
            console.log("Is connected?", state.isConnected);
        });
        */

        //console.log('DeviceInfo', DeviceInfo.getCarrier());

        this.checkIsWifi();
        this.pingGoogle();
        this.monitorBatteryLevel();
          
        this.intervalID = setInterval(
            () => {
                this.setState({ time: moment(new Date()).format("HH:mm") });
                this.pingGoogle();
                this.checkIsWifi();

                if (!G_IS_IOS) {
                    this.monitorBatteryLevel();
                }
            },
            30000
        );

        deviceInfoEmitter.addListener('powerStateDidChange', batteryState => {
            //console.log('powerStateDidChange', batteryState);
            this.setState({ isCharging: batteryState.batteryState === "charging" ? true : false });
        });

        deviceInfoEmitter.addListener('batteryLevelDidChange', level => {
            //console.log('batteryLevelDidChange', level);
            this.setState({ battStat: level.toFixed(2) });
        });

        /*
        NetInfo.addEventListener(state => {
            //console.log("Connection type", state.type);
            //console.log("Is connected?", state.isConnected);
            //console.log("cellularGeneration", state);

            this.setState({
                isWifi: state.type === "wifi" ? true : false,
                isConnected: state.isConnected,
                isInternetReachable: state.isInternetReachable,
                cellularGeneration: state.type === "cellular" ? state.details.cellularGeneration : null
            });
        });
        */
    }

    componentWillUnmount() {
        clearInterval(this.intervalID);

        deviceInfoEmitter.removeAllListeners();

        //NetInfo.removeAllListeners();
    }

    monitorBatteryLevel() {
        DeviceInfo.getBatteryLevel().then(batteryLevel => {
            //console.log('getBatteryLevel', batteryLevel);
            this.setState({ battStat: batteryLevel.toFixed(2) });
        });

        DeviceInfo.isBatteryCharging().then(isCharging => {
            //console.log('isBatteryCharging', isCharging);
            this.setState({ isCharging });
        });
    }

    phoneBatteryIndicator() {
        const { battStat, isCharging } = this.state;
        let img = null;

        if (isCharging) {
            img = phoneState.battCharging;
        } else {
            if (battStat <= 0) {
                img = phoneState.battEmpty;
            } else if (battStat > 0 && battStat <= 0.5) {
                img = phoneState.batt30;
            } else if (battStat > 0.5 && battStat <= 0.7) {
                img = phoneState.batt50;
            } else if (battStat > 0.7 && battStat <= 0.9) {
                img = phoneState.batt80;
            } else if (battStat > 0.9 ) {
                img = phoneState.battFull;
            }
        }

        return img;
    }

    async checkIsWifi() {
        //console.log('checkIsWifi');

        const ip = await DeviceInfo.getIPAddress();
        const isWifi = (ip.substring(0, 3) === "192") ? true : false;
        this.setState({ ip, isWifi });

        /*
        await DeviceInfo.getIPAddress().then(ip => {
            // "92.168.32.44"
            console.log('DeviceInfo: getIPAddress: ', ip);
            //console.log('DeviceInfo: substring: ', ip.substring(0, 3));
            const isWifi = (ip.substring(0, 3) === "192") ? true : false;
            //console.log('DeviceInfo: isWifi: ', isWifi);

            this.setState({ ip, isWifi });
        });
        */
    }

    pingGoogle() {
        fetch('https://www.google.com')
        .then((response) => {
            //console.log('response ', response)
            if (response.status === 200) {
                this.setState({
                    isInternetReachable: true
                });
            } else {
                this.setState({
                    isInternetReachable: false
                });
            }
        })
        .catch((error) => {
            this.setState({
                isInternetReachable: false
            });
        })
    }

    /*
    wifiIndicator(delayTime) {
        const { isWifi, isConnected, isInternetReachable } = this.state;
        let img = null;

        if (isConnected && isWifi) {
            img = phoneState.wfFull;

            if (!isInternetReachable) {
                img = phoneState.wfNoConn;
            } else {
                const delay = delayTime.substring(0, delayTime.indexOf("m"));
                //console.log('delay', delay);

                if (delay <= 60) {
                    img = phoneState.wfFull;
                } else if (delay > 60 && delay <= 90) {
                    img = phoneState.wf3bars;
                } else if (delay > 90 && delay <= 120) {
                    img = phoneState.wf2bars;
                } else if (delay > 120) {
                    img = phoneState.wf1bar;
                }
            }
        }

        return img;
    }
    */

    cellularIndicator(delayTime) {
        const { isWifi, isInternetReachable } = this.state;
        let img = null;

        if (isWifi) {
            //img = phoneState.wfFull;

            if (!isInternetReachable) {
                img = phoneState.wfNoConn;
            } else {
                const delay = delayTime.substring(0, delayTime.indexOf("m"));
                //console.log('delay', delay);

                if (delay <= 60) {
                    img = phoneState.wfFull;
                } else if (delay > 60 && delay <= 90) {
                    img = phoneState.wf3bars;
                } else if (delay > 90 && delay <= 120) {
                    img = phoneState.wf2bars;
                } else if (delay > 120) {
                    img = phoneState.wf1bar;
                }
            }
        } else {
            /*
            img = {
                null: phoneState.mb4bars,
                "2g": phoneState.mb4bars,
                "3g": phoneState.mb3G,
                "4g": phoneState.mb4G
            }[cellularGeneration] || phoneState.mb4bars;
            */
    
            if (!isInternetReachable) {
                img = phoneState.mbNoConn;
            } else {
                const delay = delayTime.substring(0, delayTime.indexOf("m"));
                //console.log('delay', delay);
    
                if (delay <= 60) {
                    img = phoneState.mb4bars;
                } else if (delay > 60 && delay <= 90) {
                    img = phoneState.mb3bars;
                } else if (delay > 90 && delay <= 120) {
                    img = phoneState.mb2bars;
                } else if (delay > 120) {
                    img = phoneState.mb1bar;
                }
            }
        }

        return img;
    }

    render() {
        /*
        const msgData = {
            action: "appStatus",
            delay: "90ms",
            position: { top: 10, right: 50 },
            isShow: "1"
        };
        */

        const { delay, position, isShow } = TW_Store.bblStore.netInfo;
        const { battStat, time, carrierName, ip } = this.state;

        return (
                <View style={{ position: "absolute", bottom: position.top, right: position.right }}>
                    {
                        (isShow === "1") ? 
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            {/*<Image source={this.wifiIndicator(msgData.delay)} resizeMode='contain' style={[styles.iconSmall, { marginRight: 5 }]} />*/}
                            <Image source={this.cellularIndicator(delay)} resizeMode='contain' style={[styles.iconSmall, { marginRight: 5 }]} />
                            <Text style={styles.text}>{delay}</Text>
                            <Image source={this.phoneBatteryIndicator()} resizeMode='contain' style={[styles.icon, { marginLeft: 5 }]} />
                            {/*<Text style={[styles.text, { marginLeft: 5 }]}>{ip}</Text>
                            <Text style={[styles.text, { marginLeft: 5 }]}>{isShow}</Text>*/}

                            <Text style={[styles.text, { marginLeft: 15 }]}>{time}</Text>
                        </View> : null
                    }
                </View>
        )
    }
}


const styles = StyleSheet.create({
    text: {
        fontSize: 12, 
        color: "#d8dee5"
    },
    icon: {
        width: 20,
        height: 20
    },
    iconSmall: {
        width: 15,
        height: 15
    }
});