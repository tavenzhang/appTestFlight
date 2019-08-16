/*
* 声音音效播放器
*/
var SoundPlayer = /** @class */ (function () {
    function SoundPlayer() {
    }
    /***************************************************************** 内部相关接口 ********************************************************/
    /** 关闭大厅背景音乐 */
    SoundPlayer.stopLobbyBGM = function () {
        //App
        if (GameUtils.isAppSound) {
            PostMHelp.game_common({ do: "playBgMusic", param: false });
        }
        else {
            Laya.SoundManager.stopMusic();
        }
    };
    /** 播放大厅背景音乐 */
    SoundPlayer.playLobbyBGM = function () {
        Laya.SoundManager.musicVolume = this.musicValue;
        //App
        if (GameUtils.isAppSound) {
            PostMHelp.game_common({ do: "playBgMusic", param: true });
            //引擎
        }
        else {
            Laya.SoundManager.playMusic(ResConfig.musicUrl);
        }
    };
    //更新音效
    SoundPlayer.updateSound = function () {
        //设置引擎播放音量
        Laya.SoundManager.soundVolume = this.soundValue;
        //关闭所有音效
        if (this.soundSwitch == 0) {
            Laya.SoundManager.stopAllSound();
        }
    };
    /***************************************************************** 设置相关接口 ********************************************************/
    //初始化音频设置
    SoundPlayer.initSoundSetting = function () {
        //读取最新本地缓存文件
        SaveManager.getObj().refreshSaveObj();
        //保存音频设置
        this.soundValue = SaveManager.getObj().get(SaveManager.KEY_SFX_VL, 1);
        this.soundSwitch = SaveManager.getObj().get(SaveManager.KEY_SFX_SWITCH, 1);
        this.musicValue = SaveManager.getObj().get(SaveManager.KEY_MUSIC_VL, 1);
        this.musicSwitch = SaveManager.getObj().get(SaveManager.KEY_MUSIC_SWITCH, 1);
        //这里以开关为准重置音量值，重置上海设置
        this.musicValue = this.musicSwitch;
        this.soundValue = this.soundSwitch;
        SaveManager.getObj().set(SaveManager.KEY_MUSIC_VL, this.musicValue);
        SaveManager.getObj().set(SaveManager.KEY_SFX_VL, this.soundValue);
        SaveManager.getObj().saveData();
    };
    //更新音频设置（这里做兼容上海）
    SoundPlayer.CompatibleSetting = function () {
        //读取最新本地缓存文件
        SaveManager.getObj().refreshSaveObj();
        //读取最新数据
        var soundValue = SaveManager.getObj().get(SaveManager.KEY_SFX_VL, 1);
        var soundSwitch = SaveManager.getObj().get(SaveManager.KEY_SFX_SWITCH, 1);
        var musicValue = SaveManager.getObj().get(SaveManager.KEY_MUSIC_VL, 1);
        var musicSwitch = SaveManager.getObj().get(SaveManager.KEY_MUSIC_SWITCH, 1);
        //开关未发生变化
        if (this.soundSwitch == soundSwitch) {
            //音量发生变化，说明是上海的改了设置
            if (this.soundValue != soundValue) {
                this.soundValue = soundValue;
                this.soundSwitch = this.soundValue > 0 ? 1 : 0;
            }
            this.updateSound();
            //开关变化，说明是我方老虎机友军改变了设置
        }
        else {
            this.ChangeSoundSwitch(soundSwitch);
        }
        //同理音效
        if (this.musicSwitch == musicSwitch) {
            //音量发生变化，说明是上海改了设置
            if (this.musicValue != musicValue) {
                this.musicValue = musicValue;
                this.musicSwitch = this.musicValue > 0 ? 1 : 0;
            }
            this.UpdateBGM();
            //开关变化，说明是我方老虎机友军改变了设置
        }
        else {
            this.ChangeMusicSwitch(musicSwitch);
        }
        //保存兼容后设置
        SaveManager.getObj().set(SaveManager.KEY_SFX_VL, this.soundValue);
        SaveManager.getObj().set(SaveManager.KEY_SFX_SWITCH, this.soundSwitch);
        SaveManager.getObj().set(SaveManager.KEY_MUSIC_VL, this.musicValue);
        SaveManager.getObj().set(SaveManager.KEY_MUSIC_SWITCH, this.musicSwitch);
        SaveManager.getObj().saveData();
    };
    SoundPlayer.ChangeSoundSwitch = function (soundSwitch) {
        if (this.soundSwitch == soundSwitch)
            return;
        this.soundSwitch = soundSwitch;
        this.soundValue = this.soundSwitch > 0 ? 1 : 0;
        this.updateSound();
    };
    SoundPlayer.ChangeMusicSwitch = function (musicSwitch) {
        if (this.musicSwitch == musicSwitch)
            return;
        this.musicSwitch = musicSwitch;
        this.musicValue = this.musicSwitch > 0 ? 1 : 0;
        this.UpdateBGM();
    };
    /***************************************************************** 播放相关接口 ********************************************************/
    //更新背景音乐
    SoundPlayer.UpdateBGM = function () {
        //设置引擎播放音量
        Laya.SoundManager.musicVolume = this.musicValue;
        //关闭大厅背景音乐
        if (GameUtils.isAppSound) {
            if (this.musicSwitch == 1 && this.musicValue > 0) {
                this.playLobbyBGM();
            }
            else {
                this.stopLobbyBGM();
            }
        }
        else {
            if (this.musicSwitch == 0) {
                this.stopLobbyBGM();
            }
            else {
                this.playLobbyBGM();
            }
        }
    };
    /** 关闭所有音频 */
    SoundPlayer.StopAllSounds = function () {
        Laya.SoundManager.stopMusic();
        PostMHelp.game_common({ do: "playBgMusic", param: false });
    };
    /**
     * 播放声音
     * @param url
     */
    SoundPlayer.play = function (url, isMutex) {
        if (this.soundSwitch != 1)
            return;
        Laya.SoundManager.soundVolume = this.soundValue;
        var curMutex = this.curPlaySound[url];
        if (!curMutex) { //当前不互斥才能继续播放相同音效
            this.curPlaySound[url] = isMutex; //记录互斥标签
            Laya.SoundManager.playSound(url, 1, Laya.Handler.create(null, function () {
                delete SoundPlayer.curPlaySound[url];
            }));
        }
    };
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
    SoundPlayer.curPlaySound = {};
    SoundPlayer.soundValue = 1;
    SoundPlayer.musicValue = 1;
    SoundPlayer.soundSwitch = 1;
    SoundPlayer.musicSwitch = 1;
    return SoundPlayer;
}());
//# sourceMappingURL=SoundPlayer.js.map