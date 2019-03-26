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
    function MoveContent(conf, p) {
        var _this = _super.call(this) || this;
        _this.moveType = Girl.MOVE_TYPE_IN;
        _this.moveDirect = Girl.MOVE_DIRECT_LEFT;
        // public moveEvent:string = Girl.MOVE_EVENT_START;
        _this.id = -1;
        _this.caller = null;
        _this.callback = null;
        _this.bAutogo = false;
        _this.startGoonTime = 0;
        _this.endGoonTime = 0;
        _this.goonSpdX = 0;
        _this.offsetSpdX = 0;
        _this.moveTimes = 0;
        _this.conf = conf;
        _this.parentObj = p;
        return _this;
    }
    MoveContent.prototype.startMoveDrag = function () {
        if (this.bAutogo) {
            Laya.Tween.clearAll(this);
            Laya.timer.clearAll(this);
            this.bAutogo = false;
        }
    };
    MoveContent.prototype.checkShowBg = function () {
        if (this.conf.itembg) {
            Tools.drawRectWithAlpha(this, this.conf.visibleRect.x, this.conf.visibleRect.y, this.width, this.conf.visibleRect.h, this.conf.itembg.color, this.conf.itembg.alpha);
        }
    };
    MoveContent.prototype.setListener = function (id, caller, callback) {
        this.id = id;
        this.caller = caller;
        this.callback = callback;
    };
    MoveContent.prototype.autoSlips = function (direct, spd, timeSum) {
        var v = spd / timeSum;
        var s = v * this.conf.duration;
        var nX = this.x + s;
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
    MoveContent.prototype.autoSlip = function (direct, spd, timeSum) {
        var minx = (this.conf.visibleRect.w - this.width); // - this.conf.minxOffsetX;
        var maxx = 0; // + this.conf.maxxOffsetX;
        var t = this.conf.durationGoon / this.conf.goonLoopDelay;
        var a = this.getA(spd, t);
        var s = this.getS(spd, t, a);
        var nX = this.x + s;
        switch (direct) {
            case MoveContent.MOVE_DIRECT_LEFT:
                if (nX < minx) {
                    nX = minx;
                }
                break;
            case MoveContent.MOVE_DIRECT_RIGHT:
                if (nX > maxx) {
                    nX = maxx;
                }
                break;
        }
        nX = this.isCutIcon(
        // this.x,
        nX, direct);
        s = nX - this.x;
        a = this.getAByS(spd, t, s);
        // Debug.trace("MoveContent.autoSlip spd:"+spd+" t:"+t+" s:"+s+" a:"+a);
        this.moveDirect = direct;
        this.moveType = MoveContent.MOVE_TYPE_SLIP;
        // this.autoGoon(spd,a,this.moveDirect,nX,this.y);
        this.autoGo(nX, this.y, 1);
    };
    MoveContent.prototype.isCutIcon = function (x, direct) {
        //遍历所有图标，找出对应x时，最靠近的一个图标，找出其坐标
        var gp = this.parentObj;
        var ilen = gp.items.length;
        var minDis = 999999;
        var minObj = null;
        var sx = Math.abs(x);
        for (var a = 0; a < ilen; a++) {
            var gi = gp.items[a];
            // var sumx = Math.abs( sx - (gi.x ) );//+ gp.conf.gameitemdefault.btnicon.size.w/2 // + gp.conf.gameitemdefault.pos.x
            var gx = gi.x - (gp.conf.gameitemdefault.btnicon.pos.x + gp.conf.gameitemdefault.pos.x);
            var sumx = gx + x;
            // Debug.trace("MoveContent.isCutIcon x:"+this.x+" ix:"+gi.x+" sumx:"+sumx+" gi:"+gi.data.alias);
            if (direct == MoveContent.MOVE_DIRECT_LEFT) {
                if (sumx > 0 && sumx < minDis) {
                    minDis = sumx;
                    minObj = gi;
                }
            }
            else if (direct == MoveContent.MOVE_DIRECT_RIGHT) {
                var abx = Math.abs(sumx);
                if (sumx <= 0 && abx < minDis) {
                    minDis = abx;
                    minObj = gi;
                }
            }
        }
        // if( minObj != null )
        // {
        //     Debug.trace("MoveContent.isCutIcon x:"+x+" direct:"+direct+" minDis:"+minDis+" minObj:"+minObj.data.alias);
        // }
        // return x;
        var px = (gp.conf.gameitemdefault.btnicon.pos.x + gp.conf.gameitemdefault.pos.x) - minObj.x;
        // Debug.trace("MoveContent.isCutIcon px:"+px);
        return px;
    };
    MoveContent.prototype.getAByS = function (v, t, s1) {
        // var s = Math.abs(s1);
        var s = s1;
        var q = ((s - v * t) * 2);
        var h = (t * t);
        var a = q / h;
        // if( s1 > 0 )
        // {
        //     a = a * -1;
        // }
        // Debug.trace("MoveContent.getAByS v:"+v+" t:"+t+" s:"+s+" a:"+a);
        // var q2 = (( s1 - v*t ) * 2);
        // var h2 = (t*t);
        // var a2 = q2/h2;
        // Debug.trace("MoveContent.getAByS v:"+v+" t:"+t+" s:"+s+" a:"+a+" a2:"+a2);
        return a;
    };
    MoveContent.prototype.getA = function (v, t) {
        var v1 = v;
        //v2 = v1 + at;
        //s = v1*t + (1/2)a*t*t;
        //v2*t*t - v1*v1 = 2*a*s
        var v2 = 0;
        var a = (v2 - v1) / t;
        return a;
    };
    MoveContent.prototype.getS = function (v, t, a) {
        var s = v * t + (1 / 2) * a * t * t;
        return s;
    };
    MoveContent.prototype.autoGoon = function (spdx, a, direct, dx, dy) {
        if (this.bAutogo) {
            return;
        }
        this.bAutogo = true;
        // var minx = (this.conf.visibleRect.w - this.width);// - this.conf.minxOffsetX;
        // var maxx = 0;// + this.conf.maxxOffsetX;
        //启动一个循环
        //目的地
        var destPos = {
            "x": dx,
            "y": dy
        };
        // var t = this.conf.durationGoon/this.conf.goonLoopDelay;
        // var a1 = this.getA(spdx,t);
        // var s1 = this.getS(spdx,t,a1);
        // var dx = this.x + s1;
        // Debug.trace("MoveContent a1:"+a1+" s1:"+s1+" dx:"+dx+" minx:"+minx+" maxx:"+maxx);
        //起止时间
        // this.startGoonTime = Tools.getTime();
        // this.endGoonTime = this.startGoonTime + this.conf.durationGoon;
        this.goonSpdX = spdx;
        //在this.conf.durationGoon时间内，要将spdx降低到0
        //运行次数 = duration/delay
        //每次需要降低的量 = 总量/次数
        // this.offsetSpdX = Math.abs(this.goonSpdX/( this.conf.durationGoon/this.conf.goonLoopDelay ));
        // if( this.offsetSpdX < this.conf.goonOffsetMin )
        // {
        //     this.offsetSpdX = this.conf.goonOffsetMin;
        // }
        // var s = 0;
        // switch(direct)
        // {
        //     case MoveContent.MOVE_DIRECT_LEFT:
        //         if( dx < minx )
        //         {
        //             dx = minx;
        //         }
        //         s = Math.abs( this.x - dx );
        //     break;
        //     case MoveContent.MOVE_DIRECT_RIGHT:
        //         if( dx > maxx )
        //         {
        //             dx = maxx;
        //         }
        //         s = Math.abs( this.x - dx );
        //     break;
        // }
        // var a = this.getAByS(spdx,t,s);
        // Debug.trace("MoveContent.autoGoon s:"+s+" a:"+a+" spdx:"+spdx+" minx:"+minx+" maxx:"+maxx);
        this.offsetSpdX = a;
        // if( this.offsetSpdX < this.conf.goonOffsetMin )
        // {
        //     this.offsetSpdX = this.conf.goonOffsetMin;
        // }
        switch (direct) {
            case MoveContent.MOVE_DIRECT_LEFT:
                if (this.offsetSpdX < 0) {
                    this.offsetSpdX = this.offsetSpdX * -1;
                }
                break;
            case MoveContent.MOVE_DIRECT_RIGHT:
                if (this.offsetSpdX > 0) {
                    this.offsetSpdX = this.offsetSpdX * -1;
                }
                break;
        }
        Debug.trace("MoveContent.autoGoon spd:" + spdx + " a:" + a + " x:" + dx);
        this.moveTimes = 0;
        //启动循环
        Laya.timer.loop(this.conf.goonLoopDelay, this, this.goonMove, [spdx, direct, destPos]);
    };
    MoveContent.prototype.goonMove = function (spdx, direct, destPos) {
        this.moveTimes += 1;
        var minx = (this.conf.visibleRect.w - this.width) - this.conf.minxOffsetX;
        var maxx = 0 + this.conf.maxxOffsetX;
        var minx_ = (this.conf.visibleRect.w - this.width) - this.conf.minxOffsetX;
        var maxx_ = 0 + this.conf.maxxOffsetX;
        var dx = destPos.x;
        var dy = destPos.y;
        //每次进来都要计算一下，当前速度该是多少？
        //移动该速度
        var newX = this.x + this.goonSpdX;
        // this.x += this.goonSpdX;
        this.x = newX;
        this.goonSpdX += this.offsetSpdX;
        // var outX = 0;
        switch (direct) {
            case MoveContent.MOVE_DIRECT_LEFT:
                // outX = this.conf.visibleRect.w - this.width;
                // this.goonSpdX += this.offsetSpdX;
                // this.goonSpdX -= this.offsetSpdX;
                // if( dx < minx )
                if (this.goonSpdX >= 0 || this.x <= dx) {
                    // Debug.trace("MoveContent.goonMove left spdx:"+this.goonSpdX+" a:"+this.offsetSpdX+" x:"+this.x+" moveTimes:"+this.moveTimes);
                    //end
                    this.goonMoveSuc(this.goonSpdX, direct, destPos);
                }
                break;
            case MoveContent.MOVE_DIRECT_RIGHT:
                // outX = 0;
                // this.goonSpdX -= this.offsetSpdX;
                // this.goonSpdX += this.offsetSpdX;
                if (this.goonSpdX <= 0 || this.x >= dx) {
                    // Debug.trace("MoveContent.goonMove right spdx:"+this.goonSpdX+" a:"+this.offsetSpdX+" x:"+this.x+" moveTimes:"+this.moveTimes);
                    //end
                    this.goonMoveSuc(this.goonSpdX, direct, destPos);
                }
                break;
        }
    };
    MoveContent.prototype.goonMoveSuc = function (spdx, direct, destPos) {
        //移动结束
        // Debug.trace("MoveContent.goonMoveSuc");
        this.bAutogo = false;
        Laya.timer.clear(this, this.goonMove);
        this.x = destPos.x;
        //先检查当前坐标，是否超出了允许范围
        var minx = this.conf.visibleRect.w - this.width;
        var maxx = 0;
        if (this.x < minx) {
            //向右回弹到minx
            // this.autoGo(minx,this.y,1);
            // this.autoBack(spdx,direct,minx,this.y,1);
        }
        else if (this.x > maxx) {
            //向左回弹
            // this.autoGo(maxx,this.y,1);
            // this.autoBack(spdx,direct,maxx,this.y,1);
        }
    };
    // public autoBack(spdx:number,direct:string,x:number,y:number,alpha:number):void
    // {
    //     var spd = spdx * -1;
    //     var dis = this.x - x;
    //     Laya.timer.loop(this.conf.goonLoopDelay,this,this.backMove,[spdx,direct,destPos]);
    // }
    MoveContent.prototype.autoGo = function (xs, ys, alphas) {
        if (alphas === void 0) { alphas = 1; }
        if (this.bAutogo) {
            return;
            // Laya.Tween.clearAll(this);
        }
        this.bAutogo = true;
        // Debug.trace("MoveContent.autoGo x:"+xs+" ys:"+ys);
        var tween = Laya.Tween.to(this, {
            x: xs,
            y: ys,
            alpha: alphas
        }, this.conf.duration, Laya.Ease[this.conf.tweenName], new Laya.Handler(this, this.autoMoveSuc));
        if (this.callback && this.caller) {
            this.callback.apply(this.caller, [this, Girl.MOVE_EVENT_START, this.moveType, this.moveDirect]);
        }
    };
    MoveContent.prototype.autoMoveSuc = function () {
        this.bAutogo = false;
        // this.reset();
        if (this.callback && this.caller) {
            this.callback.apply(this.caller, [this, Girl.MOVE_EVENT_END, this.moveType, this.moveDirect]);
        }
    };
    MoveContent.prototype.reset = function () {
        this.bAutogo = false;
        this.pos(this.conf.pos.init.x, this.conf.pos.init.y);
        this.alpha = 1;
    };
    MoveContent.MOVE_TYPE_SLIP = "slip";
    MoveContent.MOVE_TYPE_BACK = "back";
    MoveContent.MOVE_DIRECT_LEFT = "left";
    MoveContent.MOVE_DIRECT_RIGHT = "right";
    MoveContent.MOVE_EVENT_START = "start";
    MoveContent.MOVE_EVENT_END = "end";
    return MoveContent;
}(Laya.Sprite));
//# sourceMappingURL=MoveContent.js.map