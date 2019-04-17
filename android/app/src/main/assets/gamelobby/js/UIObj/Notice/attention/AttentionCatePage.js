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
var AttentionCatePage = /** @class */ (function (_super) {
    __extends(AttentionCatePage, _super);
    function AttentionCatePage() {
        var _this = _super.call(this) || this;
        _this.downPos = {
            "x": 0,
            "y": 0
        };
        _this.curShowNoticeId = 0;
        _this.cateId = 0;
        return _this;
    }
    AttentionCatePage.prototype.init = function (conf, data, p) {
        this.conf = conf;
        this.data = data;
        this.myParentArrowNode = p;
        this.cateId = this.data.noticeCate;
        this.sp_content = new MySprite();
        this.sp_content.pos(this.conf.content.pos.x, this.conf.content.pos.y);
        this.addChild(this.sp_content);
        if (this.conf.content.color) {
            Tools.drawRectWithAlpha(this, this.conf.content.pos.x, this.conf.content.pos.y, this.conf.content.size.w, this.conf.content.size.h, this.conf.content.color, this.conf.content.colorAlpha);
        }
        this.scrollRect = new Laya.Rectangle(this.conf.content.pos.x, this.conf.content.pos.y, this.conf.content.size.w, this.conf.content.size.h);
        this.size(this.conf.content.size.w, this.conf.content.size.h);
        this.on(Laya.Event.MOUSE_DOWN, this, this.onMouseEvent);
        this.on(Laya.Event.MOUSE_MOVE, this, this.onMouseEvent);
        this.on(Laya.Event.MOUSE_UP, this, this.onMouseEvent);
        this.on(Laya.Event.MOUSE_OUT, this, this.onMouseEvent);
        this.arr_btns = new Array();
        for (var b = 0; b < data.noticeList.length; b++) {
            var btnData = data.noticeList[b];
            var id = this.arr_btns.length;
            var btn = this.addNoticeBtn(this.sp_content, id, btnData);
            this.sp_content.height += this.conf.btnitem.switch.size.h + this.conf.btnitem.switch.size.gh;
            this.arr_btns.push(btn);
        }
        this.sp_arrow = this.addArrow(this.myParentArrowNode, this.conf.arrow);
        this.pos(this.conf.pos.x, this.conf.pos.y);
        this.size(this.conf.content.size.w, this.conf.content.size.h);
        this.initHandleData();
    };
    AttentionCatePage.prototype.countUnread = function () {
        var num = 0;
        for (var a = 0; a < this.arr_btns.length; a++) {
            var b = this.arr_btns[a];
            if (!b.data.bread) {
                num += 1;
            }
        }
        return num;
    };
    AttentionCatePage.prototype.changeNotice = function (noticeid) {
        // Debug.trace("AttentionCatePage.changeNotice:"+noticeid);
        this.curShowNoticeId = noticeid;
        this.updateTab();
    };
    AttentionCatePage.prototype.updateTab = function () {
        for (var c = 0; c < this.arr_btns.length; c++) {
            var d = this.arr_btns[c];
            // Debug.trace("updateTab d:");
            // Debug.trace(d);
            if (d.data.noticeid == this.curShowNoticeId) {
                AttentionDialog.getObj().showAttention(d.data);
                d.setOn(1);
            }
            else {
                d.setOn(0);
            }
        }
    };
    AttentionCatePage.prototype.showDefaultNotice = function () {
        if (this.curShowNoticeId != 0) {
            this.changeNotice(this.curShowNoticeId);
        }
        else {
            if (this.arr_btns.length > 0) {
                var d = this.arr_btns[0];
                var nid = d.data.noticeid;
                this.changeNotice(nid);
            }
        }
    };
    AttentionCatePage.prototype.setReaded = function (noticeId) {
        for (var c = 0; c < this.arr_btns.length; c++) {
            var d = this.arr_btns[c];
            if (d.data.noticeid == noticeId) {
                d.setReaded(true);
            }
        }
    };
    AttentionCatePage.prototype.addArrow = function (node, conf) {
        var a = new PageArrow();
        a.init(conf);
        node.addChild(a);
        a.zOrder = conf.zOrder;
        return a;
    };
    AttentionCatePage.prototype.addNoticeBtn = function (node, id, data) {
        var ai = new AttentionItem();
        ai.init(this, this.conf.btnitem, id);
        ai.setData(data);
        ai.cateId = this.cateId;
        node.addChild(ai);
        return ai;
    };
    AttentionCatePage.prototype.onMouseEvent = function (e) {
        var x = e.stageX;
        var y = e.stageY;
        switch (e.type) {
            case Laya.Event.MOUSE_DOWN:
                this.bDrag = true;
                this.downPos.x = x;
                this.downPos.y = y;
                break;
            case Laya.Event.MOUSE_MOVE:
                if (this.downPos.y > 0) {
                    var sumy = y - this.downPos.y;
                    this.downPos.y = y;
                    this.moveAllItem(sumy);
                }
                break;
            case Laya.Event.MOUSE_OUT:
            case Laya.Event.MOUSE_UP:
                this.downPos.x = 0;
                this.downPos.y = 0;
                this.bDrag = false;
                this.backAllContent();
                break;
        }
    };
    AttentionCatePage.prototype.moveAllItem = function (dis) {
        this.sp_content.y += dis;
    };
    AttentionCatePage.prototype.initHandleData = function () {
        var ry = this.arr_btns.length * (this.conf.btnitem.switch.size.h + this.conf.btnitem.switch.size.gh);
        this.totalHeight = ry + this.conf.btnitem.switch.size.h + this.conf.btnitem.switch.size.gh;
        // this.miny = this.conf.content.size.h - this.totalHeight;
        // this.maxy = 0;
        this.refreshArrow();
    };
    AttentionCatePage.prototype.refreshArrow = function () {
        if (this.totalHeight <= this.height) {
            this.sp_arrow.visible = false;
        }
    };
    AttentionCatePage.prototype.backAllContent = function () {
        var ct = this.sp_content;
        var yHead = ct.y;
        var miny = this.conf.btnitem.pos.y;
        var yEnd = ct.y + ct.height; //this.conf.defaultItemConfs[i].size.h;
        var maxy = this.conf.content.size.h;
        var backY = 0;
        var ctHeight = ct.height; //this.conf.defaultItemConfs[i].size.h;
        var showHeight = this.conf.content.size.h;
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
    };
    AttentionCatePage.prototype.backActionAll = function (sp, y) {
        var a = sp;
        var pos = {
            "x": a.x,
            "y": a.y + y
        };
        this.setAction(a, pos);
    };
    AttentionCatePage.prototype.setAction = function (sp, pos) {
        var tween = Laya.Tween.to(sp, {
            x: pos.x,
            y: pos.y
        }, 200, Laya.Ease["backIn"]);
    };
    return AttentionCatePage;
}(MySprite));
//# sourceMappingURL=AttentionCatePage.js.map