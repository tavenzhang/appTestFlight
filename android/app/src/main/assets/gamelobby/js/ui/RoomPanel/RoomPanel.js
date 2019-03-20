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
var RoomPanel = /** @class */ (function (_super) {
    __extends(RoomPanel, _super);
    function RoomPanel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.bDrag = false;
        _this.downX = 0;
        _this.minx = 0;
        _this.maxx = 0;
        _this.totalWidth = 0;
        _this.bRequestStatus = 1;
        return _this;
    }
    RoomPanel.getInstance = function (node, conf, data, caller, callback) {
        if (!RoomPanel.obj) {
            var a = new RoomPanel();
            a.init(conf, data, caller, callback);
            node.addChild(a);
        }
        return RoomPanel.obj;
    };
    RoomPanel.prototype.destroy = function (b) {
        RoomPanel.obj = null;
        _super.prototype.destroy.call(this, b);
    };
    RoomPanel.prototype.init = function (conf, data, caller, callback) {
        this.conf = conf;
        this.gamedata = data;
        RoomPanel.obj = this;
        this.bRequestStatus = 1;
        this.caller = caller;
        this.callback = callback;
        this.sp_content = new Laya.Sprite();
        this.sp_content.pos(this.conf.panel.content.pos.x, this.conf.panel.content.pos.y);
        this.addChild(this.sp_content);
        if (this.conf.panel.showbg) {
            Tools.drawRectWithAlpha(this.sp_content, 0, 0, this.conf.panel.content.size.w, this.conf.panel.content.size.h, this.conf.panel.showbg.color, this.conf.panel.showbg.alpha);
        }
        this.items = new Array();
        this.pos(this.conf.pos.x, this.conf.pos.y);
        this.requestData();
    };
    RoomPanel.prototype.onBackClick = function (s) {
    };
    RoomPanel.prototype.scrollInContent = function () {
        var tween = Laya.Tween.to(this.sp_content, {
            x: this.conf.panel.content.pos.x,
            y: this.conf.panel.content.pos.y
        }, this.conf.panel.content.durationIn, Laya.Ease["backIn"], new Laya.Handler(this, this.scrollInContentOk));
    };
    RoomPanel.prototype.scrollInContentOk = function () {
        for (var k = 0; k < this.items.length; k++) {
            var o = this.items[k];
            o.setEnable(true);
        }
    };
    RoomPanel.prototype.scrollOutContent = function () {
        var tween = Laya.Tween.to(this.sp_content, {
            x: this.conf.panel.content.hidepos.x,
            y: this.conf.panel.content.hidepos.y
        }, this.conf.panel.content.durationOut, Laya.Ease["backIn"], new Laya.Handler(this, this.scrollOutContentOk));
    };
    RoomPanel.prototype.scrollOutContentOk = function () {
    };
    RoomPanel.prototype.moveContent = function (e) {
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
    RoomPanel.prototype.moveAllItem = function (x) {
        if (this.totalWidth <= this.width) {
            return;
        }
        var nx = x;
        var cx = 0;
        try {
            cx = this.items[0].x;
        }
        catch (e) { }
        var newx = cx + nx;
        if (newx > this.maxx) {
            nx = this.maxx - cx;
        }
        else if (newx < this.minx) {
            nx = this.minx - cx;
        }
        for (var i = 0; i < this.items.length; i++) {
            this.items[i].x += nx;
        }
        if (UIBg.obj) {
            UIBg.obj.moveStars(nx);
        }
    };
    RoomPanel.prototype.setAllItemOrder = function (idx) {
        for (var a = 0; a < this.items.length; a++) {
            this.items[a].zOrder = idx;
        }
    };
    RoomPanel.prototype.requestGameListData = function () {
        this.bRequestStatus = 1;
        var url = ConfObjRead.getConfUrl().url.apihome +
            ConfObjRead.getConfUrl().cmd.gamelist +
            "?pageSize=20&start=0&access_token=" + Common.access_token +
            "&channel=" +
            ConfObjRead.getConfVersion().channel +
            "&device=" + Common.getLoginPlatform() +
            "&jump=" + Common.bNewlogin;
        NetManager.getObj().HttpConnect(url, this, this.responseGameListData);
    };
    RoomPanel.prototype.responseGameListData = function (s, stat, hr) {
        if (stat == "complete") {
            Common.gameInfo = s.datas;
            this.gamedata = Common.getGameDataById(Common.gameId);
            this.requestRoomList(ConfObjRead.getConfUrl().url.apihome +
                ConfObjRead.getConfUrl().cmd.roomlist +
                "?gameId=" + this.gamedata.id +
                "&pageSize=20&start=0&access_token=" + Common.access_token);
        }
        else {
            this.bRequestStatus = -1;
            LayaMain.getInstance().requestEnd(stat, s);
        }
    };
    RoomPanel.prototype.requestData = function () {
        LayaMain.getInstance().showCircleLoading(true);
        if (!Common.gameInfo) {
            this.requestGameListData();
        }
        else {
            this.requestRoomList(ConfObjRead.getConfUrl().url.apihome +
                ConfObjRead.getConfUrl().cmd.roomlist +
                "?gameId=" + this.gamedata.id +
                "&pageSize=20&start=0&access_token=" + Common.access_token);
        }
    };
    RoomPanel.prototype.requestRoomList = function (url) {
        this.bRequestStatus = 1;
        LayaMain.getInstance().showCircleLoading(true);
        NetManager.getObj().HttpConnect(url, this, this.responseRoomList);
    };
    RoomPanel.prototype.responseRoomList = function (s, stat, hr) {
        if (stat == "complete") {
            this.roomInfo = s;
            this.addGameItems(this.roomInfo.datas);
            this.bRequestStatus = 0;
            LayaMain.getInstance().requestEnd(stat, "");
        }
        else {
            this.bRequestStatus = -1;
            LayaMain.getInstance().requestEnd(stat, s);
        }
        this.callback.apply(this.caller, [this]);
    };
    RoomPanel.prototype.addGameItems = function (dt) {
        for (var i = 0; i < dt.length; i++) {
            var gi = new RoomItem();
            gi.init(this.conf.gameitemdefault, this);
            gi.x = (i * this.conf.gameitemdefault.btnicon.size.w) +
                (i * this.conf.gameitemdefault.btnicon.size.gw);
            this.sp_content.addChild(gi);
            gi.setData(dt[i], i);
            this.items.push(gi);
            this.totalWidth = gi.x + gi.width;
            this.minx = this.width - this.totalWidth;
            this.maxx = 0;
        }
    };
    RoomPanel.prototype.clearRooms = function () {
        for (var k = 0; k < this.items.length; k++) {
            var it = this.items[k];
            it.destroy(true);
        }
        this.items.splice(0, this.items.length);
    };
    RoomPanel.obj = null;
    return RoomPanel;
}(Laya.Sprite));
//# sourceMappingURL=RoomPanel.js.map