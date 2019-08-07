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
            /**
             * 代理信息
             */
            var AgentInfoView = /** @class */ (function (_super) {
                __extends(AgentInfoView, _super);
                function AgentInfoView() {
                    var _this = _super.call(this) || this;
                    _this.centerX = _this.centerY = 0;
                    AgentModel.getAgentInfo(_this, _this.initView);
                    return _this;
                }
                AgentInfoView.prototype.initView = function () {
                    var _this = this;
                    AgentModel.searchAgentInvatCode(this, this.invationCallback);
                    this.setHeadIcon();
                    var data = AgentModel.agentInfo;
                    this.referrerTxt.text = data.username;
                    var superName = data.parentName;
                    if (data.level == 2 && superName.indexOf("default_ga") != -1) {
                        var start = superName.indexOf("(");
                        var end = superName.indexOf(")");
                        this.superiorTxt.text = superName.substring(start + 1, end);
                    }
                    else {
                        this.superiorTxt.text = superName;
                    }
                    //
                    this.todayTeamFont = new BitmapFont(ResConfig.bitFont_agent);
                    this.todayTeamFont.text = data.todayTeamBet.toFixed(2);
                    this.fontBox1.addChild(this.todayTeamFont);
                    this.todayTeamFont.y = this.fontBox1.height - this.todayTeamFont.height >> 1;
                    this.yesterdayFont = new BitmapFont(ResConfig.bitFont_agent);
                    this.yesterdayFont.text = data.yesterdayBrokerage.toFixed(2);
                    this.fontBox2.addChild(this.yesterdayFont);
                    this.yesterdayFont.y = this.fontBox2.height - this.yesterdayFont.height >> 1;
                    this.txt1.text = data.todaySubBet.toFixed(2);
                    this.txt2.text = data.todayBrokerage.toFixed(2);
                    this.txt3.text = data.teamMembers + "";
                    this.txt4.text = data.subMembers + "";
                    this.txt5.text = data.newTeamMembers + "";
                    this.txt6.text = data.newSubMembers + "";
                    EventManager.addTouchScaleListener(this.copyLinkBtn, this, function () {
                        SoundPlayer.clickSound();
                        PostMHelp.game_common({ "do": "copylink", "param": _this.linkTxt.text });
                    });
                    EventManager.addTouchScaleListener(this.wechatBtn, this, function () {
                        SoundPlayer.enterPanelSound();
                        PostMHelp.game_common({ "do": "share", "param": _this.linkTxt.text });
                    });
                    EventManager.addTouchScaleListener(this.copyAcc, this, function () {
                        SoundPlayer.clickSound();
                        PostMHelp.game_common({ "do": "copylink", "param": _this.referrerTxt.text, "hint": "复制成功" });
                    });
                    EventManager.addTouchScaleListener(this.copyCode, this, function () {
                        SoundPlayer.clickSound();
                        PostMHelp.game_common({ "do": "copylink", "param": _this.affcodeTxt.text, "hint": "复制成功" });
                    });
                };
                AgentInfoView.prototype.invationCallback = function () {
                    var _this = this;
                    var data = AgentModel.agentInfo;
                    var invatVo = AgentModel.invationVo;
                    if (invatVo.length == 0 && !AgentModel.isUser) {
                        AgentModel.creatAgentInvitCode(this, this.creatCodeCallback);
                    }
                    else {
                        var shareUrl = data.appShareUrl;
                        var inva = "";
                        if (invatVo.length > 0 && !AgentModel.isUser) {
                            inva = invatVo[0].affCode;
                        }
                        this.linkTxt.text = shareUrl;
                        if (inva != undefined && inva != null && inva != "") {
                            this.linkTxt.text += ("&affCode=" + inva);
                            this.affcodeTxt.text = inva;
                        }
                        else {
                            this.affcodeTxt.text = "非代理";
                        }
                        //显示二维码
                        var size = 182;
                        var sp = qr.QRCode.create(this.linkTxt.text, "#000000", size, size, 3);
                        sp.pos(this.qrbox.width - size >> 1, this.qrbox.height - size >> 1);
                        this.qrbox.addChild(sp);
                        EventManager.addTouchScaleListener(this.qrbox, this, function () {
                            SoundPlayer.enterPanelSound();
                            agent.AgentQrDlg.show(_this.linkTxt.text, data.appShareTips || "");
                        }, null, 1);
                    }
                };
                AgentInfoView.prototype.creatCodeCallback = function () {
                    AgentModel.searchAgentInvatCode(this, this.invationCallback);
                };
                AgentInfoView.prototype.setHeadIcon = function () {
                    var data = Common.avatorInfo;
                    if (!data) {
                        console.error("userInfo is null", this);
                        return;
                    }
                    var id = data.avatorId || "01";
                    this.headIcon.skin = ResConfig.getHeadSkinByID(id);
                };
                return AgentInfoView;
            }(ui.dlg.agent.AgentInfoViewUI));
            agent.AgentInfoView = AgentInfoView;
        })(agent = dlg.agent || (dlg.agent = {}));
    })(dlg = view.dlg || (view.dlg = {}));
})(view || (view = {}));
//# sourceMappingURL=AgentInfoView.js.map