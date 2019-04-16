var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var UpdateMsgHandle = /** @class */ (function (_super) {
    __extends(UpdateMsgHandle, _super);
    function UpdateMsgHandle() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UpdateMsgHandle.onInitMsg = function (data) {
        // data = [
        //     {
        //         "gameId":31,
        //         "alias":"zjh",
        //         "bupdate":true
        //     },
        //     {
        //         "gameId":30,
        //         "bupdate":true
        //     },
        //     {
        //         "gameId":29,
        //         "bupdate":true
        //     }
        // ];
        UpdateMsgHandle.updateInitMsg = data;
        if (GamePanel.getInstance()) {
            GamePanel.getInstance().onUpdateMsgInit();
        }
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
        if (GamePanel.getInstance()) {
            GamePanel.getInstance().onUpdatePercent(data);
        }
    };
    UpdateMsgHandle.setRawRoot = function (src) {
        UpdateMsgHandle.raw_root = src;
    };
    UpdateMsgHandle.playSound = function (src) {
        Laya.SoundManager.playSound(UpdateMsgHandle.raw_root + src);
    };
    UpdateMsgHandle.playMusic = function (src) {
        Debug.trace("UpdateMsgHandle.playMusic");
        Laya.SoundManager.playMusic(UpdateMsgHandle.raw_root + src);
    };
    UpdateMsgHandle.updateInitMsg = null;
    UpdateMsgHandle.raw_root = "./assets/raw/";
    return UpdateMsgHandle;
}(MySprite));
//# sourceMappingURL=UpdateMsgHandle.js.map