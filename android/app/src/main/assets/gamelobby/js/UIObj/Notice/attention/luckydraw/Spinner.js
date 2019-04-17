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
var Spinner = /** @class */ (function (_super) {
    __extends(Spinner, _super);
    function Spinner() {
        var _this = _super.call(this) || this;
        _this._lbl = [];
        _this._light = [];
        _this.currIdx = 0;
        return _this;
    }
    Spinner.prototype.init = function ($config) {
        this._cont = new Laya.Sprite();
        this.addChild(this._cont);
        this._base = Tools.addSprite(this._cont, $config.base);
        this._base.pivot(this._base.width / 2, this._base.height / 2);
        this._cont.pivot($config.container.pivot.x, $config.container.pivot.y);
        this._cont.pos($config.container.pos.x, $config.container.pos.y);
        for (var i = 0; i < 8; i++) {
            var label = Tools.addLabels(this._cont, $config.label);
            this._lbl.push(label);
            label.x = this._base.x;
            label.y = this._base.y;
            label.pivot($config.label.pivot.x, $config.label.pivot.y);
            label.rotation = (360 / 8) * i;
            label.text = (i * 100).toString();
        }
        this._frame = Tools.addSprite(this, $config.frame);
        this._pointer = Tools.addSprite(this, $config.pointer);
        this._btn = new MyButton();
        this._btn.init($config.button, this, this.onClick);
        this._btn.pos($config.button.pos.x, $config.button.pos.y);
        this.addChild(this._btn);
        var lights = $config.lights;
        for (var i = 0; i < lights.pos.length; i++) {
            var light = new Laya.Sprite();
            light.loadImage(lights.src);
            light.pos(lights.pos[i][0], lights.pos[i][1]);
            this.addChild(light);
            light.visible = false;
            this._light.push(light);
        }
        this.currIdx = 0;
    };
    Spinner.prototype.onClick = function ($e) {
        this.event("startSpin");
        this.spincounter = 3;
        this.startSpin();
    };
    Spinner.prototype.startSpin = function () {
        var r = this._cont.rotation === 0 ? 0 : this._cont.rotation + (360 - this._cont.rotation);
        r += 360;
        var time = (r * 1000) / 360;
        Laya.Tween.to(this._cont, { rotation: r }, time, Laya.Ease.linearNone, Laya.Handler.create(this, function () {
            this._cont.rotation = 0;
            if (this.spincounter <= 0) {
                this.stopSpin();
            }
            else {
                this.startSpin();
            }
        }));
        this.spincounter--;
    };
    Spinner.prototype.stopSpin = function () {
        this.currIdx = 2;
        var target = this.currIdx + 8;
        var r = this._cont.rotation + ((target * 360) / 8);
        var time = (r * 1000) / 360;
        time += 1000;
        Laya.Tween.to(this._cont, { rotation: r }, time, Laya.Ease.linearOut, Laya.Handler.create(this, function () {
            this._cont.rotation = r % 360;
            this.event("stopSpin");
        }));
    };
    return Spinner;
}(Laya.Sprite));
//# sourceMappingURL=Spinner.js.map