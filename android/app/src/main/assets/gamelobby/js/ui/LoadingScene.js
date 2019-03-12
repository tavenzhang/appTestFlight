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
        //当前临时使用的token
        _this.temp_token = "";
        return _this;
    }
    //开始加载
    LoadingScene.prototype.initLoading = function () {
        Loading.getObj(this, this, this.onLoaded, "./assets/ui/loading/conf/loadconf.json", "./assets/ui/loading/conf/assets_lobby.json").show(true);
        // Debug.trace("init loading");
        //输出颜色矩阵
        // ColorTool.getInstance().targetsChangeColor(0xfe8bff);//0x8bebff);//0xe2ff8b);//0xffcd8b);
        // var color1 = ColorTool.getInstance().getColorMatrix();
        // Debug.trace(color1);
    };
    LoadingScene.prototype.removeLoading = function () {
        Loading.obj.destroy(true);
        //添加全屏监听
        Tools.addFullScreenListener();
        //开始播放背景音乐   //Modified by Jelly on 2018.12.26  //Laya.SoundManager.playMusic(ConfObjRead.getConfMusic().src);
        //Laya.SoundManager.playMusic(ConfObjRead.getConfMusic().src);
    };
    //载入完毕
    LoadingScene.prototype.onLoaded = function (s) {
        //兼容诈金花
        Common.confObj = Laya.loader.getRes("./assets/conf/config.json");
        //从存档中读取token
        this.temp_token = SaveManager.getObj().get(SaveManager.KEY_TOKEN, "");
        Debug.trace("LoadingScene temp_token:" + this.temp_token);
        //从url中读取状态码
        this.status = Tools.getQueryVariable("status");
        // //从url中读取Token
        var urlToken = Tools.getQueryVariable("token");
        //从url中获取业主id 如果是app 会通过app 传送clientID
        if (!Common.IS_NATIVE_APP) {
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
            //利用app数据动态 替换urls 数据
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
        //开始播放背景音乐
        LobbyScene.initBgMusic();
        //Laya.SoundManager.playMusic(ConfObjRead.getConfMusic().src);
        if (this.temp_token.length <= 0 || this.status == 1 || Common.confObj.testLogin) {
            //没有token存档的情况下，直接进入登录场景
            Debug.trace("ConfObjRead.getConfUrl()---- LayaMain.getInstance().initLogin()");
            LayaMain.getInstance().initLogin();
        }
        else {
            //检查该token是否可用，可用，直接进入大厅
            //不可用，进入登录
            Debug.trace("ConfObjRead.getConfUrl()----  this.requestTokenTest(this.temp_token)");
            this.requestTokenTest(this.temp_token);
        }
        // LayaMain.getInstance().initLogin();
        // LayaMain.getInstance().initLobby();
        // var testGameData = {
        //     alias:"zjh",
        //     gameType:"ROUND",
        //     icon:"/assets/ui/game/img_dating_youxi_01.png",
        //     id:10,
        //     jumpUrl:false,
        //     minEntry:0,
        //     name:"诈金花",
        //     sort:0,
        //     state:"NORMAL",
        //     updateTime:1544702591507,
        //     url:"../gamethree/"
        // };
        // LayaMain.getInstance().initRoom(testGameData);
    };
    //发起请求，验证token
    LoadingScene.prototype.requestTokenTest = function (token) {
        var url = ConfObjRead.getConfUrl().url.apihome +
            ConfObjRead.getConfUrl().cmd.userinfobalance +
            "?access_token=" + token;
        NetManager.getObj().HttpConnect(url, this, this.responseInfo);
    };
    LoadingScene.prototype.responseInfo = function (s, stat, hr) {
        Debug.trace("Loading userinfo stat:" + stat);
        Debug.trace(s);
        // Debug.trace("LoadingScene.responseInfo userinfo stat:"+stat);
        // Debug.trace(s);
        if (stat == "complete") {
            //正确了
            Common.userInfo = s;
            Common.access_token = this.temp_token;
            SaveManager.getObj().save(SaveManager.KEY_TOKEN, this.temp_token);
            //读取到用户信息了，检查如果没有clientId的话，就设定当前的clientId
            if (!Common.clientId) {
                Common.clientId = Common.userInfo.userBalance.clientId;
            }
            // Debug.trace("loading initLobby");
            //启动检测重连
            this.checkReconnect();
            // LayaMain.getInstance().initLobby();
        }
        else {
            //出错了
            // Debug.trace("loading initLogin");
            LayaMain.getInstance().initLogin();
        }
    };
    //检查重连需求
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
                //如果有，跳转进入游戏
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
            // Toast.showToast(s);
            //无需重连，检查是否从游戏中退出来的？
            //如果是从游戏中退出来的，应该进入到该游戏的房间列表
            // Debug.trace("RootScene check old gameId:"+Common.gameId);
            this.checkBackFromGame();
        }
    };
    //检查当前是否从游戏返回大厅，是的话就要进入房间列表
    LoadingScene.prototype.checkBackFromGame = function () {
        var gameId = Tools.getQueryVariable("gameId");
        // var alias = Tools.getQueryVariable( "alias" );
        var alias = Tools.getQueryVariable("alias");
        // Debug.trace("LoadingScene.checkBackFromGame gameId:"+gameId+" alias:"+alias);
        if (Common.gameId > 0) {
            Debug.trace('checkBackFromGame gameId:' + Common.gameId);
            //直接进入到对应游戏的房间列表
            //找出该id游戏的数据
            var gdata = Common.getGameDataById(Common.gameId);
            // Debug.trace("gdata:");
            // Debug.trace(gdata);
            if (gdata != null) {
                // Debug.trace("old gameId:"+Common.gameId+" data:");
                // Debug.trace(gdata);
                // this.getInGame(gdata);
                // this.uigamepanel.scrollOutGirl();
                // this.uigamepanel.scrollOutContent(gdata);
                //进入游戏房间列表
                LayaMain.getInstance().initRoom(gdata);
            }
        }
        else {
            // Debug.trace('checkBackFromGame show game list');
            // this.uigamepanel.visible = true;
            // this.uigamepanel.scrollInGirl();
            // this.uigamepanel.scrollInContent();
            //去大厅咯
            LayaMain.getInstance().initLobby();
        }
    };
    return LoadingScene;
}(MyScene));
//# sourceMappingURL=LoadingScene.js.map