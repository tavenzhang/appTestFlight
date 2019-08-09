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
var LobbyScene = /** @class */ (function (_super) {
    __extends(LobbyScene, _super);
    function LobbyScene() {
        var _this = _super.call(this) || this;
        LobbyScene.obj = _this;
        return _this;
    }
    LobbyScene.prototype.destroy = function (b) {
        LobbyScene.obj = null;
        EventManager.removeAllEvents(this);
        if (this.view) {
            this.view.dispose();
            this.view = null;
        }
        _super.prototype.destroy.call(this, b);
    };
    LobbyScene.getInstance = function () {
        return LobbyScene.obj;
    };
    //进入游戏时释放资源占用
    LobbyScene.prototype.clearLobby = function () {
        if (this.view) {
            this.view.visible = false;
            PageManager.clearLobbyRes();
        }
    };
    //
    LobbyScene.prototype.creatLobby = function () {
        if (!this.view) {
            this.initUI();
        }
        else {
            this.view.visible = true;
            this.view.initAnim(false);
        }
    };
    LobbyScene.prototype.initUI = function () {
        //添加大厅视图
        this.view = new view.LobbyView();
        this.addChild(this.view);
        //请求相关接口
        LobbyDataManager.reqBindInfo();
        LobbyDataManager.reqUserInfo();
        LobbyDataManager.reqUserCurrentInfo();
        LobbyDataManager.reqAvatarInfo();
        LobbyDataManager.getCardInfo();
    };
    LobbyScene.initBgMusic = function () {
        if (LobbyScene.IS_PLAYED_MUSIC) {
            return;
        }
        LobbyScene.IS_PLAYED_MUSIC = true;
        Laya.loader.load([{ url: ResConfig.musicUrl }], new Laya.Handler(this, function () {
            SoundPlayer.UpdateBGM();
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
        this.creatLobby();
        PageManager.clearLoginRes();
        EventManager.register(EventType.GAMETOHALL, this, this.creatLobby);
        EventManager.register(EventType.HALLTOGAME, this, this.clearLobby);
    };
    LobbyScene.IS_PLAYED_MUSIC = false;
    return LobbyScene;
}(Laya.Sprite));
/**
 * 大厅相关数据管理
 */
var LobbyDataManager = /** @class */ (function () {
    function LobbyDataManager() {
    }
    /**
     * 检查活动公告是否需要默认弹出
     */
    LobbyDataManager.checkActivity = function () {
        HttpRequester.getHttpData(ConfObjRead.getConfUrl().cmd.attention_pop, this, function (suc, jobj) {
            if (suc && jobj.pop) { //本地 活动/公告2/1 服务器 1/0
                PageManager.showDlg(DlgCmd.noticeCenter, jobj.noticeCate + 1, jobj.noticeid);
            }
            else {
                QueueTask.checkQueue([QueueType.bindPhoneActiv]);
            }
        });
    };
    /**
     * 绑定手机相关数据
     */
    LobbyDataManager.reqBindInfo = function () {
        HttpRequester.getHttpData(ConfObjRead.getConfUrl().cmd.getBindInfo, this, function (suc, jobj) {
            if (suc) {
                GameData.isGetBindAward = !jobj.receive;
                GameData.bindOpen = jobj.bind;
                GameData.bindAward = jobj.reward;
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
    /**
     * 获取绑定卡相关信息
     */
    LobbyDataManager.getCardInfo = function (caller, callback) {
        var _this = this;
        HttpRequester.getHttpData(ConfObjRead.getConfUrl().cmd.getCardInfo, this, function (suc, jobj) {
            if (suc) {
                Common.cardInfo = jobj;
                if (caller && callback) {
                    callback.call(caller);
                }
            }
            else {
                Common.cardInfo = { enabledAlipayWithdraw: false, hasAlipayCard: false, hasBankCard: false };
            }
            _this.getCardDetailInfo();
        });
    };
    /**
     * 获取未读邮件
     */
    LobbyDataManager.getUnreadMail = function () {
        HttpRequester.getHttpData(ConfObjRead.getConfUrl().cmd.getUnreadMail, this, function (suc, jobj) {
            if (suc) {
                EventManager.dispath(EventType.CHECK_UNREADMAIL, jobj);
            }
        });
    };
    /**
     * 获取银行卡绑定详细信息
     * @param caller
     * @param callback
     */
    LobbyDataManager.getCardDetailInfo = function () {
        HttpRequester.getHttpData(ConfObjRead.getConfUrl().cmd.getbankCardInfo, this, function (suc, jobj) {
            if (suc) {
                var arr = jobj.bankAccounts;
                arr.forEach(function (value) {
                    if (value.bankCode == "ZHB") {
                        Common.alipayInfo = value;
                    }
                    else {
                        Common.bankInfo = value;
                    }
                });
                EventManager.dispath(EventType.GET_BACKCARD_DETAIL);
            }
        });
    };
    return LobbyDataManager;
}());
//# sourceMappingURL=LobbyScene.js.map