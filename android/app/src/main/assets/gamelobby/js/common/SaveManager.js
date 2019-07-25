var SaveManager = /** @class */ (function () {
    /** 构造函数初始化管理器数据 */
    function SaveManager() {
        var _a;
        /** 公用键值索引 */
        this.commonKeyMap = (_a = {},
            _a[SaveManager.KEY_MUSIC_VL] = true,
            _a[SaveManager.KEY_MUSIC_SWITCH] = true,
            _a[SaveManager.KEY_SFX_VL] = true,
            _a[SaveManager.KEY_SFX_SWITCH] = true,
            _a[SaveManager.KEY_AVATOR_ID] = true,
            _a[SaveManager.KEY_TOKEN] = true,
            _a[SaveManager.KEY_API_URL] = true,
            _a);
        /** 大厅本地缓存对象 */
        this.lobbyJosnObj = null;
        /** 通用本地缓存对象 */
        this.commonJosnObj = null;
        //兼容
        this.compatibleSaveObj();
        this.refreshSaveObj();
    }
    /***************************************** 管理器属性与实例 *********************************************/
    /** 获取管理器实例 */
    SaveManager.getObj = function () {
        if (!SaveManager.obj) {
            SaveManager.obj = new SaveManager();
        }
        return SaveManager.obj;
    };
    /** 清空所有本地缓存 慎用 */
    SaveManager.prototype.clearAll = function () {
        Laya.LocalStorage.clear();
        this.refreshSaveObj();
        Debug.log("SaveManager.clearAll-----------");
    };
    /** 兼容存储地址 */
    SaveManager.prototype.compatibleSaveObj = function () {
        var lobbyJosnObj = Laya.LocalStorage.getJSON(SaveManager.SAVE_KEY_LOBBY) || {};
        if (lobbyJosnObj.isCompatible)
            return;
        var commonJosnObj = Laya.LocalStorage.getJSON(SaveManager.SAVE_KEY_NN) || {};
        //兼容大厅本地缓存记录转移
        for (var key in commonJosnObj) {
            var cmValue = commonJosnObj[key];
            //如果大厅本地缓存没有改值,而通用本地缓存里有将其
            if (!this.commonKeyMap[key] && cmValue != null && cmValue != undefined) {
                lobbyJosnObj[key] = cmValue;
                delete commonJosnObj[key];
            }
        }
        //设置已兼容标志
        lobbyJosnObj.isCompatible = true;
        //保存兼容后的大厅数据与通用数据
        Laya.LocalStorage.setJSON(SaveManager.SAVE_KEY_LOBBY, lobbyJosnObj);
        Laya.LocalStorage.setJSON(SaveManager.SAVE_KEY_NN, commonJosnObj);
    };
    /** 重新读取本地本地缓存中的文件 */
    SaveManager.prototype.refreshSaveObj = function () {
        this.commonJosnObj = this.getObjTotal(SaveManager.SAVE_KEY_NN, {});
        this.lobbyJosnObj = this.getObjTotal(SaveManager.SAVE_KEY_LOBBY, {});
    };
    /**
     * 保存对象Json到本地缓存
     * @param key 键值
     * @param obj 对象
     */
    SaveManager.prototype.saveObjTotal = function (key, obj) {
        Laya.LocalStorage.setJSON(key, obj);
    };
    /**
     * 从本地缓存获取对象Json
     * @param key 键值
     * @param def 对象默认值
     */
    SaveManager.prototype.getObjTotal = function (key, def) {
        var a = Laya.LocalStorage.getJSON(key);
        if (a) {
            return a;
        }
        return def;
    };
    /**
     * 只设置数据,但是暂时不保存到本地缓存
     * @param key 键值
     * @param v 数据
     */
    SaveManager.prototype.set = function (key, v) {
        if (this.commonKeyMap[key]) {
            this.commonJosnObj[key] = v;
        }
        else {
            this.lobbyJosnObj[key] = v;
        }
    };
    /**
     * 保存数据到本地缓存
     * @param key 键值
     * @param v 数据
     */
    SaveManager.prototype.save = function (key, v) {
        if (this.commonKeyMap[key]) {
            this.commonJosnObj[key] = v;
            this.saveObjTotal(SaveManager.SAVE_KEY_NN, this.commonJosnObj);
        }
        else {
            this.lobbyJosnObj[key] = v;
            this.saveObjTotal(SaveManager.SAVE_KEY_LOBBY, this.lobbyJosnObj);
        }
    };
    /**
     * 获取本地缓存的数据
     * @param key 数据key值
     * @param def 默认值
     */
    SaveManager.prototype.get = function (key, def) {
        if (this.commonKeyMap[key]) {
            if (this.commonJosnObj[key] != null && this.commonJosnObj[key] != undefined) {
                return this.commonJosnObj[key];
            }
        }
        else {
            if (this.lobbyJosnObj[key] != null && this.lobbyJosnObj[key] != undefined) {
                return this.lobbyJosnObj[key];
            }
        }
        this.save(key, def);
        return def;
    };
    /**
     * 设置公用数据
     * @param token
     * @param rooturl
     */
    SaveManager.prototype.initCommon = function (token, rooturl) {
        var token = this.get(SaveManager.KEY_TOKEN, token);
        var httpUrl = this.get(SaveManager.KEY_API_URL, rooturl);
    };
    SaveManager.prototype.saveData = function () {
        this.saveObjTotal(SaveManager.SAVE_KEY_NN, this.commonJosnObj);
        this.saveObjTotal(SaveManager.SAVE_KEY_LOBBY, this.lobbyJosnObj);
    };
    /***************************************** 公用本地缓存(游戏与大厅通用)键值命名 PS:存在被游戏使用者不小心清空的不安全性) *********************************************/
    /** 公用Json键值命名 */
    SaveManager.SAVE_KEY_NN = "MT-Card";
    /** 音乐音量值 0...1 */
    SaveManager.KEY_MUSIC_VL = "music";
    /** 音乐开关 0、1 */
    SaveManager.KEY_MUSIC_SWITCH = "music_switch";
    /** 音效音量值 0...1 */
    SaveManager.KEY_SFX_VL = "sound";
    /** 音效开关 0、1 */
    SaveManager.KEY_SFX_SWITCH = "sound_switch";
    /** 头像ID "01"..."08"头像 */
    SaveManager.KEY_AVATOR_ID = "avator_id";
    /** 玩家token */
    SaveManager.KEY_TOKEN = "token";
    /** "xxxxxx" */
    SaveManager.KEY_API_URL = "httpUrl";
    /***************************************** 大厅本地缓存键值命名（单独只用于大厅） *********************************************/
    /** 大厅Json键值命名 */
    SaveManager.SAVE_KEY_LOBBY = "MT-Card-Lobby";
    /**快捷登录用户名 */
    SaveManager.KEY_QK_USERNAME = "qk_username";
    /**快捷登录密码 */
    SaveManager.KEY_QK_PASSWORD = "qk_password";
    SaveManager.KEY_QK_PWD_CHANGED = "qk_pwd_changed";
    /**登录类型 */
    SaveManager.KEY_LOGIN_TYPE = "loginType";
    SaveManager.KEY_LOGIN_INFO = "loginInfo";
    /** */
    SaveManager.KEY_UID = "uuid";
    SaveManager.KEY_GATEWAYINFO = "gatewayInfo";
    SaveManager.KEY_PHONEPWD = "phone_pwd"; //手机登录密码
    SaveManager.KEY_ACCOUNT = "keyAccount"; //本地缓存账号
    SaveManager.KEY_PHONE = "keyPhone"; //本地缓存手机登录账号
    return SaveManager;
}());
//# sourceMappingURL=SaveManager.js.map