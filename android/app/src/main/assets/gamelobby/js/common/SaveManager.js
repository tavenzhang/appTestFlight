var SaveManager = /** @class */ (function () {
    function SaveManager() {
        this.mtObj = null;
        this.init();
    }
    SaveManager.getObj = function () {
        if (!SaveManager.obj) {
            SaveManager.obj = new SaveManager();
        }
        return SaveManager.obj;
    };
    SaveManager.prototype.refreshSaveObj = function () {
        this.mtObj = this.getObjTotal(SaveManager.SAVE_KEY_NN, {});
    };
    SaveManager.prototype.init = function () {
        this.refreshSaveObj();
        this.initSetting();
    };
    SaveManager.prototype.clearAll = function () {
        Laya.LocalStorage.clear();
        this.refreshSaveObj();
        Debug.trace("SaveManager.clearAll-----------");
    };
    SaveManager.prototype.initSetting = function () {
        var b_music_switch = this.get(SaveManager.KEY_MUSIC_SWITCH, 1);
        var f_music_value = this.get(SaveManager.KEY_MUSIC_VL, 1);
        var b_sfx_switch = this.get(SaveManager.KEY_SFX_SWITCH, 1);
        var f_sfx_value = this.get(SaveManager.KEY_SFX_VL, 1);
        if (b_music_switch == 0) {
            Laya.SoundManager.musicVolume = 0;
        }
        else {
            Laya.SoundManager.musicVolume = f_music_value;
        }
        if (b_sfx_switch == 0) {
            Laya.SoundManager.soundVolume = 0;
            Common.bSoundSwitch = false;
        }
        else {
            Common.bSoundSwitch = true;
            Laya.SoundManager.soundVolume = f_sfx_value;
        }
    };
    SaveManager.prototype.initCommon = function (token, rooturl) {
        var token = this.get(SaveManager.KEY_TOKEN, token);
        var httpUrl = this.get(SaveManager.KEY_API_URL, rooturl);
    };
    SaveManager.prototype.save = function (key, v) {
        this.mtObj[key] = v;
        this.saveObjTotal(SaveManager.SAVE_KEY_NN, this.mtObj);
    };
    SaveManager.prototype.get = function (key, def) {
        if (this.mtObj[key] != null && this.mtObj[key] != undefined) {
            return this.mtObj[key];
        }
        this.save(key, def);
        return def;
    };
    SaveManager.prototype.saveObjTotal = function (key, obj) {
        // Debug.trace("saveObjTotal:"+key+" obj:");
        // Debug.trace(obj);
        Laya.LocalStorage.setJSON(key, obj);
    };
    SaveManager.prototype.getObjTotal = function (key, def) {
        var a = Laya.LocalStorage.getJSON(key);
        // Debug.trace('getObjTotal a:');
        // Debug.trace(a);
        // Debug.trace("def:");
        // Debug.trace(def);
        if (a) {
            return a;
        }
        return def;
    };
    SaveManager.KEY_QK_USERNAME = "qk_username";
    SaveManager.KEY_QK_PASSWORD = "qk_password";
    SaveManager.KEY_LOGIN_TYPE = "loginType";
    SaveManager.KEY_LOGIN_INFO = "loginInfo";
    SaveManager.KEY_MUSIC_VL = "music"; //0...1
    SaveManager.KEY_MUSIC_SWITCH = "music_switch"; //0/1
    SaveManager.KEY_SFX_VL = "sound"; //0....1
    SaveManager.KEY_SFX_SWITCH = "sound_switch"; //0/1
    SaveManager.KEY_UID = "uuid";
    SaveManager.KEY_AVATOR_ID = "avator_id"; //"01"..."08"
    SaveManager.SAVE_KEY_NN = "MT-Card"; //json obj
    SaveManager.KEY_TOKEN = "token"; //"xxxxxx"
    SaveManager.KEY_API_URL = "httpUrl"; //"xxxxxx"
    return SaveManager;
}());
//# sourceMappingURL=SaveManager.js.map