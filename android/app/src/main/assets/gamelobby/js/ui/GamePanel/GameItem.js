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
var GameItem = /** @class */ (function (_super) {
    __extends(GameItem, _super);
    function GameItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.sStatus = GameItem.STATUS_NORMAL;
        _this.iUpdateProgress = 0;
        _this.bInUpdate = false;
        _this.lastR = 10;
        _this.stepR = 10;
        _this.nowStartAngle = 0;
        _this.stepAngle = 30;
        _this.maxR = 1139;
        _this.px = 0;
        return _this;
    }
    GameItem.prototype.init = function (conf, gp) {
        this.conf = conf;
        this.panel = gp;
        this.lastR = this.conf.lastR;
        this.stepR = this.conf.stepR;
        this.nowStartAngle = this.conf.nowStartAngle;
        this.stepAngle = this.conf.stepAngle;
        this.maxR = this.conf.maxR;
        this.btn_icon = new MyButton();
        this.btn_icon.init(this.conf.btnicon, this, this.onClickItem);
        this.btn_icon.pos(this.conf.btnicon.pos.x, this.conf.btnicon.pos.y);
        this.addChild(this.btn_icon);
        this.btn_icon.bclick = false;
        if (this.conf.name) {
            this.lb_name = Tools.newLabel(this.conf.name.font.text, this.conf.name.size.w, this.conf.name.size.h, this.conf.name.font.size, this.conf.name.font.color, this.conf.name.font.align, this.conf.name.font.valign, this.conf.name.font.name, this.conf.name.font.wordwrap);
            if (this.conf.name.font.borderColor) {
                this.lb_name.borderColor = this.conf.name.font.borderColor;
            }
            this.lb_name.pos(this.conf.name.pos.x, this.conf.name.pos.y);
            this.addChild(this.lb_name);
        }
        if (this.conf.hot) {
            this.sp_hot = Tools.addSprite(this, this.conf.hot);
            this.setHot(false);
        }
        this.sp_pie = new Laya.Sprite();
        this.sp_pie.pos(0, 0);
        this.addChild(this.sp_pie);
        this.size(this.conf.btnicon.size.w, this.conf.btnicon.size.h);
        this.pivot(this.conf.btnicon.size.w / 2, this.conf.btnicon.size.h / 2);
        if (this.conf.showbg) {
            var showbg = new Laya.Sprite();
            this.addChild(showbg);
            Tools.drawRectWithAlpha(showbg, this.x, this.y, this.conf.btnicon.size.w, this.conf.btnicon.size.h, this.conf.showbg.color, this.conf.showbg.alpha);
        }
    };
    GameItem.prototype.getGraySrc = function (src) {
        var n = Tools.getFileNameExt(src);
        var srcDest = n.name + this.conf.btnicon.grayext + n.ext;
        return srcDest;
    };
    GameItem.prototype.showGray = function () {
        var srcs = this.getGraySrc(this.icon_src);
        this.iconLoaded(srcs, null);
    };
    GameItem.prototype.setIcon = function (src) {
        this.icon_src = src;
        var srcs = src;
        this.iconLoaded(srcs, null);
    };
    GameItem.prototype.iconLoaded = function (res, s) {
        res = Tools.isHaveHeadPoint(".", res, 1);
        try {
            this.btn_icon.setRes([res]);
        }
        catch (e) { }
    };
    GameItem.prototype.setName = function (name) {
        if (this.lb_name) {
            this.lb_name.text = name;
        }
    };
    GameItem.prototype.onMouseEventX = function (e) {
        switch (e.type) {
            case Laya.Event.MOUSE_DOWN:
                this.downPos = { x: e.stageX, y: e.stageY };
                break;
            case Laya.Event.MOUSE_MOVE:
                break;
            case Laya.Event.MOUSE_OUT:
                this.downPos = null;
                break;
            case Laya.Event.MOUSE_UP:
                if (this.downPos) {
                    var upPos = { x: e.stageX, y: e.stageY };
                    if (Tools.isClick(this.downPos, upPos)) {
                        this.onClickItem();
                    }
                }
                break;
        }
    };
    GameItem.prototype.onClickItem = function () {
        // Debug.trace("GameItem.onClickItem this.sStatus:"+this.sStatus);
        switch (this.sStatus) {
            case GameItem.STATUS_PAUSE:
            case GameItem.STATUS_COMING:
                break;
            case GameItem.STATUS_ONLINE:
                this.onLaunchGame();
                break;
            case GameItem.STATUS_UPDATE:
                this.onStartUpdate();
                break;
            default:
                this.onLaunchGame();
                break;
        }
    };
    GameItem.prototype.onLaunchGame = function () {
        Common.gameId = this.data.id;
        Common.wsUrl = this.data.url;
        if (this.conf.sfx) {
            Laya.SoundManager.playSound(this.conf.sfx);
        }
        if (this.data.jumpUrl) {
            if (!this.btn_icon.bclick) {
                return;
            }
            this.btn_icon.bclick = false;
            var url = this.data.url;
            Tools.jump2game(url);
        }
        else {
            if (this.conf.actionOnClick) {
                LayaMain.getInstance().initRoom(this.data);
            }
        }
    };
    GameItem.prototype.setData = function (dt) {
        this.data = dt;
        this.icon_src = this.data.icon;
        if (this.data.state == "NORMAL") {
            this.sStatus = GameItem.STATUS_NORMAL;
        }
        else if (this.data.state == "PAUSE") {
            this.sStatus = GameItem.STATUS_PAUSE;
        }
        else if (this.data.state == "EXPECTATION") {
            this.sStatus = GameItem.STATUS_COMING;
        }
        var src = ConfObjRead.getGameIconSrcByAlias(this.data.alias);
        if (src) {
            this.setIcon(src);
        }
        this.setName(dt.name);
        this.initAnim();
        this.setHot(dt.bhot);
        this.px = this.x;
    };
    GameItem.prototype.setHot = function (b) {
        this.sp_hot.visible = b;
    };
    GameItem.prototype.initAnim = function () {
        this.animConf = ConfObjRead.getGameIconAnimByAlias(this.data.alias);
        if (this.animConf && !this.sp_anim) {
            this.sp_anim = new MyBoneAnim();
            this.sp_anim.init(this.animConf);
            this.addChild(this.sp_anim);
            this.sp_anim.playAnim(0, true);
        }
    };
    GameItem.prototype.setEnable = function (b) {
        if (this.data.state == "NORMAL") {
            this.btn_icon.alpha = this.animConf.dAlpha;
            this.btn_icon.setEnabled(true);
            // Debug.trace("GameItem.setEnable b:"+b+" this.btn_icon.alpha:"+this.btn_icon.alpha);
        }
        else {
            this.sp_anim.alpha = 0;
            this.showGray();
            this.showPause();
        }
    };
    GameItem.prototype.imMove_ = function (nx) {
        this.px += nx;
        if (this.px >= this.conf.btnicon.pos.x) {
            this.x = this.px;
        }
        else {
        }
        if (this.px < this.conf.btnicon.pos.x) {
            var totalw = this.conf.btnicon.size.scaleW + this.conf.btnicon.pos.x;
            var dis = this.px - this.conf.btnicon.pos.x;
            var minusZ = totalw - Math.abs(dis);
            var scaleP = minusZ / totalw;
            var alphaP = scaleP;
            this.scale(scaleP, scaleP);
            this.alpha = alphaP;
        }
        else {
            if (this.scaleX != 1) {
                this.scale(1, 1);
            }
            if (this.alpha != 1) {
                this.alpha = 1;
            }
        }
    };
    GameItem.prototype.imMove = function (nx) {
        this.px += nx;
        this.x = this.px;
    };
    GameItem.prototype.showUpdateBtn = function () {
        if (!this.sp_Update) {
            this.sp_Update = Tools.addSprite(this, this.conf.spupdate);
        }
    };
    GameItem.prototype.showProgressText = function () {
        if (!this.lb_update) {
            this.lb_update = Tools.addLabels(this, this.conf.updateText);
        }
    };
    GameItem.prototype.showPause = function () {
        if (!this.sp_pause) {
            var conf;
            if (this.data.state == "PAUSE") {
                conf = this.conf.statePause;
            }
            else if (this.data.state == "EXPECTATION") {
                conf = this.conf.stateComing;
            }
            try {
                this.sp_pause = Tools.newSprite(conf);
                this.addChild(this.sp_pause);
            }
            catch (e) { }
        }
    };
    GameItem.prototype.refreshStatus = function () {
        switch (this.sStatus) {
            case GameItem.STATUS_COMING:
                this.showPause();
                break;
            case GameItem.STATUS_NORMAL:
                this.sp_anim.alpha = 1;
                this.sp_anim.visible = true;
                this.btn_icon.alpha = this.animConf.dAlpha;
                this.btn_icon.setEnabled(true);
                // Debug.trace("GameItem.refreshStatus NORMAL btn_icon.alpha:"+this.btn_icon.alpha);
                break;
            case GameItem.STATUS_PAUSE:
                this.showPause();
                break;
            case GameItem.STATUS_UPDATE:
                this.showUpdateBtn();
                break;
        }
    };
    GameItem.prototype.setStatus = function (st) {
        this.sStatus = st;
        this.refreshStatus();
    };
    GameItem.prototype.onStartUpdate = function (bPost) {
        if (bPost === void 0) { bPost = true; }
        if (this.bInUpdate) {
            return;
        }
        this.bInUpdate = true;
        this.iUpdateProgress = 0.0;
        if (this.sp_anim) {
            this.sp_anim.visible = false;
        }
        // Debug.trace("GameItem.onStartUpdate show btn_icon 0");
        if (this.btn_icon) {
            this.btn_icon.setEnabled(false);
            this.btn_icon.alpha = 1;
            this.btn_icon.visible = true;
            // Debug.trace("GameItem.onStartUpdate show btn_icon");
        }
        if (this.sp_Update) {
            this.sp_Update.visible = false;
        }
        this.showProgressText();
        this.refreshUpdateProgress();
        if (bPost) {
            PostMHelp.startUpdate({ "gameId": this.data.id, "alias": this.data.alias });
        }
    };
    GameItem.prototype.onUpdateProgress = function (n) {
        // Debug.trace("GameItem.onUpdateProgress n:"+n+" bInUpdate:"+this.bInUpdate+" status:"+this.sStatus);
        if (this.sStatus != GameItem.STATUS_UPDATE || !this.bInUpdate) {
            this.setStatus(GameItem.STATUS_UPDATE);
            this.onStartUpdate(false);
        }
        this.iUpdateProgress = n;
        this.refreshUpdateProgress();
    };
    GameItem.prototype.refreshUpdateProgress = function () {
        var nowHei = this.iUpdateProgress * this.btn_icon.height;
        var lastHei = this.btn_icon.height - nowHei;
        this.renderPercent(nowHei, lastHei);
        if (this.lb_update) {
            var pct = this.iUpdateProgress * 100;
            var spct = Tools.FormatFloatNumber(pct, 2);
            this.lb_update.text = this.conf.updateText.font.pretext + spct + this.conf.updateText.font.endtext;
        }
        if (this.iUpdateProgress >= 1) {
            if (this.lb_update) {
                this.removeChild(this.lb_update);
                this.lb_update.destroy(true);
                this.lb_update = null;
            }
            this.setStatus(GameItem.STATUS_NORMAL);
            this.bInUpdate = false;
            UpdateMsgHandle.clearInfoByAlias(this.data.alias);
        }
    };
    GameItem.prototype.renderPercent = function (bottomH, topH) {
        var btn = this.btn_icon.btn_ui;
        var texLight = Laya.loader.getRes(this.icon_src);
        var src_gray = this.getGraySrc(this.icon_src);
        var texGray = Laya.loader.getRes(src_gray);
        var xGray = 0;
        var yGray = 0;
        var wGray = btn.width;
        var hGray = topH;
        var xLight = 0;
        var yLight = topH;
        var wLight = btn.width;
        var hLight = bottomH;
        btn.graphics.clear();
        btn.graphics.save();
        btn.graphics.clipRect(xGray, yGray, wGray, hGray);
        btn.graphics.drawTexture(texGray);
        btn.graphics.restore();
        btn.graphics.save();
        btn.graphics.clipRect(xLight, yLight, wLight, hLight);
        btn.graphics.drawTexture(texLight);
        btn.graphics.restore();
    };
    GameItem.STATUS_UPDATE = "update";
    GameItem.STATUS_PAUSE = "pause";
    GameItem.STATUS_NORMAL = "normal";
    GameItem.STATUS_COMING = "coming";
    GameItem.STATUS_ONLINE = "online";
    return GameItem;
}(Laya.Sprite));
//# sourceMappingURL=GameItem.js.map