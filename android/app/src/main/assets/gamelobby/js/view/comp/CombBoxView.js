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
/**Created by the LayaAirIDE*/
var view;
(function (view) {
    var comp;
    (function (comp) {
        /**
         * 自定义下拉框
         */
        var CombBoxView = /** @class */ (function (_super) {
            __extends(CombBoxView, _super);
            function CombBoxView() {
                var _this = _super.call(this) || this;
                _this.mkmc = new Laya.Sprite();
                _this.itemArr = [];
                _this.index = 0;
                _this.isOpen = false; //是否展开
                _this.selectItem = null;
                _this.initView();
                return _this;
            }
            Object.defineProperty(CombBoxView.prototype, "selectLabel", {
                get: function () {
                    return this.labelTxt.text;
                },
                set: function (value) {
                    this.labelTxt.text = value;
                    if (this.itemArr.length > 0) {
                        var arr = this.itemArr.filter(function (item) { return item.labelTxt.text == value; });
                        if (arr && arr.length >= 0) {
                            this.selectItem = arr[0];
                            this.selectIndex = this.itemArr.indexOf(this.selectItem);
                        }
                    }
                },
                enumerable: true,
                configurable: true
            });
            CombBoxView.prototype.initView = function () {
                this.titleH = this.titleBtn.height;
                this.listH = this.itemList.height;
                this.viewH = this.titleH + this.listH + 10;
                this.combView.height = this.titleH;
                this.labelTxt.editable = false;
                this.labelTxt.mouseEnabled = false;
                this.mkmc.graphics.drawRect(0, 0, this.width, this.listH, "#000000");
                this.itemList.mask = this.mkmc;
                this.itemList.vScrollBarSkin = "";
                this.itemList.mask = this.mkmc;
                this.mkmc.y = -this.listH;
                this.itemList.on(Laya.Event.CLICK, this, this.combListHandler);
                this.titleBtn.on(Laya.Event.CLICK, this, this.showList);
                Laya.stage.on(Laya.Event.MOUSE_DOWN, this, this.stageDown);
            };
            CombBoxView.prototype.combListHandler = function (e) {
                if (e.target instanceof comp.CombItemView) {
                    var item = e.target;
                    this.labelTxt.text = item.labelTxt.text;
                    this.selectItem = item;
                    this.selectIndex = item.index;
                    this.showList();
                }
            };
            CombBoxView.prototype.showList = function () {
                if (this.combView.height == this.titleH) {
                    Laya.Tween.to(this.combView, { height: this.viewH }, 300, Laya.Ease.cubicOut);
                    Laya.Tween.to(this.mkmc, { y: 0 }, 300, Laya.Ease.cubicOut);
                    this.height = this.viewH;
                    this.isOpen = true;
                }
                else {
                    Laya.Tween.to(this.combView, { height: this.titleH }, 300, Laya.Ease.cubicOut);
                    Laya.Tween.to(this.mkmc, { y: -this.listH }, 300, Laya.Ease.cubicOut);
                    this.height = this.titleH;
                    this.isOpen = false;
                }
            };
            CombBoxView.prototype.stageDown = function (e) {
                if (this.isOpen) {
                    if (!this.itemList.hitTestPoint(e.stageX, e.stageY)) {
                        this.showList();
                    }
                }
            };
            Object.defineProperty(CombBoxView.prototype, "listHeight", {
                /**
                 * 设置list区域的高度
                 */
                set: function (value) {
                    this.listH = value;
                    this.itemList.height = value;
                    this.viewH = this.titleH + this.listH + 10;
                    this.mkmc.height = value;
                    if (this.mkmc.y != 0)
                        this.mkmc.y = -this.listH;
                },
                enumerable: true,
                configurable: true
            });
            CombBoxView.prototype.addItem = function (item) {
                item.y = this.index * item.height;
                item.index = this.index;
                this.itemList.addChild(item);
                this.itemArr.push(item);
                if (item.labelTxt.text == this.labelTxt.text) {
                    this.selectIndex = this.index;
                    this.selectItem = item;
                }
                this.index++;
            };
            CombBoxView.prototype.clearItems = function () {
                this.itemArr.forEach(function (item) {
                    item.destroy(true);
                });
                this.itemArr.length = 0;
                this.index = 0;
            };
            CombBoxView.prototype.destroy = function () {
                this.clearItems();
                Laya.Tween.clearTween(this);
                Laya.Tween.clearTween(this.mkmc);
                this.itemList.off(Laya.Event.CLICK, this, this.combListHandler);
                this.titleBtn.off(Laya.Event.CLICK, this, this.showList);
                Laya.stage.off(Laya.Event.MOUSE_DOWN, this, this.stageDown);
                _super.prototype.destroy.call(this, true);
            };
            return CombBoxView;
        }(ui.comp.CombBoxViewUI));
        comp.CombBoxView = CombBoxView;
    })(comp = view.comp || (view.comp = {}));
})(view || (view = {}));
//# sourceMappingURL=CombBoxView.js.map