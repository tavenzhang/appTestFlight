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
var AttentionDialog = /** @class */ (function (_super) {
    __extends(AttentionDialog, _super);
    function AttentionDialog() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.curTabCateId = 0; //当前页面公告分类id
        _this.bRequestStatus = 1; //当前网络请求状态 1=未请求，0=成功，-1=出错
        //是否需要主动弹出
        _this.bPopAuto = false;
        _this.iDefaultCate = 0; //默认弹出的时候，展示哪个活动分类
        return _this;
    }
    AttentionDialog.getObj = function () {
        return AttentionDialog.obj;
    };
    AttentionDialog.showPad = function (node, conf) {
        if (!AttentionDialog.obj) {
            var o = new AttentionDialog();
            o.init(conf);
            o.fatherNode = node;
            // Laya.stage.addChild(o);
            node.addChild(o);
            // Debug.trace("notice showPad");
        }
        // AttentionDialog.obj.show(b);
    };
    AttentionDialog.prototype.destroy = function (b) {
        AttentionDialog.obj = null;
        _super.prototype.destroy.call(this, b);
    };
    AttentionDialog.prototype.show = function () {
        this.visible = true;
    };
    AttentionDialog.prototype.hide = function () {
        this.visible = false;
    };
    AttentionDialog.prototype.remove = function () {
        // this.lb_content.text = "";
        this.visible = false;
        AttentionDialog.obj = null;
        Laya.stage.removeChild(this);
        this.destroy(true);
        // lamain.restoreLoaderPath();
    };
    AttentionDialog.prototype.init = function (conf) {
        AttentionDialog.obj = this;
        this.bRequestStatus = 1;
        // this.lookGameId = gid;
        this.conf = conf;
        this.data = null; //data;
        this.initAlphaBg();
        //背景图
        this.initBg(this.conf);
        //公告内容背景
        this.initNoticeBg();
        //标题
        this.initTitle();
        //按钮组
        this.initBtns();
        //表格头
        this.initTableHead();
        //公告按钮组
        // this.arr_btns = new Array();
        //公告内容组，用于存放公告按钮
        this.arr_btns_content = new Array();
        this.initCloseBtn();
        this.pos(this.conf.pos.x, this.conf.pos.y);
        //公告界面先隐藏
        this.hide();
        //测试
        // this.data = Laya.loader.getRes("./assets/conf/testNoticeData.json");
        // this.initBtnsContent(this.data);
        // this.changeTab(this.curTabCate);
        // var it = this.arr_btns_content[0].arr_btns[0];
        // this.arr_btns_content[this.curTabCate].changeTab(it.data.noticeid);
        // this.refreshDataUnread(0);
        // this.refreshDataUnread(1);
        this.requestPop();
        // this.requestAttention();
        // this.requestRead(10006);
    };
    //按数据显示公告
    AttentionDialog.prototype.showAttention = function (data) {
        // Debug.trace("showAttention data:");
        // Debug.trace(data);
        if (this.attentionPage) {
            this.removeChild(this.attentionPage);
            this.attentionPage.destroy(true);
            this.attentionPage = null;
        }
        if (data) {
            this.attentionPage = new AttentionPage();
            this.attentionPage.init(this.conf.attention, data);
            this.addChild(this.attentionPage);
            // this.attentionPage.setData(data);
        }
    };
    //刷新分类数据的未读数量
    AttentionDialog.prototype.refreshDataUnread = function (cateid) {
        // Debug.trace("cateid:"+cateid);
        var num = 0;
        // for( var a in this.arr_btns_content )
        for (var a = 0; a < this.arr_btns_content.length; a++) {
            var b = this.arr_btns_content[a];
            var v = b.countUnread();
            if (b.data.noticeCate == cateid) {
                num += v;
            }
            // Debug.trace("a:"+a+" v:"+v);
        }
        // Debug.trace("cate:"+cateid+" num:"+num);
        // for( var a2 in this.arr_tips )
        for (var a2 = 0; a2 < this.arr_tips.length; a2++) {
            var b2 = this.arr_tips[a2];
            // Debug.trace("b2:"+b2.query+" a2:"+a2);
            if (b2.query == cateid) {
                // Debug.trace("set b2 "+b2.query+" num:"+num);
                b2.setNum(num);
            }
        }
        return num;
    };
    //修改当前索引页面
    AttentionDialog.prototype.changeTab = function (cateid) {
        // Debug.trace("AttentionDialog.changeTab id:"+cateid);
        this.showAttention(null);
        this.curTabCateId = cateid;
        this.updateTab();
    };
    AttentionDialog.prototype.updateTab = function () {
        //所有按钮组全部不显示
        // for( var a in this.arr_btns_content )
        for (var a = 0; a < this.arr_btns_content.length; a++) {
            var b = this.arr_btns_content[a];
            if (b.data.noticeCate == this.curTabCateId) {
                b.visible = true;
                //对应内容也里显示当前默认内容
                b.showDefaultNotice();
            }
            else {
                b.visible = false;
            }
        }
        //所有分类按钮都未点击，除了当前这个
        // for( var c in this.arr_cate_btns )
        for (var c = 0; c < this.arr_cate_btns.length; c++) {
            var d = this.arr_cate_btns[c];
            if (d.getQuery() == this.curTabCateId) {
                d.setOn(1);
            }
            else {
                d.setOn(0);
            }
        }
    };
    AttentionDialog.prototype.initCloseBtn = function () {
        if (this.conf.close) {
            this.close = new MyButton();
            this.close.init(this.conf.close, this, this.onClose);
            this.close.pos(this.conf.close.pos.x, this.conf.close.pos.y);
            this.addChild(this.close);
        }
    };
    AttentionDialog.prototype.initBtns = function () {
        var bg = Tools.addSprite(this, this.conf.menulist.bg);
    };
    //根据数据，初始化对应数量的内容页
    AttentionDialog.prototype.initBtnsContent = function (data) {
        // for( var a in data )
        for (var a = 0; a < data.length; a++) {
            var sp_ct = new AttentionCatePage();
            sp_ct.init(this.conf.menulist, data[a], this);
            this.addChild(sp_ct);
            this.arr_btns_content.push(sp_ct);
        }
    };
    //通过公告分类id，找出对应的公告按钮组内容容器
    AttentionDialog.prototype.getBtnsContentByCate = function (cate) {
        // for(var a in this.arr_btns_content)
        for (var a = 0; a < this.arr_btns_content.length; a++) {
            var c = this.arr_btns_content[a].data.noticeCate;
            if (c == cate) {
                return this.arr_btns_content[a];
            }
        }
        return null;
    };
    AttentionDialog.prototype.initTitle = function () {
        if (!this.conf.title) {
            return;
        }
        if (this.conf.title.bg) {
            var sp_title_bg = Tools.addSprite(this, this.conf.title.bg);
        }
        if (this.conf.title.lb) {
            var sp_title_lb = Tools.addSprite(this, this.conf.title.lb);
        }
    };
    AttentionDialog.prototype.initAlphaBg = function () {
        this.alphabg = new Laya.Sprite();
        Tools.drawRectWithAlpha(this.alphabg, 0, 0, this.conf.size.w, this.conf.size.h, "#000000", this.conf.mask.alpha);
        this.addChild(this.alphabg);
        this.alphabg.size(this.conf.size.w, this.conf.size.h);
        this.alphabg.pos(-this.conf.pos.x, -this.conf.pos.y);
        this.alphabg.on(Laya.Event.MOUSE_DOWN, this, this.onMouse);
        this.alphabg.on(Laya.Event.MOUSE_UP, this, this.onMouse);
        this.alphabg.on(Laya.Event.MOUSE_MOVE, this, this.onMouse);
    };
    AttentionDialog.prototype.initTableHead = function () {
        var sp_table_head = Tools.addSprite(this, this.conf.tablehead.bg);
        //表格头的竖线
        var arr_lines = new Array();
        // for( var k in this.conf.tablehead.headlines.ws )
        for (var k = 0; k < this.conf.tablehead.headlines.ws.length; k++) {
            var w = this.conf.tablehead.headlines.ws[k];
            var len = arr_lines.length;
            var lastX = 0;
            var posx = 0;
            if (len > 0) {
                lastX = arr_lines[len - 1].x;
                posx = w + lastX;
            }
            else {
                posx = this.conf.tablehead.bg.pos.x + w + lastX;
            }
            var y = this.conf.tablehead.headlines.wy;
            var oneline = new Laya.Sprite();
            oneline.loadImage(this.conf.tablehead.headlines.src);
            oneline.pos(posx, y);
            this.addChild(oneline);
            arr_lines.push(oneline);
        }
        //公告分类上的数量提示
        this.arr_tips = new Array();
        //公告分类tab按钮
        this.arr_cate_btns = new Array();
        // for( var k in this.conf.tablehead.headlines.labels )
        for (var k = 0; k < this.conf.tablehead.headlines.labels.length; k++) {
            var labelInfo = this.conf.tablehead.headlines.labels[k];
            var lb = new MySwitchBtn();
            lb.init(labelInfo.switch, this, this.headClick);
            lb.setQuery(k);
            this.addChild(lb);
            lb.setOn(0, false);
            this.arr_cate_btns.push(lb);
            var tips = new NoticeTipsNumber();
            tips.init(this.conf.tablehead.headlines.tips);
            tips.setQuery(k);
            lb.addChild(tips);
            this.arr_tips.push(tips);
        }
    };
    //公告分类按钮被点击之后
    AttentionDialog.prototype.headClick = function (e) {
        // Debug.trace("headClick:");
        // Debug.trace(e);
        var cate = e.getQuery();
        this.changeTab(cate);
    };
    AttentionDialog.prototype.initNoticeBg = function () {
        if (this.conf.contentbg) {
            var bgct = Tools.addSprite(this, this.conf.contentbg);
        }
    };
    AttentionDialog.prototype.initBg = function (conf) {
        var bg = Tools.addSprite(this, this.conf.bg);
        var bgbig = Tools.addSprite(this, this.conf.bgbig);
        var ful = Tools.addSprite(this, this.conf.fu.left);
        var fur = Tools.addSprite(this, this.conf.fu.right);
    };
    //请求是否需要弹窗
    AttentionDialog.prototype.requestPop = function () {
        this.bRequestStatus = 1;
        LayaMain.getInstance().showCircleLoading();
        //询问，是否需要弹窗
        var url = ConfObjRead.getConfUrl().url.apihome +
            ConfObjRead.getConfUrl().cmd.attention_pop +
            //"?pageSize=20&start=0&access_token="+Common.access_token;
            // "";
            "?access_token=" + Common.access_token;
        NetManager.getObj().HttpConnect(url, this, this.responsePop);
        // this.responseInfo(this.conf.testData,this.conf.testData.stat);
    };
    AttentionDialog.prototype.responsePop = function (s, stat, hr) {
        // Debug.trace("AttentionDialog.responsePop stat:"+stat);
        Debug.trace("AttentionDialog.responsePop s:");
        Debug.trace(s);
        Debug.trace("AttentionDialog.responsePop hr:");
        Debug.trace(hr);
        /*
        {
            pop:true
        }
        */
        try {
            this.bPopAuto = s.pop;
            this.iDefaultCate = s.noticeCate;
            if (this.iDefaultCate) {
                this.curTabCateId = this.iDefaultCate;
            }
            else {
                this.curTabCateId = 0;
            }
            // Debug.trace("AttentionDialog.responsePop bPopAuto:"+this.bPopAuto);
        }
        catch (e) { }
        // if( stat == "complete" )
        // {
        // this.data = Laya.loader.getRes("./assets/conf/testNoticeData.json");
        /*
        this.initBtnsContent(this.data);

        this.changeTab(this.curTabCate);

        var it = this.arr_btns_content[0].arr_btns[0];
        this.arr_btns_content[this.curTabCate].changeTab(it.data.noticeid);

        this.refreshDataUnread(0);
        this.refreshDataUnread(1);
        */
        // }else{
        //     this.bRequestStatus = -1;
        // }
        //请求公告列表
        this.requestAttention();
    };
    AttentionDialog.prototype.requestAttention = function () {
        //询问，是否需要弹窗
        var url = ConfObjRead.getConfUrl().url.apihome +
            ConfObjRead.getConfUrl().cmd.attention_new +
            "?access_token=" + Common.access_token;
        NetManager.getObj().HttpConnect(url, this, this.responseAttention);
    };
    AttentionDialog.prototype.responseAttention = function (s, stat, hr) {
        // Debug.trace("AttentionDialog.responseAttention stat:"+stat);
        Debug.trace("AttentionDialog.responseAttention s:");
        Debug.trace(s);
        // Debug.trace("AttentionDialog.responseAttention hr:");
        // Debug.trace(hr);
        /*
        [
            {
                noticeCate:0,
                noticeList[
                    {
                        noticeid:10005,
                        title:"zard",
                        content:"teste",
                        author:"20180114",
                        bread:false
                    }
                ],
                noticeName:"游戏公告"
            },
            {
                noticeCate:1,
                noticeList[],
                noticeName:"活动公告"
            }
        ]
        */
        if (stat == "complete") {
            this.data = s; //Laya.loader.getRes("./assets/conf/testNoticeData.json");
            this.initBtnsContent(this.data);
            this.changeTab(this.curTabCateId);
            // var it = this.arr_btns_content[0].arr_btns[0];
            // this.arr_btns_content[this.curTabCateId].changeNotice(it.data.noticeid);
            this.refreshDataUnread(0);
            this.refreshDataUnread(1);
            if (this.bPopAuto) {
                this.show();
            }
            this.bRequestStatus = 0;
            LayaMain.getInstance().requestEnd(stat, "");
        }
        else {
            this.bRequestStatus = -1;
            LayaMain.getInstance().requestEnd(stat, s);
        }
    };
    AttentionDialog.prototype.requestRead = function (id) {
        //询问，是否需要弹窗
        var url = ConfObjRead.getConfUrl().url.apihome +
            ConfObjRead.getConfUrl().cmd.attention_read + id +
            "?access_token=" + Common.access_token;
        var header = [
            "Accept", "application/json"
        ];
        NetManager.getObj().HttpConnect(url, this, this.responseRead, header, //:any=null,
        null, //data:any=null,
        "PUT", //metod:any="get",
        "json" //restype:any="json"
        );
    };
    AttentionDialog.prototype.responseRead = function (s, stat, hr) {
        // Debug.trace("AttentionDialog.responseRead stat:"+stat);
        Debug.trace("AttentionDialog.responseRead s:");
        Debug.trace(s);
        // Debug.trace("AttentionDialog.responseRead hr:");
        // Debug.trace(hr);
        /*
        {
            noticeId:10006
        }
        */
        if (stat == "complete") {
            //已读某id
            try {
                this.setReaded(s.noticeId);
            }
            catch (e) { }
            // this.data = Laya.loader.getRes("./assets/conf/testNoticeData.json");
            /*
            this.initBtnsContent(this.data);

            this.changeTab(this.curTabCate);

            var it = this.arr_btns_content[0].arr_btns[0];
            this.arr_btns_content[this.curTabCate].changeTab(it.data.noticeid);

            this.refreshDataUnread(0);
            this.refreshDataUnread(1);
            */
        }
        else {
        }
    };
    //查询所有条目，看看哪个的公告id与此相同
    AttentionDialog.prototype.setReaded = function (noticeId) {
        //遍历按钮内容组
        for (var i = 0; i < this.arr_btns_content.length; i++) {
            //在一个内容里查按钮
            var cb = this.arr_btns_content[i];
            cb.setReaded(noticeId);
        }
    };
    //显示空数据提示
    // public showEmptyData(b:boolean):void
    // {
    //     if( !this.lb_empty )
    //     {
    //         this.lb_empty = Tools.newLabel(
    //             this.conf.empty.font.text,
    //             this.conf.empty.size.w,this.conf.empty.size.h,
    //             this.conf.empty.font.size,this.conf.empty.font.color,
    //             this.conf.empty.font.align,this.conf.empty.font.valign,
    //             this.conf.empty.font.name,this.conf.empty.font.wrap
    //         );
    //         if( this.conf.empty.font.borderColor )
    //         {
    //             this.lb_empty.borderColor = this.conf.empty.font.borderColor;
    //         }
    //         this.lb_empty.pos(this.conf.empty.pos.x,this.conf.empty.pos.y);
    //         this.addChild(this.lb_empty);
    //     }
    //     this.lb_empty.visible = b;
    // }
    //转换数据
    AttentionDialog.prototype.transData = function (da) {
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
    AttentionDialog.prototype.newTestData = function (id) {
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
    //添加历史纪录条目
    AttentionDialog.prototype.addHistoryItem = function (data) {
        if (this.conf.testitemlen) {
            var id = data.length;
            for (var i = 0; i < this.conf.testitemlen; i++) {
                var a = this.newTestData(id);
                data.push(a);
                id++;
            }
        }
        //遍历有多少条数据就加多少个条目
        // for( var k in data )
        for (var k = 0; k < data.length; k++) {
            var one = data[k];
            // Debug.trace('addHistoryItem k:'+k);
            // this.addOneItem(one);
        }
    };
    AttentionDialog.prototype.setData = function (data) {
        this.data = data;
        // if( this.data && this.data.img )
        // {
        //     this.setBg(this.data.img);
        // }
        if (this.data && this.data.notice) {
            // this.lb_content.text = data.notice;
        }
    };
    // public setBg(src:string):void
    // {
    //     Laya.loader.load(src,new Laya.Handler(this,this.bgLoaded));
    // }
    // public bgLoaded(e:any):void
    // {
    //     this.bg.graphics.clear();
    // 	this.bg.graphics.drawTexture(e, 0, 0,
    //         this.bg.width,this.bg.height
    //         );
    // 	// this.sp_icon.size(e.width,e.height);
    // }
    AttentionDialog.prototype.onMouse = function (e) {
        if (this.conf.touchout) {
            if (this.conf.touchout.value && e.type == Laya.Event.MOUSE_DOWN) {
                this.onClose(null);
            }
        }
    };
    AttentionDialog.prototype.onClose = function (s) {
        this.showDialog(false);
        // this.closeCallback.apply(this.caller,[this]);
        this.remove();
    };
    AttentionDialog.prototype.showDialog = function (b) {
        this.visible = b;
    };
    return AttentionDialog;
}(Laya.Sprite));
//# sourceMappingURL=AttentionDialog.js.map