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
var WinningLists = /** @class */ (function (_super) {
    __extends(WinningLists, _super);
    function WinningLists() {
        return _super.call(this) || this;
    }
    WinningLists.prototype.init = function ($config) {
        this._header = Tools.newSprite($config.bg);
        this.addChild(this._header);
        this._btnLatest = new MyButton();
        this._btnLatest.init($config.latest, this, this.onClick);
        this._btnLatest.pos($config.latest.pos.x, $config.latest.pos.y);
        this.addChild(this._btnLatest);
        this._btnMyList = new MyButton();
        this._btnMyList.init($config.mywin, this, this.onClick);
        this._btnMyList.pos($config.mywin.pos.x, $config.mywin.pos.y);
        this.addChild(this._btnMyList);
        for (var i = 0; i < 7; i++) {
            var bar = i % 2 ? $config.bar1 : $config.bar0;
            var sp = Tools.newSprite(bar);
            this.addChild(sp);
            sp.y = sp.height * i;
            sp.y += this._header.y + this._header.height;
        }
        this._footer = Tools.newSprite($config.bottom);
        this.addChild(this._footer);
    };
    WinningLists.prototype.onClick = function ($e) {
    };
    WinningLists.prototype.add = function ($data) {
    };
    return WinningLists;
}(Laya.Sprite));
//# sourceMappingURL=WinningLists.js.map