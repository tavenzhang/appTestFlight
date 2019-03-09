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
        //初始化微信小游戏
        Laya.MiniAdpter.init();
        //程序入口
        // Laya.init(Common.GM_SCREEN_W,Common.GM_SCREEN_H);//, Laya.WebGL);
        Laya.init(Common.GM_SCREEN_W, Common.GM_SCREEN_H, Laya.WebGL);
        // Laya.URL.basePath = "http://localhost/";
        //根据参数来确定当前屏幕适配模式
        var scalemode = Tools.getQueryVariable("sm"); //"shawn";//"fixedheight";//
        switch (scalemode) {
            case "exactfit":
                Laya.stage.scaleMode = Laya.Stage.SCALE_EXACTFIT;
                break;
            case "fixedauto":
                Laya.stage.scaleMode = Laya.Stage.SCALE_FIXED_AUTO;
                break;
            case "fixedheight":
                Laya.stage.scaleMode = Laya.Stage.SCALE_FIXED_HEIGHT;
                break;
            case "fixedwidth":
                Laya.stage.scaleMode = Laya.Stage.SCALE_FIXED_WIDTH;
                break;
            case "scalefull":
                Laya.stage.scaleMode = Laya.Stage.SCALE_FULL;
                break;
            case "noborder":
                Laya.stage.scaleMode = Laya.Stage.SCALE_NOBORDER;
                break;
            case "noscale":
                Laya.stage.scaleMode = Laya.Stage.SCALE_NOBORDER;
                break;
            case "showall":
                Laya.stage.scaleMode = Laya.Stage.SCALE_SHOWALL;
                break;
            case "shawn":
                Laya.stage.scaleMode = "shawn";
                break;
            default:
                // Laya.stage.scaleMode = Laya.Stage.SCALE_FIXED_AUTO;
                Laya.stage.scaleMode = Laya.Stage.SCALE_SHOWALL;
                break;
        }
        // Laya.stage.scaleMode = Laya.Stage.SCALE_SHOWALL; //全部显示，左右或者上下有黑边
        // Laya.stage.scaleMode = Laya.Stage.SCALE_EXACTFIT;   //铺满全屏，拉伸
        // Laya.stage.scaleMode = Laya.Stage.SCALE_FIXED_AUTO;  //canvas是全屏的，但是所有都靠左上
        // Laya.stage.scaleMode = Laya.Stage.SCALE_FIXED_HEIGHT;   //竖屏被吃右边，横屏超出
        // Laya.stage.scaleMode = Laya.Stage.SCALE_FULL; //竖屏靠左上，右侧被吃
        // Laya.stage.scaleMode = Laya.Stage.SCALE_NOBORDER;   //地址栏方向被吃，右侧会超出
        // Laya.stage.scaleMode = Laya.Stage.SCALE_NOSCALE;    //地址栏方向被吃
        Laya.stage.screenMode = Laya.Stage.SCREEN_HORIZONTAL; //.SCREEN_VERTICAL;//.SCREEN_NONE;
        Laya.stage.alignH = Laya.Stage.ALIGN_CENTER;
        Laya.stage.alignV = Laya.Stage.ALIGN_MIDDLE;
        Laya.stage.bgColor = "#000000";
        // Laya.stage.bgColor = "#ffffff";
        // Common.platformInfo = Tools.platformInfo();
        // Debug.trace('platform:');
        // Debug.trace(Common.platformInfo);
        // Tools.deviceInfo();
        // let canvas = Laya.Render.canvas;
        // var cs = Laya.Browser.canvas.getCanvas();
        // Debug.trace("cs:");
        // Debug.trace(cs);
        //不靠谱，不能主动全屏，而是设置允许全屏后，等待下次点击全屏
        // Laya.stage.fullScreenEnabled = true;
        Laya.stage.on(Laya.Event.RESIZE, this, this.onResize);
        //添加侦听postMessage
        //   window.addEventListener("message", this.handleAction,false);
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
    //登出
    LayaMain.prototype.loginOut = function () {
        Debug.trace("LayaMain.loginOut");
        SaveManager.getObj().save(SaveManager.KEY_TOKEN, "");
        this.initLogin();
    };
    LayaMain.prototype.onGamePause = function () {
        //检查当前声音音量，进行暂存
        // Common.lastMusicVolume = Laya.SoundManager.musicVolume;
        // Common.lastSoundVolume = Laya.SoundManager.soundVolume;
        //然后关闭所有声音
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
            //恢复到暂存音量
            Laya.SoundManager.setMusicVolume(lmv);
            Laya.SoundManager.setSoundVolume(lsv);
            if (lms == 1) {
                Laya.SoundManager.playMusic(ConfObjRead.getConfMusic().src);
            }
            //重新拉取用户帐户信息，刷新帐户数据
            if (Avator.getInstance()) {
                Avator.getInstance().startRequest();
            }
        }
        catch (e) { }
    };
    //接收平台消息
    LayaMain.prototype.handleIFrameAction = function (e) {
        // Debug.trace("handleIFrameAction:",e);
        var data = e.data;
        LayaMain.getInstance().onAppPostMessgae(data);
    };
    LayaMain.prototype.onAppPostMessgae = function (data) {
        Debug.trace("onAppPostMessgae----data==" + data, data);
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
                    lamain.onGamePause();
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
                    break;
            }
        }
    };
    //改变屏幕尺寸时处理
    LayaMain.prototype.onResize = function () {
        Debug.trace("onResize:");
        // Debug.trace(e);
        var appData = window["appData"];
        if (appData) {
            Common.IS_NATIVE_APP = true;
            AppData.IS_NATIVE_APP = true;
            AppData.NATIVE_DATA = appData;
            AppData.isAndroidHack = appData.isAndroidHack;
            if ("" + appData.clientId == "5") {
                window["initVconsole"]();
            }
        }
        var safariMask = document.getElementById("safariMask");
        // safariMask.style.display = "block";
        if (safariMask) {
            if (window.innerHeight == document.documentElement.clientHeight) {
                safariMask.setAttribute("style", "display: none");
            }
            else {
                safariMask.setAttribute("style", "display: block");
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
        // for( var k in Laya.stage._childs)
        var clen = Laya.stage._childs.length;
        for (var k = 0; k < clen; k++) {
            var obj = Laya.stage._childs[k];
            Laya.timer.clearAll(obj);
        }
        Laya.stage.removeChildren();
    };
    LayaMain.prototype.initLoading = function () {
        this.clearChild();
        Laya.URL.basePath = "";
        if (this.sceneLoading == null) {
            Debug.trace("LayaMain.sceneLoading == null to create");
            this.sceneLoading = new LoadingScene();
            Debug.trace("LayaMain.sceneLoading == end to over");
            this.sceneLoading.initLoading();
            Laya.stage.addChild(this.sceneLoading);
        }
    };
    LayaMain.prototype.initLogin = function () {
        this.clearChild();
        Laya.URL.basePath = "";
        if (this.sceneLogin == null) {
            this.sceneLogin = new LoginScene();
            this.sceneLogin.onLoaded();
            Laya.stage.addChild(this.sceneLogin);
        }
    };
    LayaMain.prototype.initLobby = function () {
        // Debug.trace("LayaMain.initLobby");
        //构造大厅之前，再次清空整个stage
        this.clearChild();
        Laya.URL.basePath = "";
        if (this.sceneLobby == null) {
            // Debug.trace("LayaMain.initLobby == null to create");
            this.sceneLobby = new LobbyScene();
            // Debug.trace("LayaMain.initLobby new lobbyscene");
            this.sceneLobby.onLoaded(null); //.initLoading();
            // Debug.trace("LayaMain.initLobby onloaded");
            Laya.stage.addChild(this.sceneLobby);
        }
        // Debug.trace("LayaMain.initLobby end");
    };
    LayaMain.prototype.initRoom = function (data) {
        this.clearChild();
        Laya.URL.basePath = "";
        if (this.sceneRoom == null) {
            this.sceneRoom = new RoomScene();
            this.sceneRoom.onLoaded(data);
            Laya.stage.addChild(this.sceneRoom);
        }
    };
    //是否所有请求都结束了？
    LayaMain.prototype.requestEnd = function (stat, msg) {
        var bSucAll = true;
        // Debug.trace("LayaMain.requestEnd stat:"+stat+" msg:"+msg);
        // Debug.trace("Avator.obj:");
        // Debug.trace(Avator.obj);
        // Debug.trace("GamePanel.obj:");
        // Debug.trace(GamePanel.obj);
        // Debug.trace("RoomPanel.obj:");
        // Debug.trace(RoomPanel.obj);
        if (stat == "complete") {
            // Debug.trace("0 bSucAll:"+bSucAll);
            // 个人信息完毕？
            if (Avator.obj) {
                // Debug.trace("LayaMain.requestEnd Avator.obj.bRequestStatus:"+Avator.obj.bRequestStatus);
                if (Avator.obj.bRequestStatus == 1) {
                    bSucAll = false;
                }
            }
            // Debug.trace("1 bSucAll:"+bSucAll);
            // 游戏列表完毕？
            if (GamePanel.obj) {
                // Debug.trace("LayaMain.requestEnd GamePanel.obj.bRequestStatus:"+GamePanel.obj.bRequestStatus);
                if (GamePanel.obj.bRequestStatus == 1) {
                    bSucAll = false;
                }
            }
            // 给公告列表完毕？
            if (AttentionDialog.obj) {
                // Debug.trace("LayaMain.requestEnd AttentionDialog.obj.bRequestStatus:"+AttentionDialog.obj.bRequestStatus);
                if (AttentionDialog.obj.bRequestStatus == 1) {
                    bSucAll = false;
                }
            }
            // Debug.trace("2 bSucAll:"+bSucAll);
            // 房间列表完毕？
            if (RoomPanel.obj) {
                // Debug.trace("LayaMain.requestEnd RoomPanel.obj.bRequestStatus:"+RoomPanel.obj.bRequestStatus);
                if (RoomPanel.obj.bRequestStatus == 1) {
                    bSucAll = false;
                }
            }
            // Debug.trace("3 bSucAll:"+bSucAll);
            //以上两个都完毕了，就算完毕，此时才可以关闭loading
            if (bSucAll) {
                // Debug.trace("LayaMain.requestEnd bSucAll:"+bSucAll);
                this.showCircleLoading(false);
            }
            // Debug.trace("4 bSucAll:"+bSucAll);
        }
        //如果出错
        else if (stat == "error") {
            // Debug.trace("LayaMain.requestEnd error:"+msg);
            this.showCircleLoading(false);
            // Toast.showToast(msg);
            NoticeDialog.showPad(msg, ConfObjRead.getConfNoticeDialog(), this, this.requestError);
        }
    };
    //请求发生了错误，直接返回登录界面
    LayaMain.prototype.requestError = function () {
        // Debug.trace("error 2 login");
        LayaMain.getInstance().initLogin();
    };
    LayaMain.prototype.showCircleLoading = function (b, data) {
        if (b === void 0) { b = true; }
        if (data === void 0) { data = null; }
        // var d = {
        //     "tips":"正在加载中",
        //     "bShowBg":b
        // }
        if (b && !this.cloading) {
            // Debug.trace("LayaMain.showCircleLoading create new cloading");
            this.cloading = MyBBLoading.getObj(true); //.show();
            this.cloading.zOrder = 99999;
            Laya.stage.addChild(this.cloading);
            // this.sceneLobby.addChild(this.cloading);
        }
        if (!b) {
            if (this.cloading) {
                // Debug.trace("LayaMain.showCircleLoading hide");
                this.cloading.hide();
                this.cloading = null;
            }
        }
        else {
            // Debug.trace("LayaMain.showCircleLoading show");
            this.cloading.show();
        }
        // MyBBLoading.showPad(Laya.stage,ConfObjRead.getConfCLoading(),d);
    };
    //本地退出
    LayaMain.onQuit = function () {
        //清除token
        SaveManager.getObj().save(SaveManager.KEY_TOKEN, "");
        //进入登录场景
        LayaMain.getInstance().initLogin();
    };
    LayaMain.obj = null;
    return LayaMain;
}());
var lamain = new LayaMain();
lamain.initLoading();
window.top["receivedMessageFromRN"] = lamain.onAppPostMessgae;
//# sourceMappingURL=LayaMain.js.map