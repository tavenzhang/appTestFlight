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
var MyButton = /** @class */ (function (_super) {
    __extends(MyButton, _super);
    function MyButton() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.bclick = true; // = bclick;	//是否可以点击
        _this.actionDown = false; //是否在按下的时候就响应执行回调
        return _this;
        // public changeRes(res:any):void
        // {
        // 	var t = Laya.loader.getRes( Tools.getSrc(res[0]) );
        // 	this.redraw(t);
        // }
    }
    MyButton.prototype.setQuery = function (q) {
        this.query = q;
    };
    MyButton.prototype.getQuery = function () {
        return this.query;
    };
    MyButton.prototype.init = function (conf, caller, callback) {
        this.conf = conf;
        this.caller = caller;
        this.btnCallback = callback;
        this.res = this.conf.src;
        if (this.res.length > 0) {
            this.btn_ui = new Laya.Sprite();
            this.btn_ui.pos(0, 0);
            this.addChild(this.btn_ui);
            Laya.loader.load(this.res, Laya.Handler.create(this, this.onResLoaded));
        }
        // if( this.conf.disablesrc )
        // {
        // 	Laya.loader.load(
        // 		this.conf.disablesrc, 
        // 		Laya.Handler.create(this, this.onDisResLoaded));
        // }
        if (this.conf.actionDown) {
            this.actionDown = this.conf.actionDown;
        }
        if (this.conf.font) {
            //文字
            this.btn_name = Tools.newLabel(this.conf.font.text, this.conf.font.size.w, this.conf.font.size.h, this.conf.font.fontsize, this.conf.font.color, this.conf.font.align, this.conf.font.valign, this.conf.font.name, this.conf.font.wrap, this.conf.font.underline);
            this.btn_name.pos(this.conf.font.pos.x, this.conf.font.pos.y);
            if (this.conf.font.borderColor) {
                this.btn_name.borderColor = this.conf.font.borderColor;
            }
            if (this.conf.font.scale) {
                this.btn_name.scale(this.conf.font.scale.x, this.conf.font.scale.y);
            }
            this.addChild(this.btn_name);
        }
        if (this.conf.hint) {
            this.sp_hint = new Laya.Sprite();
            this.sp_hint.loadImage(this.conf.hint.src);
            this.sp_hint.pos(this.conf.hint.pos.x, this.conf.hint.pos.y);
            this.addChild(this.sp_hint);
            this.sp_hint.visible = false;
        }
        if (this.conf.frontsrc) //文字图片
         {
            this.sp_label = new Laya.Sprite();
            this.sp_label.loadImage(this.conf.frontsrc.src);
            this.sp_label.pos(this.conf.frontsrc.pos.x, this.conf.frontsrc.pos.y);
            this.addChild(this.sp_label);
        }
        // this.size(this.conf.size.w,this.conf.size.h);
        // if( this.conf.scale )
        // {
        // 	this.scale(this.conf.scale.x,this.conf.scale.y);
        // }
        if (this.conf.normalScale) {
            this.scaleBtn(this.conf.normalScale);
        }
        this.pos(this.conf.pos.x, this.conf.pos.y);
    };
    MyButton.prototype.show = function (b) {
        if (b) {
            this.alpha = 1;
        }
        else {
            this.alpha = 0;
        }
    };
    MyButton.prototype.showHint = function (b) {
        this.sp_hint.visible = b;
    };
    MyButton.prototype.onResLoaded = function () {
        this.btn_ui.graphics.clear();
        var t = Laya.loader.getRes(Tools.getSrc(this.res[0]));
        this.redraw(t);
        if (this.bclick) {
            // this.btn_ui.on(Laya.Event.CLICK, this, this.onBtnClick);
            // this.btn_ui.on(Laya.Event.MOUSE_DOWN, this, this.onBtnDown);
            // this.btn_ui.on(Laya.Event.MOUSE_UP, this, this.onBtnUp);
            // this.btn_ui.on(Laya.Event.MOUSE_OUT, this, this.onBtnOut);
            // this.btn_ui.on(Event.MOUSE_MOVE, this, this.onBtnMove);
            this.btn_ui.on(Laya.Event.MOUSE_DOWN, this, this.onMouseEvent);
            this.btn_ui.on(Laya.Event.MOUSE_UP, this, this.onMouseEvent);
            this.btn_ui.on(Laya.Event.MOUSE_OUT, this, this.onMouseEvent);
        }
    };
    MyButton.prototype.onDisResLoaded = function () {
    };
    MyButton.prototype.setRes = function (res) {
        this.res = res;
        var t = Laya.loader.getRes(Tools.getSrc(this.res[0]));
        this.redraw(t);
    };
    MyButton.prototype.redraw = function (e) {
        try {
            this.btn_ui.graphics.clear();
            if (this.conf.size) {
                //有设定大小的情况下，按设定来
                this.btn_ui.graphics.drawTexture(e, 
                // this.conf.pos.x,this.conf.pos.y,
                0, 0, this.conf.size.w, this.conf.size.h);
                this.btn_ui.size(this.conf.size.w, this.conf.size.h);
                // this.btn_ui.pivot(this.conf.size.w/2,this.conf.size.h/2);
            }
            else {
                //否则按texture大小来
                this.btn_ui.graphics.drawTexture(e, 0, 0);
                this.btn_ui.size(e.width, e.height);
                // this.btn_ui.pivot(e.width/2,e.height/2);
            }
            this.btn_ui.pivot(this.btn_ui.width / 2, this.btn_ui.height / 2);
        }
        catch (err) {
            Debug.trace("MyButton redraw err:");
            Debug.trace(err);
            Debug.trace("MyButton redraw e:");
            Debug.trace(e);
        }
    };
    MyButton.prototype.redrawTexture = function (res, e) {
        // Debug.trace(this.data.name+" old res:");
        // Debug.trace(this.res);
        this.res[0] = res;
        // Debug.trace("new res:"+res);
        // Debug.trace(this.res);
        // Debug.trace("texture wid:"+e.width+" hei:"+e.height);
        // Debug.trace(e);
        // this.btn_ui.graphics.clear();
        // var t = Laya.loader.getRes(this.res[0]);
        this.btn_ui.graphics.clear();
        this.btn_ui.graphics.drawTexture(e, 0, 0); //,e.width,e.height);
        this.btn_ui.size(e.width, e.height);
    };
    MyButton.prototype.showName = function (b) {
        this.btn_name.visible = b;
    };
    MyButton.prototype.onMouseEvent = function (e) {
        if (!this.bclick) {
            return;
        }
        // Debug.trace('MyButton onMouseEvent');
        // Debug.trace(e);
        switch (e.type) {
            case Laya.Event.MOUSE_DOWN:
                //记录当前的按下坐标
                this.downPos = { x: e.stageX, y: e.stageY };
                this.onBtnDown(e);
                break;
            case Laya.Event.MOUSE_MOVE:
                break;
            case Laya.Event.MOUSE_OUT:
                this.downPos = null;
                this.onBtnOut(e);
                break;
            case Laya.Event.MOUSE_UP:
                this.onBtnUp(e);
                //释放的时候检查，与按下的坐标对比，距离小于一定值，才算click
                if (this.downPos) {
                    var upPos = { x: e.stageX, y: e.stageY };
                    if (Tools.isClick(this.downPos, upPos)) {
                        this.onBtnClick(null);
                    }
                }
                break;
        }
    };
    //执行点击
    MyButton.prototype.doClick = function () {
        //去掉点击后的回调
        this.btnCallback.apply(this.caller, [this]);
        //播放音效
        if (this.conf.sfx) {
            Laya.SoundManager.playSound(this.conf.sfx);
        }
    };
    //本按钮被按下了，要干嘛？？
    MyButton.prototype.onBtnClick = function (s) {
        // Debug.trace('btn on click');
        if (this.bclick) {
            // Debug.trace('btn on click callback');
            if (!this.actionDown) //非按下执行的，才会在弹起后执行
             {
                this.doClick();
            }
        }
    };
    MyButton.prototype.onBtnDown = function (s) {
        // Debug.trace('btn on down');
        if (this.res.length > 1) {
            var sp = s.target;
            if (sp == this.btn_ui) {
                // Debug.trace('onBtnDown this.res:'+this.res[0]);
                this.btn_ui.graphics.clear();
                var t = Laya.loader.getRes(Tools.getSrc(this.res[1]));
                this.btn_ui.graphics.drawTexture(t, 0, 0);
            }
        }
        else {
            //只有一张图的时候，使用放大缩小
            this.scaleBtn(this.conf.maxScale); //1.1);
        }
        if (this.actionDown) {
            //本按钮是按下即响应的
            this.doClick();
        }
    };
    MyButton.prototype.scaleBtn = function (cf) {
        // this.btn_ui.scale(x,x);
        this.scale(cf.x, cf.y);
    };
    MyButton.prototype.onBtnUp = function (s) {
        this.releaseBtn();
    };
    MyButton.prototype.releaseBtn = function () {
        // Debug.trace(this.data.name+' releaseBtn this.res:'+this.res[0]);
        // this.btn_ui.graphics.clear();
        var t = Laya.loader.getRes(Tools.getSrc(this.res[0]));
        // this.btn_ui.graphics.drawTexture(t, 0, 0);
        this.redraw(t);
        // Debug.trace('normalScale:'+this.conf.normalScale);
        // Debug.trace("now scx:"+this.btn_ui.scaleX+" now scy:"+this.btn_ui.scaleY);
        this.scaleBtn(this.conf.normalScale);
        // Debug.trace("new scx:"+this.btn_ui.scaleX+" new scy:"+this.btn_ui.scaleY);
    };
    MyButton.prototype.onBtnOut = function (s) {
        this.releaseBtn();
    };
    MyButton.prototype.setEnabled = function (b, useImg) {
        if (useImg === void 0) { useImg = false; }
        this.bclick = b;
        // if( useImg )
        // {
        // 	if( !b )
        // 	{
        // 		if( this.conf.disablesrc )
        // 		{
        // 			Debug.trace("change disable src:");
        // 			Debug.trace(this.conf.disablesrc);
        // 			this.changeRes(this.conf.disablesrc);
        // 		}
        // 	}else{
        // 		Debug.trace("change src:");
        // 		Debug.trace(this.conf.src);
        // 		this.changeRes(this.conf.src);
        // 	}
        // }
        // Debug.trace("btn enable:"+this.bclick);
    };
    return MyButton;
}(Laya.Sprite));
//# sourceMappingURL=MyButton.js.map