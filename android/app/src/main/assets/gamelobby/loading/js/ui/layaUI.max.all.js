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
var View = laya.ui.View;
var Dialog = laya.ui.Dialog;
var ui;
(function (ui) {
    var UpdateViewUI = /** @class */ (function (_super) {
        __extends(UpdateViewUI, _super);
        function UpdateViewUI() {
            return _super.call(this) || this;
        }
        UpdateViewUI.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.createView(ui.UpdateViewUI.uiView);
        };
        UpdateViewUI.uiView = { "type": "View", "props": { "width": 1334, "height": 750, "centerY": 0, "centerX": 0 }, "child": [{ "type": "Image", "props": { "skin": "update/updatabg.jpg", "height": 750, "centerY": 0, "centerX": 0 } }, { "type": "Image", "props": { "top": 94, "skin": "update/img_dl_nv01.jpg.png", "left": 44 } }, { "type": "Image", "props": { "y": 47, "x": 1285, "var": "serviceBtn", "top": 15, "skin": "update/icon_kf.png", "right": 22, "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "ProgressBar", "props": { "var": "progress", "skin": "update/img_dl_jingdutiao01.png", "centerX": 0, "bottom": 40 } }, { "type": "Image", "props": { "skin": "update/tisy.png", "centerX": 0, "bottom": 8 } }, { "type": "Label", "props": { "y": 638, "width": 800, "var": "progressTxt", "text": "加载中...", "height": 40, "fontSize": 32, "font": "SimHei", "color": "#ffffff", "centerX": 0, "align": "center" } }, { "type": "Image", "props": { "width": 800, "var": "logo", "top": 199, "left": 486, "height": 280 } }] };
        return UpdateViewUI;
    }(View));
    ui.UpdateViewUI = UpdateViewUI;
})(ui || (ui = {}));
//# sourceMappingURL=layaUI.max.all.js.map