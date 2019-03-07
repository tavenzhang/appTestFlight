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
var RunMsgItem = /** @class */ (function (_super) {
    __extends(RunMsgItem, _super);
    function RunMsgItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        //是否暂停
        _this.bPause = false;
        //是否死掉的消息对象
        _this.bDie = false;
        return _this;
    }
    //我跟随的id
    // public followId:number = -1;
    RunMsgItem.prototype.init = function (p, conf, text) {
        this.rmp = p;
        this.conf = conf;
        // this.lb_msg = Tools.newLabel(
        //     text,
        //     conf.size.w,conf.size.h,
        //     conf.font.size,conf.font.color,
        //     conf.font.align,conf.font.valign,
        //     conf.font.name,conf.font.wrap
        // );
        // this.addChild(this.lb_msg);
        // Debug.trace("RunMsgItem init wid:"+this.lb_msg.width);
        // this.html_msg = Tools.addHtmlDivElement(
        //     this,this.conf
        // );
        // this.html_msg.innerHTML = text;
        this.html_msg = new SeanHtmlString(text, "./assets/conf/libhtml.json");
        this.html_msg.pos(this.conf.pos.x, this.conf.pos.y);
        this.addChild(this.html_msg);
        // Debug.trace("RunMsgItem.init html_msg:");
        // Debug.trace(this.html_msg);
    };
    //设定id
    RunMsgItem.prototype.setId = function (id) {
        this.id = id;
    };
    RunMsgItem.prototype.getId = function () {
        return this.id;
    };
    RunMsgItem.prototype.getWidth = function () {
        // return this.lb_msg.width;
        // return this.html_msg.width;
        // return this.html_msg.contextWidth;
        return this.html_msg.getWidth();
    };
    //消息对象移动
    RunMsgItem.prototype.run = function (spd) {
        if (this.bDie || this.bPause) {
            return;
        }
        this.x -= spd;
        //如果我的右侧坐标小于0了，那么要通知父级，重新调整跟随状态
        var rx = this.x + this.getWidth();
        // if( rx <= this.getWidth() )
        // {
        //     this.bPause = true;
        // }
        if (rx <= 0) {
            this.bDie = true;
        }
    };
    return RunMsgItem;
}(Laya.Sprite));
//# sourceMappingURL=RunMsgItem.js.map