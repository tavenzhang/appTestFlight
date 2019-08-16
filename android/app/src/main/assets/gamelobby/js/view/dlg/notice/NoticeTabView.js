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
    (function (dlg) {
        var notice;
        (function (notice) {
            var NoticeTabView = /** @class */ (function (_super) {
                __extends(NoticeTabView, _super);
                function NoticeTabView() {
                    var _this = _super.call(this) || this;
                    _this.mouseEnabled = true;
                    _this.tab_on.alpha = 0;
                    return _this;
                }
                NoticeTabView.prototype.readData = function (data) {
                    this.noticeid = data.noticeid;
                    this.txt.text = this.onTxt.text = data.title;
                    this.newInd.visible = !data.bread;
                };
                NoticeTabView.prototype.onRead = function () {
                    this.newInd.visible = false;
                };
                NoticeTabView.prototype.active = function () {
                    this.txt.visible = false;
                    this.tab_on.alpha = 0;
                    this.tab_on.x = -30;
                    Laya.Tween.clearTween(this.tab_on);
                    Laya.Tween.to(this.tab_on, { alpha: 1, x: 0 }, 400);
                };
                NoticeTabView.prototype.deactive = function () {
                    Laya.Tween.clearTween(this.tab_on);
                    Laya.Tween.to(this.tab_on, { alpha: 0 }, 200);
                    this.txt.visible = true;
                };
                return NoticeTabView;
            }(ui.dlg.notice.NoticeTabViewUI));
            notice.NoticeTabView = NoticeTabView;
        })(notice = dlg.notice || (dlg.notice = {}));
    })(dlg = view.dlg || (view.dlg = {}));
})(view || (view = {}));
//# sourceMappingURL=NoticeTabView.js.map