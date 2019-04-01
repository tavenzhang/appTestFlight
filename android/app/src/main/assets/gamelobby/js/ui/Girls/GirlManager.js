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
var GirlManager = /** @class */ (function (_super) {
    __extends(GirlManager, _super);
    function GirlManager() {
        var _this = _super.call(this) || this;
        _this.cur_choose_id = -1;
        _this.bDrag = false;
        _this.dragStartPos = {};
        _this.dragDownPos = {};
        _this.iDragPercent = 0;
        _this.arr_focus = new Array();
        _this.arr_items = new Array();
        return _this;
    }
    GirlManager.getInstance = function (node) {
        if (node === void 0) { node = null; }
        if (!GirlManager.obj && node != null) {
            var o = new GirlManager();
            o.init(ConfObjRead.getConfGirlManager());
            node.addChild(o);
        }
        return GirlManager.obj;
    };
    GirlManager.prototype.destroy = function (b) {
        GirlManager.obj = null;
        _super.prototype.destroy.call(this, b);
    };
    GirlManager.prototype.hide = function () {
        this.visible = false;
        this.destroy(true);
    };
    GirlManager.prototype.init = function (conf) {
        GirlManager.obj = this;
        this.conf = conf;
        this.sp_content = new Laya.Sprite();
        this.sp_content.pos(this.conf.content.pos.x, this.conf.content.pos.y);
        this.addChild(this.sp_content);
        this.sp_content.scrollRect = new Laya.Rectangle(this.conf.content.rect.x, this.conf.content.rect.y, this.conf.content.rect.w, this.conf.content.rect.h);
        this.sp_content.size(this.conf.content.rect.w, this.conf.content.rect.h);
        if (this.conf.moveAction) {
            this.sp_content.on(Laya.Event.MOUSE_DOWN, this, this.onMouseEvent);
            this.sp_content.on(Laya.Event.MOUSE_MOVE, this, this.onMouseEvent);
            this.sp_content.on(Laya.Event.MOUSE_UP, this, this.onMouseEvent);
            this.sp_content.on(Laya.Event.MOUSE_OUT, this, this.onMouseEvent);
        }
        if (this.conf.content.frame) {
            // this.sp_content.graphics.drawRect(this.conf.rect.x,this.conf.rect.y,this.conf.rect.w,this.conf.rect.h,this.conf.frame.color);
            Tools.drawRectWithAlpha(this.sp_content, this.conf.content.rect.x, this.conf.content.rect.y, this.conf.content.rect.w, this.conf.content.rect.h, this.conf.content.frame.color, this.conf.content.frame.alpha);
        }
        this.createContents();
        if (this.conf.tabsItem) {
            this.initFocus(this.conf.tabsItem);
        }
        this.showFocusById(this.conf.tabsItem.defaultId);
        this.pos(this.conf.pos.x, this.conf.pos.y);
    };
    GirlManager.prototype.initFocus = function (conf) {
        if (!conf.bswitch) {
            return;
        }
        var fcontent = new Laya.Sprite();
        fcontent.pos(conf.pos.x, conf.pos.y);
        this.addChild(fcontent);
        var gw = conf.jianju.w;
        var gh = conf.jianju.h;
        var w = conf.size.w;
        var h = conf.size.h;
        var x = 0, y = 0;
        var len = this.conf.content.girls.length;
        var half = (w + gw) / 2;
        var ll = len - 1;
        var sumx = -1 * (ll * half);
        x = x + sumx;
        for (var i = 0; i < len; i++) {
            var sb = new MySwitchBtn();
            sb.init(conf.switch, this, this.onSwitchClick);
            fcontent.addChild(sb);
            sb.setOn(0, false);
            // sb.setOn(1,false);
            sb.pos(x, y);
            sb.bclick = conf.switch.bClick;
            x += w + gw;
            this.arr_focus.push(sb);
        }
    };
    GirlManager.prototype.nextGirlId = function () {
        var next = this.cur_choose_id + 1;
        if (next >= this.arr_items.length) {
            next = 0;
        }
        return next;
    };
    GirlManager.prototype.prevGirlId = function () {
        var next = this.cur_choose_id - 1;
        if (next < 0) {
            next = this.arr_items.length - 1;
        }
        return next;
    };
    GirlManager.prototype.showFocusById = function (id) {
        if (!this.arr_items[id]) {
            return;
        }
        this.cur_choose_id = id;
        // Debug.trace("GirlManager.showFocusById id:"+id);
        if (this.arr_focus) {
            for (var i = 0; i < this.arr_focus.length; i++) {
                var sb = this.arr_focus[i];
                sb.setOn(0, false);
            }
            if (this.arr_focus[id]) {
                this.arr_focus[id].setOn(1, false);
            }
        }
        if (this.arr_items) {
            for (var i = 0; i < this.arr_items.length; i++) {
                var si = this.arr_items[i];
                si.visible = false;
            }
            if (this.arr_items[id]) {
                this.arr_items[id].visible = true;
            }
        }
    };
    //
    GirlManager.prototype.onSwitchClick = function () {
    };
    GirlManager.prototype.requestAvatorSave = function (url) {
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
    GirlManager.prototype.responseAvatorSave = function (s, stat, hr) {
        // Debug.trace("responseAvatorSave stat:"+stat);
        // Debug.trace(s);
        // Debug.trace("hr:");
        // Debug.trace(hr);
        if (MyBBLoading.obj) {
            MyBBLoading.obj.show(false);
        }
        if (stat == "complete") {
            // this.saveAvatorSuc();
        }
        else {
            if (stat == "error" && hr.http.status == 200) {
                // this.saveAvatorSuc();
                return;
            }
            Toast.showToast(s);
        }
    };
    GirlManager.prototype.createContents = function () {
        if (this.conf.content.girls) {
            var confa = this.conf.content.girls;
            var alen = this.conf.content.girls.length;
            if (!this.arr_items) {
                this.arr_items = new Array();
            }
            else {
                this.arr_items.splice(0, this.arr_items.length);
            }
            for (var k = 0; k < alen; k++) {
                var a_src = this.conf.content.girls[k];
                var sp_icon = new Girl(a_src, this.conf.content.girl); //new Laya.Sprite();
                // sp_icon.loadImage(a_src);
                var w = sp_icon.width;
                var h = sp_icon.height;
                // Debug.trace("k"+k+" w"+w+" h:"+h);
                sp_icon.pivot(w / 2, h);
                // var x = this.conf.content.rect.w/2;
                // var y = this.conf.content.rect.h;// + this.conf.content.rect.y;
                var x = this.conf.content.girl.initpos.x;
                var y = this.conf.content.girl.initpos.y;
                // Debug.trace("k"+k+" x"+x+" y:"+y);
                sp_icon.initPos(x, y);
                sp_icon.setListener(k, this, this.onGirlEvent);
                sp_icon.visible = false;
                this.sp_content.addChild(sp_icon);
                this.arr_items.push(sp_icon);
            }
        }
    };
    GirlManager.prototype.onGirlEvent = function (girl, moveEvent, moveType, direct) {
        // Debug.trace("GirlManager.onGirlEvent id:"+girl.id+" event:"+moveEvent+" type:"+moveType+" direct:"+direct);
        switch (moveType) {
            case Girl.MOVE_TYPE_IN:
                switch (moveEvent) {
                    case Girl.MOVE_EVENT_START:
                        break;
                    case Girl.MOVE_EVENT_END:
                        girl.reset();
                        this.showFocusById(girl.id); //this.nextGirlId());
                        break;
                }
                break;
            case Girl.MOVE_TYPE_OUT:
                switch (moveEvent) {
                    case Girl.MOVE_EVENT_START:
                        this.bDrag = false;
                        var nextObj = null;
                        switch (direct) {
                            case Girl.MOVE_DIRECT_LEFT:
                                nextObj = this.getGirlObj(this.nextGirlId());
                                break;
                            case Girl.MOVE_DIRECT_RIGHT:
                            default:
                                nextObj = this.getGirlObj(this.prevGirlId());
                                break;
                        }
                        // Debug.trace("GirlManager.onGirlEvent id:"+nextObj.id+" next move start:"+nextObj.id);
                        if (nextObj && !nextObj.bAutogo) {
                            // Debug.trace("GirlManager.onGirlEvent id:"+nextObj.id+" moveIn direct:"+direct);
                            nextObj.moveIn(direct);
                        }
                        break;
                    case Girl.MOVE_EVENT_END:
                        break;
                }
                break;
            case Girl.MOVE_TYPE_BACK:
                switch (moveEvent) {
                    case Girl.MOVE_EVENT_END:
                        girl.reset();
                        break;
                }
                break;
        }
    };
    GirlManager.prototype.getGirlObj = function (id) {
        if (!this.arr_items[id]) {
            return;
        }
        var obj = this.arr_items[id];
        return obj;
    };
    GirlManager.prototype.refreshDrag = function (x, y) {
        var sumx = this.dragStartPos.x - x;
        var obj = this.getGirlObj(this.cur_choose_id);
        var newx = obj.x - sumx;
        // Debug.trace("GirlManager.refreshDrag obj x:"+obj.x+" y:"+obj.y);
        // Debug.trace("GirlManager.refreshDrag mouse x:"+x+" y:"+y);
        // Debug.trace("GirlManager.refreshDrag sum x:"+sumx+" newx:"+newx);
        this.dragStartPos.x = x;
        obj.pos(newx, obj.y);
        var direct = Girl.MOVE_DIRECT_LEFT;
        if (x > this.dragDownPos.x) {
            direct = Girl.MOVE_DIRECT_RIGHT;
        }
        else if (x < this.dragDownPos.x) {
            direct = Girl.MOVE_DIRECT_LEFT;
        }
        obj.refreshMoveState(sumx, direct);
    };
    GirlManager.prototype.backDrag = function () {
        var obj = this.getGirlObj(this.cur_choose_id);
        if (obj && !obj.bAutogo) {
            obj.moveBack();
        }
    };
    GirlManager.prototype.onMouseEvent = function (e) {
        var x = e.stageX;
        var y = e.stageY;
        switch (e.type) {
            case Laya.Event.MOUSE_DOWN:
                if (!this.bDrag) {
                    var obj_now = this.getGirlObj(this.cur_choose_id);
                    if (obj_now && !obj_now.bAutogo) {
                        this.bDrag = true;
                        this.dragStartPos = {
                            "x": x,
                            "y": y
                        };
                        this.dragDownPos = {
                            "x": x,
                            "y": y
                        };
                        this.iDragPercent = 0;
                    }
                }
                break;
            case Laya.Event.MOUSE_MOVE:
                if (this.bDrag) {
                    this.refreshDrag(x, y);
                }
                break;
            case Laya.Event.MOUSE_OUT:
            case Laya.Event.MOUSE_UP:
                if (this.bDrag) {
                    this.backDrag();
                    this.bDrag = false;
                }
                break;
        }
    };
    return GirlManager;
}(Laya.Sprite));
//# sourceMappingURL=GirlManager.js.map