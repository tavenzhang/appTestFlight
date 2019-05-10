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
var Notice_Roullette = /** @class */ (function (_super) {
    __extends(Notice_Roullette, _super);
    function Notice_Roullette() {
        var _this = _super.call(this) || this;
        _this.spinners = [];
        return _this;
    }
    Notice_Roullette.prototype.init = function () {
        this.wlist = new WinningList2();
    };
    Notice_Roullette.prototype.setData = function ($data) {
        this.noticeid = $data.noticeid;
        var startDate = this.beforeLast($data.startTime, " ").split("-");
        var startTime = this.beforeLast(this.afterLast($data.startTime, " "), ":");
        var endData = this.beforeLast($data.endTime, " ").split("-");
        var endTime = this.beforeLast(this.afterLast($data.endTime, " "), ":");
        this.date.text = startDate[0].substr(2) + "\u5E74" + parseInt(startDate[1]) + "\u6708" + parseInt(startDate[2]) + "\u65E5";
        this.date.text += startTime;
        this.date.text += "-";
        this.date.text += endData[0].substr(2) + "\u5E74" + parseInt(endData[1]) + "\u6708" + parseInt(endData[2]) + "\u65E5";
        this.date.text += endTime;
        this.remainingTime.text = this.diff_times($data.endTime, $data.startTime);
        this.contents.text = "\u6D3B\u52A8\u671F\u95F4\u6D88\u8017\u79EF\u5206\u53EF\u62BD\u5956\uFF0C\u6BCF\u5929\u4E0D\u9650\u5236\u62BD\u5956\u6B21\u6570\uFF0C\u5F53\u65E5\u672A\u4F7F\u7528\u79EF\u5206\u4F1A\u5728\u6BCF\u65E524\u70B9\u6E05\u96F6\uFF1B\u5F53\u65E5\u6BCF\u6295\u6CE81\u5143\uFF0C\u6B21\u65E5\u5C06\u83B7\u5F971\u79EF\u5206\u3002\n\u6D77\u91CF\u5956\u52B1\uFF0C\u8F6C\u8D77\u6765~";
        var spinner = new Spinner2();
        spinner.setData(this.SpinnerSilver, $data.lotteryList[0]);
        spinner.id = 1;
        spinner.show();
        this.spinners.push(spinner);
        spinner.on("reqSpin", this, this.onReqSpin);
        this.ptRequired(spinner.reqPt);
        spinner = new Spinner2();
        spinner.setData(this.SpinnerGold, $data.lotteryList[1]);
        spinner.id = 2;
        spinner.hide();
        this.spinners.push(spinner);
        spinner.on("reqSpin", this, this.onReqSpin);
        spinner = new Spinner2();
        spinner.setData(this.SpinnerDiamond, $data.lotteryList[2]);
        spinner.id = 3;
        spinner.hide();
        this.spinners.push(spinner);
        spinner.on("reqSpin", this, this.onReqSpin);
        this.initButtons();
        this.wlist.init(this);
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
    Notice_Roullette.prototype.initButtons = function () {
        this.btnSilver.on(Laya.Event.MOUSE_DOWN, this, this.onMouse);
        this.btnGold.on(Laya.Event.MOUSE_DOWN, this, this.onMouse);
        this.btnDiamond.on(Laya.Event.MOUSE_DOWN, this, this.onMouse);
        this.btnSilver.on(Laya.Event.MOUSE_UP, this, this.onMouse);
        this.btnGold.on(Laya.Event.MOUSE_UP, this, this.onMouse);
        this.btnDiamond.on(Laya.Event.MOUSE_UP, this, this.onMouse);
        this.btnSilver.on(Laya.Event.MOUSE_OUT, this, this.onMouse);
        this.btnGold.on(Laya.Event.MOUSE_OUT, this, this.onMouse);
        this.btnDiamond.on(Laya.Event.MOUSE_OUT, this, this.onMouse);
    };
    Notice_Roullette.prototype.ptRequired = function ($n) {
        this.perPt.text = $n + " \u79EF\u5206\u4E00\u6B21";
    };
    Notice_Roullette.prototype.returnBetInfo = function (s, stat) {
        try {
            this._havePt = s.userPoint;
            this.currentPt.text = s.userPoint;
            this.todayPt.text = s.userInput;
        }
        catch (error) { }
    };
    Notice_Roullette.prototype.beforeLast = function (p_string, p_char) {
        if (p_string === null) {
            return '';
        }
        var idx = p_string.lastIndexOf(p_char);
        if (idx === -1) {
            return '';
        }
        return p_string.substr(0, idx);
    };
    Notice_Roullette.prototype.afterLast = function (p_string, p_char) {
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
    Notice_Roullette.prototype.diff_times = function (date2, date1) {
        var today = new Date();
        // var msec = new Date(date2).getTime() - new Date(date1).getTime();
        var msec = new Date(date2).getTime() - today.getTime();
        var mins = Math.floor(msec / 60000);
        var hrs = Math.floor(mins / 60);
        var days = Math.floor(hrs / 24);
        var yrs = Math.floor(days / 365);
        mins = mins % 60;
        hrs = hrs % 24;
        var diffDays = days > 0 ? days + "天 " : "";
        var diffHours = (diffDays === "" && hrs <= 0) ? "" : hrs + "小时 ";
        var diffmins = (diffDays === "" && diffHours === "" && mins <= 0) ? "" : mins + "分钟 ";
        return diffDays + diffHours + diffmins;
    };
    Notice_Roullette.prototype.onReqSpin = function (spinner) {
        if (this._havePt - spinner.reqPt >= 0) {
            this._havePt -= spinner.reqPt;
            this.currentPt.text = this._havePt.toString();
            this.targetSpinner = spinner;
            spinner.start();
            this.btnSilver.mouseEnabled = false;
            this.btnGold.mouseEnabled = false;
            this.btnDiamond.mouseEnabled = false;
            this.newtab.mouseEnabled = false;
            this.mytab.mouseEnabled = false;
            //  this._lists.disable();
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
                noticeId: this.noticeid,
                rouletteLevel: spinner.id
                // "username":Common.userInfo.username
            };
            var sjobj = JSON.stringify(jobj);
            NetManager.getObj().HttpConnect(url, this, this.returnPrizeInfo, header, sjobj, "put", "json");
        }
    };
    Notice_Roullette.prototype.returnPrizeInfo = function (s, stat, hr) {
        this.targetSpinner.setResult(s);
        this.targetSpinner.once("stopSpin", this, this.onStopSpin);
        this.targetSpinner = undefined;
    };
    Notice_Roullette.prototype.onStopSpin = function () {
        this.btnSilver.mouseEnabled = true;
        this.btnGold.mouseEnabled = true;
        this.btnDiamond.mouseEnabled = true;
        this.newtab.mouseEnabled = true;
        this.mytab.mouseEnabled = true;
        this.wlist.getList(true);
    };
    Notice_Roullette.prototype.onMouse = function ($e) {
        if ($e.type === Laya.Event.MOUSE_DOWN) {
            switch ($e.currentTarget) {
                case this.btnSilver:
                    this.btnSilver.getChildAt(0).visible = false;
                    break;
                case this.btnGold:
                    this.btnGold.getChildAt(0).visible = false;
                    break;
                case this.btnDiamond:
                    this.btnDiamond.getChildAt(0).visible = false;
                    break;
            }
            this.targetButton = $e.currentTarget;
        }
        else if ($e.type === Laya.Event.MOUSE_UP && this.targetButton === $e.currentTarget) {
            switch ($e.currentTarget) {
                case this.btnSilver:
                    this.btnSilver.getChildAt(0).visible = true;
                    this.showSpinner2(1);
                    break;
                case this.btnGold:
                    this.btnGold.getChildAt(0).visible = true;
                    this.showSpinner2(2);
                    break;
                case this.btnDiamond:
                    this.btnDiamond.getChildAt(0).visible = true;
                    this.showSpinner2(3);
                    break;
                default: {
                }
            }
        }
        else if ($e.type === Laya.Event.MOUSE_OUT) {
            this.btnSilver.getChildAt(0).visible = true;
            this.btnGold.getChildAt(0).visible = true;
            this.btnDiamond.getChildAt(0).visible = true;
            this.targetButton = null;
        }
    };
    Notice_Roullette.prototype.showSpinner2 = function ($id) {
        for (var _i = 0, _a = this.spinners; _i < _a.length; _i++) {
            var spinner = _a[_i];
            if (spinner.id === $id) {
                spinner.show();
                this.ptRequired(spinner.reqPt);
            }
            else {
                spinner.hide();
            }
        }
    };
    return Notice_Roullette;
}(ui.dlg.notice.roulette.NoticeRouletteUI));
//# sourceMappingURL=Notice_Roullette.js.map