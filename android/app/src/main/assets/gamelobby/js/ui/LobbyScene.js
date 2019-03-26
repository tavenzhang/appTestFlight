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
var LobbyScene = /** @class */ (function (_super) {
    __extends(LobbyScene, _super);
    function LobbyScene() {
        var _this = _super.call(this) || this;
        LobbyScene.obj = _this;
        return _this;
    }
    LobbyScene.prototype.destroy = function (b) {
        LobbyScene.obj = null;
        _super.prototype.destroy.call(this, b);
    };
    LobbyScene.getInstance = function () {
        return LobbyScene.obj;
    };
    LobbyScene.prototype.initUI = function () {
        // Debug.trace("LobbyScene.initUI start");
        //背景
        UIBg.getInstance(this, ConfObjRead.getConfUiBg());
        // Debug.trace("LobbyScene.initUI bg ok");
        //游戏图标
        GamePanel.getInstance(this, ConfObjRead.getConfGamepanel(), this, this.gamepanelOver);
        //广告模块
        GirlManager.getInstance(this);
        //标题栏
        UITitleBar.getInstance(this, ConfObjRead.getConfTitlebar(), this, this.titlebarOver);
        // Debug.trace("LobbyScene.initUI titlebar ok");
        //头像
        Avator.getInstance(this, ConfObjRead.getConfAvator(), this, this.OnAvatorScrollOut);
        // Debug.trace("LobbyScene.initUI avator ok");
        //版本信息
        VersionStat.getInstance(this, ConfObjRead.getConfVersion());
        // Debug.trace("LobbyScene.initUI version stat");
        //跑马灯消息
        // RunningMsg.getInstance(this,ConfObjRead.getConfRunningmsg(),
        //     this,this.runningmsgOver);
        var msgUrl = ConfObjRead.getConfUrl().url.apihome +
            ConfObjRead.getConfUrl().cmd.noticelist +
            "?pageSize=20&start=0&access_token=" + Common.access_token;
        RunningMsg.getInstance(this, "./assets/conf/runningmsg.json", msgUrl);
        // Debug.trace("LobbyScene.initUI runningmsg");
        //个人中心菜单组
        MineMenus.getInstance(this, ConfObjRead.getConfMinemenus());
        // Debug.trace("LobbyScene.initUI minemenus");
        //公告
        if (ConfObjRead.getConfAttention().bAutoShowInLobby) {
            AttentionDialog.showPad(this, ConfObjRead.getConfAttention());
        }
        //初始化音效 Add by Jelly on 2018/12/26
        // this.initBgMusic();
    };
    LobbyScene.initBgMusic = function () {
        if (LobbyScene.IS_PLAYED_MUSIC) {
            return;
        }
        LobbyScene.IS_PLAYED_MUSIC = true;
        Laya.loader.load([{ url: ConfObjRead.getConfMusic().src }], new Laya.Handler(this, function () {
            // Debug.trace( "player bg music" );
            // Laya.timer.once( 3000 , this , ()=>{
            //     Laya.SoundManager.playMusic(ConfObjRead.getConfMusic().src);
            // } );
            if (SaveManager.getObj().get(SaveManager.KEY_MUSIC_SWITCH, 1) >= 1) //开关
             {
                Laya.SoundManager.playMusic(ConfObjRead.getConfMusic().src);
            }
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
        // Debug.trace('LobbyScene.gamepanelOver');
    };
    // public showCircleLoading(b:boolean=true):void
    // {
    //     LayaMain.getInstance().showCircleLoading(b);
    // }
    /*
    var temp_token = Tools.getQueryVariable( "token" );
    Common.backUrl = ConfObjRead.getConfUrl().url.backlobby;
    
    //初始化设置参数
    SaveManager.getObj().initCommon(
        Common.access_token,
        ConfObjRead.getConfUrl().url.apihome
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
        // Debug.trace("LobbyScene.onLoaded start");
        //如果没有可用token，退回登录
        if (!Common.access_token) {
            // Debug.trace("LobbyScene.onLoaded initLogin");
            LayaMain.getInstance().initLogin();
            return;
        }
        //返回地址
        Common.backUrl = ConfObjRead.getConfUrl().url.backlobby;
        //初始化设置参数
        SaveManager.getObj().initCommon(Common.access_token, ConfObjRead.getConfUrl().url.apihome);
        // Debug.trace("LobbyScene.onLoaded initSave");
        //兼容诈金花
        Common.confObj.url = ConfObjRead.getConfUrl().url;
        // Debug.trace("LobbyScene.onLoaded start initUI");
        //构造界面
        this.initUI();
        // Debug.trace("LobbyScene.onLoaded end");
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