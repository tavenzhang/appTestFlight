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
var Notice = /** @class */ (function (_super) {
    __extends(Notice, _super);
    function Notice() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Notice.prototype.init = function (conf, caller, callback) {
        this.conf = conf;
        this.caller = caller;
        this.callback = callback;
        this.noticelist = new Array();
        this.requestNoticeList(Common.confObj.url.lobbyurl +
            Common.confObj.cmd.noticelist +
            "?pageSize=20&start=0&access_token=" + Common.access_token);
    };
    Notice.prototype.requestNoticeList = function (url) {
        LayaMain.getInstance().showCircleLoading(true);
        // MyBBLoading.showPad(this,ConfObjRead.getConfCLoading(),null);
        NetManager.getObj().HttpConnect(url, this, this.responseNoticeList);
    };
    Notice.prototype.responseNoticeList = function (s, stat) {
        if (stat == "complete") {
            //设置所有参数
            Common.noticeInfo = s;
            this.addDialogItems(Common.noticeInfo.data);
            // lamain.sceneRoot.showCircleLoading(false);
            //完毕了，之后又干嘛
            this.callback.apply(this.caller, [this]);
        }
        else {
            // lamain.sceneRoot.showCircleLoading(false);
            Toast.showToast(s);
        }
        if (MyBBLoading.obj) {
            MyBBLoading.obj.show(false);
        }
        // Debug.trace("response userInfo:"+stat);
        // Debug.trace(s);
    };
    Notice.prototype.addDialogItems = function (data) {
        //逐个添加
        for (var k in data) {
            var n = data[k];
            // var id = n['id'];
            // var notice = n['notice'];
            // var img = n['img'];
            var nitem = new NoticeItem();
            nitem.init(Common.confObj.notice, n, this, this.onCloseNotice);
            this.addChild(nitem);
            this.noticelist.push(nitem);
        }
    };
    Notice.prototype.onCloseNotice = function () {
    };
    return Notice;
}(Laya.Sprite));
//# sourceMappingURL=Notice.js.map