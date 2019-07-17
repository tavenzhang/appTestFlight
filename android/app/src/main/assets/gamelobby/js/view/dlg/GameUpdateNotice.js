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
        var GameUpdateNotice = /** @class */ (function (_super) {
            __extends(GameUpdateNotice, _super);
            function GameUpdateNotice() {
                var _this = _super.call(this) || this;
                _this.initView();
                return _this;
            }
            GameUpdateNotice.prototype.initView = function () {
                //
                this.htmlText.style.lineHeight = 36;
                this.htmlText.style.fontSize = 24;
                this.htmlText.style.color = "#ffffff";
                //
                this.panel.vScrollBar.hide = true;
                this.btnConfirm.visible = false;
                //注册确认按钮点击事件
                // EventManager.addTouchScaleListener(this.btnConfirm, this, () => {
                // 	SoundPlayer.closeSound(); 	//播放界面关闭音效
                // 	this.close(null, true);		//关闭界面
                // });
            };
            GameUpdateNotice.prototype.convertDateForIos = function (date) {
                var arr = date.split(/[- : T]/);
                date = arr[0] + "年" + arr[1] + "月" + arr[2] + "日" + arr[3] + "时" + arr[4] + "分";
                return date;
            };
            /**
             * 设置显示游戏更新公告数据
             * @param data 更新公告数据 {
                    "content": "ashdakjsdkjadhkj",
                    "endTime": "2019-07-16T06:52:41.235Z",
                    "startTime": "2019-07-16T06:52:41.235Z",
                    "title": "abctest"
                }
             */
            GameUpdateNotice.prototype.SetData = function (data) {
                var str = "<span style='color:#FFFFFF;fontSize:30;'>-本次更新维护时间:</span><br />";
                str += "<span style='color:#fff200;fontSize:24;'>" + this.convertDateForIos(data.startTime) + "~" + this.convertDateForIos(data.endTime) + "</span><br /><br />";
                str += "<span style='color:#FFFFFF;fontSize:30;'>" + data.title + "</span><br />";
                str += data.content;
                //console.log(str);
                this.htmlText.innerHTML = str;
            };
            GameUpdateNotice.prototype.onClosed = function (type) {
                EventManager.removeAllEvents(this);
                _super.prototype.onClosed.call(this, type);
                this.destroy(true);
            };
            /**
             * 显示游戏更新公告
             * @param data 更新公告数据
             */
            GameUpdateNotice.show = function (data) {
                var self = new GameUpdateNotice();
                self.width = Laya.stage.width;
                self.height = Laya.stage.height;
                self.SetData(data);
                self.popup(false, true);
            };
            return GameUpdateNotice;
        }(ui.dlg.GameUpdateNoticeUI));
        dlg.GameUpdateNotice = GameUpdateNotice;
    })(dlg = view.dlg || (view.dlg = {}));
})(view || (view = {}));
//# sourceMappingURL=GameUpdateNotice.js.map