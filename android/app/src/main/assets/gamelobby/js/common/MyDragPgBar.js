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
var MyDragPgBar = /** @class */ (function (_super) {
    __extends(MyDragPgBar, _super);
    function MyDragPgBar() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        //当前的值
        _this.value = 0;
        _this.downPos = {
            "x": 0,
            "y": 0
        };
        return _this;
    }
    MyDragPgBar.prototype.init = function (conf, caller, callback) {
        this.conf = conf;
        this.caller = caller;
        this.callback = callback;
        this.initBg();
    };
    MyDragPgBar.prototype.initBg = function () {
        //背景
        // this.sp_bg = Tools.newSprite(this.conf.bg);
        this.sp_bg = new Laya.Sprite();
        Tools.scaleSprite(this.sp_bg, this.conf.bg.src, this.conf.bg.size.splice);
        this.sp_bg.pos(this.conf.bg.pos.x, this.conf.bg.pos.y);
        this.sp_bg.size(this.conf.bg.size.w, this.conf.bg.size.h);
        this.addChild(this.sp_bg);
        //背景需要点击事件
        this.sp_bg.on(Laya.Event.MOUSE_DOWN, this, this.onMouseDownBar);
        this.sp_bg.on(Laya.Event.MOUSE_MOVE, this, this.onMouseDownBar);
        this.sp_bg.on(Laya.Event.MOUSE_OUT, this, this.onMouseDownBar);
        this.sp_bg.on(Laya.Event.MOUSE_UP, this, this.onMouseDownBar);
        //前景
        this.sp_front = Tools.newSprite(this.conf.front);
        this.addChild(this.sp_front);
        this.sp_front.visible = false;
        //是否显示进度百分比
        if (this.conf.percent) {
            this.lb_percent = Tools.newLabel(this.conf.percent.font.text, this.conf.percent.size.w, this.conf.percent.size.h, this.conf.percent.font.size, this.conf.percent.font.color, this.conf.percent.font.align, this.conf.percent.font.valign, this.conf.percent.font.name, this.conf.percent.font.wrap, this.conf.percent.font.underline);
            this.lb_percent.pos(this.conf.percent.pos.x, this.conf.percent.pos.y);
            this.addChild(this.lb_percent);
        }
        //信息
        if (this.conf.info) {
            this.lb_info = Tools.newLabel(this.conf.info.font.text, this.conf.info.size.w, this.conf.info.size.h, this.conf.info.font.size, this.conf.info.font.color, this.conf.info.font.align, this.conf.info.font.valign, this.conf.info.font.name, this.conf.info.font.wrap, this.conf.info.font.underline);
            this.lb_info.pos(this.conf.info.pos.x, this.conf.info.pos.y);
            if (this.conf.info.borderColor) {
                this.lb_info.borderColor = this.conf.info.borderColor;
            }
            this.addChild(this.lb_info);
        }
        //拖动块
        this.sp_drag = Tools.newSprite(this.conf.drag);
        this.addChild(this.sp_drag);
        // this.sp_drag.on(Laya.Event.CLICK, this, this.onBtnClick);
        this.sp_drag.on(Laya.Event.MOUSE_DOWN, this, this.onMouseEvent);
        // this.sp_drag.on(Laya.Event.MOUSE_UP, this, this.onMouseEvent);
        // this.sp_drag.on(Laya.Event.MOUSE_OUT, this, this.onMouseEvent);
        // this.sp_drag.on(Laya.Event.MOUSE_MOVE, this, this.onMouseEvent);
        this.sp_drag.on(Laya.Event.DRAG_MOVE, this, this.onDragMove);
        this.pos(this.conf.pos.x, this.conf.pos.y);
    };
    //鼠标点击在进度条上任意位置
    MyDragPgBar.prototype.onMouseDownBar = function (e) {
        // var x = e.stageX;
        //获取当前鼠标点击在该精灵的哪个位置
        var tx = this.sp_bg.mouseX;
        // Debug.trace("targetX:");
        // Debug.trace(tx);
        // Debug.trace('stageX:'+x);
        //总的长度
        var tlen = this.sp_bg.width;
        //当前所占百分比
        var p = tx / tlen;
        switch (e.type) {
            case Laya.Event.MOUSE_DOWN:
                // Debug.trace('sp_bg down');
                this.bDrag = true;
            case Laya.Event.MOUSE_MOVE:
                if (this.bDrag) {
                    this.setValue(p);
                }
                break;
            case Laya.Event.MOUSE_OUT:
            // Debug.trace('sp_bg out');
            case Laya.Event.MOUSE_UP:
                // Debug.trace('sp_bg up');
                this.bDrag = false;
                break;
        }
        // this.setValue(p);
    };
    //鼠标事件
    MyDragPgBar.prototype.onMouseEvent = function (e) {
        var x = e.stageX;
        switch (e.type) {
            case Laya.Event.MOUSE_DOWN:
                // Debug.trace('drag down');
                // this.bDrag = true;
                // this.downPos.x = x;
                var max = this.conf.bg.size.w - this.sp_drag.width;
                this.sp_drag.startDrag(new Laya.Rectangle(0, 0, max, 0), false, 0, 300, null, true, 0.92);
                break;
            // case Laya.Event.MOUSE_MOVE:
            //     if( this.downPos.x > 0 )
            //     {
            //         var sumx = x - this.downPos.x;
            //         this.downPos.x = x;
            // this.moveDrag(sumx);
            //     }
            // break;
            // case Laya.Event.MOUSE_OUT:
            // case Laya.Event.MOUSE_UP:
            // this.downPos.x = 0;
            // this.bDrag = false;
            // Debug.trace("mouse up");
            // break;
        }
    };
    //移动拖拽块
    MyDragPgBar.prototype.moveDrag = function (x) {
        var cx = this.sp_drag.x;
        var max = this.conf.bg.size.w - this.sp_drag.width;
        var nx = cx + x;
        if (nx < this.conf.drag.pos.x) {
            nx = this.conf.drag.pos.x;
            this.sp_front.visible = false;
        }
        else if (nx > max) {
            nx = max;
            if (!this.sp_front.visible) {
                this.sp_front.visible = true;
            }
        }
        else {
            if (!this.sp_front.visible) {
                this.sp_front.visible = true;
            }
        }
        this.sp_drag.x = nx;
        if (this.sp_front.visible) //前景可见的情况下，刷新绘制区域
         {
            var cw = this.sp_drag.x - this.conf.bg.pos.x + this.sp_drag.width / 2;
            var ch = this.sp_front.height;
            //刷新前景的显示区域
            this.sp_front.scrollRect = new Laya.Rectangle(0, 0, cw, ch);
            //发生变化之后，设置值
            var movex = this.sp_drag.x - this.conf.drag.pos.x;
            var px = movex / max;
            this.resetValue(px);
        }
    };
    //拖动过程中
    MyDragPgBar.prototype.onDragMove = function (e) {
        var max = this.conf.bg.size.w - this.sp_drag.width;
        //检查当前坐标，刷新绘制区域
        if (this.sp_front.visible) //前景可见的情况下，刷新绘制区域
         {
            var cw = this.sp_drag.x - this.conf.bg.pos.x + this.sp_drag.width / 2;
            var ch = this.sp_front.height;
            //刷新前景的显示区域
            this.sp_front.scrollRect = new Laya.Rectangle(0, 0, cw, ch);
            //发生变化之后，设置值
            var movex = this.sp_drag.x - this.conf.drag.pos.x;
            var px = movex / max;
            this.resetValue(px);
        }
    };
    //一般信息
    MyDragPgBar.prototype.info = function (info) {
        try {
            if (this.lb_info) {
                this.lb_info.color = this.conf.info.font.color;
                this.lb_info.text = info;
            }
        }
        catch (e) {
        }
    };
    //自主设置
    MyDragPgBar.prototype.resetValue = function (v) {
        this.value = v;
        // var ppv = v.toFixed(2); //保留小数点后2位
        //加载完毕，回调
        this.callback.apply(this.caller, [this]);
    };
    //外面 设置进度
    MyDragPgBar.prototype.setValue = function (v) {
        this.value = v;
        //根据值，计算百分比
        // Debug.trace('setValue to :'+v);
        var max = this.conf.bg.size.w - this.sp_drag.width;
        // var movex = this.sp_drag.x - this.conf.drag.pos.x;
        var needx = this.value * max;
        var cx = this.sp_drag.x;
        var mx = needx - cx;
        this.moveDrag(mx);
    };
    return MyDragPgBar;
}(Laya.Sprite));
//# sourceMappingURL=MyDragPgBar.js.map