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
var dateStringTool = /** @class */ (function () {
    function dateStringTool() {
    }
    dateStringTool.prototype.beforeLast = function (p_string, p_char) {
        if (p_string === null) {
            return '';
        }
        var idx = p_string.lastIndexOf(p_char);
        if (idx === -1) {
            return '';
        }
        return p_string.substr(0, idx);
    };
    dateStringTool.prototype.afterLast = function (p_string, p_char) {
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
    dateStringTool.prototype.diff_times = function (date2, date1) {
        var today = new Date();
        var end = new Date(this.convertDateForIos(date2));
        // var msec = new Date(date2).getTime() - new Date(date1).getTime();
        //  $data.endTime.replace(' ', 'T')
        var msec = end.getTime() - today.getTime();
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
    dateStringTool.prototype.convertDateForIos = function (date) {
        var arr = date.split(/[- :]/);
        date = new Date(arr[0], arr[1] - 1, arr[2], arr[3], arr[4], arr[5]);
        return date;
    };
    return dateStringTool;
}());
var Notice_Roullette = /** @class */ (function (_super) {
    __extends(Notice_Roullette, _super);
    function Notice_Roullette() {
        var _this = _super.call(this) || this;
        //
        _this.strTool = new dateStringTool();
        //
        _this.wlist = new WinningList2();
        //
        //this.frameOnce(2,this,this.init);
        _this.init();
        return _this;
    }
    //初始化控件
    Notice_Roullette.prototype.init = function () {
        //转盘游戏开始按钮
        this.startBtn.on(Laya.Event.CLICK, this, this.onStartBtn);
        //初始化转盘类型选择按钮组
        var checkList = [];
        checkList.push(this.tgSilver);
        checkList.push(this.tgGold);
        checkList.push(this.tgDiamond);
        this.radioBox = new RadioBox(checkList, this, this.tgClickFunc);
        this.radioBox.selectIndex = 0;
        //
    };
    Notice_Roullette.prototype.destroy = function () {
        this.radioBox.destory();
        Laya.timer.clear(this, this.timeOut);
        _super.prototype.destroy.call(this, true);
    };
    //活动结束提示
    Notice_Roullette.prototype.activitiesEnded = function () {
        view.dlg.TipsDlg.show("轮盘抽奖活动已经结束");
    };
    Notice_Roullette.prototype.tgClickFunc = function () {
        SoundPlayer.enterPanelSound();
        this.roullette.ChangeType(this.radioBox.selectIndex + 1);
    };
    Notice_Roullette.prototype.openGameTouch = function () {
        this.startBtn.mouseEnabled = true;
        this.tgGroupBox.disabled = false;
    };
    Notice_Roullette.prototype.closeGameTouch = function () {
        this.startBtn.mouseEnabled = false;
        this.tgGroupBox.disabled = true;
    };
    Notice_Roullette.prototype.updatePlaerPoint = function (playerPoint) {
        this._havePt = playerPoint;
        var str = "";
        if (this._havePt != undefined)
            str = this._havePt.toString();
        if (this.currentPt.parent)
            this.currentPt.text = str;
        Debug.log("havePt=", this._havePt);
    };
    Notice_Roullette.prototype.onStartBtn = function () {
        SoundPlayer.clickSound();
        //判断活动是否已经结束
        var currentDate = new Date();
        if (currentDate.getTime() > this.endData.getTime()) {
            this.activitiesEnded();
            return;
        }
        //判断积分是否足够
        if (this._havePt - this.roullette.curPoint < 0) {
            view.dlg.TipsDlg.show("您目前不够积分进行抽奖活动");
            return;
        }
        //关闭所有转盘操作按钮
        this.closeGameTouch();
        //
        this.roullette.PlayGame();
        //
        this.updatePlaerPoint(this._havePt - this.roullette.curPoint);
        /**
         * 抽奖记录请求参数{
            noticeId	integer($int64) 公告ID
            rouletteLevel	integer($int32)  轮盘类型(1:白银,2:黄金,3:钻石)
        }
         */
        var jobj = {
            noticeId: this.noticeid,
            rouletteLevel: this.roullette.rouletteLevel
            // "username":Common.userInfo.username
        };
        this.isout = false;
        //请求开始游戏
        HttpRequester.putHttpData(ConfObjRead.getConfUrl().cmd.attention_lottery, jobj, this, this.returnPrizeInfo);
        Laya.timer.once(6000, this, this.timeOut);
    };
    Notice_Roullette.prototype.timeOut = function () {
        Toast.showToast("网络请求超时,请检查网络环境后再尝试");
        this.roullette.Standby();
        this.openGameTouch();
        this.isout = true;
    };
    Notice_Roullette.prototype.returnPrizeInfo = function (suc, jobj) {
        Laya.timer.clear(this, this.timeOut);
        Debug.log("轮盘数据:", suc, jobj);
        if (!suc) {
            this.roullette.Standby();
            this.openGameTouch();
            return;
        }
        //如果已经超时了，就不执行后续操作了
        if (this.isout)
            return;
        if (jobj.code) {
            this.roullette.Standby();
            this.updatePlaerPoint(this._havePt + this.roullette.curPoint);
            this.activitiesEnded();
            this.openGameTouch();
            return;
        }
        //
        this.updatePlaerPoint(jobj.leftoverPoint);
        this._result = jobj.prizeAmount;
        //
        this.roullette.StopGame(this._result);
        this.roullette.once("roulleteStoped", this, this.onStoped);
    };
    Notice_Roullette.prototype.onStoped = function () {
        //
        this.wlist.getList(true);
        //
        var message = "\u606D\u559C\u62BD\u4E2D" + this._result + "\u91D1\u5E01\u5956\u52B1\uFF0C\u8BF7\u524D\u5F80\u90AE\u4EF6\u67E5\u770B";
        view.dlg.TipsDlg.show(message, this, null, this.resetGame);
        this._result = undefined;
    };
    Notice_Roullette.prototype.resetGame = function () {
        //
        this.openGameTouch();
        //
        this.roullette.Standby();
    };
    //设置转盘数据
    Notice_Roullette.prototype.setRoulletteData = function (data) {
        //
        this.roullette.SetData(data.lotteryList);
        //当前转盘开始待机
        this.roullette.Standby();
    };
    //设置活动信息
    Notice_Roullette.prototype.setNoticeInfo = function (data) {
        this.noticeid = data.noticeid; //
        this.endData = this.strTool.convertDateForIos(data.endTime);
        var startDate = this.strTool.beforeLast(data.startTime, " ").split("-");
        var startTime = this.strTool.beforeLast(this.strTool.afterLast(data.startTime, " "), ":");
        var endData = this.strTool.beforeLast(data.endTime, " ").split("-");
        var endTime = this.strTool.beforeLast(this.strTool.afterLast(data.endTime, " "), ":");
        this.date.text = startDate[0].substr(2) + "\u5E74" + parseInt(startDate[1]) + "\u6708" + parseInt(startDate[2]) + "\u65E5";
        this.date.text += startTime;
        this.date.text += "-";
        this.date.text += endData[0].substr(2) + "\u5E74" + parseInt(endData[1]) + "\u6708" + parseInt(endData[2]) + "\u65E5";
        this.date.text += endTime;
        this.remainingTime.text = this.strTool.diff_times(data.endTime, data.startTime);
        this.contents.text = "\u6D3B\u52A8\u671F\u95F4\u6D88\u8017\u79EF\u5206\u53EF\u62BD\u5956\uFF0C\u6BCF\u5929\u4E0D\u9650\u5236\u62BD\u5956\u6B21\u6570\uFF0C\u5F53\u65E5\u672A\u4F7F\u7528\u79EF\u5206\u4F1A\u5728\u6BCF\u65E524\u70B9\u6E05\u96F6\uFF1B\u5F53\u65E5\u6BCF\u6709\u6548\u6295\u6CE81\u5143\uFF0C\u6B21\u65E5\u5C06\u83B7\u5F971\u79EF\u5206\u3002\n\u6D77\u91CF\u5956\u52B1\uFF0C\u8F6C\u8D77\u6765~";
    };
    //设置玩家积分
    Notice_Roullette.prototype.setPlayerPoint = function (suc, jobj) {
        if (suc && this.todayPt.parent) {
            this.updatePlaerPoint(jobj.userPoint);
            this.todayPt.text = jobj.userInput.toString();
            this.openGameTouch();
        }
    };
    Notice_Roullette.prototype.setData = function (data) {
        //
        this.closeGameTouch();
        //
        this.setNoticeInfo(data);
        //
        this.setRoulletteData(data);
        //
        this.wlist.init(this);
        //请求玩家积分
        HttpRequester.putHttpData(ConfObjRead.getConfUrl().cmd.user_bet_info, null, this, this.setPlayerPoint);
    };
    return Notice_Roullette;
}(ui.dlg.notice.roulette.NoticeRouletteUI));
//# sourceMappingURL=Notice_Roullette.js.map