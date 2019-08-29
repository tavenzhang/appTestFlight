import Storage from 'react-native-storage';
import {AsyncStorage} from 'react-native';

var storage = new Storage({
    // 最大容量，默认值1000条数据循环存储
    size: 1000,
    // 存储引擎：对于RN使用AsyncStorage，对于web使用window.localStorage
    // 如果不指定则数据只会保存在内存中，重启后即丢失
    storageBackend: AsyncStorage,
    // 数据过期时间，默认一整天（1000 * 3600 * 24 毫秒），设为null则永不过期
    defaultExpires: null,
    // 读写时在内存中缓存数据。默认启用。
    enableCache: true,
    // 如果storage中没有相应数据，或数据已过期，
    // 则会调用相应的sync方法，无缝返回最新数据。
    // sync方法的具体说明会在后文提到
    // 你可以在构造函数这里就写好sync的方法
    // 或是写到另一个文件里，这里require引入
    // 或是在任何时候，直接对storage.sync进行赋值修改
    // sync: require('./sync')
});


storage.load({
    key: 'TCDefaultDomain'
}).then(res => {
    TCDefaultDomain = res
}).catch(err => {
    JXLog(err)
});

// storage.load({
//     key: 'user',
// }).then(res => {
//     TCUSER_DATA = res;
// }).catch(err => {
//     JXLog(err)
// });
//
storage.load({
    key: 'balance'
}).then(res => {
    TCUSER_BALANCE = res
}).catch(err => {
    JXLog(err)
});


storage.load({
    key: 'TCGameSetting'
}).then(res => {
    if (res)
    TCGameSetting = res
}).catch(err => {
    JXLog(err)
});


storage.load({
    key: 'TCHomeList'
}).then(res => {
    TCHomeContents = res
}).catch(err => {
    JXLog(err)
});

// 对于react native
global.storage = storage;

global.T_Stroge={
    load:function(keyStr,callBack=null,errBack=null){
        storage.load({
            key: keyStr
        }).then(res => {
            JXLog("store load res======",res)
            if(callBack){
                callBack(res)
            }
        }).catch(err => {
            JXLog("store load error======",err)
            if(errBack){
                errBack(err)
            }
        });
    }
}

module.exports = storage
