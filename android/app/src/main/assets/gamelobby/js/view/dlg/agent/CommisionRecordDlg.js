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
/**
*
*/
var view;
(function (view) {
    var dlg;
    (function (dlg_1) {
        var agent;
        (function (agent) {
            /**
             * 提佣记录
             */
            var CommisionRecordDlg = /** @class */ (function (_super) {
                __extends(CommisionRecordDlg, _super);
                function CommisionRecordDlg() {
                    var _this = _super.call(this) || this;
                    _this._records = [];
                    _this._listH = 0;
                    _this.perUpdate = 20;
                    _this.maxRecords = 0;
                    _this.initView();
                    return _this;
                }
                CommisionRecordDlg.show = function () {
                    var dlg = new CommisionRecordDlg();
                    dlg.popup(false, true);
                };
                CommisionRecordDlg.prototype.initView = function () {
                    var _this = this;
                    this.order_dummy.visible = false;
                    this._list = new Laya.Sprite();
                    this.contents.addChild(this._list);
                    this._list.addChild(this.instructions);
                    this.contents.scrollRect = new Laya.Rectangle(0, 0, this.contents.width, this.contents.height);
                    this.contents.on(Laya.Event.MOUSE_DOWN, this, this.onDrag);
                    Laya.stage.on(Laya.Event.MOUSE_UP, this, this.onDrag);
                    Laya.stage.on(Laya.Event.MOUSE_MOVE, this, this.onDrag);
                    this.isDrag = false;
                    this.instructions.text = "您目前无任何提佣记录";
                    this.instructions.y = 170;
                    this.requestRecords();
                    EventManager.addTouchScaleListener(this.btnClose, this, function () {
                        SoundPlayer.closeSound();
                        _this.close(null, true);
                    });
                    EventManager.addTouchScaleListener(this.btnContact, this, function () {
                        SoundPlayer.enterPanelSound();
                        Tools.jump2module(ConfObjRead.getConfUrl().url.g_custom, "custom");
                    });
                };
                CommisionRecordDlg.prototype.generateList = function ($data) {
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
                        Laya.stage.off(Laya.Event.MOUSE_UP, this, this.onDrag);
                        Laya.stage.off(Laya.Event.MOUSE_MOVE, this, this.onDrag);
                    }
                };
                CommisionRecordDlg.prototype.onDrag = function ($e) {
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
                CommisionRecordDlg.prototype.handlePositions = function () {
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
                CommisionRecordDlg.prototype.requestRecords = function () {
                    var _this = this;
                    var cmd = ConfObjRead.getConfUrl().cmd.commission_record;
                    var urlParams = "&pageSize=" + this.perUpdate + "&start=" + this._records.length;
                    HttpRequester.getHttpData(cmd, this, function (suc, jobj) {
                        if (suc) {
                            _this.maxRecords = jobj.totalCount;
                            _this.generateList(jobj.datas);
                        }
                    }, urlParams);
                };
                CommisionRecordDlg.prototype.onClosed = function ($type) {
                    EventManager.removeAllEvents(this);
                    this.contents.off(Laya.Event.MOUSE_DOWN, this, this.onDrag);
                    Laya.stage.off(Laya.Event.MOUSE_UP, this, this.onDrag);
                    Laya.stage.off(Laya.Event.MOUSE_MOVE, this, this.onDrag);
                    this._records.forEach(function (value) { return value.destroy(); });
                    this._records = null;
                    _super.prototype.onClosed.call(this, $type);
                    this.destroy(true);
                };
                return CommisionRecordDlg;
            }(ui.dlg.agent.CommisionRecordDlgUI));
            agent.CommisionRecordDlg = CommisionRecordDlg;
        })(agent = dlg_1.agent || (dlg_1.agent = {}));
    })(dlg = view.dlg || (view.dlg = {}));
})(view || (view = {}));
//# sourceMappingURL=CommisionRecordDlg.js.map