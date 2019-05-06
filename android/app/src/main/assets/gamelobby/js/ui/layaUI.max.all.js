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
            AgentDlgUI.uiView = { "type": "Dialog", "props": { "width": 1624, "height": 750 }, "child": [{ "type": "Image", "props": { "skin": "panel_common/img_com_quanping_di.jpg", "centerY": 0, "centerX": 0 } }, { "type": "Image", "props": { "y": 85, "var": "contentList", "skin": "panel_common/img_com_quanping_cedi.png" }, "child": [{ "type": "Sprite", "props": { "y": -85, "width": 306, "var": "content_tabs", "height": 750 }, "child": [{ "type": "Image", "props": { "y": 127, "x": 305, "var": "tabHome", "skin": "panel_common/img_com_quanping_ce_di.png", "pivotX": 305, "name": "tab0" }, "child": [{ "type": "Image", "props": { "y": 25, "x": 80, "skin": "panel_agent/img_daili_zi05.png", "pivotY": 0.5, "pivotX": 0.5 } }, { "type": "Image", "props": { "y": -7, "x": 0, "skin": "panel_common/img_com_quanping_ce_xuanzhong.png", "name": "tab_on" }, "child": [{ "type": "Image", "props": { "y": 32, "x": 80, "skin": "panel_agent/img_daili_zi010.png", "pivotY": 0.5, "pivotX": 0.5 } }] }] }, { "type": "Image", "props": { "y": 237, "x": 305, "var": "tabAffiliates", "skin": "panel_common/img_com_quanping_ce_di.png", "pivotX": 305, "name": "tab1" }, "child": [{ "type": "Image", "props": { "y": 25, "x": 80, "skin": "panel_agent/img_daili_zi04.png", "pivotY": 0.5, "pivotX": 0.5 } }, { "type": "Image", "props": { "y": -7, "x": 0, "skin": "panel_common/img_com_quanping_ce_xuanzhong.png", "name": "tab_on" }, "child": [{ "type": "Image", "props": { "y": 32, "x": 78, "skin": "panel_agent/img_daili_zi09.png", "pivotY": 0.5, "pivotX": 0.5 } }] }] }, { "type": "Image", "props": { "y": 346, "x": 305, "var": "tabAchievement", "skin": "panel_common/img_com_quanping_ce_di.png", "pivotX": 305, "name": "tab2" }, "child": [{ "type": "Image", "props": { "y": 25, "x": 80, "skin": "panel_agent/img_daili_zi03.png", "pivotY": 0.5, "pivotX": 0.5 } }, { "type": "Image", "props": { "y": -7, "x": 0, "skin": "panel_common/img_com_quanping_ce_xuanzhong.png", "name": "tab_on" }, "child": [{ "type": "Image", "props": { "y": 32, "x": 80, "skin": "panel_agent/img_daili_zi08.png", "pivotY": 0.5, "pivotX": 0.5 } }] }] }, { "type": "Image", "props": { "y": 456, "x": 305, "var": "tabCodes", "skin": "panel_common/img_com_quanping_ce_di.png", "pivotX": 305, "name": "tab3" }, "child": [{ "type": "Image", "props": { "y": 25, "x": 80, "skin": "panel_agent/img_daili_zi02.png", "pivotY": 0.5, "pivotX": 0.5 } }, { "type": "Image", "props": { "y": -7, "x": 0, "skin": "panel_common/img_com_quanping_ce_xuanzhong.png", "name": "tab_on" }, "child": [{ "type": "Image", "props": { "y": 32, "x": 80, "skin": "panel_agent/img_daili_zi07.png", "pivotY": 0.5, "pivotX": 0.5 } }] }] }, { "type": "Image", "props": { "y": 456, "x": 305, "var": "tabDescription", "skin": "panel_common/img_com_quanping_ce_di.png", "pivotX": 305, "name": "tab4" }, "child": [{ "type": "Image", "props": { "y": 25, "x": 80, "skin": "panel_agent/img_daili_zi01.png", "pivotY": 0.5, "pivotX": 0.5 } }, { "type": "Image", "props": { "y": -7, "x": 0, "skin": "panel_common/img_com_quanping_ce_xuanzhong.png", "name": "tab_on" }, "child": [{ "type": "Image", "props": { "y": 32, "x": 80, "skin": "panel_agent/img_daili_zi06.png", "pivotY": 0.5, "pivotX": 0.5 } }] }] }] }] }, { "type": "Image", "props": { "width": 482, "var": "label", "skin": "panel_common/img_com_quanping_ce_biaotou.png" } }, { "type": "Image", "props": { "y": 2, "x": 1624, "width": 292, "var": "controls", "skin": "panel_common/img_com_quanping_guanbi01.png", "pivotX": 292 }, "child": [{ "type": "Image", "props": { "y": 12, "x": 123, "skin": "panel_common/img_com_quanping_guanbi02.png" } }] }, { "type": "View", "props": { "y": 110, "x": 420, "width": 1035, "var": "contents", "height": 625 } }] };
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
            MyCenterDlgUI.uiView = { "type": "Dialog", "props": { "width": 1079, "height": 665 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "var": "uiGroup", "skin": "ui/mycenter/img_gerenzhongx_di.png" }, "child": [{ "type": "Image", "props": { "y": 183, "x": 150, "width": 165, "skin": "ui/common/img_touxiang_touxiangkuang.png", "height": 165 } }, { "type": "Image", "props": { "y": 187, "x": 157, "width": 152, "var": "headIcon", "skin": "ui/userInfo/avatorFrame.png", "height": 152 } }, { "type": "Image", "props": { "y": 215, "x": 822, "var": "changeHeadBtn", "skin": "ui/mycenter/acc_htx.png", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 321, "x": 822, "var": "amendLoginBtn", "skin": "ui/mycenter/acc_xgmm.png", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 426, "x": 434, "skin": "ui/mycenter/img_zi_zhufu.png" } }, { "type": "Image", "props": { "y": 561, "x": 877, "var": "exitBtn", "skin": "ui/mycenter/qiehuanzhanghao.png", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 558, "x": 201, "var": "settingBtn", "skin": "ui/mycenter/setting_ui.png", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 561, "x": 539, "var": "accBtn", "skin": "ui/mycenter/zhanghuxinxi.png", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 198, "x": 349, "skin": "ui/mycenter/img_zi_zhanghao.png" } }, { "type": "Image", "props": { "y": 304, "x": 348, "skin": "ui/mycenter/img_zi_yuer.png" } }, { "type": "Image", "props": { "y": 38, "x": 1058, "var": "closeBtn", "skin": "ui/common/closebig.png", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Label", "props": { "y": 190, "x": 452, "width": 300, "var": "idTxt", "valign": "middle", "text": "xxx", "height": 50, "fontSize": 38, "color": "#ffe996", "align": "left" } }, { "type": "Label", "props": { "y": 302, "x": 452, "width": 201, "var": "goldTxt", "valign": "middle", "text": "0", "height": 38, "fontSize": 38, "color": "#ffe996", "align": "left" } }] }] };
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
            var notice_messageUI = /** @class */ (function (_super) {
                __extends(notice_messageUI, _super);
                function notice_messageUI() {
                    return _super.call(this) || this;
                }
                notice_messageUI.prototype.createChildren = function () {
                    _super.prototype.createChildren.call(this);
                    this.createView(ui.dlg.notice.notice_messageUI.uiView);
                };
                notice_messageUI.uiView = { "type": "View", "props": { "width": 1030, "height": 660 }, "child": [{ "type": "Image", "props": { "y": 35, "width": 925, "var": "message", "skin": "panel_notice/message/bg_hdgg_kuang.png", "sizeGrid": "20,20,20,20", "height": 588, "centerX": 0 }, "child": [{ "type": "Image", "props": { "y": 16, "x": 171, "skin": "panel_notice/message/img_hdgg_biaotikuang.png", "centerX": 0 } }, { "type": "Label", "props": { "y": 34, "x": 1, "width": 925, "text": "标题", "name": "title", "fontSize": 30, "font": "Microsoft YaHei", "color": "#ffba25", "centerX": -14, "align": "center" } }, { "type": "Label", "props": { "y": 88, "width": 847, "text": "内容", "padding": "20", "name": "content", "height": 431, "fontSize": 24, "font": "Microsoft YaHei", "color": "#b3d8e3", "centerX": 0, "align": "left" } }, { "type": "Label", "props": { "y": 530, "x": 30, "width": 868, "text": "日期", "name": "date", "height": 42, "fontSize": 24, "font": "Microsoft YaHei", "color": "#b3d8e3", "centerX": -14, "align": "right" } }] }, { "type": "Image", "props": { "width": 1030, "var": "image", "height": 660 } }] };
                return notice_messageUI;
            }(View));
            notice.notice_messageUI = notice_messageUI;
        })(notice = dlg.notice || (dlg.notice = {}));
    })(dlg = ui.dlg || (ui.dlg = {}));
})(ui || (ui = {}));
(function (ui) {
    var dlg;
    (function (dlg) {
        var notice;
        (function (notice) {
            var notice_shareUI = /** @class */ (function (_super) {
                __extends(notice_shareUI, _super);
                function notice_shareUI() {
                    return _super.call(this) || this;
                }
                notice_shareUI.prototype.createChildren = function () {
                    _super.prototype.createChildren.call(this);
                    this.createView(ui.dlg.notice.notice_shareUI.uiView);
                };
                notice_shareUI.uiView = { "type": "View", "props": { "width": 1030, "height": 660 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 1030, "var": "image", "height": 660 } }, { "type": "Image", "props": { "y": 470, "x": 120, "var": "friend_up", "skin": "panel_notice/share/fasonggeipengyou_guan.png" } }, { "type": "Image", "props": { "y": 470, "x": 120, "var": "friend_down", "skin": "panel_notice/share/fasongggeipengyou_kai.png" } }, { "type": "Image", "props": { "y": 470, "x": 270, "var": "circle_up", "skin": "panel_notice/share/fenxiangpengyouquan_guan.png" } }, { "type": "Image", "props": { "y": 470, "x": 270, "var": "circle_down", "skin": "panel_notice/share/fenxiangpengyouquan_kai.png" } }] };
                return notice_shareUI;
            }(View));
            notice.notice_shareUI = notice_shareUI;
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
                var notice_rouletteUI = /** @class */ (function (_super) {
                    __extends(notice_rouletteUI, _super);
                    function notice_rouletteUI() {
                        return _super.call(this) || this;
                    }
                    notice_rouletteUI.prototype.createChildren = function () {
                        View.regComponent("ui.dlg.notice.roulette.rouletteUI", ui.dlg.notice.roulette.rouletteUI);
                        View.regComponent("Text", laya.display.Text);
                        _super.prototype.createChildren.call(this);
                        this.createView(ui.dlg.notice.roulette.notice_rouletteUI.uiView);
                    };
                    notice_rouletteUI.uiView = { "type": "Dialog", "props": { "width": 1028, "height": 660 }, "child": [{ "type": "Image", "props": { "y": 28, "x": 556, "width": 457, "skin": "panel_notice/roullette/ui_获奖_1-1.png", "sizeGrid": "20,20,20,20", "height": 240 } }, { "type": "Image", "props": { "y": 26, "x": 556, "skin": "panel_notice/roullette/ui_活动_2.png" } }, { "type": "roulette", "props": { "y": 75, "x": 61, "var": "spinner", "scaleY": 1.5, "scaleX": 1.5, "runtime": "ui.dlg.notice.roulette.rouletteUI" } }, { "type": "Image", "props": { "y": 83, "x": 556, "skin": "panel_notice/roullette/ui_活动_3.png" } }, { "type": "Image", "props": { "y": 295, "x": 556, "width": 457, "skin": "panel_notice/roullette/ui_获奖_1-1.png", "sizeGrid": "20,20,20,20", "height": 350 } }, { "type": "Image", "props": { "y": 293, "x": 556, "skin": "panel_notice/roullette/ui_获奖_3.png" } }, { "type": "Image", "props": { "y": 293, "x": 556, "skin": "panel_notice/roullette/ui_获奖_4.png" } }, { "type": "Image", "props": { "y": 293, "x": 782, "skin": "panel_notice/roullette/ui_获奖_5.png" } }, { "type": "Sprite", "props": { "y": 581, "x": 19 }, "child": [{ "type": "Image", "props": { "skin": "panel_notice/roullette/按钮_轮盘_1.png" } }, { "type": "Image", "props": { "skin": "panel_notice/roullette/按钮_轮盘_按_1.png" } }] }, { "type": "Sprite", "props": { "y": 581, "x": 192 }, "child": [{ "type": "Image", "props": { "skin": "panel_notice/roullette/按钮_轮盘_2.png" } }, { "type": "Image", "props": { "skin": "panel_notice/roullette/按钮_轮盘_按_2.png" } }] }, { "type": "Sprite", "props": { "y": 581, "x": 365 }, "child": [{ "type": "Image", "props": { "skin": "panel_notice/roullette/按钮_轮盘_3.png" } }, { "type": "Image", "props": { "skin": "panel_notice/roullette/按钮_轮盘_按_3.png" } }] }, { "type": "Text", "props": { "y": 26, "x": 19, "width": 102, "text": "当前积分:", "height": 42, "fontSize": 24, "font": "Microsoft YaHei", "color": "#b3d8e3", "align": "left" } }] };
                    return notice_rouletteUI;
                }(Dialog));
                roulette.notice_rouletteUI = notice_rouletteUI;
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
                var rouletteUI = /** @class */ (function (_super) {
                    __extends(rouletteUI, _super);
                    function rouletteUI() {
                        return _super.call(this) || this;
                    }
                    rouletteUI.prototype.createChildren = function () {
                        _super.prototype.createChildren.call(this);
                        this.createView(ui.dlg.notice.roulette.rouletteUI.uiView);
                    };
                    rouletteUI.uiView = { "type": "View", "props": { "width": 290, "height": 320 }, "child": [{ "type": "Image", "props": { "y": 171, "x": 145, "skin": "panel_notice/roullette/spinner/lunpanquan.png", "pivotY": 106, "pivotX": 106, "centerY": 11, "centerX": 0 } }, { "type": "Image", "props": { "var": "spinner", "skin": "panel_notice/roullette/spinner/lunpan_yin_dipan.png", "centerY": 0, "centerX": 0 }, "child": [{ "type": "Image", "props": { "y": 101, "x": 126, "skin": "panel_notice/roullette/spinner/lunpan_yin_jiantou.png", "name": "arrow" } }, { "type": "Image", "props": { "y": 133, "x": 102, "skin": "panel_notice/roullette/spinner/lunpan_yin_anjian_hou.png", "name": "btn_down" } }, { "type": "Image", "props": { "y": 133, "x": 102, "skin": "panel_notice/roullette/spinner/lunpan_yin_anjian_qian.png", "name": "btn_up" } }] }] };
                    return rouletteUI;
                }(View));
                roulette.rouletteUI = rouletteUI;
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
            NoticeDlgUI.uiView = { "type": "Dialog", "props": { "width": 1624, "height": 750 }, "child": [{ "type": "Image", "props": { "skin": "panel_common/img_com_quanping_di.jpg", "centerY": 0, "centerX": 0 } }, { "type": "View", "props": { "y": 88, "x": 402, "width": 1030, "var": "contents", "height": 660, "centerY": 43 } }, { "type": "Image", "props": { "y": 85, "var": "contentList", "skin": "panel_common/img_com_quanping_cedi.png" }, "child": [{ "type": "Sprite", "props": { "y": 23, "x": 0, "width": 306, "var": "content_tabs", "height": 642 }, "child": [{ "type": "Image", "props": { "x": 305, "var": "tab_dummy", "skin": "panel_common/img_com_quanping_ce_di.png", "pivotX": 305, "name": "tab_dummy" }, "child": [{ "type": "Label", "props": { "wordWrap": true, "width": 304, "valign": "middle", "text": "公告讯息", "name": "label", "height": 95, "fontSize": 28, "font": "Microsoft YaHei", "color": "#b3d8e3", "align": "center" } }, { "type": "Image", "props": { "y": -7, "x": 0, "skin": "panel_common/img_com_quanping_ce_xuanzhong.png", "name": "tab_on" }, "child": [{ "type": "Label", "props": { "y": 8, "x": 0, "wordWrap": true, "width": 304, "valign": "middle", "text": "公告讯息", "name": "label", "height": 95, "fontSize": 28, "font": "Microsoft YaHei", "color": "#ffffff", "align": "center" } }] }, { "type": "Image", "props": { "y": 9, "x": 278, "skin": "panel_notice/markNew.png", "name": "newInd" } }] }] }, { "type": "Image", "props": { "y": 631, "x": 135, "var": "arrow", "skin": "panel_notice/arrowBtns.png" } }] }, { "type": "Image", "props": { "width": 482, "var": "label", "skin": "panel_common/img_com_quanping_ce_biaotou.png" }, "child": [{ "type": "Image", "props": { "y": 27, "x": 171, "skin": "panel_notice/img_hdzx_hdzx.png" } }] }, { "type": "Image", "props": { "y": 10, "var": "tabs", "skin": "panel_notice/按钮_公告_1.png", "centerX": 78 }, "child": [{ "type": "Image", "props": { "var": "tab_notice", "skin": "panel_notice/按钮_公告_2.png" } }, { "type": "Image", "props": { "y": 0, "x": 231, "var": "tab_game", "skin": "panel_notice/按钮_公告_3.png" } }, { "type": "Image", "props": { "y": 19, "x": 218, "var": "notice_counter", "skin": "panel_notice/bgLabel.png", "sizeGrid": "11,11,11,11" }, "child": [{ "type": "Text", "props": { "y": 2, "x": 6, "text": "0", "name": "label", "fontSize": 18, "color": "#ffffff", "align": "left" } }] }, { "type": "Image", "props": { "y": 19, "x": 467, "var": "game_counter", "skin": "panel_notice/bgLabel.png", "sizeGrid": "11,11,11,11" }, "child": [{ "type": "Text", "props": { "y": 2, "x": 6, "text": "0", "name": "label", "fontSize": 18, "color": "#ffffff", "align": "left" } }] }] }, { "type": "Image", "props": { "y": 2, "x": 1624, "width": 292, "var": "controls", "skin": "panel_common/img_com_quanping_guanbi01.png", "pivotX": 292 }, "child": [{ "type": "Image", "props": { "y": 12, "x": 123, "skin": "panel_common/img_com_quanping_guanbi02.png" } }] }] };
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
            PasswordSettingDlgUI.uiView = { "type": "Dialog", "props": { "width": 727, "height": 529 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "skin": "ui/setPassword/bg.png" }, "child": [{ "type": "Image", "props": { "y": 33, "x": 105, "skin": "ui/setPassword/sp_title.png" } }, { "type": "Image", "props": { "y": 45, "x": 682, "width": 61, "var": "closeBtn", "skin": "ui/common/closebig.png", "height": 64, "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 316, "x": 78, "skin": "ui/setPassword/lb_cfpwd.png" } }, { "type": "Image", "props": { "y": 239, "x": 78, "skin": "ui/setPassword/lb_inpwd.png" } }, { "type": "Image", "props": { "y": 161, "x": 98, "skin": "ui/setPassword/lb_opwd.png" } }, { "type": "Image", "props": { "y": 436, "x": 363, "var": "amendBtn", "skin": "ui/setPassword/xiugai.png", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "TextInput", "props": { "y": 154, "x": 248, "width": 410, "var": "oldTxt", "skin": "ui/setPassword/input_bg.png", "prompt": "请输入旧密码", "height": 50, "fontSize": 30, "color": "#aadbf7" } }, { "type": "TextInput", "props": { "y": 232, "x": 248, "width": 410, "var": "newTxt1", "skin": "ui/setPassword/input_bg.png", "prompt": "新密码(6-15未字符)", "height": 50, "fontSize": 30, "color": "#aadbf7" } }, { "type": "TextInput", "props": { "y": 310, "x": 248, "width": 410, "var": "newTxt2", "skin": "ui/setPassword/input_bg.png", "prompt": "请再次输入新密码", "height": 50, "fontSize": 30, "color": "#aadbf7" } }, { "type": "Image", "props": { "y": 257, "x": 633, "var": "lookBtn1", "skin": "ui/setPassword/eye_00.png", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 335, "x": 633, "var": "lookBtn2", "skin": "ui/setPassword/eye_01.png", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 178, "x": 633, "var": "lookOldBtn", "skin": "ui/setPassword/eye_00.png", "anchorY": 0.5, "anchorX": 0.5 } }] }] };
            return PasswordSettingDlgUI;
        }(Dialog));
        dlg.PasswordSettingDlgUI = PasswordSettingDlgUI;
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
        LoadingViewUI.uiView = { "type": "View", "props": { "width": 600, "height": 400 }, "child": [{ "type": "Image", "props": { "width": 100, "var": "logo", "skin": "ui/common/loadingLogo.png", "height": 100, "centerY": 0, "centerX": 0 } }, { "type": "Label", "props": { "width": 195, "var": "infoTxt", "valign": "middle", "height": 30, "fontSize": 20, "color": "#00ff00", "centerY": 70, "centerX": 0, "alpha": 0, "align": "center" } }] };
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
        LobbyViewUI.uiView = { "type": "View", "props": { "width": 1334, "height": 750 }, "child": [{ "type": "Image", "props": { "var": "bgUI", "skin": "ui/lobby/bg_dating.jpg", "centerY": 0, "centerX": 0 } }, { "type": "Image", "props": { "y": 681, "skin": "ui/lobby/bottombar/img_dating_downbar.png", "right": -6, "sizeGrid": "19,30,30,160" } }, { "type": "Box", "props": { "y": 216, "x": 36, "width": 348, "var": "girlSp", "mouseEnabled": false, "hitTestPrior": false, "height": 540 } }, { "type": "Sprite", "props": { "y": 0, "x": 0, "var": "uibox", "mouseThrough": true } }, { "type": "Sprite", "props": { "y": 0, "x": 0, "var": "iconbox" } }, { "type": "Box", "props": { "width": 230, "var": "TLbox", "right": 0, "height": 109 }, "child": [{ "type": "Image", "props": { "y": 46, "x": 46, "var": "actBtn", "skin": "ui/lobby/icon_dt_hd.png", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 46, "x": 164, "var": "serviceBtn", "skin": "ui/lobby/icon_dt_kf.png", "anchorY": 0.5, "anchorX": 0.5 } }] }, { "type": "Box", "props": { "y": 324, "width": 129, "var": "moveBtn", "right": 15, "height": 140 }, "child": [{ "type": "Image", "props": { "y": 21, "x": 16, "skin": "ui/lobby/dating_right.png" }, "compId": 27 }] }, { "type": "Box", "props": { "y": 644, "x": 615, "width": 719, "var": "bottomGroup", "height": 106 }, "child": [{ "type": "Image", "props": { "y": 53, "x": 358, "var": "btn_tx", "skin": "ui/lobby/bottombar/icon_dt_tx.png", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 53, "x": 74, "var": "btn_dl", "skin": "ui/lobby/bottombar/icon_dt_dl.png", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Sprite", "props": { "y": -25, "x": 456, "width": 257, "var": "shopSp", "height": 132 } }, { "type": "Image", "props": { "y": 53, "x": 225, "var": "shareBtn", "skin": "ui/lobby/bottombar/icon_dt_fx.png", "anchorY": 0.5, "anchorX": 0.5 } }] }], "animations": [{ "nodes": [{ "target": 27, "keyframes": { "x": [{ "value": 0, "tweenMethod": "linearNone", "tween": true, "target": 27, "key": "x", "index": 0 }, { "value": -20, "tweenMethod": "linearNone", "tween": true, "target": 27, "key": "x", "index": 15 }, { "value": 0, "tweenMethod": "linearNone", "tween": true, "target": 27, "key": "x", "index": 30 }] } }], "name": "arrowAnim", "id": 1, "frameRate": 24, "action": 2 }] };
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
        PublicUIUI.uiView = { "type": "View", "props": { "width": 1334, "mouseThrough": true, "height": 750 }, "child": [{ "type": "Image", "props": { "y": 0, "x": -165, "width": 681, "skin": "ui/lobby/img_dating_upperbar.png", "mouseThrough": true, "height": 107, "sizeGrid": "48,534,23,20" }, "child": [{ "type": "Image", "props": { "y": 10, "x": 280, "skin": "ui/userInfo/img_dating_zhanghaozi.png", "mouseEnabled": false } }, { "type": "Label", "props": { "y": 58, "x": 286, "wordWrap": false, "width": 234, "var": "nameTxt", "text": "username", "mouseEnabled": false, "fontSize": 26, "color": "#ead111", "align": "left" } }, { "type": "Label", "props": { "y": 707, "x": 172, "width": 187, "var": "verTxt", "text": "ver-num", "height": 30, "fontSize": 25, "color": "#dafcff" } }, { "type": "Image", "props": { "y": 3, "x": 167, "width": 100, "skin": "ui/userInfo/avatorFrame.png", "height": 100 } }, { "type": "Image", "props": { "y": 7, "x": 172, "width": 90, "var": "headIcon", "height": 90 } }] }, { "type": "Image", "props": { "y": 10, "x": 573, "var": "goldUI", "skin": "ui/userInfo/img_dating_qian_di.png" }, "child": [{ "type": "Image", "props": { "y": 38, "x": 300, "var": "addBtn", "skin": "ui/userInfo/dating_zengjia.png", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Sprite", "props": { "y": 39, "x": 11, "width": 20, "var": "goldAnim", "pivotY": 0, "pivotX": 0, "height": 20 } }, { "type": "Text", "props": { "y": 20, "x": 59, "width": 176, "var": "goldTxt", "text": "000", "fontSize": 30 } }] }, { "type": "Image", "props": { "y": 78, "x": 493, "skin": "ui/lobby/img_dating_gonggaodi.png" }, "child": [{ "type": "Sprite", "props": { "y": 14, "x": 110, "width": 400, "var": "noticeSp", "height": 40 } }] }] };
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
        RoomListViewUI.uiView = { "type": "View", "props": { "width": 1334, "height": 750 }, "child": [{ "type": "Image", "props": { "y": 0, "skin": "ui/lobby/bg_dating.jpg", "centerX": 0 } }, { "type": "Sprite", "props": { "y": 0, "x": 0, "var": "uibox" } }, { "type": "Sprite", "props": { "y": 0, "x": 0, "var": "iconSp" } }, { "type": "Image", "props": { "y": 0, "var": "backGroup", "skin": "ui/room/fanguibg.png", "right": 0 }, "child": [{ "type": "Box", "props": { "y": 37, "x": 187, "var": "backBtn", "anchorY": 0.5, "anchorX": 0.5 }, "child": [{ "type": "Image", "props": { "skin": "ui/room/backui.png" } }, { "type": "Image", "props": { "y": 12, "x": 59, "skin": "ui/room/backtxt.png" } }] }, { "type": "Image", "props": { "y": 8, "x": -154, "var": "namePic", "skin": "ui/room/lb_zjh.png" } }] }, { "type": "Box", "props": { "y": 647, "width": 327, "height": 88, "centerX": 0 }, "child": [{ "type": "Image", "props": { "y": 43, "x": 163, "var": "zjBtn", "skin": "ui/room/record_ui.png", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 43, "x": 41, "var": "ruleBtn", "skin": "ui/room/rule_ui.png", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 43, "x": 285, "var": "settingBtn", "skin": "ui/room/setting_ui.png", "anchorY": 0.5, "anchorX": 0.5 } }] }, { "type": "Box", "props": { "y": 219, "width": 1125, "var": "iconBox", "height": 377, "centerX": 0 }, "child": [{ "type": "Image", "props": { "y": 186, "x": 120, "var": "roomBtn1", "skin": "ui/room/room00.png", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 186, "x": 415, "var": "roomBtn2", "skin": "ui/room/room01.png", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 186, "x": 709, "var": "roomBtn3", "skin": "ui/room/room02.png", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 186, "x": 1004, "var": "roomBtn4", "skin": "ui/room/room03.png", "anchorY": 0.5, "anchorX": 0.5 } }] }] };
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
                LoginUI.uiView = { "type": "View", "props": { "y": 0, "width": 1334, "visible": true, "height": 750, "centerY": 0, "centerX": 0 }, "child": [{ "type": "Image", "props": { "y": 0, "x": -145, "skin": "ui/res_login/BG_dl01.jpg", "name": "background", "height": 750, "centerY": 0, "centerX": 0 } }, { "type": "Image", "props": { "y": 94, "x": -101, "top": 94, "skin": "ui/res_login/img_dl_nv01.jpg.png", "name": "back_women", "left": 44 } }, { "type": "Image", "props": { "y": 711, "x": 130, "skin": "ui/res_login/img_dl_wenzi01.png", "bottom": 8 } }, { "type": "ProgressBar", "props": { "y": 690, "x": 22, "var": "pb_loading", "skin": "ui/res_login/img_dl_jingdutiao01.png", "name": "pb_loading", "centerX": 0, "bottom": 40 } }, { "type": "Image", "props": { "y": 199, "x": 486, "width": 800, "var": "sp_log", "top": 199, "name": "sp_log", "left": 486, "height": 280 }, "compId": 9 }, { "type": "Label", "props": { "y": 656, "x": 667, "var": "lb_text", "text": "正在更新资源30%", "fontSize": 32, "font": "SimHei", "color": "#ffffff", "centerX": 0, "bottom": 78, "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 631, "x": 162, "width": 237, "var": "btn_fast", "skin": "ui/res_login/btn_dl_kuaijie02.png", "height": 73, "centerX": -505.5, "bottom": 79, "anchorY": 0.45, "anchorX": 0.5 }, "compId": 17 }, { "type": "Image", "props": { "y": 631, "x": 499, "var": "btn_webchat", "skin": "ui/res_login/btn_dl_weixin01.png", "centerX": -168.5, "bottom": 79, "anchorY": 0.45, "anchorX": 0.5 }, "compId": 18 }, { "type": "Image", "props": { "y": 631, "x": 836, "var": "btn_account", "skin": "ui/res_login/btn_dl_zhanghao01.png", "centerX": 168.5, "bottom": 79, "anchorY": 0.45, "anchorX": 0.5 }, "compId": 19 }, { "type": "Image", "props": { "y": 631, "x": 1172, "width": 237, "var": "btn_phone", "skin": "ui/res_login/btn_dl_shouji01.png", "height": 73, "centerX": 505, "bottom": 79, "anchorY": 0.45, "anchorX": 0.5 }, "compId": 20 }, { "type": "Image", "props": { "y": 47, "x": 1285, "var": "btn_service", "top": 15, "skin": "ui/res_login/icon_dl_kefu01.png", "right": 22, "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "width": 725, "visible": false, "var": "panel", "top": 140, "skin": "ui/res_login/img_dl_chuangkou01.png", "right": 76, "height": 379 }, "child": [{ "type": "Image", "props": { "var": "sp_account", "top": 119, "skin": "ui/res_login/img_dl_tianxie01.png", "left": 95 } }, { "type": "Image", "props": { "var": "sp_title", "top": 18, "skin": "ui/res_login/img_dl_biaotou03.png", "centerX": 0 } }, { "type": "Image", "props": { "var": "sp_code", "top": 291, "skin": "ui/res_login/img_dl_tianxie03.png", "left": 95 } }, { "type": "TextInput", "props": { "x": 229, "width": 410, "var": "in_code", "type": "text", "top": 282, "skin": "ui/res_login/img_dl_shurukuang04.png", "sizeGrid": "20,20,20,20", "rotation": 0, "restrict": "0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM", "promptColor": "#93afc0", "prompt": "请输入验证码", "padding": "-6,0,-2,20", "overflow": "hidden", "multiline": false, "maxChars": 6, "left": 229, "layoutEnabled": true, "height": 50, "fontSize": 30, "font": "Microsoft YaHei", "editable": true, "color": "#93afc0", "bold": false, "align": "left" } }, { "type": "TextInput", "props": { "x": 229, "width": 410, "var": "in_account", "type": "text", "top": 111, "skin": "ui/res_login/img_dl_shurukuang04.png", "sizeGrid": "20,20,20,20", "rotation": 0, "restrict": "0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM", "promptColor": "#93afc0", "prompt": "4-11位字母和数字", "padding": "-6,0,-2,20", "overflow": "hidden", "multiline": false, "maxChars": 11, "left": 229, "layoutEnabled": true, "height": 50, "fontSize": 30, "font": "Microsoft YaHei", "editable": true, "color": "#93afc0", "bold": false, "align": "left" } }, { "type": "Image", "props": { "var": "sp_remark", "top": 296, "skin": "ui/res_login/img_dl_wenzi05.png", "centerX": 0 } }, { "type": "Image", "props": { "var": "sp_img_code", "top": 260, "skin": "ui/res_login/img_dl_yanzheng01.png", "left": 453 } }, { "type": "Image", "props": { "y": 324, "x": 658, "var": "btn_save_pic", "skin": "ui/res_login/btn_dl_baocun01.png", "right": 27, "bottom": 19, "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 464, "x": 568, "visible": false, "var": "btn_login", "skin": "ui/res_login/btn_dl_denglu01.png", "centerX": 205, "bottom": -124, "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 464, "x": 158, "visible": false, "var": "btn_register", "skin": "ui/res_login/btn_dl_zhuce01.png", "centerX": -205, "bottom": -124, "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "visible": false, "var": "sp_pwd", "top": 188, "skin": "ui/res_login/img_dl_tianxie02.png", "left": 95 } }, { "type": "TextInput", "props": { "x": -304, "width": 410, "visible": false, "var": "in_pwd", "type": "password", "top": 180, "skin": "ui/res_login/img_dl_shurukuang04.png", "sizeGrid": "20,20,20,20", "rotation": 0, "restrict": "0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM", "promptColor": "#93afc0", "prompt": "请输入密码", "padding": "-6,0,-2,20", "overflow": "hidden", "multiline": false, "maxChars": 11, "left": 229, "layoutEnabled": true, "height": 50, "fontSize": 30, "font": "Microsoft YaHei", "editable": true, "color": "#93afc0", "bold": false, "align": "left" } }, { "type": "Image", "props": { "y": 343, "x": 521, "visible": false, "var": "btn_forget", "skin": "ui/res_login/btn_dl_wangji01.png", "right": 116, "bottom": 11, "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 464, "x": 568, "var": "btn_ok", "skin": "ui/res_login/btn_dl_queren01.png", "centerX": 205, "bottom": -124, "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 464, "x": 158, "var": "btn_back", "skin": "ui/res_login/btn_dl_fanhui01.png", "centerX": -205, "bottom": -124, "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "var": "sp_phone", "top": 207, "skin": "ui/res_login/img_dl_tianxie04.png", "left": 95 } }, { "type": "TextInput", "props": { "width": 410, "var": "in_phone", "type": "text", "top": 199, "skin": "ui/res_login/img_dl_shurukuang04.png", "sizeGrid": "20,20,20,20", "rotation": 0, "restrict": "0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM", "promptColor": "#93afc0", "prompt": "-", "padding": "-6,0,0,20", "overflow": "hidden", "multiline": false, "maxChars": 11, "left": 229, "layoutEnabled": true, "height": 50, "fontSize": 30, "font": "Microsoft YaHei", "editable": true, "color": "#93afc0", "bold": false, "align": "left" } }, { "type": "Image", "props": { "y": 307, "x": 539, "var": "btn_phone_code", "top": 280, "skin": "ui/res_login/btn_dl_yanzhengma01.png", "right": 88, "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "TextInput", "props": { "x": -304, "width": 410, "visible": false, "var": "in_put_password", "type": "password", "top": 174, "skin": "ui/res_login/img_dl_shurukuang04.png", "sizeGrid": "20,20,20,20", "rotation": 0, "restrict": "0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM", "promptColor": "#93afc0", "prompt": "5-16位字母和数字", "padding": "-6,0,-2,20", "overflow": "hidden", "multiline": false, "maxChars": 11, "left": 229, "layoutEnabled": true, "height": 50, "fontSize": 30, "font": "Microsoft YaHei", "editable": true, "color": "#93afc0", "bold": false, "align": "left" } }, { "type": "TextInput", "props": { "x": -304, "width": 410, "visible": false, "var": "in_check_password", "type": "password", "top": 231, "skin": "ui/res_login/img_dl_shurukuang04.png", "sizeGrid": "20,20,20,20", "rotation": 0, "restrict": "0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM", "promptColor": "#93afc0", "prompt": "请再次输入密码", "padding": "-6,0,-2,20", "overflow": "hidden", "multiline": false, "maxChars": 11, "left": 229, "layoutEnabled": true, "height": 50, "fontSize": 30, "font": "Microsoft YaHei", "editable": true, "color": "#93afc0", "bold": false, "align": "left" } }, { "type": "Image", "props": { "visible": false, "var": "sp_input_password", "top": 182, "skin": "ui/res_login/img_dl_tianxie05.png", "left": 77 } }, { "type": "Image", "props": { "visible": false, "var": "sp_check_password", "top": 240, "skin": "ui/res_login/img_dl_tianxie06.png", "left": 77 } }, { "type": "Image", "props": { "y": 205, "x": 603, "visible": false, "var": "btn_show_pwd", "top": 192, "skin": "ui/res_login/btn_dl_yanjing02.png", "left": 582, "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "visible": false, "var": "btn_show_pwd_1", "top": 242, "skin": "ui/res_login/btn_dl_yanjing02.png", "left": 585, "anchorY": 0.5, "anchorX": 0.5 } }] }, { "type": "Image", "props": { "visible": false, "var": "btn_other_login", "skin": "ui/res_login/btn_dl_genghuan01.png", "left": 29, "bottom": 37, "anchorY": 0.45, "anchorX": 0.5 } }], "animations": [{ "nodes": [{ "target": 9, "keyframes": { "width": [{ "value": 800, "tweenMethod": "linearNone", "tween": true, "target": 9, "key": "width", "index": 0 }, { "value": 289, "tweenMethod": "linearNone", "tween": true, "target": 9, "key": "width", "index": 10 }], "top": [{ "value": 199, "tweenMethod": "linearNone", "tween": true, "target": 9, "key": "top", "index": 0 }, { "value": 9, "tweenMethod": "linearNone", "tween": true, "target": 9, "key": "top", "index": 10 }], "left": [{ "value": 486, "tweenMethod": "linearNone", "tween": true, "target": 9, "key": "left", "index": 0 }, { "value": 44, "tweenMethod": "linearNone", "tween": true, "target": 9, "key": "left", "index": 10 }], "height": [{ "value": 280, "tweenMethod": "linearNone", "tween": true, "target": 9, "key": "height", "index": 0 }, { "value": 102, "tweenMethod": "linearNone", "tween": true, "target": 9, "key": "height", "index": 10 }] } }], "name": "mv_log", "id": 1, "frameRate": 30, "action": 0 }, { "nodes": [{ "target": 17, "keyframes": { "scaleY": [{ "value": 0, "tweenMethod": "linearNone", "tween": true, "target": 17, "key": "scaleY", "index": 0 }, { "value": 1.1, "tweenMethod": "linearNone", "tween": true, "target": 17, "key": "scaleY", "index": 5 }, { "value": 0.9, "tweenMethod": "linearNone", "tween": true, "target": 17, "key": "scaleY", "index": 8 }, { "value": 1, "tweenMethod": "linearNone", "tween": true, "target": 17, "key": "scaleY", "index": 10 }], "scaleX": [{ "value": 0, "tweenMethod": "linearNone", "tween": true, "target": 17, "key": "scaleX", "index": 0 }, { "value": 1.1, "tweenMethod": "linearNone", "tween": true, "target": 17, "key": "scaleX", "index": 5 }, { "value": 0.9, "tweenMethod": "linearNone", "tween": true, "target": 17, "key": "scaleX", "index": 8 }, { "value": 1, "tweenMethod": "linearNone", "tween": true, "target": 17, "key": "scaleX", "index": 10 }] } }, { "target": 18, "keyframes": { "scaleY": [{ "value": 0, "tweenMethod": "linearNone", "tween": true, "target": 18, "key": "scaleY", "index": 0 }, { "value": 1.1, "tweenMethod": "linearNone", "tween": true, "target": 18, "key": "scaleY", "index": 5 }, { "value": 0.9, "tweenMethod": "linearNone", "tween": true, "target": 18, "key": "scaleY", "index": 8 }, { "value": 1, "tweenMethod": "linearNone", "tween": true, "target": 18, "key": "scaleY", "index": 10 }], "scaleX": [{ "value": 0, "tweenMethod": "linearNone", "tween": true, "target": 18, "key": "scaleX", "index": 0 }, { "value": 1.1, "tweenMethod": "linearNone", "tween": true, "target": 18, "key": "scaleX", "index": 5 }, { "value": 0.9, "tweenMethod": "linearNone", "tween": true, "target": 18, "key": "scaleX", "index": 8 }, { "value": 1, "tweenMethod": "linearNone", "tween": true, "target": 18, "key": "scaleX", "index": 10 }] } }, { "target": 19, "keyframes": { "scaleY": [{ "value": 0, "tweenMethod": "linearNone", "tween": true, "target": 19, "key": "scaleY", "index": 0 }, { "value": 1.1, "tweenMethod": "linearNone", "tween": true, "target": 19, "key": "scaleY", "index": 5 }, { "value": 0.9, "tweenMethod": "linearNone", "tween": true, "target": 19, "key": "scaleY", "index": 8 }, { "value": 1, "tweenMethod": "linearNone", "tween": true, "target": 19, "key": "scaleY", "index": 10 }], "scaleX": [{ "value": 0, "tweenMethod": "linearNone", "tween": true, "target": 19, "key": "scaleX", "index": 0 }, { "value": 1.1, "tweenMethod": "linearNone", "tween": true, "target": 19, "key": "scaleX", "index": 5 }, { "value": 0.9, "tweenMethod": "linearNone", "tween": true, "target": 19, "key": "scaleX", "index": 8 }, { "value": 1, "tweenMethod": "linearNone", "tween": true, "target": 19, "key": "scaleX", "index": 10 }] } }, { "target": 20, "keyframes": { "scaleY": [{ "value": 0, "tweenMethod": "linearNone", "tween": true, "target": 20, "key": "scaleY", "index": 0 }, { "value": 1.1, "tweenMethod": "linearNone", "tween": true, "target": 20, "key": "scaleY", "index": 5 }, { "value": 0.9, "tweenMethod": "linearNone", "tween": true, "target": 20, "key": "scaleY", "index": 8 }, { "value": 1, "tweenMethod": "linearNone", "tween": true, "target": 20, "key": "scaleY", "index": 10 }], "scaleX": [{ "value": 0, "tweenMethod": "linearNone", "tween": true, "target": 20, "key": "scaleX", "index": 0 }, { "value": 1.1, "tweenMethod": "linearNone", "tween": true, "target": 20, "key": "scaleX", "index": 5 }, { "value": 0.9, "tweenMethod": "linearNone", "tween": true, "target": 20, "key": "scaleX", "index": 8 }, { "value": 1, "tweenMethod": "linearNone", "tween": true, "target": 20, "key": "scaleX", "index": 10 }] } }], "name": "show_btns", "id": 2, "frameRate": 30, "action": 0 }] };
                return LoginUI;
            }(View));
            Page.LoginUI = LoginUI;
        })(Page = UI.Page || (UI.Page = {}));
    })(UI = ui.UI || (ui.UI = {}));
})(ui || (ui = {}));
//# sourceMappingURL=layaUI.max.all.js.map