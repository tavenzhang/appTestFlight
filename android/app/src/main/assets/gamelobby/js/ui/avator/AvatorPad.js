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
var AvatorPad = /** @class */ (function (_super) {
    __extends(AvatorPad, _super);
    function AvatorPad() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.downPos = {
            "x": 0,
            "y": 0
        }; //按下的坐标
        _this.downClickPos = {
            "x": 0,
            "y": 0
        };
        _this.cur_icon_id = 0; //当前图标id
        _this.cur_choose_id = -1; //当前选中的id
        return _this;
    }
    AvatorPad.getObj = function () {
        return AvatorPad.obj;
    };
    AvatorPad.prototype.destroy = function (b) {
        AvatorPad.obj = null;
        _super.prototype.destroy.call(this, b);
    };
    AvatorPad.showPad = function (node) {
        if (!AvatorPad.obj) {
            var o = new AvatorPad();
            o.init(ConfObjRead.getConfAvatorPad()); //Common.confObj.avatorpad);//,hi);
            // Laya.stage.addChild(o);
            node.addChild(o);
        }
        // AvatorPad.obj.show(b);
    };
    AvatorPad.prototype.hide = function () {
        // this.lb_content.text = "";
        this.visible = false;
        AvatorPad.obj = null;
        Laya.stage.removeChild(this);
        this.destroy(true);
        // lamain.restoreLoaderPath();
    };
    AvatorPad.prototype.init = function (conf) {
        AvatorPad.obj = this;
        this.conf = conf;
        this.data = Common.userInfo; //headicon.data;
        // Debug.trace('this.data:');
        // Debug.trace(this.data);
        //半透明大背景
        this.initAlphaBg();
        //背景图
        this.initBg(this.conf.bg);
        //当前头像背景
        this.initCurAvator(this.conf.curavator);
        //标题
        var sp_title_lb = Tools.newSprite(this.conf.title.lb);
        this.addChild(sp_title_lb);
        //内容背景
        if (this.conf.content.bg) {
            var bgcontent = Tools.addSprite(this, this.conf.content.bg);
        }
        //内容容器
        this.sp_content = new Laya.Sprite();
        this.sp_content.pos(this.conf.content.pos.x, this.conf.content.pos.y);
        this.addChild(this.sp_content);
        //设置内容容器里，只有部分区域可以渲染和绘制，类似蒙版功能
        this.sp_content.scrollRect = new Laya.Rectangle(this.conf.content.ctmask.x, this.conf.content.ctmask.y, this.conf.content.ctmask.w, this.conf.content.ctmask.h);
        this.sp_content.size(this.conf.content.ctmask.w, this.conf.content.ctmask.h);
        this.sp_content.on(Laya.Event.MOUSE_DOWN, this, this.onMouseEvent);
        this.sp_content.on(Laya.Event.MOUSE_MOVE, this, this.onMouseEvent);
        this.sp_content.on(Laya.Event.MOUSE_UP, this, this.onMouseEvent);
        this.sp_content.on(Laya.Event.MOUSE_OUT, this, this.onMouseEvent);
        //往内容容器里面添加头像
        this.createAvators();
        //焦点框
        this.sp_focus = Tools.newSprite(this.conf.content.focus);
        this.sp_content.addChild(this.sp_focus);
        this.sp_focus.visible = false;
        //关闭按钮
        if (this.conf.close) {
            this.close = new MyButton();
            this.close.init(this.conf.close, this, this.onClose);
            this.close.pos(this.conf.close.pos.x, this.conf.close.pos.y);
            this.addChild(this.close);
        }
        this.pos(this.conf.pos.x, this.conf.pos.y);
    };
    //半透明大背景
    AvatorPad.prototype.initAlphaBg = function () {
        this.alphabg = new Laya.Sprite();
        Tools.drawRectWithAlpha(this.alphabg, 0, 0, this.conf.size.w, this.conf.size.h, "#000000", this.conf.mask.alpha);
        this.addChild(this.alphabg);
        this.alphabg.size(this.conf.size.w, this.conf.size.h);
        this.alphabg.pos(-this.conf.pos.x, -this.conf.pos.y);
        this.alphabg.on(Laya.Event.MOUSE_DOWN, this, this.onMouse);
        this.alphabg.on(Laya.Event.MOUSE_UP, this, this.onMouse);
        this.alphabg.on(Laya.Event.MOUSE_MOVE, this, this.onMouse);
    };
    //初始化背景
    AvatorPad.prototype.initBg = function (conf) {
        if (!conf) {
            return;
        }
        // var sp_bg = new Laya.Sprite();
        // sp_bg.pos(conf.pos.x,conf.pos.y);
        // this.addChild(sp_bg);
        // Tools.scaleSpriteV(
        //         sp_bg,
        //         conf.src,
        //         conf.size.spliceV);
        // //如果有注册点
        // if( conf.pivot )
        // {
        //     sp_bg.pivot(conf.pivot.x,conf.pivot.y);
        // }
        var sp_bg = Tools.addSprite(this, conf);
    };
    //初始化当前头像
    AvatorPad.prototype.initCurAvator = function (conf) {
        if (!conf) {
            return;
        }
        if (conf) {
            //当前头像背景
            if (conf.bg) {
                var sp_curavator_bg = Tools.addSprite(this, conf.bg);
            }
            //光晕效果
            if (conf.title) //标题：当前头像
             {
                var sp_lb = new Laya.Sprite();
                sp_lb.loadImage(conf.title.lb.src);
                sp_lb.pos(conf.title.lb.pos.x, conf.title.lb.pos.y);
                this.addChild(sp_lb);
                var sp_p1 = new Laya.Sprite();
                sp_p1.loadImage(conf.title.point1.src);
                sp_p1.pos(conf.title.point1.pos.x, conf.title.point1.pos.y);
                this.addChild(sp_p1);
                var sp_p2 = new Laya.Sprite();
                sp_p2.loadImage(conf.title.point2.src);
                sp_p2.pos(conf.title.point2.pos.x, conf.title.point2.pos.y);
                this.addChild(sp_p2);
            }
            if (conf.avator) {
                //头像背景框
                if (conf.iconframe) {
                    var iconframe = Tools.addSprite(this, conf.iconframe);
                }
                //头像
                this.sp_icon = new Laya.Sprite();
                this.sp_icon.loadImage(conf.avator.src);
                this.sp_icon.pos(conf.avator.pos.x, conf.avator.pos.y);
                this.addChild(this.sp_icon);
                var scx = conf.avator.size.w / this.sp_icon.width;
                var scy = conf.avator.size.h / this.sp_icon.height;
                this.sp_icon.scale(scx, scy);
            }
            //玩家id
            if (conf.id) {
                //id 背景
                if (conf.id.bg) {
                    var sp_idbg = Tools.newSprite(conf.id.bg);
                    this.addChild(sp_idbg);
                    // Debug.trace("idbg");
                }
                if (conf.id.label) {
                    this.lb_id = Tools.addLabels(this, conf.id.label);
                    // this.lb_id = Tools.newLabel(
                    //         "---",
                    //         conf.id.size.w,conf.id.size.h,
                    //         conf.id.font.size,
                    //         conf.id.font.color,
                    //         conf.id.font.align,conf.id.font.valign,
                    //         conf.id.font.name,conf.id.font.wordwrap);
                    // if( conf.id.font.borderColor )
                    // {
                    //     this.lb_id.borderColor = conf.id.font.borderColor;
                    // }
                    // this.lb_id.pos(conf.id.pos.x,conf.id.pos.y);
                    // this.addChild(this.lb_id);
                }
                // this.setId("123456");
            }
            //当前金额
            if (conf.money) {
                if (conf.money.bg) {
                    var sp_idbg = Tools.newSprite(conf.money.bg);
                    this.addChild(sp_idbg);
                }
                if (conf.money.label) {
                    this.lb_money = Tools.addLabels(this, conf.money.label);
                    var v = Common.userInfo.userBalance.balance;
                    v = Tools.FormatMoney(v, 2);
                    this.lb_money.text = v;
                }
            }
            //确认更换按钮
            if (conf.btnchange) {
                this.btnchange = new MyButton();
                this.btnchange.init(conf.btnchange, this, this.onSure);
                this.btnchange.pos(conf.btnchange.pos.x, conf.btnchange.pos.y);
                this.addChild(this.btnchange);
                //初始进来，不可点
                this.btnchange.visible = false;
                // this.btnchange.setEnabled(false,true);
            }
            if (conf.btnchangedis) {
                this.btnchangedis = new MyButton();
                this.btnchangedis.init(conf.btnchangedis, this, this.onSureDis);
                this.btnchangedis.pos(conf.btnchangedis.pos.x, conf.btnchangedis.pos.y);
                this.btnchangedis.bclick = false; //按钮无效，不可点
                this.addChild(this.btnchangedis);
            }
            //根据当前数据，改变头像和id
            this.resetIconAndID();
        }
    };
    //重设图标和id
    AvatorPad.prototype.resetIconAndID = function () {
        // this.data.headerIndex = Tools.transNickname2id(this.data.username);
        if (!this.data) {
            this.data = { "avatorId": 1, "userId": "123456" };
        }
        var id = parseInt(this.data.avatorId); //.headerIndex);
        this.setIcon(id);
        // this.setId(this.data.userId);
        this.setName(this.data.username);
    };
    //确认更换头像
    AvatorPad.prototype.onSure = function (e) {
        //发起请求，修改当前头像id
        //修改当前头像
        this.requestAvatorSave(ConfObjRead.getConfUrl().url.apihome +
            ConfObjRead.getConfUrl().cmd.avatorsave +
            "?access_token=" + Common.access_token +
            "&avatar=" + this.cur_choose_id);
    };
    AvatorPad.prototype.saveAvatorSuc = function () {
        if (this.cur_choose_id >= 0) {
            this.setIcon(this.cur_choose_id);
            //通知titlebar，头像发生改变了
            Common.userInfo.avatorId = Tools.FormatNumber(this.cur_choose_id, 2);
            HeadIcon.refreshAvator();
            //通知个人中心，刷新头像
            AccountCenter.getObj().setIcon(Common.userInfo.avatorId);
            //目前没有接口的情况下，把头像数据保存到localStorge
            SaveManager.getObj().save(SaveManager.KEY_SFX_VL, Common.userInfo.avatorId);
            //设置了图标之后，就又不能点按钮了，因为当前还没有换焦点
            this.btnEnable(false);
        }
    };
    AvatorPad.prototype.onSureDis = function (e) {
        // Debug.trace('btn change dis click');
    };
    //发起更新请求
    AvatorPad.prototype.requestAvatorSave = function (url) {
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
    AvatorPad.prototype.responseAvatorSave = function (s, stat, hr) {
        // Debug.trace("responseAvatorSave stat:"+stat);
        // Debug.trace(s);
        // Debug.trace("hr:");
        // Debug.trace(hr);
        if (MyBBLoading.obj) {
            MyBBLoading.obj.show(false);
        }
        if (stat == "complete") {
            //请求成功，更改头像完成
            this.saveAvatorSuc();
        }
        else {
            if (stat == "error" && hr.http.status == 200) {
                //成功的
                this.saveAvatorSuc();
                return;
            }
            //请求失败
            Toast.showToast(s);
        }
    };
    //创建头像
    AvatorPad.prototype.createAvators = function () {
        if (this.conf.content.avators) {
            var id = 0;
            var confa = this.conf.content.avatorsconf;
            if (!this.arr_items) {
                this.arr_items = new Array();
            }
            else {
                this.arr_items.splice(0, this.arr_items.length);
            }
            // for( var k in this.conf.content.avators )
            var alen = this.conf.content.avators.length;
            for (var k = 0; k < alen; k++) {
                var a_src = this.conf.content.avators[k];
                // Debug.trace(k+' a_arc:'+a_src);
                var sp_icon = new Laya.Sprite();
                sp_icon.name = "" + id;
                sp_icon.loadImage(a_src);
                this.sp_content.addChild(sp_icon);
                //头像框
                var sp_frame = Tools.newSprite(confa.iconframe);
                sp_icon.addChild(sp_frame);
                var x = 0, y = 0, w = 0, h = 0;
                var idh = 0, idv = 0;
                w = confa.size.w;
                h = confa.size.h;
                idh = Math.floor(id / confa.pos.counth); //行号
                idv = Math.floor(id % confa.pos.counth); //列号
                x = confa.pos.startx + idv * (w + confa.size.hg);
                y = confa.pos.starty + idh * (h + confa.size.vg);
                sp_icon.pos(x, y);
                var scx = w / sp_icon.width;
                var scy = h / sp_icon.height;
                sp_icon.scale(scx, scy);
                // sp_icon.on(Laya.Event.CLICK,this,this.onClickImg);
                this.arr_items.push(sp_icon);
                id++;
            }
        }
    };
    //点击图标
    AvatorPad.prototype.onClickImg = function (spe) {
        if (!spe) {
            return;
        }
        //点击之后，焦点移动到这个图片上
        var sp = spe; //e.target;
        var pos = {
            "x": this.conf.content.focus.pos.x + sp.x,
            "y": this.conf.content.focus.pos.y + sp.y
        };
        if (this.sp_focus) {
            if (!this.sp_focus.visible) {
                this.sp_focus.visible = true;
            }
            this.sp_focus.pos(pos.x, pos.y);
        }
        //当前点选的id是否与我的id相同？
        this.cur_choose_id = parseInt(sp.name) + 1; //当前选中的id
        if (!Tools.isNumber(this.cur_choose_id)) {
            this.cur_choose_id = 0;
        }
        //相同的话，更改按钮不可用
        if (this.cur_choose_id == this.cur_icon_id) {
            this.btnEnable(false);
        }
        else {
            this.btnEnable(true);
        }
    };
    //当前按钮有效与否
    AvatorPad.prototype.btnEnable = function (b) {
        if (this.btnchange) {
            this.btnchange.visible = b;
            // this.btnchange.setEnabled(b,true);
        }
        if (this.btnchangedis) {
            this.btnchangedis.visible = !b;
        }
    };
    //设置头像编号
    AvatorPad.prototype.setIcon = function (id) {
        this.cur_icon_id = id;
        if (this.sp_icon) {
            this.drawIcon(id);
        }
    };
    //绘制指定编号的头像
    AvatorPad.prototype.drawIcon = function (id) {
        if (!this.sp_icon) {
            return;
        }
        //先清除
        this.sp_icon.graphics.clear();
        //头像编号补齐
        var index = Tools.FormatNumber(id, 2);
        //拼出头像资源
        var res = //Common.confObj.titlebar.headicon.picnamehead + 
         ConfObjRead.getConfAvator().headicon.picnamehead +
            index +
            // Common.confObj.titlebar.headicon.picnameend;
            ConfObjRead.getConfAvator().headicon.picnameend;
        //根据资源取出texture
        var tex = Laya.loader.getRes(Tools.getSrc(res));
        //绘制新的
        this.sp_icon.graphics.drawTexture(tex, 0, 0);
    };
    AvatorPad.prototype.setId_ = function (id) {
        if (this.lb_id) {
            this.lb_id.text = this.conf.curavator.id.label.font.pretext + "" + id;
        }
    };
    AvatorPad.prototype.setName = function (id) {
        if (this.lb_id) {
            this.lb_id.text = this.conf.curavator.id.label.font.pretext + "" + id;
        }
    };
    //通过坐标，获取头像对象
    AvatorPad.prototype.getClickImg = function (pos) {
        // for(var k in this.arr_items)
        for (var k = 0; k < this.arr_items.length; k++) {
            var img = this.arr_items[k];
            // Debug.trace("img x:"+img.mouseX+" y:"+img.mouseY);
            if (img.mouseX > 0 && img.mouseX < img.width) {
                if (img.mouseY > 0 && img.mouseY < img.height) {
                    return img;
                }
            }
            // if( Tools.isCollision(img,pos) )
            // {
            //     Debug.trace("getClickImg:");
            //     Debug.trace(img);
            //     return img;
            // }
        }
        return null;
    };
    //鼠标响应
    AvatorPad.prototype.onMouseEvent = function (e) {
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
                this.downClickPos.x = x;
                this.downClickPos.y = y;
                break;
            case Laya.Event.MOUSE_MOVE:
                // if( this.downPos.x > 0 )
                // {
                //     var sumx = x - this.downPos.x;
                //     this.downPos.x = x;
                // this.moveAllItem(sumx);
                // }
                if (this.downPos.y > 0 && this.bDrag) {
                    var sumy = y - this.downPos.y;
                    if (sumy != 0) {
                        this.downPos.y = y;
                        this.moveAllIcons(0, sumy);
                    }
                }
                break;
            case Laya.Event.MOUSE_OUT:
            case Laya.Event.MOUSE_UP:
                //松开鼠标的时候，检查是否算是点击
                var upPos = { x: e.stageX, y: e.stageY };
                // Debug.trace("downPos x:"+this.downPos.x+" y:"+this.downPos.y);
                // Debug.trace("upPos x:"+upPos.x+" y:"+upPos.y);
                if (Tools.isClick(this.downClickPos, upPos)) {
                    // Debug.trace("isClick");
                    this.onClickImg(this.getClickImg(upPos));
                }
                else {
                    if (this.bDrag) {
                        // this.scrollbar.moveEnd();
                        this.moveAllEnd();
                    }
                }
                this.downClickPos.x = 0;
                this.downClickPos.y = 0;
                this.downPos.x = 0;
                this.downPos.y = 0;
                this.bDrag = false;
                break;
        }
    };
    //移动完毕，检查当前回退到哪里
    AvatorPad.prototype.moveAllEnd = function () {
        var len = this.arr_items.length;
        //第一个y坐标如果大于0，则是应该向上回退
        var yHead = this.arr_items[0].y;
        var miny = this.conf.content.avatorsconf.pos.starty; //0;
        //最后一个的底部y坐标如果小于最大y值，则是应该向下回退
        var yEnd = this.arr_items[len - 1].y + this.arr_items[len - 1].height;
        var maxy = this.conf.content.ctmask.h - 15;
        //如果第一个y坐标小于0，且最后一个底部y坐标大于最大y值，则无需回退
        var backY = 0; //回退尺寸
        Debug.trace("yHead:" + yHead + " miny:" + miny + " yEnd:" + yEnd + " maxy:" + maxy);
        if (yHead <= miny && yEnd >= maxy) {
            //无需回退
            // Debug.trace("0 AvatorPad backY:"+backY);
        }
        // else if( yHead <= miny && yEnd <= maxy )
        // {
        //无需回退
        // Debug.trace("0 AvatorPad backY:"+backY);
        // }
        else if (yHead > miny) {
            //上退
            backY = miny - yHead;
            // Debug.trace("1 AvatorPad backY:"+backY);
            this.backActionAll(backY);
        }
        else if (yEnd < maxy) {
            //下退
            //退的幅度就是当前y坐标与最大值之间的差值
            backY = maxy - yEnd;
            // Debug.trace("2 AvatorPad backY:"+backY);
            this.backActionAll(backY);
        }
    };
    //给所有头像，包括焦点，设定回退动画
    AvatorPad.prototype.backActionAll = function (y) {
        // for(var k in this.arr_items)
        for (var k = 0; k < this.arr_items.length; k++) {
            var a = this.arr_items[k];
            var pos = {
                "x": a.x,
                "y": a.y + y
            };
            this.setAction(a, pos);
        }
        var pos = {
            "x": this.sp_focus.x,
            "y": this.sp_focus.y + y
        };
        this.setAction(this.sp_focus, pos);
    };
    AvatorPad.prototype.setAction = function (sp, pos) {
        var tween = Laya.Tween.to(sp, {
            x: pos.x,
            y: pos.y
        }, 200, Laya.Ease["backIn"]);
    };
    //移动所有图标
    AvatorPad.prototype.moveAllIcons = function (x, y) {
        // var len = this.arr_items.length;
        // var pHead = {
        //     "x":this.arr_items[0].x,
        //     "y":this.arr_items[0].y
        // };
        // var pEnd = {
        //     "x":this.arr_items[len-1].x + this.arr_items[len-1].width,
        //     "y":this.arr_items[len-1].y + this.arr_items[len-1].height
        // };
        // var nyHead = pHead.y + y;
        // var nyEnd = pEnd.y + y;
        // Debug.trace("nyHead:"+nyHead+" nyEnd:"+nyEnd);
        //检查如果y小于0，表示向上，否则向下
        //向上运动时，最下的y坐标不得小于可视区域底部
        //向下运动时，最上的y坐标不得大于0
        // var sumy = 0;
        // var miny = 0;
        // var maxy = this.conf.content.ctmask.h;
        // var my = 0;
        // Debug.trace("y:"+y+" maxy:"+maxy);
        // if( y > 0 )
        // {
        //向下
        // sumy = nyHead - miny;
        // Debug.trace("y > 0 sumy:"+sumy);
        // }else{
        //向上
        // sumy = nyEnd - maxy;
        // Debug.trace("y < 0 sumy:"+sumy);
        // }
        // Debug.trace("sumy:"+sumy);
        // my = Math.abs(y) > Math.abs(sumy) ? sumy : y;
        // for( var k in this.arr_items )
        var ailen = this.arr_items.length;
        for (var k = 0; k < ailen; k++) {
            var sp = this.arr_items[k];
            sp.y += y; //sumy;
        }
        if (this.sp_focus.visible) {
            this.sp_focus.y += y;
        }
    };
    //点击外部半透明区域
    AvatorPad.prototype.onMouse = function (e) {
        if (this.conf.touchout) {
            if (this.conf.touchout.value && e.type == Laya.Event.MOUSE_DOWN) {
                this.onClose(null);
            }
        }
    };
    AvatorPad.prototype.onClose = function (s) {
        // this.closeCallback.apply(this.caller,[this]);
        this.hide();
    };
    return AvatorPad;
}(Laya.Sprite));
//# sourceMappingURL=AvatorPad.js.map