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
/**
 * 头像列表选取弹框
 */
var AvatorPad = /** @class */ (function (_super) {
    __extends(AvatorPad, _super);
    function AvatorPad() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.downPos = {
            "x": 0,
            "y": 0
        };
        _this.downClickPos = {
            "x": 0,
            "y": 0
        };
        _this.cur_icon_id = 0;
        _this.cur_choose_id = -1;
        return _this;
    }
    AvatorPad.getObj = function () {
        return AvatorPad.obj;
    };
    AvatorPad.prototype.destroy = function (b) {
        AvatorPad.obj = null;
        _super.prototype.destroy.call(this, b);
    };
    AvatorPad.showPad = function (node) {
        if (!AvatorPad.obj) {
            var o = new AvatorPad();
            o.init(ConfObjRead.getConfAvatorPad());
            node.addChild(o);
        }
    };
    AvatorPad.prototype.hide = function () {
        // this.lb_content.text = "";
        this.visible = false;
        AvatorPad.obj = null;
        LayaMain.getInstance().getRootNode().removeChild(this);
        this.destroy(true);
        // lamain.restoreLoaderPath();
    };
    AvatorPad.prototype.init = function (conf) {
        AvatorPad.obj = this;
        this.conf = conf;
        this.data = Common.userInfo; //headicon.data;
        // Debug.trace('this.data:');
        // Debug.trace(this.data);
        this.initAlphaBg();
        this.initBg(this.conf.bg);
        this.initCurAvator(this.conf.curavator);
        var sp_title_lb = Tools.newSprite(this.conf.title.lb);
        this.addChild(sp_title_lb);
        if (this.conf.content.bg) {
            var bgcontent = Tools.addSprite(this, this.conf.content.bg);
        }
        this.sp_content = new MySprite();
        this.sp_content.pos(this.conf.content.pos.x, this.conf.content.pos.y);
        this.addChild(this.sp_content);
        this.sp_content.scrollRect = new Laya.Rectangle(this.conf.content.ctmask.x, this.conf.content.ctmask.y, this.conf.content.ctmask.w, this.conf.content.ctmask.h);
        this.sp_content.size(this.conf.content.ctmask.w, this.conf.content.ctmask.h);
        this.sp_content.on(Laya.Event.MOUSE_DOWN, this, this.onMouseEvent);
        this.sp_content.on(Laya.Event.MOUSE_MOVE, this, this.onMouseEvent);
        this.sp_content.on(Laya.Event.MOUSE_UP, this, this.onMouseEvent);
        this.sp_content.on(Laya.Event.MOUSE_OUT, this, this.onMouseEvent);
        this.createAvators();
        this.sp_focus = Tools.newSprite(this.conf.content.focus);
        this.sp_content.addChild(this.sp_focus);
        this.sp_focus.visible = false;
        if (this.conf.close) {
            this.close = new MyButton();
            this.close.init(this.conf.close, this, this.onClose);
            this.close.pos(this.conf.close.pos.x, this.conf.close.pos.y);
            this.addChild(this.close);
        }
        this.pos(this.conf.pos.x, this.conf.pos.y);
    };
    AvatorPad.prototype.initAlphaBg = function () {
        //todo:xxx
        // this.alphabg = new MySprite();
        // Tools.drawRectWithAlpha(this.alphabg,
        // 	0,0,
        // 	this.conf.size.w,this.conf.size.h,
        //     "#000000",
        //     this.conf.mask.alpha);
        // this.alphabg.size(this.conf.size.w,this.conf.size.h);
        // this.alphabg.pos(-this.conf.pos.x,-this.conf.pos.y);
        this.alphabg = Tools.creatDlgBg();
        this.addChild(this.alphabg);
        this.alphabg.on(Laya.Event.MOUSE_DOWN, this, this.onMouse);
        this.alphabg.on(Laya.Event.MOUSE_UP, this, this.onMouse);
        this.alphabg.on(Laya.Event.MOUSE_MOVE, this, this.onMouse);
    };
    AvatorPad.prototype.initBg = function (conf) {
        if (!conf) {
            return;
        }
        var sp_bg = Tools.addSprite(this, conf);
    };
    AvatorPad.prototype.initCurAvator = function (conf) {
        if (!conf) {
            return;
        }
        if (conf) {
            if (conf.bg) {
                var sp_curavator_bg = Tools.addSprite(this, conf.bg);
            }
            if (conf.title) {
                var sp_lb = new MySprite();
                sp_lb.loadImage(conf.title.lb.src);
                sp_lb.pos(conf.title.lb.pos.x, conf.title.lb.pos.y);
                this.addChild(sp_lb);
                var sp_p1 = new MySprite();
                sp_p1.loadImage(conf.title.point1.src);
                sp_p1.pos(conf.title.point1.pos.x, conf.title.point1.pos.y);
                this.addChild(sp_p1);
                var sp_p2 = new MySprite();
                sp_p2.loadImage(conf.title.point2.src);
                sp_p2.pos(conf.title.point2.pos.x, conf.title.point2.pos.y);
                this.addChild(sp_p2);
            }
            if (conf.avator) {
                if (conf.iconframe) {
                    var iconframe = Tools.addSprite(this, conf.iconframe);
                }
                this.sp_icon = new MySprite();
                this.sp_icon.loadImage(conf.avator.src);
                this.sp_icon.pos(conf.avator.pos.x, conf.avator.pos.y);
                this.addChild(this.sp_icon);
                var scx = conf.avator.size.w / this.sp_icon.width;
                var scy = conf.avator.size.h / this.sp_icon.height;
                this.sp_icon.scale(scx, scy);
            }
            if (conf.id) {
                if (conf.id.bg) {
                    var sp_idbg = Tools.newSprite(conf.id.bg);
                    this.addChild(sp_idbg);
                    // Debug.trace("idbg");
                }
                if (conf.id.label) {
                    this.lb_id = Tools.addLabels(this, conf.id.label);
                }
            }
            if (conf.money) {
                if (conf.money.bg) {
                    var sp_idbg = Tools.newSprite(conf.money.bg);
                    this.addChild(sp_idbg);
                }
                if (conf.money.label) {
                    this.lb_money = Tools.addLabels(this, conf.money.label);
                    var v = Common.userInfo.userBalance.balance;
                    v = Tools.FormatMoney(v, 2);
                    this.lb_money.text = v;
                }
            }
            if (conf.btnchange) {
                this.btnchange = new MyButton();
                this.btnchange.init(conf.btnchange, this, this.onSure);
                this.btnchange.pos(conf.btnchange.pos.x, conf.btnchange.pos.y);
                this.addChild(this.btnchange);
                this.btnchange.visible = false;
            }
            if (conf.btnchangedis) {
                this.btnchangedis = new MyButton();
                this.btnchangedis.init(conf.btnchangedis, this, this.onSureDis);
                this.btnchangedis.pos(conf.btnchangedis.pos.x, conf.btnchangedis.pos.y);
                this.btnchangedis.bclick = false;
                this.addChild(this.btnchangedis);
            }
            this.resetIconAndID();
        }
    };
    AvatorPad.prototype.resetIconAndID = function () {
        // this.data.headerIndex = Tools.transNickname2id(this.data.username);
        if (!this.data) {
            this.data = { "avatorId": 1, "userId": "123456" };
        }
        var id = parseInt(this.data.avatorId); //.headerIndex);
        this.setIcon(id);
        // this.setId(this.data.userId);
        this.setName(this.data.username);
    };
    AvatorPad.prototype.onSure = function (e) {
        this.requestAvatorSave(ConfObjRead.getConfUrl().url.apihome +
            ConfObjRead.getConfUrl().cmd.avatorsave +
            "?access_token=" + Common.access_token +
            "&avatar=" + this.cur_choose_id);
    };
    AvatorPad.prototype.saveAvatorSuc = function () {
        if (this.cur_choose_id >= 0) {
            this.setIcon(this.cur_choose_id);
            Common.userInfo.avatorId = Tools.FormatNumber(this.cur_choose_id, 2);
            EventManager.dispath(EventType.FLUSH_HEADICON, Common.userInfo.avatorId);
            //todo:xxx
            // HeadIcon.refreshAvator();
            AccountCenter.getObj().setIcon(Common.userInfo.avatorId);
            SaveManager.getObj().save(SaveManager.KEY_SFX_VL, Common.userInfo.avatorId);
            this.btnEnable(false);
        }
    };
    AvatorPad.prototype.onSureDis = function (e) {
        // Debug.trace('btn change dis click');
    };
    AvatorPad.prototype.requestAvatorSave = function (url) {
        LayaMain.getInstance().showCircleLoading();
        // MySaiziLoading.showPad(this,ConfObjRead.getConfCLoading(),null);
        var header = [
            // "Content-Type","application/json",
            // "Accept","*/*"
            "Accept", "application/json"
        ];
        NetManager.getObj().HttpConnect(url, this, this.responseAvatorSave, header, null, "PUT", //"get",
        "json");
    };
    AvatorPad.prototype.responseAvatorSave = function (s, stat, hr) {
        // Debug.trace("responseAvatorSave stat:"+stat);
        // Debug.trace(s);
        // Debug.trace("hr:");
        // Debug.trace(hr);
        if (MyBBLoading.obj) {
            MyBBLoading.obj.show(false);
        }
        if (stat == "complete") {
            this.saveAvatorSuc();
        }
        else {
            if (stat == "error" && hr.http.status == 200) {
                this.saveAvatorSuc();
                return;
            }
            Toast.showToast(s);
        }
    };
    AvatorPad.prototype.createAvators = function () {
        if (this.conf.content.avators) {
            var id = 0;
            var confa = this.conf.content.avatorsconf;
            if (!this.arr_items) {
                this.arr_items = new Array();
            }
            else {
                this.arr_items.splice(0, this.arr_items.length);
            }
            // for( var k in this.conf.content.avators )
            var alen = this.conf.content.avators.length;
            for (var k = 0; k < alen; k++) {
                var a_src = this.conf.content.avators[k];
                // Debug.trace(k+' a_arc:'+a_src);
                var sp_icon = new MySprite();
                sp_icon.name = "" + id;
                sp_icon.loadImage(a_src);
                this.sp_content.addChild(sp_icon);
                //头像框
                var sp_frame = Tools.newSprite(confa.iconframe);
                sp_icon.addChild(sp_frame);
                var x = 0, y = 0, w = 0, h = 0;
                var idh = 0, idv = 0;
                w = confa.size.w;
                h = confa.size.h;
                idh = Math.floor(id / confa.pos.counth); //行号
                idv = Math.floor(id % confa.pos.counth); //列号
                x = confa.pos.startx + idv * (w + confa.size.hg);
                y = confa.pos.starty + idh * (h + confa.size.vg);
                sp_icon.pos(x, y);
                var scx = w / sp_icon.width;
                var scy = h / sp_icon.height;
                sp_icon.scale(scx, scy);
                // sp_icon.on(Laya.Event.CLICK,this,this.onClickImg);
                this.arr_items.push(sp_icon);
                id++;
            }
        }
    };
    AvatorPad.prototype.onClickImg = function (spe) {
        if (!spe) {
            return;
        }
        var sp = spe; //e.target;
        var pos = {
            "x": this.conf.content.focus.pos.x + sp.x,
            "y": this.conf.content.focus.pos.y + sp.y
        };
        if (this.sp_focus) {
            if (!this.sp_focus.visible) {
                this.sp_focus.visible = true;
            }
            this.sp_focus.pos(pos.x, pos.y);
        }
        this.cur_choose_id = parseInt(sp.name) + 1;
        if (!Tools.isNumber(this.cur_choose_id)) {
            this.cur_choose_id = 0;
        }
        if (this.cur_choose_id == this.cur_icon_id) {
            this.btnEnable(false);
        }
        else {
            this.btnEnable(true);
        }
    };
    AvatorPad.prototype.btnEnable = function (b) {
        if (this.btnchange) {
            this.btnchange.visible = b;
            // this.btnchange.setEnabled(b,true);
        }
        if (this.btnchangedis) {
            this.btnchangedis.visible = !b;
        }
    };
    AvatorPad.prototype.setIcon = function (id) {
        this.cur_icon_id = id;
        if (this.sp_icon) {
            this.drawIcon(id);
        }
    };
    AvatorPad.prototype.drawIcon = function (id) {
        if (!this.sp_icon) {
            return;
        }
        this.sp_icon.graphics.clear();
        var index = Tools.FormatNumber(id, 2);
        var res = ConfObjRead.getConfAvator().headicon.picnamehead +
            index +
            ConfObjRead.getConfAvator().headicon.picnameend;
        var tex = Laya.loader.getRes(Tools.getSrc(res));
        this.sp_icon.graphics.drawTexture(tex, 0, 0);
    };
    AvatorPad.prototype.setId_ = function (id) {
        if (this.lb_id) {
            this.lb_id.text = Tools.getStringByKey(this.conf.curavator.id.label.font.pretext) + "" + id;
        }
    };
    AvatorPad.prototype.setName = function (id) {
        if (this.lb_id) {
            this.lb_id.text = Tools.getStringByKey(this.conf.curavator.id.label.font.pretext) + "" + id;
        }
    };
    AvatorPad.prototype.getClickImg = function (pos) {
        // for(var k in this.arr_items)
        for (var k = 0; k < this.arr_items.length; k++) {
            var img = this.arr_items[k];
            // Debug.trace("img x:"+img.mouseX+" y:"+img.mouseY);
            if (img.mouseX > 0 && img.mouseX < img.width) {
                if (img.mouseY > 0 && img.mouseY < img.height) {
                    return img;
                }
            }
        }
        return null;
    };
    AvatorPad.prototype.onMouseEvent = function (e) {
        var x = e.stageX;
        var y = e.stageY;
        // Debug.trace('onMouseEvent e:');
        // Debug.trace(e);
        switch (e.type) {
            case Laya.Event.MOUSE_DOWN:
                this.bDrag = true;
                this.downPos.x = x;
                this.downPos.y = y;
                // this.scrollbar.moveStart();
                this.downClickPos.x = x;
                this.downClickPos.y = y;
                break;
            case Laya.Event.MOUSE_MOVE:
                // if( this.downPos.x > 0 )
                // {
                //     var sumx = x - this.downPos.x;
                //     this.downPos.x = x;
                // this.moveAllItem(sumx);
                // }
                if (this.downPos.y > 0 && this.bDrag) {
                    var sumy = y - this.downPos.y;
                    if (sumy != 0) {
                        this.downPos.y = y;
                        this.moveAllIcons(0, sumy);
                    }
                }
                break;
            case Laya.Event.MOUSE_OUT:
            case Laya.Event.MOUSE_UP:
                var upPos = { x: e.stageX, y: e.stageY };
                if (Tools.isClick(this.downClickPos, upPos)) {
                    // Debug.trace("isClick");
                    this.onClickImg(this.getClickImg(upPos));
                }
                else {
                    if (this.bDrag) {
                        // this.scrollbar.moveEnd();
                        this.moveAllEnd();
                    }
                }
                this.downClickPos.x = 0;
                this.downClickPos.y = 0;
                this.downPos.x = 0;
                this.downPos.y = 0;
                this.bDrag = false;
                break;
        }
    };
    AvatorPad.prototype.moveAllEnd = function () {
        var len = this.arr_items.length;
        var yHead = this.arr_items[0].y;
        var miny = this.conf.content.avatorsconf.pos.starty;
        var yEnd = this.arr_items[len - 1].y + this.arr_items[len - 1].height;
        var maxy = this.conf.content.ctmask.h - 15;
        var backY = 0;
        Debug.trace("yHead:" + yHead + " miny:" + miny + " yEnd:" + yEnd + " maxy:" + maxy);
        if (yHead <= miny && yEnd >= maxy) {
        }
        else if (yHead > miny) {
            backY = miny - yHead;
            this.backActionAll(backY);
        }
        else if (yEnd < maxy) {
            backY = maxy - yEnd;
            this.backActionAll(backY);
        }
    };
    AvatorPad.prototype.backActionAll = function (y) {
        // for(var k in this.arr_items)
        for (var k = 0; k < this.arr_items.length; k++) {
            var a = this.arr_items[k];
            var pos = {
                "x": a.x,
                "y": a.y + y
            };
            this.setAction(a, pos);
        }
        var pos = {
            "x": this.sp_focus.x,
            "y": this.sp_focus.y + y
        };
        this.setAction(this.sp_focus, pos);
    };
    AvatorPad.prototype.setAction = function (sp, pos) {
        var tween = Laya.Tween.to(sp, {
            x: pos.x,
            y: pos.y
        }, 200, Laya.Ease["backIn"]);
    };
    AvatorPad.prototype.moveAllIcons = function (x, y) {
        var ailen = this.arr_items.length;
        for (var k = 0; k < ailen; k++) {
            var sp = this.arr_items[k];
            sp.y += y; //sumy;
        }
        if (this.sp_focus.visible) {
            this.sp_focus.y += y;
        }
    };
    AvatorPad.prototype.onMouse = function (e) {
        if (this.conf.touchout) {
            if (this.conf.touchout.value && e.type == Laya.Event.MOUSE_DOWN) {
                this.onClose(null);
            }
        }
    };
    AvatorPad.prototype.onClose = function (s) {
        // this.closeCallback.apply(this.caller,[this]);
        this.hide();
    };
    return AvatorPad;
}(MySprite));
//# sourceMappingURL=AvatorPad.js.map