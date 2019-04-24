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
            return _super.call(this) || this;
        }
        PublicView.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.mouseThrough = true; //设置可穿透
            //用户信息
            this.infoView = new UserInfoView(this);
            this.verTxt.text = "版本号：4.0";
            var msgUrl = ConfObjRead.getConfUrl().url.apihome +
                ConfObjRead.getConfUrl().cmd.noticelist +
                "?pageSize=20&start=0&access_token=" +
                Common.access_token;
            //滚动通告
            RunningMsg.getInstance(this.noticeSp, "./assets/conf/scrollmsg/runningmsg.json", msgUrl, null, this.runningmsgOver);
        };
        PublicView.prototype.runningmsgOver = function () { };
        PublicView.prototype.dispose = function () {
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