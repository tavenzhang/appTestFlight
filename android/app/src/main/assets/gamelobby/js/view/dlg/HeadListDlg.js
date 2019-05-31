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
        /**
         * 用户信息框(头像列表选择)
         */
        var HeadListDlg = /** @class */ (function (_super) {
            __extends(HeadListDlg, _super);
            function HeadListDlg() {
                var _this = _super.call(this) || this;
                /**
                 * 头像图标总数
                 */
                _this.totalIcon = 12;
                _this.curIconID = "01";
                _this.initView();
                return _this;
            }
            /**
             * 显示入口
             */
            HeadListDlg.show = function () {
                var dlg = new HeadListDlg();
                dlg.popup(false, true);
            };
            HeadListDlg.prototype.initView = function () {
                this.changeBtn.visible = false;
                this.itemPanel.vScrollBarSkin = "";
                this.showMoney();
                this.setHeadIcon();
                this.showUserName();
                this.creatHeadList();
                this.initEvents();
            };
            HeadListDlg.prototype.initEvents = function () {
                var _this = this;
                //关闭
                EventManager.addTouchScaleListener(this.closeBtn, this, function () {
                    SoundPlayer.closeSound();
                    _this.close(null, true);
                });
                //更换头像
                EventManager.addTouchScaleListener(this.changeBtn, this, function () {
                    SoundPlayer.clickSound();
                    _this.requestHeadSave(ConfObjRead.getConfUrl().url.apihome +
                        ConfObjRead.getConfUrl().cmd.avatorsave +
                        "?access_token=" + Common.access_token +
                        "&avatar=" + _this.chooseIcon.numID);
                });
                this.itemPanel.on(Laya.Event.MOUSE_UP, this, this.itemHandler);
            };
            //请求头像保存
            HeadListDlg.prototype.requestHeadSave = function (url) {
                LayaMain.getInstance().showCircleLoading();
                var header = [
                    // "Content-Type","application/json",
                    // "Accept","*/*"
                    "Accept", "application/json"
                ];
                NetManager.getObj().HttpConnect(url, this, this.responseHeadSave, header, null, "PUT", //"get",
                "json");
            };
            HeadListDlg.prototype.responseHeadSave = function (s, stat, hr) {
                LayaMain.getInstance().showCircleLoading(false);
                if (stat == "complete") {
                    this.saveHeadSucce();
                }
                else {
                    if (stat == "error" && hr.http.status == 200) {
                        this.saveHeadSucce();
                        return;
                    }
                    Toast.showToast(s);
                }
            };
            //头像保存成功
            HeadListDlg.prototype.saveHeadSucce = function () {
                Common.userInfo.avatorId = this.chooseIcon.iconID;
                SaveManager.getObj().save(SaveManager.KEY_SFX_VL, Common.userInfo.avatorId);
                this.setHeadIcon();
                EventManager.dispath(EventType.FLUSH_HEADICON, Common.userInfo.avatorId);
            };
            HeadListDlg.prototype.itemHandler = function (evt) {
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
            HeadListDlg.prototype.creatHeadList = function () {
                var icon;
                for (var i = 0; i < this.totalIcon; i++) {
                    var id = i < 9 ? "0" + (i + 1) : (i + 1).toString();
                    icon = new HeadIconUI(id);
                    icon.size(122, 122);
                    icon.x = (i % 4) * (icon.width + 40);
                    icon.y = Math.floor(i / 4) * (icon.height + 40);
                    this.itemPanel.addChild(icon);
                }
                var tox = this.itembg.x + (this.itembg.width - this.itemPanel.contentWidth) / 2;
                this.itemPanel.x = tox;
            };
            HeadListDlg.prototype.setHeadIcon = function () {
                var data = Common.userInfo;
                if (!data) {
                    console.error("data is null", this);
                    return;
                }
                this.curIconID = data.avatorId || "01";
                this.headIcon.skin = ResConfig.getHeadSkinByID(this.curIconID);
            };
            HeadListDlg.prototype.showUserName = function () {
                var data = Common.userInfo;
                this.nameTxt.text = data.username || "";
            };
            HeadListDlg.prototype.showMoney = function () {
                var value = Common.userInfo.userBalance.balance;
                value = Tools.FormatMoney(value, 2);
                this.goldTxt.text = value;
            };
            HeadListDlg.prototype.onClosed = function (type) {
                EventManager.removeAllEvents(this);
                this.itemPanel.off(Laya.Event.MOUSE_UP, this, this.itemHandler);
                this.itemPanel.destroy(true);
                this.itemPanel = null;
                _super.prototype.onClosed.call(this, type);
                this.destroy(true);
            };
            return HeadListDlg;
        }(ui.dlg.HeadListDlgUI));
        dlg_1.HeadListDlg = HeadListDlg;
        // export class HeadIconUI extends Laya.Sprite {
        // 	private iconbg: Laya.Image;
        // 	private iconHead: Laya.Image;
        // 	private iconSelecte: Laya.Image;//选中框
        // 	public iconID: string;
        // 	constructor(id: string) {
        // 		super();
        // 		this.iconID = id;
        // 		this.mouseEnabled = true;
        // 		this.initView();
        // 	}
        // 	private initView() {
        // 		this.iconbg = new Laya.Image();
        // 		this.iconbg.skin = "ui/common/img_touxiang_touxiangkuang.png";
        // 		this.addChild(this.iconbg);
        // 		this.iconbg.width = 122;
        // 		this.iconbg.height = 122;
        // 		this.iconHead = new Laya.Image();
        // 		this.iconHead.skin = ResConfig.getHeadSkinByID(this.iconID);
        // 		this.addChild(this.iconHead);
        // 		this.iconHead.pos(
        // 			this.iconbg.width - this.iconHead.width >> 1,
        // 			this.iconbg.height - this.iconHead.height >> 1
        // 		)
        // 		this.iconSelecte = new Laya.Image();
        // 		this.iconSelecte.skin = "ui/common/img_touxiang_xuanzhongkuang.png";
        // 		this.addChild(this.iconSelecte);
        // 		this.iconSelecte.width = this.iconbg.width;
        // 		this.iconSelecte.height = this.iconbg.height;
        // 		this.iconSelecte.visible = false;
        // 	}
        // 	public selecteIcon(bl: boolean) {
        // 		this.iconSelecte.visible = bl;
        // 	}
        // 	public get numID(): number {
        // 		if (this.iconID.indexOf("0") == 0) {
        // 			return Number(this.iconID.substr(1, 1));
        // 		}
        // 		return Number(this.iconID);
        // 	}
        // }
    })(dlg = view.dlg || (view.dlg = {}));
})(view || (view = {}));
//# sourceMappingURL=HeadListDlg.js.map