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
        /**
         * 修改密码通用面版(包括登录密码和取款密码)
         */
        var SetPwdPanel = /** @class */ (function (_super) {
            __extends(SetPwdPanel, _super);
            function SetPwdPanel() {
                var _this = _super.call(this) || this;
                _this.initView();
                return _this;
            }
            SetPwdPanel.prototype.initView = function () {
                this.view = new SetPwdView(this);
            };
            Object.defineProperty(SetPwdPanel.prototype, "selectIndex", {
                //--------------------------public--------------
                set: function (value) {
                    this.view.selectIndex = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SetPwdPanel.prototype, "isOldPwd", {
                /**
                 * 是否为旧密码修改
                 */
                get: function () {
                    return this.view.isOldPwd;
                },
                enumerable: true,
                configurable: true
            });
            SetPwdPanel.prototype.setGrayIndex = function (index, gray) {
                this.view.setGrayIndex(index, gray);
            };
            SetPwdPanel.prototype.checkOldPwdInfos = function () {
                return this.view.checkOldPwdInfos();
            };
            SetPwdPanel.prototype.checkPhoneCodePwdInfos = function () {
                return this.view.checkPhoneCodePwdInfos();
            };
            /**
             * 获取验证码
             * @param type
             */
            SetPwdPanel.prototype.getPhoneVercode = function (type) {
                this.view.getPhoneVercode(type);
            };
            SetPwdPanel.prototype.resetView = function () {
                this.view.resetView();
            };
            SetPwdPanel.prototype.clearInput = function () {
                this.view.clearInput();
            };
            SetPwdPanel.prototype.destroy = function () {
                this.view.destroy();
                _super.prototype.destroy.call(this);
            };
            return SetPwdPanel;
        }(ui.UI.SetPwdPanelUI));
        UI.SetPwdPanel = SetPwdPanel;
    })(UI = view.UI || (view.UI = {}));
})(view || (view = {}));
//# sourceMappingURL=SetPwdPanel.js.map