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
        _this.bRequestStatus = 1;
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
        Debug.trace("Avator.init bRequestStatus:" + this.bRequestStatus);
        this.caller = caller;
        this.callback = callback;
        this.initBg(this.conf.bg);
        this.initHeadIcon(this.conf.headicon);
        this.initCoinIcon(this.conf.coinicon);
        this.pos(this.conf.hidepos.x, this.conf.hidepos.y);
        // this.pos(this.conf.pos.x, this.conf.pos.y);
        this.startRequest();
    };
    Avator.prototype.startRequest = function () {
        this.requestUserInfo(ConfObjRead.getConfUrl().url.apihome +
            ConfObjRead.getConfUrl().cmd.userinfobalance +
            "?access_token=" + Common.access_token);
    };
    Avator.prototype.flushUserInfo = function () {
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
        var bg = Tools.newSprite(conf);
        this.addChild(bg);
        if (conf.anim) {
            var anim = new MyBoneAnim();
            anim.init(conf.anim);
            this.addChild(anim);
            anim.playAnim(0, true);
        }
    };
    Avator.prototype.onClickAvator = function (e) {
        AccountCenter.showPad(LayaMain.getInstance().getRootNode());
    };
    Avator.prototype.requestUserInfo = function (url) {
        this.bRequestStatus = 1;
        Debug.trace("Avator.requestUserInfo bRequestStatus:" + this.bRequestStatus);
        if (!this.isFlushMoney) {
            LayaMain.getInstance().showCircleLoading();
        }
        var header = [
            // "Content-Type","application/json",
            // "Accept","*/*"
            "Accept", "application/json"
        ];
        NetManager.getObj().HttpConnect(url, this, this.responseUserInfo, header, null, "get", "json");
    };
    Avator.prototype.responseUserInfo = function (s, stat) {
        if (stat == "complete") {
            Common.userInfo = s;
            Common.setLoginPlatform(s.loginPlatform);
            // if( !this.isFlushMoney )
            // {
            this.requestUserAvator(ConfObjRead.getConfUrl().url.apihome +
                ConfObjRead.getConfUrl().cmd.avatorget +
                "?access_token=" + Common.access_token);
            // }else{
            //      this.coinIcon.setData(Common.userInfo);
            // }
        }
        else {
            this.bRequestStatus = -1;
            Debug.trace("Avator.responseUserInfo bRequestStatus:" + this.bRequestStatus);
        }
    };
    Avator.prototype.requestUserAvator = function (url) {
        LayaMain.getInstance().showCircleLoading();
        var header = [
            // "Content-Type","application/json",
            // "Accept","*/*"
            "Accept", "application/json"
        ];
        // Debug.trace("requestUserAvator url:"+url);
        NetManager.getObj().HttpConnect(url, this, this.responseUserAvator, header, null, "get", "json");
    };
    Avator.prototype.responseUserAvator = function (s, stat, hr) {
        Debug.trace("Avator.responseUserAvator stat:" + stat);
        Debug.trace(s);
        if (stat == "complete") {
            // Debug.trace("responseUserAvator:");
            // Debug.trace(s);
            Common.userInfo.avatorInfo = s;
            var tempId = Common.userInfo.avatorInfo.avatar;
            if (!tempId) {
                tempId = "05";
            }
            tempId = Tools.FormatNumber(parseInt(tempId), 2);
            Common.userInfo.avatorId = tempId;
            var aId = SaveManager.getObj().get(SaveManager.KEY_AVATOR_ID, tempId);
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
            this.bRequestStatus = -1;
            LayaMain.getInstance().requestEnd(stat, s);
        }
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
        if (this.caller && this.callback) {
            this.callback.apply(this.caller, [this]);
        }
    };
    Avator.obj = null;
    return Avator;
}(MySprite));
//# sourceMappingURL=Avator.js.map