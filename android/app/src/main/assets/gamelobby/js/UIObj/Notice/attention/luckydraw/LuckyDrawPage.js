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
var LuckyDrawPage = /** @class */ (function (_super) {
    __extends(LuckyDrawPage, _super);
    function LuckyDrawPage() {
        return _super.call(this) || this;
    }
    LuckyDrawPage.prototype.init = function (conf, data) {
        var datas = ConfObjRead.getConfNoticeDialogLuckytDraw();
        this._silverS = new Spinner();
        this.addChild(this._silverS);
        this._silverS.init(ConfObjRead.getConfNoticeDialogSpinner().silver);
        this._silverS.on("startSpin", this, this.onStartSpin);
        this._silverS.on("stopSpin", this, this.onStopSpin);
        this._goldS = new Spinner();
        this.addChild(this._goldS);
        this._goldS.init(ConfObjRead.getConfNoticeDialogSpinner().gold);
        this._goldS.on("startSpin", this, this.onStartSpin);
        this._goldS.on("stopSpin", this, this.onStopSpin);
        this._goldS.visible = false;
        this._diamondS = new Spinner();
        this.addChild(this._diamondS);
        this._diamondS.init(ConfObjRead.getConfNoticeDialogSpinner().diamond);
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
        this._lists.init(datas.list);
        this._lists.x = datas.list.pos.x;
        this._lists.y = datas.list.pos.y;
        this._topT = Tools.addLabels(this, datas.contents.top);
        this._bottomT = Tools.addLabels(this, datas.contents.bottom);
        this._infoT = Tools.addLabels(this, datas.contents.info);
    };
    LuckyDrawPage.prototype.onClick = function ($e) {
        this._silverS.visible = false;
        this._goldS.visible = false;
        this._diamondS.visible = false;
        var btn = $e;
        switch (btn) {
            case this._btnSilver:
                this._silverS.visible = true;
                break;
            case this._btnGold:
                this._goldS.visible = true;
                break;
            case this._btnDiamond:
                this._diamondS.visible = true;
                break;
        }
    };
    LuckyDrawPage.prototype.onStartSpin = function () {
        this._btnSilver.mouseEnabled = false;
        this._btnGold.mouseEnabled = false;
        this._btnDiamond.mouseEnabled = false;
    };
    LuckyDrawPage.prototype.onStopSpin = function () {
        this._btnSilver.mouseEnabled = true;
        this._btnGold.mouseEnabled = true;
        this._btnDiamond.mouseEnabled = true;
    };
    return LuckyDrawPage;
}(MySprite));
//# sourceMappingURL=LuckyDrawPage.js.map