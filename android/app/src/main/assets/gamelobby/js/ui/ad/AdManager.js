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
var AdManager = /** @class */ (function (_super) {
    __extends(AdManager, _super);
    function AdManager() {
        var _this = _super.call(this) || this;
        _this.cur_choose_id = -1; //当前选中的id
        //拖拽状态相关
        _this.bDrag = false; //是否在拖拽中
        _this.dragStartPos = {}; //拖拽起点
        _this.iDragPercent = 0; //拖拽进度
        _this.arr_focus = new Array();
        _this.arr_items = new Array();
        return _this;
    }
    AdManager.getInstance = function (node) {
        if (node === void 0) { node = null; }
        if (!AdManager.obj && node != null) {
            var o = new AdManager();
            o.init(ConfObjRead.getConfAdManager());
            node.addChild(o);
        }
        return AdManager.obj;
    };
    AdManager.prototype.destroy = function (b) {
        AdManager.obj = null;
        _super.prototype.destroy.call(this, b);
    };
    AdManager.prototype.hide = function () {
        this.visible = false;
        this.destroy(true);
    };
    AdManager.prototype.init = function (conf) {
        AdManager.obj = this;
        this.conf = conf;
        //背景
        if (this.conf.bg) {
            this.initBg(this.conf.bg);
        }
        //内容容器
        this.sp_content = new Laya.Sprite();
        this.sp_content.pos(this.conf.content.pos.x, this.conf.content.pos.y);
        this.addChild(this.sp_content);
        //设置内容容器里，只有部分区域可以渲染和绘制，类似蒙版功能
        this.sp_content.scrollRect = new Laya.Rectangle(this.conf.content.rect.x, this.conf.content.rect.y, this.conf.content.rect.w, this.conf.content.rect.h);
        this.sp_content.size(this.conf.content.rect.w, this.conf.content.rect.h);
        this.sp_content.on(Laya.Event.MOUSE_DOWN, this, this.onMouseEvent);
        this.sp_content.on(Laya.Event.MOUSE_MOVE, this, this.onMouseEvent);
        this.sp_content.on(Laya.Event.MOUSE_UP, this, this.onMouseEvent);
        this.sp_content.on(Laya.Event.MOUSE_OUT, this, this.onMouseEvent);
        if (this.conf.content.frame) {
            // this.sp_content.graphics.drawRect(this.conf.rect.x,this.conf.rect.y,this.conf.rect.w,this.conf.rect.h,this.conf.frame.color);
            Tools.drawRectWithAlpha(this.sp_content, this.conf.content.rect.x, this.conf.content.rect.y, this.conf.content.rect.w, this.conf.content.rect.h, this.conf.content.frame.color, this.conf.content.frame.alpha);
        }
        //内容
        this.createContents();
        //前景
        if (this.conf.front) {
            this.initFront(this.conf.front);
        }
        //底部切换提示块
        if (this.conf.tabsItem) {
            this.initFocus(this.conf.tabsItem);
        }
        this.pos(this.conf.pos.x, this.conf.pos.y);
    };
    //初始化背景
    AdManager.prototype.initBg = function (conf) {
        if (!conf) {
            return;
        }
        // var sp_bg = Tools.addSprite(this,conf);
        if (conf.anim) {
            var anim = new MyBoneAnim();
            anim.init(conf.anim);
            this.addChild(anim);
            anim.playAnim(0, true);
        }
    };
    //前景
    AdManager.prototype.initFront = function (conf) {
        if (!conf) {
            return;
        }
        // var sp_ft = Tools.addSprite(this,conf);
        if (conf.anim) {
            var anim = new MyBoneAnim();
            anim.init(conf.anim);
            this.addChild(anim);
            anim.playAnim(0, true);
        }
    };
    //初始化焦点提示块
    AdManager.prototype.initFocus = function (conf) {
        var fcontent = new Laya.Sprite();
        fcontent.pos(conf.pos.x, conf.pos.y);
        this.addChild(fcontent);
        //根据当前内容数量来构造
        var gw = conf.jianju.w;
        var gh = conf.jianju.h;
        var w = conf.size.w;
        var h = conf.size.h;
        var x = 0, y = 0;
        var len = this.conf.content.srcs.length;
        //根据数量，确定坐标起点
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
            //构造之后加到数组里面管理
            this.arr_focus.push(sb);
        }
        this.showFocusById(0);
    };
    //显示焦点按钮
    AdManager.prototype.showFocusById = function (id) {
        if (!this.arr_focus[id]) {
            return;
        }
        this.cur_choose_id = id;
        //焦点切换
        for (var i = 0; i < this.arr_focus.length; i++) {
            var sb = this.arr_focus[i];
            sb.setOn(0, false);
        }
        this.arr_focus[id].setOn(1, false);
        //图片显示
        for (var i = 0; i < this.arr_items.length; i++) {
            var sb = this.arr_items[i];
            sb.visible = false;
        }
        this.arr_items[id].visible = true;
    };
    //
    AdManager.prototype.onSwitchClick = function () {
    };
    //发起更新请求
    AdManager.prototype.requestAvatorSave = function (url) {
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
    AdManager.prototype.responseAvatorSave = function (s, stat, hr) {
        // Debug.trace("responseAvatorSave stat:"+stat);
        // Debug.trace(s);
        // Debug.trace("hr:");
        // Debug.trace(hr);
        if (MyBBLoading.obj) {
            MyBBLoading.obj.show(false);
        }
        if (stat == "complete") {
            //请求成功，更改头像完成
            // this.saveAvatorSuc();
        }
        else {
            if (stat == "error" && hr.http.status == 200) {
                //成功的
                // this.saveAvatorSuc();
                return;
            }
            //请求失败
            Toast.showToast(s);
        }
    };
    //创建头像
    AdManager.prototype.createContents = function () {
        if (this.conf.content.srcs) {
            var confa = this.conf.content.srcs;
            var alen = this.conf.content.srcs.length;
            if (!this.arr_items) {
                this.arr_items = new Array();
            }
            else {
                this.arr_items.splice(0, this.arr_items.length);
            }
            for (var k = 0; k < alen; k++) {
                var a_src = this.conf.content.srcs[k];
                var sp_icon = new Laya.Sprite();
                sp_icon.loadImage(a_src);
                var w = sp_icon.width;
                var h = sp_icon.height;
                // Debug.trace("k"+k+" w"+w+" h:"+h);
                sp_icon.pivot(w / 2, h);
                var x = this.conf.content.rect.w / 2;
                var y = this.conf.content.rect.h; // + this.conf.content.rect.y;
                // Debug.trace("k"+k+" x"+x+" y:"+y);
                sp_icon.pos(x, y);
                sp_icon.visible = false;
                this.sp_content.addChild(sp_icon);
                this.arr_items.push(sp_icon);
            }
        }
    };
    //刷新拖拽
    AdManager.prototype.refreshDrag = function (x, y) {
        // 修改当前对象的坐标，跟随鼠标
        var obj = this.arr_items[this.cur_choose_id];
        var nPos = {
            "x": obj.x,
            "y": obj.y
        };
    };
    AdManager.prototype.backDrag = function () {
    };
    //鼠标响应
    AdManager.prototype.onMouseEvent = function (e) {
        var x = e.stageX;
        var y = e.stageY;
        switch (e.type) {
            case Laya.Event.MOUSE_DOWN:
                //按下了，开始拖拽
                if (!this.bDrag) {
                    this.bDrag = true;
                    this.dragStartPos = {
                        "x": x,
                        "y": y
                    };
                    this.iDragPercent = 0;
                }
                break;
            case Laya.Event.MOUSE_MOVE:
                //移动过程中，如果在拖拽，则跟随
                if (this.bDrag) {
                    //并随时变换当前拖拽对象和下一个对象的状态
                    this.refreshDrag(x, y);
                }
                break;
            case Laya.Event.MOUSE_OUT:
            case Laya.Event.MOUSE_UP:
                //停止拖拽，看拖拽到何种程度？超过50%，自动进入下一个
                //否则自动回退到当前
                if (this.bDrag) {
                    this.backDrag();
                }
                break;
        }
    };
    return AdManager;
}(Laya.Sprite));
//# sourceMappingURL=AdManager.js.map