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
         * 设置面板
         */
        var SettingDlg = /** @class */ (function (_super) {
            __extends(SettingDlg, _super);
            function SettingDlg() {
                var _this = _super.call(this) || this;
                _this.initView();
                return _this;
            }
            /**
             * 显示入口
             */
            SettingDlg.show = function () {
                var dlg = new SettingDlg();
                dlg.popup(false, true);
            };
            SettingDlg.prototype.initView = function () {
                this.dragRect = new Laya.Rectangle(0, 0, this.mslider.width, 0);
                this.initSwithBtn();
                this.setSlider();
                this.initEvents();
            };
            SettingDlg.prototype.initSwithBtn = function () {
                this.musicSwith = new SwitchButton(this.musicBtn, "ui/setting/switch0.png", "ui/setting/switch1.png");
                if (Laya.SoundManager.musicVolume > 0)
                    this.musicSwith.switch = true;
                else
                    this.musicSwith.switch = false;
                this.effectSwith = new SwitchButton(this.effectBtn, "ui/setting/switch0.png", "ui/setting/switch1.png");
                this.effectSwith.switch = !Laya.SoundManager.soundMuted;
            };
            SettingDlg.prototype.setSlider = function () {
                this.musicBar.y = this.mslider.y + this.mslider.height / 2;
                this.effectBar.y = this.eslider.y + this.eslider.height / 2;
                //音乐
                var mv = Laya.SoundManager.musicVolume * 100;
                this.mslider.value = mv;
                this.musicBar.x = this.mslider.x + this.mslider.width * (mv / 100);
                //音效
                var ev = Laya.SoundManager.soundVolume * 100;
                this.eslider.value = ev;
                this.effectBar.x = this.eslider.x + this.eslider.width * (ev / 100);
            };
            SettingDlg.prototype.initEvents = function () {
                var _this = this;
                //关闭
                EventManager.addTouchScaleListener(this.closeBtn, this, function () {
                    SoundPlayer.closeSound();
                    _this.close(null, true);
                });
                //音乐切换开关
                EventManager.addTouchScaleListener(this.musicBtn, this, function () {
                    SoundPlayer.clickSound();
                    _this.musicSwith.switch = !_this.musicSwith.switch;
                    if (_this.musicSwith.switch) { //打开
                        var v = Common.lastMusicVolume * 100;
                        _this.mslider.value = v;
                        Laya.SoundManager.playMusic(ConfObjRead.getConfMusic().src);
                    }
                    else {
                        Common.lastMusicVolume = Laya.SoundManager.musicVolume;
                        _this.mslider.value = 0;
                    }
                });
                //音效切换开关
                EventManager.addTouchScaleListener(this.effectBtn, this, function () {
                    SoundPlayer.clickSound();
                    _this.effectSwith.switch = !_this.effectSwith.switch;
                    if (_this.effectSwith.switch) { //打开
                        Common.bSoundSwitch = true;
                        Laya.SoundManager.soundMuted = false;
                        Laya.SoundManager.soundVolume = Common.lastSoundVolume;
                        var v = Common.lastSoundVolume * 100;
                        _this.eslider.value = v;
                    }
                    else {
                        Common.lastSoundVolume = Laya.SoundManager.soundVolume;
                        Common.bSoundSwitch = false;
                        Laya.SoundManager.soundMuted = true;
                        Laya.SoundManager.soundVolume = 0;
                        _this.eslider.value = 0;
                    }
                });
                //音乐滑块事件
                this.musicBar.on(Laya.Event.MOUSE_DOWN, this, this.downMusicBar);
                this.musicBar.on(Laya.Event.DRAG_MOVE, this, this.dragMoveMusicBar);
                this.mslider.on(Laya.Event.CHANGE, this, this.musicSliderChange);
                //音效滑块事件
                this.effectBar.on(Laya.Event.MOUSE_DOWN, this, this.downEffectBar);
                this.effectBar.on(Laya.Event.DRAG_MOVE, this, this.dragEffectBar);
                this.eslider.on(Laya.Event.CHANGE, this, this.effectSliderChange);
            };
            SettingDlg.prototype.musicSliderChange = function () {
                this.musicBar.x = this.mslider.x + this.mslider.width * (this.mslider.value / 100);
                Laya.SoundManager.setMusicVolume(this.mslider.value / 100);
                if (this.mslider.value <= 0) {
                    this.musicSwith.switch = false;
                }
                else {
                    if (!this.musicSwith.switch)
                        this.musicSwith.switch = true;
                }
            };
            SettingDlg.prototype.effectSliderChange = function () {
                this.effectBar.x = this.eslider.x + this.eslider.width * (this.eslider.value / 100);
                Laya.SoundManager.setSoundVolume(this.eslider.value / 100);
                if (this.eslider.value <= 0) {
                    this.effectSwith.switch = false;
                }
                else {
                    if (!this.effectSwith.switch)
                        this.effectSwith.switch = true;
                }
            };
            SettingDlg.prototype.downEffectBar = function () {
                this.dragRect.x = this.eslider.x;
                this.dragRect.y = this.effectBar.y;
                this.effectBar.startDrag(this.dragRect, false, 0, 300, null, true, 0.92);
            };
            SettingDlg.prototype.dragEffectBar = function () {
                var value = this.effectBar.x - this.eslider.x;
                this.eslider.value = value / this.eslider.width * 100;
            };
            SettingDlg.prototype.downMusicBar = function () {
                this.dragRect.x = this.mslider.x;
                this.dragRect.y = this.musicBar.y;
                this.musicBar.startDrag(this.dragRect, false, 0, 300, null, true, 0.92);
            };
            SettingDlg.prototype.dragMoveMusicBar = function () {
                var value = this.musicBar.x - this.mslider.x;
                this.mslider.value = value / this.mslider.width * 100;
            };
            SettingDlg.prototype.onClosed = function (type) {
                SaveManager.getObj().save(SaveManager.KEY_MUSIC_SWITCH, this.musicSwith.switch ? 1 : 0);
                SaveManager.getObj().save(SaveManager.KEY_MUSIC_VL, this.mslider.value / 100);
                SaveManager.getObj().save(SaveManager.KEY_SFX_SWITCH, this.effectSwith.switch ? 1 : 0);
                SaveManager.getObj().save(SaveManager.KEY_SFX_VL, this.eslider.value / 100);
                this.musicBar.off(Laya.Event.MOUSE_DOWN, this, this.downMusicBar);
                this.musicBar.off(Laya.Event.DRAG_MOVE, this, this.dragMoveMusicBar);
                this.mslider.off(Laya.Event.CHANGE, this, this.musicSliderChange);
                this.effectBar.off(Laya.Event.MOUSE_DOWN, this, this.downEffectBar);
                this.effectBar.off(Laya.Event.DRAG_MOVE, this, this.dragEffectBar);
                this.eslider.off(Laya.Event.CHANGE, this, this.effectSliderChange);
                EventManager.removeAllEvents(this);
                _super.prototype.onClosed.call(this, type);
                this.destroy(true);
            };
            return SettingDlg;
        }(ui.dlg.SettingDlgUI));
        dlg_1.SettingDlg = SettingDlg;
        var SwitchButton = /** @class */ (function () {
            /**
             * 切换按钮
             * @param btn
             * @param openSkin 打开状态的皮肤
             * @param offSkin 关闭状态的皮肤
             */
            function SwitchButton(btn, openSkin, offSkin) {
                this.btn = btn;
                this.openSkin = openSkin;
                this.offSkin = offSkin;
                this._switch = Boolean(this.btn.skin == this.openSkin);
            }
            Object.defineProperty(SwitchButton.prototype, "switch", {
                get: function () {
                    return this._switch;
                },
                //设置开关状态
                set: function (value) {
                    this._switch = value;
                    this.btn.skin = value ? this.openSkin : this.offSkin;
                },
                enumerable: true,
                configurable: true
            });
            return SwitchButton;
        }());
        dlg_1.SwitchButton = SwitchButton;
    })(dlg = view.dlg || (view.dlg = {}));
})(view || (view = {}));
//# sourceMappingURL=SettingDlg.js.map