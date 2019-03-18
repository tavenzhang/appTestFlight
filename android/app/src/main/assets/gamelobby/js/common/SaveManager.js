var SaveManager = /** @class */ (function () {
    function SaveManager() {
        this.mtObj = null;
        this.init();
    }
    //提取公用对象
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
        //取出总的存档
        // this.mtObj = this.getObjTotal(SaveManager.SAVE_KEY_NN,{});
        this.refreshSaveObj();
        // Debug.trace('SaveManager init:');
        // Debug.trace(this.mtObj);
        this.initSetting();
    };
    //初始化设置数据
    SaveManager.prototype.initSetting = function () {
        //初始化音乐音效的设置
        var b_music_switch = this.get(SaveManager.KEY_MUSIC_SWITCH, 1);
        var f_music_value = this.get(SaveManager.KEY_MUSIC_VL, 1);
        var b_sfx_switch = this.get(SaveManager.KEY_SFX_SWITCH, 1);
        var f_sfx_value = this.get(SaveManager.KEY_SFX_VL, 1);
        // Debug.trace("initSetting ms:"+b_music_switch+" ss:"+b_sfx_switch);
        // Debug.trace("initSetting mv:"+f_music_value+" sv:"+f_sfx_value);
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
        //出hi刷token、httpUrl
    };
    SaveManager.prototype.initCommon = function (token, rooturl) {
        var token = this.get(SaveManager.KEY_TOKEN, token);
        var httpUrl = this.get(SaveManager.KEY_API_URL, rooturl);
        // Debug.trace("initCommon token:"+token);
        // Debug.trace("initCommon httpUrl:"+httpUrl);
    };
    //向json中保存值并保存json
    SaveManager.prototype.save = function (key, v) {
        // Laya.LocalStorage.setItem(key,v);
        this.mtObj[key] = v;
        this.saveObjTotal(SaveManager.SAVE_KEY_NN, this.mtObj);
    };
    //从json中提取值
    SaveManager.prototype.get = function (key, def) {
        if (this.mtObj[key] != null && this.mtObj[key] != undefined) {
            return this.mtObj[key];
        }
        this.save(key, def);
        return def;
    };
    //保存大数据json
    SaveManager.prototype.saveObjTotal = function (key, obj) {
        // Debug.trace("saveObjTotal:"+key+" obj:");
        // Debug.trace(obj);
        Laya.LocalStorage.setJSON(key, obj);
        //测试用
        // this.getObjTotal(key,{});
    };
    //提取大数据json
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
    //音乐音效设置内容
    SaveManager.KEY_MUSIC_VL = "music"; //0...1
    SaveManager.KEY_MUSIC_SWITCH = "music_switch"; //0/1
    SaveManager.KEY_SFX_VL = "sound"; //0....1
    SaveManager.KEY_SFX_SWITCH = "sound_switch"; //0/1
    //自定义uuid
    SaveManager.KEY_UID = "uuid";
    //当前的头像id
    SaveManager.KEY_AVATOR_ID = "avator_id"; //"01"..."08"
    //转接
    SaveManager.SAVE_KEY_NN = "MT-Card"; //json obj
    //与游戏沟通的存档
    SaveManager.KEY_TOKEN = "token"; //"xxxxxx"
    SaveManager.KEY_API_URL = "httpUrl"; //"xxxxxx"
    return SaveManager;
}());
//# sourceMappingURL=SaveManager.js.map