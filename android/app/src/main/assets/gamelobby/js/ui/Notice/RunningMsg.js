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
var RunningMsg = /** @class */ (function (_super) {
    __extends(RunningMsg, _super);
    function RunningMsg() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        //排头消息编号
        _this.sortA = 0; //初始化进来0位消息在显示
        _this.sortB = 0;
        _this.sortC = 0;
        //是否处于轮询定时器中
        _this.bInAskTimer = false;
        //是否在滚动中
        _this.bInScrolling = false;
        return _this;
    }
    RunningMsg.getInstance = function (node, conf, caller, callback) {
        if (!RunningMsg.obj) {
            var a = new RunningMsg();
            a.init(conf, caller, callback);
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
    RunningMsg.prototype.init = function (conf, caller, callback) {
        this.conf = conf;
        this.caller = caller;
        this.callback = callback;
        //初始化消息池
        // this.msg_pool = new Array();
        //构造左右的背景
        this.initBg(this.conf.bg);
        //消息数组和容器
        this.initContent(this.conf.msgcontent);
        //遮罩
        this.initMask(this.conf.mask);
        //请求第一次，然后开启定时器，定时轮询是否有公告
        this.requestOnce();
        // this.initRequestTimer(this.conf.request);
        this.pos(this.conf.pos.x, this.conf.pos.y);
        //跑马灯初始化完毕
        this.callback.apply(this.caller, [this]);
    };
    //初始化轮询定时器
    RunningMsg.prototype.initRequestTimer = function (conf) {
        if (this.bInAskTimer) {
            return;
        }
        // Debug.trace('RunningMsg.initRequestTimer');
        // Debug.trace(conf);
        this.bInAskTimer = true;
        Laya.timer.loop(conf.timer, this, this.requestOnce);
    };
    //关闭轮询
    RunningMsg.prototype.stopRequestTimer = function () {
        // Debug.trace('RunningMsg.stopRequestTimer');
        Laya.timer.clear(this, this.requestOnce);
        this.bInAskTimer = false;
    };
    //发起一次轮询请求
    RunningMsg.prototype.requestOnce = function () {
        var url = ConfObjRead.getConfUrl().url.apihome +
            ConfObjRead.getConfUrl().cmd.noticelist +
            // Common.confObj.cmd.noticelist+
            "?pageSize=20&start=0&access_token=" + Common.access_token;
        NetManager.getObj().HttpConnect(url, this, this.responseOnce);
    };
    //收到一次轮询结果
    RunningMsg.prototype.responseOnce = function (s, stat) {
        if (stat == "complete") {
            //设置所有参数
            //有内容？先把之前的内容全部移除掉?
            //设置滚动文字内容
            // Debug.trace("RunningMsg.responseOnce");
            // Debug.trace(s.datas);
            //如果有消息，就添加，显示消息
            //如果没有消息就启动定时器轮询消息
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
            // Toast.showToast(s);
            this.initRequestTimer(this.conf.request);
            //脱网测试
            // Debug.trace("RunningMsg response add msg items");
            // var objs = [
            //     {"notice":"hhhhhhhhhh"}
            // ];
            // this.addMsgItems(objs);
        }
        // Debug.trace("response userInfo:"+stat);
        // Debug.trace(s);
        //完毕了，之后又干嘛
        // this.callback.apply(this.caller,[this]);
    };
    RunningMsg.prototype.initBg = function (conf) {
        if (!conf) {
            return;
        }
        //有配置背景的情况下，显示背景
        // var bg = new Laya.Sprite();
        // bg.loadImage(this.conf.bg.src);
        // bg.pos(this.conf.bg.pos.x,this.conf.bg.pos.y);
        var bg = Tools.newSprite(conf);
        this.addChild(bg);
        // var scx = this.conf.bg.size.w / this.bg.width;
        // var scy = this.conf.bg.size.h / this.bg.height;
        // this.bg.scale(scx,scy);
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
    //遮罩其实不需要，可以使用scrollrect替代
    RunningMsg.prototype.initMask = function (conf) {
        if (!conf) {
            return;
        }
        // this.sp_mask = new Laya.Sprite();
        // Tools.drawRect(this.sp_mask,
        //     conf.pos.x,conf.pos.y,
        //     conf.size.w,conf.size.h,
        //     conf.color
        //     );
        // this.sp_mask.size(conf.size.w,conf.size.h);
        // this.sp_lbcontent.mask = this.sp_mask;
        this.sp_lbcontent.scrollRect = new Laya.Rectangle(conf.pos.x, conf.pos.y, conf.size.w, conf.size.h);
    };
    //添加全部消息
    RunningMsg.prototype.addMsgItems = function (data) {
        // Debug.trace("data:");
        // Debug.trace(data);
        var whole_str = "";
        //逐个添加
        // for( var k in data )
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
        //启动定时器循环滚动
        if (!this.bInScrolling) {
            this.startScrollingTimer();
        }
    };
    RunningMsg.prototype.addMsgItem = function (text) {
        var nowhave = this.lb_msgs.length;
        // Debug.trace('RunningMsg.addMsgItem text:'+nowhave);
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
    //移除消息
    RunningMsg.prototype.removeMsg = function (msgItem) {
        var id = msgItem.getId();
        this.lb_msgs.splice(id, 1);
        msgItem.destroy(true);
    };
    //找出指定消息的右侧坐标
    RunningMsg.prototype.getRightOf = function (id) {
        var lb = this.lb_msgs[id];
        if (!lb) {
            return 0;
        }
        var lx = lb.x;
        var rx = lx + lb.getWidth();
        return rx;
    };
    //滚动
    RunningMsg.prototype.scrolling = function () {
        try {
            // for(var k in this.lb_msgs)
            for (var k = 0; k < this.lb_msgs.length; k++) {
                var m = this.lb_msgs[k];
                m.run(this.conf.scrollspd.x);
            }
            //一次循环完毕，检查所有消息中哪些是死掉的，死掉的删除掉
            for (var k = 0; k < this.lb_msgs.length; k++) {
                var m = this.lb_msgs[k];
                if (m.bDie) {
                    m.destroy(true);
                    this.lb_msgs.splice(k, 1);
                }
            }
        }
        catch (e) { }
        //检测是否滚动完毕，即，没有任何消息在滚动了，开始定时拉取新消息
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