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
var AgentContentMyIncome = /** @class */ (function (_super) {
    __extends(AgentContentMyIncome, _super);
    function AgentContentMyIncome() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.iDataStart = 0;
        return _this;
    }
    AgentContentMyIncome.prototype.initContent = function () {
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
        if (this.conf.switchmenus) {
            var blen = this.conf.switchmenus.length;
            this.arr_btns = new Array();
            for (var a = 0; a < blen; a++) {
                var btnconf = this.conf.switchmenus[a];
                var sb = new AgentSwitchBtn();
                sb.init(btnconf.switch, this, this.onSwitchClick);
                sb.setQuery(btnconf.switch.cmd);
                sb.initLabels(btnconf);
                this.addChild(sb);
                sb.setOn(0);
                this.arr_btns.push(sb);
            }
        }
        this.list = new AgentListIncome(this, ConfObjRead.getConfAgentListIncome());
        this.addChild(this.list);
        this.iDataStart = 0;
        this.changeTab(AgentContentMyIncome.TAB_ID_TODAY);
    };
    AgentContentMyIncome.prototype.changeTab = function (num) {
        if (num >= 0 && num < this.arr_btns.length) {
            var btn = this.arr_btns[num];
            btn.setOn(1);
            this.onSwitchClick(btn);
        }
    };
    AgentContentMyIncome.prototype.closeAllSwitch = function () {
        for (var i = 0; i < this.arr_btns.length; i++) {
            var sb = this.arr_btns[i];
            sb.setOn(0);
        }
    };
    AgentContentMyIncome.prototype.onSwitchClick = function (e) {
        var btn = e;
        var cmd = btn.getQuery();
        var bOn = btn.isOn();
        var bChange = false;
        // Debug.trace("AgentContentMyIncome.onSwitchClick bOn:"+bOn);
        if (bOn == 1) {
            this.closeAllSwitch();
            btn.setOn(1);
            bChange = true;
        }
        else {
            btn.setOn(1);
            bChange = false;
        }
        if (bChange) {
            switch (cmd) {
                case "today":
                    this.requestList(this.conf.pageSize, this.iDataStart, AgentContentMyIncome.RQ_TYPE_TODAY);
                    break;
                case "yesterday":
                    this.requestList(this.conf.pageSize, this.iDataStart, AgentContentMyIncome.RQ_TYPE_YESTERDAY);
                    break;
                case "thisweek":
                    this.requestList(this.conf.pageSize, this.iDataStart, AgentContentMyIncome.RQ_TYPE_WEEK);
                    break;
                case "lastweek":
                    this.requestList(this.conf.pageSize, this.iDataStart, AgentContentMyIncome.RQ_TYPE_LASTWEEK);
                    break;
                case "thismonth":
                    this.requestList(this.conf.pageSize, this.iDataStart, AgentContentMyIncome.RQ_TYPE_MONTH);
                    break;
            }
        }
    };
    AgentContentMyIncome.prototype.requestList = function (pageSize, start, dateType) {
        LayaMain.getInstance().showCircleLoading();
        var header = [
            // "Content-Type","application/json",
            // "Accept","*/*"
            "Accept", "application/json"
        ];
        var url = ConfObjRead.getConfUrl().url.apihome +
            ConfObjRead.getConfUrl().cmd.agentachievement +
            "?access_token=" + Common.access_token +
            "&username=" + Common.userInfo.username +
            "&start=" + start +
            "&pageSize=" + pageSize +
            "&dateType=" + dateType;
        //"?access_token="+Common.access_token
        Debug.trace("AgentContentMyIncome.requestList url:" + url);
        NetManager.getObj().HttpConnect(url, this, this.responseList, header, null, "get", "json");
    };
    AgentContentMyIncome.prototype.responseList = function (s, stat, hr) {
        Debug.trace("AgentContentMyIncome.responseList stat:" + stat);
        Debug.trace(s);
        LayaMain.getInstance().showCircleLoading(false);
        if (stat == "complete") {
            try {
                var jobj = s;
                this.list.setData(this.transData(jobj.datas));
            }
            catch (e) { }
        }
        else {
            var resp = hr.http.response;
            try {
                var jobj = JSON.parse(resp);
                var err = jobj.message;
                Toast.showToast(err);
            }
            catch (e) { }
        }
    };
    AgentContentMyIncome.prototype.transData = function (arr) {
        /*
        brokerage: 288.32
        directCount: 1
        subBet: 616
        teamBet: 0
        teamCount: 4
        userId: 368089
        username: "agth01"
        */
        var rs = [];
        var len = arr.length;
        for (var i = 0; i < len; i++) {
            var obj = arr[i];
            var o = {
                "username": obj.username,
                "childrenincome": obj.subBet,
                "teamincome": obj.teamBet,
                "childrennum": obj.directCount,
                "teamnum": obj.teamCount,
                "income": obj.brokerage
            };
            rs.push(o);
        }
        return rs;
    };
    AgentContentMyIncome.TAB_ID_TODAY = 0;
    AgentContentMyIncome.TAB_ID_YESTERDAY = 1;
    AgentContentMyIncome.TAB_ID_THISWEEK = 2;
    AgentContentMyIncome.TAB_ID_LASTWEEK = 3;
    AgentContentMyIncome.TAB_ID_THISMONTH = 4;
    AgentContentMyIncome.RQ_TYPE_TODAY = "TODAY";
    AgentContentMyIncome.RQ_TYPE_YESTERDAY = "YESTERDAY";
    AgentContentMyIncome.RQ_TYPE_WEEK = "WEEK";
    AgentContentMyIncome.RQ_TYPE_MONTH = "MONTH";
    AgentContentMyIncome.RQ_TYPE_LASTWEEK = "LAST_WEEK";
    return AgentContentMyIncome;
}(AgentContent));
//# sourceMappingURL=AgentContentMyIncome.js.map