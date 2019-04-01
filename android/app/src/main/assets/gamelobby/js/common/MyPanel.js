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
var MyPanel = /** @class */ (function (_super) {
    __extends(MyPanel, _super);
    function MyPanel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.bDrag = false;
        _this.downX = 0;
        _this.minx = 0;
        _this.maxx = 0;
        _this.totalWidth = 0;
        return _this;
    }
    MyPanel.prototype.init = function (conf) {
        this.conf = conf;
        this.width = this.conf.content.size.w;
        this.height = this.conf.content.size.h;
        this.items = new Array();
        this.content = new Laya.Sprite();
        this.addChild(this.content);
        this.content.size(this.width, this.height);
        this.content.pos(this.conf.content.pos.x, this.conf.content.pos.y);
        if (this.conf.showbg) {
            Tools.drawRect(
            // Tools.drawRectWithAlpha(
            this.content, 0, 0, this.width, this.height, this.conf.showbg.color); //,
            // this.conf.showbg.alpha);
        }
        // this.content.on(Laya.Event.MOUSE_DOWN,this,this.moveContent);
        // this.content.on(Laya.Event.MOUSE_MOVE,this,this.moveContent);
        // this.content.on(Laya.Event.MOUSE_UP,this,this.moveContent);
        this.on(Laya.Event.MOUSE_DOWN, this, this.moveContent);
        this.on(Laya.Event.MOUSE_MOVE, this, this.moveContent);
        this.on(Laya.Event.MOUSE_UP, this, this.moveContent);
        this.on(Laya.Event.MOUSE_OUT, this, this.moveContent);
        this.mask = new Laya.Sprite();
        // this.addChild(this.mask);
        this.mask.size(this.width, this.height);
        Tools.drawRect(this.mask, 0, 0, this.width, this.height, "#ff00ff");
        // Tools.drawRectWithAlpha(this.mask,0,0,this.width,this.height,"#ff00ff");
        // this.mask.on(Laya.Event.MOUSE_DOWN,this,this.moveContent);
        // this.mask.on(Laya.Event.MOUSE_MOVE,this,this.moveContent);
        // this.mask.on(Laya.Event.MOUSE_UP,this,this.moveContent);
        this.content.mask = this.mask;
    };
    MyPanel.prototype.addItemChild = function (node) {
        this.items.push(node);
        this.content.addChild(node);
        // var tw 
        this.totalWidth = node.x + node.width;
        // if( Common.confObj.debugmode == 1 )
        // {
        //     Debug.trace('addItem nodex:'+node.x+" nodew:"+node.width+" tw:"+this.totalWidth);
        // }
        this.minx = this.width - this.totalWidth; //tw;
        this.maxx = 0;
    };
    MyPanel.prototype.clearChildren = function () {
        this.items.splice(0, this.items.length);
        this.content.destroyChildren();
    };
    MyPanel.prototype.moveContent = function (e) {
        // Debug.trace('panel move '+e.type);
        // Debug.trace('zOrder:'+this.zOrder);
        var x = e.stageX;
        switch (e.type) {
            case Laya.Event.MOUSE_DOWN:
                this.bDrag = true;
                this.downX = x;
                break;
            case Laya.Event.MOUSE_MOVE:
                if (this.downX > 0) {
                    var sumx = x - this.downX;
                    this.downX = x;
                    this.moveAllItem(sumx);
                }
                break;
            case Laya.Event.MOUSE_OUT:
            case Laya.Event.MOUSE_UP:
                this.downX = 0;
                this.bDrag = false;
                break;
        }
    };
    MyPanel.prototype.moveAllItem = function (x) {
        if (this.totalWidth <= this.width) {
            return;
        }
        var nx = x;
        var cx = 0;
        try {
            cx = this.items[0].x;
        }
        catch (e) {
        }
        var newx = cx + nx;
        // Debug.trace('newx:'+newx+" cx:"+cx+" nx:"+nx);
        if (newx > this.maxx) {
            nx = this.maxx - cx;
        }
        else if (newx < this.minx) {
            nx = this.minx - cx;
        }
        // Debug.trace("minx:"+this.minx+" maxx:"+this.maxx+" nx:"+nx+" cx:"+cx);
        // for(var i in this.items)
        for (var i = 0; i < this.items.length; i++) {
            this.items[i].x += nx;
        }
    };
    MyPanel.prototype.moveTo = function (id) {
        var nx = this.items[id].x;
        var rightx = this.width - this.items[id].width;
        var leftx = 0;
        if (nx >= leftx && nx <= rightx) {
        }
        else {
            var mvx = 0;
            if (nx > rightx) {
                mvx = rightx - nx;
            }
            else if (nx < leftx) {
                mvx = leftx - nx;
            }
            this.moveAllItem(mvx);
        }
    };
    return MyPanel;
}(Laya.Sprite));
//# sourceMappingURL=MyPanel.js.map