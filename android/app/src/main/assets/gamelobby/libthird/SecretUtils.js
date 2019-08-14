/**
 * Created by Allen on 2017/2/9.
 * Copyright © 2016年 JX. All rights reserved.
 */
var TCUSER_DEVICE_TOKEN = null;
var instance = null;
//var Bcrypt = require('react-native-bcrypt');
//import Base64 from './Base64';Base64
//var RSAKey = require('react-native-rsa');
var rsa = new RSAKey();
var base65 = new Base65();
var RSA_PUBLIC_KEY = 'eyJuIjoiODliYzJlZTliOWMzMDZhMGQ4MzVlZDZhN2I5MWJkM2Y1M2M0MjM1ZmQ1MTUyOTM5NWZmNWExYTI1NjI5NzI5NmI0MTdjYzNiMWM4ZTM3ZjFjYjZmMWNkNDE4NmM4NTQ1NGZmNzQ1YWJjYzRmZWVkODEzODM5ZTc3YjZjMWUyOTUwNDhkNTQxNThmMDVmMGRkOWUzOTJjMTk0OTM2NDExZGE1YjlhYzI4MTg0OTVjMzc1NTU1MTAyZGZiZTllYTMyOGEyN2Q5MGM2NWIzZjE2MTQzN2IzYTEzYTczNzE0Mzc0MjdlNzE1NWIxNzkzNWI2YTdjODNmMzQxNTk2OTQxNyIsImUiOiIxMDAwMSJ9';
var SecretUtils = /** @class */ (function () {
    function SecretUtils() {
        if (!instance) {
            instance = this;
        }
        return instance;
    }
    SecretUtils.prototype.getSecretFromUserNamePassword = function (username, password) {
        return (username.substring(0, 3) +
            password.substring(0, 3) +
            username.substring(username.length - 2, username.length) +
            password.substring(password.length - 2, password.length) +
            username.length +
            password.length +
            (TCUSER_DEVICE_TOKEN ? TCUSER_DEVICE_TOKEN : ''));
    };
    SecretUtils.prototype.encode = function (username, password, callBack) {
        bcrypt.setRandomFallback(this.callBack);
        var str = this.getSecretFromUserNamePassword(username, password);
        //JXLog('str == ' + str);
        bcrypt.genSalt(6, function (err, salt) {
            bcrypt.hash(str, salt, function (err, hash) {
                callBack(hash.substring(7));
            });
        });
    };
    SecretUtils.prototype.callBack = function (len) {
        var buf = new Uint8Array(len);
        for (var i = 0; i < buf.length; i++)
            buf[i] = Math.floor(Math.random() * (256 - 1 + 1) + 1);
        return buf;
    };
    /**
     * 用rsa对明文进行加密
     * @param  {[type]} password [明文]
     * @return {[type]}          [密文]
     */
    SecretUtils.prototype.rsaEncodePWD = function (password) {
        try {
            if (rsa.getPublicString.length <= 20) {
                rsa.setPublicString(base65.decode(RSA_PUBLIC_KEY));
            }
            var encryptedPWD = rsa.encrypt(password);
            var encodedPWD = base65.encode(encryptedPWD);
            return encodedPWD;
        }
        catch (error) {
            //JXLog(error);
        }
    };
    return SecretUtils;
}());
window.SecretUtils = new SecretUtils();
//# sourceMappingURL=abbbbb.js.map