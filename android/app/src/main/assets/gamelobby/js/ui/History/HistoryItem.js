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
var HistoryItem = /** @class */ (function (_super) {
    __extends(HistoryItem, _super);
    function HistoryItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HistoryItem.prototype.init = function (conf, id) {
        this.conf = conf;
        this.id = id;
        this.lb_id = Tools.newLabel(this.conf.id.font.text, this.conf.id.size.w, this.conf.id.size.h, this.conf.id.font.size, this.conf.id.font.color, this.conf.id.font.align, this.conf.id.font.valign, this.conf.id.font.name, this.conf.id.font.wrap);
        if (this.conf.id.font.borderColor) {
            this.lb_id.borderColor = this.conf.id.font.borderColor;
        }
        this.lb_id.pos(this.conf.id.pos.x, this.conf.id.pos.y);
        this.addChild(this.lb_id);
        this.lb_gameid = Tools.newLabel(this.conf.gameid.font.text, this.conf.gameid.size.w, this.conf.gameid.size.h, this.conf.gameid.font.size, this.conf.gameid.font.color, this.conf.gameid.font.align, this.conf.gameid.font.valign, this.conf.gameid.font.name, this.conf.gameid.font.wrap, this.conf.gameid.font.underline);
        if (this.conf.gameid.font.borderColor) {
            this.lb_gameid.borderColor = this.conf.gameid.font.borderColor;
        }
        this.lb_gameid.pos(this.conf.gameid.pos.x, this.conf.gameid.pos.y);
        this.addChild(this.lb_gameid);
        // this.lb_gameid.visible = false;
        this.lb_gameid.on(Laya.Event.MOUSE_DOWN, this, Tools.copy2clip_win, [this.lb_gameid]);
        this.lb_room = Tools.newLabel(this.conf.room.font.text, this.conf.room.size.w, this.conf.room.size.h, this.conf.room.font.size, this.conf.room.font.color, this.conf.room.font.align, this.conf.room.font.valign, this.conf.room.font.name, this.conf.room.font.wrap);
        if (this.conf.room.font.borderColor) {
            this.lb_room.borderColor = this.conf.room.font.borderColor;
        }
        this.lb_room.pos(this.conf.room.pos.x, this.conf.room.pos.y);
        this.addChild(this.lb_room);
        this.lb_earn = Tools.newLabel(this.conf.earn.font.text, this.conf.earn.size.w, this.conf.earn.size.h, this.conf.earn.font.size, this.conf.earn.font.color, this.conf.earn.font.align, this.conf.earn.font.valign, this.conf.earn.font.name, this.conf.earn.font.wrap);
        if (this.conf.earn.font.borderColor) {
            this.lb_earn.borderColor = this.conf.earn.font.borderColor;
        }
        this.lb_earn.pos(this.conf.earn.pos.x, this.conf.earn.pos.y);
        this.addChild(this.lb_earn);
        this.lb_endtime = Tools.newLabel(this.conf.endtime.font.text, this.conf.endtime.size.w, this.conf.endtime.size.h, this.conf.endtime.font.size, this.conf.endtime.font.color, this.conf.endtime.font.align, this.conf.endtime.font.valign, this.conf.endtime.font.name, this.conf.endtime.font.wrap);
        if (this.conf.endtime.font.borderColor) {
            this.lb_endtime.borderColor = this.conf.endtime.font.borderColor;
        }
        this.lb_endtime.pos(this.conf.endtime.pos.x, this.conf.endtime.pos.y);
        this.addChild(this.lb_endtime);
    };
    HistoryItem.prototype.setData = function (data) {
        this.data = data;
        if (this.lb_id) {
            this.lb_id.text = this.data.id; //"1";
        }
        if (this.lb_gameid) {
            this.lb_gameid.text = this.data.gameid; //"111111111";
        }
        if (this.lb_room) {
            this.lb_room.text = this.data.room; //"xx房";
        }
        if (this.lb_earn) {
            if (this.data.earn > 0) {
                var v = this.data.earn;
                v = Tools.FormatMoney(v, 2);
                this.lb_earn.color = this.conf.earn.font.color;
                this.lb_earn.text = this.conf.earn.font.pretext + v; //"￥100.56";
            }
            else {
                var v2 = Math.abs(this.data.earn);
                v = Tools.FormatMoney(v2, 2);
                this.lb_earn.color = this.conf.earn.font.colorReduce;
                this.lb_earn.text = this.conf.earn.font.pretextReduce + v; //"￥100.56";
            }
        }
        if (this.lb_endtime) {
            this.lb_endtime.text = this.data.endtime; //"20150369 12:23:63";
        }
    };
    return HistoryItem;
}(Laya.Sprite));
//# sourceMappingURL=HistoryItem.js.map