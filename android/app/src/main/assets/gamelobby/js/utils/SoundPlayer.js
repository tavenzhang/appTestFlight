/*
* 声音音效播放器
*/
var SoundPlayer = /** @class */ (function () {
    function SoundPlayer() {
    }
    //非弹窗类按钮点击
    SoundPlayer.clickSound = function (isMutex) {
        if (isMutex === void 0) { isMutex = false; }
        this.play("assets/raw/click.mp3", isMutex);
    };
    //关闭小弹窗(非全屏弹窗)
    SoundPlayer.closeSound = function (isMutex) {
        if (isMutex === void 0) { isMutex = false; }
        this.play("assets/raw/close.mp3", isMutex);
    };
    SoundPlayer.enterbuySound = function (isMutex) {
        if (isMutex === void 0) { isMutex = false; }
        this.play("assets/raw/enterbuyClick.mp3", isMutex);
    };
    //进入游戏
    SoundPlayer.enterGameSound = function (isMutex) {
        if (isMutex === void 0) { isMutex = false; }
        this.play("assets/raw/enterGameClick.mp3", isMutex);
    };
    //打开弹窗
    SoundPlayer.enterPanelSound = function (isMutex) {
        if (isMutex === void 0) { isMutex = false; }
        this.play("assets/raw/enterPanelClick.mp3", isMutex);
    };
    //关闭全屏类弹窗
    SoundPlayer.returnLobbySound = function (isMutex) {
        if (isMutex === void 0) { isMutex = false; }
        this.play("assets/raw/returnLobbyClick.mp3", isMutex);
    };
    /**
     * 播放声音
     * @param url
     */
    SoundPlayer.play = function (url, isMutex) {
        var b_sfx_switch = SaveManager.getObj().get(SaveManager.KEY_SFX_SWITCH, 1);
        if (b_sfx_switch != 1)
            return;
        var f_sfx_value = SaveManager.getObj().get(SaveManager.KEY_SFX_VL, 1);
        Laya.SoundManager.soundVolume = f_sfx_value;
        var curMutex = this.curPlaySound[url];
        if (!curMutex) { //当前不互斥才能继续播放相同音效
            this.curPlaySound[url] = isMutex; //记录互斥标签
            Laya.SoundManager.playSound(url, 1, Laya.Handler.create(null, function () {
                delete SoundPlayer.curPlaySound[url];
            }));
        }
    };
    SoundPlayer.UpdateSetting = function () {
        //读取最新本地缓存文件
        SaveManager.getObj().refreshSaveObj();
        this.UpdateSound();
        this.UpdateBGM();
    };
    SoundPlayer.UpdateSound = function () {
        //读取音频设置
        var b_sfx_switch = SaveManager.getObj().get(SaveManager.KEY_SFX_SWITCH, 1);
        //
        var f_sfx_value = SaveManager.getObj().get(SaveManager.KEY_SFX_VL, 1);
        //这里呵呵一下
        b_sfx_switch = f_sfx_value > 0 && b_sfx_switch == 1 ? 1 : 0;
        SaveManager.getObj().save(SaveManager.KEY_SFX_SWITCH, b_sfx_switch);
        //设置引擎播放音量
        Laya.SoundManager.soundVolume = f_sfx_value;
        //关闭所有音效
        if (b_sfx_switch == 0) {
            Laya.SoundManager.stopAllSound();
        }
    };
    SoundPlayer.UpdateBGM = function () {
        //读取音乐设置
        var b_music_switch = SaveManager.getObj().get(SaveManager.KEY_MUSIC_SWITCH, 1);
        //
        var f_music_value = SaveManager.getObj().get(SaveManager.KEY_MUSIC_VL, 1);
        //这里呵呵一下
        b_music_switch = f_music_value > 0 && b_music_switch == 1 ? 1 : 0;
        SaveManager.getObj().save(SaveManager.KEY_MUSIC_SWITCH, b_music_switch);
        //设置引擎播放音量
        Laya.SoundManager.musicVolume = f_music_value;
        //关闭大厅背景音乐
        if (GameUtils.isAppSound) {
            if (b_music_switch == 0 || f_music_value == 0) {
                this.StopLobbyBGM();
            }
        }
        else {
            if (b_music_switch == 0) {
                this.StopLobbyBGM();
            }
        }
    };
    /**
     * 尝试播放大厅背景音乐
     */
    SoundPlayer.PlayLobbyBGM = function () {
        //读取音乐设置
        var b_music_switch = SaveManager.getObj().get(SaveManager.KEY_MUSIC_SWITCH, 1);
        var f_music_value = SaveManager.getObj().get(SaveManager.KEY_MUSIC_VL, 1);
        //App
        if (GameUtils.isAppSound) {
            if (b_music_switch == 1 && f_music_value > 0) {
                PostMHelp.game_common({ do: "playBgMusic", param: true });
            }
            //引擎
        }
        else {
            Laya.SoundManager.musicVolume = f_music_value;
            Laya.SoundManager.playMusic(ResConfig.musicUrl);
        }
    };
    SoundPlayer.StopLobbyBGM = function () {
        //App
        if (GameUtils.isAppSound) {
            PostMHelp.game_common({ do: "playBgMusic", param: false });
        }
        else {
            Laya.SoundManager.stopMusic();
        }
    };
    SoundPlayer.StopAllSounds = function () {
        Laya.SoundManager.stopAll();
        PostMHelp.game_common({ do: "playBgMusic", param: false });
    };
    SoundPlayer.curPlaySound = {};
    return SoundPlayer;
}());
//# sourceMappingURL=SoundPlayer.js.map