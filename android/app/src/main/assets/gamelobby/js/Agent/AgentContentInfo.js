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
    appShareUrl: "",
    role: "",
    level: 0
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
                if (i === 0) {
                    var avatar = new Laya.Image(ResConfig.getHeadSkinByID(userData.avatarSkinId));
                    this.addChild(avatar);
                    avatar.x = this.conf.sprites[i].pos.x;
                    avatar.y = this.conf.sprites[i].pos.y;
                    avatar.size(146, 146);
                    var frame = new Laya.Image("ui/userInfo/avatorFrame.png");
                    this.addChild(frame);
                    frame.x = this.conf.sprites[i].pos.x - 10;
                    frame.y = this.conf.sprites[i].pos.y - 5;
                    frame.size(166, 166);
                }
                else {
                    var spconf = this.conf.sprites[i];
                    Tools.addSprite(this, spconf);
                }
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
        var db = this.db = new DragonBoneAnim();
        db.loadInit({ skUrl: "./assets/ui/animation/agent/banner.sk" });
        this.addChild(db);
        db.x = 882;
        db.y = 50;
        if (this.conf.inputlink) {
            this.inputLink = Tools.addInput(this, this.conf.inputlink);
            this.inputLink.mouseEnabled = false;
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
            // console.log("db", dn, v)
            if (dn === "brokerage" || dn === "childrenincome") {
                lb.text = v.toFixed(2);
            }
            else {
                lb.text = v;
            }
        }
    };
    AgentContentInfo.prototype.showQrcode = function (agentInfo, invationInfo) {
        var url = AgentData.appShareUrl = agentInfo.appShareUrl;
        var inva = "";
        if (invationInfo.length > 0) {
            inva = invationInfo[0].affCode;
        }
        if (AgentData.role === "AGENT") {
            this.inputLink.text = url + "&affCode=" + inva;
        }
        else {
            this.inputLink.text = url;
        }
        view.dlg.AgentDlg.updateSideTab();
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
            // this.setLabelData("username", s.nickname);
            this.setLabelData("username", "");
            this.setLabelData("invationid", s.username);
            if (s.level === 2 && s.parentName.indexOf("default_ga") != -1) {
                this.setLabelData("invationparentid", this.between(s.parentName, "(", ")"));
            }
            else {
                this.setLabelData("invationparentid", s.parentName);
            }
            this.setLabelData("childrenincome", s.todaySubBet);
            this.setLabelData("brokerage", s.todayBrokerage);
            this.setLabelData("teampersonnum", s.teamMembers);
            this.setLabelData("subchildren", s.subMembers);
            this.setLabelData("todayaddinteam", s.newTeamMembers);
            this.setLabelData("todayaddmychildren", s.newSubMembers);
            this.lbNumTeamToday.setNum(s.todayTeamBet.toFixed(2));
            this.lbNumYesterday.setNum(s.yesterdayBrokerage.toFixed(2));
            // this.showQrcode(s);
            this.agentInfo = s;
            AgentData.role = s.role;
            AgentData.level = s.level;
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
    AgentContentInfo.prototype.between = function (p_string, p_start, p_end) {
        var str = '';
        if (p_string === null) {
            return str;
        }
        var startIdx = p_string.indexOf(p_start);
        if (startIdx !== -1) {
            startIdx += p_start.length; // RM: should we support multiple chars? (or ++startIdx);
            var endIdx = p_string.indexOf(p_end, startIdx);
            if (endIdx !== -1) {
                str = p_string.substr(startIdx, endIdx - startIdx);
            }
        }
        return str;
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
            if (s.datas.length == 0 && AgentData.role === "AGENT") {
                this.createDefaultCode();
            }
            else {
                this.showQrcode(this.agentInfo, this.invationInfo);
            }
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
    AgentContentInfo.prototype.createDefaultCode = function () {
        var max = Math.floor(Math.random() * 12) + 4; // returns a random integer from 1 to 10
        var code = Math.random().toString(36).substr(2, max);
        var url = ConfObjRead.getConfUrl().url.apihome +
            ConfObjRead.getConfUrl().cmd.agent_affiliates +
            "?access_token=" + Common.access_token;
        var header = ["Content-Type", "application/json; charset=utf-8", "Accept", "*/*"];
        var data = {
            affCode: code,
            memberType: "AGENT",
            prizeGroup: 1960,
            status: "ON"
        };
        var jd = JSON.stringify(data);
        NetManager.getObj().HttpConnect(url, this, this.responseChange, header, jd, "POST", "JSON");
    };
    AgentContentInfo.prototype.responseChange = function (s, stat, hr) {
        // this.event("createInviteSucess");
        // console.log(this.parent)
        // AgentPad.getObj().switchTab(null, "invation")
        if (hr.http.status == 204) {
            //     AgentDialogSucess.showDialog(this.fatherNode, ConfObjRead.getConfAgentDialogDeleteInvitation(), "成功生成邀请码");
            //     view.dlg.AgentDlg.show("codes");
            // this.onClose(null)
            this.requestInvationCode();
        }
        try {
            // this.createDefaultCode();
            // console.log("failed")
            Toast.showToast(JSON.parse(hr.http.response).message);
        }
        catch (e) {
        }
        // console.log("responseChange", s, stat, hr)
    };
    AgentContentInfo.prototype.destroy = function (destroyChild) {
        if (this.db) {
            this.db.destroy(true);
        }
        _super.prototype.destroy.call(this, destroyChild);
    };
    return AgentContentInfo;
}(AgentContent));
//# sourceMappingURL=AgentContentInfo.js.map