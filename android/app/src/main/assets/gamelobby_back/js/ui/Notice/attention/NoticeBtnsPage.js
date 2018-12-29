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
var NoticeBtnsPage = /** @class */ (function (_super) {
    __extends(NoticeBtnsPage, _super);
    function NoticeBtnsPage() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.downPos = {
            "x": 0,
            "y": 0
        }; //按下的坐标
        _this.curShowId = 0; //当前显示的公告
        _this.cateId = 0; //所属分类id
        return _this;
    }
    NoticeBtnsPage.prototype.init = function (conf, data) {
        this.conf = conf;
        this.data = data;
        this.cateId = this.data.noticeCate;
        this.sp_content = new Laya.Sprite();
        this.sp_content.pos(this.conf.content.pos.x, this.conf.content.pos.y);
        this.addChild(this.sp_content);
        if (this.conf.content.color) {
            Tools.drawRect(this, this.conf.content.pos.x, this.conf.content.pos.y, this.conf.content.size.w, this.conf.content.size.h, "#ff0000");
        }
        //设置内容容器里，只有部分区域可以渲染和绘制，类似蒙版功能
        this.scrollRect = new Laya.Rectangle(this.conf.content.pos.x, this.conf.content.pos.y, this.conf.content.size.w, this.conf.content.size.h);
        this.size(this.conf.content.size.w, this.conf.content.size.h);
        this.on(Laya.Event.MOUSE_DOWN, this, this.onMouseEvent);
        this.on(Laya.Event.MOUSE_MOVE, this, this.onMouseEvent);
        this.on(Laya.Event.MOUSE_UP, this, this.onMouseEvent);
        this.on(Laya.Event.MOUSE_OUT, this, this.onMouseEvent);
        //往按钮内容页里面添加公告按钮
        this.arr_btns = new Array();
        for (var b in data.noticeList) {
            var btnData = data.noticeList[b];
            var id = this.arr_btns.length;
            var btn = this.addNoticeBtn(this.sp_content, id, btnData);
            this.sp_content.height += this.conf.btnitem.switch.size.h + this.conf.btnitem.switch.size.gh;
            this.arr_btns.push(btn);
        }
        //往按钮内容也添加箭头
        this.sp_arrow = this.addArrow(this, this.conf.arrow);
        this.pos(this.conf.pos.x, this.conf.pos.y);
        this.size(this.conf.content.size.w, this.conf.content.size.h);
        this.initHandleData();
        //tab更新
        // if( this.arr_btns[0] )
        // {
        //     this.curShowId = this.arr_btns[0].data.noticeid;
        //     this.changeTab( this.curShowId );
        // }
    };
    //计算旗下还有多少未读的
    NoticeBtnsPage.prototype.countUnread = function () {
        var num = 0;
        for (var a in this.arr_btns) {
            var b = this.arr_btns[a];
            if (!b.data.bRead) {
                num += 1;
            }
        }
        return num;
    };
    //修改当前索引页面
    NoticeBtnsPage.prototype.changeTab = function (id) {
        this.curShowId = id;
        // Debug.trace("page changeTab:"+this.curShowId);
        this.updateTab();
    };
    NoticeBtnsPage.prototype.updateTab = function () {
        // Debug.trace("btns len:"+this.arr_btns.length);
        //所有分类按钮都未点击，除了当前这个
        for (var c in this.arr_btns) {
            var d = this.arr_btns[c];
            // Debug.trace("updateTab d:");
            // Debug.trace(d);
            if (d.data.noticeid == this.curShowId) {
                AttentionDialog.getObj().showAttention(d.data);
                d.setOn(1);
            }
            else {
                d.setOn(0);
            }
        }
    };
    NoticeBtnsPage.prototype.addArrow = function (node, conf) {
        var a = new PageArrow();
        a.init(conf);
        node.addChild(a);
        return a; //Tools.addSprite(node,conf);
    };
    NoticeBtnsPage.prototype.addNoticeBtn = function (node, id, data) {
        var ai = new AttentionItem();
        ai.init(this, this.conf.btnitem, id);
        ai.setData(data);
        ai.cateId = this.cateId;
        node.addChild(ai);
        return ai;
    };
    //鼠标响应
    NoticeBtnsPage.prototype.onMouseEvent = function (e) {
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
    //移动所有元素，dis 为移动距离
    NoticeBtnsPage.prototype.moveAllItem = function (dis) {
        //如果当前的总宽度小于panel的宽度，不能移动
        // if( this.totalHeight <= this.height )
        // {
        //     return;
        // }
        this.sp_content.y += dis;
    };
    //初始化数据
    NoticeBtnsPage.prototype.initHandleData = function () {
        var ry = this.arr_btns.length * (this.conf.btnitem.switch.size.h + this.conf.btnitem.switch.size.gh);
        this.totalHeight = ry + this.conf.btnitem.switch.size.h + this.conf.btnitem.switch.size.gh;
        // this.miny = this.conf.content.size.h - this.totalHeight;
        // this.maxy = 0;
        // Debug.trace("totalHeight:"+this.totalHeight);//+" miny:"+this.miny+" maxy:"+this.maxy);
        //如果同高度超出了当前高度，需要滚动，才显示箭头
        this.refreshArrow();
    };
    NoticeBtnsPage.prototype.refreshArrow = function () {
        if (this.totalHeight <= this.height) {
            this.sp_arrow.visible = false;
        }
    };
    //移动完毕，检查当前回退到哪里
    NoticeBtnsPage.prototype.backAllContent = function () {
        //遍历所有内容层
        var ct = this.sp_content;
        //顶部y坐标如果大于0，则是应该向上回退
        var yHead = ct.y;
        var miny = this.conf.btnitem.pos.y;
        //底部y坐标如果小于最大y值，则是应该向下回退
        var yEnd = ct.y + ct.height; //this.conf.defaultItemConfs[i].size.h;
        var maxy = this.conf.content.size.h;
        //如果第一个y坐标小于0，且最后一个底部y坐标大于最大y值，则无需回退
        var backY = 0; //回退尺寸
        var ctHeight = ct.height; //this.conf.defaultItemConfs[i].size.h;
        var showHeight = this.conf.content.size.h;
        // Debug.trace("backAllContent yHead:"+yHead+" yEnd:"+yEnd+" miny:"+miny+" maxy:"+maxy);
        if (yHead <= miny && yEnd >= maxy) {
            //无需回退
        }
        else if (yHead > miny || ctHeight <= showHeight) {
            //上退
            backY = miny - yHead;
            this.backActionAll(ct, backY);
        }
        else if (yEnd < maxy) {
            //下退
            //退的幅度就是当前y坐标与最大值之间的差值
            backY = maxy - yEnd;
            this.backActionAll(ct, backY);
        }
    };
    //给所有头像，包括焦点，设定回退动画
    NoticeBtnsPage.prototype.backActionAll = function (sp, y) {
        var a = sp;
        var pos = {
            "x": a.x,
            "y": a.y + y
        };
        this.setAction(a, pos);
    };
    //添加动作
    NoticeBtnsPage.prototype.setAction = function (sp, pos) {
        var tween = Laya.Tween.to(sp, {
            x: pos.x,
            y: pos.y
        }, 200, Laya.Ease["backIn"]);
    };
    return NoticeBtnsPage;
}(Laya.Sprite));
//# sourceMappingURL=NoticeBtnsPage.js.map