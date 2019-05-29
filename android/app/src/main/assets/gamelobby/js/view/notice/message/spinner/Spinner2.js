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
var Spinner2 = /** @class */ (function (_super) {
    __extends(Spinner2, _super);
    function Spinner2() {
        var _this = _super.call(this) || this;
        _this.prizes = [];
        _this.currIdx = 0;
        _this._lighttime = 200;
        _this.lastRot = 0;
        _this.basetime = 1000;
        return _this;
    }
    Spinner2.prototype.setData = function ($spinner, $data) {
        var spinner = this.spinner = $spinner;
        spinner.light.visible = false;
        spinner.light0.visible = false;
        spinner.light1.visible = false;
        spinner.btn_up.visible = true;
        spinner.btn_down.visible = false;
        spinner.btn_up.on(Laya.Event.MOUSE_DOWN, this, this.onClick);
        spinner.btn_down.on(Laya.Event.MOUSE_UP, this, this.onClick);
        spinner.on(Laya.Event.MOUSE_UP, this, this.onClick);
        spinner.on(Laya.Event.MOUSE_OUT, this, this.onClick);
        this.prizes = $data.prizeLevelList;
        this.reqPt = $data.requiredPoints;
        var c = 0;
        for (var i = this.prizes.length - 1; i > -1; i--) {
            var tf = $spinner.spinnerbg.getChildByName("amount" + c);
            tf.text = this.prizes[i];
            c++;
        }
        this.isActive = false;
        this.currIdx = -1;
    };
    Spinner2.prototype.setResult = function ($data) {
        var idx = [];
        for (var i = 0; i < this.prizes.length; i++) {
            if (this.prizes[i] === $data.prizeAmount) {
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
        // if length is 0, theres not identical result in reel
        if (idx.length > 0) {
            this.currIdx = idx[0];
        }
        else {
            this.currIdx = -1;
        }
    };
    Spinner2.prototype.onClick = function ($e) {
        if (this.isActive)
            return;
        if ($e.type === Laya.Event.MOUSE_DOWN) {
            this.spinner.btn_up.visible = false;
            this.spinner.btn_down.visible = true;
        }
        else if ($e.type === Laya.Event.MOUSE_UP) {
            if ($e.currentTarget === this.spinner.btn_down) {
                this.event("reqSpin", this);
                // this.start();
                // this.setResult({ prizeAmount: 4 });
            }
            this.spinner.btn_up.visible = true;
            this.spinner.btn_down.visible = false;
        }
        else if ($e.type === Laya.Event.MOUSE_OUT) {
            this.spinner.btn_up.visible = true;
            this.spinner.btn_down.visible = false;
        }
    };
    Spinner2.prototype.start = function () {
        this.isActive = true;
        this.spinner.btn_up.mouseEnabled = false;
        this.spinner.light.visible = false;
        this.spinner.light0.visible = false;
        this.spinner.light1.visible = false;
        this.counter = 3;
        this.startSpin();
        this.lightUp(this.spinner.light0);
        Laya.timer.once(this._lighttime, this, this.lightUp, [this.spinner.light1], false);
    };
    Spinner2.prototype.lightUp = function ($light) {
        $light.visible = true;
        Laya.timer.once(this._lighttime, this, this.lightOff, [$light], false);
    };
    Spinner2.prototype.lightOff = function ($light) {
        $light.visible = false;
        if (this.isActive) {
            Laya.timer.once(this._lighttime, this, this.lightUp, [$light], false);
        }
    };
    Spinner2.prototype.startSpin = function () {
        var r = this.lastRot + 360;
        Laya.Tween.to(this.spinner.spinnerbg, { rotation: r }, this.basetime, Laya.Ease.linearNone, Laya.Handler.create(this, function () {
            this.spinner.spinnerbg.rotation = this.lastRot;
            if (this.counter <= 0 && this.currIdx > -1) {
                this.stopSpin();
            }
            else {
                this.startSpin();
            }
        }));
        this.counter--;
    };
    Spinner2.prototype.stopSpin = function () {
        var target = this.currIdx + 1;
        var r = this.spinner.spinnerbg.rotation + ((target * 360) / 8) + 360;
        var time = (r * this.basetime) / 360;
        time += 2500;
        Laya.Tween.to(this.spinner.spinnerbg, { rotation: r }, time, Laya.Ease.cubicOut, Laya.Handler.create(this, function () {
            this.spinner.spinnerbg.rotation = r % 360;
            this.event("stopSpin");
            this.spinner.btn_up.mouseEnabled = true;
            this.spinner.light.visible = true;
            this.currIdx = -1;
            this.lastRot = r % 360;
            this.isActive = false;
        }));
    };
    Spinner2.prototype.show = function () {
        this.spinner.visible = true;
    };
    Spinner2.prototype.hide = function () {
        this.spinner.visible = false;
    };
    return Spinner2;
}(Laya.EventDispatcher));
//# sourceMappingURL=Spinner2.js.map