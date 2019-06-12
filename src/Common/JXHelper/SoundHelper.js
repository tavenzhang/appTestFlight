import React from 'react';
import {NativeModules, Platform} from 'react-native';
import RNFS from "react-native-fs";
const Sound = require('react-native-sound');
//var SoundFile = require('../../Page/asset/bgm.mp3')

export class SoundHelper {

    static  playSoundBundle = () => {

        if (Platform.OS === 'android') {
            NativeModules.RNAudio.playBet()
        } else {
            try {
                const s = new Sound(SoundFile, (e) => {
                    if (e) {
                        // console.log('error', e);
                    } else {
                        s.setSpeed(1);
                        s.play(() => s.release()); // Release when it's done so we're not using up resources
                    }
                });
            } catch (e) {

            }　
        }
    }


    static async playBgMusic () {
        let file = Sound.MAIN_BUNDLE + "/gamelobby/assets/raw/bgm_lobby.mp3";
       let isExist=  await RNFS.exists(file);
        TW_Log("playBgMusic-file--isExist---"+isExist,file)
        try {
            const s = new Sound(file, (e) => {
                if (e) {
                    TW_Log ('playBgMusic--SoundFile----', e);
                } else {
                    TW_Log ('playBgMusic--play----', s);
                    s.setSpeed(1);
                    s.play(() => s.release()); // Release when it's done so we're not using up resources
                }
            });
         //   s.play();
        } catch (e) {
         TW_Log("playBgMusic----",e)
        }
    }

}


