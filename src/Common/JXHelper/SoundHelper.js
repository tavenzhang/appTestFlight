import React from 'react';
import {NativeModules, Platform} from 'react-native';
import RNFS from "react-native-fs";

const Sound = require('react-native-sound');
//ar SoundFile = require('../../../android/app/src/main/assets/gamelobby/assets/raw/bgm_lobby.mp3')
Sound.setActive(true)
Sound.enableInSilenceMode(true)
Sound.setCategory('Playback', true)

export class SoundHelper {
    static  soundleMusic= null

    static  playSoundBundle = () => {

        if (Platform.OS === 'android') {
            //  NativeModules.RNAudio.playBet()
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


    static async startBgMusic() {
        if(TW_Store.dataStore.isAppInited){
            let file = G_IS_IOS ? `${TW_Store.dataStore.getHomeWebHome()}/assets/raw/bgm_lobby.mp3` : "bgm_lobby.mp3";
            //let isExist = await RNFS.exists(file);
            //TW_Log("playBgMusic-file--isExist---" + isExist, file);
            try {
                if (!SoundHelper.soundleMusic) {
                    let s = SoundHelper.soundleMusic = new Sound(file, '', (e) => {
                        if (e) {
                            TW_Log('playBgMusic--SoundFile----', e);
                        } else {
                            TW_Log('playBgMusic--play----', s);
                            TW_Store.dataStore.isAppSound = true;
                            s.setSpeed(1);
                            s.setNumberOfLoops(999);
                            TW_Data_Store.getItem(TW_DATA_KEY.AFF_CODE,(err,ret)=>{
                                TW_Log("playBgMusic-TW_DATA_KEY--err"+err+"---ret=="+ret,ret);
                                if(ret==null){
                                    s.play();
                                }else{
                                    if(ret=="1"){
                                        s.play();
                                    }else{
                                        s.stop();
                                    }
                                }});
                        }
                    });
                }
            } catch (e) {
                TW_Log("playBgMusic----", e)
            }
        }

    }

    static  pauseMusic() {
        TW_Log("playBgMusic---pauseMusic-")
        if(SoundHelper.soundleMusic){
            SoundHelper.soundleMusic.pause();
        }
    }

    static  playMusic() {
        SoundHelper.onPalyMusic()
    }

    static  onPalyMusic() {
        TW_Log("playBgMusic---onPalyMusic-")
        if(SoundHelper.soundleMusic){
            TW_Data_Store.getItem(TW_DATA_KEY.AFF_CODE,(err,ret)=>{
                if(ret==null){
                    SoundHelper.soundleMusic.play()
                }else{
                    if(ret=="1"){
                        SoundHelper.soundleMusic.play()
                    }else{
                        SoundHelper.soundleMusic.pause();
                    }
                }
            });
        }
    }


}


