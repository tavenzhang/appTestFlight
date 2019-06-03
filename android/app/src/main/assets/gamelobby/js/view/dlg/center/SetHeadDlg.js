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
    (function (dlg_1) {
        var center;
        (function (center) {
            /**
             * 修改头像
             */
            var SetHeadDlg = /** @class */ (function (_super) {
                __extends(SetHeadDlg, _super);
                function SetHeadDlg() {
                    var _this = _super.call(this) || this;
                    //头像图标总数
                    _this.totalIcon = 12;
                    _this.curIconID = "01";
                    _this.initView();
                    return _this;
                }
                /**
                 * 入口
                 */
                SetHeadDlg.show = function () {
                    var dlg = new SetHeadDlg();
                    dlg.popup(false, true);
                };
                SetHeadDlg.prototype.initView = function () {
                    var _this = this;
                    this.changeBtn.visible = false;
                    this.itemPanel.vScrollBarSkin = "";
                    this.setHeadIcon();
                    this.creatHeadList();
                    //关闭
                    EventManager.addTouchScaleListener(this.closeBtn, this, function () {
                        SoundPlayer.closeSound();
                        _this.close(null, true);
                    });
                    //更换头像
                    EventManager.addTouchScaleListener(this.changeBtn, this, function () {
                        SoundPlayer.clickSound();
                        _this.requestHeadSave();
                    });
                    this.itemPanel.on(Laya.Event.MOUSE_UP, this, this.itemHandler);
                };
                SetHeadDlg.prototype.itemHandler = function (evt) {
                    if (evt.target instanceof HeadIconUI) {
                        var icon = evt.target;
                        icon.selecteIcon(true);
                        if (this.chooseIcon && this.chooseIcon != icon) {
                            this.chooseIcon.selecteIcon(false);
                        }
                        this.chooseIcon = icon;
                        if (this.curIconID == icon.iconID) {
                            this.changeBtn.visible = false;
                        }
                        else {
                            this.changeBtn.visible = true;
                        }
                    }
                };
                SetHeadDlg.prototype.requestHeadSave = function () {
                    var _this = this;
                    var url = ConfObjRead.getConfUrl().url.apihome +
                        ConfObjRead.getConfUrl().cmd.avatorsave +
                        "?access_token=" + Common.access_token +
                        "&avatar=" + this.chooseIcon.numID;
                    LayaMain.getInstance().showCircleLoading();
                    var header = ["Accept", "application/json"];
                    HttpRequester.doRequest(url, header, null, this, function (suc, jobj) {
                        LayaMain.getInstance().showCircleLoading(false);
                        if (suc) {
                            _this.saveHeadSucce();
                        }
                    }, "put");
                };
                //头像保存成功
                SetHeadDlg.prototype.saveHeadSucce = function () {
                    Common.avatorInfo.avatorId = this.chooseIcon.iconID;
                    SaveManager.getObj().save(SaveManager.KEY_SFX_VL, this.chooseIcon.iconID);
                    this.setHeadIcon();
                    EventManager.dispath(EventType.FLUSH_HEADICON, this.chooseIcon.iconID);
                };
                SetHeadDlg.prototype.creatHeadList = function () {
                    var icon;
                    var gap = 10; //间隔
                    var row = 5; //列数
                    for (var i = 0; i < this.totalIcon; i++) {
                        var id = i < 9 ? "0" + (i + 1) : (i + 1).toString();
                        icon = new HeadIconUI(id);
                        icon.size(120, 120);
                        icon.x = (i % row) * (icon.width + gap);
                        icon.y = Math.floor(i / row) * (icon.height + gap);
                        this.itemPanel.addChild(icon);
                    }
                    var tox = this.itembg.x + (this.itembg.width - this.itemPanel.contentWidth) / 2;
                    this.itemPanel.x = tox;
                };
                SetHeadDlg.prototype.setHeadIcon = function () {
                    var data = Common.avatorInfo;
                    if (!data) {
                        console.error("data is null", this);
                        return;
                    }
                    this.curIconID = data.avatorId || "01";
                    this.headIcon.skin = ResConfig.getHeadSkinByID(this.curIconID);
                };
                SetHeadDlg.prototype.onClosed = function (type) {
                    EventManager.removeAllEvents(this);
                    this.itemPanel.off(Laya.Event.MOUSE_UP, this, this.itemHandler);
                    this.itemPanel.destroy(true);
                    this.itemPanel = null;
                    _super.prototype.onClosed.call(this, type);
                    this.destroy(true);
                };
                return SetHeadDlg;
            }(ui.dlg.center.SetHeadDlgUI));
            center.SetHeadDlg = SetHeadDlg;
        })(center = dlg_1.center || (dlg_1.center = {}));
    })(dlg = view.dlg || (view.dlg = {}));
})(view || (view = {}));
//# sourceMappingURL=SetHeadDlg.js.map