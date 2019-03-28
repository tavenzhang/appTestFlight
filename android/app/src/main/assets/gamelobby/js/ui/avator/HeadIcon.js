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
var HeadIcon = /** @class */ (function (_super) {
    __extends(HeadIcon, _super);
    function HeadIcon() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HeadIcon.refreshAvator = function () {
        if (HeadIcon.obj) {
            HeadIcon.obj.setIconById(Common.userInfo.avatorId);
        }
    };
    HeadIcon.prototype.init = function (conf, caller, callback) {
        HeadIcon.obj = this;
        this.conf = conf;
        this.caller = caller;
        this.callback = callback;
        if (this.conf.iconframe) {
            this.initIconFrame(this.conf.iconframe);
        }
        if (this.conf.lbname) {
            this.initLbName(this.conf.lbname);
        }
        this.btn_icon = new MyButton();
        this.btn_icon.init(this.conf.btnicon, this, this.callback);
        this.btn_icon.pos(this.conf.btnicon.pos.x, this.conf.btnicon.pos.y);
        this.addChild(this.btn_icon);
        if (this.conf.name) {
            this.initUserName(this.conf.name);
        }
        this.pos(this.conf.pos.x, this.conf.pos.y);
    };
    HeadIcon.prototype.initIconFrame = function (conf) {
        var sp = Tools.newSprite(this.conf.iconframe);
        this.addChild(sp);
    };
    HeadIcon.prototype.initLbName = function (conf) {
        var sp = Tools.newSprite(conf);
        this.addChild(sp);
    };
    HeadIcon.prototype.initUserId = function (conf) {
    };
    HeadIcon.prototype.initUserName = function (conf) {
        this.lb_name = Tools.newLabel("---", conf.size.w, conf.size.h, conf.font.size, conf.font.color, conf.font.align, conf.font.valign, conf.font.name, conf.font.wordwrap);
        if (conf.font.borderColor) {
            this.lb_name.borderColor = conf.font.borderColor;
        }
        this.lb_name.pos(conf.pos.x, conf.pos.y);
        this.addChild(this.lb_name);
    };
    HeadIcon.prototype.setData = function (dt) {
        this.data = dt;
        var name = dt.username;
        if (dt.nickname) {
            name = dt.nickname;
        }
        this.setName(name);
        var strHeaderIndex = dt.avatorId;
        this.setIcon(this.conf.picnamehead + strHeaderIndex + this.conf.picnameend);
    };
    HeadIcon.prototype.setIcon = function (src) {
        Laya.loader.load(src, new Laya.Handler(this, this.iconLoaded, [src]));
    };
    HeadIcon.prototype.setIconById = function (id) {
        // Debug.trace("HeadIcon setIconById:"+id);
        this.setIcon(this.conf.picnamehead + id + this.conf.picnameend);
    };
    HeadIcon.prototype.iconLoaded = function (src, e) {
        this.btn_icon.setRes([src]);
    };
    HeadIcon.prototype.setName = function (name) {
        if (this.lb_name) {
            var showTxt = name;
            if (this.conf.bStarName) {
                showTxt = Tools.starString(name, "****");
            }
            this.lb_name.text = showTxt;
        }
    };
    return HeadIcon;
}(Laya.Sprite));
//# sourceMappingURL=HeadIcon.js.map