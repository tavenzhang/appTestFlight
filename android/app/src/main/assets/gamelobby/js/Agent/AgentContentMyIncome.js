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
        return _super !== null && _super.apply(this, arguments) || this;
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
            this.requestList(cmd);
            switch (cmd) {
                case "today":
                    break;
                case "yesterday":
                    break;
                case "thisweek":
                    break;
                case "lastweek":
                    break;
                case "thismonth":
                    break;
            }
        }
    };
    AgentContentMyIncome.prototype.requestList = function (cmd) {
        Debug.trace("AgentContentMuIncome.requestList cmd:" + cmd);
        this.responseList(null, null, null);
    };
    AgentContentMyIncome.prototype.responseList = function (s, stat, hr) {
        var db = ConfObjRead.getConfAgentIncomeTest();
        this.list.setData(db);
    };
    AgentContentMyIncome.TAB_ID_TODAY = 0;
    AgentContentMyIncome.TAB_ID_YESTERDAY = 1;
    AgentContentMyIncome.TAB_ID_THISWEEK = 2;
    AgentContentMyIncome.TAB_ID_LASTWEEK = 3;
    AgentContentMyIncome.TAB_ID_THISMONTH = 4;
    return AgentContentMyIncome;
}(AgentContent));
//# sourceMappingURL=AgentContentMyIncome.js.map