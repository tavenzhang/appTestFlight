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
var AgentContentMyChildren = /** @class */ (function (_super) {
    __extends(AgentContentMyChildren, _super);
    function AgentContentMyChildren() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.iDataStart = 0;
        return _this;
    }
    AgentContentMyChildren.prototype.initContent = function () {
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
        if (this.conf.inputSearch) {
            this.inputSearch = Tools.addInput(this, this.conf.inputSearch);
        }
        // this.list = new AgentList(this,ConfObjRead.getConfAgentListChildren());
        this.list = new AgentListMyChildren(this, ConfObjRead.getConfAgentListChildren());
        this.addChild(this.list);
        // this.list.setData( ConfObjRead.getConfAgentChildrenTest() );
        this.iDataStart = 0;
        this.requestList(this.conf.pageSize, this.iDataStart, Common.userInfo.username);
    };
    AgentContentMyChildren.prototype.onClickBtn = function (e) {
        var btn = e;
        var cmd = btn.getQuery();
        switch (cmd) {
            case "search":
                var username = this.inputSearch.text;
                if (username.length <= 0) {
                    // Toast.showToast( Tools.getStringByKey( this.conf.txt_inputagentname ) );
                    // return;
                    this.requestList(this.conf.pageSize, this.iDataStart, Common.userInfo.username);
                }
                else {
                    this.requestList(this.conf.pageSize, this.iDataStart, username);
                }
                break;
            case "adduser":
                AgentDialogAddUser.showDialog(LayaMain.getInstance().getRootNode(), ConfObjRead.getConfAgentDialogAddUser());
                break;
        }
    };
    AgentContentMyChildren.prototype.requestList = function (pageSize, start, username) {
        LayaMain.getInstance().showCircleLoading();
        var header = [
            // "Content-Type","application/json",
            // "Accept","*/*"
            "Accept", "application/json"
        ];
        var url = ConfObjRead.getConfUrl().url.apihome +
            ConfObjRead.getConfUrl().cmd.agentchildren +
            "?access_token=" + Common.access_token +
            "&pageSize=" + pageSize +
            "&start=" + start +
            "&username=" + username;
        //"?access_token="+Common.access_token
        Debug.trace("AgentContentMyIncome.requestList url:" + url);
        NetManager.getObj().HttpConnect(url, this, this.responseList, header, null, "get", "json");
    };
    AgentContentMyChildren.prototype.responseList = function (s, stat, hr) {
        // Debug.trace("AgentContentMyIncome.responseList stat:"+stat);
        // Debug.trace(s);
        // Debug.trace(hr);
        LayaMain.getInstance().showCircleLoading(false);
        if (stat == "complete") {
            try {
                var jobj = s; //JSON.parse(s);
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
    AgentContentMyChildren.prototype.transData = function (arr) {
        // Debug.trace("AgentContentMyChildren.transData:");
        // Debug.trace(arr);
        var rs = [];
        var len = arr.length;
        for (var i = 0; i < len; i++) {
            var obj = arr[i];
            var o = {
                "username": obj.username,
                "usertype": obj.role,
                "income": obj.subBet,
                "teamincome": obj.teamBet,
                "childrennum": obj.subMembers,
                "teamnum": obj.teamMembers
            };
            rs.push(o);
        }
        // ConfObjRead.getConfAgentChildrenTest()
        // Debug.trace("AgentContentMyChildren.transData:");
        // Debug.trace(rs);
        return rs;
    };
    return AgentContentMyChildren;
}(AgentContent));
//# sourceMappingURL=AgentContentMyChildren.js.map