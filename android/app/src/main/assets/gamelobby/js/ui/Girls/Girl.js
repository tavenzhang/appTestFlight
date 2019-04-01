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
var Girl = /** @class */ (function (_super) {
    __extends(Girl, _super);
    function Girl(conf, confCommon) {
        var _this = _super.call(this) || this;
        _this.iMovePercent = 0;
        _this.curMove = 0;
        _this.moveType = Girl.MOVE_TYPE_IN;
        _this.moveDirect = Girl.MOVE_DIRECT_LEFT;
        _this.bAutogo = false;
        _this.id = -1;
        _this.caller = null;
        _this.callback = null;
        _this.conf = conf;
        _this.confCommon = confCommon;
        _this.init();
        return _this;
    }
    Girl.prototype.init = function () {
        if (this.conf.bg) {
            this.initBg(this.conf.bg);
        }
        if (this.conf.gg) {
            var sp_icon = Tools.addSprite(this, this.conf.gg);
        }
        if (this.conf.front) {
            this.initFront(this.conf.front);
        }
    };
    Girl.prototype.setListener = function (id, caller, callback) {
        this.id = id;
        this.caller = caller;
        this.callback = callback;
    };
    Girl.prototype.initBg = function (conf) {
        if (!conf) {
            return;
        }
        // var sp_bg = Tools.addSprite(this,conf);
        if (conf.anim) {
            var anim = new MyBoneAnim();
            anim.init(conf.anim);
            this.addChild(anim);
            anim.playAnim(0, true);
        }
    };
    Girl.prototype.initFront = function (conf) {
        if (!conf) {
            return;
        }
        // var sp_ft = Tools.addSprite(this,conf);
        if (conf.anim) {
            var anim = new MyBoneAnim();
            anim.init(conf.anim);
            this.addChild(anim);
            anim.playAnim(0, true);
        }
    };
    Girl.prototype.initPos = function (x, y) {
        this.pinit = {
            "x": x,
            "y": y
        };
        this.pos(x, y);
    };
    Girl.prototype.refreshMoveState = function (movex, direct) {
        var max = this.confCommon.maxMoveX;
        this.curMove += movex;
        var curAbs = Math.abs(this.curMove);
        this.iMovePercent = curAbs / max;
        this.alpha = 1 - this.iMovePercent;
        this.moveDirect = direct;
        if (this.iMovePercent >= this.confCommon.autoPercent) {
            var px = 0, py = 0;
            var sfx = "";
            if (direct == Girl.MOVE_DIRECT_RIGHT) {
                px = this.confCommon.right.x + this.pinit.x;
                py = this.confCommon.right.y + this.pinit.y;
                if (this.confCommon.sfxright) {
                    sfx = this.confCommon.sfxright;
                }
            }
            else if (direct == Girl.MOVE_DIRECT_LEFT) {
                px = this.confCommon.left.x + this.pinit.x;
                py = this.confCommon.left.y + this.pinit.y;
                if (this.confCommon.sfxleft) {
                    sfx = this.confCommon.sfxleft;
                }
            }
            this.moveType = Girl.MOVE_TYPE_OUT;
            if (sfx.length > 0) {
                Laya.SoundManager.playSound(sfx);
            }
            this.autoGo(px, py, 0);
        }
    };
    Girl.prototype.moveIn = function (direct) {
        var startPos;
        switch (direct) {
            case Girl.MOVE_DIRECT_LEFT:
                startPos = this.confCommon.right;
                break;
            case Girl.MOVE_DIRECT_RIGHT:
            default:
                startPos = this.confCommon.left;
                break;
        }
        this.moveDirect = direct;
        this.moveType = Girl.MOVE_TYPE_IN;
        // Debug.trace("Girl.moveIn id:"+this.id+" autoGo start startPos x:"+startPos.x+" y:"+startPos.y);
        this.pos(startPos.x, startPos.y);
        this.alpha = 0;
        this.visible = true;
        this.autoGo(this.pinit.x, this.pinit.y, 1);
    };
    Girl.prototype.moveBack = function () {
        switch (this.moveDirect) {
            case Girl.MOVE_DIRECT_LEFT:
                this.moveDirect = Girl.MOVE_DIRECT_RIGHT;
                break;
            case Girl.MOVE_DIRECT_RIGHT:
                this.moveDirect = Girl.MOVE_DIRECT_LEFT;
                break;
        }
        this.moveType = Girl.MOVE_TYPE_BACK;
        this.autoGo(this.pinit.x, this.pinit.y, 1);
    };
    Girl.prototype.autoGo = function (xs, ys, alphas) {
        if (this.bAutogo) {
            return;
        }
        this.bAutogo = true;
        // Debug.trace("Girl.autoGo id:"+this.id+" x:"+xs+" y:"+ys+" alpha:"+alphas);
        var tween = Laya.Tween.to(this, {
            x: xs,
            y: ys,
            alpha: alphas
        }, this.confCommon.duration, Laya.Ease[this.confCommon.tweenName], new Laya.Handler(this, this.autoMoveSuc));
        // Debug.trace("Girl.autoGo id:"+this.id+" tween:");
        // Debug.trace(tween);
        if (this.callback && this.caller) {
            this.callback.apply(this.caller, [this, Girl.MOVE_EVENT_START, this.moveType, this.moveDirect]);
        }
    };
    Girl.prototype.autoMoveSuc = function () {
        this.bAutogo = false;
        // this.reset();
        if (this.callback && this.caller) {
            this.callback.apply(this.caller, [this, Girl.MOVE_EVENT_END, this.moveType, this.moveDirect]);
        }
    };
    Girl.prototype.reset = function () {
        this.bAutogo = false;
        this.iMovePercent = 0;
        this.pos(this.pinit.x, this.pinit.y);
        this.curMove = 0;
        this.alpha = 1;
    };
    Girl.MOVE_TYPE_OUT = "out";
    Girl.MOVE_TYPE_IN = "in";
    Girl.MOVE_TYPE_BACK = "back";
    Girl.MOVE_DIRECT_LEFT = "left";
    Girl.MOVE_DIRECT_RIGHT = "right";
    Girl.MOVE_EVENT_START = "start";
    Girl.MOVE_EVENT_END = "end";
    return Girl;
}(Laya.Sprite));
//# sourceMappingURL=Girl.js.map