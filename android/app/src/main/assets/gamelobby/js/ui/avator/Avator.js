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
var Avator = /** @class */ (function (_super) {
    __extends(Avator, _super);
    function Avator() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.bRequestStatus = 1; //当前网络请求状态 1=未请求，0=成功，-1=出错
        _this.isFlushMoney = false;
        return _this;
    }
    Avator.getInstance = function (node, conf, caller, callback) {
        if (node === void 0) { node = null; }
        if (conf === void 0) { conf = null; }
        if (caller === void 0) { caller = null; }
        if (callback === void 0) { callback = null; }
        if (!Avator.obj && node != null && conf != null && caller != null && callback != null) {
            var a = new Avator();
            a.init(conf, caller, callback);
            node.addChild(a);
        }
        return Avator.obj;
    };
    Avator.prototype.destroy = function (b) {
        Avator.obj = null;
        _super.prototype.destroy.call(this, b);
    };
    Avator.prototype.init = function (conf, caller, callback) {
        this.conf = conf;
        Avator.obj = this;
        this.bRequestStatus = 1;
        this.caller = caller;
        this.callback = callback;
        //背景
        this.initBg(this.conf.bg);
        //头像及名字
        this.initHeadIcon(this.conf.headicon);
        //当前金币、钻石
        // this.initDiamonIcon( this.conf.diamonicon );
        this.initCoinIcon(this.conf.coinicon);
        this.pos(this.conf.hidepos.x, this.conf.hidepos.y);
        // this.pos(this.conf.pos.x, this.conf.pos.y);
        this.startRequest();
    };
    Avator.prototype.startRequest = function () {
        //请求用户信息
        this.requestUserInfo(ConfObjRead.getConfUrl().url.apihome +
            ConfObjRead.getConfUrl().cmd.userinfobalance +
            "?access_token=" + Common.access_token);
    };
    Avator.prototype.flushUserInfo = function () {
        //请求用户信息
        this.isFlushMoney = true;
        this.requestUserInfo(ConfObjRead.getConfUrl().url.apihome +
            ConfObjRead.getConfUrl().cmd.userinfobalance +
            "?access_token=" + Common.access_token);
    };
    Avator.prototype.initCoinIcon = function (conf) {
        if (!conf) {
            return;
        }
        this.coinIcon = new CoinIcon();
        this.coinIcon.init(conf);
        this.addChild(this.coinIcon);
    };
    Avator.prototype.initDiamonIcon = function (conf) {
        if (!conf) {
            return;
        }
        this.diamonIcon = new DiamonIcon();
        this.diamonIcon.init(conf);
        this.addChild(this.diamonIcon);
    };
    Avator.prototype.initHeadIcon = function (conf) {
        if (!conf) {
            return;
        }
        this.headIcon = new HeadIcon();
        this.headIcon.init(conf, this, this.onClickAvator);
        this.addChild(this.headIcon);
    };
    Avator.prototype.initBg = function (conf) {
        if (!conf) {
            return;
        }
        // var bg = new Laya.Sprite();
        // bg.loadImage(this.conf.bg.src);
        // bg.pos(this.conf.bg.pos.x,this.conf.bg.pos.y);
        var bg = Tools.newSprite(conf);
        this.addChild(bg);
        if (conf.anim) {
            var anim = new MyBoneAnim();
            anim.init(conf.anim);
            this.addChild(anim);
            anim.playAnim(0, true);
            // anim.pos(conf.anim.pos.x,conf.anim.pos.y);
        }
    };
    //点击头像
    Avator.prototype.onClickAvator = function (e) {
        // if( this.conf.headicon.sound )
        // {
        //     Laya.SoundManager.playSound( this.conf.headicon.sound.src );
        // }
        // Debug.trace('onClickAvator:');
        // Debug.trace(e);
        // LayaMain.getInstance().showAvatorInfo(e);
        // AvatorPad.showPad(LobbyScene.getInstance());
        // AccountCenter.showPad(LobbyScene.getInstance());
        AccountCenter.showPad(Laya.stage);
    };
    Avator.prototype.requestUserInfo = function (url) {
        this.bRequestStatus = 1;
        // Debug.trace("Avator.requestUserInfo show");
        if (!this.isFlushMoney) {
            LayaMain.getInstance().showCircleLoading();
        }
        // MyBBLoading.showPad(Laya.stage,ConfObjRead.getConfCLoading(),null);
        var header = [
            // "Content-Type","application/json",
            // "Accept","*/*"
            "Accept", "application/json"
        ];
        NetManager.getObj().HttpConnect(url, this, this.responseUserInfo, header, null, "get", "json");
    };
    Avator.prototype.responseUserInfo = function (s, stat) {
        // Debug.trace("responseUserInfo stat:"+stat);
        // Debug.trace(s);
        if (stat == "complete") {
            //设置所有参数
            Common.userInfo = s;
            // Debug.trace("ResponseUserInfo:");
            // Debug.trace(Common.userInfo);
            Common.setLoginPlatform(s.loginPlatform);
            //有了用户信息，还要通过一个新接口获得用户头像及昵称
            if (!this.isFlushMoney) {
                this.requestUserAvator(ConfObjRead.getConfUrl().url.apihome +
                    ConfObjRead.getConfUrl().cmd.avatorget +
                    "?access_token=" + Common.access_token);
            }
            else {
                this.coinIcon.setData(Common.userInfo);
            }
        }
        else {
            // if( MyBBLoading.obj )
            // {
            //     MyBBLoading.obj.show(false);
            // }
            this.bRequestStatus = -1;
            // Debug.trace("responseUserInfo err:");
            // Debug.trace(s);
            // Toast.showToast(s);
            // this.scrollOutOk();
            // this.scrollOut();
        }
        // if( MyBBLoading.obj )
        // {
        //     MyBBLoading.obj.show(false);
        // }
        // Debug.trace("response userInfo:"+stat);
        // Debug.trace(s);
    };
    Avator.prototype.requestUserAvator = function (url) {
        // Debug.trace("Avator.requestUserAvator show");
        LayaMain.getInstance().showCircleLoading();
        // MyBBLoading.showPad(Laya.stage,ConfObjRead.getConfCLoading(),null);
        var header = [
            // "Content-Type","application/json",
            // "Accept","*/*"
            "Accept", "application/json"
        ];
        // Debug.trace("requestUserAvator url:"+url);
        NetManager.getObj().HttpConnect(url, this, this.responseUserAvator, header, null, "get", "json");
    };
    Avator.prototype.responseUserAvator = function (s, stat, hr) {
        // Debug.trace("responseUserAvator stat:"+stat);
        // Debug.trace(s);
        if (stat == "complete") {
            // Debug.trace("responseUserAvator:");
            // Debug.trace(s);
            Common.userInfo.avatorInfo = s;
            //这里先设定用户头像
            //先从本地存档中提取,没有的时候才用昵称转
            // var tempId = Tools.transNickname2id(Common.userInfo.username);
            var tempId = Common.userInfo.avatorInfo.avatar;
            if (!tempId) //没有头像，默认05
             {
                //没有值
                //提取存档？
                // var aId = SaveManager.getObj().get(
                //         SaveManager.KEY_AVATOR_ID,tempId);
                tempId = "05"; //Tools.transNickname2id(Common.userInfo.username);
            }
            //有了头像
            tempId = Tools.FormatNumber(parseInt(tempId), 2);
            Common.userInfo.avatorId = tempId;
            var aId = SaveManager.getObj().get(SaveManager.KEY_AVATOR_ID, tempId);
            // Debug.trace('avator avatorId:'+Common.userInfo.avatorId);
            // Debug.trace('avator aId:'+aId);
            this.headIcon.setData(Common.userInfo);
            if (this.diamonIcon) {
                this.diamonIcon.setData(Common.userInfo);
            }
            if (this.coinIcon) {
                this.coinIcon.setData(Common.userInfo);
            }
            this.scrollOut();
            this.bRequestStatus = 0;
            LayaMain.getInstance().requestEnd(stat, "");
        }
        else {
            // Debug.trace("responseUserAvator err:");
            // Debug.trace(s);
            // Toast.showToast(s);
            this.bRequestStatus = -1;
            LayaMain.getInstance().requestEnd(stat, s);
            // this.scrollOutOk();
            // this.scrollOut();
        }
        // if( MyBBLoading.obj )
        // {
        //     MyBBLoading.obj.show(false);
        // }
    };
    Avator.prototype.scrollOut = function () {
        var xIn = this.conf.pos.x;
        var yIn = this.conf.pos.y;
        // Debug.trace("scrollOut x:"+xIn+" yIn:"+yIn);
        var tween = Laya.Tween.to(this, {
            x: xIn,
            y: yIn
        }, this.conf.duration, Laya.Ease["backIn"], new Laya.Handler(this, this.scrollOutOk));
    };
    Avator.prototype.scrollOutOk = function () {
        // Debug.trace('Avatorr scrollOutOk');
        //滚动进来之后，告知主界面构造游戏图标
        // sceneRoot.initGameIcon();
        if (this.caller && this.callback) {
            this.callback.apply(this.caller, [this]);
        }
    };
    Avator.obj = null;
    return Avator;
}(Laya.Sprite));
//# sourceMappingURL=Avator.js.map