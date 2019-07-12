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
    var dlg;
    (function (dlg_1) {
        var balance;
        (function (balance) {
            /**
             * 存取明细
             */
            var AccessDetailDlg = /** @class */ (function (_super) {
                __extends(AccessDetailDlg, _super);
                function AccessDetailDlg() {
                    var _this = _super.call(this) || this;
                    _this.dataTypes = ["", "DEPOSIT", "WITHDRAW", "INCOME"];
                    _this.initView();
                    return _this;
                }
                AccessDetailDlg.show = function () {
                    var dlg = new AccessDetailDlg();
                    dlg.popup(false, true);
                };
                AccessDetailDlg.prototype.initView = function () {
                    var _this = this;
                    this.itemPanel.vScrollBarSkin = "";
                    EventManager.addTouchScaleListener(this.closeBtn, this, function () {
                        SoundPlayer.closeSound();
                        _this.close(null, true);
                    });
                    var tab;
                    for (var i = 1; i <= 4; i++) {
                        tab = this["tab" + i];
                        tab.alpha = 0;
                        EventManager.addTouchScaleListener(tab, this, this.tabHandler, i, 1);
                    }
                    this.tabHandler(null, 1);
                };
                AccessDetailDlg.prototype.tabHandler = function (evt, id) {
                    var _this = this;
                    var tab = this["tab" + id];
                    if (tab.alpha == 1)
                        return;
                    tab.alpha = 1;
                    if (evt)
                        SoundPlayer.clickSound();
                    if (this.prevTab) {
                        this.prevTab.alpha = 0;
                    }
                    this.prevTab = tab;
                    //
                    var data = {
                        type: this.dataTypes[id - 1]
                    };
                    if (id == 1)
                        data = {};
                    LayaMain.getInstance().showCircleLoading(true);
                    HttpRequester.postHttpData(ConfObjRead.httpCmd.yuebaoDetail, data, this, function (suc, jobj) {
                        LayaMain.getInstance().showCircleLoading(false);
                        if (suc) {
                            _this.showDetail(jobj);
                        }
                    });
                };
                AccessDetailDlg.prototype.showDetail = function (arr) {
                    var _this = this;
                    this.itemPanel.removeChildren();
                    this.itemPanel.refresh();
                    var item;
                    arr.forEach(function (value, index) {
                        item = new view.dlg.balance.DetailItemView();
                        item.readData(value);
                        item.y = index * (item.height + 6);
                        _this.itemPanel.addChild(item);
                    });
                };
                AccessDetailDlg.prototype.onClosed = function (type) {
                    this.itemPanel.destroy(true);
                    EventManager.removeAllEvents(this);
                    _super.prototype.onClosed.call(this, type);
                    this.destroy(true);
                };
                return AccessDetailDlg;
            }(ui.dlg.balance.AccessDetailDlgUI));
            balance.AccessDetailDlg = AccessDetailDlg;
        })(balance = dlg_1.balance || (dlg_1.balance = {}));
    })(dlg = view.dlg || (view.dlg = {}));
})(view || (view = {}));
//# sourceMappingURL=AccessDetailDlg.js.map