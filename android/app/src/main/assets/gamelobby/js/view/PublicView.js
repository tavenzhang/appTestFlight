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
    /**
     * 公用块
     */
    var PublicView = /** @class */ (function (_super) {
        __extends(PublicView, _super);
        function PublicView() {
            var _this = _super.call(this) || this;
            _this.gapTime = 10000; //请求时间间隔
            _this.msgList = [];
            return _this;
        }
        PublicView.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.head_oldx = this.headGroup.x;
            this.mouseThrough = true; //设置可穿透
            //用户信息
            this.infoView = new UserInfoView(this);
            //版本号
            this.verTxt.text = GameUtils.appVer + "\n" + ResConfig.versions;
            //滚动通告
            this.initRollView();
            this.setLayout();
        };
        //-----------------滚动通告相关-----------------------------
        PublicView.prototype.initRollView = function () {
            this.msgTxt.text = "";
            this.msgTxt.x = this.noticeSp.width;
            this.noticeSp.scrollRect = new Laya.Rectangle(0, 0, this.noticeSp.width, this.noticeSp.height);
            this.requestRollInfo();
        };
        PublicView.prototype.requestRollInfo = function () {
            var _this = this;
            var msgUrl = ConfObjRead.getConfUrl().url.apihome +
                ConfObjRead.getConfUrl().cmd.noticelist +
                "?pageSize=20&start=0&access_token=" +
                Common.access_token;
            HttpRequester.doRequest(msgUrl, null, null, this, function (suc, jobj) {
                if (suc) {
                    if (jobj.datas && jobj.datas.length > 0) {
                        _this.addMsgItems(jobj.datas);
                        _this.stopRequestTimer();
                    }
                    else {
                        _this.startRequestTimer();
                    }
                }
                else {
                    _this.startRequestTimer();
                }
            }, "get");
        };
        PublicView.prototype.addMsgItems = function (list) {
            var _this = this;
            list.forEach(function (value) {
                if (value.notice)
                    _this.msgList.push(value.notice);
            });
            if (this.msgList.length > 0) {
                this.msgTxt.text = this.msgList.shift();
                this.msgTxt.x = this.noticeSp.width;
                this.startRollingTimer();
            }
        };
        PublicView.prototype.startRequestTimer = function () {
            if (this.runTimerReq)
                return;
            Laya.timer.once(10000, this, this.requestRollInfo);
            this.runTimerReq = true;
        };
        PublicView.prototype.stopRequestTimer = function () {
            if (this.runTimerReq) {
                Laya.timer.clear(this, this.requestRollInfo);
                this.runTimerReq = false;
            }
        };
        PublicView.prototype.startRollingTimer = function () {
            if (this.runTimerRoll)
                return;
            Laya.timer.frameLoop(1, this, this.doRoll);
            this.runTimerRoll = true;
        };
        PublicView.prototype.doRoll = function () {
            this.msgTxt.x--;
            if (this.msgTxt.x <= -this.msgTxt.textField.textWidth) {
                if (this.msgList.length > 0) {
                    this.msgTxt.text = this.msgList.shift();
                    this.msgTxt.x = this.noticeSp.width;
                }
                else {
                    this.startRequestTimer();
                    this.stopRollingTimer();
                }
            }
        };
        PublicView.prototype.stopRollingTimer = function () {
            if (this.runTimerRoll) {
                Laya.timer.clear(this, this.doRoll);
                this.runTimerRoll = false;
            }
        }; //end---------------------------------------------------
        /**
         * 设置布局
         */
        PublicView.prototype.setLayout = function () {
            this.width = Laya.stage.width;
            this.headGroup.x = this.head_oldx + GameUtils.posOffset;
        };
        PublicView.prototype.runningmsgOver = function () { };
        PublicView.prototype.dispose = function () {
            this.stopRequestTimer();
            this.stopRollingTimer();
            if (this.infoView) {
                this.infoView.dispose();
                this.infoView = null;
            }
            this.destroy(true);
        };
        return PublicView;
    }(ui.PublicUIUI));
    view.PublicView = PublicView;
})(view || (view = {}));
//# sourceMappingURL=PublicView.js.map