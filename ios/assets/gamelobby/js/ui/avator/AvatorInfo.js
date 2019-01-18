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
var AvatorInfo = /** @class */ (function (_super) {
    __extends(AvatorInfo, _super);
    function AvatorInfo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AvatorInfo.prototype.init = function (conf, data, caller, closeCallback) {
        this.conf = conf;
        this.data = data;
        this.caller = caller;
        this.closeCallback = closeCallback;
        this.alphabg = new Laya.Sprite();
        Tools.drawRectWithAlpha(this.alphabg, 0, 0, this.conf.size.w, this.conf.size.h, "#000000", this.conf.mask.alpha);
        this.addChild(this.alphabg);
        this.alphabg.size(this.conf.size.w, this.conf.size.h);
        this.alphabg.pos(-this.conf.pos.x, -this.conf.pos.y);
        this.alphabg.on(Laya.Event.MOUSE_DOWN, this, this.onMouse);
        this.alphabg.on(Laya.Event.MOUSE_UP, this, this.onMouse);
        this.alphabg.on(Laya.Event.MOUSE_MOVE, this, this.onMouse);
        this.bg = new Laya.Sprite();
        this.bg.loadImage(this.conf.bg.src);
        this.bg.pos(this.conf.bg.pos.x, this.conf.bg.pos.y);
        this.addChild(this.bg);
        //如果有注册点
        if (this.conf.bg.pivot) {
            this.bg.pivot(this.conf.bg.pivot.x, this.conf.bg.pivot.y);
        }
        var scx = this.conf.bg.size.w / this.bg.width;
        var scy = this.conf.bg.size.h / this.bg.height;
        this.bg.scale(scx, scy);
        this.lb_content = Tools.newLabel("---", this.conf.lbcontent.size.w, this.conf.lbcontent.size.h, this.conf.lbcontent.font.size, this.conf.lbcontent.font.color, this.conf.lbcontent.font.align, this.conf.lbcontent.font.valign, this.conf.lbcontent.font.name, this.conf.lbcontent.font.wrap);
        if (this.conf.lbcontent.font.borderColor) {
            this.lb_content.borderColor = this.conf.lbcontent.font.borderColor;
        }
        this.addChild(this.lb_content);
        if (this.conf.close) {
            this.close = new MyButton();
            this.close.init(this.conf.close, this, this.onClose);
            this.close.pos(this.conf.close.pos.x, this.conf.close.pos.y);
            this.addChild(this.close);
        }
        this.pos(this.conf.pos.x, this.conf.pos.y);
        // this.setData(data);
        this.requestInfo();
    };
    AvatorInfo.prototype.requestInfo = function () {
        var url = Common.confObj.url.apihome +
            Common.confObj.cmd.userinfo +
            "?access_token=" + Common.access_token;
        LayaMain.getInstance().showCircleLoading(true);
        // MyBBLoading.showPad(this,ConfObjRead.getConfCLoading(),null);
        NetManager.getObj().HttpConnect(url, this, this.responseInfo);
    };
    AvatorInfo.prototype.responseInfo = function (s, stat, hr) {
        /*
        {
            "id": 34649691,
            "username": "shawn002",
            "signInCount": 0,
            "currentSignInAt": "2018-09-18 11:20:57",
            "lastSignInAt": "2018-09-18 10:11:02",
            "currentSignInIp": "192.168.9.6",
            "lastSignInIp": "192.168.9.6",
            "state": "NORMAL",
            "createTime": "2018-09-17 14:46:45",
            "modifyTime": "2018-09-18 11:20:56",
            "agentId": 3,
            "adminId": 31,
            "levelId": 1,
            "levelLock": false,
            "ifStopBetting": false,
            "registerIp": "192.168.9.6",
            "depth": 2,
            "prizeGroup": 1960,
            "role": "PLAYER",
            "loginPlatform": "PC",
            "isSigned": false,
            "keepSignInDays": 0,
            "minMemberPrizeGroup": 1902
        }
        */
        if (stat == "complete") {
            //设置所有参数
            // lamain.sceneRoot.showCircleLoading(false);
            if (MyBBLoading.obj) {
                MyBBLoading.obj.show(false);
            }
            try {
                this.lb_content.text = "id:" + s.id + "\n" +
                    "username:" + s.username + "\n" +
                    "signInCount:" + s.signInCount + "\n" +
                    "currentSignInAt:" + s.currentSignInAt + "\n" +
                    "lastSignInAt:" + s.lastSignInAt + "\n" +
                    "currentSignInIp:" + s.currentSignInIp + "\n" +
                    "lastSignInIp:" + s.lastSignInIp + "\n" +
                    "state:" + s.state + "\n" +
                    "createTime:" + s.createTime + "\n" +
                    "modifyTime:" + s.modifyTime + "\n" +
                    "agentId:" + s.agentId + "\n" +
                    "adminId:" + s.adminId + "\n" +
                    "levelId:" + s.levelId + "\n" +
                    "levelLock:" + s.levelLock + "\n" +
                    "ifStopBetting:" + s.ifStopBetting + "\n" +
                    "registerIp:" + s.registerIp;
            }
            catch (e) {
            }
        }
        else {
            // lamain.sceneRoot.showCircleLoading(false);
            if (MyBBLoading.obj) {
                MyBBLoading.obj.show(false);
            }
            Toast.showToast(s);
        }
    };
    AvatorInfo.prototype.setData = function (data) {
        this.data = data;
        if (this.data && this.data.img) {
            this.setBg(this.data.img);
        }
        if (this.data && this.data.notice) {
            this.lb_content.text = data.notice;
        }
    };
    AvatorInfo.prototype.setBg = function (src) {
        Laya.loader.load(src, new Laya.Handler(this, this.bgLoaded));
    };
    AvatorInfo.prototype.bgLoaded = function (e) {
        this.bg.graphics.clear();
        this.bg.graphics.drawTexture(e, 0, 0, this.bg.width, this.bg.height);
        // this.sp_icon.size(e.width,e.height);
    };
    AvatorInfo.prototype.onMouse = function (e) {
        if (this.conf.touchout) {
            if (this.conf.touchout.value && e.type == Laya.Event.MOUSE_DOWN) {
                this.onClose(null);
            }
        }
    };
    AvatorInfo.prototype.onClose = function (s) {
        Debug.trace('onClose');
        this.showDialog(false);
        this.closeCallback.apply(this.caller, [this]);
    };
    AvatorInfo.prototype.showDialog = function (b) {
        this.visible = b;
    };
    return AvatorInfo;
}(Laya.Sprite));
//# sourceMappingURL=AvatorInfo.js.map