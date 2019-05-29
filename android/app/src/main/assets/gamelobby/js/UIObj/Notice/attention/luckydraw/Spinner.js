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
var Spinner = /** @class */ (function (_super) {
    __extends(Spinner, _super);
    function Spinner() {
        var _this = _super.call(this) || this;
        _this._lbl = [];
        _this.amts = [];
        _this._light0 = [];
        _this._light1 = [];
        _this._lighttime = 200;
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
            label.text = "0";
        }
        this._lite = Tools.addSprite(this, $config.light);
        this._lite.visible = false;
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
            i % 2 === 0 ? this._light0.push(light) : this._light1.push(light);
        }
        this.currIdx = 0;
        this.currIdx = -1;
        this.isstop = true;
    };
    Spinner.prototype.setData = function ($data) {
        for (var i = 0; i < $data.prizeLevelList.length; i++) {
            this._lbl[i].text = $data.prizeLevelList[i].toString();
        }
        this.amts = $data.prizeLevelList.concat();
        this.reqPt = $data.requiredPoints;
    };
    Spinner.prototype.setResult = function (data) {
        var idx = [];
        for (var i = 0; i < this.amts.length; i++) {
            if (this.amts[i] === data.prizeAmount) {
                idx.push(i);
            }
        }
        idx = shuffle(idx);
        function shuffle(array) {
            var currentIndex = array.length;
            var temporaryValue, randomIndex;
            // While there remain elements to shuffle...
            while (0 !== currentIndex) {
                // Pick a remaining element...
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex -= 1;
                // And swap it with the current element.
                temporaryValue = array[currentIndex];
                array[currentIndex] = array[randomIndex];
                array[randomIndex] = temporaryValue;
            }
            return array;
        }
        this.currIdx = idx[0];
    };
    Spinner.prototype.onClick = function ($e) {
        this.event("startSpin", this);
    };
    Spinner.prototype.start = function () {
        this.isstop = false;
        this._btn.setEnabled(false);
        this._lite.visible = false;
        this.spincounter = 3;
        this.startSpin();
        Laya.timer.once(0, this, this.startlights, [this._light0], false);
        Laya.timer.once(this._lighttime, this, this.startlights, [this._light1], false);
    };
    Spinner.prototype.startSpin = function () {
        var r = this._cont.rotation === 0 ? 0 : this._cont.rotation + (360 - this._cont.rotation);
        r += 360;
        var time = (r * 1000) / 360;
        Laya.Tween.to(this._cont, { rotation: r }, time, Laya.Ease.linearNone, Laya.Handler.create(this, function () {
            this._cont.rotation = 0;
            if (this.spincounter <= 0 && this.currIdx > -1) {
                this.stopSpin();
            }
            else {
                this.startSpin();
            }
        }));
        this.spincounter--;
    };
    Spinner.prototype.startlights = function ($lights) {
        for (var i = 0; i < $lights.length; i++) {
            $lights[i].visible = true;
        }
        Laya.timer.once(this._lighttime, this, this.stoplights, [$lights], false);
    };
    Spinner.prototype.stoplights = function ($lights) {
        for (var i = 0; i < $lights.length; i++) {
            $lights[i].visible = false;
        }
        if (this.isstop)
            return;
        Laya.timer.once(this._lighttime, this, this.startlights, [$lights], false);
    };
    Spinner.prototype.stopSpin = function () {
        var target = this.currIdx + 8;
        var r = this._cont.rotation + ((target * 360) / 8);
        var time = (r * 1000) / 360;
        time += 2500;
        Laya.Tween.to(this._cont, { rotation: r }, time, Laya.Ease.cubicOut, Laya.Handler.create(this, function () {
            this._cont.rotation = r % 360;
            this.event("stopSpin");
            this._btn.setEnabled(true);
            this._lite.visible = true;
            this.currIdx = -1;
            this.isstop = true;
        }));
    };
    return Spinner;
}(Laya.Sprite));
//# sourceMappingURL=Spinner.js.map