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
var NoticeSideTab = /** @class */ (function (_super) {
    __extends(NoticeSideTab, _super);
    function NoticeSideTab() {
        return _super.call(this) || this;
    }
    NoticeSideTab.prototype.init = function ($image) {
        var base = this.base = new Laya.Image($image.skin);
        base.width = $image.width;
        base.height = $image.height;
        this.addChild(base);
        this.pos($image.x, $image.y);
        this.size($image.width, $image.height);
        this.pivot($image.pivotX, $image.pivotY);
        var txt = this.label = new Laya.Label();
        base.addChild(txt);
        var label = $image.getChildByName("label");
        var props = ["text", "x", "y", "width", "height", "align", "valign", "color", "font", "fontSize", "wordWrap"];
        for (var _i = 0, props_1 = props; _i < props_1.length; _i++) {
            var prop = props_1[_i];
            txt[prop] = label[prop];
        }
        var tab = $image.getChildByName("tab_on");
        var tab_on = this.tab_on = new Laya.Image(tab.skin);
        tab_on.name = "btn";
        base.addChild(tab_on);
        tab_on.pos(tab.x, tab.y);
        tab_on.size(tab.width, tab.height);
        tab_on.pivot(tab.pivotX, tab.pivotY);
        var label2 = tab.getChildByName("label");
        var txt2 = this.label2 = new Laya.Label();
        tab_on.addChild(txt2);
        for (var _a = 0, props_2 = props; _a < props_2.length; _a++) {
            var prop = props_2[_a];
            txt2[prop] = label2[prop];
        }
        var newInd = $image.getChildByName("newInd");
        this.ind = new Laya.Image(newInd.skin);
        base.addChild(this.ind);
        this.ind.x = newInd.x;
        this.ind.y = newInd.y;
        base.visible = true;
        this.visible = true;
        this.tab_on.alpha = 0;
        this.label2.visible = false;
        this.tab_on.on(Laya.Event.CLICK, this, this.dispatchClick);
    };
    NoticeSideTab.prototype.dispatchClick = function () {
        Laya.timer.once(12, this, function () {
            this.event("tabclick", this);
        });
    };
    NoticeSideTab.prototype.setData = function ($data) {
        this.label.text = this.label2.text = $data.title;
        this.ind.visible = !$data.bread;
    };
    NoticeSideTab.prototype.updateRead = function () {
        this.ind.visible = false;
    };
    NoticeSideTab.prototype.active = function () {
        this.tab_on.alpha = 1;
        this.label2.visible = true;
        _super.prototype.active.call(this);
    };
    NoticeSideTab.prototype.deactive = function () {
        this.tab_on.alpha = 0;
        this.label2.visible = false;
        _super.prototype.deactive.call(this);
    };
    return NoticeSideTab;
}(DlgSideTab));
//# sourceMappingURL=NoticeSideTab.js.map