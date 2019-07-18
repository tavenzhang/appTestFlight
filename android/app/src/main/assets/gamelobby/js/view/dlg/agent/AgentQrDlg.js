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
                    var _this = _super.call(this) || this;
                    //初始化Logo
                    _this.logoImage.skin = "./brand/login_icon.png";
                    var scaleX = _this.logoBox.width / _this.logoImage.width;
                    var scaleY = _this.logoBox.height / _this.logoImage.height;
                    var scale = Math.min(scaleX, scaleY);
                    _this.logoImage.scale(scale, scale);
                    //海报信息
                    _this.msgLabel.text = "";
                    //保存海报
                    EventManager.addTouchScaleListener(_this.saveBtn, _this, function () {
                        SoundPlayer.clickSound();
                        GameUtils.saveImage(_this.posterNode);
                        _this.close(null, true);
                    });
                    //退出
                    EventManager.addTouchScaleListener(_this.closeBtn, _this, function () {
                        SoundPlayer.returnLobbySound();
                        _this.close(null, true);
                    });
                    return _this;
                }
                /**
                 * 打开代理二维码海报弹窗
                 * @param url 二维码链接
                 * @param msg 海报信息
                 */
                AgentQrDlg.show = function (url, msg) {
                    var dlg = new AgentQrDlg();
                    //全屏适配
                    dlg.width = Laya.stage.width;
                    dlg.height = Laya.stage.height;
                    //初始化
                    dlg.SetData(url, msg);
                    //显示
                    dlg.popup(false, true);
                };
                AgentQrDlg.prototype.SetData = function (url, msg) {
                    //生成二维码
                    var size = 290;
                    var sp = qr.QRCode.create(url, "#000000", size, size, 3);
                    sp.size(size, size);
                    this.qrIcon.addChild(sp);
                    sp.x = (this.qrIcon.width - size) / 2;
                    sp.y = (this.qrIcon.height - size) / 2;
                    this.qrIcon.graphics.drawRect(0, 0, this.qrIcon.width, this.qrIcon.height, "#ffffff");
                    //设置文本信息
                    this.msgLabel.text = msg.toString();
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