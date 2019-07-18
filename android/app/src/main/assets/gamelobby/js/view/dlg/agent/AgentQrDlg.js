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
        var agent;
        (function (agent) {
            /**
             * 代理中心二维码放大弹窗
             */
            var AgentQrDlg = /** @class */ (function (_super) {
                __extends(AgentQrDlg, _super);
                function AgentQrDlg() {
                    return _super.call(this) || this;
                }
                AgentQrDlg.show = function (url) {
                    var dlg = new AgentQrDlg();
                    dlg.width = Laya.stage.width;
                    dlg.initView(url);
                    dlg.popup(false, true);
                };
                AgentQrDlg.prototype.initView = function (url) {
                    var _this = this;
                    var size = 326;
                    var sp = qr.QRCode.create(url, "#000000", size, size, 3);
                    sp.size(size, size);
                    this.qrIcon.addChild(sp);
                    this.bgmc.width = Laya.stage.width;
                    this.bgmc.alpha = 0;
                    EventManager.addTouchScaleListener(this.bgmc, this, function () {
                        _this.close(null, true);
                    }, null, 1);
                    //
                    EventManager.addTouchScaleListener(this.saveBtn, this, function () {
                        SoundPlayer.clickSound();
                        GameUtils.saveImage(sp);
                        _this.close(null, true);
                    });
                };
                AgentQrDlg.prototype.onClosed = function (type) {
                    EventManager.removeAllEvents(this);
                    _super.prototype.onClosed.call(this, type);
                    this.destroy(true);
                };
                return AgentQrDlg;
            }(ui.dlg.agent.AgentQrDlgUI));
            agent.AgentQrDlg = AgentQrDlg;
        })(agent = dlg_1.agent || (dlg_1.agent = {}));
    })(dlg = view.dlg || (view.dlg = {}));
})(view || (view = {}));
//# sourceMappingURL=AgentQrDlg.js.map