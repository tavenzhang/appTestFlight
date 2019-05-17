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
var view;
(function (view) {
    var dlg;
    (function (dlg) {
        var agent;
        (function (agent) {
            var CommissionRecordsPop = /** @class */ (function (_super) {
                __extends(CommissionRecordsPop, _super);
                function CommissionRecordsPop() {
                    var _this = _super.call(this) || this;
                    _this._records = [];
                    _this._listH = 0;
                    _this.perUpdate = 20;
                    _this.maxRecords = 0;
                    return _this;
                }
                CommissionRecordsPop.prototype.show = function ($parent) {
                    $parent.addChild(this);
                    this.popup(false, true);
                    this.init();
                };
                CommissionRecordsPop.prototype.init = function () {
                    this.btnClose.once(Laya.Event.CLICK, this, this.onClick);
                    this.btnContact.on(Laya.Event.CLICK, this, this.onClick);
                    this.order_dummy.visible = false;
                    this._list = new Laya.Sprite();
                    this.contents.addChild(this._list);
                    this._list.addChild(this.instructions);
                    this.contents.scrollRect = new Laya.Rectangle(0, 0, this.contents.width, this.contents.height);
                    this.contents.on(Laya.Event.MOUSE_DOWN, this, this.onDrag);
                    this.parent.on(Laya.Event.MOUSE_UP, this, this.onDrag);
                    this.parent.on(Laya.Event.MOUSE_MOVE, this, this.onDrag);
                    this.isDrag = false;
                    this.instructions.text = "您目前无任何提佣记录";
                    this.instructions.y = 170;
                    this.requestRecords();
                };
                CommissionRecordsPop.prototype.generateList = function ($data) {
                    var totalH = 0;
                    for (var i = 0; i < $data.length; i++) {
                        var record = new CommisionRecord(this.order_dummy);
                        this._list.addChild(record);
                        record.x = 13;
                        var h = this.order_dummy.height + 5;
                        record.y = h * i;
                        record.y += 10;
                        record.y += this._listH > 0 ? this._listH - 5 : this._listH;
                        record.setData($data[i]);
                        this._records.push(record);
                        totalH = record.y + this.order_dummy.height;
                    }
                    if (totalH > 0) {
                        this._listH = totalH;
                        this._minY = -(this._listH - this.contents.height) - 10;
                        this.instructions.y = this._listH;
                    }
                    var scroll = true;
                    switch (true) {
                        case this.maxRecords === 0:
                            this.instructions.text = "您目前无任何提佣记录";
                            this.instructions.y = 170;
                            scroll = false;
                            break;
                        case this._records.length < 5:
                            this.instructions.text = "";
                            scroll = false;
                            break;
                        case this.maxRecords === this._records.length:
                            this.instructions.text = "您无更多提佣记录";
                            this._list.y < this._minY && Laya.Tween.to(this._list, { y: this._minY - 100 }, 100);
                            break;
                        default:
                            this.instructions.text = "请往上拖动以加载更多提佣记录";
                            break;
                    }
                    if (!scroll) {
                        this.contents.off(Laya.Event.MOUSE_DOWN, this, this.onDrag);
                        this.parent.off(Laya.Event.MOUSE_UP, this, this.onDrag);
                        this.parent.off(Laya.Event.MOUSE_MOVE, this, this.onDrag);
                    }
                };
                CommissionRecordsPop.prototype.onClick = function ($e) {
                    switch ($e.currentTarget) {
                        case this.btnClose:
                            SoundPlayer.closeSound();
                            this.close(null, true);
                            break;
                        case this.btnContact:
                            SoundPlayer.enterPanelSound();
                            Tools.jump2module(ConfObjRead.getConfUrl().url.g_custom, "custom");
                            break;
                    }
                    $e.currentTarget.scaleX = $e.currentTarget.scaleY = .95;
                    Laya.timer.once(100, this, function (target) {
                        target.scaleX = target.scaleY = 1;
                    }, [$e.currentTarget]);
                };
                CommissionRecordsPop.prototype.onDrag = function ($e) {
                    var x = $e.stageX;
                    var y = $e.stageY;
                    switch ($e.type) {
                        case Laya.Event.MOUSE_DOWN: {
                            this.moveX = x;
                            this.moveY = y;
                            this.listInitY = this._list.y;
                            break;
                        }
                        case Laya.Event.MOUSE_UP: {
                            if (this.isDrag) {
                                this.isDrag = false;
                                this.moveX = 0;
                                this.moveY = 0;
                                this.handlePositions();
                                this.listInitY = null;
                            }
                            break;
                        }
                        case Laya.Event.MOUSE_MOVE: {
                            this.isDrag = true;
                            if (this.moveY > 0) {
                                var move = y - this.moveY;
                                this.moveY = y;
                                this._list.y += move;
                            }
                            break;
                        }
                    }
                };
                CommissionRecordsPop.prototype.handlePositions = function () {
                    switch (true) {
                        case this._list.y > 0: {
                            Laya.Tween.to(this._list, { y: 0 }, 100);
                            break;
                        }
                        case this.listInitY === this._minY - 100 && this._list.y < this._minY - (this.contents.height / 2): {
                            this.instructions.text = "加载中...";
                            this.requestRecords();
                            break;
                        }
                        case this._list.y < this._minY: {
                            Laya.Tween.to(this._list, { y: this._minY - 100 }, 100);
                            break;
                        }
                    }
                };
                CommissionRecordsPop.prototype.requestRecords = function () {
                    var url = ConfObjRead.getConfUrl().url.apihome +
                        ConfObjRead.getConfUrl().cmd.commission_record +
                        "?pageSize=" + this.perUpdate + "&start=" + this._records.length +
                        "&access_token=" + Common.access_token;
                    var header = ["Accept", "*/*"];
                    NetManager.getObj().HttpConnect(url, this, this.responseChange, header, null, "get", "JSON");
                    // this.onClose(e, bcallback);
                };
                CommissionRecordsPop.prototype.responseChange = function (s, stat, hr) {
                    if (stat == "complete" || hr._http.status) {
                        var data = typeof s === "string" ? JSON.parse(s) : s;
                        this.maxRecords = data.totalCount;
                        this.generateList(data.datas);
                    }
                    else {
                        try {
                            Toast.showToast(JSON.parse(hr.http.response).message);
                        }
                        catch (e) {
                        }
                    }
                };
                CommissionRecordsPop.prototype.onClosed = function ($type) {
                    this.btnContact.off(Laya.Event.CLICK, this, this.onClick);
                    for (var _i = 0, _a = this._records; _i < _a.length; _i++) {
                        var record = _a[_i];
                        record.destroy();
                    }
                    this._records.length = 0;
                    _super.prototype.onClosed.call(this, $type);
                    this.destroy(true);
                };
                return CommissionRecordsPop;
            }(ui.dlg.pop.CommissionRecordsUI));
            agent.CommissionRecordsPop = CommissionRecordsPop;
        })(agent = dlg.agent || (dlg.agent = {}));
    })(dlg = view.dlg || (view.dlg = {}));
})(view || (view = {}));
//# sourceMappingURL=CommissionRecordsPop.js.map