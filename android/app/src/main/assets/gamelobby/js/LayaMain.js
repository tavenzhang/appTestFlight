var LayaMain = /** @class */ (function () {
    function LayaMain() {
        this.sceneLobby = null;
        this.sceneLoading = null;
        this.sceneRoom = null;
        this.sceneLogin = null;
        //加载过程中
        this.bLoadingModule = false;
        //呼叫改变之前使用的加载路径是哪里？关闭窗口之后是需要恢复的
        this.oldLoadPath = "";
        //是否备份了加载路径
        this.bBackPath = false;
        LayaMain.obj = this;
        //初始化微信小游戏
        Laya.MiniAdpter.init();
        //程序入口
        Laya.init(Common.GM_SCREEN_W, Common.GM_SCREEN_H, Laya.WebGL); //, Laya.WebGL);
        // Laya.URL.basePath = "http://localhost/";
        //根据参数来确定当前屏幕适配模式
        var scalemode = Tools.getQueryVariable("sm");
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
        // window.top.addEventListener("message", this.handleIFrameAction,false);
    }
    LayaMain.getInstance = function () {
        return LayaMain.obj;
    };
    //接收平台消息
    LayaMain.prototype.handleIFrameAction = function (e) {
        Debug.trace("handleIFrameAction:");
        Debug.trace(e);
        var action = e.data.action;
        if (action == "windowResize") {
            Debug.trace("handleIframeAction go to windowResize");
            this.onResize();
        }
    };
    //改变屏幕尺寸时处理
    LayaMain.prototype.onResize = function () {
        Debug.trace("onResize:");
        // Debug.trace(e);
        var appData = window["appData"];
        if (appData) {
            Common.IS_NATIVE_APP = true;
            Common.APP_NATIVE_DATA = appData;
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
        for (var k in Laya.stage._childs) {
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
            this.sceneLobby.onLoaded(null); //.initLoading();
            Laya.stage.addChild(this.sceneLobby);
        }
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
    //url：模块配置文件地址
    LayaMain.prototype.loadModule = function (urls) {
        var url = Tools.getCurDirPath(urls);
        Debug.trace("loadModule urls:" + urls + " url:" + url);
        LayaMain.getInstance().showCircleLoading(true);
        // MyBBLoading.showPad(this,ConfObjRead.getConfCLoading(),null);
        // Debug.trace("loadModule bLoadingModule:"+this.bLoadingModule);
        // if( this.bLoadingModule )
        // {
        //     Debug.trace("loadModule return bLoadingModule");
        //     return;
        // }
        this.bLoadingModule = true;
        //不跳转url，改为直接加载代码
        // public static jump2game(url:any,caller:any,callback:any):void
        // {
        // if( Common.confObj.loadmode.testnoserver == 1 )
        // {
        //没有服务器支持的测试模式，固定加载游戏地址
        //     url = Common.confObj.loadmode.testgameurl;//"http://106games.com:89/g3/";
        // }
        // if( Common.roomId == 100 )
        // {
        //     url = "http://106games.com:89/gegret/";
        // }
        // url = "http://192.168.11.76:8900/bin/";
        var gconf = url + "game.conf";
        Debug.trace("loadModule gconf:" + gconf);
        Debug.trace("gameID:" + Common.gameId + " roomId:" + Common.roomId);
        // Common.gateWay = url;
        //检查是否加载了该模块
        var mod = Common.getModuleLoaded(gconf);
        Debug.trace("LayaMain loadModule mod:" + mod);
        if (mod != null) {
            Laya.URL.basePath = Tools.getResRootPath(mod.conf.root);
            var st = mod.conf.startfunc;
            if (st.length > 0) {
                //移除掉大厅
                LayaMain.getInstance().clearChild();
                Debug.trace("LayaMain loadModule st:" + st);
                eval(st + "()"); // not defined
            }
            else {
                Toast.showToast("没有配置启动函数");
                Debug.trace("没有配置启动函数");
            }
            if (LayaMain.getInstance()) {
                // lamain.sceneLobby.showCircleLoading(false);
                if (MyBBLoading.obj) {
                    MyBBLoading.obj.show(false);
                }
                this.bLoadingModule = false;
                Debug.trace("close circle loading");
            }
            Debug.trace("return");
            return;
        }
        Debug.trace('before Module load token:' + Common.access_token);
        this.ldmodule = new LoadingModule();
        this.ldmodule.init(gconf, this, this.onModuleLoaded);
        // this.ldmodule.init(url,this,this.onModuleLoaded);
        // LayaMain.getInstance().sceneLobby.addChild(this.ldmodule);
        Laya.stage.addChild(this.ldmodule);
        // }
        Debug.trace('after Module create token:' + Common.access_token);
    };
    LayaMain.prototype.onModuleLoaded = function (url, stat) {
        Debug.trace('Module loaded suc token before clear:' + Common.access_token);
        // if( lamain.sceneLobby )
        // {
        // lamain.sceneLobby.showCircleLoading(false);
        if (MyBBLoading.obj) {
            MyBBLoading.obj.show(false);
        }
        this.bLoadingModule = false;
        // }
        if (stat == "loaded") {
            //所有加载完成后，移除掉当前大厅
            // lamain.clearChild();
            LayaMain.getInstance().clearChild();
        }
        else {
            Toast.showToast("module:" + url + " stat:" + stat);
        }
        // Debug.trace('module:'+url+' loaded stat:'+stat);
        // Debug.trace(window);
        Debug.trace('Module loaded suc token:' + Common.access_token);
        //模块动作，开始
        // try{
        //     Laya.Browser.window['moduleStart']();
        // }catch(e)
        // {
        //     Debug.trace(e);
        // }
    };
    //设置加载路径
    LayaMain.prototype.localtionLoader = function (url) {
        if (url === void 0) { url = ""; }
        // if( this.bBackPath )
        // {
        //     return;
        // }
        this.oldLoadPath = Laya.URL.basePath;
        Debug.trace("localtionLoader oldLoadPath:" + this.oldLoadPath);
        Laya.URL.basePath = url;
        Debug.trace("localtionLoader Laya.URL.basePath:" + Laya.URL.basePath);
        this.bBackPath = true;
    };
    LayaMain.prototype.restoreLoaderPath = function (forceRestore) {
        // if( !this.bBackPath )
        // {
        //     return;
        // }
        if (forceRestore === void 0) { forceRestore = false; }
        Debug.trace("restoreLoaderPath Laya.URL.basePath:" + Laya.URL.basePath);
        Laya.URL.basePath = this.oldLoadPath;
        Debug.trace("restoreLoaderPath oldLoadPath:" + this.oldLoadPath);
        this.bBackPath = false;
    };
    LayaMain.prototype.showCircleLoading = function (b, data) {
        // if(!this.circleLoading)
        // {
        //     this.circleLoading = new MyBBLoading();//MyCircleLoading();
        //     this.circleLoading.init(Common.confObj.cloading,tips);
        //     this.circleLoading.pos(Common.confObj.cloading.pos.x,Common.confObj.cloading.pos.y);
        //     Laya.stage.addChild(this.circleLoading);
        //     this.circleLoading.createSaizi();
        //     this.circleLoading.zOrder = Common.IDX_TOP_LOADING;
        // }
        if (b === void 0) { b = true; }
        if (data === void 0) { data = null; }
        // this.circleLoading.setTips(tips);
        // this.circleLoading.visible = b;
        var d = {
            "tips": "正在加载中",
            "bShowBg": b
        };
        // this.localtionLoader();
        MyBBLoading.showPad(Laya.stage, ConfObjRead.getConfCLoading(), d);
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
window.top["receivedMessageFromRN"] = function (data) {
    if (data && data.action) {
        switch (data.action) {
            case "logout":
                LayaMain.onQuit();
                break;
            case "playMusic":
                Laya.SoundManager.playMusic(ConfObjRead.getConfMusic().src);
                break;
            case "stopMusic":
                Laya.SoundManager.stopMusic();
                break;
        }
    }
    Debug.trace("receivedMessageFromRN", data);
};
//# sourceMappingURL=LayaMain.js.map