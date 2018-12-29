var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var GamePanel = /** @class */ (function (_super) {
    __extends(GamePanel, _super);
    function GamePanel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.bDrag = false; //是否再拖动中
        _this.downX = 0; //当前鼠标按下的位置
        _this.lastScrollSpdX = 0; //前一刻的滚动速度
        _this.minx = 0;
        _this.maxx = 0;
        _this.totalWidth = 0;
        return _this;
    }
    GamePanel.getInstance = function (node, conf, caller, callback) {
        if (!GamePanel.obj) {
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
        this.caller = caller;
        this.callback = callback;
        if (this.conf.panel.showbg) {
            this.panel_bg = new Laya.Sprite();
            this.addChild(this.panel_bg);
            Tools.drawRectWithAlpha(this.panel_bg, this.conf.panel.content.pos.x, this.conf.panel.content.pos.y, this.conf.panel.content.size.w, this.conf.panel.content.size.h, this.conf.panel.showbg.color, this.conf.panel.showbg.alpha);
        }
        this.size(this.conf.panel.content.size.w, this.conf.panel.content.size.h);
        //内容层
        this.sp_content = new Laya.Sprite();
        this.sp_content.pos(this.conf.panel.content.pos.x, this.conf.panel.content.pos.y);
        this.sp_content.size(this.conf.panel.content.size.w, this.conf.panel.content.size.h);
        this.addChild(this.sp_content);
        this.items = new Array();
        this.pos(this.conf.pos.x, this.conf.pos.y);
        this.sp_content.on(Laya.Event.MOUSE_DOWN, this, this.moveContent);
        this.sp_content.on(Laya.Event.MOUSE_MOVE, this, this.moveContent);
        this.sp_content.on(Laya.Event.MOUSE_UP, this, this.moveContent);
        this.sp_content.on(Laya.Event.MOUSE_OUT, this, this.moveContent);
        this.sp_content.scrollRect = new Laya.Rectangle(this.conf.panel.rect.x, this.conf.panel.rect.y, this.conf.panel.rect.w, this.conf.panel.rect.h);
        //箭头
        if (this.conf.arrow) {
            // this.sp_arrow = Tools.addSprite(this,this.conf.arrow);
            this.sp_arrow = new PageArrow();
            this.sp_arrow.init(this.conf.pagearrow);
            this.addChild(this.sp_arrow);
        }
        //添加女生
        this.createGirl();
        this.requestGameList(ConfObjRead.getConfUrl().url.lobbyurl +
            ConfObjRead.getConfUrl().cmd.gamelist +
            "?pageSize=20&start=0&access_token=" + Common.access_token +
            "&channel=" +
            ConfObjRead.getConfVersion().channel +
            "&device=" + Common.getLoginPlatform() +
            "&jump=" + Common.bNewlogin);
        this.resetScrollBar();
    };
    GamePanel.prototype.createGirl = function () {
        if (!this.sp_girl) {
            this.sp_girl = new Laya.Sprite();
            this.sp_girl.loadImage(this.conf.girl.src);
            this.addChild(this.sp_girl);
            this.sp_girl.pos(this.conf.girl.hidepos.x, this.conf.girl.hidepos.y);
        }
        // this.sp_girl.visible = true;
        // this.scrollInGirl();
        // this.scrollInContent();
    };
    GamePanel.prototype.scrollInGirl = function () {
        var tween = Laya.Tween.to(this.sp_girl, {
            x: this.conf.girl.pos.x,
            y: this.conf.girl.pos.y
        }, this.conf.girl.durationIn, Laya.Ease["backIn"], new Laya.Handler(this, this.scrollInGirlOk));
    };
    GamePanel.prototype.scrollInGirlOk = function () {
    };
    GamePanel.prototype.scrollOutGirl = function () {
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
        // Debug.trace('scrollin ok x:'+this.sp_content.x+" y:"+this.sp_content.y);
        // Debug.trace("game list items scroll in ok");
        //遍历所有游戏图标，检查是否可以点击
        this.EnableGameItems(true);
    };
    GamePanel.prototype.scrollOutContent = function (gameData) {
        var tween = Laya.Tween.to(this.sp_content, {
            x: this.conf.panel.content.hidepos.x,
            y: this.conf.panel.content.hidepos.y
        }, this.conf.panel.content.durationOut, Laya.Ease["backIn"], new Laya.Handler(this, this.scrollOutContentOk, [gameData]));
    };
    GamePanel.prototype.scrollOutContentOk = function (data) {
        //离开游戏列表，清空定时器
        if (this.scrollbar) {
            this.scrollbar.clearTimer();
            this.scrollbar.setMyAlpha(0);
        }
        //游戏列表界面不可见
        this.visible = false;
        //游戏图标点击后，应该开始拉取当前该游戏的所有房间列表
        // lamain.sceneLobby.getInGame(data);
    };
    //批量开关游戏图标的有效性
    GamePanel.prototype.EnableGameItems = function (b) {
        for (var k in this.items) {
            //检查状态，NORMAL状态的可用性一律与b一致
            //其它均为false
            var one = this.items[k];
            one.setEnable(b);
        }
    };
    GamePanel.prototype.moveContent = function (e) {
        // Debug.trace('panel move '+e.type);
        // Debug.trace('zOrder:'+this.zOrder);
        var x = e.stageX;
        switch (e.type) {
            case Laya.Event.MOUSE_DOWN:
                this.bDrag = true;
                this.downX = x;
                if (this.scrollbar) {
                    this.scrollbar.moveStart();
                }
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
                this.moveEnd();
                this.downX = 0;
                this.bDrag = false;
                if (this.scrollbar) {
                    this.scrollbar.moveEnd();
                }
                break;
        }
    };
    GamePanel.prototype.moveAllItem = function (x) {
        // Debug.trace('move x:'+x);
        //如果当前的总宽度小于panel的宽度，不能移动
        if (this.totalWidth <= this.width) {
            // Debug.trace('totalWidth < width');
            return;
        }
        var nx = x;
        var cx = 0;
        try {
            // cx = this.items[0].x;
            cx = this.items[0].px;
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
        // Debug.trace("newx:"+newx+" minx:"+this.minx+" maxx:"+this.maxx+" nx:"+nx+" cx:"+cx);
        // Debug.trace('move all item nx:'+nx);
        for (var i in this.items) {
            // this.items[i].x += nx;
            this.items[i].imMove(nx);
        }
        //记录下当前的滚动速度
        this.lastScrollSpdX = nx;
        if (this.scrollbar) {
            this.scrollbar.move(nx);
        }
        //背景里面的星星移动
        if (UIBg.obj) {
            UIBg.obj.moveStars(nx);
        }
        var bHave = this.isHaveGameIcons();
        this.sp_arrow.visible = bHave;
    };
    //移动结束
    GamePanel.prototype.moveEnd = function () {
        //结束的时候，检查是否需要吸附或者回弹
    };
    GamePanel.prototype.setAllItemOrder = function (idx) {
        for (var a in this.items) {
            this.items[a].zOrder = idx;
        }
    };
    GamePanel.prototype.requestGameList = function (url, data) {
        if (data === void 0) { data = null; }
        LayaMain.getInstance().showCircleLoading(true);
        // MyBBLoading.showPad(this,ConfObjRead.getConfCLoading(),null);
        // "Access-Control-Allow-Origin","*",
        // "Access-Control-Allow-Methods",//":GET",
        // "Access-Control-Allow-Headers",//":x-requested-with,content-type",
        // this.kuayu = false;
        // var header = [
        //     "Content-Type","application/json",
        //     "Accept","*/*"
        // ];
        var datas = null;
        if (data) {
            datas = JSON.stringify(data);
        }
        // header:any=null,
        // data:any=null,
        // metod:any="get",
        // restype:any="json"
        NetManager.getObj().HttpConnect(url, // encodeURI(url),
        this, this.responseGameList //,
        // header,
        // datas,
        // "get",
        // this.kuayu ? "jsonp" : "json"
        );
    };
    GamePanel.prototype.responseGameList = function (s, stat) {
        if (stat == "complete") {
            //设置所有参数
            Common.gameInfo = s.datas;
            for (var a in this.items) {
                var it = this.items[a];
                it.destroy(true);
            }
            this.items = null;
            this.items = new Array();
            Debug.trace('gameInfo datas:');
            Debug.trace(s);
            this.addGameItems(s.datas);
            // lamain.sceneRoot.showCircleLoading(false);
        }
        else {
            // lamain.sceneRoot.showCircleLoading(false);
            Toast.showToast(s);
        }
        if (MyBBLoading.obj) {
            MyBBLoading.obj.show(false);
        }
        // Debug.trace("response userInfo:"+stat);
        // Debug.trace(s);
        //添加完毕游戏图标之后，添加女生
        // this.createGirl();
        this.scrollInGirl();
        this.scrollInContent();
        //完毕了，之后又干嘛
        this.callback.apply(this.caller, [this]);
    };
    GamePanel.prototype.addGameItems = function (dt) {
        //复制出几个测试数据
        if (this.conf.testItemLen) {
            var da = dt[0];
            for (var i = 0; i < this.conf.testItemLen; i++) {
                dt.push(da);
            }
        }
        // Debug.trace('addGameItems len:'+dt.length);
        // for( var i = 0; i < this.conf.gameitemdefault.number; i++ )
        // var i = 0;
        for (var i = 0; i < dt.length; i++) {
            var gi = new GameItem();
            gi.init(this.conf.gameitemdefault, this);
            //坐标修改为一上一下
            var h = Math.floor(i % 2); //行号
            var v = Math.floor(i / 2); //列号
            // Debug.trace("i:"+i+" h:"+h+" v:"+v);
            // gi.x = this.conf.gameitemdefault.btnicon.pos.x + (i * this.conf.gameitemdefault.btnicon.size.w) + (i*this.conf.gameitemdefault.btnicon.size.gw);
            gi.x = this.conf.gameitemdefault.btnicon.pos.x +
                (v * this.conf.gameitemdefault.btnicon.size.w) +
                (v * this.conf.gameitemdefault.btnicon.size.gw);
            gi.y = this.conf.gameitemdefault.btnicon.pos.y +
                (h * this.conf.gameitemdefault.btnicon.size.h) +
                (h * this.conf.gameitemdefault.btnicon.size.gh);
            // this.addChild(gi);
            this.sp_content.addChild(gi);
            gi.setData(dt[i]);
            this.items.push(gi);
            this.totalWidth = gi.x + gi.width + this.conf.panel.content.pos.x + this.conf.gameitemdefault.btnicon.pos.x;
            this.minx = this.width - this.totalWidth + this.conf.gameitemdefault.btnicon.pos.x;
            this.maxx = this.conf.gameitemdefault.btnicon.pos.x;
        }
        this.resetScrollBar();
    };
    //指定坐标右侧是否还有游戏图标？
    GamePanel.prototype.isHaveGameIcons = function () {
        try {
            // Debug.trace("this.items[0].x:"+this.items[0].x);
            // Debug.trace("this.minx:"+this.minx);
            if (this.items[0].x <= this.minx) {
                return false;
            }
        }
        catch (e) { }
        return true;
    };
    GamePanel.prototype.resetScrollBar = function () {
        //检查右侧是否还有游戏图标？
        //有就显示箭头，没有就不显示箭头
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
    GamePanel.obj = null;
    return GamePanel;
}(Laya.Sprite));
//# sourceMappingURL=GamePanel.js.map