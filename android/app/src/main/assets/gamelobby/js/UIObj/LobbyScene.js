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
/*
* 用户信息相关视图：头像框，金币等
* 替代Avator.ts
*/
var userData = {
    avatarSkinId: "",
    role: "",
    prizeGroup: 0
};
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
        this.requestPop();
        //添加大厅视图
        this.view = new view.LobbyView();
        this.addChild(this.view);
        //请求相关接口
        LobbyDataManager.reqBindInfo();
        LobbyDataManager.reqUserInfo();
        LobbyDataManager.reqUserCurrentInfo();
        LobbyDataManager.reqAvatarInfo();
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
/**
 * 大厅相关数据管理
 */
var LobbyDataManager = /** @class */ (function () {
    function LobbyDataManager() {
    }
    /**
     * 绑定手机相关数据
     */
    LobbyDataManager.reqBindInfo = function () {
        HttpRequester.getHttpData(ConfObjRead.getConfUrl().cmd.getBindInfo, this, function (suc, jobj) {
            if (suc) {
                TempData.isGetBindAward = !jobj.receive;
                TempData.bindOpen = jobj.bind;
                TempData.bindAward = jobj.reward;
                Common.bindPhoneInfo = jobj;
                EventManager.dispath(EventType.BINDPHONE_INFO);
            }
        });
    };
    /**
     * users
     */
    LobbyDataManager.reqUserInfo = function () {
        HttpRequester.getHttpData(ConfObjRead.getConfUrl().cmd.userinfobalance, this, function (suc, jobj) {
            if (suc) {
                Common.userInfo = jobj;
                Common.setLoginPlatform(jobj.loginPlatform);
                if (jobj.userRole) {
                    userData.role = jobj.userRole;
                }
                if (jobj.prizeGroup) {
                    userData.prizeGroup = jobj.prizeGroup;
                }
                EventManager.dispath(EventType.GETUSERS_INFO);
            }
        });
    };
    /**
     * current
     */
    LobbyDataManager.reqUserCurrentInfo = function () {
        HttpRequester.getHttpData(ConfObjRead.getConfUrl().cmd.userinfo, this, function (suc, jobj) {
            if (suc) {
                Common.userInfo_current = jobj;
                EventManager.dispath(EventType.GETUSER_CURRENT);
            }
        });
    };
    /**
     * user
     */
    LobbyDataManager.reqAvatarInfo = function () {
        HttpRequester.getHttpData(ConfObjRead.getConfUrl().cmd.avatorget, this, function (suc, jobj) {
            if (suc) {
                Common.avatorInfo = jobj;
                var tempId = jobj.avatar;
                if (!tempId)
                    tempId = "05";
                tempId = Tools.FormatNumber(parseInt(tempId), 2);
                Common.avatorInfo.avatorId = tempId;
                SaveManager.getObj().get(SaveManager.KEY_AVATOR_ID, tempId);
                EventManager.dispath(EventType.GETAVATOR_INFO);
            }
        });
    };
    /**
     * 余额刷新
     */
    LobbyDataManager.refreshMoney = function () {
        HttpRequester.getHttpData(ConfObjRead.getConfUrl().cmd.flushMoney, this, function (suc, jobj) {
            if (suc) {
                if (Common.userInfo) {
                    Common.userInfo.userBalance.balance = jobj.balance;
                    EventManager.dispath(EventType.FLUSH_MONEY);
                }
            }
        });
    };
    return LobbyDataManager;
}());
//# sourceMappingURL=LobbyScene.js.map