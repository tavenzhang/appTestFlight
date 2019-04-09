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
var VersionStat = /** @class */ (function (_super) {
    __extends(VersionStat, _super);
    function VersionStat() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.iClickNum = 0;
        return _this;
    }
    VersionStat.getInstance = function (node, conf) {
        if (!VersionStat.obj) {
            var a = new VersionStat();
            a.init(conf);
            node.addChild(a);
        }
        return VersionStat.obj;
    };
    VersionStat.prototype.destroy = function (b) {
        VersionStat.obj = null;
        _super.prototype.destroy.call(this, b);
    };
    VersionStat.prototype.init = function (conf) {
        this.conf = conf;
        this.sp_bg = Tools.addSprite(this, this.conf.bg);
        this.lb_v = Tools.addLabels(this, this.conf.label);
        if (ConfObjRead.getConfCommon().btest) {
            this.lb_v.on(Laya.Event.CLICK, this, this.onClickVersion);
        }
        this.pos(this.conf.pos.x, this.conf.pos.y);
    };
    VersionStat.prototype.onClickVersion = function (e) {
        // Debug.trace("AccountCenter.onClickBg "+this.iClickNum);
        this.iClickNum += ConfObjRead.getConfCommon().btest.stepAdd;
        if (this.iClickNum >= ConfObjRead.getConfCommon().btest.totalNum) {
            this.iClickNum = 0;
            try {
                window["initVconsole"]();
            }
            catch (e) { }
        }
        Laya.timer.clear(this, this.clearClick);
        Laya.timer.once(ConfObjRead.getConfCommon().btest.delayTime, this, this.clearClick);
    };
    VersionStat.prototype.clearClick = function () {
        this.iClickNum = 0;
    };
    VersionStat.obj = null;
    return VersionStat;
}(MySprite));
//# sourceMappingURL=VersionStat.js.map