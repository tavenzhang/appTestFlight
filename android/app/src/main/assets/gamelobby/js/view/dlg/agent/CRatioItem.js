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
/**Created by the LayaAirIDE*/
var view;
(function (view) {
    var dlg;
    (function (dlg) {
        var agent;
        (function (agent) {
            var CRatioItem = /** @class */ (function (_super) {
                __extends(CRatioItem, _super);
                function CRatioItem() {
                    var _this = _super.call(this) || this;
                    _this.bgIcon.visible = false;
                    return _this;
                }
                CRatioItem.prototype.initData = function (data, index) {
                    this.numTxt.text = data.level.toString();
                    this.rangeTxt.text = this.getMoneyRange(data, index);
                    this.paysTxt.text = this.getRateMoney(data);
                };
                CRatioItem.prototype.getRateMoney = function (obj) {
                    var percent = parseFloat(obj.rate) / 100;
                    var rs = (percent * 10000);
                    rs = Math.round(rs);
                    rs = parseInt(rs + "");
                    return rs + "";
                };
                CRatioItem.prototype.getMoneyRange = function (obj, i) {
                    var lower = Number(obj.lower) * 10000;
                    var upper = Number(obj.upper) * 10000;
                    var pre = this.FormatMoney(lower, 0);
                    var f = " ≤ ";
                    if (i == 0) {
                        var f = " < ";
                    }
                    var x = "X";
                    var mid = "";
                    var end = this.FormatMoney(upper, 0);
                    if (lower > 0) {
                        mid = f + x;
                    }
                    else {
                        pre = "";
                        mid = x;
                    }
                    if (upper >= 0) {
                        mid = mid + " < ";
                    }
                    else {
                        end = "";
                    }
                    if (isNaN(upper)) {
                        upper = Number.MAX_VALUE;
                    }
                    if (AgentModel.todaysPerformance >= lower && AgentModel.todaysPerformance < upper) {
                        this.bgIcon.visible = true;
                    }
                    return pre + mid + end;
                };
                CRatioItem.prototype.FormatMoney = function (num, len) {
                    if (len === void 0) { len = 0; }
                    var r = "";
                    if (num >= 10000) {
                        //超过一万
                        var n = num / 10000;
                        var tt = n.toFixed(len + 1);
                        var pointPos = tt.indexOf("."); //点在字符串tt的哪里
                        //点的后面截取len+1位
                        r = tt.substring(0, pointPos + len);
                    }
                    else {
                        if (num >= 0) {
                            return num + "";
                        }
                        else {
                            return "";
                        }
                    }
                    return r + "万";
                };
                return CRatioItem;
            }(ui.dlg.agent.CRatioItemUI));
            agent.CRatioItem = CRatioItem;
        })(agent = dlg.agent || (dlg.agent = {}));
    })(dlg = view.dlg || (view.dlg = {}));
})(view || (view = {}));
//# sourceMappingURL=CRatioItem.js.map