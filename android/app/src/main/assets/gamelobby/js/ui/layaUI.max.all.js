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
            AgentDlgUI.uiView = { "type": "Dialog", "props": { "width": 1624, "height": 750 }, "child": [{ "type": "Image", "props": { "skin": "ui/panel_common/img_com_quanping_di.jpg", "centerY": 0, "centerX": 0 } }, { "type": "Image", "props": { "y": 85, "var": "contentList", "skin": "ui/panel_common/img_com_quanping_cedi.png" }, "child": [{ "type": "Sprite", "props": { "y": -85, "width": 306, "var": "content_tabs", "height": 750 }, "child": [{ "type": "Image", "props": { "y": 127, "x": 305, "var": "tabHome", "skin": "ui/panel_common/img_com_quanping_ce_di.png", "pivotX": 305, "name": "tab0" }, "child": [{ "type": "Image", "props": { "y": 25, "x": 80, "skin": "ui/panel_agent/img_daili_zi05.png", "pivotY": 0.5, "pivotX": 0.5 } }, { "type": "Image", "props": { "y": -7, "x": 0, "skin": "ui/panel_common/img_com_quanping_ce_xuanzhong.png", "name": "tab_on" }, "child": [{ "type": "Image", "props": { "y": 32, "x": 80, "skin": "ui/panel_agent/img_daili_zi010.png", "pivotY": 0.5, "pivotX": 0.5 } }] }] }, { "type": "Image", "props": { "y": 237, "x": 305, "var": "tabAffiliates", "skin": "ui/panel_common/img_com_quanping_ce_di.png", "pivotX": 305, "name": "tab1" }, "child": [{ "type": "Image", "props": { "y": 25, "x": 80, "skin": "ui/panel_agent/img_daili_zi04.png", "pivotY": 0.5, "pivotX": 0.5 } }, { "type": "Image", "props": { "y": -7, "x": 0, "skin": "ui/panel_common/img_com_quanping_ce_xuanzhong.png", "name": "tab_on" }, "child": [{ "type": "Image", "props": { "y": 32, "x": 78, "skin": "ui/panel_agent/img_daili_zi09.png", "pivotY": 0.5, "pivotX": 0.5 } }] }] }, { "type": "Image", "props": { "y": 347, "x": 305, "var": "tabAchievement", "skin": "ui/panel_common/img_com_quanping_ce_di.png", "pivotX": 305, "name": "tab2" }, "child": [{ "type": "Image", "props": { "y": 25, "x": 80, "skin": "ui/panel_agent/img_daili_zi03.png", "pivotY": 0.5, "pivotX": 0.5 } }, { "type": "Image", "props": { "y": -7, "x": 0, "skin": "ui/panel_common/img_com_quanping_ce_xuanzhong.png", "name": "tab_on" }, "child": [{ "type": "Image", "props": { "y": 32, "x": 80, "skin": "ui/panel_agent/img_daili_zi08.png", "pivotY": 0.5, "pivotX": 0.5 } }] }] }, { "type": "Image", "props": { "y": 456, "x": 305, "var": "tabCodes", "skin": "ui/panel_common/img_com_quanping_ce_di.png", "pivotX": 305, "name": "tab3" }, "child": [{ "type": "Image", "props": { "y": 25, "x": 80, "skin": "ui/panel_agent/img_daili_zi02.png", "pivotY": 0.5, "pivotX": 0.5 } }, { "type": "Image", "props": { "y": -7, "x": 0, "skin": "ui/panel_common/img_com_quanping_ce_xuanzhong.png", "name": "tab_on" }, "child": [{ "type": "Image", "props": { "y": 32, "x": 80, "skin": "ui/panel_agent/img_daili_zi07.png", "pivotY": 0.5, "pivotX": 0.5 } }] }] }, { "type": "Image", "props": { "y": 566, "x": 305, "var": "tabDescription", "skin": "ui/panel_common/img_com_quanping_ce_di.png", "pivotX": 305, "name": "tab4" }, "child": [{ "type": "Image", "props": { "y": 25, "x": 80, "skin": "ui/panel_agent/img_daili_zi01.png", "pivotY": 0.5, "pivotX": 0.5 } }, { "type": "Image", "props": { "y": -7, "x": 0, "skin": "ui/panel_common/img_com_quanping_ce_xuanzhong.png", "name": "tab_on" }, "child": [{ "type": "Image", "props": { "y": 32, "x": 80, "skin": "ui/panel_agent/img_daili_zi06.png", "pivotY": 0.5, "pivotX": 0.5 } }] }] }] }] }, { "type": "Image", "props": { "width": 482, "var": "label", "skin": "ui/panel_common/img_com_quanping_ce_biaotou.png" }, "child": [{ "type": "Image", "props": { "y": 0, "x": 70, "skin": "ui/panel_agent/img_daili_biaotou.png" } }, { "type": "Image", "props": { "y": 27, "x": 180, "skin": "ui/panel_agent/img_daili_biaotou02.png" } }] }, { "type": "Image", "props": { "y": 2, "x": 1624, "width": 292, "var": "control", "skin": "ui/panel_common/img_com_quanping_guanbi01.png", "pivotX": 292 }, "child": [{ "type": "Image", "props": { "y": 12, "x": 123, "skin": "ui/panel_common/img_com_quanping_guanbi02.png" } }] }, { "type": "Image", "props": { "y": 19, "x": 1177, "var": "btnComRecords", "skin": "ui/panel_agent/b_dlzx_tyjl.png" } }, { "type": "View", "props": { "y": 110, "x": 420, "width": 1035, "var": "contents", "height": 625 } }] };
            return AgentDlgUI;
        }(Dialog));
        dlg.AgentDlgUI = AgentDlgUI;
    })(dlg = ui.dlg || (ui.dlg = {}));
})(ui || (ui = {}));
(function (ui) {
    var dlg;
    (function (dlg) {
        var HeadListDlgUI = /** @class */ (function (_super) {
            __extends(HeadListDlgUI, _super);
            function HeadListDlgUI() {
                return _super.call(this) || this;
            }
            HeadListDlgUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.dlg.HeadListDlgUI.uiView);
            };
            HeadListDlgUI.uiView = { "type": "Dialog", "props": { "width": 1055, "height": 644 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "skin": "ui/common/img_touxiang_dadi.png" }, "child": [{ "type": "Image", "props": { "y": 24, "x": 385, "skin": "ui/common/userinfo.png" } }, { "type": "Image", "props": { "y": 481, "x": 178, "var": "changeBtn", "skin": "ui/common/touxiang_queren_01.png", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 147, "x": 119, "width": 124, "skin": "ui/common/img_touxiang_touxiangkuang.png", "height": 124 } }, { "type": "Image", "props": { "y": 331, "x": 86, "skin": "ui/common/bgCoin.png" } }, { "type": "Image", "props": { "y": 104, "x": 339, "var": "itembg", "skin": "ui/common/headListbg.png" } }, { "type": "Label", "props": { "y": 271, "x": 29, "width": 300, "var": "nameTxt", "valign": "middle", "text": "label", "height": 50, "fontSize": 24, "color": "#92c6dd", "align": "center" } }, { "type": "Image", "props": { "y": 151, "x": 123, "width": 116, "var": "headIcon", "height": 116 } }, { "type": "Label", "props": { "y": 347, "x": 145, "width": 126, "var": "goldTxt", "valign": "middle", "text": "0", "height": 29, "fontSize": 24, "color": "#ffc602", "align": "left" } }, { "type": "Image", "props": { "y": 27, "x": 1028, "var": "closeBtn", "skin": "ui/common/closebig.png", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Panel", "props": { "y": 128, "x": 367, "width": 627, "var": "itemPanel", "height": 447 } }] }, { "type": "Image", "props": { "y": -140, "x": 22, "visible": false, "skin": "ui/common/img_touxiang_xuanzhongkuang.png" } }] };
            return HeadListDlgUI;
        }(Dialog));
        dlg.HeadListDlgUI = HeadListDlgUI;
    })(dlg = ui.dlg || (ui.dlg = {}));
})(ui || (ui = {}));
(function (ui) {
    var dlg;
    (function (dlg) {
        var MyCenterDlgUI = /** @class */ (function (_super) {
            __extends(MyCenterDlgUI, _super);
            function MyCenterDlgUI() {
                return _super.call(this) || this;
            }
            MyCenterDlgUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.dlg.MyCenterDlgUI.uiView);
            };
            MyCenterDlgUI.uiView = { "type": "Dialog", "props": { "width": 1079, "height": 665 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "var": "uiGroup", "skin": "ui/mycenter/img_gerenzhongx_di.png" }, "child": [{ "type": "Image", "props": { "y": 183, "x": 150, "width": 165, "skin": "ui/common/img_touxiang_touxiangkuang.png", "height": 165 } }, { "type": "Image", "props": { "y": 187, "x": 157, "width": 152, "var": "headIcon", "height": 152 } }, { "type": "Image", "props": { "y": 215, "x": 822, "var": "changeHeadBtn", "skin": "ui/mycenter/acc_htx.png", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 321, "x": 822, "var": "amendLoginBtn", "skin": "ui/mycenter/acc_xgmm.png", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 426, "x": 434, "skin": "ui/mycenter/img_zi_zhufu.png" } }, { "type": "Image", "props": { "y": 561, "x": 877, "var": "exitBtn", "skin": "ui/mycenter/qiehuanzhanghao.png", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 558, "x": 201, "var": "settingBtn", "skin": "ui/mycenter/setting_ui.png", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 561, "x": 539, "var": "accBtn", "skin": "ui/mycenter/zhanghuxinxi.png", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 198, "x": 349, "skin": "ui/mycenter/img_zi_zhanghao.png" } }, { "type": "Image", "props": { "y": 304, "x": 348, "skin": "ui/mycenter/img_zi_yuer.png" } }, { "type": "Image", "props": { "y": 38, "x": 1058, "var": "closeBtn", "skin": "ui/common/closebig.png", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Label", "props": { "y": 190, "x": 452, "width": 300, "var": "idTxt", "valign": "middle", "text": "xxx", "height": 50, "fontSize": 38, "color": "#ffe996", "align": "left" } }, { "type": "Label", "props": { "y": 302, "x": 452, "width": 201, "var": "goldTxt", "valign": "middle", "text": "0", "height": 38, "fontSize": 38, "color": "#ffe996", "align": "left" } }] }] };
            return MyCenterDlgUI;
        }(Dialog));
        dlg.MyCenterDlgUI = MyCenterDlgUI;
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
                NoticeShareUI.uiView = { "type": "View", "props": { "width": 1030, "height": 660 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 1030, "var": "image", "height": 660 } }, { "type": "Image", "props": { "y": 470, "x": 120, "var": "friend_up", "skin": "ui/panel_notice/share/fasonggeipengyou_guan.png" } }, { "type": "Image", "props": { "y": 470, "x": 120, "var": "friend_down", "skin": "ui/panel_notice/share/fasongggeipengyou_kai.png" } }, { "type": "Image", "props": { "y": 470, "x": 270, "var": "circle_up", "skin": "ui/panel_notice/share/fenxiangpengyouquan_guan.png" } }, { "type": "Image", "props": { "y": 470, "x": 270, "var": "circle_down", "skin": "ui/panel_notice/share/fenxiangpengyouquan_kai.png" } }] };
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
            NoticeDlgUI.uiView = { "type": "Dialog", "props": { "width": 1624, "height": 750 }, "child": [{ "type": "Image", "props": { "skin": "ui/panel_common/img_com_quanping_di.jpg", "centerY": 0, "centerX": 0 } }, { "type": "View", "props": { "y": 88, "x": 402, "width": 1030, "var": "contents", "height": 660, "centerY": 43 } }, { "type": "Image", "props": { "y": 85, "var": "contentList", "skin": "ui/panel_common/img_com_quanping_cedi.png" }, "child": [{ "type": "Sprite", "props": { "y": 23, "x": 0, "width": 306, "var": "content_tabs", "height": 642 }, "child": [{ "type": "Image", "props": { "x": 305, "var": "tab_dummy", "skin": "ui/panel_common/img_com_quanping_ce_di.png", "pivotX": 305, "name": "tab_dummy" }, "child": [{ "type": "Label", "props": { "wordWrap": true, "width": 304, "valign": "middle", "text": "公告讯息", "name": "label", "height": 95, "fontSize": 28, "font": "Microsoft YaHei", "color": "#b3d8e3", "align": "center" } }, { "type": "Image", "props": { "y": -7, "x": 0, "skin": "ui/panel_common/img_com_quanping_ce_xuanzhong.png", "name": "tab_on" }, "child": [{ "type": "Label", "props": { "y": 8, "x": 0, "wordWrap": true, "width": 304, "valign": "middle", "text": "公告讯息", "name": "label", "height": 95, "fontSize": 28, "font": "Microsoft YaHei", "color": "#ffffff", "align": "center" } }] }, { "type": "Image", "props": { "y": 9, "x": 278, "skin": "ui/panel_notice/markNew.png", "name": "newInd" } }] }] }, { "type": "Image", "props": { "y": 631, "x": 135, "var": "arrow", "skin": "ui/panel_notice/arrowBtns.png" } }] }, { "type": "Image", "props": { "width": 482, "var": "label", "skin": "ui/panel_common/img_com_quanping_ce_biaotou.png" }, "child": [{ "type": "Image", "props": { "y": 0, "x": 70, "skin": "ui/panel_agent/img_daili_biaotou.png" } }, { "type": "Image", "props": { "y": 27, "x": 171, "skin": "ui/panel_notice/img_hdzx_hdzx.png" } }] }, { "type": "Image", "props": { "y": 10, "var": "tabs", "skin": "ui/panel_notice/按钮_公告_1.png", "centerX": 78 }, "child": [{ "type": "Image", "props": { "var": "tab_notice", "skin": "ui/panel_notice/按钮_公告_2.png" } }, { "type": "Image", "props": { "y": 0, "x": 231, "var": "tab_game", "skin": "ui/panel_notice/按钮_公告_3.png" } }, { "type": "Image", "props": { "y": 21, "x": 218, "var": "notice_counter", "skin": "ui/panel_notice/markNew.png", "sizeGrid": "11,11,11,11" }, "child": [{ "type": "Text", "props": { "y": 2, "x": 6, "name": "label", "fontSize": 18, "color": "#ffffff", "align": "left" } }] }, { "type": "Image", "props": { "y": 21, "x": 467, "var": "game_counter", "skin": "ui/panel_notice/markNew.png", "sizeGrid": "11,11,11,11" }, "child": [{ "type": "Text", "props": { "y": 2, "x": 6, "name": "label", "fontSize": 18, "color": "#ffffff", "align": "left" } }] }] }, { "type": "Image", "props": { "y": 2, "x": 1624, "width": 292, "var": "controls", "skin": "ui/panel_common/img_com_quanping_guanbi01.png", "pivotX": 292 }, "child": [{ "type": "Image", "props": { "y": 12, "x": 123, "skin": "ui/panel_common/img_com_quanping_guanbi02.png" } }] }] };
            return NoticeDlgUI;
        }(Dialog));
        dlg.NoticeDlgUI = NoticeDlgUI;
    })(dlg = ui.dlg || (ui.dlg = {}));
})(ui || (ui = {}));
(function (ui) {
    var dlg;
    (function (dlg) {
        var PasswordSettingDlgUI = /** @class */ (function (_super) {
            __extends(PasswordSettingDlgUI, _super);
            function PasswordSettingDlgUI() {
                return _super.call(this) || this;
            }
            PasswordSettingDlgUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.dlg.PasswordSettingDlgUI.uiView);
            };
            PasswordSettingDlgUI.uiView = { "type": "Dialog", "props": { "width": 727, "height": 529 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "skin": "ui/setPassword/bg.png" }, "child": [{ "type": "Image", "props": { "y": 33, "x": 105, "skin": "ui/setPassword/sp_title.png" } }, { "type": "Image", "props": { "y": 45, "x": 682, "width": 61, "var": "closeBtn", "skin": "ui/common/closebig.png", "height": 64, "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 316, "x": 78, "skin": "ui/setPassword/lb_cfpwd.png" } }, { "type": "Image", "props": { "y": 239, "x": 78, "skin": "ui/setPassword/lb_inpwd.png" } }, { "type": "Image", "props": { "y": 161, "x": 98, "skin": "ui/setPassword/lb_opwd.png" } }, { "type": "Image", "props": { "y": 436, "x": 363, "var": "amendBtn", "skin": "ui/setPassword/xiugai.png", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 154, "x": 248, "skin": "ui/setPassword/txtbg.png" } }, { "type": "Image", "props": { "y": 232, "x": 248, "skin": "ui/setPassword/txtbg.png" } }, { "type": "Image", "props": { "y": 310, "x": 248, "skin": "ui/setPassword/txtbg.png" } }, { "type": "TextInput", "props": { "y": 154, "x": 264, "width": 394, "var": "oldTxt", "prompt": "请输入旧密码", "height": 50, "fontSize": 30, "color": "#aadbf7" } }, { "type": "TextInput", "props": { "y": 232, "x": 264, "width": 394, "var": "newTxt1", "prompt": "新密码(6-15未字符)", "height": 50, "fontSize": 30, "color": "#aadbf7" } }, { "type": "TextInput", "props": { "y": 310, "x": 264, "width": 394, "var": "newTxt2", "prompt": "请再次输入新密码", "height": 50, "fontSize": 30, "color": "#aadbf7" } }, { "type": "Image", "props": { "y": 257, "x": 633, "var": "lookBtn1", "skin": "ui/setPassword/eye_00.png", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 335, "x": 633, "var": "lookBtn2", "skin": "ui/setPassword/eye_01.png", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 178, "x": 633, "var": "lookOldBtn", "skin": "ui/setPassword/eye_00.png", "anchorY": 0.5, "anchorX": 0.5 } }] }] };
            return PasswordSettingDlgUI;
        }(Dialog));
        dlg.PasswordSettingDlgUI = PasswordSettingDlgUI;
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
                CommissionRecordsUI.uiView = { "type": "Dialog", "props": { "width": 1034, "height": 630 }, "child": [{ "type": "Image", "props": { "skin": "ui/dialogs/commission/img_com_tankuang01.png" } }, { "type": "Image", "props": { "y": 18, "skin": "ui/dialogs/commission/img_tyjl_tyjl.png", "centerX": 8 } }, { "type": "Image", "props": { "y": 99, "width": 970, "skin": "ui/dialogs/commission/img_com_xiankuang.png", "sizeGrid": "10,10,10,10", "height": 425, "centerX": 0 } }, { "type": "Image", "props": { "y": 109, "var": "order_dummy", "skin": "ui/dialogs/commission/img_tyjl_kuang.png", "centerX": 0 }, "child": [{ "type": "Image", "props": { "y": 11, "x": 611, "skin": "ui/panel_agent/img_daili_fuzhi.png", "name": "copy" } }, { "type": "Label", "props": { "y": 10, "x": -10, "width": 150, "valign": "middle", "text": "订单号：", "name": "orderlabel", "height": 35, "fontSize": 26, "font": "Microsoft YaHei", "color": "#f9cb46", "align": "right" } }, { "type": "Label", "props": { "y": 10, "x": 143, "width": 279, "valign": "middle", "text": "-", "name": "order", "height": 35, "fontSize": 24, "color": "#9cc5d8" } }, { "type": "Label", "props": { "y": 49, "x": -10, "width": 150, "valign": "middle", "text": "创建时间：", "name": "timelabel", "height": 35, "fontSize": 26, "font": "Microsoft YaHei", "color": "#f9cb46", "align": "right" } }, { "type": "Label", "props": { "y": 49, "x": 143, "width": 279, "valign": "middle", "text": "-", "name": "time", "height": 35, "fontSize": 24, "color": "#9cc5d8" } }, { "type": "Label", "props": { "y": 10, "x": 758, "width": 114, "text": "状态：", "name": "statuslabel", "height": 35, "fontSize": 26, "font": "Microsoft YaHei", "color": "#f9cb46", "align": "right" } }, { "type": "Label", "props": { "y": 10, "x": 861, "width": 85, "text": "-", "name": "status", "height": 35, "fontSize": 26, "font": "Microsoft YaHei", "color": "#f9cb46", "align": "left" } }, { "type": "Label", "props": { "y": 42, "x": 759, "width": 179, "valign": "middle", "text": "0 元", "name": "amount", "height": 44, "fontSize": 36, "font": "Microsoft YaHei", "color": "#a2e1ee", "align": "right" } }] }, { "type": "View", "props": { "y": 100, "x": 31, "width": 970, "var": "contents", "height": 420 }, "child": [{ "type": "Label", "props": { "y": 105, "x": 0, "width": 970, "var": "instructions", "valign": "middle", "text": "您目前无任何提佣记录", "height": 100, "fontSize": 24, "font": "Microsoft YaHei", "color": "#9cc5d8", "align": "center" } }] }, { "type": "Image", "props": { "y": 51, "x": 985, "var": "btnClose", "top": 12, "skin": "ui/dialogs/commission/b_com_guanbi.png", "right": 10, "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 575, "x": 914, "var": "btnContact", "skin": "ui/dialogs/commission/b_tyjl_lxkf.png", "right": 20, "bottom": 20, "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Label", "props": { "y": 527, "x": 38, "width": 713, "valign": "middle", "text": "提示：如对佣金结算有疑问，请联系客服", "height": 96, "fontSize": 24, "font": "Microsoft YaHei", "color": "#f9cb46" } }] };
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
            QuickSetPassWordDlgUI.uiView = { "type": "Dialog", "props": { "width": 727, "height": 378 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "skin": "ui/setPassword/qk_bg.png" }, "child": [{ "type": "Image", "props": { "y": 35, "x": 106, "skin": "ui/setPassword/qk_title.png" } }, { "type": "Image", "props": { "y": 44, "x": 686, "width": 61, "var": "closeBtn", "skin": "ui/common/closebig.png", "height": 64, "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 187, "x": 78, "skin": "ui/setPassword/lb_cfpwd.png" } }, { "type": "Image", "props": { "y": 118, "x": 78, "skin": "ui/setPassword/lb_inpwd.png" } }, { "type": "Image", "props": { "y": 110, "x": 248, "skin": "ui/setPassword/txtbg.png" } }, { "type": "Image", "props": { "y": 181, "x": 248, "skin": "ui/setPassword/txtbg.png" } }, { "type": "TextInput", "props": { "y": 111, "x": 264, "width": 394, "var": "newTxt1", "prompt": "新密码(6-15未字符)", "height": 50, "fontSize": 30, "color": "#aadbf7" } }, { "type": "TextInput", "props": { "y": 181, "x": 264, "width": 390, "var": "newTxt2", "prompt": "请再次输入新密码", "height": 50, "fontSize": 30, "color": "#aadbf7" } }, { "type": "Image", "props": { "y": 136, "x": 633, "var": "lookBtn1", "skin": "ui/setPassword/eye_00.png", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 206, "x": 633, "var": "lookBtn2", "skin": "ui/setPassword/eye_01.png", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 241, "x": 159, "skin": "ui/setPassword/qk_xgmm.png" } }, { "type": "Image", "props": { "y": 317, "x": 363, "var": "amendBtn", "skin": "ui/setPassword/xiugai.png", "anchorY": 0.5, "anchorX": 0.5 } }] }] };
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
        var TipViewUI = /** @class */ (function (_super) {
            __extends(TipViewUI, _super);
            function TipViewUI() {
                return _super.call(this) || this;
            }
            TipViewUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.dlg.TipViewUI.uiView);
            };
            TipViewUI.uiView = { "type": "View", "props": { "width": 1172, "height": 228 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "skin": "ui/common/tipsbg.png", "sizeGrid": "66,2,5,150", "height": 228 }, "child": [{ "type": "Label", "props": { "y": 80, "x": 0, "width": 1172, "var": "infoTxt", "valign": "middle", "text": "xxx", "height": 50, "fontSize": 30, "font": "Arial", "color": "#ffedb8", "align": "center" } }] }] };
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
        LobbyViewUI.uiView = { "type": "View", "props": { "width": 1334, "height": 750 }, "child": [{ "type": "Image", "props": { "var": "bgUI", "skin": "ui/lobby/bg_dating.jpg", "centerY": 0, "centerX": 0 } }, { "type": "Image", "props": { "y": 681, "skin": "ui/lobby/bottombar/img_dating_downbar.png", "right": -6, "sizeGrid": "19,30,30,160" } }, { "type": "Sprite", "props": { "y": 0, "x": 0, "var": "iconbox" } }, { "type": "Box", "props": { "width": 1624, "visible": false, "var": "maskPic", "mouseEnabled": false, "height": 750, "centerY": 0, "centerX": 0 }, "child": [{ "type": "Image", "props": { "y": 176, "x": 575, "skin": "ui/lobby/img_dating_huatu.png" } }] }, { "type": "Box", "props": { "y": 216, "x": 36, "width": 348, "var": "girlSp", "mouseEnabled": false, "hitTestPrior": false, "height": 540 } }, { "type": "Sprite", "props": { "y": 0, "x": 0, "var": "uibox", "mouseThrough": true } }, { "type": "Box", "props": { "width": 230, "var": "TLbox", "right": 0, "height": 109 }, "child": [{ "type": "Image", "props": { "y": 46, "x": 46, "var": "actBtn", "skin": "ui/lobby/icon_dt_hd.png", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 46, "x": 164, "var": "serviceBtn", "skin": "ui/lobby/icon_dt_kf.png", "anchorY": 0.5, "anchorX": 0.5 } }] }, { "type": "Box", "props": { "y": 324, "width": 129, "var": "moveBtn", "right": 15, "height": 140 }, "child": [{ "type": "Image", "props": { "y": 21, "x": 16, "skin": "ui/lobby/dating_right.png" }, "compId": 27 }] }, { "type": "Box", "props": { "y": 644, "x": 615, "width": 719, "var": "bottomGroup", "height": 106 }, "child": [{ "type": "Image", "props": { "y": 53, "x": 358, "var": "btn_tx", "skin": "ui/lobby/bottombar/icon_dt_tx.png", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 53, "x": 74, "var": "btn_dl", "skin": "ui/lobby/bottombar/icon_dt_dl.png", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Sprite", "props": { "y": -25, "x": 456, "width": 257, "var": "shopSp", "height": 132 } }, { "type": "Image", "props": { "y": 53, "x": 225, "var": "shareBtn", "skin": "ui/lobby/bottombar/icon_dt_fx.png", "anchorY": 0.5, "anchorX": 0.5 } }] }], "animations": [{ "nodes": [{ "target": 27, "keyframes": { "x": [{ "value": 0, "tweenMethod": "linearNone", "tween": true, "target": 27, "key": "x", "index": 0 }, { "value": -20, "tweenMethod": "linearNone", "tween": true, "target": 27, "key": "x", "index": 15 }, { "value": 0, "tweenMethod": "linearNone", "tween": true, "target": 27, "key": "x", "index": 30 }] } }], "name": "arrowAnim", "id": 1, "frameRate": 24, "action": 2 }] };
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
            View.regComponent("Text", laya.display.Text);
            _super.prototype.createChildren.call(this);
            this.createView(ui.PublicUIUI.uiView);
        };
        PublicUIUI.uiView = { "type": "View", "props": { "width": 1334, "mouseThrough": true, "height": 750 }, "child": [{ "type": "Image", "props": { "y": 0, "x": -165, "width": 681, "var": "headGroup", "skin": "ui/lobby/img_dating_upperbar.png", "mouseThrough": true, "height": 107, "sizeGrid": "48,534,23,20" }, "child": [{ "type": "Image", "props": { "y": 10, "x": 280, "skin": "ui/userInfo/img_dating_zhanghaozi.png", "mouseEnabled": false } }, { "type": "Label", "props": { "y": 58, "x": 286, "wordWrap": false, "width": 234, "var": "nameTxt", "text": "username", "mouseEnabled": false, "fontSize": 26, "color": "#ead111", "align": "left" } }, { "type": "Label", "props": { "y": 707, "x": 172, "width": 187, "var": "verTxt", "text": "ver-num", "height": 30, "fontSize": 25, "color": "#dafcff" } }, { "type": "Image", "props": { "y": 8, "x": 172, "width": 90, "var": "headIcon", "height": 90 } }, { "type": "Image", "props": { "y": 3, "x": 167, "width": 100, "skin": "ui/userInfo/avatorFrame.png", "height": 100, "sizeGrid": "0,0,0,0" } }] }, { "type": "Image", "props": { "y": 10, "var": "goldUI", "skin": "ui/userInfo/img_dating_qian_di.png", "centerX": 75 }, "child": [{ "type": "Image", "props": { "y": 38, "x": 300, "var": "addBtn", "skin": "ui/userInfo/dating_zengjia.png", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Sprite", "props": { "y": 39, "x": 11, "width": 20, "var": "goldAnim", "pivotY": 0, "pivotX": 0, "height": 20 } }, { "type": "Text", "props": { "y": 20, "x": 59, "width": 176, "var": "goldTxt", "text": "000", "fontSize": 30 } }] }, { "type": "Image", "props": { "y": 78, "var": "noticeGroup", "skin": "ui/lobby/img_dating_gonggaodi.png", "centerX": 116 }, "child": [{ "type": "Sprite", "props": { "y": 14, "x": 110, "width": 400, "var": "noticeSp", "height": 40 }, "child": [{ "type": "Label", "props": { "y": 0, "x": 0, "width": 155, "var": "msgTxt", "valign": "middle", "text": "111", "height": 40, "fontSize": 26, "color": "#efe8cd", "align": "left" } }] }] }] };
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
                    _super.prototype.createChildren.call(this);
                    this.createView(ui.UI.Page.LoginUI.uiView);
                };
                LoginUI.uiView = { "type": "View", "props": { "y": 0, "width": 1334, "visible": true, "height": 750, "centerY": 0, "centerX": 0 }, "child": [{ "type": "Image", "props": { "y": 0, "x": -145, "skin": "ui/res_login/BG_dl01.jpg", "name": "background", "height": 750, "centerY": 0, "centerX": 0 } }, { "type": "Image", "props": { "y": 94, "x": -101, "top": 94, "skin": "ui/res_login/img_dl_nv01.jpg.png", "name": "back_women", "left": 44 } }, { "type": "Image", "props": { "y": 711, "x": 130, "skin": "ui/res_login/img_dl_wenzi01.png", "bottom": 8 } }, { "type": "ProgressBar", "props": { "y": 690, "x": 22, "var": "pb_loading", "skin": "ui/res_login/img_dl_jingdutiao01.png", "name": "pb_loading", "centerX": 0, "bottom": 40 } }, { "type": "Image", "props": { "y": 199, "x": 486, "width": 800, "var": "sp_log", "top": 199, "name": "sp_log", "left": 486, "height": 280 }, "compId": 9 }, { "type": "Label", "props": { "y": 656, "x": 667, "var": "lb_text", "text": "正在更新资源30%", "fontSize": 32, "font": "SimHei", "color": "#ffffff", "centerX": 0, "bottom": 78, "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 631, "x": 162, "width": 237, "var": "btn_fast", "skin": "ui/res_login/btn_dl_kuaijie02.png", "height": 73, "centerX": -505.5, "bottom": 79, "anchorY": 0.45, "anchorX": 0.5 }, "compId": 17 }, { "type": "Image", "props": { "y": 631, "x": 499, "var": "btn_webchat", "skin": "ui/res_login/btn_dl_weixin01.png", "centerX": -168.5, "bottom": 79, "anchorY": 0.45, "anchorX": 0.5 }, "compId": 18 }, { "type": "Image", "props": { "y": 631, "x": 836, "var": "btn_account", "skin": "ui/res_login/btn_dl_zhanghao01.png", "centerX": 168.5, "bottom": 79, "anchorY": 0.45, "anchorX": 0.5 }, "compId": 19 }, { "type": "Image", "props": { "y": 631, "x": 1172, "width": 237, "var": "btn_phone", "skin": "ui/res_login/btn_dl_shouji01.png", "height": 73, "centerX": 505, "bottom": 79, "anchorY": 0.45, "anchorX": 0.5 }, "compId": 20 }, { "type": "Image", "props": { "y": 47, "x": 1285, "var": "btn_service", "top": 15, "skin": "ui/res_login/icon_dl_kefu01.png", "right": 22, "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "width": 725, "visible": false, "var": "panel", "top": 140, "skin": "ui/res_login/img_dl_chuangkou01.png", "right": 76, "height": 379 }, "child": [{ "type": "Image", "props": { "var": "sp_account", "top": 119, "skin": "ui/res_login/img_dl_tianxie01.png", "left": 95 } }, { "type": "Image", "props": { "var": "sp_title", "top": 18, "skin": "ui/res_login/img_dl_biaotou03.png", "centerX": 0 } }, { "type": "Image", "props": { "var": "sp_code", "top": 291, "skin": "ui/res_login/img_dl_tianxie03.png", "left": 95 } }, { "type": "TextInput", "props": { "x": 229, "width": 410, "var": "in_code", "type": "text", "top": 282, "skin": "ui/res_login/img_dl_shurukuang04.png", "sizeGrid": "20,20,20,20", "rotation": 0, "promptColor": "#93afc0", "prompt": "请输入验证码", "padding": "-6,0,-2,20", "overflow": "hidden", "multiline": false, "maxChars": 6, "left": 229, "layoutEnabled": true, "height": 50, "fontSize": 30, "font": "Microsoft YaHei", "editable": true, "color": "#93afc0", "bold": false, "align": "left" } }, { "type": "TextInput", "props": { "x": 229, "width": 410, "var": "in_account", "type": "text", "top": 111, "skin": "ui/res_login/img_dl_shurukuang04.png", "sizeGrid": "20,20,20,20", "rotation": 0, "restrict": "0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM", "promptColor": "#93afc0", "prompt": "4-11位字母和数字", "padding": "-6,0,-2,20", "overflow": "hidden", "multiline": false, "maxChars": 11, "left": 229, "layoutEnabled": true, "height": 50, "fontSize": 30, "font": "Microsoft YaHei", "editable": true, "color": "#93afc0", "bold": false, "align": "left" } }, { "type": "Image", "props": { "var": "sp_remark", "top": 296, "skin": "ui/res_login/img_dl_wenzi05.png", "centerX": 0 } }, { "type": "Image", "props": { "var": "sp_img_code", "top": 260, "skin": "ui/res_login/img_dl_yanzheng01.png", "left": 453 } }, { "type": "Image", "props": { "y": 324, "x": 658, "var": "btn_save_pic", "skin": "ui/res_login/btn_dl_baocun01.png", "right": 27, "bottom": 19, "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 464, "x": 568, "visible": false, "var": "btn_login", "skin": "ui/res_login/btn_dl_denglu01.png", "centerX": 205, "bottom": -124, "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 464, "x": 158, "visible": false, "var": "btn_register", "skin": "ui/res_login/btn_dl_zhuce01.png", "centerX": -205, "bottom": -124, "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "visible": false, "var": "sp_pwd", "top": 188, "skin": "ui/res_login/img_dl_tianxie02.png", "left": 95 } }, { "type": "TextInput", "props": { "x": -304, "width": 410, "visible": false, "var": "in_pwd", "type": "password", "top": 180, "skin": "ui/res_login/img_dl_shurukuang04.png", "sizeGrid": "20,20,20,20", "rotation": 0, "promptColor": "#93afc0", "prompt": "请输入密码", "padding": "-6,0,-2,20", "overflow": "hidden", "multiline": false, "maxChars": 11, "left": 229, "layoutEnabled": true, "height": 50, "fontSize": 30, "font": "Microsoft YaHei", "editable": true, "color": "#93afc0", "bold": false, "align": "left" } }, { "type": "Image", "props": { "y": 343, "x": 521, "visible": false, "var": "btn_forget", "skin": "ui/res_login/btn_dl_wangji01.png", "right": 116, "bottom": 11, "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 464, "x": 568, "var": "btn_ok", "skin": "ui/res_login/btn_dl_queren01.png", "centerX": 205, "bottom": -124, "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 464, "x": 158, "var": "btn_back", "skin": "ui/res_login/btn_dl_fanhui01.png", "centerX": -205, "bottom": -124, "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "var": "sp_phone", "top": 207, "skin": "ui/res_login/img_dl_tianxie04.png", "left": 95 } }, { "type": "TextInput", "props": { "width": 410, "var": "in_phone", "type": "text", "top": 199, "skin": "ui/res_login/img_dl_shurukuang04.png", "sizeGrid": "20,20,20,20", "rotation": 0, "promptColor": "#93afc0", "prompt": "-", "padding": "-6,0,0,20", "overflow": "hidden", "multiline": false, "maxChars": 11, "left": 229, "layoutEnabled": true, "height": 50, "fontSize": 30, "font": "Microsoft YaHei", "editable": true, "color": "#93afc0", "bold": false, "align": "left" } }, { "type": "Image", "props": { "y": 307, "x": 539, "var": "btn_phone_code", "top": 280, "skin": "ui/res_login/btn_dl_yanzhengma01.png", "right": 88, "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "TextInput", "props": { "x": -304, "width": 410, "visible": false, "var": "in_put_password", "type": "password", "top": 174, "skin": "ui/res_login/img_dl_shurukuang04.png", "sizeGrid": "20,20,20,20", "rotation": 0, "promptColor": "#93afc0", "prompt": "6-15位字符", "padding": "-6,0,-2,20", "overflow": "hidden", "multiline": false, "maxChars": 11, "left": 229, "layoutEnabled": true, "height": 50, "fontSize": 30, "font": "Microsoft YaHei", "editable": true, "color": "#93afc0", "bold": false, "align": "left" } }, { "type": "TextInput", "props": { "x": -304, "width": 410, "visible": false, "var": "in_check_password", "type": "password", "top": 231, "skin": "ui/res_login/img_dl_shurukuang04.png", "sizeGrid": "20,20,20,20", "rotation": 0, "promptColor": "#93afc0", "prompt": "请再次输入密码", "padding": "-6,0,-2,20", "overflow": "hidden", "multiline": false, "maxChars": 11, "left": 229, "layoutEnabled": true, "height": 50, "fontSize": 30, "font": "Microsoft YaHei", "editable": true, "color": "#93afc0", "bold": false, "align": "left" } }, { "type": "Image", "props": { "visible": false, "var": "sp_input_password", "top": 182, "skin": "ui/res_login/img_dl_tianxie05.png", "left": 77 } }, { "type": "Image", "props": { "visible": false, "var": "sp_check_password", "top": 240, "skin": "ui/res_login/img_dl_tianxie06.png", "left": 77 } }, { "type": "Image", "props": { "y": 205, "x": 603, "visible": false, "var": "btn_show_pwd", "top": 192, "skin": "ui/res_login/btn_dl_yanjing02.png", "left": 582, "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "visible": false, "var": "btn_show_pwd_1", "top": 242, "skin": "ui/res_login/btn_dl_yanjing02.png", "left": 585, "anchorY": 0.5, "anchorX": 0.5 } }] }, { "type": "Image", "props": { "visible": false, "var": "btn_other_login", "skin": "ui/res_login/btn_dl_genghuan01.png", "left": 29, "bottom": 37, "anchorY": 0.45, "anchorX": 0.5 } }], "animations": [{ "nodes": [{ "target": 9, "keyframes": { "width": [{ "value": 800, "tweenMethod": "linearNone", "tween": true, "target": 9, "key": "width", "index": 0 }, { "value": 289, "tweenMethod": "linearNone", "tween": true, "target": 9, "key": "width", "index": 10 }], "top": [{ "value": 199, "tweenMethod": "linearNone", "tween": true, "target": 9, "key": "top", "index": 0 }, { "value": 9, "tweenMethod": "linearNone", "tween": true, "target": 9, "key": "top", "index": 10 }], "left": [{ "value": 486, "tweenMethod": "linearNone", "tween": true, "target": 9, "key": "left", "index": 0 }, { "value": 44, "tweenMethod": "linearNone", "tween": true, "target": 9, "key": "left", "index": 10 }], "height": [{ "value": 280, "tweenMethod": "linearNone", "tween": true, "target": 9, "key": "height", "index": 0 }, { "value": 102, "tweenMethod": "linearNone", "tween": true, "target": 9, "key": "height", "index": 10 }] } }], "name": "mv_log", "id": 1, "frameRate": 30, "action": 0 }, { "nodes": [{ "target": 17, "keyframes": { "scaleY": [{ "value": 0, "tweenMethod": "linearNone", "tween": true, "target": 17, "key": "scaleY", "index": 0 }, { "value": 1.1, "tweenMethod": "linearNone", "tween": true, "target": 17, "key": "scaleY", "index": 5 }, { "value": 0.9, "tweenMethod": "linearNone", "tween": true, "target": 17, "key": "scaleY", "index": 8 }, { "value": 1, "tweenMethod": "linearNone", "tween": true, "target": 17, "key": "scaleY", "index": 10 }], "scaleX": [{ "value": 0, "tweenMethod": "linearNone", "tween": true, "target": 17, "key": "scaleX", "index": 0 }, { "value": 1.1, "tweenMethod": "linearNone", "tween": true, "target": 17, "key": "scaleX", "index": 5 }, { "value": 0.9, "tweenMethod": "linearNone", "tween": true, "target": 17, "key": "scaleX", "index": 8 }, { "value": 1, "tweenMethod": "linearNone", "tween": true, "target": 17, "key": "scaleX", "index": 10 }] } }, { "target": 18, "keyframes": { "scaleY": [{ "value": 0, "tweenMethod": "linearNone", "tween": true, "target": 18, "key": "scaleY", "index": 0 }, { "value": 1.1, "tweenMethod": "linearNone", "tween": true, "target": 18, "key": "scaleY", "index": 5 }, { "value": 0.9, "tweenMethod": "linearNone", "tween": true, "target": 18, "key": "scaleY", "index": 8 }, { "value": 1, "tweenMethod": "linearNone", "tween": true, "target": 18, "key": "scaleY", "index": 10 }], "scaleX": [{ "value": 0, "tweenMethod": "linearNone", "tween": true, "target": 18, "key": "scaleX", "index": 0 }, { "value": 1.1, "tweenMethod": "linearNone", "tween": true, "target": 18, "key": "scaleX", "index": 5 }, { "value": 0.9, "tweenMethod": "linearNone", "tween": true, "target": 18, "key": "scaleX", "index": 8 }, { "value": 1, "tweenMethod": "linearNone", "tween": true, "target": 18, "key": "scaleX", "index": 10 }] } }, { "target": 19, "keyframes": { "scaleY": [{ "value": 0, "tweenMethod": "linearNone", "tween": true, "target": 19, "key": "scaleY", "index": 0 }, { "value": 1.1, "tweenMethod": "linearNone", "tween": true, "target": 19, "key": "scaleY", "index": 5 }, { "value": 0.9, "tweenMethod": "linearNone", "tween": true, "target": 19, "key": "scaleY", "index": 8 }, { "value": 1, "tweenMethod": "linearNone", "tween": true, "target": 19, "key": "scaleY", "index": 10 }], "scaleX": [{ "value": 0, "tweenMethod": "linearNone", "tween": true, "target": 19, "key": "scaleX", "index": 0 }, { "value": 1.1, "tweenMethod": "linearNone", "tween": true, "target": 19, "key": "scaleX", "index": 5 }, { "value": 0.9, "tweenMethod": "linearNone", "tween": true, "target": 19, "key": "scaleX", "index": 8 }, { "value": 1, "tweenMethod": "linearNone", "tween": true, "target": 19, "key": "scaleX", "index": 10 }] } }, { "target": 20, "keyframes": { "scaleY": [{ "value": 0, "tweenMethod": "linearNone", "tween": true, "target": 20, "key": "scaleY", "index": 0 }, { "value": 1.1, "tweenMethod": "linearNone", "tween": true, "target": 20, "key": "scaleY", "index": 5 }, { "value": 0.9, "tweenMethod": "linearNone", "tween": true, "target": 20, "key": "scaleY", "index": 8 }, { "value": 1, "tweenMethod": "linearNone", "tween": true, "target": 20, "key": "scaleY", "index": 10 }], "scaleX": [{ "value": 0, "tweenMethod": "linearNone", "tween": true, "target": 20, "key": "scaleX", "index": 0 }, { "value": 1.1, "tweenMethod": "linearNone", "tween": true, "target": 20, "key": "scaleX", "index": 5 }, { "value": 0.9, "tweenMethod": "linearNone", "tween": true, "target": 20, "key": "scaleX", "index": 8 }, { "value": 1, "tweenMethod": "linearNone", "tween": true, "target": 20, "key": "scaleX", "index": 10 }] } }], "name": "show_btns", "id": 2, "frameRate": 30, "action": 0 }] };
                return LoginUI;
            }(View));
            Page.LoginUI = LoginUI;
        })(Page = UI.Page || (UI.Page = {}));
    })(UI = ui.UI || (ui.UI = {}));
})(ui || (ui = {}));
//# sourceMappingURL=layaUI.max.all.js.map