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
var AgentDialogAddUser = /** @class */ (function (_super) {
    __extends(AgentDialogAddUser, _super);
    function AgentDialogAddUser() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.select = 0;
        return _this;
    }
    AgentDialogAddUser.getContainer = function () {
        return AgentDialogAddUser.container;
    };
    AgentDialogAddUser.getObj = function () {
        return AgentDialogAddUser.obj;
    };
    AgentDialogAddUser.showDialog = function (node, conf) {
        if (!AgentDialogAddUser.obj) {
            var o = new AgentDialogAddUser();
            // o.size(conf.bg.size.w, conf.bg.size.h);
            o.init(node, conf);
            node.addChild(o);
        }
    };
    AgentDialogAddUser.prototype.destroy = function (b) {
        AgentDialogAddUser.obj = null;
        _super.prototype.destroy.call(this, b);
    };
    AgentDialogAddUser.prototype.init = function (node, conf) {
        var container = AgentDialogAddUser.container = new Laya.Sprite();
        _super.prototype.init.call(this, node, conf);
        this.size(this.conf.bg.size.w, this.conf.bg.size.h);
        this.initContent();
        this.initBtns();
        this.addChild(container);
        // container.size(200, 300)
        container.width = this.conf.bg.size.w;
        container.height = this.conf.bg.size.h;
        container.pivotX = this.conf.bg.size.w / 2;
        container.pivotY = this.conf.bg.size.h / 2;
        container.x = this.conf.alphabg.size.w / 2;
        container.y = this.conf.alphabg.size.h / 2;
        Laya.Tween.from(container, { scaleX: 0, scaleY: 0 }, 300, Laya.Ease.backOut);
    };
    AgentDialogAddUser.prototype.initClose = function () {
        if (!this.conf.close) {
            return;
        }
        var container = AgentDialogAddUser.container;
        var close = new MyButton();
        close.init(this.conf.close, this, this.onClose);
        close.pos(this.conf.close.pos.x, this.conf.close.pos.y);
        container.addChild(close);
    };
    AgentDialogAddUser.prototype.initBg = function () {
        var container = AgentDialogAddUser.container;
        if (!this.conf.bg) {
            return;
        }
        var bg = Tools.addSprite(container, this.conf.bg);
    };
    AgentDialogAddUser.prototype.initContent = function () {
        // var lb = Tools.addLabels(this, this.conf.lbTest);
        // if (this.conf.label) {
        var container = AgentDialogAddUser.container;
        Tools.addSprite(container, this.conf.label);
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
        if (this.conf.name) {
            var lb = Tools.addSprite(container, this.conf.name.label);
            var inputbg = Tools.addSprite(container, this.conf.name.inputbg);
            this.inputName = Tools.addInput(container, this.conf.name.input);
        }
        if (this.conf.pwd) {
            var lb = Tools.addSprite(container, this.conf.pwd.label);
            var inputbg = Tools.addSprite(container, this.conf.pwd.inputbg);
            this.inputPwd = Tools.addInput(container, this.conf.pwd.input);
        }
        if (this.conf.info) {
            Tools.addSprite(container, this.conf.info);
        }
    };
    AgentDialogAddUser.prototype.initBtns = function () {
        var container = AgentDialogAddUser.container;
        if (this.conf.btnok) {
            this.btnok = new MyButton();
            this.btnok.init(this.conf.btnok, this, this.onRegClick);
            this.btnok.pos(this.conf.btnok.pos.x, this.conf.btnok.pos.y);
            container.addChild(this.btnok);
        }
    };
    AgentDialogAddUser.prototype.onRegClick = function (e) {
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
            case this.btnok:
                break;
        }
        // RegPad.showPad(LoginScene.getObj(), ConfObjRead.getConfLogin().reg);
    };
    AgentDialogAddUser.prototype.checkSelection = function () {
        this.labelAgent.visible = this.btnAgentGlow.visible = this.select === 0;
        this.labelPlayer.visible = this.btnPlayerGlow.visible = this.select === 1;
    };
    return AgentDialogAddUser;
}(AgentDialogBase));
//# sourceMappingURL=AgentDialogAddUser.js.map