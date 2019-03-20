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
var RoomItem = /** @class */ (function (_super) {
    __extends(RoomItem, _super);
    function RoomItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.lastR = 10;
        _this.stepR = 10;
        _this.nowStartAngle = 0;
        _this.stepAngle = 30;
        _this.maxR = 1139;
        return _this;
    }
    RoomItem.prototype.init = function (conf, gp) {
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
        this.icon_src = this.conf.btnicon.src[0];
        if (this.conf.showbg) {
            Tools.drawRectWithAlpha(this.btn_icon, 0, 0, this.conf.btnicon.size.w, this.conf.btnicon.size.h, this.conf.showbg.color, this.conf.showbg.alpha);
        }
    };
    RoomItem.prototype.setIcon = function (src) {
        this.icon_src = src;
        var srcs = Tools.getCurDirPath(src);
        this.iconLoaded(srcs, "");
    };
    RoomItem.prototype.iconLoaded = function (res, s) {
        try {
            this.btn_icon.setRes([res]);
        }
        catch (e) { }
    };
    RoomItem.prototype.onClickItem = function (e) {
        if (!this.btn_icon.bclick) {
            return;
        }
        Common.roomId = this.data.id;
        Common.wsUrl = this.data.url;
        if (this.conf.sfx) {
            Laya.SoundManager.playSound(this.conf.sfx);
        }
        if (Common.canGoinGame(this.data)) {
            var url = this.panel.gamedata.url;
            Tools.jump2game(url);
        }
        else {
            RechargeHintPad.showPad(null, this, this.closeRecharge);
        }
    };
    RoomItem.prototype.closeRecharge = function () {
        this.setEnable(true);
    };
    RoomItem.prototype.setData = function (dt, id) {
        this.data = dt;
        try {
            this.setIcon(this.conf.iconsrc[id]);
        }
        catch (e) { }
        this.setEnable(true);
    };
    RoomItem.prototype.setEnable_ = function (b) {
        if (this.data) {
            if (this.data.state == "NORMAL") {
                this.btn_icon.bclick = b;
            }
            else {
                Tools.setSpriteGrayFilter(this.btn_icon);
                this.btn_icon.bclick = false;
            }
        }
        else {
            this.btn_icon.bclick = b;
        }
    };
    RoomItem.prototype.setEnable = function (b) {
        if (this.data.state == "NORMAL") {
            this.btn_icon.bclick = b;
            this.showStatus();
        }
        else {
            this.showGray();
            if (!this.sp_pause) {
                try {
                    this.sp_pause = Tools.addSprite(this, this.conf.statePause);
                }
                catch (e) { }
            }
            this.btn_icon.bclick = false;
        }
    };
    RoomItem.prototype.showGray = function () {
        var n = Tools.getFileNameExt(this.icon_src);
        var src = n.name + this.conf.btnicon.grayext + n.ext;
        var srcs = Tools.getCurDirPath(src);
        this.iconLoaded(srcs, "");
    };
    RoomItem.prototype.showStatus = function () {
        if (this.conf.statusNormal && !this.sp_status) {
            var status = -1;
            if (this.data.iBusy) {
                status = this.data.iBusy;
            }
            if (status >= 0) {
                this.sp_status = new Laya.Sprite();
                this.sp_status.loadImage(this.conf.statusNormal.status[status]);
                this.sp_status.pos(this.conf.statusNormal.pos.x, this.conf.statusNormal.pos.y);
                this.addChild(this.sp_status);
            }
        }
    };
    return RoomItem;
}(Laya.Sprite));
//# sourceMappingURL=RoomItem.js.map