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
var RoomScene = /** @class */ (function (_super) {
    __extends(RoomScene, _super);
    function RoomScene() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RoomScene.prototype.initUI = function (gamedata) {
        UIBg.getInstance(this, ConfObjRead.getConfUiBg());
        RoomTitleBar.getInstance(this, ConfObjRead.getConfRoomTitlebar(), this, this.titlebarOver);
        Avator.getInstance(this, ConfObjRead.getConfAvator(), this, this.OnAvatorScrollOut);
        VersionStat.getInstance(this, ConfObjRead.getConfVersion());
        var msgUrl = ConfObjRead.getConfUrl().url.apihome +
            ConfObjRead.getConfUrl().cmd.noticelist +
            "?pageSize=20&start=0&access_token=" + Common.access_token;
        RunningMsg.getInstance(this, "./assets/conf/scrollmsg/runningmsg.json", msgUrl);
        RoomPanel.getInstance(this, ConfObjRead.getConfRoomPanel(), gamedata, this, this.roompanelOver);
        BottomMenus.getInstance(this, ConfObjRead.getConfBottommenu());
    };
    RoomScene.prototype.OnAvatorScrollOut = function (e) {
    };
    RoomScene.prototype.titlebarOver = function () {
    };
    RoomScene.prototype.runningmsgOver = function () {
    };
    RoomScene.prototype.showCircleLoading = function (b) {
        if (b === void 0) { b = true; }
        LayaMain.getInstance().showCircleLoading(b);
    };
    RoomScene.prototype.roompanelOver = function () {
    };
    RoomScene.prototype.onLoaded = function (s) {
        this.initUI(s);
    };
    return RoomScene;
}(MyScene));
//# sourceMappingURL=RoomScene.js.map