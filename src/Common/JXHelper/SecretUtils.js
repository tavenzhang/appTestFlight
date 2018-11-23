/**
 * Created by Allen on 2017/2/9.
 * Copyright © 2016年 JX. All rights reserved.
 */


import {Platform} from 'react-native'

let instance = null
var Bcrypt = require('react-native-bcrypt')
import Base64 from './Base64'

var RSAKey = require('react-native-rsa')
var rsa = new RSAKey()
var base64 = new Base64()
let RSA_PUBLIC_KEY = 'eyJuIjoiODliYzJlZTliOWMzMDZhMGQ4MzVlZDZhN2I5MWJkM2Y1M2M0MjM1ZmQ1MTUyOTM5NWZmNWExYTI1NjI5NzI5NmI0MTdjYzNiMWM4ZTM3ZjFjYjZmMWNkNDE4NmM4NTQ1NGZmNzQ1YWJjYzRmZWVkODEzODM5ZTc3YjZjMWUyOTUwNDhkNTQxNThmMDVmMGRkOWUzOTJjMTk0OTM2NDExZGE1YjlhYzI4MTg0OTVjMzc1NTU1MTAyZGZiZTllYTMyOGEyN2Q5MGM2NWIzZjE2MTQzN2IzYTEzYTczNzE0Mzc0MjdlNzE1NWIxNzkzNWI2YTdjODNmMzQxNTk2OTQxNyIsImUiOiIxMDAwMSJ9';
export default class SecretUtils {
    constructor() {
        if (!instance) {
            instance = this
        }
        return instance;
    }

    getSecretFromUserNamePassword(username, password, deviceToken) {
        return username.substring(0, 3) + password.substring(0, 3) +
            username.substring(username.length - 2, username.length) +
            password.substring(password.length - 2, password.length) +
            username.length + password.length + (deviceToken ? deviceToken : '')
    }

    encode(username, password, callBack, deviceToken) {
        Bcrypt.setRandomFallback(this.callBack)
        var str = this.getSecretFromUserNamePassword(username, password, deviceToken)
        JXLog('str == ' + str)

        Bcrypt.genSalt(6, function (err, salt) {
            Bcrypt.hash(str, salt, (err, hash) => {
                callBack(hash.substring(7))
            })
        })
    }

    callBack(len) {
        var buf = new Uint8Array(len)
        for (var i = 0; i < buf.length; i++)
            buf[i] = Math.floor(Math.random() * (256 - 1 + 1) + 1)
        return buf
    }

    /**
     * 用rsa对明文进行加密
     * @param  {[type]} password [明文]
     * @return {[type]}          [密文]
     */
    rsaEncodePWD(password) {
        try {
            if (rsa.getPublicString.length <= 20) {
                rsa.setPublicString(base64.decode(RSA_PUBLIC_KEY));
            }
            var encryptedPWD = rsa.encrypt(password);
            var encodedPWD = base64.encode(encryptedPWD);
            return encodedPWD;
        } catch (error) {
            JXLog(error);
        }
    }
}
