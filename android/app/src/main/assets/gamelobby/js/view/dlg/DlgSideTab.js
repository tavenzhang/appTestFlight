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
var DlgSideTab = /** @class */ (function (_super) {
    __extends(DlgSideTab, _super);
    function DlgSideTab() {
        return _super.call(this) || this;
    }
    DlgSideTab.prototype.init = function ($image) {
        this.tab_on = $image.getChildByName("tab_on");
        this.tab_on.alpha = 0;
    };
    DlgSideTab.prototype.active = function () {
        var x = 0;
        this.tab_on.x = x - 30;
        Laya.Tween.clearTween(this.tab_on);
        Laya.Tween.to(this.tab_on, { alpha: 1, x: x }, 400);
    };
    DlgSideTab.prototype.deactive = function () {
        Laya.Tween.clearTween(this.tab_on);
        Laya.Tween.to(this.tab_on, { alpha: 0 }, 200);
    };
    return DlgSideTab;
}(Laya.Sprite));
//# sourceMappingURL=DlgSideTab.js.map