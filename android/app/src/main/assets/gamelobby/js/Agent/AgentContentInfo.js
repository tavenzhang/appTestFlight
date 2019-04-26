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
var AgentData = {
    appShareUrl: ""
};
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
        if (this.conf.notagenttips) {
            this.notagenttips = new MySprite();
            this.addChild(this.notagenttips);
            var sp = Tools.addSprite(this.notagenttips, this.conf.notagenttips.sp);
            var b = new MyButton();
            b.init(this.conf.notagenttips.btn, this, this.onClickBtn);
            b.setQuery(this.conf.notagenttips.btn.cmd);
            this.notagenttips.addChild(b);
            this.notagenttips.visible = false;
        }
        this.requestInfo();
    };
    AgentContentInfo.prototype.onClickBtn = function (e) {
        var btn = e;
        var cmd = btn.getQuery();
        switch (cmd) {
            case "customservice":
                Tools.jump2module(ConfObjRead.getConfUrl().url.g_custom, "custom");
                break;
            case "copylink":
                PostMHelp.game_common({ "do": "copylink", "param": this.inputLink.text });
                break;
            case "share":
                PostMHelp.game_common({ "do": "share", "param": this.inputLink.text });
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
    AgentContentInfo.prototype.showQrcode = function (agentInfo, invationInfo) {
        var url = AgentData.appShareUrl = agentInfo.appShareUrl;
        var inva = "";
        if (invationInfo.length > 0) {
            inva = invationInfo[0].affCode;
        }
        this.inputLink.text = url + "?affCode=" + inva;
        var sp = qr.QRCode.create(this.inputLink.text, this.conf.qrcode.config.color, this.conf.qrcode.config.size.w, this.conf.qrcode.config.size.h, this.conf.qrcode.config.level);
        sp.pos(this.conf.qrcode.config.pos.x, this.conf.qrcode.config.pos.y);
        this.qrcode.addChild(sp);
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
        // Debug.trace("AgentContentInfo.responseInfo stat:"+stat);
        // Debug.trace(s);
        // Debug.trace(hr);
        LayaMain.getInstance().showCircleLoading(false);
        if (stat == "complete") {
            if (Common.userInfo.userRole != "AGENT") {
                try {
                    this.notagenttips.visible = true;
                }
                catch (e) { }
            }
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
            // this.showQrcode(s);
            this.agentInfo = s;
            // LayaMain.getInstance().requestEnd(stat,"");
            this.requestInvationCode();
        }
        else {
            // LayaMain.getInstance().requestEnd(stat,s);
            var repon = hr.http.response;
            try {
                var jobj = JSON.parse(repon);
                var err = jobj.message;
                Toast.showToast(err);
            }
            catch (e) { }
            // AgentPad.getObj().onClose(null);
            // Toast.showToast( s );//Tools.getStringByKey( this.conf.txt_notagent ) );
        }
    };
    AgentContentInfo.prototype.requestInvationCode = function () {
        LayaMain.getInstance().showCircleLoading();
        var header = [
            "Content-Type", "application/json",
            // "Accept","*/*"
            "Accept", "application/json"
        ];
        var url = ConfObjRead.getConfUrl().url.apihome +
            ConfObjRead.getConfUrl().cmd.agentinvation +
            "?access_token=" + Common.access_token; //+
        // "&username="+Common.userInfo.username;
        var jobj = {
        // "username":Common.userInfo.username
        };
        var sjobj = JSON.stringify(jobj);
        NetManager.getObj().HttpConnect(url, this, this.responseInvationCode, header, sjobj, "post", "json");
    };
    AgentContentInfo.prototype.responseInvationCode = function (s, stat, hr) {
        // Debug.trace("AgentContentInfo.responseInvationCode stat:" + stat);
        // Debug.trace(s);
        // Debug.trace(hr)
        LayaMain.getInstance().showCircleLoading(false);
        if (stat == "complete") {
            this.invationInfo = s.datas;
            this.showQrcode(this.agentInfo, this.invationInfo);
        }
        else {
            // LayaMain.getInstance().requestEnd(stat,s);
            var repon = hr.http.response;
            try {
                var jobj = JSON.parse(repon);
                var err = jobj.message;
                Toast.showToast(err);
            }
            catch (e) { }
            // AgentPad.getObj().onClose(null);
            // Toast.showToast( s );//Tools.getStringByKey( this.conf.txt_notagent ) );
        }
    };
    return AgentContentInfo;
}(AgentContent));
//# sourceMappingURL=AgentContentInfo.js.map