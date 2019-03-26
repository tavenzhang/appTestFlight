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
var SettingPad = /** @class */ (function (_super) {
    __extends(SettingPad, _super);
    function SettingPad() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.downPos = {
            "x": 0,
            "y": 0
        };
        _this.b_music_switch = 1;
        _this.f_music_value = 1;
        _this.b_sfx_switch = 1;
        _this.f_sfx_value = 1;
        return _this;
    }
    SettingPad.getObj = function () {
        return SettingPad.obj;
    };
    SettingPad.showPad = function (node, conf, caller, callback) {
        if (caller === void 0) { caller = null; }
        if (callback === void 0) { callback = null; }
        if (!SettingPad.obj) {
            var o = new SettingPad();
            o.init(conf, caller, callback);
            // Laya.stage.addChild(o);
            node.addChild(o);
        }
        // SettingPad.obj.show(b);
    };
    SettingPad.prototype.destroy = function (b) {
        SettingPad.obj = null;
        _super.prototype.destroy.call(this, b);
    };
    SettingPad.prototype.hide = function () {
        // this.lb_content.text = "";
        this.visible = false;
        SettingPad.obj = null;
        Laya.stage.removeChild(this);
        this.destroy(true);
        // lamain.restoreLoaderPath();
    };
    SettingPad.prototype.init = function (conf, caller, callback) {
        SettingPad.obj = this;
        this.conf = conf;
        this.caller = caller;
        this.callback = callback;
        this.alphabg = new Laya.Sprite();
        Tools.drawRectWithAlpha(this.alphabg, 0, 0, this.conf.size.w, this.conf.size.h, "#000000", this.conf.mask.alpha);
        this.addChild(this.alphabg);
        this.alphabg.size(this.conf.size.w, this.conf.size.h);
        this.alphabg.pos(-this.conf.pos.x, -this.conf.pos.y);
        this.alphabg.on(Laya.Event.MOUSE_DOWN, this, this.onMouse);
        this.alphabg.on(Laya.Event.MOUSE_UP, this, this.onMouse);
        this.alphabg.on(Laya.Event.MOUSE_MOVE, this, this.onMouse);
        this.initBg(this.conf.bg);
        this.initTitle(this.conf.title);
        if (this.conf.close) {
            this.close = new MyButton();
            this.close.init(this.conf.close, this, this.onClose);
            this.close.pos(this.conf.close.pos.x, this.conf.close.pos.y);
            this.addChild(this.close);
        }
        this.initMusicSwitch(this.conf.musicswitch);
        this.initSfxSwitch(this.conf.sfxswitch);
        this.initMusicItem(this.conf.musicbar);
        this.initSfxItem(this.conf.sfxbar);
        this.initGridline(this.conf.line);
        this.pos(this.conf.pos.x, this.conf.pos.y);
    };
    SettingPad.prototype.initBg = function (conf) {
        this.sp_bg = Tools.addSprite(this, conf);
        if (conf.front) {
            this.sp_front = new Laya.Sprite();
            this.sp_front.pos(conf.front.pos.x, conf.front.pos.y);
            this.addChild(this.sp_front);
            Tools.scaleSpriteHV(this.sp_front, conf.front.src, conf.front.size.spliceHV);
            if (conf.pivot) {
                this.sp_front.pivot(conf.pivot.x, conf.pivot.y);
            }
        }
    };
    SettingPad.prototype.initTitle = function (conf) {
        if (!conf) {
            return;
        }
        if (conf.bg) {
            this.sp_title_bg = Tools.newSprite(conf.bg);
            this.addChild(this.sp_title_bg);
        }
        if (conf.lb) {
            this.sp_title_lb = Tools.newSprite(conf.lb);
            this.addChild(this.sp_title_lb);
        }
    };
    SettingPad.prototype.initMusicItem = function (conf) {
        if (!conf) {
            return;
        }
        if (conf.icon) {
            var mIcon = Tools.addSprite(this, conf.icon);
        }
        if (conf.label) {
            var lb = Tools.addSprite(this, conf.label);
        }
        this.musicbar = new MyDragPgBarFront();
        this.musicbar.init(conf.dragbar, this, this.onMusicValueChange);
        this.addChild(this.musicbar);
        this.musicbar.setValue(Laya.SoundManager.musicVolume);
    };
    SettingPad.prototype.onMusicValueChange = function (s) {
        var v = s.value;
        var vs = v.toFixed(2);
        var vf = parseFloat(vs);
        if (vf <= 0.01) {
            vf = 0;
            this.switchMusic.setOn(0);
        }
        else {
            if (this.switchMusic.isOn() == 0) {
                this.switchMusic.setOn(1);
            }
        }
        Laya.SoundManager.setMusicVolume(vf);
        this.f_music_value = vf;
        if (this.caller && this.callback) {
            this.callback.apply(this.caller, ["onMusicVolumeChange", vf]);
        }
    };
    SettingPad.prototype.initSfxItem = function (conf) {
        if (!conf) {
            return;
        }
        if (conf.icon) {
            var icon = Tools.addSprite(this, conf.icon);
        }
        if (conf.label) {
            var lb = Tools.addSprite(this, conf.label);
        }
        this.sfxbar = new MyDragPgBarFront();
        this.sfxbar.init(conf.dragbar, this, this.onSfxValueChange);
        this.addChild(this.sfxbar);
        this.sfxbar.setValue(Laya.SoundManager.soundVolume);
    };
    SettingPad.prototype.onSfxValueChange = function (s) {
        var v = s.value;
        var vs = v.toFixed(2);
        var vf = parseFloat(vs);
        if (vf <= 0.01) {
            vf = 0;
            this.switchSfx.setOn(0);
        }
        else {
            if (this.switchSfx.isOn() == 0) {
                this.switchSfx.setOn(1);
            }
        }
        Laya.SoundManager.setSoundVolume(vf);
        this.f_sfx_value = vf;
        if (this.caller && this.callback) {
            this.callback.apply(this.caller, ["onSfxVolumeChange", vf]);
        }
    };
    SettingPad.prototype.initGridline = function (conf) {
        if (!conf) {
            return;
        }
        var line = Tools.newSprite(conf);
        this.addChild(line);
    };
    SettingPad.prototype.initMusicSwitch = function (conf) {
        if (!conf) {
            return;
        }
        if (conf.label) {
            var lb = Tools.addSprite(this, conf.label);
        }
        this.switchMusic = new MySwitchBtn();
        this.switchMusic.init(conf.switch, this, this.onMusicSwitchClick);
        this.addChild(this.switchMusic);
        if (Laya.SoundManager.musicVolume > 0) {
            this.switchMusic.setOn(1, false);
        }
        else {
            this.switchMusic.setOn(0, false);
        }
    };
    SettingPad.prototype.onMusicSwitchClick = function (s) {
        var _this = this;
        if (s.iSwitchId == 0) {
            this.b_music_switch = 0;
            Common.lastMusicVolume = Laya.SoundManager.musicVolume;
            if (this.musicbar) {
                this.musicbar.setValue(0);
            }
        }
        else {
            this.b_music_switch = 1;
            if (this.musicbar) {
                this.musicbar.setValue(Common.lastMusicVolume);
            }
            Laya.loader.load([{ url: ConfObjRead.getConfMusic().src }], new Laya.Handler(this, function () {
                // Debug.trace( "player bg music" );
                Laya.timer.once(100, _this, function () {
                    Laya.SoundManager.playMusic(ConfObjRead.getConfMusic().src);
                });
            }));
        }
        if (this.caller && this.callback) {
            this.callback.apply(this.caller, ["onMusicSwitch", s.iSwitchId]);
        }
    };
    SettingPad.prototype.initSfxSwitch = function (conf) {
        if (!conf) {
            return;
        }
        if (conf.label) {
            var lb = Tools.addSprite(this, conf.label);
        }
        this.switchSfx = new MySwitchBtn();
        this.switchSfx.init(conf.switch, this, this.onSfxSwitchClick);
        this.addChild(this.switchSfx);
        if (Laya.SoundManager.soundMuted) {
            // Debug.trace('switch sfx setOn 0');
            this.switchSfx.setOn(0, false);
        }
        else {
            // Debug.trace('switch sfx setOn 1');
            this.switchSfx.setOn(1, false);
        }
    };
    SettingPad.prototype.onSfxSwitchClick = function (s) {
        if (s.iSwitchId == 0) {
            this.b_sfx_switch = 0;
            Common.lastSoundVolume = Laya.SoundManager.soundVolume;
            Common.bSoundSwitch = false;
            Laya.SoundManager.soundMuted = true;
            Laya.SoundManager.soundVolume = 0;
            if (this.sfxbar) {
                this.sfxbar.setValue(0);
            }
        }
        else {
            this.b_sfx_switch = 1;
            Common.bSoundSwitch = true;
            Laya.SoundManager.soundMuted = false;
            Laya.SoundManager.soundVolume = Common.lastSoundVolume;
            if (this.sfxbar) {
                this.sfxbar.setValue(Common.lastSoundVolume);
            }
        }
        if (this.caller && this.callback) {
            this.callback.apply(this.caller, ["onSfxSwitch", s.iSwitchId]);
        }
    };
    SettingPad.prototype.onMouseEvent = function (e) {
        var x = e.stageX;
        var y = e.stageY;
        switch (e.type) {
            case Laya.Event.MOUSE_DOWN:
                this.bDrag = true;
                this.downPos.x = x;
                this.downPos.y = y;
                // this.scrollbar.moveStart();
                break;
            case Laya.Event.MOUSE_MOVE:
                // if( this.downPos.x > 0 )
                // {
                //     var sumx = x - this.downPos.x;
                //     this.downPos.x = x;
                // this.moveAllItem(sumx);
                // }
                if (this.downPos.y > 0) {
                    var sumy = y - this.downPos.y;
                    this.downPos.y = y;
                }
                break;
            case Laya.Event.MOUSE_OUT:
            case Laya.Event.MOUSE_UP:
                this.downPos.x = 0;
                this.downPos.y = 0;
                this.bDrag = false;
                // this.scrollbar.moveEnd();
                break;
        }
    };
    SettingPad.prototype.onMouse = function (e) {
        if (this.conf.touchout) {
            if (this.conf.touchout.value && e.type == Laya.Event.MOUSE_DOWN) {
                this.onClose(null);
            }
        }
    };
    SettingPad.prototype.onClose = function (s) {
        // Debug.trace("SettingPad onClose 1:");
        // Debug.trace(SaveManager.getObj().mtObj);
        SaveManager.getObj().save(SaveManager.KEY_MUSIC_SWITCH, this.b_music_switch);
        SaveManager.getObj().save(SaveManager.KEY_MUSIC_VL, this.f_music_value);
        SaveManager.getObj().save(SaveManager.KEY_SFX_SWITCH, this.b_sfx_switch);
        SaveManager.getObj().save(SaveManager.KEY_SFX_VL, this.f_sfx_value);
        // Debug.trace("SettingPad onClose 2:");
        // Debug.trace(SaveManager.getObj().mtObj);
        // this.closeCallback.apply(this.caller,[this]);
        this.hide();
    };
    return SettingPad;
}(Laya.Sprite));
//# sourceMappingURL=SettingPad.js.map