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
var RoomScene = /** @class */ (function (_super) {
    __extends(RoomScene, _super);
    function RoomScene() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RoomScene.prototype.initUI = function (gamedata) {
        //背景
        UIBg.getInstance(this, ConfObjRead.getConfUiBg());
        //标题栏
        RoomTitleBar.getInstance(this, ConfObjRead.getConfRoomTitlebar(), this, this.titlebarOver);
        //头像
        Avator.getInstance(this, ConfObjRead.getConfAvator(), this, this.OnAvatorScrollOut);
        //版本信息
        VersionStat.getInstance(this, ConfObjRead.getConfVersion());
        //跑马灯消息
        RunningMsg.getInstance(this, ConfObjRead.getConfRunningmsg(), this, this.runningmsgOver);
        //底部菜单
        BottomMenus.getInstance(this, ConfObjRead.getConfBottommenu());
        //房间列表
        RoomPanel.getInstance(this, ConfObjRead.getConfRoomPanel(), gamedata, this, this.roompanelOver);
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
    //载入完毕
    RoomScene.prototype.onLoaded = function (s) {
        //构造界面
        this.initUI(s);
    };
    return RoomScene;
}(MyScene));
//# sourceMappingURL=RoomScene.js.map