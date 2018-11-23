import React from 'react';
import {NativeModules, Platform} from 'react-native';

const Sound = require('react-native-sound');
var SoundFile = require('../../Page/asset/bet.wav')
const playSoundBundle = () => {
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

export default {playSoundBundle}
