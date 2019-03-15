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
var MoveContent = /** @class */ (function (_super) {
    __extends(MoveContent, _super);
    function MoveContent(conf) {
        var _this = _super.call(this) || this;
        _this.moveType = Girl.MOVE_TYPE_IN; //移动类型
        _this.moveDirect = Girl.MOVE_DIRECT_LEFT; //移动方向
        // public moveEvent:string = Girl.MOVE_EVENT_START; //移动类型
        _this.id = -1;
        _this.caller = null;
        _this.callback = null;
        _this.bAutogo = false; //是否处于自动弹
        //开始滑动的时间
        _this.startGoonTime = 0;
        _this.endGoonTime = 0;
        _this.goonSpdX = 0;
        _this.offsetSpdX = 0; //速度递减量
        _this.conf = conf;
        return _this;
    }
    //开始移动拖拉
    MoveContent.prototype.startMoveDrag = function () {
        //如果当前在动画中，立刻停掉
        if (this.bAutogo) {
            //关闭所有缓动
            Laya.Tween.clearAll(this);
            //停止滑行定时器
            Laya.timer.clearAll(this);
            this.bAutogo = false;
        }
    };
    MoveContent.prototype.checkShowBg = function () {
        if (this.conf.itembg) {
            Tools.drawRectWithAlpha(this, this.conf.visibleRect.x, this.conf.visibleRect.y, this.width, this.conf.visibleRect.h, this.conf.itembg.color, this.conf.itembg.alpha);
        }
    };
    //设置侦听
    MoveContent.prototype.setListener = function (id, caller, callback) {
        this.id = id;
        this.caller = caller;
        this.callback = callback;
    };
    //自动继续滑动
    MoveContent.prototype.autoSlips = function (direct, spd, timeSum) {
        //计算出目的地 s = vt
        var v = spd / timeSum;
        var s = v * this.conf.duration;
        // Debug.trace("MoveContent.autoSlip s:"+s+" spd:"+spd+" time:"+timeSum+" v:"+v);
        //当前坐标及宽度
        // Debug.trace("x:"+this.x+" w:"+this.width);
        var nX = this.x + s;
        //检查该自动移动目的地点，是否已超过内容层可移动范围？
        //当前最大坐标就是0，最小坐标就是总宽度与可视区域的差值
        var minx = this.conf.visibleRect.w - this.width;
        if (nX > 0) {
            nX = 0;
        }
        else if (nX <= minx) {
            nX = minx;
        }
        this.moveDirect = direct;
        this.moveType = MoveContent.MOVE_TYPE_SLIP;
        this.autoGo(nX, this.y, 1);
    };
    //自动滑行，按原方向，原速度，逐渐减速
    MoveContent.prototype.autoSlip = function (direct, spd, timeSum) {
        //计算出目的地 s = vt
        var v = spd / timeSum;
        var s = v * this.conf.duration; //spd * this.conf.fps;
        // Debug.trace("MoveContent.autoSlip s:"+s+" spd:"+spd+" time:"+timeSum+" v:"+v);
        //当前坐标及宽度
        // Debug.trace("x:"+this.x+" w:"+this.width);
        var nX = this.x + s;
        //检查该自动移动目的地点，是否已超过内容层可移动范围？
        //当前最大坐标就是0，最小坐标就是总宽度与可视区域的差值
        // var minx = this.conf.visibleRect.w - this.width;
        // if( nX > 0 )
        // {
        //     nX = 0;
        // }else if( nX <= minx ){
        //     nX = minx;
        // }
        this.moveDirect = direct;
        this.moveType = MoveContent.MOVE_TYPE_SLIP;
        // this.autoGo(nX,this.y,1);
        //自动滑行动画
        this.autoGoon(spd, this.moveDirect, nX, this.y);
    };
    //自动继续滑行
    MoveContent.prototype.autoGoon = function (spdx, direct, dx, dy) {
        if (this.bAutogo) {
            return;
        }
        this.bAutogo = true;
        //启动一个循环
        //目的地
        var destPos = {
            "x": dx,
            "y": dy
        };
        //起止时间
        this.startGoonTime = Tools.getTime();
        this.endGoonTime = this.startGoonTime + this.conf.durationGoon;
        this.goonSpdX = spdx;
        //在this.conf.durationGoon时间内，要将spdx降低到0
        //运行次数 = duration/delay
        //每次需要降低的量 = 总量/次数
        this.offsetSpdX = Math.abs(this.goonSpdX / (this.conf.durationGoon / this.conf.goonLoopDelay));
        if (this.offsetSpdX < this.conf.goonOffsetMin) {
            this.offsetSpdX = this.conf.goonOffsetMin;
        }
        // Debug.trace("MoveContent.autoGoon offsetX:"+this.offsetSpdX);
        //启动循环
        Laya.timer.loop(this.conf.goonLoopDelay, this, this.goonMove, [spdx, direct, destPos]);
    };
    //继续滑动,目标位置，持续时间
    MoveContent.prototype.goonMove = function (spdx, direct, destPos) {
        var minx = (this.conf.visibleRect.w - this.width) - this.conf.minxOffsetX;
        var maxx = 0 + this.conf.maxxOffsetX;
        //每次进来都要计算一下，当前速度该是多少？
        //移动该速度
        var newX = this.x + this.goonSpdX;
        // this.x += this.goonSpdX;
        this.x = newX;
        // var outX = 0;
        switch (direct) {
            case MoveContent.MOVE_DIRECT_LEFT:
                // outX = this.conf.visibleRect.w - this.width;
                this.goonSpdX += this.offsetSpdX;
                if (this.goonSpdX >= 0 || this.x <= minx) {
                    //end
                    this.goonMoveSuc(direct);
                }
                break;
            case MoveContent.MOVE_DIRECT_RIGHT:
                // outX = 0;
                this.goonSpdX -= this.offsetSpdX;
                if (this.goonSpdX <= 0 || this.x >= maxx) {
                    //end
                    this.goonMoveSuc(direct);
                }
                break;
        }
    };
    //继续滑动完成，启动回弹
    MoveContent.prototype.goonMoveSuc = function (direct) {
        //移动结束
        // Debug.trace("MoveContent.goonMoveSuc");
        this.bAutogo = false;
        Laya.timer.clear(this, this.goonMove);
        //先检查当前坐标，是否超出了允许范围
        var minx = this.conf.visibleRect.w - this.width;
        var maxx = 0;
        if (this.x < minx) {
            //向右回弹到minx
            this.autoGo(minx, this.y, 1);
        }
        else if (this.x > maxx) {
            //向左回弹
            this.autoGo(maxx, this.y, 1);
        }
    };
    //自动移动出去
    MoveContent.prototype.autoGo = function (xs, ys, alphas) {
        if (alphas === void 0) { alphas = 1; }
        if (this.bAutogo) {
            return;
            //在弹的过程中，立刻清除所有动画效果
            // Laya.Tween.clearAll(this);
        }
        this.bAutogo = true;
        var tween = Laya.Tween.to(this, {
            x: xs,
            y: ys,
            alpha: alphas
        }, this.conf.duration, Laya.Ease[this.conf.tweenName], new Laya.Handler(this, this.autoMoveSuc));
        //通知管理，我现在开始自动弹了，不要再控制了
        if (this.callback && this.caller) {
            this.callback.apply(this.caller, [this, Girl.MOVE_EVENT_START, this.moveType, this.moveDirect]);
        }
    };
    //弹出动画播放完毕，恢复到初始位置
    MoveContent.prototype.autoMoveSuc = function () {
        this.bAutogo = false;
        // this.reset();
        if (this.callback && this.caller) {
            this.callback.apply(this.caller, [this, Girl.MOVE_EVENT_END, this.moveType, this.moveDirect]);
        }
    };
    //重设该角色
    MoveContent.prototype.reset = function () {
        this.bAutogo = false;
        this.pos(this.conf.pos.init.x, this.conf.pos.init.y);
        this.alpha = 1;
    };
    MoveContent.MOVE_TYPE_SLIP = "slip"; //继续滑动
    MoveContent.MOVE_TYPE_BACK = "back";
    MoveContent.MOVE_DIRECT_LEFT = "left";
    MoveContent.MOVE_DIRECT_RIGHT = "right";
    MoveContent.MOVE_EVENT_START = "start";
    MoveContent.MOVE_EVENT_END = "end";
    return MoveContent;
}(Laya.Sprite));
//# sourceMappingURL=MoveContent.js.map