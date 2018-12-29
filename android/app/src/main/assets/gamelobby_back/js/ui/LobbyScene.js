var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var LobbyScene = /** @class */ (function (_super) {
    __extends(LobbyScene, _super);
    function LobbyScene() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LobbyScene.prototype.initUI = function () {
        //背景
        UIBg.getInstance(this, ConfObjRead.getConfUiBg());
        //标题栏
        UITitleBar.getInstance(this, ConfObjRead.getConfTitlebar(), this, this.titlebarOver);
        //头像
        Avator.getInstance(this, ConfObjRead.getConfAvator(), this, this.OnAvatorScrollOut);
        //版本信息
        VersionStat.getInstance(this, ConfObjRead.getConfVersion());
        //跑马灯消息
        RunningMsg.getInstance(this, ConfObjRead.getConfRunningmsg(), this, this.runningmsgOver);
        //个人中心菜单组
        MineMenus.getInstance(this, ConfObjRead.getConfMinemenus());
        //游戏图标
        GamePanel.getInstance(this, ConfObjRead.getConfGamepanel(), this, this.gamepanelOver);
        //初始化音效 Add by Jelly on 2018/12/26
        this.initBgMusic();
    };
    LobbyScene.prototype.initBgMusic = function () {
        var _this = this;
        if (LobbyScene.IS_PLAYED_MUSIC) {
            return;
        }
        LobbyScene.IS_PLAYED_MUSIC = true;
        Laya.loader.load([{ url: ConfObjRead.getConfMusic().src }], new Laya.Handler(this, function () {
            Debug.trace("player bg music");
            Laya.timer.once(3000, _this, function () {
                Laya.SoundManager.playMusic(ConfObjRead.getConfMusic().src);
            });
        }));
    };
    LobbyScene.prototype.OnAvatorScrollOut = function (e) {
    };
    LobbyScene.prototype.titlebarOver = function () {
    };
    LobbyScene.prototype.runningmsgOver = function () {
    };
    LobbyScene.prototype.gamepanelOver = function () {
        //检查是否有重连
        // this.checkReconnect();
    };
    LobbyScene.prototype.showCircleLoading = function (b) {
        if (b === void 0) { b = true; }
        LayaMain.getInstance().showCircleLoading(b);
    };
    /*
    var temp_token = Tools.getQueryVariable( "token" );
    Common.backUrl = ConfObjRead.getConfUrl().url.backlobby;
    
    //初始化设置参数
    SaveManager.getObj().initCommon(
        Common.access_token,
        ConfObjRead.getConfUrl().url.rooturl
    );

    //有token参数
    if( temp_token && temp_token != undefined )
    {
        //读到有新的token
        Common.access_token = temp_token;
        //如果当前没有游戏和房间id，才是全新登录
        if( !Common.gameId && !Common.roomId )
        {
            //全新登录
            Common.bNewlogin = true;
        }else{
            //从游戏里面回来的
            Common.bNewlogin = false;
        }
        //存档
        SaveManager.getObj().save(SaveManager.KEY_TOKEN,temp_token);
        Debug.trace("new token:"+temp_token);
    }else{
        //从游戏里面回来的
        Common.bNewlogin = false;
        //没有新的，去存档里面读取
        temp_token = SaveManager.getObj().get(SaveManager.KEY_TOKEN,"");
        Common.access_token = temp_token;
        Debug.trace("old token:"+temp_token);
    }

    //如果没有当前字体信息，获取一次
    if( !Common.normalFont )
    {
        Common.getNormalFontByDevice();
    }
    Debug.trace("normalFont:"+Common.normalFont);
    */
    //载入完毕
    LobbyScene.prototype.onLoaded = function (s) {
        //如果没有可用token，退回登录
        if (!Common.access_token) {
            LayaMain.getInstance().initLogin();
            return;
        }
        //返回地址
        Common.backUrl = ConfObjRead.getConfUrl().url.backlobby;
        //初始化设置参数
        SaveManager.getObj().initCommon(Common.access_token, ConfObjRead.getConfUrl().url.rooturl);
        //兼容诈金花
        Common.confObj.url = ConfObjRead.getConfUrl().url;
        //构造界面
        this.initUI();
        //移除loading
        // this.removeLoading();
    };
    /**
     * 开始播放背景音效
     */
    LobbyScene.IS_PLAYED_MUSIC = false;
    return LobbyScene;
}(MyScene));
//# sourceMappingURL=LobbyScene.js.map