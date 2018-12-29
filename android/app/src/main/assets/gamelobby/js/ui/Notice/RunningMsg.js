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
        RunningMsg.obj = null;
        _super.prototype.destroy.call(this, b);
    };
    RunningMsg.prototype.init = function (conf, caller, callback) {
        this.conf = conf;
        this.caller = caller;
        this.callback = callback;
        //初始化消息池
        this.msg_pool = new Array();
        //构造左右的背景
        this.initBg(this.conf.bg);
        //消息数组和容器
        this.initContent(this.conf.msgcontent);
        //遮罩
        this.initMask(this.conf.mask);
        //请求数据
        // this.requestList(
        //     Common.confObj.url.lobbyurl+
        //     Common.confObj.cmd.noticelist+
        //     "?pageSize=20&start=0&access_token="+Common.access_token
        // );
        // this.sn = new ScrollNotice(this.conf);
        // this.addChild(this.sn);
        // this.sn.pos(0,100);
        //请求第一次，然后开启定时器，定时轮询是否有公告
        this.requestOnce();
        // this.initRequestTimer(this.conf.request);
        this.pos(this.conf.pos.x, this.conf.pos.y);
        //跑马灯初始化完毕
        this.callback.apply(this.caller, [this]);
    };
    //初始化轮询定时器
    RunningMsg.prototype.initRequestTimer = function (conf) {
        // Debug.trace('initRequestTimer conf:');
        // Debug.trace(conf);
        Laya.timer.loop(conf.timer, this, this.requestOnce);
    };
    //关闭轮询
    RunningMsg.prototype.stopRequestTimer = function () {
        Laya.timer.clear(this, this.requestOnce);
    };
    //发起一次轮询请求
    RunningMsg.prototype.requestOnce = function () {
        // Debug.trace("request running msg");
        //请求数据
        // this.requestList(
        // Common.confObj.url.lobbyurl+
        // Common.confObj.cmd.noticelist+
        // "?pageSize=20&start=0&access_token="+Common.access_token
        // );
        var url = ConfObjRead.getConfUrl().url.lobbyurl + // Common.confObj.url.lobbyurl+
            ConfObjRead.getConfUrl().cmd.noticelist +
            // Common.confObj.cmd.noticelist+
            "?pageSize=20&start=0&access_token=" + Common.access_token;
        NetManager.getObj().HttpConnect(url, this, this.responseOnce);
    };
    //收到一次轮询结果
    RunningMsg.prototype.responseOnce = function (s, stat) {
        if (stat == "complete") {
            //设置所有参数
            // Common.noticeInfo = s;
            // lamain.sceneRoot.showCircleLoading(false);
            //有内容？先把之前的内容全部移除掉?
            //设置滚动文字内容
            this.addMsgItems(s.datas);
        }
        else {
            // lamain.sceneRoot.showCircleLoading(false);
            Toast.showToast(s);
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
    RunningMsg.prototype.requestList = function (url) {
        LayaMain.getInstance().showCircleLoading(true);
        // MyBBLoading.showPad(this,ConfObjRead.getConfCLoading(),null);
        NetManager.getObj().HttpConnect(url, this, this.responseList);
    };
    //请求完毕，检查内容
    RunningMsg.prototype.responseList = function (s, stat) {
        if (stat == "complete") {
            //设置所有参数
            // Common.noticeInfo = s;
            // lamain.sceneRoot.showCircleLoading(false);
            //有内容？先把之前的内容全部移除掉?
            //设置滚动文字内容
            this.addMsgItems(s.datas);
        }
        else {
            // lamain.sceneRoot.showCircleLoading(false);
            Toast.showToast(s);
        }
        if (MyBBLoading.obj) {
            MyBBLoading.obj.show(false);
        }
        // Debug.trace("response RunningMsg stat:"+stat);
        // Debug.trace(s);
        //完毕了，之后又干嘛
        // this.callback.apply(this.caller,[this]);
    };
    //添加全部消息
    RunningMsg.prototype.addMsgItems = function (data) {
        var whole_str = ""; //"00000xxxxxxxxxxxxxxxxxxxxxxxx11111";
        //逐个添加
        for (var k in data) {
            var n = data[k];
            // var id = n['id'];
            var notice = n['notice'];
            // Debug.trace("n:");
            // Debug.trace(n);
            // Debug.trace('id:'+id+" notice:"+notice);
            // whole_str += id+":"+notice+";";
            whole_str += notice; //+";";
            // this.addOneMsg(id,notice);
            // this.sn.addItem(notice);
        }
        //获得了完整的公告字符
        // Debug.trace("whole_str:"+whole_str);
        //将文字按固定长度切分成若干段字符串
        // let str_arr = Tools.substr_cn_2arr(whole_str,10);
        // for(var k in str_arr)
        // {
        //     this.addOneMsg(str_arr[k]);
        // }
        //没有构造消息的情况下，构造三个消息对象
        if (this.lb_msgs.length == 0) {
            if (whole_str.length <= 0 || whole_str == undefined || !whole_str) {
                whole_str = "   ";
            }
            //如果消息长度小于指定长度，那么后面补空格
            var len = 30;
            if (this.conf.mask.strlen) {
                len = this.conf.mask.strlen;
            }
            whole_str = Tools.FormatStringLen(whole_str, len, " ");
            //直接将文本全部构造出来，造三个,完全相同
            this.addMsgItem(whole_str);
            this.addMsgItem(whole_str);
            this.addMsgItem(whole_str);
            //设定跟随规则
            // this.sortId = 0;
            // this.lb_msgs[0].follow(-1);
            // this.lb_msgs[1].follow(0);
            // this.lb_msgs[2].follow(1);
            this.resetFollow(0);
        }
        else {
            //已经有了消息对象的情况下，只需要修改最后一个消息的内容
            //等其它消息滚动结束回到最右的时候，再修改内容
            //将公告推入消息池
            this.msg_pool.push(whole_str);
        }
        //启动定时器循环滚动
        Laya.timer.frameLoop(1, this, this.scrolling);
    };
    RunningMsg.prototype.addMsgItem = function (text) {
        var nowhave = this.lb_msgs.length;
        // Debug.trace('addMsgItem text:'+nowhave);
        var lbmsg = new RunMsgItem();
        lbmsg.init(this, this.conf.msgcontent.label, text);
        lbmsg.setId(nowhave);
        this.sp_lbcontent.addChild(lbmsg);
        if (nowhave <= 0) {
            lbmsg.pos(this.conf.msgcontent.label.pos.x, this.conf.msgcontent.label.pos.y);
        }
        else {
            lbmsg.pos(this.lb_msgs[0].x + this.lb_msgs[0].getWidth(), this.conf.msgcontent.label.pos.y);
        }
        this.lb_msgs.push(lbmsg);
        // Debug.trace("nowhave:"+nowhave+" x:"+lbmsg.x);
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
    //从消息池中提取新消息
    RunningMsg.prototype.getNewMsg = function (lbid) {
        if (this.msg_pool.length > 0) {
            var msg = this.msg_pool[0];
            //从消息池中将提取出来的这个消息删除掉
            this.msg_pool.splice(0, 1);
            return msg;
        }
        else {
            //消息池中没有消息，那么就用我前一个的，如果我的前面没有,返回空
            if (this.lb_msgs[lbid].followId == -1) {
                return null;
            }
            else {
                var last = this.lb_msgs[this.lb_msgs[lbid].followId];
                if (!last) {
                    return null;
                }
                return last.lb_msg.text;
            }
        }
    };
    //重设当前的跟随规则
    RunningMsg.prototype.resetFollow = function (callid) {
        this.sortA += callid;
        if (this.sortA >= this.lb_msgs.length) {
            this.sortA = 0;
        }
        this.sortB = this.sortA + 1;
        if (this.sortB >= this.lb_msgs.length) {
            this.sortB = 0;
        }
        this.sortC = this.sortB + 1;
        if (this.sortC >= this.lb_msgs.length) {
            this.sortC = 0;
        }
        // Debug.trace("resetFollow A:"+this.sortA+" B:"+this.sortB+" C:"+this.sortC);
        this.lb_msgs[this.sortA].follow(-1);
        this.lb_msgs[this.sortB].follow(this.sortA);
        this.lb_msgs[this.sortC].follow(this.sortB);
        // for(var k in this.lb_msgs)
        // {
        //     Debug.trace("id:"+this.lb_msgs[k].id+" x:"+this.lb_msgs[k].x);
        // }
    };
    //滚动
    RunningMsg.prototype.scrolling = function () {
        for (var k in this.lb_msgs) {
            var m = this.lb_msgs[k];
            m.run(this.conf.scrollspd.x);
        }
    };
    RunningMsg.obj = null;
    return RunningMsg;
}(Laya.Sprite));
//# sourceMappingURL=RunningMsg.js.map