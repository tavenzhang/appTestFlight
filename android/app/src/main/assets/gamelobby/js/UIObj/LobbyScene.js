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
        if (this.view) {
            this.view.dispose();
            this.view = null;
        }
        _super.prototype.destroy.call(this, b);
    };
    LobbyScene.getInstance = function () {
        return LobbyScene.obj;
    };
    LobbyScene.prototype.initUI = function () {
        var _this = this;
        this.requestPop();
        //获取绑定送金相关数据
        HttpRequester.getBindAward(this, function (suc, jobj) {
            if (suc) {
                TempData.isGetBindAward = jobj.receive;
                TempData.bindOpen = jobj.bind;
                TempData.bindAward = jobj.reward;
            }
            //添加大厅视图
            _this.view = new view.LobbyView();
            _this.addChild(_this.view);
            if (TempData.bindOpen && !TempData.isGetBindAward) {
                view.dlg.bindPhone.BindPhoneActiveDlg.show();
            }
        });
    };
    LobbyScene.prototype.requestPop = function () {
        var url = ConfObjRead.getConfUrl().url.apihome +
            ConfObjRead.getConfUrl().cmd.attention_pop +
            "?access_token=" + Common.access_token;
        NetManager.getObj().HttpConnect(url, this, this.responsePop);
    };
    LobbyScene.prototype.responsePop = function (s, stat, hr) {
        if (s.pop) {
            Laya.timer.once(1000, this, view.dlg.NoticeDlg.show, [AttentionDialog.TYPE_OPEN_AUTO]);
        }
    };
    LobbyScene.initBgMusic = function () {
        if (LobbyScene.IS_PLAYED_MUSIC) {
            return;
        }
        LobbyScene.IS_PLAYED_MUSIC = true;
        Laya.loader.load([{ url: ResConfig.musicUrl }], new Laya.Handler(this, function () {
            if (SaveManager.getObj().get(SaveManager.KEY_MUSIC_SWITCH, 1) >= 1) //开关
             {
                Laya.SoundManager.musicVolume = 1;
                Laya.SoundManager.playMusic(ResConfig.musicUrl);
            }
        }));
    };
    LobbyScene.prototype.onLoaded = function (s) {
        Common.access_token = SaveManager.getObj().get(SaveManager.KEY_TOKEN, "");
        if (!Common.access_token) {
            LayaMain.getInstance().initLogin();
            return;
        }
        Common.backUrl = ConfObjRead.getConfUrl().url.backlobby;
        SaveManager.getObj().initCommon(Common.access_token, ConfObjRead.getConfUrl().url.apihome);
        Common.confObj.url = ConfObjRead.getConfUrl().url;
        this.initUI();
    };
    LobbyScene.IS_PLAYED_MUSIC = false;
    return LobbyScene;
}(MyScene));
//# sourceMappingURL=LobbyScene.js.map