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
    var comp;
    (function (comp) {
        var CombBoxViewUI = /** @class */ (function (_super) {
            __extends(CombBoxViewUI, _super);
            function CombBoxViewUI() {
                return _super.call(this) || this;
            }
            CombBoxViewUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.comp.CombBoxViewUI.uiView);
            };
            CombBoxViewUI.uiView = { "type": "View", "props": { "width": 410, "height": 50 }, "child": [{ "type": "Image", "props": { "y": 0, "var": "combView", "skin": "ui/common/bgcomb.png", "sizeGrid": "20,20,20,20", "right": 0, "left": 0 }, "child": [{ "type": "Panel", "props": { "y": 50, "width": 410, "var": "itemList", "right": 0, "left": 0, "height": 241 } }, { "type": "Box", "props": { "y": 0, "var": "titleBtn", "right": 0, "left": 0, "height": 50 }, "child": [{ "type": "Image", "props": { "skin": "ui/res_login/btn_dl_xiala01.png", "right": 20, "mouseEnabled": false, "centerY": 0 } }, { "type": "TextInput", "props": { "y": 0, "x": 20, "width": 332, "var": "labelTxt", "valign": "middle", "promptColor": "#93afc0", "prompt": "请选择银行", "height": 50, "fontSize": 30, "color": "#ffffff" } }] }] }] };
            return CombBoxViewUI;
        }(View));
        comp.CombBoxViewUI = CombBoxViewUI;
    })(comp = ui.comp || (ui.comp = {}));
})(ui || (ui = {}));
(function (ui) {
    var comp;
    (function (comp) {
        var CombItemViewUI = /** @class */ (function (_super) {
            __extends(CombItemViewUI, _super);
            function CombItemViewUI() {
                return _super.call(this) || this;
            }
            CombItemViewUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.comp.CombItemViewUI.uiView);
            };
            CombItemViewUI.uiView = { "type": "View", "props": { "width": 410, "height": 50 }, "child": [{ "type": "Label", "props": { "x": 10, "width": 390, "var": "labelTxt", "text": "label", "height": 30, "fontSize": 30, "color": "#ffffff", "centerY": 0 } }, { "type": "Rect", "props": { "y": 0, "x": 5, "width": 400, "name": "line", "lineWidth": 1, "height": 1, "fillColor": "#80bfc5" } }] };
            return CombItemViewUI;
        }(View));
        comp.CombItemViewUI = CombItemViewUI;
    })(comp = ui.comp || (ui.comp = {}));
})(ui || (ui = {}));
(function (ui) {
    var dlg;
    (function (dlg) {
        var AgentDlgUI = /** @class */ (function (_super) {
            __extends(AgentDlgUI, _super);
            function AgentDlgUI() {
                return _super.call(this) || this;
            }
            AgentDlgUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.dlg.AgentDlgUI.uiView);
            };
            AgentDlgUI.uiView = { "type": "Dialog", "props": { "width": 1624, "height": 750 }, "child": [{ "type": "Image", "props": { "skin": "ui/panel_common/img_com_quanping_di.jpg", "centerY": 0, "centerX": 0 } }, { "type": "Image", "props": { "y": 85, "var": "contentList", "skin": "ui/panel_common/img_com_quanping_cedi.png" }, "child": [{ "type": "Sprite", "props": { "y": -85, "width": 306, "var": "content_tabs", "height": 750 }, "child": [{ "type": "Image", "props": { "y": 127, "x": 305, "var": "tabHome", "skin": "ui/panel_common/img_com_quanping_ce_di.png", "pivotX": 305, "name": "tab0" }, "child": [{ "type": "Image", "props": { "y": 25, "x": 80, "skin": "ui/panel_agent/img_daili_zi05.png", "pivotY": 0.5, "pivotX": 0.5 } }, { "type": "Image", "props": { "y": -7, "x": 0, "skin": "ui/panel_common/img_com_quanping_ce_xuanzhong.png", "name": "tab_on" }, "child": [{ "type": "Image", "props": { "y": 32, "x": 80, "skin": "ui/panel_agent/img_daili_zi010.png", "pivotY": 0.5, "pivotX": 0.5 } }] }] }, { "type": "Image", "props": { "y": 237, "x": 305, "var": "tabAffiliates", "skin": "ui/panel_common/img_com_quanping_ce_di.png", "pivotX": 305, "name": "tab1" }, "child": [{ "type": "Image", "props": { "y": 25, "x": 80, "skin": "ui/panel_agent/img_daili_zi04.png", "pivotY": 0.5, "pivotX": 0.5 } }, { "type": "Image", "props": { "y": -7, "x": 0, "skin": "ui/panel_common/img_com_quanping_ce_xuanzhong.png", "name": "tab_on" }, "child": [{ "type": "Image", "props": { "y": 32, "x": 78, "skin": "ui/panel_agent/img_daili_zi09.png", "pivotY": 0.5, "pivotX": 0.5 } }] }] }, { "type": "Image", "props": { "y": 347, "x": 305, "var": "tabAchievement", "skin": "ui/panel_common/img_com_quanping_ce_di.png", "pivotX": 305, "name": "tab2" }, "child": [{ "type": "Image", "props": { "y": 25, "x": 80, "skin": "ui/panel_agent/img_daili_zi03.png", "pivotY": 0.5, "pivotX": 0.5 } }, { "type": "Image", "props": { "y": -7, "x": 0, "skin": "ui/panel_common/img_com_quanping_ce_xuanzhong.png", "name": "tab_on" }, "child": [{ "type": "Image", "props": { "y": 32, "x": 80, "skin": "ui/panel_agent/img_daili_zi08.png", "pivotY": 0.5, "pivotX": 0.5 } }] }] }, { "type": "Image", "props": { "y": 456, "x": 305, "var": "tabCodes", "skin": "ui/panel_common/img_com_quanping_ce_di.png", "pivotX": 305, "name": "tab3" }, "child": [{ "type": "Image", "props": { "y": 25, "x": 80, "skin": "ui/panel_agent/img_daili_zi02.png", "pivotY": 0.5, "pivotX": 0.5 } }, { "type": "Image", "props": { "y": -7, "x": 0, "skin": "ui/panel_common/img_com_quanping_ce_xuanzhong.png", "name": "tab_on" }, "child": [{ "type": "Image", "props": { "y": 32, "x": 80, "skin": "ui/panel_agent/img_daili_zi07.png", "pivotY": 0.5, "pivotX": 0.5 } }] }] }, { "type": "Image", "props": { "y": 566, "x": 305, "var": "tabDescription", "skin": "ui/panel_common/img_com_quanping_ce_di.png", "pivotX": 305, "name": "tab4" }, "child": [{ "type": "Image", "props": { "y": 25, "x": 80, "skin": "ui/panel_agent/img_daili_zi01.png", "pivotY": 0.5, "pivotX": 0.5 } }, { "type": "Image", "props": { "y": -7, "x": 0, "skin": "ui/panel_common/img_com_quanping_ce_xuanzhong.png", "name": "tab_on" }, "child": [{ "type": "Image", "props": { "y": 32, "x": 80, "skin": "ui/panel_agent/img_daili_zi06.png", "pivotY": 0.5, "pivotX": 0.5 } }] }] }] }] }, { "type": "Image", "props": { "width": 482, "var": "label", "skin": "ui/panel_common/img_com_quanping_ce_biaotou.png" }, "child": [{ "type": "Image", "props": { "y": 0, "x": 70, "skin": "ui/panel_agent/img_daili_biaotou.png" } }, { "type": "Image", "props": { "y": 27, "x": 180, "skin": "ui/panel_agent/img_daili_biaotou02.png" } }] }, { "type": "Image", "props": { "y": 2, "x": 1624, "width": 292, "var": "control", "skin": "ui/common/img_com_quanping_guanbi01.png", "pivotX": 292 }, "child": [{ "type": "Image", "props": { "y": 12, "x": 123, "skin": "ui/common/img_com_quanping_guanbi02.png" } }] }, { "type": "Image", "props": { "y": 19, "x": 1177, "var": "btnComRecords", "skin": "ui/panel_agent/b_dlzx_tyjl.png" } }, { "type": "View", "props": { "y": 110, "x": 420, "width": 1035, "var": "contents", "height": 625 } }] };
            return AgentDlgUI;
        }(Dialog));
        dlg.AgentDlgUI = AgentDlgUI;
    })(dlg = ui.dlg || (ui.dlg = {}));
})(ui || (ui = {}));
(function (ui) {
    var dlg;
    (function (dlg) {
        var bindPhone;
        (function (bindPhone) {
            var BindPhoneActiveDlgUI = /** @class */ (function (_super) {
                __extends(BindPhoneActiveDlgUI, _super);
                function BindPhoneActiveDlgUI() {
                    return _super.call(this) || this;
                }
                BindPhoneActiveDlgUI.prototype.createChildren = function () {
                    _super.prototype.createChildren.call(this);
                    this.createView(ui.dlg.bindPhone.BindPhoneActiveDlgUI.uiView);
                };
                BindPhoneActiveDlgUI.uiView = { "type": "Dialog", "props": { "width": 1334, "height": 750 }, "child": [{ "type": "Image", "props": { "x": -145, "skin": "ui/bindPhone/bg_bdsj_bg01.png", "centerY": 0 }, "child": [{ "type": "Image", "props": { "y": 65, "x": 346, "skin": "ui/bindPhone/img_bdsj_rw01.png" } }, { "type": "Image", "props": { "y": 131, "x": 764, "skin": "ui/bindPhone/img_bdsj_bt01.png" } }, { "type": "Image", "props": { "y": 298, "x": 783, "skin": "ui/bindPhone/img_bdsj_wz01.png" }, "child": [{ "type": "Sprite", "props": { "y": 105, "x": 264, "width": 58, "var": "numbox", "height": 34 } }, { "type": "Image", "props": { "y": 87, "x": 351, "var": "yuan", "skin": "ui/bindPhone/img_bdsj_y01.png" } }] }, { "type": "Image", "props": { "y": 531, "x": 974, "var": "bindBtn", "skin": "ui/bindPhone/bdsj_ljbd.png", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 604, "x": 870, "visible": false, "var": "backLogin", "skin": "ui/bindPhone/bdsj_havenum.png" } }, { "type": "Image", "props": { "y": 129, "x": 1261, "width": 48, "var": "closeBtn", "skin": "ui/bindPhone/bdsj_close.png", "height": 48, "anchorY": 0.5, "anchorX": 0.5 } }] }] };
                return BindPhoneActiveDlgUI;
            }(Dialog));
            bindPhone.BindPhoneActiveDlgUI = BindPhoneActiveDlgUI;
        })(bindPhone = dlg.bindPhone || (dlg.bindPhone = {}));
    })(dlg = ui.dlg || (ui.dlg = {}));
})(ui || (ui = {}));
(function (ui) {
    var dlg;
    (function (dlg) {
        var center;
        (function (center) {
            var AccountInfoDlgUI = /** @class */ (function (_super) {
                __extends(AccountInfoDlgUI, _super);
                function AccountInfoDlgUI() {
                    return _super.call(this) || this;
                }
                AccountInfoDlgUI.prototype.createChildren = function () {
                    View.regComponent("Text", laya.display.Text);
                    _super.prototype.createChildren.call(this);
                    this.createView(ui.dlg.center.AccountInfoDlgUI.uiView);
                };
                AccountInfoDlgUI.uiView = { "type": "Dialog", "props": { "width": 1034, "height": 630 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "skin": "ui/panel_common/maxdlg.png" }, "child": [{ "type": "Image", "props": { "y": 19, "x": 427, "skin": "ui/fullMyCenter/img_grzx_bt05.png" } }, { "type": "Image", "props": { "y": 49, "x": 987, "var": "closeBtn", "skin": "ui/common/newclose.png", "anchorY": 0.5, "anchorX": 0.5 } }] }, { "type": "Image", "props": { "y": 88, "x": 9, "var": "tabView", "skin": "ui/fullMyCenter/img_grzx_cy01.png" }, "child": [{ "type": "Image", "props": { "y": 88, "x": 0, "var": "tab1", "skin": "ui/fullMyCenter/img_grzx_cy02.png", "anchorY": 0.5 }, "child": [{ "type": "Image", "props": { "y": 30, "x": 58, "skin": "ui/fullMyCenter/img_grzx_cy03.png" } }] }, { "type": "Image", "props": { "y": 218, "x": 0, "var": "tab2", "skin": "ui/fullMyCenter/img_grzx_cy02.png", "anchorY": 0.5 }, "child": [{ "type": "Image", "props": { "y": 30, "x": 38, "skin": "ui/fullMyCenter/img_grzx_cy04.png" } }] }, { "type": "Image", "props": { "y": 347, "x": 0, "var": "tab3", "skin": "ui/fullMyCenter/img_grzx_cy02.png", "anchorY": 0.5 }, "child": [{ "type": "Image", "props": { "y": 30, "x": 38, "skin": "ui/fullMyCenter/img_grzx_cy05.png" } }] }, { "type": "Image", "props": { "y": 459, "x": -10, "var": "tabSelect", "skin": "ui/fullMyCenter/img_grzx_cy06.png", "anchorY": 0.5 }, "child": [{ "type": "Image", "props": { "y": 37, "var": "tabLabel", "skin": "ui/fullMyCenter/img_grzx_cy07.png", "centerX": -7 } }] }] }, { "type": "Image", "props": { "y": 130, "x": 288, "width": 712, "var": "yhkView", "skin": "ui/common/img_com_xiankuang.png", "height": 362, "sizeGrid": "15,15,15,16" }, "child": [{ "type": "Image", "props": { "y": 27, "x": 75, "skin": "ui/fullMyCenter/img_grzx_sr01.png" } }, { "type": "Image", "props": { "y": 95, "x": 56, "skin": "ui/fullMyCenter/img_grzx_sr02.png" } }, { "type": "Image", "props": { "y": 163, "x": 56, "skin": "ui/fullMyCenter/img_grzx_sr03.png" } }, { "type": "Image", "props": { "y": 231, "x": 56, "skin": "ui/fullMyCenter/img_grzx_sr04.png" } }, { "type": "Text", "props": { "y": 419, "x": 178, "width": 356, "var": "serviceInfo", "text": "如需修改银行卡信息，请联系客服", "height": 20, "fontSize": 18, "color": "#fff600", "align": "center" } }, { "type": "Image", "props": { "y": 429, "x": 358, "var": "openCardBtn", "skin": "ui/fullMyCenter/btn_grzx_qd01.png", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "TextInput", "props": { "y": 156, "x": 236, "width": 410, "var": "bankPos", "type": "text", "skin": "ui/res_login/img_dl_shurukuang04.png", "sizeGrid": "20,20,20,20", "rotation": 0, "restrict": "0123456789", "promptColor": "#93afc0", "prompt": "请选择银行", "padding": "-6,0,-2,20", "overflow": "hidden", "multiline": false, "maxChars": 21, "layoutEnabled": true, "height": 50, "fontSize": 30, "font": "Microsoft YaHei", "editable": true, "color": "#ffffff", "bold": false, "align": "left" } }, { "type": "Image", "props": { "y": 299, "x": 56, "skin": "ui/fullMyCenter/img_grzx_sr13.png" } }, { "type": "Image", "props": { "y": 292, "x": 237, "width": 410, "skin": "ui/res_login/img_dl_shurukuang04.png", "height": 50, "sizeGrid": "20,20,20,20" }, "child": [{ "type": "TextInput", "props": { "y": 2, "x": 15, "width": 340, "var": "cardPwd", "valign": "middle", "type": "password", "promptColor": "#93afc0", "prompt": "请输入提现密码(4位)", "maxChars": 4, "height": 46, "fontSize": 30, "color": "#ffffff" } }, { "type": "CheckBox", "props": { "y": 2, "x": 359, "var": "cardPwdLook", "stateNum": 2, "skin": "ui/common/check_see2.png", "selected": false } }] }, { "type": "Image", "props": { "y": 20, "x": 237, "width": 238, "skin": "ui/res_login/img_dl_shurukuang04.png", "height": 50, "sizeGrid": "20,20,20,20" }, "child": [{ "type": "TextInput", "props": { "y": 2, "x": 15, "width": 206, "var": "cardName", "valign": "middle", "type": "text", "promptColor": "#93afc0", "prompt": "请输入姓名", "height": 46, "fontSize": 30, "color": "#ffffff" } }] }, { "type": "Image", "props": { "y": 88, "x": 237, "width": 410, "skin": "ui/res_login/img_dl_shurukuang04.png", "height": 50, "sizeGrid": "20,20,20,20" }, "child": [{ "type": "TextInput", "props": { "y": 2, "x": 15, "width": 380, "var": "cardNum", "valign": "middle", "type": "text", "restrict": "0123456789", "promptColor": "#93afc0", "prompt": "最长支持21位银行卡", "height": 46, "fontSize": 30, "color": "#ffffff" } }] }, { "type": "Image", "props": { "y": 224, "x": 237, "width": 410, "skin": "ui/res_login/img_dl_shurukuang04.png", "height": 50, "sizeGrid": "20,20,20,20" }, "child": [{ "type": "TextInput", "props": { "y": 2, "x": 15, "width": 380, "var": "subBank", "valign": "middle", "type": "text", "promptColor": "#93afc0", "prompt": "请手动填写开户支行", "height": 46, "fontSize": 30, "color": "#ffffff" } }] }, { "type": "Image", "props": { "y": 45, "x": 567, "var": "setNameBtn", "skin": "ui/fullMyCenter/btn_grzx_xg01.png", "anchorY": 0.5, "anchorX": 0.5 } }] }] };
                return AccountInfoDlgUI;
            }(Dialog));
            center.AccountInfoDlgUI = AccountInfoDlgUI;
        })(center = dlg.center || (dlg.center = {}));
    })(dlg = ui.dlg || (ui.dlg = {}));
})(ui || (ui = {}));
(function (ui) {
    var dlg;
    (function (dlg) {
        var center;
        (function (center) {
            var BindAlipayDlgUI = /** @class */ (function (_super) {
                __extends(BindAlipayDlgUI, _super);
                function BindAlipayDlgUI() {
                    return _super.call(this) || this;
                }
                BindAlipayDlgUI.prototype.createChildren = function () {
                    _super.prototype.createChildren.call(this);
                    this.createView(ui.dlg.center.BindAlipayDlgUI.uiView);
                };
                BindAlipayDlgUI.uiView = { "type": "Dialog", "props": { "width": 754, "height": 480 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "skin": "ui/panel_common/mindlg.png" }, "child": [{ "type": "Image", "props": { "y": 22, "x": 265, "skin": "ui/fullMyCenter/img_grzx_bt09.png" } }, { "type": "Image", "props": { "y": 53, "x": 707, "var": "closeBtn", "skin": "ui/common/newclose.png", "anchorY": 0.5, "anchorX": 0.5 } }] }, { "type": "Image", "props": { "y": 104, "x": 32, "width": 690, "skin": "ui/fullMyCenter/img_com_xiankuang.png", "height": 272, "sizeGrid": "16,17,16,16" }, "child": [{ "type": "TextInput", "props": { "width": 410, "var": "accTxt", "type": "text", "top": 37, "skin": "ui/res_login/img_dl_shurukuang04.png", "sizeGrid": "20,20,20,20", "rotation": 0, "restrict": "0123456789", "promptColor": "#93afc0", "padding": "-6,0,-2,20", "overflow": "hidden", "multiline": false, "maxChars": 11, "left": 211, "layoutEnabled": true, "height": 50, "fontSize": 30, "font": "Microsoft YaHei", "editable": true, "color": "#93afc0", "bold": false, "align": "left" } }, { "type": "Label", "props": { "y": 173, "x": 42, "text": "注：请输入正确的支付宝账号，支付宝兑换是将直接转入支付宝账号。", "fontSize": 18, "color": "#fff600" } }, { "type": "Image", "props": { "y": 44, "x": 30, "skin": "ui/fullMyCenter/img_grzx_sr11.png" } }, { "type": "Image", "props": { "y": 112, "x": 30, "skin": "ui/fullMyCenter/img_grzx_sr12.png" } }, { "type": "TextInput", "props": { "width": 410, "var": "nameTxt", "type": "text", "top": 104, "skin": "ui/res_login/img_dl_shurukuang04.png", "sizeGrid": "20,20,20,20", "rotation": 0, "restrict": "0123456789", "promptColor": "#93afc0", "padding": "-6,0,-2,20", "overflow": "hidden", "multiline": false, "maxChars": 11, "left": 211, "layoutEnabled": true, "height": 50, "fontSize": 30, "font": "Microsoft YaHei", "editable": true, "color": "#93afc0", "bold": false, "align": "left" } }, { "type": "Label", "props": { "y": 204, "x": 42, "text": "提交后不可更改", "fontSize": 18, "color": "#ca1420" } }, { "type": "Label", "props": { "y": 234, "x": 42, "text": "注：请输入正确的支付宝实名制名字，否则无法转入该账号!", "fontSize": 18, "color": "#fff600" } }] }, { "type": "Image", "props": { "y": 425, "x": 377, "var": "cancelBtn", "skin": "ui/fullMyCenter/btn_grzx_bd02.png", "anchorY": 0.5, "anchorX": 0.5 } }] };
                return BindAlipayDlgUI;
            }(Dialog));
            center.BindAlipayDlgUI = BindAlipayDlgUI;
        })(center = dlg.center || (dlg.center = {}));
    })(dlg = ui.dlg || (ui.dlg = {}));
})(ui || (ui = {}));
(function (ui) {
    var dlg;
    (function (dlg) {
        var center;
        (function (center) {
            var BindPhoneDlgUI = /** @class */ (function (_super) {
                __extends(BindPhoneDlgUI, _super);
                function BindPhoneDlgUI() {
                    return _super.call(this) || this;
                }
                BindPhoneDlgUI.prototype.createChildren = function () {
                    View.regComponent("Text", laya.display.Text);
                    _super.prototype.createChildren.call(this);
                    this.createView(ui.dlg.center.BindPhoneDlgUI.uiView);
                };
                BindPhoneDlgUI.uiView = { "type": "Dialog", "props": { "width": 754, "height": 480 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "skin": "ui/panel_common/mindlg.png" }, "child": [{ "type": "Image", "props": { "y": 104, "x": 31, "width": 692, "skin": "ui/common/img_com_xiankuang.png", "height": 272, "sizeGrid": "15,15,15,16" } }, { "type": "Image", "props": { "y": 55, "x": 708, "var": "closeBtn", "skin": "ui/common/newclose.png", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 23, "x": 286, "skin": "ui/fullMyCenter/img_grzx_bt07.png" } }, { "type": "Image", "props": { "top": 148, "skin": "ui/res_login/img_dl_tianxie04.png", "left": 95 } }, { "type": "Image", "props": { "top": 239, "skin": "ui/res_login/img_dl_tianxie03.png", "left": 95 } }, { "type": "Image", "props": { "y": 255, "x": 551, "skin": "ui/res_login/btn_dl_yanzhengma02.png", "anchorY": 0.5, "anchorX": 0.5 }, "child": [{ "type": "Text", "props": { "y": 9, "x": 7, "width": 62, "var": "timeTxt", "text": "0", "fontSize": 36, "color": "#ffffff", "align": "center" } }] }, { "type": "Image", "props": { "y": 255, "x": 551, "var": "getCodeBtn", "skin": "ui/res_login/btn_dl_yanzhengma01.png", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 424, "x": 376, "var": "bindBtn", "skin": "ui/fullMyCenter/btn_grzx_bd02.png", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Text", "props": { "y": 318, "x": 199, "width": 356, "var": "awardTxt", "text": "绑定手机号后可获得 x 元奖励哦!", "height": 20, "fontSize": 18, "color": "#fff600", "align": "center" } }, { "type": "Image", "props": { "y": 139, "x": 229, "width": 410, "skin": "ui/res_login/img_dl_shurukuang04.png", "height": 50, "sizeGrid": "20,20,20,20" }, "child": [{ "type": "TextInput", "props": { "y": 2, "x": 15, "width": 380, "var": "numTxt", "valign": "middle", "type": "text", "restrict": "0123456789", "promptColor": "#93afc0", "prompt": "请输入可用手机号", "height": 46, "fontSize": 30, "color": "#ffffff" } }] }, { "type": "Image", "props": { "y": 230, "x": 229, "width": 196, "skin": "ui/res_login/img_dl_shurukuang04.png", "height": 50, "sizeGrid": "20,20,20,20" }, "child": [{ "type": "TextInput", "props": { "y": 2, "x": 15, "width": 169, "var": "codeTxt", "valign": "middle", "type": "text", "restrict": "0123456789", "promptColor": "#93afc0", "prompt": "请输验证码", "maxChars": 6, "height": 46, "fontSize": 30, "color": "#ffffff" } }] }] }] };
                return BindPhoneDlgUI;
            }(Dialog));
            center.BindPhoneDlgUI = BindPhoneDlgUI;
        })(center = dlg.center || (dlg.center = {}));
    })(dlg = ui.dlg || (ui.dlg = {}));
})(ui || (ui = {}));
(function (ui) {
    var dlg;
    (function (dlg) {
        var center;
        (function (center) {
            var SetHeadBorderDlgUI = /** @class */ (function (_super) {
                __extends(SetHeadBorderDlgUI, _super);
                function SetHeadBorderDlgUI() {
                    return _super.call(this) || this;
                }
                SetHeadBorderDlgUI.prototype.createChildren = function () {
                    _super.prototype.createChildren.call(this);
                    this.createView(ui.dlg.center.SetHeadBorderDlgUI.uiView);
                };
                SetHeadBorderDlgUI.uiView = { "type": "Dialog", "props": { "width": 1034, "height": 630 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "skin": "ui/panel_common/maxdlg.png" }, "child": [{ "type": "Image", "props": { "y": 19, "x": 405, "skin": "ui/fullMyCenter/img_grzx_bt04.png" } }, { "type": "Image", "props": { "y": 49, "x": 987, "var": "closeBtn", "skin": "ui/common/newclose.png", "anchorY": 0.5, "anchorX": 0.5 } }] }, { "type": "Image", "props": { "y": 158, "x": 95, "width": 160, "var": "headIcon", "height": 160 } }, { "type": "Image", "props": { "y": 152, "x": 85, "width": 180, "var": "borderIcon", "skin": "ui/userInfo/avatorFrame.png", "height": 180, "sizeGrid": "0,0,0,0" } }, { "type": "Image", "props": { "y": 474, "x": 174, "var": "changeBtn", "skin": "ui/fullMyCenter/btn_grzx_qd01.png", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 342, "x": 101, "skin": "ui/fullMyCenter/img_grzx_wz01.png" } }, { "type": "Image", "props": { "y": 105, "x": 329, "width": 680, "skin": "ui/fullMyCenter/img_com_xiankuang.png", "height": 502, "sizeGrid": "16,17,16,16" } }, { "type": "Panel", "props": { "y": 125, "x": 349, "width": 640, "var": "itemPanel", "height": 462 } }] };
                return SetHeadBorderDlgUI;
            }(Dialog));
            center.SetHeadBorderDlgUI = SetHeadBorderDlgUI;
        })(center = dlg.center || (dlg.center = {}));
    })(dlg = ui.dlg || (ui.dlg = {}));
})(ui || (ui = {}));
(function (ui) {
    var dlg;
    (function (dlg) {
        var center;
        (function (center) {
            var SetHeadDlgUI = /** @class */ (function (_super) {
                __extends(SetHeadDlgUI, _super);
                function SetHeadDlgUI() {
                    return _super.call(this) || this;
                }
                SetHeadDlgUI.prototype.createChildren = function () {
                    _super.prototype.createChildren.call(this);
                    this.createView(ui.dlg.center.SetHeadDlgUI.uiView);
                };
                SetHeadDlgUI.uiView = { "type": "Dialog", "props": { "width": 1034, "height": 630 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "skin": "ui/panel_common/maxdlg.png" }, "child": [{ "type": "Image", "props": { "y": 19, "x": 427, "skin": "ui/fullMyCenter/img_grzx_bt03.png" } }, { "type": "Image", "props": { "y": 49, "x": 987, "var": "closeBtn", "skin": "ui/common/newclose.png", "anchorY": 0.5, "anchorX": 0.5 } }] }, { "type": "Image", "props": { "y": 158, "x": 95, "width": 160, "var": "headIcon", "height": 160 } }, { "type": "Image", "props": { "y": 152, "x": 85, "width": 180, "var": "borderIcon", "skin": "ui/userInfo/avatorFrame.png", "height": 180, "sizeGrid": "0,0,0,0" } }, { "type": "Image", "props": { "y": 474, "x": 174, "var": "changeBtn", "skin": "ui/fullMyCenter/btn_grzx_qd01.png", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 342, "x": 101, "skin": "ui/fullMyCenter/img_grzx_wz01.png" } }, { "type": "Image", "props": { "y": 105, "x": 329, "width": 680, "var": "itembg", "skin": "ui/fullMyCenter/img_com_xiankuang.png", "height": 502, "sizeGrid": "16,17,16,16" } }, { "type": "Panel", "props": { "y": 125, "x": 349, "width": 640, "var": "itemPanel", "height": 462 } }] };
                return SetHeadDlgUI;
            }(Dialog));
            center.SetHeadDlgUI = SetHeadDlgUI;
        })(center = dlg.center || (dlg.center = {}));
    })(dlg = ui.dlg || (ui.dlg = {}));
})(ui || (ui = {}));
(function (ui) {
    var dlg;
    (function (dlg) {
        var center;
        (function (center) {
            var SetNickNameDlgUI = /** @class */ (function (_super) {
                __extends(SetNickNameDlgUI, _super);
                function SetNickNameDlgUI() {
                    return _super.call(this) || this;
                }
                SetNickNameDlgUI.prototype.createChildren = function () {
                    _super.prototype.createChildren.call(this);
                    this.createView(ui.dlg.center.SetNickNameDlgUI.uiView);
                };
                SetNickNameDlgUI.uiView = { "type": "Dialog", "props": { "width": 754, "height": 480 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "skin": "ui/panel_common/mindlg.png" }, "child": [{ "type": "Image", "props": { "y": 22, "x": 287, "skin": "ui/fullMyCenter/img_grzx_bt06.png" } }, { "type": "Image", "props": { "y": 53, "x": 707, "var": "closeBtn", "skin": "ui/common/newclose.png", "anchorY": 0.5, "anchorX": 0.5 } }] }, { "type": "Image", "props": { "y": 104, "x": 32, "width": 690, "skin": "ui/fullMyCenter/img_com_xiankuang.png", "height": 272, "sizeGrid": "16,17,16,16" }, "child": [{ "type": "Image", "props": { "y": 43, "x": 176, "skin": "ui/fullMyCenter/btn_grzx_wz04.png" } }, { "type": "TextInput", "props": { "y": 116, "x": 140, "width": 410, "var": "nickTxt", "type": "text", "top": 121, "skin": "ui/res_login/img_dl_shurukuang04.png", "sizeGrid": "20,20,20,20", "rotation": 0, "restrict": "0123456789", "promptColor": "#93afc0", "padding": "-6,0,-2,20", "overflow": "hidden", "multiline": false, "maxChars": 11, "left": 137, "layoutEnabled": true, "height": 50, "fontSize": 30, "font": "Microsoft YaHei", "editable": true, "color": "#93afc0", "bold": false, "align": "left" } }, { "type": "Label", "props": { "y": 202, "x": 229, "text": "每个账户只可修改一次昵称", "fontSize": 18, "color": "#fff600" } }] }, { "type": "Image", "props": { "y": 424, "x": 377, "var": "cancelBtn", "skin": "ui/fullMyCenter/btn_grzx_xg02.png", "anchorY": 0.5, "anchorX": 0.5 } }] };
                return SetNickNameDlgUI;
            }(Dialog));
            center.SetNickNameDlgUI = SetNickNameDlgUI;
        })(center = dlg.center || (dlg.center = {}));
    })(dlg = ui.dlg || (ui.dlg = {}));
})(ui || (ui = {}));
(function (ui) {
    var dlg;
    (function (dlg) {
        var center;
        (function (center) {
            var SetRealNameDlgUI = /** @class */ (function (_super) {
                __extends(SetRealNameDlgUI, _super);
                function SetRealNameDlgUI() {
                    return _super.call(this) || this;
                }
                SetRealNameDlgUI.prototype.createChildren = function () {
                    View.regComponent("Text", laya.display.Text);
                    _super.prototype.createChildren.call(this);
                    this.createView(ui.dlg.center.SetRealNameDlgUI.uiView);
                };
                SetRealNameDlgUI.uiView = { "type": "Dialog", "props": { "width": 754, "height": 480 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "skin": "ui/panel_common/mindlg.png" }, "child": [{ "type": "Image", "props": { "y": 25, "x": 256, "skin": "ui/fullMyCenter/img_grzx_bt.png" } }, { "type": "Image", "props": { "y": 54, "x": 709, "var": "closeBtn", "skin": "ui/common/newclose.png", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 107, "x": 31, "width": 692, "skin": "ui/common/img_com_xiankuang.png", "height": 272, "sizeGrid": "15,15,15,16" }, "child": [{ "type": "Image", "props": { "y": 118, "x": 50, "skin": "ui/fullMyCenter/img_grzx_sr.png" } }, { "type": "Image", "props": { "y": 110, "x": 212, "width": 411, "skin": "ui/res_login/img_dl_shurukuang04.png", "height": 50, "sizeGrid": "20,20,20,20" }, "child": [{ "type": "TextInput", "props": { "y": 2, "x": 15, "width": 376, "var": "nameTxt", "valign": "middle", "type": "text", "promptColor": "#93afc0", "height": 46, "fontSize": 30, "color": "#ffffff" } }] }, { "type": "Text", "props": { "y": 40, "x": 130, "width": 432, "text": "温馨提示：此姓名可能会影响您提现,请谨慎填写", "height": 20, "fontSize": 18, "color": "#fff600", "bold": true, "align": "center" } }, { "type": "Label", "props": { "y": 195, "x": 131, "text": "提交修改后,可联系客服火速处理", "height": 35, "fontSize": 30, "color": "#93afc0" } }] }, { "type": "Image", "props": { "y": 426, "x": 377, "var": "okBtn", "skin": "ui/fullMyCenter/btn_grzx_qd01.png", "anchorY": 0.5, "anchorX": 0.5 } }] }] };
                return SetRealNameDlgUI;
            }(Dialog));
            center.SetRealNameDlgUI = SetRealNameDlgUI;
        })(center = dlg.center || (dlg.center = {}));
    })(dlg = ui.dlg || (ui.dlg = {}));
})(ui || (ui = {}));
(function (ui) {
    var dlg;
    (function (dlg) {
        var FullMyCenterDlgUI = /** @class */ (function (_super) {
            __extends(FullMyCenterDlgUI, _super);
            function FullMyCenterDlgUI() {
                return _super.call(this) || this;
            }
            FullMyCenterDlgUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.dlg.FullMyCenterDlgUI.uiView);
            };
            FullMyCenterDlgUI.uiView = { "type": "Dialog", "props": { "width": 1334, "height": 750 }, "child": [{ "type": "Image", "props": { "skin": "ui/panel_common/img_com_quanping_di.jpg", "centerY": 0, "centerX": 0 } }, { "type": "Image", "props": { "y": 0, "skin": "ui/panel_common/img_com_quanping_ce_biaotou.png", "left": -48 }, "child": [{ "type": "Image", "props": { "y": 25, "x": 173, "skin": "ui/fullMyCenter/img_grzx_bt01.png" } }, { "type": "Image", "props": { "y": 20, "x": 62, "skin": "ui/fullMyCenter/img_grzx_bt02.png" } }] }, { "type": "Image", "props": { "y": 0, "var": "backBtn", "skin": "ui/common/img_com_quanping_guanbi01.png", "right": -55 }, "child": [{ "type": "Image", "props": { "y": 14, "x": 101, "skin": "ui/common/img_com_quanping_guanbi02.png" } }] }, { "type": "Box", "props": { "y": 139, "centerX": 0 }, "child": [{ "type": "Image", "props": { "y": 2, "skin": "ui/fullMyCenter/img_grzx_txd02.png" }, "child": [{ "type": "Image", "props": { "y": 71, "x": 110, "width": 112, "var": "headIcon", "height": 112 } }, { "type": "Image", "props": { "y": 67, "x": 104, "width": 124, "var": "borderIcon", "skin": "ui/userInfo/avatorFrame.png", "sizeGrid": "36,36,52,34", "height": 124 } }, { "type": "Image", "props": { "y": 264, "x": 167, "var": "setHeadBtn", "skin": "ui/fullMyCenter/btn_grzx_ghtx01.png", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 338, "x": 167, "var": "setBorderBtn", "skin": "ui/fullMyCenter/btn_grzx_ghtxk01.png", "gray": true, "anchorY": 0.5, "anchorX": 0.5 } }] }, { "type": "Image", "props": { "y": 478, "x": 152, "var": "accInfoBtn", "skin": "ui/fullMyCenter/btn_grzx_zhxx01.png" } }, { "type": "Image", "props": { "y": 478, "x": 874, "var": "backAccBtn", "skin": "ui/fullMyCenter/btn_grzx_tczh01.png" } }, { "type": "Image", "props": { "x": 347, "width": 606, "skin": "ui/fullMyCenter/img_com_xiankuang.png", "height": 448, "sizeGrid": "16,17,16,16" }, "child": [{ "type": "Image", "props": { "y": 32, "x": 31, "skin": "ui/fullMyCenter/img_grzx_zh01.png" } }, { "type": "Image", "props": { "y": 101, "x": 31, "skin": "ui/fullMyCenter/img_grzx_zh02.png" } }, { "type": "Image", "props": { "y": 171, "x": 31, "skin": "ui/fullMyCenter/img_grzx_zh03.png" } }, { "type": "Image", "props": { "y": 240, "x": 31, "skin": "ui/fullMyCenter/img_grzx_zh04.png" } }, { "type": "Image", "props": { "y": 310, "x": 31, "skin": "ui/fullMyCenter/img_grzx_zh05.png" } }, { "type": "Image", "props": { "y": 380, "x": 31, "skin": "ui/fullMyCenter/img_grzx_zh06.png" } }, { "type": "Label", "props": { "y": 30, "x": 175, "width": 216, "var": "accTxt", "valign": "middle", "height": 36, "fontSize": 36, "color": "#ffffff" } }, { "type": "Label", "props": { "y": 100, "x": 175, "width": 216, "var": "nickTxt", "valign": "middle", "text": "即将开放", "height": 36, "fontSize": 36, "color": "#ffffff" } }, { "type": "Label", "props": { "y": 170, "x": 175, "width": 396, "var": "moneyTxt", "valign": "middle", "height": 36, "fontSize": 36, "color": "#ffffff" } }, { "type": "Label", "props": { "y": 239, "x": 175, "width": 216, "var": "phoneTxt", "valign": "middle", "height": 36, "fontSize": 36, "color": "#ffffff" } }, { "type": "Label", "props": { "y": 309, "x": 175, "width": 216, "var": "wechatTxt", "valign": "middle", "text": "即将开放", "height": 36, "fontSize": 36, "color": "#ffffff" } }, { "type": "Label", "props": { "y": 379, "x": 175, "width": 216, "var": "alipayTxt", "valign": "middle", "text": "即将开放", "height": 36, "fontSize": 36, "color": "#ffffff" } }, { "type": "Image", "props": { "y": 254, "x": 494, "var": "bindPhoneBtn", "skin": "ui/fullMyCenter/btn_grzx_bd01.png", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 49, "x": 494, "var": "accCopyBtn", "skin": "ui/fullMyCenter/btn_grzx_fz01.png", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 116, "x": 494, "var": "setNickBtn", "skin": "ui/fullMyCenter/btn_grzx_xg01.png", "anchorY": 0.5, "anchorX": 0.5 } }] }, { "type": "Image", "props": { "x": 971, "width": 326, "skin": "ui/fullMyCenter/img_com_xiankuang.png", "height": 448, "sizeGrid": "16,17,16,16" }, "child": [{ "type": "Image", "props": { "y": 59, "x": 101, "skin": "ui/fullMyCenter/img_grzx_sz01.png" } }, { "type": "Image", "props": { "y": 169, "x": 25, "skin": "ui/fullMyCenter/img_grzx_sz02.png" } }, { "type": "Image", "props": { "y": 303, "x": 25, "skin": "ui/fullMyCenter/img_grzx_sz03.png" } }, { "type": "CheckBox", "props": { "y": 162, "x": 149, "var": "musicBtn", "skin": "ui/fullMyCenter/check_msc.png", "selected": false } }, { "type": "CheckBox", "props": { "y": 297, "x": 149, "var": "soundBtn", "skin": "ui/fullMyCenter/check_msc.png", "selected": false } }] }] }] };
            return FullMyCenterDlgUI;
        }(Dialog));
        dlg.FullMyCenterDlgUI = FullMyCenterDlgUI;
    })(dlg = ui.dlg || (ui.dlg = {}));
})(ui || (ui = {}));
(function (ui) {
    var dlg;
    (function (dlg) {
        var notice;
        (function (notice) {
            var NoticeMessageUI = /** @class */ (function (_super) {
                __extends(NoticeMessageUI, _super);
                function NoticeMessageUI() {
                    return _super.call(this) || this;
                }
                NoticeMessageUI.prototype.createChildren = function () {
                    _super.prototype.createChildren.call(this);
                    this.createView(ui.dlg.notice.NoticeMessageUI.uiView);
                };
                NoticeMessageUI.uiView = { "type": "View", "props": { "width": 1030, "height": 660 }, "child": [{ "type": "Image", "props": { "y": 35, "width": 925, "var": "message", "skin": "ui/panel_notice/message/bg_hdgg_kuang.png", "sizeGrid": "20,20,20,20", "height": 588, "centerX": 0 }, "child": [{ "type": "Image", "props": { "y": 16, "x": 171, "skin": "ui/panel_notice/message/img_hdgg_biaotikuang.png", "centerX": 0 } }, { "type": "Label", "props": { "y": 34, "x": 1, "width": 925, "text": "标题", "name": "title", "fontSize": 30, "font": "Microsoft YaHei", "color": "#ffba25", "centerX": -14, "align": "center" } }, { "type": "Label", "props": { "y": 88, "wordWrap": true, "width": 847, "text": "内容", "name": "content", "height": 431, "fontSize": 24, "font": "Microsoft YaHei", "color": "#b3d8e3", "centerX": 0, "align": "left" } }, { "type": "Label", "props": { "y": 530, "x": 30, "width": 868, "text": "日期", "name": "date", "height": 42, "fontSize": 24, "font": "Microsoft YaHei", "color": "#b3d8e3", "centerX": -14, "align": "right" } }] }, { "type": "Image", "props": { "y": 32, "width": 974, "var": "image", "height": 610, "centerX": 0 } }, { "type": "Image", "props": { "y": 5, "var": "frame", "skin": "ui/panel_notice/活动公告-静态活动_图框.png", "centerX": 0 } }] };
                return NoticeMessageUI;
            }(View));
            notice.NoticeMessageUI = NoticeMessageUI;
        })(notice = dlg.notice || (dlg.notice = {}));
    })(dlg = ui.dlg || (ui.dlg = {}));
})(ui || (ui = {}));
(function (ui) {
    var dlg;
    (function (dlg) {
        var notice;
        (function (notice) {
            var NoticeShareUI = /** @class */ (function (_super) {
                __extends(NoticeShareUI, _super);
                function NoticeShareUI() {
                    return _super.call(this) || this;
                }
                NoticeShareUI.prototype.createChildren = function () {
                    _super.prototype.createChildren.call(this);
                    this.createView(ui.dlg.notice.NoticeShareUI.uiView);
                };
                NoticeShareUI.uiView = { "type": "View", "props": { "width": 1030, "height": 660 }, "child": [{ "type": "Image", "props": { "y": 27, "x": 28, "width": 974, "var": "image", "height": 610 } }, { "type": "Image", "props": { "y": 420, "x": 148, "var": "friend_up", "skin": "ui/panel_notice/share/fasonggeipengyou_guan.png" } }, { "type": "Image", "props": { "y": 420, "x": 148, "var": "friend_down", "skin": "ui/panel_notice/share/fasongggeipengyou_kai.png" } }, { "type": "Image", "props": { "y": 420, "x": 300, "var": "circle_up", "skin": "ui/panel_notice/share/fenxiangpengyouquan_guan.png" } }, { "type": "Image", "props": { "y": 420, "x": 300, "var": "circle_down", "skin": "ui/panel_notice/share/fenxiangpengyouquan_kai.png" } }, { "type": "Image", "props": { "y": 0, "skin": "ui/panel_notice/活动公告-静态活动_图框.png", "centerX": 0 } }] };
                return NoticeShareUI;
            }(View));
            notice.NoticeShareUI = NoticeShareUI;
        })(notice = dlg.notice || (dlg.notice = {}));
    })(dlg = ui.dlg || (ui.dlg = {}));
})(ui || (ui = {}));
(function (ui) {
    var dlg;
    (function (dlg) {
        var notice;
        (function (notice) {
            var roulette;
            (function (roulette) {
                var NoticeRouletteUI = /** @class */ (function (_super) {
                    __extends(NoticeRouletteUI, _super);
                    function NoticeRouletteUI() {
                        return _super.call(this) || this;
                    }
                    NoticeRouletteUI.prototype.createChildren = function () {
                        View.regComponent("ui.dlg.notice.roulette.RouletteSilverUI", ui.dlg.notice.roulette.RouletteSilverUI);
                        View.regComponent("ui.dlg.notice.roulette.RouletteGoldUI", ui.dlg.notice.roulette.RouletteGoldUI);
                        View.regComponent("ui.dlg.notice.roulette.RouletteDiamondUI", ui.dlg.notice.roulette.RouletteDiamondUI);
                        View.regComponent("Text", laya.display.Text);
                        _super.prototype.createChildren.call(this);
                        this.createView(ui.dlg.notice.roulette.NoticeRouletteUI.uiView);
                    };
                    NoticeRouletteUI.uiView = { "type": "Dialog", "props": { "width": 1028, "height": 660 }, "child": [{ "type": "Image", "props": { "y": 28, "x": 556, "width": 457, "skin": "ui/panel_notice/roullette/ui_获奖_1-1.png", "sizeGrid": "20,20,20,20", "height": 240 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "skin": "ui/panel_notice/roullette/ui_活动_2.png" }, "child": [{ "type": "Label", "props": { "y": 12, "x": 152, "width": 293, "var": "remainingTime", "valign": "bottom", "text": "剩余时间", "height": 37, "fontSize": 32, "font": "Microsoft YaHei", "color": "#ffffff" } }] }, { "type": "Image", "props": { "y": 55, "x": 0, "skin": "ui/panel_notice/roullette/ui_活动_3.png" }, "child": [{ "type": "Label", "props": { "y": 12, "x": 2, "width": 454, "var": "date", "text": "剩余时间", "height": 37, "fontSize": 20, "font": "Microsoft YaHei", "color": "#ffba25", "align": "center" } }] }, { "type": "Label", "props": { "y": 104, "x": 14, "wordWrap": true, "width": 428, "var": "contents", "text": "活动内容...", "height": 125, "fontSize": 24, "font": "Microsoft YaHei", "color": "#b3d8e3" } }] }, { "type": "RouletteSilver", "props": { "y": 75, "x": 61, "var": "SpinnerSilver", "scaleY": 1.5, "scaleX": 1.5, "runtime": "ui.dlg.notice.roulette.RouletteSilverUI" } }, { "type": "RouletteGold", "props": { "y": 75, "x": 61, "var": "SpinnerGold", "scaleY": 1.5, "scaleX": 1.5, "runtime": "ui.dlg.notice.roulette.RouletteGoldUI" } }, { "type": "RouletteDiamond", "props": { "y": 75, "x": 61, "var": "SpinnerDiamond", "scaleY": 1.5, "scaleX": 1.5, "runtime": "ui.dlg.notice.roulette.RouletteDiamondUI" } }, { "type": "Image", "props": { "y": 295, "x": 556, "width": 457, "var": "list", "skin": "ui/panel_notice/roullette/ui_获奖_1-1.png", "sizeGrid": "20,20,20,20", "height": 350 }, "child": [{ "type": "Image", "props": { "y": -2, "x": 0, "skin": "ui/panel_notice/roullette/ui_获奖_3.png" } }, { "type": "Image", "props": { "y": -2, "x": 0, "var": "newtab", "skin": "ui/panel_notice/roullette/ui_获奖_4.png" } }, { "type": "Image", "props": { "y": -2, "x": 226, "var": "mytab", "skin": "ui/panel_notice/roullette/ui_获奖_5.png" } }, { "type": "Image", "props": { "y": 96, "x": 1, "width": 455, "skin": "ui/panel_notice/roullette/huojiang_tiaoxing_an.png", "height": 40 } }, { "type": "Image", "props": { "y": 177, "x": 1, "width": 455, "skin": "ui/panel_notice/roullette/huojiang_tiaoxing_an.png", "height": 40 } }, { "type": "Image", "props": { "y": 136, "x": 1, "width": 455, "skin": "ui/panel_notice/roullette/huojiang_tiaoxing_liang.png", "height": 40 } }, { "type": "Image", "props": { "y": 217, "x": 1, "width": 455, "skin": "ui/panel_notice/roullette/huojiang_tiaoxing_liang.png", "height": 40 } }, { "type": "Image", "props": { "y": 298, "x": 1, "width": 455, "skin": "ui/panel_notice/roullette/huojiang_tiaoxing_liang.png", "height": 40 } }, { "type": "Image", "props": { "y": 258, "x": 1, "width": 455, "skin": "ui/panel_notice/roullette/huojiang_tiaoxing_an.png", "height": 40 } }, { "type": "Image", "props": { "y": 55, "x": 1, "width": 455, "skin": "ui/panel_notice/roullette/huojiang_tiaoxing_liang.png", "height": 40 } }, { "type": "Image", "props": { "y": 55, "x": 1, "width": 455, "var": "bright", "skin": "ui/panel_notice/roullette/huojiang_tiaoxing_liang2.png", "height": 40 } }, { "type": "Sprite", "props": { "y": 55, "x": 14, "name": "list0" }, "child": [{ "type": "Label", "props": { "y": 0, "width": 158, "valign": "middle", "text": "12 月 12 日", "name": "date", "height": 40, "fontSize": 26, "font": "Microsoft YaHei", "color": "#b3d8e3", "align": "left" } }, { "type": "Label", "props": { "y": 0, "x": 154, "width": 113, "valign": "middle", "text": "轮盘等级", "name": "type", "height": 40, "fontSize": 26, "font": "Microsoft YaHei", "align": "center" } }, { "type": "Label", "props": { "y": 0, "x": 270, "width": 163, "valign": "middle", "text": 88888888, "name": "total", "height": 40, "fontSize": 26, "font": "Microsoft YaHei", "align": "center" } }] }, { "type": "Sprite", "props": { "y": 96, "x": 14, "name": "list1" }, "child": [{ "type": "Label", "props": { "y": 0, "width": 158, "valign": "middle", "text": "12 月 12 日", "name": "date", "height": 40, "fontSize": 26, "font": "Microsoft YaHei", "color": "#b3d8e3", "align": "left" } }, { "type": "Label", "props": { "y": 0, "x": 154, "width": 113, "valign": "middle", "text": "轮盘等级", "name": "type", "height": 40, "fontSize": 26, "font": "Microsoft YaHei", "align": "center" } }, { "type": "Label", "props": { "y": 0, "x": 270, "width": 163, "valign": "middle", "text": 88888888, "name": "total", "height": 40, "fontSize": 26, "font": "Microsoft YaHei", "align": "center" } }] }, { "type": "Sprite", "props": { "y": 137, "x": 14, "name": "list2" }, "child": [{ "type": "Label", "props": { "y": 0, "width": 158, "valign": "middle", "text": "12 月 12 日", "name": "date", "height": 40, "fontSize": 26, "font": "Microsoft YaHei", "color": "#b3d8e3", "align": "left" } }, { "type": "Label", "props": { "y": 0, "x": 154, "width": 113, "valign": "middle", "text": "轮盘等级", "name": "type", "height": 40, "fontSize": 26, "font": "Microsoft YaHei", "align": "center" } }, { "type": "Label", "props": { "y": 0, "x": 270, "width": 163, "valign": "middle", "text": 88888888, "name": "total", "height": 40, "fontSize": 26, "font": "Microsoft YaHei", "align": "center" } }] }, { "type": "Sprite", "props": { "y": 178, "x": 14, "name": "list3" }, "child": [{ "type": "Label", "props": { "y": 0, "width": 158, "valign": "middle", "text": "12 月 12 日", "name": "date", "height": 40, "fontSize": 26, "font": "Microsoft YaHei", "color": "#b3d8e3", "align": "left" } }, { "type": "Label", "props": { "y": 0, "x": 154, "width": 113, "valign": "middle", "text": "轮盘等级", "name": "type", "height": 40, "fontSize": 26, "font": "Microsoft YaHei", "align": "center" } }, { "type": "Label", "props": { "y": 0, "x": 270, "width": 163, "valign": "middle", "text": 88888888, "name": "total", "height": 40, "fontSize": 26, "font": "Microsoft YaHei", "align": "center" } }] }, { "type": "Sprite", "props": { "y": 218, "x": 14, "name": "list4" }, "child": [{ "type": "Label", "props": { "y": 0, "width": 158, "valign": "middle", "text": "12 月 12 日", "name": "date", "height": 40, "fontSize": 26, "font": "Microsoft YaHei", "color": "#b3d8e3", "align": "left" } }, { "type": "Label", "props": { "y": 0, "x": 154, "width": 113, "valign": "middle", "text": "轮盘等级", "name": "type", "height": 40, "fontSize": 26, "font": "Microsoft YaHei", "align": "center" } }, { "type": "Label", "props": { "y": 0, "x": 270, "width": 163, "valign": "middle", "text": 88888888, "name": "total", "height": 40, "fontSize": 26, "font": "Microsoft YaHei", "align": "center" } }] }, { "type": "Sprite", "props": { "y": 259, "x": 14, "name": "list5" }, "child": [{ "type": "Label", "props": { "y": 0, "width": 158, "valign": "middle", "text": "12 月 12 日", "name": "date", "height": 40, "fontSize": 26, "font": "Microsoft YaHei", "color": "#b3d8e3", "align": "left" } }, { "type": "Label", "props": { "y": 0, "x": 154, "width": 113, "valign": "middle", "text": "轮盘等级", "name": "type", "height": 40, "fontSize": 26, "font": "Microsoft YaHei", "align": "center" } }, { "type": "Label", "props": { "y": 0, "x": 270, "width": 163, "valign": "middle", "text": 88888888, "name": "total", "height": 40, "fontSize": 26, "font": "Microsoft YaHei", "align": "center" } }] }, { "type": "Sprite", "props": { "y": 300, "x": 14, "name": "list6" }, "child": [{ "type": "Label", "props": { "y": 0, "width": 158, "valign": "middle", "text": "12 月 12 日", "name": "date", "height": 40, "fontSize": 26, "font": "Microsoft YaHei", "color": "#b3d8e3", "align": "left" } }, { "type": "Label", "props": { "y": 0, "x": 154, "width": 113, "valign": "middle", "text": "轮盘等级", "name": "type", "height": 40, "fontSize": 26, "font": "Microsoft YaHei", "align": "center" } }, { "type": "Label", "props": { "y": 0, "x": 270, "width": 163, "valign": "middle", "text": 88888888, "name": "total", "height": 40, "fontSize": 26, "font": "Microsoft YaHei", "align": "center" } }] }] }, { "type": "Image", "props": { "y": 581, "x": 365, "var": "btnDiamond", "skin": "ui/panel_notice/roullette/按钮_轮盘_按_1.png" }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "skin": "ui/panel_notice/roullette/按钮_轮盘_1.png" } }] }, { "type": "Image", "props": { "y": 581, "x": 19, "var": "btnSilver", "skin": "ui/panel_notice/roullette/按钮_轮盘_按_2.png" }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "skin": "ui/panel_notice/roullette/按钮_轮盘_2.png" } }] }, { "type": "Image", "props": { "y": 581, "x": 192, "var": "btnGold", "skin": "ui/panel_notice/roullette/按钮_轮盘_按_3.png" }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "skin": "ui/panel_notice/roullette/按钮_轮盘_3.png" } }] }, { "type": "Text", "props": { "y": 26, "x": 19, "width": 102, "text": "当前积分:", "height": 42, "fontSize": 22, "font": "Microsoft YaHei", "color": "#b3d8e3", "align": "left" } }, { "type": "Text", "props": { "y": 26, "x": 120, "width": 200, "var": "currentPt", "text": 0, "height": 42, "fontSize": 22, "font": "Microsoft YaHei", "color": "#ffba25", "align": "left" } }, { "type": "Text", "props": { "y": 26, "x": 205, "width": 102, "text": "次日积分（今日投注）:", "height": 42, "fontSize": 22, "font": "Microsoft YaHei", "color": "#b3d8e3", "align": "left" } }, { "type": "Text", "props": { "y": 26, "x": 440, "width": 200, "var": "todayPt", "text": 0, "height": 42, "fontSize": 22, "font": "Microsoft YaHei", "color": "#ffba25", "align": "left" } }, { "type": "Text", "props": { "y": 533, "x": 23, "width": 102, "text": "注:", "height": 42, "fontSize": 22, "font": "Microsoft YaHei", "color": "#b3d8e3", "align": "left" } }, { "type": "Text", "props": { "y": 533, "x": 65, "width": 102, "var": "perPt", "text": "* 积分一次", "height": 42, "fontSize": 22, "font": "Microsoft YaHei", "color": "#b3d8e3", "align": "left" } }] };
                    return NoticeRouletteUI;
                }(Dialog));
                roulette.NoticeRouletteUI = NoticeRouletteUI;
            })(roulette = notice.roulette || (notice.roulette = {}));
        })(notice = dlg.notice || (dlg.notice = {}));
    })(dlg = ui.dlg || (ui.dlg = {}));
})(ui || (ui = {}));
(function (ui) {
    var dlg;
    (function (dlg) {
        var notice;
        (function (notice) {
            var roulette;
            (function (roulette) {
                var RouletteDiamondUI = /** @class */ (function (_super) {
                    __extends(RouletteDiamondUI, _super);
                    function RouletteDiamondUI() {
                        return _super.call(this) || this;
                    }
                    RouletteDiamondUI.prototype.createChildren = function () {
                        View.regComponent("Text", laya.display.Text);
                        _super.prototype.createChildren.call(this);
                        this.createView(ui.dlg.notice.roulette.RouletteDiamondUI.uiView);
                    };
                    RouletteDiamondUI.uiView = { "type": "View", "props": { "width": 290, "height": 320 }, "child": [{ "type": "Image", "props": { "y": 171, "x": 145, "var": "spinnerbg", "skin": "ui/panel_notice/roullette/spinner/lunpanquan.png", "pivotY": 106, "pivotX": 106, "centerY": 11, "centerX": 0 }, "child": [{ "type": "Text", "props": { "y": 107, "x": 106, "width": 42, "text": 999999, "strokeColor": "#4b9a94", "stroke": 2, "pivotY": 93, "pivotX": 21, "name": "amount0", "height": 12, "color": "#ffffff", "align": "center" } }, { "type": "Text", "props": { "y": 107, "x": 106, "width": 42, "text": 999999, "strokeColor": "#4b9a94", "stroke": 2, "rotation": 45, "pivotY": 93, "pivotX": 21, "name": "amount1", "height": 12, "color": "#ffffff", "align": "center" } }, { "type": "Text", "props": { "y": 107, "x": 106, "width": 42, "text": 999999, "strokeColor": "#4b9a94", "stroke": 2, "rotation": 90, "pivotY": 93, "pivotX": 21, "name": "amount2", "height": 12, "color": "#ffffff", "align": "center" } }, { "type": "Text", "props": { "y": 107, "x": 106, "width": 42, "text": 999999, "strokeColor": "#4b9a94", "stroke": 2, "rotation": 135, "pivotY": 93, "pivotX": 21, "name": "amount3", "height": 12, "color": "#ffffff", "align": "center" } }, { "type": "Text", "props": { "y": 107, "x": 106, "width": 42, "text": 999999, "strokeColor": "#4b9a94", "stroke": 2, "rotation": 180, "pivotY": 93, "pivotX": 21, "name": "amount4", "height": 12, "color": "#ffffff", "align": "center" } }, { "type": "Text", "props": { "y": 107, "x": 106, "width": 42, "text": 999999, "strokeColor": "#4b9a94", "stroke": 2, "rotation": 225, "pivotY": 93, "pivotX": 21, "name": "amount5", "height": 12, "color": "#ffffff", "align": "center" } }, { "type": "Text", "props": { "y": 107, "x": 106, "width": 42, "text": 999999, "strokeColor": "#4b9a94", "stroke": 2, "rotation": 270, "pivotY": 93, "pivotX": 21, "name": "amount6", "height": 12, "color": "#ffffff", "align": "center" } }, { "type": "Text", "props": { "y": 107, "x": 106, "width": 42, "text": 999999, "strokeColor": "#4b9a94", "stroke": 2, "rotation": 315, "pivotY": 93, "pivotX": 21, "name": "amount7", "height": 12, "color": "#ffffff", "align": "center" } }] }, { "type": "Image", "props": { "y": 82, "x": 112, "var": "light", "skin": "ui/panel_notice/roullette/spinner/wheel-light.png" } }, { "type": "Image", "props": { "var": "spinner", "skin": "ui/panel_notice/roullette/spinner/lunpan_zuanshi_dipan.png", "centerY": -2, "centerX": -1 }, "child": [{ "type": "Image", "props": { "y": 105, "x": 130, "skin": "ui/panel_notice/roullette/spinner/lunpan_zuanshi_jiantou.png", "name": "arrow" } }, { "type": "Image", "props": { "y": 137, "x": 106, "var": "btn_down", "skin": "ui/panel_notice/roullette/spinner/lunpan_zuanshi_anjian_hou.png" } }, { "type": "Image", "props": { "y": 137, "x": 106, "var": "btn_up", "skin": "ui/panel_notice/roullette/spinner/lunpan_zuanshi_anjian_qian.png" } }] }, { "type": "Image", "props": { "y": 57, "x": 137, "var": "light0", "skin": "ui/panel_notice/roullette/spinner/paomadeng_deng.png" }, "child": [{ "type": "Image", "props": { "y": 31, "x": 76, "skin": "ui/panel_notice/roullette/spinner/paomadeng_deng.png" } }, { "type": "Image", "props": { "y": 106, "x": 105, "skin": "ui/panel_notice/roullette/spinner/paomadeng_deng.png" } }, { "type": "Image", "props": { "y": 181, "x": 74, "skin": "ui/panel_notice/roullette/spinner/paomadeng_deng.png" } }, { "type": "Image", "props": { "y": 212, "x": -2, "skin": "ui/panel_notice/roullette/spinner/paomadeng_deng.png" } }, { "type": "Image", "props": { "y": 181, "x": -76, "skin": "ui/panel_notice/roullette/spinner/paomadeng_deng.png" } }, { "type": "Image", "props": { "y": 105, "x": -107, "skin": "ui/panel_notice/roullette/spinner/paomadeng_deng.png" } }, { "type": "Image", "props": { "y": 30, "x": -76, "skin": "ui/panel_notice/roullette/spinner/paomadeng_deng.png" } }] }, { "type": "Image", "props": { "y": 119, "x": 247, "var": "light1", "skin": "ui/panel_notice/roullette/spinner/paomadeng_deng.png", "rotation": 67 }, "child": [{ "type": "Image", "props": { "y": 31, "x": 76, "skin": "ui/panel_notice/roullette/spinner/paomadeng_deng.png" } }, { "type": "Image", "props": { "y": 106, "x": 105, "skin": "ui/panel_notice/roullette/spinner/paomadeng_deng.png" } }, { "type": "Image", "props": { "y": 181, "x": 74, "skin": "ui/panel_notice/roullette/spinner/paomadeng_deng.png" } }, { "type": "Image", "props": { "y": 212, "x": -2, "skin": "ui/panel_notice/roullette/spinner/paomadeng_deng.png" } }, { "type": "Image", "props": { "y": 181, "x": -76, "skin": "ui/panel_notice/roullette/spinner/paomadeng_deng.png" } }, { "type": "Image", "props": { "y": 105, "x": -107, "skin": "ui/panel_notice/roullette/spinner/paomadeng_deng.png" } }, { "type": "Image", "props": { "y": 30, "x": -76, "skin": "ui/panel_notice/roullette/spinner/paomadeng_deng.png" } }] }] };
                    return RouletteDiamondUI;
                }(View));
                roulette.RouletteDiamondUI = RouletteDiamondUI;
            })(roulette = notice.roulette || (notice.roulette = {}));
        })(notice = dlg.notice || (dlg.notice = {}));
    })(dlg = ui.dlg || (ui.dlg = {}));
})(ui || (ui = {}));
(function (ui) {
    var dlg;
    (function (dlg) {
        var notice;
        (function (notice) {
            var roulette;
            (function (roulette) {
                var RouletteGoldUI = /** @class */ (function (_super) {
                    __extends(RouletteGoldUI, _super);
                    function RouletteGoldUI() {
                        return _super.call(this) || this;
                    }
                    RouletteGoldUI.prototype.createChildren = function () {
                        View.regComponent("Text", laya.display.Text);
                        _super.prototype.createChildren.call(this);
                        this.createView(ui.dlg.notice.roulette.RouletteGoldUI.uiView);
                    };
                    RouletteGoldUI.uiView = { "type": "View", "props": { "width": 290, "height": 320 }, "child": [{ "type": "Image", "props": { "y": 171, "x": 145, "var": "spinnerbg", "skin": "ui/panel_notice/roullette/spinner/lunpanquan.png", "pivotY": 106, "pivotX": 106, "centerY": 11, "centerX": 0 }, "child": [{ "type": "Text", "props": { "y": 107, "x": 106, "width": 42, "text": 999999, "strokeColor": "#4b9a94", "stroke": 2, "pivotY": 93, "pivotX": 21, "name": "amount0", "height": 12, "color": "#ffffff", "align": "center" } }, { "type": "Text", "props": { "y": 107, "x": 106, "width": 42, "text": 999999, "strokeColor": "#4b9a94", "stroke": 2, "rotation": 45, "pivotY": 93, "pivotX": 21, "name": "amount1", "height": 12, "color": "#ffffff", "align": "center" } }, { "type": "Text", "props": { "y": 107, "x": 106, "width": 42, "text": 999999, "strokeColor": "#4b9a94", "stroke": 2, "rotation": 90, "pivotY": 93, "pivotX": 21, "name": "amount2", "height": 12, "color": "#ffffff", "align": "center" } }, { "type": "Text", "props": { "y": 107, "x": 106, "width": 42, "text": 999999, "strokeColor": "#4b9a94", "stroke": 2, "rotation": 135, "pivotY": 93, "pivotX": 21, "name": "amount3", "height": 12, "color": "#ffffff", "align": "center" } }, { "type": "Text", "props": { "y": 107, "x": 106, "width": 42, "text": 999999, "strokeColor": "#4b9a94", "stroke": 2, "rotation": 180, "pivotY": 93, "pivotX": 21, "name": "amount4", "height": 12, "color": "#ffffff", "align": "center" } }, { "type": "Text", "props": { "y": 107, "x": 106, "width": 42, "text": 999999, "strokeColor": "#4b9a94", "stroke": 2, "rotation": 225, "pivotY": 93, "pivotX": 21, "name": "amount5", "height": 12, "color": "#ffffff", "align": "center" } }, { "type": "Text", "props": { "y": 107, "x": 106, "width": 42, "text": 999999, "strokeColor": "#4b9a94", "stroke": 2, "rotation": 270, "pivotY": 93, "pivotX": 21, "name": "amount6", "height": 12, "color": "#ffffff", "align": "center" } }, { "type": "Text", "props": { "y": 107, "x": 106, "width": 42, "text": 999999, "strokeColor": "#4b9a94", "stroke": 2, "rotation": 315, "pivotY": 93, "pivotX": 21, "name": "amount7", "height": 12, "color": "#ffffff", "align": "center" } }] }, { "type": "Image", "props": { "y": 82, "x": 112, "var": "light", "skin": "ui/panel_notice/roullette/spinner/wheel-light.png" } }, { "type": "Image", "props": { "var": "spinner", "skin": "ui/panel_notice/roullette/spinner/lunpan_jin_dipan.png", "centerY": -1, "centerX": 0 }, "child": [{ "type": "Image", "props": { "y": 102, "x": 126, "skin": "ui/panel_notice/roullette/spinner/lunpan_jin_jiantou.png", "name": "arrow" } }, { "type": "Image", "props": { "y": 134, "x": 102, "var": "btn_down", "skin": "ui/panel_notice/roullette/spinner/lunpan_jin_anjian_hou.png" } }, { "type": "Image", "props": { "y": 134, "x": 102, "var": "btn_up", "skin": "ui/panel_notice/roullette/spinner/lunpan_jin_anjian_qian.png" } }] }, { "type": "Image", "props": { "y": 57, "x": 137, "var": "light0", "skin": "ui/panel_notice/roullette/spinner/paomadeng_deng.png" }, "child": [{ "type": "Image", "props": { "y": 31, "x": 76, "skin": "ui/panel_notice/roullette/spinner/paomadeng_deng.png" } }, { "type": "Image", "props": { "y": 106, "x": 105, "skin": "ui/panel_notice/roullette/spinner/paomadeng_deng.png" } }, { "type": "Image", "props": { "y": 181, "x": 74, "skin": "ui/panel_notice/roullette/spinner/paomadeng_deng.png" } }, { "type": "Image", "props": { "y": 212, "x": -2, "skin": "ui/panel_notice/roullette/spinner/paomadeng_deng.png" } }, { "type": "Image", "props": { "y": 181, "x": -76, "skin": "ui/panel_notice/roullette/spinner/paomadeng_deng.png" } }, { "type": "Image", "props": { "y": 105, "x": -107, "skin": "ui/panel_notice/roullette/spinner/paomadeng_deng.png" } }, { "type": "Image", "props": { "y": 30, "x": -76, "skin": "ui/panel_notice/roullette/spinner/paomadeng_deng.png" } }] }, { "type": "Image", "props": { "y": 119, "x": 247, "var": "light1", "skin": "ui/panel_notice/roullette/spinner/paomadeng_deng.png", "rotation": 67 }, "child": [{ "type": "Image", "props": { "y": 31, "x": 76, "skin": "ui/panel_notice/roullette/spinner/paomadeng_deng.png" } }, { "type": "Image", "props": { "y": 106, "x": 105, "skin": "ui/panel_notice/roullette/spinner/paomadeng_deng.png" } }, { "type": "Image", "props": { "y": 181, "x": 74, "skin": "ui/panel_notice/roullette/spinner/paomadeng_deng.png" } }, { "type": "Image", "props": { "y": 212, "x": -2, "skin": "ui/panel_notice/roullette/spinner/paomadeng_deng.png" } }, { "type": "Image", "props": { "y": 181, "x": -76, "skin": "ui/panel_notice/roullette/spinner/paomadeng_deng.png" } }, { "type": "Image", "props": { "y": 105, "x": -107, "skin": "ui/panel_notice/roullette/spinner/paomadeng_deng.png" } }, { "type": "Image", "props": { "y": 30, "x": -76, "skin": "ui/panel_notice/roullette/spinner/paomadeng_deng.png" } }] }] };
                    return RouletteGoldUI;
                }(View));
                roulette.RouletteGoldUI = RouletteGoldUI;
            })(roulette = notice.roulette || (notice.roulette = {}));
        })(notice = dlg.notice || (dlg.notice = {}));
    })(dlg = ui.dlg || (ui.dlg = {}));
})(ui || (ui = {}));
(function (ui) {
    var dlg;
    (function (dlg) {
        var notice;
        (function (notice) {
            var roulette;
            (function (roulette) {
                var RouletteSilverUI = /** @class */ (function (_super) {
                    __extends(RouletteSilverUI, _super);
                    function RouletteSilverUI() {
                        return _super.call(this) || this;
                    }
                    RouletteSilverUI.prototype.createChildren = function () {
                        View.regComponent("Text", laya.display.Text);
                        _super.prototype.createChildren.call(this);
                        this.createView(ui.dlg.notice.roulette.RouletteSilverUI.uiView);
                    };
                    RouletteSilverUI.uiView = { "type": "View", "props": { "width": 290, "height": 320 }, "child": [{ "type": "Image", "props": { "y": 171, "x": 145, "var": "spinnerbg", "skin": "ui/panel_notice/roullette/spinner/lunpanquan.png", "pivotY": 106, "pivotX": 106, "centerY": 11, "centerX": 0 }, "child": [{ "type": "Text", "props": { "y": 107, "x": 106, "width": 42, "text": 999999, "strokeColor": "#4b9a94", "stroke": 2, "pivotY": 93, "pivotX": 21, "name": "amount0", "height": 12, "color": "#ffffff", "align": "center" } }, { "type": "Text", "props": { "y": 107, "x": 106, "width": 42, "text": 999999, "strokeColor": "#4b9a94", "stroke": 2, "rotation": 45, "pivotY": 93, "pivotX": 21, "name": "amount1", "height": 12, "color": "#ffffff", "align": "center" } }, { "type": "Text", "props": { "y": 107, "x": 106, "width": 42, "text": 999999, "strokeColor": "#4b9a94", "stroke": 2, "rotation": 90, "pivotY": 93, "pivotX": 21, "name": "amount2", "height": 12, "color": "#ffffff", "align": "center" } }, { "type": "Text", "props": { "y": 107, "x": 106, "width": 42, "text": 999999, "strokeColor": "#4b9a94", "stroke": 2, "rotation": 135, "pivotY": 93, "pivotX": 21, "name": "amount3", "height": 12, "color": "#ffffff", "align": "center" } }, { "type": "Text", "props": { "y": 107, "x": 106, "width": 42, "text": 999999, "strokeColor": "#4b9a94", "stroke": 2, "rotation": 180, "pivotY": 93, "pivotX": 21, "name": "amount4", "height": 12, "color": "#ffffff", "align": "center" } }, { "type": "Text", "props": { "y": 107, "x": 106, "width": 42, "text": 999999, "strokeColor": "#4b9a94", "stroke": 2, "rotation": 225, "pivotY": 93, "pivotX": 21, "name": "amount5", "height": 12, "color": "#ffffff", "align": "center" } }, { "type": "Text", "props": { "y": 107, "x": 106, "width": 42, "text": 999999, "strokeColor": "#4b9a94", "stroke": 2, "rotation": 270, "pivotY": 93, "pivotX": 21, "name": "amount6", "height": 12, "color": "#ffffff", "align": "center" } }, { "type": "Text", "props": { "y": 107, "x": 106, "width": 42, "text": 999999, "strokeColor": "#4b9a94", "stroke": 2, "rotation": 315, "pivotY": 93, "pivotX": 21, "name": "amount7", "height": 12, "color": "#ffffff", "align": "center" } }] }, { "type": "Image", "props": { "y": 82, "x": 112, "var": "light", "skin": "ui/panel_notice/roullette/spinner/wheel-light.png" } }, { "type": "Image", "props": { "var": "spinner", "skin": "ui/panel_notice/roullette/spinner/lunpan_yin_dipan.png", "centerY": 0, "centerX": 0 }, "child": [{ "type": "Image", "props": { "y": 101, "x": 126, "skin": "ui/panel_notice/roullette/spinner/lunpan_yin_jiantou.png", "name": "arrow" } }, { "type": "Image", "props": { "y": 133, "x": 102, "var": "btn_down", "skin": "ui/panel_notice/roullette/spinner/lunpan_yin_anjian_hou.png" } }, { "type": "Image", "props": { "y": 133, "x": 102, "var": "btn_up", "skin": "ui/panel_notice/roullette/spinner/lunpan_yin_anjian_qian.png" } }] }, { "type": "Image", "props": { "y": 57, "x": 137, "var": "light0", "skin": "ui/panel_notice/roullette/spinner/paomadeng_deng.png" }, "child": [{ "type": "Image", "props": { "y": 31, "x": 76, "skin": "ui/panel_notice/roullette/spinner/paomadeng_deng.png" } }, { "type": "Image", "props": { "y": 106, "x": 105, "skin": "ui/panel_notice/roullette/spinner/paomadeng_deng.png" } }, { "type": "Image", "props": { "y": 181, "x": 74, "skin": "ui/panel_notice/roullette/spinner/paomadeng_deng.png" } }, { "type": "Image", "props": { "y": 212, "x": -2, "skin": "ui/panel_notice/roullette/spinner/paomadeng_deng.png" } }, { "type": "Image", "props": { "y": 181, "x": -76, "skin": "ui/panel_notice/roullette/spinner/paomadeng_deng.png" } }, { "type": "Image", "props": { "y": 105, "x": -107, "skin": "ui/panel_notice/roullette/spinner/paomadeng_deng.png" } }, { "type": "Image", "props": { "y": 30, "x": -76, "skin": "ui/panel_notice/roullette/spinner/paomadeng_deng.png" } }] }, { "type": "Image", "props": { "y": 119, "x": 247, "var": "light1", "skin": "ui/panel_notice/roullette/spinner/paomadeng_deng.png", "rotation": 67 }, "child": [{ "type": "Image", "props": { "y": 31, "x": 76, "skin": "ui/panel_notice/roullette/spinner/paomadeng_deng.png" } }, { "type": "Image", "props": { "y": 106, "x": 105, "skin": "ui/panel_notice/roullette/spinner/paomadeng_deng.png" } }, { "type": "Image", "props": { "y": 181, "x": 74, "skin": "ui/panel_notice/roullette/spinner/paomadeng_deng.png" } }, { "type": "Image", "props": { "y": 212, "x": -2, "skin": "ui/panel_notice/roullette/spinner/paomadeng_deng.png" } }, { "type": "Image", "props": { "y": 181, "x": -76, "skin": "ui/panel_notice/roullette/spinner/paomadeng_deng.png" } }, { "type": "Image", "props": { "y": 105, "x": -107, "skin": "ui/panel_notice/roullette/spinner/paomadeng_deng.png" } }, { "type": "Image", "props": { "y": 30, "x": -76, "skin": "ui/panel_notice/roullette/spinner/paomadeng_deng.png" } }] }] };
                    return RouletteSilverUI;
                }(View));
                roulette.RouletteSilverUI = RouletteSilverUI;
            })(roulette = notice.roulette || (notice.roulette = {}));
        })(notice = dlg.notice || (dlg.notice = {}));
    })(dlg = ui.dlg || (ui.dlg = {}));
})(ui || (ui = {}));
(function (ui) {
    var dlg;
    (function (dlg) {
        var NoticeDlgUI = /** @class */ (function (_super) {
            __extends(NoticeDlgUI, _super);
            function NoticeDlgUI() {
                return _super.call(this) || this;
            }
            NoticeDlgUI.prototype.createChildren = function () {
                View.regComponent("Text", laya.display.Text);
                _super.prototype.createChildren.call(this);
                this.createView(ui.dlg.NoticeDlgUI.uiView);
            };
            NoticeDlgUI.uiView = { "type": "Dialog", "props": { "width": 1624, "height": 750 }, "child": [{ "type": "Image", "props": { "skin": "ui/panel_common/img_com_quanping_di.jpg", "centerY": 0, "centerX": 0 } }, { "type": "View", "props": { "y": 88, "x": 402, "width": 1030, "var": "contents", "height": 660, "centerY": 43 } }, { "type": "Image", "props": { "y": 85, "var": "contentList", "skin": "ui/panel_common/img_com_quanping_cedi.png" }, "child": [{ "type": "Sprite", "props": { "y": 23, "x": 0, "width": 306, "var": "content_tabs", "height": 642 }, "child": [{ "type": "Image", "props": { "x": 305, "var": "tab_dummy", "skin": "ui/panel_common/img_com_quanping_ce_di.png", "pivotX": 305, "name": "tab_dummy" }, "child": [{ "type": "Label", "props": { "wordWrap": true, "width": 304, "valign": "middle", "text": "公告讯息", "name": "label", "height": 95, "fontSize": 28, "font": "Microsoft YaHei", "color": "#b3d8e3", "align": "center" } }, { "type": "Image", "props": { "y": -7, "x": 0, "skin": "ui/panel_common/img_com_quanping_ce_xuanzhong.png", "name": "tab_on" }, "child": [{ "type": "Label", "props": { "y": 8, "x": 0, "wordWrap": true, "width": 304, "valign": "middle", "text": "公告讯息", "name": "label", "height": 95, "fontSize": 28, "font": "Microsoft YaHei", "color": "#ffffff", "align": "center" } }] }, { "type": "Image", "props": { "y": 9, "x": 278, "skin": "ui/panel_notice/markNew.png", "name": "newInd" } }] }] }, { "type": "Image", "props": { "y": 631, "x": 135, "var": "arrow", "skin": "ui/panel_notice/arrowBtns.png" } }] }, { "type": "Image", "props": { "width": 482, "var": "label", "skin": "ui/panel_common/img_com_quanping_ce_biaotou.png" }, "child": [{ "type": "Image", "props": { "y": 16, "x": 70, "skin": "ui/panel_notice/img_hd_bt01.png" } }, { "type": "Image", "props": { "y": 27, "x": 171, "skin": "ui/panel_notice/img_hdzx_hdzx.png" } }] }, { "type": "Image", "props": { "y": 10, "var": "tabs", "skin": "ui/panel_notice/按钮_公告_1.png", "centerX": 78 }, "child": [{ "type": "Image", "props": { "var": "tab_notice", "skin": "ui/panel_notice/按钮_公告_2.png" } }, { "type": "Image", "props": { "y": 0, "x": 231, "var": "tab_game", "skin": "ui/panel_notice/按钮_公告_3.png" } }, { "type": "Image", "props": { "y": 21, "x": 218, "var": "notice_counter", "skin": "ui/panel_notice/markNew.png", "sizeGrid": "11,11,11,11" }, "child": [{ "type": "Text", "props": { "y": 2, "x": 6, "name": "label", "fontSize": 18, "color": "#ffffff", "align": "left" } }] }, { "type": "Image", "props": { "y": 21, "x": 467, "var": "game_counter", "skin": "ui/panel_notice/markNew.png", "sizeGrid": "11,11,11,11" }, "child": [{ "type": "Text", "props": { "y": 2, "x": 6, "name": "label", "fontSize": 18, "color": "#ffffff", "align": "left" } }] }] }, { "type": "Image", "props": { "y": 2, "x": 1624, "width": 292, "var": "controls", "skin": "ui/common/img_com_quanping_guanbi01.png", "pivotX": 292 }, "child": [{ "type": "Image", "props": { "y": 12, "x": 123, "skin": "ui/common/img_com_quanping_guanbi02.png" } }] }] };
            return NoticeDlgUI;
        }(Dialog));
        dlg.NoticeDlgUI = NoticeDlgUI;
    })(dlg = ui.dlg || (ui.dlg = {}));
})(ui || (ui = {}));
(function (ui) {
    var dlg;
    (function (dlg) {
        var pop;
        (function (pop) {
            var CommissionRecordsUI = /** @class */ (function (_super) {
                __extends(CommissionRecordsUI, _super);
                function CommissionRecordsUI() {
                    return _super.call(this) || this;
                }
                CommissionRecordsUI.prototype.createChildren = function () {
                    _super.prototype.createChildren.call(this);
                    this.createView(ui.dlg.pop.CommissionRecordsUI.uiView);
                };
                CommissionRecordsUI.uiView = { "type": "Dialog", "props": { "width": 1034, "height": 630 }, "child": [{ "type": "Image", "props": { "skin": "ui/dialogs/commission/img_com_tankuang01.png" } }, { "type": "Image", "props": { "y": 18, "skin": "ui/dialogs/commission/img_tyjl_tyjl.png", "centerX": 8 } }, { "type": "Image", "props": { "y": 99, "width": 970, "skin": "ui/dialogs/commission/img_com_xiankuang.png", "sizeGrid": "10,10,10,10", "height": 425, "centerX": 0 } }, { "type": "Image", "props": { "y": 109, "var": "order_dummy", "skin": "ui/dialogs/commission/img_tyjl_kuang.png", "centerX": 0 }, "child": [{ "type": "Image", "props": { "y": 11, "x": 435, "skin": "ui/panel_agent/img_daili_fuzhi.png", "name": "copy" } }, { "type": "Label", "props": { "y": 10, "x": 35, "width": 150, "valign": "middle", "text": "订单号：", "name": "orderlabel", "height": 35, "fontSize": 26, "font": "Microsoft YaHei", "color": "#f9cb46", "align": "right" } }, { "type": "Label", "props": { "y": 10, "x": 188, "width": 279, "valign": "middle", "text": "-", "name": "order", "height": 35, "fontSize": 24, "color": "#9cc5d8" } }, { "type": "Label", "props": { "y": 49, "x": 35, "width": 150, "valign": "middle", "text": "创建时间：", "name": "timelabel", "height": 35, "fontSize": 26, "font": "Microsoft YaHei", "color": "#f9cb46", "align": "right" } }, { "type": "Label", "props": { "y": 49, "x": 188, "width": 279, "valign": "middle", "text": "-", "name": "time", "height": 35, "fontSize": 24, "color": "#9cc5d8" } }, { "type": "Label", "props": { "y": 14, "x": 700, "width": 114, "text": "状态：", "name": "statuslabel", "height": 35, "fontSize": 26, "font": "Microsoft YaHei", "color": "#f9cb46", "align": "right" } }, { "type": "Label", "props": { "y": 14, "x": 803, "width": 85, "text": "-", "name": "status", "height": 35, "fontSize": 26, "font": "Microsoft YaHei", "color": "#f9cb46", "align": "left" } }, { "type": "Label", "props": { "y": 42, "x": 701, "width": 179, "valign": "middle", "text": "0 元", "name": "amount", "height": 44, "fontSize": 36, "font": "Microsoft YaHei", "color": "#a2e1ee", "align": "right" } }] }, { "type": "View", "props": { "y": 100, "x": 31, "width": 970, "var": "contents", "height": 420 }, "child": [{ "type": "Label", "props": { "y": 105, "x": 0, "width": 970, "var": "instructions", "valign": "middle", "text": "您目前无任何提佣记录", "height": 100, "fontSize": 24, "font": "Microsoft YaHei", "color": "#9cc5d8", "align": "center" } }] }, { "type": "Image", "props": { "y": 51, "x": 985, "var": "btnClose", "top": 12, "skin": "ui/dialogs/commission/b_com_guanbi.png", "right": 10, "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 575, "x": 914, "var": "btnContact", "skin": "ui/dialogs/commission/b_tyjl_lxkf.png", "right": 20, "bottom": 20, "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Label", "props": { "y": 527, "x": 38, "width": 713, "valign": "middle", "text": "提示：如对佣金结算有疑问，请联系客服", "height": 96, "fontSize": 24, "font": "Microsoft YaHei", "color": "#f9cb46" } }] };
                return CommissionRecordsUI;
            }(Dialog));
            pop.CommissionRecordsUI = CommissionRecordsUI;
        })(pop = dlg.pop || (dlg.pop = {}));
    })(dlg = ui.dlg || (ui.dlg = {}));
})(ui || (ui = {}));
(function (ui) {
    var dlg;
    (function (dlg) {
        var QuickSetPassWordDlgUI = /** @class */ (function (_super) {
            __extends(QuickSetPassWordDlgUI, _super);
            function QuickSetPassWordDlgUI() {
                return _super.call(this) || this;
            }
            QuickSetPassWordDlgUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.dlg.QuickSetPassWordDlgUI.uiView);
            };
            QuickSetPassWordDlgUI.uiView = { "type": "Dialog", "props": { "width": 754, "height": 480 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "skin": "ui/panel_common/mindlg.png" }, "child": [{ "type": "Image", "props": { "y": 24, "x": 287, "skin": "ui/fullMyCenter/img_xg_bt01.png" } }, { "type": "Image", "props": { "y": 52, "x": 712, "width": 61, "var": "closeBtn", "skin": "ui/common/newclose.png", "height": 64, "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 425, "x": 377, "var": "amendBtn", "skin": "ui/fullMyCenter/btn_grzx_xg02.png", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 105, "x": 30, "width": 694, "skin": "ui/common/img_com_xiankuang.png", "height": 272, "sizeGrid": "15,15,15,16" }, "child": [{ "type": "Image", "props": { "y": 131, "x": 48, "skin": "ui/setPassword/lb_cfpwd.png" } }, { "type": "Image", "props": { "y": 47, "x": 48, "skin": "ui/setPassword/lb_inpwd.png" } }, { "type": "Image", "props": { "y": 206, "x": 143, "skin": "ui/setPassword/qk_xgmm.png" } }, { "type": "Image", "props": { "y": 40, "x": 218, "width": 410, "skin": "ui/res_login/img_dl_shurukuang04.png", "height": 50, "sizeGrid": "20,20,20,20" }, "child": [{ "type": "TextInput", "props": { "y": 2, "x": 15, "width": 340, "var": "newTxt1", "valign": "middle", "type": "password", "promptColor": "#93afc0", "prompt": "新密码(6-15位字符)", "height": 46, "fontSize": 30, "color": "#ffffff" } }, { "type": "CheckBox", "props": { "y": 2, "x": 359, "var": "lookBtn1", "stateNum": 2, "skin": "ui/common/check_see2.png", "selected": false } }] }, { "type": "Image", "props": { "y": 125, "x": 218, "width": 410, "skin": "ui/res_login/img_dl_shurukuang04.png", "height": 50, "sizeGrid": "20,20,20,20" }, "child": [{ "type": "TextInput", "props": { "y": 2, "x": 15, "width": 340, "var": "newTxt2", "valign": "middle", "type": "password", "promptColor": "#93afc0", "prompt": "请再次输入新密码", "height": 46, "fontSize": 30, "color": "#ffffff" } }, { "type": "CheckBox", "props": { "y": 2, "x": 359, "var": "lookBtn2", "stateNum": 2, "skin": "ui/common/check_see2.png", "selected": false } }] }] }] }] };
            return QuickSetPassWordDlgUI;
        }(Dialog));
        dlg.QuickSetPassWordDlgUI = QuickSetPassWordDlgUI;
    })(dlg = ui.dlg || (ui.dlg = {}));
})(ui || (ui = {}));
(function (ui) {
    var dlg;
    (function (dlg) {
        var SettingDlgUI = /** @class */ (function (_super) {
            __extends(SettingDlgUI, _super);
            function SettingDlgUI() {
                return _super.call(this) || this;
            }
            SettingDlgUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.dlg.SettingDlgUI.uiView);
            };
            SettingDlgUI.uiView = { "type": "Dialog", "props": { "width": 760, "height": 494 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "skin": "ui/setting/bg.png" }, "child": [{ "type": "Image", "props": { "y": 25, "x": 273, "skin": "ui/setting/title.png" } }, { "type": "Image", "props": { "y": 30, "x": 716, "var": "closeBtn", "skin": "ui/common/closebig.png", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 171, "x": 67, "skin": "ui/setting/lb_music.png" } }, { "type": "Image", "props": { "y": 303, "x": 67, "skin": "ui/setting/lb_sfx.png" } }, { "type": "HSlider", "props": { "y": 174, "x": 215, "var": "mslider", "value": 60, "skin": "ui/setting/hslider.png", "min": 0, "max": 100 } }, { "type": "Image", "props": { "y": 192, "x": 215, "var": "musicBar", "skin": "ui/setting/icon_msc.png", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "HSlider", "props": { "y": 306, "x": 215, "var": "eslider", "value": 80, "skin": "ui/setting/hslider.png", "min": 0, "max": 100 } }, { "type": "Image", "props": { "y": 322, "x": 204, "var": "effectBar", "skin": "ui/setting/icon_sfx.png", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 194, "x": 662, "var": "musicBtn", "skin": "ui/setting/switch0.png", "name": "musicBtn", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 324, "x": 662, "var": "effectBtn", "skin": "ui/setting/switch1.png", "name": "effectBtn", "anchorY": 0.5, "anchorX": 0.5 } }] }] };
            return SettingDlgUI;
        }(Dialog));
        dlg.SettingDlgUI = SettingDlgUI;
    })(dlg = ui.dlg || (ui.dlg = {}));
})(ui || (ui = {}));
(function (ui) {
    var dlg;
    (function (dlg) {
        var SystemDlgUI = /** @class */ (function (_super) {
            __extends(SystemDlgUI, _super);
            function SystemDlgUI() {
                return _super.call(this) || this;
            }
            SystemDlgUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.dlg.SystemDlgUI.uiView);
            };
            SystemDlgUI.uiView = { "type": "Dialog", "props": { "width": 754, "height": 480 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "skin": "ui/panel_common/mindlg.png" }, "child": [{ "type": "Image", "props": { "y": 22, "x": 320, "skin": "ui/common/img_grzx_bt10.png" } }, { "type": "Image", "props": { "y": 55, "x": 707, "var": "closeBtn", "skin": "ui/common/newclose.png", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 109, "x": 30, "width": 694, "skin": "ui/common/bgcomb.png", "height": 274, "sizeGrid": "20,20,20,20" } }, { "type": "Image", "props": { "y": 427, "x": 222, "var": "cancelBtn", "skin": "ui/common/quxiao.png", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 427, "x": 535, "var": "confirmBtn", "skin": "ui/common/queding.png", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Label", "props": { "y": 109, "x": 30, "width": 694, "var": "infoTxt", "valign": "middle", "text": "xxx", "height": 274, "fontSize": 35, "color": "#a0c5dd", "align": "center" } }] }] };
            return SystemDlgUI;
        }(Dialog));
        dlg.SystemDlgUI = SystemDlgUI;
    })(dlg = ui.dlg || (ui.dlg = {}));
})(ui || (ui = {}));
(function (ui) {
    var dlg;
    (function (dlg) {
        var TipViewUI = /** @class */ (function (_super) {
            __extends(TipViewUI, _super);
            function TipViewUI() {
                return _super.call(this) || this;
            }
            TipViewUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.dlg.TipViewUI.uiView);
            };
            TipViewUI.uiView = { "type": "View", "props": { "width": 1172, "height": 228 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "skin": "ui/common/tipsbg.png", "sizeGrid": "66,2,5,150", "height": 228 }, "child": [{ "type": "Label", "props": { "y": 62, "x": 0, "width": 1172, "var": "infoTxt", "valign": "middle", "text": "xxx", "height": 163, "fontSize": 30, "font": "Arial", "color": "#ffedb8", "align": "center" } }] }] };
            return TipViewUI;
        }(View));
        dlg.TipViewUI = TipViewUI;
    })(dlg = ui.dlg || (ui.dlg = {}));
})(ui || (ui = {}));
(function (ui) {
    var LoadingViewUI = /** @class */ (function (_super) {
        __extends(LoadingViewUI, _super);
        function LoadingViewUI() {
            return _super.call(this) || this;
        }
        LoadingViewUI.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.createView(ui.LoadingViewUI.uiView);
        };
        LoadingViewUI.uiView = { "type": "View", "props": { "width": 600, "height": 400 }, "child": [{ "type": "Box", "props": { "var": "abox", "centerY": 0, "centerX": 0 } }] };
        return LoadingViewUI;
    }(View));
    ui.LoadingViewUI = LoadingViewUI;
})(ui || (ui = {}));
(function (ui) {
    var LobbyViewUI = /** @class */ (function (_super) {
        __extends(LobbyViewUI, _super);
        function LobbyViewUI() {
            return _super.call(this) || this;
        }
        LobbyViewUI.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.createView(ui.LobbyViewUI.uiView);
        };
        LobbyViewUI.uiView = { "type": "View", "props": { "width": 1334, "height": 750 }, "child": [{ "type": "Image", "props": { "var": "bgUI", "skin": "ui/lobby/bg_dating.jpg", "centerY": 0, "centerX": 0 } }, { "type": "Image", "props": { "y": 681, "skin": "ui/lobby/bottombar/img_dating_downbar.png", "right": -6, "sizeGrid": "19,30,30,160" } }, { "type": "Sprite", "props": { "y": 0, "x": 0, "var": "iconbox" } }, { "type": "Box", "props": { "width": 1624, "visible": false, "var": "maskPic", "mouseEnabled": false, "height": 750, "centerY": 0, "centerX": 0 }, "child": [{ "type": "Image", "props": { "y": 176, "x": 575, "skin": "ui/lobby/img_dating_huatu.png" } }] }, { "type": "Box", "props": { "y": 216, "x": 36, "width": 348, "var": "girlSp", "mouseEnabled": false, "hitTestPrior": false, "height": 540 } }, { "type": "Sprite", "props": { "y": 0, "x": 0, "var": "uibox", "mouseThrough": true } }, { "type": "Box", "props": { "width": 230, "var": "TLbox", "right": 0, "height": 109 }, "child": [{ "type": "Image", "props": { "y": 46, "x": 46, "var": "actBtn", "skin": "ui/lobby/icon_dt_hd.png", "anchorY": 0.5, "anchorX": 0.5 }, "child": [{ "type": "Image", "props": { "skin": "ui/lobby/icon_dating_notification.png", "name": "alert" } }] }, { "type": "Image", "props": { "y": 46, "x": 164, "var": "serviceBtn", "skin": "ui/lobby/icon_dt_kf.png", "anchorY": 0.5, "anchorX": 0.5 } }] }, { "type": "Box", "props": { "y": 324, "x": 1190, "width": 129, "var": "rightBtn", "right": 15, "height": 140 }, "compId": 57, "child": [{ "type": "Image", "props": { "y": 21, "x": 16, "skin": "ui/lobby/dating_right.png" }, "compId": 27 }] }, { "type": "Box", "props": { "y": 644, "x": 615, "width": 719, "var": "bottomGroup", "height": 106 }, "child": [{ "type": "Image", "props": { "y": 53, "x": 358, "var": "btn_tx", "skin": "ui/lobby/bottombar/icon_dt_tx.png", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 53, "x": 68, "var": "btn_bind", "skin": "ui/lobby/bottombar/btn_dt_bdsj01.png", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Sprite", "props": { "y": -25, "x": 456, "width": 257, "var": "shopSp", "height": 132 } }, { "type": "Image", "props": { "y": 53, "x": 225, "var": "btn_dl", "skin": "ui/lobby/bottombar/icon_dt_dl.png", "anchorY": 0.5, "anchorX": 0.5 } }] }, { "type": "Box", "props": { "y": 324, "x": 430, "width": 129, "var": "leftBtn", "height": 140 }, "compId": 79, "child": [{ "type": "Image", "props": { "y": 21, "x": 129, "skin": "ui/lobby/dating_right.png", "scaleX": -1 }, "compId": 80 }] }], "animations": [{ "nodes": [{ "target": 27, "keyframes": { "x": [{ "value": 0, "tweenMethod": "linearNone", "tween": true, "target": 27, "key": "x", "index": 0 }, { "value": 20, "tweenMethod": "linearNone", "tween": true, "target": 27, "key": "x", "index": 15 }, { "value": 0, "tweenMethod": "linearNone", "tween": true, "target": 27, "key": "x", "index": 30 }] } }, { "target": 80, "keyframes": { "y": [{ "value": 21, "tweenMethod": "linearNone", "tween": true, "target": 80, "key": "y", "index": 0 }], "x": [{ "value": 129, "tweenMethod": "linearNone", "tween": true, "target": 80, "key": "x", "index": 0 }, { "value": 109, "tweenMethod": "linearNone", "tween": true, "target": 80, "key": "x", "index": 15 }, { "value": 129, "tweenMethod": "linearNone", "tween": true, "target": 80, "key": "x", "index": 30 }], "scaleX": [{ "value": -1, "tweenMethod": "linearNone", "tween": true, "target": 80, "key": "scaleX", "index": 0 }] } }, { "target": 79, "keyframes": { "var": [{ "value": "", "tweenMethod": "linearNone", "tween": false, "target": 79, "key": "var", "index": 0 }] } }, { "target": 57, "keyframes": { "var": [{ "value": "", "tweenMethod": "linearNone", "tween": false, "target": 57, "key": "var", "index": 0 }] } }], "name": "arrowAnim", "id": 1, "frameRate": 24, "action": 2 }] };
        return LobbyViewUI;
    }(View));
    ui.LobbyViewUI = LobbyViewUI;
})(ui || (ui = {}));
(function (ui) {
    var PublicUIUI = /** @class */ (function (_super) {
        __extends(PublicUIUI, _super);
        function PublicUIUI() {
            return _super.call(this) || this;
        }
        PublicUIUI.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.createView(ui.PublicUIUI.uiView);
        };
        PublicUIUI.uiView = { "type": "View", "props": { "width": 1334, "mouseThrough": true, "height": 750 }, "child": [{ "type": "Image", "props": { "y": 0, "x": -165, "width": 681, "var": "headGroup", "skin": "ui/lobby/img_dating_upperbar.png", "mouseThrough": true, "height": 107, "sizeGrid": "48,534,23,20" }, "child": [{ "type": "Image", "props": { "y": 10, "x": 280, "skin": "ui/userInfo/img_dating_zhanghaozi.png", "mouseEnabled": false } }, { "type": "Label", "props": { "y": 58, "x": 286, "wordWrap": false, "width": 234, "var": "nameTxt", "text": "username", "mouseEnabled": false, "fontSize": 26, "color": "#ead111", "align": "left" } }, { "type": "Label", "props": { "y": 690, "x": 172, "width": 219, "var": "verTxt", "valign": "middle", "text": "ver-num", "leading": 2, "height": 54, "fontSize": 20, "color": "#dafcff" } }, { "type": "Image", "props": { "y": 8, "x": 172, "width": 90, "var": "headIcon", "height": 90 } }, { "type": "Image", "props": { "y": 3, "x": 167, "width": 100, "skin": "ui/userInfo/avatorFrame.png", "height": 100, "sizeGrid": "0,0,0,0" } }] }, { "type": "Image", "props": { "y": 10, "var": "goldUI", "skin": "ui/userInfo/img_dating_qian_di.png", "centerX": 75 }, "child": [{ "type": "Image", "props": { "y": 38, "x": 386, "var": "refreshBtn", "skin": "ui/userInfo/uiyue.png", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 38, "x": 300, "var": "addBtn", "skin": "ui/userInfo/dating_zengjia.png", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Sprite", "props": { "y": 39, "x": 11, "width": 20, "var": "goldAnim", "pivotY": 0, "pivotX": 0, "height": 20 } }, { "type": "Sprite", "props": { "y": 18, "x": 51, "width": 205, "var": "fontBox", "height": 40 } }] }, { "type": "Image", "props": { "y": 78, "var": "noticeGroup", "skin": "ui/lobby/img_dating_gonggaodi.png", "centerX": 116 }, "child": [{ "type": "Sprite", "props": { "y": 14, "x": 110, "width": 400, "var": "noticeSp", "height": 40 }, "child": [{ "type": "Label", "props": { "y": 0, "x": 0, "width": 155, "var": "msgTxt", "valign": "middle", "text": "111", "height": 40, "fontSize": 26, "color": "#efe8cd", "align": "left" } }] }] }] };
        return PublicUIUI;
    }(View));
    ui.PublicUIUI = PublicUIUI;
})(ui || (ui = {}));
(function (ui) {
    var RoomListViewUI = /** @class */ (function (_super) {
        __extends(RoomListViewUI, _super);
        function RoomListViewUI() {
            return _super.call(this) || this;
        }
        RoomListViewUI.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.createView(ui.RoomListViewUI.uiView);
        };
        RoomListViewUI.uiView = { "type": "View", "props": { "width": 1334, "height": 750 }, "child": [{ "type": "Image", "props": { "y": 0, "skin": "ui/lobby/bg_dating.jpg", "centerX": 0 } }, { "type": "Sprite", "props": { "y": 0, "x": 0, "var": "uibox" } }, { "type": "Sprite", "props": { "y": 0, "x": 0, "var": "iconSp" } }, { "type": "Image", "props": { "y": 0, "var": "backGroup", "skin": "ui/room/fanguibg.png", "right": 0 }, "child": [{ "type": "Box", "props": { "y": 37, "x": 187, "var": "backBtn", "anchorY": 0.5, "anchorX": 0.5 }, "child": [{ "type": "Image", "props": { "skin": "ui/room/backui.png" } }, { "type": "Image", "props": { "y": 12, "x": 59, "skin": "ui/room/backtxt.png" } }] }, { "type": "Image", "props": { "y": 8, "x": -154, "var": "namePic", "skin": "ui/room/lb_zjh.png" } }] }, { "type": "Box", "props": { "y": 647, "width": 327, "height": 88, "centerX": 0 }, "child": [{ "type": "Image", "props": { "y": 43, "x": 163, "var": "zjBtn", "skin": "ui/room/record_ui.png", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 43, "x": 41, "var": "ruleBtn", "skin": "ui/room/rule_ui.png", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 43, "x": 285, "var": "settingBtn", "skin": "ui/room/setting_ui.png", "anchorY": 0.5, "anchorX": 0.5 } }] }] };
        return RoomListViewUI;
    }(View));
    ui.RoomListViewUI = RoomListViewUI;
})(ui || (ui = {}));
(function (ui) {
    var UI;
    (function (UI) {
        var GameIconViewUI = /** @class */ (function (_super) {
            __extends(GameIconViewUI, _super);
            function GameIconViewUI() {
                return _super.call(this) || this;
            }
            GameIconViewUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.UI.GameIconViewUI.uiView);
            };
            GameIconViewUI.uiView = { "type": "View", "props": { "width": 244, "height": 202 }, "child": [{ "type": "Image", "props": { "var": "normIcon", "centerY": 0, "centerX": 0 } }, { "type": "Image", "props": { "y": 10, "x": 10, "var": "grayIcon", "centerY": 0, "centerX": 0 } }, { "type": "Box", "props": { "var": "animbox", "centerY": 0, "centerX": 0 } }, { "type": "Image", "props": { "var": "updateIcon", "top": 0, "skin": "ui/game/gengxing.png", "right": 0 } }, { "type": "Label", "props": { "width": 200, "var": "updateTxt", "text": "label", "height": 32, "fontSize": 26, "color": "#ccff00", "centerX": 0, "bottom": 10, "align": "center" } }, { "type": "Image", "props": { "var": "hotIcon", "top": 30, "skin": "ui/game/icon_hot.png", "right": 10 } }, { "type": "Image", "props": { "var": "expectIcon", "skin": "ui/game/jqqd.png", "centerY": 0, "centerX": 0 } }, { "type": "Image", "props": { "var": "pauseIcon", "skin": "ui/game/weihuzhong.png", "centerY": 0, "centerX": 0 } }] };
            return GameIconViewUI;
        }(View));
        UI.GameIconViewUI = GameIconViewUI;
    })(UI = ui.UI || (ui.UI = {}));
})(ui || (ui = {}));
(function (ui) {
    var UI;
    (function (UI) {
        var Page;
        (function (Page) {
            var LoginUI = /** @class */ (function (_super) {
                __extends(LoginUI, _super);
                function LoginUI() {
                    return _super.call(this) || this;
                }
                LoginUI.prototype.createChildren = function () {
                    View.regComponent("Text", laya.display.Text);
                    _super.prototype.createChildren.call(this);
                    this.createView(ui.UI.Page.LoginUI.uiView);
                };
                LoginUI.uiView = { "type": "View", "props": { "y": 0, "width": 1334, "visible": true, "height": 750, "centerY": 0, "centerX": 0 }, "child": [{ "type": "Image", "props": { "y": 0, "x": -145, "skin": "ui/res_login/BG_dl01.jpg", "name": "background", "height": 750, "centerY": 0, "centerX": 0 } }, { "type": "Image", "props": { "y": 94, "x": -101, "top": 94, "skin": "ui/res_login/img_dl_nv01.jpg.png", "name": "back_women", "left": 44 } }, { "type": "Image", "props": { "y": 712, "x": 192, "skin": "ui/res_login/img_dl_wenzi01.png", "bottom": 8 } }, { "type": "ProgressBar", "props": { "y": 690, "x": 22, "var": "pb_loading", "skin": "ui/res_login/img_dl_jingdutiao01.png", "name": "pb_loading", "centerX": 0, "bottom": 40 } }, { "type": "Image", "props": { "y": 199, "x": 486, "width": 800, "var": "sp_log", "top": 199, "name": "sp_log", "left": 486, "height": 280 } }, { "type": "Label", "props": { "y": 656, "x": 667, "var": "lb_text", "text": "正在更新资源30%", "fontSize": 32, "font": "SimHei", "color": "#ffffff", "centerX": 0, "bottom": 78, "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 47, "var": "btn_service", "top": 15, "skin": "ui/res_login/icon_dl_kefu01.png", "right": 50, "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "visible": false, "var": "btn_other_login", "skin": "ui/res_login/btn_dl_genghuan01.png", "left": 29, "bottom": 37, "anchorY": 0.45, "anchorX": 0.5 } }, { "type": "Box", "props": { "y": 602, "width": 1004, "var": "loginBtnGroup", "height": 95, "centerX": 0 }, "child": [{ "type": "Image", "props": { "y": 36, "x": 118, "width": 237, "var": "login_fast", "skin": "ui/res_login/btn_dl_kuaijie02.png", "height": 73, "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 36, "x": 489, "width": 237, "var": "login_account", "skin": "ui/res_login/btn_dl_zhanghao01.png", "height": 73, "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 36, "x": 836, "width": 237, "var": "login_phone", "skin": "ui/res_login/btn_dl_shouji01.png", "height": 73, "anchorY": 0.5, "anchorX": 0.5 } }] }, { "type": "Image", "props": { "width": 725, "visible": false, "var": "panelFast", "top": 140, "skin": "ui/res_login/img_dl_chuangkou01.png", "right": 76, "height": 379 }, "child": [{ "type": "Image", "props": { "top": 119, "skin": "ui/res_login/img_dl_tianxie01.png", "left": 95 } }, { "type": "Image", "props": { "y": 16, "skin": "ui/res_login/img_dl_biaotou03.png", "centerX": 0 } }, { "type": "Image", "props": { "var": "fast_codeTitle", "top": 204, "skin": "ui/res_login/img_dl_tianxie03.png", "left": 95 } }, { "type": "TextInput", "props": { "width": 410, "var": "fast_codeTxt", "type": "text", "top": 195, "skin": "ui/res_login/img_dl_shurukuang04.png", "sizeGrid": "20,20,20,20", "rotation": 0, "promptColor": "#93afc0", "prompt": "请输入验证码", "padding": "-6,0,-2,20", "overflow": "hidden", "multiline": false, "maxChars": 6, "left": 229, "layoutEnabled": true, "height": 50, "fontSize": 30, "font": "Microsoft YaHei", "editable": true, "color": "#93afc0", "bold": false, "align": "left" } }, { "type": "TextInput", "props": { "x": 229, "width": 410, "var": "fast_nameTxt", "type": "text", "top": 111, "skin": "ui/res_login/img_dl_shurukuang04.png", "sizeGrid": "20,20,20,20", "rotation": 0, "restrict": "0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM", "promptColor": "#93afc0", "prompt": "4-11位字母和数字", "padding": "-6,0,-2,20", "overflow": "hidden", "multiline": false, "maxChars": 11, "left": 229, "layoutEnabled": true, "height": 50, "fontSize": 30, "font": "Microsoft YaHei", "editable": true, "color": "#93afc0", "bold": false, "align": "left" } }, { "type": "Image", "props": { "y": 207, "x": 456, "var": "fast_codePic" } }, { "type": "Image", "props": { "y": 464, "x": 362, "var": "fast_login", "skin": "ui/res_login/btn_dl_denglu01.png", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 289, "x": 189, "skin": "ui/res_login/img_dl_wenzi05.png" } }] }, { "type": "Image", "props": { "y": 10, "x": 10, "width": 725, "visible": false, "var": "panelAccount", "top": 140, "skin": "ui/res_login/img_dl_chuangkou01.png", "right": 76, "height": 379 }, "child": [{ "type": "Image", "props": { "y": 124, "x": 95, "skin": "ui/res_login/img_dl_tianxie01.png" } }, { "type": "Image", "props": { "y": 16, "skin": "ui/res_login/img_dl_biaotou01.png", "centerX": 0 } }, { "type": "Image", "props": { "y": 291, "x": 95, "var": "acc_codeTtile", "skin": "ui/res_login/img_dl_tianxie03.png" } }, { "type": "TextInput", "props": { "x": 229, "width": 410, "var": "acc_codeTxt", "type": "text", "top": 282, "skin": "ui/res_login/img_dl_shurukuang04.png", "sizeGrid": "20,20,20,20", "rotation": 0, "promptColor": "#93afc0", "prompt": "请输入验证码", "padding": "-6,0,-2,20", "overflow": "hidden", "multiline": false, "maxChars": 6, "left": 229, "layoutEnabled": true, "height": 50, "fontSize": 30, "font": "Microsoft YaHei", "editable": true, "color": "#93afc0", "bold": false, "align": "left" } }, { "type": "TextInput", "props": { "width": 410, "var": "acc_nameTxt", "type": "text", "top": 116, "skin": "ui/res_login/img_dl_shurukuang04.png", "sizeGrid": "20,20,20,20", "rotation": 0, "restrict": "0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM", "promptColor": "#93afc0", "prompt": "请输入用户名或手机号", "padding": "-6,0,-2,20", "overflow": "hidden", "multiline": false, "maxChars": 11, "left": 229, "layoutEnabled": true, "height": 50, "fontSize": 30, "font": "Microsoft YaHei", "editable": true, "color": "#93afc0", "bold": false, "align": "left" } }, { "type": "Image", "props": { "y": 293, "x": 453, "var": "acc_codePic" } }, { "type": "Image", "props": { "y": 464, "x": 568, "visible": true, "var": "acc_login", "skin": "ui/res_login/btn_dl_denglu01.png", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 464, "x": 158, "visible": true, "var": "acc_regBtn", "skin": "ui/res_login/btn_dl_zhuce01.png", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 207, "x": 95, "visible": true, "skin": "ui/res_login/img_dl_tianxie02.png" } }, { "type": "TextInput", "props": { "width": 410, "visible": true, "var": "acc_pwdTxt", "type": "password", "top": 199, "skin": "ui/res_login/img_dl_shurukuang04.png", "sizeGrid": "20,20,20,20", "rotation": 0, "promptColor": "#93afc0", "prompt": "请输入密码", "padding": "-6,0,-2,20", "overflow": "hidden", "multiline": false, "maxChars": 15, "left": 229, "layoutEnabled": true, "height": 50, "fontSize": 30, "font": "Microsoft YaHei", "editable": true, "color": "#93afc0", "bold": false, "align": "left" } }, { "type": "Image", "props": { "y": 224, "x": 601, "visible": true, "var": "acc_lookBtn", "skin": "ui/res_login/btn_dl_yanjing02.png", "anchorY": 0.5, "anchorX": 0.5 } }] }, { "type": "Image", "props": { "y": 20, "x": 20, "width": 725, "visible": false, "var": "panelRegister", "top": 140, "skin": "ui/res_login/img_dl_chuangkou01.png", "right": 76, "height": 379 }, "child": [{ "type": "Image", "props": { "y": 119, "x": 95, "top": 119, "skin": "ui/res_login/img_dl_tianxie01.png", "left": 95 } }, { "type": "Image", "props": { "y": 12, "skin": "ui/res_login/img_dl_biaotou04.png", "centerX": 0 } }, { "type": "Image", "props": { "y": 300, "x": 95, "top": 300, "skin": "ui/res_login/img_dl_tianxie03.png", "left": 95 } }, { "type": "TextInput", "props": { "y": 292, "x": 229, "width": 410, "var": "reg_codeTxt", "type": "text", "top": 292, "skin": "ui/res_login/img_dl_shurukuang04.png", "sizeGrid": "20,20,20,20", "rotation": 0, "promptColor": "#93afc0", "prompt": "请输入验证码", "padding": "-6,0,-2,20", "overflow": "hidden", "multiline": false, "maxChars": 6, "left": 229, "layoutEnabled": true, "height": 50, "fontSize": 30, "font": "Microsoft YaHei", "editable": true, "color": "#93afc0", "bold": false, "align": "left" } }, { "type": "TextInput", "props": { "y": 111, "x": 229, "width": 410, "var": "reg_nameTxt", "type": "text", "top": 111, "skin": "ui/res_login/img_dl_shurukuang04.png", "sizeGrid": "20,20,20,20", "rotation": 0, "restrict": "0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM", "promptColor": "#93afc0", "prompt": "4-11位字母和数字", "padding": "-6,0,-2,20", "overflow": "hidden", "multiline": false, "maxChars": 11, "left": 229, "layoutEnabled": true, "height": 50, "fontSize": 30, "font": "Microsoft YaHei", "editable": true, "color": "#93afc0", "bold": false, "align": "left" } }, { "type": "Image", "props": { "y": 303, "x": 453, "var": "reg_codePic" } }, { "type": "Image", "props": { "y": 464, "x": 568, "var": "reg_confirm", "skin": "ui/res_login/btn_dl_queren01.png", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 464, "x": 158, "var": "reg_back", "skin": "ui/res_login/btn_dl_fanhui01.png", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "TextInput", "props": { "y": 171, "x": -304, "width": 410, "var": "reg_pwdTxt1", "type": "password", "top": 174, "skin": "ui/res_login/img_dl_shurukuang04.png", "sizeGrid": "20,20,20,20", "rotation": 0, "promptColor": "#93afc0", "prompt": "6-15位字符", "padding": "-6,0,-2,20", "overflow": "hidden", "multiline": false, "maxChars": 15, "left": 229, "layoutEnabled": true, "height": 50, "fontSize": 30, "font": "Microsoft YaHei", "editable": true, "color": "#93afc0", "bold": false, "align": "left" } }, { "type": "TextInput", "props": { "y": 232, "x": -304, "width": 410, "var": "reg_pwdTxt2", "type": "password", "top": 231, "skin": "ui/res_login/img_dl_shurukuang04.png", "sizeGrid": "20,20,20,20", "rotation": 0, "promptColor": "#93afc0", "prompt": "请再次输入密码", "padding": "-6,0,-2,20", "overflow": "hidden", "multiline": false, "maxChars": 15, "left": 229, "layoutEnabled": true, "height": 50, "fontSize": 30, "font": "Microsoft YaHei", "editable": true, "color": "#93afc0", "bold": false, "align": "left" } }, { "type": "Image", "props": { "y": 240, "top": 240, "skin": "ui/res_login/img_dl_tianxie06.png", "left": 77 } }, { "type": "Image", "props": { "y": 200, "x": 606, "var": "reg_lookBtn1", "skin": "ui/res_login/btn_dl_yanjing02.png", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 255, "x": 606, "var": "reg_lookBtn2", "skin": "ui/res_login/btn_dl_yanjing02.png", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 179, "x": 0, "top": 182, "skin": "ui/res_login/img_dl_tianxie05.png", "left": 77 } }] }, { "type": "Image", "props": { "y": 10, "x": 10, "width": 725, "visible": false, "var": "panelPhone", "top": 140, "skin": "ui/res_login/img_dl_chuangkou01.png", "right": 76, "height": 379 }, "child": [{ "type": "Image", "props": { "top": 120, "skin": "ui/res_login/img_dl_tianxie04.png", "left": 95 } }, { "type": "Image", "props": { "y": 16, "skin": "ui/res_login/img_dl_biaotou02.png", "centerX": 0 } }, { "type": "Image", "props": { "top": 204, "skin": "ui/res_login/img_dl_tianxie03.png", "left": 95 } }, { "type": "TextInput", "props": { "width": 196, "var": "mp_codeTxt", "type": "text", "top": 195, "skin": "ui/res_login/img_dl_shurukuang04.png", "sizeGrid": "20,20,20,20", "rotation": 0, "restrict": "0123456789", "promptColor": "#93afc0", "prompt": "请输验证码", "padding": "-6,0,-2,20", "overflow": "hidden", "multiline": false, "maxChars": 6, "left": 229, "layoutEnabled": true, "height": 50, "fontSize": 30, "font": "Microsoft YaHei", "editable": true, "color": "#93afc0", "bold": false, "align": "left" } }, { "type": "TextInput", "props": { "y": 111, "x": 229, "width": 410, "var": "mp_numTxt", "type": "text", "top": 111, "skin": "ui/res_login/img_dl_shurukuang04.png", "sizeGrid": "20,20,20,20", "rotation": 0, "restrict": "0123456789", "promptColor": "#93afc0", "prompt": "请输入可用手机号", "padding": "-6,0,-2,20", "overflow": "hidden", "multiline": false, "maxChars": 11, "left": 229, "layoutEnabled": true, "height": 50, "fontSize": 30, "font": "Microsoft YaHei", "editable": true, "color": "#93afc0", "bold": false, "align": "left" } }, { "type": "Image", "props": { "y": 464, "x": 362, "var": "mp_login", "skin": "ui/res_login/btn_dl_denglu01.png", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 289, "x": 278, "skin": "ui/res_login/img_dl_wenzi04.png" } }, { "type": "Image", "props": { "y": 215, "x": 541, "var": "mp_waitBtn", "skin": "ui/res_login/btn_dl_yanzhengma02.png", "anchorY": 0.5, "anchorX": 0.5 }, "child": [{ "type": "Text", "props": { "y": 9, "x": 7, "width": 62, "var": "mp_timeTxt", "text": "0", "fontSize": 36, "color": "#ffffff", "align": "center" } }] }, { "type": "Image", "props": { "y": 215, "x": 541, "var": "mp_getcodeBtn", "skin": "ui/res_login/btn_dl_yanzhengma01.png", "anchorY": 0.5, "anchorX": 0.5 } }] }, { "type": "Label", "props": { "x": 25, "width": 164, "var": "verTxt", "valign": "middle", "text": "vertxt", "leading": 2, "height": 37, "fontSize": 15, "color": "#d9fcff", "bottom": 0 } }] };
                return LoginUI;
            }(View));
            Page.LoginUI = LoginUI;
        })(Page = UI.Page || (UI.Page = {}));
    })(UI = ui.UI || (ui.UI = {}));
})(ui || (ui = {}));
(function (ui) {
    var UI;
    (function (UI) {
        var SetPwdPanelUI = /** @class */ (function (_super) {
            __extends(SetPwdPanelUI, _super);
            function SetPwdPanelUI() {
                return _super.call(this) || this;
            }
            SetPwdPanelUI.prototype.createChildren = function () {
                View.regComponent("Text", laya.display.Text);
                _super.prototype.createChildren.call(this);
                this.createView(ui.UI.SetPwdPanelUI.uiView);
            };
            SetPwdPanelUI.uiView = { "type": "View", "props": { "width": 712, "height": 466 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 712, "skin": "ui/common/img_com_xiankuang.png", "height": 362, "sizeGrid": "15,15,15,16" }, "child": [{ "type": "Box", "props": { "y": 111, "x": 56, "var": "panel1" }, "child": [{ "type": "Image", "props": { "y": 6, "x": 19, "skin": "ui/fullMyCenter/img_grzx_sr10.png" } }, { "type": "Image", "props": { "y": 89, "skin": "ui/fullMyCenter/img_grzx_sr05.png" } }, { "type": "Image", "props": { "y": 171, "x": 0, "skin": "ui/fullMyCenter/img_grzx_sr06.png" } }, { "type": "Image", "props": { "y": -1, "x": 185, "width": 410, "skin": "ui/res_login/img_dl_shurukuang04.png", "height": 50, "sizeGrid": "20,20,20,20" }, "child": [{ "type": "TextInput", "props": { "y": 2, "x": 15, "width": 340, "var": "pwdTxt1", "valign": "middle", "type": "password", "promptColor": "#93afc0", "prompt": "请输入旧密码", "height": 46, "fontSize": 30, "color": "#ffffff" } }, { "type": "CheckBox", "props": { "y": 2, "x": 359, "var": "lookBtn1", "stateNum": 2, "skin": "ui/common/check_see2.png", "selected": false } }] }, { "type": "Image", "props": { "y": 82, "x": 185, "width": 410, "skin": "ui/res_login/img_dl_shurukuang04.png", "height": 50, "sizeGrid": "20,20,20,20" }, "child": [{ "type": "TextInput", "props": { "y": 2, "x": 15, "width": 340, "var": "pwdTxt2", "valign": "middle", "type": "password", "promptColor": "#93afc0", "prompt": "请输入6-15位字符", "maxChars": 15, "height": 46, "fontSize": 30, "color": "#ffffff" } }, { "type": "CheckBox", "props": { "y": 2, "x": 359, "var": "lookBtn2", "stateNum": 2, "skin": "ui/common/check_see2.png", "selected": false } }] }, { "type": "Image", "props": { "y": 164, "x": 185, "width": 410, "skin": "ui/res_login/img_dl_shurukuang04.png", "height": 50, "sizeGrid": "20,20,20,20" }, "child": [{ "type": "TextInput", "props": { "y": 2, "x": 15, "width": 340, "var": "pwdTxt3", "valign": "middle", "type": "password", "promptColor": "#93afc0", "prompt": "请再次输入密码", "maxChars": 15, "height": 46, "fontSize": 30, "color": "#ffffff" } }, { "type": "CheckBox", "props": { "y": 2, "x": 359, "var": "lookBtn3", "stateNum": 2, "skin": "ui/common/check_see2.png", "selected": false } }] }] }, { "type": "Box", "props": { "y": 79, "x": 54, "width": 656, "var": "panel2", "height": 265 }, "child": [{ "type": "Image", "props": { "y": 150, "skin": "ui/res_login/img_dl_tianxie05.png" } }, { "type": "Image", "props": { "y": 223, "skin": "ui/fullMyCenter/img_grzx_sr06.png" } }, { "type": "TextInput", "props": { "y": 215, "x": 176, "width": 410, "var": "pwdTxt5", "type": "password", "skin": "ui/res_login/img_dl_shurukuang04.png", "sizeGrid": "20,20,20,20", "rotation": 0, "promptColor": "#93afc0", "prompt": "请再次输入密码", "padding": "-6,0,-2,20", "overflow": "hidden", "multiline": false, "maxChars": 15, "layoutEnabled": true, "height": 50, "fontSize": 30, "font": "Microsoft YaHei", "editable": true, "color": "#93afc0", "bold": false, "align": "left" } }, { "type": "TextInput", "props": { "y": 143, "x": 176, "width": 410, "var": "pwdTxt4", "type": "password", "skin": "ui/res_login/img_dl_shurukuang04.png", "sizeGrid": "20,20,20,20", "rotation": 0, "promptColor": "#93afc0", "prompt": "请输入6-15位字符", "padding": "-6,0,-2,20", "overflow": "hidden", "multiline": false, "maxChars": 15, "layoutEnabled": true, "height": 50, "fontSize": 30, "font": "Microsoft YaHei", "editable": true, "color": "#93afc0", "bold": false, "align": "left" } }, { "type": "CheckBox", "props": { "y": 155, "x": 527, "width": 41, "var": "lookBtn4", "skin": "ui/common/check_see.png" } }, { "type": "CheckBox", "props": { "y": 227, "x": 527, "var": "lookBtn5", "skin": "ui/common/check_see.png" } }, { "type": "Image", "props": { "y": 96, "x": 487, "skin": "ui/res_login/btn_dl_yanzhengma02.png", "anchorY": 0.5, "anchorX": 0.5 }, "child": [{ "type": "Text", "props": { "y": 9, "x": 7, "width": 62, "var": "timeTxt", "text": "0", "fontSize": 36, "color": "#ffffff", "align": "center" } }] }, { "type": "Image", "props": { "y": 96, "x": 487, "var": "getCodeBtn", "skin": "ui/res_login/btn_dl_yanzhengma01.png", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 80, "x": 20, "skin": "ui/res_login/img_dl_tianxie03.png" } }, { "type": "Image", "props": { "y": 8, "x": 19, "skin": "ui/res_login/img_dl_tianxie04.png" } }, { "type": "TextInput", "props": { "y": 72, "x": 176, "width": 196, "var": "codeTxt", "type": "text", "skin": "ui/res_login/img_dl_shurukuang04.png", "sizeGrid": "20,20,20,20", "rotation": 0, "restrict": "0123456789", "promptColor": "#93afc0", "prompt": "请输验证码", "padding": "-6,0,-2,20", "overflow": "hidden", "multiline": false, "maxChars": 6, "layoutEnabled": true, "height": 50, "fontSize": 30, "font": "Microsoft YaHei", "editable": true, "color": "#93afc0", "bold": false, "align": "left" } }, { "type": "TextInput", "props": { "x": 176, "width": 410, "var": "phoneTxt", "type": "text", "skin": "ui/res_login/img_dl_shurukuang04.png", "sizeGrid": "20,20,20,20", "rotation": 0, "restrict": "0123456789", "promptColor": "#93afc0", "prompt": "请输入可用手机号", "padding": "-6,0,-2,20", "overflow": "hidden", "multiline": false, "maxChars": 11, "layoutEnabled": true, "height": 50, "fontSize": 30, "font": "Microsoft YaHei", "editable": true, "color": "#93afc0", "bold": false, "align": "left" } }] }, { "type": "Image", "props": { "y": 426, "x": 356, "var": "okBtn", "skin": "ui/fullMyCenter/btn_grzx_qd01.png", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Box", "props": { "y": 19, "x": 92, "var": "checkGroup1" }, "child": [{ "type": "Image", "props": { "y": 7, "x": 57, "skin": "ui/fullMyCenter/img_grzx_gx05.png" } }, { "type": "CheckBox", "props": { "y": 0, "x": 0, "width": 202, "var": "checkBtn1", "skin": "ui/fullMyCenter/check_gou.png", "selected": false, "height": 42 } }] }, { "type": "Box", "props": { "y": 19, "x": 355, "var": "checkGroup2" }, "child": [{ "type": "Image", "props": { "y": 7, "x": 57, "skin": "ui/fullMyCenter/img_grzx_gx04.png" } }, { "type": "CheckBox", "props": { "y": 0, "x": 0, "width": 236, "var": "checkBtn2", "skin": "ui/fullMyCenter/check_gou.png", "height": 42 } }] }] }] };
            return SetPwdPanelUI;
        }(View));
        UI.SetPwdPanelUI = SetPwdPanelUI;
    })(UI = ui.UI || (ui.UI = {}));
})(ui || (ui = {}));
//# sourceMappingURL=layaUI.max.all.js.map