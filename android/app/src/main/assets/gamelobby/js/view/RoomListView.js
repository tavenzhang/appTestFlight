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
     * 游戏二级菜单
     * 目前为扎金花
     */
    var RoomListView = /** @class */ (function (_super) {
        __extends(RoomListView, _super);
        function RoomListView() {
            return _super.call(this) || this;
        }
        RoomListView.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.iconBox.removeSelf();
            this.publicUI = new view.PublicView();
            this.uibox.addChild(this.publicUI);
            this.initEvents();
            this.resize();
        };
        RoomListView.prototype.initEvents = function () {
            var _this = this;
            //返回大厅
            EventManager.addTouchScaleListener(this.backBtn, this, function () {
                SoundPlayer.returnLobbySound();
                LayaMain.getInstance().initLobby();
            });
            //规则
            EventManager.addTouchScaleListener(this.ruleBtn, this, function () {
                SoundPlayer.clickSound();
                HelpPad.showPad("");
            });
            //战绩
            EventManager.addTouchScaleListener(this.zjBtn, this, function () {
                SoundPlayer.clickSound();
                HistoryDialog.showPad(Common.gameId);
            });
            //设置
            EventManager.addTouchScaleListener(this.settingBtn, this, function () {
                SoundPlayer.clickSound();
                SettingPad.showPad(LayaMain.getInstance().getRootNode(), ConfObjRead.getConfSetting(), _this, null);
            });
        };
        RoomListView.prototype.setCallback = function (e) { };
        //重置屏幕大小
        RoomListView.prototype.resize = function () {
            this.width = Laya.stage.width;
            var gap = GameUtils.posOffset;
            this.backGroup.right = gap;
            this.publicUI.x = gap;
        };
        RoomListView.prototype.dispose = function () {
            EventManager.removeAllEvents(this);
            if (this.publicUI) {
                this.publicUI.dispose();
                this.publicUI = null;
            }
            this.destroy(true);
        };
        return RoomListView;
    }(ui.RoomListViewUI));
    view.RoomListView = RoomListView;
})(view || (view = {}));
//# sourceMappingURL=RoomListView.js.map