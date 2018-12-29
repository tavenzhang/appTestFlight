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
var SettingPad = /** @class */ (function (_super) {
    __extends(SettingPad, _super);
    function SettingPad() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.downPos = {
            "x": 0,
            "y": 0
        }; //按下的坐标
        //当前各种值
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
        //背景图
        this.initBg(this.conf.bg);
        //标题
        this.initTitle(this.conf.title);
        //关闭按钮
        if (this.conf.close) {
            this.close = new MyButton();
            this.close.init(this.conf.close, this, this.onClose);
            this.close.pos(this.conf.close.pos.x, this.conf.close.pos.y);
            this.addChild(this.close);
        }
        //初始化音乐开关
        this.initMusicSwitch(this.conf.musicswitch);
        //初始化音效开关
        this.initSfxSwitch(this.conf.sfxswitch);
        //初始化音乐项目
        this.initMusicItem(this.conf.musicbar);
        //初始化音效项目
        this.initSfxItem(this.conf.sfxbar);
        //分隔符
        this.initGridline(this.conf.line);
        this.pos(this.conf.pos.x, this.conf.pos.y);
    };
    //背景
    SettingPad.prototype.initBg = function (conf) {
        //大背景
        // this.sp_bg = new Laya.Sprite();
        // this.sp_bg.pos(conf.pos.x,conf.pos.y);
        // this.addChild(this.sp_bg);
        // Tools.scaleSpriteV(
        //         this.sp_bg,
        //         conf.src,
        //         conf.size.spliceV);
        //如果有注册点
        // if( conf.pivot )
        // {
        //     this.sp_bg.pivot(conf.pivot.x,conf.pivot.y);
        // }
        this.sp_bg = Tools.addSprite(this, conf);
        //如果有前景
        if (conf.front) {
            this.sp_front = new Laya.Sprite();
            this.sp_front.pos(conf.front.pos.x, conf.front.pos.y);
            this.addChild(this.sp_front);
            Tools.scaleSpriteHV(this.sp_front, conf.front.src, conf.front.size.spliceHV);
            //如果有注册点
            if (conf.pivot) {
                this.sp_front.pivot(conf.pivot.x, conf.pivot.y);
            }
        }
    };
    //标题
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
    //音乐项目
    SettingPad.prototype.initMusicItem = function (conf) {
        if (!conf) {
            return;
        }
        // var musicIcon = Tools.newSprite(conf.icon);
        // this.addChild(musicIcon);
        if (conf.icon) {
            var mIcon = Tools.addSprite(this, conf.icon);
        }
        // var lb_music = Tools.newSprite(conf.label);
        // this.addChild(lb_music);
        if (conf.label) {
            var lb = Tools.addSprite(this, conf.label);
        }
        //拖拉滚动条
        this.musicbar = new MyDragPgBarFront();
        this.musicbar.init(conf.dragbar, this, this.onMusicValueChange);
        this.addChild(this.musicbar);
        this.musicbar.setValue(Laya.SoundManager.musicVolume);
    };
    //音乐拖拉条值改变
    SettingPad.prototype.onMusicValueChange = function (s) {
        var v = s.value;
        var vs = v.toFixed(2);
        var vf = parseFloat(vs);
        // Debug.trace("onMusicValueChange:"+vf);
        // Debug.trace(s.value);
        if (vf <= 0.01) {
            vf = 0;
            //关闭
            this.switchMusic.setOn(0);
        }
        else {
            if (this.switchMusic.isOn() == 0) {
                this.switchMusic.setOn(1);
            }
        }
        Laya.SoundManager.setMusicVolume(vf);
        this.f_music_value = vf;
        //如果有的话，回调出去
        if (this.caller && this.callback) {
            this.callback.apply(this.caller, ["onMusicVolumeChange", vf]);
        }
    };
    //音效项目
    SettingPad.prototype.initSfxItem = function (conf) {
        if (!conf) {
            return;
        }
        // var icon = Tools.newSprite(conf.icon);
        // this.addChild(icon);
        if (conf.icon) {
            var icon = Tools.addSprite(this, conf.icon);
        }
        // var lb = Tools.newSprite(conf.label);
        // this.addChild(lb);
        if (conf.label) {
            var lb = Tools.addSprite(this, conf.label);
        }
        //拖拉滚动条
        this.sfxbar = new MyDragPgBarFront();
        this.sfxbar.init(conf.dragbar, this, this.onSfxValueChange);
        this.addChild(this.sfxbar);
        this.sfxbar.setValue(Laya.SoundManager.soundVolume);
    };
    //音效拖拉条值改变
    SettingPad.prototype.onSfxValueChange = function (s) {
        var v = s.value;
        var vs = v.toFixed(2);
        var vf = parseFloat(vs);
        // Debug.trace("onSfxValueChange:"+vf);
        // Debug.trace(s.value);
        if (vf <= 0.01) {
            vf = 0;
            //关闭
            // Debug.trace('sfx value change setOn 0');
            this.switchSfx.setOn(0);
        }
        else {
            if (this.switchSfx.isOn() == 0) {
                this.switchSfx.setOn(1);
            }
        }
        Laya.SoundManager.setSoundVolume(vf);
        this.f_sfx_value = vf;
        //如果有的话，回调出去
        if (this.caller && this.callback) {
            this.callback.apply(this.caller, ["onSfxVolumeChange", vf]);
        }
    };
    //分隔符
    SettingPad.prototype.initGridline = function (conf) {
        if (!conf) {
            return;
        }
        var line = Tools.newSprite(conf);
        this.addChild(line);
    };
    //音乐开关
    SettingPad.prototype.initMusicSwitch = function (conf) {
        if (!conf) {
            return;
        }
        if (conf.label) {
            var lb = Tools.addSprite(this, conf.label);
            // this.addChild(lb);
        }
        //switch开关
        this.switchMusic = new MySwitchBtn(); //new MyDragSwitch();
        this.switchMusic.init(conf.switch, this, this.onMusicSwitchClick);
        this.addChild(this.switchMusic);
        if (Laya.SoundManager.musicVolume > 0) {
            this.switchMusic.setOn(1, false);
        }
        else {
            this.switchMusic.setOn(0, false);
        }
    };
    //点击音乐切换按钮
    SettingPad.prototype.onMusicSwitchClick = function (s) {
        // Debug.trace("onMusicSwitchClick:"+s.iSwitchId);
        //设定音乐音量为0
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
            //音乐按钮打开，开始播放   //Modified by Jelly on 2018.12.26   //Laya.SoundManager.playMusic(Common.confObj.music.src);
            Laya.SoundManager.playMusic(Common.confObj.music.src);
        }
        //如果有的话，回调出去
        if (this.caller && this.callback) {
            this.callback.apply(this.caller, ["onMusicSwitch", s.iSwitchId]);
        }
    };
    //音效开关
    SettingPad.prototype.initSfxSwitch = function (conf) {
        if (!conf) {
            return;
        }
        if (conf.label) {
            var lb = Tools.addSprite(this, conf.label);
            // this.addChild(lb);
        }
        //switch开关
        this.switchSfx = new MySwitchBtn(); //new MyDragSwitch();
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
    //点击音乐切换按钮
    SettingPad.prototype.onSfxSwitchClick = function (s) {
        // Debug.trace("onSfxSwitchClick:"+s.iSwitchId);
        //设定音效音量为0
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
        //如果有的话，回调出去
        if (this.caller && this.callback) {
            this.callback.apply(this.caller, ["onSfxSwitch", s.iSwitchId]);
        }
    };
    //鼠标响应
    SettingPad.prototype.onMouseEvent = function (e) {
        var x = e.stageX;
        var y = e.stageY;
        // Debug.trace('onMouseEvent e:');
        // Debug.trace(e);
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
        //保存当前的设置内容
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