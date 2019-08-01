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
            CombBoxViewUI.uiView = { "type": "View", "props": { "width": 410, "height": 50 }, "child": [{ "type": "Image", "props": { "y": 0, "var": "combView", "skin": "ui/common/bgcomb.png", "sizeGrid": "20,20,20,20", "right": 0, "left": 0 }, "child": [{ "type": "Panel", "props": { "y": 50, "width": 410, "var": "itemList", "right": 0, "left": 0, "height": 241 } }, { "type": "Box", "props": { "y": 0, "var": "titleBtn", "right": 0, "left": 0, "height": 50 }, "child": [{ "type": "Image", "props": { "var": "arrowBtn", "skin": "ui/res_login/btn_dl_xiala01.png", "right": 20, "centerY": 0 } }, { "type": "TextInput", "props": { "y": 0, "x": 20, "width": 332, "var": "labelTxt", "valign": "middle", "promptColor": "#93afc0", "prompt": "请选择银行", "height": 50, "fontSize": 30, "color": "#ffffff" } }] }] }] };
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
    var debug;
    (function (debug) {
        var DebugDlgUI = /** @class */ (function (_super) {
            __extends(DebugDlgUI, _super);
            function DebugDlgUI() {
                return _super.call(this) || this;
            }
            DebugDlgUI.prototype.createChildren = function () {
                View.regComponent("Text", laya.display.Text);
                _super.prototype.createChildren.call(this);
                this.createView(ui.debug.DebugDlgUI.uiView);
            };
            DebugDlgUI.uiView = { "type": "Dialog", "props": { "width": 754, "height": 480 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "skin": "ui/panel_common/mindlg.png" }, "child": [{ "type": "Text", "props": { "y": 22, "x": 314, "text": "Debug", "height": 40, "fontSize": 40, "color": "#ffffff", "bold": true } }] }, { "type": "Image", "props": { "y": 55, "x": 707, "var": "closeBtn", "skin": "ui/common/newclose.png", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 215, "x": 172, "width": 410, "skin": "ui/res_login/img_dl_shurukuang04.png", "height": 50, "sizeGrid": "20,20,20,20" }, "child": [{ "type": "TextInput", "props": { "y": 2, "x": 15, "width": 376, "var": "cmdTxt", "valign": "middle", "type": "text", "promptColor": "#93afc0", "height": 46, "fontSize": 30, "color": "#ffffff" } }] }, { "type": "Image", "props": { "y": 398, "x": 376, "var": "okBtn", "skin": "ui/common/queding.png", "anchorY": 0.5, "anchorX": 0.5 } }] };
            return DebugDlgUI;
        }(Dialog));
        debug.DebugDlgUI = DebugDlgUI;
    })(debug = ui.debug || (ui.debug = {}));
})(ui || (ui = {}));
(function (ui) {
    var dlg;
    (function (dlg) {
        var agent;
        (function (agent) {
            var AddUserDlgUI = /** @class */ (function (_super) {
                __extends(AddUserDlgUI, _super);
                function AddUserDlgUI() {
                    return _super.call(this) || this;
                }
                AddUserDlgUI.prototype.createChildren = function () {
                    View.regComponent("Text", laya.display.Text);
                    _super.prototype.createChildren.call(this);
                    this.createView(ui.dlg.agent.AddUserDlgUI.uiView);
                };
                AddUserDlgUI.uiView = { "type": "Dialog", "props": { "width": 754, "height": 480 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "skin": "ui/panel_common/mindlg.png" }, "child": [{ "type": "Image", "props": { "y": 22, "x": 282, "skin": "ui/agent/img_daili_zi_tianjiayonghu.png" } }, { "type": "Image", "props": { "y": 54, "x": 707, "var": "closeBtn", "skin": "ui/common/newclose.png", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 109, "x": 30, "width": 694, "skin": "ui/common/img_com_xiankuang.png", "height": 272, "sizeGrid": "15,15,15,16" }, "child": [{ "type": "Image", "props": { "y": 16, "x": 35, "skin": "ui/agent/img_daili_zi_lx.png" } }, { "type": "Image", "props": { "y": 164, "x": 35, "skin": "ui/agent/img_daili_zi_mima.png" } }, { "type": "Image", "props": { "y": 90, "x": 35, "skin": "ui/agent/img_daili_zi_yhm.png" } }, { "type": "Text", "props": { "y": 226, "x": 126, "text": "若不填写密码,则使用初始密码：123456", "fontSize": 25, "color": "#dcb625" } }, { "type": "Image", "props": { "y": 82, "x": 185, "width": 410, "skin": "ui/res_login/img_dl_shurukuang04.png", "height": 50, "sizeGrid": "20,20,20,20" }, "child": [{ "type": "TextInput", "props": { "y": 2, "x": 15, "width": 375, "var": "userTxt", "valign": "middle", "type": "text", "promptColor": "#93afc0", "prompt": "请输入用户名", "height": 46, "fontSize": 30, "color": "#ffffff" } }] }, { "type": "Image", "props": { "y": 156, "x": 185, "width": 410, "skin": "ui/res_login/img_dl_shurukuang04.png", "height": 50, "sizeGrid": "20,20,20,20" }, "child": [{ "type": "TextInput", "props": { "y": 2, "x": 15, "width": 373, "var": "pwdTxt", "valign": "middle", "type": "password", "promptColor": "#93afc0", "prompt": "请输入密码", "height": 46, "fontSize": 30, "color": "#ffffff" } }] }, { "type": "Image", "props": { "y": 16, "x": 185, "var": "typeIcon", "skin": "ui/agent/img_daili_zi_daili.png" } }] }, { "type": "Image", "props": { "y": 427, "x": 376, "var": "okBtn", "skin": "ui/common/queding.png", "anchorY": 0.5, "anchorX": 0.5 } }] }] };
                return AddUserDlgUI;
            }(Dialog));
            agent.AddUserDlgUI = AddUserDlgUI;
        })(agent = dlg.agent || (dlg.agent = {}));
    })(dlg = ui.dlg || (ui.dlg = {}));
})(ui || (ui = {}));
(function (ui) {
    var dlg;
    (function (dlg) {
        var agent;
        (function (agent) {
            var AgentHelpViewUI = /** @class */ (function (_super) {
                __extends(AgentHelpViewUI, _super);
                function AgentHelpViewUI() {
                    return _super.call(this) || this;
                }
                AgentHelpViewUI.prototype.createChildren = function () {
                    _super.prototype.createChildren.call(this);
                    this.createView(ui.dlg.agent.AgentHelpViewUI.uiView);
                };
                AgentHelpViewUI.uiView = { "type": "View", "props": { "width": 1062, "height": 640 }, "child": [{ "type": "Label", "props": { "y": 0, "x": 0, "width": 1062, "var": "titleTxt", "valign": "top", "text": "label", "height": 40, "fontSize": 25, "color": "#ffba25", "align": "center" } }, { "type": "Panel", "props": { "y": 40, "x": 0, "width": 1062, "var": "itemPanel", "height": 600 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 1062, "skin": "ui/agent/img_dlsm-fyblb_nr.png" } }] }] };
                return AgentHelpViewUI;
            }(View));
            agent.AgentHelpViewUI = AgentHelpViewUI;
        })(agent = dlg.agent || (dlg.agent = {}));
    })(dlg = ui.dlg || (ui.dlg = {}));
})(ui || (ui = {}));
(function (ui) {
    var dlg;
    (function (dlg) {
        var agent;
        (function (agent) {
            var AgentInfoViewUI = /** @class */ (function (_super) {
                __extends(AgentInfoViewUI, _super);
                function AgentInfoViewUI() {
                    return _super.call(this) || this;
                }
                AgentInfoViewUI.prototype.createChildren = function () {
                    View.regComponent("Text", laya.display.Text);
                    _super.prototype.createChildren.call(this);
                    this.createView(ui.dlg.agent.AgentInfoViewUI.uiView);
                };
                AgentInfoViewUI.uiView = { "type": "View", "props": { "width": 1018, "height": 620 }, "child": [{ "type": "Image", "props": { "y": 6, "x": 670, "skin": "ui/agent/img_qizhidi.png" }, "child": [{ "type": "Sprite", "props": { "y": 96, "x": 63, "width": 126, "var": "fontBox1", "height": 30 } }, { "type": "Sprite", "props": { "y": 548, "x": 63, "width": 126, "var": "fontBox2", "height": 30 } }, { "type": "Text", "props": { "y": 195, "x": 56, "width": 238, "var": "txt1", "overflow": "hidden", "height": 30, "fontSize": 30, "color": "#ffcc33" } }, { "type": "Text", "props": { "y": 277, "x": 56, "width": 238, "var": "txt2", "overflow": "hidden", "height": 30, "fontSize": 30, "color": "#ffcc33" } }, { "type": "Text", "props": { "y": 365, "x": 52, "width": 95, "var": "txt3", "overflow": "hidden", "height": 30, "fontSize": 24, "color": "#ffcc33", "align": "center" } }, { "type": "Text", "props": { "y": 365, "x": 207, "width": 95, "var": "txt4", "overflow": "hidden", "height": 30, "fontSize": 24, "color": "#ffcc33", "align": "center" } }, { "type": "Text", "props": { "y": 432, "x": 52, "width": 95, "var": "txt5", "overflow": "hidden", "height": 30, "fontSize": 24, "color": "#ffcc33", "align": "center" } }, { "type": "Text", "props": { "y": 432, "x": 207, "width": 95, "var": "txt6", "overflow": "hidden", "height": 30, "fontSize": 24, "color": "#ffcc33", "align": "center" } }] }, { "type": "Box", "props": { "y": 30, "x": 0, "width": 650, "height": 572 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 11, "width": 152, "var": "headIcon", "height": 152 }, "child": [{ "type": "Image", "props": { "y": -4, "x": -7, "width": 166, "skin": "ui/common/avatorFrame.png", "sizeGrid": "44,46,55,43", "height": 166 } }] }, { "type": "Image", "props": { "y": 6, "x": 193, "skin": "ui/agent/img_daili_xinxizi.png", "height": 139 }, "child": [{ "type": "Text", "props": { "y": -1, "x": 93, "width": 200, "var": "referrerTxt", "height": 34, "fontSize": 34, "color": "#efe8cd" } }, { "type": "Text", "props": { "y": 51, "x": 155, "width": 200, "var": "superiorTxt", "height": 34, "fontSize": 34, "color": "#efe8cd" } }, { "type": "Text", "props": { "y": 102, "x": 189, "width": 200, "var": "affcodeTxt", "height": 34, "fontSize": 34, "color": "#efe8cd" } }] }, { "type": "Image", "props": { "y": 210, "var": "qrbox", "skin": "ui/agent/img_daili_ewm.png" } }, { "type": "Image", "props": { "y": 385, "x": 325, "var": "copyLinkBtn", "skin": "ui/agent/img_daili_fuzhilianjie.png", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 385, "x": 545, "var": "wechatBtn", "skin": "ui/agent/img_daili_weixinfenxiang.png", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 266, "x": 233, "width": 410, "skin": "ui/res_login/img_dl_shurukuang04.png", "height": 50, "sizeGrid": "20,20,20,20" }, "child": [{ "type": "Text", "props": { "y": 8, "x": 21, "width": 368, "var": "linkTxt", "valign": "middle", "overflow": "hidden", "fontSize": 34, "color": "#efe8cd" } }, { "type": "Text", "props": { "y": -56, "x": 1, "text": "分享链接发给好友下载游戏", "fontSize": 34, "font": "SimHei", "color": "#ebeff0" } }] }, { "type": "Image", "props": { "y": 442, "x": 0, "skin": "ui/agent/img_daili-wenxianzi02.png" } }] }] };
                return AgentInfoViewUI;
            }(View));
            agent.AgentInfoViewUI = AgentInfoViewUI;
        })(agent = dlg.agent || (dlg.agent = {}));
    })(dlg = ui.dlg || (ui.dlg = {}));
})(ui || (ui = {}));
(function (ui) {
    var dlg;
    (function (dlg) {
        var agent;
        (function (agent) {
            var AgentQrDlgUI = /** @class */ (function (_super) {
                __extends(AgentQrDlgUI, _super);
                function AgentQrDlgUI() {
                    return _super.call(this) || this;
                }
                AgentQrDlgUI.prototype.createChildren = function () {
                    _super.prototype.createChildren.call(this);
                    this.createView(ui.dlg.agent.AgentQrDlgUI.uiView);
                };
                AgentQrDlgUI.uiView = { "type": "Dialog", "props": { "width": 1334, "height": 750 }, "child": [{ "type": "Box", "props": { "width": 1334, "var": "posterNode", "height": 750, "centerY": 0, "centerX": 0 }, "child": [{ "type": "Image", "props": { "y": 0, "x": -145, "var": "bgImage", "skin": "ui/agent/qrposter/img_dlewm_bg2.png", "centerY": 0, "centerX": 0 } }, { "type": "Image", "props": { "y": 130, "x": 1003, "top": 130, "skin": "ui/agent/qrposter/img_dlewm_f-sys.png", "right": 111 } }, { "type": "Image", "props": { "y": 216, "x": 365, "var": "gameImage", "skin": "ui/agent/qrposter/img_dlewm_icon4.png" } }, { "type": "Image", "props": { "y": 36, "x": -3, "var": "girlImage", "skin": "ui/agent/qrposter/img_dlewm_mn1.png" } }, { "type": "Image", "props": { "y": 666, "x": 332, "skin": "ui/agent/qrposter/img_dlewm_f-wmk.png", "left": 332, "bottom": 16 } }, { "type": "Box", "props": { "y": 19, "x": 411, "width": 507, "var": "logoBox", "top": 19, "left": 411, "height": 191 }, "child": [{ "type": "Image", "props": { "var": "logoImage", "centerY": 0, "centerX": 0 } }] }, { "type": "Label", "props": { "x": 448, "wordWrap": true, "width": 475, "var": "msgLabel", "valign": "middle", "top": 200, "skewX": -10, "pivotX": -2, "height": 88, "fontSize": 44, "font": "Microsoft YaHei", "color": "#fbe66f", "bold": false, "align": "center" } }, { "type": "Image", "props": { "y": 217, "x": 942, "width": 326, "var": "qrIcon", "top": 217, "right": 66, "height": 326 } }] }, { "type": "Box", "props": { "width": 1334, "var": "ctrlNode", "height": 750, "centerY": 0, "centerX": 0 }, "child": [{ "type": "Image", "props": { "y": 558, "x": 996, "var": "saveBtn", "top": 558, "skin": "ui/agent/qrposter/btn_dlewm_yjbc.png", "right": 119 } }, { "type": "Image", "props": { "y": 57, "x": 1254, "var": "closeBtn", "top": 17, "skin": "ui/common/newclose.png", "right": 42, "anchorY": 0.5, "anchorX": 0.5 } }] }] };
                return AgentQrDlgUI;
            }(Dialog));
            agent.AgentQrDlgUI = AgentQrDlgUI;
        })(agent = dlg.agent || (dlg.agent = {}));
    })(dlg = ui.dlg || (ui.dlg = {}));
})(ui || (ui = {}));
(function (ui) {
    var dlg;
    (function (dlg) {
        var agent;
        (function (agent) {
            var CommisionRatioDlgUI = /** @class */ (function (_super) {
                __extends(CommisionRatioDlgUI, _super);
                function CommisionRatioDlgUI() {
                    return _super.call(this) || this;
                }
                CommisionRatioDlgUI.prototype.createChildren = function () {
                    _super.prototype.createChildren.call(this);
                    this.createView(ui.dlg.agent.CommisionRatioDlgUI.uiView);
                };
                CommisionRatioDlgUI.uiView = { "type": "Dialog", "props": { "width": 1034, "height": 630 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "skin": "ui/panel_common/maxdlg.png" }, "child": [{ "type": "Image", "props": { "y": 21, "x": 404, "skin": "ui/agent/img_dlsm-fyblb_fyblb.png" } }, { "type": "Image", "props": { "y": 50, "x": 989, "var": "closeBtn", "skin": "ui/common/newclose.png", "anchorY": 0.5, "anchorX": 0.5 } }] }, { "type": "Image", "props": { "y": 99, "x": 20, "width": 993, "skin": "ui/common/img_com_xiankuang.png", "sizeGrid": "10,10,10,10", "height": 510, "centerX": -1 } }, { "type": "Panel", "props": { "y": 157, "x": 23, "width": 988, "var": "itemPanel", "height": 449 } }, { "type": "Image", "props": { "y": 99, "x": 23, "skin": "ui/agent/img_dlsm-fyblb_bt.png" } }] };
                return CommisionRatioDlgUI;
            }(Dialog));
            agent.CommisionRatioDlgUI = CommisionRatioDlgUI;
        })(agent = dlg.agent || (dlg.agent = {}));
    })(dlg = ui.dlg || (ui.dlg = {}));
})(ui || (ui = {}));
(function (ui) {
    var dlg;
    (function (dlg) {
        var agent;
        (function (agent) {
            var CommisionRecordDlgUI = /** @class */ (function (_super) {
                __extends(CommisionRecordDlgUI, _super);
                function CommisionRecordDlgUI() {
                    return _super.call(this) || this;
                }
                CommisionRecordDlgUI.prototype.createChildren = function () {
                    _super.prototype.createChildren.call(this);
                    this.createView(ui.dlg.agent.CommisionRecordDlgUI.uiView);
                };
                CommisionRecordDlgUI.uiView = { "type": "Dialog", "props": { "width": 1034, "height": 630 }, "child": [{ "type": "Image", "props": { "skin": "ui/panel_common/maxdlg.png" } }, { "type": "Image", "props": { "y": 18, "skin": "ui/agent/img_tyjl_tyjl.png", "centerX": 8 } }, { "type": "Image", "props": { "y": 99, "width": 970, "skin": "ui/common/img_com_xiankuang.png", "sizeGrid": "10,10,10,10", "height": 425, "centerX": 0 } }, { "type": "Image", "props": { "y": 109, "var": "order_dummy", "skin": "ui/agent/img_tyjl_kuang.png", "centerX": 0 }, "child": [{ "type": "Image", "props": { "y": 11, "x": 435, "skin": "ui/agent/img_daili_fuzhi.png", "name": "copy" } }, { "type": "Label", "props": { "y": 10, "x": 35, "width": 150, "valign": "middle", "text": "订单号：", "name": "orderlabel", "height": 35, "fontSize": 26, "font": "Microsoft YaHei", "color": "#f9cb46", "align": "right" } }, { "type": "Label", "props": { "y": 10, "x": 188, "width": 279, "valign": "middle", "text": "-", "name": "order", "height": 35, "fontSize": 24, "color": "#9cc5d8" } }, { "type": "Label", "props": { "y": 49, "x": 35, "width": 150, "valign": "middle", "text": "创建时间：", "name": "timelabel", "height": 35, "fontSize": 26, "font": "Microsoft YaHei", "color": "#f9cb46", "align": "right" } }, { "type": "Label", "props": { "y": 49, "x": 188, "width": 279, "valign": "middle", "text": "-", "name": "time", "height": 35, "fontSize": 24, "color": "#9cc5d8" } }, { "type": "Label", "props": { "y": 14, "x": 700, "width": 114, "text": "状态：", "name": "statuslabel", "height": 35, "fontSize": 26, "font": "Microsoft YaHei", "color": "#f9cb46", "align": "right" } }, { "type": "Label", "props": { "y": 14, "x": 803, "width": 85, "text": "-", "name": "status", "height": 35, "fontSize": 26, "font": "Microsoft YaHei", "color": "#f9cb46", "align": "left" } }, { "type": "Label", "props": { "y": 42, "x": 701, "width": 179, "valign": "middle", "text": "0 元", "name": "amount", "height": 44, "fontSize": 36, "font": "Microsoft YaHei", "color": "#a2e1ee", "align": "right" } }] }, { "type": "View", "props": { "y": 100, "x": 31, "width": 970, "var": "contents", "height": 420 }, "child": [{ "type": "Label", "props": { "y": 105, "x": 0, "width": 970, "var": "instructions", "valign": "middle", "text": "您目前无任何提佣记录", "height": 100, "fontSize": 24, "font": "Microsoft YaHei", "color": "#9cc5d8", "align": "center" } }] }, { "type": "Image", "props": { "y": 51, "x": 985, "var": "btnClose", "top": 12, "skin": "ui/common/newclose.png", "right": 10, "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 575, "x": 915, "var": "btnContact", "skin": "ui/agent/b_tyjl_lxkf.png", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Label", "props": { "y": 527, "x": 38, "width": 713, "valign": "middle", "text": "提示：如对佣金结算有疑问，请联系客服", "height": 96, "fontSize": 24, "font": "Microsoft YaHei", "color": "#f9cb46" } }] };
                return CommisionRecordDlgUI;
            }(Dialog));
            agent.CommisionRecordDlgUI = CommisionRecordDlgUI;
        })(agent = dlg.agent || (dlg.agent = {}));
    })(dlg = ui.dlg || (ui.dlg = {}));
})(ui || (ui = {}));
(function (ui) {
    var dlg;
    (function (dlg) {
        var agent;
        (function (agent) {
            var CRatioItemUI = /** @class */ (function (_super) {
                __extends(CRatioItemUI, _super);
                function CRatioItemUI() {
                    return _super.call(this) || this;
                }
                CRatioItemUI.prototype.createChildren = function () {
                    _super.prototype.createChildren.call(this);
                    this.createView(ui.dlg.agent.CRatioItemUI.uiView);
                };
                CRatioItemUI.uiView = { "type": "View", "props": { "width": 984, "height": 41 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "var": "bgIcon", "skin": "ui/agent/img_dlsm-fyblb_xzk.png" } }, { "type": "Label", "props": { "y": 2, "x": 115, "width": 100, "var": "numTxt", "valign": "middle", "text": "0", "height": 36, "fontSize": 28, "color": "#efe8cd", "align": "center" } }, { "type": "Label", "props": { "y": 2, "x": 297, "width": 360, "var": "rangeTxt", "valign": "middle", "text": "0", "height": 36, "fontSize": 28, "color": "#efe8cd", "align": "center" } }, { "type": "Label", "props": { "y": 2, "x": 657, "width": 320, "var": "paysTxt", "valign": "middle", "text": "0", "height": 36, "fontSize": 28, "color": "#ffba25", "align": "center" } }] };
                return CRatioItemUI;
            }(View));
            agent.CRatioItemUI = CRatioItemUI;
        })(agent = dlg.agent || (dlg.agent = {}));
    })(dlg = ui.dlg || (ui.dlg = {}));
})(ui || (ui = {}));
(function (ui) {
    var dlg;
    (function (dlg) {
        var agent;
        (function (agent) {
            var CreatInviteCodeDlgUI = /** @class */ (function (_super) {
                __extends(CreatInviteCodeDlgUI, _super);
                function CreatInviteCodeDlgUI() {
                    return _super.call(this) || this;
                }
                CreatInviteCodeDlgUI.prototype.createChildren = function () {
                    _super.prototype.createChildren.call(this);
                    this.createView(ui.dlg.agent.CreatInviteCodeDlgUI.uiView);
                };
                CreatInviteCodeDlgUI.uiView = { "type": "Dialog", "props": { "width": 754, "height": 480 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "skin": "ui/panel_common/mindlg.png" }, "child": [{ "type": "Image", "props": { "y": 22, "x": 282, "skin": "ui/agent/img_daili_zi_yaoqingma.png" } }, { "type": "Image", "props": { "y": 386, "x": 272, "var": "okBtn", "skin": "ui/common/queding.png" } }, { "type": "Image", "props": { "y": 103, "x": 30, "width": 694, "skin": "ui/common/img_com_xiankuang.png", "height": 274, "sizeGrid": "15,15,15,16" } }, { "type": "Image", "props": { "y": 55, "x": 708, "var": "closeBtn", "skin": "ui/common/newclose.png", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 162, "x": 172, "width": 410, "skin": "ui/res_login/img_dl_shurukuang04.png", "height": 50, "sizeGrid": "20,20,20,20" }, "child": [{ "type": "TextInput", "props": { "y": 2, "x": 15, "width": 380, "var": "codeTxt", "valign": "middle", "type": "text", "restrict": "a-z0-9", "promptColor": "#93afc0", "prompt": "4-12位字母或数字", "maxChars": 12, "height": 46, "fontSize": 30, "color": "#ffffff", "align": "center" } }] }, { "type": "Image", "props": { "y": 281, "x": 376, "var": "creatBtn", "skin": "ui/agent/img_daili_dianjixuanma.png", "anchorY": 0.5, "anchorX": 0.5 } }] }] };
                return CreatInviteCodeDlgUI;
            }(Dialog));
            agent.CreatInviteCodeDlgUI = CreatInviteCodeDlgUI;
        })(agent = dlg.agent || (dlg.agent = {}));
    })(dlg = ui.dlg || (ui.dlg = {}));
})(ui || (ui = {}));
(function (ui) {
    var dlg;
    (function (dlg) {
        var agent;
        (function (agent) {
            var DirectlyItemUI = /** @class */ (function (_super) {
                __extends(DirectlyItemUI, _super);
                function DirectlyItemUI() {
                    return _super.call(this) || this;
                }
                DirectlyItemUI.prototype.createChildren = function () {
                    View.regComponent("Text", laya.display.Text);
                    _super.prototype.createChildren.call(this);
                    this.createView(ui.dlg.agent.DirectlyItemUI.uiView);
                };
                DirectlyItemUI.uiView = { "type": "View", "props": { "width": 1014, "height": 58 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "var": "itemBg", "skin": "ui/agent/img_daili_tiaodibian01.png" }, "child": [{ "type": "Text", "props": { "y": 16, "x": 10, "width": 162, "var": "dtxt1", "text": "name", "overflow": "hidden", "fontSize": 26, "color": "#9cc5d8" } }, { "type": "Text", "props": { "y": 16, "x": 171, "width": 81, "var": "dtxt2", "text": "type", "overflow": "hidden", "fontSize": 26, "color": "#9cc5d8", "align": "center" } }, { "type": "Text", "props": { "y": 16, "x": 254, "width": 216, "var": "dtxt3", "text": "name", "overflow": "hidden", "fontSize": 26, "color": "#ffba25", "align": "center" } }, { "type": "Text", "props": { "y": 16, "x": 477, "width": 216, "var": "dtxt4", "text": "name", "overflow": "hidden", "fontSize": 26, "color": "#ffba25", "align": "center" } }, { "type": "Text", "props": { "y": 16, "x": 699, "width": 118, "var": "dtxt5", "text": "type", "overflow": "hidden", "fontSize": 26, "color": "#9cc5d8", "align": "center" } }, { "type": "Text", "props": { "y": 16, "x": 821, "width": 118, "var": "dtxt6", "text": "type", "overflow": "hidden", "fontSize": 26, "color": "#9cc5d8", "align": "center" } }, { "type": "Image", "props": { "y": 29, "x": 974, "var": "setBtn", "skin": "ui/agent/btn_daili_xiugai.png", "anchorY": 0.5, "anchorX": 0.5 } }] }] };
                return DirectlyItemUI;
            }(View));
            agent.DirectlyItemUI = DirectlyItemUI;
        })(agent = dlg.agent || (dlg.agent = {}));
    })(dlg = ui.dlg || (ui.dlg = {}));
})(ui || (ui = {}));
(function (ui) {
    var dlg;
    (function (dlg) {
        var agent;
        (function (agent) {
            var DirectlyViewUI = /** @class */ (function (_super) {
                __extends(DirectlyViewUI, _super);
                function DirectlyViewUI() {
                    return _super.call(this) || this;
                }
                DirectlyViewUI.prototype.createChildren = function () {
                    _super.prototype.createChildren.call(this);
                    this.createView(ui.dlg.agent.DirectlyViewUI.uiView);
                };
                DirectlyViewUI.uiView = { "type": "View", "props": { "width": 1014, "height": 620 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 460, "skin": "ui/res_login/img_dl_shurukuang04.png", "height": 58, "sizeGrid": "20,20,20,20" }, "child": [{ "type": "TextInput", "props": { "y": 6, "x": 15, "width": 297, "var": "inputTxt", "valign": "middle", "type": "text", "promptColor": "#9cc5d8", "prompt": "请输入代理的用户名", "overflow": "hidden", "height": 46, "fontSize": 30, "color": "#ffffff" } }, { "type": "Image", "props": { "y": 30, "x": 388, "var": "seachBtn", "skin": "ui/agent/btn_daili_sousuokuang.png", "anchorY": 0.5, "anchorX": 0.5 } }] }, { "type": "Image", "props": { "y": 1, "x": 500, "var": "addBtn", "skin": "ui/agent/btn_daili_tianjiayonghu.png" } }, { "type": "Image", "props": { "y": 78, "x": 0, "skin": "ui/agent/img_daili_tou_zhishu.png" } }, { "type": "Panel", "props": { "y": 128, "x": 0, "width": 1014, "var": "itemPanel", "height": 484 } }] };
                return DirectlyViewUI;
            }(View));
            agent.DirectlyViewUI = DirectlyViewUI;
        })(agent = dlg.agent || (dlg.agent = {}));
    })(dlg = ui.dlg || (ui.dlg = {}));
})(ui || (ui = {}));
(function (ui) {
    var dlg;
    (function (dlg) {
        var agent;
        (function (agent) {
            var EnterpriseItemUI = /** @class */ (function (_super) {
                __extends(EnterpriseItemUI, _super);
                function EnterpriseItemUI() {
                    return _super.call(this) || this;
                }
                EnterpriseItemUI.prototype.createChildren = function () {
                    View.regComponent("Text", laya.display.Text);
                    _super.prototype.createChildren.call(this);
                    this.createView(ui.dlg.agent.EnterpriseItemUI.uiView);
                };
                EnterpriseItemUI.uiView = { "type": "View", "props": { "width": 1014, "height": 58 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "var": "bgIcon", "skin": "ui/agent/img_daili_tiaodibian01.png" }, "child": [{ "type": "Text", "props": { "y": 16, "x": 173, "width": 193, "var": "etxt2", "text": "type", "overflow": "hidden", "fontSize": 26, "color": "#ffba25", "align": "center" } }, { "type": "Text", "props": { "y": 16, "x": 370, "width": 216, "var": "etxt3", "text": "name", "overflow": "hidden", "fontSize": 26, "color": "#ffba25", "align": "center" } }, { "type": "Text", "props": { "y": 16, "x": 583, "width": 114, "var": "etxt4", "text": "name", "overflow": "hidden", "fontSize": 26, "color": "#9cc5d8", "align": "center" } }, { "type": "Text", "props": { "y": 16, "x": 699, "width": 103, "var": "etxt5", "text": "type", "overflow": "hidden", "fontSize": 26, "color": "#9cc5d8", "align": "center" } }, { "type": "Text", "props": { "y": 16, "x": 806, "width": 204, "var": "etxt6", "text": "type", "overflow": "hidden", "fontSize": 26, "color": "#ffba25", "align": "center" } }, { "type": "Text", "props": { "y": 16, "x": 3, "width": 162, "var": "etxt1", "text": "xxx", "overflow": "scroll", "fontSize": 26, "color": "#9cc5d8", "align": "center" } }] }] };
                return EnterpriseItemUI;
            }(View));
            agent.EnterpriseItemUI = EnterpriseItemUI;
        })(agent = dlg.agent || (dlg.agent = {}));
    })(dlg = ui.dlg || (ui.dlg = {}));
})(ui || (ui = {}));
(function (ui) {
    var dlg;
    (function (dlg) {
        var agent;
        (function (agent) {
            var EnterpriseViewUI = /** @class */ (function (_super) {
                __extends(EnterpriseViewUI, _super);
                function EnterpriseViewUI() {
                    return _super.call(this) || this;
                }
                EnterpriseViewUI.prototype.createChildren = function () {
                    _super.prototype.createChildren.call(this);
                    this.createView(ui.dlg.agent.EnterpriseViewUI.uiView);
                };
                EnterpriseViewUI.uiView = { "type": "View", "props": { "y": 0, "x": 0, "width": 1014, "height": 620 }, "child": [{ "type": "CheckBox", "props": { "y": 0, "x": 0, "var": "check1", "stateNum": 2, "skin": "ui/agent/check_dltb.png" }, "child": [{ "type": "Image", "props": { "y": 9, "x": 70, "skin": "ui/agent/img_daili_zi_jinri.png" } }] }, { "type": "CheckBox", "props": { "y": 0, "x": 209, "var": "check2", "stateNum": 2, "skin": "ui/agent/check_dltb.png" }, "child": [{ "type": "Image", "props": { "y": 9, "x": 70, "skin": "ui/agent/img_daili_zi_zuori.png" } }] }, { "type": "CheckBox", "props": { "y": 0, "x": 419, "var": "check3", "stateNum": 2, "skin": "ui/agent/check_dltb.png" }, "child": [{ "type": "Image", "props": { "y": 9, "x": 70, "skin": "ui/agent/img_daili_zi_benzhou.png" } }] }, { "type": "CheckBox", "props": { "y": 0, "x": 628, "var": "check4", "stateNum": 2, "skin": "ui/agent/check_dltb.png" }, "child": [{ "type": "Image", "props": { "y": 9, "x": 70, "skin": "ui/agent/img_daili_zi_shangzhou.png" } }] }, { "type": "CheckBox", "props": { "y": 0, "x": 837, "var": "check5", "stateNum": 2, "skin": "ui/agent/check_dltb.png" }, "child": [{ "type": "Image", "props": { "y": 9, "x": 70, "skin": "ui/agent/img_daili_zi_benyue.png" } }] }, { "type": "Image", "props": { "y": 74, "x": 0, "skin": "ui/agent/img_daili_tou_wdyj.png" } }, { "type": "Panel", "props": { "y": 124, "x": 0, "width": 1014, "var": "itemPanel", "height": 486 } }] };
                return EnterpriseViewUI;
            }(View));
            agent.EnterpriseViewUI = EnterpriseViewUI;
        })(agent = dlg.agent || (dlg.agent = {}));
    })(dlg = ui.dlg || (ui.dlg = {}));
})(ui || (ui = {}));
(function (ui) {
    var dlg;
    (function (dlg) {
        var agent;
        (function (agent) {
            var InviteCodeItemUI = /** @class */ (function (_super) {
                __extends(InviteCodeItemUI, _super);
                function InviteCodeItemUI() {
                    return _super.call(this) || this;
                }
                InviteCodeItemUI.prototype.createChildren = function () {
                    View.regComponent("Text", laya.display.Text);
                    _super.prototype.createChildren.call(this);
                    this.createView(ui.dlg.agent.InviteCodeItemUI.uiView);
                };
                InviteCodeItemUI.uiView = { "type": "View", "props": { "width": 1014, "height": 130 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "skin": "ui/agent/img_daili_ewm_ditiao.png" } }, { "type": "Image", "props": { "y": 19, "x": 714, "width": 96, "var": "qrIcon", "height": 96 } }, { "type": "Label", "props": { "y": 19, "x": 265, "width": 386, "var": "linkTxt", "text": "label", "overflow": "hidden", "mouseEnabled": false, "height": 34, "fontSize": 34, "color": "efe8cd" } }, { "type": "Text", "props": { "y": 52, "x": 4, "width": 226, "var": "codeTxt", "text": "text", "overflow": "hidden", "height": 26, "fontSize": 26, "color": "ffba25", "align": "center" } }, { "type": "Image", "props": { "y": 95, "x": 354, "width": 138, "var": "copyBtn", "skin": "ui/agent/img_daili_fuzhilianjie.png", "height": 50, "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 65, "x": 932, "var": "delBtn", "skin": "ui/agent/img_daili_shanchuewm.png", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 95, "x": 558, "width": 138, "var": "shareBtn", "skin": "ui/agent/img_daili_weixinfenxiang.png", "height": 50, "anchorY": 0.5, "anchorX": 0.5 } }] };
                return InviteCodeItemUI;
            }(View));
            agent.InviteCodeItemUI = InviteCodeItemUI;
        })(agent = dlg.agent || (dlg.agent = {}));
    })(dlg = ui.dlg || (ui.dlg = {}));
})(ui || (ui = {}));
(function (ui) {
    var dlg;
    (function (dlg) {
        var agent;
        (function (agent) {
            var InviteCodeViewUI = /** @class */ (function (_super) {
                __extends(InviteCodeViewUI, _super);
                function InviteCodeViewUI() {
                    return _super.call(this) || this;
                }
                InviteCodeViewUI.prototype.createChildren = function () {
                    _super.prototype.createChildren.call(this);
                    this.createView(ui.dlg.agent.InviteCodeViewUI.uiView);
                };
                InviteCodeViewUI.uiView = { "type": "View", "props": { "y": 0, "x": 0, "width": 1014, "height": 620 }, "child": [{ "type": "Image", "props": { "y": 28, "x": 104, "var": "creatBtn", "skin": "ui/agent/img_daili_shengcheng.png", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 76, "x": 0, "skin": "ui/agent/img_daili_tou_ewm.png" } }, { "type": "Panel", "props": { "y": 132, "x": 0, "width": 1014, "var": "itemPanel", "height": 482 } }] };
                return InviteCodeViewUI;
            }(View));
            agent.InviteCodeViewUI = InviteCodeViewUI;
        })(agent = dlg.agent || (dlg.agent = {}));
    })(dlg = ui.dlg || (ui.dlg = {}));
})(ui || (ui = {}));
(function (ui) {
    var dlg;
    (function (dlg) {
        var AgentCenterDlgUI = /** @class */ (function (_super) {
            __extends(AgentCenterDlgUI, _super);
            function AgentCenterDlgUI() {
                return _super.call(this) || this;
            }
            AgentCenterDlgUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.dlg.AgentCenterDlgUI.uiView);
            };
            AgentCenterDlgUI.uiView = { "type": "Dialog", "props": { "width": 1334, "height": 750 }, "child": [{ "type": "Image", "props": { "y": 0, "skin": "ui/panel_common/img_com_quanping_di.jpg", "centerX": 0 } }, { "type": "Box", "props": { "y": 0, "width": 695, "var": "topRightGroup", "right": -55, "height": 92 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 695, "width": 292, "var": "backBtn", "skin": "ui/common/img_com_quanping_guanbi01.png", "pivotX": 292 }, "child": [{ "type": "Image", "props": { "y": 12, "x": 123, "skin": "ui/common/img_com_quanping_guanbi02.png" } }] }, { "type": "Image", "props": { "y": 46, "x": 353, "var": "recordBtn", "skin": "ui/agent/b_dlzx_tyjl.png", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 45, "x": 120, "var": "rebateBtn", "skin": "ui/agent/b_dlzx_fyblb.png", "anchorY": 0.5, "anchorX": 0.5 } }] }, { "type": "Box", "props": { "y": 0, "var": "topLeftGroup", "left": -40 }, "child": [{ "type": "Image", "props": { "y": 87, "x": 0, "skin": "ui/panel_common/img_com_quanping_cedi.png" }, "child": [{ "type": "Image", "props": { "y": 42, "x": 305, "var": "tab0", "skin": "ui/panel_common/img_com_quanping_ce_di.png", "pivotX": 305 }, "child": [{ "type": "Image", "props": { "y": 25, "x": 80, "skin": "ui/agent/img_daili_zi05.png", "pivotY": 0.5, "pivotX": 0.5 } }, { "type": "Image", "props": { "y": -7, "x": 0, "skin": "ui/panel_common/img_com_quanping_ce_xuanzhong.png", "name": "tab_on" }, "child": [{ "type": "Image", "props": { "y": 32, "x": 80, "skin": "ui/agent/img_daili_zi010.png", "pivotY": 0.5, "pivotX": 0.5 } }] }] }, { "type": "Image", "props": { "y": 152, "x": 305, "var": "tab1", "skin": "ui/panel_common/img_com_quanping_ce_di.png", "pivotX": 305 }, "child": [{ "type": "Image", "props": { "y": 25, "x": 80, "skin": "ui/agent/img_daili_zi04.png", "pivotY": 0.5, "pivotX": 0.5 } }, { "type": "Image", "props": { "y": -7, "x": 0, "skin": "ui/panel_common/img_com_quanping_ce_xuanzhong.png", "name": "tab_on" }, "child": [{ "type": "Image", "props": { "y": 32, "x": 78, "skin": "ui/agent/img_daili_zi09.png", "pivotY": 0.5, "pivotX": 0.5 } }] }] }, { "type": "Image", "props": { "y": 262, "x": 305, "var": "tab2", "skin": "ui/panel_common/img_com_quanping_ce_di.png", "pivotX": 305 }, "child": [{ "type": "Image", "props": { "y": 25, "x": 80, "skin": "ui/agent/img_daili_zi03.png", "pivotY": 0.5, "pivotX": 0.5 } }, { "type": "Image", "props": { "y": -7, "x": 0, "skin": "ui/panel_common/img_com_quanping_ce_xuanzhong.png", "name": "tab_on" }, "child": [{ "type": "Image", "props": { "y": 32, "x": 80, "skin": "ui/agent/img_daili_zi08.png", "pivotY": 0.5, "pivotX": 0.5 } }] }] }, { "type": "Image", "props": { "y": 371, "x": 305, "var": "tab3", "skin": "ui/panel_common/img_com_quanping_ce_di.png", "pivotX": 305 }, "child": [{ "type": "Image", "props": { "y": 25, "x": 80, "skin": "ui/agent/img_daili_zi02.png", "pivotY": 0.5, "pivotX": 0.5 } }, { "type": "Image", "props": { "y": -7, "x": 0, "skin": "ui/panel_common/img_com_quanping_ce_xuanzhong.png", "name": "tab_on" }, "child": [{ "type": "Image", "props": { "y": 32, "x": 80, "skin": "ui/agent/img_daili_zi07.png", "pivotY": 0.5, "pivotX": 0.5 } }] }] }, { "type": "Image", "props": { "y": 481, "x": 305, "var": "tab4", "skin": "ui/panel_common/img_com_quanping_ce_di.png", "pivotX": 305 }, "child": [{ "type": "Image", "props": { "y": 25, "x": 80, "skin": "ui/agent/img_daili_zi01.png", "pivotY": 0.5, "pivotX": 0.5 } }, { "type": "Image", "props": { "y": -7, "x": 0, "skin": "ui/panel_common/img_com_quanping_ce_xuanzhong.png", "name": "tab_on" }, "child": [{ "type": "Image", "props": { "y": 32, "x": 80, "skin": "ui/agent/img_daili_zi06.png", "pivotY": 0.5, "pivotX": 0.5 } }] }] }] }, { "type": "Image", "props": { "y": 0, "x": 0, "width": 482, "skin": "ui/panel_common/img_com_quanping_ce_biaotou.png" }, "child": [{ "type": "Image", "props": { "y": 19, "x": 50, "skin": "ui/agent/icon_dlzx_bt.png" } }, { "type": "Image", "props": { "y": 27, "x": 180, "skin": "ui/agent/img_daili_biaotou02.png" } }] }] }, { "type": "Box", "props": { "y": 88, "width": 900, "var": "viewBox", "height": 660, "centerX": 136 } }] };
            return AgentCenterDlgUI;
        }(Dialog));
        dlg.AgentCenterDlgUI = AgentCenterDlgUI;
    })(dlg = ui.dlg || (ui.dlg = {}));
})(ui || (ui = {}));
(function (ui) {
    var dlg;
    (function (dlg) {
        var balance;
        (function (balance) {
            var AccessDetailDlgUI = /** @class */ (function (_super) {
                __extends(AccessDetailDlgUI, _super);
                function AccessDetailDlgUI() {
                    return _super.call(this) || this;
                }
                AccessDetailDlgUI.prototype.createChildren = function () {
                    _super.prototype.createChildren.call(this);
                    this.createView(ui.dlg.balance.AccessDetailDlgUI.uiView);
                };
                AccessDetailDlgUI.uiView = { "type": "Dialog", "props": { "width": 1034, "height": 630 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "skin": "ui/panel_common/maxdlg.png" }, "child": [{ "type": "Image", "props": { "y": 19, "x": 414, "skin": "ui/balance/subres/img_yeb-cqmx_cqmx.png" } }, { "type": "Image", "props": { "y": 49, "x": 987, "var": "closeBtn", "skin": "ui/common/newclose.png", "anchorY": 0.5, "anchorX": 0.5 } }] }, { "type": "Image", "props": { "y": 98, "x": 31, "width": 972, "skin": "ui/fullMyCenter/img_com_xiankuang.png", "height": 506, "sizeGrid": "16,17,16,16" } }, { "type": "Panel", "props": { "y": 158, "x": 41, "width": 952, "var": "itemPanel", "height": 440 } }, { "type": "Image", "props": { "y": 98, "x": 31, "skin": "ui/balance/subres/btn_yeb-cqmx_kuang.png" }, "child": [{ "type": "Image", "props": { "y": 0, "x": 244, "var": "tab2", "skin": "ui/balance/subres/btn_yeb-cqmx_kuang-cr.png" } }, { "type": "Image", "props": { "y": 0, "x": 728, "var": "tab4", "skin": "ui/balance/subres/btn_yeb-cqmx_kuang-cy.png" } }, { "type": "Image", "props": { "y": 0, "x": 0, "var": "tab1", "skin": "ui/balance/subres/btn_yeb-cqmx_kuang-qb.png" } }, { "type": "Image", "props": { "y": 0, "x": 486, "var": "tab3", "skin": "ui/balance/subres/btn_yeb-cqmx_kuang-qc.png" } }] }] };
                return AccessDetailDlgUI;
            }(Dialog));
            balance.AccessDetailDlgUI = AccessDetailDlgUI;
        })(balance = dlg.balance || (dlg.balance = {}));
    })(dlg = ui.dlg || (ui.dlg = {}));
})(ui || (ui = {}));
(function (ui) {
    var dlg;
    (function (dlg) {
        var balance;
        (function (balance) {
            var BalanceChangePwdDlgUI = /** @class */ (function (_super) {
                __extends(BalanceChangePwdDlgUI, _super);
                function BalanceChangePwdDlgUI() {
                    return _super.call(this) || this;
                }
                BalanceChangePwdDlgUI.prototype.createChildren = function () {
                    View.regComponent("ui.dlg.balance.SetPwdViewUI", ui.dlg.balance.SetPwdViewUI);
                    _super.prototype.createChildren.call(this);
                    this.createView(ui.dlg.balance.BalanceChangePwdDlgUI.uiView);
                };
                BalanceChangePwdDlgUI.uiView = { "type": "Dialog", "props": { "width": 754, "height": 480 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "skin": "ui/panel_common/mindlg.png" }, "child": [{ "type": "Image", "props": { "y": 22, "x": 266, "skin": "ui/balance/subres/img_yeb-mm_mm.png" } }, { "type": "Image", "props": { "y": 53, "x": 707, "var": "closeBtn", "skin": "ui/common/newclose.png", "anchorY": 0.5, "anchorX": 0.5 } }] }, { "type": "SetPwdView", "props": { "y": 105, "x": 21, "var": "pwdView", "runtime": "ui.dlg.balance.SetPwdViewUI" } }] };
                return BalanceChangePwdDlgUI;
            }(Dialog));
            balance.BalanceChangePwdDlgUI = BalanceChangePwdDlgUI;
        })(balance = dlg.balance || (dlg.balance = {}));
    })(dlg = ui.dlg || (ui.dlg = {}));
})(ui || (ui = {}));
(function (ui) {
    var dlg;
    (function (dlg) {
        var balance;
        (function (balance) {
            var BalanceHelpDlgUI = /** @class */ (function (_super) {
                __extends(BalanceHelpDlgUI, _super);
                function BalanceHelpDlgUI() {
                    return _super.call(this) || this;
                }
                BalanceHelpDlgUI.prototype.createChildren = function () {
                    _super.prototype.createChildren.call(this);
                    this.createView(ui.dlg.balance.BalanceHelpDlgUI.uiView);
                };
                BalanceHelpDlgUI.uiView = { "type": "Dialog", "props": { "width": 1034, "height": 630 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "skin": "ui/panel_common/maxdlg.png" }, "child": [{ "type": "Image", "props": { "y": 17, "x": 453, "skin": "ui/balance/subres/img_yeb-bz_bz.png" } }, { "type": "Image", "props": { "y": 48, "x": 990, "var": "closeBtn", "skin": "ui/common/newclose.png", "anchorY": 0.5, "anchorX": 0.5 } }] }, { "type": "Image", "props": { "y": 106, "x": 31, "width": 972, "skin": "ui/common/img_com_xiankuang.png", "height": 500, "sizeGrid": "15,15,15,16" } }, { "type": "Panel", "props": { "y": 110, "x": 37, "width": 960, "var": "infoPanel", "height": 490 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 12, "skin": "ui/balance/subres/img_yeb-bz_nr.png" } }] }] };
                return BalanceHelpDlgUI;
            }(Dialog));
            balance.BalanceHelpDlgUI = BalanceHelpDlgUI;
        })(balance = dlg.balance || (dlg.balance = {}));
    })(dlg = ui.dlg || (ui.dlg = {}));
})(ui || (ui = {}));
(function (ui) {
    var dlg;
    (function (dlg) {
        var balance;
        (function (balance) {
            var BalancePwdDlgUI = /** @class */ (function (_super) {
                __extends(BalancePwdDlgUI, _super);
                function BalancePwdDlgUI() {
                    return _super.call(this) || this;
                }
                BalancePwdDlgUI.prototype.createChildren = function () {
                    _super.prototype.createChildren.call(this);
                    this.createView(ui.dlg.balance.BalancePwdDlgUI.uiView);
                };
                BalancePwdDlgUI.uiView = { "type": "Dialog", "props": { "width": 754, "height": 480 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "skin": "ui/panel_common/mindlg.png" }, "child": [{ "type": "Image", "props": { "y": 22, "x": 266, "skin": "ui/balance/subres/img_yeb-mm_mm.png" } }, { "type": "Image", "props": { "y": 53, "x": 707, "var": "closeBtn", "skin": "ui/common/newclose.png", "anchorY": 0.5, "anchorX": 0.5 } }] }, { "type": "Image", "props": { "y": 104, "x": 32, "width": 690, "skin": "ui/fullMyCenter/img_com_xiankuang.png", "height": 272, "sizeGrid": "16,17,16,16" }, "child": [{ "type": "Image", "props": { "y": 63, "x": 30, "skin": "ui/balance/subres/img_yeb-mm_f-szmm.png" } }, { "type": "Image", "props": { "y": 159, "x": 30, "skin": "ui/balance/subres/img_yeb-mm_f-qrmm.png" } }, { "type": "Image", "props": { "y": 52, "x": 180, "width": 410, "skin": "ui/res_login/img_dl_shurukuang04.png", "height": 50, "sizeGrid": "20,20,20,20" }, "child": [{ "type": "TextInput", "props": { "y": 2, "x": 15, "width": 336, "var": "pwdTxt1", "valign": "middle", "type": "password", "restrict": "0123456789", "promptColor": "#93afc0", "prompt": "请输入密码(6位数字)", "maxChars": 6, "height": 46, "fontSize": 30, "color": "#ffffff" } }, { "type": "CheckBox", "props": { "y": 2, "x": 359, "var": "lookBtn1", "stateNum": 2, "skin": "ui/common/check_see2.png", "selected": false } }] }, { "type": "Image", "props": { "y": 148, "x": 180, "width": 410, "skin": "ui/res_login/img_dl_shurukuang04.png", "height": 50, "sizeGrid": "20,20,20,20" }, "child": [{ "type": "TextInput", "props": { "y": 2, "x": 15, "width": 340, "var": "pwdTxt2", "valign": "middle", "type": "password", "restrict": "0123456789", "promptColor": "#93afc0", "prompt": "请再次输入密码", "maxChars": 6, "height": 46, "fontSize": 30, "color": "#ffffff" } }, { "type": "CheckBox", "props": { "y": 2, "x": 359, "var": "lookBtn2", "stateNum": 2, "skin": "ui/common/check_see2.png", "selected": false } }] }] }, { "type": "Image", "props": { "y": 424, "x": 376, "var": "okBtn", "skin": "ui/common/queding.png", "anchorY": 0.5, "anchorX": 0.5 } }] };
                return BalancePwdDlgUI;
            }(Dialog));
            balance.BalancePwdDlgUI = BalancePwdDlgUI;
        })(balance = dlg.balance || (dlg.balance = {}));
    })(dlg = ui.dlg || (ui.dlg = {}));
})(ui || (ui = {}));
(function (ui) {
    var dlg;
    (function (dlg) {
        var balance;
        (function (balance) {
            var DetailItemViewUI = /** @class */ (function (_super) {
                __extends(DetailItemViewUI, _super);
                function DetailItemViewUI() {
                    return _super.call(this) || this;
                }
                DetailItemViewUI.prototype.createChildren = function () {
                    View.regComponent("Text", laya.display.Text);
                    _super.prototype.createChildren.call(this);
                    this.createView(ui.dlg.balance.DetailItemViewUI.uiView);
                };
                DetailItemViewUI.uiView = { "type": "View", "props": { "width": 952, "height": 78 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "skin": "ui/balance/subres/img_czmx_dk023.png", "sizeGrid": "20,0,20,0", "height": 78 } }, { "type": "Text", "props": { "y": 19, "x": 42, "width": 91, "var": "txt1", "text": "存入", "height": 40, "fontSize": 40, "color": "#f9cb46" } }, { "type": "Text", "props": { "y": 16, "x": 152, "width": 239, "var": "txt2", "height": 24, "fontSize": 24, "color": "#a2e1ee" } }, { "type": "Text", "props": { "y": 46, "x": 152, "width": 239, "var": "txt3", "height": 24, "fontSize": 22, "color": "#a2e1ee" } }, { "type": "Text", "props": { "y": 10, "x": 779, "width": 150, "var": "txt4", "height": 32, "fontSize": 32, "color": "#ff1b1b" } }, { "type": "Text", "props": { "y": 42, "x": 636, "width": 135, "text": "余额宝总额 :", "height": 24, "fontSize": 24, "color": "#a2e1ee" } }, { "type": "Text", "props": { "y": 42, "x": 779, "width": 150, "var": "txt5", "overflow": "hidden", "height": 24, "fontSize": 24, "color": "#a2e1ee" } }] };
                return DetailItemViewUI;
            }(View));
            balance.DetailItemViewUI = DetailItemViewUI;
        })(balance = dlg.balance || (dlg.balance = {}));
    })(dlg = ui.dlg || (ui.dlg = {}));
})(ui || (ui = {}));
(function (ui) {
    var dlg;
    (function (dlg) {
        var balance;
        (function (balance) {
            var SetPwdViewUI = /** @class */ (function (_super) {
                __extends(SetPwdViewUI, _super);
                function SetPwdViewUI() {
                    return _super.call(this) || this;
                }
                SetPwdViewUI.prototype.createChildren = function () {
                    View.regComponent("Text", laya.display.Text);
                    _super.prototype.createChildren.call(this);
                    this.createView(ui.dlg.balance.SetPwdViewUI.uiView);
                };
                SetPwdViewUI.uiView = { "type": "View", "props": { "width": 712, "height": 380 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 712, "skin": "ui/common/img_com_xiankuang.png", "height": 276, "sizeGrid": "15,15,15,16" }, "child": [{ "type": "Box", "props": { "y": 60, "x": 63, "var": "panel1" }, "child": [{ "type": "Image", "props": { "y": 11, "x": 0, "skin": "ui/balance/subres/img_yeb-mm_f-jmm.png" } }, { "type": "Image", "props": { "y": 86, "x": 0, "skin": "ui/balance/subres/img_yeb-mm_f-szmm.png" } }, { "type": "Image", "props": { "y": 160, "x": 0, "skin": "ui/balance/subres/img_yeb-mm_f-qrmm.png" } }, { "type": "Image", "props": { "y": 0, "x": 176, "width": 410, "skin": "ui/res_login/img_dl_shurukuang04.png", "height": 50, "sizeGrid": "20,20,20,20" }, "child": [{ "type": "TextInput", "props": { "y": 2, "x": 15, "width": 340, "var": "pwdTxt1", "valign": "middle", "type": "password", "promptColor": "#93afc0", "prompt": "请输入旧密码", "height": 46, "fontSize": 30, "color": "#ffffff" } }, { "type": "CheckBox", "props": { "y": 2, "x": 359, "var": "lookBtn1", "stateNum": 2, "skin": "ui/common/check_see2.png", "selected": false } }] }, { "type": "Image", "props": { "y": 75, "x": 176, "width": 410, "skin": "ui/res_login/img_dl_shurukuang04.png", "height": 50, "sizeGrid": "20,20,20,20" }, "child": [{ "type": "TextInput", "props": { "y": 2, "x": 15, "width": 340, "var": "pwdTxt2", "valign": "middle", "type": "password", "restrict": "0123456789", "promptColor": "#93afc0", "prompt": "请输入新密码(6位数字)", "maxChars": 6, "height": 46, "fontSize": 30, "color": "#ffffff" } }, { "type": "CheckBox", "props": { "y": 2, "x": 359, "var": "lookBtn2", "stateNum": 2, "skin": "ui/common/check_see2.png", "selected": false } }] }, { "type": "Image", "props": { "y": 149, "x": 176, "width": 410, "skin": "ui/res_login/img_dl_shurukuang04.png", "height": 50, "sizeGrid": "20,20,20,20" }, "child": [{ "type": "TextInput", "props": { "y": 2, "x": 15, "width": 340, "var": "pwdTxt3", "valign": "middle", "type": "password", "restrict": "0123456789", "promptColor": "#93afc0", "prompt": "请再次输入密码", "maxChars": 6, "height": 46, "fontSize": 30, "color": "#ffffff" } }, { "type": "CheckBox", "props": { "y": 2, "x": 359, "var": "lookBtn3", "stateNum": 2, "skin": "ui/common/check_see2.png", "selected": false } }] }] }, { "type": "Box", "props": { "y": 56, "x": 63, "width": 586, "var": "panel2", "height": 217 }, "child": [{ "type": "Image", "props": { "y": 118, "x": 0, "skin": "ui/balance/subres/img_yeb-mm_f-srmm.png" } }, { "type": "Image", "props": { "y": 172, "x": 0, "skin": "ui/balance/subres/img_yeb-mm_f-qrmm.png" } }, { "type": "Image", "props": { "y": 78, "x": 487, "skin": "ui/res_login/btn_dl_yanzhengma02.png", "anchorY": 0.5, "anchorX": 0.5 }, "child": [{ "type": "Text", "props": { "y": 9, "x": 7, "width": 62, "var": "timeTxt", "text": 0, "fontSize": 36, "color": "#ffffff", "align": "center" } }] }, { "type": "Image", "props": { "y": 78, "x": 487, "var": "getCodeBtn", "skin": "ui/res_login/btn_dl_yanzhengma01.png", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 65, "x": 0, "skin": "ui/balance/subres/img_yeb-mm_f-yzm.png" } }, { "type": "Image", "props": { "y": 11, "x": 0, "skin": "ui/balance/subres/img_yeb-mm_f-sjh.png" } }, { "type": "Image", "props": { "y": 0, "x": 176, "width": 410, "skin": "ui/res_login/img_dl_shurukuang04.png", "height": 50, "sizeGrid": "20,20,20,20" }, "child": [{ "type": "TextInput", "props": { "y": 2, "x": 15, "width": 378, "var": "phoneTxt", "valign": "middle", "type": "text", "restrict": "0123456789", "promptColor": "#93afc0", "prompt": "请输入可用手机号", "maxChars": 11, "height": 46, "fontSize": 30, "color": "#ffffff" } }] }, { "type": "Image", "props": { "y": 107, "x": 176, "width": 410, "skin": "ui/res_login/img_dl_shurukuang04.png", "height": 50, "sizeGrid": "20,20,20,20" }, "child": [{ "type": "TextInput", "props": { "y": 2, "x": 15, "width": 340, "var": "pwdTxt4", "valign": "middle", "type": "password", "promptColor": "#93afc0", "prompt": "请输入6-15位字符", "maxChars": 15, "height": 46, "fontSize": 30, "color": "#ffffff" } }, { "type": "CheckBox", "props": { "y": 2, "x": 359, "var": "lookBtn4", "stateNum": 2, "skin": "ui/common/check_see2.png", "selected": false } }] }, { "type": "Image", "props": { "y": 161, "x": 176, "width": 410, "skin": "ui/res_login/img_dl_shurukuang04.png", "height": 50, "sizeGrid": "20,20,20,20" }, "child": [{ "type": "TextInput", "props": { "y": 2, "x": 15, "width": 340, "var": "pwdTxt5", "valign": "middle", "type": "password", "promptColor": "#93afc0", "prompt": "请再次输入密码", "maxChars": 15, "height": 46, "fontSize": 30, "color": "#ffffff" } }, { "type": "CheckBox", "props": { "y": 2, "x": 359, "var": "lookBtn5", "stateNum": 2, "skin": "ui/common/check_see2.png", "selected": false } }] }, { "type": "Image", "props": { "y": 54, "x": 176, "width": 196, "skin": "ui/res_login/img_dl_shurukuang04.png", "height": 50, "sizeGrid": "20,20,20,20" }, "child": [{ "type": "TextInput", "props": { "y": 2, "x": 15, "width": 168, "var": "codeTxt", "valign": "middle", "type": "text", "restrict": "0123456789", "promptColor": "#93afc0", "prompt": "请输验证码", "maxChars": 6, "height": 46, "fontSize": 30, "color": "#ffffff" } }] }] }, { "type": "Image", "props": { "y": 323, "x": 356, "var": "okBtn", "skin": "ui/fullMyCenter/btn_grzx_qd01.png", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Box", "props": { "y": 5, "x": 52, "var": "checkGroup1" }, "child": [{ "type": "Image", "props": { "y": 8, "x": 57, "skin": "ui/balance/subres/img_yeb-mm_f-jmmxg.png" } }, { "type": "CheckBox", "props": { "y": 0, "x": 0, "var": "checkBtn1", "stateNum": 2, "skin": "ui/balance/subres/check_pwd.png", "selected": false, "height": 42 } }] }, { "type": "Box", "props": { "y": 5, "x": 413, "var": "checkGroup2" }, "child": [{ "type": "Image", "props": { "y": 8, "x": 57, "skin": "ui/balance/subres/img_yeb-mm_f-dxyz.png" } }, { "type": "CheckBox", "props": { "y": 0, "x": 0, "var": "checkBtn2", "stateNum": 2, "skin": "ui/balance/subres/check_pwd.png", "height": 42 } }] }] }] };
                return SetPwdViewUI;
            }(View));
            balance.SetPwdViewUI = SetPwdViewUI;
        })(balance = dlg.balance || (dlg.balance = {}));
    })(dlg = ui.dlg || (ui.dlg = {}));
})(ui || (ui = {}));
(function (ui) {
    var dlg;
    (function (dlg) {
        var balance;
        (function (balance) {
            var UserAuthenDlgUI = /** @class */ (function (_super) {
                __extends(UserAuthenDlgUI, _super);
                function UserAuthenDlgUI() {
                    return _super.call(this) || this;
                }
                UserAuthenDlgUI.prototype.createChildren = function () {
                    View.regComponent("Text", laya.display.Text);
                    _super.prototype.createChildren.call(this);
                    this.createView(ui.dlg.balance.UserAuthenDlgUI.uiView);
                };
                UserAuthenDlgUI.uiView = { "type": "Dialog", "props": { "width": 754, "height": 480 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "skin": "ui/panel_common/mindlg.png" }, "child": [{ "type": "Image", "props": { "y": 22, "x": 281, "skin": "ui/balance/subres/img_yeb-sfyz_sfyz.png" } }, { "type": "Image", "props": { "y": 53, "x": 707, "var": "closeBtn", "skin": "ui/common/newclose.png", "anchorY": 0.5, "anchorX": 0.5 } }] }, { "type": "Image", "props": { "y": 104, "x": 32, "width": 690, "skin": "ui/fullMyCenter/img_com_xiankuang.png", "height": 272, "sizeGrid": "16,17,16,16" } }, { "type": "Image", "props": { "y": 262, "x": 172, "width": 410, "skin": "ui/res_login/img_dl_shurukuang04.png", "height": 50, "sizeGrid": "20,20,20,20" }, "child": [{ "type": "TextInput", "props": { "y": 2, "x": 15, "width": 380, "var": "pwdTxt", "valign": "middle", "type": "password", "restrict": "0123456789", "promptColor": "#93afc0", "prompt": "请输入密码(6位数字)", "maxChars": 6, "height": 46, "fontSize": 30, "color": "#ffffff" } }] }, { "type": "Text", "props": { "y": 188, "x": 66, "text": "为了您的账户安全,请输入您的余额宝密码", "height": 34, "fontSize": 34, "color": "#9cc5db" } }, { "type": "Image", "props": { "y": 425, "x": 545, "var": "okBtn", "skin": "ui/common/queding.png", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 425, "x": 208, "var": "setPwdBtn", "skin": "ui/balance/subres/btn_yeb_xgmm.png", "anchorY": 0.5, "anchorX": 0.5 } }] };
                return UserAuthenDlgUI;
            }(Dialog));
            balance.UserAuthenDlgUI = UserAuthenDlgUI;
        })(balance = dlg.balance || (dlg.balance = {}));
    })(dlg = ui.dlg || (ui.dlg = {}));
})(ui || (ui = {}));
(function (ui) {
    var dlg;
    (function (dlg) {
        var BalanceDlgUI = /** @class */ (function (_super) {
            __extends(BalanceDlgUI, _super);
            function BalanceDlgUI() {
                return _super.call(this) || this;
            }
            BalanceDlgUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.dlg.BalanceDlgUI.uiView);
            };
            BalanceDlgUI.uiView = { "type": "Dialog", "props": { "width": 1334, "height": 750 }, "child": [{ "type": "Image", "props": { "skin": "ui/panel_common/img_com_quanping_di.jpg", "centerY": 0, "centerX": 0 } }, { "type": "Image", "props": { "y": 0, "var": "TLgroup", "skin": "ui/panel_common/img_com_quanping_ce_biaotou.png", "left": -48 }, "child": [{ "type": "Image", "props": { "y": 24, "x": 187, "skin": "ui/balance/icon_yeb_yeb-1.png" } }, { "type": "Image", "props": { "y": 10, "x": 62, "skin": "ui/balance/icon_yeb_yeb-img.png" } }] }, { "type": "Box", "props": { "y": 0, "var": "TRgroup", "right": -55 }, "child": [{ "type": "Image", "props": { "x": 460, "var": "backBtn", "skin": "ui/common/img_com_quanping_guanbi01.png" }, "child": [{ "type": "Image", "props": { "y": 14, "x": 122, "skin": "ui/common/img_com_quanping_guanbi02.png" } }] }, { "type": "Image", "props": { "y": 46, "x": 154, "var": "helpBtn", "skin": "ui/balance/btn_yeb_bzsm.png", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 46, "x": 378, "var": "accessBtn", "skin": "ui/balance/btn_yeb_cqmx.png", "anchorY": 0.5, "anchorX": 0.5 } }] }, { "type": "Box", "props": { "y": 168, "centerX": 0 }, "child": [{ "type": "Image", "props": { "width": 1294, "skin": "ui/balance/img_cz_kuang.png", "height": 176, "sizeGrid": "30,40,30,40" }, "child": [{ "type": "Image", "props": { "y": 0, "x": 340, "skin": "ui/balance/img_yeb_kuang-bt.png" } }, { "type": "Image", "props": { "y": 12, "x": 503, "skin": "ui/balance/img_yeb_f-srsy.png" } }, { "type": "Image", "props": { "y": 132, "x": 488, "skin": "ui/balance/img_yeb_f-mxshd.png" } }, { "type": "Image", "props": { "y": 51, "x": 455, "width": 384, "skin": "ui/balance/img_dating_qian_di.png", "height": 76 } }, { "type": "Image", "props": { "y": 64, "x": 943, "skin": "ui/balance/img_yeb_f-grzh.png" } }, { "type": "Image", "props": { "y": 64, "x": 25, "skin": "ui/balance/img_yeb_f-yeb.png" } }, { "type": "Sprite", "props": { "y": 117, "x": 87, "width": 200, "var": "bitBox1", "height": 40 } }, { "type": "Sprite", "props": { "y": 117, "x": 1005, "width": 200, "var": "bitBox3", "height": 40 } }, { "type": "Sprite", "props": { "y": 69, "x": 547, "width": 200, "var": "bitBox2", "height": 40 } }] }, { "type": "Image", "props": { "y": 196, "width": 1294, "skin": "ui/balance/img_cz_kuang.png", "height": 116, "sizeGrid": "30,40,30,40" }, "child": [{ "type": "Image", "props": { "y": 24, "x": 396, "skin": "ui/balance/img_yeb_f-brsy.png" } }, { "type": "Image", "props": { "y": 24, "x": 101, "skin": "ui/balance/img_yeb_f-ljsy.png" } }, { "type": "Image", "props": { "y": 24, "x": 994, "skin": "ui/balance/img_yeb_f-qrnh.png" } }, { "type": "Image", "props": { "y": 24, "x": 662, "skin": "ui/balance/img_yeb_f-wfsy.png" } }, { "type": "Sprite", "props": { "y": 63, "x": 102, "width": 200, "var": "bitBox4", "height": 40 } }, { "type": "Sprite", "props": { "y": 63, "x": 397, "width": 200, "var": "bitBox5", "height": 40 } }, { "type": "Sprite", "props": { "y": 63, "x": 692, "width": 200, "var": "bitBox6", "height": 40 } }, { "type": "Sprite", "props": { "y": 63, "x": 988, "width": 200, "var": "bitBox7", "height": 40 } }, { "type": "Image", "props": { "y": 0, "x": 0, "width": 1288, "var": "weihuMask", "skin": "ui/balance/img_dlzx-dlxx_bc.png", "sizeGrid": "40,40,40,40", "height": 120, "alpha": 0.9 }, "child": [{ "type": "Label", "props": { "text": "系统维护中,暂停结算余额宝收益,如有疑问请联系客服", "fontSize": 38, "color": "#d0e8f3", "centerY": 0, "centerX": 0 } }] }] }, { "type": "Image", "props": { "y": 388, "x": 297, "skin": "ui/balance/img_yeb_f-srje.png" } }, { "type": "Image", "props": { "y": 379, "x": 474, "width": 414, "skin": "ui/res_login/img_dl_shurukuang04.png", "height": 50, "sizeGrid": "20,20,20,20" }, "child": [{ "type": "TextInput", "props": { "y": 2, "x": 15, "width": 345, "var": "inputTxt", "valign": "middle", "type": "text", "restrict": "0123456789.", "promptColor": "#93afc0", "prompt": "请输入金额......", "height": 46, "fontSize": 30, "color": "#ffffff" } }, { "type": "Image", "props": { "y": 24, "x": 383, "var": "clearBtn", "skin": "ui/balance/btn_yeb_sr-qx.png", "anchorY": 0.5, "anchorX": 0.5 } }] }, { "type": "Image", "props": { "y": 404, "x": 1002, "var": "allBtn", "skin": "ui/balance/btn_yeb_qb.png", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 499, "x": 472, "var": "setBtn", "skin": "ui/balance/btn_yeb_cr.png", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 499, "x": 814, "var": "getBtn", "skin": "ui/balance/btn_yeb_qc.png", "anchorY": 0.5, "anchorX": 0.5 } }] }] };
            return BalanceDlgUI;
        }(Dialog));
        dlg.BalanceDlgUI = BalanceDlgUI;
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
                AccountInfoDlgUI.uiView = { "type": "Dialog", "props": { "width": 1034, "height": 630 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "skin": "ui/panel_common/maxdlg.png" }, "child": [{ "type": "Image", "props": { "y": 19, "x": 427, "skin": "ui/fullMyCenter/img_grzx_bt05.png" } }, { "type": "Image", "props": { "y": 49, "x": 987, "var": "closeBtn", "skin": "ui/common/newclose.png", "anchorY": 0.5, "anchorX": 0.5 } }] }, { "type": "Image", "props": { "y": 88, "x": 9, "var": "tabView", "skin": "ui/fullMyCenter/img_grzx_cy01.png" }, "child": [{ "type": "Image", "props": { "y": 88, "x": 0, "var": "tab1", "skin": "ui/fullMyCenter/img_grzx_cy02.png", "anchorY": 0.5 }, "child": [{ "type": "Image", "props": { "y": 30, "x": 58, "skin": "ui/fullMyCenter/img_grzx_cy03.png" } }] }, { "type": "Image", "props": { "y": 218, "x": 0, "var": "tab2", "skin": "ui/fullMyCenter/img_grzx_cy02.png", "anchorY": 0.5 }, "child": [{ "type": "Image", "props": { "y": 30, "x": 38, "skin": "ui/fullMyCenter/img_grzx_cy04.png" } }] }, { "type": "Image", "props": { "y": 347, "x": 0, "var": "tab3", "skin": "ui/fullMyCenter/img_grzx_cy02.png", "anchorY": 0.5 }, "child": [{ "type": "Image", "props": { "y": 30, "x": 38, "skin": "ui/fullMyCenter/img_grzx_cy05.png" } }] }, { "type": "Image", "props": { "y": 459, "x": -10, "var": "tabSelect", "skin": "ui/fullMyCenter/img_grzx_cy06.png", "anchorY": 0.5 }, "child": [{ "type": "Image", "props": { "y": 37, "var": "tabLabel", "skin": "ui/fullMyCenter/img_grzx_cy07.png", "centerX": -7 } }] }] }, { "type": "Image", "props": { "y": 130, "x": 288, "width": 712, "var": "yhkView", "skin": "ui/common/img_com_xiankuang.png", "height": 362, "sizeGrid": "15,15,15,16" }, "child": [{ "type": "Image", "props": { "y": 27, "x": 75, "skin": "ui/fullMyCenter/img_grzx_sr01.png" } }, { "type": "Image", "props": { "y": 95, "x": 56, "skin": "ui/fullMyCenter/img_grzx_sr02.png" } }, { "type": "Image", "props": { "y": 163, "x": 56, "skin": "ui/fullMyCenter/img_grzx_sr03.png" } }, { "type": "Image", "props": { "y": 231, "x": 56, "skin": "ui/fullMyCenter/img_grzx_sr04.png" } }, { "type": "Text", "props": { "y": 419, "x": 178, "width": 356, "var": "serviceInfo", "text": "如需修改银行卡信息，请联系客服", "height": 20, "fontSize": 18, "color": "#fff600", "align": "center" } }, { "type": "Image", "props": { "y": 429, "x": 358, "var": "openCardBtn", "skin": "ui/fullMyCenter/btn_grzx_qd01.png", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "TextInput", "props": { "y": 156, "x": 236, "width": 410, "var": "bankPos", "type": "text", "skin": "ui/res_login/img_dl_shurukuang04.png", "sizeGrid": "20,20,20,20", "rotation": 0, "restrict": "0123456789", "promptColor": "#93afc0", "prompt": "请选择银行", "padding": "-6,0,-2,20", "overflow": "hidden", "multiline": false, "maxChars": 21, "layoutEnabled": true, "height": 50, "fontSize": 30, "editable": true, "color": "#ffffff", "bold": false, "align": "left" } }, { "type": "Image", "props": { "y": 299, "x": 56, "skin": "ui/fullMyCenter/img_grzx_sr13.png" } }, { "type": "Image", "props": { "y": 292, "x": 237, "width": 410, "skin": "ui/res_login/img_dl_shurukuang04.png", "height": 50, "sizeGrid": "20,20,20,20" }, "child": [{ "type": "TextInput", "props": { "y": 2, "x": 15, "width": 340, "var": "cardPwd", "valign": "middle", "type": "password", "restrict": "0123456789", "promptColor": "#93afc0", "prompt": "请输入提现密码(4位)", "maxChars": 4, "height": 46, "fontSize": 30, "color": "#ffffff" } }, { "type": "CheckBox", "props": { "y": 2, "x": 359, "var": "cardPwdLook", "stateNum": 2, "skin": "ui/common/check_see2.png", "selected": false } }] }, { "type": "Image", "props": { "y": 20, "x": 237, "width": 238, "skin": "ui/res_login/img_dl_shurukuang04.png", "height": 50, "sizeGrid": "20,20,20,20" }, "child": [{ "type": "TextInput", "props": { "y": 2, "x": 15, "width": 206, "var": "cardName", "valign": "middle", "type": "text", "promptColor": "#93afc0", "prompt": "请输入姓名", "height": 46, "fontSize": 30, "color": "#ffffff" } }] }, { "type": "Image", "props": { "y": 88, "x": 237, "width": 410, "skin": "ui/res_login/img_dl_shurukuang04.png", "height": 50, "sizeGrid": "20,20,20,20" }, "child": [{ "type": "TextInput", "props": { "y": 2, "x": 15, "width": 380, "var": "cardNum", "valign": "middle", "type": "text", "restrict": "0123456789", "promptColor": "#93afc0", "prompt": "最长支持21位银行卡", "height": 46, "fontSize": 30, "color": "#ffffff" } }] }, { "type": "Image", "props": { "y": 224, "x": 237, "width": 410, "skin": "ui/res_login/img_dl_shurukuang04.png", "height": 50, "sizeGrid": "20,20,20,20" }, "child": [{ "type": "TextInput", "props": { "y": 2, "x": 15, "width": 380, "var": "subBank", "valign": "middle", "type": "text", "promptColor": "#93afc0", "prompt": "请手动填写开户支行", "height": 46, "fontSize": 30, "color": "#ffffff" } }] }, { "type": "Image", "props": { "y": 45, "x": 567, "var": "setNameBtn", "skin": "ui/fullMyCenter/btn_grzx_xg01.png", "anchorY": 0.5, "anchorX": 0.5 } }] }] };
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
                BindAlipayDlgUI.uiView = { "type": "Dialog", "props": { "width": 754, "height": 480 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "skin": "ui/panel_common/mindlg.png" }, "child": [{ "type": "Image", "props": { "y": 22, "x": 265, "skin": "ui/fullMyCenter/img_grzx_bt09.png" } }, { "type": "Image", "props": { "y": 53, "x": 707, "var": "closeBtn", "skin": "ui/common/newclose.png", "anchorY": 0.5, "anchorX": 0.5 } }] }, { "type": "Image", "props": { "y": 104, "x": 32, "width": 690, "skin": "ui/fullMyCenter/img_com_xiankuang.png", "height": 272, "sizeGrid": "16,17,16,16" }, "child": [{ "type": "Image", "props": { "y": 30, "x": 30, "skin": "ui/fullMyCenter/img_grzx_sr11.png" } }, { "type": "Image", "props": { "y": 98, "x": 30, "skin": "ui/fullMyCenter/img_grzx_sr12.png" } }, { "type": "Label", "props": { "y": 236, "x": 520, "text": "(提交后不可更改)", "fontSize": 18, "color": "#ca1420" } }, { "type": "Label", "props": { "y": 236, "x": 42, "text": "注：请输入正确的支付宝实名制名字，否则无法转入该账号!", "fontSize": 18, "color": "#fff600" } }, { "type": "Image", "props": { "y": 23, "x": 211, "width": 410, "skin": "ui/res_login/img_dl_shurukuang04.png", "height": 50, "sizeGrid": "20,20,20,20" }, "child": [{ "type": "TextInput", "props": { "y": 2, "x": 15, "width": 380, "var": "accTxt", "valign": "middle", "type": "text", "promptColor": "#93afc0", "prompt": "请输入支付宝账号", "height": 46, "fontSize": 30, "color": "#ffffff" } }] }, { "type": "Image", "props": { "y": 92, "x": 211, "width": 410, "skin": "ui/res_login/img_dl_shurukuang04.png", "height": 50, "sizeGrid": "20,20,20,20" }, "child": [{ "type": "TextInput", "props": { "y": 2, "x": 15, "width": 380, "var": "nameTxt", "valign": "middle", "type": "text", "promptColor": "#93afc0", "prompt": "请输入真实姓名", "height": 46, "fontSize": 30, "color": "#ffffff" } }] }, { "type": "Image", "props": { "y": 166, "x": 39, "skin": "ui/fullMyCenter/img_grzx_sr13.png" } }, { "type": "Image", "props": { "y": 160, "x": 211, "width": 410, "skin": "ui/res_login/img_dl_shurukuang04.png", "height": 50, "sizeGrid": "20,20,20,20" }, "child": [{ "type": "TextInput", "props": { "y": 2, "x": 15, "width": 340, "var": "pwdTxt", "valign": "middle", "type": "password", "restrict": "0123456789", "promptColor": "#93afc0", "prompt": "请输入提现密码(4位)", "maxChars": 4, "height": 46, "fontSize": 30, "color": "#ffffff" } }, { "type": "CheckBox", "props": { "y": 2, "x": 359, "var": "lookBtn", "stateNum": 2, "skin": "ui/common/check_see2.png", "selected": false } }] }] }, { "type": "Image", "props": { "y": 425, "x": 377, "var": "bindBtn", "skin": "ui/fullMyCenter/btn_grzx_bd02.png", "anchorY": 0.5, "anchorX": 0.5 } }] };
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
                SetHeadBorderDlgUI.uiView = { "type": "Dialog", "props": { "width": 1034, "height": 630 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "skin": "ui/panel_common/maxdlg.png" }, "child": [{ "type": "Image", "props": { "y": 19, "x": 405, "skin": "ui/fullMyCenter/img_grzx_bt04.png" } }, { "type": "Image", "props": { "y": 49, "x": 987, "var": "closeBtn", "skin": "ui/common/newclose.png", "anchorY": 0.5, "anchorX": 0.5 } }] }, { "type": "Image", "props": { "y": 158, "x": 95, "width": 160, "var": "headIcon", "height": 160 } }, { "type": "Image", "props": { "y": 152, "x": 85, "width": 180, "var": "borderIcon", "skin": "ui/common/avatorFrame.png", "height": 180, "sizeGrid": "0,0,0,0" } }, { "type": "Image", "props": { "y": 474, "x": 174, "var": "changeBtn", "skin": "ui/fullMyCenter/btn_grzx_qd01.png", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 342, "x": 101, "skin": "ui/fullMyCenter/img_grzx_wz01.png" } }, { "type": "Image", "props": { "y": 105, "x": 329, "width": 680, "skin": "ui/fullMyCenter/img_com_xiankuang.png", "height": 502, "sizeGrid": "16,17,16,16" } }, { "type": "Panel", "props": { "y": 125, "x": 349, "width": 640, "var": "itemPanel", "height": 462 } }] };
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
                SetHeadDlgUI.uiView = { "type": "Dialog", "props": { "width": 1034, "height": 630 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "skin": "ui/panel_common/maxdlg.png" }, "child": [{ "type": "Image", "props": { "y": 19, "x": 427, "skin": "ui/fullMyCenter/img_grzx_bt03.png" } }, { "type": "Image", "props": { "y": 49, "x": 987, "var": "closeBtn", "skin": "ui/common/newclose.png", "anchorY": 0.5, "anchorX": 0.5 } }] }, { "type": "Image", "props": { "y": 158, "x": 95, "width": 160, "var": "headIcon", "height": 160 } }, { "type": "Image", "props": { "y": 152, "x": 85, "width": 180, "var": "borderIcon", "skin": "ui/common/avatorFrame.png", "height": 180, "sizeGrid": "0,0,0,0" } }, { "type": "Image", "props": { "y": 474, "x": 174, "var": "changeBtn", "skin": "ui/fullMyCenter/btn_grzx_qd01.png", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 342, "x": 101, "skin": "ui/fullMyCenter/img_grzx_wz01.png" } }, { "type": "Image", "props": { "y": 105, "x": 329, "width": 680, "var": "itembg", "skin": "ui/fullMyCenter/img_com_xiankuang.png", "height": 502, "sizeGrid": "16,17,16,16" } }, { "type": "Panel", "props": { "y": 125, "x": 349, "width": 640, "var": "itemPanel", "height": 462 } }] };
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
            FullMyCenterDlgUI.uiView = { "type": "Dialog", "props": { "width": 1334, "height": 750 }, "child": [{ "type": "Image", "props": { "skin": "ui/panel_common/img_com_quanping_di.jpg", "centerY": 0, "centerX": 0 } }, { "type": "Box", "props": { "y": 139, "centerX": 0 }, "child": [{ "type": "Image", "props": { "y": 2, "skin": "ui/fullMyCenter/img_grzx_txd02.png" }, "child": [{ "type": "Image", "props": { "y": 71, "x": 110, "width": 112, "var": "headIcon", "height": 112 } }, { "type": "Image", "props": { "y": 67, "x": 104, "width": 124, "var": "borderIcon", "skin": "ui/common/avatorFrame.png", "sizeGrid": "36,36,52,34", "height": 124 } }, { "type": "Image", "props": { "y": 264, "x": 167, "var": "setHeadBtn", "skin": "ui/fullMyCenter/btn_grzx_ghtx01.png", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 338, "x": 167, "var": "setBorderBtn", "skin": "ui/fullMyCenter/btn_grzx_ghtxk01.png", "gray": true, "anchorY": 0.5, "anchorX": 0.5 } }] }, { "type": "Image", "props": { "y": 478, "x": 152, "var": "accInfoBtn", "skin": "ui/fullMyCenter/btn_grzx_zhxx01.png" } }, { "type": "Image", "props": { "y": 478, "x": 874, "var": "backAccBtn", "skin": "ui/fullMyCenter/btn_grzx_tczh01.png" } }, { "type": "Image", "props": { "x": 347, "width": 606, "skin": "ui/fullMyCenter/img_com_xiankuang.png", "height": 448, "sizeGrid": "16,17,16,16" }, "child": [{ "type": "Image", "props": { "y": 32, "x": 31, "skin": "ui/fullMyCenter/img_grzx_zh01.png" } }, { "type": "Image", "props": { "y": 101, "x": 31, "skin": "ui/fullMyCenter/img_grzx_zh02.png" } }, { "type": "Image", "props": { "y": 171, "x": 31, "skin": "ui/fullMyCenter/img_grzx_zh03.png" } }, { "type": "Image", "props": { "y": 240, "x": 31, "skin": "ui/fullMyCenter/img_grzx_zh04.png" } }, { "type": "Image", "props": { "y": 310, "x": 31, "skin": "ui/fullMyCenter/img_grzx_zh05.png" } }, { "type": "Image", "props": { "y": 380, "x": 31, "skin": "ui/fullMyCenter/img_grzx_zh06.png" } }, { "type": "Label", "props": { "y": 30, "x": 175, "width": 216, "var": "accTxt", "valign": "middle", "height": 36, "fontSize": 36, "color": "#ffffff" } }, { "type": "Label", "props": { "y": 100, "x": 175, "width": 216, "var": "nickTxt", "valign": "middle", "text": "即将开放", "height": 36, "fontSize": 36, "color": "#ffffff" } }, { "type": "Label", "props": { "y": 170, "x": 175, "width": 396, "var": "moneyTxt", "valign": "middle", "height": 36, "fontSize": 36, "color": "#ffffff" } }, { "type": "Label", "props": { "y": 239, "x": 175, "width": 216, "var": "phoneTxt", "valign": "middle", "height": 36, "fontSize": 36, "color": "#ffffff" } }, { "type": "Label", "props": { "y": 309, "x": 175, "width": 216, "var": "wechatTxt", "valign": "middle", "text": "即将开放", "height": 36, "fontSize": 36, "color": "#ffffff" } }, { "type": "Label", "props": { "y": 379, "x": 175, "width": 216, "var": "alipayTxt", "valign": "middle", "text": "即将开放", "height": 36, "fontSize": 36, "color": "#ffffff" } }, { "type": "Image", "props": { "y": 254, "x": 494, "var": "bindPhoneBtn", "skin": "ui/fullMyCenter/btn_grzx_bd01.png", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 327, "x": 494, "var": "bindWeChat", "skin": "ui/fullMyCenter/btn_grzx_bd01.png", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 49, "x": 494, "var": "accCopyBtn", "skin": "ui/fullMyCenter/btn_grzx_fz01.png", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 116, "x": 494, "var": "setNickBtn", "skin": "ui/fullMyCenter/btn_grzx_xg01.png", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 397, "x": 493, "var": "bindAlipayBtn", "skin": "ui/fullMyCenter/btn_grzx_bd01.png", "anchorY": 0.5, "anchorX": 0.5 } }] }, { "type": "Image", "props": { "x": 971, "width": 326, "skin": "ui/fullMyCenter/img_com_xiankuang.png", "height": 448, "sizeGrid": "16,17,16,16" }, "child": [{ "type": "Image", "props": { "y": 59, "x": 101, "skin": "ui/fullMyCenter/img_grzx_sz01.png" } }, { "type": "Image", "props": { "y": 169, "x": 25, "skin": "ui/fullMyCenter/img_grzx_sz02.png" } }, { "type": "Image", "props": { "y": 303, "x": 25, "skin": "ui/fullMyCenter/img_grzx_sz03.png" } }, { "type": "CheckBox", "props": { "y": 162, "x": 149, "var": "musicBtn", "skin": "ui/fullMyCenter/check_msc.png", "selected": false } }, { "type": "CheckBox", "props": { "y": 297, "x": 149, "var": "soundBtn", "skin": "ui/fullMyCenter/check_msc.png", "selected": false } }] }] }, { "type": "Image", "props": { "y": 0, "x": 0, "var": "titleGroup", "skin": "ui/panel_common/img_com_quanping_ce_biaotou.png", "left": -48 }, "child": [{ "type": "Image", "props": { "y": 25, "x": 173, "skin": "ui/fullMyCenter/img_grzx_bt01.png" } }, { "type": "Image", "props": { "y": 20, "x": 62, "skin": "ui/fullMyCenter/img_grzx_bt02.png" } }] }, { "type": "Image", "props": { "y": 0, "x": 0, "var": "backBtn", "skin": "ui/common/img_com_quanping_guanbi01.png", "right": -55 }, "child": [{ "type": "Image", "props": { "y": 14, "x": 122, "skin": "ui/common/img_com_quanping_guanbi02.png" } }] }] };
            return FullMyCenterDlgUI;
        }(Dialog));
        dlg.FullMyCenterDlgUI = FullMyCenterDlgUI;
    })(dlg = ui.dlg || (ui.dlg = {}));
})(ui || (ui = {}));
(function (ui) {
    var dlg;
    (function (dlg) {
        var GameUpdateNoticeUI = /** @class */ (function (_super) {
            __extends(GameUpdateNoticeUI, _super);
            function GameUpdateNoticeUI() {
                return _super.call(this) || this;
            }
            GameUpdateNoticeUI.prototype.createChildren = function () {
                View.regComponent("HTMLDivElement", laya.html.dom.HTMLDivElement);
                _super.prototype.createChildren.call(this);
                this.createView(ui.dlg.GameUpdateNoticeUI.uiView);
            };
            GameUpdateNoticeUI.uiView = { "type": "Dialog", "props": { "width": 1035, "height": 633 }, "child": [{ "type": "Image", "props": { "skin": "ui/res_login/img_dl_whgg.png", "centerY": 0, "centerX": 0, "anchorX": 0 }, "child": [{ "type": "Image", "props": { "y": 25, "x": 428, "skin": "ui/res_login/img_dl_bt01.png" } }, { "type": "Image", "props": { "y": 99, "x": 26, "width": 984, "skin": "ui/res_login/img_com_xiankuang.png", "sizeGrid": "10,10,10,10", "height": 435 }, "child": [{ "type": "Panel", "props": { "var": "panel", "vScrollBarSkin": "“”", "top": 2, "right": 2, "left": 2, "bottom": 2 }, "child": [{ "type": "HTMLDivElement", "props": { "y": 10, "x": 10, "width": 960, "var": "htmlText", "innerHTML": "<span style='color:#FFFFFF;fontSize:30'>-本次更新维护时间:</span> <span style='color:#fff200;fontSize:24'>Invalid Date~Invalid Date</span> <span style='color:#FFFFFF;fontSize:30'>abctest</span> <span style='color:#FFFFFF;fontSize:24'>1.sahkjdsahdhkjashkjdahkjsdhkjashkjdhkjashkjdsahkjdhkjashkjdhkjasdhkjsahkjdhkjsahkjdhkjasdhkjasdhkjashkjdhkjashkjdhkjsadhkjahkjsdhkjashkjdhkjasdhkjhkjsahkjdsadsahkjdhkjsadadshkj, 2.sadahsdhkjahkjsdhkjashkjdhkjashkjdhkjashkjdhkjashkjdhkjashkjdhkjasdhkjahkjsdhkjsahkjdhkjsadhkjahkjsdhkjsahkjd 3.ashjdkjsadhkjhkjashkjdhkjsahkjdhkjashkjdasdasj</span>", "height": 100 } }] }] }, { "type": "Image", "props": { "y": 579, "x": 518, "var": "btnConfirm", "skin": "ui/res_login/btn_dl_qd01.png", "anchorY": 0.5, "anchorX": 0.5 } }] }] };
            return GameUpdateNoticeUI;
        }(Dialog));
        dlg.GameUpdateNoticeUI = GameUpdateNoticeUI;
    })(dlg = ui.dlg || (ui.dlg = {}));
})(ui || (ui = {}));
(function (ui) {
    var dlg;
    (function (dlg) {
        var mail;
        (function (mail) {
            var MailAwardDlgUI = /** @class */ (function (_super) {
                __extends(MailAwardDlgUI, _super);
                function MailAwardDlgUI() {
                    return _super.call(this) || this;
                }
                MailAwardDlgUI.prototype.createChildren = function () {
                    _super.prototype.createChildren.call(this);
                    this.createView(ui.dlg.mail.MailAwardDlgUI.uiView);
                };
                MailAwardDlgUI.uiView = { "type": "Dialog", "props": { "width": 998, "height": 158 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "skin": "ui/mailbox/img_xtyj_kuang-gxhd.png" }, "child": [{ "type": "Image", "props": { "y": 26, "x": 46, "skin": "ui/mailbox/img_xtyj_kuang-gxhd-g2.png" } }, { "type": "Image", "props": { "y": -12, "x": 387, "skin": "ui/mailbox/img_xtyj_f-gxhd.png" } }, { "type": "Image", "props": { "y": -19, "x": 326, "skin": "ui/mailbox/img_xtyj_kuang_sg.png" } }, { "type": "Image", "props": { "y": 91, "x": 391, "var": "cirPic", "skin": "ui/mailbox/img_xtyj_kuang-gxhd-g.png", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 59, "x": 359, "skin": "ui/mailbox/img_xtyj_qb.png" } }, { "type": "Sprite", "props": { "y": 72, "x": 449, "width": 134, "var": "fontBox", "height": 40 } }] }] };
                return MailAwardDlgUI;
            }(Dialog));
            mail.MailAwardDlgUI = MailAwardDlgUI;
        })(mail = dlg.mail || (dlg.mail = {}));
    })(dlg = ui.dlg || (ui.dlg = {}));
})(ui || (ui = {}));
(function (ui) {
    var dlg;
    (function (dlg) {
        var MailboxDlgUI = /** @class */ (function (_super) {
            __extends(MailboxDlgUI, _super);
            function MailboxDlgUI() {
                return _super.call(this) || this;
            }
            MailboxDlgUI.prototype.createChildren = function () {
                View.regComponent("Text", laya.display.Text);
                _super.prototype.createChildren.call(this);
                this.createView(ui.dlg.MailboxDlgUI.uiView);
            };
            MailboxDlgUI.uiView = { "type": "Dialog", "props": { "width": 1334, "height": 750 }, "child": [{ "type": "Image", "props": { "y": 0, "skin": "ui/panel_common/img_com_quanping_di.jpg", "centerX": 0 } }, { "type": "Image", "props": { "y": 87, "x": -48, "var": "listGroup", "skin": "ui/mailbox/img_yx_xtyj-bg.png" }, "child": [{ "type": "Image", "props": { "y": 42, "x": 60, "skin": "ui/mailbox/img_yx_xtyj-f-xtyj.png" } }, { "type": "Image", "props": { "y": 66, "x": 443, "var": "delAllBtn", "skin": "ui/mailbox/btn_yx_xtyj-yjsc.png", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 66, "x": 443, "var": "getAllBtn", "skin": "ui/mailbox/btn_yx_xtyj-yjlq.png", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 115, "x": 60, "width": 490, "skin": "ui/common/img_com_xiankuang.png", "height": 536, "sizeGrid": "15,15,15,16" }, "child": [{ "type": "Panel", "props": { "y": 12, "x": -10, "width": 510, "var": "itemList", "height": 512 } }] }, { "type": "Image", "props": { "y": 337, "x": 140, "var": "hintGroup", "skin": "ui/mailbox/icon_yx_xtyj-i.png" }, "child": [{ "type": "Label", "props": { "y": 3, "x": 178, "width": 72, "underline": true, "text": "提示", "fontSize": 36, "color": "#ffba25", "bold": true } }, { "type": "Label", "props": { "y": 50, "x": 99, "text": "您暂时没有邮件", "fontSize": 32, "color": "#e9f5fd", "bold": true } }] }] }, { "type": "Image", "props": { "y": 0, "x": -48, "var": "titleGroup", "skin": "ui/panel_common/img_com_quanping_ce_biaotou.png", "left": -48 }, "child": [{ "type": "Image", "props": { "y": 25, "x": 202, "skin": "ui/mailbox/img_yx_bt-f-yx.png" } }, { "type": "Image", "props": { "y": 5, "x": 59, "skin": "ui/mailbox/icon_yx_bt-yj.png" } }] }, { "type": "Image", "props": { "y": 0, "x": 10, "var": "backBtn", "skin": "ui/common/img_com_quanping_guanbi01.png", "right": -55 }, "child": [{ "type": "Image", "props": { "y": 14, "x": 122, "skin": "ui/common/img_com_quanping_guanbi02.png" } }] }, { "type": "Image", "props": { "y": 106, "width": 792, "var": "detailsGroup", "skin": "ui/mailbox/img_yx_yj-kuang-d-9x9.png", "centerX": 258, "sizeGrid": "0,27,0,25" }, "child": [{ "type": "Image", "props": { "y": 71, "x": 20, "width": 752, "skin": "ui/common/img_com_xiankuang.png", "height": 454, "sizeGrid": "15,15,15,16" }, "child": [{ "type": "Box", "props": { "y": 16, "x": 10 }, "child": [{ "type": "Text", "props": { "x": 305.5, "text": "系统邮件", "height": 30, "fontSize": 30, "color": "#e9f5fd" } }, { "type": "Line", "props": { "y": 14, "x": -0.5, "toY": 0, "toX": 286, "lineWidth": 3, "lineColor": "#456ed1" } }, { "type": "Line", "props": { "y": 14, "x": 445.5, "toY": 0, "toX": 286, "lineWidth": 3, "lineColor": "#456ed1" } }] }, { "type": "Panel", "props": { "y": 68, "x": 20, "width": 712, "var": "ctxtList", "height": 210 }, "child": [{ "type": "Text", "props": { "y": 0, "x": 0, "wordWrap": true, "width": 712, "var": "contentTxt", "text": "text", "leading": 20, "fontSize": 26, "color": "#e9f5fd" } }] }, { "type": "Image", "props": { "y": 313, "x": 317, "var": "awardGroup", "skin": "ui/mailbox/img_yx_lw-kuang.png", "sizeGrid": "40,42,46,35" }, "child": [{ "type": "Image", "props": { "y": 7, "x": 26, "skin": "ui/mailbox/img_xtyj_qb.png" } }, { "type": "Sprite", "props": { "y": 78, "x": 23, "width": 70, "var": "goldBox", "height": 22 } }] }] }, { "type": "Text", "props": { "y": 25, "x": 26, "width": 740, "var": "ctitleTxt", "text": "text122344444444444", "overflow": "hidden", "height": 32, "fontSize": 32, "color": "#ffba25", "align": "center" } }, { "type": "Image", "props": { "y": 571, "x": 674, "var": "delCurBtn", "skin": "ui/mailbox/btn_yx_yj-sc.png", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 571, "x": 674, "var": "getCurBtn", "skin": "ui/mailbox/btn_yx_yj-lq.png", "anchorY": 0.5, "anchorX": 0.5 } }] }] };
            return MailboxDlgUI;
        }(Dialog));
        dlg.MailboxDlgUI = MailboxDlgUI;
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
                NoticeMessageUI.uiView = { "type": "View", "props": { "width": 1030, "height": 660 }, "child": [{ "type": "Image", "props": { "y": 35, "width": 925, "var": "message", "skin": "ui/panel_notice/message/bg_hdgg_kuang.png", "sizeGrid": "20,20,20,20", "height": 588, "centerX": 0 }, "child": [{ "type": "Image", "props": { "y": 16, "x": 171, "skin": "ui/panel_notice/message/img_hdgg_biaotikuang.png", "centerX": 0 } }, { "type": "Label", "props": { "y": 34, "x": 1, "width": 925, "text": "标题", "name": "title", "fontSize": 30, "font": "Microsoft YaHei", "color": "#ffba25", "centerX": -14, "align": "center" } }, { "type": "Label", "props": { "y": 88, "wordWrap": true, "width": 847, "text": "内容", "name": "content", "height": 431, "fontSize": 24, "font": "Microsoft YaHei", "color": "#b3d8e3", "centerX": 0, "align": "left" } }, { "type": "Label", "props": { "y": 530, "x": 30, "width": 868, "text": "日期", "name": "date", "height": 42, "fontSize": 24, "font": "Microsoft YaHei", "color": "#b3d8e3", "centerX": -14, "align": "right" } }] }, { "type": "Image", "props": { "y": 32, "width": 974, "var": "image", "height": 610, "centerX": 0 } }, { "type": "Image", "props": { "y": 5, "var": "frame", "skin": "ui/panel_notice/活动公告-静态活动_图框.png", "mouseThrough": true, "mouseEnabled": false, "centerX": 0 } }] };
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
                NoticeShareUI.uiView = { "type": "View", "props": { "width": 1030, "height": 660 }, "child": [{ "type": "Image", "props": { "y": 27, "x": 28, "width": 974, "var": "image", "height": 610 } }, { "type": "Image", "props": { "y": 447, "x": 148, "var": "friend_up", "skin": "ui/panel_notice/share/fasonggeipengyou_guan.png" } }, { "type": "Image", "props": { "y": 447, "x": 148, "var": "friend_down", "skin": "ui/panel_notice/share/fasongggeipengyou_kai.png" } }, { "type": "Image", "props": { "y": 447, "x": 300, "var": "circle_up", "skin": "ui/panel_notice/share/fenxiangpengyouquan_guan.png" } }, { "type": "Image", "props": { "y": 447, "x": 300, "var": "circle_down", "skin": "ui/panel_notice/share/fenxiangpengyouquan_kai.png" } }, { "type": "Image", "props": { "y": 0, "skin": "ui/panel_notice/活动公告-静态活动_图框.png", "mouseThrough": false, "mouseEnabled": false, "centerX": 0 } }] };
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
                var GameRouletteUI = /** @class */ (function (_super) {
                    __extends(GameRouletteUI, _super);
                    function GameRouletteUI() {
                        return _super.call(this) || this;
                    }
                    GameRouletteUI.prototype.createChildren = function () {
                        _super.prototype.createChildren.call(this);
                        this.createView(ui.dlg.notice.roulette.GameRouletteUI.uiView);
                    };
                    GameRouletteUI.uiView = { "type": "View", "props": { "width": 560, "height": 506 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "skin": "ui/panel_notice/roullette/activityRoullette/img_zhuanpan_panzi02.png", "anchorY": 0, "anchorX": 0 } }, { "type": "Image", "props": { "y": 250, "x": 277, "var": "plateNode", "skin": "ui/panel_notice/roullette/activityRoullette/img_zhuanpan_panzi.png", "rotation": 0, "anchorY": 0.5, "anchorX": 0.5 }, "child": [{ "type": "Box", "props": { "var": "labelBox", "top": 0, "staticCache": true, "right": 0, "left": 0, "cacheAsBitmap": true, "cacheAs": "bitmap", "bottom": 0 }, "child": [{ "type": "Label", "props": { "y": 208, "x": 208, "underlineColor": "#8055a4", "text": "-", "strokeColor": "#8055a4", "stroke": 2, "pivotY": 119, "name": "amount7", "fontSize": 30, "color": "#ffcc00", "anchorX": 0.5 } }, { "type": "Label", "props": { "y": 208, "x": 208, "valign": "middle", "underlineColor": "#8055a4", "text": "-", "strokeColor": "#8055a4", "stroke": 2, "rotation": 45, "pivotY": 119, "name": "amount6", "fontSize": 30, "color": "#ffcc00", "anchorX": 0.5, "align": "center" } }, { "type": "Label", "props": { "y": 208, "x": 208, "valign": "middle", "underlineColor": "#8055a4", "text": "-", "strokeColor": "#8055a4", "stroke": 2, "rotation": 90, "pivotY": 119, "name": "amount5", "fontSize": 30, "color": "#ffcc00", "anchorX": 0.5, "align": "center" } }, { "type": "Label", "props": { "y": 208, "x": 208, "valign": "middle", "underlineColor": "#8055a4", "text": "-", "strokeColor": "#8055a4", "stroke": 2, "rotation": 135, "pivotY": 119, "name": "amount4", "fontSize": 30, "color": "#ffcc00", "anchorX": 0.5, "align": "center" } }, { "type": "Label", "props": { "y": 208, "x": 208, "valign": "middle", "underlineColor": "#8055a4", "text": "-", "strokeColor": "#8055a4", "stroke": 2, "rotation": 180, "pivotY": 119, "name": "amount3", "fontSize": 30, "color": "#ffcc00", "anchorX": 0.5, "align": "center" } }, { "type": "Label", "props": { "y": 208, "x": 208, "valign": "middle", "underlineColor": "#8055a4", "text": "-", "strokeColor": "#8055a4", "stroke": 2, "rotation": 225, "pivotY": 119, "name": "amount2", "fontSize": 30, "color": "#ffcc00", "anchorX": 0.5, "align": "center" } }, { "type": "Label", "props": { "y": 208, "x": 208, "valign": "middle", "underlineColor": "#8055a4", "text": "-", "strokeColor": "#8055a4", "stroke": 2, "rotation": 270, "pivotY": 119, "name": "amount1", "fontSize": 30, "color": "#ffcc00", "anchorX": 0.5, "align": "center" } }, { "type": "Label", "props": { "y": 208, "x": 208, "valign": "middle", "underlineColor": "#8055a4", "text": "-", "strokeColor": "#8055a4", "stroke": 2, "rotation": 315, "pivotY": 119, "name": "amount0", "fontSize": 30, "color": "#ffcc00", "anchorX": 0.5, "align": "center" } }] }] }, { "type": "Box", "props": { "y": 0, "x": 0, "width": 560, "name": "shell0", "height": 506 }, "child": [{ "type": "Image", "props": { "y": -70, "x": 279, "skin": "ui/panel_notice/roullette/activityRoullette/img_zhuanpan_baiyin.png", "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 262, "x": 490, "skin": "ui/panel_notice/roullette/activityRoullette/img_zhuanpan_baiyin_ce.png", "scaleX": -1, "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 260, "x": 25, "skin": "ui/panel_notice/roullette/activityRoullette/img_zhuanpan_baiyin_ce.png", "anchorY": 0.5 } }] }, { "type": "Box", "props": { "y": 0, "x": 0, "width": 560, "name": "shell1", "height": 506 }, "child": [{ "type": "Image", "props": { "y": -68, "x": 279, "skin": "ui/panel_notice/roullette/activityRoullette/img_zhuanpan_huangjing.png", "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 263, "x": 492, "skin": "ui/panel_notice/roullette/activityRoullette/img_zhuanpan_huangjing_ce.png", "scaleX": -1, "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 263, "x": 25, "skin": "ui/panel_notice/roullette/activityRoullette/img_zhuanpan_huangjing_ce.png", "anchorY": 0.5 } }] }, { "type": "Box", "props": { "y": 0, "x": 0, "width": 560, "name": "shell2", "height": 506 }, "child": [{ "type": "Image", "props": { "y": -68, "x": 279, "skin": "ui/panel_notice/roullette/activityRoullette/img_zhuanpan_zuanshi.png", "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 260, "x": 492, "skin": "ui/panel_notice/roullette/activityRoullette/img_zhuanpan_zhuanshi_ce.png", "scaleX": -1, "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 259, "x": 25, "skin": "ui/panel_notice/roullette/activityRoullette/img_zhuanpan_zhuanshi_ce.png", "anchorY": 0.5 } }, { "type": "Image", "props": { "y": 452, "skin": "ui/panel_notice/roullette/activityRoullette/img_zhuanpan_zhuanshi_di.png", "centerX": -3 } }] }, { "type": "Animation", "props": { "y": -4, "x": 148, "var": "etcWinLight", "source": "dlg/notice/roulette/anims/ectWin.ani" } }, { "type": "Image", "props": { "y": 250, "x": 277, "skin": "ui/panel_notice/roullette/activityRoullette/img_zhuanpan_zhizhen.png", "pivotY": 98, "pivotX": 83 } }, { "type": "Animation", "props": { "y": 251, "x": 278, "var": "animBtnLight", "source": "dlg/notice/roulette/anims/ectBtnLight.ani", "autoAnimation": "light" } }, { "type": "Animation", "props": { "y": 234, "x": 280, "var": "ectBtnGo", "source": "dlg/notice/roulette/anims/ectGo.ani" } }, { "type": "Label", "props": { "y": 305, "x": 279, "text": "积分", "strokeColor": "#9966cc", "stroke": 2, "fontSize": 20, "font": "Microsoft YaHei", "color": "#ffffff", "centerX": 0, "bold": true, "anchorY": 0.5, "anchorX": 0.5, "align": "center" } }, { "type": "Label", "props": { "y": 277, "x": 279, "var": "reqNumLabel", "text": "1000", "strokeColor": "#9966cc", "stroke": 2, "fontSize": 30, "font": "Microsoft YaHei", "color": "#ffffff", "centerX": 0, "bold": true, "anchorY": 0.5, "anchorX": 0.5, "align": "center" } }] };
                    return GameRouletteUI;
                }(View));
                roulette.GameRouletteUI = GameRouletteUI;
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
                var NoticeRouletteUI = /** @class */ (function (_super) {
                    __extends(NoticeRouletteUI, _super);
                    function NoticeRouletteUI() {
                        return _super.call(this) || this;
                    }
                    NoticeRouletteUI.prototype.createChildren = function () {
                        View.regComponent("component.Notice.Roullette", component.Notice.Roullette);
                        View.regComponent("Text", laya.display.Text);
                        _super.prototype.createChildren.call(this);
                        this.createView(ui.dlg.notice.roulette.NoticeRouletteUI.uiView);
                    };
                    NoticeRouletteUI.uiView = { "type": "Dialog", "props": { "width": 1028, "height": 660 }, "child": [{ "type": "GameRoulette", "props": { "y": 67, "x": -9, "var": "roullette", "runtime": "component.Notice.Roullette" } }, { "type": "Box", "props": { "y": 254, "x": 209, "width": 120, "var": "startBtn", "height": 120 } }, { "type": "Image", "props": { "y": 569, "x": 19, "width": 508, "skin": "ui/panel_notice/roullette/activityRoullette/img_zhuanpan_xuanzhong_di508.png", "sizeGrid": "0,34,0,37", "height": 60 } }, { "type": "Box", "props": { "y": 570, "x": 20, "var": "tgGroupBox" }, "child": [{ "type": "Image", "props": { "y": 9, "x": 166, "skin": "ui/panel_notice/roullette/activityRoullette/img_zhuanpan_xuanzhong_k.png" } }, { "type": "Image", "props": { "y": 9, "x": 333, "skin": "ui/panel_notice/roullette/activityRoullette/img_zhuanpan_xuanzhong_k.png" } }, { "type": "CheckBox", "props": { "y": 8, "x": 364, "var": "tgDiamond", "stateNum": 2, "skin": "ui/panel_notice/roullette/activityRoullette/check_3.png" } }, { "type": "CheckBox", "props": { "y": 8, "x": 197, "var": "tgGold", "stateNum": 2, "skin": "ui/panel_notice/roullette/activityRoullette/check_2.png" } }, { "type": "CheckBox", "props": { "y": 8, "x": 30, "var": "tgSilver", "stateNum": 2, "skin": "ui/panel_notice/roullette/activityRoullette/check_1.png" } }] }, { "type": "Image", "props": { "y": 28, "x": 556, "width": 457, "skin": "ui/panel_notice/roullette/ui_获奖_1-1.png", "sizeGrid": "20,20,20,20", "height": 240 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "skin": "ui/panel_notice/roullette/ui_活动_2.png" }, "child": [{ "type": "Label", "props": { "y": 12, "x": 152, "width": 293, "var": "remainingTime", "valign": "bottom", "text": "剩余时间", "height": 37, "fontSize": 32, "font": "Microsoft YaHei", "color": "#ffffff" } }] }, { "type": "Image", "props": { "y": 55, "x": 0, "skin": "ui/panel_notice/roullette/ui_活动_3.png" }, "child": [{ "type": "Label", "props": { "y": 12, "x": 2, "width": 454, "var": "date", "text": "剩余时间", "height": 37, "fontSize": 20, "font": "Microsoft YaHei", "color": "#ffba25", "align": "center" } }] }, { "type": "Label", "props": { "y": 104, "x": 14, "wordWrap": true, "width": 428, "var": "contents", "text": "活动内容...", "height": 125, "fontSize": 24, "font": "Microsoft YaHei", "color": "#b3d8e3" } }] }, { "type": "Image", "props": { "y": 282, "x": 554, "width": 457, "var": "list", "skin": "ui/panel_notice/roullette/ui_获奖_1-1.png", "sizeGrid": "20,20,20,20", "height": 350 }, "child": [{ "type": "Image", "props": { "y": -2, "x": 0, "skin": "ui/panel_notice/roullette/ui_获奖_3.png" } }, { "type": "Image", "props": { "y": -2, "x": 0, "var": "newtab", "skin": "ui/panel_notice/roullette/ui_获奖_4.png" } }, { "type": "Image", "props": { "y": -2, "x": 226, "var": "mytab", "skin": "ui/panel_notice/roullette/ui_获奖_5.png" } }, { "type": "Image", "props": { "y": 96, "x": 1, "width": 455, "skin": "ui/panel_notice/roullette/huojiang_tiaoxing_an.png", "height": 40 } }, { "type": "Image", "props": { "y": 177, "x": 1, "width": 455, "skin": "ui/panel_notice/roullette/huojiang_tiaoxing_an.png", "height": 40 } }, { "type": "Image", "props": { "y": 136, "x": 1, "width": 455, "skin": "ui/panel_notice/roullette/huojiang_tiaoxing_liang.png", "height": 40 } }, { "type": "Image", "props": { "y": 217, "x": 1, "width": 455, "skin": "ui/panel_notice/roullette/huojiang_tiaoxing_liang.png", "height": 40 } }, { "type": "Image", "props": { "y": 298, "x": 1, "width": 455, "skin": "ui/panel_notice/roullette/huojiang_tiaoxing_liang.png", "height": 40 } }, { "type": "Image", "props": { "y": 258, "x": 1, "width": 455, "skin": "ui/panel_notice/roullette/huojiang_tiaoxing_an.png", "height": 40 } }, { "type": "Image", "props": { "y": 55, "x": 1, "width": 455, "skin": "ui/panel_notice/roullette/huojiang_tiaoxing_liang.png", "height": 40 } }, { "type": "Image", "props": { "y": 55, "x": 1, "width": 455, "var": "bright", "skin": "ui/panel_notice/roullette/huojiang_tiaoxing_liang2.png", "height": 40 } }, { "type": "Sprite", "props": { "y": 58, "x": 25, "name": "list0" }, "child": [{ "type": "Label", "props": { "y": 0, "x": -4, "width": 158, "valign": "middle", "text": "12 月 12 日", "name": "date", "height": 40, "fontSize": 26, "font": "Microsoft YaHei", "color": "#b3d8e3", "align": "left" } }, { "type": "Label", "props": { "y": 0, "x": 157, "width": 113, "valign": "middle", "text": "轮盘等级", "name": "type", "height": 40, "fontSize": 26, "font": "Microsoft YaHei", "align": "center" } }, { "type": "Label", "props": { "y": 0, "x": 270, "width": 163, "valign": "middle", "text": 88888888, "name": "total", "height": 40, "fontSize": 26, "font": "Microsoft YaHei", "align": "center" } }] }, { "type": "Sprite", "props": { "y": 99, "x": 25, "name": "list1" }, "child": [{ "type": "Label", "props": { "y": 0, "x": -4, "width": 158, "valign": "middle", "text": "12 月 12 日", "name": "date", "height": 40, "fontSize": 26, "font": "Microsoft YaHei", "color": "#b3d8e3", "align": "left" } }, { "type": "Label", "props": { "y": 0, "x": 157, "width": 113, "valign": "middle", "text": "轮盘等级", "name": "type", "height": 40, "fontSize": 26, "font": "Microsoft YaHei", "align": "center" } }, { "type": "Label", "props": { "y": 0, "x": 270, "width": 163, "valign": "middle", "text": 88888888, "name": "total", "height": 40, "fontSize": 26, "font": "Microsoft YaHei", "align": "center" } }] }, { "type": "Sprite", "props": { "y": 140, "x": 25, "name": "list2" }, "child": [{ "type": "Label", "props": { "y": 0, "x": -4, "width": 158, "valign": "middle", "text": "12 月 12 日", "name": "date", "height": 40, "fontSize": 26, "font": "Microsoft YaHei", "color": "#b3d8e3", "align": "left" } }, { "type": "Label", "props": { "y": 0, "x": 157, "width": 113, "valign": "middle", "text": "轮盘等级", "name": "type", "height": 40, "fontSize": 26, "font": "Microsoft YaHei", "align": "center" } }, { "type": "Label", "props": { "y": 0, "x": 270, "width": 163, "valign": "middle", "text": 88888888, "name": "total", "height": 40, "fontSize": 26, "font": "Microsoft YaHei", "align": "center" } }] }, { "type": "Sprite", "props": { "y": 181, "x": 25, "name": "list3" }, "child": [{ "type": "Label", "props": { "y": 0, "x": -4, "width": 158, "valign": "middle", "text": "12 月 12 日", "name": "date", "height": 40, "fontSize": 26, "font": "Microsoft YaHei", "color": "#b3d8e3", "align": "left" } }, { "type": "Label", "props": { "y": 0, "x": 157, "width": 113, "valign": "middle", "text": "轮盘等级", "name": "type", "height": 40, "fontSize": 26, "font": "Microsoft YaHei", "align": "center" } }, { "type": "Label", "props": { "y": 0, "x": 270, "width": 163, "valign": "middle", "text": 88888888, "name": "total", "height": 40, "fontSize": 26, "font": "Microsoft YaHei", "align": "center" } }] }, { "type": "Sprite", "props": { "y": 221, "x": 25, "name": "list4" }, "child": [{ "type": "Label", "props": { "y": 0, "x": -4, "width": 158, "valign": "middle", "text": "12 月 12 日", "name": "date", "height": 40, "fontSize": 26, "font": "Microsoft YaHei", "color": "#b3d8e3", "align": "left" } }, { "type": "Label", "props": { "y": 0, "x": 157, "width": 113, "valign": "middle", "text": "轮盘等级", "name": "type", "height": 40, "fontSize": 26, "font": "Microsoft YaHei", "align": "center" } }, { "type": "Label", "props": { "y": 0, "x": 270, "width": 163, "valign": "middle", "text": 88888888, "name": "total", "height": 40, "fontSize": 26, "font": "Microsoft YaHei", "align": "center" } }] }, { "type": "Sprite", "props": { "y": 262, "x": 25, "name": "list5" }, "child": [{ "type": "Label", "props": { "y": 0, "x": -4, "width": 158, "valign": "middle", "text": "12 月 12 日", "name": "date", "height": 40, "fontSize": 26, "font": "Microsoft YaHei", "color": "#b3d8e3", "align": "left" } }, { "type": "Label", "props": { "y": 0, "x": 157, "width": 113, "valign": "middle", "text": "轮盘等级", "name": "type", "height": 40, "fontSize": 26, "font": "Microsoft YaHei", "align": "center" } }, { "type": "Label", "props": { "y": 0, "x": 270, "width": 163, "valign": "middle", "text": 88888888, "name": "total", "height": 40, "fontSize": 26, "font": "Microsoft YaHei", "align": "center" } }] }, { "type": "Sprite", "props": { "y": 303, "x": 25, "name": "list6" }, "child": [{ "type": "Label", "props": { "y": 0, "x": -4, "width": 158, "valign": "middle", "text": "12 月 12 日", "name": "date", "height": 40, "fontSize": 26, "font": "Microsoft YaHei", "color": "#b3d8e3", "align": "left" } }, { "type": "Label", "props": { "y": -1, "x": 157, "width": 113, "valign": "middle", "text": "轮盘等级", "name": "type", "height": 40, "fontSize": 26, "font": "Microsoft YaHei", "align": "center" } }, { "type": "Label", "props": { "y": 0, "x": 270, "width": 163, "valign": "middle", "text": 88888888, "name": "total", "height": 40, "fontSize": 26, "font": "Microsoft YaHei", "align": "center" } }] }] }, { "type": "Image", "props": { "y": 30, "x": 19, "skin": "ui/panel_notice/roullette/activityRoullette/img_zhuanpan_dangqian.png" } }, { "type": "Image", "props": { "y": 30, "x": 394, "skin": "ui/panel_notice/roullette/activityRoullette/img_zhuanpan_ciri.png" } }, { "type": "Label", "props": { "y": 17, "x": 458, "text": "（今日有效投注）", "fontSize": 20, "font": "Microsoft YaHei", "color": "#17a1e6", "anchorY": 0.5, "anchorX": 0.5, "align": "center" } }, { "type": "Text", "props": { "y": 74, "x": 19, "width": 130, "var": "currentPt", "text": "-", "height": 28, "fontSize": 28, "color": "#ffba25", "align": "center" } }, { "type": "Text", "props": { "y": 74, "x": 394, "width": 130, "var": "todayPt", "text": "-", "height": 28, "fontSize": 28, "color": "#ffba25", "align": "center" } }] };
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
            NoticeDlgUI.uiView = { "type": "Dialog", "props": { "width": 1334, "height": 750 }, "child": [{ "type": "Image", "props": { "skin": "ui/panel_common/img_com_quanping_di.jpg", "centerX": 0 } }, { "type": "View", "props": { "y": 88, "width": 1030, "var": "contents", "height": 660, "centerX": 128 } }, { "type": "Image", "props": { "y": 85, "var": "contentList", "skin": "ui/panel_common/img_com_quanping_cedi.png", "left": -48 }, "child": [{ "type": "Sprite", "props": { "y": 23, "x": 0, "width": 306, "var": "content_tabs", "height": 642 }, "child": [{ "type": "Image", "props": { "x": 305, "var": "tab_dummy", "skin": "ui/panel_common/img_com_quanping_ce_di.png", "pivotX": 305, "name": "tab_dummy" }, "child": [{ "type": "Label", "props": { "y": 0, "x": 68, "wordWrap": true, "width": 230, "valign": "middle", "text": "公告讯息", "name": "label", "height": 95, "fontSize": 28, "font": "Microsoft YaHei", "color": "#b3d8e3", "align": "center" } }, { "type": "Image", "props": { "y": -7, "x": 0, "skin": "ui/panel_common/img_com_quanping_ce_xuanzhong.png", "name": "tab_on" }, "child": [{ "type": "Label", "props": { "y": 8, "x": 68, "wordWrap": true, "width": 230, "valign": "middle", "text": "公告讯息123456", "name": "label", "height": 95, "fontSize": 28, "font": "Microsoft YaHei", "color": "#ffffff", "align": "center" } }] }, { "type": "Image", "props": { "y": 9, "x": 278, "skin": "ui/panel_notice/markNew.png", "name": "newInd" } }] }] }, { "type": "Image", "props": { "y": 631, "x": 135, "var": "arrow", "skin": "ui/panel_notice/arrowBtns.png" } }] }, { "type": "Image", "props": { "y": 0, "x": -48, "width": 482, "var": "label", "skin": "ui/panel_common/img_com_quanping_ce_biaotou.png", "left": -48 }, "child": [{ "type": "Image", "props": { "y": 16, "x": 70, "skin": "ui/panel_notice/img_hd_bt01.png" } }, { "type": "Image", "props": { "y": 27, "x": 163, "skin": "ui/panel_notice/img_hdzx_hdzx.png" } }] }, { "type": "Image", "props": { "y": 10, "x": 496, "var": "tabs", "skin": "ui/panel_notice/按钮_公告_1.png", "centerX": 78 }, "child": [{ "type": "Image", "props": { "var": "tab_notice", "skin": "ui/panel_notice/按钮_公告_2.png" } }, { "type": "Image", "props": { "y": 0, "x": 231, "var": "tab_game", "skin": "ui/panel_notice/按钮_公告_3.png" } }, { "type": "Image", "props": { "y": 21, "x": 218, "var": "notice_counter", "skin": "ui/panel_notice/markNew.png", "sizeGrid": "11,11,11,11" }, "child": [{ "type": "Text", "props": { "y": 2, "x": 6, "name": "label", "fontSize": 18, "color": "#ffffff", "align": "left" } }] }, { "type": "Image", "props": { "y": 21, "x": 467, "var": "game_counter", "skin": "ui/panel_notice/markNew.png", "sizeGrid": "11,11,11,11" }, "child": [{ "type": "Text", "props": { "y": 2, "x": 6, "name": "label", "fontSize": 18, "color": "#ffffff", "align": "left" } }] }] }, { "type": "Image", "props": { "y": 2, "width": 292, "var": "controls", "skin": "ui/common/img_com_quanping_guanbi01.png", "right": -55, "pivotX": 292 }, "child": [{ "type": "Image", "props": { "y": 12, "x": 123, "skin": "ui/common/img_com_quanping_guanbi02.png" } }] }] };
            return NoticeDlgUI;
        }(Dialog));
        dlg.NoticeDlgUI = NoticeDlgUI;
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
                View.regComponent("Text", laya.display.Text);
                _super.prototype.createChildren.call(this);
                this.createView(ui.dlg.QuickSetPassWordDlgUI.uiView);
            };
            QuickSetPassWordDlgUI.uiView = { "type": "Dialog", "props": { "width": 754, "height": 480 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "skin": "ui/panel_common/mindlg.png" }, "child": [{ "type": "Image", "props": { "y": 25, "x": 255, "skin": "ui/fullMyCenter/img_xg_bt01.png" } }, { "type": "Image", "props": { "y": 52, "x": 712, "width": 61, "var": "closeBtn", "skin": "ui/common/newclose.png", "height": 64, "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 425, "x": 377, "var": "amendBtn", "skin": "ui/fullMyCenter/btn_grzx_xg02.png", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 105, "x": 30, "width": 694, "skin": "ui/common/img_com_xiankuang.png", "height": 272, "sizeGrid": "15,15,15,16" }, "child": [{ "type": "Image", "props": { "y": 131, "x": 48, "skin": "ui/fullMyCenter/img_grzx_sr06.png" } }, { "type": "Image", "props": { "y": 47, "x": 48, "skin": "ui/fullMyCenter/img_grzx_sr14.png" } }, { "type": "Image", "props": { "y": 40, "x": 218, "width": 410, "skin": "ui/res_login/img_dl_shurukuang04.png", "height": 50, "sizeGrid": "20,20,20,20" }, "child": [{ "type": "TextInput", "props": { "y": 2, "x": 15, "width": 340, "var": "newTxt1", "valign": "middle", "type": "password", "promptColor": "#93afc0", "prompt": "新密码(6-15位字符)", "height": 46, "fontSize": 30, "color": "#ffffff" } }, { "type": "CheckBox", "props": { "y": 2, "x": 359, "var": "lookBtn1", "stateNum": 2, "skin": "ui/common/check_see2.png", "selected": false } }] }, { "type": "Image", "props": { "y": 125, "x": 218, "width": 410, "skin": "ui/res_login/img_dl_shurukuang04.png", "height": 50, "sizeGrid": "20,20,20,20" }, "child": [{ "type": "TextInput", "props": { "y": 2, "x": 15, "width": 340, "var": "newTxt2", "valign": "middle", "type": "password", "promptColor": "#93afc0", "prompt": "请再次输入新密码", "height": 46, "fontSize": 30, "color": "#ffffff" } }, { "type": "CheckBox", "props": { "y": 2, "x": 359, "var": "lookBtn2", "stateNum": 2, "skin": "ui/common/check_see2.png", "selected": false } }] }, { "type": "Text", "props": { "y": 212, "x": 139, "width": 416, "text": "为了提高账户安全性,建议您修改为喜欢的密码", "strokeColor": "#000000", "height": 20, "fontSize": 18, "color": "#fff600", "bold": true, "align": "center" } }] }] }] };
            return QuickSetPassWordDlgUI;
        }(Dialog));
        dlg.QuickSetPassWordDlgUI = QuickSetPassWordDlgUI;
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
        var TipsDlgUI = /** @class */ (function (_super) {
            __extends(TipsDlgUI, _super);
            function TipsDlgUI() {
                return _super.call(this) || this;
            }
            TipsDlgUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.dlg.TipsDlgUI.uiView);
            };
            TipsDlgUI.uiView = { "type": "Dialog", "props": { "width": 754, "height": 480 }, "child": [{ "type": "Image", "props": { "skin": "ui/panel_common/mindlg.png" } }, { "type": "Image", "props": { "y": 109, "width": 710, "skin": "ui/common/img_com_xiankuang.png", "sizeGrid": "10,10,10,10", "height": 271, "centerX": 0 } }, { "type": "Image", "props": { "y": 22, "x": 320, "skin": "ui/panel_common/img_ts_ts.png" } }, { "type": "Image", "props": { "y": 52, "x": 706, "var": "btnClose", "top": 12, "skin": "ui/common/newclose.png", "right": 10, "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 426, "x": 376, "var": "btnConfirm", "skin": "ui/panel_common/queding.png", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Label", "props": { "y": 109, "x": 22, "width": 710, "var": "message", "valign": "middle", "text": "...", "height": 270, "fontSize": 30, "font": "SimHei", "color": "#b3d8e3", "align": "center" } }] };
            return TipsDlgUI;
        }(Dialog));
        dlg.TipsDlgUI = TipsDlgUI;
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
    var EmbedLoadingViewUI = /** @class */ (function (_super) {
        __extends(EmbedLoadingViewUI, _super);
        function EmbedLoadingViewUI() {
            return _super.call(this) || this;
        }
        EmbedLoadingViewUI.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.createView(ui.EmbedLoadingViewUI.uiView);
        };
        EmbedLoadingViewUI.uiView = { "type": "View", "props": { "width": 800, "height": 400 }, "child": [{ "type": "Box", "props": { "var": "animBox", "centerY": 0, "centerX": 0 } }] };
        return EmbedLoadingViewUI;
    }(View));
    ui.EmbedLoadingViewUI = EmbedLoadingViewUI;
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
        LobbyViewUI.uiView = { "type": "View", "props": { "width": 1334, "height": 750 }, "child": [{ "type": "Image", "props": { "var": "bgUI", "skin": "ui/lobby/bg_dating.jpg", "centerY": 0, "centerX": 0 } }, { "type": "Image", "props": { "y": 681, "var": "bottomBg", "skin": "ui/lobby/bottombar/img_dating_downbar.png", "right": -6, "sizeGrid": "19,30,30,160" } }, { "type": "Sprite", "props": { "y": 0, "x": 0, "var": "iconbox" } }, { "type": "Box", "props": { "width": 1624, "visible": false, "var": "maskPic", "mouseEnabled": false, "height": 750, "centerY": 0, "centerX": 0 }, "child": [{ "type": "Image", "props": { "y": 176, "x": 575, "skin": "ui/lobby/img_dating_huatu.png" } }] }, { "type": "Box", "props": { "y": 216, "x": 36, "width": 348, "var": "girlSp", "mouseEnabled": false, "hitTestPrior": false, "height": 540 } }, { "type": "Sprite", "props": { "y": 0, "x": 0, "var": "uibox", "mouseThrough": true } }, { "type": "Box", "props": { "width": 230, "var": "TLbox", "right": 0, "height": 109 }, "child": [{ "type": "Image", "props": { "y": 46, "x": -14, "var": "actBtn", "skin": "ui/lobby/icon_dt_hd.png", "anchorY": 0.5, "anchorX": 0.5 }, "child": [{ "type": "Image", "props": { "skin": "ui/lobby/icon_dating_notification.png", "name": "alert" } }] }, { "type": "Image", "props": { "y": 46, "x": 179, "var": "serviceBtn", "skin": "ui/lobby/icon_dt_kf.png", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 46, "x": 82, "var": "noticeBtn", "skin": "ui/lobby/icon_dt_gg.png", "anchorY": 0.5, "anchorX": 0.5 }, "child": [{ "type": "Image", "props": { "skin": "ui/lobby/icon_dating_notification.png", "name": "alert" } }] }] }, { "type": "Box", "props": { "y": 324, "width": 129, "var": "rightBtn", "right": 15, "height": 140 }, "compId": 57, "child": [{ "type": "Image", "props": { "y": 21, "x": 16, "skin": "ui/lobby/dating_right.png" }, "compId": 27 }] }, { "type": "Box", "props": { "y": 644, "x": 615, "width": 719, "var": "bottomGroup", "height": 106 }, "child": [{ "type": "Image", "props": { "y": 53, "x": 358, "var": "btn_tx", "skin": "ui/lobby/bottombar/icon_dt_tx.png", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 53, "x": -122, "width": 146, "var": "btn_bind", "skin": "ui/lobby/bottombar/btn_dt_bdsj01.png", "height": 92, "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Sprite", "props": { "y": -25, "x": 456, "width": 257, "var": "shopSp", "height": 132 } }, { "type": "Image", "props": { "y": 53, "x": 166, "var": "btn_dl", "skin": "ui/lobby/bottombar/icon_dt_dl.png", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 53, "x": 37, "var": "btn_mail", "skin": "ui/lobby/bottombar/icon_dt_yj.png", "anchorY": 0.5, "anchorX": 0.5 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "var": "mailDot", "skin": "ui/lobby/icon_dating_notification.png" } }] }, { "type": "Image", "props": { "y": 53, "x": 266, "var": "btn_yeb", "skin": "ui/lobby/bottombar/icon_dt_yeb.png", "anchorY": 0.5, "anchorX": 0.5 } }] }, { "type": "Box", "props": { "y": 324, "x": 430, "width": 129, "var": "leftBtn", "height": 140 }, "compId": 79, "child": [{ "type": "Image", "props": { "y": 21, "x": 129, "skin": "ui/lobby/dating_right.png", "scaleX": -1 }, "compId": 80 }] }], "animations": [{ "nodes": [{ "target": 27, "keyframes": { "x": [{ "value": 0, "tweenMethod": "linearNone", "tween": true, "target": 27, "key": "x", "index": 0 }, { "value": 20, "tweenMethod": "linearNone", "tween": true, "target": 27, "key": "x", "index": 15 }, { "value": 0, "tweenMethod": "linearNone", "tween": true, "target": 27, "key": "x", "index": 30 }] } }, { "target": 80, "keyframes": { "y": [{ "value": 21, "tweenMethod": "linearNone", "tween": true, "target": 80, "key": "y", "index": 0 }], "x": [{ "value": 129, "tweenMethod": "linearNone", "tween": true, "target": 80, "key": "x", "index": 0 }, { "value": 109, "tweenMethod": "linearNone", "tween": true, "target": 80, "key": "x", "index": 15 }, { "value": 129, "tweenMethod": "linearNone", "tween": true, "target": 80, "key": "x", "index": 30 }], "scaleX": [{ "value": -1, "tweenMethod": "linearNone", "tween": true, "target": 80, "key": "scaleX", "index": 0 }] } }, { "target": 79, "keyframes": { "var": [{ "value": "", "tweenMethod": "linearNone", "tween": false, "target": 79, "key": "var", "index": 0 }] } }, { "target": 57, "keyframes": { "var": [{ "value": "", "tweenMethod": "linearNone", "tween": false, "target": 57, "key": "var", "index": 0 }] } }], "name": "arrowAnim", "id": 1, "frameRate": 24, "action": 2 }] };
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
        PublicUIUI.uiView = { "type": "View", "props": { "width": 1334, "mouseThrough": true, "height": 750 }, "child": [{ "type": "Image", "props": { "y": 0, "x": -165, "width": 681, "var": "headGroup", "skin": "ui/lobby/img_dating_upperbar.png", "mouseThrough": true, "height": 107, "sizeGrid": "48,534,23,20" }, "child": [{ "type": "Image", "props": { "y": 10, "x": 280, "skin": "ui/lobby/img_dating_zhanghaozi.png", "mouseEnabled": false } }, { "type": "Label", "props": { "y": 58, "x": 286, "wordWrap": false, "width": 234, "var": "nameTxt", "mouseEnabled": false, "fontSize": 26, "color": "#ead111", "align": "left" } }, { "type": "Label", "props": { "y": 690, "x": 172, "width": 219, "var": "verTxt", "valign": "middle", "text": "ver-num", "leading": 2, "height": 54, "fontSize": 20, "color": "#dafcff" } }, { "type": "Image", "props": { "y": 8, "x": 172, "width": 90, "var": "headIcon", "height": 90 } }, { "type": "Image", "props": { "y": 3, "x": 167, "width": 100, "skin": "ui/common/avatorFrame.png", "height": 100, "sizeGrid": "0,0,0,0" } }] }, { "type": "Image", "props": { "y": 10, "var": "goldUI", "skin": "ui/lobby/img_dating_qian_di.png", "centerX": 75 }, "child": [{ "type": "Image", "props": { "y": 38, "x": 356, "var": "refreshBtn", "skin": "ui/lobby/uiyue.png", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 38, "x": 300, "var": "addBtn", "skin": "ui/lobby/dating_zengjia.png", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Sprite", "props": { "y": 39, "x": 11, "width": 20, "var": "goldAnim", "pivotY": 0, "pivotX": 0, "height": 20 } }, { "type": "Sprite", "props": { "y": 18, "x": 51, "width": 205, "var": "fontBox", "height": 40 } }] }, { "type": "Image", "props": { "y": 78, "var": "noticeGroup", "skin": "ui/lobby/img_dating_gonggaodi.png", "centerX": 116 }, "child": [{ "type": "Sprite", "props": { "y": 14, "x": 110, "width": 400, "var": "noticeSp", "height": 40 }, "child": [{ "type": "Label", "props": { "y": 0, "x": 0, "width": 155, "var": "msgTxt", "valign": "middle", "text": "111", "height": 40, "fontSize": 26, "color": "#efe8cd", "align": "left" } }] }] }] };
        return PublicUIUI;
    }(View));
    ui.PublicUIUI = PublicUIUI;
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
            GameIconViewUI.uiView = { "type": "View", "props": { "width": 244, "height": 202 }, "child": [{ "type": "Image", "props": { "var": "normIcon", "centerY": 0, "centerX": 0 } }, { "type": "Image", "props": { "y": 10, "x": 10, "var": "grayIcon", "centerY": 0, "centerX": 0 } }, { "type": "Box", "props": { "var": "animbox", "centerY": 0, "centerX": 0 } }, { "type": "Image", "props": { "var": "updateIcon", "top": 0, "skin": "ui/lobby/gengxing.png", "right": 0 } }, { "type": "Label", "props": { "width": 200, "var": "updateTxt", "text": "label", "height": 32, "fontSize": 26, "color": "#ccff00", "centerX": 0, "bottom": 10, "align": "center" } }, { "type": "Image", "props": { "var": "hotIcon", "top": 30, "skin": "ui/lobby/icon_hot.png", "right": 10 } }, { "type": "Image", "props": { "var": "expectIcon", "skin": "ui/lobby/jqqd.png", "centerY": 0, "centerX": 0 } }, { "type": "Image", "props": { "var": "pauseIcon", "skin": "ui/lobby/weihuzhong.png", "centerY": 0, "centerX": 0 } }] };
            return GameIconViewUI;
        }(View));
        UI.GameIconViewUI = GameIconViewUI;
    })(UI = ui.UI || (ui.UI = {}));
})(ui || (ui = {}));
(function (ui) {
    var UI;
    (function (UI) {
        var MailItemViewUI = /** @class */ (function (_super) {
            __extends(MailItemViewUI, _super);
            function MailItemViewUI() {
                return _super.call(this) || this;
            }
            MailItemViewUI.prototype.createChildren = function () {
                View.regComponent("Text", laya.display.Text);
                _super.prototype.createChildren.call(this);
                this.createView(ui.UI.MailItemViewUI.uiView);
            };
            MailItemViewUI.uiView = { "type": "View", "props": { "width": 464, "height": 77 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "var": "normGroup", "skin": "ui/mailbox/img_yx_xtyj-kuang.png" }, "child": [{ "type": "Image", "props": { "y": 4, "x": 10, "var": "stateIcon", "skin": "ui/mailbox/icon_yx_xtyj-yj-g.png" } }, { "type": "Text", "props": { "y": 7, "x": 109, "width": 341, "var": "titleTxt", "text": "title", "overflow": "hidden", "height": 30, "fontSize": 30, "color": "#ffffff" } }, { "type": "Text", "props": { "y": 41, "x": 116, "width": 335, "var": "timeTxt", "text": "2018-12-23", "overflow": "hidden", "height": 26, "fontSize": 26, "color": "#ffffff", "align": "right" } }] }, { "type": "Image", "props": { "y": -3, "x": 0, "var": "selectPic", "skin": "ui/mailbox/img_yx_xtyj-kuang-l.png" } }, { "type": "Image", "props": { "y": 38, "x": 69, "var": "giftIcon", "skin": "ui/mailbox/img_yx_xtyj-lw.png" } }] };
            return MailItemViewUI;
        }(View));
        UI.MailItemViewUI = MailItemViewUI;
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
                LoginUI.uiView = { "type": "View", "props": { "y": 0, "width": 1334, "visible": true, "height": 750, "centerY": 0, "centerX": 0 }, "child": [{ "type": "Image", "props": { "y": 0, "x": -145, "skin": "ui/res_login/BG_dl01.jpg", "name": "background", "height": 750, "centerY": 0, "centerX": 0 } }, { "type": "Image", "props": { "y": 94, "x": -101, "top": 94, "skin": "ui/res_login/img_dl_nv01.jpg.png", "name": "back_women", "left": 44 } }, { "type": "ProgressBar", "props": { "y": 690, "x": 22, "var": "pb_loading", "skin": "ui/res_login/img_dl_jingdutiao01.png", "name": "pb_loading", "centerX": 0, "bottom": 40 } }, { "type": "Image", "props": { "y": 199, "x": 486, "width": 800, "var": "sp_log", "top": 199, "name": "sp_log", "left": 486, "height": 280 } }, { "type": "Label", "props": { "y": 656, "x": 667, "var": "lb_text", "text": "正在更新资源30%", "fontSize": 32, "font": "SimHei", "color": "#ffffff", "centerX": 0, "bottom": 78, "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 47, "var": "btn_service", "top": 15, "skin": "ui/res_login/icon_dl_kefu01.png", "right": 50, "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "visible": false, "var": "btn_other_login", "skin": "ui/res_login/btn_dl_genghuan01.png", "left": 29, "bottom": 37, "anchorY": 0.45, "anchorX": 0.5 } }, { "type": "Box", "props": { "y": 602, "width": 1004, "var": "loginBtnGroup", "mouseThrough": true, "height": 95, "centerX": 0 }, "child": [{ "type": "Image", "props": { "y": 36, "x": -1, "width": 237, "var": "login_fast", "skin": "ui/res_login/btn_dl_kuaijie01.png", "height": 73, "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 36, "x": 628, "width": 237, "var": "login_account", "skin": "ui/res_login/btn_dl_zhanghao01.png", "height": 73, "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 36, "x": 942, "width": 237, "var": "login_phone", "skin": "ui/res_login/btn_dl_shouji01.png", "height": 73, "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Button", "props": { "y": 36, "x": 313, "var": "login_wx", "stateNum": 1, "skin": "ui/res_login/btn_dl_weixin01.png", "anchorY": 0.5, "anchorX": 0.5 } }] }, { "type": "Image", "props": { "width": 725, "visible": false, "var": "panelFast", "top": 120, "skin": "ui/res_login/img_dl_chuangkou01.png", "right": 99 }, "child": [{ "type": "Image", "props": { "top": 152, "skin": "ui/res_login/img_dl_tianxie01.png", "left": 95 } }, { "type": "Image", "props": { "y": 16, "skin": "ui/res_login/img_dl_biaotou03.png", "centerX": 0 } }, { "type": "Image", "props": { "y": 502, "x": 362, "var": "fast_login", "skin": "ui/res_login/btn_dl_denglu01.png", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 144, "x": 229, "width": 410, "skin": "ui/res_login/img_dl_shurukuang04.png", "height": 50, "sizeGrid": "20,20,20,20" }, "child": [{ "type": "TextInput", "props": { "y": 2, "x": 15, "width": 376, "var": "fast_nameTxt", "valign": "middle", "type": "text", "restrict": "0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM", "promptColor": "#93afc0", "prompt": "4-11位字母和数字", "maxChars": 11, "height": 46, "fontSize": 30, "color": "#ffffff" } }] }, { "type": "Box", "props": { "y": 251, "x": 95, "var": "fastCodeGroup" }, "child": [{ "type": "Image", "props": { "y": 9, "skin": "ui/res_login/img_dl_tianxie03.png" } }, { "type": "Image", "props": { "x": 134, "width": 410, "skin": "ui/res_login/img_dl_shurukuang04.png", "height": 50, "sizeGrid": "20,20,20,20" }, "child": [{ "type": "TextInput", "props": { "y": 2, "x": 15, "width": 376, "var": "fast_codeTxt", "valign": "middle", "type": "text", "promptColor": "#93afc0", "prompt": "请输入验证码", "maxChars": 6, "height": 46, "fontSize": 30, "color": "#ffffff" } }] }, { "type": "Image", "props": { "y": 12, "x": 361, "var": "fast_codePic" } }] }, { "type": "Label", "props": { "y": 365, "x": 175, "text": "用户名比较重要，建议截图保存至相册", "fontSize": 22, "font": "SimHei", "color": "#fff600" } }] }, { "type": "Image", "props": { "x": 10, "width": 725, "visible": false, "var": "panelAccount", "top": 120, "skin": "ui/res_login/img_dl_chuangkou01.png", "right": 76 }, "child": [{ "type": "Image", "props": { "y": 134, "x": 95, "skin": "ui/res_login/img_dl_tianxie01.png" } }, { "type": "Image", "props": { "y": 16, "skin": "ui/res_login/img_dl_biaotou01.png", "centerX": 0 } }, { "type": "Image", "props": { "y": 502, "x": 568, "visible": true, "var": "acc_login", "skin": "ui/res_login/btn_dl_denglu01.png", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 502, "x": 158, "visible": true, "var": "acc_regBtn", "skin": "ui/res_login/btn_dl_zhuce01.png", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 226, "x": 95, "visible": true, "skin": "ui/res_login/img_dl_tianxie02.png" } }, { "type": "Image", "props": { "y": 218, "x": 229, "width": 410, "skin": "ui/res_login/img_dl_shurukuang04.png", "height": 50, "sizeGrid": "20,20,20,20" }, "child": [{ "type": "TextInput", "props": { "y": 2, "x": 15, "width": 340, "var": "acc_pwdTxt", "valign": "middle", "type": "password", "promptColor": "#93afc0", "prompt": "请输入密码", "maxChars": 15, "height": 46, "fontSize": 30, "color": "#ffffff" } }, { "type": "CheckBox", "props": { "y": 2, "x": 359, "var": "acc_lookBtn", "stateNum": 2, "skin": "ui/res_login/check_seelogin.png", "selected": false } }] }, { "type": "Image", "props": { "y": 126, "x": 229, "width": 410, "skin": "ui/res_login/img_dl_shurukuang04.png", "height": 50, "sizeGrid": "20,20,20,20" }, "child": [{ "type": "TextInput", "props": { "y": 2, "x": 15, "width": 376, "var": "acc_nameTxt", "valign": "middle", "type": "text", "restrict": "0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM", "promptColor": "#93afc0", "prompt": "请输入用户名或手机号", "maxChars": 11, "height": 46, "fontSize": 30, "color": "#ffffff" } }] }, { "type": "Box", "props": { "y": 309, "x": 95, "var": "accCodeGroup" }, "child": [{ "type": "Image", "props": { "y": 9, "skin": "ui/res_login/img_dl_tianxie03.png" } }, { "type": "Image", "props": { "x": 134, "width": 410, "skin": "ui/res_login/img_dl_shurukuang04.png", "height": 50, "sizeGrid": "20,20,20,20" }, "child": [{ "type": "TextInput", "props": { "y": 2, "x": 15, "width": 376, "var": "acc_codeTxt", "valign": "middle", "type": "text", "restrict": "0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM", "promptColor": "#93afc0", "prompt": "请输入验证码", "maxChars": 6, "height": 46, "fontSize": 30, "color": "#ffffff" } }] }, { "type": "Image", "props": { "y": 11, "x": 358, "var": "acc_codePic" } }] }, { "type": "Label", "props": { "y": 387, "x": 263, "text": "忘记密码请联系客服", "fontSize": 22, "font": "SimHei", "color": "#fff600" } }] }, { "type": "Image", "props": { "width": 725, "visible": false, "var": "panelRegister", "top": 120, "skin": "ui/res_login/img_dl_chuangkou01.png", "right": 76 }, "child": [{ "type": "Image", "props": { "y": 119, "x": 95, "skin": "ui/res_login/img_dl_tianxie01.png" } }, { "type": "Image", "props": { "y": 12, "skin": "ui/res_login/img_dl_biaotou04.png", "centerX": 0 } }, { "type": "Image", "props": { "y": 311, "x": 95, "skin": "ui/res_login/img_dl_tianxie03.png" } }, { "type": "Image", "props": { "y": 498, "x": 568, "var": "reg_confirm", "skin": "ui/res_login/btn_dl_queren01.png", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 498, "x": 158, "var": "reg_back", "skin": "ui/res_login/btn_dl_fanhui01.png", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 247, "x": 77, "skin": "ui/res_login/img_dl_tianxie06.png" } }, { "type": "Image", "props": { "y": 183, "x": 77, "skin": "ui/res_login/img_dl_tianxie05.png" } }, { "type": "Image", "props": { "y": 176, "x": 229, "width": 410, "skin": "ui/res_login/img_dl_shurukuang04.png", "height": 50, "sizeGrid": "20,20,20,20" }, "child": [{ "type": "TextInput", "props": { "y": 2, "x": 15, "width": 340, "var": "reg_pwdTxt1", "valign": "middle", "type": "password", "promptColor": "#93afc0", "prompt": "请输入6-15位字符", "maxChars": 15, "height": 46, "fontSize": 30, "color": "#ffffff" } }, { "type": "CheckBox", "props": { "y": 2, "x": 359, "var": "reg_lookBtn1", "stateNum": 2, "skin": "ui/res_login/check_seelogin.png", "selected": false } }] }, { "type": "Image", "props": { "y": 111, "x": 229, "width": 410, "skin": "ui/res_login/img_dl_shurukuang04.png", "height": 50, "sizeGrid": "20,20,20,20" }, "child": [{ "type": "TextInput", "props": { "y": 2, "x": 15, "width": 376, "var": "reg_nameTxt", "valign": "middle", "type": "text", "restrict": "0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM", "promptColor": "#93afc0", "prompt": "4-11位字母和数字", "maxChars": 11, "height": 46, "fontSize": 30, "color": "#ffffff" } }] }, { "type": "Image", "props": { "y": 239, "x": 229, "width": 410, "skin": "ui/res_login/img_dl_shurukuang04.png", "height": 50, "sizeGrid": "20,20,20,20" }, "child": [{ "type": "TextInput", "props": { "y": 2, "x": 15, "width": 340, "var": "reg_pwdTxt2", "valign": "middle", "type": "password", "promptColor": "#93afc0", "prompt": "请再次输入密码", "maxChars": 15, "height": 46, "fontSize": 30, "color": "#ffffff" } }, { "type": "CheckBox", "props": { "y": 2, "x": 359, "var": "reg_lookBtn2", "stateNum": 2, "skin": "ui/res_login/check_seelogin.png", "selected": false } }] }, { "type": "Image", "props": { "y": 303, "x": 229, "width": 410, "skin": "ui/res_login/img_dl_shurukuang04.png", "height": 50, "sizeGrid": "20,20,20,20" }, "child": [{ "type": "TextInput", "props": { "y": 2, "x": 15, "width": 376, "var": "reg_codeTxt", "valign": "middle", "type": "text", "restrict": "0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM", "promptColor": "#93afc0", "prompt": "请输入验证码", "maxChars": 6, "height": 46, "fontSize": 30, "color": "#ffffff" } }] }, { "type": "Image", "props": { "y": 312, "x": 453, "var": "reg_codePic" } }, { "type": "Image", "props": { "y": 373, "x": 94, "skin": "ui/res_login/img_dl_tianxie09.png" } }, { "type": "Image", "props": { "y": 365, "x": 229, "width": 410, "skin": "ui/res_login/img_dl_shurukuang04.png", "height": 50, "sizeGrid": "20,20,20,20" }, "child": [{ "type": "TextInput", "props": { "y": 2, "x": 15, "width": 376, "var": "affcodeTxt", "valign": "middle", "type": "text", "promptColor": "#93afc0", "prompt": "请输入推荐人邀请码", "height": 46, "fontSize": 30, "color": "#ffffff" } }] }, { "type": "Image", "props": { "y": 128, "x": 653, "skin": "ui/res_login/img_dl_xinhao01.png" } }, { "type": "Image", "props": { "y": 193, "x": 653, "width": 17, "skin": "ui/res_login/img_dl_xinhao01.png", "height": 16 } }, { "type": "Image", "props": { "y": 256, "x": 653, "skin": "ui/res_login/img_dl_xinhao01.png" } }, { "type": "Image", "props": { "y": 320, "x": 653, "skin": "ui/res_login/img_dl_xinhao01.png" } }] }, { "type": "Image", "props": { "x": 10, "width": 725, "visible": false, "var": "panelPhone", "top": 120, "skin": "ui/res_login/img_dl_chuangkou01.png", "right": 76 }, "child": [{ "type": "Image", "props": { "top": 157, "skin": "ui/res_login/img_dl_tianxie04.png", "left": 95 } }, { "type": "Image", "props": { "y": 16, "skin": "ui/res_login/img_dl_biaotou02.png", "centerX": 0 } }, { "type": "Image", "props": { "top": 268, "skin": "ui/res_login/img_dl_tianxie03.png", "left": 95 } }, { "type": "Image", "props": { "y": 500, "x": 362, "var": "mp_login", "skin": "ui/res_login/btn_dl_denglu01.png", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 279, "x": 541, "var": "mp_waitBtn", "skin": "ui/res_login/btn_dl_yanzhengma02.png", "anchorY": 0.5, "anchorX": 0.5 }, "child": [{ "type": "Text", "props": { "y": 9, "x": 7, "width": 62, "var": "mp_timeTxt", "text": "0", "fontSize": 36, "color": "#ffffff", "align": "center" } }] }, { "type": "Image", "props": { "y": 279, "x": 541, "var": "mp_getcodeBtn", "skin": "ui/res_login/btn_dl_yanzhengma01.png", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 148, "x": 229, "width": 410, "skin": "ui/res_login/img_dl_shurukuang04.png", "height": 50, "sizeGrid": "20,20,20,20" }, "child": [{ "type": "TextInput", "props": { "y": 2, "x": 15, "width": 376, "var": "mp_numTxt", "valign": "middle", "type": "text", "restrict": "0123456789", "promptColor": "#93afc0", "prompt": "请输入可用手机号", "maxChars": 11, "height": 46, "fontSize": 30, "color": "#ffffff" } }] }, { "type": "Image", "props": { "y": 259, "x": 229, "width": 196, "skin": "ui/res_login/img_dl_shurukuang04.png", "height": 50, "sizeGrid": "20,20,20,20" }, "child": [{ "type": "TextInput", "props": { "y": 2, "x": 15, "width": 169, "var": "mp_codeTxt", "valign": "middle", "type": "text", "restrict": "0123456789", "promptColor": "#93afc0", "prompt": "请输验证码", "maxChars": 6, "height": 46, "fontSize": 30, "color": "#ffffff" } }] }, { "type": "Label", "props": { "y": 367, "x": 274, "text": "首次登录自动注册", "fontSize": 22, "font": "SimHei", "color": "#fff600" } }] }, { "type": "Label", "props": { "x": 25, "width": 164, "var": "verTxt", "valign": "middle", "text": "vertxt", "leading": 2, "height": 37, "fontSize": 15, "color": "#d9fcff", "bottom": 0 } }, { "type": "Text", "props": { "y": 717, "x": 177, "width": 980, "text": "抵制不良游戏,拒绝盗版游戏。注意自身保护,谨防受骗上当。适度游戏益脑,沉迷游戏伤身。合理安排时间。享受健康生活", "height": 20, "fontSize": 18, "color": "#fff600", "align": "center" } }] };
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
            SetPwdPanelUI.uiView = { "type": "View", "props": { "width": 712, "height": 466 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 712, "skin": "ui/common/img_com_xiankuang.png", "height": 362, "sizeGrid": "15,15,15,16" }, "child": [{ "type": "Box", "props": { "y": 111, "x": 56, "var": "panel1" }, "child": [{ "type": "Image", "props": { "y": 6, "x": 19, "skin": "ui/fullMyCenter/img_grzx_sr10.png" } }, { "type": "Image", "props": { "y": 89, "skin": "ui/fullMyCenter/img_grzx_sr05.png" } }, { "type": "Image", "props": { "y": 171, "x": 0, "skin": "ui/fullMyCenter/img_grzx_sr06.png" } }, { "type": "Image", "props": { "y": -1, "x": 185, "width": 410, "skin": "ui/res_login/img_dl_shurukuang04.png", "height": 50, "sizeGrid": "20,20,20,20" }, "child": [{ "type": "TextInput", "props": { "y": 2, "x": 15, "width": 340, "var": "pwdTxt1", "valign": "middle", "type": "password", "promptColor": "#93afc0", "prompt": "请输入旧密码", "height": 46, "fontSize": 30, "color": "#ffffff" } }, { "type": "CheckBox", "props": { "y": 2, "x": 359, "var": "lookBtn1", "stateNum": 2, "skin": "ui/common/check_see2.png", "selected": false } }] }, { "type": "Image", "props": { "y": 82, "x": 185, "width": 410, "skin": "ui/res_login/img_dl_shurukuang04.png", "height": 50, "sizeGrid": "20,20,20,20" }, "child": [{ "type": "TextInput", "props": { "y": 2, "x": 15, "width": 340, "var": "pwdTxt2", "valign": "middle", "type": "password", "promptColor": "#93afc0", "prompt": "请输入6-15位字符", "maxChars": 15, "height": 46, "fontSize": 30, "color": "#ffffff" } }, { "type": "CheckBox", "props": { "y": 2, "x": 359, "var": "lookBtn2", "stateNum": 2, "skin": "ui/common/check_see2.png", "selected": false } }] }, { "type": "Image", "props": { "y": 164, "x": 185, "width": 410, "skin": "ui/res_login/img_dl_shurukuang04.png", "height": 50, "sizeGrid": "20,20,20,20" }, "child": [{ "type": "TextInput", "props": { "y": 2, "x": 15, "width": 340, "var": "pwdTxt3", "valign": "middle", "type": "password", "promptColor": "#93afc0", "prompt": "请再次输入密码", "maxChars": 15, "height": 46, "fontSize": 30, "color": "#ffffff" } }, { "type": "CheckBox", "props": { "y": 2, "x": 359, "var": "lookBtn3", "stateNum": 2, "skin": "ui/common/check_see2.png", "selected": false } }] }] }, { "type": "Box", "props": { "y": 79, "x": 54, "width": 656, "var": "panel2", "height": 265 }, "child": [{ "type": "Image", "props": { "y": 150, "skin": "ui/res_login/img_dl_tianxie05.png" } }, { "type": "Image", "props": { "y": 223, "skin": "ui/fullMyCenter/img_grzx_sr06.png" } }, { "type": "Image", "props": { "y": 96, "x": 487, "skin": "ui/res_login/btn_dl_yanzhengma02.png", "anchorY": 0.5, "anchorX": 0.5 }, "child": [{ "type": "Text", "props": { "y": 9, "x": 7, "width": 62, "var": "timeTxt", "text": "0", "fontSize": 36, "color": "#ffffff", "align": "center" } }] }, { "type": "Image", "props": { "y": 96, "x": 487, "var": "getCodeBtn", "skin": "ui/res_login/btn_dl_yanzhengma01.png", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 80, "x": 20, "skin": "ui/res_login/img_dl_tianxie03.png" } }, { "type": "Image", "props": { "y": 8, "x": 19, "skin": "ui/res_login/img_dl_tianxie04.png" } }, { "type": "Image", "props": { "y": 0, "x": 176, "width": 410, "skin": "ui/res_login/img_dl_shurukuang04.png", "height": 50, "sizeGrid": "20,20,20,20" }, "child": [{ "type": "TextInput", "props": { "y": 2, "x": 15, "width": 378, "var": "phoneTxt", "valign": "middle", "type": "text", "restrict": "0123456789", "promptColor": "#93afc0", "prompt": "请输入可用手机号", "maxChars": 11, "height": 46, "fontSize": 30, "color": "#ffffff" } }] }, { "type": "Image", "props": { "y": 143, "x": 176, "width": 410, "skin": "ui/res_login/img_dl_shurukuang04.png", "height": 50, "sizeGrid": "20,20,20,20" }, "child": [{ "type": "TextInput", "props": { "y": 2, "x": 15, "width": 340, "var": "pwdTxt4", "valign": "middle", "type": "password", "promptColor": "#93afc0", "prompt": "请输入6-15位字符", "maxChars": 15, "height": 46, "fontSize": 30, "color": "#ffffff" } }, { "type": "CheckBox", "props": { "y": 2, "x": 359, "var": "lookBtn4", "stateNum": 2, "skin": "ui/common/check_see2.png", "selected": false } }] }, { "type": "Image", "props": { "y": 215, "x": 176, "width": 410, "skin": "ui/res_login/img_dl_shurukuang04.png", "height": 50, "sizeGrid": "20,20,20,20" }, "child": [{ "type": "TextInput", "props": { "y": 2, "x": 15, "width": 340, "var": "pwdTxt5", "valign": "middle", "type": "password", "promptColor": "#93afc0", "prompt": "请再次输入密码", "maxChars": 15, "height": 46, "fontSize": 30, "color": "#ffffff" } }, { "type": "CheckBox", "props": { "y": 2, "x": 359, "var": "lookBtn5", "stateNum": 2, "skin": "ui/common/check_see2.png", "selected": false } }] }, { "type": "Image", "props": { "y": 72, "x": 176, "width": 196, "skin": "ui/res_login/img_dl_shurukuang04.png", "height": 50, "sizeGrid": "20,20,20,20" }, "child": [{ "type": "TextInput", "props": { "y": 2, "x": 15, "width": 168, "var": "codeTxt", "valign": "middle", "type": "text", "restrict": "0123456789", "promptColor": "#93afc0", "prompt": "请输验证码", "maxChars": 6, "height": 46, "fontSize": 30, "color": "#ffffff" } }] }] }, { "type": "Image", "props": { "y": 426, "x": 356, "var": "okBtn", "skin": "ui/fullMyCenter/btn_grzx_qd01.png", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Box", "props": { "y": 19, "x": 92, "var": "checkGroup1" }, "child": [{ "type": "Image", "props": { "y": 7, "x": 57, "skin": "ui/fullMyCenter/img_grzx_gx05.png" } }, { "type": "CheckBox", "props": { "y": 0, "x": 0, "width": 202, "var": "checkBtn1", "skin": "ui/fullMyCenter/check_gou.png", "selected": false, "height": 42 } }] }, { "type": "Box", "props": { "y": 19, "x": 355, "var": "checkGroup2" }, "child": [{ "type": "Image", "props": { "y": 7, "x": 57, "skin": "ui/fullMyCenter/img_grzx_gx04.png" } }, { "type": "CheckBox", "props": { "y": 0, "x": 0, "width": 236, "var": "checkBtn2", "skin": "ui/fullMyCenter/check_gou.png", "height": 42 } }] }] }] };
            return SetPwdPanelUI;
        }(View));
        UI.SetPwdPanelUI = SetPwdPanelUI;
    })(UI = ui.UI || (ui.UI = {}));
})(ui || (ui = {}));
//# sourceMappingURL=layaUI.max.all.js.map