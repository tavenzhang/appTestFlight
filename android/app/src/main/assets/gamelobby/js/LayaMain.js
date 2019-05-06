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
        Laya.init(0, Common.GM_SCREEN_H, Laya.WebGL);
        // Laya.URL.rootPath = Laya.URL.basePath + window["sPubRes"];
        if (window["bShowStat"]) {
            Laya.Stat.show(0, 0);
        }
        /**
         * 设置点击弹框背景后不关闭弹窗
         */
        UIConfig.closeDialogOnSide = false;
        //设置游戏版本号
        ResConfig.versions = "版本号：4.0504.1741";
        Laya.stage.scaleMode = Laya.Stage.SCALE_FIXED_HEIGHT;
        Laya.stage.screenMode = Laya.Stage.SCREEN_HORIZONTAL;
        Laya.stage.bgColor = "#000000";
        Laya.stage.on(Laya.Event.RESIZE, this, this.onResize);
        window.document.addEventListener("message", this.handleIFrameAction, false);
        window.addEventListener("message", this.handleIFrameAction, false);
        this.root_node = new Laya.Sprite();
        Laya.stage.addChild(this.root_node);
        PageManager.Get().ShowPage([
            "res/atlas/ui/res_login.atlas",
            "./assets/ui/loading/conf/loadconf.json",
            "./assets/ui/loading/conf/assets_lobby.json"
        ], PageLogin /*, 'isloaded'*/);
        // this.initLoading();
    }
    LayaMain.getInstance = function () {
        return LayaMain.obj;
    };
    LayaMain.prototype.onResize = function () {
        ToolsApp.initAppData();
        if (AppData.IS_NATIVE_APP) {
            window.removeEventListener("message", this.handleIFrameAction, false);
        }
        EventManager.dispath(EventType.RESIZE);
        PostMHelp.game_common({ name: "onGameInit" });
    };
    LayaMain.prototype.getRootNode = function () {
        return this.root_node;
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
    /**
     * 退出到登录界面
     */
    LayaMain.prototype.loginOut = function () {
        Debug.trace("LayaMain.loginOut");
        PostMHelp.game_common({ name: "loginout" });
        SaveManager.getObj().save(SaveManager.KEY_TOKEN, "");
        Dialog.manager.closeAll();
        this.clearChild();
        PageManager.Get().ShowPage(null, PageLogin, 'isloaded');
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
            //刷新用户信息
            EventManager.dispath(EventType.FLUSH_USERINFO);
            try {
                GamePanel.getInstance().resume();
            }
            catch (e) { }
        }
        catch (e) { }
    };
    LayaMain.prototype.handleIFrameAction = function (e) {
        //  Debug.trace("handleIFrameAction e:");
        // Debug.trace(e);
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
                    EventManager.dispath(EventType.FLUSH_USERINFO);
                    break;
                //todo:xxx
                // if(Avator.obj)
                // {
                //     Avator.obj.flushUserInfo(); 
                // }
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
                case "onBlur": //失去焦点
                    if (LoginPad.obj) {
                        LoginPad.obj.lostFocusInputText();
                    }
                    if (RegPad.obj) {
                        RegPad.obj.lostFocusInputText();
                    }
                    if (QuickLogin.obj) {
                        QuickLogin.obj.lostFocusInputText();
                    }
                    //派发失去焦点事件
                    EventManager.dispath(EventType.BLUR_NATIVE);
                    Laya.timer.once(300, this, function () {
                        Laya.stage.event(Laya.Event.MOUSE_DOWN);
                    });
                    break;
                case "deviceInfo":
                    MyUid.setUid(message.data);
                    break;
                case "lobbyResume":
                    Debug.trace("LayaMain.handleAction in case");
                    lamain.onGameResume();
                    break;
                case "showLoading": { //显示/隐藏loading
                    this.showCircleLoading(Boolean(message.data), 0);
                    break;
                }
            }
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
        if (AgentPad.getObj()) {
            AgentPad.getObj().onClose(null);
        }
        var clen = LayaMain.getInstance().getRootNode()._childs.length;
        for (var k = 0; k < clen; k++) {
            var obj = LayaMain.getInstance().getRootNode()._childs[k];
            Laya.timer.clearAll(obj);
        }
        LayaMain.getInstance().getRootNode().removeChildren();
    };
    LayaMain.prototype.initLoading = function () {
        this.clearChild();
        if (this.sceneLoading == null) {
            this.sceneLoading = new LoadingScene();
            this.sceneLoading.initLoading();
            LayaMain.getInstance().getRootNode().addChild(this.sceneLoading);
        }
    };
    LayaMain.prototype.initLogin = function () {
        this.loginOut();
        return; //todo:xxx
        // this.clearChild();
        // if (this.sceneLogin == null) {
        //     this.sceneLogin = new LoginScene();
        //     this.sceneLogin.onLoaded();
        //     LayaMain.getInstance().getRootNode().addChild(this.sceneLogin);
        // }
    };
    LayaMain.prototype.initLobby = function () {
        this.clearChild();
        if (this.sceneLobby == null) {
            Common.loginType = SaveManager.getObj().get(SaveManager.KEY_LOGIN_TYPE, Common.TYPE_LOGIN_UNKNOW);
            Common.loginInfo = SaveManager.getObj().get(SaveManager.KEY_LOGIN_INFO, Common.emptyLoginInfo());
            this.sceneLobby = new LobbyScene();
            this.sceneLobby.onLoaded(null);
            LayaMain.getInstance().getRootNode().addChild(this.sceneLobby);
        }
    };
    LayaMain.prototype.initRoom = function (data) {
        this.clearChild();
        if (this.sceneRoom == null) {
            this.sceneRoom = new RoomScene();
            this.sceneRoom.onLoaded(data);
            LayaMain.getInstance().getRootNode().addChild(this.sceneRoom);
        }
    };
    LayaMain.prototype.requestEnd = function (stat, msg) {
        var bSucAll = true;
        if (stat == "complete") {
            if (TempData.bRequestStatus == 1)
                bSucAll = false;
            //todo:xxx
            // if( Avator.obj )
            // {
            //     if( Avator.obj.bRequestStatus == 1 )
            //     {
            //         bSucAll = false;
            //     }
            // }
            if (GamePanel.obj) {
                if (GamePanel.obj.bRequestStatus == 1) {
                    bSucAll = false;
                }
                // Debug.trace("LayaMain.requestEnd GamePanel:"+GamePanel.obj.bRequestStatus);
            }
            if (AttentionDialog.obj) {
                if (AttentionDialog.obj.bRequestStatus == 1) {
                    bSucAll = false;
                }
                // Debug.trace("LayaMain.requestEnd AttentionDialog:"+AttentionDialog.obj.bRequestStatus);
            }
            if (RoomPanel.obj) {
                if (RoomPanel.obj.bRequestStatus == 1) {
                    bSucAll = false;
                }
                // Debug.trace("LayaMain.requestEnd RoomPanel:"+RoomPanel.obj.bRequestStatus);
            }
            // Debug.trace("LayaMain.requestEnd bSucAll:"+bSucAll);
            if (bSucAll) {
                this.showCircleLoading(false);
            }
        }
        else if (stat == "error") {
            // Debug.trace("LayaMain.requestEnd stat error");
            this.showCircleLoading(false);
            NoticeDialog.showPad(msg, ConfObjRead.getConfNoticeDialog(), this, this.requestError);
        }
        // Debug.trace("LayaMain.requestEnd");
    };
    LayaMain.prototype.requestError = function () {
        LayaMain.getInstance().initLogin();
    };
    /**
     * 显示loading
     * @param b
     * @param bgAlpha 背景透明度
     */
    LayaMain.prototype.showCircleLoading = function (b, bgAlpha) {
        if (b === void 0) { b = true; }
        if (bgAlpha === void 0) { bgAlpha = 0.5; }
        if (b)
            view.LoadingView.show(bgAlpha);
        else
            view.LoadingView.hide();
    };
    LayaMain.onQuit = function () {
        SaveManager.getObj().save(SaveManager.KEY_TOKEN, "");
        LayaMain.getInstance().initLogin();
    };
    LayaMain.obj = null;
    return LayaMain;
}());
var AppData = window["sAppData"];
window['loadJsOver']();
var lamain = new LayaMain();
if (AppData.IS_NATIVE_APP) {
    window.top["receivedMessageFromRN"] = lamain.onAppPostMessgae;
}
//# sourceMappingURL=LayaMain.js.map