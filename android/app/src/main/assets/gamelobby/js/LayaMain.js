var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var LayaMain = /** @class */ (function () {
    function LayaMain() {
        this.sceneLobby = null;
        this.sceneLoading = null;
        this.sceneRoom = null;
        this.sceneLogin = null;
        this.cloading = null;
        LayaMain.obj = this;
        Laya.init(Common.GM_SCREEN_W, Common.GM_SCREEN_H, Laya.WebGL);
        // Laya.URL.rootPath = Laya.URL.basePath + window["sPubRes"];
        if (window["bShowStat"]) {
            Laya.Stat.show(0, 0);
        }
        Laya.stage.scaleMode = window["sScaleMode"];
        Laya.stage.screenMode = Laya.Stage.SCREEN_HORIZONTAL;
        Laya.stage.alignH = Laya.Stage.ALIGN_CENTER;
        Laya.stage.alignV = Laya.Stage.ALIGN_MIDDLE;
        Laya.stage.bgColor = "#000000";
        Laya.stage.on(Laya.Event.RESIZE, this, this.onResize);
        window.addEventListener("message", this.handleAction, false);
        window.document.addEventListener("message", this.handleIFrameAction, false);
    }
    LayaMain.getInstance = function () {
        return LayaMain.obj;
    };
    LayaMain.prototype.handleAction = function (e) {
        try {
            Debug.trace("Laya handleAction:");
            Debug.trace(e);
            var obj = JSON.parse(e.data);
            Debug.trace("Laya handleAction obj:");
            Debug.trace(obj);
            Debug.trace("Laya handleAction action:");
            Debug.trace(obj.action);
            switch (obj.action) {
                case "lobbyResume":
                    Debug.trace("LayaMain.handleAction in case");
                    lamain.onGameResume();
                    break;
                default:
                    break;
            }
        }
        catch (e) { }
    };
    LayaMain.prototype.loginOut = function () {
        Debug.trace("LayaMain.loginOut");
        SaveManager.getObj().save(SaveManager.KEY_TOKEN, "");
        this.initLogin();
    };
    LayaMain.prototype.onGamePause = function () {
        Laya.SoundManager.setMusicVolume(0);
        // Laya.SoundManager.setSoundVolume(0);
    };
    LayaMain.prototype.onGameResume = function () {
        Debug.trace("LayaMain.onGameResume mv:" + Common.lastMusicVolume + " sv:" + Common.lastSoundVolume);
        try {
            SaveManager.getObj().refreshSaveObj();
            var lms = SaveManager.getObj().get(SaveManager.KEY_MUSIC_SWITCH, 1);
            var lmv = SaveManager.getObj().get(SaveManager.KEY_MUSIC_VL, 1);
            var lss = SaveManager.getObj().get(SaveManager.KEY_SFX_SWITCH, 1);
            var lsv = SaveManager.getObj().get(SaveManager.KEY_SFX_VL, 1);
            Debug.trace("LayaMain.onGameResume save obj:");
            Debug.trace(SaveManager.getObj().mtObj);
            Debug.trace("LayaMain.onGameResume music vol:" + lmv + " switch:" + lms + " sound vol:" + lsv + " switch:" + lss);
            Laya.SoundManager.setMusicVolume(lmv);
            Laya.SoundManager.setSoundVolume(lsv);
            if (lms == 1) {
                Laya.SoundManager.playMusic(ConfObjRead.getConfMusic().src);
            }
            if (Avator.getInstance()) {
                Avator.getInstance().flushUserInfo();
            }
            try {
                GamePanel.getInstance().resume();
            }
            catch (e) { }
            try {
                RoomPanel.getInstance().resume();
            }
            catch (e) { }
        }
        catch (e) { }
    };
    LayaMain.prototype.handleIFrameAction = function (e) {
        var data = e.data;
        LayaMain.getInstance().onAppPostMessgae(data);
    };
    LayaMain.prototype.onAppPostMessgae = function (data) {
        var message = null;
        try {
            message = JSON.parse(data);
        }
        catch (e) {
            Debug.trace("onAppPostMessgae----error", e);
        }
        if (message && message.action) {
            switch (message.action) {
                case "logout":
                    LayaMain.onQuit();
                    break;
                case "playMusic":
                    lamain.onGameResume();
                    break;
                case "stopMusic":
                    Laya.SoundManager.stopAll();
                    break;
                case "windowResize":
                    this.onResize();
                    break;
                case "appData":
                    for (var key in message) {
                        if (AppData[key] != null) {
                            Debug.trace("onAppPostMessgae----appData--test--key==>" + key + " AppData[key]--isnotExist==" + (AppData[key] == null), message[key]);
                            AppData[key] = message[key];
                        }
                    }
                    break;
                case "http":
                    for (var _i = 0, _a = NetManager.httpRequestList; _i < _a.length; _i++) {
                        var item = _a[_i];
                        if (item && (item.hashUrl == message.hashUrl)) {
                            var index = NetManager.httpRequestList.indexOf(item);
                            NetManager.httpRequestList.splice(index, 1);
                            Debug.trace("onAppPostMessgae---NetManager.histRequestList=splite=" + NetManager.httpRequestList.length, message);
                            var retStr = "";
                            if (message.rs) {
                                //callback.apply(caller,[e,'progress',hr])
                                retStr = message.content;
                                item.callback.apply(item.caller, [retStr, 'complete', { http: __assign({}, message, { response: retStr }) }]);
                            }
                            else {
                                retStr = JSON.stringify(message);
                                item.callback.apply(item.caller, [message.message, 'error', { http: __assign({}, message, { response: retStr }) }]);
                            }
                        }
                    }
                    break;
                case "flushMoney":
                    if (Avator.obj) {
                        Avator.obj.flushUserInfo();
                    }
                case "openDebug":
                    window["initVconsole"]();
                    break;
                case "gamesinfo":
                    UpdateMsgHandle.onInitMsg(message.data);
                    break;
                case "updateProgress":
                    UpdateMsgHandle.onUpdateMsg(message.data);
                    break;
                case "setrawroot":
                    UpdateMsgHandle.setRawRoot(message.data);
                    break;
                case "playsound":
                    UpdateMsgHandle.playSound(message.data);
                    break;
                case "playmusic":
                    UpdateMsgHandle.playMusic(message.data);
                    break;
            }
        }
    };
    LayaMain.prototype.onResize = function () {
        ToolsApp.initAppData();
        if (AppData.IS_NATIVE_APP) {
            window.removeEventListener("message", this.handleAction, false);
        }
    };
    LayaMain.prototype.clearChild = function () {
        if (this.sceneLobby) {
            this.sceneLobby.destroy(true);
            this.sceneLobby = null;
        }
        if (this.sceneLoading) {
            this.sceneLoading.destroy(true);
            this.sceneLoading = null;
        }
        if (this.sceneRoom) {
            this.sceneRoom.destroy(true);
            this.sceneRoom = null;
        }
        if (this.sceneLogin) {
            this.sceneLogin.destroy(true);
            this.sceneLogin = null;
        }
        if (this.cloading) {
            this.cloading.destroy(true);
            this.cloading = null;
        }
        var clen = Laya.stage._childs.length;
        for (var k = 0; k < clen; k++) {
            var obj = Laya.stage._childs[k];
            Laya.timer.clearAll(obj);
        }
        Laya.stage.removeChildren();
    };
    LayaMain.prototype.initLoading = function () {
        this.clearChild();
        if (this.sceneLoading == null) {
            this.sceneLoading = new LoadingScene();
            this.sceneLoading.initLoading();
            Laya.stage.addChild(this.sceneLoading);
        }
    };
    LayaMain.prototype.initLogin = function () {
        this.clearChild();
        if (this.sceneLogin == null) {
            this.sceneLogin = new LoginScene();
            this.sceneLogin.onLoaded();
            Laya.stage.addChild(this.sceneLogin);
        }
    };
    LayaMain.prototype.initLobby = function () {
        this.clearChild();
        if (this.sceneLobby == null) {
            this.sceneLobby = new LobbyScene();
            this.sceneLobby.onLoaded(null);
            Laya.stage.addChild(this.sceneLobby);
        }
    };
    LayaMain.prototype.initRoom = function (data) {
        this.clearChild();
        if (this.sceneRoom == null) {
            this.sceneRoom = new RoomScene();
            this.sceneRoom.onLoaded(data);
            Laya.stage.addChild(this.sceneRoom);
        }
    };
    LayaMain.prototype.requestEnd = function (stat, msg) {
        var bSucAll = true;
        if (stat == "complete") {
            if (Avator.obj) {
                if (Avator.obj.bRequestStatus == 1) {
                    bSucAll = false;
                }
            }
            if (GamePanel.obj) {
                if (GamePanel.obj.bRequestStatus == 1) {
                    bSucAll = false;
                }
            }
            if (AttentionDialog.obj) {
                if (AttentionDialog.obj.bRequestStatus == 1) {
                    bSucAll = false;
                }
            }
            if (RoomPanel.obj) {
                if (RoomPanel.obj.bRequestStatus == 1) {
                    bSucAll = false;
                }
            }
            if (bSucAll) {
                this.showCircleLoading(false);
            }
        }
        else if (stat == "error") {
            this.showCircleLoading(false);
            NoticeDialog.showPad(msg, ConfObjRead.getConfNoticeDialog(), this, this.requestError);
        }
    };
    LayaMain.prototype.requestError = function () {
        LayaMain.getInstance().initLogin();
    };
    LayaMain.prototype.showCircleLoading = function (b, data) {
        if (b === void 0) { b = true; }
        if (data === void 0) { data = null; }
        if (b && !this.cloading) {
            this.cloading = MyBBLoading.getObj(true);
            this.cloading.zOrder = 99999;
            Laya.stage.addChild(this.cloading);
        }
        if (!b) {
            if (this.cloading) {
                this.cloading.hide();
                this.cloading = null;
            }
        }
        else {
            this.cloading.show();
        }
    };
    LayaMain.onQuit = function () {
        SaveManager.getObj().save(SaveManager.KEY_TOKEN, "");
        LayaMain.getInstance().initLogin();
    };
    LayaMain.obj = null;
    return LayaMain;
}());
var AppData = window["sAppData"];
var lamain = new LayaMain();
lamain.initLoading();
if (AppData.IS_NATIVE_APP) {
    window.top["receivedMessageFromRN"] = lamain.onAppPostMessgae;
}
//# sourceMappingURL=LayaMain.js.map