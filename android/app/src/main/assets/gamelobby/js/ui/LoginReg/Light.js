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
var Light = /** @class */ (function (_super) {
    __extends(Light, _super);
    function Light() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.status = 0;
        return _this;
    }
    Light.prototype.init = function (conf) {
        this.conf = conf;
        // Debug.trace("Star.init");
        // Debug.trace(this.conf);
        // Debug.trace("Star.init rd:"+rd+" conf:");
        // Debug.trace(starconf);
        this.sp_light = Tools.addSprite(this, this.conf.sp);
        this.sp_light.pivot(this.conf.sp.pivot.x, this.conf.sp.pivot.y);
        this.sp_light.rotation = this.conf.angleInit;
        this.status = this.conf.initdirect;
        Laya.timer.loop(this.conf.delay, this, this.shine);
        this.pos(this.conf.pos.x, this.conf.pos.y);
    };
    Light.prototype.shine = function () {
        switch (this.status) {
            case 0:
                //
                this.sp_light.rotation -= this.conf.anglespd;
                if (this.sp_light.rotation <= this.conf.angleStart) {
                    this.status = 1;
                }
                break;
            case 1:
                this.sp_light.rotation += this.conf.anglespd;
                if (this.sp_light.rotation >= this.conf.angleEnd) {
                    this.status = 0;
                }
                break;
        }
    };
    return Light;
}(Laya.Sprite));
//# sourceMappingURL=Light.js.map