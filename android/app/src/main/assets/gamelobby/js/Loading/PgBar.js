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
var PgBar = /** @class */ (function (_super) {
    __extends(PgBar, _super);
    function PgBar() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.duration = 2000;
        _this.sp_effect_initx = 0;
        return _this;
    }
    PgBar.prototype.init = function (conf, caller, callback) {
        this.conf = conf;
        this.caller = caller;
        this.callback = callback;
    };
    PgBar.prototype.initBg = function () {
        if (this.conf.bg) {
            this.bg = new MySprite();
            this.addChild(this.bg);
            if (this.conf.bg.src.length > 0) {
                Laya.loader.load(this.conf.bg.src, Laya.Handler.create(this, this.onLoadedBg));
            }
            else {
                Tools.RoundRect(this.bg, this.conf.bg.pos.x, this.conf.bg.pos.y, //0,0,
                this.conf.bg.rect.w, this.conf.bg.rect.h, this.conf.bg.rect.r, this.conf.bg.rect.fillcolor);
            }
        }
        if (this.conf.front) {
            this.front = new MySprite();
            this.bg.addChild(this.front);
            if (this.conf.front.src.length > 0) {
                Laya.loader.load(this.conf.front.src, Laya.Handler.create(this, this.onLoadedFront));
            }
            else {
                Tools.RoundRect(this.front, this.conf.front.pos.x, this.conf.front.pos.y, //0,0,
                this.conf.front.rect.w, this.conf.front.rect.h, this.conf.front.rect.r, this.conf.front.rect.fillcolor);
            }
            this.fullw = this.conf.front.rect.w;
            if (this.conf.effect) {
                this.sp_effect = Tools.addSprite(this.bg, this.conf.effect);
                this.sp_effect_initx = this.conf.effect.pos.x;
            }
        }
        if (this.conf.lbpercent) {
            this.lb_percent = Tools.newLabel(" ", this.conf.lbpercent.size.w, this.conf.lbpercent.size.h, this.conf.lbpercent.fontsize, this.conf.lbpercent.fontcolor, this.conf.lbpercent.align, this.conf.lbpercent.valign, this.conf.lbpercent.wrap, this.conf.lbpercent.underline);
            this.lb_percent.pos(this.conf.lbpercent.pos.x, this.conf.lbpercent.pos.y);
            if (this.conf.lbpercent.borderColor) {
                this.lb_percent.borderColor = this.conf.lbpercent.borderColor;
            }
            this.addChild(this.lb_percent);
        }
        if (this.conf.lbinfo) {
            this.lb_info = Tools.newLabel(this.conf.lbinfo.pretext, this.conf.lbinfo.size.w, this.conf.lbinfo.size.h, this.conf.lbinfo.fontsize, this.conf.lbinfo.fontcolor, this.conf.lbinfo.align, this.conf.lbinfo.valign, this.conf.lbinfo.wrap, this.conf.lbinfo.underline);
            this.lb_info.pos(this.conf.lbinfo.pos.x, this.conf.lbinfo.pos.y);
            if (this.conf.lbinfo.borderColor) {
                this.lb_info.borderColor = this.conf.lbinfo.borderColor;
            }
            this.addChild(this.lb_info);
        }
        // Debug.trace('info x:'+this.lb_info.x+" y:"+this.lb_info.y);
        // Debug.trace('this x:'+this.x+" y:"+this.y);
        this.pos(this.conf.x, this.conf.y);
    };
    PgBar.prototype.onLoadedBg = function () {
        if (this.conf.bg.size.splice) {
            Tools.scaleSprite(this.bg, this.conf.bg.src, this.conf.bg.size.splice);
            this.bg.size(this.conf.bg.rect.w, this.conf.bg.rect.h);
        }
        else {
            var t = Laya.loader.getRes(Tools.getSrc(this.conf.bg.src));
            this.bg.graphics.drawTexture(t, 0, 0);
            this.bg.size(t.width, t.height);
        }
        this.bg.pos(this.conf.bg.pos.x, this.conf.bg.pos.y);
    };
    PgBar.prototype.onLoadedFront = function () {
        if (this.conf.front.size.splice) {
            Tools.scaleSprite(this.front, this.conf.front.src, this.conf.front.size.splice);
            this.front.size(this.conf.front.rect.w, this.conf.front.rect.h);
            this.fullw = this.conf.front.rect.w;
        }
        else {
            var t = Laya.loader.getRes(Tools.getSrc(this.conf.front.src));
            this.front.graphics.drawTexture(t, 0, 0);
            this.front.size(t.width, t.height);
            this.fullw = t.width; // * scx;
        }
        this.front.pos(this.conf.front.pos.x, this.conf.front.pos.y);
    };
    PgBar.prototype.hide = function () {
        this.pos(Common.GM_SCREEN_W, 0);
    };
    PgBar.prototype.moveOut = function () {
        var xIn = Common.GM_SCREEN_W; //SCREEN_WIDTH;//this.posX + this.width*2;
        var yIn = 0; //this.posY;
        // Debug.trace("posX:"+this.posX+" posY:"+this.posY);
        // Debug.trace("px:"+this.posX+" py:"+this.posY+" x:"+this.x+" y:"+this.y+" xIn:"+xIn+" yIn:"+yIn);
        var tween = Laya.Tween.to(this, {
            x: xIn,
            y: yIn
        }, this.duration, Laya.Ease["backOut"]);
    };
    PgBar.prototype.moveIn = function () {
        var xIn = 0; //this.posX;// + 500;
        var yIn = 0; //this.posY;
        // Debug.trace("posX:"+this.posX+" posY:"+this.posY);
        var tween = Laya.Tween.to(this, {
            x: xIn,
            y: yIn
        }, this.duration / 2, Laya.Ease["backIn"]);
    };
    PgBar.prototype.error = function (err) {
        // try{
        // 	this.lb_info.color = this.conf.errorcolor;
        // 	this.lb_info.text = err;
        // }catch(e){
        // }
    };
    PgBar.prototype.info = function (info) {
        // try{
        // 	if( this.lb_info )
        // 	{
        // 		this.lb_info.color = this.conf.infocolor;
        // 		this.lb_info.text = info;
        // 	}
        // }catch(e)
        // {
        // }
    };
    PgBar.prototype.setValue = function (v) {
        this.value = v;
        var pretext = "";
        if (this.conf.lbpercent.pretext) {
            pretext = this.conf.lbpercent.pretext;
        }
        var cur = this.value; ///100;
        var pvalue = cur * 100;
        var ppv = pvalue.toFixed(2);
        this.lb_percent.text = Tools.getStringByKey(pretext) + ppv + " % ";
        this.scaleFront(cur);
        if (this.value >= 1) //00 )
         {
            this.callback.apply(this.caller, [this]);
        }
    };
    PgBar.prototype.scaleFront = function (scale) {
        if (this.conf.front.src.length > 0) {
            this.front.scaleX = scale;
        }
        else {
            var curlen = this.fullw * scale;
            this.front.graphics.clear();
            Tools.RoundRect(this.front, this.conf.front.pos.x, this.conf.front.pos.y, //0,0,
            curlen, this.conf.front.rect.h, this.conf.front.rect.r, this.conf.front.rect.fillcolor);
        }
        var px = this.fullw * scale - this.conf.effect.size.w;
        // Debug.trace("this.fullw:"+this.fullw+" scale:"+scale+" w:"+this.conf.effect.size.w+" px:"+px);
        this.sp_effect.x = this.sp_effect_initx + this.conf.effect.offset.x + px;
    };
    return PgBar;
}(MySprite));
//# sourceMappingURL=PgBar.js.map