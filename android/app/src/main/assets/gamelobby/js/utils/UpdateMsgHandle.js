/**
 * 游戏更新管理
 */
var UpdateMsgHandle = /** @class */ (function () {
    function UpdateMsgHandle() {
    }
    UpdateMsgHandle.onInitMsg = function (data) {
        UpdateMsgHandle.updateInitMsg = data;
        EventManager.dispath(EventType.GAME_UPDATE_INIT);
    };
    UpdateMsgHandle.getGameIndexByAlias = function (alias) {
        if (!UpdateMsgHandle.updateInitMsg) {
            return null;
        }
        for (var i = 0; i < UpdateMsgHandle.updateInitMsg.length; i++) {
            var msg = UpdateMsgHandle.updateInitMsg[i];
            if (msg.alias == alias) {
                return i;
            }
        }
        return null;
    };
    UpdateMsgHandle.refreshArr = function (progress) {
        if (!progress) {
            return null;
        }
        for (var i = 0; i < progress.length; i++) {
            var gp = progress[i];
            var gi = UpdateMsgHandle.getGameIndexByAlias(gp.alias);
            if (gi != null) {
                UpdateMsgHandle.updateInitMsg[gi].percent = gp.percent;
                if (UpdateMsgHandle.updateInitMsg[gi].percent >= 1) {
                    UpdateMsgHandle.updateInitMsg[gi].bupdate = false;
                    UpdateMsgHandle.clearInfoByAlias(gp.alias);
                }
            }
        }
    };
    UpdateMsgHandle.clearInfoByAlias = function (alias) {
        if (!UpdateMsgHandle.updateInitMsg) {
            return null;
        }
        for (var i = 0; i < UpdateMsgHandle.updateInitMsg.length; i++) {
            var obj = UpdateMsgHandle.updateInitMsg[i];
            if (obj.alias == alias) {
                UpdateMsgHandle.updateInitMsg.splice(i, 1);
                return;
            }
        }
    };
    UpdateMsgHandle.onUpdateMsg = function (data) {
        // data = [
        //     {
        //         "gameId":30,
        //         "alias":"zjh"
        //         "percent":0.7
        //     }
        // ];
        UpdateMsgHandle.refreshArr(data);
        EventManager.dispath(EventType.GAME_UPDATE_PROGRESS, data);
    };
    UpdateMsgHandle.setRawRoot = function (src) {
        UpdateMsgHandle.raw_root = src;
    };
    UpdateMsgHandle.playSound = function (src) {
        Laya.SoundManager.playSound(UpdateMsgHandle.raw_root + src);
    };
    UpdateMsgHandle.playMusic = function (src) {
        Debug.log("UpdateMsgHandle.playMusic");
        //刷新本地缓存音频设置
        SaveManager.getObj().refreshSaveObj();
        var b_music_switch = SaveManager.getObj().get(SaveManager.KEY_MUSIC_SWITCH, 1);
        var f_music_value = SaveManager.getObj().get(SaveManager.KEY_MUSIC_VL, 1);
        //引擎
        Laya.SoundManager.musicVolume = f_music_value;
        if (b_music_switch == 1)
            Laya.SoundManager.playMusic(UpdateMsgHandle.raw_root + src);
    };
    UpdateMsgHandle.updateInitMsg = null;
    UpdateMsgHandle.raw_root = "./assets/raw/";
    return UpdateMsgHandle;
}());
//# sourceMappingURL=UpdateMsgHandle.js.map