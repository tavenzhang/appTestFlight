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
        var agent;
        (function (agent) {
            var InviteCodeItem = /** @class */ (function (_super) {
                __extends(InviteCodeItem, _super);
                function InviteCodeItem() {
                    return _super.call(this) || this;
                }
                InviteCodeItem.prototype.initData = function (data) {
                    var _this = this;
                    this.data = data;
                    this.codeTxt.text = data.affCode;
                    this.linkTxt.text = AgentModel.appShareUrl + "&affCode=" + data.affCode;
                    var size = 90;
                    var sp = qr.QRCode.create(this.linkTxt.text, "#000000", size, size, 3);
                    sp.pos(this.qrIcon.width - size >> 1, this.qrIcon.height - size >> 1);
                    this.qrIcon.addChild(sp);
                    //
                    EventManager.addTouchScaleListener(this.copyBtn, this, function () {
                        SoundPlayer.clickSound();
                        PostMHelp.game_common({ "do": "copylink", "param": _this.linkTxt.text });
                    });
                    EventManager.addTouchScaleListener(this.shareBtn, this, function () {
                        SoundPlayer.clickSound();
                        PostMHelp.game_common({ "do": "share", "param": _this.linkTxt.text });
                    });
                };
                //添加删除事件
                InviteCodeItem.prototype.addDelEvent = function (caller, callback) {
                    var _this = this;
                    EventManager.addTouchScaleListener(this.delBtn, this, function () {
                        SoundPlayer.enterPanelSound();
                        InviteCodeItem.curID = _this.data.id;
                        dlg.TipsDlg.show("您确定删除这组邀请码？", caller, callback);
                    });
                };
                InviteCodeItem.prototype.destroy = function () {
                    EventManager.removeAllEvents(this);
                    _super.prototype.destroy.call(this, true);
                };
                InviteCodeItem.curID = 0;
                return InviteCodeItem;
            }(ui.dlg.agent.InviteCodeItemUI));
            agent.InviteCodeItem = InviteCodeItem;
        })(agent = dlg.agent || (dlg.agent = {}));
    })(dlg = view.dlg || (view.dlg = {}));
})(view || (view = {}));
//# sourceMappingURL=InviteCodeItem.js.map