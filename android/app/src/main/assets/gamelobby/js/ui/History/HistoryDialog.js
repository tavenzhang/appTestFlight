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
var HistoryDialog = /** @class */ (function (_super) {
    __extends(HistoryDialog, _super);
    function HistoryDialog() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.downPos = {
            "x": 0,
            "y": 0
        };
        return _this;
    }
    HistoryDialog.getObj = function () {
        return HistoryDialog.obj;
    };
    HistoryDialog.showPad = function (gid) {
        if (!HistoryDialog.obj) {
            var o = new HistoryDialog();
            o.init(ConfObjRead.getConfHistorypad(), gid);
            Laya.stage.addChild(o);
        }
        // HistoryDialog.obj.show(b);
    };
    HistoryDialog.prototype.destroy = function (b) {
        HistoryDialog.obj = null;
        _super.prototype.destroy.call(this, b);
    };
    HistoryDialog.prototype.hide = function () {
        // this.lb_content.text = "";
        this.visible = false;
        HistoryDialog.obj = null;
        Laya.stage.removeChild(this);
        this.destroy(true);
        // lamain.restoreLoaderPath();
    };
    HistoryDialog.prototype.init = function (conf, gid) {
        HistoryDialog.obj = this;
        this.lookGameId = gid;
        this.conf = conf;
        this.data = null; //data;
        // this.caller = caller;
        // this.closeCallback = closeCallback;
        this.initAlphaBg();
        this.initBg(this.conf);
        if (this.conf.contentbg) {
            var bg = Tools.addSprite(this, this.conf.contentbg);
        }
        this.initTitle();
        this.initTableHead();
        this.initContent();
        this.arr_items = new Array();
        this.initCloseBtn();
        this.initBottomHint();
        this.pos(this.conf.pos.x, this.conf.pos.y);
        // this.setData(data);
        this.height = this.conf.ctmask.rect.h;
        this.requestInfo();
    };
    HistoryDialog.prototype.initBottomHint = function () {
        this.lb_hint = Tools.newLabel(this.conf.bottomhint.font.text, this.conf.bottomhint.size.w, this.conf.bottomhint.size.h, this.conf.bottomhint.font.size, this.conf.bottomhint.font.color, this.conf.bottomhint.font.align, this.conf.bottomhint.font.valign, this.conf.bottomhint.font.name, this.conf.bottomhint.font.wrap);
        if (this.conf.bottomhint.font.borderColor) {
            this.lb_hint.borderColor = this.conf.bottomhint.font.borderColor;
        }
        this.lb_hint.pos(this.conf.bottomhint.pos.x, this.conf.bottomhint.pos.y);
        this.addChild(this.lb_hint);
    };
    HistoryDialog.prototype.initCloseBtn = function () {
        if (this.conf.close) {
            this.close = new MyButton();
            this.close.init(this.conf.close, this, this.onClose);
            this.close.pos(this.conf.close.pos.x, this.conf.close.pos.y);
            this.addChild(this.close);
        }
    };
    HistoryDialog.prototype.initContent = function () {
        this.sp_content = new Laya.Sprite();
        this.sp_content.pos(this.conf.content.pos.x, this.conf.content.pos.y);
        this.addChild(this.sp_content);
        if (this.conf.ctmask.color) {
            Tools.drawRect(this.sp_content, this.conf.ctmask.rect.x, this.conf.ctmask.rect.y, this.conf.ctmask.rect.w, this.conf.ctmask.rect.h, "#ff0000");
        }
        if (this.conf.content.bg) {
            var bg = Tools.addSprite(this.sp_content, this.conf.content.bg);
        }
        this.sp_content.scrollRect = new Laya.Rectangle(this.conf.ctmask.rect.x, this.conf.ctmask.rect.y, this.conf.ctmask.rect.w, this.conf.ctmask.rect.h);
        this.sp_content.size(this.conf.ctmask.rect.w, this.conf.ctmask.rect.h);
        this.sp_content.on(Laya.Event.MOUSE_DOWN, this, this.onMouseEvent);
        this.sp_content.on(Laya.Event.MOUSE_MOVE, this, this.onMouseEvent);
        this.sp_content.on(Laya.Event.MOUSE_UP, this, this.onMouseEvent);
        this.sp_content.on(Laya.Event.MOUSE_OUT, this, this.onMouseEvent);
    };
    HistoryDialog.prototype.initTitle = function () {
        if (!this.conf.title) {
            return;
        }
        if (this.conf.title.bg) {
            this.sp_title_bg = new Laya.Sprite();
            this.sp_title_bg.loadImage(this.conf.title.bg.src);
            this.sp_title_bg.pos(this.conf.title.bg.pos.x, this.conf.title.bg.pos.y);
            this.addChild(this.sp_title_bg);
        }
        if (this.conf.title.lb) {
            this.sp_title_lb = new Laya.Sprite();
            this.sp_title_lb.loadImage(this.conf.title.lb.src);
            this.sp_title_lb.pos(this.conf.title.lb.pos.x, this.conf.title.lb.pos.y);
            this.addChild(this.sp_title_lb);
        }
    };
    HistoryDialog.prototype.initAlphaBg = function () {
        this.alphabg = new Laya.Sprite();
        Tools.drawRectWithAlpha(this.alphabg, 0, 0, this.conf.size.w, this.conf.size.h, "#000000", this.conf.mask.alpha);
        this.addChild(this.alphabg);
        this.alphabg.size(this.conf.size.w, this.conf.size.h);
        this.alphabg.pos(-this.conf.pos.x, -this.conf.pos.y);
        this.alphabg.on(Laya.Event.MOUSE_DOWN, this, this.onMouse);
        this.alphabg.on(Laya.Event.MOUSE_UP, this, this.onMouse);
        this.alphabg.on(Laya.Event.MOUSE_MOVE, this, this.onMouse);
    };
    HistoryDialog.prototype.initTableHead = function () {
        // this.sp_table_head = new Laya.Sprite();
        // this.sp_table_head.pos(this.conf.tablehead.bg.pos.x,this.conf.tablehead.bg.pos.y);
        // this.addChild(this.sp_table_head);
        // if( this.conf.tablehead.bg.size && this.conf.tablehead.bg.size.spliceV )
        // {
        //     Tools.scaleSpriteV(
        //         this.sp_table_head,
        //         this.conf.tablehead.bg.src,
        //         this.conf.tablehead.bg.size.spliceV
        //         );
        // this.sp_table_head.size(this.conf.tablehead.bg.size.w,this.conf.tablehead.bg.size.h);
        // }
        this.sp_table_head = Tools.addSprite(this, this.conf.tablehead.bg);
    };
    HistoryDialog.prototype.initBg = function (conf) {
        // this.bg = new Laya.Sprite();
        // this.bg.loadImage(this.conf.bg.src);
        // this.bg.pos(this.conf.bg.pos.x,this.conf.bg.pos.y);
        // this.addChild(this.bg);
        // Tools.scaleSpriteV(
        //         this.bg,
        //         this.conf.bg.src,
        //         this.conf.bg.size.spliceV);
        // if( this.conf.bg.size && this.conf.bg.size.splice )
        // {
        //     Tools.scaleSprite(
        //             this.bg,
        //             this.conf.bg.src,
        //             this.conf.bg.size.splice);
        // }
        this.bg = Tools.addSprite(this, this.conf.bg);
        // if( this.conf.bg.pivot )
        // {
        //     this.bg.pivot(this.conf.bg.pivot.x,this.conf.bg.pivot.y);
        // }
    };
    HistoryDialog.prototype.onMouseEvent = function (e) {
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
                break;
            case Laya.Event.MOUSE_MOVE:
                // if( this.downPos.x > 0 )
                // {
                //     var sumx = x - this.downPos.x;
                //     this.downPos.x = x;
                // this.moveAllItem(sumx);
                // }
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
                // this.scrollbar.moveEnd();
                break;
        }
    };
    HistoryDialog.prototype.moveAllItem = function (dis) {
        // Debug.trace('moveAllItem x:'+dis);
        // Debug.trace('totalHeight:'+this.totalHeight+' height:'+this.height);
        if (this.totalHeight <= this.height) {
            // Debug.trace('totalHeight < height');
            return;
        }
        var nx = dis;
        var cx = 0;
        try {
            cx = this.arr_items[0].y;
        }
        catch (e) {
        }
        var newx = cx + nx;
        // Debug.trace('newx:'+newx+" cx:"+cx+" nx:"+nx);
        if (newx > this.maxy) {
            nx = this.maxy - cx;
        }
        else if (newx < this.miny) {
            nx = this.miny - cx;
        }
        // Debug.trace("minx:"+this.minx+" maxx:"+this.maxx+" nx:"+nx+" cx:"+cx);
        for (var i = 0; i < this.arr_items.length; i++) {
            this.arr_items[i].y += nx;
        }
    };
    HistoryDialog.prototype.requestInfo = function () {
        LayaMain.getInstance().showCircleLoading(true);
        var url = "";
        // if( Common.gameId <= 0 )
        if (!this.lookGameId) {
            url = ConfObjRead.getConfUrl().url.apihome +
                ConfObjRead.getConfUrl().cmd.history +
                "?access_token=" + Common.access_token +
                "&pageSize=" + this.conf.bottomhint.count +
                "&start=0" +
                "";
        }
        else {
            url = ConfObjRead.getConfUrl().url.apihome +
                ConfObjRead.getConfUrl().cmd.history +
                "?access_token=" + Common.access_token +
                "&pageSize=" + this.conf.bottomhint.count +
                "&start=0" +
                "&gameId=" + this.lookGameId + //Common.gameId+
                "";
        }
        // Debug.trace("history url:"+url);
        NetManager.getObj().HttpConnect(url, this, this.responseInfo);
        // this.responseInfo(this.conf.testData,this.conf.testData.stat);
    };
    HistoryDialog.prototype.responseInfo = function (s, stat, hr) {
        // Debug.trace("history:");
        // Debug.trace(stat);
        // Debug.trace(s);
        // Debug.trace(hr);
        if (stat == "complete") {
            if (s.totalCount > 0 && s.datas.length > 0) {
                this.showEmptyData(false);
                this.addHistoryItem(this.transData(s.datas));
            }
            else {
                this.showEmptyData(true);
            }
        }
        else {
            // lamain.showCircleLoading(false);
            // MySaiziLoading.showPad(false);//true,"loading...",true,ConfObjRead.getConfSaiziLoading(),Laya.stage);
            Toast.showToast(s);
        }
        if (MyBBLoading.obj) {
            MyBBLoading.obj.show(false);
        }
    };
    HistoryDialog.prototype.showEmptyData = function (b) {
        if (!this.lb_empty) {
            this.lb_empty = Tools.newLabel(this.conf.empty.font.text, this.conf.empty.size.w, this.conf.empty.size.h, this.conf.empty.font.size, this.conf.empty.font.color, this.conf.empty.font.align, this.conf.empty.font.valign, this.conf.empty.font.name, this.conf.empty.font.wrap);
            if (this.conf.empty.font.borderColor) {
                this.lb_empty.borderColor = this.conf.empty.font.borderColor;
            }
            this.lb_empty.pos(this.conf.empty.pos.x, this.conf.empty.pos.y);
            this.addChild(this.lb_empty);
        }
        this.lb_empty.visible = b;
    };
    HistoryDialog.prototype.transData = function (da) {
        var d = new Array();
        var id = 1;
        // for( var k in da )
        for (var k = 0; k < da.length; k++) {
            var o = da[k];
            var n = {
                "id": id,
                "gameid": o.orderNo,
                "room": o.roomName,
                "earn": o.amount,
                "endtime": o.endTime
            };
            d.push(n);
            id++;
        }
        return d;
    };
    HistoryDialog.prototype.newTestData = function (id) {
        var gameid, rdearn, nowtime;
        var nt = Tools.nowTime();
        nowtime = Tools.FormatString("0%-1%-2% 3%:4%:5%", nt.Y, nt.M, nt.D, nt.H, nt.I, nt.S);
        gameid = Tools.FormatString("0%1%2%3%4%5%6%", nt.Y, nt.M, nt.D, nt.H, nt.I, nt.S, nt.MS);
        rdearn = Math.floor((Math.random() * 1000) % 100);
        var fh = Math.random();
        if (fh >= 0.5) {
            rdearn *= -1;
        }
        var a = {
            "id": id,
            "gameid": gameid,
            "room": "房间" + id,
            "earn": rdearn,
            "endtime": nowtime
        };
        return a;
    };
    HistoryDialog.prototype.addHistoryItem = function (data) {
        if (this.conf.testitemlen) {
            var id = data.length;
            for (var i = 0; i < this.conf.testitemlen; i++) {
                var a = this.newTestData(id);
                data.push(a);
                id++;
            }
        }
        // for( var k in data )
        for (var k = 0; k < data.length; k++) {
            var one = data[k];
            // Debug.trace('addHistoryItem k:'+k);
            this.addOneItem(one);
        }
    };
    HistoryDialog.prototype.addOneItem = function (data) {
        // Debug.trace('addOneItem data:');
        // Debug.trace(data);
        var a = new HistoryItem();
        var id = this.arr_items.length;
        a.init(this.conf.item, id);
        var x, y, ry; //,len;
        // len = this.arr_items.length;
        x = 0;
        ry = y = a.id * (this.conf.item.size.h + this.conf.item.size.gh);
        a.pos(x, y);
        a.setData(data);
        this.sp_content.addChild(a);
        this.arr_items.push(a);
        this.totalHeight = ry + this.conf.item.size.h + this.conf.item.size.gh;
        // this.miny = this.sp_mask.height - this.totalHeight;
        this.miny = this.conf.ctmask.rect.h - this.totalHeight;
        // Debug.trace('miny:'+this.miny+" height:"+this.sp_mask.height+" theight:"+this.totalHeight);
        this.maxy = 0;
    };
    HistoryDialog.prototype.setData = function (data) {
        this.data = data;
        if (this.data && this.data.img) {
            this.setBg(this.data.img);
        }
        if (this.data && this.data.notice) {
            // this.lb_content.text = data.notice;
        }
    };
    HistoryDialog.prototype.setBg = function (src) {
        Laya.loader.load(src, new Laya.Handler(this, this.bgLoaded));
    };
    HistoryDialog.prototype.bgLoaded = function (e) {
        this.bg.graphics.clear();
        this.bg.graphics.drawTexture(e, 0, 0, this.bg.width, this.bg.height);
        // this.sp_icon.size(e.width,e.height);
    };
    HistoryDialog.prototype.onMouse = function (e) {
        if (this.conf.touchout) {
            if (this.conf.touchout.value && e.type == Laya.Event.MOUSE_DOWN) {
                this.onClose(null);
            }
        }
    };
    HistoryDialog.prototype.onClose = function (s) {
        this.showDialog(false);
        // this.closeCallback.apply(this.caller,[this]);
        this.hide();
    };
    HistoryDialog.prototype.showDialog = function (b) {
        this.visible = b;
    };
    return HistoryDialog;
}(Laya.Sprite));
//# sourceMappingURL=HistoryDialog.js.map