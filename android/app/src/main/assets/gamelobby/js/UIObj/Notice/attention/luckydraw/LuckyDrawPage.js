var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var LuckyDrawPage = /** @class */ (function (_super) {
    __extends(LuckyDrawPage, _super);
    function LuckyDrawPage() {
        return _super.call(this) || this;
    }
    LuckyDrawPage.getObj = function () {
        return LuckyDrawPage.obj;
    };
    LuckyDrawPage.prototype.destroy = function (b) {
        LuckyDrawPage.obj = null;
        _super.prototype.destroy.call(this, b);
    };
    LuckyDrawPage.prototype.hide = function () {
        // this.lb_content.text = "";
        this.visible = false;
        LuckyDrawPage.obj = null;
        LayaMain.getInstance().getRootNode().removeChild(this);
        this.destroy(true);
        // lamain.restoreLoaderPath();
    };
    LuckyDrawPage.prototype.init = function (conf, data) {
        LuckyDrawPage.obj = this;
        this.conf = conf;
        this.data = data;
        var datas = this.config = ConfObjRead.getConfNoticeDialogLuckytDraw();
        this._silverS = new Spinner();
        this.addChild(this._silverS);
        this._silverS.init(ConfObjRead.getConfNoticeDialogSpinner().silver);
        this._silverS.id = 1;
        this._silverS.on("startSpin", this, this.onStartSpin);
        this._silverS.on("stopSpin", this, this.onStopSpin);
        this._goldS = new Spinner();
        this.addChild(this._goldS);
        this._goldS.init(ConfObjRead.getConfNoticeDialogSpinner().gold);
        this._goldS.id = 2;
        this._goldS.on("startSpin", this, this.onStartSpin);
        this._goldS.on("stopSpin", this, this.onStopSpin);
        this._goldS.visible = false;
        this._diamondS = new Spinner();
        this.addChild(this._diamondS);
        this._diamondS.init(ConfObjRead.getConfNoticeDialogSpinner().diamond);
        this._diamondS.id = 3;
        this._diamondS.on("startSpin", this, this.onStartSpin);
        this._diamondS.on("stopSpin", this, this.onStopSpin);
        this._diamondS.visible = false;
        this._silverS.x = this._goldS.x = this._diamondS.x = datas.spinner.pos.x;
        this._silverS.y = this._goldS.y = this._diamondS.y = datas.spinner.pos.y;
        this._btnSilver = new MyButton();
        this._btnSilver.init(datas.buttons.silver, this, this.onClick);
        this._btnSilver.pos(datas.buttons.silver.pos.x, datas.buttons.silver.pos.y);
        this.addChild(this._btnSilver);
        this._btnGold = new MyButton();
        this._btnGold.init(datas.buttons.gold, this, this.onClick);
        this._btnGold.pos(datas.buttons.gold.pos.x, datas.buttons.gold.pos.y);
        this.addChild(this._btnGold);
        this._btnDiamond = new MyButton();
        this._btnDiamond.init(datas.buttons.diamond, this, this.onClick);
        this._btnDiamond.pos(datas.buttons.diamond.pos.x, datas.buttons.diamond.pos.y);
        this.addChild(this._btnDiamond);
        this._info = Tools.newSprite(datas.info);
        this.addChild(this._info);
        this._lists = new WinningLists();
        this.addChild(this._lists);
        this._lists.noticeId = data.noticeid;
        this._lists.init(datas.list);
        this._lists.x = datas.list.pos.x;
        this._lists.y = datas.list.pos.y;
        this._topCurrentT = Tools.addLabels(this, datas.contents.top.current);
        this._topInputT = Tools.addLabels(this, datas.contents.top.input);
        this._bottomT = Tools.addLabels(this, datas.contents.bottom);
        this._infoT = Tools.addLabels(this, datas.contents.info);
        // this._topCurrentT.text = `${datas.contents.top.current.contents} ${this.data.userPoint} `;
        // this._topInputT.text = `${datas.contents.top.input.contents} ${this.data.userInput} `;
        this.setData(data);
        this.pos(this.conf.pos.x, this.conf.pos.y);
        var url = ConfObjRead.getConfUrl().url.apihome;
        url += ConfObjRead.getConfUrl().cmd.user_bet_info;
        url += "?access_token=" + Common.access_token;
        var header = [
            // "Content-Type",
            //  "application/json; charset=utf-8",
            "Accept", "*/*"
        ];
        NetManager.getObj().HttpConnect(url, this, this.returnBetInfo, header, null, "put", "json");
    };
    LuckyDrawPage.prototype.returnBetInfo = function (s, stat) {
        try {
            this._havPt = s.userPoint;
            this._topCurrentT.text = this.config.contents.top.current.contents + " " + s.userPoint + " ";
            this._topInputT.text = this.config.contents.top.input.contents + " " + s.userInput + " ";
        }
        catch (error) { }
    };
    LuckyDrawPage.prototype.onClick = function ($e) {
        this._silverS.visible = false;
        this._goldS.visible = false;
        this._diamondS.visible = false;
        var btn = $e;
        var tgt;
        switch (btn) {
            case this._btnSilver:
                tgt = this._silverS;
                break;
            case this._btnGold:
                tgt = this._goldS;
                break;
            case this._btnDiamond:
                tgt = this._diamondS;
                break;
        }
        tgt.visible = true;
        this._bottomT.text = "" + this.config.contents.bottom.contents.front + tgt.reqPt + " " + this.config.contents.bottom.contents.back;
    };
    LuckyDrawPage.prototype.onStartSpin = function ($spinner) {
        if (this._havPt - $spinner.reqPt >= 0) {
            this._havPt -= $spinner.reqPt;
            this._topCurrentT.text = this.config.contents.top.current.contents + " " + this._havPt + " ";
            $spinner.start();
            this.targetSpinner = $spinner;
            this._btnSilver.mouseEnabled = false;
            this._btnGold.mouseEnabled = false;
            this._btnDiamond.mouseEnabled = false;
            this._lists.disable();
            var url = ConfObjRead.getConfUrl().url.apihome;
            url += ConfObjRead.getConfUrl().cmd.attention_lottery;
            url += "?access_token=" + Common.access_token;
            // url += `&noticeId=${this.data.noticeid}`;
            // url += `&rouletteLevel=${$spinner.id}`;
            var header = [
                "Content-Type", "application/json",
                "Accept", "*/*"
                // "Accept", "application/json"
            ];
            var jobj = {
                noticeId: this.data.noticeid,
                rouletteLevel: $spinner.id
                // "username":Common.userInfo.username
            };
            var sjobj = JSON.stringify(jobj);
            NetManager.getObj().HttpConnect(url, this, this.returnPrizeInfo, header, sjobj, "put", "json");
        }
    };
    LuckyDrawPage.prototype.onStopSpin = function () {
        this._btnSilver.mouseEnabled = true;
        this._btnGold.mouseEnabled = true;
        this._btnDiamond.mouseEnabled = true;
        this._lists.enable();
        this._lists.getList(true);
    };
    LuckyDrawPage.prototype.setData = function (data) {
        var spinners = [this._silverS, this._goldS, this._diamondS];
        for (var i = 0; i < data.lotteryList.length; i++) {
            spinners[i].setData(data.lotteryList[i]);
        }
        this._bottomT.text = "" + this.config.contents.bottom.contents.front + this._silverS.reqPt + " " + this.config.contents.bottom.contents.back;
        var startDate = this.beforeLast(data.startTime, " ").split("-");
        var startTime = this.beforeLast(this.afterLast(data.startTime, " "), ":");
        var endData = this.beforeLast(data.endTime, " ").split("-");
        var endTime = this.beforeLast(this.afterLast(data.endTime, " "), ":");
        this._infoT.text = startDate[0].substr(2) + "\u5E74" + parseInt(startDate[1]) + "\u6708" + parseInt(startDate[2]) + "\u65E5";
        this._infoT.text += startTime;
        this._infoT.text += "-";
        this._infoT.text += endData[0].substr(2) + "\u5E74" + parseInt(endData[1]) + "\u6708" + parseInt(endData[2]) + "\u65E5";
        this._infoT.text += endTime;
        this._infoT.text += "\n\n" + this.diff_times(data.endTime, data.startTime);
        this._infoT.text += "\n\n" + this.config.info.contents;
    };
    LuckyDrawPage.prototype.beforeLast = function (p_string, p_char) {
        if (p_string === null) {
            return '';
        }
        var idx = p_string.lastIndexOf(p_char);
        if (idx === -1) {
            return '';
        }
        return p_string.substr(0, idx);
    };
    LuckyDrawPage.prototype.afterLast = function (p_string, p_char) {
        if (p_string === null) {
            return '';
        }
        var idx = p_string.lastIndexOf(p_char);
        if (idx === -1) {
            return;
        }
        idx += p_char.length;
        return p_string.substr(idx);
    };
    LuckyDrawPage.prototype.diff_times = function (date2, date1) {
        var today = new Date();
        // var msec = new Date(date2).getTime() - new Date(date1).getTime();
        var msec = new Date(date2).getTime() - today.getTime();
        var mins = Math.floor(msec / 60000);
        var hrs = Math.floor(mins / 60);
        var days = Math.floor(hrs / 24);
        var yrs = Math.floor(days / 365);
        mins = mins % 60;
        hrs = hrs % 24;
        var diffDays = days > 0 ? days + "天" : "";
        var diffHours = (diffDays === "" && hrs <= 0) ? "" : hrs + "小时";
        var diffmins = (diffDays === "" && diffHours === "" && mins <= 0) ? "" : mins + "分钟";
        return diffDays + diffHours + diffmins;
    };
    LuckyDrawPage.prototype.returnPrizeInfo = function (s, stat, hr) {
        this.targetSpinner.setResult(s);
        this.targetSpinner = undefined;
    };
    return LuckyDrawPage;
}(MySprite));
//# sourceMappingURL=LuckyDrawPage.js.map