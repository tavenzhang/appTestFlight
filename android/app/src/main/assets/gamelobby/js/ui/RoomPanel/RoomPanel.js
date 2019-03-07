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
        _this.bRequestStatus = 1; //当前网络请求状态 1=未请求，0=成功，-1=出错
        return _this;
        // public resetScrollBar():void
        // {
        //     if(!this.scrollbar)
        //     {
        //         this.scrollbar = new ScrollBar();
        //         this.scrollbar.init(this.conf.scrollbar);
        //         this.addChild(this.scrollbar);
        //     }
        //     this.scrollbar.reset(this.width,this.totalWidth);
        // }
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
        // Debug.trace("conf:");
        // Debug.trace(this.conf);
        this.caller = caller;
        this.callback = callback;
        this.sp_content = new Laya.Sprite();
        this.sp_content.pos(this.conf.panel.content.pos.x, this.conf.panel.content.pos.y);
        this.addChild(this.sp_content);
        if (this.conf.panel.showbg) {
            Tools.drawRectWithAlpha(this.sp_content, 0, 0, this.conf.panel.content.size.w, this.conf.panel.content.size.h, this.conf.panel.showbg.color, this.conf.panel.showbg.alpha);
        }
        this.items = new Array();
        // this.size(this.conf.panel.content.size.w,this.conf.panel.content.size.h);
        this.pos(this.conf.pos.x, this.conf.pos.y);
        // this.sp_content.on(Laya.Event.MOUSE_DOWN,this,this.moveContent);
        // this.sp_content.on(Laya.Event.MOUSE_MOVE,this,this.moveContent);
        // this.sp_content.on(Laya.Event.MOUSE_UP,this,this.moveContent);
        // this.sp_content.on(Laya.Event.MOUSE_OUT,this,this.moveContent);
        // this.resetScrollBar();
        this.requestData();
    };
    RoomPanel.prototype.onBackClick = function (s) {
        //点击返回按钮，进入游戏列表
        // sceneLobby.getInGameList();
        // this.scrollOutContent();
    };
    RoomPanel.prototype.scrollInContent = function () {
        var tween = Laya.Tween.to(this.sp_content, {
            x: this.conf.panel.content.pos.x,
            y: this.conf.panel.content.pos.y
        }, this.conf.panel.content.durationIn, Laya.Ease["backIn"], new Laya.Handler(this, this.scrollInContentOk));
    };
    RoomPanel.prototype.scrollInContentOk = function () {
        // Debug.trace('room scroll in ok');
        //进来完成，批量处理房间图标，可以点击
        // for(var k in this.items)
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
        //离开游戏列表，清空定时器
        // this.scrollbar.clearTimer();
        // this.scrollbar.setMyAlpha(0);
        // lamain.sceneLobby.getInGameList();
    };
    RoomPanel.prototype.moveContent = function (e) {
        // Debug.trace('panel move '+e.type);
        // Debug.trace('zOrder:'+this.zOrder);
        var x = e.stageX;
        switch (e.type) {
            case Laya.Event.MOUSE_DOWN:
                this.bDrag = true;
                this.downX = x;
                // this.scrollbar.moveStart();
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
                // this.scrollbar.moveEnd();
                break;
        }
    };
    RoomPanel.prototype.moveAllItem = function (x) {
        // Debug.trace('move x:'+x);
        //如果当前的总宽度小于panel的宽度，不能移动
        if (this.totalWidth <= this.width) {
            // Debug.trace('totalWidth < width');
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
        //所有的图标移动了X，进度条要向反方向移动X
        // if( this.scrollbar_ft )
        // {
        //     var wp = nx/this.totalWidth;
        //     var mx = this.conf.scrollbar.bg.size.w * wp;
        //     this.scrollbar_ft.x -= mx;
        // }
        // this.scrollbar.move(nx);
        //背景里面的星星移动
        if (UIBg.obj) {
            UIBg.obj.moveStars(nx);
        }
    };
    RoomPanel.prototype.setAllItemOrder = function (idx) {
        // for( var a in this.items )
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
        //成功收到游戏数据
        if (stat == "complete") {
            Common.gameInfo = s.datas;
            this.gamedata = Common.getGameDataById(Common.gameId);
            //请求房间列表
            this.requestRoomList(ConfObjRead.getConfUrl().url.apihome +
                ConfObjRead.getConfUrl().cmd.roomlist +
                "?gameId=" + this.gamedata.id +
                "&pageSize=20&start=0&access_token=" + Common.access_token);
        }
        else {
            // Toast.showToast(s);
            this.bRequestStatus = -1;
            LayaMain.getInstance().requestEnd(stat, s);
        }
    };
    RoomPanel.prototype.requestData = function () {
        LayaMain.getInstance().showCircleLoading(true);
        //检查是否有游戏数据？没有的话，先请求一下，然后再请求房间列表
        if (!Common.gameInfo) {
            this.requestGameListData();
        }
        else {
            //请求房间列表
            this.requestRoomList(ConfObjRead.getConfUrl().url.apihome +
                ConfObjRead.getConfUrl().cmd.roomlist +
                "?gameId=" + this.gamedata.id +
                "&pageSize=20&start=0&access_token=" + Common.access_token);
        }
    };
    RoomPanel.prototype.requestRoomList = function (url) {
        this.bRequestStatus = 1;
        LayaMain.getInstance().showCircleLoading(true);
        // MyBBLoading.showPad(this,ConfObjRead.getConfCLoading(),null);
        NetManager.getObj().HttpConnect(url, this, this.responseRoomList);
    };
    RoomPanel.prototype.responseRoomList = function (s, stat, hr) {
        // Debug.trace("RoomPanel.responseRoomList stat:"+stat);
        // Debug.trace(s);
        // Debug.trace(hr);
        if (stat == "complete") {
            //设置所有参数
            this.roomInfo = s;
            this.addGameItems(this.roomInfo.datas);
            //构造完毕后，移动进来
            // this.scrollInContent();
            this.bRequestStatus = 0;
            LayaMain.getInstance().requestEnd(stat, "");
        }
        else {
            // Toast.showToast(s);
            this.bRequestStatus = -1;
            LayaMain.getInstance().requestEnd(stat, s);
        }
        // if( MyBBLoading.obj )
        // {
        //     MyBBLoading.obj.show(false);
        // }
        //完毕了，之后又干嘛
        this.callback.apply(this.caller, [this]);
    };
    RoomPanel.prototype.addGameItems = function (dt) {
        // Debug.trace('addGameItems items len:'+this.items.length);
        // Debug.trace("addGameItems:");
        // Debug.trace(this.items);
        //复制出几个测试数据
        if (this.conf.testItemLen) {
            var da = dt[0];
            for (var i = 0; i < this.conf.testItemLen; i++) {
                dt.push(da);
            }
        }
        for (var i = 0; i < dt.length; i++) {
            // if( i == 0 )
            // {
            //     dt[i].state = "PAUSE";
            // }
            var gi = new RoomItem();
            gi.init(this.conf.gameitemdefault, this);
            gi.x = (i * this.conf.gameitemdefault.btnicon.size.w) +
                (i * this.conf.gameitemdefault.btnicon.size.gw);
            // Debug.trace('gi x:'+gi.x);
            // this.addChild(gi);
            this.sp_content.addChild(gi);
            gi.setData(dt[i], i);
            this.items.push(gi);
            this.totalWidth = gi.x + gi.width;
            this.minx = this.width - this.totalWidth;
            this.maxx = 0;
        }
        // Debug.trace('addGameItems items end len:'+this.items.length);
        // this.resetScrollBar();
    };
    //清空所有房间图标
    RoomPanel.prototype.clearRooms = function () {
        // for(var k in this.items)
        for (var k = 0; k < this.items.length; k++) {
            var it = this.items[k];
            // this.removeChild(it);
            it.destroy(true);
        }
        this.items.splice(0, this.items.length);
        // Debug.trace('addGameItems items clear len:'+this.items.length);
    };
    // public scrollbar_bg:Laya.Sprite;    //滚动条背景
    // public scrollbar_ft:Laya.Sprite;    //滚动条前景
    // public scrollbar:ScrollBar;
    RoomPanel.obj = null;
    return RoomPanel;
}(Laya.Sprite));
//# sourceMappingURL=RoomPanel.js.map