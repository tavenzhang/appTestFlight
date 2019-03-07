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
        //超过一定比例之后，自动弹
        if (this.iMovePercent >= this.confCommon.autoPercent) {
            //区分当前移动方向的左右
            var px = 0, py = 0;
            if (direct == 1) {
                //右移
                px = this.confCommon.right.x + this.pinit.x;
                py = this.confCommon.right.y + this.pinit.y;
            }
            else if (direct == -1) {
                //左移
                px = this.confCommon.left.x + this.pinit.x;
                py = this.confCommon.left.y + this.pinit.y;
            }
            this.autoGo(px, py);
        }
    };
    //自动移动出去
    Girl.prototype.autoGo = function (x, y) {
        var tween = Laya.Tween.to(this, {
            x: x,
            y: y,
            alpha: 0
        }, this.confCommon.duration, Laya.Ease["circOut"], new Laya.Handler(this, this.autoMoveSuc));
    };
    //弹出动画播放完毕，恢复到初始位置
    Girl.prototype.autoMoveSuc = function () {
        this.reset();
    };
    //重设该角色
    Girl.prototype.reset = function () {
        this.iMovePercent = 0;
        this.pos(this.pinit.x, this.pinit.y);
        this.curMove = 0;
        this.alpha = 1;
    };
    return Girl;
}(Laya.Sprite));
//# sourceMappingURL=Girl.js.map