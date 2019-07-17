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
var WinningList2 = /** @class */ (function (_super) {
    __extends(WinningList2, _super);
    function WinningList2() {
        var _this = _super.call(this) || this;
        _this._records = [];
        return _this;
    }
    WinningList2.prototype.init = function (r) {
        this.noticeid = r.noticeid;
        this._newt = r.newtab;
        this._myt = r.mytab;
        this._newt.on(Laya.Event.MOUSE_DOWN, this, this.onMouseDown);
        this._myt.on(Laya.Event.MOUSE_DOWN, this, this.onMouseDown);
        this._myt.alpha = 0;
        this._currIdx = 2;
        this._recordNew = r.bright;
        this._recordNew.alpha = 0;
        for (var i = 0; i < 7; i++) {
            this._records.push(new WinRecord(r.list.getChildByName("list" + i)));
        }
        this.getList();
    };
    WinningList2.prototype.onMouseDown = function ($e) {
        this._newt.alpha = 0;
        this._myt.alpha = 0;
        $e.currentTarget.alpha = 1;
        switch ($e.currentTarget) {
            case this._newt:
                this._currIdx = 2;
                break;
            case this._myt:
                this._currIdx = 1;
                break;
        }
        SoundPlayer.enterPanelSound();
        this.getList();
    };
    WinningList2.prototype.getList = function ($update) {
        var _this = this;
        if ($update === void 0) { $update = false; }
        this._isUpdate = $update;
        var cmd = ConfObjRead.getConfUrl().cmd.attention_lottery_record;
        var urlParams = "&isWho=" + this._currIdx;
        urlParams += "&noticeId=" + this.noticeid;
        HttpRequester.getHttpData(cmd, this, function (suc, jobj) {
            if (suc) {
                _this.setRecord(jobj);
                if (!_this._isUpdate)
                    return;
                var focus_1 = true;
                if (_this._currIdx === 2 && jobj.prizeAmount === 0) {
                    focus_1 = false;
                }
                if (focus_1) {
                    Laya.Tween.to(_this._recordNew, { alpha: 1 }, 500, null, new Laya.Handler(_this, _this.fadeComplete));
                }
            }
        }, urlParams);
    };
    WinningList2.prototype.setRecord = function (s) {
        for (var _i = 0, _a = this._records; _i < _a.length; _i++) {
            var record = _a[_i];
            record.hide();
        }
        var counter = 0;
        for (var i = 0; i < 7; i++) {
            var data = s[i];
            if (data) {
                if (this._currIdx === 2) {
                    if (data.prizeAmount > 0) {
                        this._records[counter].setData(data);
                        counter++;
                    }
                }
                else {
                    this._records[i].setData(data);
                }
            }
            else {
                this._records[i].hide();
            }
        }
    };
    WinningList2.prototype.fadeComplete = function () {
        Laya.Tween.to(this._recordNew, { alpha: 0 }, 500);
    };
    WinningList2.prototype.disable = function () {
        this._newt.mouseEnabled = false;
        this._myt.mouseEnabled = false;
    };
    WinningList2.prototype.enable = function () {
        this._newt.mouseEnabled = true;
        this._myt.mouseEnabled = true;
    };
    return WinningList2;
}(Laya.EventDispatcher));
//# sourceMappingURL=WinningList2.js.map