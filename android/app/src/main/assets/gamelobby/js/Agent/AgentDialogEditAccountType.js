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
var AgentDialogEditAccountType = /** @class */ (function (_super) {
    __extends(AgentDialogEditAccountType, _super);
    function AgentDialogEditAccountType() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.select = 0;
        return _this;
    }
    AgentDialogEditAccountType.getContainer = function () {
        return AgentDialogEditAccountType.container;
    };
    AgentDialogEditAccountType.getObj = function () {
        return AgentDialogEditAccountType.obj;
    };
    AgentDialogEditAccountType.showDialog = function (node, conf, data) {
        if (!AgentDialogEditAccountType.obj) {
            var o = new AgentDialogEditAccountType();
            // o.size(conf.bg.size.w, conf.bg.size.h);
            o.data = data;
            o.init(node, conf);
            node.addChild(o);
        }
    };
    AgentDialogEditAccountType.prototype.destroy = function (b) {
        AgentDialogEditAccountType.obj = null;
        _super.prototype.destroy.call(this, b);
    };
    AgentDialogEditAccountType.prototype.init = function (node, conf) {
        var container = AgentDialogEditAccountType.container = new MySprite();
        _super.prototype.init.call(this, node, conf);
        // this.size(this.conf.bg.size.w, this.conf.bg.size.h);
        this.initContent();
        this.initBtns();
        this.addChild(container);
        // container.size(200, 300)
        container.width = this.conf.bg.size.w;
        container.height = this.conf.bg.size.h;
        container.pivotX = this.conf.bg.size.w / 2;
        container.pivotY = this.conf.bg.size.h / 2;
        container.x = Laya.stage.width / 2;
        container.y = Laya.stage.height / 2;
        Laya.Tween.from(container, { scaleX: 0, scaleY: 0 }, 300, Laya.Ease.backOut);
        this.centerX = this.centerY = 0;
    };
    AgentDialogEditAccountType.prototype.initClose = function () {
        if (!this.conf.close) {
            return;
        }
        var container = AgentDialogEditAccountType.container;
        var close = new MyButton();
        close.init(this.conf.close, this, this.onClose);
        close.pos(this.conf.close.pos.x, this.conf.close.pos.y);
        container.addChild(close);
    };
    AgentDialogEditAccountType.prototype.initBg = function () {
        var container = AgentDialogEditAccountType.container;
        if (!this.conf.bg) {
            return;
        }
        var bg = Tools.addSprite(container, this.conf.bg);
    };
    AgentDialogEditAccountType.prototype.initContent = function () {
        // var lb = Tools.addLabels(this, this.conf.lbTest);
        // if (this.conf.label) {
        var container = AgentDialogEditAccountType.container;
        Tools.addSprite(container, this.conf.label);
        Tools.addSprite(container, this.conf.label_user);
        Tools.addSprite(container, this.conf.type.label_agent_txt);
        Tools.addSprite(container, this.conf.type.label_player_txt);
        // }
        if (this.conf.type) {
            var lb = Tools.addSprite(container, this.conf.type.label);
            this.btnAgent = Tools.newSprite(this.conf.type.btnAgent);
            container.addChild(this.btnAgent);
            this.btnAgent.on(Laya.Event.MOUSE_DOWN, this, this.onRegClick);
            this.btnAgentGlow = Tools.newSprite(this.conf.type.btn_agent_glow);
            this.btnAgentGlow.pos(this.conf.type.btn_agent_glow.pos.x, this.conf.type.btn_agent_glow.pos.y);
            container.addChild(this.btnAgentGlow);
            this.btnPlayerGlow = Tools.newSprite(this.conf.type.btn_player_glow);
            this.btnPlayerGlow.pos(this.conf.type.btn_player_glow.pos.x, this.conf.type.btn_player_glow.pos.y);
            container.addChild(this.btnPlayerGlow);
            this.btnPlayer = Tools.newSprite(this.conf.type.btnPlayer);
            container.addChild(this.btnPlayer);
            this.btnPlayer.on(Laya.Event.MOUSE_DOWN, this, this.onRegClick);
            this.labelAgent = Tools.newSprite(this.conf.type.label_agent);
            var w = this.labelAgent.width;
            var h = this.labelAgent.height;
            this.labelAgent.pos(this.conf.type.label_agent.pos.x + (w / 2), this.conf.type.label_agent.pos.y + (h / 2));
            this.labelAgent.pivot(w / 2, h / 2);
            container.addChild(this.labelAgent);
            this.labelPlayer = Tools.newSprite(this.conf.type.label_player);
            var w = this.labelPlayer.width;
            var h = this.labelPlayer.height;
            this.labelPlayer.pos(this.conf.type.label_player.pos.x + (w / 2), this.conf.type.label_player.pos.y + (h / 2));
            this.labelPlayer.pivot(w / 2, h / 2);
            container.addChild(this.labelPlayer);
            // console.log(this.btnAgent, this.btnAgent)
            this.checkSelection();
        }
        if (this.conf.info) {
            Tools.addSprite(container, this.conf.info);
        }
        this.lb_content = Tools.newLabel(
        // this.conf.content.user_id.font.text,
        this.data.username, this.conf.content.user_id.size.w, this.conf.content.user_id.size.h, this.conf.content.user_id.font.size, this.conf.content.user_id.font.color, this.conf.content.user_id.font.align, this.conf.content.user_id.font.valign, this.conf.content.user_id.font.name, this.conf.content.user_id.font.wrap, this.conf.content.user_id.font.underline);
        if (this.conf.content.user_id.font.borderColor) {
            this.lb_content.borderColor = this.conf.content.user_id.font.borderColor;
        }
        if (this.conf.content.user_id.font.alpha) {
            this.lb_content.alpha = this.conf.content.user_id.font.alpha;
        }
        this.lb_content.pos(this.conf.content.user_id.pos.x, this.conf.content.user_id.pos.y);
        container.addChild(this.lb_content);
    };
    AgentDialogEditAccountType.prototype.initBtns = function () {
        var container = AgentDialogEditAccountType.container;
        if (this.conf.btnok) {
            this.btnok = new MyButton();
            this.btnok.init(this.conf.btnok, this, this.onRegClick);
            this.btnok.pos(this.conf.btnok.pos.x, this.conf.btnok.pos.y);
            container.addChild(this.btnok);
        }
    };
    AgentDialogEditAccountType.prototype.onRegClick = function (e) {
        switch (e.currentTarget) {
            case this.btnAgent:
                if (this.select === 0) {
                    return;
                }
                this.select = 0;
                var sound = this.conf.type.btnAgent.sfx;
                if (sound) {
                    Laya.SoundManager.playSound(sound);
                }
                Laya.Tween.from(this.labelAgent, { scaleX: 0, scaleY: 0 }, 300, Laya.Ease.backOut);
                this.checkSelection();
                break;
            case this.btnPlayer:
                if (this.select === 1) {
                    return;
                }
                this.select = 1;
                var sound = this.conf.type.btnAgent.sfx;
                if (sound) {
                    Laya.SoundManager.playSound(sound);
                }
                Laya.Tween.from(this.labelPlayer, { scaleX: 0, scaleY: 0 }, 300, Laya.Ease.backOut);
                this.checkSelection();
                break;
        }
        if (e === this.btnok) {
            if (this.select === 0) {
                this.requestSwitch();
            }
            else {
                this.onClose(null);
            }
        }
    };
    AgentDialogEditAccountType.prototype.requestSwitch = function () {
        LayaMain.getInstance().showCircleLoading(true);
        var header = [
            "Content-Type", "application/json",
            // "Accept","*/*",
            "Accept", "application/json"
        ];
        var url = ConfObjRead.getConfUrl().url.apihome +
            ConfObjRead.getConfUrl().cmd.update_user +
            "?access_token=" + Common.access_token; //+
        // "&username="+Common.userInfo.username;
        var jobj = {
            memberType: "AGENT",
            username: this.data.username
            // "username":Common.userInfo.username
        };
        var sjobj = JSON.stringify(jobj);
        // console.log(url, jobj);
        NetManager.getObj().HttpConnect(url, this, this.response, header, sjobj, "put", "json");
    };
    AgentDialogEditAccountType.prototype.response = function (s, stat, hr) {
        LayaMain.getInstance().showCircleLoading(false);
        // if (stat == "complete") {
        //     AgentPad.getObj().switchTab(null, "mychildren")
        //     this.onClose(null);
        // }
        // else {
        if (stat == "error" && hr.http.status == 200) {
            return;
        }
        if (hr.http.status == 204) {
            // AgentPad.getObj().switchTab(null, "mychildren")
            view.dlg.AgentDlg.show("affiliates");
            AgentDialogSucess.showDialog(this.fatherNode, ConfObjRead.getConfAgentDialogDeleteInvitation(), "用户类型修改成功");
            this.onClose(null);
        }
        try {
            Toast.showToast(JSON.parse(hr.http.response).message);
        }
        catch (e) {
        }
        // }
    };
    AgentDialogEditAccountType.prototype.checkSelection = function () {
        this.labelAgent.visible = this.btnAgentGlow.visible = this.select === 0;
        this.labelPlayer.visible = this.btnPlayerGlow.visible = this.select === 1;
    };
    return AgentDialogEditAccountType;
}(AgentDialogBase));
//# sourceMappingURL=AgentDialogEditAccountType.js.map