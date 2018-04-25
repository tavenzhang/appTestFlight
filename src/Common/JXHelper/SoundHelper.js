import React from 'react-native';
const Sound = require('react-native-sound');

const playSoundBundle = () => {
    try {
        const s = new Sound('bet.wav', Sound.MAIN_BUNDLE, (e) => {
            if (e) {
                // console.log('error', e);
            } else {
                s.setSpeed(1);
                s.play(() => s.release()); // Release when it's done so we're not using up resources
            }
        });
    } catch(e) {

    }
}

export default {playSoundBundle}
