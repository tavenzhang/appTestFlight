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
var Shining = /** @class */ (function (_super) {
    __extends(Shining, _super);
    function Shining() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Shining.prototype.init = function (conf) {
        this.conf = conf;
        // Debug.trace("Shining.init");
        // Debug.trace(this.conf.stars);
        this.arr_star = new Array();
        for (var i = 0; i < this.conf.stars.length; i++) {
            var starc = this.conf.stars[i];
            // Debug.trace("Shining for starconf:");
            // Debug.trace(starc);
            var a = new Star();
            a.init(starc);
            this.addChild(a);
            this.arr_star.push(a);
        }
        this.arr_light = new Array();
        for (var i = 0; i < this.conf.light.length; i++) {
            var lightc = this.conf.light[i];
            // Debug.trace("Shining for starconf:");
            // Debug.trace(starc);
            var b = new Light();
            b.init(lightc);
            this.addChild(b);
            this.arr_light.push(b);
        }
        this.pos(this.conf.pos.x, this.conf.pos.y);
    };
    return Shining;
}(Laya.Sprite));
//# sourceMappingURL=Shining.js.map