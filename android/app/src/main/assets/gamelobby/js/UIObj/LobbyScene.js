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
        UIBg.getInstance(this, ConfObjRead.getConfUiBg());
        GamePanel.getInstance(this, ConfObjRead.getConfGamepanel(), this, this.gamepanelOver);
        GirlManager.getInstance(this);
        UITitleBar.getInstance(this, ConfObjRead.getConfTitlebar(), this, this.titlebarOver);
        Avator.getInstance(this, ConfObjRead.getConfAvator(), this, this.OnAvatorScrollOut);
        VersionStat.getInstance(this, ConfObjRead.getConfVersion());
        var msgUrl = ConfObjRead.getConfUrl().url.apihome +
            ConfObjRead.getConfUrl().cmd.noticelist +
            "?pageSize=20&start=0&access_token=" + Common.access_token;
        RunningMsg.getInstance(this, "./assets/conf/scrollmsg/runningmsg.json", msgUrl, null, this.runningmsgOver);
        MineMenus.getInstance(this, ConfObjRead.getConfMinemenus());
        if (ConfObjRead.getConfAttention().bAutoShowInLobby) {
            Debug.trace("LobbyScene.initUI auto");
            AttentionDialog.showPad(this, ConfObjRead.getConfAttention(), AttentionDialog.TYPE_OPEN_AUTO);
        }
    };
    // public static IS_PLAYED_MUSIC:boolean = false;
    LobbyScene.initBgMusic = function () {
        // if( LobbyScene.IS_PLAYED_MUSIC )
        // {
        //     return;
        // }
        // LobbyScene.IS_PLAYED_MUSIC = true;
        // Laya.loader.load( [{url:ConfObjRead.getConfMusic().src}] , new Laya.Handler( this , ()=>{
        // Debug.trace( "player bg music" );
        // Laya.timer.once( 3000 , this , ()=>{
        //     Laya.SoundManager.playMusic(ConfObjRead.getConfMusic().src);
        // } );
        if (SaveManager.getObj().get(SaveManager.KEY_MUSIC_SWITCH, 1) >= 1) //开关
         {
            Debug.trace("LobbyScene.initBgMusic playMusic");
            Laya.SoundManager.playMusic(ConfObjRead.getConfMusic().src);
        }
        // } ) );
    };
    LobbyScene.prototype.OnAvatorScrollOut = function (e) {
    };
    LobbyScene.prototype.titlebarOver = function () {
    };
    LobbyScene.prototype.runningmsgOver = function () {
        // flushGameList
    };
    LobbyScene.prototype.gamepanelOver = function () {
    };
    LobbyScene.prototype.onLoaded = function (s) {
        if (!Common.access_token) {
            LayaMain.getInstance().initLogin();
            return;
        }
        Common.backUrl = ConfObjRead.getConfUrl().url.backlobby;
        SaveManager.getObj().initCommon(Common.access_token, ConfObjRead.getConfUrl().url.apihome);
        Common.confObj.url = ConfObjRead.getConfUrl().url;
        this.initUI();
    };
    return LobbyScene;
}(MyScene));
//# sourceMappingURL=LobbyScene.js.map