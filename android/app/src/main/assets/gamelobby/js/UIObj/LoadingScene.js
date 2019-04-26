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
var LoadingScene = /** @class */ (function (_super) {
    __extends(LoadingScene, _super);
    function LoadingScene() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.temp_token = "";
        return _this;
    }
    LoadingScene.prototype.initLoading = function () {
        Loading.getObj(this, this, this.onLoaded, "./assets/ui/loading/conf/loadconf.json", "./assets/ui/loading/conf/assets_lobby.json").show(true);
    };
    LoadingScene.prototype.removeLoading = function () {
        Loading.obj.destroy(true);
        Tools.addFullScreenListener();
    };
    LoadingScene.prototype.onLoaded1 = function (s) {
    };
    LoadingScene.prototype.onLoaded = function (s) {
        Common.confObj = Laya.loader.getRes("./assets/conf/common/config.json");
        Common.getNormalFontByDevice();
        // Debug.trace("LoadingScene.onLoaded font:"+Common.normalFont);
        this.temp_token = SaveManager.getObj().get(SaveManager.KEY_TOKEN, "");
        // Debug.trace("LoadingScene temp_token:"+this.temp_token);
        this.status = Tools.getQueryVariable("status");
        var urlToken = Tools.getQueryVariable("token");
        if (!AppData.IS_NATIVE_APP) {
            if (urlToken != undefined && urlToken.length != 0) {
                this.temp_token = urlToken;
            }
            Common.clientId = Tools.getQueryVariable("clientId");
            if (!Common.clientId) {
                Common.clientId = ConfObjRead.getConfUrl().cmd.testClientId;
            }
        }
        else {
            var urlJson = AppData.NATIVE_DATA.urlJSON;
            Common.clientId = AppData.NATIVE_DATA.clientId;
            var localUrlJson = ConfObjRead.getConfUrl();
            //  Debug.trace("ConfObjRead.getConfUrl()----urlJson==",urlJson);
            if (urlJson) {
                for (var key in urlJson) {
                    if (localUrlJson[key]) {
                        for (var subKey in urlJson[key]) {
                            if (localUrlJson[key][subKey]) {
                                localUrlJson[key][subKey] = urlJson[key][subKey];
                            }
                        }
                    }
                }
            }
            //Debug.trace("ConfObjRead.getConfUrl()----",ConfObjRead.getConfUrl())
        }
        LobbyScene.initBgMusic();
        //Laya.SoundManager.playMusic(ConfObjRead.getConfMusic().src);
        if (this.temp_token.length <= 0 || this.status == 1 || Common.confObj.testLogin) {
            // Debug.trace("ConfObjRead.getConfUrl()---- LayaMain.getInstance().initLogin()")
            LayaMain.getInstance().initLogin();
        }
        else {
            // Debug.trace("ConfObjRead.getConfUrl()----  this.requestTokenTest(this.temp_token)")
            this.requestTokenTest(this.temp_token);
        }
    };
    LoadingScene.prototype.requestTokenTest = function (token) {
        var url = ConfObjRead.getConfUrl().url.apihome +
            ConfObjRead.getConfUrl().cmd.userinfobalance +
            "?access_token=" + token;
        NetManager.getObj().HttpConnect(url, this, this.responseInfo);
    };
    LoadingScene.prototype.responseInfo = function (s, stat, hr) {
        // Debug.trace("Loading userinfobalance stat:"+stat);
        // Debug.trace(s);
        // Debug.trace("LoadingScene.responseInfo userinfo stat:"+stat);
        // Debug.trace(s);
        if (stat == "complete") {
            Common.userInfo = s;
            Common.access_token = this.temp_token;
            SaveManager.getObj().save(SaveManager.KEY_TOKEN, this.temp_token);
            if (!Common.clientId) {
                Common.clientId = Common.userInfo.userBalance.clientId;
            }
            this.checkReconnect();
            // LayaMain.getInstance().initLobby();
            // this.requestUserInfo(Common.access_token);
        }
        else {
            // Debug.trace("loading initLogin");
            LayaMain.getInstance().initLogin();
        }
    };
    LoadingScene.prototype.checkReconnect = function () {
        var url = ConfObjRead.getConfUrl().url.apihome +
            ConfObjRead.getConfUrl().cmd.reconnect +
            "?access_token=" + Common.access_token;
        NetManager.getObj().HttpConnect(url, this, this.checkReconnectOk);
    };
    LoadingScene.prototype.checkReconnectOk = function (s, stat, hr) {
        // Debug.trace('checkReconnectOk stat:'+stat);        
        // Debug.trace(s);
        // Debug.trace("checkReconnectOk hr:");
        // Debug.trace(hr);
        if (stat == "complete") {
            if (s.retryConnection) {
                var url = s.gameUrl;
                Common.gameId = s.gameId;
                Common.wsUrl = s.roomUrl;
                Common.roomId = s.roomId;
                var url = s.gameUrl;
                if (url) {
                    Tools.jump2game(url);
                }
                Common.gameId = 0;
                Common.wsUrl = "";
                Common.roomId = 0;
                this.checkBackFromGame();
            }
            else {
                this.checkBackFromGame();
            }
        }
        else {
            this.checkBackFromGame();
        }
    };
    LoadingScene.prototype.checkBackFromGame = function () {
        var gameId = Tools.getQueryVariable("gameId");
        var alias = Tools.getQueryVariable("alias");
        if (Common.gameId > 0) {
            // Debug.trace('checkBackFromGame gameId:'+Common.gameId);
            var gdata = Common.getGameDataById(Common.gameId);
            if (gdata != null) {
                LayaMain.getInstance().initRoom(gdata);
            }
        }
        else {
            LayaMain.getInstance().initLobby();
        }
    };
    return LoadingScene;
}(MyScene));
//# sourceMappingURL=LoadingScene.js.map