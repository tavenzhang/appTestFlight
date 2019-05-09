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
var MoveDirect;
(function (MoveDirect) {
    MoveDirect[MoveDirect["left"] = 0] = "left";
    MoveDirect[MoveDirect["right"] = 1] = "right";
    MoveDirect[MoveDirect["up"] = 2] = "up";
    MoveDirect[MoveDirect["down"] = 3] = "down";
})(MoveDirect || (MoveDirect = {}));
var TimeFlag;
(function (TimeFlag) {
    TimeFlag[TimeFlag["moveNormal"] = 0] = "moveNormal";
    TimeFlag[TimeFlag["moveBack"] = 1] = "moveBack";
    TimeFlag[TimeFlag["timeCount"] = 2] = "timeCount";
})(TimeFlag || (TimeFlag = {}));
var OutFlag;
(function (OutFlag) {
    OutFlag[OutFlag["out_left"] = 0] = "out_left";
    OutFlag[OutFlag["out_right"] = 1] = "out_right";
    OutFlag[OutFlag["out_up"] = 2] = "out_up";
    OutFlag[OutFlag["out_down"] = 3] = "out_down";
    OutFlag[OutFlag["inside"] = 4] = "inside";
    OutFlag[OutFlag["unRoll"] = 5] = "unRoll";
})(OutFlag || (OutFlag = {}));
/*
* 触摸滑动容器
* @jerryjiang
*/
var DragingBox = /** @class */ (function (_super) {
    __extends(DragingBox, _super);
    //end-get/set--------------------------------------------------
    /**
     *
     * @param rect x,y表示当前容器的位置，w,h表示滚动区域大小
     * @param xMove 是否设置为x方向滑动
     */
    function DragingBox(rect, xMove) {
        if (xMove === void 0) { xMove = true; }
        var _this = _super.call(this) || this;
        _this.cbox = new Laya.Sprite();
        _this.maxStayTime = 4; //最大停留时间
        _this.minSpeed = 1; //最小速度
        _this.maxSpeed = 50; //最大速度
        _this.addSpeed = 50; //速度增量
        _this.friction = 0.92; //摩檫力(越接近1，摩檫力越小)
        _this.borderFriction = 0.16; //边界阻力,值越小，在边界拖动就越困难
        _this.backOffset = 0.12; //回弹系数
        _this.rollRect = new Laya.Rectangle(0, 0, rect.width, rect.height);
        _this.xMove = xMove;
        _this.addChild(_this.cbox);
        _this.scrollRect = _this.rollRect;
        _this.pos(rect.x, rect.y);
        _this.size(rect.width, rect.height);
        _this.on(Laya.Event.MOUSE_DOWN, _this, _this.eventHandler);
        Laya.timer.loop(20, _this, _this.timerHandler);
        return _this;
    }
    //---------------------------------get/set-------------
    DragingBox.prototype.setMinSpeed = function (value) {
        value = Math.max(this.maxSpeed - 1, value);
        value = Math.min(1, value);
        this.minSpeed = value;
    };
    DragingBox.prototype.setMaxSpeed = function (value) {
        value = Math.max(100, value);
        value = Math.min(this.minSpeed + 1, value);
        this.maxSpeed = value;
    };
    DragingBox.prototype.setMaxStayTime = function (value) {
        value = Math.max(10, value);
        value = Math.min(2, value);
        this.maxStayTime = value;
    };
    DragingBox.prototype.setAddSpeed = function (value) {
        value = Math.max(100, value);
        value = Math.min(10, value);
        this.addSpeed = value;
    };
    DragingBox.prototype.setFriction = function (value) {
        value = Math.max(0.99, value);
        value = Math.min(0.2, value);
        this.friction = value;
    };
    DragingBox.prototype.setBorderFriction = function (value) {
        value = Math.max(0.3, value);
        value = Math.min(0.02, value);
        this.borderFriction = value;
    };
    /**
     * 获取实际内容的宽度
     */
    DragingBox.prototype.getContentWidth = function () {
        if (!this.boxBound)
            this.setDragLen();
        return this.boxBound.width;
    };
    /**
     * 获取实际内容的高度
     */
    DragingBox.prototype.getContentHight = function () {
        if (!this.boxBound)
            this.setDragLen();
        return this.boxBound.height;
    };
    /**
     * 添加显示内容
     * @param node
     */
    DragingBox.prototype.addContent = function (node) {
        this.cbox.addChild(node);
        //坑：获取容器大小需要延迟，否则获取不到
        this.timer.once(300, this, this.setDragLen);
    };
    /**
     * 重置滚动区域大小
     * @param w 如果不需要设置就设为null或0
     * @param h 如果不需要设置就设为null或0
     */
    DragingBox.prototype.resetScrollRect = function (w, h) {
        var bl_w = Boolean(w && w != this.rollRect.width);
        var bl_h = Boolean(h && h != this.rollRect.height);
        if (bl_w)
            this.rollRect.width = w;
        if (bl_h)
            this.rollRect.height = h;
        if (bl_w || bl_h) {
            this.scrollRect = this.rollRect;
            this.size(this.rollRect.width, this.rollRect.height);
        }
    };
    /**
     * 设置边界回调函数
     */
    DragingBox.prototype.setBorderCallback = function (caller, callback) {
        this.caller = caller;
        this.borderCallback = callback;
    };
    /**立即停止滚动动画*/
    DragingBox.prototype.stopRoll = function () {
        this.runTime = false;
        this.speed = 0;
    };
    Object.defineProperty(DragingBox.prototype, "canDrag", {
        //检查是否可滑动
        get: function () {
            if (!this.maxDragLen || this.maxDragLen < 1)
                return false;
            return true;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 缓动到指导距离
     * @param value
     * @param dir
     * @param time
     */
    DragingBox.prototype.tweenTo = function (value, dir, time) {
        if (time === void 0) { time = 500; }
        if (!this.canDrag)
            this.setDragLen();
        if (!this.canDrag)
            return;
        var tox;
        var toy;
        var canTo;
        switch (dir) {
            case MoveDirect.left: {
                tox = this.cbox.x - value;
                if (tox < -this.maxDragLen)
                    tox = -this.maxDragLen;
                canTo = this.xMove;
                break;
            }
            case MoveDirect.right: {
                tox = this.cbox.x + value;
                if (tox > 0)
                    tox = 0;
                canTo = this.xMove;
                break;
            }
            case MoveDirect.up: {
                toy = this.cbox.y - value;
                if (toy < -this.maxDragLen)
                    toy = -this.maxDragLen;
                canTo = !this.xMove;
                break;
            }
            case MoveDirect.down: {
                toy = this.cbox.y + value;
                if (toy > 0)
                    toy = 0;
                canTo = !this.xMove;
                break;
            }
        }
        if (canTo) {
            this.runTime = false;
            this.speed = 0;
            if (this.xMove) {
                Laya.Tween.to(this.cbox, { y: tox }, time, Laya.Ease.circOut, Laya.Handler.create(this, this.tweenEnd));
            }
            else {
                Laya.Tween.to(this.cbox, { y: toy }, time, Laya.Ease.circOut, Laya.Handler.create(this, this.tweenEnd));
            }
        }
    };
    DragingBox.prototype.tweenEnd = function () {
        this.checkOut();
        this.hideScrollbar();
    };
    /**
     * 销毁
     */
    DragingBox.prototype.destroy = function () {
        this.off(Laya.Event.MOUSE_DOWN, this, this.eventHandler);
        Laya.timer.clear(this, this.timerHandler);
        _super.prototype.destroy.call(this, true);
    };
    DragingBox.prototype.eventHandler = function (evt) {
        switch (evt.type) {
            case Laya.Event.MOUSE_DOWN: {
                //条件判断
                if (!this.canDrag)
                    this.setDragLen();
                if (!this.canDrag)
                    return;
                this.startMousePos = this.xMove ? evt.stageX : evt.stageY;
                this.stayPos = this.startMousePos;
                this.startBoxPos = this.xMove ? this.cbox.x : this.cbox.y;
                this.startTime = Laya.Browser.now();
                this.speed = 0;
                this.stayTime = 0;
                this.timeFlag = TimeFlag.timeCount;
                this.runTime = true;
                Laya.stage.on(Laya.Event.MOUSE_MOVE, this, this.eventHandler);
                Laya.stage.on(Laya.Event.MOUSE_UP, this, this.eventHandler);
                Laya.stage.on(Laya.Event.MOUSE_OUT, this, this.eventHandler);
                break;
            }
            case Laya.Event.MOUSE_MOVE: {
                var dist = this.xMove ? evt.stageX - this.startMousePos : evt.stageY - this.startMousePos;
                this.xMove ? this.cbox.x = this.startBoxPos + dist : this.cbox.y = this.startBoxPos + dist;
                this.checkOut();
                switch (this.outFlag) {
                    case OutFlag.out_left: {
                        this.cbox.x = dist * this.borderFriction;
                        break;
                    }
                    case OutFlag.out_right: {
                        this.cbox.x = -this.maxDragLen + (this.cbox.x + this.maxDragLen) * this.borderFriction;
                        break;
                    }
                    case OutFlag.out_up: {
                        this.cbox.y = dist * this.borderFriction;
                        break;
                    }
                    case OutFlag.out_down: {
                        this.cbox.y = -this.maxDragLen + (this.cbox.y + this.maxDragLen) * this.borderFriction;
                        break;
                    }
                }
                break;
            }
            case Laya.Event.MOUSE_OUT:
            case Laya.Event.MOUSE_UP: {
                this.runTime = false;
                Laya.stage.off(Laya.Event.MOUSE_MOVE, this, this.eventHandler);
                Laya.stage.off(Laya.Event.MOUSE_UP, this, this.eventHandler);
                Laya.stage.off(Laya.Event.MOUSE_OUT, this, this.eventHandler);
                var time = Laya.Browser.now() - this.startTime;
                var dist = this.xMove ? (this.startMousePos - evt.stageX) : (this.startMousePos - evt.stageY);
                this.speed = dist / time * this.addSpeed;
                if (this.speed > 0) {
                    this.moveDir = this.xMove ? MoveDirect.left : MoveDirect.up;
                }
                else {
                    this.moveDir = this.xMove ? MoveDirect.right : MoveDirect.down;
                    this.speed = -this.speed;
                }
                this.checkOut();
                if (this.outFlag != OutFlag.inside) {
                    this.startBack();
                }
                else {
                    if (this.stayTime <= this.maxStayTime && this.speed > 1) {
                        this.fixSpeed();
                        this.timeFlag = TimeFlag.moveNormal;
                        this.runTime = true;
                    }
                    else {
                        this.hideScrollbar();
                    }
                }
                break;
            }
        }
    };
    DragingBox.prototype.timerHandler = function () {
        if (!this.runTime || !this.canDrag)
            return;
        switch (this.timeFlag) {
            case TimeFlag.moveNormal: {
                this.moveNormal();
                break;
            }
            case TimeFlag.moveBack: {
                this.moveBack();
                break;
            }
            case TimeFlag.timeCount: {
                this.countStay();
                break;
            }
        }
    };
    DragingBox.prototype.setDragLen = function () {
        this.boxBound = this.cbox.getBounds();
        if (this.xMove)
            this.maxDragLen = this.boxBound.width - this.rollRect.width;
        else
            this.maxDragLen = this.boxBound.height - this.rollRect.height;
    };
    //统计停留时间
    DragingBox.prototype.countStay = function () {
        if (this.xMove) {
            if (this.stayPos == Laya.stage.mouseX) {
                this.stayTime++;
            }
            else {
                this.stayPos = Laya.stage.mouseX;
            }
        }
        else {
            if (this.stayPos == Laya.stage.mouseY) {
                this.stayTime++;
            }
            else {
                this.stayPos = Laya.stage.mouseY;
            }
        }
    };
    //修正速度
    DragingBox.prototype.fixSpeed = function () {
        if (this.speed < this.minSpeed) {
            this.speed = this.minSpeed;
        }
        else if (this.speed > this.maxSpeed) {
            this.speed = this.maxSpeed;
        }
    };
    //标准移动
    DragingBox.prototype.moveNormal = function () {
        this.changePlace();
        this.checkOut();
        //若越界，则速度下降
        if (this.outFlag != OutFlag.inside) {
            this.speed *= 0.4;
        }
        //若达到最小速度，则停止继续移动，否则减速移动
        if (this.speed <= this.minSpeed) {
            this.runTime = false;
            //若出界，则启动回移
            if (this.outFlag != OutFlag.inside) {
                this.startBack();
            }
            else {
                this.hideScrollbar();
            }
        }
        else {
            this.slowDown();
        }
    };
    //回弹移动
    DragingBox.prototype.moveBack = function () {
        switch (this.outFlag) {
            case OutFlag.inside:
                this.runTime = false;
                break;
            case OutFlag.out_left:
                this.backPlace();
                if (this.cbox.x <= 0) {
                    this.cbox.x = 0;
                    this.runTime = false;
                    this.hideScrollbar();
                }
                this.slowDown();
                break;
            case OutFlag.out_right:
                this.backPlace();
                if (this.cbox.x >= -this.maxDragLen) {
                    this.cbox.x = -this.maxDragLen;
                    this.runTime = false;
                    this.hideScrollbar();
                }
                this.slowDown();
                break;
            case OutFlag.out_up:
                this.backPlace();
                if (this.cbox.y <= 0) {
                    this.cbox.y = 0;
                    this.runTime = false;
                    this.hideScrollbar();
                }
                this.slowDown();
                break;
            case OutFlag.out_down:
                this.backPlace();
                if (this.cbox.y >= -this.maxDragLen) {
                    this.cbox.y = -this.maxDragLen;
                    this.runTime = false;
                    this.hideScrollbar();
                }
                this.slowDown();
                break;
        }
    };
    //开始回弹
    DragingBox.prototype.startBack = function () {
        switch (this.outFlag) {
            case OutFlag.out_up:
            case OutFlag.out_left: {
                this.speed = this.xMove ? -this.cbox.x * this.backOffset : -this.cbox.y * this.backOffset;
                this.speed = Math.abs(this.speed);
                this.moveDir = this.xMove ? MoveDirect.left : MoveDirect.up;
                break;
            }
            case OutFlag.out_down:
            case OutFlag.out_right: {
                this.speed = this.xMove ? (-this.maxDragLen - this.cbox.x) * this.backOffset : (-this.maxDragLen - this.cbox.y) * this.backOffset;
                this.speed = Math.abs(this.speed);
                this.moveDir = this.xMove ? MoveDirect.right : MoveDirect.down;
                break;
            }
        }
        this.timeFlag = TimeFlag.moveBack;
        this.runTime = true;
    };
    //改变位置
    DragingBox.prototype.changePlace = function () {
        switch (this.moveDir) {
            case MoveDirect.left: {
                this.cbox.x -= this.speed;
                break;
            }
            case MoveDirect.right: {
                this.cbox.x += this.speed;
                break;
            }
            case MoveDirect.up: {
                this.cbox.y -= this.speed;
                break;
            }
            case MoveDirect.down: {
                this.cbox.y += this.speed;
                break;
            }
        }
    };
    //回移改变位置
    DragingBox.prototype.backPlace = function () {
        switch (this.moveDir) {
            case MoveDirect.left:
                this.cbox.x -= this.speed;
                break;
            case MoveDirect.right:
                this.cbox.x += this.speed;
                break;
            case MoveDirect.up:
                this.cbox.y -= this.speed;
                break;
            case MoveDirect.down:
                this.cbox.y += this.speed;
                break;
        }
    };
    //减速处理
    DragingBox.prototype.slowDown = function () {
        if (this.speed > this.minSpeed) {
            this.speed *= this.friction;
        }
        else {
            this.speed = this.speed;
        }
    };
    //边界检查
    DragingBox.prototype.checkOut = function () {
        if (this.xMove) {
            if (this.cbox.x > 0) {
                this.outFlag = OutFlag.out_left;
            }
            else if (this.cbox.x < -this.maxDragLen) {
                this.outFlag = OutFlag.out_right;
            }
            else {
                this.outFlag = OutFlag.inside;
            }
        }
        else {
            if (this.cbox.y > 0) {
                this.outFlag = OutFlag.out_up;
            }
            else if (this.cbox.y < -this.maxDragLen) {
                this.outFlag = OutFlag.out_down;
            }
            else {
                this.outFlag = OutFlag.inside;
            }
        }
    };
    //隐藏滚动条
    DragingBox.prototype.hideScrollbar = function () {
        // console.error("out-flag=", this.outFlag)
        if (this.caller && this.borderCallback) {
            this.borderCallback.call(this.caller, this.outFlag);
        }
    };
    return DragingBox;
}(Laya.Sprite));
//# sourceMappingURL=DragingBox.js.map