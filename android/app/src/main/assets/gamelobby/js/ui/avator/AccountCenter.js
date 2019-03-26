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
var AccountCenter = /** @class */ (function (_super) {
    __extends(AccountCenter, _super);
    function AccountCenter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AccountCenter.getObj = function () {
        return AccountCenter.obj;
    };
    AccountCenter.prototype.destroy = function (b) {
        AccountCenter.obj = null;
        _super.prototype.destroy.call(this, b);
    };
    AccountCenter.showPad = function (node) {
        if (!AccountCenter.obj) {
            var o = new AccountCenter();
            o.init(ConfObjRead.getConfAccountCenter());
            node.addChild(o);
        }
        // AccountCenter.obj.show(b);
    };
    AccountCenter.prototype.hide = function () {
        // this.lb_content.text = "";
        this.visible = false;
        AccountCenter.obj = null;
        Laya.stage.removeChild(this);
        this.destroy(true);
        // lamain.restoreLoaderPath();
    };
    AccountCenter.prototype.init = function (conf) {
        AccountCenter.obj = this;
        this.conf = conf;
        this.arr_btns = new Array();
        this.data = Common.userInfo; //headicon.data;
        Debug.trace('AccountCenter.init this.data:');
        Debug.trace(this.data);
        //半透明大背景
        this.initAlphaBg();
        //背景图
        this.initBg(this.conf.bg);
        //标题
        if (this.conf.title) {
            var sp_title_lb = Tools.newSprite(this.conf.title.lb);
            this.addChild(sp_title_lb);
        }
        //当前头像背景
        this.initCurAvator(this.conf.curavator);
        //初始化按钮组
        this.initBtns(this.conf.btns);
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
    AccountCenter.prototype.initAlphaBg = function () {
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
    AccountCenter.prototype.initBg = function (conf) {
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
    AccountCenter.prototype.initCurAvator = function (conf) {
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
                    // this.lb_money = Tools.addLabels(this,conf.money.label);
                    var v = Common.userInfo.userBalance.balance;
                    v = Tools.FormatMoney(v, 2);
                    // this.lb_money.text = v;
                    this.lb_num = new DataNum(ConfObjRead.getConfDataNum());
                    this.addChild(this.lb_num);
                    this.lb_num.setNum(v);
                    this.lb_num.pos(conf.money.label.pos.x, conf.money.label.pos.y);
                }
            }
            //确认更换按钮
            if (conf.btnchange) {
                this.btnchange = new MyButton();
                this.btnchange.setQuery(conf.btnchange.cmd);
                this.btnchange.init(conf.btnchange, this, this.onButtonClick); //.onSure);
                this.btnchange.pos(conf.btnchange.pos.x, conf.btnchange.pos.y);
                this.addChild(this.btnchange);
                //初始进来，不可点
                // this.btnchange.visible = false;
                // this.btnchange.setEnabled(false,true);
            }
            //根据当前数据，改变头像和id
            this.resetIconAndID();
        }
    };
    //初始化按钮
    AccountCenter.prototype.initBtns = function (conf) {
        for (var i = 0; i < conf.length; i++) {
            var cf = conf[i];
            var btn = new MyButton();
            btn.init(cf, this, this.onButtonClick);
            btn.setQuery(cf.cmd);
            btn.pos(cf.pos.x, cf.pos.y);
            this.addChild(btn);
            this.arr_btns.push(btn);
        }
    };
    AccountCenter.prototype.onButtonClick = function (e) {
        // Debug.trace("AccountCenter.onButtonClick e:");
        // Debug.trace(e);
        var btn = e;
        switch (btn.getQuery()) {
            case "setting":
                // Debug.trace("AccountCenter.onButtonClick setting");
                // SettingPad.showPad(LobbyScene.getInstance(),ConfObjRead.getConfSetting(),this,this.setCallback);
                SettingPad.showPad(Laya.stage, ConfObjRead.getConfSetting(), this, this.setCallback);
                break;
            case "account":
                // Debug.trace("AccountCenter.onButtonClick account");
                Tools.jump2module(ConfObjRead.getConfUrl().url.g_account, "account");
                break;
            case "logout":
                // Debug.trace("AccountCenter.onButtonClick logout");
                //先关闭当前窗体
                this.hide();
                LayaMain.getInstance().loginOut();
                break;
            case "changeicon":
                AvatorPad.showPad(Laya.stage); //LobbyScene.getInstance());
                break;
        }
    };
    AccountCenter.prototype.setCallback = function () {
    };
    //重设图标和id
    AccountCenter.prototype.resetIconAndID = function () {
        // this.data.headerIndex = Tools.transNickname2id(this.data.username);
        if (!this.data) {
            this.data = { "avatorId": 1, "userId": "123456" };
        }
        if (!this.data.avatorId) {
            this.data.avatorId = 1;
        }
        var id = parseInt(this.data.avatorId); //.headerIndex);
        this.setIcon(id);
        // this.setId(this.data.userId);
        this.setName(this.data.username);
    };
    //确认更换头像
    // public onSure(e:any):void
    // {
    //发起请求，修改当前头像id
    //修改当前头像
    // AvatorPad.showPad(LobbyScene.getInstance());
    // }
    AccountCenter.prototype.onSureDis = function (e) {
        // Debug.trace('btn change dis click');
    };
    //当前按钮有效与否
    AccountCenter.prototype.btnEnable = function (b) {
        if (this.btnchange) {
            this.btnchange.visible = b;
            // this.btnchange.setEnabled(b,true);
        }
    };
    //设置头像编号
    AccountCenter.prototype.setIcon = function (id) {
        // this.cur_icon_id = id;
        // Debug.trace("AccountCenter.setIcon id:"+id);
        if (this.sp_icon) {
            this.drawIcon(id);
        }
    };
    //绘制指定编号的头像
    AccountCenter.prototype.drawIcon = function (id) {
        if (!this.sp_icon) {
            return;
        }
        Debug.trace("AccountCenter.drawIcon id:" + id);
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
        Debug.trace("AccountCenter.drawIcon res:" + res);
        //根据资源取出texture
        var tex = Laya.loader.getRes(Tools.getSrc(res));
        //绘制新的
        this.sp_icon.graphics.drawTexture(tex, 0, 0);
    };
    AccountCenter.prototype.setName = function (id) {
        if (this.lb_id) {
            this.lb_id.text = this.conf.curavator.id.label.font.pretext + "" + id;
        }
    };
    AccountCenter.prototype.setAction = function (sp, pos) {
        var tween = Laya.Tween.to(sp, {
            x: pos.x,
            y: pos.y
        }, 200, Laya.Ease["backIn"]);
    };
    //点击外部半透明区域
    AccountCenter.prototype.onMouse = function (e) {
        if (this.conf.touchout) {
            if (this.conf.touchout.value && e.type == Laya.Event.MOUSE_DOWN) {
                this.onClose(null);
            }
        }
    };
    AccountCenter.prototype.onClose = function (s) {
        // this.closeCallback.apply(this.caller,[this]);
        this.hide();
    };
    return AccountCenter;
}(Laya.Sprite));
//# sourceMappingURL=AccountCenter.js.map