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
var AgentContentDesc = /** @class */ (function (_super) {
    __extends(AgentContentDesc, _super);
    function AgentContentDesc() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AgentContentDesc.prototype.initContent = function () {
        _super.prototype.initContent.call(this);
        this.sp_content = new MySprite();
        this.addChild(this.sp_content);
        if (this.conf.size) {
            this.size(this.conf.size.w, this.conf.size.h);
            this.sp_content.size(this.conf.size.w, this.conf.size.h);
            this.scrollRect = new Laya.Rectangle(0, 0, this.conf.size.w + 20, this.conf.size.h);
            this.on(Laya.Event.MOUSE_DOWN, this, this.onMouseEvent);
        }
        this.requestList();
    };
    AgentContentDesc.prototype.requestList = function () {
        LayaMain.getInstance().showCircleLoading();
        var header = [
            // "Content-Type","application/json",
            // "Accept","*/*"
            "Accept", "application/json"
        ];
        var url = ConfObjRead.getConfUrl().url.apihome +
            ConfObjRead.getConfUrl().cmd.agentbrokerage +
            "?access_token=" + Common.access_token;
        // var url: string = "http://sit.106games.com" +
        // "/gamecenter/mgt/agent/commission/rule" +
        // "/mgt/agent/commission/rule" +
        // "/player/agent/commission/rule" +
        // "?access_token=" + Common.access_token;
        // Debug.trace("requestUserAvator url:"+url);
        NetManager.getObj().HttpConnect(url, this, this.responseInfo, header, null, "get", "json");
    };
    AgentContentDesc.prototype.responseInfo = function (s, stat, hr) {
        Debug.trace("AgentContentDesc.responseInfo stat:" + stat);
        Debug.trace(s);
        // Debug.trace(hr);
        LayaMain.getInstance().showCircleLoading(false);
        if (stat == "complete") {
            this.initSprites(this.transListData(s.resultObj));
        }
        else {
            // LayaMain.getInstance().requestEnd(stat,s);
            var repon = hr.http.response;
            try {
                var jobj = JSON.parse(repon);
                var err = jobj.message;
                Toast.showToast(err);
            }
            catch (e) { }
            // AgentPad.getObj().onClose(null);
            // Toast.showToast( s );//Tools.getStringByKey( this.conf.txt_notagent ) );
        }
    };
    AgentContentDesc.prototype.initSprites = function (listData) {
        if (this.conf.sprites) {
            var h = 0;
            var len = this.conf.sprites.length;
            for (var i = 0; i < len; i++) {
                var spconf = this.conf.sprites[i];
                if (spconf.type == "list") {
                    var li = new AgentList(this.sp_content, ConfObjRead.getConfListDesc());
                    li.x = 20;
                    li.y += 135;
                    this.sp_content.addChild(li);
                    // li.setData(ConfObjRead.getConfListDescTest());
                    li.setData(listData);
                    h += li.height;
                }
                else if (spconf.type == "listbottom") {
                    var spb = Tools.addSprite(this.sp_content, spconf);
                    spb.y = h;
                    h += spb.height;
                }
                else {
                    var sp = Tools.addSprite(this.sp_content, spconf);
                    h += sp.height;
                }
            }
            this.sp_content.size(this.conf.size.w, h);
            Debug.trace("AgentContentDesc.initContent h:" + h);
        }
    };
    AgentContentDesc.prototype.onMouseEvent = function (e) {
        var x = e.stageX;
        switch (e.type) {
            case Laya.Event.MOUSE_DOWN:
                var max = this.conf.size.h - this.sp_content.height;
                // Debug.trace("AgentContentDesc.onMouseEvent max:"+max);
                if (max < 0) {
                    this.sp_content.startDrag(new Laya.Rectangle(0, max, 0, Math.abs(max)), this.conf.guanxing, this.conf.xiangpiDis, this.conf.xiangpiTime, null, true, 0.92);
                }
                else {
                    this.sp_content.startDrag(new Laya.Rectangle(0, 0, 0, 0), this.conf.guanxing, this.conf.xiangpiDis, this.conf.xiangpiTime, null, true, 0.92);
                }
                break;
        }
    };
    AgentContentDesc.prototype.transListData = function (arr) {
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
    AgentContentDesc.prototype.getRateMoney = function (obj) {
        var percent = parseFloat(obj.rate) / 100;
        // Debug.trace("AgentContentDesc.getRateMoney percent:"+percent);
        var rs = (percent * this.conf.moneyrangemac);
        rs = Math.round(rs);
        rs = parseInt(rs + "");
        return rs + "";
    };
    AgentContentDesc.prototype.getMoneyRange = function (obj, i) {
        var lower = obj.lower * (this.conf.moneyrangemac);
        var upper = obj.upper * (this.conf.moneyrangemac);
        var pre = this.FormatMoney(lower);
        var f = "≤";
        if (i == 0) {
            var f = "<";
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
            mid = mid + "<"; //"≤X≤";
        }
        else {
            // mid = "≤X";
            end = "";
        }
        // Debug.trace("AgentContentDesc.getMoneyRange pre:"+pre+" mid:"+mid+" r:"+end);
        return pre + mid + end;
    };
    AgentContentDesc.prototype.FormatMoney = function (num, len) {
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
    return AgentContentDesc;
}(AgentContent));
//# sourceMappingURL=AgentContentDesc.js.map