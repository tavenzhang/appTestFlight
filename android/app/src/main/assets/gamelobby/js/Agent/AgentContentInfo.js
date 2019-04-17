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
var AgentContentInfo = /** @class */ (function (_super) {
    __extends(AgentContentInfo, _super);
    function AgentContentInfo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AgentContentInfo.prototype.initContent = function () {
        _super.prototype.initContent.call(this);
        if (this.conf.sprites) {
            var len = this.conf.sprites.length;
            for (var i = 0; i < len; i++) {
                var spconf = this.conf.sprites[i];
                Tools.addSprite(this, spconf);
            }
        }
        if (this.conf.labels) {
            var len = this.conf.labels.length;
            for (var i = 0; i < len; i++) {
                var lbconf = this.conf.labels[i];
                Tools.addLabels(this, lbconf);
            }
        }
        this.arr_btns = new Array();
        if (this.conf.menus) {
            var blen = this.conf.menus.length;
            this.arr_btns = new Array();
            for (var a = 0; a < blen; a++) {
                var btnconf = this.conf.menus[a];
                var b = new MyButton();
                b.init(btnconf, this, this.onClickBtn);
                b.setQuery(btnconf.cmd);
                this.addChild(b);
                this.arr_btns.push(b);
            }
        }
        if (this.conf.animations) {
            var len = this.conf.animations.length;
            for (var i = 0; i < len; i++) {
                var spconf = this.conf.animations[i];
                Tools.addAnimation(this, spconf);
            }
        }
        if (this.conf.inputlink) {
            this.inputLink = Tools.addInput(this, this.conf.inputlink);
        }
        if (this.conf.qrcode) {
            this.qrcode = Tools.addSprite(this, this.conf.qrcode);
        }
        if (this.conf.datanumTeamToday) {
            this.lbNumTeamToday = new DataNum(this.conf.datanumTeamToday);
            this.addChild(this.lbNumTeamToday);
            this.lbNumTeamToday.pos(this.conf.datanumTeamToday.pos.x, this.conf.datanumTeamToday.pos.y);
            this.lbNumTeamToday.setNum("999999");
        }
        if (this.conf.datanumYesterday) {
            this.lbNumYesterday = new DataNum(this.conf.datanumYesterday);
            this.addChild(this.lbNumYesterday);
            this.lbNumYesterday.pos(this.conf.datanumYesterday.pos.x, this.conf.datanumYesterday.pos.y);
            this.lbNumYesterday.setNum("999999");
        }
    };
    AgentContentInfo.prototype.onClickBtn = function (e) {
        var btn = e;
        var cmd = btn.getQuery();
        switch (cmd) {
            case "customservice":
                break;
            case "copylink":
                break;
            case "share":
                break;
        }
    };
    return AgentContentInfo;
}(AgentContent));
//# sourceMappingURL=AgentContentInfo.js.map