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
        _this.curTabCateId = 0;
        _this.bRequestStatus = 1;
        _this.bPopAuto = false;
        _this.iDefaultCate = 0;
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
            node.addChild(o);
        }
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
        LayaMain.getInstance().getRootNode().removeChild(this);
        this.destroy(true);
    };
    AttentionDialog.prototype.init = function (conf) {
        AttentionDialog.obj = this;
        this.bRequestStatus = 1;
        // this.lookGameId = gid;
        this.conf = conf;
        this.data = null; //data;
        this.initAlphaBg();
        this.initBg(this.conf);
        this.initNoticeBg();
        this.initBtns();
        this.initTableHead();
        this.arr_btns_content = new Array();
        this.initFu();
        this.initTitle();
        this.initCloseBtn();
        this.pos(this.conf.pos.x, this.conf.pos.y);
        this.hide();
        this.requestPop();
        // this.requestAttention();
        // this.requestRead(10006);
    };
    AttentionDialog.prototype.initFu = function () {
        if (this.conf.fu && this.conf.fu.left) {
            var ful = Tools.addSprite(this, this.conf.fu.left);
        }
        if (this.conf.fu && this.conf.fu.right) {
            var fur = Tools.addSprite(this, this.conf.fu.right);
        }
    };
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
    AttentionDialog.prototype.changeTab = function (cateid) {
        // Debug.trace("AttentionDialog.changeTab id:"+cateid);
        this.showAttention(null);
        this.curTabCateId = cateid;
        this.updateTab();
    };
    AttentionDialog.prototype.updateTab = function () {
        Debug.trace("AttentionDialog.updateTab curTabCateId:" + this.curTabCateId);
        // for( var a in this.arr_btns_content )
        for (var a = 0; a < this.arr_btns_content.length; a++) {
            var b = this.arr_btns_content[a];
            if (b.data.noticeCate == this.curTabCateId) {
                b.visible = true;
                b.showDefaultNotice();
            }
            else {
                b.visible = false;
            }
        }
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
    AttentionDialog.prototype.initBtnsContent = function (data) {
        // for( var a in data )
        for (var a = 0; a < data.length; a++) {
            var sp_ct = new AttentionCatePage();
            sp_ct.init(this.conf.menulist, data[a], this);
            this.addChild(sp_ct);
            this.arr_btns_content.push(sp_ct);
        }
    };
    AttentionDialog.prototype.getBtnsContentByCate = function (cate) {
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
        this.alphabg = new MySprite();
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
        var arr_lines = new Array();
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
            var oneline = new MySprite();
            oneline.loadImage(this.conf.tablehead.headlines.src);
            oneline.pos(posx, y);
            this.addChild(oneline);
            arr_lines.push(oneline);
        }
        this.arr_tips = new Array();
        this.arr_cate_btns = new Array();
        for (var k = 0; k < this.conf.tablehead.headlines.labels.length; k++) {
            var labelInfo = this.conf.tablehead.headlines.labels[k];
            var lb = new MySwitchBtn();
            lb.init(labelInfo.switch, this, this.headClick);
            // lb.setQuery(k);
            lb.setQuery(labelInfo.id);
            this.addChild(lb);
            lb.setOn(0, false);
            this.arr_cate_btns.push(lb);
            var tips = new NoticeTipsNumber();
            tips.init(this.conf.tablehead.headlines.tips);
            // tips.setQuery(k);
            tips.setQuery(labelInfo.id);
            lb.addChild(tips);
            this.arr_tips.push(tips);
        }
    };
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
    };
    AttentionDialog.prototype.requestPop = function () {
        this.bRequestStatus = 1;
        LayaMain.getInstance().showCircleLoading();
        var url = ConfObjRead.getConfUrl().url.apihome +
            ConfObjRead.getConfUrl().cmd.attention_pop +
            "?access_token=" + Common.access_token;
        NetManager.getObj().HttpConnect(url, this, this.responsePop);
    };
    AttentionDialog.prototype.responsePop = function (s, stat, hr) {
        Debug.trace("AttentionDialog.responsePop s:");
        Debug.trace(s);
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
        this.requestAttention();
    };
    AttentionDialog.prototype.requestAttention = function () {
        var url = ConfObjRead.getConfUrl().url.apihome +
            ConfObjRead.getConfUrl().cmd.attention_new +
            "?access_token=" + Common.access_token;
        NetManager.getObj().HttpConnect(url, this, this.responseAttention);
    };
    AttentionDialog.prototype.responseAttention = function (s, stat, hr) {
        // Debug.trace("AttentionDialog.responseAttention stat:"+stat);
        Debug.trace("AttentionDialog.responseAttention s:");
        Debug.trace(s);
        if (stat == "complete") {
            this.data = s;
            this.initBtnsContent(this.data);
            this.changeTab(this.curTabCateId);
            this.refreshDataUnread(0);
            this.refreshDataUnread(1);
            if (this.bPopAuto) {
                this.show();
            }
            else {
                this.showChangePwd();
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
        if (stat == "complete") {
            try {
                this.setReaded(s.noticeId);
            }
            catch (e) { }
        }
        else {
        }
    };
    AttentionDialog.prototype.setReaded = function (noticeId) {
        for (var i = 0; i < this.arr_btns_content.length; i++) {
            var cb = this.arr_btns_content[i];
            cb.setReaded(noticeId);
        }
    };
    AttentionDialog.prototype.transData = function (da) {
        var d = new Array();
        var id = 1;
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
    AttentionDialog.prototype.addHistoryItem = function (data) {
        if (this.conf.testitemlen) {
            var id = data.length;
            for (var i = 0; i < this.conf.testitemlen; i++) {
                var a = this.newTestData(id);
                data.push(a);
                id++;
            }
        }
        for (var k = 0; k < data.length; k++) {
            var one = data[k];
        }
    };
    AttentionDialog.prototype.setData = function (data) {
        this.data = data;
        if (this.data && this.data.notice) {
            // this.lb_content.text = data.notice;
        }
    };
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
        this.showChangePwd();
    };
    AttentionDialog.prototype.showDialog = function (b) {
        this.visible = b;
    };
    AttentionDialog.prototype.showChangePwd = function () {
        Debug.trace("AttentionDialog.showChangePwd Common.loginType:" + Common.loginType + " Common.loginInfo.strongPwd:" + Common.loginInfo.strongPwd);
        if (Common.loginType == Common.TYPE_LOGIN_QK) {
            if (!Common.loginInfo.strongPwd) {
                ChangePwdQk.showPad(LayaMain.getInstance().getRootNode(), ConfObjRead.getConfChangePwdQk());
                ChangePwdQk.getObj().setSucListener(this, this.onChangePwdSuc);
                var pwd = SaveManager.getObj().get(SaveManager.KEY_QK_PASSWORD, "123456");
                ChangePwdQk.getObj().setOldPwd(pwd);
            }
        }
    };
    AttentionDialog.prototype.onChangePwdSuc = function (e) {
        var npwd = e;
        Debug.trace("AttentionDialog.onChangePwdSuc");
        Common.loginInfo.strongPwd = true;
        SaveManager.getObj().save(SaveManager.KEY_QK_PASSWORD, npwd);
        SaveManager.getObj().save(SaveManager.KEY_LOGIN_INFO, Common.loginInfo);
        Toast.showToast(ConfObjRead.getConfChangePwdQk().textChanged);
        LayaMain.getInstance().loginOut();
    };
    return AttentionDialog;
}(MySprite));
//# sourceMappingURL=AttentionDialog.js.map