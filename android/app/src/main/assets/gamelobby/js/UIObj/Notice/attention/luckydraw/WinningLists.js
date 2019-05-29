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
var WinningLists = /** @class */ (function (_super) {
    __extends(WinningLists, _super);
    function WinningLists() {
        return _super.call(this) || this;
    }
    WinningLists.prototype.init = function ($config) {
        this._header = Tools.newSprite($config.bg);
        this.addChild(this._header);
        this._recordNew = Tools.newSprite($config.new);
        this.addChild(this._recordNew);
        this._recordNew.alpha = 0;
        this._btnLatest = new MyButton();
        this._btnLatest.init($config.latest, this, this.onClick);
        this._btnLatest.pos($config.latest.pos.x, $config.latest.pos.y);
        this.addChild(this._btnLatest);
        this._btnMyList = new MyButton();
        this._btnMyList.init($config.mywin, this, this.onClick);
        this._btnMyList.pos($config.mywin.pos.x, $config.mywin.pos.y);
        this.addChild(this._btnMyList);
        for (var i = 0; i < 7; i++) {
            var bar = i % 2 ? $config.bar1 : $config.bar0;
            var sp = Tools.newSprite(bar);
            this.addChild(sp);
            sp.y = sp.height * i;
            sp.y += this._header.y + this._header.height;
        }
        this._footer = Tools.newSprite($config.bottom);
        this.addChild(this._footer);
        this._recordLatest = new LotteryRecord();
        this.addChild(this._recordLatest);
        this._recordLatest.init($config.content);
        this._recordMine = new LotteryRecord();
        this.addChild(this._recordMine);
        this._recordMine.init($config.content);
        this._recordMine.visible = false;
        this._recordLatest.y = this._recordMine.y = $config.content.y;
        this._currIdx = 1;
        this.getList();
    };
    WinningLists.prototype.onClick = function ($e) {
        var btn = $e;
        switch (btn) {
            case this._btnLatest:
                this._recordLatest.visible = true;
                this._recordMine.visible = false;
                this._currIdx = 1;
                break;
            case this._btnMyList:
                this._recordLatest.visible = false;
                this._recordMine.visible = true;
                this._currIdx = 2;
                break;
        }
        this.getList();
    };
    WinningLists.prototype.getList = function ($update) {
        if ($update === void 0) { $update = false; }
        this._isUpdate = $update;
        var url = ConfObjRead.getConfUrl().url.apihome;
        url += ConfObjRead.getConfUrl().cmd.attention_lottery_record;
        url += "?access_token=" + Common.access_token;
        url += "&isWho=" + this._currIdx;
        url += "&noticeId=" + this.noticeId;
        var header = ["Content-Type", "application/json; charset=utf-8", "Accept", "*/*"];
        NetManager.getObj().HttpConnect(url, this, this.returnListInfo, header, null, "get", "json");
    };
    WinningLists.prototype.returnListInfo = function (s, stat) {
        switch (this._currIdx) {
            case 1:
                this._recordLatest.setData(s);
                break;
            case 2:
                this._recordMine.setData(s);
                break;
        }
        if (!this._isUpdate)
            return;
        var focus = true;
        if (this._currIdx === 1 && s.prizeAmount === 0) {
            focus = false;
        }
        if (focus) {
            Laya.Tween.to(this._recordNew, { alpha: 1 }, 500, null, new Laya.Handler(this, this.fadeComplete));
        }
        // this.targetSpinner.setResult(s)
        // this.targetSpinner = undefined;
    };
    WinningLists.prototype.fadeComplete = function () {
        Laya.Tween.to(this._recordNew, { alpha: 0 }, 500);
    };
    WinningLists.prototype.disable = function () {
        this._btnLatest.mouseEnabled = false;
        this._btnMyList.mouseEnabled = false;
    };
    WinningLists.prototype.enable = function () {
        this._btnLatest.mouseEnabled = true;
        this._btnMyList.mouseEnabled = true;
    };
    return WinningLists;
}(Laya.Sprite));
//# sourceMappingURL=WinningLists.js.map