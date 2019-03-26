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
        _this.moveType = Girl.MOVE_TYPE_IN; //移动类型
        _this.moveDirect = Girl.MOVE_DIRECT_LEFT; //移动方向
        _this.bAutogo = false; //是否处于自动弹
        _this.id = -1;
        _this.caller = null;
        _this.callback = null;
        _this.conf = conf;
        _this.confCommon = confCommon;
        _this.init();
        return _this;
    }
    Girl.prototype.init = function () {
        //背景
        if (this.conf.bg) {
            this.initBg(this.conf.bg);
        }
        if (this.conf.gg) {
            var sp_icon = Tools.addSprite(this, this.conf.gg);
        }
        //前景
        if (this.conf.front) {
            this.initFront(this.conf.front);
        }
    };
    //设置侦听
    Girl.prototype.setListener = function (id, caller, callback) {
        this.id = id;
        this.caller = caller;
        this.callback = callback;
    };
    //初始化背景
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
    //前景
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
    //刷新当前的移动状态
    Girl.prototype.refreshMoveState = function (movex, direct) {
        //最大移动
        var max = this.confCommon.maxMoveX;
        //当前移动量
        this.curMove += movex;
        var curAbs = Math.abs(this.curMove);
        //当前移动量所占百分比
        this.iMovePercent = curAbs / max;
        //当前的alpha值修改
        this.alpha = 1 - this.iMovePercent;
        //当前的移动方向
        this.moveDirect = direct;
        //超过一定比例之后，自动弹
        if (this.iMovePercent >= this.confCommon.autoPercent) {
            //区分当前移动方向的左右
            var px = 0, py = 0;
            var sfx = "";
            if (direct == Girl.MOVE_DIRECT_RIGHT) {
                //右移
                px = this.confCommon.right.x + this.pinit.x;
                py = this.confCommon.right.y + this.pinit.y;
                if (this.confCommon.sfxright) {
                    sfx = this.confCommon.sfxright;
                }
            }
            else if (direct == Girl.MOVE_DIRECT_LEFT) {
                //左移
                px = this.confCommon.left.x + this.pinit.x;
                py = this.confCommon.left.y + this.pinit.y;
                if (this.confCommon.sfxleft) {
                    sfx = this.confCommon.sfxleft;
                }
            }
            this.moveType = Girl.MOVE_TYPE_OUT;
            //播放滑动音效
            if (sfx.length > 0) {
                Laya.SoundManager.playSound(sfx);
            }
            this.autoGo(px, py, 0);
        }
    };
    //移入
    Girl.prototype.moveIn = function (direct) {
        //将此对象设定到起点
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
        //将移动的alpha设定为0
        this.alpha = 0;
        this.visible = true;
        //开始移动
        this.autoGo(this.pinit.x, this.pinit.y, 1);
    };
    //回去
    Girl.prototype.moveBack = function () {
        //当前的移动方向
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
    //自动移动出去
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
        //通知管理，我现在开始自动弹了，不要再控制了
        if (this.callback && this.caller) {
            this.callback.apply(this.caller, [this, Girl.MOVE_EVENT_START, this.moveType, this.moveDirect]);
        }
    };
    //弹出动画播放完毕，恢复到初始位置
    Girl.prototype.autoMoveSuc = function () {
        this.bAutogo = false;
        // this.reset();
        if (this.callback && this.caller) {
            this.callback.apply(this.caller, [this, Girl.MOVE_EVENT_END, this.moveType, this.moveDirect]);
        }
    };
    //重设该角色
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