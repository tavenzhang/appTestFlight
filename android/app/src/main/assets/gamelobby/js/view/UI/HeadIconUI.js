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
/**
 * 头像icon
 */
var HeadIconUI = /** @class */ (function (_super) {
    __extends(HeadIconUI, _super);
    function HeadIconUI(id) {
        var _this = _super.call(this) || this;
        _this.iconID = id;
        _this.mouseEnabled = true;
        _this.initView();
        return _this;
    }
    HeadIconUI.prototype.initView = function () {
        this.iconbg = new Laya.Image();
        this.iconbg.skin = "ui/common/avatorFrame.png";
        this.addChild(this.iconbg);
        this.iconbg.width = 120;
        this.iconbg.height = 120;
        this.iconHead = new Laya.Image();
        this.iconHead.skin = ResConfig.getHeadSkinByID(this.iconID);
        this.addChildAt(this.iconHead, 0);
        this.iconHead.size(this.iconbg.width - 20, this.iconbg.height - 20);
        this.iconHead.pos(this.iconbg.width - this.iconHead.width >> 1, this.iconbg.height - this.iconHead.height >> 1);
        this.iconSelecte = new Laya.Image();
        this.iconSelecte.skin = "ui/fullMyCenter/img_grzx_gx01.png";
        this.addChild(this.iconSelecte);
        this.iconSelecte.pos(this.iconbg.width - this.iconSelecte.width, this.iconbg.height - this.iconSelecte.height);
        this.iconSelecte.visible = false;
    };
    HeadIconUI.prototype.selecteIcon = function (bl) {
        this.iconSelecte.visible = bl;
    };
    Object.defineProperty(HeadIconUI.prototype, "numID", {
        get: function () {
            if (this.iconID.indexOf("0") == 0) {
                return Number(this.iconID.substr(1, 1));
            }
            return Number(this.iconID);
        },
        enumerable: true,
        configurable: true
    });
    return HeadIconUI;
}(Laya.Sprite));
//# sourceMappingURL=HeadIconUI.js.map