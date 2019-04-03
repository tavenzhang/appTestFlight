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
var MyDragSwitch = /** @class */ (function (_super) {
    __extends(MyDragSwitch, _super);
    function MyDragSwitch() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.bclick = true;
        _this.iSwitchId = 0;
        return _this;
    }
    MyDragSwitch.prototype.init = function (conf, caller, callback) {
        this.conf = conf;
        this.caller = caller;
        this.btnCallback = callback;
        if (this.conf.bg) {
            this.btn_ui = new MySprite();
            this.btn_ui.loadImage(this.conf.bg.src);
            this.btn_ui.pos(this.conf.bg.pos.x, this.conf.bg.pos.y);
            this.addChild(this.btn_ui);
            if (this.bclick) {
                this.btn_ui.on(Laya.Event.CLICK, this, this.onBtnClick);
                // this.btn_ui.on(Laya.Event.MOUSE_DOWN, this, this.onBtnDown);
                // this.btn_ui.on(Laya.Event.MOUSE_UP, this, this.onBtnUp);
                // this.btn_ui.on(Laya.Event.MOUSE_OUT, this, this.onBtnOut);
                // this.btn_ui.on(Event.MOUSE_MOVE, this, this.onBtnMove);
            }
        }
        if (this.conf.drag) {
            this.btn_drag = Tools.newSprite(this.conf.drag);
            this.addChild(this.btn_drag);
        }
        this.pos(this.conf.pos.x, this.conf.pos.y);
        this.setOn(1, false);
    };
    MyDragSwitch.prototype.onBtnClick = function (s) {
        if (this.bclick) {
            this.switchChange();
            this.btnCallback.apply(this.caller, [this]);
            if (this.conf.sfx) {
                Laya.SoundManager.playSound(this.conf.sfx);
            }
        }
    };
    MyDragSwitch.prototype.isOn = function () {
        return this.iSwitchId;
    };
    MyDragSwitch.prototype.setOn = function (n, banim) {
        if (banim === void 0) { banim = false; }
        this.iSwitchId = n;
        // Debug.trace('setOn n:'+n);
        if (n == 0) {
            if (banim) {
                this.moveDragTo(this.conf.drag.posoff);
            }
            else {
                this.btn_drag.pos(this.conf.drag.posoff.x, this.conf.drag.posoff.y);
            }
        }
        else {
            if (banim) {
                this.moveDragTo(this.conf.drag.pos);
            }
            else {
                this.btn_drag.pos(this.conf.drag.pos.x, this.conf.drag.pos.y);
            }
        }
    };
    MyDragSwitch.prototype.moveDragTo = function (pos) {
        var tween = Laya.Tween.to(this.btn_drag, {
            x: pos.x,
            y: pos.y
        }, this.conf.duration, Laya.Ease["backIn"] //,
        // new Laya.Handler(this,this.scrollOutOk)
        );
    };
    MyDragSwitch.prototype.switchChange = function () {
        if (this.iSwitchId == 0) {
            this.iSwitchId = 1;
        }
        else {
            this.iSwitchId = 0;
        }
        this.setOn(this.iSwitchId);
    };
    return MyDragSwitch;
}(MySprite));
//# sourceMappingURL=MyDragSwitch.js.map