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
var GamePanel = /** @class */ (function (_super) {
    __extends(GamePanel, _super);
    function GamePanel() {
        var _this = _super.call(this) || this;
        _this.bDrag = false;
        _this.bMoved = false;
        _this.downX = 0;
        _this.startDragX = 0;
        _this.lastMoveX = 0;
        _this.startDragContentX = 0;
        _this.lastScrollSpdX = 0;
        _this.startDragTime = 0;
        _this.endDragTime = 0;
        _this.minx = 0;
        _this.maxx = 0;
        _this.totalWidth = 0;
        _this.bRequestStatus = 1;
        return _this;
    }
    GamePanel.getInstance = function (node, conf, caller, callback) {
        if (node === void 0) { node = null; }
        if (conf === void 0) { conf = null; }
        if (caller === void 0) { caller = null; }
        if (callback === void 0) { callback = null; }
        if (!GamePanel.obj && node != null && conf != null) {
            var a = new GamePanel();
            a.init(conf, caller, callback);
            node.addChild(a);
        }
        return GamePanel.obj;
    };
    GamePanel.prototype.destroy = function (b) {
        GamePanel.obj = null;
        _super.prototype.destroy.call(this, b);
    };
    GamePanel.prototype.init = function (conf, caller, callback) {
        this.conf = conf;
        GamePanel.obj = this;
        this.bRequestStatus = 1;
        this.caller = caller;
        this.callback = callback;
        if (this.conf.panel.showbg) {
            this.panel_bg = new Laya.Sprite();
            this.addChild(this.panel_bg);
            Tools.drawRectWithAlpha(this.panel_bg, this.conf.panel.content.pos.x, this.conf.panel.content.pos.y, this.conf.panel.content.size.w, this.conf.panel.content.size.h, this.conf.panel.showbg.color, this.conf.panel.showbg.alpha);
        }
        this.size(this.conf.panel.content.size.w, this.conf.panel.content.size.h);
        this.sp_content = new Laya.Sprite();
        this.sp_content.pos(this.conf.panel.content.pos.x, this.conf.panel.content.pos.y);
        this.sp_content.size(this.conf.panel.content.size.w, this.conf.panel.content.size.h);
        this.addChild(this.sp_content);
        this.items = new Array();
        this.pos(this.conf.pos.x, this.conf.pos.y);
        this.sp_content.on(Laya.Event.MOUSE_DOWN, this, this.moveContentEvent);
        this.sp_content.on(Laya.Event.MOUSE_MOVE, this, this.moveContentEvent);
        this.sp_content.on(Laya.Event.MOUSE_UP, this, this.moveContentEvent);
        this.sp_content.on(Laya.Event.MOUSE_OUT, this, this.moveContentEvent);
        if (this.conf.panel.bmask && this.conf.panel.bmask.value) {
            this.sp_content.scrollRect = new Laya.Rectangle(this.conf.panel.rect.x, this.conf.panel.rect.y, this.conf.panel.rect.w, this.conf.panel.rect.h);
        }
        this.sp_ct_move = new MoveContent(this.conf.movecontent, this);
        this.sp_ct_move.setListener(0, this, this.onContentEvent);
        this.sp_content.addChild(this.sp_ct_move);
        if (this.conf.pagearrow) {
            this.sp_arrow = new PageArrow();
            this.sp_arrow.init(this.conf.pagearrow);
            this.sp_arrow.setPanel(this);
            this.addChild(this.sp_arrow);
        }
        this.createGirl();
        this.requestGameList(ConfObjRead.getConfUrl().url.apihome +
            ConfObjRead.getConfUrl().cmd.gamelist +
            "?pageSize=20&start=0&access_token=" + Common.access_token +
            "&channel=" +
            ConfObjRead.getConfVersion().channel +
            "&device=" + Common.getLoginPlatform() +
            "&jump=" + Common.bNewlogin);
        this.resetScrollBar();
    };
    GamePanel.prototype.createGirl = function () {
        if (!this.sp_girl && this.conf.girl) {
            this.sp_girl = new Laya.Sprite();
            this.sp_girl.loadImage(this.conf.girl.src);
            this.addChild(this.sp_girl);
            this.sp_girl.pos(this.conf.girl.hidepos.x, this.conf.girl.hidepos.y);
        }
    };
    GamePanel.prototype.scrollInGirl = function () {
        if (!this.sp_girl) {
            return;
        }
        var tween = Laya.Tween.to(this.sp_girl, {
            x: this.conf.girl.pos.x,
            y: this.conf.girl.pos.y
        }, this.conf.girl.durationIn, Laya.Ease["backIn"], new Laya.Handler(this, this.scrollInGirlOk));
    };
    GamePanel.prototype.scrollInGirlOk = function () {
    };
    GamePanel.prototype.scrollOutGirl = function () {
        if (!this.sp_girl) {
            return;
        }
        var tween = Laya.Tween.to(this.sp_girl, {
            x: this.conf.girl.hidepos.x,
            y: this.conf.girl.hidepos.y
        }, this.conf.girl.durationOut, Laya.Ease["backIn"], new Laya.Handler(this, this.scrollOutGirlOk));
    };
    GamePanel.prototype.scrollOutGirlOk = function () {
    };
    GamePanel.prototype.scrollInContent = function () {
        var tween = Laya.Tween.to(this.sp_content, {
            x: this.conf.panel.content.pos.x,
            y: this.conf.panel.content.pos.y
        }, this.conf.panel.content.durationIn, Laya.Ease["backIn"], new Laya.Handler(this, this.scrollInContentOk));
    };
    GamePanel.prototype.scrollInContentOk = function () {
        this.EnableGameItems(true);
        this.onUpdateMsgInit();
    };
    GamePanel.prototype.scrollOutContent = function (gameData) {
        var tween = Laya.Tween.to(this.sp_content, {
            x: this.conf.panel.content.hidepos.x,
            y: this.conf.panel.content.hidepos.y
        }, this.conf.panel.content.durationOut, Laya.Ease["backIn"], new Laya.Handler(this, this.scrollOutContentOk, [gameData]));
    };
    GamePanel.prototype.scrollOutContentOk = function (data) {
        if (this.scrollbar) {
            this.scrollbar.clearTimer();
            this.scrollbar.setMyAlpha(0);
        }
        this.visible = false;
    };
    GamePanel.prototype.EnableGameItems = function (b) {
        for (var k = 0; k < this.items.length; k++) {
            var one = this.items[k];
            one.setEnable(b);
        }
    };
    GamePanel.prototype.flip = function (num) {
        var v = this.conf.flip.onetime;
        var x = (this.conf.gameitemdefault.btnicon.size.w +
            this.conf.gameitemdefault.btnicon.size.gw) * v +
            this.conf.flip.offsetx;
        var sumx = -1 * x * num;
        this.moveAllItem(sumx);
    };
    GamePanel.prototype.flipNext = function (num) {
        if (this.conf.movecontent.scrollType == "tween") {
            this.sp_ct_move.autoSlips(MoveContent.MOVE_DIRECT_LEFT, this.conf.movecontent.jumpspds * num, this.conf.movecontent.jumptimes);
        }
        else {
            this.sp_ct_move.autoSlip(MoveContent.MOVE_DIRECT_LEFT, this.conf.movecontent.jumpspd * num, this.conf.movecontent.jumptime);
        }
    };
    GamePanel.prototype.moveContentEvent = function (e) {
        var x = e.stageX;
        var y = e.stageY;
        switch (e.type) {
            case Laya.Event.MOUSE_DOWN:
                this.bDrag = true;
                this.downX = x;
                this.startDragContentX = this.sp_ct_move.x;
                this.startDragX = x;
                this.startDragTime = Tools.getTime();
                this.sp_ct_move.startMoveDrag();
                break;
            case Laya.Event.MOUSE_MOVE:
                if (this.downX > 0 && this.bDrag) //&& this.isMoving(x,y) )
                 {
                    var sumx = x - this.downX;
                    this.downX = x;
                    this.bMoved = true;
                    // this.moveAllItem(sumx);
                    this.moveGameItems(sumx, x, y);
                }
                break;
            case Laya.Event.MOUSE_OUT:
            case Laya.Event.MOUSE_UP:
                if (this.bDrag) {
                    this.endDragTime = Tools.getTime();
                    if (this.bMoved == true && this.isMoved(x, y)) {
                        this.moveEnds(x, y);
                    }
                    else {
                        this.sp_ct_move.x = this.startDragContentX;
                    }
                }
                this.downX = 0;
                this.bDrag = false;
                this.bMoved = false;
                break;
        }
    };
    GamePanel.prototype.isMoved = function (x, y) {
        var sumx = Math.abs(this.startDragX - x);
        return sumx > this.conf.movecontent.moveddis;
    };
    GamePanel.prototype.isMoving = function (x, y) {
        var sumx = Math.abs(this.lastMoveX - x);
        this.lastMoveX = x;
        return sumx > this.conf.movecontent.movingdis;
    };
    GamePanel.prototype.moveAllItem = function (x) {
        if (this.totalWidth <= this.conf.panel.rect.w) {
            return;
        }
        var nx = x;
        var cx = 0;
        try {
            cx = this.items[0].px;
        }
        catch (e) {
        }
        var newx = cx + nx;
        if (newx > this.maxx) {
            nx = this.maxx - cx;
        }
        else if (newx < this.minx) {
            nx = this.minx - cx;
        }
        for (var i = 0; i < this.items.length; i++) {
            this.items[i].imMove(nx);
        }
        this.lastScrollSpdX = nx;
        if (this.scrollbar) {
            this.scrollbar.move(nx);
        }
        if (UIBg.obj) {
            UIBg.obj.moveStars(nx);
        }
        var bHave = this.isHaveGameIcons();
        this.sp_arrow.visible = bHave;
    };
    GamePanel.prototype.moveGameItems = function (sumx, cx, cy) {
        var minx = (this.conf.movecontent.visibleRect.w - this.sp_ct_move.width) - this.conf.movecontent.minxOffsetX;
        var maxx = 0 + this.conf.movecontent.maxxOffsetX;
        var nx = sumx;
        var cx = this.sp_ct_move.x;
        var newx = cx + nx;
        if (sumx <= 0) {
            if (newx <= minx) {
                var sumLeft = Math.abs(minx - newx);
                nx = nx / (sumLeft / this.conf.movecontent.dragendoffset);
            }
        }
        else if (sumx > 0) {
            if (newx >= maxx) {
                var sumRight = Math.abs(maxx - newx);
                nx = nx / (sumRight / this.conf.movecontent.dragendoffset);
            }
        }
        this.sp_ct_move.x += nx;
        this.lastScrollSpdX = nx;
        var bHave = this.isHaveGameIcons();
        this.sp_arrow.visible = bHave;
    };
    GamePanel.prototype.stopDragForce = function () {
        if (this.bDrag) {
            this.endDragTime = Tools.getTime();
            var x = this.sp_content.mouseX;
            var y = this.sp_content.mouseY;
            this.moveEnds(x, y);
        }
        this.downX = 0;
        this.bDrag = false;
    };
    GamePanel.prototype.moveEnds = function (cx, cy) {
        var direct = MoveContent.MOVE_DIRECT_LEFT;
        var dx = this.startDragX - cx;
        if (dx > 0) {
            direct = MoveContent.MOVE_DIRECT_LEFT;
        }
        else if (dx < 0) {
            direct = MoveContent.MOVE_DIRECT_RIGHT;
        }
        var timeSum = this.endDragTime - this.startDragTime;
        this.sp_ct_move.autoSlip(direct, this.lastScrollSpdX, timeSum);
    };
    GamePanel.prototype.onContentEvent = function (obj, mvEvent, mvType, mvDirect) {
        if (mvEvent == MoveContent.MOVE_EVENT_END) {
            var bHave = this.isHaveGameIcons();
            this.sp_arrow.visible = bHave;
        }
    };
    GamePanel.prototype.moveEnd = function (x) {
        if (this.downX > 0) {
            var sumx = x - this.downX;
            this.downX = x;
            if (Math.abs(sumx) >= Math.abs(this.conf.flip.movex)) {
                if (sumx < 0) {
                    this.flip(1);
                }
                else {
                    this.flip(-1);
                }
            }
        }
    };
    GamePanel.prototype.setAllItemOrder = function (idx) {
        var ilen = this.items.length;
        for (var a = 0; a < ilen; a++) {
            this.items[a].zOrder = idx;
        }
    };
    GamePanel.prototype.requestGameList = function (url, data) {
        if (data === void 0) { data = null; }
        this.bRequestStatus = 1;
        LayaMain.getInstance().showCircleLoading(true);
        var datas = null;
        if (data) {
            datas = JSON.stringify(data);
        }
        NetManager.getObj().HttpConnect(url, this, this.responseGameList);
    };
    GamePanel.prototype.responseGameList = function (s, stat, hr) {
        if (stat == "complete") {
            Common.gameInfo = s.datas;
            var ilen = this.items.length;
            for (var a = 0; a < ilen; a++) {
                var it = this.items[a];
                it.destroy(true);
            }
            this.items = null;
            this.items = new Array();
            this.addGameItems(s.datas);
            this.bRequestStatus = 0;
            LayaMain.getInstance().requestEnd(stat, "");
        }
        else {
            this.bRequestStatus = -1;
            LayaMain.getInstance().requestEnd(stat, s);
        }
        this.scrollInGirl();
        this.scrollInContent();
        this.callback.apply(this.caller, [this]);
    };
    GamePanel.prototype.addGameItems = function (dt) {
        if (this.conf.testItemLen) {
            if (dt.length >= this.conf.testItemLen) {
                var outlen = dt.length - this.conf.testItemLen;
                dt.splice(this.conf.testItemLen, outlen);
            }
            else {
                var addlen = this.conf.testItemLen - dt.length;
                var da = dt[0];
                for (var i = 0; i < addlen; i++) {
                    dt.push(da);
                }
            }
        }
        Debug.trace('addGameItems len:' + dt.length);
        Debug.trace(dt);
        this.totalWidth = 0;
        for (var i = 0; i < dt.length; i++) {
            var gi = new GameItem();
            gi.init(this.conf.gameitemdefault, this);
            var h = Math.floor(i % 2);
            var v = Math.floor(i / 2);
            gi.x = this.conf.gameitemdefault.btnicon.pos.x +
                (v * this.conf.gameitemdefault.btnicon.size.w) +
                (v * this.conf.gameitemdefault.btnicon.size.gw) + this.conf.gameitemdefault.pos.x;
            gi.y = this.conf.gameitemdefault.btnicon.pos.y +
                (h * this.conf.gameitemdefault.btnicon.size.h) +
                (h * this.conf.gameitemdefault.btnicon.size.gh) + this.conf.gameitemdefault.pos.y;
            this.sp_ct_move.addChild(gi);
            gi.setData(dt[i]);
            this.items.push(gi);
            this.totalWidth = (gi.width +
                this.conf.gameitemdefault.btnicon.size.gw) * (v + 1);
            this.minx = this.conf.panel.rect.w - this.totalWidth +
                this.conf.gameitemdefault.btnicon.pos.x -
                this.conf.gameitemdefault.btnicon.size.offsetx;
            this.maxx = this.conf.gameitemdefault.btnicon.pos.x + this.conf.gameitemdefault.pos.x;
        }
        this.sp_ct_move.size(this.totalWidth, this.conf.panel.rect.h);
        this.resetScrollBar();
        this.sp_ct_move.checkShowBg();
    };
    GamePanel.prototype.isHaveGameIcons = function () {
        try {
            if (this.sp_ct_move.x <= this.minx) {
                return false;
            }
        }
        catch (e) { }
        return true;
    };
    GamePanel.prototype.resetScrollBar = function () {
        var bHave = this.isHaveGameIcons();
        this.sp_arrow.visible = bHave;
        if (!this.scrollbar && this.conf.scrollbar) {
            this.scrollbar = new ScrollBar();
            this.scrollbar.init(this.conf.scrollbar);
            this.addChild(this.scrollbar);
        }
        if (this.scrollbar) {
            this.scrollbar.reset(this.width, this.totalWidth);
        }
    };
    GamePanel.prototype.getIconByGameId = function (gameId) {
        var len = this.items.length;
        for (var i = 0; i < len; i++) {
            var icon = this.items[i];
            if (icon.data.id == gameId) {
                return icon;
            }
        }
        return null;
    };
    GamePanel.prototype.getIconByGameAlias = function (alias) {
        var len = this.items.length;
        for (var i = 0; i < len; i++) {
            var icon = this.items[i];
            if (icon.data.alias == alias) {
                return icon;
            }
        }
        return null;
    };
    GamePanel.prototype.onUpdateMsgInit = function () {
        if (UpdateMsgHandle.updateInitMsg) {
            Debug.trace("GamePanel.onUpdateMsgInit:");
            Debug.trace(UpdateMsgHandle.updateInitMsg);
            var len = UpdateMsgHandle.updateInitMsg.length;
            for (var i = 0; i < len; i++) {
                var obj = UpdateMsgHandle.updateInitMsg[i];
                // var gameId = obj.gameId;
                var gameAlias = obj.alias;
                var bUp = obj.bupdate;
                var icon = this.getIconByGameAlias(gameAlias);
                if (icon) {
                    if (obj.percent) {
                        icon.onUpdateProgress(obj.percent);
                    }
                    else {
                        icon.setStatus(GameItem.STATUS_UPDATE);
                    }
                }
            }
        }
    };
    GamePanel.prototype.onUpdatePercent = function (data) {
        if (!data || data.length <= 0) {
            return;
        }
        for (var i = 0; i < data.length; i++) {
            var obj = data[i];
            // var gameId = obj.gameId;
            var gameAlias = obj.alias;
            var percent = obj.percent;
            // var icon:GameItem = this.getIconByGameId(gameId);
            var icon = this.getIconByGameAlias(gameAlias);
            if (icon) {
                icon.onUpdateProgress(percent);
            }
        }
    };
    GamePanel.prototype.resume = function () {
        // var gi = this.getIconByGameId(Common.gameId);
        // gi.btn_icon.bclick = true;
        this.scrollInContentOk();
    };
    GamePanel.obj = null;
    return GamePanel;
}(Laya.Sprite));
//# sourceMappingURL=GamePanel.js.map