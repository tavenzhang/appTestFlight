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
var RunningMsg = /** @class */ (function (_super) {
    __extends(RunningMsg, _super);
    function RunningMsg() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.sortA = 0;
        _this.sortB = 0;
        _this.sortC = 0;
        _this.bInAskTimer = false;
        _this.bInScrolling = false;
        return _this;
    }
    RunningMsg.getInstance = function (node, confsrc, url, caller, callback) {
        if (caller === void 0) { caller = null; }
        if (callback === void 0) { callback = null; }
        if (!RunningMsg.obj) {
            var a = new RunningMsg();
            a.init(confsrc, url, caller, callback);
            node.addChild(a);
        }
        return RunningMsg.obj;
    };
    RunningMsg.prototype.destroy = function (b) {
        this.stopRequestTimer();
        this.stopScrolling();
        RunningMsg.obj = null;
        _super.prototype.destroy.call(this, b);
    };
    RunningMsg.prototype.init = function (confsrc, url, caller, callback) {
        this.caller = caller;
        this.callback = callback;
        this.url = url;
        // this.conf = conf;
        this.confsrc = confsrc;
        Laya.loader.load(this.confsrc, Laya.Handler.create(this, this.onConfLoaded, [this.confsrc]), null, Laya.Loader.JSON);
    };
    RunningMsg.prototype.onConfLoaded = function (e) {
        this.conf = Laya.loader.getRes(this.confsrc);
        if (this.conf) {
            this.create();
        }
        else {
            Debug.trace("RunningMsg.onConfLoaded conf null");
        }
    };
    RunningMsg.prototype.create = function () {
        this.initBg(this.conf.bg);
        this.initContent(this.conf.msgcontent);
        this.initMask(this.conf.mask);
        this.requestOnce();
        this.pos(this.conf.pos.x, this.conf.pos.y);
        if (this.caller && this.callback) {
            this.callback.apply(this.caller, [this]);
        }
    };
    RunningMsg.prototype.initRequestTimer = function (conf) {
        if (this.bInAskTimer) {
            return;
        }
        // Debug.trace('RunningMsg.initRequestTimer');
        // Debug.trace(conf);
        this.bInAskTimer = true;
        Laya.timer.loop(conf.timer, this, this.requestOnce);
    };
    RunningMsg.prototype.stopRequestTimer = function () {
        // Debug.trace('RunningMsg.stopRequestTimer');
        Laya.timer.clear(this, this.requestOnce);
        this.bInAskTimer = false;
    };
    RunningMsg.prototype.requestOnce = function () {
        // Debug.trace("RunningMsg.requestOnce url:"+this.url);
        if (this.url.length > 0) {
            // Debug.trace("RunningMsg.requestOnce url:"+this.url);
            NetManager.getObj().HttpConnect(this.url, this, this.responseOnce);
        }
        else {
            // Debug.trace("RunningMsg.requestOnce empty");
            var s = {
                "datas": [
                    {
                        //"notice":"未传递正确的滚动消息拉取地址，请正确填写拉取地址"
                        "notice": this.conf.request.emptyMsg
                    }
                ]
            };
            this.responseOnce(s, "complete", null);
        }
    };
    RunningMsg.prototype.responseOnce = function (s, stat, hr) {
        if (stat == "complete") {
            if (s.datas.length > 0) {
                this.addMsgItems(s.datas);
                if (this.bInAskTimer) {
                    this.stopRequestTimer();
                }
            }
            else {
                this.initRequestTimer(this.conf.request);
            }
        }
        else {
            this.initRequestTimer(this.conf.request);
        }
    };
    RunningMsg.prototype.initBg = function (conf) {
        if (!conf) {
            return;
        }
        var bg = Tools.newSprite(conf);
        this.addChild(bg);
    };
    RunningMsg.prototype.initContent = function (conf) {
        if (!conf) {
            return;
        }
        this.lb_msgs = new Array();
        this.sp_lbcontent = new Laya.Sprite();
        this.sp_lbcontent.pos(this.conf.msgcontent.pos.x, this.conf.msgcontent.pos.y);
        this.sp_lbcontent.size(this.conf.msgcontent.size.w, this.conf.msgcontent.size.h);
        // this.sp_lbcontent = Tools.newSprite(conf);
        this.addChild(this.sp_lbcontent);
        // Tools.drawRect(this.sp_lbcontent,0,0,100,100,"#ff0000");
    };
    RunningMsg.prototype.initMask = function (conf) {
        if (!conf) {
            return;
        }
        this.sp_lbcontent.scrollRect = new Laya.Rectangle(conf.pos.x, conf.pos.y, conf.size.w, conf.size.h);
        if (conf.frameColor) {
            Tools.drawRectWithAlpha(this.sp_lbcontent, conf.pos.x, conf.pos.y, conf.size.w, conf.size.h, conf.frameColor, conf.frameAlpha);
        }
    };
    RunningMsg.prototype.addMsgItems = function (data) {
        // Debug.trace("data:");
        // Debug.trace(data);
        var whole_str = "";
        if (this.conf.request.bTest) {
            whole_str = this.conf.request.emptyMsg;
        }
        for (var k = 0; k < data.length; k++) {
            var n = data[k];
            var notice = n['notice'];
            // Debug.trace('id:'+id+" notice:"+notice);
            whole_str += notice;
        }
        if (whole_str.length <= 0 || whole_str == undefined || !whole_str) {
            // whole_str = "   ";
        }
        else {
            this.addMsgItem(whole_str);
        }
        if (!this.bInScrolling) {
            this.startScrollingTimer();
        }
    };
    RunningMsg.prototype.addMsgItem = function (text) {
        var nowhave = this.lb_msgs.length;
        // Debug.trace('RunningMsg.addMsgItem text:'+text);
        var lbmsg = new RunMsgItem();
        lbmsg.init(this, this.conf.msgcontent.label, text);
        lbmsg.setId(nowhave);
        this.sp_lbcontent.addChild(lbmsg);
        if (nowhave <= 0) {
            lbmsg.pos(this.conf.msgcontent.label.pos.x + this.conf.mask.size.w, this.conf.msgcontent.label.pos.y);
        }
        else {
            lbmsg.pos(this.lb_msgs[nowhave - 1].x + this.lb_msgs[nowhave - 1].getWidth(), this.conf.msgcontent.label.pos.y);
        }
        this.lb_msgs.push(lbmsg);
        // Debug.trace("nowhave:"+nowhave+" x:"+lbmsg.x);
    };
    RunningMsg.prototype.removeMsg = function (msgItem) {
        var id = msgItem.getId();
        this.lb_msgs.splice(id, 1);
        msgItem.destroy(true);
    };
    RunningMsg.prototype.getRightOf = function (id) {
        var lb = this.lb_msgs[id];
        if (!lb) {
            return 0;
        }
        var lx = lb.x;
        var rx = lx + lb.getWidth();
        return rx;
    };
    RunningMsg.prototype.scrolling = function () {
        try {
            // for(var k in this.lb_msgs)
            for (var k = 0; k < this.lb_msgs.length; k++) {
                var m = this.lb_msgs[k];
                m.run(this.conf.scrollspd.x);
            }
            for (var k = 0; k < this.lb_msgs.length; k++) {
                var m = this.lb_msgs[k];
                if (m.bDie) {
                    m.destroy(true);
                    this.lb_msgs.splice(k, 1);
                }
            }
        }
        catch (e) { }
        if (this.lb_msgs.length <= 0) {
            this.initRequestTimer(this.conf.request);
        }
    };
    RunningMsg.prototype.startScrollingTimer = function () {
        Laya.timer.frameLoop(1, this, this.scrolling);
        this.bInScrolling = true;
    };
    RunningMsg.prototype.stopScrolling = function () {
        Laya.timer.clear(this, this.scrolling);
        this.bInScrolling = false;
    };
    RunningMsg.obj = null;
    return RunningMsg;
}(Laya.Sprite));
//# sourceMappingURL=RunningMsg.js.map