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
var SideTab = /** @class */ (function (_super) {
    __extends(SideTab, _super);
    function SideTab() {
        return _super.call(this) || this;
    }
    SideTab.prototype.copy = function ($image) {
        var base = new Laya.Image($image.skin);
        this.addChild(base);
        this.pos = $image.pos;
        this.size = $image.size;
        console.log($image, this);
    };
    return SideTab;
}(Laya.Sprite));
//# sourceMappingURL=SideTab.js.map