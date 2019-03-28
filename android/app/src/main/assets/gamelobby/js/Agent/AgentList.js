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
var AgentList = /** @class */ (function (_super) {
    __extends(AgentList, _super);
    function AgentList(node, conf) {
        var _this = _super.call(this) || this;
        _this.fatherNode = node;
        _this.conf = conf;
        _this.sp_content = new Laya.Sprite();
        _this.addChild(_this.sp_content);
        if (_this.conf.list.pos) {
            _this.pos(_this.conf.list.pos.x, _this.conf.list.pos.y);
        }
        if (_this.conf.list.size) {
            _this.size(_this.conf.list.size.w, _this.conf.list.size.h);
            // this.sp_content.scrollRect = new Laya.Rectangle(
            //     0,0,
            //     this.conf.list.size.w,this.conf.list.size.h
            // );
            _this.scrollRect = new Laya.Rectangle(0, 0, _this.conf.list.size.w, _this.conf.list.size.h);
        }
        if (_this.conf.list.frame) {
            Tools.drawRectWithAlpha(_this, 0, 0, _this.conf.list.size.w, _this.conf.list.size.h, _this.conf.list.frame.color, _this.conf.list.frame.alpha);
        }
        _this.arr_items = new Array();
        _this.on(Laya.Event.MOUSE_DOWN, _this, _this.onMouseEvent);
        return _this;
        // this.on(Laya.Event.MOUSE_UP,this,this.onMouseEvent);
        // this.on(Laya.Event.MOUSE_MOVE,this,this.onMouseEvent);
        // this.on(Laya.Event.MOUSE_OUT,this,this.onMouseEvent);
    }
    AgentList.prototype.onMouseEvent = function (e) {
        var x = e.stageX;
        switch (e.type) {
            case Laya.Event.MOUSE_DOWN:
                var max = this.conf.list.size.h - this.sp_content.height;
                // Debug.trace("AgentList.onMouseEvent max:"+max);
                if (max < 0) {
                    this.sp_content.startDrag(new Laya.Rectangle(0, max, 0, Math.abs(max)), this.conf.list.guanxing, this.conf.list.xiangpiDis, this.conf.list.xiangpiTime, null, true, 0.92);
                }
                else {
                    this.sp_content.startDrag(new Laya.Rectangle(0, 0, 0, 0), this.conf.list.guanxing, this.conf.list.xiangpiDis, this.conf.list.xiangpiTime, null, true, 0.92);
                }
                break;
        }
    };
    AgentList.prototype.clearItems = function () {
        if (this.arr_items.length > 0) {
            for (var a = 0; a < this.arr_items.length; a++) {
                var b = this.arr_items[a];
                b.destroy(true);
                this.sp_content.removeChild(b);
            }
            this.arr_items.splice(0);
        }
    };
    AgentList.prototype.setData = function (data) {
        this.clearItems();
        this.data = data;
        var dlen = this.data.length;
        var h = 0;
        for (var i = 0; i < dlen; i++) {
            var d = this.data[i];
            var item = this.addItem(d);
            this.sp_content.addChild(item);
            this.arr_items.push(item);
            h += item.height;
        }
        this.sp_content.size(this.conf.list.size.w, h);
    };
    AgentList.prototype.addItem = function (d) {
        // Debug.trace("AgentList.addItem d:");
        // Debug.trace(d);
        var sp = new AgentListItem();
        sp.setData(d);
        var lineId = this.arr_items.length;
        if (lineId % 2 == 1) {
            if (this.conf.list.item.bg) {
                Tools.addSprite(sp, this.conf.list.item.bg);
                if (this.conf.list.item.bg.color) {
                    Tools.drawRectWithAlpha(sp, 0, 0, this.conf.list.size.w, this.conf.list.item.h, this.conf.list.item.bg.color, this.conf.list.item.bg.alpha);
                }
            }
        }
        var len = this.conf.items.length;
        for (var i = 0; i < len; i++) {
            var cf = this.conf.items[i];
            var lb = Tools.addLabels(sp, cf);
            lb.text = d[cf.data];
            // Debug.trace("AgentList.addItem d["+" cf.data:"+cf.data+"]:"+d[cf.data]);
        }
        var y = lineId * (this.conf.list.item.h + this.conf.list.item.gh);
        sp.pos(0, y);
        var height = (this.conf.list.item.h + this.conf.list.item.gh);
        sp.size(this.conf.list.size.w, height);
        // sp.on(Laya.Event.CLICK,this,this.onClickItem);
        return sp;
    };
    AgentList.prototype.onClickItem = function (e) {
        // Debug.trace("AgentList.onClickItem e:");
        // Debug.trace(e);
        var btn = e;
        var cmd = btn.getQuery();
        switch (cmd) {
            case "modify":
                AgentDialogEditAccountType.showDialog(Laya.stage, ConfObjRead.getConfAgentDialogEditAccountType());
                break;
        }
    };
    return AgentList;
}(Laya.Sprite));
//# sourceMappingURL=AgentList.js.map