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
        _this.bPause = false;
        _this.bDie = false;
        return _this;
    }
    RunMsgItem.prototype.init = function (p, conf, text) {
        this.rmp = p;
        this.conf = conf;
        this.html_msg = new SeanHtmlString(text, "./assets/conf/libhtml.json");
        this.html_msg.pos(this.conf.pos.x, this.conf.pos.y);
        this.addChild(this.html_msg);
        // Debug.trace("RunMsgItem.init html_msg:");
        // Debug.trace(this.html_msg);
    };
    RunMsgItem.prototype.setId = function (id) {
        this.id = id;
    };
    RunMsgItem.prototype.getId = function () {
        return this.id;
    };
    RunMsgItem.prototype.getWidth = function () {
        return this.html_msg.getWidth();
    };
    RunMsgItem.prototype.run = function (spd) {
        if (this.bDie || this.bPause) {
            return;
        }
        this.x -= spd;
        var rx = this.x + this.getWidth();
        if (rx <= 0) {
            this.bDie = true;
        }
    };
    return RunMsgItem;
}(MySprite));
//# sourceMappingURL=RunMsgItem.js.map