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
    var UI;
    (function (UI) {
        var MailItemView = /** @class */ (function (_super) {
            __extends(MailItemView, _super);
            function MailItemView() {
                var _this = _super.call(this) || this;
                _this.mouseEnabled = true;
                return _this;
            }
            Object.defineProperty(MailItemView.prototype, "mailId", {
                get: function () {
                    return this.vo.mailId;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MailItemView.prototype, "selected", {
                get: function () {
                    return this._selected;
                },
                set: function (bl) {
                    this._selected = bl;
                    var alp = bl ? 1 : 0;
                    var time = bl ? 300 : 160;
                    Laya.Tween.to(this.selectPic, { alpha: alp }, time);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MailItemView.prototype, "award", {
                get: function () {
                    return this._isAward;
                },
                enumerable: true,
                configurable: true
            });
            //标记为已读
            MailItemView.prototype.markRead = function () {
                this.stateIcon.skin = "ui/mailbox/icon_yx_xtyj-yj-k.png";
                this.normGroup.alpha = 0.6;
            };
            //标记为已领取
            MailItemView.prototype.markReceived = function () {
                this.giftIcon.visible = false;
            };
            /**
             * 读取数据
             * @param vo
             */
            MailItemView.prototype.readData = function (vo) {
                this.vo = vo;
                this.titleTxt.text = vo.title;
                this.timeTxt.text = vo.sendTime;
                this.state = MailState[vo.state];
                this.selectPic.alpha = 0;
                this.giftIcon.visible = false;
                switch (this.state) {
                    case MailState.READ: { //已读(表示没有奖励的邮件)
                        this.stateIcon.skin = "ui/mailbox/icon_yx_xtyj-yj-k.png";
                        this.normGroup.alpha = 0.6;
                        break;
                    }
                    case MailState.UNREAD: { //未读(表示没有奖励的邮件)
                        break;
                    }
                    case MailState.READUNCLAIMED: { //已读未领取(有奖励的邮件)
                        this.giftIcon.visible = true;
                        this.stateIcon.skin = "ui/mailbox/icon_yx_xtyj-yj-k.png";
                        this.normGroup.alpha = 0.6;
                        this._isAward = true;
                        break;
                    }
                    case MailState.RECEIVE: { //已领取(有奖励的邮件)
                        this.stateIcon.skin = "ui/mailbox/icon_yx_xtyj-yj-k.png";
                        this.normGroup.alpha = 0.6;
                        break;
                    }
                    case MailState.UNCLAIMED: { //未读未领取(有奖励的邮件)
                        this.giftIcon.visible = true;
                        this._isAward = true;
                        break;
                    }
                }
            };
            return MailItemView;
        }(ui.UI.MailItemViewUI));
        UI.MailItemView = MailItemView;
    })(UI = view.UI || (view.UI = {}));
})(view || (view = {}));
//# sourceMappingURL=MailItemView.js.map