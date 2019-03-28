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
var HelpPad = /** @class */ (function (_super) {
    __extends(HelpPad, _super);
    function HelpPad() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.downPos = {
            "x": 0,
            "y": 0
        };
        return _this;
    }
    HelpPad.getObj = function () {
        return HelpPad.obj;
    };
    HelpPad.showPad = function (gname) {
        if (!HelpPad.obj) {
            var o = new HelpPad();
            o.init(ConfObjRead.getConfHelppad()); //Common.confObj.helppad);
            Laya.stage.addChild(o);
            o.setData(); //Common.getHelpDataByGameName(gname));
        }
    };
    HelpPad.prototype.hide = function () {
        this.visible = false;
        HelpPad.obj = null;
        Laya.stage.removeChild(this);
        this.destroy(true);
        // lamain.restoreLoaderPath();
    };
    HelpPad.prototype.init = function (conf) {
        HelpPad.obj = this;
        this.conf = conf;
        this.data = null; //data;
        // this.caller = caller;
        // this.closeCallback = closeCallback;
        this.alphabg = new Laya.Sprite();
        Tools.drawRectWithAlpha(this.alphabg, 0, 0, this.conf.size.w, this.conf.size.h, "#000000", this.conf.mask.alpha);
        this.addChild(this.alphabg);
        this.alphabg.size(this.conf.size.w, this.conf.size.h);
        this.alphabg.pos(-this.conf.pos.x, -this.conf.pos.y);
        this.alphabg.on(Laya.Event.MOUSE_DOWN, this, this.onMouse);
        this.alphabg.on(Laya.Event.MOUSE_UP, this, this.onMouse);
        this.alphabg.on(Laya.Event.MOUSE_MOVE, this, this.onMouse);
        this.initBg(this.conf.bg);
        this.initTitle(this.conf.title);
        this.initTableHead(this.conf.tablehead);
        this.sp_content = new Laya.Sprite();
        this.sp_content.pos(this.conf.content.pos.x, this.conf.content.pos.y);
        this.addChild(this.sp_content);
        this.sp_content.scrollRect = new Laya.Rectangle(this.conf.content.rect.x, this.conf.content.rect.y, this.conf.content.rect.w, this.conf.content.rect.h);
        if (this.conf.close) {
            this.close = new MyButton();
            this.close.init(this.conf.close, this, this.onClose);
            this.close.pos(this.conf.close.pos.x, this.conf.close.pos.y);
            this.addChild(this.close);
        }
        this.pos(this.conf.pos.x, this.conf.pos.y);
    };
    HelpPad.prototype.initRuleContent = function (conf) {
        // Debug.trace('initRuleContent conf:');
        // Debug.trace(conf);
        this.arr_content = new Array();
        // for(var k in conf)
        for (var k = 0; k < conf.length; k++) {
            // var p = Tools.newHTMLIframeElement(conf[k]);
            // var p = Tools.newImage(conf[k]);
            // this.sp_content.addChild(p);
            // Debug.trace("initRuleContent k:"+k+" conf:");
            // Debug.trace(conf[k]);
            var p = this.newRuleContent(this.sp_content, conf[k]); //.href);
            // Debug.trace("initRuleContent w:"+p.width+" h:"+p.height);
            this.arr_content.push(p);
            p.visible = false;
        }
    };
    HelpPad.prototype.newRuleContent = function (node, conf) {
        var sp = new Laya.Sprite();
        node.addChild(sp);
        var tempArr = [];
        var id = 0;
        // for(var a in conf.href)
        for (var a = 0; a < conf.href.length; a++) {
            var c = conf.href[a];
            var x = conf.pos.x;
            var y = conf.pos.y;
            if (id > 0) {
                if (tempArr[id - 1]) {
                    y = tempArr[id - 1].y + tempArr[id - 1].height;
                }
            }
            var cp = new Laya.Sprite();
            cp.loadImage(c);
            cp.pos(x, y);
            sp.addChild(cp);
            tempArr.push(cp);
            sp.height += cp.height;
            id++;
        }
        sp.width = this.conf.content.rect.w;
        return sp;
    };
    HelpPad.prototype.initBg = function (conf) {
        if (!conf) {
            return;
        }
        this.sp_bg = Tools.addSprite(this, this.conf.bg);
        this.sp_front = Tools.addSprite(this, this.conf.contentbg);
        this.sp_front.on(Laya.Event.MOUSE_DOWN, this, this.onMouseEvent);
        this.sp_front.on(Laya.Event.MOUSE_MOVE, this, this.onMouseEvent);
        this.sp_front.on(Laya.Event.MOUSE_UP, this, this.onMouseEvent);
        this.sp_front.on(Laya.Event.MOUSE_OUT, this, this.onMouseEvent);
    };
    HelpPad.prototype.initTitle = function (conf) {
        if (!conf) {
            return;
        }
        // this.sp_title_bg = new Laya.Sprite();
        // this.sp_title_bg.loadImage(conf.bg.src);
        // this.sp_title_bg.pos(conf.bg.pos.x,conf.bg.pos.y);
        // this.addChild(this.sp_title_bg);
        this.sp_title_lb = new Laya.Sprite();
        this.sp_title_lb.loadImage(conf.lb.src);
        this.sp_title_lb.pos(conf.lb.pos.x, conf.lb.pos.y);
        this.addChild(this.sp_title_lb);
    };
    HelpPad.prototype.initTableHead = function (conf) {
        if (!conf) {
            return;
        }
        this.sp_table_head = Tools.addSprite(this, conf.bg);
        this.arr_table_head_label = new Array();
        // for( var k in conf.headlines.labels )
        for (var k = 0; k < conf.headlines.labels.length; k++) {
            var labelInfo = conf.headlines.labels[k];
            var lb = new MySwitchBtn(); //new MyDragSwitch();
            lb.init(labelInfo.switch, this, this.headClick);
            lb.setQuery(k);
            this.addChild(lb);
            lb.setOn(0, false);
            this.arr_table_head_label.push(lb);
        }
        this.arr_table_head_lines = new Array();
        // for( var k in conf.headlines.ws )
        for (var k = 0; k < conf.headlines.ws.length; k++) {
            var w = conf.headlines.ws[k];
            var len = this.arr_table_head_lines.length;
            var lastX = 0;
            var posx = 0;
            if (len > 0) {
                lastX = this.arr_table_head_lines[len - 1].x;
                posx = w + lastX;
            }
            else {
                posx = conf.bg.pos.x + w + lastX;
            }
            var y = conf.headlines.wy;
            var oneline = new Laya.Sprite();
            oneline.loadImage(conf.headlines.src);
            oneline.pos(posx, y);
            this.addChild(oneline);
            this.arr_table_head_lines.push(oneline);
        }
    };
    HelpPad.prototype.headClick = function (lb) {
        // Debug.trace("headClick k:"+k);
        // Debug.trace("headClick lb:");
        // Debug.trace(lb);
        var k = lb.getQuery();
        var id = parseInt(k);
        var direct = 0;
        if (this.curTabId < id) {
            direct = -1;
        }
        else if (this.curTabId > id) {
            direct = 1;
        }
        this.tabChange(id, direct);
    };
    HelpPad.prototype.prevTab = function () {
        var a = this.curTabId - 1;
        if (a < 0) {
            a = this.conf.tablehead.headlines.labels.length - 1;
        }
        return a;
    };
    HelpPad.prototype.nextTab = function () {
        var a = this.curTabId + 1;
        if (a >= this.conf.tablehead.headlines.labels.length) {
            a = 0;
        }
        return a;
    };
    HelpPad.prototype.tabChange = function (id, direct) {
        this.curTabId = id;
        // Debug.trace("tabChange id:"+id);
        // this.sp_focus.pos(pos.x,pos.y);
        // for( var a in this.arr_table_head_label)
        for (var a = 0; a < this.arr_table_head_label.length; a++) {
            var q = this.arr_table_head_label[a].getQuery();
            if (q != id) {
                this.arr_table_head_label[a].setOn(0);
            }
            else {
                this.arr_table_head_label[a].setOn(1);
            }
        }
        // var scx = 1,scy = 1;
        // var size = this.getFocusSize(id);
        // scx = size.w/this.sp_focus.width;
        // scx = size.w/this.sp_focus.width;
        // this.sp_focus.scale(scx,scy);
        // this.sp_focus.scaleX = scx;
        this.changeContentNode(id, direct);
    };
    HelpPad.prototype.changeContentNode = function (id, direct) {
        // for(var k in this.arr_content)
        for (var k = 0; k < this.arr_content.length; k++) {
            var p = this.arr_content[k];
            p.visible = false;
            if (k == id) {
                p.visible = true;
            }
        }
    };
    HelpPad.prototype.actionMove = function (poshide, p) {
        p.pos(poshide.x, poshide.y);
        var tween = Laya.Tween.to(p, {
            x: 0,
            y: 0
        }, this.conf.slip.duration, Laya.Ease["backIn"]);
    };
    HelpPad.prototype.getFocusSize = function (id) {
        return this.conf.tablehead.focus.size[id];
    };
    HelpPad.prototype.getFocusPos = function (id) {
        return this.conf.tablehead.focus.pos[id];
    };
    HelpPad.prototype.onMouseEvent = function (e) {
        var x = e.stageX;
        var y = e.stageY;
        // Debug.trace('onMouseEvent e:');
        // Debug.trace(e);
        switch (e.type) {
            case Laya.Event.MOUSE_DOWN:
                this.bDrag = true;
                this.downPos.x = x;
                this.downPos.y = y;
                this.downPos.time = Tools.getTime();
                // this.scrollbar.moveStart();
                break;
            case Laya.Event.MOUSE_MOVE:
                if (this.bDrag) {
                    if (this.downPos.y > 0) {
                        var sumy = y - this.downPos.y;
                        this.downPos.y = y;
                        // Debug.trace("move content sumy:"+sumy);
                        this.moveCurContent(sumy);
                    }
                }
                break;
            case Laya.Event.MOUSE_OUT:
            case Laya.Event.MOUSE_UP:
                this.backAllContent();
                if (this.bDrag) {
                    var slp = this.isSlipscreenX(x, y);
                    if (slp > 0) {
                        this.tabChange(this.prevTab(), 1);
                    }
                    else if (slp < 0) {
                        this.tabChange(this.nextTab(), -1);
                    }
                    else {
                    }
                }
                this.downPos.x = 0;
                this.downPos.y = 0;
                this.downPos.time = 0;
                this.bDrag = false;
                // this.scrollbar.moveEnd();
                break;
        }
    };
    HelpPad.prototype.moveCurContent = function (y) {
        this.arr_content[this.curTabId].y += y;
    };
    HelpPad.prototype.backAllContent = function () {
        // for(var i in this.arr_content)
        for (var i = 0; i < this.arr_content.length; i++) {
            var ct = this.arr_content[i];
            var yHead = ct.y;
            var miny = this.conf.defaultItemConfs[i].pos.y;
            var yEnd = ct.y + ct.height; //this.conf.defaultItemConfs[i].size.h;
            var maxy = this.conf.content.rect.h;
            var backY = 0;
            var ctHeight = ct.height; //this.conf.defaultItemConfs[i].size.h;
            var showHeight = this.conf.content.rect.h;
            // Debug.trace("backAllContent i:"+i+" yHead:"+yHead+" yEnd:"+yEnd+" miny:"+miny+" maxy:"+maxy);
            if (yHead <= miny && yEnd >= maxy) {
            }
            else if (yHead > miny || ctHeight <= showHeight) {
                backY = miny - yHead;
                this.backActionAll(ct, backY);
            }
            else if (yEnd < maxy) {
                backY = maxy - yEnd;
                this.backActionAll(ct, backY);
            }
        }
    };
    HelpPad.prototype.backActionAll = function (sp, y) {
        var a = sp;
        var pos = {
            "x": a.x,
            "y": a.y + y
        };
        this.setAction(a, pos);
    };
    HelpPad.prototype.setAction = function (sp, pos) {
        var tween = Laya.Tween.to(sp, {
            x: pos.x,
            y: pos.y
        }, 200, Laya.Ease["backIn"]);
    };
    HelpPad.prototype.isSlipscreenX = function (x, y) {
        var dis = x - this.downPos.x;
        var abs_dis = Math.abs(dis);
        // Debug.trace("dis:"+dis+" conf dis:"+this.conf.slip.slipdis);
        if (abs_dis >= this.conf.slip.slipdis) {
            var ntime = Tools.getTime();
            var distime = ntime - this.downPos.time;
            // Debug.trace("distime:"+distime+" conf distime:"+this.conf.slip.slipdistime);
            if (distime <= this.conf.slip.slipdistime) {
                return dis;
            }
        }
        return 0;
    };
    HelpPad.prototype.isSlipscreenY = function (x, y) {
        var dis = y - this.downPos.y;
        var abs_dis = Math.abs(dis);
        // Debug.trace("dis:"+dis+" conf dis:"+this.conf.slip.slipdis);
        if (abs_dis >= this.conf.slip.slipdis) {
            var ntime = Tools.getTime();
            var distime = ntime - this.downPos.time;
            // Debug.trace("distime:"+distime+" conf distime:"+this.conf.slip.slipdistime);
            if (distime <= this.conf.slip.slipdistime) {
                return dis;
            }
        }
        return 0;
    };
    HelpPad.prototype.onMouse = function (e) {
        if (this.conf.touchout) {
            if (this.conf.touchout.value && e.type == Laya.Event.MOUSE_DOWN) {
                this.onClose(null);
            }
        }
    };
    HelpPad.prototype.onClose = function (s) {
        // this.closeCallback.apply(this.caller,[this]);
        this.hide();
    };
    HelpPad.prototype.setData = function () {
        // this.data = data;
        // if( !this.data )
        // {
        // Debug.trace("HelpPad setData == null");
        //     return;
        // }
        var conf = this.conf.defaultItemConfs; //[];//
        // for( var k in this.data)//conf )
        // {
        //     conf[k] = this.conf.defaultItemConfs[k];
        //     conf[k].href = this.data[k];
        // }
        // Debug.trace("HelpPad setData conf:");
        // Debug.trace(conf);
        this.initRuleContent(conf); //this.data);
        this.tabChange(0, 0);
    };
    return HelpPad;
}(Laya.Sprite));
//# sourceMappingURL=HelpPad.js.map