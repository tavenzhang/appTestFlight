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
            this.arr_labels = new Array();
            var len = this.conf.labels.length;
            for (var i = 0; i < len; i++) {
                var lbconf = this.conf.labels[i];
                var lb = Tools.addLabels(this, lbconf);
                this.arr_labels.push(lb);
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
        this.requestInfo();
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
    AgentContentInfo.prototype.getLabelByDataName = function (dn) {
        var len = this.arr_labels.length;
        // Debug.trace("AgentContentInfo.getLabelByDataName dn:"+dn+" len:"+len);
        for (var i = 0; i < len; i++) {
            var lb = this.arr_labels[i];
            if (lb.dataName == dn) {
                return lb;
            }
        }
        return null;
    };
    AgentContentInfo.prototype.setLabelData = function (dn, v) {
        var lb = this.getLabelByDataName(dn);
        if (lb) {
            // Debug.trace("AgentContentInfo.setLabelData dn:"+dn+" v:"+v);
            lb.text = v;
        }
    };
    AgentContentInfo.prototype.requestInfo = function () {
        LayaMain.getInstance().showCircleLoading();
        var header = [
            // "Content-Type","application/json",
            // "Accept","*/*"
            "Accept", "application/json"
        ];
        var url = ConfObjRead.getConfUrl().url.apihome +
            ConfObjRead.getConfUrl().cmd.agentinfo +
            "?access_token=" + Common.access_token;
        // Debug.trace("requestUserAvator url:"+url);
        NetManager.getObj().HttpConnect(url, this, this.responseInfo, header, null, "get", "json");
    };
    AgentContentInfo.prototype.responseInfo = function (s, stat, hr) {
        Debug.trace("AgentContentInfo.responseInfo stat:" + stat);
        Debug.trace(s);
        if (stat == "complete") {
            /*
            newSubMembers:0,
            newTeamMembers:0,
            nickname:null,
            parentName:"default_ga"
            subMembers:0,
            teamMembers:0,
            todayBrokerage:0
            todaySubBet:0,
            todayTeamBet:0,
            "username":"xxxx",
            yesterdayBrokerage:0
            */
            this.setLabelData("username", s.nickname);
            this.setLabelData("invationid", s.username);
            this.setLabelData("invationparentid", s.parentName);
            this.setLabelData("childrenincome", s.todaySubBet);
            this.setLabelData("brokerage", s.todayBrokerage);
            this.setLabelData("teampersonnum", s.teamMembers);
            this.setLabelData("subchildren", s.subMembers);
            this.setLabelData("todayaddinteam", s.newTeamMembers);
            this.setLabelData("todayaddmychildren", s.newSubMembers);
            this.lbNumTeamToday.setNum(s.todayTeamBet);
            this.lbNumYesterday.setNum(s.yesterdayBrokerage);
            LayaMain.getInstance().requestEnd(stat, "");
        }
        else {
            LayaMain.getInstance().requestEnd(stat, s);
        }
    };
    return AgentContentInfo;
}(AgentContent));
//# sourceMappingURL=AgentContentInfo.js.map