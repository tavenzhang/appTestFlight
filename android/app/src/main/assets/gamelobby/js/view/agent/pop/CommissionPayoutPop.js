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
            var CommissionPayoutPop = /** @class */ (function (_super) {
                __extends(CommissionPayoutPop, _super);
                function CommissionPayoutPop() {
                    var _this = _super.call(this) || this;
                    _this._pays = [];
                    _this._listH = 0;
                    return _this;
                }
                CommissionPayoutPop.prototype.show = function ($parent) {
                    $parent.addChild(this);
                    this.popup(false, true);
                    this.init();
                };
                CommissionPayoutPop.prototype.init = function () {
                    this.btnClose.once(Laya.Event.CLICK, this, this.onClick);
                    this.pay_dummy.visible = false;
                    this._list = new Laya.Sprite();
                    this.contents.addChild(this._list);
                    this.contents.scrollRect = new Laya.Rectangle(0, 0, this.contents.width, this.contents.height);
                    this.contents.on(Laya.Event.MOUSE_DOWN, this, this.onDrag);
                    this.parent.on(Laya.Event.MOUSE_UP, this, this.onDrag);
                    this.parent.on(Laya.Event.MOUSE_MOVE, this, this.onDrag);
                    this.isDrag = false;
                    LayaMain.getInstance().showCircleLoading();
                    HttpRequester.getHttpData(ConfObjRead.getConfUrl().cmd.agentbrokerage, this, this.responseInfo);
                };
                CommissionPayoutPop.prototype.onClick = function ($e) {
                    switch ($e.currentTarget) {
                        case this.btnClose:
                            SoundPlayer.closeSound();
                            this.close(null, true);
                            break;
                    }
                    $e.currentTarget.scaleX = $e.currentTarget.scaleY = .95;
                    Laya.timer.once(100, this, function (target) {
                        target.scaleX = target.scaleY = 1;
                    }, [$e.currentTarget]);
                };
                CommissionPayoutPop.prototype.onDrag = function ($e) {
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
                CommissionPayoutPop.prototype.handlePositions = function () {
                    switch (true) {
                        case this._list.y > 0: {
                            Laya.Tween.to(this._list, { y: 0 }, 100);
                            break;
                        }
                        case this._list.y < this._minY: {
                            Laya.Tween.to(this._list, { y: this._minY }, 100);
                            break;
                        }
                    }
                };
                CommissionPayoutPop.prototype.responseInfo = function (suc, jobj) {
                    LayaMain.getInstance().showCircleLoading(false);
                    if (suc) {
                        this.generateList(this.transListData(jobj.resultObj));
                    }
                };
                CommissionPayoutPop.prototype.transListData = function (arr) {
                    var rs = [];
                    var len = arr.length;
                    for (var i = 0; i < len; i++) {
                        var obj = arr[i];
                        var vobj = {
                            "xh": obj.level,
                            "yjed": this.getMoneyRange(obj, i),
                            "dljb": obj.levelName,
                            "mwyfy": this.getRateMoney(obj),
                            "fybl": obj.rate //"2.5%"
                        };
                        rs.push(vobj);
                    }
                    return rs;
                };
                CommissionPayoutPop.prototype.getRateMoney = function (obj) {
                    var percent = parseFloat(obj.rate) / 100;
                    // Debug.trace("AgentContentDesc.getRateMoney percent:"+percent);
                    var rs = (percent * 10000);
                    rs = Math.round(rs);
                    rs = parseInt(rs + "");
                    return rs + "";
                };
                CommissionPayoutPop.prototype.getMoneyRange = function (obj, i) {
                    var lower = obj.lower * 10000;
                    var upper = obj.upper * 10000;
                    var pre = this.FormatMoney(lower);
                    var f = " ≤ ";
                    if (i == 0) {
                        var f = " < ";
                    }
                    var x = "X";
                    var mid = "";
                    var end = this.FormatMoney(upper);
                    if (lower > 0) {
                        mid = f + x; //+midf;//"X≤";
                    }
                    else {
                        pre = "";
                        mid = x;
                    }
                    if (upper >= 0) {
                        mid = mid + " < "; //"≤X≤";
                    }
                    else {
                        // mid = "≤X";
                        end = "";
                    }
                    if (isNaN(upper)) {
                        upper = Number.MAX_VALUE;
                    }
                    if (AgentData.todaysPerformance >= lower && AgentData.todaysPerformance < upper) {
                        AgentData.myPerformanceIndex = i;
                    }
                    // Debug.trace("AgentContentDesc.getMoneyRange pre:"+pre+" mid:"+mid+" r:"+end);
                    return pre + mid + end;
                };
                CommissionPayoutPop.prototype.FormatMoney = function (num, len) {
                    if (len === void 0) { len = 0; }
                    var r = "";
                    if (num >= 10000) {
                        //超过一万
                        var n = num / 10000;
                        var tt = n.toFixed(len + 1);
                        var pointPos = tt.indexOf("."); //点在字符串tt的哪里
                        //点的后面截取len+1位
                        r = tt.substring(0, pointPos + len); //+1);
                        // r = tt;//.substring(0,len+1);
                        // Debug.trace("AgentContentDesc.FormatMoney n:"+n+" tt:"+tt+" r:"+r);
                    }
                    else {
                        // return num.toFixed(len);
                        // var data = "" + Math.floor( num * Math.pow( 10 , len ) ) / Math.pow( 10 , len );
                        // return data;
                        if (num >= 0) {
                            return num + "";
                        }
                        else {
                            return "";
                        }
                    }
                    return r + "万";
                };
                CommissionPayoutPop.prototype.generateList = function ($data) {
                    var totalH = 0;
                    for (var i = 0; i < $data.length; i++) {
                        var pay = new CommisionPay(this.pay_dummy);
                        this._list.addChild(pay);
                        pay.x = 13;
                        var h = this.pay_dummy.height + 5;
                        pay.y = h * i;
                        pay.y += 10;
                        pay.y += this._listH > 0 ? this._listH - 5 : this._listH;
                        pay.setData($data[i]);
                        this._pays.push(pay);
                        totalH = pay.y + this.pay_dummy.height;
                    }
                    if (totalH > 0) {
                        this._listH = totalH;
                        this._minY = -(this._listH - this.contents.height) - 10;
                    }
                    if (this._pays.length < 10) {
                        this.contents.off(Laya.Event.MOUSE_DOWN, this, this.onDrag);
                        this.parent.off(Laya.Event.MOUSE_UP, this, this.onDrag);
                        this.parent.off(Laya.Event.MOUSE_MOVE, this, this.onDrag);
                    }
                };
                CommissionPayoutPop.prototype.onClosed = function ($type) {
                    _super.prototype.onClosed.call(this, $type);
                    this.destroy(true);
                };
                return CommissionPayoutPop;
            }(ui.dlg.agent.pop.CommisionPayoutListUI));
            agent.CommissionPayoutPop = CommissionPayoutPop;
        })(agent = dlg.agent || (dlg.agent = {}));
    })(dlg = view.dlg || (view.dlg = {}));
})(view || (view = {}));
//# sourceMappingURL=CommissionPayoutPop.js.map