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
        _this.bDrag = false; //是否再拖动中
        _this.downX = 0; //当前鼠标按下的位置
        _this.startDragX = 0; //开始按下的位置
        _this.lastScrollSpdX = 0; //前一刻的滚动速度
        _this.startDragTime = 0; //按下时的时间
        _this.endDragTime = 0; //松开的时间
        _this.minx = 0;
        _this.maxx = 0;
        _this.totalWidth = 0; //内容涵盖的总宽度
        _this.bRequestStatus = 1; //当前网络请求状态 1=未请求，0=成功，-1=出错
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
        //内容层
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
        //内容移动节点
        this.sp_ct_move = new MoveContent(this.conf.movecontent); //new Laya.Sprite();
        this.sp_ct_move.setListener(0, this, this.onContentEvent);
        this.sp_content.addChild(this.sp_ct_move);
        //箭头
        if (this.conf.pagearrow) {
            // this.sp_arrow = Tools.addSprite(this,this.conf.arrow);
            this.sp_arrow = new PageArrow();
            this.sp_arrow.init(this.conf.pagearrow);
            this.sp_arrow.setPanel(this);
            this.addChild(this.sp_arrow);
        }
        //添加女生
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
        // this.sp_girl.visible = true;
        // this.scrollInGirl();
        // this.scrollInContent();
    };
    GamePanel.prototype.scrollInGirl = function () {
        if (!this.sp_girl) {
            return;
        }
        var tween = Laya.Tween.to(this.sp_girl, {
            x: this.conf.girl.pos.x,
            y: this.conf.girl.pos.y
        }, this.conf.girl.durationIn, Laya.Ease["backIn"], new Laya.Handler(this, this.scrollInGirlOk));
        // Debug.trace("GamePanel.scrollInGirl");
    };
    GamePanel.prototype.scrollInGirlOk = function () {
        // Debug.trace("GamePanel.scrollInGirlOK");
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
        // for(var k in this.items)
        for (var k = 0; k < this.items.length; k++) {
            //检查状态，NORMAL状态的可用性一律与b一致
            //其它均为false
            var one = this.items[k];
            one.setEnable(b);
        }
    };
    GamePanel.prototype.flip = function (num) {
        // var i = this.items.length;
        var v = this.conf.flip.onetime; //Math.floor(i/2) - 1;    //列号
        //最右边的一列x坐标
        var x = (this.conf.gameitemdefault.btnicon.size.w +
            this.conf.gameitemdefault.btnicon.size.gw) * v +
            this.conf.flip.offsetx;
        var sumx = -1 * x * num;
        // Debug.trace("GamePanel.flip sumx:"+sumx+" v:"+v+" x:"+x);
        this.moveAllItem(sumx);
    };
    //点击箭头，自动向左移动num格
    GamePanel.prototype.flipNext = function (num) {
        if (this.conf.movecontent.scrollType == "tween") {
            this.sp_ct_move.autoSlips(MoveContent.MOVE_DIRECT_LEFT, this.conf.movecontent.jumpspds * num, this.conf.movecontent.jumptimes);
        }
        else {
            this.sp_ct_move.autoSlip(MoveContent.MOVE_DIRECT_LEFT, this.conf.movecontent.jumpspd * num, this.conf.movecontent.jumptime);
        }
    };
    GamePanel.prototype.moveContentEvent = function (e) {
        // Debug.trace('panel move '+e.type);
        // Debug.trace('zOrder:'+this.zOrder);
        var x = e.stageX;
        var y = e.stageY;
        switch (e.type) {
            case Laya.Event.MOUSE_DOWN:
                this.bDrag = true;
                this.downX = x;
                this.startDragX = x;
                this.startDragTime = Tools.getTime();
                // Debug.trace("GamePanel.moveContentEvent down x:"+this.startDragX);
                // if( this.scrollbar )
                // {
                //     this.scrollbar.moveStart();
                // }
                //重新开始拖拉的时候，应该停掉之前的动画
                this.sp_ct_move.startMoveDrag();
                break;
            case Laya.Event.MOUSE_MOVE:
                if (this.downX > 0 && this.bDrag) {
                    var sumx = x - this.downX;
                    this.downX = x;
                    // this.moveAllItem(sumx);
                    this.moveGameItems(sumx, x, y);
                    //当前按下的位置与第一次移动产生的方向，区分方向进行音效播放
                }
                break;
            case Laya.Event.MOUSE_OUT:
            case Laya.Event.MOUSE_UP:
                // this.moveEnd(x);
                // Debug.trace("GamePanel.moveContentEvent out x");
                if (this.bDrag) {
                    this.endDragTime = Tools.getTime();
                    if (this.isMoved(x, y)) {
                        this.moveEnds(x, y);
                    }
                }
                this.downX = 0;
                this.bDrag = false;
                // if( this.scrollbar )
                // {
                //     this.scrollbar.moveEnd();
                // }
                break;
        }
    };
    //是否发生了移动
    GamePanel.prototype.isMoved = function (x, y) {
        var sumx = Math.abs(this.startDragX - x);
        return sumx > this.conf.movecontent.moveddis;
    };
    GamePanel.prototype.moveAllItem = function (x) {
        // Debug.trace('move x:'+x);
        //如果当前的总宽度小于panel的宽度，不能移动
        // if( this.totalWidth <= this.width )
        if (this.totalWidth <= this.conf.panel.rect.w) {
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
        // for(var i in this.items)
        for (var i = 0; i < this.items.length; i++) {
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
    //拖拉内容层
    GamePanel.prototype.moveGameItems = function (sumx, cx, cy) {
        var minx = (this.conf.movecontent.visibleRect.w - this.sp_ct_move.width) - this.conf.movecontent.minxOffsetX;
        var maxx = 0 + this.conf.movecontent.maxxOffsetX;
        var nx = sumx;
        var cx = this.sp_ct_move.x;
        var newx = cx + nx;
        //拖拉超过一定值，就松开
        if (sumx <= 0) {
            //left
            if (newx <= minx) {
                //直接停止
                // this.stopDragForce();
                // this.lastScrollSpdX = 0;
                // return; //不能拖了，不继续走
                //超出越多，速度降低越多
                var sumLeft = Math.abs(minx - newx);
                nx = nx / (sumLeft / this.conf.movecontent.dragendoffset);
            }
        }
        else if (sumx > 0) {
            //right
            if (newx >= maxx) {
                //直接停止
                // this.stopDragForce();
                // this.lastScrollSpdX = 0;
                // return; //不能拖了
                //超出越多，速度降低越多
                var sumRight = Math.abs(maxx - newx);
                nx = nx / (sumRight / this.conf.movecontent.dragendoffset);
            }
        }
        // Debug.trace();
        this.sp_ct_move.x += nx;
        //记录下当前的滚动速度
        this.lastScrollSpdX = nx;
        var bHave = this.isHaveGameIcons();
        this.sp_arrow.visible = bHave;
    };
    //强制停止拖拽
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
        //本次移动按下的点与当前点形成的差值，标记了当前移动的方向
        var direct = MoveContent.MOVE_DIRECT_LEFT;
        var dx = this.startDragX - cx;
        if (dx > 0) {
            //向左
            direct = MoveContent.MOVE_DIRECT_LEFT;
        }
        else if (dx < 0) {
            //向右
            direct = MoveContent.MOVE_DIRECT_RIGHT;
        }
        //指令下发，当前已经完成拖拽，内容层可自行惯性滑动了
        var timeSum = this.endDragTime - this.startDragTime;
        if (this.conf.movecontent.scrollType == "tween") {
            this.sp_ct_move.autoSlips(direct, this.lastScrollSpdX, timeSum);
        }
        else {
            this.sp_ct_move.autoSlip(direct, this.lastScrollSpdX, timeSum);
        }
    };
    //处理来自移动对象的事件
    GamePanel.prototype.onContentEvent = function (obj, mvEvent, mvType, mvDirect) {
        //弹完之后，检查箭头是否还需要显示
        // Debug.trace("GamePanel.onContentEvent mvEvent:"+mvEvent+" mvType:"+mvType+" mvDirect:"+mvDirect);
        if (mvEvent == MoveContent.MOVE_EVENT_END) {
            var bHave = this.isHaveGameIcons();
            this.sp_arrow.visible = bHave;
        }
    };
    //移动结束
    GamePanel.prototype.moveEnd = function (x) {
        // Debug.trace("GamePanel.moveEnd this.downX:"+this.downX);
        //检查移动的距离，超过一定阀值，作为移动手势，开始移动，每次翻动一页
        if (this.downX > 0) {
            var sumx = x - this.downX;
            this.downX = x;
            // Debug.trace("GamePanel.moveEnd sumx:"+sumx+" movex:"+this.conf.flip.movex);
            if (Math.abs(sumx) >= Math.abs(this.conf.flip.movex)) {
                // Debug.trace("GamePanel.moveEnd flip");
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
        // for( var a in this.items )
        var ilen = this.items.length;
        for (var a = 0; a < ilen; a++) {
            this.items[a].zOrder = idx;
        }
    };
    GamePanel.prototype.requestGameList = function (url, data) {
        if (data === void 0) { data = null; }
        this.bRequestStatus = 1;
        // Debug.trace("GamePanel.requestGameList show");
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
    GamePanel.prototype.responseGameList = function (s, stat, hr) {
        if (stat == "complete") {
            //设置所有参数
            Common.gameInfo = s.datas;
            // for( var a in this.items )
            var ilen = this.items.length;
            for (var a = 0; a < ilen; a++) {
                var it = this.items[a];
                it.destroy(true);
            }
            this.items = null;
            this.items = new Array();
            // Debug.trace('gameInfo datas:');
            // Debug.trace(s);
            this.addGameItems(s.datas);
            // lamain.sceneRoot.showCircleLoading(false);
            // Debug.trace('GamePanel.responseGameList addGameItems ok');
            this.bRequestStatus = 0;
            LayaMain.getInstance().requestEnd(stat, "");
        }
        else {
            // lamain.sceneRoot.showCircleLoading(false);
            // Toast.showToast(s);
            this.bRequestStatus = -1;
            LayaMain.getInstance().requestEnd(stat, s);
        }
        // if( MyBBLoading.obj )
        // {
        //     MyBBLoading.obj.show(false);
        // }
        // Debug.trace("response userInfo:"+stat);
        // Debug.trace(s);
        //添加完毕游戏图标之后，添加女生
        // this.createGirl();
        // Debug.trace('GamePanel.responseGameList hidden loading');
        this.scrollInGirl();
        // Debug.trace('GamePanel.responseGameList scrollingirl ok');
        this.scrollInContent();
        // Debug.trace('GamePanel.responseGameList scrollincontent ok');
        //完毕了，之后又干嘛
        this.callback.apply(this.caller, [this]);
        // Debug.trace('GamePanel.responseGameList callback ok');
    };
    //添加一个图标元素
    GamePanel.prototype.addGameItems = function (dt) {
        //测试数据需要几条？
        if (this.conf.testItemLen) {
            if (dt.length >= this.conf.testItemLen) {
                //真实数据超过测试数据数量，切割
                var outlen = dt.length - this.conf.testItemLen;
                dt.splice(this.conf.testItemLen, outlen);
            }
            else {
                //真实数据不够，添加
                var addlen = this.conf.testItemLen - dt.length;
                var da = dt[0];
                for (var i = 0; i < addlen; i++) {
                    dt.push(da);
                }
            }
        }
        // Debug.trace('addGameItems len:'+dt.length);
        // for( var i = 0; i < this.conf.gameitemdefault.number; i++ )
        // var i = 0;
        // Debug.trace("GamePanel this.width:"+this.width);
        this.totalWidth = 0;
        for (var i = 0; i < dt.length; i++) {
            var gi = new GameItem();
            gi.init(this.conf.gameitemdefault, this);
            //坐标修改为一上一下
            var h = Math.floor(i % 2); //行号
            var v = Math.floor(i / 2); //列号
            // Debug.trace("GamePanel i:"+i+" h:"+h+" v:"+v);
            // gi.x = this.conf.gameitemdefault.btnicon.pos.x + (i * this.conf.gameitemdefault.btnicon.size.w) + (i*this.conf.gameitemdefault.btnicon.size.gw);
            gi.x = this.conf.gameitemdefault.btnicon.pos.x +
                (v * this.conf.gameitemdefault.btnicon.size.w) +
                (v * this.conf.gameitemdefault.btnicon.size.gw) + this.conf.gameitemdefault.pos.x;
            // v*this.conf.flip.offsetx;
            gi.y = this.conf.gameitemdefault.btnicon.pos.y +
                (h * this.conf.gameitemdefault.btnicon.size.h) +
                (h * this.conf.gameitemdefault.btnicon.size.gh) + this.conf.gameitemdefault.pos.y;
            // this.addChild(gi);
            // this.sp_content.addChild(gi);
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
        //设定内容层的大小尺寸
        this.sp_ct_move.size(this.totalWidth, this.conf.panel.rect.h);
        this.resetScrollBar();
        //检查绘制移动层背景
        this.sp_ct_move.checkShowBg();
    };
    //指定坐标右侧是否还有游戏图标？
    GamePanel.prototype.isHaveGameIcons = function () {
        try {
            // Debug.trace("this.items[0].x:"+this.items[0].x);
            // Debug.trace("this.minx:"+this.minx);
            // if( this.items[0].x <= this.minx )
            if (this.sp_ct_move.x <= this.minx) {
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