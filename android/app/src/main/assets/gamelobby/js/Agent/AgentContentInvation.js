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
var AgentContentInvation = /** @class */ (function (_super) {
    __extends(AgentContentInvation, _super);
    function AgentContentInvation() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AgentContentInvation.prototype.initContent = function () {
        _super.prototype.initContent.call(this);
        this.sp_content = new MySprite();
        this.addChild(this.sp_content);
        // container.graphics.drawTexture(container, 200, 300);
        this.btnGenInvi = new MyButton();
        this.btnGenInvi.init(this.conf.btnInvi, this, this.onClickBtn);
        this.btnGenInvi.pos(this.conf.btnInvi.pos.x, this.conf.btnInvi.pos.y);
        this.addChild(this.btnGenInvi);
        Tools.addSprite(this, this.conf.infobar);
        this.list = new AgentInvitationList(this, ConfObjRead.getConfAgentInvitationChildren());
        this.addChild(this.list);
        // this.list.setData(this.conf.invBlock, ConfObjRead.getConfAgentInviChildrenTest());
        this.requestInfo();
        this.initFilter();
        if (AgentData.role != "AGENT") {
            this.btnGenInvi.mouseEnabled = false;
            this.btnGenInvi.filters = [this.filter];
        }
        else {
            this.btnGenInvi.mouseEnabled = true;
            this.btnGenInvi.filters = [];
        }
    };
    AgentContentInvation.prototype.initFilter = function () {
        var colorMatrix = [
            0.3086, 0.6094, 0.0820, 0, 0,
            0.3086, 0.6094, 0.0820, 0, 0,
            0.3086, 0.6094, 0.0820, 0, 0,
            0, 0, 0, 1, 0,
        ];
        //创建灰色颜色滤镜
        this.filter = new Laya.ColorFilter(colorMatrix);
    };
    AgentContentInvation.prototype.requestInfo = function () {
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
    AgentContentInvation.prototype.responseInfo = function (s, stat, hr) {
        // Debug.trace("AgentContentInfo.responseInfo stat:"+stat);
        // Debug.trace(s);
        // Debug.trace(hr);
        LayaMain.getInstance().showCircleLoading(false);
        if (stat == "complete") {
            if (Common.userInfo.userRole != "AGENT") {
                try {
                    // this.notagenttips.visible = true;
                }
                catch (e) { }
            }
            // this.setLabelData("username",s.nickname);
            // this.setLabelData("invationid",s.username);
            // this.setLabelData("invationparentid",s.parentName);
            // this.setLabelData("childrenincome",s.todaySubBet);
            // this.setLabelData("brokerage",s.todayBrokerage);
            // this.setLabelData("teampersonnum",s.teamMembers);
            // this.setLabelData("subchildren",s.subMembers);
            // this.setLabelData("todayaddinteam",s.newTeamMembers);
            // this.setLabelData("todayaddmychildren",s.newSubMembers);
            // this.lbNumTeamToday.setNum(s.todayTeamBet);
            // this.lbNumYesterday.setNum(s.yesterdayBrokerage);
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
    AgentContentInvation.prototype.requestInvationCode = function () {
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
    AgentContentInvation.prototype.responseInvationCode = function (s, stat, hr) {
        LayaMain.getInstance().showCircleLoading(false);
        var url = "";
        if (stat == "complete") {
            this.invationInfo = s.datas;
            this.showQrcode(this.agentInfo, s.datas);
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
    AgentContentInvation.prototype.showQrcode = function (agentInfo, invationInfo) {
        var url = "";
        if (AppData.IS_NATIVE_APP) {
            url = agentInfo.appShareUrl;
        }
        else {
            url = agentInfo.wapShareUrl;
        }
        var inva = "";
        if (invationInfo.length > 0) {
            /*
            {
                "createdTime": "2017-06-03 14:28:26",
                "updatedTime": "2018-06-25 10:08:40",
                "id": 313,
                "userId": 368075,
                "brand": "106",
                "username": "agone01",
                "memberType": "AGENT",
                "prizeGroup": 1958,
                "affCode": "lucky01",
                "status": "ON",
                "operatorId": 31,
                "operatorName": "admin",
                "countUser": 1
            }
            */
            this.list.setData(this.conf.invBlock, invationInfo);
            if (invationInfo.length > 9 || AgentData.role != "AGENT") {
                this.btnGenInvi.mouseEnabled = false;
                this.btnGenInvi.filters = [this.filter];
            }
            else {
                this.btnGenInvi.mouseEnabled = true;
                this.btnGenInvi.filters = [];
            }
            // inva = invationInfo[0].affCode;
        }
        //  this._link.text = url += "?affCode=" + this._code.text;
        // var sp = this._qr = qr.QRCode.create(url, this.conf.qr.config.color, this.conf.qr.config.size.w, this.conf.qr.config.size.h, this.conf.qr.config.level);
        // sp.pos(this.conf.qr.config.pos.x, this.conf.qr.config.pos.y);
        // this.addChild(sp);
        // sp.scaleX = sp.scaleY = this.conf.qr.scales
        // this.addChild(this._qr);
        // this._qr.pivot(this.conf.qr.config.size.w / 2, this.conf.qr.config.size.h / 2);
        // this._qr.on(Laya.Event.MOUSE_DOWN, this, this.onClickBtn);
    };
    AgentContentInvation.prototype.onClickBtn = function (e) {
        AgentDialogInvitation.showDialog(this.fatherNode, ConfObjRead.getConfAgentDialogInvitation(), this);
    };
    return AgentContentInvation;
}(AgentContent));
//# sourceMappingURL=AgentContentInvation.js.map