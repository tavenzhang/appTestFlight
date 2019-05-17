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
    var UpdateView = /** @class */ (function (_super) {
        __extends(UpdateView, _super);
        function UpdateView() {
            var _this = _super.call(this) || this;
            _this.initView();
            return _this;
        }
        UpdateView.prototype.initView = function () {
            this.progressTxt.text = "正在检查更新...";
            this.progress.value = 0;
            this.serviceBtn.on(Laya.Event.CLICK, this, this.serviceClick);
            //
            this.logo.skin = "../brand/login_icon.png";
        };
        UpdateView.prototype.serviceClick = function () {
            console.error("click-客服"); //debugxxx
            // this.showLoading({ do: "loadFinish" });
            window.top.postMessage(JSON.stringify({ action: "game_custom" }), "*");
        };
        UpdateView.prototype.showLoading = function (data) {
            if (data.do == "loading") {
                var value = data.percent * 100;
                this.progressTxt.text = "正在下载更新内容" + value + "%";
                this.progress.value = data.percent;
                console.error("loading:", data.percent); //debugxxx
            }
            else if (data.do == "loadFinish") {
                console.error("loadFinish"); //debugxxx
                this.progressTxt.text = "资源加载准备中...";
                // if (window["loadGame"]) {
                // 	window["loadGame"]();
                // }
            }
        };
        return UpdateView;
    }(ui.UpdateViewUI));
    view.UpdateView = UpdateView;
})(view || (view = {}));
//# sourceMappingURL=UpdateView.js.map