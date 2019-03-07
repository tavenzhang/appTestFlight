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
var HeadIcon = /** @class */ (function (_super) {
    __extends(HeadIcon, _super);
    function HeadIcon() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HeadIcon.refreshAvator = function () {
        //如果头像对象存在
        if (HeadIcon.obj) {
            //刷新当前的头像
            HeadIcon.obj.setIconById(Common.userInfo.avatorId);
        }
    };
    HeadIcon.prototype.init = function (conf, caller, callback) {
        HeadIcon.obj = this;
        this.conf = conf;
        this.caller = caller;
        this.callback = callback;
        //图标边框
        if (this.conf.iconframe) {
            this.initIconFrame(this.conf.iconframe);
        }
        if (this.conf.lbname) {
            this.initLbName(this.conf.lbname);
        }
        //图标
        this.btn_icon = new MyButton();
        this.btn_icon.init(this.conf.btnicon, this, this.callback);
        this.btn_icon.pos(this.conf.btnicon.pos.x, this.conf.btnicon.pos.y);
        this.addChild(this.btn_icon);
        //玩家id
        // if( this.conf.id )
        // {
        //     this.initUserId(this.conf.id);
        // }
        //玩家名字
        if (this.conf.name) {
            this.initUserName(this.conf.name);
        }
        //設定自己的坐標
        this.pos(this.conf.pos.x, this.conf.pos.y);
    };
    //初始化头像框
    HeadIcon.prototype.initIconFrame = function (conf) {
        var sp = Tools.newSprite(this.conf.iconframe);
        this.addChild(sp);
    };
    HeadIcon.prototype.initLbName = function (conf) {
        var sp = Tools.newSprite(conf);
        this.addChild(sp);
    };
    //初始化用户id
    HeadIcon.prototype.initUserId = function (conf) {
        //id 背景
        // var bg = Tools.newSprite(conf.bg);
        // this.addChild(bg);
        // this.lb_id = Tools.newLabel(
        //         "---",
        //         conf.size.w,conf.size.h,
        //         conf.font.size,
        //         conf.font.color,
        //         conf.font.align,conf.font.valign,
        //         conf.font.name,conf.font.wordwrap);
        // if( conf.font.borderColor )
        // {
        //     this.lb_id.borderColor = conf.font.borderColor;
        // }
        // this.lb_id.pos(conf.pos.x,conf.pos.y);
        // this.addChild(this.lb_id);
    };
    //初始化用户名
    HeadIcon.prototype.initUserName = function (conf) {
        this.lb_name = Tools.newLabel("---", conf.size.w, conf.size.h, conf.font.size, conf.font.color, conf.font.align, conf.font.valign, conf.font.name, conf.font.wordwrap);
        if (conf.font.borderColor) {
            this.lb_name.borderColor = conf.font.borderColor;
        }
        this.lb_name.pos(conf.pos.x, conf.pos.y);
        this.addChild(this.lb_name);
    };
    HeadIcon.prototype.setData = function (dt) {
        this.data = dt;
        var name = dt.username;
        if (dt.nickname) {
            name = dt.nickname;
        }
        this.setName(name); //dt.username);
        // this.setId(dt.userId);
        var strHeaderIndex = dt.avatorId; //Tools.transNickname2id(dt.username);
        this.setIcon(this.conf.picnamehead + strHeaderIndex + this.conf.picnameend);
    };
    HeadIcon.prototype.setIcon = function (src) {
        Laya.loader.load(src, new Laya.Handler(this, this.iconLoaded, [src]));
    };
    //设置头像id
    HeadIcon.prototype.setIconById = function (id) {
        // Debug.trace("HeadIcon setIconById:"+id);
        this.setIcon(this.conf.picnamehead + id + this.conf.picnameend);
    };
    HeadIcon.prototype.iconLoaded = function (src, e) {
        this.btn_icon.setRes([src]);
    };
    // public setId(id:string):void
    // {
    //     if( this.lb_id )
    //     {
    //         this.lb_id.text = this.conf.id.font.pretext+""+id;
    //     }
    // }
    HeadIcon.prototype.setName = function (name) {
        if (this.lb_name) {
            var showTxt = name;
            if (this.conf.bStarName) {
                showTxt = Tools.starString(name, "****");
            }
            this.lb_name.text = showTxt;
        }
    };
    return HeadIcon;
}(Laya.Sprite));
//# sourceMappingURL=HeadIcon.js.map